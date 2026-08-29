/**
 * 78/78 parity gate (SANITY_SETUP.md phase D / task §53-54).
 *
 * Fetches the LIVE Sanity dataset through the exact frontend GROQ + mapper the
 * static build uses, then diffs every tour against the local source of truth.
 * Exits non-zero on any mismatch, missing tour, or duplicate canonical route -
 * so it can gate a cutover.
 *
 *   cd studio && npm run parity            # after the seed has run
 *
 * Reads the public dataset anonymously (no token needed); the dataset must be
 * public (Manage -> API -> Dataset visibility), which it already is.
 */
import { GROQ } from "@/content/sanity/queries";
import { mapTour, mapDestination } from "@/content/sanity/map";
import { tours as localTours } from "@/content/local/tours";
import { destinations as localDestinations } from "@/content/local/destinations";
import type { Tour } from "@/content/types";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ej04dib0";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
// This dataset requires auth to read content; the seed loads studio/.env.local.
const TOKEN =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN;
const HOST = TOKEN ? "api" : "apicdn";

async function query<T>(groq: string): Promise<T> {
  const url =
    `https://${PROJECT_ID}.${HOST}.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?perspective=published&query=${encodeURIComponent(groq)}`;
  const res = await fetch(url, TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : undefined);
  if (!res.ok) throw new Error(`Sanity query HTTP ${res.status}`);
  const json = (await res.json()) as { result?: T };
  return json.result as T;
}

/** The fields whose drift would be a real regression. */
function fingerprint(t: Tour) {
  return {
    route: t.route,
    title: t.title,
    h1: t.h1,
    destination: t.destination,
    category: t.category,
    priceAmount: t.price.amount,
    priceUnit: t.price.unit,
    priceCurrency: t.price.currency,
    priceFrom: t.price.from,
    priceOptions: t.price.options.map((o) => `${o.label}=${o.free ? "free" : o.amount}`).join("|"),
    childAgeMin: t.price.childAgeMin ?? null,
    durationLabel: t.durationLabel,
    availabilityLabel: t.availabilityLabel,
    availabilityDays: (t.availabilityDays ?? []).join(","),
    pickupLabel: t.pickupLabel,
    guide: `${t.guide.label}/${t.guide.polishConfirmed}`,
    featured: t.featured,
    heroAlt: t.heroImage.alt,
    galleryCount: t.gallery.length,
    itineraryCount: t.itinerary.length,
    faqCount: t.faqs.length,
    canonical: t.seo.canonicalPath,
    seoTitle: t.seo.title,
    seoType: t.seo.type ?? null,
    included: t.included.length,
    excluded: t.excluded.length,
    transfers: t.transferSupplements.map((s) => `${s.zone}=${s.amount}`).join("|"),
  };
}

function diff(a: Record<string, unknown>, b: Record<string, unknown>): string[] {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: string[] = [];
  for (const k of keys) {
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
      out.push(`    ${k}: local=${JSON.stringify(a[k])} sanity=${JSON.stringify(b[k])}`);
    }
  }
  return out;
}

async function main() {
const rawTours = (await query<unknown[]>(GROQ.tours)) ?? [];
const sanityTours = rawTours
  .map((r) => mapTour(r as Parameters<typeof mapTour>[0]))
  .filter((t): t is Tour => t !== null);

const rawDest = (await query<unknown[]>(GROQ.destinations)) ?? [];
const sanityDest = rawDest
  .map((r) => mapDestination(r as Parameters<typeof mapDestination>[0]))
  .filter((d): d is NonNullable<ReturnType<typeof mapDestination>> => d !== null);

const problems: string[] = [];

// Count
if (sanityTours.length !== localTours.length) {
  problems.push(`TOUR COUNT: local=${localTours.length} sanity=${sanityTours.length}`);
}
if (sanityDest.length !== localDestinations.length) {
  problems.push(`DESTINATION COUNT: local=${localDestinations.length} sanity=${sanityDest.length}`);
}

// Canonical route uniqueness in Sanity output (§77)
const routes = sanityTours.map((t) => t.route);
const dupRoutes = [...new Set(routes.filter((r, i) => routes.indexOf(r) !== i))];
if (dupRoutes.length) problems.push(`DUPLICATE CANONICAL ROUTES: ${dupRoutes.join(", ")}`);

// Per-tour field parity, keyed on ROUTE (unique; slugs repeat across destinations).
const sanityByRoute = new Map(sanityTours.map((t) => [t.route, t]));
let matched = 0;
for (const local of localTours) {
  const s = sanityByRoute.get(local.route);
  if (!s) {
    problems.push(`MISSING IN SANITY: ${local.route}`);
    continue;
  }
  const d = diff(fingerprint(local), fingerprint(s));
  if (d.length) {
    problems.push(`MISMATCH ${local.route}:\n${d.join("\n")}`);
  } else {
    matched++;
  }
}
for (const s of sanityTours) {
  if (!localTours.find((l) => l.route === s.route)) {
    problems.push(`EXTRA IN SANITY (not in local): ${s.route}`);
  }
}

console.log(`Parity: ${matched}/${localTours.length} tours match exactly.`);
console.log(`Destinations: ${sanityDest.length}/${localDestinations.length}.`);

if (problems.length) {
  console.error(`\nFAIL - ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(p);
  process.exit(1);
}
console.log("\nPASS - 78/78 parity, no canonical duplicates, destinations complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
