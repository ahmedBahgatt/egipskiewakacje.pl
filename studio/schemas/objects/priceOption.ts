import { defineField, defineType } from "sanity";

/**
 * Mirrors `PriceOption` in src/content/types.ts - one line in a tour's price
 * breakdown (adult, child, a boat variant, a diving course, ...).
 *
 * Stored on `tour.priceOptions`. GROQ projects it verbatim into
 * `Tour.price.options`. Not every tour is per-person adult/child, so this
 * object is deliberately generic. Admin UI English; values stay Polish.
 */
export const priceOption = defineType({
  name: "priceOption",
  title: "Price line",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        'Polish, e.g. "Dorosły", "Dziecko 5-11 lat", "2-osobowe buggy", "Kurs (2 nurkowania)".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      description: 'Amount in the tour currency. For free lines enter 0 and tick "Free".',
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "USD", value: "USD" },
          { title: "EUR", value: "EUR" },
        ],
        layout: "radio",
      },
      initialValue: "USD",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Unit (optional)",
      type: "string",
      description:
        'Polish. Overrides the headline unit for this line only, e.g. "łódź", "buggy". Empty = the tour unit.',
    }),
    defineField({
      name: "note",
      title: "Note (optional)",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "free",
      title: "Free",
      type: "boolean",
      description: 'Show "bezpłatnie" instead of an amount (e.g. the youngest children).',
      initialValue: false,
    }),
  ],
  preview: {
    select: { label: "label", amount: "amount", currency: "currency", unit: "unit", free: "free" },
    prepare: ({ label, amount, currency, unit, free }) => ({
      title: label,
      subtitle: free
        ? "free"
        : `${amount ?? "?"} ${currency ?? "USD"}${unit ? ` / ${unit}` : ""}`,
    }),
  },
});
