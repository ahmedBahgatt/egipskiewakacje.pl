/**
 * Booking form validation. Pure and deterministic (accepts `today` for tests).
 * The form must NOT open WhatsApp unless this returns `valid: true`.
 *
 * Minimum-friction booking: no name, no per-child ages. `children` is the count
 * of paying children aged 5-11 only (under-5s are free and not collected).
 */

export interface BookingValues {
  date: string; // ISO yyyy-mm-dd from <input type="date">
  hotel: string;
  adults: number;
  /** Paying children aged 5-11. */
  children: number;
  notes?: string;
}

export type BookingField = "date" | "hotel" | "adults" | "children";

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<BookingField, string>>;
  /** First field (in visual order) with an error, for focus management. */
  firstInvalidField: BookingField | null;
}

const FIELD_ORDER: BookingField[] = ["date", "hotel", "adults", "children"];

/** yyyy-mm-dd for a given date, in local time. */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function validateBooking(
  values: BookingValues,
  today: Date = new Date(),
): ValidationResult {
  const errors: Partial<Record<BookingField, string>> = {};

  if (!values.date) {
    errors.date = "Wybierz datę wycieczki.";
  } else {
    const picked = values.date;
    const isValidShape = /^\d{4}-\d{2}-\d{2}$/.test(picked);
    if (!isValidShape || Number.isNaN(Date.parse(picked))) {
      errors.date = "Podaj poprawną datę.";
    } else if (picked < toISODate(today)) {
      errors.date = "Data nie może być z przeszłości.";
    }
  }

  if (!values.hotel || values.hotel.trim().length < 2) {
    errors.hotel = "Podaj nazwę hotelu.";
  }

  if (!Number.isFinite(values.adults) || values.adults < 1) {
    errors.adults = "Wymagany co najmniej 1 dorosły.";
  }

  if (!Number.isFinite(values.children) || values.children < 0) {
    errors.children = "Podaj liczbę dzieci (0 lub więcej).";
  }

  const firstInvalidField = FIELD_ORDER.find((f) => errors[f]) ?? null;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    firstInvalidField,
  };
}
