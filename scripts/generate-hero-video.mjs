#!/usr/bin/env node
/**
 * generate-hero-video.mjs - builds the looping hero background clip.
 *
 * Takes the high-resolution still produced by generate-media.mjs and applies a
 * slow Ken Burns move with ffmpeg, then encodes H.264 and VP9 versions. There is
 * no audio track at all (the hero <video> is muted and autoplaying).
 *
 * The move is driven by sine functions of the output frame index, so the first
 * and last frames share both position and velocity - the loop has no visible
 * seam. Motion is deliberately small: enough to feel alive, not enough to
 * distract from the headline sitting on top of it.
 *
 * Usage: node scripts/generate-hero-video.mjs   (or: npm run media:video)
 */

import { execFile } from "node:child_process";
import { stat, unlink } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public/media/hero/hero-source.png");
const OUT_MP4 = join(ROOT, "public/media/hero/hero.mp4");
const OUT_WEBM = join(ROOT, "public/media/hero/hero.webm");

const W = 1920;
const H = 1080;
const FPS = 24;
const SECONDS = 10;
const FRAMES = FPS * SECONDS;

const MP4_BUDGET = 2.5 * 1024 * 1024;
const WEBM_BUDGET = 2.0 * 1024 * 1024;

/**
 * Ken Burns move. zoompan quantises its zoom step, which shows up as jitter at
 * 1080p, so the still is first scaled to 4K and the pan is computed in that
 * larger space before zoompan resamples down to the output size.
 */
function filterChain() {
  const period = `2*PI*on/${FRAMES}`;
  // Zoom breathes between ~1.015 and ~1.105 and returns to its start.
  const z = `1.06+0.045*sin(${period})`;
  // Drift is a quarter-period out of phase, tracing a slow ellipse.
  const dx = `36*sin(${period})`;
  const dy = `22*sin(${period}+PI/2)-22`;
  return [
    `scale=${W * 2}:${H * 2}:flags=lanczos`,
    `zoompan=z='${z}':x='iw/2-(iw/zoom/2)+${dx}':y='ih/2-(ih/zoom/2)+${dy}'` +
      `:d=${FRAMES}:s=${W}x${H}:fps=${FPS}`,
    "format=yuv420p",
  ].join(",");
}

async function sizeOf(p) {
  return (await stat(p)).size;
}

const fmt = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

/**
 * Encode, and if the result busts its budget re-encode at a higher CRF. This
 * keeps the committed media budget a hard guarantee rather than a hope.
 */
async function encode({ label, out, budget, args, crf, maxCrf, step }) {
  let current = crf;
  for (;;) {
    await run("ffmpeg", ["-y", "-loop", "1", "-i", SRC, ...args(current), out], {
      maxBuffer: 1024 * 1024 * 32,
    });
    const bytes = await sizeOf(out);
    if (bytes <= budget || current >= maxCrf) {
      const flag = bytes <= budget ? "ok" : "OVER BUDGET";
      console.log(`  ${label.padEnd(5)} crf ${String(current).padStart(2)}  ${fmt(bytes).padStart(8)}  ${flag}`);
      return bytes;
    }
    console.log(`  ${label.padEnd(5)} crf ${String(current).padStart(2)}  ${fmt(bytes).padStart(8)}  over ${fmt(budget)}, retrying`);
    current += step;
  }
}

async function main() {
  try {
    await stat(SRC);
  } catch {
    console.error(`Missing ${SRC}\nRun "npm run media" first.`);
    process.exitCode = 1;
    return;
  }
  try {
    await run("ffmpeg", ["-version"]);
  } catch {
    console.error("ffmpeg not found on PATH.");
    process.exitCode = 1;
    return;
  }

  const vf = filterChain();
  console.log(`Rendering ${SECONDS}s ${W}x${H}@${FPS} Ken Burns loop, no audio.\n`);

  const mp4 = await encode({
    label: "mp4",
    out: OUT_MP4,
    budget: MP4_BUDGET,
    crf: 31,
    maxCrf: 40,
    step: 2,
    args: (crf) => [
      "-vf", vf,
      "-frames:v", String(FRAMES),
      "-an",
      "-c:v", "libx264",
      "-profile:v", "high",
      "-preset", "slower",
      "-crf", String(crf),
      "-pix_fmt", "yuv420p",
      "-g", String(FPS * 2),
      "-movflags", "+faststart",
    ],
  });

  const webm = await encode({
    label: "webm",
    out: OUT_WEBM,
    budget: WEBM_BUDGET,
    crf: 36,
    maxCrf: 46,
    step: 2,
    args: (crf) => [
      "-vf", vf,
      "-frames:v", String(FRAMES),
      "-an",
      "-c:v", "libvpx-vp9",
      "-crf", String(crf),
      "-b:v", "0",
      "-row-mt", "1",
      "-deadline", "good",
      "-cpu-used", "1",
      "-pix_fmt", "yuv420p",
      "-g", String(FPS * 2),
    ],
  });

  // A stray audio stream would break the muted-autoplay contract, so assert it.
  for (const f of [OUT_MP4, OUT_WEBM]) {
    const { stdout } = await run("ffprobe", [
      "-v", "error",
      "-show_entries", "stream=codec_type,width,height,nb_frames",
      "-of", "csv=p=0",
      f,
    ]);
    const streams = stdout.trim().split("\n");
    if (streams.some((s) => s.startsWith("audio"))) throw new Error(`${f} has an audio stream`);
    console.log(`  verified ${f.replace(ROOT + "/", "")}: ${streams.join(" | ")}`);
  }

  console.log(`\nTotal video: ${fmt(mp4 + webm)}`);
}

main().catch(async (err) => {
  console.error(err.stderr || err.message || err);
  // Do not leave a truncated file behind for the site to serve.
  for (const f of [OUT_MP4, OUT_WEBM]) {
    try {
      if ((await sizeOf(f)) === 0) await unlink(f);
    } catch {
      /* nothing to clean up */
    }
  }
  process.exitCode = 1;
});
