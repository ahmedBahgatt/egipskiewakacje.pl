import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "../objects/imageWithAlt";
import { postBodyMembers } from "../objects/postBlocks";

/**
 * Mirrors `BlogPost` in src/content/types.ts.
 *
 * queries.ts flattens: author->name, relatedDestination->slug.current,
 * relatedTours[]->slug.current, seoTitle/seoDescription/canonicalPath/ogImage
 * -> BlogPost.seo. Keep the names as they are.
 *
 * `body` accepts the full block set (see ../objects/postBlocks.ts): heading,
 * paragraph, list, callout, image, gallery, quote, table, link button and a
 * related-tour card. There is still no rich-text or HTML field anywhere.
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
    imageField({
      name: "featuredImage",
      title: "Obraz wyróżniający",
      group: "content",
      required: true,
      description:
        "Zdjęcie na listingu poradnika i na górze artykułu. Ustaw punkt ostrości - kadr na karcie jest szerszy niż na stronie artykułu.",
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
      of: postBodyMembers(),
      description:
        "Zamknięty zestaw bloków: nagłówek, akapit, lista, wyróżnienie, obraz, galeria, cytat, tabela, przycisk i polecana wycieczka. Bez HTML - frontend renderuje bloki bezpiecznie.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "faqs",
      title: "FAQ artykułu",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "faqItem" })],
      description: "Pytania i odpowiedzi renderowane jako FAQPage JSON-LD.",
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
      name: "canonicalPath",
      title: "Ścieżka kanoniczna",
      type: "string",
      group: "seo",
      description: 'Ścieżka z pola "Pełna ścieżka URL", ale ZE slashem na końcu.',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'ścieżka zaczynająca i kończąca się "/"',
        }),
    }),
    imageField({
      name: "ogImage",
      title: "Obraz Open Graph (opcjonalnie)",
      group: "seo",
      description:
        "Obraz pokazywany przy udostępnianiu linku (Facebook, WhatsApp). Najlepiej kadr poziomy 1200x630. Puste = obraz wyróżniający.",
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
    select: {
      title: "title",
      subtitle: "publishedAt",
      published: "published",
      media: "featuredImage",
    },
    prepare: ({ title, subtitle, published, media }) => ({
      title: published === false ? `${title} (ukryty)` : title,
      subtitle,
      media,
    }),
  },
});
