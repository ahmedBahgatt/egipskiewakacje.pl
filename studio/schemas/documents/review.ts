import { defineField, defineType } from "sanity";

/**
 * Mirrors `Review` in src/content/types.ts.
 *
 * The frontend renders ONLY reviews with `verified: true`, and the reviews
 * section disappears entirely when there are none. The seed deliberately
 * creates zero reviews: no invented names, ratings or quotes. Add a document
 * here only for a real, checkable review, and tick `verified` only once you
 * have actually checked it. Admin UI English; values stay Polish.
 */
export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Reviewer name",
      type: "string",
      description: "First name, or first name and initial, exactly as the customer provided.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Review text",
      type: "text",
      rows: 4,
      description: "The review itself, in Polish.",
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tour",
      title: "Tour",
      type: "reference",
      to: [{ type: "tour" }],
      weak: true,
    }),
    defineField({
      name: "verified",
      title: "Verified",
      type: "boolean",
      description:
        "Tick ONLY for a review that is actually confirmed. Unverified reviews are never shown on the site.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author", rating: "rating", verified: "verified", date: "date" },
    prepare: ({ title, rating, verified, date }) => ({
      title: `${title} - ${rating ?? "?"}/5`,
      subtitle: `${date ?? ""}${verified ? "" : " (unverified)"}`,
    }),
  },
});
