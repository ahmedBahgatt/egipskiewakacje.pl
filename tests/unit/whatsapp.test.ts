import { describe, it, expect } from "vitest";
import {
  buildBookingMessage,
  buildBookingWhatsappUrl,
  buildQuestionMessage,
  buildQuestionWhatsappUrl,
  contactWhatsappUrl,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";

const base = {
  tourTitle: "Wycieczka z Hurghady do Kairu",
  departure: "Hurghada",
  date: "2026-09-10",
  hotel: "Steigenberger Al Dau",
  adults: 2,
  pageUrl: "https://egipskiewakacje.pl/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
};

describe("whatsapp number", () => {
  it("uses the configured business number", () => {
    expect(WHATSAPP_NUMBER).toBe("201055850536");
  });
});

describe("buildBookingMessage", () => {
  it("opens with a clear booking intent (not an availability inquiry)", () => {
    const msg = buildBookingMessage(base);
    expect(msg.startsWith("Cześć! Chcę zarezerwować wycieczkę „Wycieczka z Hurghady do Kairu”."))
      .toBe(true);
    expect(msg).not.toContain("sprawdzić dostępność");
  });

  it("includes only submitted booking fields", () => {
    const msg = buildBookingMessage({ ...base, children: 2, notes: "Prosimy o odbiór z lobby" });
    expect(msg).toContain("Wycieczka: Wycieczka z Hurghady do Kairu");
    expect(msg).toContain("Miejsce wyjazdu: Hurghada");
    expect(msg).toContain("Data: 2026-09-10");
    expect(msg).toContain("Hotel: Steigenberger Al Dau");
    expect(msg).toContain("Dorośli: 2");
    expect(msg).toContain("Dzieci 5–11 lat: 2");
    expect(msg).toContain("Uwagi: Prosimy o odbiór z lobby");
    expect(msg).toContain(`Strona: ${base.pageUrl}`);
    expect(msg).toContain("Proszę o potwierdzenie dostępności, ceny i godziny odbioru.");
  });

  it("omits children when there are no paying (5-11) children", () => {
    expect(buildBookingMessage({ ...base, children: 0 })).not.toContain("Dzieci");
    expect(buildBookingMessage(base)).not.toContain("Dzieci");
  });

  it("omits notes when none were provided (no empty/placeholder rows)", () => {
    const msg = buildBookingMessage({ ...base, notes: "   " });
    expect(msg).not.toContain("Uwagi:");
    expect(msg).not.toContain("(do podania)");
    expect(msg).not.toContain("Imię:");
    expect(msg).not.toContain("brak");
  });
});

describe("buildBookingWhatsappUrl", () => {
  it("targets the correct number and URL-encodes the message", () => {
    const url = buildBookingWhatsappUrl(base);
    expect(url.startsWith("https://wa.me/201055850536?text=")).toBe(true);
    // Encoded, so raw spaces/newlines must not leak into the URL.
    expect(url).not.toContain(" ");
    expect(url).not.toContain("\n");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Wycieczka z Hurghady do Kairu");
    // Polish diacritics survive the round-trip.
    expect(decoded).toContain("Dorośli: 2");
  });
});

describe("buildQuestionMessage", () => {
  const url = "https://egipskiewakacje.pl/wycieczki-z-hurghady/el-gouna/";

  it("tour: identifies the tour title + URL, no booking data", () => {
    const msg = buildQuestionMessage({ type: "tour", title: "El Gouna z Hurghady", url });
    expect(msg).toBe(`Cześć! Mam pytanie dotyczące wycieczki „El Gouna z Hurghady”.\n${url}`);
    expect(msg).not.toMatch(/Dorośli|Data|Hotel|Dzieci/);
  });

  it("destination: mentions the destination + URL", () => {
    const msg = buildQuestionMessage({ type: "destination", title: "Hurghady", url });
    expect(msg).toBe(`Cześć! Mam pytanie dotyczące wycieczek z Hurghady.\n${url}`);
  });

  it("post: identifies the article + URL", () => {
    const msg = buildQuestionMessage({ type: "post", title: "Kair - poradnik", url });
    expect(msg).toBe(`Cześć! Mam pytanie dotyczące informacji na stronie „Kair - poradnik”.\n${url}`);
  });

  it("home: generic Egypt-tours question + URL", () => {
    const u = "https://egipskiewakacje.pl/";
    expect(buildQuestionMessage({ type: "home", url: u })).toBe(
      `Cześć! Mam pytanie dotyczące wycieczek w Egipcie.\n${u}`,
    );
  });

  it("other/listing: falls back to generic this-page copy + URL", () => {
    const u = "https://egipskiewakacje.pl/wycieczki/";
    expect(buildQuestionMessage({ type: "other", url: u })).toBe(
      `Cześć! Mam pytanie dotyczące tej strony:\n${u}`,
    );
    // A typed context missing its title degrades to the same safe copy.
    expect(buildQuestionMessage({ type: "tour", url: u })).toBe(
      `Cześć! Mam pytanie dotyczące tej strony:\n${u}`,
    );
  });
});

describe("buildQuestionWhatsappUrl", () => {
  it("encodes the message and preserves diacritics on round-trip", () => {
    const url = buildQuestionWhatsappUrl({
      type: "tour",
      title: "Wyspa Giftun",
      url: "https://egipskiewakacje.pl/wycieczki-z-hurghady/orange-bay/",
    });
    expect(url.startsWith("https://wa.me/201055850536?text=")).toBe(true);
    expect(url).not.toContain(" ");
    expect(url).not.toContain("\n");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Mam pytanie dotyczące wycieczki „Wyspa Giftun”.");
  });
});

describe("contactWhatsappUrl", () => {
  it("returns a bare link with no payload when no prefill given", () => {
    expect(contactWhatsappUrl()).toBe("https://wa.me/201055850536");
  });
});
