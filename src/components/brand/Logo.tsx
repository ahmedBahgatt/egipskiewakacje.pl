import styles from "./Logo.module.css";

interface LogoProps {
  /** Kept for API compatibility - the real lockup always carries the wordmark. */
  withWordmark?: boolean;
  /** Kept for API compatibility - the full-colour lockup reads on light and dark. */
  mono?: boolean;
  /** Accessible name for the logo image. */
  title?: string;
  className?: string;
  /** Rendered height in px; width scales with the lockup's aspect ratio. */
  size?: number;
}

// Trimmed content aspect ratio of the real Egipskie Wakacje logo lockup.
const ASPECT = 1422 / 958;

/**
 * Egipskie Wakacje brand lockup (real artwork: a yacht on the Red Sea, golden
 * sun over the Giza pyramids and Sphinx, with the gold-outlined wordmark). The
 * source PNG has a transparent background, so the same asset reads correctly on
 * the transparent homepage hero header and the solid light inner-page header.
 * A small, height-optimised raster keeps it crisp on hi-dpi without shipping the
 * full-size illustration into the header.
 */
export function Logo({ title = "Egipskie Wakacje", className, size = 52 }: LogoProps) {
  const height = size;
  const width = Math.round(height * ASPECT);
  return (
    <span className={`${styles.logo}${className ? ` ${className}` : ""}`}>
      <picture>
        <source srcSet="/media/brand/logo-header.webp" type="image/webp" />
        <img
          src="/media/brand/logo-header.png"
          alt={title}
          width={width}
          height={height}
          className={styles.mark}
          loading="eager"
          decoding="async"
        />
      </picture>
    </span>
  );
}
