/**
 * Typed content model. Both the local content adapter (typed source files)
 * and the future Sanity adapter resolve to these exact shapes, so the frontend
 * never needs to know which source is active.
 */

export type Currency = "USD" | "EUR";

export type DestinationSlug = "hurghada" | "marsa-alam" | "sharm-el-sheikh";

/**
 * How a tour is priced. Not every offer is per-person adult/child - some are per
 * boat, per vehicle (quad/buggy), per diving course or per multi-day package.
 * The unit label shown next to the headline price follows the mode.
 */
export type PriceMode =
  | "perPerson"
  | "perBoat"
  | "perVehicle"
  | "perCourse"
  | "perPackage";

/** One line in a tour's price breakdown (adult, child, a boat variant, a course, ...). */
export interface PriceOption {
  /** Human label, e.g. "Dorosły", "Dziecko 5-11 lat", "2-osobowe buggy", "Kurs (2 nurkowania)". */
  label: string;
  amount: number;
  currency: Currency;
  /** Overrides the tour's headline unit when this option is priced differently. */
  unit?: string;
  note?: string;
  /** Render "bezpłatnie" instead of an amount (infants, etc.). */
  free?: boolean;
}

/**
 * Final category taxonomy - derived from the real inventory and Polish search
 * intent. Only categories with enough real tours get an indexable landing page.
 */
export type CategorySlug =
  | "kair"
  | "luksor"
  | "rejsy-wyspy"
  | "snorkeling-delfiny"
  | "nurkowanie"
  | "safari"
  | "atrakcje"
  | "prywatne"
  | "synaj"
  | "miedzynarodowe";

export interface TourCategory {
  slug: CategorySlug;
  /** Public route base, e.g. "/wycieczki/kair-i-piramidy". */
  routeBase: string;
  /** Full display name, e.g. "Kair i piramidy". */
  name: string;
  /** Short chip label, e.g. "Kair". */
  shortLabel: string;
  /** One-line original Polish description. */
  description: string;
  /** Longer intro rendered on the category landing page. */
  intro: string;
  faqs: FaqItem[];
  seo: SeoMeta;
  primaryQuery: string;
}

/**
 * A responsive image. Two provenances share one shape:
 * - Local: `src` is a base path under /public (no extension); format variants are
 *   pre-generated (.avif/.webp/.jpg) and `sources` is undefined.
 * - Sanity: `src` is the canonical JPG CDN URL and `sources` holds ready AVIF/WebP/
 *   JPG CDN transform URLs (hotspot/crop applied). No files are committed.
 */
export interface MediaImage {
  /** Local: base path e.g. "/media/destinations/hurghada". Sanity: absolute JPG URL. */
  src: string;
  /** Accurate Polish alt text. Empty string only for purely decorative images. */
  alt: string;
  width: number;
  height: number;
  /** Present for Sanity-hosted images: per-format CDN URLs. */
  sources?: { avif: string; webp: string; jpg: string };
  /**
   * Present for responsive LOCAL images: the pre-generated variant widths (px,
   * ascending). When set, format files are named `${src}-${w}.avif|.webp|.jpg`
   * (see scripts/generate-tour-gallery.mjs) and OptimizedImage emits a srcSet so
   * a phone never downloads a desktop-sized file. When absent, a single
   * `${src}.avif|.webp|.jpg` triplet is served (scripts/generate-media.mjs).
   */
  widths?: number[];
  /** Optional low-quality image placeholder (Sanity blur data URL). */
  lqip?: string;
  /** Optional CSS object-position for the cover crop, e.g. "center 40%". */
  objectPosition?: string;
}

export interface GuideLanguage {
  /** Short label rendered on cards, e.g. "Polski" or "Potwierdzamy przed rezerwacja". */
  label: string;
  /** True only when a Polish-speaking guide is unambiguously confirmed by the source. */
  polishConfirmed: boolean;
}

export interface PriceTier {
  /** How this tour is priced (drives the unit label). */
  mode: PriceMode;
  /** Headline price shown on cards and the booking card. */
  amount: number;
  /** Headline unit label: "os.", "łódź", "buggy", "quad", "kurs", "pakiet", "pojazd". */
  unit: string;
  currency: Currency;
  /** True when the final cost can vary (transfers/extras/variants) -> render "Cena od". */
  from: boolean;
  /** ISO date (YYYY-MM-DD) the price was last verified against the operator. */
  lastVerifiedAt: string;
  /**
   * Full price breakdown (always >= 1 line). Person tours list adult/child here;
   * per-boat/vehicle/course tours list their variants. Drives the price tables.
   */
  options: PriceOption[];
  /** Age below which infants travel free (person tours) - for messaging only. */
  childAgeMin?: number;
  infantFree?: boolean;
  /** Optional short note under the price table (e.g. transfer/season caveat). */
  note?: string;
}

export interface TransferSupplement {
  /** Human label for the affected hotels/zones. */
  zone: string;
  /** Extra USD per person. */
  amount: number;
}

export interface ItineraryStep {
  /** Approx time label, e.g. "00:00-02:00" or "Poludnie". Optional. */
  time?: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Destination {
  slug: DestinationSlug;
  /** Public route base, e.g. "/wycieczki-z-hurghady". */
  routeBase: string;
  name: string;
  /** Short name used inline in sentences, e.g. "Hurghady" (genitive). */
  nameGenitive: string;
  /**
   * Optional explicit hero H1. Defaults to `Wycieczki z ${nameGenitive}` when
   * omitted; set only when a keyword-stronger phrasing wins (e.g. Marsa Alam ->
   * "Wycieczki fakultatywne z Marsa Alam", the KD-3/1600-vol primary).
   */
  heroTitle?: string;
  shortIntro: string;
  heroImage: MediaImage;
  /** Destination-specific practical notes rendered as a list. */
  practical: string[];
  faqs: FaqItem[];
  seo: SeoMeta;
  /** Primary target query for the destination overview page. */
  primaryQuery: string;
}

export interface Tour {
  slug: string;
  /** Full public route incl. destination base, e.g. "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie". */
  route: string;
  title: string;
  h1: string;
  destination: DestinationSlug;
  /** Final category taxonomy assignment (drives category pages + filters). */
  category: CategorySlug;
  /** Human departure label, e.g. "Hurghada". */
  departure: string;
  shortDescription: string;
  overview: string;
  heroImage: MediaImage;
  gallery: MediaImage[];
  price: PriceTier;
  availabilityLabel: string;
  /** e.g. ["Codziennie"] or ["Wtorek"]. */
  availabilityDays: string[];
  durationLabel: string;
  pickupLabel: string;
  returnLabel?: string;
  transport: string;
  guide: GuideLanguage;
  /** Main attractions shown as chips on cards. */
  highlights: string[];
  itinerary: ItineraryStep[];
  included: string[];
  excluded: string[];
  transferSupplements: TransferSupplement[];
  /** Optional paid extras, e.g. Nile cruise. */
  extras: { label: string; note: string }[];
  whatToBring: string[];
  requirements: string[];
  cancellationPolicy: string;
  featured: boolean;
  faqs: FaqItem[];
  relatedPostSlug?: string;
  /**
   * Optional entity-rich sections ("what you will see"), rendered as H3 blocks.
   * Opt-in per tour - lets a gold-standard page spell out attractions (Giza,
   * Sphinx, Egyptian Museum, ...) as clean server-rendered HTML for AEO/GEO.
   */
  attractions?: { title: string; body: string }[];
  /** Optional factual "duration & distance" paragraph, rendered as its own section. */
  planningNote?: string;
  /** Optional internal comparison callout (e.g. bus vs plane) with a real internal link. */
  compare?: { note: string; linkLabel: string; href: string };
  seo: SeoMeta;
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  route: string;
  title: string;
  h1: string;
  excerpt: string;
  /** Direct answer surfaced near the top for AIO/featured-snippet intent. */
  directAnswer: string;
  featuredImage: MediaImage;
  author: string;
  category: string;
  relatedDestination?: DestinationSlug;
  relatedTourSlugs: string[];
  publishedAt: string;
  updatedAt: string;
  /** Structured, sanitised body. No raw HTML from untrusted sources. */
  body: PostBlock[];
  faqs: FaqItem[];
  /** Visible sources for changeable official rules. */
  sources: { label: string; note: string }[];
  seo: SeoMeta;
}

/** A safe, closed set of content blocks (no dangerouslySetInnerHTML needed). */
export type PostBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; text: string }
  | { type: "image"; image: MediaImage; caption?: string }
  | { type: "gallery"; images: MediaImage[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "linkButton"; label: string; href: string; external: boolean }
  | { type: "relatedTour"; tourSlug: string };

export interface SeoMeta {
  title: string;
  description: string;
  /** Canonical path (with trailing slash), e.g. "/wycieczki-z-hurghady/". */
  canonicalPath: string;
  ogImage?: string;
  /** Accurate description of the OG image itself (not the page title). */
  ogImageAlt?: string;
  /** Open Graph type override. Tour pages default to "article"; commercial pages may set "website". */
  type?: "website" | "article";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  quote: string;
  date: string;
  tourSlug?: string;
  /** Only verified reviews are ever rendered. */
  verified: boolean;
}

/**
 * A display-only, ANONYMISED participant testimonial. Deliberately NOT a `Review`:
 * it never feeds Review/AggregateRating structured data and shows no reviewer
 * identity. Used for the homepage "Opinie uczestników naszych wycieczek" section,
 * sourced from genuine, publicly visible opinions written by people who took
 * excursions operated by the same team. Presented honestly as anonymous
 * participant experiences - no real names shown, no fake names invented.
 */
export interface Testimonial {
  id: string;
  /** Faithful, meaning-preserving excerpt of the real opinion. */
  quote: string;
  /** Factual trip/category label taken from the review itself, e.g. "Luksor". */
  trip: string;
  /** Exact source star rating (1-5); only rendered when genuinely verified. */
  rating: number;
  /** Marks the single large featured testimonial in the editorial layout. */
  featured?: boolean;
}

export interface LegalPage {
  slug: string;
  route: string;
  title: string;
  updatedAt: string;
  body: PostBlock[];
  seo: SeoMeta;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
}
