#!/usr/bin/env node
/**
 * SCOPED price update for LUKSOR 2 DNI + LOT BALONEM (from Hurghada).
 * (Sanity = production source of truth.)
 *
 *   node ./seed/update-luksor-2-dni-lot-balonem-price-2026-10-07.mjs            # write
 *   node ./seed/update-luksor-2-dni-lot-balonem-price-2026-10-07.mjs --dry-run  # plan only
 *
 * TIERED PRICE CHANGE (confirmed 2026-10-07):
 *   Dorosły - 2 osoby   270 -> 275 USD
 *   Dorosły - 3-4 osoby 240 -> 245 USD
 *   Dorosły - 5-8 osób  225 -> 230 USD  (= new lowest adult = card/headline base)
 *   Dziecko 5-11 lat    185 -> 190 USD
 *   Dziecko 0-5 lat     bezpłatnie (UNCHANGED - free:true, amount 0)
 *
 * This STAYS a tiered "from" tour: priceFrom TRUE, priceMode perPackage, priceAmount = the
 * lowest adult tier (was 225 -> now 230). NOT converted to a fixed price. Child label already
 * singular "Dziecko 5-11 lat" so the shared TourCard /dziecko/i detector keeps rendering
 * "dziecko 190 USD" - NO relabel, NO component change. Child helpers (priceChild*) stay UNSET,
 * exactly as every sibling.
 *
 * Target (deterministic id; NEVER changes slug/route/canonical/H1/category/images/availability):
 *   tour.hurghada.luksor-2-dni-lot-balonem -> /wycieczki-z-hurghady/luksor-2-dni-lot-balonem/
 *
 * Every text edit is a \b-anchored token swap (270->275, 240->245, 225->230, 185->190) on the
 * LIVE value - these four numbers are exclusively THIS tour's prices within its own fields, so
 * no unrelated copy and no other tour can be touched. Siblings are different docs: never read,
 * never written.
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
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!key || key in process.env) continue;
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");
const API_VERSION = "2024-01-01";

const ID = "tour.hurghada.luksor-2-dni-lot-balonem";
const VERIFY_DATE = "2026-10-07";
const OLD_BASE = 225, NEW_BASE = 230;
// old -> new, by _key (amounts) and as \b-anchored text tokens
const AMT = { 270: 275, 240: 245, 225: 230, 185: 190 };
const OLD_TOKENS = Object.keys(AMT); // ["270","240","225","185"]

if (!token) { console.error("Missing SANITY_WRITE_TOKEN (Editor role). Nothing was done."); process.exit(1); }

const repriceText = (s) => {
  let out = String(s);
  for (const [oldN, newN] of Object.entries(AMT)) out = out.replace(new RegExp(`\\b${oldN}\\b`, "g"), String(newN));
  return out;
};

const { createClient } = await import("@sanity/client").catch(() => {
  console.error("Could not load @sanity/client. Run `npm install` inside studio/ first.");
  process.exit(1);
});
const client = createClient({ projectId, dataset, apiVersion: API_VERSION, token, useCdn: false });

const draft = await client.getDocument(`drafts.${ID}`).catch(() => null);
if (draft) { console.error(`ABORT: an unpublished draft (drafts.${ID}) exists; resolve it first.`); process.exit(1); }

const doc = await client.getDocument(ID);
if (!doc) { console.error(`ABORT: target ${ID} not found.`); process.exit(1); }
if (doc._type !== "tour") { console.error(`ABORT: ${ID} is _type=${doc._type}.`); process.exit(1); }
if (doc.published !== true) { console.error(`ABORT: ${ID} is not published (published=${doc.published}).`); process.exit(1); }
if (doc.priceAmount !== OLD_BASE || doc.priceFrom !== true) {
  console.error(`ABORT: unexpected current pricing (priceAmount=${doc.priceAmount}, priceFrom=${doc.priceFrom}); expected ${OLD_BASE}/true.`);
  process.exit(1);
}

// --- build patch from LIVE values -------------------------------------------
const newOptions = (doc.priceOptions ?? []).map((o) => {
  if (o.free === true || o.amount === 0) return o;              // free child tier untouched
  const mapped = AMT[o.amount];
  if (mapped == null) { console.error(`ABORT: unexpected adult/child option amount ${o.amount} (${o.label}).`); process.exit(1); }
  return { ...o, amount: mapped };
});

const set = {
  priceAmount: NEW_BASE,
  priceFrom: true,
  priceMode: doc.priceMode,
  priceOptions: newOptions,
  highlights: (doc.highlights ?? []).map(repriceText), // highlights[4] carries the price-tier line
  priceNote: repriceText(doc.priceNote),
  shortDescription: repriceText(doc.shortDescription),
  overview: repriceText(doc.overview),
  planningNote: repriceText(doc.planningNote),
  seoTitle: repriceText(doc.seoTitle),
  seoDescription: repriceText(doc.seoDescription),
  requirements: (doc.requirements ?? []).map(repriceText),
  faqs: (doc.faqs ?? []).map((f) => ({ ...f, answer: repriceText(f.answer) })),
  updatedAt: VERIFY_DATE,
};

// --- GUARDS -----------------------------------------------------------------
const BLOB = JSON.stringify(set);
if (set.priceAmount !== NEW_BASE) { console.error("ABORT: base not 230."); process.exit(1); }
if (set.priceFrom !== true) { console.error("ABORT: priceFrom must stay true (tiered 'from')."); process.exit(1); }
{
  const byLabel = (re) => set.priceOptions.find((o) => re.test(o.label ?? ""));
  if (byLabel(/2 osoby/)?.amount !== 275) { console.error("ABORT: 2-osoby tier != 275."); process.exit(1); }
  if (byLabel(/3-4 osoby/)?.amount !== 245) { console.error("ABORT: 3-4 tier != 245."); process.exit(1); }
  if (byLabel(/5-8 os/)?.amount !== 230) { console.error("ABORT: 5-8 tier != 230."); process.exit(1); }
  const child = set.priceOptions.find((o) => /dziecko/i.test(o.label ?? "") && !o.free);
  if (!child || child.amount !== 190) { console.error("ABORT: paid child tier not detectable at 190."); process.exit(1); }
  const free = set.priceOptions.find((o) => o.free === true);
  if (!free || free.amount !== 0) { console.error("ABORT: free child tier lost."); process.exit(1); }
  const adultAmts = set.priceOptions.filter((o) => /doros/i.test(o.label ?? "")).map((o) => o.amount);
  if (Math.min(...adultAmts) !== NEW_BASE) { console.error("ABORT: base 230 is not the lowest ADULT tier."); process.exit(1); }
}
if (set.priceOptions.length !== (doc.priceOptions ?? []).length) { console.error("ABORT: option count changed."); process.exit(1); }
if (set.priceOptions.some((o, i) => o._key !== doc.priceOptions[i]._key)) { console.error("ABORT: option _key/order drift."); process.exit(1); }
// no stale tour price tokens remain
for (const t of OLD_TOKENS) {
  if (new RegExp(`\\b${t}\\b`).test(BLOB)) { console.error(`ABORT: stale price token ${t} still present.`); process.exit(1); }
}
if (!/\b275\b/.test(BLOB) || !/\b245\b/.test(BLOB) || !/\b230\b/.test(BLOB) || !/\b190\b/.test(BLOB)) { console.error("ABORT: new tier values not all present."); process.exit(1); }
if (set.faqs.length !== (doc.faqs ?? []).length) { console.error("ABORT: faqs count changed."); process.exit(1); }
if (set.requirements.length !== (doc.requirements ?? []).length) { console.error("ABORT: requirements count changed."); process.exit(1); }
if (set.highlights.length !== (doc.highlights ?? []).length) { console.error("ABORT: highlights count changed."); process.exit(1); }
if (set.seoTitle.length > 70) { console.error(`ABORT: seoTitle length ${set.seoTitle.length} > 70.`); process.exit(1); }
if (set.seoDescription.length < 145 || set.seoDescription.length > 170) { console.error(`ABORT: seoDescription length ${set.seoDescription.length} outside 145-170.`); process.exit(1); }

console.log("PLAN:");
console.log(`  priceAmount: ${doc.priceAmount} -> ${set.priceAmount} (priceFrom stays ${set.priceFrom}, mode ${set.priceMode})`);
console.log(`  options: ${set.priceOptions.map((o) => `${o.label}=${o.free ? "free" : o.amount}`).join(" | ")}`);
console.log(`  updatedAt: ${doc.updatedAt} -> ${set.updatedAt}`);
console.log(`  priceNote: ${set.priceNote}`);
console.log(`  seoTitle (${set.seoTitle.length}): ${set.seoTitle}`);
console.log(`  seoDescription (${set.seoDescription.length}): ${set.seoDescription}`);
console.log(`  faqs[0]: ${set.faqs[0].answer}`);
console.log(`  faqs[1]: ${set.faqs[1].answer}`);

if (dryRun) { console.log("\n--dry-run: nothing written."); process.exit(0); }

try {
  const res = await client
    .patch(ID)
    .set(set)
    .unset(["priceChild", "priceChildAgeMin", "priceInfantFree"]) // keep child helpers UNSET (tiered tour)
    .commit({ visibility: "async" });
  console.log(`\nPatched ${res._id} (rev ${res._rev}). Single publish webhook -> one GitHub Actions build.`);
} catch (e) {
  console.error(`\nWrite failed: ${e.message}`);
  if (e.response?.body?.error) console.error(JSON.stringify(e.response.body.error, null, 2));
  process.exit(1);
}
