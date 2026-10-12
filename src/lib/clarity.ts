/**
 * Microsoft Clarity project constant.
 *
 * The Project ID is PUBLIC configuration (inlined into the static export),
 * not a secret. There is exactly ONE Clarity installation for the whole site.
 *
 * Consent model: Clarity's own Consent Signal enforcement (live since
 * 2025-10-31) automatically withholds cookies and recording for visitors from
 * the EEA, the United Kingdom and Switzerland until consent is signalled. That
 * region is the same one the site's GA4 Consent Mode default denies (see
 * GoogleAnalytics.tsx `DENIED_REGION`), so Clarity behaves consistently with
 * the existing analytics posture out of the box: no consent UI, no `clarity()`
 * consent override, cookieless for in-region visitors. See MicrosoftClarity.tsx.
 */

export const CLARITY_PROJECT_ID = "ywr4k7f4mn";
