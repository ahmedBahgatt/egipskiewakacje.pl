import { defineArrayMember, defineField } from "sanity";

/**
 * The ONE way an image is entered anywhere in this Studio.
 *
 * Native Sanity image asset + hotspot/crop + a required Polish `alt`. Editors
 * drag a file in and drag the focal point where it belongs - no paths, no
 * extensions, no pixel dimensions to type. Width/height/LQIP come from the
 * asset metadata, so nothing can drift out of sync with the file.
 *
 * STORED SHAPE (what GROQ sees):
 *   { _type: "image", alt: string, asset: { _ref: "image-<sha1>-<w>x<h>-jpg" },
 *     hotspot?: {...}, crop?: {...} }
 *
 * These are FACTORIES, not registered schema types, on purpose:
 *  - every call returns a fresh object, so no two fields share (and mutate) the
 *    same definition;
 *  - the stored `_type` stays the built-in `"image"` rather than a custom name,
 *    which keeps GROQ projections and the seed payload simple.
 *
 * Frontend side: project the asset through the CDN, e.g.
 *   "heroImage": {
 *     "alt": heroImage.alt,
 *     "src": heroImage.asset->url + "?w=1600&h=1000&fit=crop&auto=format",
 *     "width": heroImage.asset->metadata.dimensions.width,
 *     "height": heroImage.asset->metadata.dimensions.height,
 *     "lqip": heroImage.asset->metadata.lqip
 *   }
 */

const ALT_DESCRIPTION =
  "Rzetelny opis po polsku: co widać na zdjęciu. Czytają go osoby korzystające z czytnika ekranu i wyszukiwarki.";

/** Fresh `alt` field definition. Never reuse one instance across two images. */
const altField = () =>
  defineField({
    name: "alt",
    title: "Opis obrazu (alt, po polsku)",
    type: "string",
    description: ALT_DESCRIPTION,
    validation: (rule) => rule.required().min(5).max(200),
  });

/**
 * A single image field on a document, e.g. `heroImage`, `featuredImage`.
 * Pass `required: true` where the page cannot render without it.
 */
export function imageField(options: {
  name: string;
  title: string;
  description?: string;
  group?: string;
  required?: boolean;
}) {
  const { name, title, description, group, required = false } = options;
  return defineField({
    name,
    title,
    description,
    group,
    type: "image",
    options: { hotspot: true },
    fields: [altField()],
    // Written as one arrow (not `required ? ... : undefined`) so `rule` keeps
    // its contextual type instead of falling back to an implicit any.
    validation: (rule) => (required ? rule.required() : rule),
    preview: {
      select: { media: "asset", title: "alt" },
      prepare: ({ media, title: alt }) => ({
        media,
        title: alt || "(uzupełnij opis alt)",
      }),
    },
  });
}

/** An image entry inside an array field, e.g. `gallery`, `blockGallery.images`. */
export function imageMember() {
  return defineArrayMember({
    type: "image",
    title: "Obraz",
    options: { hotspot: true },
    fields: [altField()],
    preview: {
      select: { media: "asset", title: "alt" },
      prepare: ({ media, title: alt }) => ({
        media,
        title: alt || "(uzupełnij opis alt)",
      }),
    },
  });
}
