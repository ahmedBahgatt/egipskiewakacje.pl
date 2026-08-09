import { describe, it, expect } from "vitest";
import { tourJsonLd } from "@/lib/seo";
import { tours } from "@/content/local/tours";
import type { Tour } from "@/content/types";

function bySlug(slug: string): Tour {
  const t = tours.find((x) => x.slug === slug);
  if (!t) throw new Error(`fixture tour not found: ${slug}`);
  return t;
}

describe("tourJsonLd - TouristTrip structured data (B16)", () => {
  const dayTour = bySlug("kair-piramidy-muzeum-egipskie"); // single-day (long) tour
  const multiDay = bySlug("luksor-2-dni-lot-balonem"); // 2-day package
  const padiCourse = bySlug("kurs-padi-open-water"); // PADI course (perCourse)

  it("never hardcodes a one-day touristType on a standard day tour", () => {
    const s = JSON.stringify(tourJsonLd(dayTour));
    expect(s).not.toContain("touristType");
    expect(s).not.toContain("Wycieczka jednodniowa");
  });

  it("does not label a multi-day package as a one-day trip", () => {
    expect(multiDay.price.mode).toBe("perPackage");
    const s = JSON.stringify(tourJsonLd(multiDay));
    expect(s).not.toContain("touristType");
    expect(s).not.toContain("Wycieczka jednodniowa");
  });

  it("does not label a PADI course as a one-day tour", () => {
    expect(padiCourse.price.mode).toBe("perCourse");
    const s = JSON.stringify(tourJsonLd(padiCourse));
    expect(s).not.toContain("touristType");
    expect(s).not.toContain("Wycieczka jednodniowa");
  });

  it("still emits a valid TouristTrip with an honest Offer for every tour", () => {
    for (const t of tours) {
      const ld = tourJsonLd(t);
      expect(ld["@type"]).toBe("TouristTrip");
      expect(ld.offers.price).toBe(t.price.amount);
      expect(ld.offers.priceCurrency).toBe(t.price.currency);
      // no fabricated availability / one-day label anywhere
      const s = JSON.stringify(ld);
      expect(s).not.toContain("Wycieczka jednodniowa");
      expect(s).not.toContain("InStock");
    }
  });
});
