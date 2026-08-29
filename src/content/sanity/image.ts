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
/** Delivery-size ladder. The frontend generates these from ONE stored master. */
const WIDTH_LADDER = [480, 768, 1080, 1600, 1920];

/**
 * Map a Sanity image object to the frontend MediaImage shape. The dataset stores
 * ONE master asset per image; here the CDN generates a responsive ladder of
 * delivery sizes (hotspot/crop applied via the builder). `sources` holds a full
 * AVIF/WebP/JPG srcSet candidate list per format (so a phone never downloads a
 * desktop-sized file), `src` is a single JPG fallback for `<img src>`, and
 * `widths` signals OptimizedImage to emit `sizes`. Intrinsic width/height keep
 * CLS at zero. Returns null when no asset is present.
 */
export function mapSanityImage(raw: SanityImage | null | undefined, fallbackAlt = ""): MediaImage | null {
  if (!raw || !raw.asset?._ref) return null;

  const dim = raw.dimensions ?? {};
  const intrinsicW = dim.width ?? 1600;
  const intrinsicH = dim.height ?? Math.round(intrinsicW * 0.625);
  const cap = Math.min(intrinsicW, MAX_WIDTH);
  const widths = [...new Set([...WIDTH_LADDER.filter((w) => w < cap), cap])].sort((a, b) => a - b);

  const at = (w: number) => builder.image(raw).width(w).fit("max");
  // AVIF is served via content negotiation (auto=format) since the URL builder's
  // format() does not accept "avif" directly.
  const candidates = (fmt: "avif" | "webp" | "jpg") =>
    widths
      .map((w) => {
        const b = at(w);
        const url =
          fmt === "avif"
            ? b.auto("format").quality(55).url()
            : b.format(fmt).quality(fmt === "webp" ? 72 : 80).url();
        return `${url} ${w}w`;
      })
      .join(", ");

  const fallbackJpg = at(cap).format("jpg").quality(80).url();

  return {
    src: fallbackJpg,
    alt: raw.alt ?? fallbackAlt,
    width: intrinsicW,
    height: intrinsicH,
    sources: { avif: candidates("avif"), webp: candidates("webp"), jpg: candidates("jpg") },
    widths,
    lqip: raw.lqip,
  };
}
