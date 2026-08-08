import type { PriceTier } from "@/content/types";

/** "60 USD" - main currency shown as a suffix, Polish thin-space grouping. */
export function formatMoney(amount: number, currency = "USD"): string {
  const n = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(amount);
  return `${n} ${currency}`;
}

/**
 * Price label for cards/summaries. Uses "od" (from) only when the final cost can
 * vary (transfers/extras) - never a fake "from" on a fixed price.
 */
export function priceLabel(price: Pick<PriceTier, "adult" | "currency" | "variable">): string {
  const base = formatMoney(price.adult, price.currency);
  return price.variable ? `od ${base}` : base;
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
