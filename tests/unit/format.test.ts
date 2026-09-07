import { describe, it, expect } from "vitest";
import { priceLabel, priceUnit, priceHeadline, formatMoney, optionAmount, childFreeUnderAge } from "@/lib/format";

/**
 * Guards the tour-CARD price presentation: the vague "od" (from) prefix must never
 * be re-added to `priceLabel` (used by the homepage carousel, listing TourCard and
 * blog related-tour cards). The underlying `price.from` datum is deliberately NOT
 * consulted by the label - it stays available to schema and the hub aggregate.
 */
describe("priceLabel - tour card headline (no 'od')", () => {
  it("shows the base price plainly when from=false", () => {
    expect(priceLabel({ amount: 30, currency: "USD" })).toBe("30 USD");
  });

  it("shows the base price plainly even when the datum has from=true", () => {
    // Passing the full price object (with from:true) must NOT reintroduce "od".
    expect(priceLabel({ amount: 60, currency: "USD", from: true } as never)).toBe("60 USD");
  });

  it("never starts with the Polish 'od ' prefix", () => {
    for (const amount of [12, 30, 60, 400]) {
      expect(priceLabel({ amount, currency: "USD" }).startsWith("od ")).toBe(false);
    }
  });

  it("keeps the unit suffix intact (unchanged)", () => {
    expect(priceUnit({ unit: "os." })).toBe("/ os.");
    expect(priceUnit({ unit: "" })).toBe("");
  });
});

describe("priceHeadline - tour-detail booking card (unchanged, no 'od')", () => {
  it("returns the plain base value with a per-person caption", () => {
    const h = priceHeadline({ amount: 60, currency: "USD", unit: "os." });
    expect(h.value).toBe("60 USD");
    expect(h.value.startsWith("od ")).toBe(false);
    expect(h.captionLong).toBe("za osobę dorosłą");
  });
});

describe("formatMoney - unchanged numeric formatting", () => {
  it("keeps the currency suffix and no 'od'", () => {
    expect(formatMoney(60, "USD")).toBe("60 USD");
  });
});

/**
 * A genuine free child/infant price option (flagged `free` or stored as amount 0)
 * must render "Bezpłatnie" in every shared pricing surface, never "0 USD". Paid
 * options render exactly, and the stored numeric amount is never mutated.
 */
describe("optionAmount - free child/infant renders 'Bezpłatnie'", () => {
  it("renders 'Bezpłatnie' for an explicit free flag", () => {
    expect(optionAmount({ label: "Dziecko do 5 lat", amount: 0, currency: "USD", free: true } as never)).toBe("Bezpłatnie");
  });

  it("renders 'Bezpłatnie' for a 0-amount option (no flag needed)", () => {
    expect(optionAmount({ label: "Dziecko do 5 lat", amount: 0, currency: "USD" } as never)).toBe("Bezpłatnie");
  });

  it("never renders '0 USD' / 'Gratis' / 'Free' for a free tier", () => {
    const out = optionAmount({ label: "Dziecko do 5 lat", amount: 0, currency: "USD" } as never);
    for (const bad of ["0 USD", "0$", "Gratis", "Free"]) expect(out).not.toContain(bad);
  });

  it("leaves paid prices exactly as formatMoney", () => {
    expect(optionAmount({ label: "Dorosły", amount: 18, currency: "USD" } as never)).toBe("18 USD");
    expect(optionAmount({ label: "Dziecko 5-11 lat", amount: 10, currency: "USD" } as never)).toBe("10 USD");
  });
});

/**
 * The booking-form "children under N free" hint must be data-driven, never
 * hardcoded: shown only when a tour's pricing actually carries a free-infant
 * rule. Per-person adult/child tours keep it; per-boat / per-vehicle / per-course
 * tours (whole-boat speed boat, buggy, diving course) must NOT emit it.
 */
describe("childFreeUnderAge - booking-form free-infant hint", () => {
  it("returns the age for per-person tours with a real free-under rule", () => {
    expect(childFreeUnderAge({ infantFree: true, childAgeMin: 5 })).toBe(5);
    expect(childFreeUnderAge({ infantFree: true, childAgeMin: 4 })).toBe(4);
  });

  it("returns undefined for whole-boat pricing (no child rule)", () => {
    // Speed Boat: per-boat variants, no infantFree, no childAgeMin.
    expect(childFreeUnderAge({ infantFree: false })).toBeUndefined();
    expect(childFreeUnderAge({})).toBeUndefined();
  });

  it("returns undefined when infantFree is set but no age is defined", () => {
    expect(childFreeUnderAge({ infantFree: true })).toBeUndefined();
  });

  it("returns undefined when infantFree is false even if an age is present", () => {
    expect(childFreeUnderAge({ infantFree: false, childAgeMin: 5 })).toBeUndefined();
  });
});
