import styles from "./Logo.module.css";

type LogoContext = "header" | "footer" | "drawer";

interface LogoProps {
  /**
   * Where the lockup is used - drives sizing and tagline visibility:
   * - `header`  compact; tagline appears from 900px up, name hides on ultra-narrow.
   * - `footer`  larger; tagline always visible.
   * - `drawer`  compact; no tagline.
   */
  context?: LogoContext;
  /** Brand name text (also the accessible name via the wrapping link's aria-label). */
  title?: string;
  className?: string;
}

// Trimmed aspect of the approved square crest (portrait).
const MARK_ASPECT = 911 / 1167;

/**
 * Egipskie Wakacje brand lockup ("Brama opieki": a golden gateway framing the
 * pyramids, sun and Red Sea over a supportive hand). The standalone crest is a
 * small transparent raster; the wordmark is live text so it stays crisp at any
 * size and re-colours per surface via `currentColor` (navy on the cream header,
 * white over the dark hero and on the navy footer). The tagline is a subtle gold
 * flourish. The full horizontal raster lockup is reserved for share/schema use.
 */
export function Logo({ context = "header", title = "Egipskie Wakacje", className }: LogoProps) {
  const markH = context === "footer" ? 56 : 46;
  return (
    <span className={`${styles.logo} ${styles[context]}${className ? ` ${className}` : ""}`}>
      <picture>
        <source srcSet="/media/brand/logo-mark.webp" type="image/webp" />
        <img
          src="/media/brand/logo-mark.png"
          alt=""
          aria-hidden="true"
          className={styles.crest}
          width={Math.round(markH * MARK_ASPECT)}
          height={markH}
          loading="eager"
          decoding="async"
        />
      </picture>
      <span className={styles.word}>
        <span className={styles.brand}>{title}</span>
        {context !== "drawer" && <span className={styles.tag}>Wycieczki po polsku</span>}
      </span>
    </span>
  );
}
