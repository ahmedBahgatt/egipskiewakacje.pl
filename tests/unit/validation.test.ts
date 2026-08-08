import { describe, it, expect } from "vitest";
import { validateBooking, type BookingValues } from "@/lib/validation";

const TODAY = new Date("2026-08-08T12:00:00");

function values(overrides: Partial<BookingValues> = {}): BookingValues {
  return {
    name: "Anna",
    date: "2026-09-10",
    hotel: "Steigenberger",
    adults: 2,
    children: 0,
    childrenAges: [],
    notes: "",
    ...overrides,
  };
}

describe("validateBooking", () => {
  it("accepts a complete valid form", () => {
    const r = validateBooking(values(), TODAY);
    expect(r.valid).toBe(true);
    expect(r.firstInvalidField).toBeNull();
  });

  it("flags all missing required fields", () => {
    const r = validateBooking(
      values({ name: "", date: "", hotel: "", adults: 0 }),
      TODAY,
    );
    expect(r.valid).toBe(false);
    expect(r.errors.name).toBeTruthy();
    expect(r.errors.date).toBeTruthy();
    expect(r.errors.hotel).toBeTruthy();
    expect(r.errors.adults).toBeTruthy();
    // Focus goes to the first invalid field in visual order.
    expect(r.firstInvalidField).toBe("name");
  });

  it("rejects a past date", () => {
    const r = validateBooking(values({ date: "2026-08-07" }), TODAY);
    expect(r.valid).toBe(false);
    expect(r.errors.date).toContain("przeszłości");
  });

  it("accepts today as the trip date", () => {
    const r = validateBooking(values({ date: "2026-08-08" }), TODAY);
    expect(r.valid).toBe(true);
  });

  it("requires children ages when children > 0", () => {
    const r = validateBooking(values({ children: 2, childrenAges: [null, null] }), TODAY);
    expect(r.valid).toBe(false);
    expect(r.errors.childrenAges).toBeTruthy();
    expect(r.firstInvalidField).toBe("childrenAges");
  });

  it("passes when children ages are provided", () => {
    const r = validateBooking(values({ children: 2, childrenAges: [6, 9] }), TODAY);
    expect(r.valid).toBe(true);
  });

  it("rejects out-of-range child age", () => {
    const r = validateBooking(values({ children: 1, childrenAges: [40] }), TODAY);
    expect(r.valid).toBe(false);
    expect(r.errors.childrenAges).toBeTruthy();
  });
});
