# INTERNAL_SIMILARITY_REPORT.md

Pairwise editorial-similarity of the 81 tours, measured WITHIN each category cluster
(the same experience sold from different resorts is where near-duplicate copy is most
likely). Generated 2026-08-09 (task B18).

## Method

- Fields: shortDescription + overview + highlights per tour.
- Normalisation: lowercase, strip Polish diacritics + punctuation, drop short/stop words.
- Metric: Jaccard over word unigrams + bigrams (shingles). 0 = disjoint, 1 = identical.
- Only same-category pairs are scored (cross-category overlap is expected to be low and
  not a duplication risk).

## Headline

- Highest-similarity pair: **prywatna-wycieczka-luksor-dendera** vs **prywatna-wycieczka-luksor-dendera** (prywatne) = 0.374.
- Pairs >= 0.70: 0  |  >= 0.60: 0  |  >= 0.50: 0  |  >= 0.40: 0.

## Most at-risk clusters (mean intra-cluster similarity)

| category | tours | pairs | mean similarity |
|----------|-------|-------|-----------------|
| prywatne | 4 | 6 | 0.161 |
| kair | 10 | 45 | 0.096 |
| luksor | 4 | 6 | 0.094 |
| snorkeling-delfiny | 7 | 21 | 0.082 |
| nurkowanie | 5 | 10 | 0.073 |
| synaj | 3 | 3 | 0.070 |
| safari | 16 | 120 | 0.062 |
| rejsy-wyspy | 15 | 105 | 0.061 |
| atrakcje | 13 | 78 | 0.040 |

## Top 25 highest-similarity pairs

| # | score | category | tour A | tour B | departures |
|---|-------|----------|--------|--------|------------|
| 1 | 0.374 | prywatne | prywatna-wycieczka-luksor-dendera | prywatna-wycieczka-luksor-dendera | hurghada vs marsa-alam |
| 2 | 0.291 | safari | quad-safari-3h | quad-safari-5h | hurghada |
| 3 | 0.239 | rejsy-wyspy | wyspa-hula-hula | wyspa-magawish | hurghada |
| 4 | 0.237 | atrakcje | lodz-seascope | lodz-seascope | hurghada vs marsa-alam |
| 5 | 0.198 | atrakcje | lodz-seascope | lodz-seascope | hurghada vs sharm-el-sheikh |
| 6 | 0.194 | snorkeling-delfiny | sataya-dom-delfinow | samadai-dom-delfinow | marsa-alam |
| 7 | 0.184 | atrakcje | lodz-seascope | lodz-seascope | marsa-alam vs sharm-el-sheikh |
| 8 | 0.169 | snorkeling-delfiny | abu-dabbab-snorkeling | abu-dabbab | hurghada vs marsa-alam |
| 9 | 0.168 | kair | kair-piramidy-muzeum-egipskie | kair-gem-piramidy | hurghada vs sharm-el-sheikh |
| 10 | 0.166 | nurkowanie | nurkowanie-z-plazy | nurkowanie-z-lodzi | marsa-alam |
| 11 | 0.165 | kair | super-kair-piramidy-rejs-po-nilu | kair-samolotem | hurghada |
| 12 | 0.163 | safari | super-safari-quady | quad-safari-5h | marsa-alam |
| 13 | 0.159 | safari | super-safari-sahara-park | jeep-safari | hurghada vs marsa-alam |
| 14 | 0.158 | kair | kair-samolotem | kair-samolotem | hurghada vs marsa-alam |
| 15 | 0.156 | rejsy-wyspy | orange-bay | wyspa-paradise | hurghada |
| 16 | 0.156 | safari | quad-safari-3h | quad-safari-2h | hurghada vs marsa-alam |
| 17 | 0.154 | safari | family-safari | super-safari-sahara-park | hurghada |
| 18 | 0.151 | kair | kair-piramidy-muzeum-egipskie | kair-samolotem | hurghada |
| 19 | 0.150 | safari | jazda-konno-kapiel-w-morzu | jazda-na-wielbladzie | hurghada |
| 20 | 0.150 | rejsy-wyspy | wyspy-hamata | rejs-nefertari | marsa-alam |
| 21 | 0.148 | snorkeling-delfiny | samadai-dom-delfinow | marsa-mubarak-snorkeling | marsa-alam |
| 22 | 0.143 | prywatne | prywatna-wycieczka-do-kairu | prywatna-wycieczka-luksor-dendera | marsa-alam |
| 23 | 0.142 | kair | kair-samolotem | kair-samolotem-muzeum-egipskie-piramidy | sharm-el-sheikh |
| 24 | 0.141 | kair | kair-gem-piramidy | kair-samolotem-muzeum-egipskie-piramidy | sharm-el-sheikh |
| 25 | 0.140 | rejsy-wyspy | wyspa-mahmya | wyspa-bianca-lodz-szklane-dno | hurghada |

## Reading this

- High scores concentrate in clusters with the same product sold from different
  resorts (Kair variants, island cruises, PADI courses, dolphin/snorkel trips). This
  is EXPECTED - the included items, safety wording and booking instructions are
  legitimately shared and must NOT be rewritten just to lower a number.
- The redesign already reduces PERCEIVED duplication: every tour now sits in a
  labelled experience + departure context, and the card foregrounds the real
  differentiators (exact island/reef, boat type, duration, price, transport,
  family suitability). See recommendations below.

## Recommended differentiators (facts already in the data)

For the highest-risk clusters, each page should foreground its REAL difference; do
NOT invent differences:

- **Kair variants**: bus vs plane (transport), classic Museum vs GEM, with/without
  Nile cruise, 1-day vs longer - foreground transport + which museum + duration.
- **Island cruises (rejsy-wyspy)**: the exact island/beach (Orange Bay vs Paradise
  vs Mahmya vs Hamata vs White Island), boat type, and whether snorkeling stops are
  reef or sandbank.
- **Snorkeling/dolphins**: exact site (Sataya vs Samadai vs Dom Delfinów vs Abu
  Dabbab), wild-dolphin vs turtle/dugong, half vs full day, family suitability.
- **Nurkowanie / PADI**: intro dive vs certified course level (Open Water / Advanced
  / Rescue), EUR pricing, number of dives, shore vs boat.
- **Safari**: quad vs buggy vs jeep vs camel, sunset vs day, Bedouin-village add-on.

A future content pass can add a one-line data-driven "Co wyróżnia tę wycieczkę?" and a
"Ta opcja będzie lepsza, jeśli..." angle per tour, computed from these fields. That is
a content task best done with owner input (and real media) and is intentionally NOT
bulk-applied here to avoid fabricated distinctions.
