"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookingForm, type BookingTourOption } from "./BookingForm";
import { IconX } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import styles from "./StickyBookingBar.module.css";

/**
 * Mobile-only booking entry. A compact single-row bar (price + primary CTA) that
 * opens a full-height accessible booking sheet with the shared BookingForm.
 * While mounted it flags `body[data-tour-page]` so the global WhatsApp FAB is
 * lifted clear of this bar on mobile (see WhatsAppFloat.module.css) - both stay
 * reachable and never overlap.
 */
export function StickyBookingBar({
  priceValue,
  priceCaption,
  priceCaptionShort,
  bookingOption,
  tourTitle,
}: {
  priceValue: string;
  priceCaption?: string;
  priceCaptionShort?: string;
  bookingOption: BookingTourOption;
  tourTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  // Flag tour pages so the global WhatsApp FAB lifts above this bar on mobile.
  useEffect(() => {
    document.body.dataset.tourPage = "true";
    return () => {
      delete document.body.dataset.tourPage;
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Scroll-lock + focus management while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const opener = openerRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open, close]);

  function openSheet() {
    setOpen(true);
    track("booking_sheet_open", {
      tour_slug: bookingOption.slug,
      destination: bookingOption.destination,
    });
  }

  return (
    <>
      <div className={styles.bar} data-sticky-booking>
        <div className={styles.price}>
          <span className={styles.value}>{priceValue}</span>
          {priceCaption ? (
            <span className={styles.unit}>
              <span className={styles.unitLong}>{priceCaption}</span>
              {priceCaptionShort ? (
                <span className={styles.unitShort}>{priceCaptionShort}</span>
              ) : null}
            </span>
          ) : null}
        </div>
        <button ref={openerRef} type="button" className={styles.cta} onClick={openSheet}>
          Zarezerwuj
        </button>
      </div>

      {mounted && open
        ? createPortal(
            <div className={styles.overlay} onClick={close}>
              <div
                ref={panelRef}
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.panelHead}>
                  <h2 id={titleId} className={styles.panelTitle}>
                    Zarezerwuj wycieczkę
                  </h2>
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="Zamknij"
                    onClick={close}
                  >
                    <IconX />
                  </button>
                </div>
                <p className={styles.panelTour}>{tourTitle}</p>
                <div className={styles.panelBody}>
                  <BookingForm
                    tours={[bookingOption]}
                    fixedTourSlug={bookingOption.slug}
                    variant="panel"
                    idPrefix="bfm-"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
