/**
 * Central site configuration - the single source of truth for brand-level
 * constants. The WhatsApp number lives here ONCE and is imported everywhere;
 * it must never be hardcoded in components.
 */

export const siteConfig = {
  name: "Egipskie Wakacje",
  shortName: "Egipskie Wakacje",
  domain: "egipskiewakacje.pl",
  url: "https://egipskiewakacje.pl",
  locale: "pl_PL",
  lang: "pl",

  /**
   * Business WhatsApp number.
   * `whatsappNumber` is the international wa.me format (digits only, no +).
   * `whatsappDisplay` is the human-readable form shown in contact contexts.
   */
  whatsappNumber: "201055850536",
  whatsappDisplay: "+20 105 585 0536",

  /** Main currency for all displayed prices. No PLN conversion in v1. */
  currency: "USD" as const,

  description:
    "Wycieczki fakultatywne w Egipcie dla polskich turystów. Kair i piramidy z Hurghady, Marsa Alam i Sharm el Sheikh. Przejrzyste ceny, odbiór z hotelu, rezerwacja przez WhatsApp.",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Build a wa.me deep link with an optional pre-filled, URL-encoded message.
 * Centralised so number + encoding rules never drift between components.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL helper for canonical tags, sitemap, JSON-LD, assets. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `${siteConfig.url}/`;
  // Files (last segment has an extension, e.g. .jpg/.xml) keep their exact path.
  const lastSegment = clean.split("/").pop() ?? "";
  const isFile = lastSegment.includes(".");
  if (isFile || clean.endsWith("/")) return `${siteConfig.url}${clean}`;
  // Routes enforce trailingSlash parity with next.config.ts (trailingSlash: true).
  return `${siteConfig.url}${clean}/`;
}
