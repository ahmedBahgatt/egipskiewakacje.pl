/**
 * Booking form validation. Pure and deterministic (accepts `today` for tests).
 * The form must NOT open WhatsApp unless this returns `valid: true`.
 */

export interface BookingValues {
  name: string;
  date: string; // ISO yyyy-mm-dd from <input type="date">
  hotel: string;
  adults: number;
  children: number;
  /** One age per child; required when children > 0. */
  childrenAges: (number | null)[];
  notes?: string;
}

export type BookingField =
  | "name"
  | "date"
  | "hotel"
  | "adults"
  | "children"
  | "childrenAges";

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<BookingField, string>>;
  /** First field (in visual order) with an error, for focus management. */
  firstInvalidField: BookingField | null;
}

const FIELD_ORDER: BookingField[] = [
  "name",
  "date",
  "hotel",
  "adults",
  "children",
  "childrenAges",
];

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

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Podaj imię (min. 2 znaki).";
  }

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

  // Children's ages become REQUIRED when at least one child is selected.
  if (Number.isFinite(values.children) && values.children > 0) {
    const provided = values.childrenAges.slice(0, values.children);
    const allValid =
      provided.length === values.children &&
      provided.every((a) => a !== null && Number.isFinite(a) && a >= 0 && a <= 17);
    if (!allValid) {
      errors.childrenAges = "Podaj wiek każdego dziecka (0-17 lat).";
    }
  }

  const firstInvalidField = FIELD_ORDER.find((f) => errors[f]) ?? null;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    firstInvalidField,
  };
}
