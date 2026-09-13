import type { MediaImage } from "@/content/types";
import { absoluteUrl } from "@/content/config";

/** Resolve an OG image reference (path or absolute URL) to an absolute URL. */
export function ogImageUrl(ogImage: string): string {
  return ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
}

/**
 * The single absolute JPG URL for a MediaImage - the ONLY helper for contexts
 * that need exactly one URL: Open Graph / Twitter social images and every
 * schema.org / JSON-LD image field (`image`, `logo`, `thumbnailUrl`, ...).
 * It always returns ONE URL, never a srcSet / multi-candidate string:
 * - Sanity images carry a ready single-JPG fallback (absolute CDN URL) in `src`
 *   (`sources.jpg` is a responsive srcSet string - only for <img>/<picture>).
 * - Local responsive images use the largest pre-generated width.
 * - Local single-variant images append `.jpg`.
 */
export function mediaOgImageUrl(image: MediaImage): string {
  if (image.sources?.jpg) return image.src;
  if (image.widths?.length) {
    const maxW = image.widths[image.widths.length - 1];
    return absoluteUrl(`${image.src}-${maxW}.jpg`);
  }
  return absoluteUrl(`${image.src}.jpg`);
}
