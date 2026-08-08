import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/content/config";
import type { BlogPost, Destination, FaqItem, Tour } from "@/content/types";

const DEFAULT_OG = "/media/og/default.jpg";

export interface PageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  type?: "website" | "article";
}

/** Build a complete, canonical, OG/Twitter-ready Next Metadata object. */
export function buildMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.canonicalPath);
  const ogImage = absoluteUrl(seo.ogImage ?? DEFAULT_OG);
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}

// --- JSON-LD builders --------------------------------------------------------
// Only accurate, non-fabricated structured data. No aggregateRating, no fake
// reviews, no fake availability/priceValidUntil, no fake address/registration.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
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
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pl-PL",
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
 * TouristTrip for a tour. Price is represented honestly via a low-price Offer
 * (adult from-price, USD). No fake priceValidUntil / availability quantity.
 */
export function tourJsonLd(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    url: absoluteUrl(tour.seo.canonicalPath),
    image: absoluteUrl(`${tour.heroImage.src}.jpg`),
    touristType: "Wycieczka jednodniowa",
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
      price: tour.price.adult,
      priceCurrency: tour.price.currency,
      url: absoluteUrl(tour.seo.canonicalPath),
      availability: "https://schema.org/InStock",
    },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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
    image: absoluteUrl(`${post.featuredImage.src}.jpg`),
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
