import { defineField, defineType } from "sanity";

/**
 * Mirrors `PriceOption` in src/content/types.ts - one line in a tour's price
 * breakdown (adult, child, a boat variant, a diving course, ...).
 *
 * Stored on `tour.priceOptions`. GROQ projects it verbatim into
 * `Tour.price.options` (see src/content/sanity/queries.ts). Not every tour is
 * per-person adult/child: per-boat, per-vehicle (quad/buggy) and per-course
 * (diving) tours list their own variants here, so this object is deliberately
 * generic - a label plus an amount, with an optional per-line unit override and
 * a `free` flag for infants.
 */
export const priceOption = defineType({
  name: "priceOption",
  title: "Pozycja cennika",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Etykieta",
      type: "string",
      description:
        'Np. "Dorosły", "Dziecko 5-11 lat", "2-osobowe buggy", "Kurs (2 nurkowania)".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "amount",
      title: "Kwota",
      type: "number",
      description: 'Kwota w walucie wycieczki. Dla pozycji bezpłatnych wpisz 0 i zaznacz "Bezpłatnie".',
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "currency",
      title: "Waluta",
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
      title: "Jednostka (opcjonalnie)",
      type: "string",
      description:
        'Nadpisuje jednostkę nagłówkową tylko dla tej pozycji, np. "łódź", "buggy". Puste = jednostka wycieczki.',
    }),
    defineField({
      name: "note",
      title: "Uwaga (opcjonalnie)",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "free",
      title: "Bezpłatnie",
      type: "boolean",
      description: 'Pokaż "bezpłatnie" zamiast kwoty (np. najmłodsze dzieci).',
      initialValue: false,
    }),
  ],
  preview: {
    select: { label: "label", amount: "amount", currency: "currency", unit: "unit", free: "free" },
    prepare: ({ label, amount, currency, unit, free }) => ({
      title: label,
      subtitle: free
        ? "bezpłatnie"
        : `${amount ?? "?"} ${currency ?? "USD"}${unit ? ` / ${unit}` : ""}`,
    }),
  },
});
