import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField, imageMember } from "../objects/imageWithAlt";

/**
 * Mirrors `Tour` in src/content/types.ts.
 *
 * FIELD NAMES ARE A CONTRACT with src/content/sanity/queries.ts, which flattens
 * some of them:
 *   priceMode/priceAmount/priceUnit/currency/priceFrom/priceLastVerifiedAt/
 *   priceOptions/priceChildAgeMin/priceInfantFree/priceNote  -> Tour.price
 *   guideLanguageLabel/guidePolishConfirmed -> Tour.guide
 *   pickupTime -> pickupLabel, returnTime -> returnLabel
 *   relatedPost-> relatedPostSlug
 *   seoTitle/seoDescription/canonicalPath/ogImage/ogType -> Tour.seo
 * Renaming any of these without editing queries.ts breaks sanity mode silently.
 *
 * Admin UI is English; VALUES entered stay Polish (the site is Polish).
 *
 * Honesty rules baked into the schema:
 *  - `guidePolishConfirmed` defaults to false. Tick it only when a
 *    Polish-speaking guide is unambiguously confirmed by the operator.
 *  - `priceLastVerifiedAt` is required; the frontend shows that date.
 *  - No "old price" / discount / countdown fields exist, by design.
 */
export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "pricing", title: "Pricing" },
    { name: "logistics", title: "Logistics" },
    { name: "program", title: "Itinerary & Details" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO & Publishing" },
  ],
  fields: [
    // --- Content -------------------------------------------------------------
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: 'Polish name used on cards and in navigation, e.g. "Wycieczka z Hurghady do Kairu".',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "h1",
      title: "H1 Heading",
      type: "string",
      group: "content",
      description: "Polish heading on the tour page. Usually identical to the title.",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "URL identifier. Changing the slug of an existing published tour can break its URL and SEO - change it only when intentionally migrating a URL.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Full URL path",
      type: "string",
      group: "content",
      description:
        'Including the destination base, WITHOUT a trailing slash, e.g. "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*\/[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: '"/destination/tour-slug"',
        }),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      group: "content",
      to: [{ type: "destination" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "departure",
      title: "Departure point",
      type: "string",
      group: "content",
      description: 'Polish label shown on the card, e.g. "Hurghada".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categories",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tourCategory" }] })],
      description: "Organisation inside the CMS. Does not affect public URLs.",
    }),
    defineField({
      name: "tourType",
      title: "Tour type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Full-day", value: "jednodniowa" },
          { title: "Half-day", value: "poldniowa" },
          { title: "Multi-day", value: "wielodniowa" },
        ],
        layout: "radio",
      },
      initialValue: "jednodniowa",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      group: "content",
      rows: 3,
      description: "2-3 Polish sentences for the tour card and listings.",
      validation: (rule) => rule.required().min(60).max(320),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      group: "content",
      rows: 8,
      description: "Expanded Polish description: exactly what the trip covers and what the day looks like.",
      validation: (rule) => rule.required().min(120),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: 'Short Polish chips shown on the card, e.g. "Piramidy w Gizie".',
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "attractions",
      title: "What you'll see (entity sections, optional)",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "tourAttraction" })],
      description:
        "Optional content-rich H3 sections (e.g. Giza, Sfinks, Muzeum Egipskie). Rendered as clean HTML for AEO/GEO. Polish content.",
    }),
    defineField({
      name: "planningNote",
      title: "Duration & distance note (optional)",
      type: "text",
      group: "content",
      rows: 3,
      description: "Short, factual Polish paragraph about duration and distance, rendered as its own section.",
    }),
    defineField({
      name: "compare",
      title: "Comparison / internal link (optional)",
      type: "tourCompare",
      group: "content",
      description: "Optional callout linking to a related route (e.g. bus vs plane). Polish content.",
    }),

    // --- Media ---------------------------------------------------------------
    imageField({
      name: "heroImage",
      title: "Featured Image",
      group: "media",
      required: true,
      description:
        "Drag an image in. Set the focus point (hotspot) on the most important element - the crop on phones is narrower than on desktop.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [imageMember()],
      options: { layout: "grid" },
      description: "A few images from the trip. Each needs its own Polish ALT text.",
    }),
    defineField({
      name: "previewVideo",
      title: "Short video (optional)",
      type: "file",
      group: "media",
      description:
        "Optional preview clip. The frontend is a static export - the file must also be saved in /public to be used on the site.",
      options: { accept: "video/mp4,video/webm" },
    }),

    // --- Pricing -------------------------------------------------------------
    // Structured price model (mirrors PriceTier in src/content/types.ts). Not
    // every tour is per-person adult/child: per-boat, per-vehicle (quad/buggy),
    // per-course (diving) and per-package tours list their own `priceOptions`.
    defineField({
      name: "priceMode",
      title: "Pricing mode",
      type: "string",
      group: "pricing",
      description: "Controls the unit shown next to the headline price.",
      options: {
        list: [
          { title: "Per person", value: "perPerson" },
          { title: "Per boat", value: "perBoat" },
          { title: "Per vehicle (quad/buggy)", value: "perVehicle" },
          { title: "Per course (diving)", value: "perCourse" },
          { title: "Per package", value: "perPackage" },
        ],
        layout: "radio",
      },
      initialValue: "perPerson",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceAmount",
      title: "Headline price",
      type: "number",
      group: "pricing",
      description: "Amount shown on cards and the booking card. Usually equals the first line in the price list.",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "priceUnit",
      title: "Headline price unit",
      type: "string",
      group: "pricing",
      description: 'Polish label next to the price: "os.", "łódź", "buggy", "quad", "kurs", "pakiet".',
      initialValue: "os.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "currency",
      title: "Headline currency",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "USD", value: "USD" },
          { title: "EUR", value: "EUR" },
        ],
        layout: "radio",
      },
      initialValue: "USD",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceFrom",
      title: 'Variable price (show "from")',
      type: "boolean",
      group: "pricing",
      description:
        "Enable when the final cost depends on the transfer zone, variant or optional extras.",
      initialValue: true,
    }),
    defineField({
      name: "priceLastVerifiedAt",
      title: "Price last verified on",
      type: "date",
      group: "pricing",
      options: { dateFormat: "YYYY-MM-DD" },
      description: "Date the price was last checked with the operator. Shown on the page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceOptions",
      title: "Detailed price list",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "priceOption" })],
      description:
        "Full price breakdown (min. 1 line). Per-person tours list adult/child; per-boat/vehicle/course tours list their own variants.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "priceChildAgeMin",
      title: "Child age - from (optional)",
      type: "number",
      group: "pricing",
      description: "Below this age a child is free (applies to per-person pricing).",
      validation: (rule) => rule.min(0).max(18),
    }),
    defineField({
      name: "priceInfantFree",
      title: "Youngest children free",
      type: "boolean",
      group: "pricing",
      initialValue: true,
    }),
    defineField({
      name: "priceNote",
      title: "Note under the price list (optional)",
      type: "string",
      group: "pricing",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "transferSupplements",
      title: "Transfer Supplements",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "transferSupplement" })],
      description: "Only zones where a surcharge actually applies.",
    }),
    defineField({
      name: "extras",
      title: "Optional extras (paid on site)",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "labelledNote" })],
    }),

    // --- Logistics -----------------------------------------------------------
    defineField({
      name: "availabilityLabel",
      title: "Availability - label",
      type: "string",
      group: "logistics",
      description: 'Polish text shown to the user, e.g. "Codziennie" or "We wtorki".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availabilityDays",
      title: "Days",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
      description: 'Values used for filtering, e.g. ["Codziennie"] or ["Wtorek"].',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "durationLabel",
      title: "Duration",
      type: "string",
      group: "logistics",
      description: 'Polish, e.g. "ok. 20-22 godzin". Real time, including transfers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pickupTime",
      title: "Pickup time",
      type: "string",
      group: "logistics",
      description: 'Range, e.g. "ok. 00:00-02:00". The exact time is confirmed on WhatsApp.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "returnTime",
      title: "Return time (optional)",
      type: "string",
      group: "logistics",
      description: "Fill in only when the return time is predictable.",
    }),
    defineField({
      name: "transport",
      title: "Transport",
      type: "string",
      group: "logistics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pickupZones",
      title: "Pickup zones",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
      description: "Hotel zones covered by pickup. Set surcharges in the Pricing section.",
    }),
    defineField({
      name: "guideLanguageLabel",
      title: "Guide language - label",
      type: "string",
      group: "logistics",
      description:
        'Exactly what the user sees. If the language is not certain, enter "Potwierdzamy przed rezerwacją" and do NOT tick the box below.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guidePolishConfirmed",
      title: "Polish-speaking guide confirmed",
      type: "boolean",
      group: "logistics",
      description:
        "Tick only when the operator unambiguously confirms a Polish-speaking guide on this route.",
      initialValue: false,
    }),

    // --- Itinerary & Details -------------------------------------------------
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "itineraryStep" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "included",
      title: "Included",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "excluded",
      title: "Not included",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
      description: "List everything people mistake for included items (drinks, extra tickets).",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "whatToBring",
      title: "What to bring",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "requirements",
      title: "Requirements & notes",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cancellationPolicy",
      title: "Booking & cancellation terms",
      type: "text",
      group: "program",
      rows: 4,
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "faqs",
      title: "Tour FAQ",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(1),
    }),

    // --- Relations -----------------------------------------------------------
    defineField({
      name: "featured",
      title: "Featured on the homepage",
      type: "boolean",
      group: "relations",
      initialValue: false,
    }),
    // Editorial cross-links are WEAK on purpose: deleting a tour or an article
    // must never be blocked by a "still referenced" error, and the seed can
    // write mutual links without any ordering constraint.
    defineField({
      name: "relatedTours",
      title: "Related tours",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }], weak: true })],
    }),
    defineField({
      name: "relatedPost",
      title: "Featured blog post",
      type: "reference",
      group: "relations",
      to: [{ type: "blogPost" }],
      weak: true,
      description: "One blog post shown on the tour page. May be left empty.",
    }),

    // --- SEO & Publishing ----------------------------------------------------
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Polish title shown in Google. Recommended up to ~60 characters.",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Polish meta description. Recommended ~150-160 characters.",
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      group: "seo",
      description:
        'Advanced. The path from the field above but WITH a trailing slash, e.g. "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'path starting and ending with "/"',
        }),
    }),
    imageField({
      name: "ogImage",
      title: "OG Image (optional)",
      group: "seo",
      description:
        "Image shown when the link is shared (Facebook, WhatsApp). Ideally a 1200x630 landscape crop. Empty = the tour's featured image.",
    }),
    defineField({
      name: "ogType",
      title: "OG Type (advanced)",
      type: "string",
      group: "seo",
      description:
        'Usually empty. Tour pages default to "article"; commercial pages may set "website".',
      options: {
        list: [
          { title: "Article (default)", value: "article" },
          { title: "Website", value: "website" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      group: "seo",
      description: "Untick to hide the tour on the site without deleting the document.",
      initialValue: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Content last updated",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Featured, then price ascending",
      name: "featuredThenPrice",
      by: [
        { field: "featured", direction: "desc" },
        { field: "priceAmount", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      departure: "departure",
      priceAmount: "priceAmount",
      priceFrom: "priceFrom",
      currency: "currency",
      published: "published",
      media: "heroImage",
    },
    prepare: ({ title, departure, priceAmount, priceFrom, currency, published, media }) => ({
      title: published === false ? `${title} (hidden)` : title,
      subtitle: [
        departure,
        priceAmount != null
          ? `${priceFrom ? "from " : ""}${priceAmount} ${currency ?? "USD"}`
          : null,
      ]
        .filter(Boolean)
        .join(" - "),
      media,
    }),
  },
});
