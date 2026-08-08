import { defineField, defineType } from "sanity";

/**
 * Editorial grouping for tours. Organisational only - the current frontend
 * queries do not project it, so adding or renaming categories cannot break the
 * public site.
 */
export const tourCategory = defineType({
  name: "tourCategory",
  title: "Kategoria wycieczek",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa",
      type: "string",
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
      title: "Opis",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
