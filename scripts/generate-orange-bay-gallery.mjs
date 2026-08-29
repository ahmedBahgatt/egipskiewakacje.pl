#!/usr/bin/env node
/**
 * generate-orange-bay-gallery.mjs - optimise the six SUPPLIED Orange Bay photos
 * into responsive AVIF / WebP / JPG variants with content-hashed filenames
 * (see HANDOFF.md 23a). Mirrors generate-tour-gallery.mjs but scoped to this one
 * tour: SRC_DIR = ~/Desktop/Orange, OUT_DIR = public/media/tours/orange-bay.
 *
 * Originals are read-only; only the derivatives under /public/media ship. Prints
 * a ready-to-paste MediaImage[] literal + a 1200x630 OG derivative.
 *
 * Usage: node scripts/generate-orange-bay-gallery.mjs
 */

import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(homedir(), "Desktop", "Orange");
const OUT_DIR = join(ROOT, "public", "media", "tours", "orange-bay");
const WEB_BASE = "/media/tours/orange-bay";

const TARGETS_PRIMARY = [640, 960, 1280, 1600, 2000];
const TARGETS_SUPPORT = [400, 700, 1000, 1400];

/** The six supplied Orange Bay photographs, in gallery display order. */
const IMAGES = [
  {
    file: "13685f7e-7f34-4ce8-a6df-a0498e0703a0_tropical-paradise-orange-bay-island-excursion-vib-xlarge.jpg",
    slug: "orange-bay-hustawka-morze",
    role: "primary",
    alt: "Huśtawka zawieszona nad turkusową, płytką wodą przy wyspie Orange Bay koło Hurghady",
  },
  {
    file: "orangebay.jpeg",
    slug: "orange-bay-molo-giftun",
    role: "support",
    alt: "Drewniane molo i przejrzysta turkusowa laguna przy wyspie Orange Bay w rejonie wysp Giftun",
  },
  {
    file: "orange-bay-22-card.webp",
    slug: "orange-bay-plaza-pomosty",
    role: "support",
    alt: "Wejście na Orange Bay - drewniane pawilony i pomosty nad płytką laguną Morza Czerwonego",
  },
  {
    file: "a5.jpg",
    slug: "snorkeling-rafa-orange-bay",
    role: "support",
    alt: "Snorkeling nad rafą Morza Czerwonego - ławica niebiesko-żółtych ryb przy Orange Bay",
  },
  {
    file: "Orange-Bay-Island-Beach.jpg",
    slug: "orange-bay-plaza-parasole",
    role: "support",
    alt: "Piaszczysta plaża Orange Bay z parasolami i pufami na piasku nad turkusowym morzem",
  },
  {
    file: "Orange-Bay-Speedboat-Hurghada.webp",
    slug: "orange-bay-lodz-rejs",
    role: "support",
    alt: "Biała łódź wycieczkowa z turystami dobijająca do pomostu na wyspie Orange Bay",
  },
];

/** Width ladder for one image: never upscale past the source width. */
function widthLadder(role, srcW) {
  const targets = role === "primary" ? TARGETS_PRIMARY : TARGETS_SUPPORT;
  const maxTarget = targets[targets.length - 1];
  const ws = targets.filter((w) => w < srcW);
  ws.push(Math.min(srcW, maxTarget));
  return [...new Set(ws)].sort((a, b) => a - b);
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];

  for (const img of IMAGES) {
    const srcPath = join(SRC_DIR, img.file);
    const buf = await readFile(srcPath);
    const hash = createHash("sha256").update(buf).digest("hex").slice(0, 8);
    const meta = await sharp(buf).metadata();
    const srcW = meta.width;
    const srcH = meta.height;
    const widths = widthLadder(img.role, srcW);
    const maxW = widths[widths.length - 1];
    const maxH = Math.round((maxW * srcH) / srcW);

    for (const w of widths) {
      const base = `${img.slug}-${hash}-${w}`;
      const pipeline = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
      await pipeline.clone().avif({ quality: 52, effort: 4 }).toFile(join(OUT_DIR, `${base}.avif`));
      await pipeline.clone().webp({ quality: 80 }).toFile(join(OUT_DIR, `${base}.webp`));
      await pipeline
        .clone()
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(join(OUT_DIR, `${base}.jpg`));
    }

    const srcBase = `${WEB_BASE}/${img.slug}-${hash}`;
    results.push({ srcBase, alt: img.alt, width: maxW, height: maxH, widths });
    process.stdout.write(
      `${img.file}  ->  ${img.slug}-${hash}  ${srcW}x${srcH}  widths=[${widths.join(",")}]\n`,
    );
  }

  // Open Graph derivative (1200x630) from the primary photo (attention crop).
  const ogSrc = IMAGES.find((i) => i.role === "primary");
  const ogBuf = await readFile(join(SRC_DIR, ogSrc.file));
  const ogHash = createHash("sha256").update(ogBuf).digest("hex").slice(0, 8);
  const ogDir = join(ROOT, "public", "media", "og");
  await mkdir(ogDir, { recursive: true });
  const ogName = `orange-bay-${ogHash}.jpg`;
  await sharp(ogBuf)
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(join(ogDir, ogName));
  process.stdout.write(`\nOG image  ->  /media/og/${ogName}  1200x630\n`);

  const literal = results
    .map(
      (r) =>
        `      {\n` +
        `        "src": "${r.srcBase}",\n` +
        `        "alt": "${r.alt}",\n` +
        `        "width": ${r.width},\n` +
        `        "height": ${r.height},\n` +
        `        "widths": [${r.widths.join(", ")}]\n` +
        `      }`,
    )
    .join(",\n");
  const manifestPath = join(OUT_DIR, "_gallery.generated.json");
  await writeFile(manifestPath, `[\n${literal}\n    ]\n`, "utf8");
  process.stdout.write(`\nMediaImage[] written to ${manifestPath}\n`);
}

run().catch((err) => {
  process.stderr.write(`${err.stack || err}\n`);
  process.exit(1);
});
