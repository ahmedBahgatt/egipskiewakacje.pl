import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/content/config";
import type { BlogPost, Destination, FaqItem, Tour } from "@/content/types";
import { mediaOgImageUrl, ogImageUrl } from "@/lib/media";

const DEFAULT_OG = "/media/og/default.jpg";

export interface PageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  /** Accurate description of the OG IMAGE itself (not the page). Falls back to title. */
  ogImageAlt?: string;
  /** Actual OG image dimensions. Default 1200x630 (the branded default/OG cards). */
  ogImageWidth?: number;
  ogImageHeight?: number;
  type?: "website" | "article";
}

/** Build a complete, canonical, OG/Twitter-ready Next Metadata object. */
export function buildMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.canonicalPath);
  const ogImage = ogImageUrl(seo.ogImage ?? DEFAULT_OG);
  const ogImageAlt = seo.ogImageAlt ?? seo.title;
  const ogWidth = seo.ogImageWidth ?? 1200;
  const ogHeight = seo.ogImageHeight ?? 630;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: seo.type ?? "website",
      images: [{ url: ogImage, width: ogWidth, height: ogHeight, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage, alt: ogImageAlt }],
    },
  };
}

/**
 * Metadata for a destination landing page. The CMS `seo.ogImage` (edited in
 * Sanity) is the authoritative social image: change it there and the live
 * OG/Twitter image follows after the normal publish -> webhook -> build, with no
 * code change. The page hero is used ONLY as a fallback when `seo.ogImage` is
 * empty (protects local/legacy data without overriding a valid CMS value).
 * Dimensions track whichever image is chosen so og:image:width/height stay
 * truthful. Always one single absolute URL (mediaOgImageUrl / ogImageUrl).
 */
export function destinationMetadata(dest: Destination): Metadata {
  const { seo, heroImage } = dest;
  const useCmsOg = Boolean(seo.ogImage);
  return buildMetadata({
    ...seo,
    ogImage: seo.ogImage ?? mediaOgImageUrl(heroImage),
    ogImageAlt: seo.ogImageAlt ?? heroImage.alt,
    ogImageWidth: useCmsOg ? seo.ogImageWidth : heroImage.width,
    ogImageHeight: useCmsOg ? seo.ogImageHeight : heroImage.height,
  });
}

// --- JSON-LD builders --------------------------------------------------------
// Only accurate, non-fabricated structured data. No aggregateRating, no fake
// reviews, no fake availability/priceValidUntil, no fake address/registration.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    // Canonical homepage identity (trailing slash) - matches the <link rel=canonical>,
    // og:url and the #organization @id host, so the brand entity resolves to one URL.
    url: absoluteUrl("/"),
    logo: ogImageUrl("/media/brand/egipskie-wakacje-logo.png"),
    description: siteConfig.description,
    slogan: "Wycieczki fakultatywne w Egipcie dla polskich turystów",
    knowsLanguage: ["pl"],
    // Official, verified brand profiles. These let Google bind the entity
    // "Egipskie Wakacje" to its egipskiewakacje.pl site and its off-site
    // presences. Only genuinely owned, publicly branded URLs (sourced once from
    // siteConfig.social). Type stays "Organization": although a Google Business
    // Profile now exists, no physical street address/geo is verified in this
    // codebase, so we do NOT upgrade to LocalBusiness/TravelAgency (that would
    // require fabricating an office/address).
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.googleBusiness,
    ],
    // Egypt-based resorts the excursions depart from. No physical address is
    // claimed - none is verified - so no LocalBusiness/TravelAgency type is used.
    areaServed: [
      { "@type": "Place", name: "Hurghada" },
      { "@type": "Place", name: "Marsa Alam" },
      { "@type": "Place", name: "Sharm el Sheikh" },
      { "@type": "Country", name: "Egipt" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      availableLanguage: ["pl"],
      url: `https://wa.me/${siteConfig.whatsappNumber}`,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    // Truthful alternate identity (the bare domain) - the only alternateName.
    // Helps Google's site-name algorithm bind the domain to the "Egipskie Wakacje"
    // brand. Deliberately NOT a keyword-stuffed alt name.
    alternateName: siteConfig.domain,
    url: absoluteUrl("/"),
    inLanguage: "pl-PL",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/**
 * ContactPage node for /kontakt/. Binds to the EXISTING Organization
 * (`/#organization`) and WebSite (`/#website`) entities - never a duplicate
 * entity - so search/AI systems read this as the official contact page of
 * Egipskie Wakacje. Carries only the real, owner-approved channels.
 */
export function contactPageJsonLd(opts: { name: string; canonicalPath: string; description?: string }) {
  const url = absoluteUrl(opts.canonicalPath);
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contactpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
  };
}

/**
 * Generic WebPage node for the legal + reservation pages. Binds to the existing
 * Organization + WebSite entities; invents nothing. Used where no more specific
 * type (ContactPage/FAQPage) applies.
 */
export function webPageJsonLd(opts: { name: string; canonicalPath: string; description?: string }) {
  const url = absoluteUrl(opts.canonicalPath);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

/**
 * CollectionPage for a listing/hub page (all-tours, destination, category). The
 * real, visible tours on the page are carried as a nested ItemList `mainEntity`
 * (position + name + url only - no fake price/availability/rating). Tied to the
 * global WebSite entity so the site graph stays consistent. Use this INSTEAD of a
 * standalone itemListJsonLd on hub pages, so a page emits exactly one ItemList.
 */
export function collectionPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: "pl-PL",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: absoluteUrl(it.path),
      })),
    },
  };
}

/**
 * Tour detail entity: a single node multi-typed `["Product", "TouristTrip"]`.
 *  - TouristTrip keeps the correct travel-experience semantics (itinerary, provider).
 *  - Product expresses that this is a commercially offered, bookable experience and
 *    makes the page eligible for Google Product snippets (price). schema.org Product
 *    is explicitly "any offered product OR service" (e.g. a concert ticket), so an
 *    excursion is a valid Product - it is NOT misrepresented as a physical retail item.
 * One node, one stable `@id` - no duplicate Product/TouristTrip describing the same tour.
 *
 * Offer carries ONLY the real, authoritative headline price (`tour.price.amount`, the
 * single source of truth that also drives the booking card and listing cards). It always
 * maps to a genuine bookable option (adult / one-dive / per-buggy base), never a free
 * infant price. Deliberately absent, because we cannot state them truthfully:
 *  - NO AggregateOffer for variants (Google advises against it for product variants);
 *    the full breakdown stays in the visible price table only.
 *  - NO `availability` / `InStock` - booking is confirmed on WhatsApp, we hold no live
 *    inventory; "daily/selected days" is a schedule, not stock.
 *  - NO `priceValidUntil`, no `sku`/`gtin`/`mpn`/condition, no merchant-listing fields.
 *  - NO `aggregateRating` / `review` - there is no verified per-tour review data yet.
 *
 * No `touristType` is emitted: schema.org `touristType` is about the kind of tourist a
 * trip suits, which we do not have reliable data for.
 */
export function tourJsonLd(tour: Tour) {
  const url = absoluteUrl(tour.seo.canonicalPath);
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "TouristTrip"],
    "@id": `${url}#tour`,
    name: tour.title,
    description: tour.shortDescription,
    url,
    image: (tour.gallery?.length ? tour.gallery : [tour.heroImage]).map(mediaOgImageUrl),
    brand: { "@id": `${siteConfig.url}/#organization` },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((step, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: step.title },
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price.amount,
      priceCurrency: tour.price.currency,
      url,
    },
    provider: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function touristDestinationJsonLd(dest: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.shortIntro,
    url: absoluteUrl(dest.seo.canonicalPath),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: mediaOgImageUrl(post.featuredImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "pl-PL",
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(post.seo.canonicalPath),
  };
}

/** FAQPage - only for FAQs that are visibly rendered on the same page. */
export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
