import { siteConfig, whatsappLink } from "@/content/config";

/**
 * WhatsApp message construction. Pure and fully unit-tested. The number and
 * encoding live in one place (siteConfig / whatsappLink) so they cannot drift.
 *
 * Two strictly separate intents:
 *  - BOOKING   -> buildBookingMessage  ("Chcę zarezerwować...", carries form data)
 *  - QUESTION  -> buildQuestionMessage ("Mam pytanie...", carries page context only)
 * A question message must NEVER contain booking data (date/hotel/adults/etc).
 */

export interface BookingMessageInput {
  tourTitle: string;
  departure: string;
  date: string;
  hotel: string;
  adults: number;
  /** Paying children aged 5-11. Under-5s are free and never collected here. */
  children?: number;
  notes?: string;
  /** Canonical URL of the page the booking was started from. */
  pageUrl: string;
}

/**
 * Build the human-readable Polish booking message (before URL-encoding).
 * Booking intent is explicit ("Chcę zarezerwować..."). Only fields the customer
 * actually submitted are included - no placeholder/default rows, no under-5s,
 * no empty optionals. The children line appears only when there is at least one
 * paying child (5-11); notes only when provided.
 */
export function buildBookingMessage(input: BookingMessageInput): string {
  const lines = [
    `Cześć! Chcę zarezerwować wycieczkę „${input.tourTitle}”. Poniżej przesyłam dane rezerwacji:`,
    "",
    `Wycieczka: ${input.tourTitle}`,
    `Miejsce wyjazdu: ${input.departure}`,
    `Data: ${input.date}`,
    `Hotel: ${input.hotel}`,
    `Dorośli: ${input.adults}`,
  ];

  if (typeof input.children === "number" && input.children > 0) {
    lines.push(`Dzieci 5–11 lat: ${input.children}`);
  }

  const notes = input.notes?.trim();
  if (notes) lines.push(`Uwagi: ${notes}`);

  lines.push(`Strona: ${input.pageUrl}`);
  lines.push("", "Proszę o potwierdzenie dostępności, ceny i godziny odbioru.");

  return lines.join("\n");
}

/** Build the full wa.me deep link with the encoded booking message. */
export function buildBookingWhatsappUrl(input: BookingMessageInput): string {
  return whatsappLink(buildBookingMessage(input));
}

/** Page context that a question message is built from (never booking data). */
export type WhatsAppContextType =
  | "tour"
  | "destination"
  | "post"
  | "home"
  | "listing"
  | "other";

export interface QuestionContext {
  type: WhatsAppContextType;
  /**
   * Tour title / destination (genitive form, e.g. "Hurghady") / article title.
   * Ignored for home/other/listing; when a typed context has no title we fall
   * back to the generic "this page" copy so the message is never malformed.
   */
  title?: string;
  /** Absolute URL of the current page. */
  url: string;
}

/**
 * Build the Polish quick-question message (before URL-encoding). Route/context
 * aware: it identifies WHERE the visitor is and always includes the page URL.
 * It carries NO booking data.
 */
export function buildQuestionMessage(ctx: QuestionContext): string {
  const title = ctx.title?.trim();
  const url = ctx.url.trim();

  switch (ctx.type) {
    case "tour":
      if (title) return `Cześć! Mam pytanie dotyczące wycieczki „${title}”.\n${url}`;
      break;
    case "destination":
      if (title) return `Cześć! Mam pytanie dotyczące wycieczek z ${title}.\n${url}`;
      break;
    case "post":
      if (title) return `Cześć! Mam pytanie dotyczące informacji na stronie „${title}”.\n${url}`;
      break;
    case "home":
      return `Cześć! Mam pytanie dotyczące wycieczek w Egipcie.\n${url}`;
  }

  // listing / other, or a typed context missing its title.
  return `Cześć! Mam pytanie dotyczące tej strony:\n${url}`;
}

/** Build the full wa.me deep link with the encoded question message. */
export function buildQuestionWhatsappUrl(ctx: QuestionContext): string {
  return whatsappLink(buildQuestionMessage(ctx));
}

/** Generic contact link (no payload) for static CTAs where no page context applies. */
export function contactWhatsappUrl(prefill?: string): string {
  return whatsappLink(prefill);
}

/**
 * Programmatic WhatsApp handoff for the ONE non-anchor CTA (the booking-form
 * submit, which must validate before it can hand off).
 *
 * It performs a same-context navigation ("_self"), deliberately mirroring the
 * plain-anchor CTAs so every WhatsApp handoff behaves identically:
 *  - A same-context, user-activated navigation is the most reliable trigger for
 *    native Android App Link / iOS Universal Link interception, so the OS hands
 *    off straight to the WhatsApp app instead of the browser following wa.me's
 *    302 redirect to the api.whatsapp.com "Continue to Chat" interstitial.
 *  - Unlike a "_blank" window it can never be popup-blocked and leaves no stray
 *    blank browser tab behind.
 * Call it AFTER analytics is recorded on this page: gtag sends via sendBeacon,
 * which survives the navigation, so the event is initiated before handoff and
 * never depends on the WhatsApp destination loading. No-op during SSR/build.
 */
export function openWhatsApp(url: string): void {
  if (typeof window === "undefined") return;
  window.open(url, "_self");
}

export const WHATSAPP_NUMBER = siteConfig.whatsappNumber;
