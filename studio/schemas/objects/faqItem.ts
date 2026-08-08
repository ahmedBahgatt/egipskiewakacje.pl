import { defineField, defineType } from "sanity";

/** Mirrors `FaqItem` in src/content/types.ts. Rendered as FAQPage JSON-LD. */
export const faqItem = defineType({
  name: "faqItem",
  title: "Pytanie i odpowiedź",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Pytanie",
      type: "string",
      validation: (rule) => rule.required().min(5).max(180),
    }),
    defineField({
      name: "answer",
      title: "Odpowiedź",
      type: "text",
      rows: 4,
      description:
        "Konkretna odpowiedź. Nie obiecuj rzeczy niepotwierdzonych (np. języka przewodnika, jeśli nie jest pewny).",
      validation: (rule) => rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});
