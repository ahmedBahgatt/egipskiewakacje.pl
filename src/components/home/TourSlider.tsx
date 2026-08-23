"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin } from "@/components/ui/icons";
import { priceLabel, priceUnit } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Tour } from "@/content/types";
import styles from "./TourSlider.module.css";

/**
 * Bestseller carousel built on ONE interaction model: a native horizontal
 * scroll-snap rail. On touch the user swipes with real momentum and each swipe
 * settles on exactly one card (`scroll-snap-align: start` + `scroll-snap-stop:
 * always`); no transform track is layered on top, so the finger is never fought.
 *
 * Desktop keeps the premium feel: prev/next arrows nudge one card at a time and a
 * gentle autoplay advances the rail, pausing on hover/focus, when the tab is
 * hidden, on touch devices, and for reduced-motion users. Arrows are hidden on
 * coarse-pointer devices where the swipe is the primary control.
 *
 * Real Egipskie Wakacje tour data only - no invented tours, prices or ratings.
 */
export function TourSlider({ tours }: { tours: Tour[] }) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);

  // One "card + gap" step, measured from the live DOM so it stays correct across
  // the responsive card width.
  const stepWidth = () => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const first = vp.firstElementChild as HTMLElement | null;
    if (!first) return vp.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(vp).columnGap || "0") || 20;
    return first.offsetWidth + gap;
  };

  const nudge = (dir: 1 | -1) => {
    viewportRef.current?.scrollBy({ left: dir * stepWidth(), behavior: "smooth" });
  };

  // Desktop-only gentle autoplay. Disabled on touch and reduced motion; paused on
  // hover/focus and while the tab is hidden. Loops back to the start at the end.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || reduce) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    vp.addEventListener("pointerenter", pause);
    vp.addEventListener("pointerleave", resume);
    vp.addEventListener("focusin", pause);
    vp.addEventListener("focusout", resume);

    const id = window.setInterval(() => {
      if (paused || document.hidden) return;
      const maxScroll = vp.scrollWidth - vp.clientWidth;
      if (vp.scrollLeft >= maxScroll - 4) {
        vp.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        vp.scrollBy({ left: stepWidth(), behavior: "smooth" });
      }
    }, 4800);

    return () => {
      window.clearInterval(id);
      vp.removeEventListener("pointerenter", pause);
      vp.removeEventListener("pointerleave", resume);
      vp.removeEventListener("focusin", pause);
      vp.removeEventListener("focusout", resume);
    };
  }, [reduce, tours.length]);

  return (
    <div className={styles.wrap}>
      <div ref={viewportRef} className={styles.viewport}>
        {tours.map((t) => (
          <article className={styles.slide} key={t.slug}>
            <Link
              href={`${t.route}/`}
              className={styles.card}
              draggable={false}
              onClick={() =>
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
