import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { mapTour, mapDestination, mapBlocks } from "@/content/sanity/map";
import { mapSanityImage } from "@/content/sanity/image";

// A valid Sanity asset ref so the URL builder produces a real cdn.sanity.io URL.
const IMG_REF = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-1600x1000-jpg";
const img = (alt: string) => ({
  asset: { _ref: IMG_REF, _type: "reference" },
  alt,
  dimensions: { width: 1600, height: 1000 },
  lqip: "data:image/png;base64,abc",
});

describe("mapSanityImage", () => {
  it("produces responsive Sanity CDN URLs with correct dimensions", () => {
    const m = mapSanityImage(img("Piramidy w Gizie"));
    expect(m).not.toBeNull();
    expect(m!.alt).toBe("Piramidy w Gizie");
    expect(m!.width).toBe(1600);
    expect(m!.height).toBe(1000);
    expect(m!.sources?.jpg).toContain("cdn.sanity.io");
    expect(m!.sources?.webp).toContain("fm=webp");
    // AVIF via auto=format content negotiation.
    expect(m!.sources?.avif).toContain("auto=format");
  });
  it("returns null when no asset is present", () => {
    expect(mapSanityImage({ alt: "x" })).toBeNull();
  });
});

describe("mapTour (CMS tour -> typed model)", () => {
  const rawTour = {
    slug: "kair-piramidy-muzeum-egipskie",
    route: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie",
    title: "Wycieczka z Hurghady do Kairu",
    destination: "hurghada",
    departure: "Hurghada",
    shortDescription: "Cały dzień w Kairze i Gizie.",
    heroImage: img("Piramidy"),
    gallery: [img("Giza"), img("Sfinks")],
    price: {
      adult: 60,
      child: 30,
      infantFree: true,
      childAgeMin: 5,
      childAgeMax: 11,
      currency: "USD" as const,
      lastVerifiedAt: "2026-08-08",
      variable: true,
    },
    availabilityLabel: "Codziennie",
    guide: { label: "Polski", polishConfirmed: true },
    featured: true,
    itinerary: [{ time: "00:00-02:00", title: "Odbiór", description: "..." }],
  };

  it("carries the CMS price through to the model", () => {
    const t = mapTour(rawTour)!;
    expect(t).not.toBeNull();
    expect(t.price.adult).toBe(60);
    expect(t.price.child).toBe(30);
    expect(t.price.infantFree).toBe(true);
    expect(t.destination).toBe("hurghada");
    expect(t.heroImage.sources?.jpg).toContain("cdn.sanity.io");
  });

  it("returns null when a required field (price/image) is missing", () => {
    expect(mapTour({ ...rawTour, price: undefined })).toBeNull();
    expect(mapTour({ ...rawTour, heroImage: undefined })).toBeNull();
  });
});

describe("mapBlocks (safe rich blocks)", () => {
  it("maps the new block types and drops unknown ones", () => {
    const blocks = mapBlocks([
      { _type: "blockHeading", text: "Sekcja", id: "" },
      { _type: "blockParagraph", text: "Treść." },
      { _type: "blockImage", image: img("W trasie"), caption: "Podpis" },
      {
        _type: "blockTable",
        headers: ["A", "B"],
        rows: [{ cells: ["1", "2"] }],
      },
      { _type: "blockRelatedTour", tourSlug: "kair-piramidy-muzeum-egipskie" },
      { _type: "somethingEvil", text: "<script>" },
    ]);
    const types = blocks.map((b) => b.type);
    expect(types).toEqual(["heading", "paragraph", "image", "table", "relatedTour"]);
    // Heading gets a slugified anchor when none provided.
    const h = blocks[0] as Extract<(typeof blocks)[number], { type: "heading" }>;
    expect(h.id).toBe("sekcja");
    // Unknown/evil block is dropped entirely.
    expect(types).not.toContain(undefined);
  });
});

describe("mapDestination", () => {
  it("preserves the genitive name and maps the hero image", () => {
    const d = mapDestination({
      slug: "hurghada",
      name: "Hurghada",
      nameGenitive: "Hurghady",
      heroImage: img("Wybrzeże Hurghady"),
    })!;
    expect(d.nameGenitive).toBe("Hurghady");
    expect(d.heroImage.sources?.jpg).toContain("cdn.sanity.io");
  });
});

// --- adapter-level: stubbed fetch proves the end-to-end CMS read path ---------
describe("sanityApi (stubbed fetch)", () => {
  const dataset = {
    destination: [
      { slug: "hurghada", name: "Hurghada", nameGenitive: "Hurghady", heroImage: img("H") },
    ],
    tour: [
      {
        slug: "kair-piramidy-muzeum-egipskie",
        route: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie",
        title: "Wycieczka z Hurghady do Kairu",
        destination: "hurghada",
        heroImage: img("H"),
        price: { adult: 60, child: 30, infantFree: true, childAgeMin: 5, childAgeMax: 11, currency: "USD" as const, lastVerifiedAt: "2026-08-08", variable: true },
        guide: { label: "Polski", polishConfirmed: true },
        featured: true,
      },
    ],
    blogPost: [
      {
        slug: "co-zabrac-na-wycieczke-do-kairu",
        route: "/poradnik/co-zabrac-na-wycieczke-do-kairu",
        title: "Co zabrać na wycieczkę do Kairu?",
        featuredImage: img("Plecak"),
        body: [{ _type: "blockParagraph", text: "Treść." }],
      },
    ],
  };

  beforeAll(() => {
    vi.stubGlobal("fetch", async (url: string) => {
      const q = decodeURIComponent(url);
      let result: unknown = [];
      if (q.includes('_type == "tour"')) result = dataset.tour;
      else if (q.includes('_type == "blogPost"')) result = dataset.blogPost;
      else if (q.includes('_type == "destination"')) result = dataset.destination;
      return { ok: true, status: 200, json: async () => ({ result }) } as Response;
    });
  });
  afterAll(() => vi.unstubAllGlobals());

  it("getTours returns CMS tours with correct price (drives /cennik/)", async () => {
    const { sanityApi } = await import("@/content/sanity/adapter");
    const tours = await sanityApi.getTours();
    expect(tours).toHaveLength(1);
    expect(tours[0].price.adult).toBe(60);
  });

  it("getToursByDestination places the CMS tour on its destination", async () => {
    const { sanityApi } = await import("@/content/sanity/adapter");
    const tours = await sanityApi.getToursByDestination("hurghada");
    expect(tours.map((t) => t.slug)).toContain("kair-piramidy-muzeum-egipskie");
  });

  it("a CMS article resolves to a routable post (drives generateStaticParams)", async () => {
    const { sanityApi } = await import("@/content/sanity/adapter");
    const post = await sanityApi.getPost("co-zabrac-na-wycieczke-do-kairu");
    expect(post).toBeDefined();
    expect(post!.route).toBe("/poradnik/co-zabrac-na-wycieczke-do-kairu");
  });
});
