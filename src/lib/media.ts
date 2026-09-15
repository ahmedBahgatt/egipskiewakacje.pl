import type { MediaImage } from "@/content/types";
import { absoluteUrl } from "@/content/config";

/**
 * Resolve an OG image reference (path or absolute URL) to a single absolute,
 * social-safe URL.
 *
 * Sanity-hosted images are served through a bounded CDN derivative
 * (1200x630, JPEG, q80, focal-point crop) so a heavy original - e.g. a 2.6 MB
 * PNG - never exceeds WhatsApp/Meta's ~600 KB preview limit and silently falls
 * back to the site logo. Same asset, resized + re-encoded on the fly; the
 * derived size also matches the og:image:width/height we declare (1200x630).
 * Non-Sanity references (local /media logo, already-parameterised URLs) pass
 * through unchanged.
 */
export function ogImageUrl(ogImage: string): string {
  const url = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
  if (url.includes("cdn.sanity.io/images/") && !url.includes("?")) {
    return `${url}?w=1200&h=630&fit=crop&fm=jpg&q=80`;
  }
  return url;
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
