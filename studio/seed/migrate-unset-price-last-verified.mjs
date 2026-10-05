/**
 * ONE-TIME MIGRATION - retire the `priceLastVerifiedAt` field.
 *
 * The public-facing "price last verified" feature was removed site-wide
 * (schema, frontend, queries, types). This unsets the now-orphaned
 * `priceLastVerifiedAt` key from every existing tour document (published AND
 * drafts) so no stale data lingers in the dataset.
 *
 * It ONLY unsets that one key - every other field (incl. _updatedAt/updatedAt)
 * is preserved. It patches existing docs in place: no new/duplicate docs.
 *
 * Usage:
 *   node ./seed/migrate-unset-price-last-verified.mjs --dry-run   # count only
 *   node ./seed/migrate-unset-price-last-verified.mjs             # unset (token from studio/.env)
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

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run") || process.argv.includes("-n");
const API_VERSION = "2024-01-01";
const FIELD = "priceLastVerifiedAt";

if (!token) { console.error("Missing SANITY_WRITE_TOKEN (Editor role). Nothing done."); process.exit(1); }

const { createClient } = await import("@sanity/client").catch(() => {
  console.error("Could not load @sanity/client. Run from the studio/ workspace."); process.exit(1);
});
const client = createClient({ projectId, dataset, apiVersion: API_VERSION, token, useCdn: false });

console.log(`Target: projectId=${projectId} dataset=${dataset} (apiVersion ${API_VERSION})`);

const ids = await client.fetch(`*[_type == "tour" && defined(${FIELD})]._id`);
console.log(`Tour docs with ${FIELD}: ${ids.length}`);

if (ids.length === 0) { console.log("Nothing to migrate. Done."); process.exit(0); }

if (dryRun) {
  console.log("DRY RUN - would unset the field on:");
  for (const id of ids) console.log(`  - ${id}`);
  process.exit(0);
}

let tx = client.transaction();
for (const id of ids) tx = tx.patch(id, (p) => p.unset([FIELD]));
await tx.commit({ visibility: "sync" });

const remaining = await client.fetch(`count(*[_type == "tour" && defined(${FIELD})])`);
console.log(`Unset on ${ids.length} doc(s). Remaining with ${FIELD}: ${remaining}`);
if (remaining !== 0) { console.error("Migration incomplete - some docs still carry the field."); process.exit(1); }
console.log("Migration complete.");
