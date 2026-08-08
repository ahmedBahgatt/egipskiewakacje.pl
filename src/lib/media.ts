import type { MediaImage } from "@/content/types";
import { absoluteUrl } from "@/content/config";

/**
 * Absolute JPG URL for an image, used by Open Graph and JSON-LD.
 * - Sanity images already carry absolute CDN URLs in `sources`.
 * - Local images are a base path; append .jpg and make absolute.
 */
export function imageJpgUrl(image: MediaImage): string {
  if (image.sources?.jpg) return image.sources.jpg;
  return absoluteUrl(`${image.src}.jpg`);
}

/** Resolve an OG image reference (path or absolute URL) to an absolute URL. */
export function ogImageUrl(ogImage: string): string {
  return ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
}
