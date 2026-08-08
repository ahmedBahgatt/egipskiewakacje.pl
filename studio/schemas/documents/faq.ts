import { defineField, defineType } from "sanity";

/**
 * Standalone FAQ entry. Mirrors the site-wide FAQ list in
 * src/content/local/site.ts (`siteFaqs`).
 *
 * Tour-specific and destination-specific questions live INSIDE those documents
 * (tour.FAQs, destination.faqs). Use `scope` here to keep the site-wide set
 * separate from anything added later.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
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
      rows: 5,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "scope",
      title: "Zakres",
      type: "string",
      options: {
        list: [
          { title: "Cały serwis", value: "site" },
          { title: "Rezerwacja", value: "booking" },
          { title: "Ceny", value: "pricing" },
          { title: "Logistyka", value: "logistics" },
        ],
      },
      initialValue: "site",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "scope" },
  },
});
