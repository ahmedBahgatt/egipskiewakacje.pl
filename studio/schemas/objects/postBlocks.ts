import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Body blocks - a CLOSED set mirroring the `PostBlock` union in
 * src/content/types.ts:
 *
 *   { type: "heading";   id: string; text: string }
 *   { type: "paragraph"; text: string }
 *   { type: "list";      ordered: boolean; items: string[] }
 *   { type: "callout";   tone: "info" | "warning"; text: string }
 *
 * Portable Text is deliberately NOT used. The frontend renders these blocks
 * through a switch with no dangerouslySetInnerHTML, so no HTML from the CMS can
 * ever reach the DOM.
 *
 * WHY EACH BLOCK CARRIES AN EXPLICIT `type` FIELD
 * GROQ returns array members with `_type`, not `type`, and queries.ts projects
 * `body` verbatim. The frontend discriminates on `block.type`, so the literal
 * field must exist in the stored document. It is hidden + read-only in the
 * Studio and set from initialValue, so editors never see or change it.
 */

const discriminator = (value: string) =>
  defineField({
    name: "type",
    title: "type",
    type: "string",
    initialValue: value,
    readOnly: true,
    hidden: true,
    validation: (rule) =>
      rule.required().custom((v) => (v === value ? true : `Musi być "${value}"`)),
  });

export const blockHeading = defineType({
  name: "blockHeading",
  title: "Nagłówek",
  type: "object",
  initialValue: { type: "heading" },
  fields: [
    discriminator("heading"),
    defineField({
      name: "id",
      title: "Kotwica (id)",
      type: "string",
      description:
        'Identyfikator do spisu treści i linków, małe litery bez polskich znaków, np. "dokumenty". Musi być unikalny w obrębie artykułu.',
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { name: "kebab-case bez znaków diakrytycznych" }),
    }),
    defineField({
      name: "text",
      title: "Treść nagłówka",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "id" },
    prepare: ({ title, subtitle }) => ({ title: `# ${title}`, subtitle: `#${subtitle}` }),
  },
});

export const blockParagraph = defineType({
  name: "blockParagraph",
  title: "Akapit",
  type: "object",
  initialValue: { type: "paragraph" },
  fields: [
    discriminator("paragraph"),
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
  initialValue: { type: "list", ordered: false },
  fields: [
    discriminator("list"),
    defineField({
      name: "ordered",
      title: "Lista numerowana",
      type: "boolean",
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
      title: Array.isArray(items) ? items.join(" | ") : "(pusta lista)",
      subtitle: ordered ? "Lista numerowana" : "Lista punktowana",
    }),
  },
});

export const blockCallout = defineType({
  name: "blockCallout",
  title: "Wyróżnienie",
  type: "object",
  initialValue: { type: "callout", tone: "info" },
  fields: [
    discriminator("callout"),
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
    select: { title: "text", subtitle: "tone" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle === "warning" ? "Ostrzeżenie" : "Informacja",
    }),
  },
});

/** Reusable `of:` list for every body field (blogPost, legalPage). */
export const postBodyMembers = [
  defineArrayMember({ type: "blockHeading" }),
  defineArrayMember({ type: "blockParagraph" }),
  defineArrayMember({ type: "blockList" }),
  defineArrayMember({ type: "blockCallout" }),
];
