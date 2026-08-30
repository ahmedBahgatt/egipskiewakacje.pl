import { defineField, defineType } from "sanity";

/**
 * Mirrors `TransferSupplement` in src/content/types.ts.
 * Stored on `tour.transferSupplements`, same name on both sides.
 */
export const transferSupplement = defineType({
  name: "transferSupplement",
  title: "Transfer Supplement",
  type: "object",
  fields: [
    defineField({
      name: "zone",
      title: "Zone / hotels",
      type: "string",
      description: "Clear Polish label for the hotel zones the surcharge applies to.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Surcharge (USD per person)",
      type: "number",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
  ],
  preview: {
    select: { title: "zone", amount: "amount" },
    prepare: ({ title, amount }) => ({
      title,
      subtitle: typeof amount === "number" ? `+${amount} USD / person` : undefined,
    }),
  },
});
