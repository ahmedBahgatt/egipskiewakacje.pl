import type { Motif } from "@/lib/experiences";
import styles from "./ExperienceVisual.module.css";

/**
 * Lightweight, brand-accented SVG motif for an experience family. Purely
 * decorative (aria-hidden, pointer-events:none via CSS - it can never intercept a
 * click). No external assets, no heavy animation library: just inline SVG line-art
 * tinted with the section accent. A subtle draw/float animation runs only when the
 * user has not requested reduced motion.
 */
export function ExperienceVisual({
  motif,
  accent,
  className,
}: {
  motif: Motif;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      className={`${styles.visual} ${className ?? ""}`}
      style={{ color: accent }}
      viewBox="0 0 240 84"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {MOTIFS[motif]}
    </svg>
  );
}

const S = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const FAINT = { ...S, strokeOpacity: 0.5 };

const MOTIFS: Record<Motif, React.ReactNode> = {
  history: (
    <g>
      <line x1="8" y1="66" x2="232" y2="66" {...FAINT} />
      <path d="M40 66 L64 30 L88 66 Z" {...S} />
      <path d="M96 66 L128 22 L160 66 Z" {...S} />
      <path d="M168 66 L186 40 L204 66 Z" {...FAINT} />
      <circle cx="200" cy="22" r="7" className={styles.floatA} {...FAINT} />
    </g>
  ),
  nile: (
    <g>
      <path d="M8 60 Q 60 48 120 58 T 232 54" className={styles.wave} {...S} />
      <path d="M8 70 Q 70 60 130 68 T 232 64" {...FAINT} />
      <line x1="150" y1="24" x2="150" y2="50" {...S} />
      <line x1="166" y1="24" x2="166" y2="50" {...S} />
      <line x1="182" y1="24" x2="182" y2="50" {...S} />
      <path d="M144 24 L188 24" {...S} />
      <path d="M140 18 L192 18" {...FAINT} />
    </g>
  ),
  cruise: (
    <g>
      <path d="M8 62 Q 60 54 120 60 T 232 58" className={styles.wave} {...S} />
      <path d="M8 72 Q 70 64 130 70 T 232 66" {...FAINT} />
      <path d="M96 54 L128 54 L120 64 L104 64 Z" {...S} />
      <path d="M112 54 L112 30 L134 48 Z" {...S} />
      <path d="M176 58 q 12 -18 24 0" {...FAINT} />
    </g>
  ),
  snorkel: (
    <g>
      <path d="M8 40 Q 60 30 120 38 T 232 34" className={styles.wave} {...FAINT} />
      <path d="M150 58 q 16 -12 32 0 q -16 12 -32 0 Z" {...S} />
      <path d="M182 58 l 14 -8 l 0 16 Z" {...S} />
      <circle cx="60" cy="60" r="3" className={styles.floatA} {...FAINT} />
      <circle cx="80" cy="52" r="2.2" className={styles.floatB} {...FAINT} />
      <circle cx="100" cy="62" r="2.6" className={styles.floatA} {...FAINT} />
    </g>
  ),
  diving: (
    <g>
      <line x1="24" y1="12" x2="24" y2="72" {...FAINT} />
      <line x1="20" y1="24" x2="28" y2="24" {...FAINT} />
      <line x1="20" y1="42" x2="28" y2="42" {...FAINT} />
      <line x1="20" y1="60" x2="28" y2="60" {...FAINT} />
      <path d="M150 40 a 18 12 0 1 0 0.1 0 Z" {...S} />
      <line x1="168" y1="46" x2="182" y2="46" {...S} />
      <circle cx="120" cy="30" r="3" className={styles.floatA} {...FAINT} />
      <circle cx="132" cy="20" r="2.2" className={styles.floatB} {...FAINT} />
      <circle cx="112" cy="18" r="1.8" className={styles.floatA} {...FAINT} />
    </g>
  ),
  safari: (
    <g>
      <path d="M8 64 Q 70 40 140 60 T 232 52" className={styles.dune} {...S} />
      <path d="M8 74 Q 80 58 150 72 T 232 66" {...FAINT} />
      <circle cx="196" cy="26" r="9" {...FAINT} />
      <path d="M40 68 l 8 0 M60 66 l 8 0 M80 68 l 8 0 M100 66 l 8 0" className={styles.trail} {...S} />
    </g>
  ),
  family: (
    <g>
      <circle cx="60" cy="42" r="14" {...S} />
      <path d="M110 56 L128 26 L146 56 Z" {...FAINT} />
      <rect x="170" y="30" width="26" height="26" rx="5" {...S} />
      <circle cx="60" cy="42" r="5" className={styles.floatA} {...FAINT} />
    </g>
  ),
  private: (
    <g>
      <path d="M16 64 Q 90 30 224 40" className={styles.route} {...S} strokeDasharray="2 7" />
      <circle cx="16" cy="64" r="4" {...S} />
      <path d="M224 40 q -8 -14 0 -20 q 8 6 0 20 Z" {...S} />
      <circle cx="224" cy="24" r="3" {...FAINT} />
    </g>
  ),
  sinai: (
    <g>
      <path d="M8 66 L64 26 L108 66 Z" {...S} />
      <path d="M96 66 L150 34 L200 66 Z" {...FAINT} />
      <path d="M198 20 l 3 7 l 7 1 l -5 5 l 1 7 l -6 -3 l -6 3 l 1 -7 l -5 -5 l 7 -1 Z" className={styles.floatA} {...FAINT} />
    </g>
  ),
  world: (
    <g>
      <circle cx="60" cy="42" r="24" {...S} />
      <path d="M36 42 h 48 M60 18 v 48" {...FAINT} />
      <path d="M44 28 q 16 14 32 0 M44 56 q 16 -14 32 0" {...FAINT} />
      <path d="M96 40 Q 160 20 224 36" className={styles.route} {...S} strokeDasharray="2 7" />
      <circle cx="224" cy="36" r="4" {...S} />
    </g>
  ),
};
