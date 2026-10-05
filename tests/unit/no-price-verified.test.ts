import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

/**
 * Regression guard: the retired "price last verified" feature must never return.
 *
 * The public-facing "Cena zweryfikowana: <date>" line and its backing field
 * (`priceLastVerifiedAt` in Sanity, `lastVerifiedAt` on the price model) were
 * removed site-wide. This test scans the shipped frontend (`src/`) and the
 * Studio schema so the field/text cannot silently reappear through a query,
 * type, mapper, component or schema edit.
 */

const SRC = fileURLToPath(new URL("../../src", import.meta.url));
const SCHEMA = fileURLToPath(new URL("../../studio/schemas/documents/tour.ts", import.meta.url));

const EXT = /\.(ts|tsx|css|js|jsx)$/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = `${dir}/${entry}`;
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXT.test(entry)) out.push(full);
  }
  return out;
}

describe("the price-verification feature stays retired", () => {
  const srcFiles = walk(SRC);

  it("no src file renders the 'Cena zweryfikowana' line", () => {
    const offenders = srcFiles.filter((f) => readFileSync(f, "utf8").includes("Cena zweryfikowana"));
    expect(offenders, "'Cena zweryfikowana' reintroduced").toEqual([]);
  });

  it("no src file references the lastVerifiedAt / priceLastVerifiedAt field", () => {
    const offenders = srcFiles.filter((f) => /\b(priceL|l)astVerifiedAt\b/.test(readFileSync(f, "utf8")));
    expect(offenders, "lastVerifiedAt/priceLastVerifiedAt reintroduced in src/").toEqual([]);
  });

  it("the Sanity tour schema declares no priceLastVerifiedAt field", () => {
    expect(readFileSync(SCHEMA, "utf8")).not.toContain("priceLastVerifiedAt");
  });
});
