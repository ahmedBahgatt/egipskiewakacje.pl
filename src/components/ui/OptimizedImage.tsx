import type { MediaImage } from "@/content/types";
import styles from "./OptimizedImage.module.css";

interface Props {
  image: MediaImage;
  /** Eager-load + high priority (use only for the LCP image). */
  priority?: boolean;
  /** Cover (default) fills its box; contain fits inside. */
  fit?: "cover" | "contain";
  className?: string;
  sizes?: string;
  rounded?: boolean;
}

/**
 * Static-export friendly responsive image. Serves AVIF -> WebP -> JPG. Sources are
 * either the pre-generated local variants (scripts/generate-media.mjs) or, for
 * Sanity-hosted images, ready CDN transform URLs on `image.sources`. Explicit
 * width/height reserve space so there is no layout shift.
 */
export function OptimizedImage({
  image,
  priority = false,
  fit = "cover",
  className,
  rounded = false,
}: Props) {
  const { src, alt, width, height, sources } = image;
  const avif = sources?.avif ?? `${src}.avif`;
  const webp = sources?.webp ?? `${src}.webp`;
  const jpg = sources?.jpg ?? `${src}.jpg`;
  return (
    <picture className={`${styles.picture}${className ? ` ${className}` : ""}`}>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        // fetchPriority is a valid DOM attr; React 19 forwards it lowercased.
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "auto" : "async"}
        className={`${styles.img} ${fit === "contain" ? styles.contain : styles.cover} ${
          rounded ? styles.rounded : ""
        }`}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </picture>
  );
}
