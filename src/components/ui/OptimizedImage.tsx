import type { MediaImage } from "@/content/types";
import styles from "./OptimizedImage.module.css";

interface Props {
  image: MediaImage;
  /** Eager-load + high priority (use only for the LCP image). */
  priority?: boolean;
  /** Cover (default) fills its box; contain fits inside. */
  fit?: "cover" | "contain";
  className?: string;
  /** Responsive `sizes` hint - only used when the image has generated `widths`. */
  sizes?: string;
  rounded?: boolean;
  /** CSS object-position for the cover crop, e.g. "center 40%". Falls back to image.objectPosition. */
  objectPosition?: string;
}

/**
 * Static-export friendly responsive image. Serves AVIF -> WebP -> JPG. Sources are:
 * - Sanity-hosted images: ready CDN transform URLs on `image.sources`.
 * - Responsive local images (`image.widths` set): width-suffixed variants
 *   (`${src}-${w}.avif|.webp|.jpg`) emitted as a srcSet + `sizes` so small
 *   viewports fetch small files (scripts/generate-tour-gallery.mjs).
 * - Plain local images: a single `${src}.avif|.webp|.jpg` triplet.
 * Explicit width/height reserve space so there is no layout shift.
 */
export function OptimizedImage({
  image,
  priority = false,
  fit = "cover",
  className,
  sizes,
  rounded = false,
  objectPosition,
}: Props) {
  const { src, alt, width, height, sources, widths } = image;
  const pos = objectPosition ?? image.objectPosition;

  const responsive = !sources && Array.isArray(widths) && widths.length > 0;
  const maxW = responsive ? widths[widths.length - 1] : undefined;

  const avif = sources?.avif ?? (responsive ? undefined : `${src}.avif`);
  const webp = sources?.webp ?? (responsive ? undefined : `${src}.webp`);
  const jpg = sources?.jpg ?? (responsive ? `${src}-${maxW}.jpg` : `${src}.jpg`);

  const srcSet = (ext: "avif" | "webp" | "jpg") =>
    responsive ? widths!.map((w) => `${src}-${w}.${ext} ${w}w`).join(", ") : undefined;

  return (
    <picture className={`${styles.picture}${className ? ` ${className}` : ""}`}>
      <source
        {...(responsive ? { srcSet: srcSet("avif"), sizes } : { srcSet: avif })}
        type="image/avif"
      />
      <source
        {...(responsive ? { srcSet: srcSet("webp"), sizes } : { srcSet: webp })}
        type="image/webp"
      />
      <img
        src={jpg}
        {...(responsive ? { srcSet: srcSet("jpg"), sizes } : null)}
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
        style={{ aspectRatio: `${width} / ${height}`, ...(pos ? { objectPosition: pos } : null) }}
      />
    </picture>
  );
}
