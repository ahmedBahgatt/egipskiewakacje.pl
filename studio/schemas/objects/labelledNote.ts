import { defineField, defineType } from "sanity";

/**
 * Shared { label, note } pair. Used twice with different wording:
 *  - `tour.extras`   -> optional paid extras (mirrors Tour.extras)
 *  - `blogPost.sources` -> visible sources for changeable official rules
 *    (mirrors BlogPost.sources)
 */
export const labelledNote = defineType({
  name: "labelledNote",
  title: "Pozycja z opisem",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Nazwa",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "note",
      title: "Opis / uwaga",
      type: "text",
      rows: 2,
      description:
        'Dla dopłat: co i ile, np. "ok. 10-12 USD od osoby, płatny na miejscu". Dla źródeł: czego dotyczy i gdzie sprawdzić aktualne zasady.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "note" },
  },
});
