import { defineField, defineType } from "sanity";

/**
 * Mirrors `Tour.compare` in src/content/types.ts - an optional internal
 * comparison callout (e.g. bus vs plane) that always links to a real internal
 * route. GROQ projects `{ note, linkLabel, href }`. `href` is validated as an
 * INTERNAL path. Admin UI English; values stay Polish.
 */
export const tourCompare = defineType({
  name: "tourCompare",
  title: "Comparison / internal link",
  type: "object",
  fields: [
    defineField({
      name: "note",
      title: "Text",
      type: "text",
      rows: 3,
      description: "Polish callout text.",
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "linkLabel",
      title: "Link label",
      type: "string",
      description: "Polish link label.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "href",
      title: "Internal path",
      type: "string",
      description: 'Path within the site, e.g. "/wycieczki-z-hurghady/kair-samolotem/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'internal path starting and ending with "/"',
        }),
    }),
  ],
  preview: {
    select: { title: "linkLabel", subtitle: "href" },
  },
});
