import { describe, it, expect } from "vitest";
import {
  buildBookingMessage,
  buildBookingWhatsappUrl,
  contactWhatsappUrl,
  formatChildrenSummary,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";

const base = {
  tourTitle: "Wycieczka z Hurghady do Kairu",
  departure: "Hurghada",
  date: "2026-09-10",
  hotel: "Steigenberger Al Dau",
  adults: 2,
  name: "Anna",
  pageUrl: "https://egipskiewakacje.pl/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
};

describe("whatsapp number", () => {
  it("uses the configured business number", () => {
    expect(WHATSAPP_NUMBER).toBe("201055850536");
  });
});

describe("buildBookingMessage", () => {
  it("includes every booking field", () => {
    const msg = buildBookingMessage({
      ...base,
      childrenSummary: "2 (wiek: 6, 9)",
      notes: "Prosimy o odbiór z lobby",
    });
    expect(msg).toContain("Wycieczka: Wycieczka z Hurghady do Kairu");
    expect(msg).toContain("Miejsce wyjazdu: Hurghada");
    expect(msg).toContain("Data: 2026-09-10");
    expect(msg).toContain("Hotel: Steigenberger Al Dau");
    expect(msg).toContain("Dorośli: 2");
    expect(msg).toContain("Dzieci i wiek: 2 (wiek: 6, 9)");
    expect(msg).toContain("Imię: Anna");
    expect(msg).toContain("Uwagi: Prosimy o odbiór z lobby");
    expect(msg).toContain(`Strona: ${base.pageUrl}`);
    expect(msg).toContain("Proszę o potwierdzenie dostępności");
  });

  it('falls back to "brak" for empty children and notes', () => {
    const msg = buildBookingMessage(base);
    expect(msg).toContain("Dzieci i wiek: brak");
    expect(msg).toContain("Uwagi: brak");
  });
});

describe("buildBookingWhatsappUrl", () => {
  it("targets the correct number and URL-encodes the message", () => {
    const url = buildBookingWhatsappUrl(base);
    expect(url.startsWith("https://wa.me/201055850536?text=")).toBe(true);
    // Encoded, so raw spaces/newlines must not leak into the URL.
    expect(url).not.toContain(" ");
    expect(url).not.toContain("\n");
    // Round-trips back to a message containing the tour title.
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Wycieczka z Hurghady do Kairu");
    // Polish diacritics survive the round-trip.
    expect(decoded).toContain("Dorośli: 2");
  });
});

describe("contactWhatsappUrl", () => {
  it("returns a bare link with no payload when no prefill given", () => {
    expect(contactWhatsappUrl()).toBe("https://wa.me/201055850536");
  });
});

describe("formatChildrenSummary", () => {
  it("returns empty for zero children", () => {
    expect(formatChildrenSummary(0, [])).toBe("");
  });
  it("summarises count and ages", () => {
    expect(formatChildrenSummary(2, [6, 9])).toBe("2 (wiek: 6, 9)");
  });
});
