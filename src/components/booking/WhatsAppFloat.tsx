"use client";

import { IconWhatsApp } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import styles from "./WhatsAppFloat.module.css";

/**
 * Site-wide floating WhatsApp contact button. This is a CONTACT click, not a
 * completed booking - it fires `whatsapp_floating_click`, never a conversion.
 */
export function WhatsAppFloat() {
  return (
    <a
      className={styles.float}
      href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
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
