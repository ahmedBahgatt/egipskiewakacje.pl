import { defineField, defineType } from "sanity";

/**
 * Mirrors one item of `Tour.attractions` in src/content/types.ts - an
 * entity-rich "what you will see" section (Giza, Sphinx, Egyptian Museum, ...)
 * rendered as an H3 block on the tour page. GROQ projects `{ title, body }`.
 * Admin UI English; values stay Polish.
 */
export const tourAttraction = defineType({
  name: "tourAttraction",
  title: "Attraction (what you'll see)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Polish title.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Polish description.",
      validation: (rule) => rule.required().min(20),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
