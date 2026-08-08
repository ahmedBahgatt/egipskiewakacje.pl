import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Mirrors `Destination` in src/content/types.ts.
 *
 * The slug is constrained to the three values of the `DestinationSlug` union.
 * Adding a fourth destination requires a frontend change (types.ts + routes),
 * so the list is intentionally closed here rather than free text.
 */
export const destination = defineType({
  name: "destination",
  title: "Kierunek",
  type: "document",
  groups: [
    { name: "content", title: "Treść", default: true },
    { name: "media", title: "Media" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      group: "content",
      description: 'Mianownik, np. "Hurghada".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameGenitive",
      title: "Nazwa w dopełniaczu",
      type: "string",
      group: "content",
      description: 'Forma używana w zdaniach: "wycieczki z ...", np. "Hurghady".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "Musi być jedną z trzech wartości obsługiwanych przez frontend: hurghada, marsa-alam, sharm-el-sheikh.",
      options: {
        source: "name",
        maxLength: 64,
        isUnique: () => true,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const allowed = ["hurghada", "marsa-alam", "sharm-el-sheikh"];
          if (!value?.current) return "Slug jest wymagany";
          return allowed.includes(value.current)
            ? true
            : `Dozwolone wartości: ${allowed.join(", ")} (typ DestinationSlug w src/content/types.ts)`;
        }),
    }),
    defineField({
      name: "routeBase",
      title: "Bazowa ścieżka URL",
      type: "string",
      group: "content",
      description: 'Bez slasha na końcu, np. "/wycieczki-z-hurghady".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*$/, { name: 'ścieżka typu "/wycieczki-z-..."' }),
    }),
    defineField({
      name: "shortIntro",
      title: "Wprowadzenie",
      type: "text",
      group: "content",
      rows: 5,
      description: "Kilka zdań o tym, czym wyróżnia się ten kierunek. Bez marketingowych obietnic.",
      validation: (rule) => rule.required().min(80),
    }),
    defineField({
      name: "primaryQuery",
      title: "Główna fraza docelowa",
      type: "string",
      group: "seo",
      description:
        'Jedna fraza na kierunek, np. "wycieczki z Hurghady". Różne frazy zapobiegają kanibalizacji.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Obraz główny",
      type: "mediaImage",
      group: "media",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "practical",
      title: "Informacje praktyczne",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Krótkie punkty: odbiór, transport, czas trwania, dopłaty.",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "faqs",
      title: "FAQ kierunku",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "routeBase" },
  },
});
