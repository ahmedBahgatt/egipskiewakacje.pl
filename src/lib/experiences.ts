import type { CategorySlug, DestinationSlug } from "@/content/types";

/**
 * Presentation system for grouping the catalogue into experience families.
 *
 * Each category maps to a lightweight visual `motif` (rendered by
 * <ExperienceVisual>) and an `accent` token from the brand palette, plus a short
 * contextual intro. This is what lets destination and category pages read as a
 * designed, sectioned "Egypt excursions" site instead of one flat card list -
 * without hardcoding any tour titles (the tours themselves drive counts/cards).
 */

export type Motif =
  | "history"
  | "nile"
  | "cruise"
  | "snorkel"
  | "diving"
  | "safari"
  | "family"
  | "private"
  | "sinai"
  | "world";

export interface ExperienceMeta {
  motif: Motif;
  /** Accent colour token (from globals.css) used for the section's motif + rule. */
  accent: string;
}

export const EXPERIENCE: Record<CategorySlug, ExperienceMeta> = {
  kair: { motif: "history", accent: "var(--gold-500)" },
  luksor: { motif: "nile", accent: "var(--gold-600)" },
  "rejsy-wyspy": { motif: "cruise", accent: "var(--teal-500)" },
  "snorkeling-delfiny": { motif: "snorkel", accent: "var(--teal-400)" },
  nurkowanie: { motif: "diving", accent: "var(--teal-700)" },
  safari: { motif: "safari", accent: "var(--terracotta-500)" },
  atrakcje: { motif: "family", accent: "var(--gold-400)" },
  prywatne: { motif: "private", accent: "var(--navy-700)" },
  synaj: { motif: "sinai", accent: "var(--terracotta-600)" },
  miedzynarodowe: { motif: "world", accent: "var(--gold-600)" },
};

/**
 * Editorial order of experience sections per resort - marine-forward for the
 * coastal resorts, diving/Sinai-forward for Sharm, with Kair/Luksor in the
 * middle. Only categories that actually have tours for the resort are rendered
 * (see orderedPresentCategories); any present category missing from this list is
 * appended at the end so nothing is ever hidden.
 */
export const DESTINATION_SECTION_ORDER: Record<DestinationSlug, CategorySlug[]> = {
  hurghada: [
    "rejsy-wyspy",
    "snorkeling-delfiny",
    "nurkowanie",
    "safari",
    "atrakcje",
    "kair",
    "luksor",
    "prywatne",
  ],
  "marsa-alam": [
    "snorkeling-delfiny",
    "nurkowanie",
    "rejsy-wyspy",
    "safari",
    "kair",
    "luksor",
    "atrakcje",
    "prywatne",
  ],
  "sharm-el-sheikh": [
    "nurkowanie",
    "rejsy-wyspy",
    "synaj",
    "safari",
    "kair",
    "atrakcje",
    "miedzynarodowe",
  ],
};

/** Order used when grouping a global category page by departure resort. */
export const CATEGORY_DESTINATION_ORDER: DestinationSlug[] = [
  "hurghada",
  "marsa-alam",
  "sharm-el-sheikh",
];

/**
 * Short, contextual intro for an experience section. Kept factual and original;
 * the resort name is woven in (genitive) where it helps orientation.
 */
export function sectionIntro(cat: CategorySlug, resortGenitive: string): string {
  const map: Record<CategorySlug, string> = {
    "rejsy-wyspy": `Dni na łodzi i turkusowej wodzie: wyspy, laguny, postoje na snorkeling i lunch na pokładzie - najbardziej relaksujące wyprawy z ${resortGenitive}.`,
    "snorkeling-delfiny": `Blisko podwodnego świata - rafy pełne ryb, a przy odrobinie szczęścia dzikie delfiny i żółwie. Spokojne, przyrodnicze wyjazdy z ${resortGenitive}.`,
    nurkowanie: `Od nurkowania na próbę po kursy z certyfikatem - rafy Morza Czerwonego pod okiem instruktora. Kursy rozliczane w euro.`,
    safari: `Druga twarz Egiptu: quady, buggy i jeepy na pustyni, zachód słońca i wieczór w wiosce beduińskiej. Krótsze i dłuższe warianty z ${resortGenitive}.`,
    atrakcje: `Krótsze pomysły blisko kurortu: akwaria, pokazy delfinów, aquaparki i łodzie z podwodnym pokładem. Dobre na popołudnie i dzień z dziećmi.`,
    kair: `Serce starożytnego Egiptu - piramidy w Gizie, Sfinks i muzea faraonów. Autokarem w jeden dzień albo szybciej samolotem.`,
    luksor: `Największe muzeum pod otwartym niebem: Dolina Królów, Karnak i świątynie Teb - dzień pełen historii nad Nilem.`,
    prywatne: `Tylko Twoja grupa, własny kierowca i elastyczny plan dnia. Komfortowa opcja dla rodzin i osób, które nie lubią sztywnego grafiku.`,
    synaj: `Wyprawy w głąb Synaju - od nocnego wejścia na Górę Mojżesza po klasztor św. Katarzyny.`,
    miedzynarodowe: `Dalej niż Egipt - wyprawy sięgające poza granicę kraju dla chętnych na coś więcej.`,
  };
  return map[cat];
}
