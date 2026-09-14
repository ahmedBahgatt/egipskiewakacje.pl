/**
 * Google Analytics 4 + Consent Mode v2 constants and consent persistence.
 *
 * The Measurement ID is PUBLIC configuration (inlined into the static export),
 * not a secret. There is exactly ONE GA4 installation for the whole site.
 *
 * Consent model (analytics-only, EU/EEA default-deny):
 *  - Defaults are set to `denied` for every storage type BEFORE gtag.js runs
 *    (see GoogleAnalytics.tsx bootstrap).
 *  - Accepting analytics upgrades ONLY `analytics_storage` to `granted`.
 *  - Advertising consents (`ad_storage`, `ad_user_data`, `ad_personalization`)
 *    stay `denied` - the site runs no advertising/personalisation storage.
 */

export const GA_MEASUREMENT_ID = "G-TH6P4SF2SN";

/**
 * First-party preference key. Versioned so the consent model can change later
 * (bump the suffix to re-prompt everyone). Stores ONLY the choice - never an
 * identifier, never anything derived from user input.
 */
export const CONSENT_STORAGE_KEY = "ew_consent_v1";

export type ConsentChoice = "granted" | "denied";

/** Read the persisted analytics choice. Returns null when unset or unreadable. */
export function readStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Persist the analytics choice. Silently no-ops if storage is unavailable. */
export function storeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* private mode / blocked storage - the in-memory session choice still applies */
  }
}

/**
 * Push a Consent Mode v2 update to gtag. Only `analytics_storage` ever changes;
 * advertising consents are left at their denied default.
 */
export function updateAnalyticsConsent(choice: ConsentChoice): void {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", { analytics_storage: choice });
  }
}

/** DOM event the footer "Ustawienia cookies" control dispatches to reopen the banner. */
export const OPEN_CONSENT_EVENT = "ew:open-consent";
