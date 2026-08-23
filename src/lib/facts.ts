import type { Currency, DestinationSlug, Tour } from "@/content/types";
import { formatMoney } from "@/lib/format";
import { formatTourCount, pluralResorts } from "@/lib/polish";

/**
 * Honest, derived Quick-Facts helpers. Everything here is computed from the REAL
 * tour inventory at render time - never a hardcoded count or price. Used to build
 * the answer-first intro + Quick Facts block on the destination/category/all-tours
 * hubs (AEO/GEO extraction + conversion), so counts and "od X" prices always match
 * what is actually rendered on the page.
 */

export interface FromPrice {
  amount: number;
  currency: Currency;
  /** True when the "od" price is a per-person price (most honest unit to show). */
  perPerson: boolean;
}

/** Canonical departure-resort order used across the hubs. */
const RESORT_ORDER: DestinationSlug[] = ["hurghada", "marsa-alam", "sharm-el-sheikh"];

/**
 * Lowest headline price in a tour set. Prefers per-person tours so the unit shown
 * ("za osobę") is truthful; falls back to the overall minimum only when a set has
 * no per-person tour (then `perPerson` is false and the caller omits the unit).
 */
export function fromPrice(tours: Tour[]): FromPrice | null {
  if (tours.length === 0) return null;
  const perPerson = tours.filter((t) => t.price.mode === "perPerson");
  const pool = perPerson.length > 0 ? perPerson : tours;
  const min = pool.reduce((a, b) => (b.price.amount < a.price.amount ? b : a));
  return { amount: min.price.amount, currency: min.price.currency, perPerson: perPerson.length > 0 };
}

/** "od 12 USD za osobę" / "od 28 USD" (unit dropped when not per-person). */
export function fromPriceLabel(tours: Tour[]): string | null {
  const p = fromPrice(tours);
  if (!p) return null;
  return `od ${formatMoney(p.amount, p.currency)}${p.perPerson ? " za osobę" : ""}`;
}

/** Distinct departure resorts present in a tour set, in canonical order. */
export function departureResorts(tours: Tour[]): DestinationSlug[] {
  const present = new Set(tours.map((t) => t.destination));
  return RESORT_ORDER.filter((d) => present.has(d));
}

export const RESORT_LABEL: Record<DestinationSlug, string> = {
  hurghada: "Hurghada",
  "marsa-alam": "Marsa Alam",
  "sharm-el-sheikh": "Sharm el Sheikh",
};

/** Human list "Hurghada, Marsa Alam i Sharm el Sheikh" (Polish "i" before last). */
export function resortListLabel(resorts: DestinationSlug[]): string {
  const names = resorts.map((r) => RESORT_LABEL[r]);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} i ${names[names.length - 1]}`;
}

export interface Fact {
  label: string;
  value: string;
}

/**
 * The standard Quick-Facts rows for a hub, all derived from real data + the
 * permanent business rules (WhatsApp booking, no prepayment). `departureValue`
 * lets a destination page show its single resort instead of the resort list.
 */
export function hubFacts(tours: Tour[], departureValue?: string): Fact[] {
  const facts: Fact[] = [{ label: "Liczba wycieczek", value: formatTourCount(tours.length) }];
  const price = fromPriceLabel(tours);
  if (price) facts.push({ label: "Ceny", value: price });

  const resorts = departureResorts(tours);
  facts.push({
    label: resorts.length > 1 ? "Kurorty wyjazdu" : "Kurort wyjazdu",
    value:
      departureValue ??
      (resorts.length > 1
        ? `${resorts.length} ${pluralResorts(resorts.length)} - ${resortListLabel(resorts)}`
        : resortListLabel(resorts)),
  });

  facts.push({ label: "Rezerwacja", value: "WhatsApp, bez płatności online" });
  facts.push({ label: "Płatność", value: "Bez przedpłaty - dopiero przy odbiorze" });
  return facts;
}
