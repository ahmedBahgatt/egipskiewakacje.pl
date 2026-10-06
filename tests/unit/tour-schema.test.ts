import { describe, it, expect } from "vitest";
import { tourJsonLd } from "@/lib/seo";
import { tours } from "@/content/local/tours";
import type { Tour } from "@/content/types";

function bySlug(slug: string): Tour {
  const t = tours.find((x) => x.slug === slug);
  if (!t) throw new Error(`fixture tour not found: ${slug}`);
  return t;
}

interface TourLd {
  "@type": unknown;
  "@id"?: unknown;
  name: string;
  url: string;
  brand?: { "@id"?: string };
  provider?: { "@id"?: string };
  offers: { "@type": string; price: unknown; priceCurrency: unknown; url: unknown };
  itinerary: { "@type": string; itemListElement: { item: { "@type": string } }[] };
}

const ld = (t: Tour): TourLd => tourJsonLd(t) as unknown as TourLd;

describe("tourJsonLd - Product + TouristTrip structured data", () => {
  const dayTour = bySlug("kair-piramidy-muzeum-egipskie"); // single-day (long) tour, adult/child
  const multiDay = bySlug("luksor-2-dni-lot-balonem"); // 2-day package (perPackage)
  const perVehicle = bySlug("buggy-safari"); // per-vehicle activity (perVehicle)

  it("emits a single node multi-typed Product + TouristTrip", () => {
    expect(ld(dayTour)["@type"]).toEqual(["Product", "TouristTrip"]);
  });

  it("uses a stable, canonical-derived @id per tour", () => {
    const node = ld(dayTour);
    expect(typeof node["@id"]).toBe("string");
    expect(node["@id"]).toMatch(/^https:\/\/egipskiewakacje\.pl\/.+#tour$/);
    // Deterministic: same tour -> same @id across calls (no random/time component).
    expect(node["@id"]).toBe(ld(dayTour)["@id"]);
    // Distinct tours -> distinct @id.
    expect(node["@id"]).not.toBe(ld(perVehicle)["@id"]);
  });

  it("links brand and provider to the Organization node", () => {
    const node = ld(dayTour);
    const orgId = "https://egipskiewakacje.pl/#organization";
    expect(node.brand?.["@id"]).toBe(orgId);
    expect(node.provider?.["@id"]).toBe(orgId);
  });

  it("carries one honest Offer with the authoritative headline price", () => {
    for (const mode of [dayTour, multiDay, perVehicle]) {
      const node = ld(mode);
      // offers is a single object, never an array of variants.
      expect(Array.isArray(node.offers)).toBe(false);
      expect(node.offers["@type"]).toBe("Offer");
      expect(node.offers.price).toBe(mode.price.amount);
      expect(node.offers.priceCurrency).toBe(mode.price.currency);
      expect(typeof node.offers.url).toBe("string");
    }
  });

  it("never emits AggregateOffer by default (variant sets stay in the table)", () => {
    for (const t of tours) {
      expect(JSON.stringify(tourJsonLd(t))).not.toContain("AggregateOffer");
    }
  });

  it("emits a real, positive bookable price for every tour (never a free infant price)", () => {
    for (const t of tours) {
      const node = ld(t);
      expect(typeof node.offers.price).toBe("number");
      expect(node.offers.price as number).toBeGreaterThan(0);
      expect(node.offers.priceCurrency as string).toMatch(/^[A-Z]{3}$/);
    }
  });

  it("invents no reviews, ratings, stock, validity window or retail ids", () => {
    for (const t of tours) {
      const s = JSON.stringify(tourJsonLd(t));
      for (const banned of [
        "aggregateRating",
        "AggregateRating",
        "\"review\"",
        "ratingValue",
        "reviewCount",
        "availability",
        "InStock",
        "priceValidUntil",
        "\"sku\"",
        "\"gtin",
        "\"mpn\"",
        "itemCondition",
      ]) {
        expect(s, `${t.slug} must not emit ${banned}`).not.toContain(banned);
      }
    }
  });

  it("emits no fabricated one-day touristType for any pricing mode", () => {
    for (const t of [dayTour, multiDay, perVehicle]) {
      const s = JSON.stringify(tourJsonLd(t));
      expect(s).not.toContain("touristType");
      expect(s).not.toContain("Wycieczka jednodniowa");
    }
  });

  it("preserves the TouristTrip itinerary as an ItemList of attractions", () => {
    const node = ld(dayTour);
    expect(node.itinerary["@type"]).toBe("ItemList");
    expect(node.itinerary.itemListElement.length).toBe(dayTour.itinerary.length);
    expect(node.itinerary.itemListElement[0].item["@type"]).toBe("TouristAttraction");
  });
});
