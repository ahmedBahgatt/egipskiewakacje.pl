import type { SchemaTypeDefinition } from "sanity";

// Objects
import { mediaImage } from "./objects/mediaImage";
import { faqItem } from "./objects/faqItem";
import { itineraryStep } from "./objects/itineraryStep";
import { transferSupplement } from "./objects/transferSupplement";
import { labelledNote } from "./objects/labelledNote";
import { seoMeta } from "./objects/seoMeta";
import {
  blockHeading,
  blockParagraph,
  blockList,
  blockCallout,
} from "./objects/postBlocks";

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
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  mediaImage,
  faqItem,
  itineraryStep,
  transferSupplement,
  labelledNote,
  seoMeta,
  blockHeading,
  blockParagraph,
  blockList,
  blockCallout,
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
