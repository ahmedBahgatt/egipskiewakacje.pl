import { describe, it, expect } from "vitest";
import { normalizeIndex, realIndex } from "@/lib/carousel";

/**
 * The bestseller carousel is a true infinite loop built on a 3x track
 * `[cloneA][real][cloneB]` (each length n) with the logical index kept in the
 * middle real block [n, 2n). These guard the wrap maths that makes autoplay,
 * arrows and drag continue forever in both directions with no visible jump.
 */
describe("carousel normalizeIndex", () => {
  const n = 9;

  it("leaves indices already in the middle block untouched", () => {
    for (let i = n; i < 2 * n; i++) expect(normalizeIndex(i, n)).toBe(i);
  });

  it("wraps last -> first (next past the end)", () => {
    // Stepping next from the last real card (2n-1) lands on 2n (cloneB[0]);
    // it must normalise to the first real card n - an identical-looking jump.
    expect(normalizeIndex(2 * n, n)).toBe(n);
  });

  it("wraps first -> last (previous before the start)", () => {
    // Stepping prev from the first real card (n) lands on n-1 (cloneA last);
    // it must normalise to the last real card 2n-1.
    expect(normalizeIndex(n - 1, n)).toBe(2 * n - 1);
  });

  it("a full forward cycle of n steps returns to the same real card", () => {
    let i = n; // first real
    for (let s = 0; s < n; s++) i = normalizeIndex(i + 1, n);
    expect(i).toBe(n);
    expect(realIndex(i, n)).toBe(0);
  });

  it("realIndex maps every clone/real index onto 0..n-1", () => {
    expect(realIndex(n, n)).toBe(0);
    expect(realIndex(2 * n - 1, n)).toBe(n - 1);
    expect(realIndex(0, n)).toBe(0); // cloneA[0] represents real 0
    expect(realIndex(2 * n, n)).toBe(0); // cloneB[0] represents real 0
  });

  it("is safe for an empty list", () => {
    expect(normalizeIndex(0, 0)).toBe(0);
    expect(realIndex(3, 0)).toBe(0);
  });
});
