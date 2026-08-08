/**
 * Content adapter - the ONLY module pages import to read content.
 *
 * Two modes, selected by NEXT_PUBLIC_CONTENT_SOURCE:
 *   - "local"  (default): typed source files in ./local. No network, no secrets.
 *   - "sanity"         : GROQ over the public read-only Sanity CDN, mapped and
 *                        validated at build time (see ./sanity/adapter).
 *
 * Sanity mode is authoritative: it never silently falls back to local content, so
 * a broken query or an incomplete document fails the build instead of shipping
 * stale local prices. Flip production by setting the repo variable
 * NEXT_PUBLIC_CONTENT_SOURCE=sanity once the dataset is seeded (see SANITY_SETUP.md).
 */
import type { ContentApi } from "@/content/api";

import { destinations as localDestinations } from "@/content/local/destinations";
import {
  tours as localTours,
  getFeaturedTours as localFeatured,
} from "@/content/local/tours";
import { posts as localPosts } from "@/content/local/posts";
import { legalPages as localLegal } from "@/content/local/legal";
import { siteSettings, siteFaqs, reviews as localReviews } from "@/content/local/site";
import { sanityApi } from "@/content/sanity/adapter";

const MODE = (process.env.NEXT_PUBLIC_CONTENT_SOURCE ?? "local").toLowerCase();

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

export const content: ContentApi = MODE === "sanity" ? sanityApi : localApi;
export type { ContentApi };
