import { defineField, defineType } from "sanity";

/**
 * Article author. The default is the organisational author
 * "Zespół Egipskie Wakacje" - no invented personal names or credentials.
 * GROQ projects only `name` (see queries.ts: "author": author->name).
 */
export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      description: 'Np. "Zespół Egipskie Wakacje". Nie wymyślaj nazwisk.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rola",
      type: "string",
      description: 'Np. "Redakcja". Wyświetlane obok nazwy autora.',
    }),
    defineField({
      name: "bio",
      title: "Krótki opis",
      type: "text",
      rows: 3,
      description: "Kilka zdań o tym, kto przygotowuje treści. Tylko fakty.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
