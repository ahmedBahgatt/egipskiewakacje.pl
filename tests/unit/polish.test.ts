import { describe, it, expect } from "vitest";
import { pluralPl, pluralTours, formatTourCount } from "@/lib/polish";

describe("pluralTours - Polish plural of 'wycieczka'", () => {
  const cases: [number, string][] = [
    [0, "wycieczek"],
    [1, "wycieczka"],
    [2, "wycieczki"],
    [3, "wycieczki"],
    [4, "wycieczki"],
    [5, "wycieczek"],
    [11, "wycieczek"],
    [12, "wycieczek"],
    [13, "wycieczek"],
    [14, "wycieczek"],
    [21, "wycieczek"], // ends in 1 but != 1 -> genitive plural
    [22, "wycieczki"],
    [23, "wycieczki"],
    [24, "wycieczki"],
    [25, "wycieczek"],
    [41, "wycieczek"], // standard Polish (NOT "wycieczka")
    [42, "wycieczki"],
    [81, "wycieczek"], // standard Polish (NOT "wycieczka")
    [82, "wycieczki"],
    [112, "wycieczek"],
    [122, "wycieczki"],
    [1000000, "wycieczek"],
  ];
  for (const [n, form] of cases) {
    it(`${n} -> ${form}`, () => {
      expect(pluralTours(n)).toBe(form);
    });
  }
});

describe("formatTourCount", () => {
  it("joins the number and the correct form", () => {
    expect(formatTourCount(1)).toBe("1 wycieczka");
    expect(formatTourCount(23)).toBe("23 wycieczki");
    expect(formatTourCount(41)).toBe("41 wycieczek");
    expect(formatTourCount(81)).toBe("81 wycieczek");
  });
});

describe("pluralPl - generic, reusable for other nouns", () => {
  const forms = { one: "kierunek", few: "kierunki", many: "kierunków" };
  it("handles the three forms for an arbitrary noun", () => {
    expect(pluralPl(1, forms)).toBe("kierunek");
    expect(pluralPl(3, forms)).toBe("kierunki");
    expect(pluralPl(5, forms)).toBe("kierunków");
    expect(pluralPl(22, forms)).toBe("kierunki");
    expect(pluralPl(11, forms)).toBe("kierunków");
  });
});
