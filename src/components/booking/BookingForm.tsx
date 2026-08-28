"use client";

import { useMemo, useState } from "react";
import { validateBooking, toISODate, type BookingField } from "@/lib/validation";
import { buildBookingWhatsappUrl, formatChildrenSummary } from "@/lib/whatsapp";
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
    name: `${p}name`,
    date: `${p}date`,
    hotel: `${p}hotel`,
    adults: `${p}adults`,
    children: `${p}children`,
    childrenAges: `${p}age-0`,
  };

  const todayISO = useMemo(() => toISODate(new Date()), []);
  const [tourSlug, setTourSlug] = useState(fixedTourSlug ?? tours[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [hotel, setHotel] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<(number | null)[]>([]);
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [started, setStarted] = useState(false);

  const activeTour = tours.find((t) => t.slug === tourSlug) ?? tours[0];

  function onFirstInteraction() {
    if (started) return;
    setStarted(true);
    track("booking_form_start", activeTour ? { tour_slug: activeTour.slug, destination: activeTour.destination } : undefined);
  }

  function setChildCount(n: number) {
    const count = Math.max(0, Math.min(10, n));
    setChildren(count);
    setChildrenAges((prev) => {
      const next = prev.slice(0, count);
      while (next.length < count) next.push(null);
      return next;
    });
  }

  function setAge(i: number, value: string) {
    setChildrenAges((prev) => {
      const next = [...prev];
      next[i] = value === "" ? null : Number(value);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = { name, date, hotel, adults, children, childrenAges, notes };
    const result = validateBooking(values);

    if (!result.valid) {
      setErrors(result.errors);
      const analyticsCtx = activeTour
        ? { tour_slug: activeTour.slug, destination: activeTour.destination }
        : {};
      track("booking_form_validation_error", {
        ...analyticsCtx,
        ...(result.firstInvalidField ? { error_field: result.firstInvalidField } : {}),
      });
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
      childrenSummary: formatChildrenSummary(
        children,
        childrenAges.filter((a): a is number => a !== null),
      ),
      name,
      notes,
      pageUrl: absoluteUrl(tour.canonicalPath),
    });

    track("booking_form_valid", { tour_slug: tour.slug, destination: tour.destination });
    track("booking_whatsapp_open", { tour_slug: tour.slug, destination: tour.destination });
    // Opened from the validated user action so popup blockers do not interfere.
    window.open(url, "_blank", "noopener,noreferrer");
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

        <div className={styles.field}>
          <label htmlFor={fieldId.name}>
            Imię <span className={styles.req}>*</span>
          </label>
          <input
            id={fieldId.name}
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={onFirstInteraction}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${fieldId.name}-err` : undefined}
          />
          {err("name")}
        </div>

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
            <label htmlFor={fieldId.children}>Liczba dzieci</label>
            <input
              id={fieldId.children}
              type="number"
              inputMode="numeric"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildCount(Number(e.target.value))}
              onFocus={onFirstInteraction}
              aria-describedby={`${p}children-hint`}
            />
            <span id={`${p}children-hint`} className={styles.hint}>
              Dzieci poniżej 5 lat bezpłatnie
            </span>
          </div>
        </div>

        {children > 0 && (
          <fieldset className={styles.ages}>
            <legend>
              Wiek dzieci <span className={styles.req}>*</span>
            </legend>
            <div className={styles.ageGrid}>
              {Array.from({ length: children }).map((_, i) => (
                <div key={i} className={styles.ageItem}>
                  <label htmlFor={`${p}age-${i}`}>Dziecko {i + 1}</label>
                  <input
                    id={`${p}age-${i}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={17}
                    value={childrenAges[i] ?? ""}
                    onChange={(e) => setAge(i, e.target.value)}
                    aria-invalid={!!errors.childrenAges}
                    aria-describedby={errors.childrenAges ? `${fieldId.childrenAges}-err` : undefined}
                  />
                </div>
              ))}
            </div>
            {err("childrenAges")}
          </fieldset>
        )}

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
          Wyślij zapytanie przez WhatsApp
        </button>
        <p className={styles.disclaimer}>
          Bez przedpłaty - płacisz dopiero przy rozpoczęciu wycieczki. Szczegóły potwierdzimy na
          WhatsApp.
        </p>
      </div>
    </form>
  );
}
