/**
 * Polish grammatical-number helpers.
 *
 * Polish nouns after a numeral take one of three forms:
 *  - "one"  -> exactly 1                       ("1 wycieczka")
 *  - "few"  -> n % 10 in 2..4, EXCEPT n % 100 in 12..14   ("2/3/4/22/23/24 wycieczki")
 *  - "many" -> everything else: 0, 5..21, 12..14, 25..31, ...  ("5/12/21/25 wycieczek")
 *
 * IMPORTANT: numbers ending in 1 but not equal to 1 (21, 41, 81, 101...) take the
 * "many" (genitive plural) form in standard Polish - i.e. "41 wycieczek", NOT
 * "41 wycieczka". This helper follows standard Polish grammar. (A couple of
 * examples in the original brief listed "41 wycieczka"/"81 wycieczka"; those are
 * non-standard and are intentionally NOT reproduced here.)
 */

export interface PluralForms {
  /** Form for exactly 1. */
  one: string;
  /** Form for 2-4, 22-24, ... (the "few"/paucal form). */
  few: string;
  /** Form for 0, 5-21, and everything else (genitive plural). */
  many: string;
}

/** Pick the correct Polish plural form of a noun for the count `n`. */
export function pluralPl(n: number, forms: PluralForms): string {
  const abs = Math.abs(Math.trunc(n));
  if (abs === 1) return forms.one;
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return forms.few;
  return forms.many;
}

const TOUR_FORMS: PluralForms = { one: "wycieczka", few: "wycieczki", many: "wycieczek" };
const RESORT_FORMS: PluralForms = { one: "kurort", few: "kurorty", many: "kurortów" };

/** Correct form of "wycieczka" for a count, e.g. pluralTours(23) -> "wycieczki". */
export function pluralTours(n: number): string {
  return pluralPl(n, TOUR_FORMS);
}

/** "1 wycieczka" / "23 wycieczki" / "41 wycieczek". */
export function formatTourCount(n: number): string {
  return `${n} ${pluralTours(n)}`;
}

/** Correct form of "kurort" for a count (used e.g. "z 3 kurortów"). */
export function pluralResorts(n: number): string {
  return pluralPl(n, RESORT_FORMS);
}
