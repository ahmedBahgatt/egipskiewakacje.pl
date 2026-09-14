/**
 * Privacy-first GA4 analytics layer. ONE small reusable abstraction; call sites
 * never touch `gtag` directly.
 *
 * Guarantees:
 *  - Fails harmlessly if gtag is unavailable (true no-op, never throws).
 *  - Respects Consent Mode automatically: events are handed to gtag, which
 *    withholds identifiers while `analytics_storage` is denied. No custom
 *    endpoint or workaround ever bypasses a denied choice.
 *  - NEVER forwards PII. Only an allow-list of non-PII keys survives the
 *    sanitiser, so a careless caller cannot leak name/hotel/phone/notes/ages,
 *    the prefilled WhatsApp message, or any full wa.me URL.
 *  - `page_path` is always the pathname only - never a query string that could
 *    carry personal data.
 *
 * `page_view` is intentionally NOT emitted here: GA4 config + Enhanced
 * Measurement own page views (initial load + History API navigations), so there
 * is exactly one logical page_view per page state. See ANALYTICS.md.
 */

/** GA4 recommended event (`generate_lead`) plus the site's custom business events. */
export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "booking_open"
  | "generate_lead"
  | "phone_click"
  | "email_click"
  | "tour_card_click";

/** ONLY these keys may ever reach GA4. Everything else is dropped. All non-PII. */
const ALLOWED_KEYS = [
  "page_path", // pathname only (no query string)
  "page_type", // homepage | destination | tour | listing | category | guide | contact | booking | legal | other
  "tour_slug", // public tour identifier
  "destination", // hurghada | marsa-alam | sharm-el-sheikh
  "placement", // stable UI location, e.g. floating_fab, quick_question, booking_form
  "cta_id", // stable CTA identifier, e.g. homepage_whatsapp
  "cta_type", // whatsapp | booking | contact | tour | destination | phone | email
  "whatsapp_intent", // enquiry | booking
  "lead_source", // e.g. whatsapp_booking_form
] as const;

export type SafeKey = (typeof ALLOWED_KEYS)[number];
export type SafeParams = Partial<Record<SafeKey, string | number>>;

/** Defensive allow-list: keep only permitted primitive keys, drop everything else. */
function sanitize(params?: SafeParams): SafeParams {
  const out: SafeParams = {};
  if (!params) return out;
  for (const key of ALLOWED_KEYS) {
    const v = params[key];
    if (v === undefined || v === null) continue;
    if (typeof v === "string" || typeof v === "number") out[key] = v;
  }
  return out;
}

export type PageType =
  | "homepage"
  | "destination"
  | "tour"
  | "listing"
  | "category"
  | "guide"
  | "contact"
  | "booking"
  | "legal"
  | "other";

/** Departure-resort route bases mapped to their stable destination slug. */
const DESTINATION_ROUTES: Record<string, string> = {
  "wycieczki-z-hurghady": "hurghada",
  "wycieczki-z-marsa-alam": "marsa-alam",
  "wycieczki-z-sharm-el-sheikh": "sharm-el-sheikh",
};

const LEGAL_ROUTES = new Set([
  "polityka-prywatnosci",
  "polityka-cookies",
  "regulamin",
]);

export interface PageContext {
  page_type: PageType;
  tour_slug?: string;
  destination?: string;
}

/**
 * Derive safe page context from the route ONLY (never scraped page text).
 * A destination route base (one segment) is a `destination`; the same base with
 * a tour slug (two segments) is a `tour` and yields both destination + slug.
 */
export function pageContext(pathname: string): PageContext {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return { page_type: "homepage" };

  const [first, second] = segments;

  if (first in DESTINATION_ROUTES) {
    const destination = DESTINATION_ROUTES[first];
    if (second) return { page_type: "tour", destination, tour_slug: second };
    return { page_type: "destination", destination };
  }

  if (first === "wycieczki") {
    return { page_type: second ? "category" : "listing" };
  }
  if (first === "poradnik") return { page_type: "guide" };
  if (first === "kontakt") return { page_type: "contact" };
  if (first === "rezerwacja") return { page_type: "booking" };
  if (LEGAL_ROUTES.has(first)) return { page_type: "legal" };

  return { page_type: "other" };
}

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

/**
 * Track a business event. Auto-injects safe route context (page_path/page_type
 * and, on tour/destination routes, tour_slug/destination); explicit params win.
 * No-op when gtag is unavailable. Always PII-safe. Never throws.
 */
export function track(event: AnalyticsEvent, params?: SafeParams): void {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname;
  const ctx = pageContext(pathname);
  const merged: SafeParams = {
    page_path: pathname,
    page_type: ctx.page_type,
    ...(ctx.tour_slug ? { tour_slug: ctx.tour_slug } : {}),
    ...(ctx.destination ? { destination: ctx.destination } : {}),
    ...params, // explicit context (e.g. a card's own slug) overrides route context
  };
  const safe = sanitize(merged);

  try {
    const w = window as GtagWindow;
    if (typeof w.gtag === "function") {
      w.gtag("event", event, safe);
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...safe });
    } else if (process.env.NODE_ENV === "development") {
      console.debug("[analytics:noop]", event, safe);
    }
  } catch {
    /* analytics must never break the UI */
  }
}

/** Exposed for tests: prove the sanitiser drops disallowed keys. */
export const __analyticsInternals = { sanitize, ALLOWED_KEYS };
