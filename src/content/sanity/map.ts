import type {
  BlogPost,
  Destination,
  DestinationSlug,
  FaqItem,
  LegalPage,
  MediaImage,
  PostBlock,
  Review,
  SeoMeta,
  SiteSettings,
  Tour,
} from "@/content/types";
import { mapSanityImage, type SanityImage } from "./image";

/** Slugify Polish text for heading anchors (diacritics -> ascii). */
const PL: Record<string, string> = {
  ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
};
export function slugifyPl(text: string): string {
  return (text || "")
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => PL[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- raw shapes (loosely typed GROQ results) --------------------------------
interface RawSeo {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
}
interface RawBlock {
  _type?: string;
  text?: string;
  id?: string;
  ordered?: boolean;
  items?: string[];
  tone?: string;
  image?: SanityImage;
  caption?: string;
  images?: SanityImage[];
  cite?: string;
  headers?: string[];
  rows?: { cells?: string[] }[];
  label?: string;
  href?: string;
  external?: boolean;
  tourSlug?: string;
}

function mapSeo(raw: RawSeo | undefined): SeoMeta {
  return {
    title: raw?.title ?? "",
    description: raw?.description ?? "",
    canonicalPath: raw?.canonicalPath ?? "/",
    ogImage: raw?.ogImage || undefined,
  };
}

function mapFaqs(raw: { question?: string; answer?: string }[] | undefined): FaqItem[] {
  return (raw ?? [])
    .filter((f) => f.question && f.answer)
    .map((f) => ({ question: f.question as string, answer: f.answer as string }));
}

/** Map the safe, closed set of body blocks; unknown/invalid blocks are dropped. */
export function mapBlocks(raw: RawBlock[] | undefined): PostBlock[] {
  const out: PostBlock[] = [];
  for (const b of raw ?? []) {
    switch (b._type) {
      case "blockHeading":
        if (b.text) out.push({ type: "heading", id: b.id || slugifyPl(b.text), text: b.text });
        break;
      case "blockParagraph":
        if (b.text) out.push({ type: "paragraph", text: b.text });
        break;
      case "blockList":
        out.push({ type: "list", ordered: !!b.ordered, items: (b.items ?? []).filter(Boolean) });
        break;
      case "blockCallout":
        if (b.text)
          out.push({ type: "callout", tone: b.tone === "warning" ? "warning" : "info", text: b.text });
        break;
      case "blockImage": {
        const image = mapSanityImage(b.image);
        if (image) out.push({ type: "image", image, caption: b.caption || undefined });
        break;
      }
      case "blockGallery": {
        const images = (b.images ?? [])
          .map((im) => mapSanityImage(im))
          .filter((im): im is MediaImage => im !== null);
        if (images.length) out.push({ type: "gallery", images });
        break;
      }
      case "blockQuote":
        if (b.text) out.push({ type: "quote", text: b.text, cite: b.cite || undefined });
        break;
      case "blockTable":
        out.push({
          type: "table",
          caption: b.caption || undefined,
          headers: b.headers ?? [],
          rows: (b.rows ?? []).map((r) => r.cells ?? []),
        });
        break;
      case "blockLinkButton":
        if (b.label && b.href)
          out.push({ type: "linkButton", label: b.label, href: b.href, external: b.external ?? true });
        break;
      case "blockRelatedTour":
        if (b.tourSlug) out.push({ type: "relatedTour", tourSlug: b.tourSlug });
        break;
      default:
        break;
    }
  }
  return out;
}

export function mapSiteSettings(raw: Partial<SiteSettings> | null): SiteSettings | null {
  if (!raw || !raw.title) return null;
  return {
    title: raw.title,
    tagline: raw.tagline ?? "",
    description: raw.description ?? "",
    whatsappNumber: raw.whatsappNumber ?? "",
  };
}

export function mapReviews(raw: Partial<Review>[] | null): Review[] {
  return (raw ?? [])
    .filter((r) => r.verified && r.author && r.quote)
    .map((r) => ({
      id: String(r.id),
      author: r.author as string,
      rating: Number(r.rating ?? 5),
      quote: r.quote as string,
      date: String(r.date ?? ""),
      tourSlug: r.tourSlug,
      verified: true,
    }));
}

interface RawDestination {
  slug?: string;
  routeBase?: string;
  name?: string;
  nameGenitive?: string;
  shortIntro?: string;
  heroImage?: SanityImage;
  practical?: string[];
  faqs?: { question?: string; answer?: string }[];
  seo?: RawSeo;
  primaryQuery?: string;
}

export function mapDestination(raw: RawDestination): Destination | null {
  const hero = mapSanityImage(raw.heroImage);
  if (!raw.slug || !raw.name || !raw.nameGenitive || !hero) return null;
  return {
    slug: raw.slug as DestinationSlug,
    routeBase: raw.routeBase ?? `/wycieczki-z-${raw.slug}`,
    name: raw.name,
    nameGenitive: raw.nameGenitive,
    shortIntro: raw.shortIntro ?? "",
    heroImage: hero,
    practical: raw.practical ?? [],
    faqs: mapFaqs(raw.faqs),
    seo: mapSeo(raw.seo),
    primaryQuery: raw.primaryQuery ?? "",
  };
}

interface RawTour {
  slug?: string;
  route?: string;
  title?: string;
  h1?: string;
  destination?: string;
  departure?: string;
  shortDescription?: string;
  overview?: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  price?: Partial<Tour["price"]>;
  availabilityLabel?: string;
  availabilityDays?: string[];
  durationLabel?: string;
  pickupLabel?: string;
  returnLabel?: string;
  transport?: string;
  guide?: Partial<Tour["guide"]>;
  highlights?: string[];
  itinerary?: { time?: string; title?: string; description?: string }[];
  included?: string[];
  excluded?: string[];
  transferSupplements?: { zone?: string; amount?: number }[];
  extras?: { label?: string; note?: string }[];
  whatToBring?: string[];
  requirements?: string[];
  cancellationPolicy?: string;
  featured?: boolean;
  faqs?: { question?: string; answer?: string }[];
  relatedPostSlug?: string;
  seo?: RawSeo;
  updatedAt?: string;
}

export function mapTour(raw: RawTour): Tour | null {
  const hero = mapSanityImage(raw.heroImage);
  const p = raw.price ?? {};
  if (!raw.slug || !raw.title || !hero || typeof p.adult !== "number") return null;
  const gallery = (raw.gallery ?? [])
    .map((im) => mapSanityImage(im))
    .filter((im): im is MediaImage => im !== null);
  return {
    slug: raw.slug,
    route: raw.route ?? `/wycieczki-z-${raw.destination}/${raw.slug}`,
    title: raw.title,
    h1: raw.h1 ?? raw.title,
    destination: raw.destination as DestinationSlug,
    departure: raw.departure ?? "",
    shortDescription: raw.shortDescription ?? "",
    overview: raw.overview ?? "",
    heroImage: hero,
    gallery: gallery.length ? gallery : [hero],
    price: {
      adult: p.adult,
      child: Number(p.child ?? 0),
      infantFree: p.infantFree ?? true,
      childAgeMin: Number(p.childAgeMin ?? 5),
      childAgeMax: Number(p.childAgeMax ?? 11),
      currency: "USD",
      lastVerifiedAt: String(p.lastVerifiedAt ?? ""),
      variable: p.variable ?? true,
    },
    availabilityLabel: raw.availabilityLabel ?? "",
    availabilityDays: raw.availabilityDays ?? [],
    durationLabel: raw.durationLabel ?? "",
    pickupLabel: raw.pickupLabel ?? "",
    returnLabel: raw.returnLabel || undefined,
    transport: raw.transport ?? "",
    guide: {
      label: raw.guide?.label ?? "",
      polishConfirmed: raw.guide?.polishConfirmed ?? false,
    },
    highlights: raw.highlights ?? [],
    itinerary: (raw.itinerary ?? []).map((s) => ({
      time: s.time || undefined,
      title: s.title ?? "",
      description: s.description ?? "",
    })),
    included: raw.included ?? [],
    excluded: raw.excluded ?? [],
    transferSupplements: (raw.transferSupplements ?? [])
      .filter((t) => t.zone)
      .map((t) => ({ zone: t.zone as string, amount: Number(t.amount ?? 0) })),
    extras: (raw.extras ?? [])
      .filter((e) => e.label)
      .map((e) => ({ label: e.label as string, note: e.note ?? "" })),
    whatToBring: raw.whatToBring ?? [],
    requirements: raw.requirements ?? [],
    cancellationPolicy: raw.cancellationPolicy ?? "",
    featured: !!raw.featured,
    faqs: mapFaqs(raw.faqs),
    relatedPostSlug: raw.relatedPostSlug || undefined,
    seo: mapSeo(raw.seo),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

interface RawPost {
  slug?: string;
  route?: string;
  title?: string;
  h1?: string;
  excerpt?: string;
  directAnswer?: string;
  featuredImage?: SanityImage;
  author?: string;
  category?: string;
  relatedDestination?: string;
  relatedTourSlugs?: string[];
  publishedAt?: string;
  updatedAt?: string;
  body?: RawBlock[];
  faqs?: { question?: string; answer?: string }[];
  sources?: { label?: string; note?: string }[];
  seo?: RawSeo;
}

export function mapPost(raw: RawPost): BlogPost | null {
  const featured = mapSanityImage(raw.featuredImage);
  if (!raw.slug || !raw.title || !featured) return null;
  return {
    slug: raw.slug,
    route: raw.route ?? `/poradnik/${raw.slug}`,
    title: raw.title,
    h1: raw.h1 ?? raw.title,
    excerpt: raw.excerpt ?? "",
    directAnswer: raw.directAnswer ?? "",
    featuredImage: featured,
    author: raw.author ?? "Zespół Egipskie Wakacje",
    category: raw.category ?? "",
    relatedDestination: (raw.relatedDestination as DestinationSlug) || undefined,
    relatedTourSlugs: (raw.relatedTourSlugs ?? []).filter(Boolean),
    publishedAt: String(raw.publishedAt ?? ""),
    updatedAt: String(raw.updatedAt ?? raw.publishedAt ?? ""),
    body: mapBlocks(raw.body),
    faqs: mapFaqs(raw.faqs),
    sources: (raw.sources ?? [])
      .filter((s) => s.label)
      .map((s) => ({ label: s.label as string, note: s.note ?? "" })),
    seo: mapSeo(raw.seo),
  };
}

interface RawLegal {
  slug?: string;
  route?: string;
  title?: string;
  updatedAt?: string;
  body?: RawBlock[];
  seo?: RawSeo;
}

export function mapLegal(raw: RawLegal): LegalPage | null {
  if (!raw.slug || !raw.title) return null;
  return {
    slug: raw.slug,
    route: raw.route ?? `/${raw.slug}`,
    title: raw.title,
    updatedAt: String(raw.updatedAt ?? ""),
    body: mapBlocks(raw.body),
    seo: mapSeo(raw.seo),
  };
}

export function mapSiteFaqs(raw: { question?: string; answer?: string }[] | null): FaqItem[] {
  return mapFaqs(raw ?? []);
}
