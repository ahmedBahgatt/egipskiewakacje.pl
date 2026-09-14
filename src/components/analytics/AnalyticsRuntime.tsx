"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track, type SafeParams } from "@/lib/analytics";
import {
  OPEN_CONSENT_EVENT,
  readStoredConsent,
  storeConsent,
  updateAnalyticsConsent,
  type ConsentChoice,
} from "@/lib/ga";
import styles from "./AnalyticsRuntime.module.css";

/**
 * Single client-side analytics runtime, mounted once in the root layout.
 *
 *  1. A delegated document click listener owns `cta_click`, `whatsapp_click`,
 *     `tour_card_click`, `phone_click` and `email_click` for every annotated
 *     anchor/button site-wide (data-* attributes only - it NEVER reads href
 *     text, so the prefilled WhatsApp message can never leak). Centralising here
 *     means one logical interaction fires each event exactly once, with no
 *     duplicate handlers to drift.
 *  2. The Consent Mode v2 banner: analytics denied by default, Accept upgrades
 *     analytics_storage to granted, Reject keeps it denied, and the choice is
 *     persisted so the banner does not reappear.
 */
export function AnalyticsRuntime() {
  const [mounted, setMounted] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  // Delegated click tracking. Attached once; independent of consent state
  // (gtag withholds identifiers itself while analytics_storage is denied).
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

  // Restore the stored choice after mount (client-only; avoids hydration drift).
  useEffect(() => {
    setMounted(true);
    const stored = readStoredConsent();
    setChoice(stored);
    if (stored === null) setOpen(true); // first visit: prompt
  }, []);

  // Footer "Ustawienia cookies" reopens the banner.
  useEffect(() => {
    function reopen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Move focus to the primary action only when reopened via the settings control
  // (never steal focus on the first automatic appearance).
  useEffect(() => {
    if (open && choice !== null) acceptRef.current?.focus();
  }, [open, choice]);

  const decide = useCallback((next: ConsentChoice) => {
    updateAnalyticsConsent(next);
    storeConsent(next);
    setChoice(next);
    setOpen(false);
  }, []);

  if (!mounted || !open) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="Zgoda na analitykę"
    >
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>Analityka strony</p>
          <p className={styles.body}>
            Używamy Google Analytics, aby lepiej rozumieć korzystanie z serwisu. Możesz zaakceptować
            lub odrzucić analitykę. Rezerwacja i kontakt przez WhatsApp działają niezależnie od tego
            wyboru.{" "}
            <Link href="/polityka-cookies/" className={styles.link}>
              Polityka cookies
            </Link>
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.reject}
            onClick={() => decide("denied")}
          >
            Odrzucam
          </button>
          <button
            ref={acceptRef}
            type="button"
            className={styles.accept}
            onClick={() => decide("granted")}
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
