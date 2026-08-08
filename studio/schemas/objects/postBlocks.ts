import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField, imageMember } from "./imageWithAlt";

/**
 * Body blocks - a CLOSED set of named object types.
 *
 * Portable Text is deliberately NOT used. The frontend renders these blocks
 * through a switch with no dangerouslySetInnerHTML, so no HTML from the CMS can
 * ever reach the DOM.
 *
 * HOW THE FRONTEND TELLS THEM APART
 * Each block is stored with Sanity's own `_type` ("blockHeading", "blockTable",
 * ...). There is no second, hand-maintained `type` field: the GROQ projection in
 * src/content/sanity/queries.ts maps `_type` onto the `PostBlock` discriminator
 * from src/content/types.ts, e.g.
 *
 *   body[] {
 *     _type == "blockHeading"  => { "type": "heading", "id": anchor.current, text },
 *     _type == "blockParagraph"=> { "type": "paragraph", text },
 *     _type == "blockImage"    => { "type": "image", caption, "image": {...} },
 *     ...
 *   }
 *
 * Adding a block type here means adding one arm to that projection and one case
 * to the renderer. Nothing else.
 */

/**
 * Anchor slugs must survive Polish diacritics: NFD strips the combining marks,
 * but "ł" has no decomposition, so it gets its own pass.
 */
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

const slugifyAnchor = (input: string) =>
  input
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

// --- text ------------------------------------------------------------------

export const blockHeading = defineType({
  name: "blockHeading",
  title: "Nagłówek",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Treść nagłówka",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "anchor",
      title: "Kotwica (opcjonalnie)",
      type: "slug",
      description:
        'Identyfikator do spisu treści i linków w obrębie strony, np. "dokumenty". Kliknij "Generate", żeby utworzyć go z tekstu nagłówka. Musi być unikalny w obrębie dokumentu.',
      options: {
        source: "text",
        maxLength: 96,
        slugify: slugifyAnchor,
        // Anchors only have to be unique inside one document, not dataset-wide.
        isUnique: () => true,
      },
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "anchor.current" },
    prepare: ({ title, subtitle }) => ({
      title: `# ${title ?? ""}`,
      subtitle: subtitle ? `#${subtitle}` : "Nagłówek (bez kotwicy)",
    }),
  },
});

export const blockParagraph = defineType({
  name: "blockParagraph",
  title: "Akapit",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Treść",
      type: "text",
      rows: 6,
      description: "Zwykły tekst. Bez HTML - znaczniki nie zostaną zinterpretowane.",
      validation: (rule) => rule.required().min(20),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: title || "(pusty akapit)", subtitle: "Akapit" }),
  },
});

export const blockList = defineType({
  name: "blockList",
  title: "Lista",
  type: "object",
  initialValue: { ordered: false },
  fields: [
    defineField({
      name: "ordered",
      title: "Lista numerowana",
      type: "boolean",
      description: "Wyłączone: lista punktowana. Włączone: lista numerowana 1, 2, 3.",
      initialValue: false,
    }),
    defineField({
      name: "items",
      title: "Pozycje",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items", ordered: "ordered" },
    prepare: ({ items, ordered }) => ({
      title: Array.isArray(items) && items.length > 0 ? items.join(" | ") : "(pusta lista)",
      subtitle: ordered ? "Lista numerowana" : "Lista punktowana",
    }),
  },
});

export const blockCallout = defineType({
  name: "blockCallout",
  title: "Wyróżnienie",
  type: "object",
  initialValue: { tone: "info" },
  fields: [
    defineField({
      name: "tone",
      title: "Ton",
      type: "string",
      options: {
        list: [
          { title: "Informacja", value: "info" },
          { title: "Ostrzeżenie", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Treść",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "text", tone: "tone" },
    prepare: ({ title, tone }) => ({
      title: title || "(puste wyróżnienie)",
      subtitle: tone === "warning" ? "Ostrzeżenie" : "Informacja",
    }),
  },
});

export const blockQuote = defineType({
  name: "blockQuote",
  title: "Cytat",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Treść cytatu",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "cite",
      title: "Źródło (opcjonalnie)",
      type: "string",
      description: "Kto to powiedział lub skąd pochodzi cytat. Zostaw puste, jeśli nie wiadomo.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "cite" },
    prepare: ({ title, subtitle }) => ({
      title: title ? `„${title}”` : "(pusty cytat)",
      subtitle: subtitle || "Cytat",
    }),
  },
});

// --- media -----------------------------------------------------------------

export const blockImage = defineType({
  name: "blockImage",
  title: "Obraz",
  type: "object",
  fields: [
    imageField({
      name: "image",
      title: "Obraz",
      description: "Przeciągnij plik. Punkt ostrości ustaw tak, żeby przetrwał kadrowanie.",
      required: true,
    }),
    defineField({
      name: "caption",
      title: "Podpis (opcjonalnie)",
      type: "string",
      description:
        "Widoczny podpis pod obrazem. To NIE jest opis alt - alt uzupełnij w samym obrazie.",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: { media: "image", alt: "image.alt", caption: "caption" },
    prepare: ({ media, alt, caption }) => ({
      media,
      title: caption || alt || "(obraz bez podpisu)",
      subtitle: "Obraz",
    }),
  },
});

export const blockGallery = defineType({
  name: "blockGallery",
  title: "Galeria",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Obrazy",
      type: "array",
      of: [imageMember()],
      options: { layout: "grid" },
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { media: "images.0", count: "images" },
    prepare: ({ media, count }) => ({
      media,
      title: "Galeria",
      subtitle: `${Array.isArray(count) ? count.length : 0} obraz(y/ów)`,
    }),
  },
});

// --- table -----------------------------------------------------------------

export const tableRow = defineType({
  name: "tableRow",
  title: "Wiersz",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      title: "Komórki",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Tyle pozycji, ile jest nagłówków kolumn - w tej samej kolejności.",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { cells: "cells" },
    prepare: ({ cells }) => ({
      title: Array.isArray(cells) && cells.length > 0 ? cells.join(" | ") : "(pusty wiersz)",
    }),
  },
});

export const blockTable = defineType({
  name: "blockTable",
  title: "Tabela",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Podpis tabeli (opcjonalnie)",
      type: "string",
      description: "Krótko: co porównuje ta tabela. Pomaga też czytnikom ekranu.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "headers",
      title: "Nagłówki kolumn",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "rows",
      title: "Wiersze",
      type: "array",
      of: [defineArrayMember({ type: "tableRow" })],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((rows, ctx) => {
            const headers = (ctx.parent as { headers?: string[] } | undefined)?.headers;
            if (!Array.isArray(rows) || !Array.isArray(headers)) return true;
            const bad = rows.findIndex(
              (row) => !Array.isArray((row as { cells?: string[] })?.cells)
                || (row as { cells: string[] }).cells.length !== headers.length,
            );
            return bad === -1
              ? true
              : `Wiersz ${bad + 1} ma inną liczbę komórek niż nagłówków (${headers.length})`;
          }),
    }),
  ],
  preview: {
    select: { caption: "caption", headers: "headers", rows: "rows" },
    prepare: ({ caption, headers, rows }) => ({
      title: caption || (Array.isArray(headers) ? headers.join(" | ") : "Tabela"),
      subtitle: `Tabela - ${Array.isArray(rows) ? rows.length : 0} wiersz(y)`,
    }),
  },
});

// --- calls to action -------------------------------------------------------

export const blockLinkButton = defineType({
  name: "blockLinkButton",
  title: "Przycisk z linkiem",
  type: "object",
  initialValue: { external: true },
  fields: [
    defineField({
      name: "label",
      title: "Napis na przycisku",
      type: "string",
      description: 'Konkretnie, co się stanie po kliknięciu, np. "Sprawdź program wycieczki".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "href",
      title: "Adres",
      type: "url",
      description: 'Pełny adres (https://...) albo ścieżka w serwisie (np. "/poradnik/").',
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"], allowRelative: true }),
    }),
    defineField({
      name: "external",
      title: "Link zewnętrzny",
      type: "boolean",
      description:
        "Włączone dla adresów poza egipskiewakacje.pl - link otwiera się w nowej karcie z rel=\"noopener\". Wyłącz dla linków wewnętrznych.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href", external: "external" },
    prepare: ({ title, subtitle, external }) => ({
      title: title || "(przycisk bez napisu)",
      subtitle: `${external ? "zewnętrzny" : "wewnętrzny"} - ${subtitle ?? ""}`,
    }),
  },
});

export const blockRelatedTour = defineType({
  name: "blockRelatedTour",
  title: "Polecana wycieczka",
  type: "object",
  fields: [
    defineField({
      name: "tour",
      title: "Wycieczka",
      type: "reference",
      to: [{ type: "tour" }],
      // Weak: deleting a tour must never be blocked by an article that links it.
      weak: true,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "tour.title", price: "tour.adultPrice" },
    prepare: ({ title, price }) => ({
      title: title || "(wybierz wycieczkę)",
      subtitle: typeof price === "number" ? `Polecana wycieczka - od ${price} USD` : "Polecana wycieczka",
    }),
  },
});

// --- the `of:` lists -------------------------------------------------------
// Functions, not shared constants: each `body` field gets its own member
// definitions so no two fields can share (and mutate) one object.

/** Full block set - `blogPost.body`. */
export const postBodyMembers = () => [
  defineArrayMember({ type: "blockHeading" }),
  defineArrayMember({ type: "blockParagraph" }),
  defineArrayMember({ type: "blockList" }),
  defineArrayMember({ type: "blockCallout" }),
  defineArrayMember({ type: "blockImage" }),
  defineArrayMember({ type: "blockGallery" }),
  defineArrayMember({ type: "blockQuote" }),
  defineArrayMember({ type: "blockTable" }),
  defineArrayMember({ type: "blockLinkButton" }),
  defineArrayMember({ type: "blockRelatedTour" }),
];

/**
 * Text-only subset - `legalPage.body`. Terms and privacy pages are read as a
 * legal record; images, promo buttons and tour cards do not belong there.
 */
export const legalBodyMembers = () => [
  defineArrayMember({ type: "blockHeading" }),
  defineArrayMember({ type: "blockParagraph" }),
  defineArrayMember({ type: "blockList" }),
  defineArrayMember({ type: "blockCallout" }),
];

/** Every block object type, for schemas/index.ts. */
export const postBlockTypes = [
  blockHeading,
  blockParagraph,
  blockList,
  blockCallout,
  blockImage,
  blockGallery,
  blockQuote,
  tableRow,
  blockTable,
  blockLinkButton,
  blockRelatedTour,
];
