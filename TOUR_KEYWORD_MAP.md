# Tour-level Keyword Ownership Map

Research / planning artifact for the **individual tour page** SEO phase. This map
must be consulted before any tour page's title / meta / H1 / content / schema /
slug / internal links are changed. It does **not** authorise any implementation.

- Companion structured file: **`TOUR_KEYWORD_MAP.csv`** (one row per canonical tour, sortable).
- Hub ownership (all-tours / destination / category) lives in **`SEO_KEYWORD_MAP.md`** and is respected here, not restated in full.
- Tour inventory source of truth: `src/content/local/tours.ts` (parsed programmatically).

## 1. Inventory (counted, not assumed)

Parsed directly from `src/content/local/tours.ts`.

| metric | value |
|---|---|
| Canonical individual tour pages (unique routes) | **78** |
| Expected 79 matched | **No** — real count is 78 |
| Hurghada / Marsa Alam / Sharm el Sheikh | 39 / 20 / 19 |
| By category | Kair 10 · Luksor 4 · Rejsy-wyspy 15 · Snorkeling-delfiny 7 · Nurkowanie 5 · Safari 16 · Atrakcje 13 · Prywatne 4 · Synaj 3 · Miedzynarodowe 1 |
| Duplicate routes | 0 |
| Duplicate slugs | 14 — **legitimate**: same attraction offered from >1 departure resort (e.g. `kair-samolotem`, `parasailing`, `lodz-seascope`, `buggy-safari`, `quad-safari-5h`). Each carries a distinct `route` under its own `/wycieczki-z-<resort>/` base, so each is its own canonical page. |
| Non-canonical records excluded | 0 |

**Why 78 not 79:** the current committed inventory holds exactly 78 unique tour
routes. This matches the count already recorded in `SEO_KEYWORD_MAP.md`
(78 tours; H39 / M20 / S19). No draft, hidden, or duplicate route exists to make 79.
Every canonical tour appears exactly once in this map and in the CSV.

## 2. Method & metric sources

- **Quantitative demand (Volume / KD / intent):** SEMrush Keyword Gap export
  `gap.keywords_2025-12-23T19_51_00.108Z.csv` — **2,581 keyword rows parsed**
  (verified present at `/Users/ahmedbahgat/Desktop/projects/Google Ads/`).
  This is the same file used for the hub map. All `vol/KD` figures below are read
  from it. **No volume, KD, CPC or intent is invented.**
- This is a competitor **gap** export, not the full keyword universe. Absence of a
  phrase here does not prove zero demand — such tours are marked
  `no CSV cluster` and given a semantic/entity-led primary at `volume: N/A`.
- **Notation:** `keyword vol/KD` (e.g. `orange bay 2400/9`). Negative KD values
  (e.g. `110/-1`) are reproduced verbatim from the export.
- Any semantic reasoning (Polish phrasing, entity relationships) is kept separate
  from these numbers and never dressed up as SEMrush data.

## 3. Ownership model (4 levels)

| Level | Owner | Owns |
|---|---|---|
| L1 | `/wycieczki/` all-tours hub | Broad Egypt excursion queries (`wycieczki fakultatywne egipt` 1000/5, `wycieczki fakultatywne` 2900/27) |
| L2 | Destination hubs | Broad resort-excursion queries (`hurghada wycieczki` 1900/10, `marsa alam wycieczki fakultatywne` 1600/3, `sharm el sheikh wycieczki fakultatywne` 720/10) |
| L3 | Category hubs | Broad activity/type queries (`wycieczka do kairu` 320/7, `wycieczka do luksoru` 110/5, `rejs katamaranem` 480/7, `safari egipt` 170/2, `nurkowanie w egipcie`) |
| L4 | **Individual tour pages (this map)** | Specific tour / entity / product queries (`orange bay`, `abu dabbab`, `sataya`, `marsa mubarak`, `hamata`, `hurghada grand aquarium`, `parasailing`, departure-modified Cairo/Luxor) |

Hubs **mention and link** L4 entities but never target an entity's exact query as
their own primary. This map enforces the reverse: tour pages never target an L1-L3
broad head as their primary.

## 4. Reverse keyword ownership index (KEYWORD/CLUSTER -> OWNER)

Detects duplicate targeting across hubs and tours. Hub rows summarise
`SEO_KEYWORD_MAP.md`; tour rows are assigned by this document.

### Broad heads -> HUBS (never a tour primary)

| Keyword | Vol/KD | Owner |
|---|---|---|
| `wycieczki fakultatywne egipt` | 1000/5 | L1 `/wycieczki/` |
| `wycieczki fakultatywne` · `egipt wycieczki` · `wycieczki egipt` | 2900/27 · 2900/35 · 2900/35 | L1 `/wycieczki/` (supporting heads) |
| `hurghada wycieczki` · `wycieczki hurghady` · `wycieczki z hurghady` | 1900/10 · 1300/10 · 720/10 | L2 Hurghada hub |
| `marsa alam wycieczki fakultatywne` · `wycieczki z marsa alam` | 1600/3 · 1000/6 | L2 Marsa Alam hub |
| `sharm el sheikh wycieczki fakultatywne` · `wycieczki sharm el sheikh` | 720/10 · 480/14 | L2 Sharm hub |
| `hurghada atrakcje` | 1000/19 | L2 Hurghada hub / future info guide |
| `wycieczka do kairu` · `kair wycieczka` | 320/7 · 320/5 | L3 Kair hub |
| `wycieczka do luksoru` · `luksor wycieczka` | 110/5 · 110/5 | L3 Luksor hub |
| `rejs katamaranem` | 480/7 | L3 Rejsy hub |
| `snorkeling egipt` · `pływanie z delfinami egipt` | 90/2 · 110/2 | L3 Snorkeling hub |
| `nurkowanie w egipcie` (export misspelling `snurkowanie w egipcie` 590/5) · `nurkowanie hurghada` 210/10 · `marsa alam nurkowanie` 210/1 | — | L3 Nurkowanie hub |
| `safari egipt` · `quady egipt` · `quad safari` · `jeep safari` | 170/2 · 140/6 · 140/9 · 480/10 | L3 Safari hub |
| `dolina królów` 5400/23 · `piramidy w egipcie` 1900/23 | — | Reserved for **future informational guides**, not commercial pages |
| `el gouna` 4400/18 · `makadi bay` 2400/16 · `nefertari` 880/33 | — | Off-intent (town/hotel/homonym) — **not** a tour primary |

### Entity queries -> TOUR PAGES (this map)

| Keyword | Vol/KD | Owner tour (route) |
|---|---|---|
| `parasailing` | 3600/11 | `/wycieczki-z-hurghady/parasailing` |
| `orange bay` | 2400/9 | `/wycieczki-z-hurghady/orange-bay` |
| `hurghada grand aquarium` (+`aquarium hurghada` 1300/8) | 1600/8 | `/wycieczki-z-hurghady/wielkie-akwarium` |
| `abu dabbab` | 1300/12 | `/wycieczki-z-marsa-alam/abu-dabbab` |
| `marsa mubarak` | 880/8 | `/wycieczki-z-marsa-alam/marsa-mubarak-snorkeling` |
| `hamata` (+`wyspy qulaan` 880/8) | 720/9 | `/wycieczki-z-marsa-alam/wyspy-hamata` |
| `paradise island` 720/25 -> primary `wyspa paradise egipt` | 320/14 | `/wycieczki-z-hurghady/wyspa-paradise` |
| `sataya` | 480/20 | `/wycieczki-z-marsa-alam/sataya-dom-delfinow` |
| `sharm el lulli` (CSV variant `sharm el luli`) | 480/2 | `/wycieczki-z-marsa-alam/sharm-el-lulli-ras-hankorab` |
| `rejs po nilu kair i wielkie piramidy` | 480/6 | `/wycieczki-z-hurghady/super-kair-piramidy-rejs-po-nilu` |
| `mini egypt park` | 320/7 | `/wycieczki-z-hurghady/mini-egypt-park` |
| `hula hula` | 320/8 | `/wycieczki-z-hurghady/wyspa-hula-hula` |
| `delfinarium hurghada` (+`hurghada delfinarium` 110/6) | 260/7 | `/wycieczki-z-hurghady/delfinarium-dolphin-show` |
| `wycieczki z hurghady do kairu` | 260/3 | `/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie` |
| `sharm el naga` | 210/6 | `/wycieczki-z-hurghady/sharm-el-naga-snorkeling` |
| `buggy safari` | 210/7 | `/wycieczki-z-hurghady/buggy-safari` (broad -> Hurghada; Sharm uses modifier) |
| `wycieczki z marsa alam do luksoru` | 170/3 | `/wycieczki-z-marsa-alam/luksor-dolina-krolow` |
| `dolphin house` | 170/10 | `/wycieczki-z-hurghady/dom-delfinow-snorkeling` |
| `wycieczki z marsa alam do kairu` | 140/1 | `/wycieczki-z-marsa-alam/kair-stary-kair-piramidy` |
| `wycieczka z hurghady do luksoru` | 140/0 | `/wycieczki-z-hurghady/luksor-dolina-krolow` |
| `wycieczki z sharm el sheikh do kairu` | 110/-1 | `/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy` |
| `quady hurghada` | 110/4 | `/wycieczki-z-hurghady/quad-safari-3h` (flagship; 5h uses duration modifier) |
| `marsa alam quady` | 90/3 | `/wycieczki-z-marsa-alam/quad-safari-5h` |
| `marsa alam safari` | 90/1 | `/wycieczki-z-marsa-alam/super-safari-quady` |
| `seascope hurghada` | 90/8 | `/wycieczki-z-hurghady/lodz-seascope` (broad -> Hurghada; Marsa/Sharm use modifier) |
| `delfinarium sharm el sheikh` | 70/5 | `/wycieczki-z-sharm-el-sheikh/dolphin-show` |

No entity above is assigned to two competing canonical pages. Broad terms shared by
several resorts (`buggy safari`, `parasailing`, `seascope hurghada`, quad heads)
are assigned to a single canonical page; siblings take departure-modified long-tails.

## 5. Per-tour map (compact)

Full detail (secondary set, long-tails, AEO questions, entities, reserved terms,
cannibalization notes, parents, internal links) is in `TOUR_KEYWORD_MAP.csv`. `#`
is the CSV row order.

#### Hurghada (39)

| # | Tour | Primary keyword | Vol/KD | Tier | Flags |
|---|---|---|---|---|---|
| 1 | Wycieczka z Hurghady do Kairu | `wycieczki z hurghady do kairu` | 260/3 | NEXT 20 | multi resort entity, strong transactional intent |
| 2 | Wycieczka z Hurghady do Kairu z Wielkim Muzeum GEM | `kair gem z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, needs informational support |
| 3 | Super Kair z Hurghady - piramidy, muzeum i Nil | `rejs po nilu kair i wielkie piramidy` | 480/6 | NEXT 20 | content gap, strong transactional intent |
| 4 | Wycieczka z Hurghady do Kairu samolotem | `wycieczka do kairu samolotem z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 5 | Prywatna wycieczka do Kairu z Hurghady | `prywatna wycieczka do kairu z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 6 | Wycieczka do Luksoru z Hurghady | `wycieczka z hurghady do luksoru` | 140/0 | NEXT 20 | low kd opportunity, multi resort entity |
| 7 | Prywatna wycieczka do Luksoru i Dendery | `prywatna wycieczka do luksoru i dendery z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 8 | Luksor z Hurghady z lotem balonem | `luksor lot balonem z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap |
| 9 | Luksor z Hurghady - 2 dni z lotem balonem | `luksor 2 dni z hurghady lot balonem` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 10 | Orange Bay z Hurghady | `orange bay` | 2400/9 | TOP 10 | high volume entity, low kd opportunity, strong transactional intent |
| 11 | Wyspa Paradise - rejs z Hurghady | `wyspa paradise egipt` | 320/14 | NEXT 20 | high volume entity |
| 12 | Wycieczka z Hurghady na Wyspę Mahmya | `wyspa mahmya z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 13 | Wycieczka z Hurghady na Wyspę Eden | `wyspa eden z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 14 | Wyspa Bianca i łódź ze szklanym dnem - rejs z Hurghady | `wyspa bianca z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 15 | Wycieczka z Hurghady na Wyspę Hula Hula | `hula hula` | 320/8 | TOP 10 | low kd opportunity, strong transactional intent |
| 16 | Wycieczka z Hurghady na Wyspę Magawish | `wyspa magawish z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 17 | Sharm el Naga - snorkeling, wycieczka z Hurghady | `sharm el naga` | 210/6 | NEXT 20 | low kd opportunity, strong transactional intent |
| 18 | Dom Delfinów (Dolphin House) - rejs z Hurghady | `dolphin house` | 170/10 | NEXT 20 | multi resort entity, strong transactional intent |
| 19 | Dom Delfinów z Hurghady - nurkowanie z butlą | `nurkowanie dom delfinów hurghada` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, cannibalization risk |
| 20 | Delfinarium w Hurghadzie - pokaz delfinów | `delfinarium hurghada` | 260/7 | NEXT 20 | low kd opportunity, strong transactional intent |
| 21 | Nurkowanie z butlą w Hurghadzie | `nurkowanie na próbę hurghada` | _(no CSV cluster)_ | REMAINDER | cannibalization risk, needs informational support |
| 22 | Abu Dabbab - Zatoka Żółwi, wycieczka z Hurghady | `abu dabbab z hurghady` | _(no CSV cluster)_ | REMAINDER | multi resort entity, cannibalization risk |
| 23 | Wycieczka na plażę Ozirea z Hurghady | `plaża ozirea z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 24 | Rejs Speed Boat z Hurghady | `prywatny rejs speedboat z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 25 | Rejs łodzią Seascope z Hurghady | `seascope hurghada` | 90/8 | NEXT 20 | multi resort entity, low kd opportunity |
| 26 | Wielkie Akwarium w Hurghadzie | `hurghada grand aquarium` | 1600/8 | TOP 10 | high volume entity, low kd opportunity |
| 27 | Wycieczka z Hurghady do aquaparku Makadi Water World | `aquapark makadi water world z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 28 | Wycieczka do Mini Egypt Park z Hurghady | `mini egypt park` | 320/7 | TOP 10 | low kd opportunity, strong transactional intent |
| 29 | Family Day Hurghada 3 w 1 | `family day hurghada 3 w 1` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 30 | Family Safari z Hurghady | `family safari z hurghady` | _(no CSV cluster)_ | REMAINDER | cannibalization risk, needs informational support |
| 31 | Super Safari Sahara Park - wycieczka z Hurghady | `super safari sahara park hurghada` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 32 | Moto Quad Safari 3h - wycieczka z Hurghady | `quady hurghada` | 110/4 | NEXT 20 | low kd opportunity, cannibalization risk |
| 33 | Moto Quad Safari 5h - wycieczka z Hurghady | `quad safari 5h hurghady` | _(no CSV cluster)_ | REMAINDER | cannibalization risk |
| 34 | Buggy Safari z Hurghady | `buggy safari` | 210/7 | NEXT 20 | multi resort entity, low kd opportunity |
| 35 | Jazda konno i kąpiel w morzu - wycieczka z Hurghady | `jazda konno nad morzem hurghada` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 36 | Jazda na wielbłądzie - wycieczka z Hurghady | `jazda na wielbłądzie hurghada` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 37 | Parasailing w Hurghadzie | `parasailing` | 3600/11 | TOP 10 | high volume entity, multi resort entity |
| 38 | City Tour po Hurghadzie | `city tour hurghada` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, needs informational support |
| 39 | Wycieczka z Hurghady do El Gouny | `wycieczka do el gouny z hurghady` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, needs informational support |

#### Marsa Alam (20)

| # | Tour | Primary keyword | Vol/KD | Tier | Flags |
|---|---|---|---|---|---|
| 40 | Wycieczka z Marsa Alam do Kairu | `wycieczki z marsa alam do kairu` | 140/1 | NEXT 20 | low kd opportunity, multi resort entity |
| 41 | Kair i Grand Egyptian Museum (GEM) z Marsa Alam | `kair gem z marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 42 | Wycieczka z Marsa Alam do Kairu samolotem | `kair samolotem z marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 43 | Prywatna wycieczka do Kairu z Marsa Alam | `prywatna wycieczka do kairu z marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 44 | Wycieczka do Luksoru z Marsa Alam | `wycieczki z marsa alam do luksoru` | 170/3 | NEXT 20 | low kd opportunity, multi resort entity, strong transactional intent |
| 45 | Prywatna wycieczka z Marsa Alam do Luksoru i Dendery | `prywatna wycieczka do luksoru i dendery z marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 46 | Sataya z Marsa Alam - dom delfinów | `sataya` | 480/20 | TOP 10 | high volume entity |
| 47 | Sha'ab Samadai z Marsa Alam - dom delfinów | `samadai dom delfinów` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, cannibalization risk |
| 48 | Abu Dabbab z Marsa Alam - żółwie i snorkeling | `abu dabbab` | 1300/12 | TOP 10 | high volume entity, multi resort entity |
| 49 | Marsa Mubarak z Marsa Alam - snorkeling | `marsa mubarak` | 880/8 | TOP 10 | high volume entity, low kd opportunity, strong transactional intent |
| 50 | Wycieczka z Marsa Alam na wyspy Hamata | `hamata` | 720/9 | TOP 10 | high volume entity, low kd opportunity |
| 51 | Rejs łodzią Nefertari z Marsa Alam | `rejs łodzią nefertari z marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |
| 52 | Wycieczka łodzią Seascope z Marsa Alam | `seascope marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 53 | Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab) | `sharm el lulli` | 480/2 | TOP 10 | low kd opportunity, strong transactional intent |
| 54 | Wycieczka z Marsa Alam - nurkowanie z plaży | `nurkowanie z plaży marsa alam` | _(no CSV cluster)_ | REMAINDER | cannibalization risk |
| 55 | Nurkowanie z łodzi w Marsa Alam | `nurkowanie z łodzi marsa alam` | _(no CSV cluster)_ | REMAINDER | cannibalization risk |
| 56 | Super Safari z Marsa Alam | `marsa alam safari` | 90/1 | NEXT 20 | low kd opportunity, cannibalization risk |
| 57 | Quad Safari z Marsa Alam - 5 godzin | `marsa alam quady` | 90/3 | NEXT 20 | low kd opportunity, cannibalization risk |
| 58 | Wycieczka z Marsa Alam - Moto Quad Safari 2h | `quad safari 2h marsa alam` | _(no CSV cluster)_ | REMAINDER | cannibalization risk |
| 59 | Wycieczka z Marsa Alam - Jeep Safari | `jeep safari marsa alam` | _(no CSV cluster)_ | REMAINDER | no semrush cluster |

#### Sharm el Sheikh (19)

| # | Tour | Primary keyword | Vol/KD | Tier | Flags |
|---|---|---|---|---|---|
| 60 | Wycieczka z Sharm el Sheikh do Kairu | `wycieczki z sharm el sheikh do kairu` | 110/-1 | NEXT 20 | low kd opportunity, multi resort entity |
| 61 | Wycieczka samolotem do Kairu z Sharm el Sheikh | `kair samolotem z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, cannibalization risk, multi resort entity |
| 62 | Góra Mojżesza i klasztor św. Katarzyny | `góra mojżesza z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |
| 63 | Blue Hole i Kolorowy Kanion z Sharm el Sheikh | `blue hole kolorowy kanion z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap |
| 64 | Wycieczka z Sharm el Sheikh do Jordanii - Petra i Morze Martwe | `wycieczka do petry z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap |
| 65 | Rejs na White Island i Ras Mohamed z nurkowaniem z butlą | `white island ras mohamed z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |
| 66 | Wycieczka do Ras Mohamed z Sharm el Sheikh | `ras mohamed z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |
| 67 | Wyspa Tiran z Sharm el Sheikh | `wyspa tiran z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |
| 68 | Wyspa Tiran z Sharm el Sheikh - z nurkowaniem | `nurkowanie tiran z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |
| 69 | Pokaz delfinów w Sharm el Sheikh | `delfinarium sharm el sheikh` | 70/5 | NEXT 20 | low kd opportunity |
| 70 | Łódź półpodwodna Seascope w Sharm el Sheikh | `seascope sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 71 | Parasailing w Sharm el Sheikh | `parasailing sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 72 | Quad safari z Sharm el Sheikh | `quad safari sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity, cannibalization risk |
| 73 | Quad safari 5h z Sharm el Sheikh z kolacją | `quad safari 5h sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, cannibalization risk |
| 74 | Sunset safari z teleskopem - Sharm el Sheikh | `sunset safari z teleskopem sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap |
| 75 | Buggy Safari - Sharm el Sheikh | `buggy safari sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 76 | Jazda na wielbłądzie lub konno - Sharm el Sheikh | `jazda na wielbłądzie sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, multi resort entity |
| 77 | Kair samolotem z Sharm el Sheikh - Muzeum Egipskie i piramidy | `kair samolotem muzeum egipskie z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, cannibalization risk, multi resort entity |
| 78 | Klasztor św. Katarzyny z Sharm el Sheikh - wycieczka na Synaj | `klasztor św katarzyny z sharm el sheikh` | _(no CSV cluster)_ | REMAINDER | no semrush cluster, content gap, cannibalization risk |

## 6. Priority shortlist

Scored qualitatively (search demand x low KD x transactional relevance x entity
strength x cannibalization safety) — no fabricated numeric score.

#### TOP 10
1. `orange bay` (2400/9) - Orange Bay z Hurghady (Hurghada)
2. `hula hula` (320/8) - Wycieczka z Hurghady na Wyspę Hula Hula (Hurghada)
3. `hurghada grand aquarium` (1600/8) - Wielkie Akwarium w Hurghadzie (Hurghada)
4. `mini egypt park` (320/7) - Wycieczka do Mini Egypt Park z Hurghady (Hurghada)
5. `parasailing` (3600/11) - Parasailing w Hurghadzie (Hurghada)
6. `sataya` (480/20) - Sataya z Marsa Alam - dom delfinów (Marsa Alam)
7. `abu dabbab` (1300/12) - Abu Dabbab z Marsa Alam - żółwie i snorkeling (Marsa Alam)
8. `marsa mubarak` (880/8) - Marsa Mubarak z Marsa Alam - snorkeling (Marsa Alam)
9. `hamata` (720/9) - Wycieczka z Marsa Alam na wyspy Hamata (Marsa Alam)
10. `sharm el lulli` (480/2) - Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab) (Marsa Alam)

#### NEXT 16
1. `wycieczki z hurghady do kairu` (260/3) - Wycieczka z Hurghady do Kairu (Hurghada)
2. `rejs po nilu kair i wielkie piramidy` (480/6) - Super Kair z Hurghady - piramidy, muzeum i Nil (Hurghada)
3. `wycieczka z hurghady do luksoru` (140/0) - Wycieczka do Luksoru z Hurghady (Hurghada)
4. `wyspa paradise egipt` (320/14) - Wyspa Paradise - rejs z Hurghady (Hurghada)
5. `sharm el naga` (210/6) - Sharm el Naga - snorkeling, wycieczka z Hurghady (Hurghada)
6. `dolphin house` (170/10) - Dom Delfinów (Dolphin House) - rejs z Hurghady (Hurghada)
7. `delfinarium hurghada` (260/7) - Delfinarium w Hurghadzie - pokaz delfinów (Hurghada)
8. `seascope hurghada` (90/8) - Rejs łodzią Seascope z Hurghady (Hurghada)
9. `quady hurghada` (110/4) - Moto Quad Safari 3h - wycieczka z Hurghady (Hurghada)
10. `buggy safari` (210/7) - Buggy Safari z Hurghady (Hurghada)
11. `wycieczki z marsa alam do kairu` (140/1) - Wycieczka z Marsa Alam do Kairu (Marsa Alam)
12. `wycieczki z marsa alam do luksoru` (170/3) - Wycieczka do Luksoru z Marsa Alam (Marsa Alam)
13. `marsa alam safari` (90/1) - Super Safari z Marsa Alam (Marsa Alam)
14. `marsa alam quady` (90/3) - Quad Safari z Marsa Alam - 5 godzin (Marsa Alam)
15. `wycieczki z sharm el sheikh do kairu` (110/-1) - Wycieczka z Sharm el Sheikh do Kairu (Sharm el Sheikh)
16. `delfinarium sharm el sheikh` (70/5) - Pokaz delfinów w Sharm el Sheikh (Sharm el Sheikh)

**REMAINDER (52):** every other tour — dominated by `no CSV cluster` semantic
pages (Sinai, international, private, by-plane, unnamed islands, camel/horse,
city/aquapark bundles) plus duration/scope-differentiated siblings. Optimise on
entity clarity + on-page factual content, not on chasing an absent head term.

## 7. Highest-volume tour-specific entity clusters

| Entity | Primary vol/KD | Supporting cluster (from CSV) | Owner tour |
|---|---|---|---|
| Parasailing | 3600/11 | `parasailing cena` 140/9 · `parasailing co to` 260/13 | Parasailing w Hurghadzie |
| Orange Bay | 2400/9 | `orange bay hurghada` 480/7 · `wyspa orange bay` 390/6 · `orange bay egipt` 260/6 | Orange Bay z Hurghady |
| Grand Aquarium | 1600/8 | `aquarium hurghada` 1300/8 · `hurghada aquarium` 1300/8 · `grand aquarium` 170/10 | Wielkie Akwarium |
| Abu Dabbab | 1300/12 | `abu dabbab beach` 170/15 · `zatoka abu dabbab` 170/8 · `abu dabbab marsa alam` 170/12 · `zatoka żółwi marsa alam` 110/0 | Abu Dabbab z Marsa Alam |
| Marsa Mubarak | 880/8 | `zatoka marsa mubarak` 90/5 | Marsa Mubarak snorkeling |
| Hamata / Qulaan | 720/9 (+`wyspy qulaan` 880/8) | `wyspa hamata` 260/5 · `hamata island` 260/6 · `hamata egipt` 210/7 | Wyspy Hamata |
| Paradise Island | 720/25 (primary 320/14) | `paradise island hurghada` 210/7 · `hurghada paradise island` 210/12 | Wyspa Paradise |
| Sataya | 480/20 | `sataya reef` 110/14 · `sataya dolphin reef` 110/3 | Sataya dom delfinów |

## 8. Lowest-KD useful commercial clusters (best ROI)

| Keyword | Vol/KD | Owner tour |
|---|---|---|
| `marsa alam safari` | 90/**1** | Super Safari z Marsa Alam |
| `wycieczki z marsa alam do kairu` | 140/**1** | Wycieczka z Marsa Alam do Kairu |
| `sharm el lulli` (`sharm el luli`) | 480/**2** | Sharm el Lulli / Ras Hankorab |
| `wycieczki z hurghady do kairu` | 260/**3** | Wycieczka z Hurghady do Kairu |
| `wycieczki z marsa alam do luksoru` · `wycieczka do luksoru z marsa alam` | 170/**3** · 140/3 | Luksor z Marsa Alam |
| `marsa alam quady` | 90/**3** | Quad Safari 5h z Marsa Alam |
| `quady hurghada` | 110/**4** | Moto Quad Safari 3h Hurghada |
| `delfinarium sharm el sheikh` | 70/**5** | Pokaz delfinów w Sharm |
| `rejs po nilu kair i wielkie piramidy` | 480/**6** | Super Kair z Hurghady |
| `sharm el naga` | 210/**6** | Sharm el Naga snorkeling |
| `mini egypt park` | 320/**7** | Mini Egypt Park |
| `delfinarium hurghada` | 260/**7** | Delfinarium Hurghada |
| `buggy safari` | 210/**7** | Buggy Safari z Hurghady |
| `hurghada grand aquarium` · `marsa mubarak` · `seascope hurghada` · `hula hula` | 1600/**8** · 880/8 · 90/8 · 320/8 | respective tour pages |
| `wycieczki z sharm el sheikh do kairu` | 110/**-1** | Kair z Sharm el Sheikh |
| `wycieczka z hurghady do luksoru` | 140/**0** | Luksor z Hurghady |

## 9. Multi-resort entity separation (13 groups)

Same attraction offered from >1 departure resort. The **broad** query stays with the
category hub; each tour page targets a **departure-modified** query. Never assign the
same primary to two resort pages.

| Entity | Broad (hub) | Hurghada page | Marsa Alam page | Sharm page |
|---|---|---|---|---|
| Kair (autokar, 1 dzień) | `wycieczka do kairu` 320/7 (Kair hub) | `wycieczki z hurghady do kairu` 260/3 (#1) | `wycieczki z marsa alam do kairu` 140/1 (#40) | `wycieczki z sharm el sheikh do kairu` 110/-1 (#60) |
| Kair + GEM | — | `kair gem z hurghady` N/A (#2) | `kair gem z marsa alam` N/A (#41) | (GEM inside #60) |
| Kair samolotem | — | `kair samolotem z hurghady` N/A (#4) | `kair samolotem z marsa alam` N/A (#42) | `kair samolotem z sharm el sheikh` N/A (#61, #77) |
| Kair prywatny | — | (#5) | (#43) | — |
| Luksor / Dolina Królów | `wycieczka do luksoru` 110/5 (Luksor hub) | `wycieczka z hurghady do luksoru` 140/0 (#6) | `wycieczki z marsa alam do luksoru` 170/3 (#44) | — |
| Luksor prywatny + Dendera | — | (#7) | (#45) | — |
| Abu Dabbab | — (entity -> tour) | `abu dabbab z hurghady` N/A (#22, ceded) | **`abu dabbab` 1300/12 (#48, canonical)** | — |
| Seascope | — | **`seascope hurghada` 90/8 (#25, canonical)** | `seascope marsa alam` N/A (#52) | `seascope sharm el sheikh` N/A (#70) |
| Parasailing | — | **`parasailing` 3600/11 (#37, canonical)** | — | `parasailing sharm el sheikh` N/A (#71) |
| Delfinarium / pokaz delfinów | — | `delfinarium hurghada` 260/7 (#20) | — | `delfinarium sharm el sheikh` 70/5 (#69) |
| Quad safari | `quady egipt` 140/6 (Safari hub) | `quady hurghada` 110/4 (#32; #33 = 5h) | `marsa alam quady` 90/3 (#57; #56/#58 siblings) | `quad safari sharm el sheikh` N/A (#72; #73 = 5h) |
| Buggy safari | — | **`buggy safari` 210/7 (#34, canonical)** | — | `buggy safari sharm el sheikh` N/A (#75) |
| Jazda na wielbłądzie/konno | — | `jazda na wielbłądzie hurghada` N/A (#36) | — | `jazda na wielbłądzie sharm el sheikh` N/A (#76) |

## 10. Cannibalization audit

22 pages flagged `CANNIBALIZATION_RISK`. Two kinds, both resolved above:

**A. Cross-resort broad term (5 groups)** — one canonical page keeps the broad term,
siblings take departure modifiers: Abu Dabbab (Marsa canonical), Seascope (Hurghada),
Parasailing (Hurghada), Buggy safari (Hurghada), Quad heads (per-resort split).

**B. Intra-site same-resort overlap (10 clusters)** — two pages in one resort with the
same natural primary; split by scope/duration long-tail:

| # | Resort | Pages | Split decision |
|---|---|---|---|
| 1 | Hurghada | Quad 3h #32 vs 5h #33 | `quady hurghada` -> #32; #33 = duration long-tail |
| 2 | Hurghada | Dolphin House snorkel #18 vs dive #19 | `dolphin house` -> #18; #19 = diving long-tail |
| 3 | Marsa | Sataya #46 vs Samadai #47 | `dom delfinów marsa alam` + `sataya` -> #46; #47 = Samadai entity |
| 4 | Marsa | Diving shore #54 vs boat #55 | `marsa alam nurkowanie` leans hub; split shore/boat long-tail |
| 5 | Marsa | Super Safari #56 vs quad #57/#58 vs jeep #59 | `marsa alam safari` -> #56; `marsa alam quady` -> #57; others differentiate |
| 6 | Sharm | Kair samolotem #61 vs #77 | Differentiate scope; **flag for consolidation review** |
| 7 | Sharm | Ras Mohamed #65 vs #66 | #65 = White Island + scuba combo; #66 = snorkel-only |
| 8 | Sharm | Tiran snorkel #67 vs dive #68 | Snorkel vs diving intent |
| 9 | Sharm | St Catherine #62 vs #78 | #62 = Moses + sunrise climb; #78 = daytime monastery |
| 10 | Sharm | Quad 3h #72 vs 5h #73 | 3h vs 5h + dinner |

Remaining duplicate **primary** ownership conflicts after this map: **0**.

## 11. No-CSV-cluster tours (52) — do not force a fake primary

52 of 78 tours have no strong exact cluster in the gap export. These fall into:

- **True content gaps (Sinai + international, 11 tours flagged `CONTENT_GAP`):** Góra
  Mojżesza, klasztor św. Katarzyny (x2), Blue Hole + Kolorowy Kanion, Ras Mohamed
  (x2), Wyspa Tiran (x2), White Island, Jordania/Petra, Sunset safari. Sinai and
  Petra entities are entirely absent from this Egypt-focused gap export — not proof
  of zero demand. Primary = semantic entity phrase at `volume: N/A`; needs future
  informational support + strong on-page entity content.
- **Unnamed / low-gap islands & activities:** Mahmya, Eden, Bianca, Magawish, Ozirea,
  Speedboat, Family Day, City Tour, Makadi Water World, camel/horse, jeep. Entity
  present on-site but absent (or off-intent) in the export.
- **Off-intent homonyms:** `el gouna` 4400 (town/hotel stay), `makadi bay` 2400
  (hotel zone), `nefertari` 880 (hotel/temple) — deliberately **not** adopted.
- **Scope/duration siblings:** by-plane Cairo, private Cairo/Luxor, 2h/5h quads,
  balloon Luxor — differentiated from their canonical sibling, no own head term.

## 12. Planning-only recommendations (DO NOT implement yet)

### 12a. Title / H1 direction (per-tour, future)
General pattern to apply later, tour by tour:
- **Title:** `<Entity/Tour> z <Resortu> - cena i co obejmuje | Egipskie Wakacje`
  (lead with the owned entity + departure modifier; keep the resort for multi-resort entities).
- **H1:** the exact owned primary phrased naturally (many current H1s already match —
  do **not** force keyword wording where the H1 is already the primary).
- For `no CSV cluster` tours: make the H1 the clear entity name; carry demand via
  descriptive on-page content and AEO answers, not a stuffed head term.

### 12b. Slug recommendations (record only — URLs may be indexed)
No slug is changed by this task. Only note worth recording:
- Sharm `kair-samolotem` (#61) and `kair-samolotem-muzeum-egipskie-piramidy` (#77) are
  near-duplicate Cairo-by-plane products — evaluate **consolidation** (not a slug edit)
  in a separate decision before optimising either.
- `plaza-orange-ozirea` (#23) contains the string `orange` — keep content clearly
  distinct from Orange Bay (#10) to avoid entity confusion; slug itself stays.

### 12c. Internal linking plan (natural anchors, no exact-match stuffing)
- **Incoming:** each tour is linked from its parent destination hub and parent category
  hub (see CSV `parent_destination` / `parent_category`), plus 2-3 sibling tours in the
  same resort+category (CSV `internal_link_targets`).
- **Outgoing:** each tour links up to its category and destination hub and across to
  closely related experiences (e.g. Orange Bay <-> Paradise <-> Mahmya; Sataya <->
  Samadai <-> Abu Dabbab; Cairo day <-> Cairo GEM <-> Cairo by plane).
- Multi-resort siblings cross-link (e.g. Abu Dabbab Marsa <-> Abu Dabbab Hurghady) so
  the canonical entity page and the departure variant reinforce, not fight.
- Anchors stay descriptive ("zobacz Orange Bay z Hurghady"), never bare exact-match
  repeated site-wide.

## 13. AEO / entity clarity (content-intent targets, not keyword stuffing)

Per-tour question sets are in the CSV (`aeo_questions`). They are drawn only from data
already present in `tours.ts` and answerable truthfully:
- **Price:** `Ile kosztuje ...?` (every tour has a verified price).
- **Logistics:** `Skąd jest odbiór?` (hotel pickup), `Ile trwa ...?` (durationLabel),
  transport type — all present per tour.
- **Guide:** `Czy jest polski przewodnik?` — answer only where `guide.polishConfirmed`
  is true; Sharm tours must reflect "potwierdzamy przed rezerwacją".
- **Family:** `Czy odpowiednia dla dzieci?` — only where child pricing / family framing exists.
- **Booking:** `Czy trzeba płacić z góry?` — site-wide truth (WhatsApp booking, no online payment).

Do **not** fabricate itinerary, weather, visa or safety answers on tour pages; those are
informational intent for future guides (per hub map reservations).

## 14. Validation

- [x] Every canonical tour appears exactly once (78/78; CSV enforces unique route, throws on dup)
- [x] No duplicate slug conflict (14 shared slugs are distinct routes under different resort bases)
- [x] No missing tour (parsed count 78 == CSV rows 78)
- [x] Every primary maps to one intended owner (reverse index §4 shows no entity double-assigned)
- [x] Every volume/KD sourced from the gap CSV; no invented metrics (`N/A` used where absent)
- [x] All parent routes exist (3 destination hubs + 8 category hubs verified in content; synaj/miedzynarodowe have no category hub -> parent = destination hub + all-tours)
- [x] Internal-link targets reference real canonical pages
- [x] Broad hub ownership preserved (no tour targets an L1-L3 head)
- [x] Entity pages not cannibalised unnecessarily (0 residual primary conflicts)

## 15. Guardrails (this phase is research only)

Not done, by instruction: no tour page edited; no title/meta/H1/schema/content/slug/
internal-link change; no deploy; no application-code change. This map + CSV are the
source of truth for the tour-by-tour optimisation that follows.
