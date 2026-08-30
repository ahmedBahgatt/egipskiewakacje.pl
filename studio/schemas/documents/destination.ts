import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "../objects/imageWithAlt";

/**
 * Mirrors `Destination` in src/content/types.ts.
 *
 * The slug is constrained to the three values of the `DestinationSlug` union.
 * Adding a fourth destination requires a frontend change (types.ts + routes),
 * so the list is intentionally closed here rather than free text.
 *
 * SEO fields are FLAT (seoTitle / seoDescription / canonicalPath / ogImage).
 * GROQ assembles `SeoMeta` from them - see src/content/sanity/queries.ts.
 * Admin UI English; values stay Polish.
 */
export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      description: 'Polish nominative form, e.g. "Hurghada".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameGenitive",
      title: "Name in genitive form",
      type: "string",
      group: "content",
      description:
        'Polish grammatical (genitive) form used in phrases such as "wycieczki z ...", for example "Hurghady".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "H1 Heading (optional)",
      type: "string",
      group: "content",
      description:
        'Optional Polish H1. Overrides the default "Wycieczki z {genitive}". Set only when a stronger phrase wins, e.g. "Wycieczki fakultatywne z Marsa Alam".',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "Must be one of the three values the frontend supports: hurghada, marsa-alam, sharm-el-sheikh. Do not change on a published destination.",
      options: {
        source: "name",
        maxLength: 64,
        isUnique: () => true,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const allowed = ["hurghada", "marsa-alam", "sharm-el-sheikh"];
          if (!value?.current) return "Slug is required";
          return allowed.includes(value.current)
            ? true
            : `Allowed values: ${allowed.join(", ")} (DestinationSlug in src/content/types.ts)`;
        }),
    }),
    defineField({
      name: "routeBase",
      title: "Base URL path",
      type: "string",
      group: "content",
      description: 'Without a trailing slash, e.g. "/wycieczki-z-hurghady".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*$/, { name: 'path like "/wycieczki-z-..."' }),
    }),
    defineField({
      name: "shortIntro",
      title: "Intro",
      type: "text",
      group: "content",
      rows: 5,
      description: "A few Polish sentences on what makes this destination stand out. No marketing promises.",
      validation: (rule) => rule.required().min(80),
    }),
    defineField({
      name: "practical",
      title: "Practical information",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Short Polish points: pickup, transport, duration, surcharges.",
      validation: (rule) => rule.min(1),
    }),

    // --- Media ---------------------------------------------------------------
    imageField({
      name: "heroImage",
      title: "Featured Image",
      group: "media",
      required: true,
      description:
        "Drag in the destination photo. Set the focus point (hotspot) on what must stay visible when cropped on narrow screens.",
    }),

    // --- FAQ -----------------------------------------------------------------
    defineField({
      name: "faqs",
      title: "Destination FAQ",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(1),
    }),

    // --- SEO -----------------------------------------------------------------
    defineField({
      name: "primaryQuery",
      title: "Primary target query",
      type: "string",
      group: "seo",
      description:
        'Editorial only. One Polish phrase per destination, e.g. "wycieczki z Hurghady". Distinct phrases prevent cannibalisation.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Polish. Up to ~60 characters so it is not truncated in search results.",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Polish. Up to ~160 characters.",
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      group: "seo",
      description: 'Advanced. With a trailing slash, e.g. "/wycieczki-z-hurghady/".',
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
        "Image shown when the link is shared (Facebook, WhatsApp). Ideally a 1200x630 landscape crop. Empty = the site's default image.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "routeBase", media: "heroImage" },
  },
});
