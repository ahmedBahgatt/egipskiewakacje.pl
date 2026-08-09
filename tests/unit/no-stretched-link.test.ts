import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

/**
 * Structural guard: TourCard must never reintroduce a stretched-link pseudo-element.
 *
 * A `::before` / `::after { position: absolute; inset: 0 }` on the title link (or any
 * selector inside a card that is not itself a positioned containing block) resolves
 * its inset against the viewport and creates an invisible full-page tour link
 * ("ghost clicks"). The card already exposes explicit, visible links (image, title,
 * "Szczegóły"), so no stretched hit area is ever needed.
 */

function read(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

/** Find every `<selector>::before|after { ... }` block and return [selector, body]. */
function pseudoBlocks(css: string): { selector: string; body: string }[] {
  const out: { selector: string; body: string }[] = [];
  const re = /([.#][\w-]+(?:::(?:before|after)))\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    if (/::(before|after)/.test(m[1])) out.push({ selector: m[1], body: m[2] });
  }
  return out;
}

describe("TourCard has no stretched-link pseudo-element", () => {
  const css = read("../../src/components/tour/TourCard.module.css");

  it("declares no ::before/::after that stretches with position:absolute + inset:0", () => {
    const offenders = pseudoBlocks(css).filter(
      (b) => /position:\s*absolute/.test(b.body) && /inset:\s*0/.test(b.body),
    );
    expect(
      offenders.map((o) => o.selector),
      "stretched-link pseudo-element(s) reintroduced in TourCard.module.css",
    ).toEqual([]);
  });

  it("still exposes the title link and does not hide real links behind a pseudo-element", () => {
    expect(css).toContain(".titleLink");
    expect(css).not.toMatch(/\.titleLink::after\s*\{[^}]*inset:\s*0/);
  });
});
