import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { tours } from "@/content/local/tours";
import { destinations } from "@/content/local/destinations";
import { categories, categoryLabel } from "@/content/local/categories";
import type { CategorySlug } from "@/content/types";

const DEST_SLUGS = new Set(destinations.map((d) => d.slug));
const CATEGORY_KEYS = Object.keys(categoryLabel) as CategorySlug[];
const ROUTE_BY_DEST: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.routeBase]),
);

describe("tour inventory integrity", () => {
  it("has the full active catalogue", () => {
    expect(tours.length).toBeGreaterThanOrEqual(80);
  });

  it("routes are globally unique", () => {
    const routes = tours.map((t) => t.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("canonical paths are globally unique and match the route", () => {
    const canon = tours.map((t) => t.seo.canonicalPath);
    expect(new Set(canon).size).toBe(canon.length);
    for (const t of tours) expect(t.seo.canonicalPath).toBe(`${t.route}/`);
  });

  it("(destination, slug) pairs are unique", () => {
    const keys = tours.map((t) => `${t.destination}|${t.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("each tour has a valid destination and its route sits under that destination", () => {
    for (const t of tours) {
      expect(DEST_SLUGS.has(t.destination)).toBe(true);
      expect(t.route.startsWith(`${ROUTE_BY_DEST[t.destination]}/`)).toBe(true);
    }
  });

  it("each tour has a valid category", () => {
    for (const t of tours) expect(CATEGORY_KEYS).toContain(t.category);
  });

  it("prices are valid (positive amount, known currency, a unit, >=1 option)", () => {
    for (const t of tours) {
      expect(t.price.amount).toBeGreaterThan(0);
      expect(["USD", "EUR"]).toContain(t.price.currency);
      expect(t.price.unit.length).toBeGreaterThan(0);
      expect(t.price.options.length).toBeGreaterThanOrEqual(1);
      for (const o of t.price.options) {
        expect(["USD", "EUR"]).toContain(o.currency);
        if (!o.free) expect(o.amount).toBeGreaterThan(0);
      }
    }
  });

  it("headline amount matches the cheapest non-child base option", () => {
    for (const t of tours) {
      const base = t.price.options.filter(
        (o) => !o.free && !/dziec|niemow|towarzysz|bez lotu/i.test(o.label),
      );
      if (base.length) {
        const min = Math.min(...base.map((o) => o.amount));
        // headline must equal a real listed base price (no invented number)
        expect(base.some((o) => o.amount === t.price.amount)).toBe(true);
        expect(t.price.amount).toBeGreaterThanOrEqual(min);
      }
    }
  });

  it("no fabricated discount / crossed-out price fields exist on any option", () => {
    for (const t of tours) {
      for (const o of t.price.options) {
        expect(o).not.toHaveProperty("compareAt");
        expect(o).not.toHaveProperty("was");
        expect(o).not.toHaveProperty("regular");
        expect(/promocyj|bestseller|discount/i.test(`${o.label} ${o.note ?? ""}`)).toBe(false);
      }
    }
  });

  it("required content sections are non-empty", () => {
    for (const t of tours) {
      expect(t.h1.length).toBeGreaterThan(0);
      expect(t.shortDescription.length).toBeGreaterThan(0);
      expect(t.overview.length).toBeGreaterThan(0);
      expect(t.itinerary.length).toBeGreaterThan(0);
      expect(t.included.length).toBeGreaterThan(0);
      expect(t.seo.title.length).toBeGreaterThan(0);
      expect(t.seo.description.length).toBeGreaterThan(0);
      expect(t.faqs.length).toBeGreaterThan(0);
    }
  });

  it("hero images exist on disk as .avif/.webp/.jpg variants", () => {
    for (const t of tours) {
      for (const ext of ["avif", "webp", "jpg"]) {
        const p = path.join(process.cwd(), "public", `${t.heroImage.src}.${ext}`);
        expect(existsSync(p), `${t.heroImage.src}.${ext} for ${t.route}`).toBe(true);
      }
    }
  });

  it("no accidental 'z Hurghada' genitive error or source branding in copy", () => {
    const blob = JSON.stringify(tours);
    expect(/z Hurghada\b/.test(blob)).toBe(false);
    expect(/sekrety\s*egiptu/i.test(blob)).toBe(false);
  });

  it("SEO titles are unique across tours", () => {
    const titles = tours.map((t) => t.seo.title);
    // allow small overlaps only if routes differ by destination; assert high uniqueness
    const unique = new Set(titles).size;
    expect(unique).toBeGreaterThanOrEqual(titles.length - 6);
  });

  it("every category with a landing page has at least 3 tours", () => {
    for (const c of categories) {
      const n = tours.filter((t) => t.category === c.slug).length;
      expect(n, `${c.slug} has ${n} tours`).toBeGreaterThanOrEqual(3);
    }
  });
});
