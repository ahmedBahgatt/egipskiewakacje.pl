import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField, imageMember } from "./imageWithAlt";

/**
 * Body blocks - a CLOSED set of named object types.
 *
 * Portable Text is deliberately NOT used. The frontend renders these blocks
 * through a switch with no dangerouslySetInnerHTML, so no HTML from the CMS can
 * ever reach the DOM. Each block is stored with Sanity's own `_type`
 * ("blockHeading", "blockTable", ...); the GROQ projection in
 * src/content/sanity/queries.ts maps `_type` onto the `PostBlock` discriminator.
 *
 * Admin UI is English; the text VALUES editors enter stay Polish.
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
  title: "Heading",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Heading text",
      type: "string",
      description: "Polish heading text.",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "anchor",
      title: "Anchor (optional)",
      type: "slug",
      description:
        'Identifier for the table of contents and in-page links, e.g. "dokumenty". Click "Generate" to build it from the heading text. Must be unique within the document.',
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
      subtitle: subtitle ? `#${subtitle}` : "Heading (no anchor)",
    }),
  },
});

export const blockParagraph = defineType({
  name: "blockParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      description: "Plain Polish text. No HTML - tags are not interpreted.",
      validation: (rule) => rule.required().min(20),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: title || "(empty paragraph)", subtitle: "Paragraph" }),
  },
});

export const blockList = defineType({
  name: "blockList",
  title: "List",
  type: "object",
  initialValue: { ordered: false },
  fields: [
    defineField({
      name: "ordered",
      title: "Numbered list",
      type: "boolean",
      description: "Off: bulleted list. On: numbered list 1, 2, 3.",
      initialValue: false,
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Polish list items.",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items", ordered: "ordered" },
    prepare: ({ items, ordered }) => ({
      title: Array.isArray(items) && items.length > 0 ? items.join(" | ") : "(empty list)",
      subtitle: ordered ? "Numbered list" : "Bulleted list",
    }),
  },
});

export const blockCallout = defineType({
  name: "blockCallout",
  title: "Callout",
  type: "object",
  initialValue: { tone: "info" },
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      description: "Polish callout text.",
      validation: (rule) => rule.required().min(10),
    }),
  ],
  preview: {
    select: { title: "text", tone: "tone" },
    prepare: ({ title, tone }) => ({
      title: title || "(empty callout)",
      subtitle: tone === "warning" ? "Warning" : "Info",
    }),
  },
});

export const blockQuote = defineType({
  name: "blockQuote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote text",
      type: "text",
      rows: 4,
      description: "Polish quote text.",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "cite",
      title: "Source (optional)",
      type: "string",
      description: "Who said it or where it is from. Leave empty if unknown.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "cite" },
    prepare: ({ title, subtitle }) => ({
      title: title ? `„${title}”` : "(empty quote)",
      subtitle: subtitle || "Quote",
    }),
  },
});

// --- media -----------------------------------------------------------------

export const blockImage = defineType({
  name: "blockImage",
  title: "Image",
  type: "object",
  fields: [
    imageField({
      name: "image",
      title: "Image",
      description: "Drag a file in. Set the focus point so it survives cropping.",
      required: true,
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description:
        "Visible Polish caption under the image. This is NOT the ALT text - set ALT on the image itself.",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: { media: "image", alt: "image.alt", caption: "caption" },
    prepare: ({ media, alt, caption }) => ({
      media,
      title: caption || alt || "(image without caption)",
      subtitle: "Image",
    }),
  },
});

export const blockGallery = defineType({
  name: "blockGallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
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
      title: "Gallery",
      subtitle: `${Array.isArray(count) ? count.length : 0} image(s)`,
    }),
  },
});

// --- table -----------------------------------------------------------------

export const tableRow = defineType({
  name: "tableRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      title: "Cells",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "As many entries as there are column headers, in the same order.",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { cells: "cells" },
    prepare: ({ cells }) => ({
      title: Array.isArray(cells) && cells.length > 0 ? cells.join(" | ") : "(empty row)",
    }),
  },
});

export const blockTable = defineType({
  name: "blockTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Table caption (optional)",
      type: "string",
      description: "Briefly, in Polish: what this table compares. Also helps screen readers.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "headers",
      title: "Column headers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "rows",
      title: "Rows",
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
              : `Row ${bad + 1} has a different number of cells than headers (${headers.length})`;
          }),
    }),
  ],
  preview: {
    select: { caption: "caption", headers: "headers", rows: "rows" },
    prepare: ({ caption, headers, rows }) => ({
      title: caption || (Array.isArray(headers) ? headers.join(" | ") : "Table"),
      subtitle: `Table - ${Array.isArray(rows) ? rows.length : 0} row(s)`,
    }),
  },
});

// --- calls to action -------------------------------------------------------

export const blockLinkButton = defineType({
  name: "blockLinkButton",
  title: "Link button",
  type: "object",
  initialValue: { external: true },
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      description: 'Polish. Say exactly what happens on click, e.g. "Sprawdź program wycieczki".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      description: 'Full URL (https://...) or an in-site path (e.g. "/poradnik/").',
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"], allowRelative: true }),
    }),
    defineField({
      name: "external",
      title: "External link",
      type: "boolean",
      description:
        'On for addresses outside egipskiewakacje.pl - opens in a new tab with rel="noopener". Off for internal links.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href", external: "external" },
    prepare: ({ title, subtitle, external }) => ({
      title: title || "(button without label)",
      subtitle: `${external ? "external" : "internal"} - ${subtitle ?? ""}`,
    }),
  },
});

export const blockRelatedTour = defineType({
  name: "blockRelatedTour",
  title: "Related tour",
  type: "object",
  fields: [
    defineField({
      name: "tour",
      title: "Tour",
      type: "reference",
      to: [{ type: "tour" }],
      // Weak: deleting a tour must never be blocked by an article that links it.
      weak: true,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "tour.title", price: "tour.priceAmount" },
    prepare: ({ title, price }) => ({
      title: title || "(select a tour)",
      subtitle: typeof price === "number" ? `Related tour - from ${price} USD` : "Related tour",
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
