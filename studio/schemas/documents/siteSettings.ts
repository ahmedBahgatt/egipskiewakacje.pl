import { defineField, defineType } from "sanity";

/**
 * Singleton - mirrors `SiteSettings` in src/content/types.ts.
 * Pinned to the document id "siteSettings" by studio/structure.ts; the create
 * template is removed in sanity.config.ts so a second copy cannot appear.
 * Admin UI English; values stay Polish.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Brand name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short Polish sentence describing what the site is.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      description: "Default Polish meta description for the homepage.",
      validation: (rule) => rule.required().min(50).max(320),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description:
        'wa.me format: digits with country code, WITHOUT "+" or spaces, e.g. "201055850536".',
      validation: (rule) =>
        rule.required().regex(/^[0-9]{8,15}$/, { name: "digits only, 8-15 characters" }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
