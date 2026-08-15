"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { m, useMotionValue, useAnimationFrame, animate, useReducedMotion } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin } from "@/components/ui/icons";
import { priceLabel, priceUnit } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Tour } from "@/content/types";
import styles from "./TourSlider.module.css";

/**
 * Premium continuously-looping bestseller carousel. The track holds two copies of
 * the tour list and drifts left; when a whole set has scrolled past it is wrapped
 * back, so the loop is seamless. Manual prev/next arrows and pointer/touch drag
 * are supported; autoplay pauses on hover, focus, drag and when off-screen. With
 * reduced motion the autodrift is disabled - arrows and swipe still work.
 *
 * Adapted from the atrakcjeegiptu.pl homepage rail (scroll rail + arrow nudge),
 * upgraded here to a seamless auto-looping transform track. Uses real Egipskie
 * Wakacje tour data - no invented tours, prices, ratings or availability.
 */
export function TourSlider({ tours }: { tours: Tour[] }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const half = useRef(0);
  const paused = useRef(false);
  const inView = useRef(true);
  const drag = useRef({ active: false, moved: 0, startX: 0, startVal: 0 });
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const SPEED = 26; // px per second - slow, premium drift

  // Two copies so the transform track can loop without a visible seam.
  const slides = [...tours, ...tours];

  const measure = () => {
    const t = trackRef.current;
    if (t) half.current = t.scrollWidth / 2;
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    const vp = viewportRef.current;
    if (trackRef.current) ro.observe(trackRef.current);
    const io = vp
      ? new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0 })
      : null;
    if (vp && io) io.observe(vp);
    return () => {
      ro.disconnect();
      io?.disconnect();
      clearTimeout(resumeTimer.current);
    };
  }, [tours.length]);

  const wrap = (v: number) => {
    const w = half.current;
    if (!w) return v;
    if (v <= -w) return v + w;
    if (v > 0) return v - w;
    return v;
  };

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || drag.current.active || !inView.current) return;
    x.set(wrap(x.get() - (SPEED * delta) / 1000));
  });

  const stepWidth = () => {
    const t = trackRef.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return 320;
    const gap = parseFloat(getComputedStyle(t).columnGap || "0") || 20;
    return first.offsetWidth + gap;
  };

  const pauseThenResume = (ms: number) => {
    paused.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  };

  const nudge = (dir: number) => {
    pauseThenResume(1800);
    animate(x, wrap(x.get() - dir * stepWidth()), { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
  };

  const onDown = (e: React.PointerEvent) => {
    drag.current = { active: true, moved: 0, startX: e.clientX, startVal: x.get() };
    viewportRef.current?.setPointerCapture(e.pointerId);
    clearTimeout(resumeTimer.current);
    paused.current = true;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    x.set(wrap(drag.current.startVal + dx));
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    pauseThenResume(1400);
  };
  // A swipe must not trigger the card's link navigation.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className={styles.wrap}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
        onMouseEnter={() => {
          if (!drag.current.active) paused.current = true;
        }}
        onMouseLeave={() => {
          if (!drag.current.active) paused.current = false;
        }}
        onFocusCapture={() => {
          paused.current = true;
        }}
        onBlurCapture={() => {
          paused.current = false;
        }}
      >
        <m.div ref={trackRef} className={styles.track} style={{ x }}>
          {slides.map((t, i) => {
            const clone = i >= tours.length;
            return (
              <article
                className={styles.slide}
                key={`${t.slug}-${i}`}
                aria-hidden={clone || undefined}
              >
                <Link
                  href={`${t.route}/`}
                  className={styles.card}
                  draggable={false}
                  tabIndex={clone ? -1 : undefined}
                  onClick={() =>
                    !clone &&
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
            );
          })}
        </m.div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Poprzednie wycieczki"
          onClick={() => nudge(-1)}
        >
          <IconArrowRight />
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Następne wycieczki"
          onClick={() => nudge(1)}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
