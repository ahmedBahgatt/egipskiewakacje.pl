"use client";

import { useEffect } from "react";
import {
  getWhatsAppContext,
  setWhatsAppContext,
  type WhatsAppContextValue,
} from "@/lib/whatsappContext";

/**
 * Registers the current page's WhatsApp question context (type + title) so the
 * global floating button can build a context-aware message. Renders nothing.
 *
 * Cleanup only clears the store when it still holds THIS registration, so a
 * client-side navigation whose new page already registered its own context is
 * not clobbered by the old page's unmount cleanup.
 */
export function WhatsAppContextSetter({ type, title }: WhatsAppContextValue) {
  useEffect(() => {
    const value: WhatsAppContextValue = { type, title };
    setWhatsAppContext(value);
    return () => {
      if (getWhatsAppContext() === value) setWhatsAppContext(null);
    };
  }, [type, title]);

  return null;
}
