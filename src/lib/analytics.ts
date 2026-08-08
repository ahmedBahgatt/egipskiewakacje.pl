/**
 * Privacy-conscious analytics abstraction.
 *
 * - Does NOTHING harmful when no platform is configured (true no-op, no cookies).
 * - NEVER forwards personal data. Only an allow-list of non-PII keys survives the
 *   sanitiser, so even a careless caller cannot leak name/hotel/phone/notes/ages.
 * - `booking_whatsapp_open` must fire ONLY after validation passes and the valid
 *   WhatsApp action is initiated. `whatsapp_floating_click` is a CONTACT click,
 *   not a booking. `booking_form_validation_error` is NOT a conversion.
 *
 * See ANALYTICS.md for the future GA4/GTM wiring.
 */

export type AnalyticsEvent =
  | "destination_select"
  | "tour_card_view"
  | "tour_details_click"
  | "whatsapp_floating_click"
  | "booking_form_start"
  | "booking_form_validation_error"
  | "booking_form_valid"
  | "booking_whatsapp_open";

/** ONLY these keys may ever reach an analytics platform. Everything else is dropped. */
const ALLOWED_KEYS = [
  "tour_slug",
  "destination",
  "source",
  "position",
  "value", // non-PII numeric context (e.g. a public list price)
  "error_field", // which field failed - the field NAME, never its value
] as const;

export type SafeParams = Partial<Record<(typeof ALLOWED_KEYS)[number], string | number>>;

/** Defensive allow-list: strip anything not explicitly permitted. */
function sanitize(params?: SafeParams): SafeParams {
  const out: SafeParams = {};
  if (!params) return out;
  for (const key of ALLOWED_KEYS) {
    const v = params[key];
    if (v === undefined || v === null) continue;
    // Coerce to primitive; reject objects/arrays entirely.
    if (typeof v === "string" || typeof v === "number") {
      out[key] = v;
    }
  }
  return out;
}

function platformConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GTM_ID);
}

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

/** Track an event. No-op unless a platform is configured. Always PII-safe. */
export function track(event: AnalyticsEvent, params?: SafeParams): void {
  const safe = sanitize(params);

  if (typeof window === "undefined") return;

  if (!platformConfigured()) {
    // No platform => no tracking. Optional local visibility in dev only.
    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics:noop]", event, safe);
    }
    return;
  }

  const w = window as DataLayerWindow;
  if (w.dataLayer) {
    w.dataLayer.push({ event, ...safe });
  } else if (typeof w.gtag === "function") {
    w.gtag("event", event, safe);
  }
}

/** Exposed for tests: prove the sanitiser drops disallowed keys. */
export const __analyticsInternals = { sanitize, ALLOWED_KEYS };
