#!/usr/bin/env node
/**
 * generate-tour-gallery.mjs - optimise SUPPLIED tour photographs into responsive
 * AVIF / WebP / JPG variants with content-hashed filenames (see HANDOFF.md 23a).
 *
 * Unlike generate-media.mjs (which composes original SVG artwork), this script
 * takes real photographs the owner supplied and produces web-ready, responsive
 * derivatives. The originals are read-only inputs and are never modified or
 * committed; only the derivatives under /public/media are shipped.
 *
 * It prints, for each image, the exact MediaImage literal to paste into the tour
 * content (src base path + intrinsic dimensions + the available `widths`).
 *
 * Usage: node scripts/generate-tour-gallery.mjs
 */

import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(homedir(), "Desktop", "Cairo");
const OUT_DIR = join(ROOT, "public", "media", "tours", "kair-piramidy");
const WEB_BASE = "/media/tours/kair-piramidy";

const TARGETS_PRIMARY = [640, 960, 1280, 1600, 2000];
const TARGETS_SUPPORT = [400, 700, 1000, 1400];

/**
 * The six supplied Cairo-tour photographs, in gallery display order.
 * `role` drives the responsive width ladder; `alt` is accurate Polish alt text
 * describing what is actually in each frame (not keyword-stuffed).
 */
const IMAGES = [
  {
    file: "Izlet-u-Kairo-iz-Hurgade-1-scaled.jpg",
    slug: "piramida-cheopsa-giza-zachod-slonca",
    role: "primary",
    alt: "Wielka Piramida Cheopsa w Gizie o zachodzie słońca, wielbłąd odpoczywający przy kamiennych ruinach",
  },
  {
    file: "6b.jpg",
    slug: "piramidy-giza-wielblad-turysci",
    role: "support",
    alt: "Piramidy w Gizie z jeźdźcem na wielbłądzie i turystami spacerującymi po płaskowyżu",
  },
  {
    file: "165869955204798891033_0614381357_b.jpg",
    slug: "muzeum-egipskie-kair-gmach",
    role: "support",
    alt: "Muzeum Egipskie w Kairze - zabytkowy gmach z sadzawką i palmami przed wejściem",
  },
  {
    file: "58.jpg",
    slug: "turysci-wielblady-piramida-giza",
    role: "support",
    alt: "Turyści pozujący na wielbłądach na tle wielkiej piramidy w Gizie",
  },
  {
    file: "caption.jpg",
    slug: "muzeum-egipskie-kair-wnetrze",
    role: "support",
    alt: "Wnętrze Muzeum Egipskiego w Kairze - główna sala z posągami faraonów",
  },
  {
    file: "Acamar-Nile-cruise.webp",
    slug: "rejs-po-nilu-statek",
    role: "support",
    alt: "Statek na Nilu o zmierzchu - opcjonalny rejs po Nilu podczas wycieczki do Kairu",
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
      await pipeline
        .clone()
        .avif({ quality: 52, effort: 4 })
        .toFile(join(OUT_DIR, `${base}.avif`));
      await pipeline
        .clone()
        .webp({ quality: 80 })
        .toFile(join(OUT_DIR, `${base}.webp`));
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

  // Open Graph derivative (1200x630) from the primary photo. Attention crop keeps
  // the bright pyramid mass in frame; no logo/watermark is added.
  const ogSrc = IMAGES.find((i) => i.role === "primary");
  const ogBuf = await readFile(join(SRC_DIR, ogSrc.file));
  const ogHash = createHash("sha256").update(ogBuf).digest("hex").slice(0, 8);
  const ogDir = join(ROOT, "public", "media", "og");
  await mkdir(ogDir, { recursive: true });
  const ogName = `kair-hurghada-${ogHash}.jpg`;
  await sharp(ogBuf)
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(join(ogDir, ogName));
  process.stdout.write(`\nOG image  ->  /media/og/${ogName}  1200x630\n`);

  // Emit the ready-to-paste MediaImage[] literal.
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
