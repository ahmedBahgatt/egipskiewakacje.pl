import { defineField, defineType } from "sanity";

/**
 * Shared { label, note } pair. Used twice with different wording:
 *  - `tour.extras`   -> optional paid extras (mirrors Tour.extras)
 *  - `blogPost.sources` -> visible sources for changeable official rules
 *    (mirrors BlogPost.sources)
 */
export const labelledNote = defineType({
  name: "labelledNote",
  title: "Labelled note",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Polish label.",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "note",
      title: "Description / note",
      type: "text",
      rows: 2,
      description:
        'Polish. For extras: what and how much, e.g. "ok. 10-12 USD od osoby, płatny na miejscu". For sources: what it covers and where to check current rules.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "note" },
  },
});
