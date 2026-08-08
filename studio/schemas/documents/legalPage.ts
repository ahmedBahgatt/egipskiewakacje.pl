import { defineField, defineType } from "sanity";
import { postBodyMembers } from "../objects/postBlocks";

/**
 * Mirrors `LegalPage` in src/content/types.ts (regulamin, polityka
 * prywatności, polityka cookies).
 *
 * These documents must describe what the site ACTUALLY does: static export,
 * no payments, no booking data stored, WhatsApp handover. Do not paste generic
 * templates - the operator's legal identity fields are still missing and are
 * flagged inside the seeded content with a warning callout.
 */
export const legalPage = defineType({
  name: "legalPage",
  title: "Strona prawna",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
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
      title: "Ścieżka URL",
      type: "string",
      description: 'Bez slasha na końcu, np. "/regulamin".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*$/, { name: '"/slug-strony"' }),
    }),
    defineField({
      name: "updatedAt",
      title: "Data aktualizacji",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Treść",
      type: "array",
      of: postBodyMembers,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO - tytuł",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO - opis",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(50).max(175),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "route" },
  },
});
