import { defineField, defineType } from "sanity";

/**
 * Mirrors `Review` in src/content/types.ts.
 *
 * The frontend renders ONLY reviews with `verified: true`, and the reviews
 * section disappears entirely when there are none. The seed deliberately
 * creates zero reviews: no invented names, ratings or quotes. Add a document
 * here only for a real, checkable review, and tick `verified` only once you
 * have actually checked it.
 */
export const review = defineType({
  name: "review",
  title: "Opinia",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Autor opinii",
      type: "string",
      description: "Imię lub imię i pierwsza litera nazwiska, zgodnie z tym, co podał klient.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Ocena (1-5)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "quote",
      title: "Treść",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tour",
      title: "Wycieczka",
      type: "reference",
      to: [{ type: "tour" }],
      weak: true,
    }),
    defineField({
      name: "verified",
      title: "Zweryfikowana",
      type: "boolean",
      description:
        "Zaznacz TYLKO dla opinii faktycznie potwierdzonej. Niezweryfikowane opinie nie są nigdzie pokazywane.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author", rating: "rating", verified: "verified", date: "date" },
    prepare: ({ title, rating, verified, date }) => ({
      title: `${title} - ${rating ?? "?"}/5`,
      subtitle: `${date ?? ""}${verified ? "" : " (niezweryfikowana)"}`,
    }),
  },
});
