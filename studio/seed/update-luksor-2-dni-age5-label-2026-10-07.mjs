#!/usr/bin/env node
/**
 * SCOPED age-range label correction for LUKSOR 2 DNI + LOT BALONEM (from Hurghada).
 * NO price amounts change. (Sanity = production source of truth.)
 *
 *   node ./seed/update-luksor-2-dni-age5-label-2026-10-07.mjs [--dry-run]
 *
 * RULE CLARIFIED 2026-10-07: child 5-11 = 190 USD (PAID), child UNDER 5 = free.
 * So age 5 is NOT free. The old free-tier label "Dziecko 0-5 lat" and the "0-5 lat"
 * prose wrongly imply age 5 is free; the "(dokładnie) 5 lat potwierdzamy przy
 * rezerwacji" clauses imply the age-5 category is ambiguous. Both are corrected:
 *   - free-tier option label "Dziecko 0-5 lat" -> "Dziecko poniżej 5 lat"
 *   - every "0-5 lat" -> "poniżej 5 lat"
 *   - the 3 obsolete exact-age-5 confirmation clauses removed (incl. requirements[4])
 * Amounts (275/245/230/190/0), _keys, order, priceFrom, everything else UNCHANGED.
 *
 * Target: tour.hurghada.luksor-2-dni-lot-balonem (only this doc; siblings never touched).
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const STUDIO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const envPath of [resolve(STUDIO_ROOT, ".env.local"), resolve(STUDIO_ROOT, ".env")]) {
  if (!existsSync(envPath)) continue;
  for (const raw of readFileSync(envPath, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("="); if (eq === -1) continue;
    const key = line.slice(0, eq).trim(); if (!key || key in process.env) continue;
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}

const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");
const ID = "tour.hurghada.luksor-2-dni-lot-balonem";
if (!token) { console.error("Missing SANITY_WRITE_TOKEN. Nothing done."); process.exit(1); }

// remove the obsolete exact-age-5 confirmation clauses, then normalise "0-5 lat"/"do 5 lat"
const fixAge = (s) => String(s)
  .replace(/;?\s*wiek dokładnie 5 lat potwierdzamy przy rezerwacji/gi, "")
  .replace(/;?\s*dziecko dokładnie w wieku 5 lat\s*-\s*kategorię cenową potwierdzamy przy rezerwacji/gi, "")
  .replace(/\s*Dla dziecka dokładnie w wieku 5 lat kategorię cenową potwierdzamy przy rezerwacji\.?/gi, "")
  .split("0-5 lat").join("poniżej 5 lat")
  .split("do 5 lat").join("poniżej 5 lat")
  .replace(/\s{2,}/g, " ")
  .trim();

const { createClient } = await import("@sanity/client").catch(() => { console.error("install @sanity/client"); process.exit(1); });
const client = createClient({ projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0", dataset: process.env.SANITY_STUDIO_DATASET || "production", apiVersion: "2024-01-01", token, useCdn: false });

if (await client.getDocument(`drafts.${ID}`).catch(() => null)) { console.error(`ABORT: draft ${ID} exists.`); process.exit(1); }
const doc = await client.getDocument(ID);
if (!doc || doc._type !== "tour" || doc.published !== true) { console.error("ABORT: target missing/not a published tour."); process.exit(1); }

const priceSig = (arr) => (arr ?? []).map((o) => `${o.label}=${o.free ? "free" : o.amount}`).join(" | ");
const beforeAmounts = (doc.priceOptions ?? []).map((o) => o.amount).join(",");

const newOptions = (doc.priceOptions ?? []).map((o) => ({ ...o, label: o.label === "Dziecko 0-5 lat" ? "Dziecko poniżej 5 lat" : o.label }));
const newRequirements = (doc.requirements ?? []).filter((r) => !/dokładnie w wieku 5 lat/i.test(r)).map(fixAge);

const set = {
  priceOptions: newOptions,
  priceNote: fixAge(doc.priceNote),
  shortDescription: fixAge(doc.shortDescription),
  overview: fixAge(doc.overview),
  planningNote: fixAge(doc.planningNote),
  seoDescription: fixAge(doc.seoDescription),
  highlights: (doc.highlights ?? []).map(fixAge),
  requirements: newRequirements,
  faqs: (doc.faqs ?? []).map((f) => ({ ...f, answer: fixAge(f.answer) })),
};

// --- GUARDS: labels fixed, NO price moved, no stale age-5-free wording ---
const BLOB = JSON.stringify(set);
if (set.priceOptions.map((o) => o.amount).join(",") !== beforeAmounts) { console.error("ABORT: a price amount changed - this task must not touch amounts."); process.exit(1); }
if (set.priceOptions.length !== (doc.priceOptions ?? []).length) { console.error("ABORT: option count changed."); process.exit(1); }
if (set.priceOptions.some((o, i) => o._key !== doc.priceOptions[i]._key)) { console.error("ABORT: option _key/order drift."); process.exit(1); }
const free = set.priceOptions.find((o) => o.free === true);
if (!free || free.label !== "Dziecko poniżej 5 lat" || free.amount !== 0) { console.error("ABORT: free tier not 'Dziecko poniżej 5 lat'/0."); process.exit(1); }
const paidChild = set.priceOptions.find((o) => /dziecko/i.test(o.label) && !o.free);
if (!paidChild || !/5-11 lat/.test(paidChild.label) || paidChild.amount !== 190) { console.error("ABORT: paid child tier not 'Dziecko 5-11 lat'/190."); process.exit(1); }
if (/0-5 lat/.test(BLOB)) { console.error("ABORT: stale '0-5 lat' remains."); process.exit(1); }
if (/\bdo 5 lat\b/.test(BLOB)) { console.error("ABORT: stale 'do 5 lat' remains."); process.exit(1); }
if (/dokładnie.{0,6}5 lat/i.test(BLOB)) { console.error("ABORT: exact-age-5 confirmation clause remains."); process.exit(1); }
if (!/poniżej 5 lat/.test(BLOB)) { console.error("ABORT: 'poniżej 5 lat' not present."); process.exit(1); }
if (set.requirements.length !== (doc.requirements ?? []).length - 1) { console.error("ABORT: expected exactly one (age-5) requirement removed."); process.exit(1); }
// balloon min-age 8 wording must survive (unrelated, must not be stripped)
if (!/od 8 (lat|roku)/i.test(BLOB)) { console.error("ABORT: balloon min-age-8 wording lost."); process.exit(1); }

console.log("PLAN:");
console.log("  options:", priceSig(doc.priceOptions), "->", priceSig(newOptions));
console.log("  priceNote:", set.priceNote);
console.log("  planningNote tail:", set.planningNote.slice(-160));
console.log("  faqs[1]:", set.faqs[1].answer);
console.log("  highlights[4]:", set.highlights[4]);
console.log(`  requirements: ${doc.requirements.length} -> ${set.requirements.length} (removed exact-age-5 line)`);

if (dryRun) { console.log("\n--dry-run: nothing written."); process.exit(0); }
try {
  const res = await client.patch(ID).set(set).commit({ visibility: "async" });
  console.log(`\nPatched ${res._id} (rev ${res._rev}). Webhook -> build.`);
} catch (e) { console.error("Write failed:", e.message); process.exit(1); }
