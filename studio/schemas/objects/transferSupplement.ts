import { defineField, defineType } from "sanity";

/**
 * Mirrors `TransferSupplement` in src/content/types.ts.
 * Stored on `tour.transferSupplements`, same name on both sides.
 */
export const transferSupplement = defineType({
  name: "transferSupplement",
  title: "Dopłata za transfer",
  type: "object",
  fields: [
    defineField({
      name: "zone",
      title: "Strefa / hotele",
      type: "string",
      description: "Czytelna etykieta stref hotelowych objętych dopłatą.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Dopłata (USD od osoby)",
      type: "number",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
  ],
  preview: {
    select: { title: "zone", amount: "amount" },
    prepare: ({ title, amount }) => ({
      title,
      subtitle: typeof amount === "number" ? `+${amount} USD / os.` : undefined,
    }),
  },
});
