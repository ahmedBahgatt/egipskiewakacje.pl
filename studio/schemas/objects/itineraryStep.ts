import { defineField, defineType } from "sanity";

/** Mirrors `ItineraryStep` in src/content/types.ts. */
export const itineraryStep = defineType({
  name: "itineraryStep",
  title: "Itinerary Step",
  type: "object",
  fields: [
    defineField({
      name: "time",
      title: "Time (optional)",
      type: "string",
      description: 'Approximate Polish time label, e.g. "00:00-02:00" or "Południe". May be empty.',
    }),
    defineField({
      name: "title",
      title: "Step title",
      type: "string",
      description: "Polish title of this step.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Polish description of this step.",
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
