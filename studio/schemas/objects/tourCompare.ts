import { defineField, defineType } from "sanity";

/**
 * Mirrors `Tour.compare` in src/content/types.ts - an optional internal
 * comparison callout (e.g. bus vs plane) that always links to a real internal
 * route. GROQ projects `compare{ note, linkLabel, href }`.
 *
 * `href` is validated as an INTERNAL path so this callout can never point off
 * site; internal-link integrity is the whole point of the field.
 */
export const tourCompare = defineType({
  name: "tourCompare",
  title: "Porównanie / odnośnik wewnętrzny",
  type: "object",
  fields: [
    defineField({
      name: "note",
      title: "Treść",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "linkLabel",
      title: "Etykieta linku",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "href",
      title: "Ścieżka wewnętrzna",
      type: "string",
      description: 'Ścieżka w serwisie, np. "/wycieczki-z-hurghady/kair-samolotem/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'ścieżka wewnętrzna zaczynająca i kończąca się "/"',
        }),
    }),
  ],
  preview: {
    select: { title: "linkLabel", subtitle: "href" },
  },
});
