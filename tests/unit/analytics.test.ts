import { describe, it, expect } from "vitest";
import { track, pageContext, __analyticsInternals } from "@/lib/analytics";

const { sanitize } = __analyticsInternals;

describe("analytics sanitiser", () => {
  it("keeps only allow-listed non-PII keys", () => {
    const out = sanitize({
      tour_slug: "kair-gem-piramidy",
      destination: "sharm-el-sheikh",
      placement: "floating_fab",
      cta_id: "floating_whatsapp",
      cta_type: "whatsapp",
      whatsapp_intent: "enquiry",
      lead_source: "whatsapp_booking_form",
      page_type: "tour",
      page_path: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
    });
    expect(out.tour_slug).toBe("kair-gem-piramidy");
    expect(out.cta_type).toBe("whatsapp");
    expect(Object.keys(out).sort()).toEqual(
      [
        "cta_id",
        "cta_type",
        "destination",
        "lead_source",
        "page_path",
        "page_type",
        "placement",
        "tour_slug",
        "whatsapp_intent",
      ].sort(),
    );
  });

  it("drops any personal information passed by mistake", () => {
    // Deliberately pass PII-shaped keys; none may survive.
    const dirty = {
      tour_slug: "kair-gem-piramidy",
      name: "Anna Kowalska",
      hotel: "Steigenberger",
      phone: "+48 600 000 000",
      notes: "pokój 214",
      childrenAges: "6, 9",
      message: "full whatsapp message",
      email: "anna@example.com",
      link_url: "https://wa.me/201055850536?text=...",
    } as unknown as Parameters<typeof sanitize>[0];
    const out = sanitize(dirty);
    expect(out).toEqual({ tour_slug: "kair-gem-piramidy" });
    for (const leaked of ["name", "hotel", "phone", "notes", "message", "email", "link_url"]) {
      expect(Object.keys(out)).not.toContain(leaked);
    }
  });

  it("rejects non-primitive values", () => {
    const out = sanitize({
      // @ts-expect-error intentional bad input
      placement: { nested: true },
      page_type: "tour",
    });
    expect(out).toEqual({ page_type: "tour" });
  });
});

describe("pageContext (route-derived, never scraped text)", () => {
  it("classifies the core routes", () => {
    expect(pageContext("/")).toEqual({ page_type: "homepage" });
    expect(pageContext("/wycieczki/")).toEqual({ page_type: "listing" });
    expect(pageContext("/wycieczki/kair/")).toEqual({ page_type: "category" });
    expect(pageContext("/kontakt/")).toEqual({ page_type: "contact" });
    expect(pageContext("/rezerwacja/")).toEqual({ page_type: "booking" });
    expect(pageContext("/poradnik/co-zabrac/")).toEqual({ page_type: "guide" });
    expect(pageContext("/polityka-cookies/")).toEqual({ page_type: "legal" });
  });

  it("splits destination hubs from individual tours", () => {
    expect(pageContext("/wycieczki-z-marsa-alam/")).toEqual({
      page_type: "destination",
      destination: "marsa-alam",
    });
    expect(pageContext("/wycieczki-z-marsa-alam/rejs-nefertari/")).toEqual({
      page_type: "tour",
      destination: "marsa-alam",
      tour_slug: "rejs-nefertari",
    });
  });
});

describe("track", () => {
  it("is a safe no-op on the server / without gtag", () => {
    expect(() => track("whatsapp_click", { placement: "floating_fab" })).not.toThrow();
  });
});
