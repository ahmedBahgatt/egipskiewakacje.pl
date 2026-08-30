import { defineField, defineType } from "sanity";

/** Mirrors `FaqItem` in src/content/types.ts. Rendered as FAQPage JSON-LD. */
export const faqItem = defineType({
  name: "faqItem",
  title: "Question & Answer",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "Polish question.",
      validation: (rule) => rule.required().min(5).max(180),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      description:
        "A concrete Polish answer. Do not promise unconfirmed things (e.g. guide language if it is not certain).",
      validation: (rule) => rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});
