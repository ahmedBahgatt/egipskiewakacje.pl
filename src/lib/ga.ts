/**
 * Google Analytics 4 constant.
 *
 * The Measurement ID is PUBLIC configuration (inlined into the static export),
 * not a secret. There is exactly ONE GA4 installation for the whole site.
 *
 * Consent model: advanced Consent Mode with storage PERMANENTLY denied
 * (analytics_storage / ad_storage / ad_user_data / ad_personalization = denied).
 * The site sets no analytics or advertising cookies and shows no consent UI;
 * GA4 receives cookieless measurement pings only. See GoogleAnalytics.tsx.
 */

export const GA_MEASUREMENT_ID = "G-TH6P4SF2SN";
