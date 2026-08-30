import { defineField, defineType } from "sanity";

import { legalBodyMembers } from "../objects/postBlocks";

/**
 * Mirrors `LegalPage` in src/content/types.ts (regulamin, polityka
 * prywatności, polityka cookies).
 *
 * `body` is deliberately limited to TEXT blocks (heading / paragraph / list /
 * callout). Images, promo buttons and tour cards do not belong in a legal
 * document. Admin UI English; values stay Polish.
 */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Polish page title.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "URL path",
      type: "string",
      description: 'Without a trailing slash, e.g. "/regulamin".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*$/, { name: '"/page-slug"' }),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: legalBodyMembers(),
      description: "Text blocks only: heading, paragraph, list, callout. Polish content.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Polish. Up to ~60 characters.",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Polish. Up to ~160 characters.",
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      description: 'Advanced. The path from "URL path" but WITH a trailing slash, e.g. "/regulamin/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'path starting and ending with "/"',
        }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "route" },
  },
});
