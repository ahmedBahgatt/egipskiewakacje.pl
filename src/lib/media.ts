import type { MediaImage } from "@/content/types";
import { absoluteUrl } from "@/content/config";

/**
 * Absolute JPG URL for an image, used by Open Graph and JSON-LD.
 * - Sanity images already carry absolute CDN URLs in `sources`.
 * - Local images are a base path; append .jpg and make absolute.
 */
export function imageJpgUrl(image: MediaImage): string {
  if (image.sources?.jpg) return image.sources.jpg;
  if (image.widths?.length) {
    const maxW = image.widths[image.widths.length - 1];
    return absoluteUrl(`${image.src}-${maxW}.jpg`);
  }
  return absoluteUrl(`${image.src}.jpg`);
}

/** Resolve an OG image reference (path or absolute URL) to an absolute URL. */
export function ogImageUrl(ogImage: string): string {
  return ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
}

/**
 * A single absolute JPG URL for a MediaImage, for use as an OG/Twitter social
 * image. Unlike `imageJpgUrl` (whose Sanity branch returns a multi-candidate
 * srcSet string), this always returns ONE URL:
 * - Sanity images carry a ready single-JPG fallback (absolute CDN URL) in `src`.
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
