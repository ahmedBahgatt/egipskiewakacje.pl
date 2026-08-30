import { defineField, defineType } from "sanity";

/**
 * Article author. The default is the organisational author
 * "Zespół Egipskie Wakacje" - no invented personal names or credentials.
 * GROQ projects only `name` (see queries.ts: "author": author->name).
 * Admin UI English; values stay Polish.
 */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Polish, e.g. "Zespół Egipskie Wakacje". Do not invent personal names.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'Polish, e.g. "Redakcja". Shown next to the author name.',
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "A few Polish sentences on who prepares the content. Facts only.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
