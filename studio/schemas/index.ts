import type { SchemaTypeDefinition } from "sanity";

// Objects
import { faqItem } from "./objects/faqItem";
import { itineraryStep } from "./objects/itineraryStep";
import { transferSupplement } from "./objects/transferSupplement";
import { labelledNote } from "./objects/labelledNote";
import { postBlockTypes } from "./objects/postBlocks";

// Documents
import { siteSettings } from "./documents/siteSettings";
import { destination } from "./documents/destination";
import { tourCategory } from "./documents/tourCategory";
import { tour } from "./documents/tour";
import { blogPost } from "./documents/blogPost";
import { author } from "./documents/author";
import { review } from "./documents/review";
import { faq } from "./documents/faq";
import { legalPage } from "./documents/legalPage";

/**
 * Every schema type registered in the Studio.
 *
 * The legacy `tourPackage` type from the old all-inclusive concept is NOT
 * declared here on purpose: leaving it out keeps the new model clean while the
 * existing documents stay in the dataset, reachable through the
 * "Dokumenty legacy" list in studio/structure.ts.
 *
 * Two former object types are gone:
 *  - `mediaImage` (a hand-typed path + width + height) - replaced everywhere by
 *    native Sanity image assets with hotspot/crop, see objects/imageWithAlt.ts.
 *    That file exports FACTORIES rather than a registered type, so it does not
 *    appear in this list.
 *  - `seoMeta` (a nested SEO object on `destination`) - SEO is now flat on every
 *    document: seoTitle / seoDescription / canonicalPath / ogImage.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  faqItem,
  itineraryStep,
  transferSupplement,
  labelledNote,
  ...postBlockTypes,
  // documents
  siteSettings,
  destination,
  tourCategory,
  tour,
  blogPost,
  author,
  review,
  faq,
  legalPage,
];
