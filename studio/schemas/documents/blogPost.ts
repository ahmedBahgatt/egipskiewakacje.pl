import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "../objects/imageWithAlt";
import { postBodyMembers } from "../objects/postBlocks";

/**
 * Mirrors `BlogPost` in src/content/types.ts.
 *
 * queries.ts flattens: author->name, relatedDestination->slug.current,
 * relatedTours[]->slug.current, seoTitle/seoDescription/canonicalPath/ogImage
 * -> BlogPost.seo. Keep the field NAMES as they are.
 *
 * `body` accepts the full block set (see ../objects/postBlocks.ts). There is no
 * rich-text or HTML field anywhere. Admin UI English; values stay Polish.
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "body", title: "Article Body" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO & Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Polish title used on the listing.",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "h1",
      title: "H1 Heading",
      type: "string",
      group: "content",
      description: "Polish. May be shorter than the listing title.",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "URL identifier. Changing it on a published article can break its URL and SEO - change only for an intentional URL migration.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Full URL path",
      type: "string",
      group: "content",
      description: 'Without a trailing slash, e.g. "/poradnik/co-zabrac-na-wycieczke-do-kairu".',
      validation: (rule) =>
        rule.required().regex(/^\/poradnik\/[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: '"/poradnik/article-slug"',
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description: "Short Polish summary for the blog listing.",
      validation: (rule) => rule.required().min(60).max(320),
    }),
    defineField({
      name: "directAnswer",
      title: "Direct answer",
      type: "text",
      group: "content",
      rows: 5,
      description:
        "Concise Polish answer to the title question, shown at the top of the article (for featured-snippet / AIO intent). Full sentences, specifics.",
      validation: (rule) => rule.required().min(80),
    }),
    imageField({
      name: "featuredImage",
      title: "Featured Image",
      group: "content",
      required: true,
      description:
        "Image on the blog listing and at the top of the article. Set the focus point - the card crop is wider than the article page.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description: 'Polish, e.g. "Przed wyjazdem".',
      validation: (rule) => rule.required(),
    }),

    // --- Article Body --------------------------------------------------------
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "body",
      of: postBodyMembers(),
      description:
        "Closed set of blocks: heading, paragraph, list, callout, image, gallery, quote, table, button and related-tour card. No HTML - the frontend renders blocks safely. Polish content.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "faqs",
      title: "Article FAQ",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "faqItem" })],
      description: "Questions and answers rendered as FAQPage JSON-LD.",
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "labelledNote" })],
      description:
        "Always fill in when the article touches changeable official rules (documents, entry, regulations).",
    }),

    // --- Relations -----------------------------------------------------------
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "relations",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedDestination",
      title: "Related destination",
      type: "reference",
      group: "relations",
      to: [{ type: "destination" }],
      weak: true,
      description: "Leave empty if the article applies to all destinations.",
    }),
    defineField({
      name: "relatedTours",
      title: "Related tours",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }], weak: true })],
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
      description: 'Advanced. The path from "Full URL path" but WITH a trailing slash.',
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
        "Image shown when the link is shared (Facebook, WhatsApp). Ideally a 1200x630 landscape crop. Empty = the featured image.",
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated date",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) =>
        rule.required().custom((value, ctx) => {
          const published = (ctx.document as { publishedAt?: string } | undefined)?.publishedAt;
          if (!value || !published) return true;
          return value >= published
            ? true
            : "The updated date cannot be earlier than the publication date";
        }),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      group: "seo",
      description: "Untick to hide the article on the site without deleting the document.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      published: "published",
      media: "featuredImage",
    },
    prepare: ({ title, subtitle, published, media }) => ({
      title: published === false ? `${title} (hidden)` : title,
      subtitle,
      media,
    }),
  },
});
