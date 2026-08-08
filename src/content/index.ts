/**
 * Content adapter - the ONLY module pages import to read content.
 *
 * Two modes, selected by NEXT_PUBLIC_CONTENT_SOURCE:
 *   - "local"  (default): typed source files in ./local. No network, no secrets.
 *   - "sanity"         : GROQ over the public read-only Sanity CDN (post-seed).
 *
 * Every accessor is async so the two modes share one call signature. The public
 * site ships in "local" mode; "sanity" activates once the dataset is seeded with
 * the new schema (see SANITY_SETUP.md). If sanity mode is selected but returns
 * nothing, we fall back to local so the site never breaks.
 */
import type {
  BlogPost,
  Destination,
  FaqItem,
  LegalPage,
  Review,
  SiteSettings,
  Tour,
} from "@/content/types";

import { destinations as localDestinations } from "@/content/local/destinations";
import {
  tours as localTours,
  getFeaturedTours as localFeatured,
} from "@/content/local/tours";
import { posts as localPosts } from "@/content/local/posts";
import { legalPages as localLegal } from "@/content/local/legal";
import { siteSettings, siteFaqs, reviews as localReviews } from "@/content/local/site";
import { fetchFromSanity } from "@/content/sanity/adapter";

const MODE = (process.env.NEXT_PUBLIC_CONTENT_SOURCE ?? "local").toLowerCase();

export interface ContentApi {
  getSiteSettings(): Promise<SiteSettings>;
  getSiteFaqs(): Promise<FaqItem[]>;
  getReviews(): Promise<Review[]>;
  getDestinations(): Promise<Destination[]>;
  getDestination(slug: string): Promise<Destination | undefined>;
  getTours(): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  getTour(slug: string): Promise<Tour | undefined>;
  getToursByDestination(slug: string): Promise<Tour[]>;
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | undefined>;
  getLegalPages(): Promise<LegalPage[]>;
  getLegalPage(slug: string): Promise<LegalPage | undefined>;
}

const localApi: ContentApi = {
  async getSiteSettings() {
    return siteSettings;
  },
  async getSiteFaqs() {
    return siteFaqs;
  },
  async getReviews() {
    return localReviews.filter((r) => r.verified);
  },
  async getDestinations() {
    return localDestinations;
  },
  async getDestination(slug) {
    return localDestinations.find((d) => d.slug === slug);
  },
  async getTours() {
    return localTours;
  },
  async getFeaturedTours() {
    return localFeatured();
  },
  async getTour(slug) {
    return localTours.find((t) => t.slug === slug);
  },
  async getToursByDestination(slug) {
    return localTours.filter((t) => t.destination === slug);
  },
  async getPosts() {
    return localPosts;
  },
  async getPost(slug) {
    return localPosts.find((p) => p.slug === slug);
  },
  async getLegalPages() {
    return localLegal;
  },
  async getLegalPage(slug) {
    return localLegal.find((p) => p.slug === slug);
  },
};

/**
 * Sanity mode wraps local mode: any collection the dataset does not yet provide
 * transparently falls back to the local content, so a partially-seeded dataset
 * still yields a complete site.
 */
const sanityApi: ContentApi = {
  ...localApi,
  async getTours() {
    const remote = await fetchFromSanity<Tour[]>("tours");
    return remote && remote.length ? remote : localTours;
  },
  async getTour(slug) {
    const remote = await fetchFromSanity<Tour[]>("tours");
    return (remote ?? localTours).find((t) => t.slug === slug);
  },
  async getPosts() {
    const remote = await fetchFromSanity<BlogPost[]>("posts");
    return remote && remote.length ? remote : localPosts;
  },
};

export const content: ContentApi = MODE === "sanity" ? sanityApi : localApi;
