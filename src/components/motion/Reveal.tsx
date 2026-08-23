"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as an <li> when the parent is a <ul>/<ol> (keeps valid list semantics). */
  as?: "div" | "li";
}

/**
 * Scroll-reveal wrapper. CRITICAL RULE: content is fully OPAQUE by default - the
 * reveal only animates a small vertical translate as progressive enhancement, so a
 * slow device (older iPhone/Safari) never scrolls into a blank section waiting for
 * JS to un-hide it. A single IntersectionObserver is shared by every Reveal on the
 * page (Framer's `whileInView` created one observer per element); each element is
 * revealed once then unobserved. With prefers-reduced-motion the translate is
 * dropped entirely (see the CSS), and a <noscript> rule (layout.tsx) neutralises
 * the transform when JS is unavailable - reading never depends on animation.
 */
let sharedObserver: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.setAttribute("data-revealed", "true");
}

function observe(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    reveal(el);
    return;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            sharedObserver!.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
  }
  sharedObserver.observe(el);
}

export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getAttribute("data-revealed") === "true") return;
    observe(el);
    return () => sharedObserver?.unobserve(el);
  }, []);

  const Comp = as as "div";
  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal
      className={`${styles.reveal}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Comp>
  );
}
