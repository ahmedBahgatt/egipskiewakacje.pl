#!/usr/bin/env node
/**
 * generate-media.mjs - builds every image asset the site ships.
 *
 * Everything here is ORIGINAL artwork produced by code: layered SVG scenes are
 * composed from the brand palette, rasterised with sharp, given a light film
 * grain, and written as AVIF / WebP / JPG triplets under /public/media.
 * No photographs, no stock, no third-party assets, no network access.
 *
 * The look is "cinematic editorial travel": a single defined light source per
 * scene, aerial perspective (distant layers blend toward the horizon colour),
 * hand-tuned multi-stop skies, real Giza slope geometry, and film grain so the
 * output reads as art direction rather than a default gradient.
 *
 * Usage: node scripts/generate-media.mjs   (or: npm run media)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

/* ==========================================================================
   1. Palette (mirrors src/app/globals.css) and colour maths
   ========================================================================== */

const C = {
  navy900: "#0a1922",
  navy800: "#0f2634",
  navy700: "#163a4d",
  teal700: "#0b675f",
  teal600: "#0e8378",
  teal500: "#17a597",
  teal400: "#37c2b2",
  gold600: "#b07d24",
  gold500: "#c9922f",
  gold400: "#e0b256",
  terra600: "#a8482a",
  terra500: "#c25c3a",
  sand50: "#fffdf8",
  sand100: "#faf4e9",
  sand200: "#f2e7d3",
  sand300: "#e6d8bd",
  ink900: "#1b1a16",
};

const toRgb = (hex) => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
};

const toHex = (rgb) =>
  "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");

/** Linear blend: t=0 -> a, t=1 -> b. The backbone of the aerial-perspective look. */
const mix = (a, b, t) => {
  const [ar, ag, ab] = toRgb(a);
  const [br, bg, bb] = toRgb(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
};

const shade = (hex, t) => (t < 0 ? mix(hex, "#000000", -t) : mix(hex, "#ffffff", t));

/* ==========================================================================
   2. Deterministic randomness - identical output on every run
   ========================================================================== */

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRng(seed) {
  const r = mulberry32(seed);
  return {
    next: r,
    range: (lo, hi) => lo + r() * (hi - lo),
    int: (lo, hi) => Math.floor(lo + r() * (hi - lo + 1)),
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    /** Sum of 3 uniforms - a cheap bell curve, keeps scatter from looking uniform. */
    bell: (lo, hi) => {
      const t = (r() + r() + r()) / 3;
      return lo + t * (hi - lo);
    },
  };
}

/* ==========================================================================
   3. Scene container + SVG primitives
   ========================================================================== */

function newScene(W, H, seed) {
  return {
    W,
    H,
    rng: makeRng(seed),
    seed,
    defs: [],
    body: [],
    n: 0,
    uid(p) {
      this.n += 1;
      return `${p}${this.n}`;
    },
    def(s) {
      this.defs.push(s);
      return this;
    },
    add(s) {
      this.body.push(s);
      return this;
    },
    toSVG() {
      return (
        `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" ` +
        `viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
        `<defs>${this.defs.join("")}</defs>${this.body.join("")}</svg>`
      );
    },
  };
}

const n2 = (v) => Math.round(v * 100) / 100;

const linearGrad = (id, stops, { x1 = 0, y1 = 0, x2 = 0, y2 = 1 } = {}) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
  stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${n2(a)}"/>`)
    .join("") +
  `</linearGradient>`;

const radialGrad = (id, stops, { cx = 0.5, cy = 0.5, r = 0.5, fx, fy } = {}) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"` +
  (fx !== undefined ? ` fx="${fx}"` : "") +
  (fy !== undefined ? ` fy="${fy}"` : "") +
  `>` +
  stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${n2(a)}"/>`)
    .join("") +
  `</radialGradient>`;

/**
 * Blur filter pinned to the whole canvas in user space. The default filter
 * region is the element's bounding box, which clips a wide blur into a visible
 * rectangle - the one artifact that instantly gives away generated artwork.
 */
const blurFilter = (S, id, sd) =>
  `<filter id="${id}" filterUnits="userSpaceOnUse" x="${n2(-S.W * 0.35)}" y="${n2(-S.H * 0.35)}" ` +
  `width="${n2(S.W * 1.7)}" height="${n2(S.H * 1.7)}"><feGaussianBlur stdDeviation="${n2(sd)}"/></filter>`;

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Catmull-Rom through the points, emitted as cubic beziers - soft dune ridges. */
function smoothPath(pts, tension = 0.5) {
  if (pts.length < 2) return "";
  let d = `M ${n2(pts[0][0])} ${n2(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;
    d += ` C ${n2(c1x)} ${n2(c1y)}, ${n2(c2x)} ${n2(c2y)}, ${n2(p2[0])} ${n2(p2[1])}`;
  }
  return d;
}

/* ==========================================================================
   4. Atmosphere layers
   ========================================================================== */

/** Full-bleed graded sky. `stops` are [offset, colour] pairs, top to bottom. */
function sky(S, stops) {
  const id = S.uid("sky");
  S.def(linearGrad(id, stops));
  S.add(`<rect width="${S.W}" height="${S.H}" fill="url(#${id})"/>`);
}

/** Scattered stars, brightest at the top, fading out toward `fadeY`. */
function stars(S, { count = 220, fadeY, maxOpacity = 0.85 }) {
  const { rng, W } = S;
  const limit = fadeY ?? S.H * 0.55;
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const x = rng.range(0, W);
    const y = rng.range(0, limit);
    const fade = 1 - y / limit;
    const o = rng.range(0.15, maxOpacity) * fade * fade;
    if (o < 0.03) continue;
    const r = rng.next() > 0.93 ? rng.range(1.4, 2.2) : rng.range(0.5, 1.1);
    parts.push(
      `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="${C.sand50}" opacity="${n2(o)}"/>`,
    );
  }
  S.add(`<g>${parts.join("")}</g>`);
}

/** Long, low-lying cloud streaks - the main cue that this is a sky, not a ramp. */
function cloudBands(S, { y0, y1, count = 9, color, opacity = 0.2, blur = 10, widthScale = 1 }) {
  const { rng, W } = S;
  const fid = S.uid("cb");
  S.def(blurFilter(S, fid, blur));
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const y = rng.range(y0, y1);
    const w = rng.bell(W * 0.16, W * 0.62) * widthScale;
    const h = rng.range(3, 13);
    const x = rng.range(-W * 0.1, W * 1.05);
    const o = opacity * rng.range(0.45, 1);
    parts.push(
      `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(w / 2)}" ry="${n2(h)}" ` +
        `fill="${color}" opacity="${n2(o)}"/>`,
    );
  }
  S.add(`<g filter="url(#${fid})">${parts.join("")}</g>`);
}

/** Sun or moon: wide soft halo plus a defined disc. */
function sunGlow(S, { cx, cy, r, core, halo, haloR, haloOpacity = 0.6 }) {
  const id = S.uid("sun");
  S.def(
    radialGrad(`${id}h`, [
      [0, halo, haloOpacity],
      [0.28, halo, haloOpacity * 0.5],
      [0.55, halo, haloOpacity * 0.18],
      [1, halo, 0],
    ]),
  );
  S.def(
    radialGrad(`${id}c`, [
      [0, shade(core, 0.35), 1],
      [0.55, core, 1],
      [0.86, core, 0.9],
      [1, core, 0],
    ]),
  );
  S.add(`<circle cx="${n2(cx)}" cy="${n2(cy)}" r="${n2(haloR)}" fill="url(#${id}h)"/>`);
  S.add(`<circle cx="${n2(cx)}" cy="${n2(cy)}" r="${n2(r)}" fill="url(#${id}c)"/>`);
}

/** Crepuscular rays fanning from the light source. Kept very faint on purpose. */
function godRays(S, { cx, cy, count = 11, length, color = C.gold400, opacity = 0.06, spread = 150 }) {
  const { rng } = S;
  const fid = S.uid("gr");
  S.def(blurFilter(S, fid, 18));
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const a = ((rng.range(-spread / 2, spread / 2) - 90) * Math.PI) / 180;
    const w = rng.range(0.008, 0.05);
    const L = length * rng.range(0.55, 1.15);
    const x1 = cx + Math.cos(a - w) * L;
    const y1 = cy + Math.sin(a - w) * L;
    const x2 = cx + Math.cos(a + w) * L;
    const y2 = cy + Math.sin(a + w) * L;
    parts.push(
      `<path d="M ${n2(cx)} ${n2(cy)} L ${n2(x1)} ${n2(y1)} L ${n2(x2)} ${n2(y2)} Z" ` +
        `fill="${color}" opacity="${n2(opacity * rng.range(0.4, 1))}"/>`,
    );
  }
  S.add(`<g filter="url(#${fid})">${parts.join("")}</g>`);
}

/** Warm haze hugging the horizon - glues foreground and background together. */
function hazeBand(S, { y, h, color, opacity = 0.35, blur = 26 }) {
  const fid = S.uid("hz");
  const gid = S.uid("hzg");
  S.def(blurFilter(S, fid, blur));
  S.def(
    linearGrad(gid, [
      [0, color, 0],
      [0.5, color, 1],
      [1, color, 0],
    ]),
  );
  S.add(
    `<rect x="${-S.W * 0.05}" y="${n2(y - h / 2)}" width="${S.W * 1.1}" height="${n2(h)}" ` +
      `fill="url(#${gid})" opacity="${n2(opacity)}" filter="url(#${fid})"/>`,
  );
}

/* ==========================================================================
   5. Terrain
   ========================================================================== */

/** Jagged range (Sinai / desert hills). `haze` blends the fill toward the sky. */
function mountainRange(S, { baseY, peak, color, hazeColor, haze = 0, segments = 9, jitter = 0.5, xFrom = -0.05, xTo = 1.05 }) {
  const { rng, W } = S;
  const fill = haze > 0 ? mix(color, hazeColor, haze) : color;
  const x0 = W * xFrom;
  const x1 = W * xTo;
  const pts = [[x0, baseY]];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = x0 + (x1 - x0) * t;
    // Alternate ridge/notch so the outline reads as rock, not noise.
    const isPeak = i % 2 === 1;
    const hgt = isPeak ? peak * rng.range(1 - jitter * 0.5, 1) : peak * rng.range(0.18, 0.5);
    pts.push([x, baseY - hgt]);
  }
  pts.push([x1, baseY]);
  const d =
    `M ${n2(pts[0][0])} ${n2(pts[0][1])} ` +
    pts
      .slice(1)
      .map(([x, y]) => `L ${n2(x)} ${n2(y)}`)
      .join(" ") +
    ` L ${n2(x1)} ${n2(baseY + S.H)} L ${n2(x0)} ${n2(baseY + S.H)} Z`;
  S.add(`<path d="${d}" fill="${fill}"/>`);
  return fill;
}

/**
 * One rolling dune band. Returns the ridge points so a caller can plant objects
 * on the crest. A hairline rim of light along the ridge sells the sun direction.
 */
function duneLayer(S, { baseY, amp, color, hazeColor, haze = 0, points = 7, rim, rimOpacity = 0.5, tension = 0.55, phase = 0 }) {
  const { rng, W } = S;
  const fill = haze > 0 ? mix(color, hazeColor, haze) : color;
  const pts = [];
  for (let i = 0; i <= points; i += 1) {
    const t = i / points;
    const x = -W * 0.05 + W * 1.1 * t;
    const wave = Math.sin(t * Math.PI * 2 + phase) * 0.5 + Math.sin(t * Math.PI * 3.7 + phase * 1.7) * 0.3;
    const y = baseY + wave * amp + rng.range(-amp * 0.18, amp * 0.18);
    pts.push([x, y]);
  }
  const ridge = smoothPath(pts, tension);
  S.add(`<path d="${ridge} L ${n2(W * 1.05)} ${n2(S.H + 10)} L ${n2(-W * 0.05)} ${n2(S.H + 10)} Z" fill="${fill}"/>`);
  if (rim) {
    S.add(
      `<path d="${ridge}" fill="none" stroke="${rim}" stroke-width="${n2(Math.max(1, S.H / 620))}" ` +
        `opacity="${n2(rimOpacity)}" stroke-linecap="round"/>`,
    );
  }
  return pts;
}

/** Sample the y of a smooth ridge at an arbitrary x (linear between knots). */
function ridgeYAt(pts, x) {
  for (let i = 0; i < pts.length - 1; i += 1) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }
  return pts[pts.length - 1][1];
}

/* ==========================================================================
   6. Water
   ========================================================================== */

/** Sea body with depth banding, wave strokes and a specular reflection column. */
function sea(S, { y, stops, sunX, sunColor = C.gold400, bands = [], sparkle = 260, waveOpacity = 0.16, reflection = true }) {
  const { rng, W, H } = S;
  const gid = S.uid("seag");
  const h = H - y;
  S.def(linearGrad(gid, stops));
  S.add(`<rect x="0" y="${n2(y)}" width="${W}" height="${n2(h + 2)}" fill="url(#${gid})"/>`);

  // Shallow-water bands: wavy-topped shapes in progressively lighter teals.
  bands.forEach((b) => {
    const pts = [];
    const knots = b.knots ?? 7;
    for (let i = 0; i <= knots; i += 1) {
      const t = i / knots;
      const bx = -W * 0.05 + W * 1.1 * t;
      const by = y + h * b.at + Math.sin(t * Math.PI * (b.freq ?? 2.4) + (b.phase ?? 0)) * h * (b.amp ?? 0.03);
      pts.push([bx, by]);
    }
    S.add(
      `<path d="${smoothPath(pts, 0.5)} L ${n2(W * 1.05)} ${n2(H + 10)} L ${n2(-W * 0.05)} ${n2(H + 10)} Z" ` +
        `fill="${b.color}" opacity="${n2(b.opacity ?? 1)}"/>`,
    );
  });

  // Sun column: a soft vertical wash that anchors the light source in the water.
  if (reflection && sunX !== undefined) {
    const rid = S.uid("refl");
    const fid = S.uid("reflf");
    S.def(blurFilter(S, fid, Math.max(8, W / 90)));
    S.def(
      linearGrad(rid, [
        [0, sunColor, 0.5],
        [0.45, sunColor, 0.22],
        [1, sunColor, 0],
      ]),
    );
    S.add(
      `<path d="M ${n2(sunX - W * 0.035)} ${n2(y)} L ${n2(sunX + W * 0.035)} ${n2(y)} ` +
        `L ${n2(sunX + W * 0.16)} ${n2(H)} L ${n2(sunX - W * 0.16)} ${n2(H)} Z" ` +
        `fill="url(#${rid})" filter="url(#${fid})"/>`,
    );
  }

  // Wave dashes: density and length grow toward the viewer (perspective).
  const strokes = [];
  for (let i = 0; i < sparkle; i += 1) {
    const t = Math.pow(rng.next(), 0.55); // bias toward the foreground
    const wy = y + h * t;
    const wx = rng.range(-W * 0.02, W * 1.02);
    const len = (W * 0.006 + W * 0.05 * t) * rng.range(0.35, 1);
    let o = waveOpacity * rng.range(0.3, 1) * (0.35 + t * 0.9);
    let col = C.sand50;
    if (sunX !== undefined) {
      // Brighten and warm the strokes inside the reflection column.
      const d = Math.abs(wx - sunX) / (W * (0.05 + t * 0.16));
      const g = Math.exp(-d * d);
      o += g * 0.55 * rng.range(0.4, 1);
      if (g > 0.35) col = sunColor;
    }
    if (o < 0.03) continue;
    strokes.push(
      `<path d="M ${n2(wx)} ${n2(wy)} h ${n2(len)}" stroke="${col}" stroke-width="${n2(1 + t * 2.2)}" ` +
        `stroke-linecap="round" opacity="${n2(Math.min(o, 0.9))}"/>`,
    );
  }
  S.add(`<g>${strokes.join("")}</g>`);
}

/* ==========================================================================
   7. Landmarks & objects (all original silhouettes)
   ========================================================================== */

/**
 * A pyramid on the true Giza slope (height = 1.27 x half-base, ~51.8 degrees),
 * split into a lit and a shadowed face with a faint course texture.
 */
function pyramid(S, { cx, baseY, halfW, lit, dark, sunLeft = true, rim, rimOpacity = 0.55, texture = true, shadow }) {
  const apexY = baseY - halfW * 1.272;
  const leftFill = sunLeft ? lit : dark;
  const rightFill = sunLeft ? dark : lit;
  const g = [];
  if (shadow) {
    const fid = S.uid("psh");
    S.def(blurFilter(S, fid, halfW * 0.14));
    const dir = sunLeft ? 1 : -1;
    g.push(
      `<ellipse cx="${n2(cx + dir * halfW * 0.55)}" cy="${n2(baseY + halfW * 0.03)}" ` +
        `rx="${n2(halfW * 1.15)}" ry="${n2(halfW * 0.12)}" fill="${shadow}" opacity="0.45" filter="url(#${fid})"/>`,
    );
  }
  g.push(
    `<path d="M ${n2(cx)} ${n2(apexY)} L ${n2(cx - halfW)} ${n2(baseY)} L ${n2(cx)} ${n2(baseY)} Z" fill="${leftFill}"/>`,
  );
  g.push(
    `<path d="M ${n2(cx)} ${n2(apexY)} L ${n2(cx + halfW)} ${n2(baseY)} L ${n2(cx)} ${n2(baseY)} Z" fill="${rightFill}"/>`,
  );
  if (texture) {
    // Horizontal courses, clipped to the lit face only - reads as masonry.
    const cid = S.uid("pyc");
    const side = sunLeft ? -1 : 1;
    S.def(
      `<clipPath id="${cid}"><path d="M ${n2(cx)} ${n2(apexY)} L ${n2(cx + side * halfW)} ${n2(baseY)} L ${n2(cx)} ${n2(baseY)} Z"/></clipPath>`,
    );
    const lines = [];
    const rows = 14;
    for (let i = 1; i < rows; i += 1) {
      const t = i / rows;
      const y = apexY + (baseY - apexY) * t;
      lines.push(
        `<path d="M ${n2(cx - halfW)} ${n2(y)} H ${n2(cx + halfW)}" stroke="${shade(lit, -0.35)}" ` +
          `stroke-width="${n2(Math.max(0.6, halfW * 0.008))}" opacity="${n2(0.16 * (0.4 + t))}"/>`,
      );
    }
    g.push(`<g clip-path="url(#${cid})">${lines.join("")}</g>`);
  }
  if (rim) {
    const side = sunLeft ? -1 : 1;
    g.push(
      `<path d="M ${n2(cx)} ${n2(apexY)} L ${n2(cx + side * halfW)} ${n2(baseY)}" fill="none" ` +
        `stroke="${rim}" stroke-width="${n2(Math.max(1, halfW * 0.012))}" opacity="${n2(rimOpacity)}" stroke-linecap="round"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
  return { apexY };
}

/**
 * The Sphinx in profile, facing right, assembled from parts rather than one
 * outline: recumbent body, forelegs running forward to the paws, then the head
 * with its flaring nemes. Plotted in a 100 x 58 box (y up from the ground).
 */
function sphinx(S, { x, baseY, w, fill, rim, rimOpacity = 0.45 }) {
  const s = w / 100;
  const P = (px, py) => `${n2(x + px * s)} ${n2(baseY - py * s)}`;
  const dark = shade(fill, -0.2);
  const darker = shade(fill, -0.32);
  const g = [];

  // Far foreleg, set back and darker so the pair reads as depth.
  g.push(
    `<path d="M ${P(54, 0)} L ${P(54, 13)} L ${P(88, 11)} C ${P(93, 11)}, ${P(93, 0)}, ${P(88, 0)} Z" fill="${darker}"/>`,
  );
  // Body: haunch, back, shoulder. The upper surface catches the low sun, so the
  // flank below it is stepped down twice - without that it reads as a flat blob.
  g.push(
    `<path d="M ${P(6, 0)} L ${P(6, 24)} C ${P(8, 34)}, ${P(16, 39)}, ${P(30, 40)} ` +
      `L ${P(50, 39)} C ${P(58, 38)}, ${P(63, 34)}, ${P(64, 26)} ` +
      `L ${P(64, 0)} Z" fill="${shade(fill, 0.14)}"/>`,
  );
  g.push(
    `<path d="M ${P(6, 20)} C ${P(9, 28)}, ${P(18, 32)}, ${P(31, 33)} ` +
      `L ${P(52, 32)} C ${P(59, 31)}, ${P(63, 28)}, ${P(64, 22)} ` +
      `L ${P(64, 0)} L ${P(6, 0)} Z" fill="${fill}"/>`,
  );
  g.push(
    `<path d="M ${P(6, 11)} C ${P(10, 15)}, ${P(20, 17)}, ${P(32, 17)} L ${P(64, 16)} ` +
      `L ${P(64, 0)} L ${P(6, 0)} Z" fill="${dark}" opacity="0.55"/>`,
  );
  // Weathering courses along the flank.
  for (let i = 0; i < 4; i += 1) {
    g.push(
      `<path d="M ${P(8, 6 + i * 6)} L ${P(60, 5 + i * 6)}" stroke="${darker}" ` +
        `stroke-width="${n2(w * 0.004)}" opacity="0.3"/>`,
    );
  }
  // Near foreleg with the paw.
  g.push(
    `<path d="M ${P(58, 0)} L ${P(58, 15)} L ${P(94, 12)} C ${P(100, 12)}, ${P(100, 0)}, ${P(94, 0)} Z" fill="${dark}"/>`,
  );
  g.push(
    `<path d="M ${P(80, 1)} L ${P(80, 11)} M ${P(87, 1)} L ${P(87, 11)}" stroke="${darker}" ` +
      `stroke-width="${n2(w * 0.006)}" opacity="0.55"/>`,
  );
  // Tail curling around the rear haunch.
  g.push(
    `<path d="M ${P(6, 12)} C ${P(2, 10)}, ${P(1, 5)}, ${P(4, 3)}" fill="none" stroke="${fill}" ` +
      `stroke-width="${n2(w * 0.018)}" stroke-linecap="round"/>`,
  );

  // Head: nemes crown, face in profile, ceremonial beard.
  g.push(
    `<path d="M ${P(48, 34)} L ${P(50, 47)} C ${P(51, 54)}, ${P(56, 58)}, ${P(62, 58)} ` +
      `C ${P(68, 58)}, ${P(72, 54)}, ${P(73, 47)} ` + // crown
      `L ${P(75, 43)} L ${P(78, 39)} L ${P(79, 36)} ` + // forehead into the nose
      `L ${P(76, 35)} L ${P(78, 33)} ` + // nose tip to lip
      `L ${P(75, 31)} L ${P(77, 26)} L ${P(71, 23)} ` + // chin into the beard
      `L ${P(64, 25)} L ${P(56, 28)} Z" fill="${fill}"/>`,
  );
  // Nemes lappet hanging over the shoulder, plus its stripes.
  g.push(
    `<path d="M ${P(50, 47)} L ${P(48, 32)} L ${P(53, 27)} L ${P(60, 28)} L ${P(59, 45)} Z" fill="${dark}"/>`,
  );
  for (let i = 0; i < 3; i += 1) {
    g.push(
      `<path d="M ${P(49 + i * 0.6, 44 - i * 5)} L ${P(59 - i * 0.4, 42 - i * 5)}" stroke="${darker}" ` +
        `stroke-width="${n2(w * 0.007)}" opacity="0.6"/>`,
    );
  }
  // Brow ridge and eye - just enough to read as a face at small sizes.
  g.push(`<path d="M ${P(72, 44)} L ${P(77, 40)}" stroke="${darker}" stroke-width="${n2(w * 0.009)}" opacity="0.7"/>`);
  g.push(`<ellipse cx="${n2(x + 73.5 * s)}" cy="${n2(baseY - 42 * s)}" rx="${n2(w * 0.012)}" ry="${n2(w * 0.008)}" fill="${darker}" opacity="0.75"/>`);
  // Uraeus at the brow.
  g.push(`<path d="M ${P(72, 49)} L ${P(74, 52)} L ${P(70, 52)} Z" fill="${dark}"/>`);

  if (rim) {
    g.push(
      `<path d="M ${P(50, 47)} C ${P(51, 54)}, ${P(56, 58)}, ${P(62, 58)} C ${P(68, 58)}, ${P(72, 54)}, ${P(73, 47)} ` +
        `L ${P(75, 43)} L ${P(78, 39)} L ${P(79, 36)}" fill="none" stroke="${rim}" ` +
        `stroke-width="${n2(Math.max(1, w * 0.007))}" opacity="${n2(rimOpacity)}" stroke-linejoin="round"/>`,
    );
    g.push(
      `<path d="M ${P(30, 40)} L ${P(50, 39)}" fill="none" stroke="${rim}" ` +
        `stroke-width="${n2(Math.max(1, w * 0.006))}" opacity="${n2(rimOpacity * 0.7)}"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
}

/** Date palm: tapered leaning trunk with drooping fronds. */
function palm(S, { x, baseY, h, fill, lean = 0.12, fronds = 9, seed = 1 }) {
  const rng = makeRng(seed * 7919 + 13);
  const topX = x + h * lean;
  const topY = baseY - h;
  const tw = h * 0.028;
  const g = [];
  const midX = x + h * lean * 0.25;
  g.push(
    `<path d="M ${n2(x - tw)} ${n2(baseY)} Q ${n2(midX - tw * 0.7)} ${n2(baseY - h * 0.55)}, ${n2(topX - tw * 0.42)} ${n2(topY)} ` +
      `L ${n2(topX + tw * 0.42)} ${n2(topY)} Q ${n2(midX + tw * 0.9)} ${n2(baseY - h * 0.55)}, ${n2(x + tw)} ${n2(baseY)} Z" fill="${fill}"/>`,
  );
  // Trunk ring texture.
  for (let i = 1; i < 9; i += 1) {
    const t = i / 9;
    const ry = baseY - h * t * 0.92;
    const rx = x + (topX - x) * t * t;
    const rw = tw * (1.05 - t * 0.5);
    g.push(
      `<path d="M ${n2(rx - rw)} ${n2(ry)} h ${n2(rw * 2)}" stroke="${shade(fill, 0.5)}" stroke-width="${n2(h * 0.006)}" opacity="0.18"/>`,
    );
  }
  const L = h * 0.46;
  for (let i = 0; i < fronds; i += 1) {
    const a = (-170 + (i / (fronds - 1)) * 160 + rng.range(-8, 8)) * (Math.PI / 180);
    const len = L * rng.range(0.75, 1.15);
    const ex = topX + Math.cos(a) * len;
    const ey = topY + Math.sin(a) * len + len * 0.42; // gravity droop
    const cx1 = topX + Math.cos(a) * len * 0.5;
    const cy1 = topY + Math.sin(a) * len * 0.5 - len * 0.06;
    const bow = len * 0.16;
    g.push(
      `<path d="M ${n2(topX)} ${n2(topY)} Q ${n2(cx1)} ${n2(cy1)}, ${n2(ex)} ${n2(ey)} ` +
        `Q ${n2(cx1 + bow * 0.3)} ${n2(cy1 + bow)}, ${n2(topX)} ${n2(topY + h * 0.03)} Z" fill="${fill}"/>`,
    );
  }
  g.push(`<circle cx="${n2(topX)}" cy="${n2(topY + h * 0.012)}" r="${n2(h * 0.026)}" fill="${fill}"/>`);
  S.add(`<g>${g.join("")}</g>`);
}

/** Felucca: lateen sail, curved hull, no crew. */
function felucca(S, { x, y, s, sail, hull, flip = false, opacity = 1 }) {
  const f = flip ? -1 : 1;
  const g = [];
  g.push(
    `<path d="M ${n2(-s * 1.15)} 0 Q 0 ${n2(s * 0.34)}, ${n2(s * 1.15)} 0 Q 0 ${n2(s * 0.1)}, ${n2(-s * 1.15)} 0 Z" fill="${hull}"/>`,
  );
  g.push(`<path d="M ${n2(-s * 0.1)} 0 V ${n2(-s * 1.85)}" stroke="${hull}" stroke-width="${n2(s * 0.05)}"/>`);
  g.push(
    `<path d="M ${n2(-s * 0.08)} ${n2(-s * 1.85)} Q ${n2(s * 0.62)} ${n2(-s * 1.0)}, ${n2(s * 0.86)} ${n2(-s * 0.06)} ` +
      `L ${n2(-s * 0.08)} ${n2(-s * 0.06)} Z" fill="${sail}"/>`,
  );
  g.push(
    `<path d="M ${n2(-s * 0.2)} ${n2(-s * 1.7)} Q ${n2(-s * 0.62)} ${n2(-s * 0.9)}, ${n2(-s * 0.72)} ${n2(-s * 0.06)} ` +
      `L ${n2(-s * 0.2)} ${n2(-s * 0.06)} Z" fill="${sail}" opacity="0.72"/>`,
  );
  S.add(
    `<g transform="translate(${n2(x)} ${n2(y)}) scale(${f} 1)" opacity="${n2(opacity)}">${g.join("")}</g>`,
  );
}

/**
 * Riderless camel silhouette, facing right. Built from body / neck / legs so the
 * proportions stay controllable. Plotted in a 100 x 72 box (y up from the ground).
 */
function camel(S, { x, baseY, w, fill, flip = false, opacity = 1 }) {
  const s = w / 100;
  const P = (px, py) => `${n2(px * s)} ${n2(-py * s)}`;
  const leg = (hx, kneeOut, top) =>
    `<path d="M ${P(hx, top)} C ${P(hx + kneeOut, top * 0.6)}, ${P(hx - kneeOut * 0.5, top * 0.34)}, ${P(hx + 1, 0)} " ` +
    `fill="none" stroke="${fill}" stroke-width="${n2(w * 0.038)}" stroke-linecap="round"/>`;
  const g = [];
  // Far pair of legs, slightly offset.
  g.push(leg(26, 3.5, 34), leg(70, -3.5, 34));
  // Body with the single dromedary hump.
  g.push(
    `<path d="M ${P(22, 36)} C ${P(20, 44)}, ${P(24, 50)}, ${P(32, 50)} ` +
      `C ${P(36, 62)}, ${P(48, 64)}, ${P(52, 50)} ` + // hump
      `C ${P(62, 50)}, ${P(70, 49)}, ${P(74, 45)} ` +
      `L ${P(72, 34)} C ${P(60, 30)}, ${P(34, 30)}, ${P(24, 33)} Z" fill="${fill}"/>`,
  );
  // Neck and head.
  g.push(
    `<path d="M ${P(70, 46)} C ${P(76, 52)}, ${P(78, 60)}, ${P(79, 66)} ` +
      `L ${P(86, 71)} L ${P(93, 69)} L ${P(93, 65)} L ${P(86, 63)} ` +
      `C ${P(85, 57)}, ${P(82, 50)}, ${P(76, 44)} Z" fill="${fill}"/>`,
  );
  // Near pair of legs, drawn last so they sit in front.
  g.push(leg(30, 3.5, 34), leg(74, -3.5, 34));
  // Tail.
  g.push(
    `<path d="M ${P(23, 40)} C ${P(18, 36)}, ${P(17, 30)}, ${P(19, 26)}" fill="none" stroke="${fill}" ` +
      `stroke-width="${n2(w * 0.014)}" stroke-linecap="round"/>`,
  );
  S.add(
    `<g transform="translate(${n2(x)} ${n2(baseY)})${flip ? ` scale(-1 1)` : ""}" opacity="${n2(opacity)}">` +
      g.join("") +
      `</g>`,
  );
}

/** A small flock of gulls. */
function birds(S, { cx, cy, spread, count = 7, color = C.navy800, opacity = 0.4, scale = 1, seed = 3 }) {
  const rng = makeRng(seed * 31 + 7);
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const x = cx + rng.range(-spread, spread);
    const y = cy + rng.range(-spread * 0.4, spread * 0.4);
    const s = scale * rng.range(0.6, 1.3);
    parts.push(
      `<path d="M ${n2(x - 7 * s)} ${n2(y)} q ${n2(3.5 * s)} ${n2(-4 * s)}, ${n2(7 * s)} 0 ` +
        `q ${n2(3.5 * s)} ${n2(-4 * s)}, ${n2(7 * s)} 0" fill="none" stroke="${color}" ` +
        `stroke-width="${n2(1.5 * s)}" stroke-linecap="round" opacity="${n2(opacity * rng.range(0.5, 1))}"/>`,
    );
  }
  S.add(`<g>${parts.join("")}</g>`);
}

/** Mosque dome on a drum, with arched windows and a finial. */
function dome(S, { cx, baseY, r, fill, rim, rimOpacity = 0.5 }) {
  const drumH = r * 0.55;
  const g = [];
  g.push(`<rect x="${n2(cx - r * 1.05)}" y="${n2(baseY - drumH)}" width="${n2(r * 2.1)}" height="${n2(drumH + 2)}" fill="${fill}"/>`);
  // Onion-ish dome: semicircle drawn with a slight point at the crown.
  g.push(
    `<path d="M ${n2(cx - r)} ${n2(baseY - drumH)} C ${n2(cx - r)} ${n2(baseY - drumH - r * 1.05)}, ` +
      `${n2(cx - r * 0.34)} ${n2(baseY - drumH - r * 1.32)}, ${n2(cx)} ${n2(baseY - drumH - r * 1.36)} ` +
      `C ${n2(cx + r * 0.34)} ${n2(baseY - drumH - r * 1.32)}, ${n2(cx + r)} ${n2(baseY - drumH - r * 1.05)}, ` +
      `${n2(cx + r)} ${n2(baseY - drumH)} Z" fill="${fill}"/>`,
  );
  g.push(
    `<path d="M ${n2(cx)} ${n2(baseY - drumH - r * 1.36)} V ${n2(baseY - drumH - r * 1.66)}" ` +
      `stroke="${fill}" stroke-width="${n2(r * 0.09)}" stroke-linecap="round"/>`,
  );
  g.push(`<circle cx="${n2(cx)}" cy="${n2(baseY - drumH - r * 1.72)}" r="${n2(r * 0.1)}" fill="${fill}"/>`);
  for (let i = -1; i <= 1; i += 1) {
    const wx = cx + i * r * 0.62;
    g.push(
      `<path d="M ${n2(wx - r * 0.11)} ${n2(baseY - drumH * 0.12)} V ${n2(baseY - drumH * 0.55)} ` +
        `a ${n2(r * 0.11)} ${n2(r * 0.11)} 0 0 1 ${n2(r * 0.22)} 0 V ${n2(baseY - drumH * 0.12)} Z" ` +
        `fill="${C.gold400}" opacity="0.5"/>`,
    );
  }
  if (rim) {
    g.push(
      `<path d="M ${n2(cx - r * 0.92)} ${n2(baseY - drumH - r * 0.2)} C ${n2(cx - r * 0.8)} ${n2(baseY - drumH - r * 1.1)}, ` +
        `${n2(cx - r * 0.3)} ${n2(baseY - drumH - r * 1.32)}, ${n2(cx)} ${n2(baseY - drumH - r * 1.36)}" ` +
        `fill="none" stroke="${rim}" stroke-width="${n2(r * 0.055)}" opacity="${n2(rimOpacity)}" stroke-linecap="round"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
}

/** Minaret: tapering shaft, two balconies, conical cap, crescent finial. */
function minaret(S, { cx, baseY, h, fill, rim, rimOpacity = 0.5, crescent = true }) {
  const w = h * 0.085;
  const g = [];
  g.push(
    `<path d="M ${n2(cx - w)} ${n2(baseY)} L ${n2(cx - w * 0.72)} ${n2(baseY - h * 0.55)} ` +
      `L ${n2(cx + w * 0.72)} ${n2(baseY - h * 0.55)} L ${n2(cx + w)} ${n2(baseY)} Z" fill="${fill}"/>`,
  );
  g.push(
    `<rect x="${n2(cx - w * 1.28)}" y="${n2(baseY - h * 0.6)}" width="${n2(w * 2.56)}" height="${n2(h * 0.05)}" fill="${fill}"/>`,
  );
  g.push(
    `<path d="M ${n2(cx - w * 0.6)} ${n2(baseY - h * 0.6)} L ${n2(cx - w * 0.45)} ${n2(baseY - h * 0.82)} ` +
      `L ${n2(cx + w * 0.45)} ${n2(baseY - h * 0.82)} L ${n2(cx + w * 0.6)} ${n2(baseY - h * 0.6)} Z" fill="${fill}"/>`,
  );
  g.push(
    `<rect x="${n2(cx - w * 0.95)}" y="${n2(baseY - h * 0.86)}" width="${n2(w * 1.9)}" height="${n2(h * 0.04)}" fill="${fill}"/>`,
  );
  g.push(
    `<path d="M ${n2(cx - w * 0.45)} ${n2(baseY - h * 0.86)} L ${n2(cx)} ${n2(baseY - h * 0.99)} ` +
      `L ${n2(cx + w * 0.45)} ${n2(baseY - h * 0.86)} Z" fill="${fill}"/>`,
  );
  g.push(`<path d="M ${n2(cx)} ${n2(baseY - h * 0.99)} V ${n2(baseY - h * 1.05)}" stroke="${fill}" stroke-width="${n2(w * 0.22)}"/>`);
  if (crescent) {
    const cy = baseY - h * 1.075;
    const cr = w * 0.4;
    g.push(
      `<path d="M ${n2(cx)} ${n2(cy - cr)} a ${n2(cr)} ${n2(cr)} 0 1 0 ${n2(cr * 0.72)} ${n2(cr * 1.75)} ` +
        `a ${n2(cr * 0.86)} ${n2(cr * 0.86)} 0 1 1 ${n2(-cr * 0.72)} ${n2(-cr * 1.75)} Z" fill="${fill}"/>`,
    );
  }
  // Lit slit windows.
  for (let i = 0; i < 3; i += 1) {
    g.push(
      `<rect x="${n2(cx - w * 0.14)}" y="${n2(baseY - h * (0.24 + i * 0.13))}" width="${n2(w * 0.28)}" ` +
        `height="${n2(h * 0.045)}" rx="${n2(w * 0.14)}" fill="${C.gold400}" opacity="0.45"/>`,
    );
  }
  if (rim) {
    g.push(
      `<path d="M ${n2(cx - w * 0.72)} ${n2(baseY - h * 0.55)} L ${n2(cx - w)} ${n2(baseY)}" fill="none" ` +
        `stroke="${rim}" stroke-width="${n2(w * 0.16)}" opacity="${n2(rimOpacity)}"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
}

/** Flat-roofed city blocks with occasional lit windows - the Cairo skyline filler. */
function cityBlocks(S, { x0, x1, baseY, maxH, fill, rng, count = 14, windows = true, windowColor = C.gold400 }) {
  const g = [];
  let x = x0;
  while (x < x1) {
    const w = rng.range((x1 - x0) / (count * 1.7), (x1 - x0) / (count * 0.65));
    const h = maxH * rng.range(0.32, 1);
    g.push(`<rect x="${n2(x)}" y="${n2(baseY - h)}" width="${n2(w * 1.02)}" height="${n2(h + 2)}" fill="${fill}"/>`);
    if (rng.next() > 0.6) {
      // Roof clutter: water tanks and aerials, very Cairo.
      g.push(
        `<rect x="${n2(x + w * 0.2)}" y="${n2(baseY - h - h * 0.08)}" width="${n2(w * 0.22)}" height="${n2(h * 0.08)}" fill="${fill}"/>`,
      );
      g.push(
        `<path d="M ${n2(x + w * 0.7)} ${n2(baseY - h)} v ${n2(-h * 0.16)}" stroke="${fill}" stroke-width="${n2(w * 0.03)}"/>`,
      );
    }
    if (windows) {
      const cols = Math.max(1, Math.floor(w / (maxH * 0.055)));
      const rows = Math.max(1, Math.floor(h / (maxH * 0.09)));
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          if (rng.next() > 0.34) continue;
          const wx = x + w * 0.14 + c * (w * 0.72) / cols;
          const wy = baseY - h + maxH * 0.05 + r * (h * 0.82) / rows;
          g.push(
            `<rect x="${n2(wx)}" y="${n2(wy)}" width="${n2(maxH * 0.016)}" height="${n2(maxH * 0.024)}" ` +
              `fill="${windowColor}" opacity="${n2(rng.range(0.22, 0.72))}"/>`,
          );
        }
      }
    }
    x += w * 1.02;
  }
  S.add(`<g>${g.join("")}</g>`);
}

/**
 * The Grand Egyptian Museum: a long stone wedge whose face is a translucent
 * triangulated screen. Drawn as a mass + a chevron lattice + a lit glass base.
 */
function museumBulk(S, { x0, x1, baseY, hLeft, hRight, stone, glass, glow, rim }) {
  const pid = S.uid("gem");
  const cid = S.uid("gemc");
  const w = x1 - x0;
  const topLeftY = baseY - hLeft;
  const topRightY = baseY - hRight;
  const shape = `M ${n2(x0)} ${n2(baseY)} L ${n2(x0)} ${n2(topLeftY)} L ${n2(x1)} ${n2(topRightY)} L ${n2(x1)} ${n2(baseY)} Z`;
  S.def(`<clipPath id="${cid}"><path d="${shape}"/></clipPath>`);
  // The signature triangulated screen, as a tiled pattern.
  const unit = Math.max(28, w / 11);
  S.def(
    `<pattern id="${pid}" width="${n2(unit)}" height="${n2(unit * 0.88)}" patternUnits="userSpaceOnUse">` +
      `<path d="M ${n2(unit / 2)} 0 L ${n2(unit)} ${n2(unit * 0.88)} L 0 ${n2(unit * 0.88)} Z" fill="none" ` +
      `stroke="${glass}" stroke-width="${n2(unit * 0.03)}" opacity="0.4"/>` +
      `<path d="M 0 0 L ${n2(unit / 2)} ${n2(unit * 0.88)} L ${n2(unit)} 0 Z" fill="${glass}" opacity="0.1"/>` +
      `<path d="M ${n2(unit / 2)} ${n2(unit * 0.88)} L ${n2(unit * 0.82)} ${n2(unit * 0.32)} L ${n2(unit * 0.18)} ${n2(unit * 0.32)} Z" ` +
      `fill="${glass}" opacity="0.14"/></pattern>`,
  );
  const gid = S.uid("gemg");
  S.def(
    linearGrad(gid, [
      [0, shade(stone, 0.12), 1],
      [0.55, stone, 1],
      [1, shade(stone, -0.18), 1],
    ]),
  );
  const g = [`<path d="${shape}" fill="url(#${gid})"/>`];
  g.push(`<g clip-path="url(#${cid})"><rect x="${n2(x0)}" y="${n2(Math.min(topLeftY, topRightY))}" width="${n2(w)}" height="${n2(baseY - Math.min(topLeftY, topRightY))}" fill="url(#${pid})"/></g>`);
  // Lit ground floor behind glass.
  const bh = Math.min(hLeft, hRight) * 0.22;
  g.push(
    `<g clip-path="url(#${cid})"><rect x="${n2(x0)}" y="${n2(baseY - bh)}" width="${n2(w)}" height="${n2(bh)}" fill="${glow}" opacity="0.5"/></g>`,
  );
  for (let i = 1; i < 9; i += 1) {
    const mx = x0 + (w * i) / 9;
    g.push(
      `<path d="M ${n2(mx)} ${n2(baseY)} v ${n2(-bh)}" stroke="${shade(stone, -0.4)}" stroke-width="${n2(w * 0.004)}" opacity="0.6"/>`,
    );
  }
  if (rim) {
    g.push(
      `<path d="M ${n2(x0)} ${n2(topLeftY)} L ${n2(x1)} ${n2(topRightY)}" fill="none" stroke="${rim}" ` +
        `stroke-width="${n2(Math.max(1.2, w * 0.003))}" opacity="0.7"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
}

/** Obelisk - a useful vertical accent for plazas and skylines. */
function obelisk(S, { cx, baseY, h, fill, rim }) {
  const w = h * 0.075;
  const g = [
    `<path d="M ${n2(cx - w)} ${n2(baseY)} L ${n2(cx - w * 0.66)} ${n2(baseY - h * 0.88)} ` +
      `L ${n2(cx)} ${n2(baseY - h)} L ${n2(cx + w * 0.66)} ${n2(baseY - h * 0.88)} L ${n2(cx + w)} ${n2(baseY)} Z" fill="${fill}"/>`,
  ];
  if (rim) {
    g.push(
      `<path d="M ${n2(cx + w * 0.66)} ${n2(baseY - h * 0.88)} L ${n2(cx + w)} ${n2(baseY)}" stroke="${rim}" ` +
        `stroke-width="${n2(w * 0.2)}" opacity="0.5" fill="none"/>`,
    );
  }
  S.add(`<g>${g.join("")}</g>`);
}

/* ==========================================================================
   8. Overlays: motif, vignette, scrim, grade
   ========================================================================== */

/** A restrained Egyptian lattice frieze (diamond + disc), used at low opacity. */
function motifBand(S, { y, h, opacity = 0.06, color = C.gold400, unit = 58, edge = "bottom" }) {
  const pid = S.uid("mot");
  S.def(
    `<pattern id="${pid}" width="${unit}" height="${unit}" patternUnits="userSpaceOnUse">` +
      `<path d="M ${unit / 2} ${unit * 0.12} L ${unit * 0.88} ${unit / 2} L ${unit / 2} ${unit * 0.88} L ${unit * 0.12} ${unit / 2} Z" ` +
      `fill="none" stroke="${color}" stroke-width="1.4"/>` +
      `<circle cx="${unit / 2}" cy="${unit / 2}" r="${unit * 0.11}" fill="${color}"/>` +
      `<path d="M 0 ${unit * 0.02} H ${unit}" stroke="${color}" stroke-width="1"/>` +
      `</pattern>`,
  );
  const mid = S.uid("motm");
  const stops =
    edge === "bottom"
      ? [
          [0, "#ffffff", 0],
          [1, "#ffffff", 1],
        ]
      : [
          [0, "#ffffff", 1],
          [1, "#ffffff", 0],
        ];
  S.def(`<mask id="${mid}"><rect x="0" y="${n2(y)}" width="${S.W}" height="${n2(h)}" fill="url(#${mid}g)"/></mask>`);
  S.def(linearGrad(`${mid}g`, stops));
  S.add(
    `<rect x="0" y="${n2(y)}" width="${S.W}" height="${n2(h)}" fill="url(#${pid})" opacity="${n2(opacity)}" mask="url(#${mid})"/>`,
  );
}

/** Corner falloff. Subtle by default - heavy vignettes look like a filter. */
function vignette(S, { strength = 0.4, color = C.navy900, inner = 0.45 } = {}) {
  const id = S.uid("vig");
  S.def(
    radialGrad(
      id,
      [
        [0, color, 0],
        [inner, color, 0],
        [0.78, color, strength * 0.45],
        [1, color, strength],
      ],
      { cx: 0.5, cy: 0.5, r: 0.75 },
    ),
  );
  S.add(`<rect width="${S.W}" height="${S.H}" fill="url(#${id})"/>`);
}

/** Cinematic grade wash - a cool top / warm bottom bias tying the frame together. */
function grade(S, { top = C.navy800, topOpacity = 0.18, bottom = C.terra600, bottomOpacity = 0.1 } = {}) {
  const id = S.uid("grd");
  S.def(
    linearGrad(id, [
      [0, top, topOpacity],
      [0.5, top, 0],
      [0.62, bottom, 0],
      [1, bottom, bottomOpacity],
    ]),
  );
  S.add(`<rect width="${S.W}" height="${S.H}" fill="url(#${id})"/>`);
}

/* ==========================================================================
   9. Scenes
   ========================================================================== */

/** Flagship: sunrise over the Red Sea with the Giza group on the far shore. */
function sceneHero(W, H) {
  const S = newScene(W, H, 1071);
  const horizon = H * 0.575;
  const sunX = W * 0.615;
  const sunY = horizon - H * 0.052;

  sky(S, [
    [0, mix(C.navy900, C.navy700, 0.45)],
    [0.16, mix(C.navy700, C.teal700, 0.4)],
    [0.32, mix(C.teal600, C.terra500, 0.45)],
    [0.46, mix(C.terra500, C.gold500, 0.62)],
    [0.57, mix(C.gold400, C.sand100, 0.55)],
    [0.66, mix(C.gold400, C.sand50, 0.35)],
  ]);
  stars(S, { count: 150, fadeY: H * 0.28, maxOpacity: 0.55 });
  godRays(S, { cx: sunX, cy: sunY, count: 14, length: H * 1.05, opacity: 0.075, spread: 170 });
  sunGlow(S, {
    cx: sunX,
    cy: sunY,
    r: H * 0.075,
    core: mix(C.sand50, C.gold400, 0.2),
    halo: mix(C.gold400, C.sand100, 0.25),
    haloR: H * 0.85,
    haloOpacity: 0.72,
  });
  cloudBands(S, { y0: H * 0.14, y1: horizon - H * 0.02, count: 16, color: mix(C.terra500, C.gold500, 0.35), opacity: 0.26, blur: 12 });
  cloudBands(S, { y0: H * 0.28, y1: horizon - H * 0.06, count: 9, color: mix(C.gold400, C.sand50, 0.65), opacity: 0.28, blur: 16, widthScale: 0.8 });
  hazeBand(S, { y: horizon, h: H * 0.22, color: mix(C.gold400, C.sand100, 0.55), opacity: 0.6, blur: 30 });

  // Far shore: hazy hills, then the pyramid group, then a warm sand strip.
  const hazeCol = mix(C.gold400, C.sand100, 0.55);
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.1, color: C.navy700, hazeColor: hazeCol, haze: 0.55, segments: 11, jitter: 0.6 });
  // Backlit by the rising sun, so these read as dark silhouettes with a hot rim
  // rather than lit stone. Only atmospheric haze lifts them off the sky.
  const far = mix(C.navy900, hazeCol, 0.2);
  const farLit = mix(C.navy800, hazeCol, 0.13);
  pyramid(S, { cx: W * 0.235, baseY: horizon + 2, halfW: W * 0.058, lit: mix(farLit, hazeCol, 0.16), dark: mix(far, hazeCol, 0.14), sunLeft: false, rim: mix(C.gold400, C.sand50, 0.45), rimOpacity: 0.6, texture: false });
  pyramid(S, { cx: W * 0.335, baseY: horizon + 2, halfW: W * 0.086, lit: farLit, dark: far, sunLeft: false, rim: mix(C.gold400, C.sand50, 0.6), rimOpacity: 0.8, texture: false });
  pyramid(S, { cx: W * 0.46, baseY: horizon + 2, halfW: W * 0.062, lit: mix(farLit, hazeCol, 0.08), dark: mix(far, hazeCol, 0.06), sunLeft: false, rim: mix(C.gold400, C.sand50, 0.55), rimOpacity: 0.7, texture: false });
  S.add(
    `<rect x="0" y="${n2(horizon - H * 0.004)}" width="${W}" height="${n2(H * 0.014)}" fill="${mix(C.gold400, C.navy800, 0.45)}" opacity="0.75"/>`,
  );

  sea(S, {
    y: horizon + H * 0.008,
    stops: [
      [0, mix(C.gold400, C.teal500, 0.45)],
      [0.12, mix(C.teal500, C.teal600, 0.5)],
      [0.42, mix(C.teal700, C.navy800, 0.28)],
      [1, mix(C.navy800, C.teal700, 0.35)],
    ],
    sunX,
    sunColor: mix(C.sand50, C.gold400, 0.3),
    sparkle: 360,
    waveOpacity: 0.18,
  });
  felucca(S, { x: W * 0.83, y: horizon + H * 0.075, s: H * 0.042, sail: mix(C.sand100, C.gold400, 0.4), hull: C.navy900, flip: true, opacity: 0.85 });

  // Foreground rocky shore, framing the bottom-left corner.
  const shoreY = H * 0.955;
  duneLayer(S, { baseY: shoreY, amp: H * 0.035, color: mix(C.navy900, C.terra600, 0.15), hazeColor: C.navy900, points: 6, rim: mix(C.gold400, C.terra500, 0.5), rimOpacity: 0.4, phase: 1.2 });
  palm(S, { x: W * 0.075, baseY: shoreY + H * 0.02, h: H * 0.44, fill: mix(C.navy900, C.teal700, 0.3), lean: 0.14, fronds: 10, seed: 4 });
  palm(S, { x: W * 0.145, baseY: shoreY + H * 0.03, h: H * 0.33, fill: C.navy900, lean: -0.09, fronds: 9, seed: 9 });
  birds(S, { cx: W * 0.75, cy: H * 0.26, spread: W * 0.09, count: 8, color: mix(C.navy800, C.terra600, 0.4), opacity: 0.4, scale: H / 900 });

  motifBand(S, { y: H * 0.84, h: H * 0.16, opacity: 0.05, unit: Math.round(H / 15) });
  grade(S, { topOpacity: 0.16, bottom: C.gold500, bottomOpacity: 0.1 });
  vignette(S, { strength: 0.4, inner: 0.44 });
  return S;
}

/** Hurghada: high-key turquoise coast, midday. */
function sceneHurghada(W, H) {
  const S = newScene(W, H, 2210);
  const horizon = H * 0.42;
  const sunX = W * 0.78;

  sky(S, [
    [0, mix(C.teal500, C.sand50, 0.55)],
    [0.4, mix(C.teal400, C.sand50, 0.68)],
    [0.75, mix(C.sand100, C.teal400, 0.14)],
    [1, C.sand100],
  ]);
  sunGlow(S, { cx: sunX, cy: H * 0.13, r: H * 0.035, core: C.sand50, halo: mix(C.sand50, C.gold400, 0.3), haloR: H * 0.42, haloOpacity: 0.5 });
  cloudBands(S, { y0: H * 0.06, y1: horizon - H * 0.03, count: 12, color: C.sand50, opacity: 0.5, blur: 13 });
  hazeBand(S, { y: horizon, h: H * 0.14, color: mix(C.sand50, C.teal400, 0.25), opacity: 0.6, blur: 22 });

  const hazeCol = mix(C.sand100, C.teal400, 0.3);
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.075, color: C.terra600, hazeColor: hazeCol, haze: 0.7, segments: 13, jitter: 0.7 });
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.04, color: C.gold600, hazeColor: hazeCol, haze: 0.55, segments: 9, jitter: 0.5, xFrom: 0.4, xTo: 1.08 });

  sea(S, {
    y: horizon,
    stops: [
      [0, mix(C.teal600, C.navy800, 0.28)],
      [0.16, C.teal600],
      [0.42, C.teal500],
      [1, C.teal400],
    ],
    sunX,
    sunColor: C.sand50,
    sparkle: 300,
    waveOpacity: 0.2,
    bands: [
      { at: 0.26, color: C.teal500, opacity: 0.85, freq: 2.1, amp: 0.05, phase: 0.4 },
      { at: 0.46, color: mix(C.teal400, C.sand50, 0.22), opacity: 0.85, freq: 2.9, amp: 0.045, phase: 1.9 },
      { at: 0.63, color: mix(C.teal400, C.sand50, 0.5), opacity: 0.9, freq: 3.4, amp: 0.035, phase: 3.1 },
      { at: 0.74, color: mix(C.teal400, C.sand50, 0.72), opacity: 0.95, freq: 4.2, amp: 0.028, phase: 0.9 },
    ],
  });

  // Reef patches in the shallows.
  const rng = S.rng;
  const reef = [];
  for (let i = 0; i < 16; i += 1) {
    const t = rng.range(0.1, 0.9);
    const y = horizon + (H - horizon) * rng.range(0.22, 0.52);
    reef.push(
      `<ellipse cx="${n2(W * t)}" cy="${n2(y)}" rx="${n2(W * rng.range(0.018, 0.06))}" ry="${n2(H * rng.range(0.006, 0.018))}" ` +
        `fill="${mix(C.teal700, C.navy800, 0.2)}" opacity="${n2(rng.range(0.12, 0.3))}"/>`,
    );
  }
  S.add(`<g>${reef.join("")}</g>`);

  // Wet sand, dry sand, then a foreground palm frame.
  const beachY = H * 0.855;
  S.add(
    `<path d="${smoothPath([
      [-W * 0.05, beachY + H * 0.02],
      [W * 0.25, beachY - H * 0.012],
      [W * 0.55, beachY + H * 0.016],
      [W * 0.85, beachY - H * 0.008],
      [W * 1.05, beachY + H * 0.02],
    ])} L ${n2(W * 1.05)} ${n2(H + 10)} L ${n2(-W * 0.05)} ${n2(H + 10)} Z" fill="${mix(C.sand200, C.teal400, 0.18)}"/>`,
  );
  duneLayer(S, { baseY: H * 0.925, amp: H * 0.022, color: C.sand200, hazeColor: C.sand200, points: 6, rim: C.sand50, rimOpacity: 0.55, phase: 2.4 });
  duneLayer(S, { baseY: H * 0.985, amp: H * 0.03, color: C.sand300, hazeColor: C.sand300, points: 5, rim: C.sand100, rimOpacity: 0.4, phase: 0.6 });

  felucca(S, { x: W * 0.2, y: horizon + (H - horizon) * 0.16, s: H * 0.032, sail: C.sand50, hull: mix(C.navy800, C.teal700, 0.4), opacity: 0.9 });
  felucca(S, { x: W * 0.62, y: horizon + (H - horizon) * 0.1, s: H * 0.022, sail: C.sand50, hull: mix(C.navy800, C.teal700, 0.4), flip: true, opacity: 0.75 });
  palm(S, { x: W * 0.085, baseY: H * 1.02, h: H * 0.62, fill: mix(C.teal700, C.navy900, 0.45), lean: 0.16, fronds: 11, seed: 12 });
  birds(S, { cx: W * 0.42, cy: H * 0.17, spread: W * 0.08, count: 6, color: mix(C.navy800, C.teal600, 0.5), opacity: 0.3, scale: H / 950 });

  motifBand(S, { y: H * 0.88, h: H * 0.12, opacity: 0.04, color: C.gold500, unit: Math.round(H / 16) });
  grade(S, { top: C.teal600, topOpacity: 0.1, bottom: C.gold500, bottomOpacity: 0.08 });
  vignette(S, { strength: 0.24, color: C.teal700, inner: 0.5 });
  return S;
}

/** Marsa Alam: a still reef bay, low sun, minimal movement. */
function sceneMarsaAlam(W, H) {
  const S = newScene(W, H, 3311);
  const horizon = H * 0.4;
  const sunX = W * 0.3;

  sky(S, [
    [0, mix(C.teal700, C.navy800, 0.45)],
    [0.3, mix(C.teal600, C.sand200, 0.45)],
    [0.62, mix(C.sand200, C.gold400, 0.3)],
    [1, mix(C.sand100, C.gold400, 0.24)],
  ]);
  sunGlow(S, { cx: sunX, cy: horizon - H * 0.11, r: H * 0.042, core: mix(C.sand50, C.gold400, 0.3), halo: C.gold400, haloR: H * 0.5, haloOpacity: 0.45 });
  cloudBands(S, { y0: H * 0.05, y1: horizon - H * 0.02, count: 11, color: mix(C.sand50, C.gold400, 0.35), opacity: 0.32, blur: 15 });
  hazeBand(S, { y: horizon, h: H * 0.16, color: mix(C.sand100, C.gold400, 0.3), opacity: 0.55, blur: 26 });

  const hazeCol = mix(C.sand100, C.gold400, 0.35);
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.055, color: C.gold600, hazeColor: hazeCol, haze: 0.72, segments: 15, jitter: 0.55 });
  // A low headland arm curling in from the right - makes it read as a bay.
  S.add(
    `<path d="${smoothPath([
      [W * 1.05, horizon - H * 0.02],
      [W * 0.82, horizon + H * 0.012],
      [W * 0.6, horizon + H * 0.03],
      [W * 0.52, horizon + H * 0.05],
    ])} L ${n2(W * 1.05)} ${n2(horizon + H * 0.09)} Z" fill="${mix(C.gold600, hazeCol, 0.5)}"/>`,
  );

  sea(S, {
    y: horizon,
    stops: [
      [0, mix(C.teal600, C.gold400, 0.28)],
      [0.12, C.teal600],
      [0.45, mix(C.teal600, C.teal500, 0.6)],
      [1, mix(C.teal500, C.teal400, 0.5)],
    ],
    sunX,
    sunColor: mix(C.gold400, C.sand50, 0.5),
    sparkle: 190,
    waveOpacity: 0.1,
    bands: [
      { at: 0.3, color: mix(C.teal500, C.teal600, 0.4), opacity: 0.8, freq: 1.7, amp: 0.04, phase: 1.1 },
      { at: 0.52, color: mix(C.teal400, C.sand50, 0.2), opacity: 0.75, freq: 2.3, amp: 0.032, phase: 2.6 },
      { at: 0.7, color: mix(C.teal400, C.sand50, 0.45), opacity: 0.85, freq: 3.1, amp: 0.024, phase: 0.3 },
    ],
  });

  // Coral heads scattered through the glassy shallows.
  const rng = S.rng;
  const reef = [];
  for (let i = 0; i < 26; i += 1) {
    const y = horizon + (H - horizon) * rng.range(0.28, 0.78);
    const depth = (y - horizon) / (H - horizon);
    reef.push(
      `<ellipse cx="${n2(rng.range(0, W))}" cy="${n2(y)}" rx="${n2(W * rng.range(0.012, 0.045))}" ` +
        `ry="${n2(H * rng.range(0.005, 0.016))}" fill="${mix(C.teal700, C.gold600, 0.25)}" opacity="${n2(rng.range(0.1, 0.26) * (1 - depth * 0.4))}"/>`,
    );
  }
  S.add(`<g>${reef.join("")}</g>`);

  // Rocky headland closing the bay on the left, with its own reflection.
  const headland = `M ${n2(-W * 0.05)} ${n2(horizon + H * 0.005)} L ${n2(W * 0.04)} ${n2(horizon - H * 0.055)} ` +
    `L ${n2(W * 0.11)} ${n2(horizon - H * 0.02)} L ${n2(W * 0.17)} ${n2(horizon - H * 0.048)} ` +
    `L ${n2(W * 0.235)} ${n2(horizon + H * 0.02)} L ${n2(W * 0.26)} ${n2(horizon + H * 0.075)} ` +
    `L ${n2(-W * 0.05)} ${n2(horizon + H * 0.075)} Z`;
  S.add(`<path d="${headland}" fill="${mix(mix(C.gold600, C.terra600, 0.4), hazeCol, 0.42)}"/>`);
  S.add(
    `<g transform="translate(0 ${n2((horizon + H * 0.075) * 2)}) scale(1 -1)" opacity="0.2">` +
      `<path d="${headland}" fill="${C.navy800}"/></g>`,
  );
  // Moored boat in the lee of the headland.
  felucca(S, { x: W * 0.34, y: horizon + H * 0.1, s: H * 0.038, sail: mix(C.sand50, C.gold400, 0.25), hull: mix(C.navy800, C.teal700, 0.35), opacity: 0.92 });

  const beachY = H * 0.9;
  duneLayer(S, { baseY: beachY, amp: H * 0.02, color: mix(C.sand200, C.gold400, 0.2), hazeColor: C.sand200, points: 6, rim: C.sand50, rimOpacity: 0.5, phase: 1.7 });
  duneLayer(S, { baseY: H * 0.98, amp: H * 0.028, color: mix(C.sand300, C.gold600, 0.16), hazeColor: C.sand300, points: 5, rim: mix(C.sand100, C.gold400, 0.4), rimOpacity: 0.42, phase: 3.4 });
  palm(S, { x: W * 0.9, baseY: H * 1.03, h: H * 0.5, fill: mix(C.teal700, C.navy900, 0.5), lean: -0.13, fronds: 10, seed: 21 });
  palm(S, { x: W * 0.97, baseY: H * 1.05, h: H * 0.38, fill: mix(C.teal700, C.navy900, 0.62), lean: -0.06, fronds: 9, seed: 22 });
  birds(S, { cx: W * 0.66, cy: H * 0.2, spread: W * 0.07, count: 5, color: mix(C.navy800, C.teal700, 0.4), opacity: 0.26, scale: H / 1000 });

  motifBand(S, { y: H * 0.9, h: H * 0.1, opacity: 0.04, color: C.gold500, unit: Math.round(H / 16) });
  grade(S, { top: C.teal700, topOpacity: 0.12, bottom: C.gold500, bottomOpacity: 0.1 });
  vignette(S, { strength: 0.3, color: C.teal700, inner: 0.46 });
  return S;
}

/** Sharm el Sheikh: layered Sinai massifs above the strait. */
function sceneSharm(W, H) {
  const S = newScene(W, H, 4422);
  const horizon = H * 0.63;
  const sunX = W * 0.22;

  sky(S, [
    [0, mix(C.navy800, C.teal700, 0.3)],
    [0.28, mix(C.teal600, C.sand200, 0.35)],
    [0.5, mix(C.sand200, C.gold400, 0.42)],
    [0.66, mix(C.gold400, C.terra500, 0.35)],
  ]);
  sunGlow(S, { cx: sunX, cy: H * 0.34, r: H * 0.05, core: mix(C.sand50, C.gold400, 0.25), halo: C.gold400, haloR: H * 0.55, haloOpacity: 0.5 });
  godRays(S, { cx: sunX, cy: H * 0.34, count: 9, length: H * 0.8, opacity: 0.045, spread: 140 });
  cloudBands(S, { y0: H * 0.08, y1: H * 0.4, count: 12, color: mix(C.terra500, C.sand200, 0.5), opacity: 0.3, blur: 14 });

  const hazeCol = mix(C.sand200, C.gold400, 0.4);
  // Four ranges, each less contrasty than the last - textbook aerial perspective.
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.3, color: C.navy700, hazeColor: hazeCol, haze: 0.76, segments: 7, jitter: 0.55, xFrom: -0.1, xTo: 0.75 });
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.24, color: C.terra600, hazeColor: hazeCol, haze: 0.66, segments: 9, jitter: 0.6, xFrom: 0.3, xTo: 1.1 });
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.18, color: C.terra600, hazeColor: hazeCol, haze: 0.45, segments: 11, jitter: 0.65, xFrom: -0.08, xTo: 0.62 });
  mountainRange(S, { baseY: horizon + 1, peak: H * 0.13, color: mix(C.terra600, C.navy800, 0.4), hazeColor: hazeCol, haze: 0.26, segments: 13, jitter: 0.7, xFrom: 0.42, xTo: 1.1 });
  hazeBand(S, { y: horizon - H * 0.01, h: H * 0.1, color: hazeCol, opacity: 0.5, blur: 22 });

  sea(S, {
    y: horizon,
    stops: [
      [0, mix(C.teal600, C.gold400, 0.3)],
      [0.15, C.teal600],
      [0.5, mix(C.teal600, C.teal700, 0.5)],
      [1, mix(C.teal700, C.navy800, 0.45)],
    ],
    sunX,
    sunColor: mix(C.gold400, C.sand50, 0.4),
    sparkle: 300,
    waveOpacity: 0.16,
    bands: [{ at: 0.55, color: mix(C.teal500, C.teal600, 0.5), opacity: 0.5, freq: 2.6, amp: 0.05, phase: 1.4 }],
  });

  const rockY = H * 0.965;
  duneLayer(S, { baseY: rockY, amp: H * 0.028, color: mix(C.navy900, C.terra600, 0.28), hazeColor: C.navy900, points: 6, rim: mix(C.gold400, C.terra500, 0.4), rimOpacity: 0.4, phase: 2.1 });
  birds(S, { cx: W * 0.72, cy: H * 0.24, spread: W * 0.08, count: 7, color: C.navy800, opacity: 0.34, scale: H / 950 });

  motifBand(S, { y: H * 0.87, h: H * 0.13, opacity: 0.05, unit: Math.round(H / 15) });
  grade(S, { topOpacity: 0.16, bottomOpacity: 0.12 });
  vignette(S, { strength: 0.4, inner: 0.44 });
  return S;
}

/** Giza at golden hour - the pyramid group large in frame, with camels below. */
function sceneGizaGolden(W, H) {
  const S = newScene(W, H, 5533);
  const groundY = H * 0.78;
  const sunX = W * 0.8;
  const sunY = H * 0.6;

  sky(S, [
    [0, mix(C.navy800, C.terra600, 0.28)],
    [0.24, mix(C.terra600, C.gold500, 0.5)],
    [0.46, mix(C.gold500, C.gold400, 0.6)],
    [0.66, mix(C.gold400, C.sand200, 0.5)],
    [0.82, mix(C.sand200, C.gold400, 0.35)],
  ]);
  godRays(S, { cx: sunX, cy: sunY, count: 12, length: H * 1.1, opacity: 0.05, spread: 170 });
  sunGlow(S, { cx: sunX, cy: sunY, r: H * 0.058, core: mix(C.gold400, C.sand50, 0.5), halo: C.gold400, haloR: H * 0.7, haloOpacity: 0.55 });
  cloudBands(S, { y0: H * 0.08, y1: H * 0.55, count: 14, color: mix(C.terra500, C.gold600, 0.4), opacity: 0.24, blur: 13 });
  cloudBands(S, { y0: H * 0.2, y1: H * 0.5, count: 6, color: mix(C.gold400, C.sand50, 0.6), opacity: 0.22, blur: 18, widthScale: 0.7 });
  hazeBand(S, { y: groundY - H * 0.02, h: H * 0.22, color: mix(C.gold400, C.sand200, 0.45), opacity: 0.5, blur: 30 });

  const hazeCol = mix(C.gold400, C.sand200, 0.45);
  mountainRange(S, { baseY: groundY + 1, peak: H * 0.06, color: C.gold600, hazeColor: hazeCol, haze: 0.72, segments: 15, jitter: 0.5 });

  const lit = mix(C.gold500, C.sand200, 0.4);
  const dark = mix(C.terra600, C.navy800, 0.42);
  pyramid(S, { cx: W * 0.72, baseY: groundY + 2, halfW: W * 0.1, lit: mix(lit, hazeCol, 0.4), dark: mix(dark, hazeCol, 0.4), sunLeft: false, rim: mix(C.gold400, C.sand50, 0.5), rimOpacity: 0.5 });
  pyramid(S, { cx: W * 0.46, baseY: groundY + 4, halfW: W * 0.165, lit, dark, sunLeft: false, rim: mix(C.gold400, C.sand50, 0.6), rimOpacity: 0.7, shadow: C.terra600 });
  pyramid(S, { cx: W * 0.17, baseY: groundY + 6, halfW: W * 0.13, lit: mix(lit, C.terra600, 0.3), dark: shade(dark, -0.12), sunLeft: false, rim: mix(C.gold400, C.terra500, 0.4), rimOpacity: 0.55, shadow: C.terra600 });

  // Desert floor with long raking shadows from the low sun.
  const ridge = duneLayer(S, { baseY: groundY + H * 0.055, amp: H * 0.03, color: mix(C.gold400, C.sand200, 0.55), hazeColor: C.sand200, points: 7, rim: mix(C.sand50, C.gold400, 0.5), rimOpacity: 0.5, phase: 0.8 });
  // Long raking shadows from the low right-hand sun, blurred so they sit in the sand.
  const shfid = S.uid("rake");
  S.def(blurFilter(S, shfid, H * 0.02));
  const shadows = [];
  for (let i = 0; i < 5; i += 1) {
    const x = W * (0.12 + i * 0.2);
    shadows.push(
      `<path d="M ${n2(x)} ${n2(groundY + H * 0.08)} L ${n2(x - W * 0.3)} ${n2(groundY + H * 0.19)} ` +
        `L ${n2(x - W * 0.26)} ${n2(groundY + H * 0.225)} L ${n2(x + W * 0.035)} ${n2(groundY + H * 0.105)} Z" ` +
        `fill="${C.terra600}" opacity="0.07"/>`,
    );
  }
  S.add(`<g filter="url(#${shfid})">${shadows.join("")}</g>`);
  duneLayer(S, { baseY: H * 0.96, amp: H * 0.035, color: mix(C.gold500, C.sand300, 0.5), hazeColor: C.sand300, points: 6, rim: mix(C.sand50, C.gold400, 0.4), rimOpacity: 0.42, phase: 2.9 });

  const camY = ridgeYAt(ridge, W * 0.28) + H * 0.03;
  camel(S, { x: W * 0.28, baseY: camY, w: W * 0.085, fill: mix(C.terra600, C.navy800, 0.55), opacity: 0.92 });
  camel(S, { x: W * 0.375, baseY: camY + H * 0.014, w: W * 0.066, fill: mix(C.terra600, C.navy800, 0.6), opacity: 0.85 });
  birds(S, { cx: W * 0.62, cy: H * 0.19, spread: W * 0.09, count: 8, color: mix(C.terra600, C.navy800, 0.6), opacity: 0.3, scale: H / 950 });

  motifBand(S, { y: H * 0.86, h: H * 0.14, opacity: 0.05, color: C.terra600, unit: Math.round(H / 15) });
  grade(S, { top: C.terra600, topOpacity: 0.14, bottom: C.terra600, bottomOpacity: 0.12 });
  vignette(S, { strength: 0.38, color: C.terra600, inner: 0.44 });
  return S;
}

/** Old Cairo at dusk: domes, minarets, a crescent moon, layered haze. */
function sceneOldCairo(W, H) {
  const S = newScene(W, H, 6644);
  const groundY = H * 0.92;

  sky(S, [
    [0, mix(C.navy900, C.navy800, 0.4)],
    [0.26, C.navy700],
    [0.48, mix(C.navy700, C.terra600, 0.5)],
    [0.66, mix(C.terra500, C.gold500, 0.45)],
    [0.8, mix(C.gold400, C.terra500, 0.35)],
  ]);
  stars(S, { count: 200, fadeY: H * 0.45, maxOpacity: 0.7 });

  // Crescent moon high left: two offset circles, the second punching out the first.
  const mx = W * 0.19;
  const my = H * 0.17;
  const mr = H * 0.045;
  const mid = S.uid("moon");
  S.def(
    `<mask id="${mid}"><rect width="${W}" height="${H}" fill="#000"/>` +
      `<circle cx="${n2(mx)}" cy="${n2(my)}" r="${n2(mr)}" fill="#fff"/>` +
      `<circle cx="${n2(mx + mr * 0.42)}" cy="${n2(my - mr * 0.26)}" r="${n2(mr * 0.92)}" fill="#000"/></mask>`,
  );
  const mgid = S.uid("moong");
  S.def(
    radialGrad(mgid, [
      [0, C.sand100, 0.5],
      [1, C.sand100, 0],
    ]),
  );
  S.add(`<circle cx="${n2(mx)}" cy="${n2(my)}" r="${n2(mr * 4)}" fill="url(#${mgid})"/>`);
  S.add(`<circle cx="${n2(mx)}" cy="${n2(my)}" r="${n2(mr)}" fill="${C.sand100}" mask="url(#${mid})"/>`);

  sunGlow(S, { cx: W * 0.82, cy: groundY - H * 0.06, r: H * 0.03, core: mix(C.gold400, C.sand50, 0.3), halo: C.terra500, haloR: H * 0.72, haloOpacity: 0.5 });
  cloudBands(S, { y0: H * 0.3, y1: H * 0.78, count: 15, color: mix(C.terra600, C.navy800, 0.4), opacity: 0.26, blur: 14 });
  hazeBand(S, { y: H * 0.8, h: H * 0.2, color: mix(C.gold400, C.terra500, 0.5), opacity: 0.42, blur: 34 });

  const hazeCol = mix(C.gold400, C.terra500, 0.5);
  const rng = S.rng;
  // Distant hazy skyline, then a mid layer, then near-black foreground silhouettes.
  cityBlocks(S, { x0: -W * 0.05, x1: W * 1.05, baseY: groundY - H * 0.05, maxH: H * 0.16, fill: mix(C.navy700, hazeCol, 0.5), rng, count: 24, windowColor: C.gold400 });
  minaret(S, { cx: W * 0.09, baseY: groundY - H * 0.05, h: H * 0.3, fill: mix(C.navy700, hazeCol, 0.42), rim: hazeCol, rimOpacity: 0.3 });
  minaret(S, { cx: W * 0.63, baseY: groundY - H * 0.05, h: H * 0.26, fill: mix(C.navy700, hazeCol, 0.42), rim: hazeCol, rimOpacity: 0.3 });

  cityBlocks(S, { x0: -W * 0.05, x1: W * 1.05, baseY: groundY - H * 0.005, maxH: H * 0.2, fill: mix(C.navy800, hazeCol, 0.22), rng, count: 18, windowColor: C.gold400 });
  dome(S, { cx: W * 0.31, baseY: groundY - H * 0.005, r: H * 0.075, fill: mix(C.navy800, hazeCol, 0.16), rim: hazeCol, rimOpacity: 0.4 });
  dome(S, { cx: W * 0.45, baseY: groundY - H * 0.005, r: H * 0.05, fill: mix(C.navy800, hazeCol, 0.16), rim: hazeCol, rimOpacity: 0.35 });
  minaret(S, { cx: W * 0.24, baseY: groundY - H * 0.005, h: H * 0.46, fill: mix(C.navy800, hazeCol, 0.14), rim: hazeCol, rimOpacity: 0.45 });
  minaret(S, { cx: W * 0.39, baseY: groundY - H * 0.005, h: H * 0.38, fill: mix(C.navy800, hazeCol, 0.14), rim: hazeCol, rimOpacity: 0.45 });

  // Near foreground: full-contrast silhouettes.
  dome(S, { cx: W * 0.78, baseY: groundY + H * 0.06, r: H * 0.1, fill: C.navy900, rim: mix(C.gold400, C.terra500, 0.5), rimOpacity: 0.5 });
  minaret(S, { cx: W * 0.9, baseY: groundY + H * 0.06, h: H * 0.62, fill: C.navy900, rim: mix(C.gold400, C.terra500, 0.5), rimOpacity: 0.45 });
  minaret(S, { cx: W * 0.68, baseY: groundY + H * 0.06, h: H * 0.5, fill: C.navy900, rim: mix(C.gold400, C.terra500, 0.4), rimOpacity: 0.4 });
  cityBlocks(S, { x0: -W * 0.05, x1: W * 0.62, baseY: groundY + H * 0.07, maxH: H * 0.18, fill: C.navy900, rng, count: 12, windowColor: mix(C.gold400, C.sand50, 0.2) });
  S.add(`<rect x="0" y="${n2(groundY + H * 0.05)}" width="${W}" height="${n2(H * 0.2)}" fill="${C.navy900}"/>`);
  palm(S, { x: W * 0.55, baseY: groundY + H * 0.075, h: H * 0.3, fill: C.navy900, lean: 0.1, fronds: 9, seed: 33 });
  birds(S, { cx: W * 0.5, cy: H * 0.3, spread: W * 0.1, count: 9, color: C.navy900, opacity: 0.4, scale: H / 900 });

  motifBand(S, { y: 0, h: H * 0.2, opacity: 0.05, edge: "top", unit: Math.round(H / 14) });
  grade(S, { topOpacity: 0.2, bottomOpacity: 0.16 });
  vignette(S, { strength: 0.5, inner: 0.4 });
  return S;
}

/** GEM: the museum's triangulated wedge with the pyramid group beyond. */
function sceneMuseumExterior(W, H) {
  const S = newScene(W, H, 7755);
  const plazaY = H * 0.8;
  const sunX = W * 0.16;

  sky(S, [
    [0, mix(C.navy800, C.teal700, 0.35)],
    [0.32, mix(C.teal600, C.sand200, 0.5)],
    [0.58, mix(C.sand200, C.gold400, 0.35)],
    [0.8, mix(C.sand100, C.gold400, 0.3)],
  ]);
  sunGlow(S, { cx: sunX, cy: H * 0.24, r: H * 0.04, core: C.sand50, halo: mix(C.gold400, C.sand50, 0.4), haloR: H * 0.5, haloOpacity: 0.45 });
  cloudBands(S, { y0: H * 0.06, y1: H * 0.5, count: 13, color: C.sand50, opacity: 0.34, blur: 15 });
  hazeBand(S, { y: H * 0.62, h: H * 0.2, color: mix(C.sand100, C.gold400, 0.28), opacity: 0.5, blur: 28 });

  const hazeCol = mix(C.sand100, C.gold400, 0.3);
  // Pyramids sit behind and to the right, hazed back so the museum leads.
  const lit = mix(C.gold500, hazeCol, 0.5);
  const dark = mix(C.terra600, hazeCol, 0.55);
  pyramid(S, { cx: W * 0.72, baseY: H * 0.665, halfW: W * 0.115, lit, dark, sunLeft: true, rim: C.sand50, rimOpacity: 0.4, texture: false });
  pyramid(S, { cx: W * 0.885, baseY: H * 0.665, halfW: W * 0.082, lit: mix(lit, hazeCol, 0.25), dark: mix(dark, hazeCol, 0.25), sunLeft: true, rim: C.sand50, rimOpacity: 0.3, texture: false });
  mountainRange(S, { baseY: H * 0.67, peak: H * 0.035, color: C.gold600, hazeColor: hazeCol, haze: 0.78, segments: 13, jitter: 0.5 });

  museumBulk(S, {
    x0: -W * 0.04,
    x1: W * 0.66,
    baseY: plazaY,
    hLeft: H * 0.34,
    hRight: H * 0.19,
    stone: mix(C.sand200, C.gold500, 0.4),
    glass: mix(C.teal700, C.navy800, 0.35),
    glow: mix(C.gold400, C.sand50, 0.25),
    rim: C.sand50,
  });
  // Low approach wall on the right, tying the composition together.
  S.add(
    `<path d="M ${n2(W * 0.66)} ${n2(plazaY)} L ${n2(W * 0.66)} ${n2(plazaY - H * 0.075)} ` +
      `L ${n2(W * 1.05)} ${n2(plazaY - H * 0.045)} L ${n2(W * 1.05)} ${n2(plazaY)} Z" fill="${mix(C.sand300, C.gold600, 0.25)}"/>`,
  );
  obelisk(S, { cx: W * 0.845, baseY: plazaY - H * 0.055, h: H * 0.2, fill: mix(C.terra600, C.gold600, 0.4), rim: C.sand50 });

  // Plaza, drawn in perspective: paving fans out from the entrance toward us.
  S.add(`<rect x="0" y="${n2(plazaY)}" width="${W}" height="${n2(H - plazaY + 2)}" fill="${mix(C.sand200, C.gold600, 0.2)}"/>`);
  const vanX = W * 0.3;
  const paving = [];
  for (let i = 0; i <= 8; i += 1) {
    const t = i / 8;
    paving.push(
      `<path d="M ${n2(vanX + (t - 0.5) * W * 0.28)} ${n2(plazaY)} L ${n2(vanX + (t - 0.5) * W * 2.1)} ${n2(H + 4)}" ` +
        `stroke="${mix(C.sand300, C.gold600, 0.45)}" stroke-width="${n2(W * 0.002)}" opacity="0.3"/>`,
    );
  }
  for (let i = 1; i <= 4; i += 1) {
    const y = plazaY + (H - plazaY) * Math.pow(i / 4, 1.7);
    paving.push(
      `<path d="M 0 ${n2(y)} H ${W}" stroke="${mix(C.sand300, C.gold600, 0.45)}" stroke-width="${n2(W * 0.0018)}" opacity="0.22"/>`,
    );
  }
  S.add(`<g>${paving.join("")}</g>`);

  // Reflecting pool, a trapezoid so it lies in the plaza plane.
  const poolTop = plazaY + H * 0.055;
  const poolBot = plazaY + H * 0.155;
  const poolShape =
    `M ${n2(W * 0.13)} ${n2(poolTop)} L ${n2(W * 0.61)} ${n2(poolTop)} ` +
    `L ${n2(W * 0.72)} ${n2(poolBot)} L ${n2(W * 0.02)} ${n2(poolBot)} Z`;
  const pgid = S.uid("pool");
  S.def(
    linearGrad(pgid, [
      [0, mix(C.teal600, C.sand100, 0.35)],
      [0.4, mix(C.teal600, C.navy800, 0.25)],
      [1, mix(C.teal700, C.navy800, 0.45)],
    ]),
  );
  S.add(`<path d="${poolShape}" fill="url(#${pgid})"/>`);
  const clipPool = S.uid("poolc");
  S.def(`<clipPath id="${clipPool}"><path d="${poolShape}"/></clipPath>`);
  // Inverted museum silhouette in the water.
  S.add(
    `<g clip-path="url(#${clipPool})">` +
      `<g transform="translate(0 ${n2(poolTop * 2)}) scale(1 -1)" opacity="0.22">` +
      `<path d="M ${n2(-W * 0.04)} ${n2(plazaY)} L ${n2(-W * 0.04)} ${n2(plazaY - H * 0.34)} ` +
      `L ${n2(W * 0.66)} ${n2(plazaY - H * 0.19)} L ${n2(W * 0.66)} ${n2(plazaY)} Z" fill="${C.sand50}"/></g></g>`,
  );
  const rng = S.rng;
  const ripples = [];
  for (let i = 0; i < 80; i += 1) {
    const t = rng.next();
    const y = poolTop + (poolBot - poolTop) * t;
    ripples.push(
      `<path d="M ${n2(W * rng.range(0.02, 0.7))} ${n2(y)} h ${n2(W * rng.range(0.012, 0.06))}" stroke="${C.sand50}" ` +
        `stroke-width="${n2(1.2 + t * 1.4)}" opacity="${n2(rng.range(0.07, 0.26))}" stroke-linecap="round"/>`,
    );
  }
  S.add(`<g clip-path="url(#${clipPool})">${ripples.join("")}</g>`);
  S.add(
    `<path d="${poolShape}" fill="none" stroke="${mix(C.sand300, C.gold600, 0.3)}" stroke-width="${n2(W * 0.0028)}" opacity="0.7"/>`,
  );
  palm(S, { x: W * 0.9, baseY: H * 1.02, h: H * 0.4, fill: mix(C.teal700, C.navy900, 0.4), lean: -0.1, fronds: 10, seed: 44 });
  birds(S, { cx: W * 0.4, cy: H * 0.16, spread: W * 0.08, count: 6, color: mix(C.navy800, C.teal700, 0.4), opacity: 0.24, scale: H / 1000 });

  motifBand(S, { y: H * 0.88, h: H * 0.12, opacity: 0.045, color: C.gold500, unit: Math.round(H / 16) });
  grade(S, { top: C.teal700, topOpacity: 0.12, bottom: C.gold500, bottomOpacity: 0.1 });
  vignette(S, { strength: 0.32, inner: 0.46 });
  return S;
}

/** Three pyramids on open dunes - clean daylight, the reference Giza shot. */
function sceneGizaDunes(W, H) {
  const S = newScene(W, H, 8866);
  const groundY = H * 0.72;
  const sunX = W * 0.86;

  sky(S, [
    [0, mix(C.teal700, C.navy800, 0.5)],
    [0.3, mix(C.teal600, C.sand200, 0.55)],
    [0.58, mix(C.sand200, C.gold400, 0.3)],
    [0.78, mix(C.sand100, C.gold400, 0.28)],
  ]);
  sunGlow(S, { cx: sunX, cy: H * 0.2, r: H * 0.036, core: C.sand50, halo: mix(C.gold400, C.sand50, 0.45), haloR: H * 0.46, haloOpacity: 0.42 });
  cloudBands(S, { y0: H * 0.05, y1: H * 0.5, count: 13, color: C.sand50, opacity: 0.36, blur: 14 });
  hazeBand(S, { y: groundY - H * 0.01, h: H * 0.18, color: mix(C.sand100, C.gold400, 0.32), opacity: 0.5, blur: 26 });

  const hazeCol = mix(C.sand100, C.gold400, 0.35);
  mountainRange(S, { baseY: groundY + 1, peak: H * 0.05, color: C.gold600, hazeColor: hazeCol, haze: 0.76, segments: 14, jitter: 0.55 });

  const lit = mix(C.sand200, C.gold400, 0.55);
  const dark = mix(C.gold600, C.terra600, 0.45);
  pyramid(S, { cx: W * 0.665, baseY: groundY + 2, halfW: W * 0.155, lit, dark, sunLeft: false, rim: C.sand50, rimOpacity: 0.55, shadow: C.terra600 });
  pyramid(S, { cx: W * 0.36, baseY: groundY + 6, halfW: W * 0.135, lit: mix(lit, C.gold500, 0.2), dark: shade(dark, -0.1), sunLeft: false, rim: C.sand100, rimOpacity: 0.5, shadow: C.terra600 });
  pyramid(S, { cx: W * 0.155, baseY: groundY + 8, halfW: W * 0.075, lit: mix(lit, C.gold500, 0.3), dark: shade(dark, -0.16), sunLeft: false, rim: C.sand100, rimOpacity: 0.45, shadow: C.terra600 });
  // The small satellite pyramids that sit in front of Menkaure.
  pyramid(S, { cx: W * 0.085, baseY: groundY + 10, halfW: W * 0.028, lit: mix(lit, C.gold600, 0.35), dark: shade(dark, -0.2), sunLeft: false, texture: false });
  pyramid(S, { cx: W * 0.135, baseY: groundY + 11, halfW: W * 0.024, lit: mix(lit, C.gold600, 0.4), dark: shade(dark, -0.22), sunLeft: false, texture: false });

  duneLayer(S, { baseY: groundY + H * 0.06, amp: H * 0.032, color: mix(C.gold400, C.sand200, 0.6), hazeColor: C.sand200, points: 7, rim: C.sand50, rimOpacity: 0.55, phase: 1.5 });
  duneLayer(S, { baseY: H * 0.9, amp: H * 0.04, color: mix(C.gold500, C.sand300, 0.55), hazeColor: C.sand300, points: 6, rim: mix(C.sand50, C.gold400, 0.35), rimOpacity: 0.45, phase: 3.6 });
  duneLayer(S, { baseY: H * 1.0, amp: H * 0.045, color: mix(C.gold600, C.sand300, 0.4), hazeColor: C.sand300, points: 5, rim: mix(C.sand100, C.gold400, 0.5), rimOpacity: 0.35, phase: 0.4 });
  // Windblown sand ripples on the near crest.
  const rng = S.rng;
  const ripples = [];
  for (let i = 0; i < 70; i += 1) {
    const y = H * rng.range(0.86, 1);
    ripples.push(
      `<path d="M ${n2(W * rng.range(-0.02, 1))} ${n2(y)} q ${n2(W * 0.03)} ${n2(-H * 0.006)}, ${n2(W * 0.06)} 0" ` +
        `fill="none" stroke="${mix(C.gold600, C.terra600, 0.3)}" stroke-width="1.4" opacity="${n2(rng.range(0.05, 0.16))}"/>`,
    );
  }
  S.add(`<g>${ripples.join("")}</g>`);
  birds(S, { cx: W * 0.5, cy: H * 0.14, spread: W * 0.1, count: 7, color: mix(C.navy800, C.gold600, 0.4), opacity: 0.26, scale: H / 950 });

  motifBand(S, { y: H * 0.88, h: H * 0.12, opacity: 0.04, color: C.terra600, unit: Math.round(H / 15) });
  grade(S, { top: C.teal700, topOpacity: 0.12, bottom: C.gold500, bottomOpacity: 0.12 });
  vignette(S, { strength: 0.34, inner: 0.46 });
  return S;
}

/** Museum interior: light shafts, a lit vitrine and a gilded mask. */
function sceneMuseumInterior(W, H) {
  const S = newScene(W, H, 9911);
  const floorY = H * 0.78;

  sky(S, [
    [0, C.navy900],
    [0.4, mix(C.navy900, C.navy800, 0.7)],
    [0.75, mix(C.navy800, C.teal700, 0.22)],
    [1, C.navy900],
  ]);
  // Light shafts from clerestory windows above.
  const fid = S.uid("shaft");
  S.def(blurFilter(S, fid, W * 0.012));
  const shafts = [];
  for (let i = 0; i < 5; i += 1) {
    const sx = W * (0.14 + i * 0.19);
    shafts.push(
      `<path d="M ${n2(sx - W * 0.012)} ${n2(-H * 0.02)} L ${n2(sx + W * 0.012)} ${n2(-H * 0.02)} ` +
        `L ${n2(sx + W * 0.1)} ${n2(floorY)} L ${n2(sx - W * 0.07)} ${n2(floorY)} Z" fill="${C.gold400}" ` +
        `opacity="${i === 2 ? 0.13 : 0.07}"/>`,
    );
  }
  S.add(`<g filter="url(#${fid})">${shafts.join("")}</g>`);

  // Colonnade: heavy papyrus columns, lit from the right, receding to the walls.
  const cols = [];
  const colXs = [0.045, 0.17, 0.295, 0.705, 0.83, 0.955];
  colXs.forEach((t, i) => {
    const cx = W * t;
    const edge = Math.min(t, 1 - t); // columns nearest the walls read as further away
    const cw = W * (0.048 + edge * 0.055);
    const ch = H * (0.7 + edge * 0.12);
    const top = floorY - ch;
    const shaft = mix(C.navy800, C.gold600, 0.16 + edge * 0.12);
    cols.push(`<rect x="${n2(cx - cw / 2)}" y="${n2(top)}" width="${n2(cw)}" height="${n2(ch)}" fill="${shaft}"/>`);
    // Lit edge - left group catches the right-hand shafts, right group the left.
    const litX = i < 3 ? cx + cw * 0.16 : cx - cw / 2;
    cols.push(
      `<rect x="${n2(litX)}" y="${n2(top)}" width="${n2(cw * 0.34)}" height="${n2(ch)}" fill="${C.gold600}" opacity="0.35"/>`,
    );
    cols.push(
      `<rect x="${n2(cx - cw / 2)}" y="${n2(top)}" width="${n2(cw * 0.2)}" height="${n2(ch)}" fill="${C.navy900}" opacity="${i < 3 ? 0.45 : 0.1}"/>`,
    );
    // Papyrus-bud capital with an abacus block above it.
    cols.push(
      `<path d="M ${n2(cx - cw * 0.5)} ${n2(top + H * 0.02)} C ${n2(cx - cw * 0.86)} ${n2(top - H * 0.03)}, ` +
        `${n2(cx - cw * 0.7)} ${n2(top - H * 0.075)}, ${n2(cx)} ${n2(top - H * 0.082)} ` +
        `C ${n2(cx + cw * 0.7)} ${n2(top - H * 0.075)}, ${n2(cx + cw * 0.86)} ${n2(top - H * 0.03)}, ` +
        `${n2(cx + cw * 0.5)} ${n2(top + H * 0.02)} Z" fill="${mix(shaft, C.gold600, 0.3)}"/>`,
    );
    cols.push(
      `<rect x="${n2(cx - cw * 0.64)}" y="${n2(top - H * 0.11)}" width="${n2(cw * 1.28)}" height="${n2(H * 0.032)}" ` +
        `fill="${mix(shaft, C.navy900, 0.25)}"/>`,
    );
    cols.push(
      `<rect x="${n2(cx - cw * 0.66)}" y="${n2(floorY - H * 0.026)}" width="${n2(cw * 1.32)}" height="${n2(H * 0.026)}" ` +
        `fill="${mix(shaft, C.gold600, 0.2)}"/>`,
    );
    // Carved register bands, purely geometric.
    for (let k = 0; k < 6; k += 1) {
      const by = top + H * (0.1 + k * 0.095);
      if (by > floorY - H * 0.05) break;
      cols.push(
        `<rect x="${n2(cx - cw * 0.34)}" y="${n2(by)}" width="${n2(cw * 0.68)}" height="${n2(H * 0.022)}" ` +
          `fill="${C.gold400}" opacity="0.13"/>`,
      );
      cols.push(
        `<rect x="${n2(cx - cw * 0.34)}" y="${n2(by)}" width="${n2(cw * 0.2)}" height="${n2(H * 0.022)}" ` +
          `fill="${C.teal500}" opacity="0.12"/>`,
      );
    }
  });
  S.add(`<g>${cols.join("")}</g>`);

  // Hero vitrine with a gilded funerary mask (abstract, original geometry).
  const vx = W * 0.5;
  const vTop = floorY - H * 0.56;
  const gid = S.uid("vit");
  S.def(
    radialGrad(
      gid,
      [
        [0, C.gold400, 0.5],
        [0.5, C.gold500, 0.18],
        [1, C.gold500, 0],
      ],
      { cx: 0.5, cy: 0.5, r: 0.5 },
    ),
  );
  S.add(`<ellipse cx="${n2(vx)}" cy="${n2(floorY - H * 0.22)}" rx="${n2(W * 0.26)}" ry="${n2(H * 0.34)}" fill="url(#${gid})"/>`);
  S.add(
    `<rect x="${n2(vx - W * 0.115)}" y="${n2(vTop)}" width="${n2(W * 0.23)}" height="${n2(floorY - vTop)}" ` +
      `fill="${mix(C.teal600, C.navy900, 0.72)}" opacity="0.55"/>`,
  );
  S.add(
    `<rect x="${n2(vx - W * 0.115)}" y="${n2(vTop)}" width="${n2(W * 0.23)}" height="${n2(floorY - vTop)}" ` +
      `fill="none" stroke="${C.gold400}" stroke-width="${n2(W * 0.0025)}" opacity="0.5"/>`,
  );
  // Gilded funerary mask on a plinth. Proportions matter here: a wide striped
  // nemes, a narrow face inside it, and a squared false beard below the chin.
  const mh = H * 0.34;
  const my = floorY - H * 0.09; // chin line
  const mw = W * 0.085; // half-width of the nemes at the shoulders
  const gold = C.gold500;
  const goldLit = mix(C.gold400, C.sand200, 0.25);
  const stripe = mix(C.teal600, C.navy800, 0.25);
  const parts = [];
  // Plinth.
  parts.push(
    `<path d="M ${n2(vx - mw * 1.05)} ${n2(my + mh * 0.2)} L ${n2(vx + mw * 1.05)} ${n2(my + mh * 0.2)} ` +
      `L ${n2(vx + mw * 0.86)} ${n2(my + mh * 0.06)} L ${n2(vx - mw * 0.86)} ${n2(my + mh * 0.06)} Z" fill="${mix(C.navy800, C.navy900, 0.5)}"/>`,
  );
  // Nemes: shoulders out wide, crown domed over the top.
  parts.push(
    `<path d="M ${n2(vx - mw)} ${n2(my + mh * 0.08)} L ${n2(vx - mw * 0.9)} ${n2(my - mh * 0.42)} ` +
      `C ${n2(vx - mw * 0.86)} ${n2(my - mh * 0.86)}, ${n2(vx - mw * 0.5)} ${n2(my - mh * 1.02)}, ${n2(vx)} ${n2(my - mh * 1.02)} ` +
      `C ${n2(vx + mw * 0.5)} ${n2(my - mh * 1.02)}, ${n2(vx + mw * 0.86)} ${n2(my - mh * 0.86)}, ${n2(vx + mw * 0.9)} ${n2(my - mh * 0.42)} ` +
      `L ${n2(vx + mw)} ${n2(my + mh * 0.08)} Z" fill="${gold}"/>`,
  );
  // Nemes stripes on both lappets.
  for (let i = 0; i < 4; i += 1) {
    const off = mw * (0.44 + i * 0.14);
    parts.push(
      `<path d="M ${n2(vx - off)} ${n2(my - mh * 0.34)} L ${n2(vx - off - mw * 0.04)} ${n2(my + mh * 0.06)}" ` +
        `stroke="${stripe}" stroke-width="${n2(mw * 0.075)}" opacity="0.8"/>`,
    );
    parts.push(
      `<path d="M ${n2(vx + off)} ${n2(my - mh * 0.34)} L ${n2(vx + off + mw * 0.04)} ${n2(my + mh * 0.06)}" ` +
        `stroke="${stripe}" stroke-width="${n2(mw * 0.075)}" opacity="0.8"/>`,
    );
  }
  // Face opening.
  parts.push(
    `<path d="M ${n2(vx - mw * 0.42)} ${n2(my - mh * 0.78)} C ${n2(vx - mw * 0.44)} ${n2(my - mh * 0.3)}, ` +
      `${n2(vx - mw * 0.32)} ${n2(my - mh * 0.04)}, ${n2(vx)} ${n2(my - mh * 0.02)} ` +
      `C ${n2(vx + mw * 0.32)} ${n2(my - mh * 0.04)}, ${n2(vx + mw * 0.44)} ${n2(my - mh * 0.3)}, ` +
      `${n2(vx + mw * 0.42)} ${n2(my - mh * 0.78)} C ${n2(vx + mw * 0.2)} ${n2(my - mh * 0.9)}, ` +
      `${n2(vx - mw * 0.2)} ${n2(my - mh * 0.9)}, ${n2(vx - mw * 0.42)} ${n2(my - mh * 0.78)} Z" fill="${goldLit}"/>`,
  );
  // Brows, eyes and their cosmetic lines.
  parts.push(
    `<path d="M ${n2(vx - mw * 0.34)} ${n2(my - mh * 0.68)} q ${n2(mw * 0.15)} ${n2(-mh * 0.05)}, ${n2(mw * 0.28)} 0 ` +
      `M ${n2(vx + mw * 0.06)} ${n2(my - mh * 0.68)} q ${n2(mw * 0.15)} ${n2(-mh * 0.05)}, ${n2(mw * 0.28)} 0" ` +
      `fill="none" stroke="${stripe}" stroke-width="${n2(mh * 0.028)}" stroke-linecap="round"/>`,
  );
  parts.push(
    `<ellipse cx="${n2(vx - mw * 0.2)}" cy="${n2(my - mh * 0.58)}" rx="${n2(mw * 0.11)}" ry="${n2(mh * 0.036)}" fill="${C.navy900}"/>` +
      `<ellipse cx="${n2(vx + mw * 0.2)}" cy="${n2(my - mh * 0.58)}" rx="${n2(mw * 0.11)}" ry="${n2(mh * 0.036)}" fill="${C.navy900}"/>`,
  );
  parts.push(
    `<path d="M ${n2(vx - mw * 0.09)} ${n2(my - mh * 0.58)} h ${n2(mw * 0.1)} M ${n2(vx + mw * 0.31)} ${n2(my - mh * 0.58)} h ${n2(mw * 0.12)}" ` +
      `stroke="${stripe}" stroke-width="${n2(mh * 0.018)}" stroke-linecap="round"/>`,
  );
  // Nose and mouth.
  parts.push(
    `<path d="M ${n2(vx)} ${n2(my - mh * 0.54)} v ${n2(mh * 0.16)} q 0 ${n2(mh * 0.03)}, ${n2(-mw * 0.06)} ${n2(mh * 0.03)}" ` +
      `fill="none" stroke="${mix(gold, C.terra600, 0.35)}" stroke-width="${n2(mh * 0.016)}" stroke-linecap="round"/>`,
  );
  parts.push(
    `<path d="M ${n2(vx - mw * 0.13)} ${n2(my - mh * 0.28)} q ${n2(mw * 0.13)} ${n2(mh * 0.04)}, ${n2(mw * 0.26)} 0" ` +
      `fill="none" stroke="${mix(gold, C.terra600, 0.45)}" stroke-width="${n2(mh * 0.02)}" stroke-linecap="round"/>`,
  );
  // Uraeus and vulture head at the brow.
  parts.push(
    `<path d="M ${n2(vx - mw * 0.05)} ${n2(my - mh * 0.84)} q ${n2(-mw * 0.09)} ${n2(-mh * 0.06)}, ${n2(-mw * 0.02)} ${n2(-mh * 0.1)} ` +
      `q ${n2(mw * 0.1)} ${n2(-mh * 0.03)}, ${n2(mw * 0.08)} ${n2(mh * 0.06)} Z" fill="${stripe}"/>`,
  );
  // Squared false beard.
  parts.push(
    `<path d="M ${n2(vx - mw * 0.1)} ${n2(my - mh * 0.03)} L ${n2(vx + mw * 0.1)} ${n2(my - mh * 0.03)} ` +
      `L ${n2(vx + mw * 0.12)} ${n2(my + mh * 0.19)} L ${n2(vx - mw * 0.12)} ${n2(my + mh * 0.19)} Z" fill="${mix(gold, C.gold600, 0.6)}"/>`,
  );
  for (let i = 0; i < 3; i += 1) {
    parts.push(
      `<path d="M ${n2(vx - mw * 0.1 + i * mw * 0.07)} ${n2(my - mh * 0.02)} v ${n2(mh * 0.2)}" ` +
        `stroke="${C.gold600}" stroke-width="${n2(mw * 0.02)}" opacity="0.7"/>`,
    );
  }
  // Broad collar across the shoulders.
  parts.push(
    `<path d="M ${n2(vx - mw * 0.86)} ${n2(my + mh * 0.06)} L ${n2(vx + mw * 0.86)} ${n2(my + mh * 0.06)} ` +
      `L ${n2(vx + mw * 0.8)} ${n2(my - mh * 0.02)} L ${n2(vx - mw * 0.8)} ${n2(my - mh * 0.02)} Z" fill="${stripe}" opacity="0.8"/>`,
  );
  S.add(`<g>${parts.join("")}</g>`);

  // Polished floor with reflections.
  S.add(
    `<rect x="0" y="${n2(floorY)}" width="${W}" height="${n2(H - floorY + 2)}" fill="${mix(C.navy900, C.ink900, 0.4)}"/>`,
  );
  const rgid = S.uid("flr");
  S.def(
    linearGrad(rgid, [
      [0, C.gold400, 0.2],
      [1, C.gold400, 0],
    ]),
  );
  S.add(`<rect x="0" y="${n2(floorY)}" width="${W}" height="${n2(H - floorY)}" fill="url(#${rgid})"/>`);
  S.add(
    `<g transform="translate(0 ${n2(floorY * 2)}) scale(1 -1)" opacity="0.14">` +
      `<rect x="${n2(vx - W * 0.115)}" y="${n2(vTop)}" width="${n2(W * 0.23)}" height="${n2(floorY - vTop)}" fill="${C.gold400}"/></g>`,
  );
  const rng = S.rng;
  const glints = [];
  for (let i = 0; i < 40; i += 1) {
    const y = floorY + (H - floorY) * rng.next();
    glints.push(
      `<path d="M ${n2(W * rng.next())} ${n2(y)} h ${n2(W * rng.range(0.01, 0.06))}" stroke="${C.gold400}" ` +
        `stroke-width="1.2" opacity="${n2(rng.range(0.04, 0.16))}"/>`,
    );
  }
  S.add(`<g>${glints.join("")}</g>`);

  motifBand(S, { y: 0, h: H * 0.14, opacity: 0.07, edge: "top", unit: Math.round(H / 14) });
  vignette(S, { strength: 0.68, inner: 0.28 });
  return S;
}

/** The Sphinx with Khafre's pyramid rising behind it. */
function sceneSphinx(W, H) {
  const S = newScene(W, H, 10122);
  const groundY = H * 0.82;
  const sunX = W * 0.2;

  sky(S, [
    [0, mix(C.navy800, C.teal700, 0.3)],
    [0.3, mix(C.teal600, C.gold400, 0.5)],
    [0.55, mix(C.gold400, C.sand200, 0.4)],
    [0.75, mix(C.sand200, C.terra500, 0.28)],
  ]);
  godRays(S, { cx: sunX, cy: H * 0.28, count: 10, length: H * 0.9, opacity: 0.05, spread: 150 });
  sunGlow(S, { cx: sunX, cy: H * 0.28, r: H * 0.05, core: mix(C.sand50, C.gold400, 0.3), halo: C.gold400, haloR: H * 0.6, haloOpacity: 0.5 });
  cloudBands(S, { y0: H * 0.06, y1: H * 0.55, count: 12, color: mix(C.terra500, C.sand200, 0.55), opacity: 0.3, blur: 14 });
  hazeBand(S, { y: H * 0.68, h: H * 0.2, color: mix(C.gold400, C.sand200, 0.45), opacity: 0.48, blur: 28 });

  const hazeCol = mix(C.gold400, C.sand200, 0.45);
  pyramid(S, {
    cx: W * 0.62,
    baseY: groundY + 4,
    halfW: W * 0.3,
    lit: mix(C.gold500, hazeCol, 0.42),
    dark: mix(C.terra600, hazeCol, 0.42),
    sunLeft: true,
    rim: C.sand50,
    rimOpacity: 0.5,
  });
  pyramid(S, {
    cx: W * 0.12,
    baseY: groundY + 4,
    halfW: W * 0.14,
    lit: mix(C.gold500, hazeCol, 0.6),
    dark: mix(C.terra600, hazeCol, 0.6),
    sunLeft: true,
    rim: C.sand50,
    rimOpacity: 0.35,
    texture: false,
  });

  // Enclosure wall behind the Sphinx.
  S.add(
    `<rect x="0" y="${n2(groundY - H * 0.035)}" width="${W}" height="${n2(H * 0.04)}" fill="${mix(C.gold600, hazeCol, 0.35)}"/>`,
  );
  const blocks = [];
  for (let i = 0; i < 26; i += 1) {
    blocks.push(
      `<rect x="${n2((W / 26) * i)}" y="${n2(groundY - H * 0.035)}" width="${n2(W / 26 - 2)}" height="${n2(H * 0.04)}" ` +
        `fill="none" stroke="${mix(C.terra600, hazeCol, 0.6)}" stroke-width="1" opacity="0.5"/>`,
    );
  }
  S.add(`<g>${blocks.join("")}</g>`);

  duneLayer(S, { baseY: groundY + H * 0.02, amp: H * 0.015, color: mix(C.gold400, C.sand200, 0.5), hazeColor: C.sand200, points: 6, rim: C.sand50, rimOpacity: 0.4, phase: 1.1 });
  sphinx(S, {
    x: W * 0.16,
    baseY: groundY + H * 0.09,
    w: W * 0.62,
    fill: mix(C.terra600, C.gold600, 0.42),
    rim: mix(C.sand50, C.gold400, 0.4),
    rimOpacity: 0.55,
  });
  // Ground shadow cast to the right of the low left-hand sun.
  const fid = S.uid("sxs");
  S.def(blurFilter(S, fid, H * 0.02));
  S.add(
    `<ellipse cx="${n2(W * 0.62)}" cy="${n2(groundY + H * 0.1)}" rx="${n2(W * 0.32)}" ry="${n2(H * 0.022)}" ` +
      `fill="${C.terra600}" opacity="0.3" filter="url(#${fid})"/>`,
  );
  duneLayer(S, { baseY: H * 0.98, amp: H * 0.03, color: mix(C.gold500, C.sand300, 0.45), hazeColor: C.sand300, points: 5, rim: mix(C.sand50, C.gold400, 0.4), rimOpacity: 0.42, phase: 2.6 });
  birds(S, { cx: W * 0.78, cy: H * 0.18, spread: W * 0.08, count: 6, color: mix(C.navy800, C.terra600, 0.5), opacity: 0.28, scale: H / 950 });

  motifBand(S, { y: H * 0.88, h: H * 0.12, opacity: 0.045, color: C.terra600, unit: Math.round(H / 15) });
  grade(S, { top: C.teal700, topOpacity: 0.12, bottom: C.terra600, bottomOpacity: 0.12 });
  vignette(S, { strength: 0.38, inner: 0.44 });
  return S;
}

/** The Nile at sunset with feluccas and a palm-lined bank. */
function sceneNile(W, H) {
  const S = newScene(W, H, 11233);
  const bankY = H * 0.56;
  const sunX = W * 0.44;
  const sunY = bankY - H * 0.045;

  sky(S, [
    [0, mix(C.navy800, C.teal700, 0.3)],
    [0.24, mix(C.navy700, C.terra600, 0.5)],
    [0.42, mix(C.terra600, C.gold500, 0.55)],
    [0.55, mix(C.gold400, C.sand200, 0.45)],
    [0.62, mix(C.gold400, C.terra500, 0.28)],
  ]);
  godRays(S, { cx: sunX, cy: sunY, count: 12, length: H * 0.85, opacity: 0.05, spread: 160 });
  sunGlow(S, { cx: sunX, cy: sunY, r: H * 0.06, core: mix(C.gold400, C.sand50, 0.45), halo: C.gold400, haloR: H * 0.6, haloOpacity: 0.6 });
  cloudBands(S, { y0: H * 0.08, y1: bankY - H * 0.02, count: 15, color: mix(C.terra600, C.navy800, 0.35), opacity: 0.26, blur: 13 });
  cloudBands(S, { y0: H * 0.2, y1: bankY - H * 0.05, count: 7, color: mix(C.gold400, C.sand50, 0.5), opacity: 0.2, blur: 17, widthScale: 0.75 });
  hazeBand(S, { y: bankY, h: H * 0.18, color: mix(C.gold400, C.terra500, 0.4), opacity: 0.5, blur: 28 });

  const hazeCol = mix(C.gold400, C.terra500, 0.45);
  // Far bank: a hazy city strip with palms.
  const rng = S.rng;
  cityBlocks(S, { x0: -W * 0.05, x1: W * 1.05, baseY: bankY, maxH: H * 0.1, fill: mix(C.navy800, hazeCol, 0.42), rng, count: 20, windowColor: C.gold400 });
  minaret(S, { cx: W * 0.16, baseY: bankY, h: H * 0.2, fill: mix(C.navy800, hazeCol, 0.36), rim: hazeCol, rimOpacity: 0.35 });
  dome(S, { cx: W * 0.75, baseY: bankY, r: H * 0.035, fill: mix(C.navy800, hazeCol, 0.36), rim: hazeCol, rimOpacity: 0.35 });
  for (let i = 0; i < 7; i += 1) {
    palm(S, {
      x: W * (0.24 + i * 0.11),
      baseY: bankY + H * 0.004,
      h: H * rng.range(0.09, 0.15),
      fill: mix(C.navy800, hazeCol, 0.3),
      lean: rng.range(-0.14, 0.14),
      fronds: 8,
      seed: 50 + i,
    });
  }
  S.add(`<rect x="0" y="${n2(bankY - H * 0.004)}" width="${W}" height="${n2(H * 0.012)}" fill="${mix(C.terra600, C.navy800, 0.4)}" opacity="0.7"/>`);

  sea(S, {
    y: bankY + H * 0.006,
    stops: [
      [0, mix(C.gold400, C.teal700, 0.6)],
      [0.16, mix(C.teal700, C.navy800, 0.4)],
      [0.55, mix(C.navy800, C.teal700, 0.35)],
      [1, mix(C.navy900, C.navy800, 0.5)],
    ],
    sunX,
    sunColor: mix(C.gold400, C.sand50, 0.4),
    sparkle: 320,
    waveOpacity: 0.14,
  });

  felucca(S, { x: W * 0.3, y: bankY + H * 0.14, s: H * 0.075, sail: mix(C.sand100, C.gold400, 0.35), hull: C.navy900 });
  felucca(S, { x: W * 0.62, y: bankY + H * 0.1, s: H * 0.05, sail: mix(C.sand100, C.gold400, 0.5), hull: C.navy900, flip: true, opacity: 0.92 });
  felucca(S, { x: W * 0.83, y: bankY + H * 0.06, s: H * 0.032, sail: mix(C.sand200, C.gold400, 0.6), hull: mix(C.navy900, hazeCol, 0.2), opacity: 0.8 });
  // Sail reflections.
  S.add(
    `<g transform="translate(0 ${n2((bankY + H * 0.14) * 2)}) scale(1 -1)" opacity="0.15">` +
      `<path d="M ${n2(W * 0.3)} ${n2(bankY + H * 0.14)} l ${n2(H * 0.06)} ${n2(-H * 0.13)} l 0 ${n2(H * 0.13)} Z" fill="${C.sand100}"/></g>`,
  );

  // Near bank in the bottom-left corner, framing the river.
  S.add(
    `<path d="M ${n2(-W * 0.05)} ${n2(H + 10)} L ${n2(-W * 0.05)} ${n2(H * 0.86)} ` +
      `C ${n2(W * 0.16)} ${n2(H * 0.9)}, ${n2(W * 0.28)} ${n2(H * 0.99)}, ${n2(W * 0.38)} ${n2(H + 10)} Z" fill="${C.navy900}"/>`,
  );
  palm(S, { x: W * 0.1, baseY: H * 0.9, h: H * 0.42, fill: C.navy900, lean: 0.13, fronds: 10, seed: 61 });
  birds(S, { cx: W * 0.68, cy: H * 0.22, spread: W * 0.09, count: 8, color: C.navy800, opacity: 0.36, scale: H / 900 });

  motifBand(S, { y: 0, h: H * 0.16, opacity: 0.05, edge: "top", unit: Math.round(H / 14) });
  grade(S, { topOpacity: 0.2, bottomOpacity: 0.14 });
  vignette(S, { strength: 0.46, inner: 0.42 });
  return S;
}

/** Wide Cairo panorama at dusk: dense skyline, the river, pyramids far right. */
function sceneCairoStory(W, H) {
  const S = newScene(W, H, 12344);
  const skylineY = H * 0.62;
  const sunX = W * 0.74;

  sky(S, [
    [0, C.navy900],
    [0.18, mix(C.navy900, C.navy700, 0.6)],
    [0.36, mix(C.navy700, C.teal700, 0.3)],
    [0.5, mix(C.navy700, C.terra600, 0.55)],
    [0.6, mix(C.terra500, C.gold500, 0.45)],
    [0.68, mix(C.gold400, C.terra500, 0.4)],
  ]);
  stars(S, { count: 300, fadeY: H * 0.42, maxOpacity: 0.75 });
  sunGlow(S, { cx: sunX, cy: skylineY - H * 0.03, r: H * 0.042, core: mix(C.gold400, C.sand50, 0.4), halo: C.terra500, haloR: H * 0.8, haloOpacity: 0.5 });
  cloudBands(S, { y0: H * 0.2, y1: skylineY - H * 0.02, count: 18, color: mix(C.terra600, C.navy800, 0.4), opacity: 0.24, blur: 14 });
  cloudBands(S, { y0: H * 0.34, y1: skylineY - H * 0.05, count: 8, color: mix(C.gold400, C.sand50, 0.45), opacity: 0.17, blur: 18, widthScale: 0.8 });
  hazeBand(S, { y: skylineY - H * 0.01, h: H * 0.2, color: mix(C.gold400, C.terra500, 0.5), opacity: 0.45, blur: 34 });

  const hazeCol = mix(C.gold400, C.terra500, 0.5);
  const rng = S.rng;
  // Pyramids on the far right, deep in atmospheric haze.
  pyramid(S, { cx: W * 0.9, baseY: skylineY + 2, halfW: W * 0.055, lit: mix(C.gold500, hazeCol, 0.62), dark: mix(C.terra600, hazeCol, 0.62), sunLeft: true, texture: false });
  pyramid(S, { cx: W * 0.97, baseY: skylineY + 2, halfW: W * 0.04, lit: mix(C.gold500, hazeCol, 0.7), dark: mix(C.terra600, hazeCol, 0.7), sunLeft: true, texture: false });

  cityBlocks(S, { x0: -W * 0.05, x1: W * 1.05, baseY: skylineY + 2, maxH: H * 0.13, fill: mix(C.navy700, hazeCol, 0.48), rng, count: 32, windowColor: C.gold400 });
  minaret(S, { cx: W * 0.11, baseY: skylineY + 2, h: H * 0.2, fill: mix(C.navy700, hazeCol, 0.44), rim: hazeCol, rimOpacity: 0.3 });
  minaret(S, { cx: W * 0.52, baseY: skylineY + 2, h: H * 0.24, fill: mix(C.navy700, hazeCol, 0.44), rim: hazeCol, rimOpacity: 0.3 });
  dome(S, { cx: W * 0.34, baseY: skylineY + 2, r: H * 0.036, fill: mix(C.navy700, hazeCol, 0.44), rim: hazeCol, rimOpacity: 0.3 });

  const midY = skylineY + H * 0.045;
  cityBlocks(S, { x0: -W * 0.05, x1: W * 1.05, baseY: midY, maxH: H * 0.17, fill: mix(C.navy800, hazeCol, 0.2), rng, count: 22, windowColor: C.gold400 });
  dome(S, { cx: W * 0.2, baseY: midY, r: H * 0.058, fill: mix(C.navy800, hazeCol, 0.15), rim: hazeCol, rimOpacity: 0.4 });
  minaret(S, { cx: W * 0.28, baseY: midY, h: H * 0.34, fill: mix(C.navy800, hazeCol, 0.15), rim: hazeCol, rimOpacity: 0.45 });
  minaret(S, { cx: W * 0.13, baseY: midY, h: H * 0.28, fill: mix(C.navy800, hazeCol, 0.15), rim: hazeCol, rimOpacity: 0.42 });
  dome(S, { cx: W * 0.63, baseY: midY, r: H * 0.045, fill: mix(C.navy800, hazeCol, 0.15), rim: hazeCol, rimOpacity: 0.4 });
  minaret(S, { cx: W * 0.7, baseY: midY, h: H * 0.3, fill: mix(C.navy800, hazeCol, 0.15), rim: hazeCol, rimOpacity: 0.42 });
  // A slim modern tower for contemporary contrast.
  S.add(
    `<path d="M ${n2(W * 0.44)} ${n2(midY)} L ${n2(W * 0.442)} ${n2(midY - H * 0.3)} ` +
      `L ${n2(W * 0.458)} ${n2(midY - H * 0.32)} L ${n2(W * 0.462)} ${n2(midY)} Z" fill="${mix(C.navy800, hazeCol, 0.16)}"/>`,
  );

  // The river, catching the last light.
  const riverY = midY + H * 0.02;
  sea(S, {
    y: riverY,
    stops: [
      [0, mix(C.gold400, C.navy800, 0.62)],
      [0.18, mix(C.teal700, C.navy800, 0.55)],
      [0.6, mix(C.navy800, C.navy900, 0.4)],
      [1, C.navy900],
    ],
    sunX,
    sunColor: mix(C.gold400, C.sand50, 0.3),
    sparkle: 300,
    waveOpacity: 0.12,
  });
  felucca(S, { x: W * 0.4, y: riverY + H * 0.12, s: H * 0.045, sail: mix(C.sand100, C.gold400, 0.5), hull: C.navy900, opacity: 0.9 });
  felucca(S, { x: W * 0.66, y: riverY + H * 0.07, s: H * 0.03, sail: mix(C.sand200, C.gold400, 0.6), hull: C.navy900, flip: true, opacity: 0.8 });

  // Near embankment: full-contrast silhouettes and street lamps.
  S.add(
    `<path d="M ${n2(-W * 0.05)} ${n2(H + 10)} L ${n2(-W * 0.05)} ${n2(H * 0.9)} ` +
      `L ${n2(W * 1.05)} ${n2(H * 0.94)} L ${n2(W * 1.05)} ${n2(H + 10)} Z" fill="${C.navy900}"/>`,
  );
  const lamps = [];
  for (let i = 0; i < 9; i += 1) {
    const lx = W * (0.05 + i * 0.115);
    const ly = H * (0.9 + i * 0.0045);
    lamps.push(
      `<path d="M ${n2(lx)} ${n2(ly)} v ${n2(-H * 0.075)} q 0 ${n2(-H * 0.012)}, ${n2(W * 0.012)} ${n2(-H * 0.012)}" ` +
        `fill="none" stroke="${C.navy900}" stroke-width="${n2(W * 0.0022)}"/>`,
    );
    lamps.push(
      `<circle cx="${n2(lx + W * 0.013)}" cy="${n2(ly - H * 0.088)}" r="${n2(H * 0.007)}" fill="${C.gold400}" opacity="0.85"/>`,
    );
    lamps.push(
      `<circle cx="${n2(lx + W * 0.013)}" cy="${n2(ly - H * 0.088)}" r="${n2(H * 0.026)}" fill="${C.gold400}" opacity="0.13"/>`,
    );
  }
  S.add(`<g>${lamps.join("")}</g>`);
  palm(S, { x: W * 0.06, baseY: H * 0.93, h: H * 0.3, fill: C.navy900, lean: 0.12, fronds: 9, seed: 71 });
  palm(S, { x: W * 0.94, baseY: H * 0.95, h: H * 0.26, fill: C.navy900, lean: -0.1, fronds: 9, seed: 73 });
  birds(S, { cx: W * 0.36, cy: H * 0.24, spread: W * 0.12, count: 10, color: C.navy900, opacity: 0.34, scale: H / 900 });

  motifBand(S, { y: 0, h: H * 0.18, opacity: 0.05, edge: "top", unit: Math.round(H / 14) });
  grade(S, { topOpacity: 0.22, bottomOpacity: 0.16 });
  vignette(S, { strength: 0.5, inner: 0.4 });
  return S;
}

/** Blog still life: what to pack for Cairo - hat, bottle, backpack on the sand. */
function scenePackingKit(W, H) {
  const S = newScene(W, H, 13455);
  const groundY = H * 0.74;
  const sunX = W * 0.78;

  sky(S, [
    [0, mix(C.teal700, C.navy800, 0.4)],
    [0.28, mix(C.teal600, C.sand200, 0.6)],
    [0.55, mix(C.sand200, C.gold400, 0.35)],
    [0.76, mix(C.sand100, C.gold400, 0.3)],
  ]);
  sunGlow(S, { cx: sunX, cy: H * 0.22, r: H * 0.04, core: C.sand50, halo: mix(C.gold400, C.sand50, 0.4), haloR: H * 0.5, haloOpacity: 0.45 });
  cloudBands(S, { y0: H * 0.05, y1: H * 0.5, count: 12, color: C.sand50, opacity: 0.34, blur: 15 });
  hazeBand(S, { y: groundY - H * 0.02, h: H * 0.2, color: mix(C.sand100, C.gold400, 0.3), opacity: 0.5, blur: 26 });

  const hazeCol = mix(C.sand100, C.gold400, 0.32);
  mountainRange(S, { baseY: groundY + 1, peak: H * 0.075, color: C.gold600, hazeColor: hazeCol, haze: 0.74, segments: 12, jitter: 0.6 });
  pyramid(S, { cx: W * 0.2, baseY: groundY + 2, halfW: W * 0.075, lit: mix(C.gold500, hazeCol, 0.55), dark: mix(C.terra600, hazeCol, 0.55), sunLeft: false, texture: false, rim: C.sand50, rimOpacity: 0.3 });
  pyramid(S, { cx: W * 0.3, baseY: groundY + 2, halfW: W * 0.05, lit: mix(C.gold500, hazeCol, 0.62), dark: mix(C.terra600, hazeCol, 0.62), sunLeft: false, texture: false });

  duneLayer(S, { baseY: groundY + H * 0.05, amp: H * 0.028, color: mix(C.gold400, C.sand200, 0.6), hazeColor: C.sand200, points: 7, rim: C.sand50, rimOpacity: 0.5, phase: 1.9 });
  duneLayer(S, { baseY: H * 0.93, amp: H * 0.03, color: mix(C.gold500, C.sand300, 0.6), hazeColor: C.sand300, points: 6, rim: mix(C.sand50, C.gold400, 0.4), rimOpacity: 0.4, phase: 3.2 });

  // Objects sit on this line; the sun is upper-right so shadows fall left.
  const objY = H * 0.9;
  const shid = S.uid("objsh");
  S.def(blurFilter(S, shid, H * 0.012));
  const shadow = (cx, rx) =>
    `<ellipse cx="${n2(cx - W * 0.02)}" cy="${n2(objY + H * 0.012)}" rx="${n2(rx)}" ry="${n2(H * 0.018)}" ` +
    `fill="${C.terra600}" opacity="0.28" filter="url(#${shid})"/>`;

  S.add(shadow(W * 0.32, W * 0.115) + shadow(W * 0.56, W * 0.05) + shadow(W * 0.68, W * 0.055));

  // Backpack: body, lid, front pocket, straps.
  const bx = W * 0.3;
  const bw = W * 0.155;
  const bh = H * 0.28;
  S.add(
    `<g>` +
      `<path d="M ${n2(bx - bw / 2)} ${n2(objY)} L ${n2(bx - bw / 2)} ${n2(objY - bh * 0.72)} ` +
      `Q ${n2(bx - bw / 2)} ${n2(objY - bh)}, ${n2(bx)} ${n2(objY - bh)} ` +
      `Q ${n2(bx + bw / 2)} ${n2(objY - bh)}, ${n2(bx + bw / 2)} ${n2(objY - bh * 0.72)} ` +
      `L ${n2(bx + bw / 2)} ${n2(objY)} Z" fill="${C.terra600}"/>` +
      `<path d="M ${n2(bx - bw / 2)} ${n2(objY - bh * 0.62)} Q ${n2(bx)} ${n2(objY - bh * 0.52)}, ${n2(bx + bw / 2)} ${n2(objY - bh * 0.62)} ` +
      `L ${n2(bx + bw / 2)} ${n2(objY - bh * 0.78)} Q ${n2(bx)} ${n2(objY - bh * 1.02)}, ${n2(bx - bw / 2)} ${n2(objY - bh * 0.78)} Z" fill="${C.terra500}"/>` +
      `<rect x="${n2(bx - bw * 0.28)}" y="${n2(objY - bh * 0.42)}" width="${n2(bw * 0.56)}" height="${n2(bh * 0.3)}" rx="${n2(bh * 0.04)}" fill="${shade(C.terra600, -0.14)}"/>` +
      `<rect x="${n2(bx - bw * 0.28)}" y="${n2(objY - bh * 0.42)}" width="${n2(bw * 0.56)}" height="${n2(bh * 0.06)}" rx="${n2(bh * 0.02)}" fill="${C.gold500}" opacity="0.85"/>` +
      `<path d="M ${n2(bx - bw * 0.34)} ${n2(objY - bh * 0.86)} v ${n2(bh * 0.22)} M ${n2(bx + bw * 0.34)} ${n2(objY - bh * 0.86)} v ${n2(bh * 0.22)}" ` +
      `stroke="${C.gold500}" stroke-width="${n2(bw * 0.05)}" stroke-linecap="round"/>` +
      `<path d="M ${n2(bx + bw / 2)} ${n2(objY - bh * 0.72)} q ${n2(bw * 0.2)} ${n2(-bh * 0.1)}, ${n2(bw * 0.06)} ${n2(-bh * 0.28)}" ` +
      `fill="none" stroke="${C.teal600}" stroke-width="${n2(bw * 0.045)}" stroke-linecap="round"/>` +
      `<rect x="${n2(bx - bw * 0.52)}" y="${n2(objY - bh * 0.34)}" width="${n2(bw * 0.1)}" height="${n2(bh * 0.24)}" rx="${n2(bw * 0.05)}" fill="${C.teal600}"/>` +
      `</g>`,
  );

  // Water bottle: teal body, gold cap, highlight.
  const wx = W * 0.55;
  const ww = W * 0.05;
  const wh = H * 0.24;
  S.add(
    `<g>` +
      `<rect x="${n2(wx - ww / 2)}" y="${n2(objY - wh)}" width="${n2(ww)}" height="${n2(wh)}" rx="${n2(ww * 0.28)}" fill="${C.teal600}"/>` +
      `<rect x="${n2(wx - ww * 0.28)}" y="${n2(objY - wh - wh * 0.12)}" width="${n2(ww * 0.56)}" height="${n2(wh * 0.13)}" rx="${n2(ww * 0.1)}" fill="${C.gold500}"/>` +
      `<rect x="${n2(wx - ww * 0.34)}" y="${n2(objY - wh - wh * 0.03)}" width="${n2(ww * 0.68)}" height="${n2(wh * 0.05)}" rx="${n2(ww * 0.06)}" fill="${C.gold600}"/>` +
      `<rect x="${n2(wx - ww * 0.5)}" y="${n2(objY - wh * 0.62)}" width="${n2(ww)}" height="${n2(wh * 0.2)}" fill="${C.sand100}" opacity="0.9"/>` +
      `<path d="M ${n2(wx - ww * 0.24)} ${n2(objY - wh * 0.6)} l ${n2(ww * 0.12)} ${n2(wh * 0.08)} l ${n2(ww * 0.22)} ${n2(-wh * 0.12)}" ` +
      `fill="none" stroke="${C.teal600}" stroke-width="${n2(ww * 0.09)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<rect x="${n2(wx - ww * 0.34)}" y="${n2(objY - wh * 0.92)}" width="${n2(ww * 0.14)}" height="${n2(wh * 0.7)}" rx="${n2(ww * 0.07)}" fill="${C.sand50}" opacity="0.28"/>` +
      `</g>`,
  );

  // Straw sun hat: brim ellipse, crown, gold band.
  const hx = W * 0.685;
  const hrx = W * 0.075;
  S.add(
    `<g>` +
      `<ellipse cx="${n2(hx)}" cy="${n2(objY - H * 0.012)}" rx="${n2(hrx)}" ry="${n2(H * 0.032)}" fill="${C.sand300}"/>` +
      `<ellipse cx="${n2(hx)}" cy="${n2(objY - H * 0.018)}" rx="${n2(hrx)}" ry="${n2(H * 0.032)}" fill="${C.sand200}"/>` +
      `<path d="M ${n2(hx - hrx * 0.46)} ${n2(objY - H * 0.024)} Q ${n2(hx - hrx * 0.42)} ${n2(objY - H * 0.12)}, ${n2(hx)} ${n2(objY - H * 0.122)} ` +
      `Q ${n2(hx + hrx * 0.42)} ${n2(objY - H * 0.12)}, ${n2(hx + hrx * 0.46)} ${n2(objY - H * 0.024)} Z" fill="${C.sand200}"/>` +
      `<path d="M ${n2(hx - hrx * 0.47)} ${n2(objY - H * 0.048)} Q ${n2(hx)} ${n2(objY - H * 0.03)}, ${n2(hx + hrx * 0.47)} ${n2(objY - H * 0.048)} ` +
      `L ${n2(hx + hrx * 0.46)} ${n2(objY - H * 0.07)} Q ${n2(hx)} ${n2(objY - H * 0.052)}, ${n2(hx - hrx * 0.46)} ${n2(objY - H * 0.07)} Z" fill="${C.gold500}"/>` +
      // Straw weave.
      `<path d="M ${n2(hx - hrx * 0.9)} ${n2(objY - H * 0.018)} q ${n2(hrx * 0.9)} ${n2(H * 0.022)}, ${n2(hrx * 1.8)} 0" fill="none" ` +
      `stroke="${C.sand300}" stroke-width="1.6" opacity="0.8"/>` +
      `<path d="M ${n2(hx - hrx * 0.62)} ${n2(objY - H * 0.03)} q ${n2(hrx * 0.62)} ${n2(H * 0.018)}, ${n2(hrx * 1.24)} 0" fill="none" ` +
      `stroke="${C.sand300}" stroke-width="1.6" opacity="0.7"/>` +
      `</g>`,
  );

  // Sunglasses and a rolled map, for a bit of still-life density.
  const gx = W * 0.44;
  S.add(
    `<g>` +
      `<ellipse cx="${n2(gx)}" cy="${n2(objY - H * 0.012)}" rx="${n2(W * 0.019)}" ry="${n2(H * 0.016)}" fill="${C.navy800}"/>` +
      `<ellipse cx="${n2(gx + W * 0.042)}" cy="${n2(objY - H * 0.012)}" rx="${n2(W * 0.019)}" ry="${n2(H * 0.016)}" fill="${C.navy800}"/>` +
      `<path d="M ${n2(gx + W * 0.019)} ${n2(objY - H * 0.016)} h ${n2(W * 0.004)}" stroke="${C.gold500}" stroke-width="${n2(H * 0.006)}"/>` +
      `<path d="M ${n2(gx - W * 0.018)} ${n2(objY - H * 0.018)} l ${n2(-W * 0.03)} ${n2(H * 0.008)}" stroke="${C.gold500}" ` +
      `stroke-width="${n2(H * 0.005)}" stroke-linecap="round"/>` +
      `</g>`,
  );
  const rx0 = W * 0.79;
  S.add(
    `<g transform="rotate(-9 ${n2(rx0)} ${n2(objY)})">` +
      `<rect x="${n2(rx0)}" y="${n2(objY - H * 0.03)}" width="${n2(W * 0.1)}" height="${n2(H * 0.03)}" rx="${n2(H * 0.015)}" fill="${C.sand100}"/>` +
      `<path d="M ${n2(rx0 + W * 0.012)} ${n2(objY - H * 0.03)} v ${n2(H * 0.03)} M ${n2(rx0 + W * 0.05)} ${n2(objY - H * 0.03)} v ${n2(H * 0.03)}" ` +
      `stroke="${C.sand300}" stroke-width="1.6"/>` +
      `<ellipse cx="${n2(rx0 + W * 0.1)}" cy="${n2(objY - H * 0.015)}" rx="${n2(W * 0.006)}" ry="${n2(H * 0.015)}" fill="${C.sand200}"/>` +
      `<path d="M ${n2(rx0 + W * 0.03)} ${n2(objY - H * 0.036)} h ${n2(W * 0.04)}" stroke="${C.terra500}" stroke-width="${n2(H * 0.007)}" stroke-linecap="round"/>` +
      `</g>`,
  );

  motifBand(S, { y: H * 0.9, h: H * 0.1, opacity: 0.04, color: C.terra600, unit: Math.round(H / 16) });
  grade(S, { top: C.teal700, topOpacity: 0.1, bottom: C.gold500, bottomOpacity: 0.1 });
  vignette(S, { strength: 0.34, inner: 0.46 });
  return S;
}

/* ==========================================================================
   10. Brand mark (mirrors src/components/brand/Logo.tsx) and OG lockup
   ========================================================================== */

const MARK = {
  sun: C.terra500,
  faceA: C.gold500,
  faceB: C.gold600,
  wave: C.teal500,
};

/**
 * The 48x48 brand mark, optionally on a rounded-square plate. `waveWidth` is
 * raised for the small favicon frames - at 16px the 2.4 stroke of the full-size
 * mark falls below one device pixel and the wave disappears.
 */
function markSvg({ size = 48, bg = null, radius = 11, pad = 0, markScale = 1, waveWidth = 2.4 }) {
  const inner = 48 * markScale;
  const off = (48 - inner) / 2;
  const marks =
    `<circle cx="24" cy="15" r="8" fill="${MARK.sun}"/>` +
    `<path d="M24 11 L9 38 L24 38 Z" fill="${MARK.faceA}"/>` +
    `<path d="M24 11 L39 38 L24 38 Z" fill="${MARK.faceB}"/>` +
    `<path d="M6 43 q4.5 -3.5 9 0 t9 0 t9 0" stroke="${MARK.wave}" stroke-width="${waveWidth}" ` +
    `stroke-linecap="round" fill="none"/>`;
  const plate = bg
    ? `<rect x="${pad}" y="${pad}" width="${48 - pad * 2}" height="${48 - pad * 2}" rx="${radius}" fill="${bg}"/>`
    : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">` +
    plate +
    `<g transform="translate(${n2(off)} ${n2(off)}) scale(${n2(markScale)})">${marks}</g>` +
    `</svg>`
  );
}

/** Turn PNG buffers into a multi-size .ico (sharp cannot write ICO). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + 16 * entries.length;
  entries.forEach((e, i) => {
    const o = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o); // width  (0 means 256)
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1); // height
    dir.writeUInt8(0, o + 2); // palette size
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.data.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}

/**
 * Open Graph card: a scene, a dark scrim rising from the bottom, then the brand
 * lockup and a one-line Polish title in the lower-left corner.
 */
function ogCard(sceneFn, title, W = 1200, H = 630) {
  const S = sceneFn(W, H);
  // Scrim only where the type sits: a bottom gradient plus a soft corner pool.
  // Anything heavier turns the artwork to mud, which is what an OG card is for.
  const gid = S.uid("ogs");
  S.def(
    linearGrad(gid, [
      [0, C.navy900, 0],
      [0.42, C.navy900, 0.04],
      [0.66, C.navy900, 0.34],
      [0.85, C.navy900, 0.66],
      [1, C.navy900, 0.8],
    ]),
  );
  S.add(`<rect width="${W}" height="${H}" fill="url(#${gid})"/>`);
  const cid = S.uid("ogc");
  S.def(
    radialGrad(
      cid,
      [
        [0, C.navy900, 0.62],
        [0.55, C.navy900, 0.3],
        [1, C.navy900, 0],
      ],
      { cx: 0.14, cy: 0.9, r: 0.62 },
    ),
  );
  S.add(`<rect width="${W}" height="${H}" fill="url(#${cid})"/>`);

  const padX = 72;
  const baseY = H - 78;
  const markSize = 66;
  const markY = baseY - 138;
  // Brand mark, drawn inline at 48-unit scale.
  S.add(
    `<g transform="translate(${padX} ${markY}) scale(${n2(markSize / 48)})">` +
      `<circle cx="24" cy="15" r="8" fill="${MARK.sun}"/>` +
      `<path d="M24 11 L9 38 L24 38 Z" fill="${MARK.faceA}"/>` +
      `<path d="M24 11 L39 38 L24 38 Z" fill="${MARK.faceB}"/>` +
      `<path d="M6 43 q4.5 -3.5 9 0 t9 0 t9 0" stroke="${MARK.wave}" stroke-width="2.4" stroke-linecap="round" fill="none"/>` +
      `</g>`,
  );
  S.add(
    `<text x="${padX + markSize + 20}" y="${markY + 48}" font-family="Georgia, 'Times New Roman', serif" ` +
      `font-size="42" letter-spacing="0.4" fill="${C.sand100}">Egipskie Wakacje</text>`,
  );
  S.add(`<rect x="${padX}" y="${baseY - 66}" width="72" height="4" rx="2" fill="${C.gold500}"/>`);
  // SVG text does not wrap or auto-fit, so step the size down until the title
  // clears the domain label. All current titles stay at 48; this only guards
  // against a longer one being added later and silently colliding.
  const titleRoom = W - padX * 2 - 310;
  let titleSize = 48;
  while (titleSize > 30 && title.length * titleSize * 0.475 > titleRoom) titleSize -= 2;
  S.add(
    `<text x="${padX}" y="${baseY}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" ` +
      `font-size="${titleSize}" font-weight="600" fill="${C.sand50}">${esc(title)}</text>`,
  );
  S.add(
    `<text x="${W - padX}" y="${baseY}" text-anchor="end" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" ` +
      `font-size="24" letter-spacing="2.4" fill="${C.gold400}" opacity="0.92">EGIPSKIEWAKACJE.PL</text>`,
  );
  S.add(`<rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.gold500}" opacity="0.9"/>`);
  return S;
}

/* ==========================================================================
   11. Rasterisation
   ========================================================================== */

const GRAIN_CACHE = new Map();

/**
 * Low-frequency film grain, rendered at half resolution and scaled up so it
 * compresses well and reads as emulsion rather than sensor noise.
 */
async function grainLayer(w, h, seed, alpha) {
  const key = `${w}x${h}:${seed}:${alpha}`;
  if (GRAIN_CACHE.has(key)) return GRAIN_CACHE.get(key);
  const gw = Math.max(4, Math.round(w / 2));
  const gh = Math.max(4, Math.round(h / 2));
  const rng = mulberry32(seed);
  const buf = Buffer.allocUnsafe(gw * gh * 4);
  for (let i = 0; i < gw * gh; i += 1) {
    // Sum of three uniforms ~ a bell curve; sigma stays low so the grain reads
    // as emulsion and does not blow up the encoded file size.
    const v = 128 + (rng() + rng() + rng() - 1.5) * 46;
    const c = v < 0 ? 0 : v > 255 ? 255 : v | 0;
    const o = i * 4;
    buf[o] = c;
    buf[o + 1] = c;
    buf[o + 2] = c;
    buf[o + 3] = alpha;
  }
  const png = await sharp(buf, { raw: { width: gw, height: gh, channels: 4 } })
    .resize(w, h, { kernel: "cubic" })
    .png({ compressionLevel: 1 })
    .toBuffer();
  GRAIN_CACHE.set(key, png);
  return png;
}

/** Render an SVG scene to a flattened RGB pixel buffer with grain applied. */
async function renderScene(S, { grain = 26, debugName } = {}) {
  const svg = S.toSVG();
  if (process.env.MEDIA_DEBUG_SVG && debugName) {
    await mkdir(process.env.MEDIA_DEBUG_SVG, { recursive: true });
    await writeFile(join(process.env.MEDIA_DEBUG_SVG, `${debugName}.svg`), svg);
  }
  // density 72 == 1 CSS px per SVG unit, so the raster matches the declared
  // width/height exactly. The resize is a belt-and-braces guarantee: the
  // dimensions are baked into the markup as width/height attributes.
  const base = sharp(Buffer.from(svg), { density: 72 }).resize(S.W, S.H, { fit: "fill" });
  let pipeline = base;
  if (grain > 0) {
    const overlay = await grainLayer(S.W, S.H, S.seed + 7, grain);
    pipeline = sharp(await base.png({ compressionLevel: 1 }).toBuffer()).composite([
      { input: overlay, blend: "overlay", top: 0, left: 0 },
    ]);
  }
  const { data, info } = await pipeline
    .flatten({ background: C.navy900 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, info };
}

const written = [];

async function writeOut(relPath, buf) {
  const abs = join(PUBLIC, relPath);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, buf);
  written.push({ path: `public/${relPath}`, bytes: buf.length });
  return abs;
}

const AVIF = { quality: 50, effort: 6, chromaSubsampling: "4:2:0" };
const WEBP = { quality: 72, effort: 6, smartSubsample: true };
const JPG = { quality: 80, mozjpeg: true, chromaSubsampling: "4:2:0", progressive: true };

/** Write the AVIF / WebP / JPG triplet the site's <picture> elements expect. */
async function emitTriplet(basePath, S, opts) {
  const { data, info } = await renderScene(S, { ...opts, debugName: basePath.replace(/\//g, "_") });
  const src = () => sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
  const [avif, webp, jpg] = await Promise.all([
    src().avif(AVIF).toBuffer(),
    src().webp(WEBP).toBuffer(),
    src().jpeg(JPG).toBuffer(),
  ]);
  await writeOut(`${basePath}.avif`, avif);
  await writeOut(`${basePath}.webp`, webp);
  await writeOut(`${basePath}.jpg`, jpg);
}

async function emitJpg(relPath, S, opts) {
  const { data, info } = await renderScene(S, opts);
  const jpg = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .jpeg({ ...JPG, quality: 82 })
    .toBuffer();
  await writeOut(relPath, jpg);
}

/* ==========================================================================
   12. Manifest + main
   ========================================================================== */

const SCENES = [
  { base: "media/hero/hero-poster", w: 1920, h: 1080, fn: sceneHero },
  { base: "media/destinations/hurghada", w: 1600, h: 1000, fn: sceneHurghada },
  { base: "media/destinations/marsa-alam", w: 1600, h: 1000, fn: sceneMarsaAlam },
  { base: "media/destinations/sharm-el-sheikh", w: 1600, h: 1000, fn: sceneSharm },
  { base: "media/tours/hurghada-kair", w: 1600, h: 1000, fn: sceneGizaGolden },
  { base: "media/tours/marsa-alam-kair", w: 1600, h: 1000, fn: sceneOldCairo },
  { base: "media/tours/sharm-kair", w: 1600, h: 1000, fn: sceneMuseumExterior },
  { base: "media/cairo/giza", w: 1200, h: 800, fn: sceneGizaDunes },
  { base: "media/cairo/museum", w: 1200, h: 800, fn: sceneMuseumInterior },
  { base: "media/cairo/sphinx", w: 1200, h: 800, fn: sceneSphinx },
  { base: "media/cairo/nile", w: 1200, h: 800, fn: sceneNile },
  { base: "media/cairo/story", w: 1920, h: 1080, fn: sceneCairoStory },
  { base: "media/blog/co-zabrac-na-wycieczke-do-kairu", w: 1600, h: 900, fn: scenePackingKit },
];

const OG_CARDS = [
  { path: "media/og/default.jpg", fn: sceneHero, title: "Wycieczki fakultatywne w Egipcie" },
  { path: "media/og/hurghada.jpg", fn: sceneHurghada, title: "Wycieczki z Hurghady do Kairu" },
  { path: "media/og/marsa-alam.jpg", fn: sceneMarsaAlam, title: "Wycieczki z Marsa Alam do Kairu" },
  { path: "media/og/sharm-el-sheikh.jpg", fn: sceneSharm, title: "Wycieczki z Sharm el Sheikh" },
  { path: "media/og/poradnik.jpg", fn: scenePackingKit, title: "Poradnik o Egipcie" },
];

async function generateIcons() {
  // Vector favicon.
  await writeOut(
    "icon.svg",
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="img" aria-label="Egipskie Wakacje">` +
        `<title>Egipskie Wakacje</title>` +
        `<rect width="48" height="48" rx="11" fill="${C.sand50}"/>` +
        `<circle cx="24" cy="15" r="8" fill="${MARK.sun}"/>` +
        `<path d="M24 11 L9 38 L24 38 Z" fill="${MARK.faceA}"/>` +
        `<path d="M24 11 L39 38 L24 38 Z" fill="${MARK.faceB}"/>` +
        `<path d="M6 43 q4.5 -3.5 9 0 t9 0 t9 0" stroke="${MARK.wave}" stroke-width="2.4" ` +
        `stroke-linecap="round" fill="none"/></svg>\n`,
    ),
  );

  // favicon.ico - 16/32/48 PNG frames wrapped in a hand-written ICO container.
  const icoSizes = [16, 32, 48];
  const frames = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      data: await sharp(
        Buffer.from(
          markSvg({ size: size * 4, bg: C.sand50, radius: 11, waveWidth: size <= 32 ? 3.6 : 2.8 }),
        ),
      )
        .resize(size, size, { kernel: "lanczos3" })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer(),
    })),
  );
  await writeOut("favicon.ico", buildIco(frames));

  // Opaque navy platform icons; maskable-safe padding on the PWA sizes.
  const onNavy = async (px, markScale) =>
    sharp(Buffer.from(markSvg({ size: px * 2, markScale })))
      .resize(px, px, { kernel: "lanczos3" })
      .flatten({ background: C.navy900 })
      .png({ compressionLevel: 9, effort: 10, palette: true, quality: 92 })
      .toBuffer();

  await writeOut("apple-touch-icon.png", await onNavy(180, 0.78));
  await writeOut("icon-192.png", await onNavy(192, 0.62)); // 62% keeps the mark inside the maskable safe zone
  await writeOut("icon-512.png", await onNavy(512, 0.62));
}

async function main() {
  const t0 = Date.now();
  // Optional substring filters, e.g. `node scripts/generate-media.mjs sphinx og`
  // regenerate only the matching outputs while art-directing.
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const wanted = (name) => only.length === 0 || only.some((o) => name.includes(o));
  console.log("Generating original artwork (no stock, no network)...\n");

  for (const s of SCENES) {
    if (!wanted(s.base)) continue;
    const started = Date.now();
    await emitTriplet(s.base, s.fn(s.w, s.h));
    console.log(`  scene  ${s.base}  ${s.w}x${s.h}  ${Date.now() - started}ms`);
  }

  for (const og of OG_CARDS) {
    if (!wanted(og.path)) continue;
    await emitJpg(og.path, ogCard(og.fn, og.title));
    console.log(`  og     ${og.path}`);
  }

  if (wanted("media/hero/hero-source.png")) {
    // High-resolution still that feeds the hero video.
    const heroSrc = sceneHero(2400, 1350);
    const { data, info } = await renderScene(heroSrc);
    const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .png({ compressionLevel: 9, effort: 10, palette: true, quality: 96, dither: 0.6 })
      .toBuffer();
    await writeOut("media/hero/hero-source.png", png);
    console.log("  still  media/hero/hero-source.png  2400x1350");
  }

  if (wanted("icon")) {
    await generateIcons();
    console.log("  icons  icon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png");
  }

  const total = written.reduce((a, f) => a + f.bytes, 0);
  console.log(`\n${written.length} files, ${(total / 1024 / 1024).toFixed(2)} MB, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  const widest = Math.max(...written.map((f) => f.path.length));
  written
    .slice()
    .sort((a, b) => b.bytes - a.bytes)
    .forEach((f) => console.log(`  ${f.path.padEnd(widest)}  ${String(f.bytes).padStart(9)} B`));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
