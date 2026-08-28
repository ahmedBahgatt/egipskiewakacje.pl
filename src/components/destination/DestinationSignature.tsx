import type { ReactNode } from "react";
import type { DestinationSlug } from "@/content/types";
import styles from "./DestinationSignature.module.css";

/**
 * A small, purely-visual bridge between the PageIntro/Quick Facts block and the
 * "Praktycznie" section on a destination hub. It gives each resort its own quiet
 * identity (an inline line-art motif) plus one short, factual Polish sentence -
 * without repeating the functional category navigation that lives further down in
 * "Wycieczki ... wedlug rodzaju".
 *
 * Same idiom as {@link ExperienceVisual}: inline SVG line-art tinted with brand
 * tokens (turquoise base, gold sun, faint navy landforms), no external assets, no
 * JS. A whisper of CSS motion runs only when reduced motion is not requested.
 */
const S = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const FAINT = { ...S, strokeOpacity: 0.45 };
const GOLD = { ...S, stroke: "var(--gold-600)" };
const NAVY = { ...S, stroke: "var(--navy-900)", strokeOpacity: 0.4 };

/** A tiny sun: circle + evenly spaced rays, tinted gold. */
function Sun({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={round(cx + Math.cos(a) * (r + 3))}
        y1={round(cy + Math.sin(a) * (r + 3))}
        x2={round(cx + Math.cos(a) * (r + 6))}
        y2={round(cy + Math.sin(a) * (r + 6))}
        {...GOLD}
      />
    );
  });
  return (
    <g className={styles.floatA}>
      <circle cx={cx} cy={cy} r={r} {...GOLD} />
      {rays}
    </g>
  );
}
const round = (n: number) => Math.round(n * 10) / 10;

const MOTIF: Record<DestinationSlug, ReactNode> = {
  // Red Sea + desert safari + historic direction (Cairo/Luxor): sun, sail boat,
  // a faint pyramid, and the sea below.
  hurghada: (
    <g>
      <Sun cx={24} cy={19} />
      <path d="M74 45 L90 23 L106 45 Z" {...NAVY} />
      <path d="M50 45 L66 45 L62 51 L54 51 Z" {...S} />
      <path d="M60 45 L60 27 L73 43 Z" {...S} />
      <path d="M6 53 Q 32 47 62 53 T 114 51" className={styles.wave} {...S} />
      <path d="M6 59 Q 36 54 66 59 T 114 57" {...FAINT} />
    </g>
  ),
  // Reef/marine, Red Sea coast: sun, a jumping dolphin arc, reef nodules, sea.
  "marsa-alam": (
    <g>
      <Sun cx={22} cy={19} />
      <path d="M62 47 q 11 -27 23 -3" {...S} />
      <path d="M85 44 l 7 -4 l -1 8 Z" {...S} />
      <path d="M30 57 q 4 -8 8 0 M42 57 q 5 -10 10 0" {...FAINT} />
      <path d="M6 53 Q 32 47 62 53 T 114 51" className={styles.wave} {...S} />
      <path d="M6 59 Q 36 54 66 59 T 114 57" {...FAINT} />
    </g>
  ),
  // Sinai mountains, summit star, Red Sea below, sun.
  "sharm-el-sheikh": (
    <g>
      <Sun cx={98} cy={18} r={6} />
      <path d="M8 47 L34 19 L56 47 Z" {...S} />
      <path d="M46 47 L68 27 L88 47 Z" {...NAVY} />
      <path
        d="M34 11 l 1.4 3.3 l 3.6 0.5 l -2.6 2.5 l 0.6 3.6 l -3-1.7 l -3 1.7 l 0.6-3.6 l -2.6-2.5 l 3.6-0.5 Z"
        className={styles.floatB}
        {...GOLD}
      />
      <path d="M6 56 Q 34 50 64 56 T 114 54" className={styles.wave} {...S} />
      <path d="M6 61 Q 38 56 68 61 T 114 59" {...FAINT} />
    </g>
  ),
};

const COPY: Record<DestinationSlug, string> = {
  hurghada:
    "Morze Czerwone, pustynne safari i wygodny dojazd do Kairu oraz Luksoru w jednym miejscu.",
  "marsa-alam":
    "Rafy, spotkania z delfinami i żółwiami oraz spokojny klimat wybrzeża Morza Czerwonego.",
  "sharm-el-sheikh":
    "Rafy Synaju, Góra Mojżesza, pustynne trasy i dalekie wyprawy - aż po Jordanię.",
};

export function DestinationSignature({
  slug,
  className,
}: {
  slug: DestinationSlug;
  className?: string;
}) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.rule} aria-hidden="true" />
        <svg
          className={styles.motif}
          viewBox="0 0 120 64"
          fill="none"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          {MOTIF[slug]}
        </svg>
        <span className={`${styles.rule} ${styles.ruleEnd}`} aria-hidden="true" />
      </div>
      <p className={styles.line}>{COPY[slug]}</p>
    </div>
  );
}
