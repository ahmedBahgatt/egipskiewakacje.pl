# SEO_CONTENT_ARCHITECTURE.md

Page-level search architecture for egipskiewakacje.pl after the full-inventory
build (2026-08-09). One primary intent per indexable page; category pages exist
only where inventory and intent justify them. The keyword clusters below are
derived from the real product inventory, Polish search intent AND the SEMrush
Keyword Gap export in `SEO_KEYWORD_MAP.csv` (see the "SEMrush Keyword Gap analysis"
section below and `SEO_KEYWORD_MAP_NOTES.md`). Each CSV row now carries a
`classification` (TARGET / SUPPORTING / BLOG / OUT_OF_SCOPE / NOISE). Weather and
brand-only navigational queries (e.g. "hurghada temperatura", bare "hurghada")
are explicitly EXCLUDED from commercial destination/category targeting - they are
kept as market context only. Re-validate live volumes against SEMrush in Phase 2.

## Page-type intent map

| Page type | Primary intent | Example query | Cannibalization guard |
|-----------|----------------|---------------|-----------------------|
| Homepage `/` | Broad Egypt excursions | wycieczki fakultatywne w Egipcie | Broad brand/category intent; links down, never competes with a single tour |
| Destination `/wycieczki-z-<kurort>/` | Departure resort intent | wycieczki z Hurghady | One resort each; distinct from tour/category intent |
| Category `/wycieczki/<kategoria>/` | Tour-type cluster | wycieczki do Kairu, safari Egipt | Only 8 categories with >=3 tours; tag-only synaj/miedzynarodowe have no page |
| Tour `/wycieczki-z-<kurort>/<slug>/` | One bookable offer | Orange Bay Hurghada | Unique offer per page; duplicates consolidated (see TOUR_INVENTORY.md) |
| Poradnik `/poradnik/<slug>/` | Informational/comparison | co zabrać na wycieczkę do Kairu | Informational, links to commercial pages |

## Category pages (indexable)

| Category | Route | Tours | Primary query |
|----------|-------|-------|---------------|
| Kair i piramidy | `/wycieczki/kair-i-piramidy/` | 9 | kair i piramidy |
| Luksor | `/wycieczki/luksor/` | 4 | luksor |
| Rejsy i wyspy | `/wycieczki/rejsy-i-wyspy/` | 15 | rejsy i wyspy |
| Snorkeling i delfiny | `/wycieczki/snorkeling-i-delfiny/` | 7 | snorkeling i delfiny |
| Nurkowanie | `/wycieczki/nurkowanie/` | 10 | nurkowanie |
| Safari i quady | `/wycieczki/safari-i-quady/` | 16 | safari i quady |
| Atrakcje i rozrywka | `/wycieczki/atrakcje-i-rozrywka/` | 13 | atrakcje i rozrywka |
| Wycieczki prywatne | `/wycieczki/wycieczki-prywatne/` | 4 | wycieczki prywatne |

Tag-only (no landing page - too thin): Synaj (2 tours), Wycieczki międzynarodowe (1). Still usable as filters/chips.

## Internal-link plan

- Homepage -> 3 destinations, 8 category pages (Przeglądaj według rodzaju), 9 featured tours.
- Destination -> all its tours (filterable), its category chips, related guide.
- Category -> its tours (filterable), sibling categories (chip nav), breadcrumb to /wycieczki/.
- Tour -> parent destination, its category, up to 3 related tours (same category then same destination), related guide, cennik.
- Cennik -> every tour. Poradnik -> referenced tours + destination.

## Future blog opportunities (Phase 2, inventory-backed)

- Orange Bay czy Paradise Island - którą wyspę wybrać z Hurghady
- Sataya czy Samadai - gdzie pływać z delfinami z Marsa Alam
- Kair z Hurghady: autokarem czy samolotem
- GEM czy Muzeum Egipskie - które muzeum w Kairze
- Ras Mohammed czy White Island - snorkeling z Sharm el Sheikh
- Najlepsze wycieczki z Marsa Alam dla rodzin
- Ile trwa dojazd: Hurghada, Marsa Alam, Sharm - do Kairu i Luksoru
- Nurkowanie na próbę vs kurs PADI Open Water

---

## SEMrush Keyword Gap analysis (2026-08-09)

Source: SEMrush Keyword Gap export (sekretyegiptu.pl vs dziendobryegipt.pl,
czwartapiramida.pl, hurghada.pl, wycieczkipopolsku.pl). 2,581 keywords -> 456
Egypt-relevant after removing weather/logistics noise and other destinations
(Dubai, Cyprus, Albania, Turkey, Canaries, Tunisia) that the general-travel
competitors rank for. The raw paid export is NOT committed; derived, page-mapped
keywords are in SEO_KEYWORD_MAP.csv. Volumes are Polish (pl) monthly.

### Priority commercial targets (applied to on-page metadata this pass)
- "wycieczki fakultatywne" (2900) / "wycieczki fakultatywne egipt" (1000) /
  "wycieczka fakultatywna" (720) -> homepage + all-tours + destination intros.
- "hurghada wycieczki" / "wycieczki hurghada" (1900 + 1300) -> Hurghada destination.
- "marsa alam wycieczki fakultatywne" (1600, KD 3 - highly winnable) /
  "wycieczki z marsa alam" (1000) -> Marsa Alam destination.
- "sharm el sheikh wycieczki fakultatywne" (720) -> Sharm destination.
- "orange bay" (2400) -> Orange Bay tour. "hurghada grand aquarium" /
  "aquarium hurghada" (1600 + 1300) -> Wielkie Akwarium tour (title updated to
  include "Hurghada Grand Aquarium").
- "egipt piramidy" / "piramidy w egipcie" (1900 + 1900) / "muzeum egipskie w
  kairze" (880) / "wycieczka do kairu" (320) -> Kair category.
- "hurghada atrakcje" (1000) / "marsa alam atrakcje" (1300) / "egipt atrakcje"
  (720) -> Atrakcje category.
- "abu dabbab" (1300), "paradise island" (720), "sharm el luli" (480, KD 2),
  "ras mohamed", "wyspa tiran", "blue hole", "dolina królów luksor" (320),
  "delfinarium hurghada" (260) -> matching tour pages (titles already carry the
  entity name).

### Blog plan (Phase 2 - informational gaps, highest volume first)
- "hurghada czy marsa alam" (320) - comparison, links to both destinations.
- "el gouna" (4400) / "makadi bay" (2400) / "sahl hasheesh" (1300) / "el quseir"
  (1300) - Hurghada-area resort guides (we serve these zones; transfer supplements).
- "marsa alam kair odleglosc" (260) / journey-time guide (Hurghada/Marsa Alam ->
  Kair & Luksor by coach vs plane).
- "egipt piramidy" / "piramidy w egipcie" - piramidy explainer linking to Kair tours.
- "co zabrać / na co uważać w marsa alam" - practical guides.
- "rafa koralowa marsa alam" (480) / "rafa nurkowanie" (320) - snorkeling/reef guide.
Do NOT mass-produce; implement the 2-3 highest-value comparison/guide pieces that
close a real gap and strengthen a commercial page.

### Notes / discipline
- Head informational terms like "hurghada" (40500) and "egipt hurghada" (12100)
  are dominated by weather/general-info sites; we target the commercial modifier
  ("wycieczki", "atrakcje", "fakultatywne") rather than the bare resort name.
- Hotel/accommodation queries ("hurghada hotels", "hotel egipt hurghada") are
  out of product scope - excluded.
