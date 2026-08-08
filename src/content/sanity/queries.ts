/**
 * GROQ queries mapping Sanity documents to the frontend content model. Field
 * names must match the Studio schema (studio/schemas). Images are projected raw
 * (asset ref + hotspot/crop + alt) plus dimensions/lqip so the frontend builder
 * can produce responsive CDN URLs. Body blocks are over-projected and narrowed by
 * `_type` in the mapper (see map.ts).
 */

// Reusable image projection fragment (raw object for the URL builder).
const IMG = `{ ..., "dimensions": asset->metadata.dimensions, "lqip": asset->metadata.lqip }`;

// Reusable body-block projection (safe, closed set).
const BODY = `body[]{
  _type, _key,
  text,
  "id": anchor.current,
  ordered, items,
  tone,
  "image": image${IMG},
  caption,
  "images": images[]${IMG},
  cite,
  headers, "rows": rows[]{ cells },
  label, href, external,
  "tourSlug": tour->slug.current
}`;

const TOUR_SEO = `"seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": canonicalPath, "ogImage": ogImage.asset->url }`;

export const GROQ = {
  siteSettings: `*[_type == "siteSettings"][0]{ title, tagline, description, whatsappNumber }`,

  siteFaqs: `*[_type == "faq" && (scope == "site" || !defined(scope))] | order(_createdAt asc){ question, answer }`,

  reviews: `*[_type == "review" && verified == true] | order(date desc){
    "id": _id, author, rating, quote, date, "tourSlug": tour->slug.current, verified
  }`,

  destinations: `*[_type == "destination"] | order(_createdAt asc){
    "slug": slug.current, routeBase, name, nameGenitive, shortIntro,
    "heroImage": heroImage${IMG},
    "practical": practical,
    "faqs": faqs[]{ question, answer },
    "seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": canonicalPath, "ogImage": ogImage.asset->url },
    primaryQuery
  }`,

  tours: `*[_type == "tour" && published == true] | order(featured desc, adultPrice asc){
    "slug": slug.current, route, title, h1,
    "destination": destination->slug.current,
    departure, shortDescription, overview,
    "heroImage": heroImage${IMG},
    "gallery": gallery[]${IMG},
    "price": {
      "adult": adultPrice, "child": childPrice, "infantFree": infantFree,
      "childAgeMin": childAgeMinimum, "childAgeMax": childAgeMaximum,
      "currency": currency, "lastVerifiedAt": priceLastVerifiedAt, "variable": priceVariable
    },
    availabilityLabel, availabilityDays, durationLabel,
    "pickupLabel": pickupTime, "returnLabel": returnTime, transport,
    "guide": { "label": guideLanguageLabel, "polishConfirmed": guidePolishConfirmed },
    highlights,
    "itinerary": itinerary[]{ time, title, description },
    included, excluded,
    "transferSupplements": transferSupplements[]{ zone, amount },
    "extras": extras[]{ label, note },
    whatToBring, requirements, cancellationPolicy, featured,
    "faqs": faqs[]{ question, answer },
    "relatedPostSlug": relatedPost->slug.current,
    ${TOUR_SEO},
    "updatedAt": updatedAt
  }`,

  posts: `*[_type == "blogPost" && published == true] | order(publishedAt desc){
    "slug": slug.current, route, title, h1, excerpt, directAnswer,
    "featuredImage": featuredImage${IMG},
    "author": author->name,
    category,
    "relatedDestination": relatedDestination->slug.current,
    "relatedTourSlugs": relatedTours[]->slug.current,
    "publishedAt": publishedAt, "updatedAt": updatedAt,
    ${BODY},
    "faqs": faqs[]{ question, answer },
    "sources": sources[]{ label, note },
    "seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": canonicalPath, "ogImage": ogImage.asset->url }
  }`,

  legalPages: `*[_type == "legalPage"] | order(_createdAt asc){
    "slug": slug.current, route, title, "updatedAt": updatedAt,
    ${BODY},
    "seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": canonicalPath }
  }`,
} as const;

export type Collection = keyof typeof GROQ;
