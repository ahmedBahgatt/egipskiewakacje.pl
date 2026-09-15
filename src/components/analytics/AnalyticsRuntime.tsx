"use client";

import { useEffect } from "react";
import { track, type SafeParams } from "@/lib/analytics";

/**
 * Single client-side analytics runtime, mounted once in the root layout.
 *
 * A delegated document click listener owns `cta_click`, `whatsapp_click`,
 * `tour_card_click`, `phone_click` and `email_click` for every annotated
 * anchor/button site-wide. It reads ONLY `data-*` attributes - never the `href`
 * - so a prefilled WhatsApp message or booking URL can never reach GA4.
 * Centralising here means one logical interaction fires each event exactly once,
 * with no duplicate handlers to drift.
 *
 * No consent UI: analytics runs under advanced Consent Mode with storage
 * permanently denied (cookieless), so there is no banner and no visitor
 * decision to wait for. gtag itself withholds identifiers/cookies while
 * `analytics_storage` is denied; events still send as cookieless pings.
 */
export function AnalyticsRuntime() {
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const target = e.target as Element | null;
      const el = target?.closest?.("[data-cta-id],[data-card]");
      if (!(el instanceof HTMLElement)) return;

      const d = el.dataset;
      const ctx: SafeParams = {};
      if (d.tourSlug) ctx.tour_slug = d.tourSlug;
      if (d.destination) ctx.destination = d.destination;
      if (d.placement) ctx.placement = d.placement;

      if (d.card === "tour") {
        track("tour_card_click", ctx);
        return;
      }

      const ctaId = d.ctaId;
      if (!ctaId) return;
      const ctaType = d.ctaType;

      track("cta_click", { ...ctx, cta_id: ctaId, ...(ctaType ? { cta_type: ctaType } : {}) });
      if (d.waIntent) track("whatsapp_click", { ...ctx, whatsapp_intent: d.waIntent });
      if (ctaType === "phone") track("phone_click", ctx);
      if (ctaType === "email") track("email_click", ctx);
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return null;
}
