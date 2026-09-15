"use client";

import { useMemo, useState } from "react";
import { validateBooking, toISODate, type BookingField } from "@/lib/validation";
import { buildBookingWhatsappUrl, openWhatsApp } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import { track } from "@/lib/analytics";
import { IconWhatsApp } from "@/components/ui/icons";
import styles from "./BookingForm.module.css";

export interface BookingTourOption {
  slug: string;
  title: string;
  departure: string;
  destination: string;
  canonicalPath: string;
}

interface Props {
  tours: BookingTourOption[];
  /** When set, the tour is fixed (tour page) and no selector is shown. */
  fixedTourSlug?: string;
  variant?: "panel" | "page";
  /**
   * Prefix for every field id. Lets a page host two instances (inline + mobile
   * sheet) without duplicate ids. Defaults to the historical "bf-".
   */
  idPrefix?: string;
}

export function BookingForm({ tours, fixedTourSlug, variant = "page", idPrefix = "bf-" }: Props) {
  const p = idPrefix;
  const fieldId: Record<BookingField, string> = {
    date: `${p}date`,
    hotel: `${p}hotel`,
    adults: `${p}adults`,
    children: `${p}children`,
  };

  const todayISO = useMemo(() => toISODate(new Date()), []);
  const [tourSlug, setTourSlug] = useState(fixedTourSlug ?? tours[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [hotel, setHotel] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [started, setStarted] = useState(false);

  const activeTour = tours.find((t) => t.slug === tourSlug) ?? tours[0];

  function onFirstInteraction() {
    if (started) return;
    setStarted(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = { date, hotel, adults, children, notes };
    const result = validateBooking(values);

    if (!result.valid) {
      // A failed submit is NOT a conversion: no generate_lead, no whatsapp_click.
      setErrors(result.errors);
      if (result.firstInvalidField) {
        const el = document.getElementById(fieldId[result.firstInvalidField]);
        el?.focus();
      }
      return; // MUST NOT open WhatsApp on invalid form
    }

    setErrors({});
    const tour = activeTour!;
    const url = buildBookingWhatsappUrl({
      tourTitle: tour.title,
      departure: tour.departure,
      date,
      hotel,
      adults,
      children,
      notes,
      pageUrl: absoluteUrl(tour.canonicalPath),
    });

    // One valid final handoff = three distinct meanings, each fired exactly once:
    // the button click (cta_click), the WhatsApp handoff (whatsapp_click), and the
    // completed enquiry flow (generate_lead). No PII / no message text is sent.
    const leadCtx = {
      tour_slug: tour.slug,
      destination: tour.destination,
      placement: "booking_form",
    } as const;
    track("cta_click", { ...leadCtx, cta_id: "booking_submit", cta_type: "booking" });
    track("whatsapp_click", { ...leadCtx, whatsapp_intent: "booking" });
    track("generate_lead", { ...leadCtx, lead_source: "whatsapp_booking_form" });
    // Same-context handoff from the validated submit: never popup-blocked, and
    // the cleanest trigger for native App/Universal Link interception. Analytics
    // above is already queued (sendBeacon) before this navigation. See openWhatsApp.
    openWhatsApp(url);
  }

  const err = (f: BookingField) =>
    errors[f] ? (
      <span id={`${fieldId[f]}-err`} className={styles.error} role="alert">
        {errors[f]}
      </span>
    ) : null;

  return (
    <form className={`${styles.form} ${variant === "panel" ? styles.panel : ""}`} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        {!fixedTourSlug && tours.length > 1 && (
          <div className={styles.field}>
            <label htmlFor={`${p}tour`}>Wycieczka</label>
            <select
              id={`${p}tour`}
              value={tourSlug}
              onChange={(e) => setTourSlug(e.target.value)}
              onFocus={onFirstInteraction}
            >
              {tours.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId.date}>
              Data wycieczki <span className={styles.req}>*</span>
            </label>
            <input
              id={fieldId.date}
              type="date"
              min={todayISO}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={onFirstInteraction}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? `${fieldId.date}-err` : undefined}
            />
            {err("date")}
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId.hotel}>
              Hotel <span className={styles.req}>*</span>
            </label>
            <input
              id={fieldId.hotel}
              type="text"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              onFocus={onFirstInteraction}
              placeholder="Nazwa hotelu i strefa"
              aria-invalid={!!errors.hotel}
              aria-describedby={errors.hotel ? `${fieldId.hotel}-err` : undefined}
            />
            {err("hotel")}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={fieldId.adults}>
              Liczba dorosłych <span className={styles.req}>*</span>
            </label>
            <input
              id={fieldId.adults}
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              onFocus={onFirstInteraction}
              aria-invalid={!!errors.adults}
              aria-describedby={errors.adults ? `${fieldId.adults}-err` : undefined}
            />
            {err("adults")}
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId.children}>Dzieci 5–11 lat</label>
            <input
              id={fieldId.children}
              type="number"
              inputMode="numeric"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
              onFocus={onFirstInteraction}
            />
          </div>
        </div>

        {/* Optional notes are collapsed by default so the initial form is shorter. */}
        {notesOpen ? (
          <div className={styles.field}>
            <label htmlFor={`${p}notes`}>Uwagi (opcjonalnie)</label>
            <textarea
              id={`${p}notes`}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onFocus={onFirstInteraction}
              placeholder="Np. preferowana godzina odbioru, pytania"
            />
          </div>
        ) : (
          <button
            type="button"
            className={styles.addNotes}
            aria-expanded={false}
            aria-controls={`${p}notes`}
            onClick={() => {
              setNotesOpen(true);
              onFirstInteraction();
            }}
          >
            + Dodaj uwagi
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          <IconWhatsApp />
          Wyślij rezerwację przez WhatsApp
        </button>
        <p className={styles.disclaimer}>
          Bez przedpłaty - płacisz dopiero przy rozpoczęciu wycieczki. Szczegóły potwierdzimy na
          WhatsApp.
        </p>
      </div>
    </form>
  );
}
