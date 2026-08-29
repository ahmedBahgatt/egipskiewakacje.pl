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
 * Static-export friendly responsive image. Serves AVIF -> WebP -> JPG. Three cases:
 * - Sanity-hosted images (`image.sources` set to per-format srcSet candidate
 *   lists + `image.widths`): the CDN ladder is emitted as a srcSet + `sizes`;
 *   `image.src` is the single JPG fallback (see src/content/sanity/image.ts).
 * - Responsive local images (`image.widths` set, no `sources`): width-suffixed
 *   variants (`${src}-${w}.avif|.webp|.jpg`) emitted as a srcSet + `sizes` so
 *   small viewports fetch small files (scripts/generate-tour-gallery.mjs).
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

  const hasWidths = Array.isArray(widths) && widths.length > 0;
  const localResponsive = !sources && hasWidths;
  // Sanity images carry both `sources` (srcSet candidate lists) and `widths`.
  const useSizes = hasWidths;
  const maxW = hasWidths ? widths![widths!.length - 1] : undefined;

  // Per-format value passed to <source srcSet> (either a CDN candidate list from
  // `sources`, a local width srcSet, or a single-URL local triplet).
  const avifSet =
    sources?.avif ?? (localResponsive ? widths!.map((w) => `${src}-${w}.avif ${w}w`).join(", ") : `${src}.avif`);
  const webpSet =
    sources?.webp ?? (localResponsive ? widths!.map((w) => `${src}-${w}.webp ${w}w`).join(", ") : `${src}.webp`);
  // JPG srcSet only exists for responsive cases; plain local has none (uses <img src>).
  const jpgSet = sources?.jpg ?? (localResponsive ? widths!.map((w) => `${src}-${w}.jpg ${w}w`).join(", ") : undefined);

  // Single URL for <img src>: Sanity provides it directly; local builds it.
  const imgSrc = sources ? src : localResponsive ? `${src}-${maxW}.jpg` : `${src}.jpg`;

  return (
    <picture className={`${styles.picture}${className ? ` ${className}` : ""}`}>
      <source srcSet={avifSet} {...(useSizes ? { sizes } : null)} type="image/avif" />
      <source srcSet={webpSet} {...(useSizes ? { sizes } : null)} type="image/webp" />
      <img
        src={imgSrc}
        {...(jpgSet ? { srcSet: jpgSet } : null)}
        {...(useSizes ? { sizes } : null)}
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
