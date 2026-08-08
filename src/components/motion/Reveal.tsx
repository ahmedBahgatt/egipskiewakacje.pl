"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as an <li> when the parent is a <ul>/<ol> (keeps valid list semantics). */
  as?: "div" | "li";
}

/**
 * Scroll-reveal wrapper. With reduced motion (MotionConfig reducedMotion="user")
 * the vertical shift is dropped and only a gentle fade remains. The `data-reveal`
 * attribute lets a <noscript> rule force full visibility when JS is unavailable,
 * so reading never depends on animation.
 */
export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
