import type { PriceTier, PriceOption } from "@/content/types";

/** "60 USD" / "400 EUR" - currency shown as a suffix, Polish thin-space grouping. */
export function formatMoney(amount: number, currency = "USD"): string {
  const n = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(amount);
  return `${n} ${currency}`;
}

/**
 * Headline price label for tour cards / listings. States the stored base
 * per-person price plainly (e.g. "60 USD"). The vague "od" (from) prefix was
 * deliberately removed from tour cards: the card already shows the unit ("/ os.")
 * and the full adult/child/free breakdown lives on the tour page, so a bare number
 * reads cleaner and is not misleading. This is presentation only - the pricing
 * data (including `price.from`, still consumed by schema and the hub aggregate
 * "od X" fact in lib/facts.ts) is unchanged.
 */
export function priceLabel(price: Pick<PriceTier, "amount" | "currency">): string {
  return formatMoney(price.amount, price.currency);
}

/** Unit suffix for the headline price, e.g. "/ os.", "/ łódź", "/ kurs". */
export function priceUnit(price: Pick<PriceTier, "unit">): string {
  return price.unit ? `/ ${price.unit}` : "";
}

/**
 * Headline price for the booking card / sticky bar. The full breakdown (adult /
 * child / free) is shown separately, so the headline drops the vague "od" and
 * states the base price plainly with a data-driven caption: per-person tours read
 * as the adult price, other modes fall back to their unit (per boat / vehicle).
 * No pricing data changes - `amount` is the existing headline base.
 */
export function priceHeadline(
  price: Pick<PriceTier, "amount" | "currency" | "unit">,
): { value: string; captionLong: string; captionShort: string } {
  const value = formatMoney(price.amount, price.currency);
  const unit = price.unit ?? "";
  if (unit === "os." || unit === "osoba") {
    return { value, captionLong: "za osobę dorosłą", captionShort: "dorosły" };
  }
  if (!unit) return { value, captionLong: "", captionShort: "" };
  const long = unit.startsWith("za ") ? unit : `za ${unit}`;
  return { value, captionLong: long, captionShort: unit };
}

/** Amount cell for a single price option ("bezpłatnie" when free). */
export function optionAmount(opt: PriceOption): string {
  return opt.free ? "bezpłatnie" : formatMoney(opt.amount, opt.currency);
}

/**
 * Age below which children travel free, for the booking-form hint. Returns a
 * number ONLY when the tour's structured pricing actually carries a free-infant
 * rule (`infantFree` + a real `childAgeMin`). Per-boat / per-vehicle / per-course
 * tours - and any tour with no free-under rule - return undefined, so the form
 * never makes an unsupported "children under N free" claim. Presentation only:
 * no pricing data changes.
 */
export function childFreeUnderAge(
  price: Pick<PriceTier, "infantFree" | "childAgeMin">,
): number | undefined {
  return price.infantFree && typeof price.childAgeMin === "number" && price.childAgeMin > 0
    ? price.childAgeMin
    : undefined;
}

/** "8 sierpnia 2026" */
export function formatDatePl(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Machine-readable date passthrough for <time dateTime>. */
export function isoDate(iso: string): string {
  return iso;
}
