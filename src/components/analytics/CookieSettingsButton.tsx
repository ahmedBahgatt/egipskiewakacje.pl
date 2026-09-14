"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/ga";

/**
 * Reopens the analytics-consent banner so a visitor can change their choice
 * (Accept <-> Reject) at any time. Lives in the footer next to the legal links.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      Ustawienia cookies
    </button>
  );
}
