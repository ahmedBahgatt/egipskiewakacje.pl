import { describe, it, expect } from "vitest";
import { validateBooking, type BookingValues } from "@/lib/validation";

const TODAY = new Date("2026-08-08T12:00:00");

function values(overrides: Partial<BookingValues> = {}): BookingValues {
  return {
    date: "2026-09-10",
    hotel: "Steigenberger",
    adults: 2,
    children: 0,
    notes: "",
    ...overrides,
  };
}

describe("validateBooking", () => {
  it("accepts a complete valid form (no name required)", () => {
    const r = validateBooking(values(), TODAY);
    expect(r.valid).toBe(true);
    expect(r.firstInvalidField).toBeNull();
  });

  it("flags all missing required fields", () => {
    const r = validateBooking(values({ date: "", hotel: "", adults: 0 }), TODAY);
    expect(r.valid).toBe(false);
    expect(r.errors.date).toBeTruthy();
    expect(r.errors.hotel).toBeTruthy();
    expect(r.errors.adults).toBeTruthy();
    // Focus goes to the first invalid field in visual order.
    expect(r.firstInvalidField).toBe("date");
  });

  it("never requires a name", () => {
    // No `name` field exists on BookingValues; a valid form submits without one.
    const r = validateBooking(values(), TODAY);
    expect(r.valid).toBe(true);
    expect(Object.keys(r.errors)).toHaveLength(0);
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

  it("accepts any non-negative children (5-11) count with no per-child ages", () => {
    expect(validateBooking(values({ children: 0 }), TODAY).valid).toBe(true);
    expect(validateBooking(values({ children: 3 }), TODAY).valid).toBe(true);
  });

  it("rejects a negative children count", () => {
    const r = validateBooking(values({ children: -1 }), TODAY);
    expect(r.valid).toBe(false);
    expect(r.errors.children).toBeTruthy();
  });
});
