import { defineField, defineType } from "sanity";

/**
 * Singleton - mirrors `SiteSettings` in src/content/types.ts.
 * Pinned to the document id "siteSettings" by studio/structure.ts; the create
 * template is removed in sanity.config.ts so a second copy cannot appear.
 *
 * WARNING: the legacy dataset already contains a `siteSettings` document from
 * the old all-inclusive concept. The seed script refuses to overwrite a
 * document whose _type differs, but an existing `siteSettings` doc at this id
 * WILL be replaced. Check its contents before seeding.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ustawienia serwisu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa marki",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Hasło",
      type: "string",
      description: "Krótkie zdanie opisujące, czym jest serwis.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Opis serwisu",
      type: "text",
      rows: 3,
      description: "Domyślny meta description strony głównej.",
      validation: (rule) => rule.required().min(50).max(320),
    }),
    defineField({
      name: "whatsappNumber",
      title: "Numer WhatsApp",
      type: "string",
      description:
        'Format wa.me: same cyfry z numerem kierunkowym, BEZ "+" i spacji, np. "201055850536".',
      validation: (rule) =>
        rule.required().regex(/^[0-9]{8,15}$/, { name: "same cyfry, 8-15 znaków" }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
