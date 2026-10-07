import { describe, it, expect } from "vitest";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/config";

const ORG_ID = "https://egipskiewakacje.pl/#organization";
const SITE_ID = "https://egipskiewakacje.pl/#website";

// The ONLY profiles approved for the brand entity. Any addition here must be a
// genuinely owned, publicly branded URL - this list is the test's allow-list.
const APPROVED_SAMEAS = [
  "https://www.facebook.com/egipskiewakacje",
  "https://www.instagram.com/egipskiewakacje/",
  "https://maps.app.goo.gl/GhLmkkM8cRCWWQXt6",
];

describe("organizationJsonLd - brand entity", () => {
  const org = organizationJsonLd() as Record<string, unknown>;

  it("stays a single, unique Organization (not upgraded to LocalBusiness/TravelAgency)", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Egipskie Wakacje");
  });

  it("keeps the stable global @id", () => {
    expect(org["@id"]).toBe(ORG_ID);
  });

  it("points url + logo at the canonical homepage/brand assets", () => {
    expect(org.url).toBe("https://egipskiewakacje.pl/");
    expect(org.logo).toBe("https://egipskiewakacje.pl/media/brand/egipskie-wakacje-logo.png");
  });

  it("sameAs contains ONLY the approved official profiles (exact set, order preserved)", () => {
    expect(org.sameAs).toEqual(APPROVED_SAMEAS);
  });

  it("sameAs is sourced from siteConfig.social (single source of truth)", () => {
    expect(org.sameAs).toEqual([
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.googleBusiness,
    ]);
  });

  it("invents no social profiles we do not actually own", () => {
    const s = JSON.stringify(org).toLowerCase();
    for (const forbidden of [
      "youtube",
      "tiktok",
      "linkedin",
      "twitter",
      "x.com",
      "pinterest",
      "tripadvisor",
      "t.me",
      "telegram",
    ]) {
      expect(s).not.toContain(forbidden);
    }
  });
});

describe("websiteJsonLd - site entity consistency", () => {
  const site = websiteJsonLd() as Record<string, unknown>;

  it("keeps the stable WebSite @id and brand name", () => {
    expect(site["@id"]).toBe(SITE_ID);
    expect(site["@type"]).toBe("WebSite");
    expect(site.name).toBe("Egipskie Wakacje");
  });

  it("uses the bare domain as the only alternateName and the canonical url", () => {
    expect(site.alternateName).toBe("egipskiewakacje.pl");
    expect(site.url).toBe("https://egipskiewakacje.pl/");
  });

  it("publisher references the one global Organization @id (no duplicate entity)", () => {
    expect(site.publisher).toEqual({ "@id": ORG_ID });
  });
});
