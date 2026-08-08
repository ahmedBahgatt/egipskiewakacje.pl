import { Fraunces, Manrope } from "next/font/google";

/**
 * Two complementary self-hosted fonts (next/font downloads + self-hosts at build,
 * works with output: export). Both include latin-ext for full Polish diacritics.
 * - Fraunces: editorial display serif for major headings.
 * - Manrope : highly readable modern sans for body & UI.
 */
// Display font: headings swap in, so it must NOT compete with the LCP image at
// preload priority - preload:false keeps the critical path light on mobile.
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
  preload: false,
});

// Body/UI font: preloaded so first paint of readable text is fast.
export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});
