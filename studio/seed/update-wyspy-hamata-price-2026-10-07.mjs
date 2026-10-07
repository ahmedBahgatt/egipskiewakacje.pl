#!/usr/bin/env node
/**
 * SCOPED price update for the HAMATA ISLANDS excursion from Marsa Alam.
 * (Sanity = production source of truth.)
 *
 *   node ./seed/update-wyspy-hamata-price-2026-10-07.mjs            # write
 *   node ./seed/update-wyspy-hamata-price-2026-10-07.mjs --dry-run  # plan only
 *
 * PRICE CHANGE (confirmed 2026-10-07):
 *   Dorosły          60 USD -> 63 USD
 *   Dzieci 5-11 lat  45 USD -> 48 USD
 *   Dzieci do 5 lat  bezpłatnie (UNCHANGED - free tier stays free:true, amount 0)
 *
 * Target (deterministic id, NEVER creates a duplicate, NEVER changes slug/route/
 * canonical/H1/category/images/availability/booking):
 *   tour.marsa-alam.wyspy-hamata  ->  /wycieczki-z-marsa-alam/wyspy-hamata/
 *
 * ONLY price-carrying fields + updatedAt are touched. Every text edit is a literal
 * "60 USD"->"63 USD" / "45 USD"->"48 USD" substitution on the LIVE value (fetched
 * first), so no unrelated copy changes and no other trip can be affected. Siblings
 * (Sataya/Samadai/Marsa Mubarak/Abu Dabbab/Nefertari/Sharm el Lulli) are DIFFERENT
 * docs -> never read, never written. priceFrom stays FALSE (63 = fixed adult price,
 * not a "from"). The free child helper fields (priceChild/priceChildAgeMin/
 * priceInfantFree) stay UNSET - the free tier lives in priceOptions, exactly as before.
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

const ID = "tour.marsa-alam.wyspy-hamata";
const VERIFY_DATE = "2026-10-07";
const OLD_ADULT = 60, NEW_ADULT = 63;
const OLD_CHILD = 45, NEW_CHILD = 48;

if (!token) { console.error("Missing SANITY_WRITE_TOKEN (Editor role). Nothing was done."); process.exit(1); }

// literal price-token substitution used on every text field
const repriceText = (s) =>
  String(s)
    .split(`${OLD_ADULT} USD`).join(`${NEW_ADULT} USD`)
    .split(`${OLD_CHILD} USD`).join(`${NEW_CHILD} USD`);

const { createClient } = await import("@sanity/client").catch(() => {
  console.error("Could not load @sanity/client. Run `npm install` inside studio/ first.");
  process.exit(1);
});
const client = createClient({ projectId, dataset, apiVersion: API_VERSION, token, useCdn: false });

// guard: a draft must not shadow the published doc (we only write the published doc)
const draft = await client.getDocument(`drafts.${ID}`).catch(() => null);
if (draft) { console.error(`ABORT: an unpublished draft (drafts.${ID}) exists; resolve it first so we don't publish unrelated edits.`); process.exit(1); }

const doc = await client.getDocument(ID);
if (!doc) { console.error(`ABORT: target ${ID} not found.`); process.exit(1); }
if (doc._type !== "tour") { console.error(`ABORT: ${ID} is _type=${doc._type}.`); process.exit(1); }
if (doc.published !== true) { console.error(`ABORT: ${ID} is not published (published=${doc.published}); refusing to flip publish state here.`); process.exit(1); }
if (doc.priceAmount !== OLD_ADULT || doc.priceFrom !== false) {
  console.error(`ABORT: unexpected current pricing (priceAmount=${doc.priceAmount}, priceFrom=${doc.priceFrom}); expected ${OLD_ADULT}/false. Not patching.`);
  process.exit(1);
}

// --- build the patch from the LIVE values -----------------------------------
const newOptions = (doc.priceOptions ?? []).map((o) => {
  if (o.free === true || o.amount === 0) return o;                 // free tier untouched
  if (o.amount === OLD_ADULT) return { ...o, amount: NEW_ADULT };  // Dorosły
  if (o.amount === OLD_CHILD) return { ...o, amount: NEW_CHILD };  // Dzieci 5-11 lat
  return o;
});

const set = {
  priceAmount: NEW_ADULT,
  priceOptions: newOptions,
  priceNote: repriceText(doc.priceNote),
  shortDescription: repriceText(doc.shortDescription),
  overview: repriceText(doc.overview),
  planningNote: repriceText(doc.planningNote),
  seoDescription: repriceText(doc.seoDescription),
  requirements: (doc.requirements ?? []).map(repriceText),
  faqs: (doc.faqs ?? []).map((f) => ({ ...f, answer: repriceText(f.answer) })),
  updatedAt: VERIFY_DATE,
};

// --- GUARDS -----------------------------------------------------------------
const BLOB = JSON.stringify(set);
if (set.priceAmount !== NEW_ADULT) { console.error("ABORT: priceAmount not set to new adult."); process.exit(1); }
if (set.priceOptions.find((o) => o.label?.toLowerCase().includes("dorosły"))?.amount !== NEW_ADULT) { console.error("ABORT: adult option != 63."); process.exit(1); }
if (set.priceOptions.find((o) => /5-11/.test(o.label ?? ""))?.amount !== NEW_CHILD) { console.error("ABORT: child 5-11 option != 48."); process.exit(1); }
{
  const free = set.priceOptions.find((o) => o.free === true);
  if (!free || free.amount !== 0 || !/do 5 lat/i.test(free.label ?? "")) { console.error("ABORT: free 'Dzieci do 5 lat' tier lost."); process.exit(1); }
}
if (new RegExp(`\\b${OLD_ADULT} USD\\b`).test(BLOB)) { console.error("ABORT: stale '60 USD' still present after reprice."); process.exit(1); }
if (new RegExp(`\\b${OLD_CHILD} USD\\b`).test(BLOB)) { console.error("ABORT: stale '45 USD' still present after reprice."); process.exit(1); }
if (!/63 USD/.test(BLOB) || !/48 USD/.test(BLOB)) { console.error("ABORT: new 63/48 USD not present."); process.exit(1); }
if (set.seoDescription.length < 145 || set.seoDescription.length > 170) { console.error(`ABORT: seoDescription length ${set.seoDescription.length} outside 145-170.`); process.exit(1); }
// unchanged-shape invariants (we must NOT have altered counts)
if (set.priceOptions.length !== (doc.priceOptions ?? []).length) { console.error("ABORT: priceOptions count changed."); process.exit(1); }
if (set.faqs.length !== (doc.faqs ?? []).length) { console.error("ABORT: faqs count changed."); process.exit(1); }
if (set.requirements.length !== (doc.requirements ?? []).length) { console.error("ABORT: requirements count changed."); process.exit(1); }
if (/\b73\b/.test(BLOB)) { console.error("ABORT: promotional 73 present."); process.exit(1); }

console.log("PLAN (field -> new value):");
console.log(`  priceAmount: ${doc.priceAmount} -> ${set.priceAmount}`);
console.log(`  priceOptions: ${set.priceOptions.map((o) => (o.free ? "free" : o.amount)).join("/")} (was ${(doc.priceOptions ?? []).map((o) => (o.free ? "free" : o.amount)).join("/")})`);
console.log(`  updatedAt: ${doc.updatedAt} -> ${set.updatedAt}`);
for (const k of ["priceNote", "shortDescription", "seoDescription"]) console.log(`  ${k}: ${JSON.stringify(set[k]).slice(0, 120)}...`);
console.log(`  faqs[0].answer: ${set.faqs[0].answer}`);
console.log(`  requirements[0]: ${set.requirements[0]}`);

if (dryRun) { console.log("\n--dry-run: nothing written."); process.exit(0); }

try {
  const res = await client
    .patch(ID)
    .set(set)
    .unset(["priceChild", "priceChildAgeMin", "priceInfantFree"]) // keep child helpers UNSET
    .commit({ visibility: "async" });
  console.log(`\nPatched ${res._id} (rev ${res._rev}). Single publish webhook -> one GitHub Actions build.`);
} catch (e) {
  console.error(`\nWrite failed: ${e.message}`);
  if (e.response?.body?.error) console.error(JSON.stringify(e.response.body.error, null, 2));
  process.exit(1);
}
