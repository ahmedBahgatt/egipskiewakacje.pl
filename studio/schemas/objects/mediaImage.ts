import { defineField, defineType } from "sanity";

/**
 * Mirrors `MediaImage` in src/content/types.ts.
 *
 * Deliberately NOT a Sanity image asset: the frontend is a static export that
 * serves pre-optimised local files from /public and generates responsive
 * variants at build time (scripts/generate-media.mjs). `src` is the base path
 * WITHOUT an extension, e.g. "/media/tours/hurghada-kair".
 *
 * GROQ projects heroImage.src / .alt / .width / .height directly - see
 * src/content/sanity/queries.ts. Do not rename these fields.
 */
export const mediaImage = defineType({
  name: "mediaImage",
  title: "Obraz",
  type: "object",
  fields: [
    defineField({
      name: "src",
      title: "Ścieżka bazowa (bez rozszerzenia)",
      type: "string",
      description:
        'Ścieżka pod /public, bez rozszerzenia pliku. Przykład: "/media/tours/hurghada-kair". Warianty (avif/webp, rozmiary) generuje frontend.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\/[a-z0-9][a-z0-9\-/]*$/i, {
            name: 'ścieżka zaczynająca się od "/" bez rozszerzenia',
          }),
    }),
    defineField({
      name: "alt",
      title: "Tekst alternatywny (PL)",
      type: "string",
      description:
        "Rzetelny opis obrazu po polsku. Pusty tekst tylko dla grafiki czysto dekoracyjnej.",
      validation: (rule) =>
        rule
          .custom((value) =>
            typeof value === "string"
              ? true
              : "Wymagany opis alt (pusty tekst tylko dla grafiki dekoracyjnej)",
          )
          .max(200),
    }),
    defineField({
      name: "width",
      title: "Szerokość (px)",
      type: "number",
      description: "Szerokość pliku źródłowego - zapobiega przesunięciom układu (CLS).",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "height",
      title: "Wysokość (px)",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "src" },
    prepare: ({ title, subtitle }) => ({
      title: title || "(obraz dekoracyjny)",
      subtitle,
    }),
  },
});
