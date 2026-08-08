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
 * Static-export friendly responsive image. Serves AVIF -> WebP -> JPG from the
 * pre-generated variants (see scripts/generate-media.mjs). Explicit width/height
 * reserve space so there is no layout shift.
 */
export function OptimizedImage({
  image,
  priority = false,
  fit = "cover",
  className,
  rounded = false,
}: Props) {
  const { src, alt, width, height } = image;
  return (
    <picture className={`${styles.picture}${className ? ` ${className}` : ""}`}>
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
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
