import { defineField, defineType } from "sanity";

/**
 * Mirrors one item of `Tour.attractions` in src/content/types.ts - an
 * entity-rich "what you will see" section (Giza, Sphinx, Egyptian Museum, ...)
 * rendered as an H3 block on the tour page for clean, factual AEO/GEO HTML.
 * Opt-in per tour; GROQ projects `attractions[]{ title, body }`.
 */
export const tourAttraction = defineType({
  name: "tourAttraction",
  title: "Atrakcja (co zobaczysz)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "body",
      title: "Opis",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
