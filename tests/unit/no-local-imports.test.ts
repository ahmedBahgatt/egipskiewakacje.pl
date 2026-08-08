import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../src", import.meta.url));

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

/**
 * UI components and route files must read content only through the adapter
 * (`@/content`), never by importing local arrays directly. That guarantees the
 * homepage destination components, pricing, FAQ etc. render CMS-provided props.
 * The adapter barrel (src/content) is the single legitimate place local content
 * is referenced (for local mode).
 */
describe("content sourcing", () => {
  it("no component or route imports @/content/local", () => {
    const dirs = [join(root, "components"), join(root, "app")];
    const offenders: string[] = [];
    for (const dir of dirs) {
      for (const file of walk(dir)) {
        const src = readFileSync(file, "utf8");
        if (src.includes("@/content/local")) {
          offenders.push(file.replace(root, "src"));
        }
      }
    }
    expect(offenders, `these files import local content directly:\n${offenders.join("\n")}`).toEqual([]);
  });
});
