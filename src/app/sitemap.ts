import type { MetadataRoute } from "next";
import { content } from "@/content";
import { absoluteUrl } from "@/content/config";

export const dynamic = "force-static";

/**
 * Static sitemap. With output: export this is rendered to /sitemap.xml at build.
 * Only indexable public routes are listed - no filter/query combinations.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, destinations, categories, posts, legal] = await Promise.all([
    content.getTours(),
    content.getDestinations(),
    content.getCategories(),
    content.getPosts(),
    content.getLegalPages(),
  ]);

  const today = "2026-08-09";

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/wycieczki/", priority: 0.9, freq: "weekly" },
    { path: "/cennik/", priority: 0.8, freq: "weekly" },
    { path: "/poradnik/", priority: 0.6, freq: "weekly" },
    { path: "/o-nas/", priority: 0.4, freq: "monthly" },
    { path: "/faq/", priority: 0.5, freq: "monthly" },
    { path: "/kontakt/", priority: 0.5, freq: "monthly" },
    { path: "/rezerwacja/", priority: 0.7, freq: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const p of staticPages) {
    entries.push({
      url: absoluteUrl(p.path),
      lastModified: today,
      changeFrequency: p.freq,
      priority: p.priority,
    });
  }

  for (const d of destinations) {
    entries.push({
      url: absoluteUrl(d.seo.canonicalPath),
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const c of categories) {
    entries.push({
      url: absoluteUrl(c.seo.canonicalPath),
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const t of tours) {
    entries.push({
      url: absoluteUrl(t.seo.canonicalPath),
      lastModified: t.updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const post of posts) {
    entries.push({
      url: absoluteUrl(post.seo.canonicalPath),
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const l of legal) {
    entries.push({
      url: absoluteUrl(l.seo.canonicalPath),
      lastModified: l.updatedAt,
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return entries;
}
