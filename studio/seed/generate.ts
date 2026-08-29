/**
 * Programmatic seed generator - the SINGLE source of the Sanity migration.
 *
 * Reads the frontend's proven local content (src/content/local/*) and emits a
 * faithful Sanity payload to studio/seed/data.generated.json. seed.mjs then
 * uploads the images and writes the documents (createOrReplace, deterministic
 * ids -> idempotent, never duplicates).
 *
 *   cd studio && npm install          # tsx + @sanity/client
 *   npm run seed:dry                  # generate + plan, no writes
 *   SANITY_WRITE_TOKEN=sk... npm run seed
 *
 * Why generate instead of hand-writing data.mjs: there are 78 tours, and the
 * local files are the live production content. Regenerating guarantees byte
 * parity (Cairo/Orange Bay gold-standard included) and cannot drift.
 *
 * IMAGES: every MediaImage becomes a marker { _type:"image", _upload:<path>, alt }.
 * The path is relative to /public/media and points at ONE master JPG per image
 * (the largest generated width). seed.mjs uploads it once (SHA-1 dedup) and the
 * CDN generates delivery sizes at read time (see src/content/sanity/image.ts).
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { writeFileSync } from "node:fs";

import type {
  BlogPost,
  CategorySlug,
  Destination,
  LegalPage,
  MediaImage,
  PostBlock,
  Tour,
} from "@/content/types";
import { tours } from "@/content/local/tours";
import { destinations } from "@/content/local/destinations";
import { categories as richCategories } from "@/content/local/categories";
import { categoryLabel } from "@/lib/categories";
import { posts } from "@/content/local/posts";
import { legalPages } from "@/content/local/legal";
import { siteSettings as localSettings, siteFaqs } from "@/content/local/site";

type Doc = Record<string, unknown>;

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "data.generated.json");
const AUTHOR_ID = "author.zespol";

// --- markers / refs ---------------------------------------------------------

const slugVal = (current: string) => ({ _type: "slug", current });
const ref = (id: string) => ({ _type: "reference", _ref: id });
const weakRef = (id: string) => ({ _type: "reference", _ref: id, _weak: true });

/**
 * Tour ids are keyed on destination+slug: the same slug (e.g. "kair-samolotem")
 * is reused across the three destinations, so `tour.<slug>` alone collides. The
 * full route stays globally unique; the doc id mirrors it.
 */
const tourDocId = (t: Tour) => `tour.${t.destination}.${t.slug}`;

// Bare-slug -> tour id, for editorial cross-links (relatedTourSlugs, related-tour
// blocks) which reference tours by slug only. On the rare cross-destination
// collision the first tour wins - the same first-match the frontend's
// getTour(slug) already resolves those links to.
const slugToId = new Map<string, string>();
for (const t of tours) if (!slugToId.has(t.slug)) slugToId.set(t.slug, tourDocId(t));
const resolveTourRef = (slug: string) => weakRef(slugToId.get(slug) ?? `tour.${slug}`);

/** Largest master JPG for an image, relative to /public/media. */
function masterPath(m: MediaImage): string {
  const rel = m.src.replace(/^\/media\//, "").replace(/^\//, "");
  if (Array.isArray(m.widths) && m.widths.length > 0) {
    return `${rel}-${Math.max(...m.widths)}.jpg`;
  }
  return `${rel}.jpg`;
}

function imgMarker(m: MediaImage): Doc {
  const alt = m.alt && m.alt.length >= 5 ? m.alt : "Egipskie Wakacje";
  return { _type: "image", _upload: masterPath(m), alt };
}

/** OG image paths already carry an extension; alt must satisfy the schema (>=5). */
function ogMarker(path: string | undefined, alt: string | undefined): Doc | undefined {
  if (!path) return undefined;
  const rel = path.replace(/^\/media\//, "").replace(/^\//, "");
  const a = alt && alt.length >= 5 ? alt : "Egipskie Wakacje - wycieczki fakultatywne w Egipcie";
  return { _type: "image", _upload: rel, alt: a };
}

// --- body blocks (blogPost + legalPage) -------------------------------------

function mapBlock(b: PostBlock): Doc | null {
  switch (b.type) {
    case "heading":
      return { _type: "blockHeading", text: b.text, anchor: slugVal(b.id) };
    case "paragraph":
      return { _type: "blockParagraph", text: b.text };
    case "list":
      return { _type: "blockList", ordered: !!b.ordered, items: b.items };
    case "callout":
      return { _type: "blockCallout", tone: b.tone, text: b.text };
    case "image":
      return { _type: "blockImage", image: imgMarker(b.image), ...(b.caption ? { caption: b.caption } : {}) };
    case "gallery":
      return { _type: "blockGallery", images: b.images.map(imgMarker) };
    case "quote":
      return { _type: "blockQuote", text: b.text, ...(b.cite ? { cite: b.cite } : {}) };
    case "table":
      return {
        _type: "blockTable",
        ...(b.caption ? { caption: b.caption } : {}),
        headers: b.headers,
        rows: b.rows.map((cells) => ({ _type: "tableRow", cells })),
      };
    case "linkButton":
      return { _type: "blockLinkButton", label: b.label, href: b.href, external: b.external };
    case "relatedTour":
      return { _type: "blockRelatedTour", tour: resolveTourRef(b.tourSlug) };
    default:
      return null;
  }
}

// --- documents --------------------------------------------------------------

const siteSettingsDoc: Doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: localSettings.title,
  tagline: localSettings.tagline,
  description: localSettings.description,
  whatsappNumber: localSettings.whatsappNumber,
};

const authorDoc: Doc = {
  _id: AUTHOR_ID,
  _type: "author",
  name: "Zespół Egipskie Wakacje",
  role: "Redakcja",
  bio: "Treści przygotowuje zespół Egipskie Wakacje na podstawie programów wycieczek i informacji potwierdzanych u operatora. Ceny i szczegóły weryfikujemy przed publikacją i podajemy datę ostatniej weryfikacji.",
};

/**
 * One tourCategory document per CategorySlug actually used by a tour, so every
 * `tour.category` reference resolves. The taxonomy (routeBase / images / hub
 * copy) stays code-owned in src/lib/categories.ts + content/local/categories.ts;
 * these docs exist as reference targets and grouping in the Studio. The doc slug
 * equals the CategorySlug so GROQ `category[0]->slug.current` returns it.
 */
const usedCategories = [...new Set(tours.map((t) => t.category))] as CategorySlug[];
const categoryDocs: Doc[] = usedCategories.map((cat) => {
  const rich = richCategories.find((c) => c.slug === cat);
  return {
    _id: `tourCategory.${cat}`,
    _type: "tourCategory",
    title: rich?.name ?? categoryLabel[cat],
    slug: slugVal(cat),
    ...(rich?.description ? { description: rich.description } : {}),
  };
});

function destinationDoc(d: Destination): Doc {
  return {
    _id: `destination.${d.slug}`,
    _type: "destination",
    name: d.name,
    nameGenitive: d.nameGenitive,
    ...(d.heroTitle ? { heroTitle: d.heroTitle } : {}),
    slug: slugVal(d.slug),
    routeBase: d.routeBase,
    shortIntro: d.shortIntro,
    practical: d.practical,
    heroImage: imgMarker(d.heroImage),
    faqs: d.faqs.map((f) => ({ _type: "faqItem", question: f.question, answer: f.answer })),
    primaryQuery: d.primaryQuery,
    seoTitle: d.seo.title,
    seoDescription: d.seo.description,
    canonicalPath: d.seo.canonicalPath,
    // OG alt must equal what buildMetadata computes locally: ogImageAlt ?? seo.title.
    ...(ogMarker(d.seo.ogImage, d.seo.ogImageAlt ?? d.seo.title)
      ? { ogImage: ogMarker(d.seo.ogImage, d.seo.ogImageAlt ?? d.seo.title) }
      : {}),
  };
}

function tourDoc(t: Tour): Doc {
  const p = t.price;
  return {
    _id: tourDocId(t),
    _type: "tour",
    title: t.title,
    h1: t.h1,
    slug: slugVal(t.slug),
    route: t.route,
    destination: ref(`destination.${t.destination}`),
    departure: t.departure,
    category: [ref(`tourCategory.${t.category}`)],
    shortDescription: t.shortDescription,
    overview: t.overview,
    highlights: t.highlights,
    ...(t.attractions?.length
      ? { attractions: t.attractions.map((a) => ({ _type: "tourAttraction", title: a.title, body: a.body })) }
      : {}),
    ...(t.planningNote ? { planningNote: t.planningNote } : {}),
    ...(t.compare
      ? { compare: { _type: "tourCompare", note: t.compare.note, linkLabel: t.compare.linkLabel, href: t.compare.href } }
      : {}),
    heroImage: imgMarker(t.heroImage),
    ...(t.gallery?.length ? { gallery: t.gallery.map(imgMarker) } : {}),
    // --- price ---
    priceMode: p.mode,
    priceAmount: p.amount,
    priceUnit: p.unit,
    currency: p.currency,
    priceFrom: p.from,
    priceLastVerifiedAt: p.lastVerifiedAt,
    priceOptions: p.options.map((o) => ({
      _type: "priceOption",
      label: o.label,
      amount: o.amount,
      currency: o.currency,
      ...(o.unit ? { unit: o.unit } : {}),
      ...(o.note ? { note: o.note } : {}),
      ...(o.free ? { free: true } : {}),
    })),
    ...(typeof p.childAgeMin === "number" ? { priceChildAgeMin: p.childAgeMin } : {}),
    ...(p.infantFree !== undefined ? { priceInfantFree: p.infantFree } : {}),
    ...(p.note ? { priceNote: p.note } : {}),
    ...(t.transferSupplements.length
      ? { transferSupplements: t.transferSupplements.map((s) => ({ _type: "transferSupplement", zone: s.zone, amount: s.amount })) }
      : {}),
    ...(t.extras.length
      ? { extras: t.extras.map((e) => ({ _type: "labelledNote", label: e.label, note: e.note })) }
      : {}),
    // --- logistics ---
    availabilityLabel: t.availabilityLabel,
    availabilityDays: t.availabilityDays,
    durationLabel: t.durationLabel,
    pickupTime: t.pickupLabel,
    ...(t.returnLabel ? { returnTime: t.returnLabel } : {}),
    transport: t.transport,
    guideLanguageLabel: t.guide.label,
    guidePolishConfirmed: t.guide.polishConfirmed,
    // --- program ---
    itinerary: t.itinerary.map((s) => ({
      _type: "itineraryStep",
      ...(s.time ? { time: s.time } : {}),
      title: s.title,
      description: s.description,
    })),
    included: t.included,
    excluded: t.excluded,
    ...(t.whatToBring.length ? { whatToBring: t.whatToBring } : {}),
    ...(t.requirements.length ? { requirements: t.requirements } : {}),
    cancellationPolicy: t.cancellationPolicy,
    faqs: t.faqs.map((f) => ({ _type: "faqItem", question: f.question, answer: f.answer })),
    // --- relations ---
    featured: t.featured,
    ...(t.relatedPostSlug ? { relatedPost: weakRef(`blogPost.${t.relatedPostSlug}`) } : {}),
    // --- seo ---
    seoTitle: t.seo.title,
    seoDescription: t.seo.description,
    canonicalPath: t.seo.canonicalPath,
    ...(ogMarker(t.seo.ogImage, t.seo.ogImageAlt ?? t.seo.title)
      ? { ogImage: ogMarker(t.seo.ogImage, t.seo.ogImageAlt ?? t.seo.title) }
      : {}),
    ...(t.seo.type ? { ogType: t.seo.type } : {}),
    published: true,
    updatedAt: t.updatedAt,
  };
}

function postDoc(p: BlogPost): Doc {
  return {
    _id: `blogPost.${p.slug}`,
    _type: "blogPost",
    title: p.title,
    h1: p.h1,
    slug: slugVal(p.slug),
    route: p.route,
    excerpt: p.excerpt,
    directAnswer: p.directAnswer,
    featuredImage: imgMarker(p.featuredImage),
    category: p.category,
    body: p.body.map(mapBlock).filter(Boolean),
    faqs: p.faqs.map((f) => ({ _type: "faqItem", question: f.question, answer: f.answer })),
    ...(p.sources.length
      ? { sources: p.sources.map((s) => ({ _type: "labelledNote", label: s.label, note: s.note })) }
      : {}),
    author: ref(AUTHOR_ID),
    ...(p.relatedDestination ? { relatedDestination: weakRef(`destination.${p.relatedDestination}`) } : {}),
    ...(p.relatedTourSlugs.length ? { relatedTours: p.relatedTourSlugs.map(resolveTourRef) } : {}),
    seoTitle: p.seo.title,
    seoDescription: p.seo.description,
    canonicalPath: p.seo.canonicalPath,
    ...(ogMarker(p.seo.ogImage, p.seo.ogImageAlt ?? p.seo.title)
      ? { ogImage: ogMarker(p.seo.ogImage, p.seo.ogImageAlt ?? p.seo.title) }
      : {}),
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    published: true,
  };
}

function legalDoc(l: LegalPage): Doc {
  return {
    _id: `legalPage.${l.slug}`,
    _type: "legalPage",
    title: l.title,
    slug: slugVal(l.slug),
    route: l.route,
    updatedAt: l.updatedAt,
    body: l.body.map(mapBlock).filter(Boolean),
    seoTitle: l.seo.title,
    seoDescription: l.seo.description,
    canonicalPath: l.seo.canonicalPath,
  };
}

const faqDocs: Doc[] = siteFaqs.map((f, i) => ({
  _id: `faq.site-${i}`,
  _type: "faq",
  question: f.question,
  answer: f.answer,
  scope: "site",
}));

// --- assemble ---------------------------------------------------------------

const seedDocuments: Doc[] = [
  siteSettingsDoc,
  authorDoc,
  ...categoryDocs,
  ...destinations.map(destinationDoc),
  ...tours.map(tourDoc),
  ...posts.map(postDoc),
  ...legalPages.map(legalDoc),
  ...faqDocs,
];

// Guard: no duplicate ids, no duplicate canonical routes (QA §77).
const ids = seedDocuments.map((d) => d._id as string);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupIds.length) throw new Error(`Duplicate document ids: ${[...new Set(dupIds)].join(", ")}`);

const canonicals = tours.map((t) => t.route);
const dupRoutes = canonicals.filter((r, i) => canonicals.indexOf(r) !== i);
if (dupRoutes.length) throw new Error(`Duplicate tour routes: ${[...new Set(dupRoutes)].join(", ")}`);

writeFileSync(OUT, JSON.stringify(seedDocuments, null, 2) + "\n", "utf8");

const byType = seedDocuments.reduce<Record<string, number>>((acc, d) => {
  acc[d._type as string] = (acc[d._type as string] ?? 0) + 1;
  return acc;
}, {});

console.log(`Generated ${seedDocuments.length} documents -> ${OUT}`);
for (const [type, n] of Object.entries(byType).sort()) console.log(`  ${type.padEnd(14)} ${n}`);
console.log(`Tours: ${tours.length} | categories used: ${usedCategories.length} | destinations: ${destinations.length}`);
