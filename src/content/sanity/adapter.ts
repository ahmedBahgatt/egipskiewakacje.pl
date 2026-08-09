/**
 * Read-only Sanity content adapter. Fetches over the public apicdn (no token) at
 * build time and maps to the typed frontend model.
 *
 * Production Sanity mode is STRICT: a network failure or an invalid/incomplete
 * required document THROWS, which fails `next build`. It never silently falls back
 * to local content (that would ship stale prices). Non-critical collections
 * (site FAQs, reviews) may legitimately be empty.
 */
import type { ContentApi } from "@/content/api";
import type { BlogPost, Destination, LegalPage, Tour } from "@/content/types";
import { GROQ } from "./queries";
import {
  mapDestination,
  mapLegal,
  mapPost,
  mapReviews,
  mapSiteFaqs,
  mapSiteSettings,
  mapTour,
} from "./map";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ej04dib0";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

async function sanityQuery<T>(query: string): Promise<T> {
  const url =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  let res: Response;
  try {
    res = await fetch(url, { cache: "force-cache" });
  } catch (err) {
    throw new Error(
      `[content:sanity] Network error querying Sanity (${PROJECT_ID}/${DATASET}): ${String(err)}`,
    );
  }
  if (!res.ok) {
    throw new Error(
      `[content:sanity] Sanity query failed with HTTP ${res.status}. ` +
        `Check NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET and that the dataset is public.`,
    );
  }
  const json = (await res.json()) as { result?: T };
  return json.result as T;
}

/** Throw a clear error if any required document fails to map. */
function mapAllOrThrow<R, T>(raw: R[] | null | undefined, mapper: (r: R) => T | null, label: string): T[] {
  return (raw ?? []).map((r, i) => {
    const m = mapper(r);
    if (!m) {
      throw new Error(
        `[content:sanity] Invalid ${label} document at index ${i}: missing required fields ` +
          `(e.g. image, slug or price). Fix or unpublish it in Sanity, then rebuild.`,
      );
    }
    return m;
  });
}

// --- memoised collection loaders (one fetch each per build) -----------------
let _destinations: Promise<Destination[]> | null = null;
let _tours: Promise<Tour[]> | null = null;
let _posts: Promise<BlogPost[]> | null = null;
let _legal: Promise<LegalPage[]> | null = null;

function loadDestinations(): Promise<Destination[]> {
  _destinations ??= sanityQuery<unknown[]>(GROQ.destinations).then((raw) => {
    const list = mapAllOrThrow(raw, mapDestination as (r: unknown) => Destination | null, "destination");
    if (list.length === 0) {
      throw new Error("[content:sanity] No destinations found. Seed the dataset (see SANITY_SETUP.md).");
    }
    return list;
  });
  return _destinations;
}

function loadTours(): Promise<Tour[]> {
  _tours ??= sanityQuery<unknown[]>(GROQ.tours).then((raw) => {
    const list = mapAllOrThrow(raw, mapTour as (r: unknown) => Tour | null, "tour");
    if (list.length === 0) {
      throw new Error("[content:sanity] No published tours found. Seed/publish tours in Sanity.");
    }
    return list;
  });
  return _tours;
}

function loadPosts(): Promise<BlogPost[]> {
  // Posts may be empty on a brand-new site, but a published-yet-invalid post throws.
  _posts ??= sanityQuery<unknown[]>(GROQ.posts).then((raw) =>
    mapAllOrThrow(raw, mapPost as (r: unknown) => BlogPost | null, "blogPost"),
  );
  return _posts;
}

function loadLegal(): Promise<LegalPage[]> {
  _legal ??= sanityQuery<unknown[]>(GROQ.legalPages).then((raw) =>
    mapAllOrThrow(raw, mapLegal as (r: unknown) => LegalPage | null, "legalPage"),
  );
  return _legal;
}

export const sanityApi: ContentApi = {
  async getSiteSettings() {
    const raw = await sanityQuery<Parameters<typeof mapSiteSettings>[0]>(GROQ.siteSettings);
    const settings = mapSiteSettings(raw);
    if (!settings) {
      throw new Error("[content:sanity] Missing siteSettings document. Seed the dataset.");
    }
    return settings;
  },
  async getSiteFaqs() {
    const raw = await sanityQuery<Parameters<typeof mapSiteFaqs>[0]>(GROQ.siteFaqs);
    return mapSiteFaqs(raw);
  },
  async getReviews() {
    const raw = await sanityQuery<Parameters<typeof mapReviews>[0]>(GROQ.reviews);
    return mapReviews(raw);
  },
  async getDestinations() {
    return loadDestinations();
  },
  async getDestination(slug) {
    return (await loadDestinations()).find((d) => d.slug === slug);
  },
  async getTours() {
    return loadTours();
  },
  async getFeaturedTours() {
    return (await loadTours()).filter((t) => t.featured);
  },
  async getTour(slug) {
    return (await loadTours()).find((t) => t.slug === slug);
  },
  async getToursByDestination(slug) {
    return (await loadTours()).filter((t) => t.destination === slug);
  },
  // Categories are defined locally (taxonomy is code-owned, not a CMS document type
  // in this phase). Kept here so both adapters satisfy the same ContentApi.
  async getCategories() {
    const { categories } = await import("@/content/local/categories");
    return categories;
  },
  async getCategory(slug) {
    const { categories } = await import("@/content/local/categories");
    return categories.find((c) => c.slug === slug);
  },
  async getToursByCategory(slug) {
    return (await loadTours()).filter((t) => t.category === slug);
  },
  async getPosts() {
    return loadPosts();
  },
  async getPost(slug) {
    return (await loadPosts()).find((p) => p.slug === slug);
  },
  async getLegalPages() {
    return loadLegal();
  },
  async getLegalPage(slug) {
    return (await loadLegal()).find((p) => p.slug === slug);
  },
};
