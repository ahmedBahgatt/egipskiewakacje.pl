"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide motion setup.
 * - LazyMotion(domAnimation): defers the animation feature bundle so the initial
 *   JS stays small; components use the lightweight `m` component.
 * - MotionConfig reducedMotion="user": globally honours prefers-reduced-motion,
 *   so parallax/tilt/scroll-linked motion is disabled for users who ask for it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
