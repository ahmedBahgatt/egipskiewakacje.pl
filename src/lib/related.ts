import { content } from "@/content";
import { categories, categoryLabel } from "@/content/local/categories";
import type { Tour } from "@/content/types";

/**
 * Related tours + category link for a tour detail page. Prefers same-category
 * tours (any departure), then fills with other tours from the same destination.
 * Routes (not slugs) are the identity, because slugs repeat across destinations.
 */
export async function tourRelations(tour: Tour) {
  const all = await content.getTours();
  const sameCategory = all.filter((t) => t.route !== tour.route && t.category === tour.category);
  const chosen = sameCategory.slice(0, 3);
  if (chosen.length < 3) {
    const chosenRoutes = new Set(chosen.map((t) => t.route));
    const fill = all
      .filter(
        (t) =>
          t.route !== tour.route &&
          t.destination === tour.destination &&
          !chosenRoutes.has(t.route),
      )
      .slice(0, 3 - chosen.length);
    chosen.push(...fill);
  }
  const cat = categories.find((c) => c.slug === tour.category);
  return {
    relatedTours: chosen,
    categoryHref: cat ? `${cat.routeBase}/` : undefined,
    categoryLabel: categoryLabel[tour.category],
  };
}
