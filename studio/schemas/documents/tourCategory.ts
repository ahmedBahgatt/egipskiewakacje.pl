import { defineField, defineType } from "sanity";

/**
 * Editorial grouping for tours. Organisational only - the current frontend
 * queries reference it by slug, so the taxonomy stays code-owned. Admin UI
 * English; values stay Polish.
 */
export const tourCategory = defineType({
  name: "tourCategory",
  title: "Tour Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: "Polish category name.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short Polish description of the category.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
