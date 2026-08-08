/**
 * GROQ queries mapping Sanity documents to the frontend content model.
 * Field projections mirror src/content/types.ts. These activate in sanity mode
 * once the dataset is seeded with the new schema.
 */
export const GROQ = {
  tours: `*[_type == "tour" && published == true] | order(featured desc, adultPrice asc) {
    "slug": slug.current,
    "route": route,
    title, h1,
    "destination": destination->slug.current,
    departure, shortDescription, overview,
    "heroImage": { "src": heroImage.src, "alt": heroImage.alt, "width": heroImage.width, "height": heroImage.height },
    gallery,
    "price": {
      "adult": adultPrice, "child": childPrice, "infantFree": infantFree,
      "childAgeMin": childAgeMinimum, "childAgeMax": childAgeMaximum,
      "currency": currency, "lastVerifiedAt": priceLastVerifiedAt, "variable": priceVariable
    },
    availabilityLabel, availabilityDays, durationLabel,
    "pickupLabel": pickupTime, "returnLabel": returnTime,
    transport,
    "guide": { "label": guideLanguageLabel, "polishConfirmed": guidePolishConfirmed },
    highlights, itinerary, included, excluded,
    "transferSupplements": extraFees, extras, whatToBring, requirements,
    cancellationPolicy, featured, "faqs": FAQs,
    "relatedPostSlug": relatedArticles[0]->slug.current,
    "seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": route, "ogImage": ogImage },
    "updatedAt": updatedAt
  }`,
  posts: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
    "slug": slug.current, "route": route, title, h1, excerpt, "directAnswer": directAnswer,
    "featuredImage": { "src": featuredImage.src, "alt": featuredImage.alt, "width": featuredImage.width, "height": featuredImage.height },
    "author": author->name, "category": category,
    "relatedDestination": relatedDestination->slug.current,
    "relatedTourSlugs": relatedTours[]->slug.current,
    publishedAt, updatedAt, body, "faqs": FAQ, sources,
    "seo": { "title": seoTitle, "description": seoDescription, "canonicalPath": route, "ogImage": ogImage }
  }`,
} as const;
