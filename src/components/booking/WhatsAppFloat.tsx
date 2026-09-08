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
import { track } from "@/lib/analytics";
import styles from "./WhatsAppFloat.module.css";

/**
 * Site-wide floating WhatsApp contact button. This is a CONTACT/QUESTION click,
 * never a completed booking - it fires `whatsapp_floating_click` and carries a
 * route/context-aware question message (page title + current URL only, never
 * booking data). Shared page components register their title via
 * <WhatsAppContextSetter>; unregistered routes fall back to home vs. generic.
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Napisz do nas na WhatsApp"
      onClick={() => track("whatsapp_floating_click", { source: "floating" })}
    >
      <span className={styles.icon}>
        <IconWhatsApp />
      </span>
      <span className={styles.label}>Napisz na WhatsApp</span>
    </a>
  );
}
