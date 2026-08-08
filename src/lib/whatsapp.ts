import { siteConfig, whatsappLink } from "@/content/config";

/**
 * WhatsApp booking message construction. Pure, fully unit-tested. The number and
 * encoding live in one place (siteConfig / whatsappLink) so they cannot drift.
 */

export interface BookingMessageInput {
  tourTitle: string;
  departure: string;
  date: string;
  hotel: string;
  adults: number;
  /** Already-formatted children summary, or empty for "brak". */
  childrenSummary?: string;
  name: string;
  notes?: string;
  /** Canonical URL of the page the booking was started from. */
  pageUrl: string;
}

/** Build the human-readable Polish booking message (before URL-encoding). */
export function buildBookingMessage(input: BookingMessageInput): string {
  const children = input.childrenSummary?.trim() ? input.childrenSummary.trim() : "brak";
  const notes = input.notes?.trim() ? input.notes.trim() : "brak";

  return [
    "Cześć! Chcę sprawdzić dostępność wycieczki.",
    "",
    `Wycieczka: ${input.tourTitle}`,
    `Miejsce wyjazdu: ${input.departure}`,
    `Data: ${input.date}`,
    `Hotel: ${input.hotel}`,
    `Dorośli: ${input.adults}`,
    `Dzieci i wiek: ${children}`,
    `Imię: ${input.name}`,
    `Uwagi: ${notes}`,
    `Strona: ${input.pageUrl}`,
    "",
    "Proszę o potwierdzenie dostępności, godziny odbioru i ceny.",
  ].join("\n");
}

/** Build the full wa.me deep link with the encoded booking message. */
export function buildBookingWhatsappUrl(input: BookingMessageInput): string {
  return whatsappLink(buildBookingMessage(input));
}

/** Generic contact link (no booking payload) for the floating button etc. */
export function contactWhatsappUrl(prefill?: string): string {
  return whatsappLink(prefill);
}

/** Summarise children + ages into the message-ready Polish fragment. */
export function formatChildrenSummary(childrenCount: number, ages: number[]): string {
  if (!childrenCount || childrenCount < 1) return "";
  const cleanAges = ages.filter((a) => Number.isFinite(a) && a >= 0);
  if (cleanAges.length === 0) return `${childrenCount}`;
  return `${childrenCount} (wiek: ${cleanAges.join(", ")})`;
}

export const WHATSAPP_NUMBER = siteConfig.whatsappNumber;
