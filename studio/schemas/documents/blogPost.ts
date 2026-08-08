import { defineArrayMember, defineField, defineType } from "sanity";
import { postBodyMembers } from "../objects/postBlocks";

/**
 * Mirrors `BlogPost` in src/content/types.ts.
 *
 * queries.ts flattens: author->name, relatedDestination->slug.current,
 * relatedTours[]->slug.current, FAQ -> faqs, seoTitle/seoDescription/ogImage +
 * route -> BlogPost.seo. Keep the names as they are.
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Artykuł poradnika",
  type: "document",
  groups: [
    { name: "content", title: "Treść", default: true },
    { name: "body", title: "Tekst artykułu" },
    { name: "relations", title: "Powiązania" },
    { name: "seo", title: "SEO i publikacja" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "h1",
      title: "Nagłówek H1",
      type: "string",
      group: "content",
      description: "Może być krótszy niż tytuł listingowy.",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Pełna ścieżka URL",
      type: "string",
      group: "content",
      description: 'Bez slasha na końcu, np. "/poradnik/co-zabrac-na-wycieczke-do-kairu".',
      validation: (rule) =>
        rule.required().regex(/^\/poradnik\/[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: '"/poradnik/slug-artykulu"',
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Zajawka",
      type: "text",
      group: "content",
      rows: 3,
      description: "Krótkie streszczenie na listing poradnika.",
      validation: (rule) => rule.required().min(60).max(320),
    }),
    defineField({
      name: "directAnswer",
      title: "Odpowiedź wprost",
      type: "text",
      group: "content",
      rows: 5,
      description:
        "Zwięzła odpowiedź na pytanie z tytułu, pokazywana na górze artykułu (pod kątem wyników z odpowiedzią). Pełne zdania, konkrety.",
      validation: (rule) => rule.required().min(80),
    }),
    defineField({
      name: "featuredImage",
      title: "Obraz wyróżniający",
      type: "mediaImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      group: "content",
      description: 'Np. "Przed wyjazdem".',
      validation: (rule) => rule.required(),
    }),

    // --- Tekst artykułu ------------------------------------------------------
    defineField({
      name: "body",
      title: "Treść",
      type: "array",
      group: "body",
      of: postBodyMembers,
      description:
        "Zamknięty zestaw bloków (nagłówek, akapit, lista, wyróżnienie). Bez HTML - frontend renderuje bloki bezpiecznie.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "FAQ",
      title: "FAQ artykułu",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "faqItem" })],
      description: "Nazwa pola musi pozostać „FAQ” - tak odczytuje ją queries.ts.",
    }),
    defineField({
      name: "sources",
      title: "Źródła",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "labelledNote" })],
      description:
        "Uzupełnij zawsze, gdy artykuł dotyka zmiennych zasad urzędowych (dokumenty, wjazd, przepisy).",
    }),

    // --- Powiązania ----------------------------------------------------------
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      group: "relations",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    // Editorial cross-links are WEAK - see the same note in tour.ts.
    defineField({
      name: "relatedDestination",
      title: "Powiązany kierunek",
      type: "reference",
      group: "relations",
      to: [{ type: "destination" }],
      weak: true,
      description: "Zostaw puste, jeśli artykuł dotyczy wszystkich kierunków.",
    }),
    defineField({
      name: "relatedTours",
      title: "Powiązane wycieczki",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }], weak: true })],
    }),

    // --- SEO i publikacja ----------------------------------------------------
    defineField({
      name: "seoTitle",
      title: "SEO - tytuł",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO - opis",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "ogImage",
      title: "Obraz Open Graph (ścieżka)",
      type: "string",
      group: "seo",
      validation: (rule) =>
        rule.regex(/^\/[a-z0-9\-/]+\.(jpg|jpeg|png|webp)$/i, { name: "ścieżka do pliku obrazu" }),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Data aktualizacji",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) =>
        rule.required().custom((value, ctx) => {
          const published = (ctx.document as { publishedAt?: string } | undefined)?.publishedAt;
          if (!value || !published) return true;
          return value >= published
            ? true
            : "Data aktualizacji nie może być wcześniejsza niż data publikacji";
        }),
    }),
    defineField({
      name: "published",
      title: "Opublikowany",
      type: "boolean",
      group: "seo",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", published: "published" },
    prepare: ({ title, subtitle, published }) => ({
      title: published === false ? `${title} (ukryty)` : title,
      subtitle,
    }),
  },
});
