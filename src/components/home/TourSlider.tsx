"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin } from "@/components/ui/icons";
import { priceLabel, priceUnit } from "@/lib/format";
import { wrapPos } from "@/lib/carousel";
import { track } from "@/lib/analytics";
import type { Tour } from "@/content/types";
import styles from "./TourSlider.module.css";

const SPEED = 62; // px/s - calm continuous belt drift when idle
const STEP_MS = 600; // one-card snap transition
const RESUME_MS = 4000; // idle delay before the belt resumes after interaction
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Bestseller carousel - one coherent architecture, two modes.
 *
 * The track is three consecutive copies of the tour list `[a][real][b]` moved by a
 * single `translate3d` on the element (no per-frame React state). The pixel offset
 * `pos` is the single source of truth and is wrapped back into the middle copy
 * every frame (`wrapPos`), so there is never a beginning, end, rewind or gap.
 *
 * IDLE: a requestAnimationFrame loop advances `pos` at a constant speed - the strip
 * moves continuously like one connected belt (never stepped).
 * MANUAL: pointer drag pauses the belt and settles on exactly ONE card per swipe
 * (nearest-card, clamped to +/-1); desktop arrows also move one card and wrap. After
 * a short idle the belt resumes smoothly FROM THE CURRENT position.
 *
 * Reduced motion disables the belt (steps are instant); manual navigation stays.
 * Clones are aria-hidden + non-focusable - real data stays a single set, no dup
 * IDs or JSON-LD.
 */
export function TourSlider({ tours }: { tours: Tour[] }) {
  const reduce = useReducedMotion();
  const n = tours.length;

  const slides = useMemo(
    () =>
      n === 0
        ? []
        : (["a", "real", "b"] as const).flatMap((copy) =>
            tours.map((t, i) => ({ t, real: copy === "real", key: `${copy}-${t.slug}-${i}` })),
          ),
    [tours, n],
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const posRef = useRef(0); // scroll offset in px (translateX = -pos)
  const stepRef = useRef(0); // card width + gap
  const blockRef = useRef(0); // one copy width = step * n
  const readyRef = useRef(false);

  const driftingRef = useRef(false);
  const onScreenRef = useRef(false); // belt only runs while the carousel is visible
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startPos: 0,
    dx: 0,
    moved: 0,
    axis: 0,
    pointerId: -1,
    captured: false,
  });

  const applyTransform = useCallback((withTransition: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = withTransition && !reduce ? `transform ${STEP_MS}ms ${EASE}` : "none";
    el.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
  }, [reduce]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    stepRef.current = first.offsetWidth + gap;
    blockRef.current = stepRef.current * n;
    if (!readyRef.current) {
      posRef.current = blockRef.current; // start on the middle (real) copy
      readyRef.current = true;
    }
    applyTransform(false);
  }, [applyTransform, n]);

  // --- continuous belt (rAF) ----------------------------------------------
  const tick = useCallback(
    (ts: number) => {
      if (!driftingRef.current) return;
      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = ts;
      posRef.current = wrapPos(posRef.current + SPEED * dt, blockRef.current);
      applyTransform(false);
      rafRef.current = requestAnimationFrame(tick);
    },
    [applyTransform],
  );

  const startDrift = useCallback(() => {
    // Never spin the rAF loop while the carousel is scrolled offscreen (saves
    // main-thread + compositor work, notably on older iPhones) or while hidden.
    if (reduce || driftingRef.current || !readyRef.current || n === 0) return;
    if (!onScreenRef.current || document.hidden) return;
    driftingRef.current = true;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  }, [reduce, tick, n]);

  const stopDrift = useCallback(() => {
    driftingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resumeSoon = useCallback(
    (ms = RESUME_MS) => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(startDrift, ms);
    },
    [startDrift],
  );

  // --- one-card step (arrows / snap) --------------------------------------
  const snapToCard = useCallback(
    (card: number) => {
      stopDrift();
      posRef.current = card * stepRef.current;
      applyTransform(true);
    },
    [applyTransform, stopDrift],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const card = Math.round(posRef.current / stepRef.current) + dir;
      snapToCard(card);
      resumeSoon();
    },
    [snapToCard, resumeSoon],
  );

  // --- mount: measure, observe resize, normalise after each snap ----------
  useEffect(() => {
    const el = trackRef.current;
    const vp = viewportRef.current;
    if (!el || !vp || n === 0) return;

    measure();

    const ro = new ResizeObserver(() => {
      stopDrift();
      measure();
      resumeSoon(1200);
    });
    ro.observe(vp);

    // Pause the belt whenever the carousel scrolls out of view; resume on return.
    // (Falls back to always-on if IntersectionObserver is unavailable.)
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? false;
          onScreenRef.current = visible;
          if (visible) startDrift();
          else {
            stopDrift();
            clearTimeout(resumeTimer.current);
          }
        },
        { rootMargin: "120px 0px" },
      );
      io.observe(vp);
    } else {
      onScreenRef.current = true;
      startDrift();
    }

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "transform") return;
      const wrapped = wrapPos(posRef.current, blockRef.current);
      if (wrapped !== posRef.current) {
        posRef.current = wrapped;
        applyTransform(false); // silent, pixel-identical
        void el.offsetWidth; // reflow so the next transition starts clean
      }
    };
    el.addEventListener("transitionend", onEnd);

    const onVis = () => (document.hidden ? stopDrift() : resumeSoon(600));
    document.addEventListener("visibilitychange", onVis);

    return () => {
      ro.disconnect();
      io?.disconnect();
      el.removeEventListener("transitionend", onEnd);
      document.removeEventListener("visibilitychange", onVis);
      stopDrift();
      clearTimeout(resumeTimer.current);
    };
  }, [measure, startDrift, stopDrift, resumeSoon, applyTransform, n]);

  // --- pointer drag: pause belt, one card per swipe ------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (!readyRef.current) return;
    stopDrift();
    clearTimeout(resumeTimer.current);
    // NB: do NOT setPointerCapture here. Capturing on pointerdown makes Chromium
    // retarget the trailing `click` to the capturing viewport (the capture target
    // becomes the nearest common ancestor of down/up), so a plain desktop click
    // never reached a card's <a> and the tour would not open. Capture is deferred
    // to onPointerMove, only once a real horizontal drag begins.
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startPos: posRef.current,
      dx: 0,
      moved: 0,
      axis: 0,
      pointerId: e.pointerId,
      captured: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (d.axis === 0) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      d.axis = Math.abs(dx) >= Math.abs(dy) ? 1 : -1; // horizontal vs vertical
      if (d.axis === 1 && !d.captured) {
        // A real horizontal drag has started: capture now so the gesture keeps
        // tracking even if the pointer leaves the viewport, and so the trailing
        // click is suppressed (below) rather than navigating.
        try {
          viewportRef.current?.setPointerCapture(d.pointerId);
          d.captured = true;
        } catch {
          /* pointer may have already ended */
        }
      }
    }
    if (d.axis !== 1) return; // let the page scroll vertically
    d.dx = dx;
    d.moved = Math.max(d.moved, Math.abs(dx));
    posRef.current = d.startPos - dx;
    applyTransform(false);
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.captured) {
      try {
        viewportRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      d.captured = false;
    }
    if (d.axis !== 1) {
      resumeSoon();
      return;
    }
    const s = stepRef.current || 1;
    const startCard = Math.round(d.startPos / s);
    let target = Math.round(posRef.current / s);
    // exactly one card per intentional swipe
    target = Math.max(startCard - 1, Math.min(startCard + 1, target));
    if (target === startCard && Math.abs(d.dx) > s * 0.15) {
      target = startCard + (d.dx < 0 ? 1 : -1);
    }
    snapToCard(target);
    resumeSoon();
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (n === 0) return null;

  return (
    <div className={styles.wrap} data-testid="tour-slider">
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onMouseEnter={() => {
          stopDrift();
          clearTimeout(resumeTimer.current);
        }}
        onMouseLeave={() => resumeSoon()}
        onFocusCapture={() => {
          stopDrift();
          clearTimeout(resumeTimer.current);
        }}
        onBlurCapture={() => resumeSoon()}
      >
        <div ref={trackRef} className={styles.track}>
          {slides.map(({ t, real, key }) => (
            <article className={styles.slide} key={key} aria-hidden={real ? undefined : true}>
              <Link
                href={`${t.route}/`}
                className={styles.card}
                data-slide-card={real ? "real" : "clone"}
                draggable={false}
                tabIndex={real ? undefined : -1}
                onClick={() =>
                  real &&
                  track("tour_details_click", {
                    tour_slug: t.slug,
                    destination: t.destination,
                    source: "slider",
                  })
                }
              >
                <span className={styles.media}>
                  <OptimizedImage image={t.heroImage} className={styles.img} />
                  <span className={styles.badge}>{t.availabilityLabel}</span>
                  <span className={styles.dur}>
                    <IconClock /> {t.durationLabel}
                  </span>
                </span>
                <span className={styles.body}>
                  <span className={styles.meta}>
                    <IconMapPin /> {t.departure}
                  </span>
                  <span className={styles.title}>{t.title}</span>
                  <span className={styles.foot}>
                    <span className={styles.price} data-testid="tour-price">
                      {priceLabel(t.price)} <span className={styles.unit}>{priceUnit(t.price)}</span>
                    </span>
                    <span className={styles.cta}>
                      Zobacz <IconArrowRight />
                    </span>
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Poprzednie wycieczki"
          onClick={() => step(-1)}
        >
          <IconArrowRight />
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Następne wycieczki"
          onClick={() => step(1)}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
