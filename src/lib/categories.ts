import type { CategorySlug } from "@/content/types";

/**
 * Presentation maps for the category taxonomy. Pure data (no content-adapter
 * import) so client components and route files can use them without pulling the
 * content layer into the bundle. The rich category content (intro/FAQ/SEO) lives
 * in the content adapter and is read via `content.getCategories()`.
 */

/** Short chip label for every category (including tag-only ones). */
export const categoryLabel: Record<CategorySlug, string> = {
  kair: "Kair i piramidy",
  luksor: "Luksor",
  "rejsy-wyspy": "Rejsy i wyspy",
  "snorkeling-delfiny": "Snorkeling i delfiny",
  nurkowanie: "Nurkowanie",
  safari: "Safari i quady",
  atrakcje: "Atrakcje i rozrywka",
  prywatne: "Wycieczki prywatne",
  synaj: "Synaj",
  miedzynarodowe: "Wycieczki międzynarodowe",
};

/** Landing-page route base for categories that have an indexable page. */
export const categoryRoute: Partial<Record<CategorySlug, string>> = {
  kair: "/wycieczki/kair-i-piramidy",
  luksor: "/wycieczki/luksor",
  "rejsy-wyspy": "/wycieczki/rejsy-i-wyspy",
  "snorkeling-delfiny": "/wycieczki/snorkeling-i-delfiny",
  nurkowanie: "/wycieczki/nurkowanie",
  safari: "/wycieczki/safari-i-quady",
  atrakcje: "/wycieczki/atrakcje-i-rozrywka",
  prywatne: "/wycieczki/wycieczki-prywatne",
};
