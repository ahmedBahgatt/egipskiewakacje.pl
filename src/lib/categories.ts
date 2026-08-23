import type { CategorySlug, MediaImage } from "@/content/types";

/**
 * Presentation maps for the category taxonomy. Pure data (no content-adapter
 * import) so client components and route files can use them without pulling the
 * content layer into the bundle. The rich category content (intro/FAQ/SEO) lives
 * in the content adapter and is read via `content.getCategories()`.
 */

/** Short chip label for every category (including tag-only ones). */
export const categoryLabel: Record<CategorySlug, string> = {
  kair: "Kair i piramidy",
  luksor: "Luksor",
  "rejsy-wyspy": "Rejsy i wyspy",
  "snorkeling-delfiny": "Snorkeling i delfiny",
  nurkowanie: "Nurkowanie",
  safari: "Safari i quady",
  atrakcje: "Atrakcje i rozrywka",
  prywatne: "Wycieczki prywatne",
  synaj: "Synaj",
  miedzynarodowe: "Wycieczki międzynarodowe",
};

/** Landing-page route base for categories that have an indexable page. */
export const categoryRoute: Partial<Record<CategorySlug, string>> = {
  kair: "/wycieczki/kair-i-piramidy",
  luksor: "/wycieczki/luksor",
  "rejsy-wyspy": "/wycieczki/rejsy-i-wyspy",
  "snorkeling-delfiny": "/wycieczki/snorkeling-i-delfiny",
  nurkowanie: "/wycieczki/nurkowanie",
  safari: "/wycieczki/safari-i-quady",
  atrakcje: "/wycieczki/atrakcje-i-rozrywka",
  prywatne: "/wycieczki/wycieczki-prywatne",
};

/**
 * Real category photography (1200x800, 3:2). Files live in
 * /public/media/categories/<slug>.{avif,webp,jpg}; alt text is SEO-oriented Polish.
 * Shared by the homepage category grid and the interior category-page hero.
 */
export const categoryImage: Partial<Record<CategorySlug, MediaImage>> = {
  kair: {
    src: "/media/categories/kair",
    alt: "Piramida w Gizie i Sfinks o zachodzie słońca",
    width: 1200,
    height: 800,
  },
  luksor: {
    src: "/media/categories/luksor",
    alt: "Kolumny i obelisk świątyni w Karnaku w Luksorze w złotym świetle",
    width: 1200,
    height: 800,
  },
  "rejsy-wyspy": {
    src: "/media/categories/rejsy-wyspy",
    alt: "Biały jacht na turkusowym Morzu Czerwonym przy piaszczystej wyspie",
    width: 1200,
    height: 800,
  },
  "snorkeling-delfiny": {
    src: "/media/categories/snorkeling-delfiny",
    alt: "Snorkeling z dzikimi delfinami w przejrzystej wodzie Morza Czerwonego",
    width: 1200,
    height: 800,
  },
  nurkowanie: {
    src: "/media/categories/nurkowanie",
    alt: "Nurek z butlą nad kolorową rafą koralową Morza Czerwonego",
    width: 1200,
    height: 800,
  },
  safari: {
    src: "/media/categories/safari",
    alt: "Quad na pustyni w Egipcie o zachodzie słońca wśród gór",
    width: 1200,
    height: 800,
  },
  atrakcje: {
    src: "/media/categories/atrakcje",
    alt: "Wieczorny pokaz kolorowych fontann i iluminacji przy egipskim kurorcie",
    width: 1200,
    height: 800,
  },
  prywatne: {
    src: "/media/categories/prywatne",
    alt: "Prywatny przewodnik i komfortowy van podczas prywatnej wycieczki w Egipcie",
    width: 1200,
    height: 800,
  },
};
