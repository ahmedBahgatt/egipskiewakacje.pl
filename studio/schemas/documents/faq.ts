import { defineField, defineType } from "sanity";

/**
 * Standalone FAQ entry. Mirrors the site-wide FAQ list in
 * src/content/local/site.ts (`siteFaqs`).
 *
 * Tour-specific and destination-specific questions live INSIDE those documents
 * (tour.faqs, destination.faqs). Use `scope` here to keep the site-wide set
 * separate from anything added later. Admin UI English; values stay Polish.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
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
      rows: 5,
      description: "Polish answer.",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "scope",
      title: "Scope",
      type: "string",
      options: {
        list: [
          { title: "Whole site", value: "site" },
          { title: "Booking", value: "booking" },
          { title: "Pricing", value: "pricing" },
          { title: "Logistics", value: "logistics" },
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
