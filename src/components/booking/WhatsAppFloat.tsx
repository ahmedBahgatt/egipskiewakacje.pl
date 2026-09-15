"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { IconWhatsApp } from "@/components/ui/icons";
import { buildQuestionWhatsappUrl, type QuestionContext } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import {
  getServerWhatsAppContext,
  getWhatsAppContext,
  subscribeWhatsAppContext,
} from "@/lib/whatsappContext";
import styles from "./WhatsAppFloat.module.css";

/**
 * Site-wide floating WhatsApp contact button. This is a CONTACT/QUESTION intent,
 * never a completed booking. It carries a route/context-aware question message
 * (page title + current URL only, never booking data). Shared page components
 * register their title via <WhatsAppContextSetter>; unregistered routes fall
 * back to home vs. generic.
 *
 * Analytics is centralised: the data-* attributes below are read by the global
 * delegated click listener (see AnalyticsRuntime), which fires cta_click +
 * whatsapp_click (placement=floating_fab, intent=enquiry). The listener never
 * reads the href, so the message text can never reach GA4.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const registered = useSyncExternalStore(
    subscribeWhatsAppContext,
    getWhatsAppContext,
    getServerWhatsAppContext,
  );

  const url = absoluteUrl(pathname || "/");
  const ctx: QuestionContext = registered
    ? { type: registered.type, title: registered.title, url }
    : { type: pathname === "/" ? "home" : "other", url };

  return (
    <a
      className={styles.float}
      href={buildQuestionWhatsappUrl(ctx)}
      rel="noopener noreferrer"
      aria-label="Napisz do nas na WhatsApp"
      data-cta-id="floating_whatsapp"
      data-cta-type="whatsapp"
      data-placement="floating_fab"
      data-wa-intent="enquiry"
    >
      <span className={styles.icon}>
        <IconWhatsApp />
      </span>
      <span className={styles.label}>Napisz na WhatsApp</span>
    </a>
  );
}
