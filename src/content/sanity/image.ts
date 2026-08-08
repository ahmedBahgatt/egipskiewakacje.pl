import imageUrlBuilder from "@sanity/image-url";
import type { MediaImage } from "@/content/types";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ej04dib0";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder = imageUrlBuilder({ projectId: PROJECT_ID, dataset: DATASET });

/** Raw Sanity image object as projected by GROQ (asset ref + hotspot/crop + alt + dims). */
export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
  dimensions?: { width?: number; height?: number; aspectRatio?: number };
  lqip?: string;
}

const MAX_WIDTH = 1920;

/**
 * Map a Sanity image object to the frontend MediaImage shape with ready AVIF/WebP/
 * JPG CDN URLs (hotspot/crop applied via the builder). Intrinsic width/height keep
 * CLS at zero. Returns null when no asset is present.
 */
export function mapSanityImage(raw: SanityImage | null | undefined, fallbackAlt = ""): MediaImage | null {
  if (!raw || !raw.asset?._ref) return null;

  const dim = raw.dimensions ?? {};
  const intrinsicW = dim.width ?? 1600;
  const intrinsicH = dim.height ?? Math.round(intrinsicW * 0.625);
  const renderW = Math.min(intrinsicW, MAX_WIDTH);

  const base = builder.image(raw).width(renderW).fit("max");
  // AVIF is served via content negotiation (auto=format) under the image/avif
  // <source>, since the URL builder's format() does not accept "avif" directly.
  const avif = base.auto("format").quality(55).url();
  const webp = base.format("webp").quality(72).url();
  const jpg = base.format("jpg").quality(80).url();

  return {
    src: jpg,
    alt: raw.alt ?? fallbackAlt,
    width: intrinsicW,
    height: intrinsicH,
    sources: { avif, webp, jpg },
    lqip: raw.lqip,
  };
}
