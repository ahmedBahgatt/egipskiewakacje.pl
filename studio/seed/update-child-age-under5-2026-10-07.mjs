#!/usr/bin/env node
/**
 * SITE-WIDE child age-range consistency migration.
 * (Sanity = production source of truth. NO price amounts change.)
 *
 *   node ./seed/update-child-age-under5-2026-10-07.mjs [--dry-run]
 *
 * GLOBAL RULE: child 5-11 = paid tier, child UNDER 5 = free, age 5 is NOT free.
 *
 * TARGET SET (computed, printed): published tours that (a) have a paid child tier
 * "Dziecko 5-11 lat" / "5-10 lat" (age 5 paid) AND (b) carry free-tier wording
 * "do 5 lat" / "0-5 lat" (which wrongly implies age 5 is free). Tours with a
 * genuinely different threshold (mini-egypt-park / wielkie-akwarium = age 4) or no
 * under-5-free tier are NOT matched, so they are never touched.
 *
 * TRANSFORM (text only; amounts/free/_keys/order/priceFrom/priceMode/currency frozen):
 *   1. free priceOption label "Dziecko do 5 lat"/"Dziecko 0-5 lat" -> "Dziecko poniżej 5 lat"
 *   2. strip now-false age-5 overlap clauses joined by ; - , a  (…dokładnie…5 lat…potwierdzamy…)
 *   3. drop standalone sentences containing "dokładnie" or "wiek graniczny" (all age-5 overlap prose)
 *   4. "do 5 lat" / "0-5 lat" / "0–5 lat" -> "poniżej 5 lat"
 *   5. remove dedicated overlap FAQ items (question contains "dokładnie")
 *   6. drop requirement lines emptied by the above
 * Result: age 5 is unambiguously in the paid 5-11 tier everywhere.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const STUDIO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const envPath of [resolve(STUDIO_ROOT, ".env.local"), resolve(STUDIO_ROOT, ".env")]) {
  if (!existsSync(envPath)) continue;
  for (const raw of readFileSync(envPath, "utf8").split("\n")) {
    const line = raw.trim(); if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("="); if (eq === -1) continue;
    const key = line.slice(0, eq).trim(); if (!key || key in process.env) continue;
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    process.env[key] = val;
  }
}
const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");
if (!token) { console.error("Missing SANITY_WRITE_TOKEN."); process.exit(1); }

const DROP_SENTENCE = /(dokładnie|wiek graniczny)/i;
const FREE_LABELS = new Set(["Dziecko do 5 lat", "Dziecko 0-5 lat"]);

function fixText(s) {
  s = String(s);
  // 2. strip overlap tails joined by ; - – or ", a" (keep text before the separator)
  s = s.replace(/\s*(?:[-–;]|,\s*a)\s*(?:dla dziecka |w przypadku dziecka |kategorię dziecka )?(?:wiek )?dokładnie(?: w wieku)? 5 lat[^.]*?(?:potwierdzamy|rezerwacji|rezerwację)[^.]*?(?=\.|$)/gi, "");
  // eden parenthetical
  s = s.replace(/\s*\(wiek graniczny(?: \(?5 lat\)?)? potwierdzamy przy rezerwacji\)/gi, "");
  // 3. drop standalone sentences with dokładnie / wiek graniczny
  s = s.split(/(?<=\.)\s+/).filter((p) => !DROP_SENTENCE.test(p)).join(" ");
  // 4. age-range token -> poniżej 5 lat
  s = s.replace(/\b0[‐‒–—-]5 lat\b/gi, "poniżej 5 lat").replace(/\bdo 5 lat\b/gi, "poniżej 5 lat");
  // tidy
  s = s.replace(/\s{2,}/g, " ").replace(/\s+([.,;])/g, "$1").trim();
  return s;
}
const isOverlapFaqQuestion = (q) => /dokładnie/i.test(q || "");

const { createClient } = await import("@sanity/client").catch(() => { console.error("install @sanity/client"); process.exit(1); });
const client = createClient({ projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0", dataset: process.env.SANITY_STUDIO_DATASET || "production", apiVersion: "2024-01-01", token, useCdn: false });

const all = await client.fetch(`*[_type=="tour" && published==true]{...}`);
// compute target set
const AGE5FREE = /(\bdo 5 lat\b|\b0[‐‒–—-]5 lat\b)/i;
const paidChildStartsAt5 = (t) => {
  if ((t.priceOptions || []).some((o) => !o.free && /\b5-1[01] lat\b/.test(o.label || ""))) return true;
  // some tours carry the paid 5-11 tier only in prose (generic "Dziecko" option label)
  const prose = [t.priceNote, t.overview, t.shortDescription, t.planningNote, ...(t.requirements || [])].filter(Boolean).join(" ");
  return /\b5-1[01] lat\b/.test(prose);
};
const hasAge5FreeWording = (t) => {
  const blob = JSON.stringify(t);
  if (AGE5FREE.test(blob) || /dokładnie[^"]{0,10}5 lat/i.test(blob)) return true;
  return (t.priceOptions || []).some((o) => FREE_LABELS.has(o.label));
};
const targets = all.filter((t) => paidChildStartsAt5(t) && hasAge5FreeWording(t));

console.log(`TARGET SET: ${targets.length} tours`);
targets.forEach((t) => console.log("  - " + t._id.replace("tour.", "")));

const draftConflicts = [];
for (const id of targets.map((t) => t._id)) { if (await client.getDocument(`drafts.${id}`).catch(() => null)) draftConflicts.push(id); }
if (draftConflicts.length) { console.error("ABORT: drafts exist for " + draftConflicts.join(", ")); process.exit(1); }

let patches = [];
let changedCount = 0;
for (const t of targets) {
  const set = {};
  const beforeAmounts = (t.priceOptions || []).map((o) => `${o._key}:${o.free ? "free" : o.amount}`).join(",");

  // 1. priceOptions: relabel the free tier AND fix any age wording in option notes
  const newOpts = (t.priceOptions || []).map((o) => {
    const label = FREE_LABELS.has(o.label) ? "Dziecko poniżej 5 lat" : o.label;
    const note = o.note != null ? fixText(o.note) : o.note;
    return { ...o, label, ...(o.note != null ? { note } : {}) };
  });
  if (JSON.stringify(newOpts) !== JSON.stringify(t.priceOptions)) set.priceOptions = newOpts;

  for (const f of ["priceNote", "overview", "shortDescription", "planningNote", "seoDescription", "seoTitle", "cancellationPolicy"]) {
    if (t[f] != null) { const v = fixText(t[f]); if (v !== t[f]) set[f] = v; }
  }
  for (const f of ["highlights", "whatToBring"]) {
    if (Array.isArray(t[f])) { const v = t[f].map(fixText); if (JSON.stringify(v) !== JSON.stringify(t[f])) set[f] = v; }
  }
  if (Array.isArray(t.attractions)) { const v = t.attractions.map((a) => ({ ...a, title: fixText(a.title), body: fixText(a.body) })); if (JSON.stringify(v) !== JSON.stringify(t.attractions)) set.attractions = v; }
  if (Array.isArray(t.extras)) { const v = t.extras.map((e) => ({ ...e, label: fixText(e.label), note: e.note != null ? fixText(e.note) : e.note })); if (JSON.stringify(v) !== JSON.stringify(t.extras)) set.extras = v; }
  if (Array.isArray(t.itinerary)) { const v = t.itinerary.map((s) => ({ ...s, title: fixText(s.title), description: fixText(s.description) })); if (JSON.stringify(v) !== JSON.stringify(t.itinerary)) set.itinerary = v; }
  if (t.compare && t.compare.note != null) { const n = fixText(t.compare.note); if (n !== t.compare.note) set.compare = { ...t.compare, note: n }; }
  if (Array.isArray(t.requirements)) {
    const v = t.requirements.map(fixText).filter((x) => x && x.length > 0);
    if (JSON.stringify(v) !== JSON.stringify(t.requirements)) set.requirements = v;
  }
  if (Array.isArray(t.faqs)) {
    const v = t.faqs
      .filter((f) => !isOverlapFaqQuestion(f.question))
      .map((f) => ({ ...f, question: fixText(f.question), answer: fixText(f.answer) }));
    if (JSON.stringify(v) !== JSON.stringify(t.faqs)) set.faqs = v;
  }

  if (!Object.keys(set).length) continue;

  // --- GUARDS (per tour) ---
  const afterOpts = set.priceOptions || t.priceOptions;
  const afterAmounts = (afterOpts || []).map((o) => `${o._key}:${o.free ? "free" : o.amount}`).join(",");
  if (afterAmounts !== beforeAmounts) { console.error(`ABORT ${t._id}: price option amounts/keys/free changed.`); process.exit(1); }
  const BLOB = JSON.stringify(set);
  if (/\bdo 5 lat\b/i.test(BLOB) || /\b0[‐‒–—-]5 lat\b/i.test(BLOB)) { console.error(`ABORT ${t._id}: stale age-5-free token remains.`); process.exit(1); }
  if (/dokładnie/i.test(BLOB)) { console.error(`ABORT ${t._id}: 'dokładnie' overlap clause remains.`); process.exit(1); }
  if (/wiek graniczny/i.test(BLOB)) { console.error(`ABORT ${t._id}: 'wiek graniczny' clause remains.`); process.exit(1); }
  if (set.requirements && set.requirements.some((r) => !r.trim())) { console.error(`ABORT ${t._id}: empty requirement.`); process.exit(1); }
  if (set.faqs && set.faqs.some((f) => !f.question?.trim() || !f.answer?.trim())) { console.error(`ABORT ${t._id}: empty faq.`); process.exit(1); }
  // +5 chars from "do 5 lat"->"poniżej 5 lat" can push a few descriptions slightly over the
  // 170 styling convention; allow up to 176 (Google displays ~160 anyway) rather than REWRITE
  // unrelated SEO prose just to claw back chars.
  if (set.seoDescription && (set.seoDescription.length < 140 || set.seoDescription.length > 176)) { console.error(`ABORT ${t._id}: seoDescription length ${set.seoDescription.length} out of 140-176.`); process.exit(1); }
  if (set.seoTitle && set.seoTitle.length > 70) { console.error(`ABORT ${t._id}: seoTitle length ${set.seoTitle.length} > 70.`); process.exit(1); }

  changedCount++;
  console.log(`\n### ${t._id.replace("tour.", "")}  (fields: ${Object.keys(set).join(", ")})`);
  if (set.priceOptions) console.log(`   label: ${(t.priceOptions||[]).map(o=>o.label).join(" | ")}  ->  ${set.priceOptions.map(o=>o.label).join(" | ")}`);
  for (const f of ["priceNote", "shortDescription", "planningNote", "seoDescription", "seoTitle", "overview"]) if (set[f]) console.log(`   ${f}: ${set[f]}`);
  if (set.highlights) t.highlights.forEach((h,i)=>{ if(h!==set.highlights[i]) console.log(`   highlights[${i}]: ${set.highlights[i]}`); });
  if (set.requirements) { if (set.requirements.length !== t.requirements.length) console.log(`   requirements: ${t.requirements.length} -> ${set.requirements.length}`); set.requirements.forEach((r,i)=>{ if(t.requirements[i]!==r) console.log(`   req: ${r}`); }); }
  if (set.faqs) {
    const removed = t.faqs.filter((f)=>isOverlapFaqQuestion(f.question)).map((f)=>f.question);
    if (removed.length) console.log(`   FAQ removed: ${removed.join(" || ")}`);
    set.faqs.forEach((f)=>{ const orig = t.faqs.find((o)=>o._key===f._key); if (orig && (orig.question!==f.question||orig.answer!==f.answer)) console.log(`   FAQ kept/edited: Q=${f.question}\n        A=${f.answer}`); });
  }

  patches.push({ id: t._id, set });
}

console.log(`\n=== ${changedCount} tours to patch ===`);
if (dryRun) { console.log("--dry-run: nothing written."); process.exit(0); }

let tx = client.transaction();
for (const p of patches) tx = tx.patch(p.id, (patch) => patch.set(p.set));
try {
  const res = await tx.commit({ visibility: "async" });
  console.log(`\nCommitted ${res.results?.length ?? patches.length} tour patches in one transaction. Webhook -> one build.`);
} catch (e) { console.error("Write failed:", e.message); if (e.response?.body?.error) console.error(JSON.stringify(e.response.body.error)); process.exit(1); }
