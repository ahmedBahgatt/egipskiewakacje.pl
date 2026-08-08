import { defineField, defineType } from "sanity";

/**
 * Mirrors `SeoMeta` in src/content/types.ts. Used as a nested object on
 * `destination`.
 *
 * NOTE on the inconsistency: `tour` and `blogPost` store SEO in FLAT fields
 * (seoTitle / seoDescription / ogImage) because src/content/sanity/queries.ts
 * projects them flat and derives canonicalPath from `route`. Do not "tidy" the
 * tour/blogPost schemas into this object without updating queries.ts.
 */
export const seoMeta = defineType({
  name: "seoMeta",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł (title)",
      type: "string",
      description: "Do ok. 60 znaków, żeby nie był ucinany w wynikach wyszukiwania.",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "description",
      title: "Opis (meta description)",
      type: "text",
      rows: 3,
      description: "Do ok. 160 znaków.",
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "canonicalPath",
      title: "Ścieżka kanoniczna",
      type: "string",
      description: 'Ze slashem na końcu, np. "/wycieczki-z-hurghady/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9\-]+\/)*$/, {
          name: 'ścieżka zaczynająca i kończąca się "/"',
        }),
    }),
    defineField({
      name: "ogImage",
      title: "Obraz Open Graph (ścieżka)",
      type: "string",
      description:
        'Ścieżka do gotowego pliku pod /public, Z rozszerzeniem, np. "/media/og/hurghada.jpg".',
      validation: (rule) =>
        rule.regex(/^\/[a-z0-9\-/]+\.(jpg|jpeg|png|webp)$/i, {
          name: "ścieżka do pliku obrazu",
        }),
    }),
  ],
});
