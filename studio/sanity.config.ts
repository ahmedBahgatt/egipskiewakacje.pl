import { defineConfig } from "sanity";
// `structureTool` is the current name of what used to be `deskTool` (Sanity v3).
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemas";
import { structure } from "./structure";

/**
 * Sanity Studio - "Egipskie Wakacje - CMS".
 *
 * Standalone workspace: this package is NOT part of the Next.js build. The
 * frontend reads content through src/content/index.ts and, in sanity mode,
 * talks to the public read-only CDN only (no token ever reaches the browser).
 *
 * NOINDEX - IMPORTANT
 * A deployed Studio (https://<name>.sanity.studio) must never be indexed.
 * `studio/static/robots.txt` is served from the root of the deployed Studio and
 * disallows every crawler. Keep that file in place; do not remove it when
 * customising the Studio. If the Studio is ever mounted on the public domain
 * instead, add `X-Robots-Tag: noindex` at the host level as well.
 *
 * FIELD NAMES ARE A CONTRACT
 * The frontend GROQ projections live in src/content/sanity/queries.ts. Renaming
 * a field here (e.g. `adultPrice`, `transferSupplements`, `faqs`) silently
 * breaks sanity mode. Change both files together.
 *
 * IMAGES
 * Every image is a native Sanity asset with hotspot/crop plus a required Polish
 * `alt` (studio/schemas/objects/imageWithAlt.ts). Editors never type a path,
 * an extension or a pixel size; GROQ builds the CDN URLs from `asset->`.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "egipskie-wakacje",
  title: "Egipskie Wakacje - CMS",
  basePath: "/",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
    // siteSettings is a singleton reached through the structure - keep it out
    // of the global "create new document" menu so no second copy can appear.
    templates: (prev) => prev.filter((t) => t.schemaType !== "siteSettings"),
  },
  document: {
    // Same reason: no "create" action for the singleton anywhere in the UI.
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : prev,
  },
});
