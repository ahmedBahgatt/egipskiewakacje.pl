#!/usr/bin/env node
/**
 * Idempotent seed for the Egipskie Wakacje dataset.
 *
 *   npm run seed:dry                      # plan only, never writes
 *   SANITY_WRITE_TOKEN=xxx npm run seed   # writes
 *
 * Behaviour:
 *  - Without SANITY_WRITE_TOKEN it prints the plan plus setup instructions and
 *    exits 0. Missing credentials are not an error here.
 *  - Every document has a DETERMINISTIC _id, so re-running replaces the same
 *    documents instead of creating duplicates.
 *  - It NEVER deletes anything. Legacy documents (the old `tourPackage`
 *    concept) are only counted and reported.
 *  - Before writing it checks whether any target _id is already taken by a
 *    document of a DIFFERENT _type and aborts on collision unless --force.
 *
 * Env:
 *   SANITY_WRITE_TOKEN        required to write (Editor role). Never prefix
 *                             this with NEXT_PUBLIC_ - it must not reach a browser.
 *   SANITY_STUDIO_PROJECT_ID  default "ej04dib0"
 *   SANITY_STUDIO_DATASET     default "production"
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { seedDocuments } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const STUDIO_ROOT = resolve(HERE, "..");
const API_VERSION = "2024-01-01";

// --- tiny .env loader (no dependency, never overrides real env vars) --------

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!key || key in process.env) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(resolve(STUDIO_ROOT, ".env.local"));
loadEnvFile(resolve(STUDIO_ROOT, ".env"));

// --- args ------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("-n");
const force = args.includes("--force");

if (args.includes("--help") || args.includes("-h")) {
  console.log(
    [
      "Usage: node ./seed/seed.mjs [--dry-run] [--force]",
      "",
      "  --dry-run, -n  Print the plan and exit without writing.",
      "  --force        Overwrite an existing document even if its _type differs.",
      "",
      "Env: SANITY_WRITE_TOKEN, SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET",
    ].join("\n"),
  );
  process.exit(0);
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

// --- prepare documents -----------------------------------------------------

/**
 * Sanity requires a `_key` on every object inside an array. Keys are derived
 * from the item's position so repeated runs produce byte-identical documents.
 */
function withKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item, index) =>
      item && typeof item === "object" && !Array.isArray(item)
        ? { ...withKeys(item), _key: item._key ?? `k${index}` }
        : withKeys(item),
    );
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v)]));
  }
  return value;
}

const documents = seedDocuments.map((doc) => withKeys(doc));

const byType = documents.reduce((acc, doc) => {
  acc[doc._type] = (acc[doc._type] ?? 0) + 1;
  return acc;
}, {});

function printPlan() {
  console.log(`Target      : projectId=${projectId} dataset=${dataset}`);
  console.log(`Documents   : ${documents.length}`);
  for (const [type, count] of Object.entries(byType).sort()) {
    console.log(`  ${type.padEnd(14)} ${count}`);
  }
  console.log("");
  console.log("Document ids (deterministic - re-running replaces these, never duplicates):");
  for (const doc of documents) console.log(`  ${doc._type.padEnd(14)} ${doc._id}`);
  console.log("");
  console.log("Not seeded on purpose: review (0 documents - no invented opinions).");
}

// --- no token: dry-run notice, exit 0 --------------------------------------

if (!token) {
  console.log("Sanity seed - DRY RUN (no SANITY_WRITE_TOKEN found)\n");
  printPlan();
  console.log(
    [
      "",
      "Nothing was written. To run the seed for real:",
      "",
      "  1. https://www.sanity.io/manage -> project ej04dib0 -> API -> Tokens",
      '  2. Add API token, name "seed", permission: Editor. Copy it once.',
      "  3. From the studio/ directory:",
      "",
      "       SANITY_WRITE_TOKEN=sk... npm run seed",
      "",
      "     or put it in studio/.env (git-ignored) and run: npm run seed",
      "",
      "  Never prefix the token with NEXT_PUBLIC_ and never commit it.",
      "  Full walkthrough: SANITY_SETUP.md in the repository root.",
    ].join("\n"),
  );
  process.exit(0);
}

// --- with token: preflight, then write -------------------------------------

const { createClient } = await import("@sanity/client").catch(() => {
  console.error(
    "Could not load @sanity/client. Run `npm install` inside studio/ first.",
  );
  process.exit(1);
});

const client = createClient({
  projectId,
  dataset,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

console.log(`Sanity seed - ${dryRun ? "DRY RUN" : "WRITE"}\n`);
printPlan();
console.log("");

const ids = documents.map((doc) => doc._id);

let existing = [];
try {
  existing = await client.fetch("*[_id in $ids]{_id, _type}", { ids });
} catch (error) {
  console.error(`Preflight query failed: ${error.message}`);
  console.error("Check the token (Editor role), the project id and the dataset name.");
  process.exit(1);
}

const existingById = new Map(existing.map((doc) => [doc._id, doc._type]));
const collisions = documents.filter(
  (doc) => existingById.has(doc._id) && existingById.get(doc._id) !== doc._type,
);
const replacing = documents.filter(
  (doc) => existingById.has(doc._id) && existingById.get(doc._id) === doc._type,
);
const creating = documents.filter((doc) => !existingById.has(doc._id));

console.log(`Create : ${creating.length}`);
console.log(`Replace: ${replacing.length}`);
for (const doc of replacing) console.log(`  replace ${doc._id}`);

if (collisions.length > 0) {
  console.log("");
  console.log("ID COLLISION - an existing document uses one of our ids with a different _type:");
  for (const doc of collisions) {
    console.log(`  ${doc._id}: existing _type="${existingById.get(doc._id)}", seed _type="${doc._type}"`);
  }
  if (!force) {
    console.log("");
    console.log("Aborted without writing. Inspect those documents in the Studio");
    console.log('("Dokumenty legacy" list), then re-run with --force to overwrite them.');
    process.exit(1);
  }
  console.log("--force given: overwriting anyway.");
}

// Report, but never touch, documents from the old all-inclusive concept.
try {
  const legacyCount = await client.fetch('count(*[_type == "tourPackage"])');
  if (legacyCount > 0) {
    console.log("");
    console.log(`Legacy: ${legacyCount} tourPackage document(s) left untouched.`);
    console.log('Review them in the Studio under "Dokumenty legacy" before deleting anything.');
  }
} catch {
  // Counting legacy documents is informational only - never fail the seed on it.
}

if (dryRun) {
  console.log("");
  console.log("--dry-run: nothing was written.");
  process.exit(0);
}

const transaction = documents.reduce(
  (tx, doc) => tx.createOrReplace(doc),
  client.transaction(),
);

try {
  const result = await transaction.commit({ visibility: "async" });
  console.log("");
  console.log(`Committed ${result.results?.length ?? documents.length} document(s).`);
  console.log(`Transaction: ${result.transactionId ?? "(id unavailable)"}`);
  console.log("");
  console.log("Next: verify in the Studio, then switch the frontend with");
  console.log("NEXT_PUBLIC_CONTENT_SOURCE=sanity and rebuild (see SANITY_SETUP.md).");
} catch (error) {
  console.error("");
  console.error(`Seed failed: ${error.message}`);
  if (error.response?.body?.error) {
    console.error(JSON.stringify(error.response.body.error, null, 2));
  }
  console.error("Nothing was partially applied - Sanity transactions are atomic.");
  process.exit(1);
}
