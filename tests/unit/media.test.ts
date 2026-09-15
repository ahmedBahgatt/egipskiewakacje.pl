import { describe, it, expect } from "vitest";
import { ogImageUrl } from "@/lib/media";

describe("ogImageUrl - social-safe OG image URLs", () => {
  it("bounds Sanity-hosted images to a 1200x630 JPEG derivative (WhatsApp/Meta size limit)", () => {
    const raw =
      "https://cdn.sanity.io/images/ej04dib0/production/5d8fa6a7552abcfeee384a4ddc92ebda55d32671-1672x941.png";
    expect(ogImageUrl(raw)).toBe(`${raw}?w=1200&h=630&fit=crop&fm=jpg&q=80`);
  });

  it("does not double-parameterise a URL that already carries a query string", () => {
    const withQuery =
      "https://cdn.sanity.io/images/ej04dib0/production/abc-1200x630.jpg?w=800";
    expect(ogImageUrl(withQuery)).toBe(withQuery);
  });

  it("leaves local /media OG references as absolute site URLs (no Sanity params)", () => {
    const out = ogImageUrl("/media/og/default.jpg");
    expect(out).toBe("https://egipskiewakacje.pl/media/og/default.jpg");
    expect(out).not.toContain("fm=jpg");
  });

  it("leaves non-Sanity absolute URLs untouched", () => {
    const url = "https://egipskiewakacje.pl/media/brand/egipskie-wakacje-logo.png";
    expect(ogImageUrl(url)).toBe(url);
  });
});
