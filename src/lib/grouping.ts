import type { CategorySlug, DestinationSlug, Tour } from "@/content/types";
import { DESTINATION_SECTION_ORDER } from "@/lib/experiences";

/** Group a tour list by category, preserving input order within each group. */
export function groupByCategory(tours: Tour[]): Map<CategorySlug, Tour[]> {
  const m = new Map<CategorySlug, Tour[]>();
  for (const t of tours) {
    const arr = m.get(t.category) ?? [];
    arr.push(t);
    m.set(t.category, arr);
  }
  return m;
}

/** Group a tour list by departure destination, preserving input order. */
export function groupByDestination(tours: Tour[]): Map<DestinationSlug, Tour[]> {
  const m = new Map<DestinationSlug, Tour[]>();
  for (const t of tours) {
    const arr = m.get(t.destination) ?? [];
    arr.push(t);
    m.set(t.destination, arr);
  }
  return m;
}

/**
 * Categories that actually have tours for a destination, in the resort's editorial
 * order. Present categories missing from the editorial order are appended (so no
 * tour is ever orphaned/hidden - B15).
 */
export function orderedPresentCategories(
  destination: DestinationSlug,
  tours: Tour[],
): CategorySlug[] {
  const present = new Set(tours.map((t) => t.category));
  const order = DESTINATION_SECTION_ORDER[destination] ?? [];
  const ordered = order.filter((c) => present.has(c));
  const extras = [...present].filter((c) => !ordered.includes(c));
  return [...ordered, ...extras];
}
