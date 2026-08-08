/**
 * Read-only Sanity adapter. Uses plain fetch against the public apicdn endpoint
 * (no @sanity/client dependency, no token). Returns null on any error so the
 * content adapter can fall back to local content and never break the build.
 *
 * NOTE: This becomes fully useful only after the new schema is deployed and the
 * dataset is seeded (see SANITY_SETUP.md). Until then, the site runs in local
 * mode and this file is dormant.
 */
import { GROQ } from "@/content/sanity/queries";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ej04dib0";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

type Collection = keyof typeof GROQ;

export async function fetchFromSanity<T>(collection: Collection): Promise<T | null> {
  const query = GROQ[collection];
  if (!query) return null;
  const url =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { next: { revalidate: false } });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}
