# SEO_CONTENT_ARCHITECTURE.md

Page-level search architecture for egipskiewakacje.pl after the full-inventory
build (2026-08-09). One primary intent per indexable page; category pages exist
only where inventory and intent justify them. No SEMrush CSV was provided this
session, so the keyword clusters below are derived from the real product inventory
and Polish search intent; re-validate volumes against SEMrush in Phase 2.

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
