"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import type { ItineraryStep } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ItineraryTimeline.module.css";

/**
 * Itinerary with a scroll-linked progress rail. The rail is a pure enhancement:
 * every step is fully readable without motion, the layout never traps scroll,
 * and reduced-motion users simply see a static rail.
 */
export function ItineraryTimeline({ steps }: { steps: ItineraryStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.wrap}>
      <div className={styles.rail} aria-hidden="true">
        <m.div className={styles.railFill} style={{ scaleY }} />
      </div>
      <ol className={styles.timeline} ref={ref}>
        {steps.map((step, i) => (
          <Reveal as="li" key={i} delay={i * 0.04} className={styles.step}>
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.content}>
              {step.time && <span className={styles.time}>{step.time}</span>}
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
