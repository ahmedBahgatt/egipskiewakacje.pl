import { defineField, defineType } from "sanity";

/** Mirrors `ItineraryStep` in src/content/types.ts. */
export const itineraryStep = defineType({
  name: "itineraryStep",
  title: "Punkt programu",
  type: "object",
  fields: [
    defineField({
      name: "time",
      title: "Godzina (opcjonalnie)",
      type: "string",
      description: 'Przybliżona etykieta czasu, np. "00:00-02:00" albo "Południe". Może być pusta.',
    }),
    defineField({
      name: "title",
      title: "Tytuł punktu",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "title", time: "time", description: "description" },
    prepare: ({ title, time, description }) => ({
      title: time ? `${time} - ${title}` : title,
      subtitle: description,
    }),
  },
});
