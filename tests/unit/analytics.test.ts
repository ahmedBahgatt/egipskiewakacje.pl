import { describe, it, expect } from "vitest";
import { track, __analyticsInternals } from "@/lib/analytics";

const { sanitize } = __analyticsInternals;

describe("analytics sanitiser", () => {
  it("keeps only allow-listed non-PII keys", () => {
    const out = sanitize({ tour_slug: "kair-gem-piramidy", destination: "sharm-el-sheikh" });
    expect(out).toEqual({ tour_slug: "kair-gem-piramidy", destination: "sharm-el-sheikh" });
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
    } as unknown as Parameters<typeof sanitize>[0];
    const out = sanitize(dirty);
    expect(out).toEqual({ tour_slug: "kair-gem-piramidy" });
    expect(Object.keys(out)).not.toContain("name");
    expect(Object.keys(out)).not.toContain("hotel");
    expect(Object.keys(out)).not.toContain("phone");
    expect(Object.keys(out)).not.toContain("notes");
    expect(Object.keys(out)).not.toContain("message");
  });

  it("rejects non-primitive values", () => {
    const out = sanitize({
      // @ts-expect-error intentional bad input
      value: { nested: true },
      position: 3,
    });
    expect(out).toEqual({ position: 3 });
  });
});

describe("track", () => {
  it("is a safe no-op on the server / without a platform", () => {
    expect(() => track("whatsapp_floating_click", { source: "floating" })).not.toThrow();
  });
});
