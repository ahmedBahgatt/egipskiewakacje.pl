"use client";

import { useEffect } from "react";
import styles from "./StickyBookingBar.module.css";

/**
 * Mobile-only sticky booking CTA. Scrolls to the in-page booking form rather
 * than covering it. While mounted it raises the floating WhatsApp button (via
 * --float-offset) so the two never overlap, and it respects safe-area insets.
 */
export function StickyBookingBar({ priceLabel, targetId }: { priceLabel: string; targetId: string }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--float-offset", "68px");
    return () => {
      document.documentElement.style.removeProperty("--float-offset");
    };
  }, []);

  return (
    <div className={styles.bar}>
      <div className={styles.price}>
        <span className={styles.value}>{priceLabel}</span>
        <span className={styles.unit}>/ dorosły</span>
      </div>
      <a href={`#${targetId}`} className={styles.cta}>
        Zarezerwuj wycieczkę
      </a>
    </div>
  );
}
