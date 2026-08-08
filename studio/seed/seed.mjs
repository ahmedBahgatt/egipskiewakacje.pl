#!/usr/bin/env node
/**
 * Idempotent seed for the Egipskie Wakacje dataset.
 *
 *   npm run seed:dry                      # plan only, never writes
 *   SANITY_WRITE_TOKEN=xxx npm run seed   # uploads images, then writes
 *
 * Behaviour:
 *  - Without SANITY_WRITE_TOKEN it prints the plan plus setup instructions and
 *    exits 0. Missing credentials are not an error here.
 *  - Every document has a DETERMINISTIC _id, so re-running replaces the same
 *    documents instead of creating duplicates.
 *  - IMAGES: seed/data.mjs marks each image with a path under /public/media.
 *    This script uploads every distinct file as a real Sanity image asset and
 *    substitutes an asset reference before writing. Uploads are deduplicated by
 *    SHA-1: a file already present in the dataset is reused, not re-uploaded,
 *    so repeated runs keep the same asset ids.
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
import { createHash } from "node:crypto";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { seedDocuments } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const STUDIO_ROOT = resolve(HERE, "..");
/** Image sources live in the frontend's public folder - the repository root. */
const MEDIA_ROOT = resolve(STUDIO_ROOT, "..", "public", "media");
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
      "  --dry-run, -n  Print the plan and exit without writing or uploading.",
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

// --- image markers ---------------------------------------------------------

/**
 * data.mjs stores images as { _type: "image", _upload: "<path>", alt }.
 * Walk the payload and count every distinct `_upload` path.
 */
function collectImages(value, found = new Map()) {
  if (Array.isArray(value)) {
    for (const item of value) collectImages(item, found);
    return found;
  }
  if (value && typeof value === "object") {
    if (typeof value._upload === "string") {
      found.set(value._upload, (found.get(value._upload) ?? 0) + 1);
    }
    for (const nested of Object.values(value)) collectImages(nested, found);
    return found;
  }
  return found;
}

/** Replace every marker with a real asset reference. */
function resolveImages(value, assetIdByFile) {
  if (Array.isArray(value)) return value.map((item) => resolveImages(item, assetIdByFile));
  if (value && typeof value === "object") {
    if (typeof value._upload === "string") {
      const { _upload, ...rest } = value;
      const assetId = assetIdByFile.get(_upload);
      if (!assetId) throw new Error(`No uploaded asset for "${_upload}"`);
      return { ...rest, _type: "image", asset: { _type: "reference", _ref: assetId } };
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, resolveImages(nested, assetIdByFile)]),
    );
  }
  return value;
}

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

const imageUsage = collectImages(seedDocuments);
const imageFiles = [...imageUsage.keys()].sort();
const missingImages = imageFiles.filter((file) => !existsSync(resolve(MEDIA_ROOT, file)));

const byType = seedDocuments.reduce((acc, doc) => {
  acc[doc._type] = (acc[doc._type] ?? 0) + 1;
  return acc;
}, {});

function printPlan() {
  console.log(`Target      : projectId=${projectId} dataset=${dataset}`);
  console.log(`Documents   : ${seedDocuments.length}`);
  for (const [type, count] of Object.entries(byType).sort()) {
    console.log(`  ${type.padEnd(14)} ${count}`);
  }
  console.log("");
  console.log("Document ids (deterministic - re-running replaces these, never duplicates):");
  for (const doc of seedDocuments) console.log(`  ${doc._type.padEnd(14)} ${doc._id}`);
  console.log("");
  console.log(`Images      : ${imageFiles.length} distinct file(s) from ${MEDIA_ROOT}`);
  console.log("  (uploaded as Sanity assets; deduplicated by SHA-1 across runs)");
  for (const file of imageFiles) {
    const path = resolve(MEDIA_ROOT, file);
    const uses = imageUsage.get(file);
    if (!existsSync(path)) {
      console.log(`  MISSING  ${file.padEnd(44)} used ${uses}x`);
      continue;
    }
    const kb = Math.round(statSync(path).size / 1024);
    console.log(`  ok       ${file.padEnd(44)} used ${uses}x  ${kb} kB`);
  }
  console.log("");
  console.log("Not seeded on purpose: review (0 documents - no invented opinions).");
}

// --- no token: dry-run notice, exit 0 --------------------------------------

if (!token) {
  console.log("Sanity seed - DRY RUN (no SANITY_WRITE_TOKEN found)\n");
  printPlan();
  if (missingImages.length > 0) {
    console.log("");
    console.log(`WARNING: ${missingImages.length} image file(s) missing - a real run would abort.`);
  }
  console.log(
    [
      "",
      "Nothing was written and no image was uploaded. To run the seed for real:",
      "",
      "  1. https://www.sanity.io/manage -> project ej04dib0 -> API -> Tokens",
      '  2. Add API token, name "seed", permission: Editor. Copy it once.',
      "  3. From the studio/ directory:",
      "",
      "       npm install                       # @sanity/client is needed to upload",
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

// --- with token: preflight, upload images, then write -----------------------

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

if (missingImages.length > 0) {
  console.error("Missing image file(s) under public/media:");
  for (const file of missingImages) console.error(`  ${file}`);
  console.error("");
  console.error("Fix the paths in seed/data.mjs or add the files. Nothing was written.");
  process.exit(1);
}

const ids = seedDocuments.map((doc) => doc._id);

let existing = [];
try {
  existing = await client.fetch("*[_id in $ids]{_id, _type}", { ids });
} catch (error) {
  console.error(`Preflight query failed: ${error.message}`);
  console.error("Check the token (Editor role), the project id and the dataset name.");
  process.exit(1);
}

const existingById = new Map(existing.map((doc) => [doc._id, doc._type]));
const collisions = seedDocuments.filter(
  (doc) => existingById.has(doc._id) && existingById.get(doc._id) !== doc._type,
);
const replacing = seedDocuments.filter(
  (doc) => existingById.has(doc._id) && existingById.get(doc._id) === doc._type,
);
const creating = seedDocuments.filter((doc) => !existingById.has(doc._id));

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
  console.log("--dry-run: nothing was uploaded and nothing was written.");
  process.exit(0);
}

// --- upload images ---------------------------------------------------------
// Sanity stores `sha1hash` on every asset, so an identical file already in the
// dataset is reused instead of re-uploaded. That is what makes repeated runs
// produce the same asset ids rather than a pile of duplicates.

console.log("");
console.log(`Uploading images (${imageFiles.length})...`);

const assetIdByFile = new Map();

for (const file of imageFiles) {
  const path = resolve(MEDIA_ROOT, file);
  const hash = createHash("sha1").update(readFileSync(path)).digest("hex");

  let reused = null;
  try {
    reused = await client.fetch('*[_type == "sanity.imageAsset" && sha1hash == $hash][0]._id', {
      hash,
    });
  } catch {
    // Lookup is an optimisation only. On failure just upload - Sanity itself
    // deduplicates by content hash on the way in.
  }

  if (reused) {
    assetIdByFile.set(file, reused);
    console.log(`  reuse    ${file.padEnd(44)} ${reused}`);
    continue;
  }

  try {
    const asset = await client.assets.upload("image", createReadStream(path), {
      filename: basename(file),
    });
    assetIdByFile.set(file, asset._id);
    console.log(`  uploaded ${file.padEnd(44)} ${asset._id}`);
  } catch (error) {
    console.error("");
    console.error(`Upload failed for ${file}: ${error.message}`);
    console.error("No document was written - the write happens only after every upload succeeds.");
    process.exit(1);
  }
}

// --- write documents -------------------------------------------------------

let documents;
try {
  documents = seedDocuments.map((doc) => withKeys(resolveImages(doc, assetIdByFile)));
} catch (error) {
  console.error("");
  console.error(`Could not build the documents: ${error.message}`);
  process.exit(1);
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
  console.log("Next: open the Studio, check the hotspots on the hero images, then switch");
  console.log("the frontend with NEXT_PUBLIC_CONTENT_SOURCE=sanity (see SANITY_SETUP.md).");
} catch (error) {
  console.error("");
  console.error(`Seed failed: ${error.message}`);
  if (error.response?.body?.error) {
    console.error(JSON.stringify(error.response.body.error, null, 2));
  }
  console.error("Nothing was partially applied - Sanity transactions are atomic.");
  console.error("Uploaded image assets stay in the dataset and are reused on the next run.");
  process.exit(1);
}
