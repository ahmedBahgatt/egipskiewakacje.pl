"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin } from "@/components/ui/icons";
import { priceLabel, priceUnit } from "@/lib/format";
import { normalizeIndex } from "@/lib/carousel";
import { track } from "@/lib/analytics";
import type { Tour } from "@/content/types";
import styles from "./TourSlider.module.css";

const AUTOPLAY_MS = 4200; // dwell per card position
const RESUME_MS = 5000; // idle delay before autoplay resumes after interaction
const STEP_MS = 620; // one card transition (keep in sync with the easing below)
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Bestseller carousel - a TRUE infinite loop.
 *
 * The track renders three consecutive copies of the tour list
 * `[cloneA][real][cloneB]` and is moved with a single GPU `translate3d` transition
 * per card step (no per-frame JS, no native scroll). The logical index starts in
 * the middle (real) block; whenever a step lands in a clone block the position is
 * normalised by exactly one block width with the transition disabled, so the jump
 * is pixel-identical and invisible. Result: autoplay, arrows and drag all continue
 * forever in both directions with no beginning, end, rewind or blank gap.
 *
 * Autoplay pauses on hover/focus/drag and while the tab is hidden, and resumes from
 * the CURRENT card after an idle delay. Reduced-motion disables autoplay and makes
 * steps instant; manual navigation still works. Real tour data only - clones are
 * UI-only (aria-hidden, not focusable) and add no duplicate IDs or JSON-LD.
 */
export function TourSlider({ tours }: { tours: Tour[] }) {
  const reduce = useReducedMotion();
  const n = tours.length;

  const slides = useMemo(
    () =>
      n === 0
        ? []
        : (["a", "real", "b"] as const).flatMap((copy) =>
            tours.map((t, i) => ({ t, copy, real: copy === "real", key: `${copy}-${t.slug}-${i}` })),
          ),
    [tours, n],
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef(n); // start at the first REAL card
  const stepRef = useRef(0); // card width + gap, measured
  const animRef = useRef(false); // whether the transition is currently enabled
  const drag = useRef({ active: false, startX: 0, dx: 0, moved: 0 });
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const transition = useCallback(
    () => (animRef.current && !reduce ? `transform ${STEP_MS}ms ${EASE}` : "none"),
    [reduce],
  );

  const paint = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const x = -(indexRef.current * stepRef.current) + drag.current.dx;
    el.style.transition = transition();
    el.style.transform = `translate3d(${x}px, 0, 0)`;
  }, [transition]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    stepRef.current = first.offsetWidth + gap;
    animRef.current = false; // never animate a resize reflow
    paint();
  }, [paint]);

  const goTo = useCallback(
    (i: number) => {
      animRef.current = true;
      indexRef.current = i;
      paint();
    },
    [paint],
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // Silent boundary normalisation: keep the index inside the middle [n, 2n) block
  // by jumping exactly one block (visually identical) with the transition off.
  const normalize = useCallback(() => {
    const i = normalizeIndex(indexRef.current, n);
    if (i === indexRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    animRef.current = false;
    indexRef.current = i;
    el.style.transition = "none";
    el.style.transform = `translate3d(${-(i * stepRef.current)}px, 0, 0)`;
    void el.offsetWidth; // force reflow so the next step animates from here
  }, [n]);

  // --- autoplay ------------------------------------------------------------
  useEffect(() => {
    if (n === 0 || reduce) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden || drag.current.active) return;
      next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, reduce, next]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
  }, []);
  const resumeSoon = useCallback((ms: number) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  }, []);

  // --- mount: measure + observe resize + normalise on transition end -------
  useEffect(() => {
    const track = trackRef.current;
    const vp = viewportRef.current;
    if (!track || !vp) return;

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);

    const onEnd = (e: TransitionEvent) => {
      if (e.target === track && e.propertyName === "transform") normalize();
    };
    track.addEventListener("transitionend", onEnd);

    const onVis = () => {
      if (!document.hidden) resumeSoon(RESUME_MS);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      ro.disconnect();
      track.removeEventListener("transitionend", onEnd);
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(resumeTimer.current);
    };
  }, [measure, normalize, resumeSoon]);

  // --- pointer drag --------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startX: e.clientX, dx: 0, moved: 0 };
    animRef.current = false;
    pause();
    viewportRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.dx = dx;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    paint();
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const { dx } = drag.current;
    drag.current.active = false;
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    const step = stepRef.current || 1;
    // Convert the dragged position to the nearest logical card; a decisive short
    // flick still advances exactly one card.
    let target = Math.round(indexRef.current - dx / step);
    if (target === indexRef.current && Math.abs(dx) > step * 0.12) {
      target = indexRef.current - Math.sign(dx);
    }
    drag.current.dx = 0;
    goTo(target);
    resumeSoon(RESUME_MS);
  };
  // A drag must not fire the card's link navigation.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (n === 0) return null;

  return (
    <div className={styles.wrap}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onMouseEnter={pause}
        onMouseLeave={() => resumeSoon(RESUME_MS)}
        onFocusCapture={pause}
        onBlurCapture={() => resumeSoon(RESUME_MS)}
      >
        <div ref={trackRef} className={styles.track}>
          {slides.map(({ t, real, key }) => (
            <article className={styles.slide} key={key} aria-hidden={real ? undefined : true}>
              <Link
                href={`${t.route}/`}
                className={styles.card}
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
                    <span className={styles.price}>
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
          onClick={() => {
            pause();
            prev();
            resumeSoon(RESUME_MS);
          }}
        >
          <IconArrowRight />
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Następne wycieczki"
          onClick={() => {
            pause();
            next();
            resumeSoon(RESUME_MS);
          }}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
