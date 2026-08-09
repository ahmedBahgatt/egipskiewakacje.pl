import type { Tour } from "@/content/types";

/**
 * Full tour inventory. Original Polish copy written for this site from factual
 * notes verified against the operator's own source pages (see CONTENT_SOURCES.md).
 * Prices are the exact CURRENT selling prices (USD; diving courses EUR). No fake
 * "old" prices, discounts, countdowns, ratings or bestseller labels anywhere.
 * Generated + hand-verified; the price headline and guide language are injected by
 * a deterministic build step, not free text.
 */

export const tours: Tour[] = [
  {
    "slug": "kair-piramidy-muzeum-egipskie",
    "route": "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie",
    "title": "Wycieczka z Hurghady do Kairu",
    "h1": "Wycieczka z Hurghady do Kairu",
    "destination": "hurghada",
    "category": "kair",
    "departure": "Hurghada",
    "shortDescription": "Cały dzień w Kairze i Gizie: Muzeum Egipskie, piramidy i Sfinks. Odbiór z hotelu w Hurghadzie, klimatyzowany autokar i polskojęzyczny przewodnik.",
    "overview": "To klasyczna, jednodniowa wyprawa z Hurghady do serca starożytnego Egiptu. Odwiedzasz Muzeum Egipskie w centrum Kairu, a następnie płaskowyż w Gizie z trzema piramidami i Sfinksem. Trasa jest długa, bo obejmuje dojazd w obie strony, dlatego wyruszamy nocą - dzięki temu na miejscu masz cały dzień na zwiedzanie.",
    "heroImage": {
      "src": "/media/tours/hurghada-kair",
      "alt": "Piramidy w Gizie o złotej godzinie, widok z płaskowyżu",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/hurghada-kair",
        "alt": "Piramidy w Gizie o złotej godzinie, widok z płaskowyżu",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 60,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 60,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko poniżej 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 20-22 godzin",
    "pickupLabel": "ok. 00:00-02:00",
    "transport": "Klimatyzowany autokar, odbiór i powrót pod hotel",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Muzeum Egipskie",
      "Piramidy w Gizie",
      "Sfinks",
      "Obiad"
    ],
    "itinerary": [
      {
        "time": "00:00-02:00",
        "title": "Odbiór z hotelu",
        "description": "Kierowca odbiera Cię spod hotelu w Hurghadzie. Godzinę podajemy wcześniej na WhatsApp - zależy od trasy autokaru."
      },
      {
        "title": "Przejazd do Kairu",
        "description": "Nocna trasa klimatyzowanym autokarem w kierunku stolicy. To dobry moment na sen przed pełnym dniem zwiedzania."
      },
      {
        "title": "Muzeum Egipskie",
        "description": "Zwiedzanie Muzeum Egipskiego w centrum Kairu - najważniejsze zabytki starożytnego Egiptu w towarzystwie przewodnika."
      },
      {
        "title": "Płaskowyż w Gizie",
        "description": "Trzy wielkie piramidy z bliska, czas na zdjęcia i spacer po terenie płaskowyżu."
      },
      {
        "title": "Sfinks",
        "description": "Wielki Sfinks - jeden z najbardziej rozpoznawalnych symboli Egiptu."
      },
      {
        "title": "Obiad",
        "description": "Ciepły posiłek w restauracji (bez napojów). Chwila odpoczynku w środku dnia."
      },
      {
        "title": "Opcjonalny rejs po Nilu",
        "description": "Dla chętnych krótki rejs po Nilu za dopłatą - dobry sposób na inne spojrzenie na miasto."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna autokarem z postojami. Powrót pod hotel wieczorem lub w nocy."
      }
    ],
    "included": [
      "Odbiór z hotelu i powrót",
      "Przejazd klimatyzowanym autokarem",
      "Polskojęzyczny przewodnik",
      "Bilety wstępu do głównych obiektów",
      "Obiad (bez napojów)"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Przejazd na wielbłądzie, koniu lub bryczce",
      "Opcjonalny rejs po Nilu"
    ],
    "transferSupplements": [
      {
        "zone": "Safaga, Soma Bay, Abu Soma, El Gouna",
        "amount": 10
      },
      {
        "zone": "Makadi Bay",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "ok. 10-12 USD od osoby, płatny na miejscu"
      },
      {
        "label": "Wejście do wnętrza piramidy",
        "note": "bilet dodatkowy, płatny na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień chodzenia",
      "Nakrycie głowy, okulary i krem z filtrem",
      "Woda i drobne przekąski na drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje"
    ],
    "requirements": [
      "Trasa jest długa i męcząca - warto wyspać się przed wyjazdem.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Na tym etapie ustalamy dostępność, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": true,
    "faqs": [
      {
        "question": "Czy przewodnik mówi po polsku?",
        "answer": "Tak, na trasie z Hurghady zapewniamy polskojęzycznego przewodnika."
      },
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat: 30 USD. Dzieci poniżej 5 lat jadą bezpłatnie. Dorośli: 60 USD od osoby."
      },
      {
        "question": "Czy rejs po Nilu jest w cenie?",
        "answer": "Nie. To opcja dodatkowa (ok. 10-12 USD od osoby), płatna na miejscu dla chętnych."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka z Hurghady do Kairu | Piramidy i Muzeum",
      "description": "Jednodniowa wycieczka z Hurghady do Kairu: Muzeum Egipskie, piramidy w Gizie i Sfinks. Cena od 60 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-wielkie-muzeum-gem",
    "route": "/wycieczki-z-hurghady/kair-wielkie-muzeum-gem",
    "title": "Wycieczka z Hurghady do Kairu z Wielkim Muzeum GEM",
    "h1": "Wycieczka z Hurghady do Kairu i Wielkiego Muzeum Egipskiego (GEM)",
    "destination": "hurghada",
    "category": "kair",
    "departure": "Hurghada",
    "shortDescription": "Wersja klasycznej wyprawy do Kairu z najnowocześniejszym muzeum w kraju: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Autokarem z Hurghady, z polskim przewodnikiem.",
    "overview": "To wariant wyprawy do Kairu, w którym zamiast klasycznego Muzeum Egipskiego zwiedzasz Wielkie Muzeum Egipskie (GEM) - nową, ogromną placówkę przy płaskowyżu w Gizie. Zbiory prezentowane są tu w nowoczesny sposób, a część ekspozycji stanowią skarby z grobowca Tutanchamona.\n\nPo muzeum przenosisz się na płaskowyż w Gizie, do trzech piramid i Sfinksa. Trasa jest jednodniowa, ale długa - wyjazd wypada nocą, a opieką służy polskojęzyczny przewodnik.",
    "heroImage": {
      "src": "/media/tours/h-kair-wielkie-muzeum-gem",
      "alt": "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-kair-wielkie-muzeum-gem",
        "alt": "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 90,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 90,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Wtorek, czwartek, niedziela",
    "availabilityDays": [
      "Wtorek",
      "Czwartek",
      "Niedziela"
    ],
    "durationLabel": "ok. 20-22 godzin",
    "pickupLabel": "Noc, ok. 00:00-02:00",
    "transport": "Klimatyzowany autokar z Hurghady do Kairu i z powrotem",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Wielkie Muzeum Egipskie (GEM)",
      "Piramidy w Gizie",
      "Sfinks",
      "Polski przewodnik"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Nocny odbiór spod hotelu w Hurghadzie i wyjazd w kierunku Kairu."
      },
      {
        "title": "Wielkie Muzeum Egipskie (GEM)",
        "description": "Zwiedzanie najnowocześniejszego muzeum w Egipcie, przy płaskowyżu w Gizie."
      },
      {
        "title": "Piramidy w Gizie",
        "description": "Trzy wielkie piramidy z bliska i czas na zdjęcia."
      },
      {
        "title": "Sfinks",
        "description": "Wielki Sfinks - symbol starożytnego Egiptu."
      },
      {
        "title": "Obiad",
        "description": "Ciepły posiłek w restauracji (bez napojów)."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna autokarem z postojami, powrót pod hotel wieczorem lub w nocy."
      }
    ],
    "included": [
      "Transport klimatyzowanym autokarem",
      "Polskojęzyczny przewodnik",
      "Bilety do GEM i na płaskowyż w Gizie",
      "Obiad"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Opcjonalny rejs po Nilu"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "opcja dodatkowa dla chętnych, płatna na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień",
      "Nakrycie głowy i krem z filtrem",
      "Gotówka na napoje i napiwki"
    ],
    "requirements": [
      "Trasa jest długa - warto wyspać się przed wyjazdem.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Czym GEM różni się od Muzeum Egipskiego?",
        "answer": "GEM (Wielkie Muzeum Egipskie) to nowa, bardzo duża placówka przy Gizie, prezentująca zbiory w nowoczesny sposób. Klasyczne Muzeum Egipskie leży w centrum Kairu i ma bardziej historyczny charakter."
      },
      {
        "question": "W które dni odbywa się ta wycieczka?",
        "answer": "Zwykle we wtorki, czwartki i niedziele. Dostępność w danym tygodniu potwierdzamy na WhatsApp."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka z Hurghady do Kairu z GEM | Piramidy",
      "description": "Kair z Hurghady z Wielkim Muzeum Egipskim (GEM), piramidami w Gizie i Sfinksem. Autokar, polski przewodnik, cena od 90 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/kair-wielkie-muzeum-gem/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "super-kair-piramidy-rejs-po-nilu",
    "route": "/wycieczki-z-hurghady/super-kair-piramidy-rejs-po-nilu",
    "title": "Super Kair z Hurghady - piramidy, muzeum i Nil",
    "h1": "Super Kair z Hurghady - piramidy, Muzeum Egipskie i rejs po Nilu",
    "destination": "hurghada",
    "category": "kair",
    "departure": "Hurghada",
    "shortDescription": "Rozbudowana wersja wyprawy do Kairu z Hurghady: Muzeum Egipskie, Stary Kair, piramidy w Gizie, Sfinks i czas na zakupy, a dla chętnych opcjonalny rejs po Nilu. Z polskim przewodnikiem.",
    "overview": "Super Kair to pełniejszy wariant jednodniowej wyprawy do stolicy. Poza klasycznym Muzeum Egipskim i płaskowyżem w Gizie program obejmuje też Stary Kair oraz czas na zakupy, a chętni mogą dopłacić do rejsu po Nilu.\n\nWyjazd wypada nocą, dzięki czemu na miejscu masz cały dzień. Przez całą trasę towarzyszy Ci polskojęzyczny przewodnik, a w cenie są transport, bilety wstępu i obiad.",
    "heroImage": {
      "src": "/media/tours/h-super-kair-piramidy-rejs-po-nilu",
      "alt": "Piramidy w Gizie i panorama Kairu nad Nilem",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-super-kair-piramidy-rejs-po-nilu",
        "alt": "Piramidy w Gizie i panorama Kairu nad Nilem",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 70,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 70,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "W piątki",
    "availabilityDays": [
      "Piątek"
    ],
    "durationLabel": "cały dzień, wyjazd nocą",
    "pickupLabel": "ok. 24:00-02:00, zależnie od hotelu",
    "transport": "Klimatyzowany autokar Hurghada - Kair - Giza",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Muzeum Egipskie",
      "Stary Kair",
      "Piramidy i Sfinks",
      "Opcjonalny rejs po Nilu"
    ],
    "itinerary": [
      {
        "time": "24:00-02:00",
        "title": "Odbiór z hotelu",
        "description": "Nocny wyjazd spod hotelu w Hurghadzie w kierunku Kairu."
      },
      {
        "title": "Muzeum Egipskie",
        "description": "Zwiedzanie najważniejszych zabytków starożytnego Egiptu z przewodnikiem."
      },
      {
        "title": "Stary Kair",
        "description": "Zabytkowa dzielnica z kościołami, meczetem i synagogą obok siebie."
      },
      {
        "title": "Piramidy w Gizie i Sfinks",
        "description": "Płaskowyż w Gizie, trzy piramidy i Sfinks, czas na zdjęcia."
      },
      {
        "title": "Obiad i czas na zakupy",
        "description": "Ciepły posiłek (bez napojów) oraz chwila na pamiątki."
      },
      {
        "title": "Opcjonalny rejs po Nilu",
        "description": "Dla chętnych krótki rejs po Nilu za dopłatą."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna autokarem, powrót pod hotel wieczorem lub w nocy."
      }
    ],
    "included": [
      "Transport klimatyzowanym autokarem",
      "Polskojęzyczny przewodnik",
      "Bilety do Muzeum oraz na piramidy i Sfinksa",
      "Obiad (bez napojów)"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Opcjonalny rejs po Nilu"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "opcja dodatkowa dla chętnych, płatna na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień",
      "Nakrycie głowy i krem z filtrem",
      "Gotówka na napoje, napiwki i zakupy"
    ],
    "requirements": [
      "Trasa jest długa - warto odpocząć przed wyjazdem.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Czym Super Kair różni się od klasycznej wycieczki do Kairu?",
        "answer": "Poza Muzeum Egipskim i Gizą program obejmuje dodatkowo Stary Kair oraz czas na zakupy, a chętni mogą dopłacić do rejsu po Nilu."
      },
      {
        "question": "Czy rejs po Nilu jest w cenie?",
        "answer": "Nie, to opcja dodatkowa dla chętnych, płatna na miejscu."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Super Kair z Hurghady | Piramidy, muzeum, Nil",
      "description": "Rozszerzona wycieczka do Kairu z Hurghady: Muzeum Egipskie, Stary Kair, piramidy, Sfinks i opcjonalny rejs po Nilu. Cena od 70 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/super-kair-piramidy-rejs-po-nilu/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-samolotem",
    "route": "/wycieczki-z-hurghady/kair-samolotem",
    "title": "Wycieczka z Hurghady do Kairu samolotem",
    "h1": "Wycieczka z Hurghady do Kairu samolotem",
    "destination": "hurghada",
    "category": "kair",
    "departure": "Hurghada",
    "shortDescription": "Kair w jeden dzień, bez męczącej nocnej trasy: lot z Hurghady trwa ok. 50 minut. W programie Muzeum Egipskie, piramidy w Gizie i Sfinks, z polskojęzycznym przewodnikiem w Kairze.",
    "overview": "To najwygodniejszy sposób na zobaczenie Kairu z Hurghady. Zamiast kilkunastu godzin w autokarze lecisz samolotem około 50 minut w jedną stronę, dzięki czemu na miejscu masz więcej czasu i sił na zwiedzanie.\n\nProgram obejmuje Muzeum Egipskie, płaskowyż w Gizie z trzema piramidami oraz Sfinksa. W Kairze towarzyszy Ci polskojęzyczny przewodnik, a w cenie są bilety lotnicze, transport na miejscu, wstępy i obiad.",
    "heroImage": {
      "src": "/media/tours/h-kair-samolotem",
      "alt": "Piramidy w Gizie widziane w słońcu - cel lotu z Hurghady do Kairu",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-kair-samolotem",
        "alt": "Piramidy w Gizie widziane w słońcu - cel lotu z Hurghady do Kairu",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 300,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 300,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "1 dzień, lot ok. 50 min w jedną stronę",
    "pickupLabel": "Wczesny ranek, zależnie od godzin lotów",
    "transport": "Transfer hotel - lotnisko - Kair, przeloty w obie strony",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Lot ok. 50 minut",
      "Muzeum Egipskie",
      "Piramidy i Sfinks",
      "Polski przewodnik"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu i lotnisko",
        "description": "Transfer z hotelu w Hurghadzie na lotnisko i odprawa na lot do Kairu."
      },
      {
        "title": "Lot do Kairu",
        "description": "Przelot trwa około 50 minut - dużo krócej i wygodniej niż nocna trasa autokarem."
      },
      {
        "title": "Muzeum Egipskie",
        "description": "Zwiedzanie zbiorów starożytnego Egiptu z polskojęzycznym przewodnikiem."
      },
      {
        "title": "Piramidy w Gizie i Sfinks",
        "description": "Płaskowyż w Gizie, trzy piramidy i Wielki Sfinks z bliska."
      },
      {
        "title": "Obiad",
        "description": "Posiłek w restauracji orientalnej (bez napojów)."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Przelot powrotny i transfer pod hotel."
      }
    ],
    "included": [
      "Bilety lotnicze w obie strony",
      "Transport na miejscu",
      "Polskojęzyczny przewodnik w Kairze",
      "Bilety wstępu wg programu",
      "Obiad"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Opcjonalne atrakcje"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Dokument tożsamości / paszport",
      "Wygodne buty",
      "Nakrycie głowy i krem z filtrem",
      "Gotówka na napoje i napiwki"
    ],
    "requirements": [
      "Godziny lotów potwierdzamy przed rezerwacją.",
      "Dostępność i odbiór z hotelu ustalamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Potwierdzamy dostępność, godziny lotów, odbiór z hotelu i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa lot z Hurghady do Kairu?",
        "answer": "Około 50 minut w jedną stronę. To główna zaleta tej opcji - zamiast całonocnej trasy autokarem docierasz do Kairu szybko i wypoczęty."
      },
      {
        "question": "Czy przewodnik w Kairze mówi po polsku?",
        "answer": "Tak, na trasie zwiedzania w Kairze zapewniamy polskojęzycznego przewodnika."
      },
      {
        "question": "Co jest w cenie lotu?",
        "answer": "Bilety lotnicze w obie strony, transport na miejscu, polski przewodnik, bilety wstępu według programu oraz obiad."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka z Hurghady do Kairu samolotem | 1 dzień",
      "description": "Kair z Hurghady samolotem: lot ok. 50 min, Muzeum Egipskie, piramidy w Gizie i Sfinks, polski przewodnik. Cena 300 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/kair-samolotem/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "prywatna-wycieczka-do-kairu",
    "route": "/wycieczki-z-hurghady/prywatna-wycieczka-do-kairu",
    "title": "Prywatna wycieczka do Kairu z Hurghady",
    "h1": "Prywatna wycieczka z Hurghady do Kairu - Stary Kair i piramidy",
    "destination": "hurghada",
    "category": "prywatne",
    "departure": "Hurghada",
    "shortDescription": "Prywatna, całodniowa wycieczka z Hurghady do Kairu w Twoim tempie. Zobaczysz zabytki Starego Kairu oraz piramidy w Gizie i Sfinksa, z polskojęzycznym przewodnikiem, prywatnym transferem i obiadem. Dobra opcja dla rodzin i mniejszych grup.",
    "overview": "Prywatna wycieczka do Kairu jest dla osób, które chcą zwiedzać stolicę Egiptu bez pośpiechu i we własnym gronie. Wyjazd z Hurghady odbywa się nocą, prywatnym, klimatyzowanym autem lub mikrobusem - dokładna godzina zależy od położenia hotelu.\n\nZwiedzanie zaczynasz od Starego Kairu, gdzie na jednym obszarze spotykają się trzy religie: zobaczysz Kościół Zawieszony Najświętszej Marii Panny, kościół świętego Sergiusza, meczet Amr Ibn el-As oraz synagogę Ben Ezra. Następnie przejeżdżasz do Gizy, gdzie około półtorej godziny spędzasz przy piramidach i Wielkim Sfinksie, a dla chętnych przewidziany jest krótki czas na pamiątki.\n\nW cenie są prywatny transfer, wstęp na teren piramid i Sfinksa, obiad oraz polskojęzyczny przewodnik. Wejście do wnętrza piramid, rejs po Nilu czy przejażdżka na wielbłądzie są dodatkowo płatne na miejscu. Szczegóły i godzinę odbioru potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-prywatna-wycieczka-do-kairu",
      "alt": "Prywatna wycieczka do Kairu z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-prywatna-wycieczka-do-kairu",
        "alt": "Prywatna wycieczka do Kairu z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 95,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły, 2 osoby",
          "amount": 115,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dorosły, 3-4 osoby",
          "amount": 105,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dorosły, 5+ osób",
          "amount": 95,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 55,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "unit": "os.",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Cena za osobę zależy od liczebności grupy. Dopłaty za transfer z hoteli poza Hurghadą."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Cały dzień (wyjazd nocą)",
    "pickupLabel": "nocą, ok. 0:30-2:30 (zależnie od hotelu)",
    "transport": "Prywatny, klimatyzowany samochód lub mikrobus, transfer z/do hotelu",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Piramidy w Gizie i Sfinks",
      "Stary Kair",
      "Prywatna wycieczka",
      "Polskojęzyczny przewodnik",
      "Transfer z hotelu"
    ],
    "itinerary": [
      {
        "time": "ok. 0:30-2:30",
        "title": "Odbiór z hotelu",
        "description": "Nocny wyjazd z Hurghady prywatnym, klimatyzowanym autem lub mikrobusem; dokładna godzina zależy od położenia hotelu."
      },
      {
        "title": "Stary Kair",
        "description": "Zwiedzanie zabytkowej dzielnicy: Kościół Zawieszony, kościół świętego Sergiusza, meczet Amr Ibn el-As i synagoga Ben Ezra."
      },
      {
        "time": "ok. 1,5 h",
        "title": "Giza - piramidy i Sfinks",
        "description": "Pobyt przy piramidach w Gizie i Wielkim Sfinksie, na terenie kompleksu."
      },
      {
        "title": "Obiad",
        "description": "Przerwa na obiad (bez napojów w cenie)."
      },
      {
        "time": "ok. 40 min",
        "title": "Czas na pamiątki",
        "description": "Dla chętnych krótki postój na zakup suwenirów."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna i transfer pod hotel."
      }
    ],
    "included": [
      "Prywatny transfer z/do hotelu (klimatyzowane auto lub mikrobus)",
      "Wstęp na teren piramid i Sfinksa w Gizie",
      "Obiad (bez napojów)",
      "Polskojęzyczny przewodnik"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste i zakupy",
      "Wejście do wnętrza piramid",
      "Rejs po Nilu",
      "Przejażdżka na wielbłądzie, koniu lub bryczką pod piramidami"
    ],
    "transferSupplements": [
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "ok. 10-12 USD/os., płatny na miejscu"
      },
      {
        "label": "Wejście do wnętrza piramid",
        "note": "bilet dodatkowy, płatny na miejscu"
      },
      {
        "label": "Przejażdżka na wielbłądzie, koniu lub bryczką",
        "note": "dodatkowo płatne na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport",
      "Wygodne obuwie",
      "Nakrycie głowy i krem przeciwsłoneczny",
      "Woda do picia",
      "Gotówka na bilety i pamiątki"
    ],
    "requirements": [
      "Paszport wymagany na trasie do Kairu",
      "Wczesny, nocny wyjazd - długi dzień zwiedzania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 55 USD za osobę, a dzieci do 5 lat jadą bezpłatnie."
      },
      {
        "question": "O której godzinie jest odbiór z hotelu?",
        "answer": "Wyjazd odbywa się nocą, około 0:30-2:30, w zależności od położenia hotelu."
      },
      {
        "question": "Czy potrzebny jest paszport?",
        "answer": "Tak, na trasie do Kairu obowiązuje paszport."
      },
      {
        "question": "Co obejmuje cena?",
        "answer": "Prywatny transfer, wstęp na teren piramid i Sfinksa, obiad oraz polskojęzyczny przewodnik. Wejście do wnętrza piramid, rejs po Nilu i przejażdżki są dodatkowo płatne."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Prywatna wycieczka do Kairu z Hurghady - piramidy",
      "description": "Prywatna wycieczka z Hurghady do Kairu: Stary Kair, piramidy w Gizie i Sfinks, polskojęzyczny przewodnik i obiad. Własne tempo, od 95 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/prywatna-wycieczka-do-kairu/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "luksor-dolina-krolow",
    "route": "/wycieczki-z-hurghady/luksor-dolina-krolow",
    "title": "Wycieczka do Luksoru z Hurghady",
    "h1": "Wycieczka do Luksoru z Hurghady",
    "destination": "hurghada",
    "category": "luksor",
    "departure": "Hurghada",
    "shortDescription": "Jednodniowa wyprawa z Hurghady do Luksoru: Karnak, Dolina Królów i świątynia Hatszepsut. Klimatyzowany autokar, polski przewodnik i pełny dzień nad zabytkami starożytnych Teb.",
    "overview": "Luksor to jedno z najważniejszych miejsc na mapie starożytnego Egiptu. W jeden dzień z Hurghady zobaczysz kompleks w Karnaku, Dolinę Królów z grobowcami faraonów oraz tarasową świątynię Hatszepsut.\n\nWyjazd wypada wcześnie rano, dzięki czemu na zwiedzanie zostaje cały dzień, a wieczorem wracasz do hotelu. Przez całą trasę towarzyszy Ci polskojęzyczny przewodnik.",
    "heroImage": {
      "src": "/media/tours/h-luksor-dolina-krolow",
      "alt": "Kolumny świątyni w Karnaku w Luksorze",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-luksor-dolina-krolow",
        "alt": "Kolumny świątyni w Karnaku w Luksorze",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 70,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 70,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 18-20 godzin",
    "pickupLabel": "ok. 3:00-4:00, zależnie od hotelu",
    "transport": "Klimatyzowany autokar z Hurghady do Luksoru i z powrotem",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Karnak",
      "Dolina Królów",
      "Świątynia Hatszepsut",
      "Polski przewodnik"
    ],
    "itinerary": [
      {
        "time": "3:00-4:00",
        "title": "Odbiór z hotelu",
        "description": "Wczesny poranny wyjazd spod hotelu w Hurghadzie w kierunku Luksoru."
      },
      {
        "title": "Karnak",
        "description": "Rozległy kompleks świątynny z aleją sfinksów i salą kolumnową."
      },
      {
        "title": "Dolina Królów",
        "description": "Grobowce faraonów wykute w skałach zachodniego brzegu Nilu."
      },
      {
        "title": "Świątynia Hatszepsut",
        "description": "Tarasowa świątynia w Deir el-Bahri, jeden z symboli Luksoru."
      },
      {
        "title": "Obiad",
        "description": "Ciepły posiłek w restauracji (bez napojów)."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna autokarem, powrót pod hotel wieczorem."
      }
    ],
    "included": [
      "Transport klimatyzowanym autokarem",
      "Polskojęzyczny przewodnik",
      "Bilety wstępu wg programu",
      "Obiad"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Lot balonem (opcja)",
      "Wejście do dodatkowych grobowców"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Lot balonem nad Luksorem",
        "note": "opcja dodatkowa, dostępna w wersji dwudniowej"
      }
    ],
    "whatToBring": [
      "Paszport",
      "Wygodne buty i nakrycie głowy",
      "Krem z filtrem i okulary",
      "Woda i gotówka na napoje"
    ],
    "requirements": [
      "Dzień jest długi - warto wyspać się przed wyjazdem.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": true,
    "faqs": [
      {
        "question": "Ile trwa dojazd do Luksoru z Hurghady?",
        "answer": "Przejazd w jedną stronę to zwykle 4-5 godzin. Wyjazd jest wczesnym rankiem, a powrót do hotelu wieczorem."
      },
      {
        "question": "Co zobaczę w Luksorze?",
        "answer": "W programie są Karnak, Dolina Królów i świątynia Hatszepsut - najważniejsze zabytki zachodniego i wschodniego brzegu Nilu."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka do Luksoru z Hurghady | Dolina Królów",
      "description": "Luksor z Hurghady w jeden dzień: Karnak, Dolina Królów i świątynia Hatszepsut. Autokar, polski przewodnik, cena od 70 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/luksor-dolina-krolow/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "prywatna-wycieczka-luksor-dendera",
    "route": "/wycieczki-z-hurghady/prywatna-wycieczka-luksor-dendera",
    "title": "Prywatna wycieczka do Luksoru i Dendery",
    "h1": "Prywatna wycieczka z Hurghady do Luksoru i Dendery",
    "destination": "hurghada",
    "category": "prywatne",
    "departure": "Hurghada",
    "shortDescription": "Prywatna, całodniowa wycieczka z Hurghady do Luksoru i Dendery z polskojęzycznym przewodnikiem. W programie Świątynia Hathor w Denderze oraz Dolina Królów, Karnak, Świątynia Hatszepsut i Kolosy Memnona w Luksorze, z obiadem i prywatnym transferem.",
    "overview": "Prywatna wycieczka do Luksoru i Dendery łączy dwa wyjątkowe miejsca w górnym Egipcie. Luksor, dawna stolica kraju nazywana Miastem Pałaców, to jedno z najważniejszych stanowisk archeologicznych na świecie. Dendera słynie z jednej z najlepiej zachowanych świątyń w Egipcie, poświęconej bogini Hathor.\n\nWyjazd z Hurghady odbywa się wcześnie rano, około godziny 4:00 - dokładna pora zależy od położenia hotelu. Najpierw docieracie do Dendery i podziwiacie świątynię Hathor z charakterystycznymi kolumnami zwieńczonymi głową bogini. Następnie przejeżdżacie do Luksoru, gdzie zobaczycie Dolinę Królów, Karnak, Świątynię Hatszepsut oraz Kolosy Memnona, a w miejscowej restauracji czeka na Was obiad.\n\nPrzez cały dzień towarzyszy Wam polskojęzyczny przewodnik. Dla chętnych przewidziany jest czas na rejs na Wyspę Bananową oraz wejście do Grobowca Tutanchamona - te atrakcje są dodatkowo płatne. Szczegóły i godzinę odbioru potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-prywatna-wycieczka-luksor-dendera",
      "alt": "Prywatna wycieczka do Luksoru i Dendery - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-prywatna-wycieczka-luksor-dendera",
        "alt": "Prywatna wycieczka do Luksoru i Dendery - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 180,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły, 2 osoby",
          "amount": 220,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dorosły, 3-4 osoby",
          "amount": 200,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dorosły, 5+ osób",
          "amount": 180,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 110,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "unit": "os.",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Cena za osobę zależy od liczebności grupy. Dopłaty za transfer z hoteli poza Hurghadą."
    },
    "availabilityLabel": "Poniedziałek, środa, piątek, sobota i niedziela",
    "availabilityDays": [
      "Poniedziałek",
      "Środa",
      "Piątek",
      "Sobota",
      "Niedziela"
    ],
    "durationLabel": "Cały dzień (wyjazd nad ranem)",
    "pickupLabel": "wcześnie rano, ok. 4:00 (zależnie od hotelu)",
    "transport": "Prywatny, klimatyzowany autokar lub mikrobus, transfer z/do hotelu",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Dolina Królów",
      "Karnak i Świątynia Hatszepsut",
      "Świątynia Hathor w Denderze",
      "Kolosy Memnona",
      "Polskojęzyczny przewodnik"
    ],
    "itinerary": [
      {
        "time": "ok. 4:00",
        "title": "Odbiór z hotelu",
        "description": "Wczesny poranny wyjazd z Hurghady; godzina zależy od położenia hotelu."
      },
      {
        "title": "Dendera - Świątynia Hathor",
        "description": "Zwiedzanie jednej z najlepiej zachowanych świątyń w Egipcie, poświęconej bogini Hathor, z kolumnami zwieńczonymi jej głową."
      },
      {
        "title": "Luksor - zachodni brzeg",
        "description": "Dolina Królów, Świątynia Hatszepsut i Kolosy Memnona."
      },
      {
        "title": "Karnak",
        "description": "Rozległy kompleks świątynny w Luksorze."
      },
      {
        "title": "Obiad w Luksorze",
        "description": "Posiłek w lokalnej restauracji."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Droga powrotna i transfer pod hotel."
      }
    ],
    "included": [
      "Prywatny transfer z/do hotelu (klimatyzowany autokar lub mikrobus)",
      "Zwiedzanie: Karnak, Świątynia Hatszepsut, Dolina Królów, Kolosy Memnona i Świątynia w Denderze",
      "Obiad",
      "Polskojęzyczny przewodnik"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste i zakupy",
      "Wejście do grobowca Tutanchamona i Ramzesa III",
      "Rejs na Wyspę Bananową"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [
      {
        "label": "Rejs na Wyspę Bananową",
        "note": "dla chętnych, płatny na miejscu"
      },
      {
        "label": "Wejście do Grobowca Tutanchamona",
        "note": "dla chętnych, bilet dodatkowy płatny na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport lub dokument tożsamości",
      "Wygodne obuwie",
      "Nakrycie głowy i krem przeciwsłoneczny",
      "Woda do picia",
      "Gotówka na bilety i pamiątki"
    ],
    "requirements": [
      "Wczesny wyjazd, ok. 4:00 - długi dzień zwiedzania",
      "Wygodne obuwie na całą trasę"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "Wycieczka jest organizowana w poniedziałki, środy, piątki, soboty i niedziele, z wyjazdem około godziny 4:00."
      },
      {
        "question": "Co zobaczę podczas wycieczki?",
        "answer": "W Denderze Świątynię Hathor, a w Luksorze Dolinę Królów, Karnak, Świątynię Hatszepsut i Kolosy Memnona."
      },
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 110 USD za osobę, a dzieci do 5 lat jadą bezpłatnie."
      },
      {
        "question": "Czy przewodnik mówi po polsku?",
        "answer": "Tak, przez cały dzień towarzyszy Wam polskojęzyczny przewodnik."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Prywatna wycieczka do Luksoru i Dendery z Hurghady",
      "description": "Prywatna wycieczka z Hurghady do Luksoru i Dendery: Dolina Królów, Karnak, Hatszepsut, Kolosy Memnona i Świątynia Hathor. Polski przewodnik, od 180 USD/os.",
      "canonicalPath": "/wycieczki-z-hurghady/prywatna-wycieczka-luksor-dendera/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "luksor-lot-balonem",
    "route": "/wycieczki-z-hurghady/luksor-lot-balonem",
    "title": "Luksor z Hurghady z lotem balonem",
    "h1": "Wycieczka z Hurghady do Luksoru z lotem balonem nad Luksorem",
    "destination": "hurghada",
    "category": "luksor",
    "departure": "Hurghada",
    "shortDescription": "Wyjazd z Hurghady do Luksoru z noclegiem i porannym lotem balonem nad zabytkami. Lot trwa około 45 minut, a nocleg w hotelu w Luksorze jest w cenie.",
    "overview": "To wersja wyprawy do Luksoru, w której najważniejszym punktem jest poranny lot balonem. Wyjeżdżasz z Hurghady, nocujesz w Luksorze, a nad ranem unosisz się balonem nad Nilem, świątyniami i Doliną Królów.\n\nLot trwa około 45 minut i odbywa się o wschodzie słońca, gdy światło jest najpiękniejsze. W cenie są transfer, sam lot oraz nocleg w hotelu w Luksorze.",
    "heroImage": {
      "src": "/media/tours/h-luksor-lot-balonem",
      "alt": "Kolorowe balony nad doliną Luksoru o wschodzie słońca",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-luksor-lot-balonem",
        "alt": "Kolorowe balony nad doliną Luksoru o wschodzie słońca",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 155,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 155,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2 dni, 1 noc",
    "pickupLabel": "ok. 8:00 lub 13:00 z Hurghady",
    "transport": "Transfer z Hurghady, nocleg w hotelu w Luksorze",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Lot balonem ok. 45 minut",
      "Wschód słońca nad Luksorem",
      "Nocleg w hotelu",
      "Widok na Nil i świątynie"
    ],
    "itinerary": [
      {
        "title": "Wyjazd z Hurghady",
        "description": "Odbiór z hotelu (ok. 8:00 lub 13:00) i przejazd do Luksoru."
      },
      {
        "title": "Nocleg w Luksorze",
        "description": "Zakwaterowanie w hotelu przed porannym lotem."
      },
      {
        "time": "3:00-5:00",
        "title": "Lot balonem nad Luksorem",
        "description": "Poranny lot trwający około 45 minut, z widokiem na Nil i świątynie."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Po locie powrót do hotelu i droga powrotna do Hurghady."
      }
    ],
    "included": [
      "Transfer",
      "Lot balonem",
      "Nocleg w hotelu w Luksorze"
    ],
    "excluded": [
      "Wyżywienie poza wskazanym",
      "Napoje",
      "Wydatki własne",
      "Bilety wstępu do zabytków (jeśli nie wskazano)"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Rzeczy na nocleg",
      "Coś ciepłego na poranny lot",
      "Aparat lub telefon",
      "Gotówka na wydatki własne"
    ],
    "requirements": [
      "Lot balonem zależy od warunków pogodowych.",
      "Dostępność i godzinę wyjazdu potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. W razie złej pogody lot balonem może zostać przełożony. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa lot balonem?",
        "answer": "Około 45 minut. Lot odbywa się wcześnie rano, o wschodzie słońca, kiedy widoki na Luksor są najpiękniejsze."
      },
      {
        "question": "Czy nocleg jest w cenie?",
        "answer": "Tak, nocleg w hotelu w Luksorze jest wliczony w cenę, podobnie jak transfer i sam lot balonem."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Luksor z Hurghady z lotem balonem | Nocleg",
      "description": "Wyjazd z Hurghady do Luksoru z noclegiem i porannym lotem balonem nad Nilem i świątyniami. Cena od 155 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/luksor-lot-balonem/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "luksor-2-dni-lot-balonem",
    "route": "/wycieczki-z-hurghady/luksor-2-dni-lot-balonem",
    "title": "Luksor z Hurghady - 2 dni z lotem balonem",
    "h1": "Dwudniowa wycieczka z Hurghady do Luksoru z lotem balonem",
    "destination": "hurghada",
    "category": "luksor",
    "departure": "Hurghada",
    "shortDescription": "Dwudniowa wyprawa z Hurghady do Luksoru z noclegiem: Dolina Królów, Kolosy Memnona, świątynia Hatszepsut i Karnak pierwszego dnia, a o wschodzie słońca lot balonem nad Luksorem. Z polskim przewodnikiem.",
    "overview": "Ta dwudniowa wyprawa daje na Luksor znacznie więcej czasu niż wersja jednodniowa. Pierwszego dnia zwiedzasz zachodni i wschodni brzeg Nilu - Dolinę Królów, Kolosy Memnona, świątynię Hatszepsut i kompleks w Karnaku - a wieczór spędzasz w hotelu w Luksorze.\n\nDrugiego dnia, jeszcze przed świtem, wyruszasz na lot balonem nad Luksorem. Widok na Nil, świątynie i pustynię z góry to jedno z najbardziej widowiskowych przeżyć w Egipcie. Po locie wracasz na śniadanie i w drogę powrotną do Hurghady.",
    "heroImage": {
      "src": "/media/tours/h-luksor-2-dni-lot-balonem",
      "alt": "Balon nad świątyniami Luksoru o wschodzie słońca",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-luksor-2-dni-lot-balonem",
        "alt": "Balon nad świątyniami Luksoru o wschodzie słońca",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPackage",
      "amount": 225,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 225,
          "currency": "USD",
          "note": "5-8 osób"
        },
        {
          "label": "Dorosły",
          "amount": 240,
          "currency": "USD",
          "note": "3-4 osoby"
        },
        {
          "label": "Dorosły",
          "amount": 270,
          "currency": "USD",
          "note": "2 osoby"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 185,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Cena od osoby zależy od liczby uczestników. Balonem mogą lecieć dzieci od 8 lat."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "2 dni, 1 noc",
    "pickupLabel": "ok. 3:00-4:00 rano pierwszego dnia",
    "transport": "Klimatyzowany autokar lub mikrobus, nocleg w hotelu w Luksorze",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Dolina Królów",
      "Świątynia Hatszepsut",
      "Karnak",
      "Lot balonem o wschodzie słońca",
      "Nocleg w Luksorze"
    ],
    "itinerary": [
      {
        "title": "Wyjazd z Hurghady",
        "description": "Odbiór z hotelu nad ranem i przejazd do Luksoru (na miejscu ok. 8-9)."
      },
      {
        "title": "Dolina Królów",
        "description": "Zwiedzanie grobowców faraonów na zachodnim brzegu Nilu."
      },
      {
        "title": "Kolosy Memnona i świątynia Hatszepsut",
        "description": "Dwa potężne posągi oraz tarasowa świątynia w Deir el-Bahri."
      },
      {
        "title": "Karnak",
        "description": "Rozległy kompleks świątynny - jedno z największych przedsięwzięć starożytnego Egiptu."
      },
      {
        "title": "Nocleg w Luksorze",
        "description": "Odpoczynek w hotelu przed porannym lotem balonem."
      },
      {
        "time": "3:00-5:00",
        "title": "Lot balonem nad Luksorem",
        "description": "Poranny lot nad Nilem i świątyniami, a po nim powrót na śniadanie."
      },
      {
        "title": "Powrót do Hurghady",
        "description": "Po śniadaniu droga powrotna autokarem do hotelu w Hurghadzie."
      }
    ],
    "included": [
      "Przejazd klimatyzowanym autokarem lub mikrobusem",
      "Lot balonem",
      "Polskojęzyczny przewodnik",
      "Nocleg w hotelu ze śniadaniem",
      "Obiad pierwszego dnia"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje",
      "Rejs na Wyspę Bananową",
      "Wejście do grobowca Tutanchamona"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Rzeczy na nocleg",
      "Wygodne buty i nakrycie głowy",
      "Coś ciepłego na poranny lot",
      "Gotówka na napoje i wydatki własne"
    ],
    "requirements": [
      "Balonem mogą lecieć dzieci od 8 lat.",
      "Dostępność, godzinę odbioru i warunki lotu potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Lot balonem zależy od warunków pogodowych - w razie odwołania ustalamy alternatywę. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Od ilu lat dziecko może lecieć balonem?",
        "answer": "Balonem mogą lecieć dzieci od 8 lat. Młodsze dzieci mogą wziąć udział w pozostałej części programu."
      },
      {
        "question": "Dlaczego cena zależy od liczby osób?",
        "answer": "Im większa grupa, tym niższa cena od osoby - dlatego podajemy widełki: 2 osoby 270 USD, 3-4 osoby 240 USD, 5-8 osób 225 USD od osoby."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Luksor z Hurghady 2 dni z lotem balonem | Egipt",
      "description": "Dwudniowa wycieczka z Hurghady do Luksoru z noclegiem i lotem balonem: Dolina Królów, Hatszepsut, Karnak. Cena od 225 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/luksor-2-dni-lot-balonem/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "orange-bay",
    "route": "/wycieczki-z-hurghady/orange-bay",
    "title": "Orange Bay z Hurghady",
    "h1": "Orange Bay Hurghada - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka łodzią z Hurghady na wyspę Orange Bay, z plażą i przystankami na snorkeling. W cenie transfer z hotelu, sprzęt do snorkelingu oraz lunch i napoje na pokładzie. Dobra propozycja na relaks nad rafą dla całej rodziny.",
    "overview": "Orange Bay to jedna z najchętniej odwiedzanych wysp w okolicy Hurghady, znana z piaszczystej plaży i przejrzystej wody. Wycieczka ma formę całodniowego rejsu i trwa około 7-8 godzin, wraz z transferem z hotelu i z powrotem.\n\nPodczas rejsu przewidziane są jeden lub dwa postoje na snorkeling, a sprzęt zapewniamy na miejscu. Na wyspie masz czas na wypoczynek na plaży i kąpiel w morzu. Przy dobrej pogodzie dostępne są dodatkowo płatne sporty wodne, takie jak banan czy kanapa.\n\nW cenie są transfer z/do hotelu w Hurghadzie, rejs, sprzęt do snorkelingu, lunch na łodzi oraz ciepłe i zimne napoje na statku. Za hotele położone poza Hurghadą mogą obowiązywać dopłaty. Szczegóły rezerwacji potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-orange-bay",
      "alt": "Orange Bay z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-orange-bay",
        "alt": "Orange Bay z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 30,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 30,
          "currency": "USD",
          "unit": "os."
        }
      ],
      "note": "Możliwe dopłaty za strefy hotelowe poza Hurghadą."
    },
    "availabilityLabel": "Codziennie (według dostępności)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer z/do hotelu w Hurghadzie",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wyspa Orange Bay",
      "Snorkeling na rafie",
      "Plaża",
      "Lunch i napoje na łodzi",
      "Transfer z hotelu"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer spod hotelu w Hurghadzie do portu."
      },
      {
        "title": "Rejs na Orange Bay",
        "description": "Wypłynięcie łodzią w stronę wyspy Orange Bay."
      },
      {
        "title": "Snorkeling",
        "description": "Jeden lub dwa postoje na snorkeling na rafie; sprzęt zapewniamy."
      },
      {
        "title": "Plaża na Orange Bay",
        "description": "Czas na wypoczynek na plaży i kąpiel w morzu."
      },
      {
        "title": "Lunch na łodzi",
        "description": "Posiłek serwowany na pokładzie, z ciepłymi i zimnymi napojami."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Rejs do portu i transfer pod hotel."
      }
    ],
    "included": [
      "Transfer z/do hotelu w Hurghadzie",
      "Rejs łodzią",
      "Sprzęt do snorkelingu",
      "Lunch na łodzi",
      "Ciepłe i zimne napoje na statku"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne",
      "Sporty wodne (banan, kanapa)"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Sporty wodne (banan, kanapa)",
        "note": "przy dobrej pogodzie, dodatkowo płatne"
      }
    ],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne",
      "Klapki"
    ],
    "requirements": [
      "Sprzęt do snorkelingu zapewniamy - przyda się umiejętność pływania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": true,
    "faqs": [
      {
        "question": "Ile trwa wycieczka na Orange Bay?",
        "answer": "Wycieczka trwa około 7-8 godzin, razem z transferem z hotelu i z powrotem."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "Transfer z/do hotelu, rejs łodzią, sprzęt do snorkelingu, lunch na łodzi oraz ciepłe i zimne napoje."
      },
      {
        "question": "Czy podczas rejsu jest snorkeling?",
        "answer": "Tak, przewidziane są jeden lub dwa postoje na snorkeling na rafie, a sprzęt zapewniamy."
      },
      {
        "question": "Czy są dostępne sporty wodne?",
        "answer": "Przy dobrej pogodzie dostępne są sporty wodne, takie jak banan czy kanapa - są one dodatkowo płatne."
      }
    ],
    "seo": {
      "title": "Orange Bay z Hurghady - rejs, plaża i snorkeling",
      "description": "Wycieczka na Orange Bay z Hurghady: rejs łodzią, snorkeling, plaża, lunch i napoje na łodzi oraz transfer z hotelu. Ok. 7-8 godzin, 30 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/orange-bay/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-paradise",
    "route": "/wycieczki-z-hurghady/wyspa-paradise",
    "title": "Wyspa Paradise - rejs z Hurghady",
    "h1": "Wyspa Paradise - rejs z Hurghady",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Rejs z Hurghady na Paradise Island z jednym lub dwoma postojami na snorkeling, około dwiema godzinami na plaży, sportami wodnymi i lunchem. Prosty, całodniowy dzień nad Morzem Czerwonym.",
    "overview": "Paradise Island to niewielka wyspa u wybrzeży Hurghady, popularny cel jednodniowych rejsów z plażą i snorkelingiem. Wycieczka trwa około 7-8 godzin i łączy czas na wodzie z wypoczynkiem na piasku.\n\nPo odbiorze z hotelu w Hurghadzie i transferze do portu wypływasz łodzią na wyspę. Po drodze przewidziano jeden lub dwa postoje na snorkeling, a sprzęt jest zapewniony. Na Paradise Beach masz około dwóch godzin relaksu, dostępne są też sporty wodne - banan lub kanapa.\n\nW cenie jest lunch w restauracji na plaży oraz napoje na łodzi. Wycieczka jest dostępna codziennie, w zależności od bieżącej dostępności. Za okolice poza Hurghadą mogą obowiązywać dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-paradise",
      "alt": "Wyspa Paradise - rejs z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-paradise",
        "alt": "Wyspa Paradise - rejs z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 45,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 45,
          "currency": "USD"
        }
      ],
      "note": "Za okolice poza Hurghadą mogą obowiązywać dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie (w zależności od dostępności)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Paradise Island",
      "Snorkeling",
      "Plaża i relaks",
      "Sporty wodne",
      "Lunch w restauracji na plaży"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do portu."
      },
      {
        "title": "Rejs na Paradise Island",
        "description": "Rejs łodzią na wyspę z jednym lub dwoma postojami na snorkeling."
      },
      {
        "title": "Snorkeling",
        "description": "Pływanie z maską i rurką nad rafą; sprzęt jest zapewniony."
      },
      {
        "title": "Plaża",
        "description": "Około 2 godziny relaksu na Paradise Beach; dostępne sporty wodne - banan lub kanapa."
      },
      {
        "title": "Lunch",
        "description": "Obiad w restauracji na plaży; napoje na łodzi."
      },
      {
        "title": "Powrót",
        "description": "Transfer z portu z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu w Hurghadzie",
      "Rejs łodzią",
      "Sprzęt do snorkelingu",
      "Lunch w restauracji na plaży",
      "Napoje na łodzi"
    ],
    "excluded": [
      "Napoje alkoholowe",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka?",
        "answer": "Cena dla osoby dorosłej wynosi 45 USD. Za odbiór z hoteli poza Hurghadą mogą obowiązywać dopłaty do transferu."
      },
      {
        "question": "Ile trwa wycieczka?",
        "answer": "Wyprawa trwa około 7-8 godzin i obejmuje rejs, snorkeling oraz około dwie godziny na plaży."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "W cenie są transfer z i do hotelu w Hurghadzie, rejs, sprzęt do snorkelingu, lunch w restauracji na plaży oraz napoje na łodzi."
      },
      {
        "question": "Czy wycieczka jest codziennie?",
        "answer": "Tak, wyjazdy odbywają się codziennie, w zależności od bieżącej dostępności."
      }
    ],
    "seo": {
      "title": "Wyspa Paradise - rejs z Hurghady",
      "description": "Rejs z Hurghady na Paradise Island: 1-2 postoje na snorkeling, ok. 2 godziny na plaży, sporty wodne i lunch. Cena od 45 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-paradise/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-mahmya",
    "route": "/wycieczki-z-hurghady/wyspa-mahmya",
    "title": "Wycieczka z Hurghady na Wyspę Mahmya",
    "h1": "Wyspa Mahmya - całodniowy rejs z Hurghady",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wyprawa jachtem z Hurghady na Wyspę Mahmya, nazywaną egipskimi Malediwami. Biała plaża, snorkeling nad rafami i obiad w formie bufetu w restauracji na wyspie.",
    "overview": "Mahmya Island to jedna z najbardziej znanych wysp w okolicy Hurghady, bywa nazywana egipskimi Malediwami ze względu na białą plażę i turkusową wodę. Całodniowa wyprawa łączy rejs jachtem, snorkeling nad rafami i relaks na wyspie.\n\nRano odbieramy Cię z hotelu w Hurghadzie i przewozimy do przystani. Rejs jachtem prowadzi na wyspę Mahmya, po drodze przewidziany jest postój na snorkeling. Na miejscu masz czas na plażę, kąpiele słoneczne i spacery, a obiad podawany jest w formie bufetu w restauracji na wyspie.\n\nPowrót do portu i transfer do hotelu planowane są na około 16:00-17:00. Wycieczka odbywa się w niedziele, wtorki i czwartki. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-mahmya",
      "alt": "Wycieczka z Hurghady na Wyspę Mahmya - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-mahmya",
        "alt": "Wycieczka z Hurghady na Wyspę Mahmya - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 97,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 97,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 55,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Niedziela, wtorek i czwartek",
    "availabilityDays": [
      "Wtorek",
      "Czwartek",
      "Niedziela"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "rano",
    "returnLabel": "ok. 16:00-17:00",
    "transport": "Rejs jachtem, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wyspa Mahmya",
      "Egipskie Malediwy",
      "Biała plaża",
      "Snorkeling",
      "Obiad w formie bufetu"
    ],
    "itinerary": [
      {
        "time": "rano",
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do przystani."
      },
      {
        "title": "Rejs jachtem",
        "description": "Rejs komfortowym jachtem na wyspę Mahmya po wodach Morza Czerwonego."
      },
      {
        "title": "Snorkeling",
        "description": "Postój nad rafą - pływanie z maską i rurką wśród kolorowych ryb."
      },
      {
        "title": "Relaks na wyspie",
        "description": "Czas wolny na plaży Mahmya z białym piaskiem - kąpiele słoneczne, spacery i zdjęcia."
      },
      {
        "title": "Obiad w restauracji na wyspie",
        "description": "Bufet z daniami kuchni orientalnej i międzynarodowej."
      },
      {
        "time": "ok. 16:00-17:00",
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs jachtem",
      "Obiad na wyspie (bufet)",
      "Sprzęt do snorkelingu",
      "Woda i napoje bezalkoholowe na łodzi"
    ],
    "excluded": [
      "Napoje alkoholowe",
      "Zakupy, wydatki własne i napiwki",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "Safaga, Soma Bay, El Gouna",
        "amount": 10
      },
      {
        "zone": "Makadi Bay, Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać",
      "Dzieci pozostają pod opieką opiekunów"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 55 USD, a dzieci do 5 lat są zwolnione z opłaty. Dorosły to 97 USD za osobę."
      },
      {
        "question": "Jak wygląda obiad na wyspie?",
        "answer": "Obiad podawany jest w formie bufetu w restauracji na wyspie, z daniami kuchni orientalnej i międzynarodowej. Woda i napoje bezalkoholowe na łodzi są wliczone w cenę."
      },
      {
        "question": "Czym płynie się na wyspę?",
        "answer": "Na wyspę Mahmya płynie się jachtem; po drodze przewidziany jest postój na snorkeling."
      },
      {
        "question": "W jakie dni odbywa się wyprawa?",
        "answer": "Wycieczka realizowana jest w niedziele, wtorki i czwartki."
      }
    ],
    "seo": {
      "title": "Wyspa Mahmya - całodniowy rejs z Hurghady",
      "description": "Rejs jachtem z Hurghady na Wyspę Mahmya - egipskie Malediwy: biała plaża, snorkeling i obiad w formie bufetu. Od 97 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-mahmya/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-eden",
    "route": "/wycieczki-z-hurghady/wyspa-eden",
    "title": "Wycieczka z Hurghady na Wyspę Eden",
    "h1": "Wycieczka z Hurghady na Wyspę Eden",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Jednodniowy rejs z Hurghady na Wyspę Eden z dwoma postojami na snorkeling, lunchem na statku i czasem na plaży. Dobry wybór dla osób, które chcą połączyć podwodny świat z relaksem.",
    "overview": "Wyspa Eden leży niedaleko wybrzeża Hurghady i jest celem całodniowego rejsu łączącego snorkeling z wypoczynkiem na plaży. To propozycja dla osób, które chcą spędzić dzień na wodzie i zobaczyć podwodny świat Morza Czerwonego.\n\nRano odbieramy Cię z hotelu i przewozimy do portu. Podczas rejsu przewidziane są dwa postoje na snorkeling, a na statku serwowany jest lunch oraz ciepłe i zimne napoje. Po dopłynięciu do wyspy możesz snurkować w jednym z najlepszych miejsc przy brzegu albo odpoczywać i opalać się na plaży.\n\nW drodze powrotnej, jeśli pogoda i morze pozwolą, jest okazja do sportów wodnych - banana i sofy. Po rejsie odwozimy Cię do hotelu. Wyjazdy odbywają się w poniedziałki i piątki. Kamizelki asekuracyjne (kapoki) nie są wliczone w cenę.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-eden",
      "alt": "Wycieczka z Hurghady na Wyspę Eden - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-eden",
        "alt": "Wycieczka z Hurghady na Wyspę Eden - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 75,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 75,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-10 lat",
          "amount": 38,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Poniedziałek i piątek",
    "availabilityDays": [
      "Poniedziałek",
      "Piątek"
    ],
    "durationLabel": "cały dzień",
    "pickupLabel": "rano",
    "transport": "Rejs statkiem, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wyspa Eden",
      "Dwa postoje na snorkeling",
      "Lunch na statku",
      "Plaża i opalanie",
      "Sporty wodne"
    ],
    "itinerary": [
      {
        "time": "rano",
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do portu, skąd wypływa rejs."
      },
      {
        "title": "Pierwszy postój na snorkeling",
        "description": "Zatrzymanie nad rafą do pływania z maską i rurką; sprzęt jest zapewniony."
      },
      {
        "title": "Lunch na statku",
        "description": "Posiłek na pokładzie oraz ciepłe i zimne napoje."
      },
      {
        "title": "Drugi postój na snorkeling",
        "description": "Kolejne miejsce do podziwiania podwodnego świata Morza Czerwonego."
      },
      {
        "title": "Wyspa Eden",
        "description": "Postój przy wyspie - snorkeling w jednym z najlepszych miejsc lub relaks i opalanie na plaży."
      },
      {
        "title": "Sporty wodne w drodze powrotnej",
        "description": "Banan i sofa wodna, jeśli pogoda i morze pozwolą."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer z portu z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Obiad na statku",
      "Ciepłe i zimne napoje na statku",
      "Sprzęt do snorkelingu",
      "Sporty wodne (banan i sofa)"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje i jedzenie na plaży",
      "Kamizelki asekuracyjne (kapoki)",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling zalecany dla osób umiejących pływać; kamizelki asekuracyjne (kapoki) są dodatkowo płatne",
      "Dzieci pozostają pod opieką opiekunów"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje udział dziecka?",
        "answer": "Dzieci w wieku 5-10 lat płacą 38 USD, a dzieci do 5 lat są zwolnione z opłaty. Cena dla dorosłego to 75 USD za osobę."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "W cenie są transfer z i do hotelu, obiad na statku, ciepłe i zimne napoje, sprzęt do snorkelingu oraz sporty wodne. Kamizelki asekuracyjne (kapoki) są dodatkowo płatne."
      },
      {
        "question": "Ile razy zatrzymujemy się na snorkeling?",
        "answer": "Podczas rejsu przewidziane są dwa postoje na snorkeling, a dodatkowo można snurkować przy samej wyspie."
      },
      {
        "question": "W jakie dni odbywa się rejs?",
        "answer": "Wyjazdy odbywają się w poniedziałki i piątki."
      }
    ],
    "seo": {
      "title": "Wycieczka na Wyspę Eden - rejs z Hurghady",
      "description": "Rejs z Hurghady na Wyspę Eden: dwa postoje na snorkeling, lunch na statku, plaża i sporty wodne. Cena od 75 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-eden/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-bianca-lodz-szklane-dno",
    "route": "/wycieczki-z-hurghady/wyspa-bianca-lodz-szklane-dno",
    "title": "Wyspa Bianca i łódź ze szklanym dnem - rejs z Hurghady",
    "h1": "Wyspa Bianca i łódź ze szklanym dnem - rejs z Hurghady",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Całodniowy rejs z Hurghady na Wyspę Bianca łodzią ze szklanym dnem. Dobra opcja dla rodzin - podwodny świat oglądasz bez wchodzenia do wody, a na wyspie czeka plaża, snorkeling i obiad na pokładzie.",
    "overview": "Wyspa Bianca to jedna z popularnych plaż w okolicy Hurghady, a wersja tej wycieczki z łodzią ze szklanym dnem pozwala zobaczyć rafy koralowe i ryby Morza Czerwonego bez konieczności nurkowania. To wygodne rozwiązanie dla rodzin z dziećmi i osób, które nie czują się pewnie w wodzie.\n\nDzień zaczyna się od odbioru z hotelu około 8:00 klimatyzowanym busem i transferu do portu. Po rejsie łodzią ze szklanym dnem następuje postój na Wyspie Bianca z czasem na kąpiel, snorkeling i zdjęcia. Na pokładzie serwowany jest orientalny obiad z owocami morza i napojami bezalkoholowymi, a gdy pozwolą warunki - przejażdżka bananem lub sofą wodną.\n\nPowrót do portu i transfer do hotelu planowany jest na około 15:30-16:00. Wycieczka odbywa się w niedziele i czwartki. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-bianca-lodz-szklane-dno",
      "alt": "Wyspa Bianca i łódź ze szklanym dnem - rejs z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-bianca-lodz-szklane-dno",
        "alt": "Wyspa Bianca i łódź ze szklanym dnem - rejs z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 75,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 75,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 38,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Niedziela i czwartek",
    "availabilityDays": [
      "Czwartek",
      "Niedziela"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "poranek, ok. 8:00",
    "returnLabel": "ok. 15:30-16:00",
    "transport": "Rejs łodzią ze szklanym dnem, transfer klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Łódź ze szklanym dnem",
      "Wyspa Bianca",
      "Snorkeling nad rafą",
      "Obiad na pokładzie",
      "Sporty wodne"
    ],
    "itinerary": [
      {
        "time": "ok. 8:00",
        "title": "Odbiór z hotelu",
        "description": "Klimatyzowany bus zabiera Cię z hotelu w Hurghadzie i dowozi do portu."
      },
      {
        "title": "Rejs łodzią ze szklanym dnem",
        "description": "Przez przezroczyste dno łodzi obserwujesz rafy koralowe i ryby Morza Czerwonego bez wchodzenia do wody."
      },
      {
        "title": "Postój na Wyspie Bianca",
        "description": "Czas wolny na piaszczystej plaży - kąpiel, opalanie i zdjęcia."
      },
      {
        "title": "Snorkeling przy rafie",
        "description": "Pływanie z maską i rurką w wyznaczonych miejscach nad rafą koralową."
      },
      {
        "title": "Obiad na pokładzie",
        "description": "Orientalny lunch z owocami morza, podawany na łodzi wraz z napojami bezalkoholowymi."
      },
      {
        "title": "Sporty wodne",
        "description": "Przejażdżka bananem lub sofą wodną, jeśli pozwolą warunki."
      },
      {
        "time": "ok. 15:30-16:00",
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs łodzią ze szklanym dnem",
      "Sprzęt do snorkelingu (maska, rurka)",
      "Obiad na pokładzie i napoje bezalkoholowe",
      "Sporty wodne (banan lub sofa)"
    ],
    "excluded": [
      "Wydatki własne i napiwki",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "Safaga, Soma Bay, El Gouna",
        "amount": 10
      },
      {
        "zone": "Makadi Bay, Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać",
      "Dzieci pozostają pod opieką opiekunów"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 38 USD za osobę, a dzieci do 5 lat biorą udział bezpłatnie. Dorosły to 75 USD za osobę."
      },
      {
        "question": "Czy trzeba umieć nurkować, żeby zobaczyć rafę?",
        "answer": "Nie. Podwodny świat oglądasz przez szklane dno łodzi, bez wchodzenia do wody. Snorkeling przy rafie jest dodatkową opcją dla chętnych."
      },
      {
        "question": "O której godzinie jest odbiór i powrót?",
        "answer": "Odbiór z hotelu następuje rano, około 8:00, a powrót planowany jest na około 15:30-16:00."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "Rejs realizowany jest w niedziele i czwartki."
      }
    ],
    "seo": {
      "title": "Wyspa Bianca i łódź ze szklanym dnem - z Hurghady",
      "description": "Całodniowy rejs z Hurghady na Wyspę Bianca łodzią ze szklanym dnem: snorkeling, plaża, obiad na pokładzie i sporty wodne. Od 75 USD/os.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-bianca-lodz-szklane-dno/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-hula-hula",
    "route": "/wycieczki-z-hurghady/wyspa-hula-hula",
    "title": "Wycieczka z Hurghady na Wyspę Hula Hula",
    "h1": "Wycieczka z Hurghady na Wyspę Hula Hula",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka łodzią z Hurghady na klimatyczną plażę Hula Hula. W programie snorkeling, sporty wodne oraz lunch i napoje na łodzi - opcja dla rodzin i osób szukających spokojnego dnia nad wodą.",
    "overview": "Hula Hula to urządzona w afrykańskim stylu plaża nad Morzem Czerwonym, położona przy brzegu z niewielką rafą. Miejsce sprzyja zdjęciom i spokojnemu wypoczynkowi - pod parasolami przygotowano strefy do relaksu.\n\nOdbiór z hoteli odbywa się między 7:30 a 8:30, a około 9:00-10:00 łódź wypływa w morze. Po drodze przewidziane są snorkeling oraz sporty wodne - banan lub sofa, jeśli pozwoli pogoda. Na plaży Hula Hula masz około 1,5-2 godzin na kąpiel, pływanie z maską i zdjęcia.\n\nNa łodzi dostępne są kawa, herbata, woda i zimne napoje, a w porze południowej serwowany jest lunch. Powrót do portu następuje około 16:00-17:00, po czym goście są odwożeni do hoteli. Wycieczka jest dostępna codziennie.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-hula-hula",
      "alt": "Wycieczka z Hurghady na Wyspę Hula Hula - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-hula-hula",
        "alt": "Wycieczka z Hurghady na Wyspę Hula Hula - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 30,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 15,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 8-9 godzin",
    "pickupLabel": "rano, ok. 7:30-8:30",
    "returnLabel": "ok. 16:00-17:00",
    "transport": "Rejs łodzią, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Plaża Hula Hula",
      "Snorkeling",
      "Sporty wodne",
      "Lunch na łodzi",
      "Klimat afrykańskiej plaży"
    ],
    "itinerary": [
      {
        "time": "ok. 7:30-8:30",
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hoteli w Hurghadzie w zależności od lokalizacji."
      },
      {
        "time": "ok. 9:00-10:00",
        "title": "Wypłynięcie w rejs",
        "description": "Łódź wychodzi w morze; po drodze snorkeling i sporty wodne (banan lub sofa), jeśli pozwoli pogoda."
      },
      {
        "title": "Plaża Hula Hula",
        "description": "Około 1,5-2 godziny na afrykańsko urządzonej plaży z parasolami - kąpiel, snorkeling i zdjęcia."
      },
      {
        "title": "Lunch na łodzi",
        "description": "W południe serwowany jest obiad; przez cały dzień dostępne kawa, herbata, woda i zimne napoje."
      },
      {
        "time": "ok. 16:00-17:00",
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hoteli."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Obiad na łodzi",
      "Ciepłe i zimne napoje na łodzi",
      "Sprzęt do snorkelingu",
      "Sporty wodne (banan i sofa)"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje i jedzenie na plaży",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać",
      "Dzieci pozostają pod opieką opiekunów"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje bilet dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 15 USD, a dzieci do 5 lat płyną bezpłatnie. Dorosły to 30 USD za osobę."
      },
      {
        "question": "O której godzinie jest odbiór z hotelu?",
        "answer": "Odbiór odbywa się między 7:30 a 8:30, w zależności od lokalizacji hotelu. Powrót do portu następuje około 16:00-17:00."
      },
      {
        "question": "Ile czasu spędzę na plaży?",
        "answer": "Na plaży Hula Hula masz około 1,5-2 godzin na kąpiel, snorkeling i zdjęcia."
      },
      {
        "question": "Czy wycieczka jest codziennie?",
        "answer": "Tak, rejs dostępny jest codziennie."
      }
    ],
    "seo": {
      "title": "Wyspa Hula Hula - wycieczka łodzią z Hurghady",
      "description": "Całodniowy rejs z Hurghady na plażę Hula Hula: snorkeling, sporty wodne, lunch i napoje na łodzi. Codziennie, od 30 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-hula-hula/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-magawish",
    "route": "/wycieczki-z-hurghady/wyspa-magawish",
    "title": "Wycieczka z Hurghady na Wyspę Magawish",
    "h1": "Wycieczka z Hurghady na Wyspę Magawish",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Rejs łodzią z Hurghady na Wyspę Magawish, znaną z płytkiej, błękitnej wody. Snorkeling, sporty wodne, lunch na łodzi i czas na plaży - dobra propozycja dla rodzin z dziećmi.",
    "overview": "Wyspę Magawish wyróżnia płytka, błękitna woda przy brzegu, dzięki czemu dobrze sprawdza się jako miejsce na kąpiele słoneczne, spokojną kąpiel i zdjęcia. To propozycja na całodniowy, niespieszny dzień nad Morzem Czerwonym.\n\nOdbiór z hoteli odbywa się między 7:30 a 8:30, a około 9:00-10:00 łódź wychodzi w morze. Podczas rejsu przewidziano snorkeling oraz sporty wodne - banan lub sofę wodną, gdy pozwoli pogoda. Na samej wyspie masz około 1,5-2 godzin czasu wolnego.\n\nNa łodzi dostępne są kawa, herbata, woda i zimne napoje, a w porze południowej serwowany jest lunch. Powrót do portu planowany jest na około 16:00-17:00. Wycieczka odbywa się codziennie.",
    "heroImage": {
      "src": "/media/tours/h-wyspa-magawish",
      "alt": "Wycieczka z Hurghady na Wyspę Magawish - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wyspa-magawish",
        "alt": "Wycieczka z Hurghady na Wyspę Magawish - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 30,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 15,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 8-9 godzin",
    "pickupLabel": "rano, ok. 7:30-8:30",
    "returnLabel": "ok. 16:00-17:00",
    "transport": "Rejs łodzią, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wyspa Magawish",
      "Płytka, błękitna woda",
      "Snorkeling",
      "Sporty wodne",
      "Lunch na łodzi"
    ],
    "itinerary": [
      {
        "time": "ok. 7:30-8:30",
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hoteli w Hurghadzie, w zależności od lokalizacji."
      },
      {
        "time": "ok. 9:00-10:00",
        "title": "Wypłynięcie w rejs",
        "description": "Wyjście w morze; po drodze snorkeling oraz banan lub sofa wodna, gdy pogoda pozwoli."
      },
      {
        "title": "Wyspa Magawish",
        "description": "Około 1,5-2 godziny na wyspie z płytką, błękitną wodą - kąpiel, zdjęcia i odpoczynek."
      },
      {
        "title": "Lunch na łodzi",
        "description": "Obiad w porze południowej; do dyspozycji kawa, herbata, woda i zimne napoje."
      },
      {
        "time": "ok. 16:00-17:00",
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hoteli."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Obiad na łodzi",
      "Ciepłe i zimne napoje na łodzi",
      "Sprzęt do snorkelingu",
      "Sporty wodne (banan i sofa)"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje i jedzenie na plaży",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać",
      "Dzieci pozostają pod opieką opiekunów"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje udział dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 15 USD, a dzieci do 5 lat bezpłatnie. Cena dla dorosłego to 30 USD za osobę."
      },
      {
        "question": "Czy woda przy wyspie jest głęboka?",
        "answer": "Wyspa Magawish znana jest z płytkiej, błękitnej wody przy brzegu, co sprzyja spokojnej kąpieli."
      },
      {
        "question": "O której jest odbiór i powrót?",
        "answer": "Odbiór z hoteli odbywa się między 7:30 a 8:30, a powrót do portu planowany jest na około 16:00-17:00."
      },
      {
        "question": "W jakie dni realizowana jest wycieczka?",
        "answer": "Wycieczka odbywa się codziennie."
      }
    ],
    "seo": {
      "title": "Wyspa Magawish - wycieczka łodzią z Hurghady",
      "description": "Rejs z Hurghady na Wyspę Magawish z płytką, błękitną wodą: snorkeling, sporty wodne i lunch na łodzi. Codziennie, od 30 USD/os.",
      "canonicalPath": "/wycieczki-z-hurghady/wyspa-magawish/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "sharm-el-naga-snorkeling",
    "route": "/wycieczki-z-hurghady/sharm-el-naga-snorkeling",
    "title": "Sharm el Naga - snorkeling, wycieczka z Hurghady",
    "h1": "Wycieczka z Hurghady do Sharm el Naga",
    "destination": "hurghada",
    "category": "snorkeling-delfiny",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka z Hurghady do chronionej zatoki Sharm el Naga - snorkeling nad rafami koralowymi prosto z brzegu, spokojna plaża i obiad w lokalnej restauracji. Sprzęt do snorkelingu w cenie.",
    "overview": "Sharm el Naga to chroniona zatoka otoczona ze wszystkich stron górami, dzięki czemu zwykle nie ma tu silnych wiatrów, a warunki na wodzie są spokojne. To jedno z ładniejszych miejsc do snorkelingu w okolicy - rafy koralowe zaczynają się blisko brzegu, więc można je oglądać bez rejsu łodzią.\n\nWycieczka rozpoczyna się wcześnie rano, gdy autobus odbiera uczestników z hotelu. Na miejscu jest czas na relaks i spacer po plaży oraz snorkeling nad rafami prosto z brzegu. Zatoka nie jest oblegana przez duże grupy turystów, więc woda i plaża pozostają czyste. Zapewniamy niezbędny sprzęt do snorkelingu - maskę, rurkę i płetwy.\n\nObiad serwowany jest w lokalnej restauracji, a powrót do hotelu następuje około godziny 15:00-16:00. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-sharm-el-naga-snorkeling",
      "alt": "Sharm el Naga - snorkeling, wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-sharm-el-naga-snorkeling",
        "alt": "Sharm el Naga - snorkeling, wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 50,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 50,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "wcześnie rano",
    "returnLabel": "ok. 15:00-16:00",
    "transport": "Transfer autobusem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rafy koralowe przy brzegu",
      "Snorkeling z brzegu",
      "Chroniona, spokojna zatoka",
      "Obiad w lokalnej restauracji"
    ],
    "itinerary": [
      {
        "time": "wcześnie rano",
        "title": "Odbiór z hotelu",
        "description": "Wygodny autobus odbiera uczestników z hotelu w Hurghadzie."
      },
      {
        "title": "Przejazd do Sharm el Naga",
        "description": "Transfer do chronionej zatoki otoczonej górami."
      },
      {
        "title": "Plaża i relaks",
        "description": "Czas na spacer po plaży i odpoczynek nad zatoką."
      },
      {
        "title": "Snorkeling z brzegu",
        "description": "Pływanie z maską, rurką i płetwami nad rafami koralowymi tuż przy brzegu."
      },
      {
        "title": "Obiad",
        "description": "Obiad w lokalnej restauracji."
      },
      {
        "time": "ok. 15:00-16:00",
        "title": "Powrót",
        "description": "Powrót do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Obiad na plaży Sharm el Naga",
      "Sprzęt do snorkelingu (maska, rurka, płetwy)"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki",
      "Napoje i jedzenie na plaży (poza obiadem)",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna, Safaga, Soma Bay, Abu Soma",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się z brzegu, na własną odpowiedzialność - zalecany dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 25 USD, a dzieci do 5 lat biorą udział bezpłatnie. Dorosły to 50 USD za osobę."
      },
      {
        "question": "O której godzinie jest powrót?",
        "answer": "Wyjazd jest wcześnie rano, a powrót do hotelu następuje około godziny 15:00-16:00."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transfer z hotelu i z powrotem, obiad na plaży Sharm el Naga oraz sprzęt do snorkelingu - maska, rurka i płetwy."
      },
      {
        "question": "Czy trzeba umieć pływać?",
        "answer": "Snorkeling odbywa się prosto z brzegu, a rafy zaczynają się blisko plaży. Zalecany jest jednak dla osób umiejących pływać i odbywa się na własną odpowiedzialność."
      }
    ],
    "seo": {
      "title": "Sharm el Naga - snorkeling z Hurghady",
      "description": "Całodniowa wycieczka z Hurghady do Sharm el Naga: snorkeling z brzegu, rafy koralowe i obiad. Od 50 USD/os, dzieci taniej. Sprzęt w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/sharm-el-naga-snorkeling/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "dom-delfinow-snorkeling",
    "route": "/wycieczki-z-hurghady/dom-delfinow-snorkeling",
    "title": "Dom Delfinów (Dolphin House) - rejs z Hurghady",
    "h1": "Wycieczka z Hurghady do Domu Delfinów",
    "destination": "hurghada",
    "category": "snorkeling-delfiny",
    "departure": "Hurghada",
    "shortDescription": "Całodniowy rejs z Hurghady w rejon Dolphin House na Morzu Czerwonym - obserwacja delfinów na wolności, snorkeling nad rafami i sporty wodne. W cenie transfer, obiad na statku i napoje.",
    "overview": "Wycieczka do Domu Delfinów (Dolphin House) to całodniowy rejs po Morzu Czerwonym w rejon znany z występowania delfinów. Zwierzęta żyją na wolności, więc ich obserwacja zależy od warunków, ale szanse na spotkanie są duże.\n\nPodczas rejsu przewidziane są 1-2 postoje na snorkeling nad rafami koralowymi, a chętni mogą skorzystać ze sportów wodnych - banana lub sofy. Cała wyprawa trwa około 7-8 godzin i odbywa się codziennie, według dostępności.\n\nCena obejmuje transfer z hotelu w Hurghadzie i z powrotem, rejs statkiem, sprzęt do snorkelingu, obiad na statku, ciepłe i zimne napoje oraz opiekę załogi. Za okolice poza Hurghadą mogą obowiązywać dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-dom-delfinow-snorkeling",
      "alt": "Dom Delfinów (Dolphin House) - rejs z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-dom-delfinow-snorkeling",
        "alt": "Dom Delfinów (Dolphin House) - rejs z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 25,
          "currency": "USD"
        }
      ],
      "note": "Za okolice poza Hurghadą mogą obowiązywać dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie (według dostępności)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs statkiem, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rejs w rejon Dolphin House",
      "Delfiny na wolności",
      "Snorkeling nad rafami",
      "Sporty wodne (banan / sofa)",
      "Obiad na statku"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do portu."
      },
      {
        "title": "Rejs po Morzu Czerwonym",
        "description": "Wypłynięcie statkiem w rejon Dolphin House."
      },
      {
        "title": "Obserwacja delfinów",
        "description": "Wypatrywanie delfinów żyjących na wolności w ich naturalnym środowisku."
      },
      {
        "title": "Snorkeling nad rafami",
        "description": "1-2 postoje na pływanie z maską i rurką nad rafami koralowymi."
      },
      {
        "title": "Sporty wodne",
        "description": "Przejażdżka bananem lub sofą wodną dla chętnych."
      },
      {
        "title": "Obiad na statku",
        "description": "Obiad podawany na pokładzie wraz z ciepłymi i zimnymi napojami."
      },
      {
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu w Hurghadzie",
      "Rejs statkiem",
      "Sprzęt do snorkelingu",
      "Obiad na statku",
      "Ciepłe i zimne napoje",
      "Opieka załogi"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Delfiny żyją na wolności, więc ich spotkanie zależy od warunków i nie jest gwarantowane",
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka?",
        "answer": "Cena dla dorosłego wynosi 25 USD za osobę."
      },
      {
        "question": "Czy na pewno zobaczę delfiny?",
        "answer": "Delfiny żyją na wolności, więc ich obserwacja zależy od warunków. Szanse na spotkanie w rejonie Dolphin House są duże, ale nie da się tego zagwarantować."
      },
      {
        "question": "Jak długo trwa rejs?",
        "answer": "Około 7-8 godzin. Wycieczka odbywa się codziennie, według dostępności."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transfer z hotelu i z powrotem, rejs statkiem, sprzęt do snorkelingu, obiad na statku, ciepłe i zimne napoje oraz opieka załogi."
      }
    ],
    "seo": {
      "title": "Dom Delfinów (Dolphin House) - rejs z Hurghady",
      "description": "Całodniowy rejs z Hurghady do Domu Delfinów: delfiny na wolności, snorkeling i sporty wodne. Cena 25 USD/os. Obiad i napoje w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/dom-delfinow-snorkeling/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "dom-delfinow-nurkowanie",
    "route": "/wycieczki-z-hurghady/dom-delfinow-nurkowanie",
    "title": "Dom Delfinów z Hurghady - nurkowanie z butlą",
    "h1": "Dom Delfinów (Dolphin House) z Hurghady z nurkowaniem z butlą",
    "destination": "hurghada",
    "category": "nurkowanie",
    "departure": "Hurghada",
    "shortDescription": "Całodniowy rejs z Hurghady do Domu Delfinów ze snorkelingiem i jednym nurkowaniem z butlą pod okiem instruktora. W cenie śniadanie, obiad, napoje i transfer z hotelu.",
    "overview": "Dom Delfinów (Dolphin House) to rafa koło Hurghady znana z częstych spotkań z dzikimi delfinami. Ta wersja wyprawy łączy rejs, snorkeling i jedno nurkowanie z butlą - także dla osób bez uprawnień, bo pod wodą prowadzi Cię instruktor.\n\nDzień zaczyna się orientalnym śniadaniem na łodzi, a w programie są postoje na snorkeling i nurkowanie. W cenie jest transfer z hotelu w Hurghadzie, sprzęt, obiad i napoje.",
    "heroImage": {
      "src": "/media/tours/h-dom-delfinow-nurkowanie",
      "alt": "Delfiny płynące przy łodzi w rejonie Dolphin House koło Hurghady",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-dom-delfinow-nurkowanie",
        "alt": "Delfiny płynące przy łodzi w rejonie Dolphin House koło Hurghady",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 35,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 35,
          "currency": "USD"
        }
      ],
      "note": "Dopłata za odbiór spoza Hurghady (El Gouna, Sahl Hasheesh, Makadi Bay, Safaga, Soma Bay, Abu Soma, Al Ahyaa)."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "całodniowa wycieczka",
    "pickupLabel": "Rano, do ustalenia",
    "transport": "Transfer z hotelu w Hurghadzie do portu i rejs łodzią",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Dom Delfinów",
      "1 nurkowanie z instruktorem",
      "Snorkeling przy rafie",
      "Śniadanie i obiad na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do portu i orientalne śniadanie na łodzi."
      },
      {
        "title": "Rejs do Domu Delfinów",
        "description": "Rejs w rejon rafy znanej z dzikich delfinów."
      },
      {
        "title": "Nurkowanie z butlą",
        "description": "Jedno nurkowanie z instruktorem - także dla osób bez uprawnień."
      },
      {
        "title": "Snorkeling",
        "description": "Pływanie z maską i fajką nad kolorową rafą."
      },
      {
        "title": "Obiad na łodzi",
        "description": "Ciepły posiłek i napoje w drodze powrotnej."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu rejsu."
      }
    ],
    "included": [
      "Transfer z hotelu i z powrotem",
      "Rejs łodzią",
      "Sprzęt do snorkelingu i nurkowania",
      "Instruktor nurkowania",
      "Orientalne śniadanie, obiad i napoje"
    ],
    "excluded": [
      "Napiwki",
      "Zdjęcia u fotografa",
      "Dodatkowe nurkowania"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem",
      "Okulary przeciwsłoneczne",
      "Gotówka na napiwki"
    ],
    "requirements": [
      "Nurkowanie z butlą prowadzi instruktor - nie trzeba mieć uprawnień.",
      "Dopłata za odbiór spoza Hurghady (m.in. El Gouna, Sahl Hasheesh, Makadi Bay, Safaga)."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy muszę umieć nurkować?",
        "answer": "Nie. Nurkowanie z butlą odbywa się pod stałą opieką instruktora, na niewielkiej głębokości - nadaje się dla osób bez doświadczenia."
      },
      {
        "question": "Czy na pewno zobaczę delfiny?",
        "answer": "Delfiny w rejonie Domu Delfinów żyją dziko, więc spotkania są częste, ale nie gwarantowane - to natura, nie pokaz."
      }
    ],
    "seo": {
      "title": "Dom Delfinów z Hurghady + nurkowanie z butlą",
      "description": "Rejs z Hurghady do Domu Delfinów: snorkeling i 1 nurkowanie z instruktorem, śniadanie, obiad i transfer. Cena od 35 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/dom-delfinow-nurkowanie/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "delfinarium-dolphin-show",
    "route": "/wycieczki-z-hurghady/delfinarium-dolphin-show",
    "title": "Delfinarium w Hurghadzie - pokaz delfinów",
    "h1": "Delfinarium Hurghada - pokaz delfinów",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Wizyta w delfinarium w Hurghadzie z transferem z hotelu, biletem wstępu i pokazem delfinów. Krótka, rodzinna atrakcja z czasem na zdjęcia i opcją pływania z delfinami.",
    "overview": "Wycieczka do delfinarium w Hurghadzie to propozycja dobra zwłaszcza dla rodzin z dziećmi. W programie jest pokaz delfinów oraz czas na zrobienie zdjęć.\n\nCena obejmuje transfer z hotelu i z powrotem oraz bilet wstępu na pokaz. Sam pokaz trwa około 50 minut. Za dodatkową opłatą można skorzystać z pływania z delfinami oraz sesji zdjęciowej.",
    "heroImage": {
      "src": "/media/tours/h-delfinarium-dolphin-show",
      "alt": "Delfinarium w Hurghadzie - pokaz delfinów - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-delfinarium-dolphin-show",
        "alt": "Delfinarium w Hurghadzie - pokaz delfinów - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 25,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie oprócz sobót",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 50 minut (sam pokaz)",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Pokaz delfinów",
      "Czas na zdjęcia",
      "Transfer z/do hotelu",
      "Opcja pływania z delfinami"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do delfinarium."
      },
      {
        "title": "Pokaz delfinów",
        "description": "Około 50-minutowy pokaz z udziałem delfinów."
      },
      {
        "title": "Czas na zdjęcia",
        "description": "Chwila na pamiątkowe zdjęcia po pokazie."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Bilet wstępu na pokaz delfinów"
    ],
    "excluded": [
      "Pływanie z delfinami i sesja zdjęciowa (opcjonalnie)",
      "Wydatki własne",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Pływanie z delfinami i fotosesja",
        "note": "opcjonalnie, za dodatkową opłatą"
      }
    ],
    "whatToBring": [
      "Aparat lub telefon",
      "Nakrycie głowy",
      "Gotówka na opcje dodatkowe"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa pokaz delfinów?",
        "answer": "Sam pokaz trwa około 50 minut."
      },
      {
        "question": "Czy można popływać z delfinami?",
        "answer": "Tak, pływanie z delfinami i sesja zdjęciowa są dostępne opcjonalnie, za dodatkową opłatą."
      },
      {
        "question": "W które dni odbywa się wycieczka?",
        "answer": "Wycieczka jest dostępna codziennie oprócz sobót."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "W cenie jest transfer z/do hotelu oraz bilet wstępu na pokaz delfinów."
      }
    ],
    "seo": {
      "title": "Delfinarium Hurghada - pokaz delfinów",
      "description": "Pokaz delfinów w delfinarium w Hurghadzie z transferem z hotelu i biletem wstępu. Opcja pływania z delfinami. Cena od 25 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/delfinarium-dolphin-show/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "nurkowanie-na-probe",
    "route": "/wycieczki-z-hurghady/nurkowanie-na-probe",
    "title": "Nurkowanie z butlą w Hurghadzie",
    "h1": "Wycieczka z Hurghady - nurkowanie z butlą (scuba diving)",
    "destination": "hurghada",
    "category": "nurkowanie",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka nurkowa z Hurghady dla osób bez doświadczenia - nurkowanie z butlą pod okiem instruktora. W programie rejs łodzią, dwa zejścia do wody na rafie koralowej, sprzęt, obiad na łodzi i transfer z hotelu.",
    "overview": "To propozycja dla wszystkich, którzy chcą spróbować nurkowania z butlą, ale nie mają certyfikatu ani doświadczenia. Przez cały czas jesteś pod opieką instruktora, który tłumaczy zasady i towarzyszy Ci pod wodą.\n\nWycieczka ma formę całodniowego rejsu łodzią w rejon raf koralowych. W programie są dwa zejścia do wody, a między nimi obiad serwowany na pokładzie. Podczas nurkowań zobaczysz kolorową rafę i podwodne życie Morza Czerwonego.\n\nW cenie zapewniamy transfer z hotelu do portu i z powrotem, sprzęt, instruktora, łódź oraz obiad. Godzinę odbioru i szczegóły nurkowania potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-nurkowanie-na-probe",
      "alt": "Nurkowanie z butlą w Hurghadzie - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-nurkowanie-na-probe",
        "alt": "Nurkowanie z butlą w Hurghadzie - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 38,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 38,
          "currency": "USD",
          "unit": "os."
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Cały dzień",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer hotel - port - hotel",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Nurkowanie z butlą",
      "2 nurkowania z instruktorem",
      "Rafa koralowa",
      "Sprzęt w cenie",
      "Obiad na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer spod hotelu w Hurghadzie do portu."
      },
      {
        "title": "Rejs łodzią na rafę",
        "description": "Wypłynięcie łodzią w rejon raf koralowych na Morzu Czerwonym."
      },
      {
        "title": "Pierwsze nurkowanie z instruktorem",
        "description": "Zejście pod wodę z butlą pod stałą opieką instruktora - także dla osób bez doświadczenia."
      },
      {
        "title": "Obiad na łodzi",
        "description": "Przerwa na posiłek serwowany na pokładzie."
      },
      {
        "title": "Drugie nurkowanie",
        "description": "Kolejne zejście do wody i obserwacja rafy oraz podwodnego życia."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Rejs z powrotem do portu i transfer pod hotel."
      }
    ],
    "included": [
      "Transfer hotel - port - hotel",
      "Rejs łodzią",
      "2 nurkowania z instruktorem",
      "Sprzęt do nurkowania",
      "Obiad na łodzi"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne",
      "Kapelusz lub czapka"
    ],
    "requirements": [
      "Certyfikat nie jest wymagany - nurkowanie odbywa się z instruktorem",
      "Dobry ogólny stan zdrowia"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy muszę umieć nurkować lub mieć certyfikat?",
        "answer": "Nie. To nurkowanie na próbę - schodzisz pod wodę z instruktorem, który czuwa nad Tobą przez cały czas."
      },
      {
        "question": "Ile nurkowań obejmuje wycieczka?",
        "answer": "Program obejmuje dwa nurkowania na rafie koralowej podczas jednego całodniowego rejsu."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "W cenie są transfer z hotelu, rejs łodzią, sprzęt, instruktor oraz obiad na łodzi."
      },
      {
        "question": "Ile trwa wycieczka?",
        "answer": "Wycieczka zajmuje cały dzień, wraz z transferem z hotelu do portu i z powrotem."
      }
    ],
    "seo": {
      "title": "Nurkowanie z butlą w Hurghadzie - rejs i instruktor",
      "description": "Nurkowanie z butlą z Hurghady: całodniowy rejs łodzią, 2 nurkowania z instruktorem, sprzęt, obiad i transfer z hotelu. Rafa koralowa od 38 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/nurkowanie-na-probe/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "abu-dabbab-snorkeling",
    "route": "/wycieczki-z-hurghady/abu-dabbab-snorkeling",
    "title": "Abu Dabbab - Zatoka Żółwi, wycieczka z Hurghady",
    "h1": "Wycieczka z Hurghady do Abu Dabbab - Zatoka Żółwi",
    "destination": "hurghada",
    "category": "snorkeling-delfiny",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka z Hurghady na plażę Abu Dabbab, znaną z żółwi morskich i snorkelingu, z możliwością zobaczenia diugonia. W cenie transfer, wstęp na plażę, obiad i sprzęt do snorkelingu.",
    "overview": "Abu Dabbab to zatoka na południe od Hurghady, słynąca z żółwi morskich, które można zobaczyć podczas snorkelingu tuż przy brzegu. Bywają tu również diugonie, choć ich spotkanie zależy od warunków i nie jest gwarantowane.\n\nWyjazd odbywa się wcześnie rano, a powrót planowany jest na około 15:30 - ze względu na odległość jest to wyprawa na cały dzień. Na miejscu czeka czas na plażę, snorkeling nad rafą oraz obiad.\n\nCena obejmuje transfer z hotelu i z powrotem, wstęp na plażę, obiad oraz sprzęt do snorkelingu. Wycieczka odbywa się w poniedziałki i piątki.",
    "heroImage": {
      "src": "/media/tours/h-abu-dabbab-snorkeling",
      "alt": "Abu Dabbab - Zatoka Żółwi, wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-abu-dabbab-snorkeling",
        "alt": "Abu Dabbab - Zatoka Żółwi, wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 62,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 62,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Poniedziałek i piątek",
    "availabilityDays": [
      "Poniedziałek",
      "Piątek"
    ],
    "durationLabel": "cały dzień, powrót ok. 15:30",
    "pickupLabel": "wcześnie rano",
    "returnLabel": "ok. 15:30",
    "transport": "Transfer klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Snorkeling z żółwiami morskimi",
      "Plaża Abu Dabbab",
      "Możliwość zobaczenia diugonia",
      "Obiad w cenie"
    ],
    "itinerary": [
      {
        "time": "wcześnie rano",
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu w Hurghadzie i przejazd na plażę Abu Dabbab."
      },
      {
        "title": "Plaża Abu Dabbab",
        "description": "Wstęp na plażę i czas na relaks nad zatoką."
      },
      {
        "title": "Snorkeling z żółwiami",
        "description": "Pływanie z maską i rurką nad rafą - żółwie morskie i możliwość zobaczenia diugonia."
      },
      {
        "title": "Obiad",
        "description": "Obiad wliczony w cenę wycieczki."
      },
      {
        "time": "ok. 15:30",
        "title": "Powrót",
        "description": "Powrót do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Wstęp na plażę Abu Dabbab",
      "Obiad",
      "Sprzęt do snorkelingu"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Obuwie do wody",
      "Aparat lub telefon w wodoszczelnym etui"
    ],
    "requirements": [
      "Snorkeling odbywa się na własną odpowiedzialność - zalecany dla osób umiejących pływać",
      "Spotkanie z żółwiami i diugoniem zależy od warunków i nie jest gwarantowane"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka?",
        "answer": "Cena dla dorosłego wynosi 62 USD za osobę."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "W poniedziałki i piątki."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transfer z hotelu i z powrotem, wstęp na plażę Abu Dabbab, obiad oraz sprzęt do snorkelingu."
      },
      {
        "question": "Czy na pewno zobaczę żółwie i diugonia?",
        "answer": "Abu Dabbab jest znane z żółwi morskich, a w zatoce bywają też diugonie, jednak spotkanie z nimi zależy od warunków i nie jest gwarantowane."
      }
    ],
    "seo": {
      "title": "Abu Dabbab - żółwie i snorkeling z Hurghady",
      "description": "Całodniowa wycieczka z Hurghady do Abu Dabbab: snorkeling z żółwiami, plaża i obiad. Cena 62 USD/os. Transfer i sprzęt w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/abu-dabbab-snorkeling/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "plaza-orange-ozirea",
    "route": "/wycieczki-z-hurghady/plaza-orange-ozirea",
    "title": "Wycieczka na plażę Ozirea z Hurghady",
    "h1": "Wycieczka z Hurghady na plażę Ozirea - snorkeling i rejs",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Całodniowy rejs z Hurghady na plażę Ozirea z dwoma przystankami na snorkeling i czasem na relaks nad wodą. W cenie transfer z hotelu, sprzęt do snorkelingu, obiad i napoje. Dobra opcja dla rodzin - dzieci 5-11 lat płacą mniej, młodsze bezpłatnie.",
    "overview": "Wycieczka na plażę Ozirea to całodniowy rejs łodzią z Hurghady, łączący snorkeling z wypoczynkiem na plaży. Transfer prowadzi z hotelu do mariny, skąd wypływasz na Morze Czerwone.\n\nW programie są dwa przystanki na snorkeling na rafach - sprzęt zapewniamy na miejscu. Po nurkowaniu z rurką czeka Cię czas na relaks i kąpiel na plaży Ozirea. Na pokładzie serwowany jest obiad wraz z napojami.\n\nW cenie są transfer, rejs łodzią, sprzęt do snorkelingu, obiad, napoje oraz pobyt na plaży Ozirea. Dzieci w wieku 5-11 lat płacą 20 USD, a młodsze jadą bezpłatnie. Godzinę odbioru i szczegóły rejsu potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-plaza-orange-ozirea",
      "alt": "Wycieczka na plażę Ozirea z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-plaza-orange-ozirea",
        "alt": "Wycieczka na plażę Ozirea z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 40,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 40,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 20,
          "currency": "USD",
          "unit": "os."
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "unit": "os.",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Cały dzień",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer hotel - marina - plaża Ozirea",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Plaża Ozirea",
      "2 przystanki na snorkeling",
      "Obiad i napoje w cenie",
      "Rejs łodzią",
      "Transfer z hotelu"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer spod hotelu w Hurghadzie do mariny."
      },
      {
        "title": "Rejs w stronę plaży Ozirea",
        "description": "Wypłynięcie łodzią na Morze Czerwone."
      },
      {
        "title": "2 przystanki na snorkeling",
        "description": "Dwa postoje na rafach; sprzęt do snorkelingu zapewniamy."
      },
      {
        "title": "Plaża Ozirea",
        "description": "Czas na relaks i kąpiel na plaży Ozirea."
      },
      {
        "title": "Obiad i napoje",
        "description": "Posiłek i napoje serwowane w ramach wycieczki."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Rejs do mariny i transfer pod hotel."
      }
    ],
    "included": [
      "Transfer z/do hotelu w Hurghadzie",
      "Rejs łodzią",
      "Sprzęt do snorkelingu",
      "Obiad",
      "Napoje",
      "Pobyt na plaży Ozirea"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne",
      "Klapki"
    ],
    "requirements": [
      "Sprzęt do snorkelingu zapewniamy - przyda się umiejętność pływania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 20 USD za osobę, a dzieci do 5 lat płyną bezpłatnie."
      },
      {
        "question": "Ile trwa wycieczka?",
        "answer": "Wycieczka zajmuje cały dzień, razem z transferem z hotelu i z powrotem."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "Transfer, rejs łodzią, sprzęt do snorkelingu, obiad, napoje oraz pobyt na plaży Ozirea."
      },
      {
        "question": "Ile jest przystanków na snorkeling?",
        "answer": "Podczas rejsu przewidziane są dwa przystanki na snorkeling na rafach."
      }
    ],
    "seo": {
      "title": "Plaża Ozirea z Hurghady - rejs i snorkeling",
      "description": "Rejs z Hurghady na plażę Ozirea: 2 przystanki na snorkeling, obiad, napoje i relaks na plaży. Transfer z hotelu w cenie. Dorosły 40 USD, dziecko 20 USD.",
      "canonicalPath": "/wycieczki-z-hurghady/plaza-orange-ozirea/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "prywatny-speedboat",
    "route": "/wycieczki-z-hurghady/prywatny-speedboat",
    "title": "Rejs Speed Boat z Hurghady",
    "h1": "Rejs Speed Boat z Hurghady - delfiny, Orange Bay i Hula Hula",
    "destination": "hurghada",
    "category": "rejsy-wyspy",
    "departure": "Hurghada",
    "shortDescription": "Prywatny, około czterogodzinny rejs szybką łodzią motorową z Hurghady. W programie rejon Dolphin House, postój na Orange Bay lub Hula Hula oraz snorkeling na rafach koralowych. Cena za całą łódź dla 1-4 osób, z transferem, napojami i owocami.",
    "overview": "Speed boat to propozycja dla osób, które chcą zwiedzić okolice Hurghady we własnym gronie i w szybszym tempie niż podczas dużego rejsu. Łódź motorową wynajmujesz prywatnie dla grupy do czterech osób, a cały wypad trwa około czterech godzin.\n\nW programie jest rejon Dolphin House, gdzie można obserwować delfiny w ich naturalnym środowisku, oraz postój na jednej z wysp - Orange Bay albo Hula Hula, do wyboru. Podczas rejsu przewidziany jest snorkeling na rafach koralowych, a sprzęt zapewniamy na miejscu.\n\nW cenie są prywatny transfer z hotelu do mariny i z powrotem, rejs speed boatem, sprzęt do snorkelingu oraz napoje i owoce na pokładzie. Spotkanie z delfinami zależy od warunków naturalnych i nie jest gwarantowane. Trasę, godzinę odbioru i szczegóły potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-prywatny-speedboat",
      "alt": "Rejs Speed Boat z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-prywatny-speedboat",
        "alt": "Rejs Speed Boat z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perBoat",
      "amount": 160,
      "unit": "łódź",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Łódź 1-4 osoby",
          "amount": 160,
          "currency": "USD",
          "unit": "łódź"
        }
      ],
      "note": "Cena za prywatną łódź dla 1-4 osób."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 4 godziny",
    "pickupLabel": "Do ustalenia",
    "transport": "Prywatny rejs speed boatem, transfer hotel - marina - hotel",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Prywatny rejs speed boatem",
      "Dolphin House",
      "Orange Bay lub Hula Hula",
      "Snorkeling na rafie",
      "Napoje i owoce w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer spod hotelu w Hurghadzie do mariny."
      },
      {
        "title": "Rejs speed boatem",
        "description": "Szybki, prywatny rejs łodzią motorową po Morzu Czerwonym."
      },
      {
        "title": "Dolphin House",
        "description": "Rejon Dolphin House, gdzie można obserwować delfiny w ich naturalnym środowisku (spotkanie zależne od natury)."
      },
      {
        "title": "Orange Bay lub Hula Hula",
        "description": "Postój na jednej z wysp - Orange Bay albo Hula Hula, do wyboru."
      },
      {
        "title": "Snorkeling na rafie",
        "description": "Nurkowanie z rurką na rafach koralowych; sprzęt zapewniamy."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Rejs do mariny i transfer pod hotel."
      }
    ],
    "included": [
      "Prywatny transfer hotel - marina - hotel",
      "Rejs speed boatem",
      "Sprzęt do snorkelingu",
      "Napoje i owoce"
    ],
    "excluded": [
      "Obiad (w cenie są napoje i owoce)",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [
      "Cena dotyczy całej łodzi (1-4 osoby)",
      "Spotkanie z delfinami zależne od warunków naturalnych - nie jest gwarantowane"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu, trasy i godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje rejs speed boatem?",
        "answer": "Cena zaczyna się od 160 USD za całą łódź, która zabiera 1-4 osoby."
      },
      {
        "question": "Ile trwa rejs?",
        "answer": "Rejs trwa około czterech godzin, razem z transferem z hotelu i z powrotem."
      },
      {
        "question": "Czy na pewno zobaczę delfiny?",
        "answer": "Rejs prowadzi w rejon Dolphin House, ale spotkanie z delfinami zależy od warunków naturalnych i nie jest gwarantowane."
      },
      {
        "question": "Jakie wyspy odwiedzę?",
        "answer": "Do wyboru jest postój na Orange Bay albo Hula Hula, a podczas rejsu odbywa się snorkeling na rafie."
      }
    ],
    "seo": {
      "title": "Speed Boat z Hurghady - delfiny i snorkeling",
      "description": "Prywatny rejs speed boatem z Hurghady: Dolphin House, Orange Bay lub Hula Hula, snorkeling, napoje i owoce. Ok. 4 godziny, od 160 USD za łódź.",
      "canonicalPath": "/wycieczki-z-hurghady/prywatny-speedboat/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "lodz-seascope",
    "route": "/wycieczki-z-hurghady/lodz-seascope",
    "title": "Rejs łodzią Seascope z Hurghady",
    "h1": "Wycieczka z Hurghady łodzią Seascope",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Około dwugodzinny rejs łodzią Seascope z panoramicznymi oknami, z widokiem na rafy Morza Czerwonego i snorkelingiem. Transfer z hotelu w cenie - łagodna opcja także dla osób, które nie nurkują.",
    "overview": "Seascope to łódź z panoramicznymi oknami, które pozwalają obserwować podwodny świat Morza Czerwonego bez zamoczenia. Rejs trwa około dwóch godzin i prowadzi nad rafy koralowe.\n\nW programie jest również snorkeling, a w cenie transfer z hotelu, sam rejs oraz widok na rafy. To spokojna propozycja dla rodzin i osób, które chcą zobaczyć rafy bez nurkowania z butlą.",
    "heroImage": {
      "src": "/media/tours/h-lodz-seascope",
      "alt": "Rejs łodzią Seascope z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-lodz-seascope",
        "alt": "Rejs łodzią Seascope z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 18,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 18,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2 godziny",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią Seascope, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Łódź Seascope z panoramicznymi oknami",
      "Widok na rafy Morza Czerwonego",
      "Snorkeling",
      "Transfer z hotelu w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu do portu."
      },
      {
        "title": "Rejs łodzią Seascope",
        "description": "Rejs łodzią z panoramicznymi oknami nad rafy Morza Czerwonego."
      },
      {
        "title": "Snorkeling",
        "description": "Czas na snorkeling i obserwację podwodnego życia."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs łodzią Seascope",
      "Widok na rafy i snorkeling"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa rejs?",
        "answer": "Rejs łodzią Seascope trwa około 2 godzin."
      },
      {
        "question": "Czy trzeba umieć nurkować?",
        "answer": "Nie. Podwodny świat oglądasz przez panoramiczne okna łodzi, więc to dobra opcja także dla osób, które nie nurkują. Snorkeling jest dodatkową częścią programu."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "W cenie jest transfer z/do hotelu, rejs łodzią Seascope oraz snorkeling i widok na rafy."
      },
      {
        "question": "Czy wycieczka jest dostępna codziennie?",
        "answer": "Tak, rejs odbywa się codziennie."
      }
    ],
    "seo": {
      "title": "Rejs łodzią Seascope z Hurghady",
      "description": "Dwugodzinny rejs łodzią Seascope z Hurghady: panoramiczne okna, rafy Morza Czerwonego i snorkeling. Transfer w cenie. Cena 18 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/lodz-seascope/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wielkie-akwarium",
    "route": "/wycieczki-z-hurghady/wielkie-akwarium",
    "title": "Wielkie Akwarium w Hurghadzie",
    "h1": "Wielkie Akwarium w Hurghadzie (Hurghada Grand Aquarium)",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Półdniowa wizyta w Hurghada Grand Aquarium: podwodny tunel, gatunki Morza Czerwonego, mini zoo i terrarium. Odbiór z hotelu w Hurghadzie w cenie - dobra opcja na dzień z dziećmi.",
    "overview": "Wielkie Akwarium w Hurghadzie to jedna z niewielu atrakcji, które nie wymagają całodniowej wyprawy. W środku przechodzisz podwodnym tunelem, oglądasz ryby i rekiny Morza Czerwonego, a obok czekają strefy tematyczne, mini zoo, terrarium i część edukacyjna.\n\nTo dobry pomysł na popołudnie albo dzień, w którym pogoda nie sprzyja rejsom. Zwiedzanie zajmuje zwykle 2-3 godziny, a transfer z hotelu i z powrotem jest w cenie.",
    "heroImage": {
      "src": "/media/tours/h-wielkie-akwarium",
      "alt": "Podwodny tunel w Wielkim Akwarium w Hurghadzie z ławicą ryb Morza Czerwonego",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-wielkie-akwarium",
        "alt": "Podwodny tunel w Wielkim Akwarium w Hurghadzie z ławicą ryb Morza Czerwonego",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 40,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 40,
          "currency": "USD"
        }
      ],
      "note": "Dopłata za odbiór ze stref poza Hurghadą."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2-3 godziny",
    "pickupLabel": "Poranny lub popołudniowy, do ustalenia",
    "transport": "Transfer z hotelu w Hurghadzie do akwarium i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Podwodny tunel",
      "Gatunki Morza Czerwonego",
      "Mini zoo i terrarium",
      "Blisko hotelu"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Kierowca odbiera Cię spod hotelu w Hurghadzie. Godzinę ustalamy na WhatsApp."
      },
      {
        "title": "Podwodny tunel",
        "description": "Spacer szklanym tunelem wśród ryb i rekinów Morza Czerwonego."
      },
      {
        "title": "Strefy tematyczne",
        "description": "Mini zoo, terrarium, część ze skamielinami i strefa edukacyjna."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu zwiedzania."
      }
    ],
    "included": [
      "Transfer z hotelu w Hurghadzie i z powrotem",
      "Bilet wstępu do akwarium",
      "Opieka organizacyjna"
    ],
    "excluded": [
      "Napoje i przekąski",
      "Wydatki własne i pamiątki",
      "Zdjęcia u fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Wygodne obuwie",
      "Aparat lub telefon",
      "Gotówka na napoje i pamiątki"
    ],
    "requirements": [
      "Atrakcja odpowiednia dla dzieci i seniorów.",
      "Dopłata może obowiązywać dla stref poza Hurghadą."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa zwiedzanie akwarium?",
        "answer": "Zazwyczaj 2-3 godziny. To krótka atrakcja, którą łatwo połączyć z odpoczynkiem w hotelu tego samego dnia."
      },
      {
        "question": "Czy to dobra atrakcja dla dzieci?",
        "answer": "Tak. Podwodny tunel, mini zoo i terrarium są bardzo lubiane przez dzieci, a całość odbywa się w klimatyzowanych wnętrzach."
      }
    ],
    "seo": {
      "title": "Wielkie Akwarium w Hurghadzie | Bilet i transfer",
      "description": "Hurghada Grand Aquarium: podwodny tunel, ryby Morza Czerwonego, mini zoo i terrarium. Bilet i transfer z hotelu, cena od 40 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-hurghady/wielkie-akwarium/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "aquapark-makadi-water-world",
    "route": "/wycieczki-z-hurghady/aquapark-makadi-water-world",
    "title": "Wycieczka z Hurghady do aquaparku Makadi Water World",
    "h1": "Wycieczka z Hurghady do aquaparku Makadi Water World",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Całodniowy wstęp do parku wodnego Makadi Water World w zatoce Makadi Bay, z transferem z Hurghady, ponad 50 zjeżdżalniami, basenami i bufetowym obiadem. Dobra propozycja dla rodzin z dziećmi i miłośników wodnej zabawy.",
    "overview": "Makadi Water World to jeden z największych parków wodnych na wybrzeżu Morza Czerwonego, położony w zatoce Makadi Bay pod Hurghadą. Na jego terenie znajduje się ponad 50 zjeżdżalni o różnym stopniu trudności - od łagodnych ślizgawek dla dzieci po szybkie zjazdy dla szukających mocniejszych wrażeń.\n\nPoza zjeżdżalniami do dyspozycji gości są baseny z falami, leniwa rzeka oraz strefy wypoczynku z leżakami. W cenie wycieczki jest całodniowy bilet wstępu, bufetowy obiad z napojami i lodami oraz przejazd klimatyzowanym pojazdem z Hurghady i z powrotem.\n\nWyjazd odbywa się rano z hotelu, a cały dzień przeznaczony jest na zabawę w parku - to wygodna opcja, bez organizowania transportu i biletów na własną rękę.",
    "heroImage": {
      "src": "/media/tours/h-aquapark-makadi-water-world",
      "alt": "Wycieczka z Hurghady do aquaparku Makadi Water World - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-aquapark-makadi-water-world",
        "alt": "Wycieczka z Hurghady do aquaparku Makadi Water World - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 60,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 60,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 32,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Dla gości spoza Hurghady obowiązuje dopłata za transfer w zależności od strefy hotelowej."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 8 godzin",
    "pickupLabel": "rano, z hotelu",
    "transport": "Transfer klimatyzowanym autokarem lub busem, w obie strony",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Ponad 50 zjeżdżalni",
      "Baseny z falami i leniwa rzeka",
      "Bufetowy obiad z napojami",
      "Transfer z Hurghady w obie strony"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Poranny odbiór z hotelu w Hurghadzie i przejazd klimatyzowanym pojazdem do zatoki Makadi Bay."
      },
      {
        "title": "Wejście do parku Makadi Water World",
        "description": "Odbiór całodniowego biletu wstępu i czas na zapoznanie się z układem parku."
      },
      {
        "title": "Zjeżdżalnie i baseny",
        "description": "Korzystanie z ponad 50 zjeżdżalni, basenów z falami, leniwej rzeki i stref relaksu z leżakami."
      },
      {
        "title": "Obiad w formie bufetu",
        "description": "Przerwa na obiad z napojami serwowany na terenie ośrodka."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Po zakończeniu zabawy przejazd z powrotem do hotelu w Hurghadzie."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Bilet wstępu do aquaparku",
      "Obiad, napoje i lody"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki",
      "Zdjęcia wykonywane przez fotografa",
      "Zakupy"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Klapki",
      "Gotówka na dodatkowe wydatki"
    ],
    "requirements": [
      "Opieka nad dziećmi po stronie rodziców lub opiekunów"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wstęp dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 32 USD, a dzieci poniżej 5 lat wchodzą bezpłatnie. Bilet dla osoby dorosłej to 60 USD."
      },
      {
        "question": "Jak długo trwa wycieczka?",
        "answer": "Cała wycieczka zajmuje około 8 godzin, z czego większość to czas na zabawę w parku."
      },
      {
        "question": "Czy obiad jest wliczony w cenę?",
        "answer": "Tak, w cenie jest bufetowy obiad wraz z napojami i lodami."
      },
      {
        "question": "Czy możliwy jest odbiór z hotelu poza Hurghadą?",
        "answer": "Tak, dojeżdżamy również do stref takich jak El Gouna, Sahl Hasheesh, Safaga, Soma Bay i Abu Soma - obowiązuje wtedy dopłata za transfer."
      }
    ],
    "seo": {
      "title": "Aquapark Makadi Water World - wycieczka z Hurghady",
      "description": "Całodniowy wstęp do parku wodnego Makadi Water World z Hurghady: ponad 50 zjeżdżalni, baseny, obiad i transfer. Cena od 60 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/aquapark-makadi-water-world/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "mini-egypt-park",
    "route": "/wycieczki-z-hurghady/mini-egypt-park",
    "title": "Wycieczka do Mini Egypt Park z Hurghady",
    "h1": "Wycieczka do Mini Egypt Park",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Wycieczka z Hurghady do Mini Egypt Park w rejonie Makadi - parku z ponad 50 miniaturami najważniejszych zabytków Egiptu, od piramid i Sfinksa po świątynie Luksoru. Krótki dojazd, dobra opcja dla rodzin.",
    "overview": "Mini Egypt Park to park miniatur, w którym zebrano ponad 50 makiet najważniejszych zabytków i budowli z całego kraju - to okazja, by zobaczyć Egipt w pigułce. Park leży w rejonie Makadi w Hurghadzie, obok delfinarium, a dojazd z hotelu zajmuje około 25 minut.\n\nWśród miniatur znajdują się m.in. piramidy, Sfinks, zabytkowe meczety Aleksandrii i Kairu, Muzeum Egipskie, gmach Mugammy, Uniwersytet Amerykański, świątynie Luksoru oraz Biblioteka Aleksandryjska. Przy każdym obiekcie umieszczono tabliczkę z opisem, a nawet Nil odtworzono tak, by przypominał prawdziwą rzekę.\n\nPo zwiedzaniu odwozimy uczestników z powrotem do hotelu w Hurghadzie.",
    "heroImage": {
      "src": "/media/tours/h-mini-egypt-park",
      "alt": "Wycieczka do Mini Egypt Park z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-mini-egypt-park",
        "alt": "Wycieczka do Mini Egypt Park z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 35,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 35,
          "currency": "USD"
        },
        {
          "label": "Dziecko 4-11 lat",
          "amount": 18,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 4 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 4,
      "infantFree": true,
      "note": "Dla gości spoza Hurghady obowiązuje dopłata za transfer zależnie od strefy hotelowej. Przewodnik polskojęzyczny jest dostępny za dodatkową opłatą."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Klimatyzowany samochód, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Ponad 50 miniatur zabytków Egiptu",
      "Piramidy i Sfinks w miniaturze",
      "Świątynie Luksoru i Muzeum Egipskie",
      "Krótki dojazd z Hurghady (ok. 25 min)"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu w Hurghadzie i około 25-minutowy przejazd do parku w rejonie Makadi."
      },
      {
        "title": "Zwiedzanie Mini Egypt Park",
        "description": "Spacer wśród ponad 50 miniatur zabytków Egiptu, z tabliczkami opisującymi każdy obiekt."
      },
      {
        "title": "Najważniejsze makiety",
        "description": "Piramidy, Sfinks, świątynie Luksoru, Muzeum Egipskie, Biblioteka Aleksandryjska i inne budowle w zmniejszonej skali."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu w Hurghadzie."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Zwiedzanie Mini Egypt Park"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla kierowcy i przewodnika",
      "Zakupy"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [
      {
        "label": "Przewodnik polskojęzyczny",
        "note": "dopłata 8 USD za osobę"
      }
    ],
    "whatToBring": [
      "Nakrycie głowy",
      "Okulary przeciwsłoneczne",
      "Krem z filtrem UV",
      "Aparat lub telefon",
      "Woda"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wstęp dla dziecka?",
        "answer": "Dzieci w wieku 4-11 lat płacą 18 USD, a dzieci do 4 lat wchodzą bezpłatnie. Bilet dla osoby dorosłej to 35 USD."
      },
      {
        "question": "Jak długo trwa dojazd do parku?",
        "answer": "Dojazd z hotelu do Mini Egypt Park zajmuje około 25 minut."
      },
      {
        "question": "Czy dostępny jest przewodnik po polsku?",
        "answer": "Tak, przewodnik polskojęzyczny jest dostępny za dopłatą 8 USD od osoby."
      },
      {
        "question": "Co zobaczymy w parku?",
        "answer": "Ponad 50 miniatur zabytków Egiptu, m.in. piramidy, Sfinksa, świątynie Luksoru, Muzeum Egipskie i Bibliotekę Aleksandryjską, każda z tabliczką opisową."
      }
    ],
    "seo": {
      "title": "Mini Egypt Park - wycieczka z Hurghady",
      "description": "Wycieczka z Hurghady do Mini Egypt Park: ponad 50 miniatur zabytków Egiptu - piramidy, Sfinks, świątynie Luksoru. Cena od 35 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/mini-egypt-park/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "dzien-rodzinny",
    "route": "/wycieczki-z-hurghady/dzien-rodzinny",
    "title": "Family Day Hurghada 3 w 1",
    "h1": "Family Day 3 w 1 - Hurghada",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Całodniowa wycieczka rodzinna z Hurghady łącząca trzy atrakcje: rejs łodzią Seascope, pokaz delfinów (Dolphin Show) i wieczorną kolację beduińską na pustyni. Transfer z hotelu w cenie.",
    "overview": "Family Day to pakiet trzech atrakcji w jednym dniu, pomyślany dla rodzin. Program obejmuje rejs łodzią Seascope z widokiem na podwodny świat, pokaz delfinów oraz kolację beduińską na pustyni.\n\nW cenie jest transfer z hotelu, bilety na Seascope i Dolphin Show oraz kolacja beduińska. Wycieczka zajmuje cały dzień i część wieczoru. Napoje oraz pływanie z delfinami są dodatkowo płatne.",
    "heroImage": {
      "src": "/media/tours/h-dzien-rodzinny",
      "alt": "Family Day Hurghada 3 w 1 - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-dzien-rodzinny",
        "alt": "Family Day Hurghada 3 w 1 - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 48,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 48,
          "currency": "USD"
        }
      ],
      "note": "Ostateczna cena zależy od lokalizacji hotelu. Napoje i pływanie z delfinami są dodatkowo płatne."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Cały dzień i wieczór",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rejs łodzią Seascope",
      "Pokaz delfinów (Dolphin Show)",
      "Kolacja beduińska na pustyni",
      "Transfer z hotelu w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu na pierwszą z atrakcji."
      },
      {
        "title": "Rejs łodzią Seascope",
        "description": "Rejs łodzią z panoramicznymi oknami i widokiem na rafy Morza Czerwonego."
      },
      {
        "title": "Pokaz delfinów",
        "description": "Dolphin Show - pokaz z udziałem delfinów."
      },
      {
        "title": "Kolacja beduińska",
        "description": "Wieczorna kolacja beduińska na pustyni."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu po zakończeniu wieczoru."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Bilet na rejs Seascope",
      "Bilet na pokaz delfinów (Dolphin Show)",
      "Kolacja beduińska"
    ],
    "excluded": [
      "Napoje",
      "Pływanie z delfinami (opcjonalnie)",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Pływanie z delfinami",
        "note": "za dodatkową opłatą"
      }
    ],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Ciepłe okrycie na wieczór",
      "Gotówka na napoje i opcje dodatkowe"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Jakie atrakcje obejmuje Family Day?",
        "answer": "Rejs łodzią Seascope, pokaz delfinów (Dolphin Show) oraz kolację beduińską na pustyni - trzy atrakcje w jeden dzień."
      },
      {
        "question": "Czy napoje są w cenie?",
        "answer": "Nie, napoje są dodatkowo płatne. Podobnie pływanie z delfinami jest opcjonalne i płatne osobno."
      },
      {
        "question": "Jak długo trwa wycieczka?",
        "answer": "Wycieczka zajmuje cały dzień oraz część wieczoru."
      },
      {
        "question": "Czy cena zależy od hotelu?",
        "answer": "Tak, ostateczna cena zależy od lokalizacji hotelu."
      }
    ],
    "seo": {
      "title": "Family Day Hurghada 3 w 1 - Seascope i delfiny",
      "description": "Rodzinna wycieczka 3 w 1 z Hurghady: rejs Seascope, pokaz delfinów i kolacja beduińska. Transfer z hotelu. Cena 48 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/dzien-rodzinny/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "family-safari",
    "route": "/wycieczki-z-hurghady/family-safari",
    "title": "Family Safari z Hurghady",
    "h1": "Family Safari z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Rodzinne safari z Hurghady łączące jeepa, quady i buggy. Jedziesz do wioski beduińskiej między górami, oglądasz wypiek chleba, przejedziesz się na wielbłądzie i za kierownicą quada. Trwa około 4-5 godzin.",
    "overview": "Family Safari z Hurghady to rodzinna wyprawa na pustynię, która łączy jazdę jeepem, quadami i buggy z wizytą w wiosce beduińskiej. Program jest urozmaicony, ale krótszy niż pełne safari - trwa około 4-5 godzin.\n\nZbiórka spod hotelu odbywa się około 8:00. Ponadgodzinna jazda jeepem prowadzi przez pustynię do wioski położonej między górami; po drodze możliwy jest postój na fatamorganę. W wiosce odpoczywa się w szałasach, a przewodnik pokazuje między innymi wypiek chleba, który można spróbować, oraz miejscową aptekę z ziołami i maściami.\n\nDalej czeka przejażdżka na wielbłądach oraz jazda quadami (około 30-40 minut) i buggy (około 10-15 minut). Powrót jeepami do hotelu planowany jest na około 12:00-13:00. Wycieczka jest dostępna codziennie. Samodzielnie quadem lub buggy może kierować tylko osoba, która ukończyła 16 lat.",
    "heroImage": {
      "src": "/media/tours/h-family-safari",
      "alt": "Family Safari z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-family-safari",
        "alt": "Family Safari z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 13,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 4-5 godzin",
    "pickupLabel": "rano, ok. 8:00",
    "returnLabel": "ok. 12:00-13:00",
    "transport": "Jeep, quad i buggy; transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jeep przez pustynię",
      "Wioska beduińska",
      "Wielbłądy",
      "Quady i buggy",
      "Wypiek chleba"
    ],
    "itinerary": [
      {
        "time": "ok. 8:00",
        "title": "Zbiórka i wyjazd",
        "description": "Odbiór spod hotelu i ponadgodzinna jazda jeepem przez pustynię do wioski beduińskiej położonej między górami."
      },
      {
        "title": "Przystanek na fatamorganę",
        "description": "Krótki postój, by zobaczyć zjawisko fatamorgany - jeśli pogoda pozwoli."
      },
      {
        "title": "Wioska beduińska",
        "description": "Odpoczynek w szałasach i zwiedzanie wioski z przewodnikiem; pokaz wypieku chleba z możliwością spróbowania oraz wizyta w miejscowej aptece z ziołami i maściami."
      },
      {
        "title": "Przejażdżka na wielbłądach",
        "description": "Przejażdżka wielbłądami w otoczeniu pustyni."
      },
      {
        "title": "Quady i buggy",
        "description": "Jazda quadami (około 30-40 minut) oraz buggy (około 10-15 minut) po pustyni."
      },
      {
        "time": "ok. 12:00-13:00",
        "title": "Powrót",
        "description": "Powrót jeepami do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Jazda jeepem, quadami i buggy",
      "Przejażdżka na wielbłądzie"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Chusta na twarz i okulary przeciwsłoneczne",
      "Krem z filtrem UV",
      "Zamknięte buty",
      "Aparat lub telefon",
      "Trochę gotówki na drobne wydatki"
    ],
    "requirements": [
      "Samodzielnie quadem lub buggy może kierować wyłącznie osoba, która ukończyła 16 lat"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje udział dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 13 USD, a dzieci do 5 lat bezpłatnie. Dorosły to 25 USD za osobę."
      },
      {
        "question": "Od jakiego wieku można samodzielnie prowadzić quada lub buggy?",
        "answer": "Samodzielnie quadem lub buggy może kierować wyłącznie osoba, która ukończyła 16 lat."
      },
      {
        "question": "Ile trwa safari i o której wracamy?",
        "answer": "Zbiórka jest około 8:00, a powrót jeepami do hotelu planowany jest na około 12:00-13:00 - łącznie około 4-5 godzin."
      },
      {
        "question": "Co robimy w wiosce beduińskiej?",
        "answer": "Przewodnik oprowadza po wiosce, pokazuje między innymi wypiek chleba, który można spróbować, oraz miejscową aptekę z ziołami i maściami; jest też przejażdżka na wielbłądach."
      }
    ],
    "seo": {
      "title": "Family Safari z Hurghady - jeep, quad i buggy",
      "description": "Rodzinne safari z Hurghady: jeepem do wioski beduińskiej, wielbłądy, quady i buggy. Ok. 4-5 godzin. Cena od 25 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/family-safari/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "super-safari-sahara-park",
    "route": "/wycieczki-z-hurghady/super-safari-sahara-park",
    "title": "Super Safari Sahara Park - wycieczka z Hurghady",
    "h1": "Super Safari Sahara Park - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Popołudniowe safari z Hurghady do wioski beduińskiej w górach: jazda jeepem, quadami i buggy, przejażdżka na wielbłądach, zachód słońca, kolacja w formie bufetu i wieczór egipski. Dobra opcja także dla rodzin.",
    "overview": "Super Safari Sahara Park to rozbudowana wyprawa łącząca kilka pustynnych atrakcji w jednym popołudniu. Zbiórka przed hotelem odbywa się około 12:00-13:00, po czym ponad godzinna jazda przez pustynię prowadzi do wioski beduińskiej położonej między górami. Po drodze, jeśli pogoda pozwoli, przewidziany jest przystanek na fatamorganę.\n\nW wiosce odpoczywacie w szałasach, a przewodnik oprowadza po okolicy - można zobaczyć, jak beduinki wypiekają chleb, i go spróbować. W programie są przejażdżki na wielbłądach oraz wizyta w miejscowej \"aptece\" z ziołami, roślinami i maściami stosowanymi przez Beduinów. Następnie przychodzi czas na jazdę quadami (około 30-40 minut) i buggy (około 10-15 minut).\n\nPo pięknym zachodzie słońca między górami serwowana jest kolacja w formie bufetu - surówki, sałatki, spaghetti, ryż, sosy, zapiekanki, owoce i mięso - a przy niej wieczór egipski z pokazem tańca brzucha i tanury. Powrót jeepami do hotelu następuje około godziny 19:00. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-super-safari-sahara-park",
      "alt": "Super Safari Sahara Park - wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-super-safari-sahara-park",
        "alt": "Super Safari Sahara Park - wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 30,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 15,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 6-7 godzin",
    "pickupLabel": "południe, ok. 12:00-13:00",
    "returnLabel": "ok. 19:00",
    "transport": "Transfer jeepem z/do hotelu, quady i buggy",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jeep, quady i buggy",
      "Wioska beduińska w górach",
      "Jazda na wielbłądach",
      "Zachód słońca",
      "Kolacja w formie bufetu i wieczór egipski"
    ],
    "itinerary": [
      {
        "time": "ok. 12:00-13:00",
        "title": "Zbiórka przed hotelem",
        "description": "Odbiór spod hotelu i ponad godzinna jazda jeepem przez pustynię do wioski beduińskiej."
      },
      {
        "title": "Przystanek na fatamorganę",
        "description": "Krótki postój na obserwację fatamorgany - jeśli pogoda pozwoli."
      },
      {
        "title": "Wioska beduińska",
        "description": "Odpoczynek w szałasach, oprowadzanie przez przewodnika i pokaz wypieku chleba, którego można spróbować."
      },
      {
        "title": "Wielbłądy i lokalna apteka",
        "description": "Przejażdżka na wielbłądach oraz wizyta w miejscowej \"aptece\" z ziołami, roślinami i maściami Beduinów."
      },
      {
        "title": "Quady i buggy",
        "description": "Jazda quadami (ok. 30-40 min) oraz buggy (ok. 10-15 min) po pustyni."
      },
      {
        "title": "Zachód słońca",
        "description": "Podziwianie zachodu słońca pomiędzy górami."
      },
      {
        "title": "Kolacja i wieczór egipski",
        "description": "Kolacja w formie bufetu oraz pokaz tańca brzucha i tanury."
      },
      {
        "time": "ok. 19:00",
        "title": "Powrót",
        "description": "Powrót jeepami do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda jeepem, quadami i buggy",
      "Kolacja",
      "Pokaz orientalny (taniec brzucha i tanura)"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki dla załogi",
      "Napoje",
      "Zdjęcia wykonywane przez fotografa",
      "Chusta na twarz (arafatka)",
      "Gogle"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna, Sahl Hasheesh, Makadi Bay",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Zakryte buty i długie spodnie",
      "Chusta na twarz i gogle ochronne (osłona przed piaskiem)",
      "Coś ciepłego na wieczór",
      "Krem z filtrem UV i okulary przeciwsłoneczne",
      "Woda do picia"
    ],
    "requirements": [
      "Wycieczka odpowiednia również dla rodzin z dziećmi"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 15 USD, a dzieci do 5 lat biorą udział bezpłatnie. Dorosły to 30 USD za osobę."
      },
      {
        "question": "Co znajduje się w programie?",
        "answer": "Jazda jeepem, quadami i buggy, wioska beduińska z wypiekiem chleba, przejażdżka na wielbłądach, zachód słońca, kolacja w formie bufetu oraz pokaz tańca brzucha i tanury."
      },
      {
        "question": "O której godzinie jest zbiórka i powrót?",
        "answer": "Zbiórka przed hotelem odbywa się około 12:00-13:00, a powrót jeepami do hotelu następuje około godziny 19:00."
      },
      {
        "question": "Czy wycieczka jest odpowiednia dla rodzin?",
        "answer": "Tak, program jest pomyślany również jako wyjazd rodzinny."
      }
    ],
    "seo": {
      "title": "Super Safari Sahara Park - z Hurghady",
      "description": "Popołudniowe safari z Hurghady: jeep, quady, buggy, wielbłądy, zachód słońca, kolacja i wieczór egipski. Od 30 USD/os, dzieci taniej.",
      "canonicalPath": "/wycieczki-z-hurghady/super-safari-sahara-park/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-3h",
    "route": "/wycieczki-z-hurghady/quad-safari-3h",
    "title": "Moto Quad Safari 3h - wycieczka z Hurghady",
    "h1": "Moto Quad Safari 3h - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Trzygodzinne safari quadami z Hurghady przez Saharę do wioski Beduinów, z herbatą i chlebem, jazdą na wielbłądzie i punktem widokowym. Wyjazd rano lub po południu, samodzielne kierowanie quadem od 16 lat.",
    "overview": "Moto Quad Safari 3h to skoncentrowana na quadach wyprawa w pustynię pod Hurghadą. Jeepy zabierają uczestników spod hotelu i dowożą do bazy, skąd na quadach ruszacie w głąb Sahary i w góry.\n\nW trakcie trasy zatrzymujecie się w wiosce Beduinów, gdzie można napić się herbaty i spróbować chleba wypiekanego tradycyjną metodą. W programie jest też krótka jazda na wielbłądzie oraz przystanek na wzgórzu z panoramą pustyni. Wyjazdy odbywają się około 9:00 rano lub około 13:00-14:00 po południu.\n\nCena obejmuje transport, jazdę quadem i jazdę na wielbłądzie. Samodzielnie kierować quadem może osoba, która ukończyła 16 lat. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-quad-safari-3h",
      "alt": "Moto Quad Safari 3h - wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-quad-safari-3h",
        "alt": "Moto Quad Safari 3h - wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 13,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 3 godziny",
    "pickupLabel": "rano ok. 9:00 lub po południu ok. 13:00-14:00",
    "transport": "Transfer jeepem z/do hotelu, quady, jazda na wielbłądzie",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda quadem po Saharze",
      "Wioska Beduinów",
      "Herbata i chleb beduiński",
      "Jazda na wielbłądzie",
      "Punkt widokowy"
    ],
    "itinerary": [
      {
        "time": "ok. 9:00 lub 13:00-14:00",
        "title": "Odbiór z hotelu",
        "description": "Jeepy zabierają uczestników spod hotelu i dowożą do bazy quadów."
      },
      {
        "title": "Jazda quadami",
        "description": "Przesiadka na quady i jazda w głąb pustyni oraz w góry."
      },
      {
        "title": "Wioska Beduinów",
        "description": "Postój w wiosce - herbata i chleb wypiekany tradycyjną metodą."
      },
      {
        "title": "Jazda na wielbłądzie",
        "description": "Krótka przejażdżka na wielbłądzie."
      },
      {
        "title": "Punkt widokowy",
        "description": "Przystanek na wzgórzu z panoramą pustyni."
      },
      {
        "title": "Powrót",
        "description": "Powrót do bazy i transfer do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda quadem",
      "Jazda na wielbłądzie"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki",
      "Napoje",
      "Zdjęcia wykonywane przez fotografa",
      "Chusta na twarz (arafatka)",
      "Gogle"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna, Sahl Hasheesh, Makadi Bay",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Zakryte buty i długie spodnie",
      "Chusta na twarz i gogle ochronne (osłona przed piaskiem)",
      "Krem z filtrem UV i okulary przeciwsłoneczne",
      "Woda do picia"
    ],
    "requirements": [
      "Samodzielnie kierować quadem może osoba, która ukończyła 16 lat"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 13 USD, a dzieci do 5 lat biorą udział bezpłatnie. Dorosły to 25 USD za osobę."
      },
      {
        "question": "Od ilu lat można samodzielnie kierować quadem?",
        "answer": "Samodzielnie prowadzić quad może osoba, która ukończyła 16 lat. Młodsi uczestnicy mogą jechać z dorosłym."
      },
      {
        "question": "Jak długo trwa safari?",
        "answer": "Około 3 godzin. Wyjazdy są rano, około 9:00, lub po południu, około 13:00-14:00."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transport z hotelu i z powrotem, jazda quadem oraz jazda na wielbłądzie. Napoje, napiwki, gogle i chusta nie są wliczone."
      }
    ],
    "seo": {
      "title": "Moto Quad Safari 3h - wycieczka z Hurghady",
      "description": "Trzygodzinne safari quadami z Hurghady: Sahara, wioska Beduinów, wielbłąd i panorama. Od 25 USD/os, dzieci taniej. Transfer w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/quad-safari-3h/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-5h",
    "route": "/wycieczki-z-hurghady/quad-safari-5h",
    "title": "Moto Quad Safari 5h - wycieczka z Hurghady",
    "h1": "Moto Quad Safari 5h - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Pięciogodzinne safari quadami z Hurghady przez Saharę do wioski Beduinów, z jazdą na wielbłądzie, kolacją oraz pokazem tańca brzucha i tanury. Samodzielne kierowanie quadem od 16 lat.",
    "overview": "Moto Quad Safari 5h to dłuższa wersja pustynnego safari skupionego na quadach. Trasa prowadzi przez Saharę z bazy do wioski Beduinów, gdzie można spróbować chleba i herbaty oraz przejechać się na wielbłądzie.\n\nOd wersji trzygodzinnej odróżnia ją to, co czeka po powrocie do bazy - przygotowana kolacja oraz orientalny pokaz tańca brzucha i tanury. To sprawia, że wyprawa łączy aktywną jazdę quadami z wieczornym programem rozrywkowym.\n\nCena obejmuje transport, jazdę quadami, jazdę na wielbłądzie, kolację i pokaz. Samodzielnie kierować quadem może osoba, która ukończyła 16 lat. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-quad-safari-5h",
      "alt": "Moto Quad Safari 5h - wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-quad-safari-5h",
        "alt": "Moto Quad Safari 5h - wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 30,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 15,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 5 godzin",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu, quady, jazda na wielbłądzie",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda quadami po Saharze",
      "Wioska Beduinów",
      "Jazda na wielbłądzie",
      "Kolacja",
      "Taniec brzucha i tanura"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do bazy quadów."
      },
      {
        "title": "Jazda quadami przez Saharę",
        "description": "Jazda quadami z bazy w głąb pustyni w kierunku wioski Beduinów."
      },
      {
        "title": "Wioska Beduinów",
        "description": "Chleb i herbata w wiosce oraz przejażdżka na wielbłądzie."
      },
      {
        "title": "Powrót do bazy",
        "description": "Powrót quadami do bazy."
      },
      {
        "title": "Kolacja",
        "description": "Kolacja przygotowana po zakończeniu jazdy."
      },
      {
        "title": "Pokaz orientalny",
        "description": "Pokaz tańca brzucha i tanury."
      },
      {
        "title": "Powrót",
        "description": "Transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda quadami",
      "Jazda na wielbłądzie",
      "Kolacja",
      "Pokaz orientalny (taniec brzucha i tanura)"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki",
      "Napoje",
      "Zdjęcia wykonywane przez fotografa",
      "Chusta na twarz (arafatka)",
      "Gogle"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna, Sahl Hasheesh, Makadi Bay",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Zakryte buty i długie spodnie",
      "Chusta na twarz i gogle ochronne (osłona przed piaskiem)",
      "Coś ciepłego na wieczór",
      "Krem z filtrem UV i okulary przeciwsłoneczne",
      "Woda do picia"
    ],
    "requirements": [
      "Samodzielnie kierować quadem może osoba, która ukończyła 16 lat"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 15 USD, a dzieci do 5 lat biorą udział bezpłatnie. Dorosły to 30 USD za osobę."
      },
      {
        "question": "Czym różni się wersja 5h od wersji 3h?",
        "answer": "Wersja pięciogodzinna obejmuje dodatkowo kolację po powrocie do bazy oraz orientalny pokaz tańca brzucha i tanury."
      },
      {
        "question": "Od ilu lat można samodzielnie prowadzić quad?",
        "answer": "Samodzielnie kierować quadem może osoba, która ukończyła 16 lat."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transport, jazda quadami, jazda na wielbłądzie, kolacja oraz pokaz. Napoje, napiwki, gogle i chusta nie są wliczone."
      }
    ],
    "seo": {
      "title": "Moto Quad Safari 5h - wycieczka z Hurghady",
      "description": "Pięciogodzinne safari quadami z Hurghady: Sahara, wioska Beduinów, wielbłąd, kolacja i pokaz. Od 30 USD/os, dzieci taniej.",
      "canonicalPath": "/wycieczki-z-hurghady/quad-safari-5h/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "buggy-safari",
    "route": "/wycieczki-z-hurghady/buggy-safari",
    "title": "Buggy Safari z Hurghady",
    "h1": "Buggy Safari z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Pustynna przygoda buggy z Hurghady. Prowadzisz dwu- lub czteroosobowy buggy po wydmach, odwiedzasz wioskę Beduinów, przejedziesz się na wielbłądzie i odpoczniesz przy beduińskiej herbacie. Trwa około 3-4 godzin.",
    "overview": "Buggy Safari z Hurghady to krótsza, kilkugodzinna wyprawa na pustynię za kierownicą buggy. To propozycja dla osób szukających dawki adrenaliny i jazdy po wydmach, połączonej z odwiedzinami w wiosce Beduinów.\n\nPo odbiorze z hotelu klimatyzowanym busem docierasz do bazy, skąd ruszasz w teren dwu- lub czteroosobowym buggy. W programie jest też wizyta w wiosce Beduinów, przejażdżka na wielbłądzie oraz odpoczynek przy tradycyjnej herbacie, często z widokiem na zachód słońca.\n\nWycieczka trwa około 3-4 godzin i dostępna jest codziennie, w wariancie porannym lub popołudniowym. Arafatka i gogle nie są wliczone w cenę, dlatego warto zabrać własną ochronę twarzy i oczu. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-buggy-safari",
      "alt": "Buggy Safari z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-buggy-safari",
        "alt": "Buggy Safari z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perVehicle",
      "amount": 140,
      "unit": "buggy",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Buggy 2-osobowy",
          "amount": 140,
          "currency": "USD",
          "unit": "buggy"
        },
        {
          "label": "Buggy 4-osobowy",
          "amount": 190,
          "currency": "USD",
          "unit": "buggy"
        }
      ],
      "note": "Cena podawana jest za buggy, nie za osobę. Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie (rano lub popołudniu)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 3-4 godziny",
    "pickupLabel": "rano lub popołudnie (do wyboru)",
    "transport": "Buggy, transfer klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda buggy po pustyni",
      "Wioska Beduinów",
      "Przejażdżka na wielbłądzie",
      "Herbata beduińska",
      "Zachód słońca na pustyni"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Klimatyzowany bus zabiera Cię z hotelu w Hurghadzie do bazy buggy."
      },
      {
        "title": "Jazda buggy po pustyni",
        "description": "Za kierownicą dwu- lub czteroosobowego buggy przemierzasz pustynne wydmy."
      },
      {
        "title": "Wioska Beduinów",
        "description": "Wizyta w osadzie i poznanie codziennego życia oraz tradycji mieszkańców pustyni."
      },
      {
        "title": "Przejażdżka na wielbłądzie",
        "description": "Krótka przejażdżka wielbłądem w pustynnej scenerii."
      },
      {
        "title": "Herbata beduińska",
        "description": "Odpoczynek przy tradycyjnej herbacie, często z widokiem na zachodzące słońce."
      },
      {
        "title": "Powrót",
        "description": "Powrót do hotelu w Hurghadzie."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Jazda buggy po pustyni",
      "Wizyta w wiosce Beduinów",
      "Przejażdżka na wielbłądzie",
      "Herbata beduińska"
    ],
    "excluded": [
      "Zakupy, napoje i wydatki własne",
      "Zdjęcia wykonywane przez fotografa",
      "Arafatka (chusta na twarz)",
      "Gogle ochronne"
    ],
    "transferSupplements": [
      {
        "zone": "Safaga, Soma Bay, El Gouna",
        "amount": 10
      },
      {
        "zone": "Makadi Bay, Sahl Hasheesh",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Chusta lub arafatka na twarz",
      "Okulary lub gogle ochronne",
      "Krem z filtrem UV",
      "Zamknięte, wygodne buty",
      "Coś ciepłego na wyjazd popołudniowy"
    ],
    "requirements": [
      "Zalecane zasłonięcie twarzy i oczu ze względu na pustynny pył",
      "Wskazane wygodne, zakryte obuwie"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Jak liczona jest cena?",
        "answer": "Cena podawana jest za buggy, a nie za osobę. Buggy dwuosobowy kosztuje 140 USD, a czteroosobowy 190 USD."
      },
      {
        "question": "Ile trwa wycieczka?",
        "answer": "Buggy Safari trwa około 3-4 godzin. Dostępne są wyjazdy poranne i popołudniowe."
      },
      {
        "question": "Co warto zabrać?",
        "answer": "Warto mieć własną chustę lub arafatkę na twarz oraz gogle - nie są one wliczone w cenę. Przydadzą się też zamknięte buty i krem z filtrem."
      },
      {
        "question": "Czy w programie jest coś poza jazdą buggy?",
        "answer": "Tak. Poza jazdą po pustyni w programie są wizyta w wiosce Beduinów, przejażdżka na wielbłądzie i odpoczynek przy beduińskiej herbacie."
      }
    ],
    "seo": {
      "title": "Buggy Safari z Hurghady - pustynna przygoda",
      "description": "Buggy Safari z Hurghady: jazda buggy po pustyni, wioska Beduinów, wielbłąd i herbata. Ok. 3-4 godziny. Cena od 140 USD za buggy.",
      "canonicalPath": "/wycieczki-z-hurghady/buggy-safari/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "jazda-konno-kapiel-w-morzu",
    "route": "/wycieczki-z-hurghady/jazda-konno-kapiel-w-morzu",
    "title": "Jazda konno i kąpiel w morzu - wycieczka z Hurghady",
    "h1": "Jazda konno i kąpiel w morzu - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Jazda konno z Hurghady po pustyni i plaży, z możliwością wejścia z koniem do morza. Krótka aktywność (ok. 1-2 godziny) w kilku wariantach do wyboru, także z dodatkową jazdą quadem. Dobra opcja dla osób bez doświadczenia jeździeckiego.",
    "overview": "To krótka aktywność konna w okolicy Hurghady, w której spędzasz czas w siodle na plaży i na pustyni, a w wybranych wariantach wchodzisz z koniem do morza. Konie są spokojne i prowadzone pod opieką obsługi, więc udział nie wymaga wcześniejszego doświadczenia.\n\nDo wyboru jest kilka wariantów o różnym czasie trwania i zakresie: sama jazda po pustyni, jazda łącząca pustynię z plażą, warianty z kąpielą w morzu, a także zestaw łączący jazdę konną z godziną jazdy quadem. Cała aktywność trwa około 1 lub 2 godzin, zależnie od wybranej opcji.\n\nCena zawiera transport z hotelu i z powrotem oraz jazdę konną (quad w wariancie opcjonalnym). Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-jazda-konno-kapiel-w-morzu",
      "alt": "Jazda konno i kąpiel w morzu - wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-jazda-konno-kapiel-w-morzu",
        "alt": "Jazda konno i kąpiel w morzu - wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 23,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Jazda konno 1h po pustyni",
          "amount": 23,
          "currency": "USD"
        },
        {
          "label": "Jazda konno 1h po pustyni + 1h po plaży",
          "amount": 28,
          "currency": "USD"
        },
        {
          "label": "Jazda konno 1h + kąpiel w morzu",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "Jazda konno 2h + kąpiel w morzu",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Jazda konno 1h + quad 1h",
          "amount": 35,
          "currency": "USD"
        }
      ],
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 1-2 godziny",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu, jazda konno (opcjonalnie quad)",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda konno po plaży",
      "Kąpiel w morzu z koniem",
      "Jazda po pustyni",
      "Opcja z jazdą quadem"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie na miejsce jazdy konnej."
      },
      {
        "title": "Jazda konno",
        "description": "Przejażdżka po pustyni i wzdłuż plaży pod opieką obsługi - stępem lub kłusem, w zależności od wybranego wariantu."
      },
      {
        "title": "Kąpiel w morzu z koniem",
        "description": "W wariantach z kąpielą wchodzisz razem z koniem do morza - to najbardziej charakterystyczny punkt tej aktywności."
      },
      {
        "title": "Opcjonalna jazda quadem",
        "description": "W wariancie łączonym po jeździe konnej dochodzi godzina jazdy quadem."
      },
      {
        "title": "Powrót",
        "description": "Transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda konno",
      "Jazda quadem (w wariancie opcjonalnym)"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki dla kierowcy i przewodnika"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh, Makadi Bay, Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Wygodne, długie spodnie i zakryte buty",
      "Strój kąpielowy i ręcznik (w wariancie z kąpielą)",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Woda do picia"
    ],
    "requirements": [
      "Nie jest wymagane wcześniejsze doświadczenie jeździeckie - obsługa prowadzi konie i instruuje na miejscu",
      "Do wariantu z kąpielą przydatny jest strój kąpielowy"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje jazda konno?",
        "answer": "Ceny zależą od wariantu i zaczynają się od 23 USD za osobę za godzinną jazdę po pustyni. Wariant z pustynią i plażą to 28 USD, jazda z kąpielą w morzu 25 USD (1h) lub 30 USD (2h), a zestaw z godziną jazdy quadem 35 USD za osobę."
      },
      {
        "question": "Czy trzeba umieć jeździć konno?",
        "answer": "Nie. Konie są spokojne i prowadzone pod opieką obsługi, a krótki instruktaż odbywa się na miejscu, więc aktywność jest odpowiednia także dla początkujących."
      },
      {
        "question": "Czy naprawdę można wejść z koniem do morza?",
        "answer": "Tak, w wariantach z kąpielą w morzu wchodzisz razem z koniem do wody. Warto zabrać strój kąpielowy i ręcznik."
      },
      {
        "question": "Jak długo trwa aktywność?",
        "answer": "Około 1 lub 2 godzin, w zależności od wybranego wariantu."
      }
    ],
    "seo": {
      "title": "Jazda konno i kąpiel w morzu - z Hurghady",
      "description": "Jazda konno z Hurghady po pustyni i plaży, z kąpielą w morzu i opcją jazdy quadem. Kilka wariantów, od 23 USD/os. Transfer z hotelu w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/jazda-konno-kapiel-w-morzu/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "jazda-na-wielbladzie",
    "route": "/wycieczki-z-hurghady/jazda-na-wielbladzie",
    "title": "Jazda na wielbłądzie - wycieczka z Hurghady",
    "h1": "Jazda na wielbłądzie - wycieczka z Hurghady",
    "destination": "hurghada",
    "category": "safari",
    "departure": "Hurghada",
    "shortDescription": "Popołudniowa przejażdżka na wielbłądzie z Hurghady - jedno- lub dwugodzinna, prowadząca przez pustynię i tereny nadmorskie. Prosta aktywność odpowiednia dla każdego, bez potrzeby doświadczenia.",
    "overview": "Przejażdżka na wielbłądzie to spokojny sposób na poznanie pustyni w okolicy Hurghady. Trasa prowadzi zarówno przez piaszczyste tereny pustynne, jak i wzdłuż wybrzeża, a tempo jest łagodne, więc udział nie wymaga żadnego przygotowania ani doświadczenia.\n\nAktywność zaczyna się po południu, około godziny 14:00-15:00, a powrót planowany jest w okolicach godziny 18:00. Do wyboru są dwa warianty - jedno- lub dwugodzinny.\n\nCena obejmuje transport z hotelu i z powrotem oraz jazdę na wielbłądzie. Dla gości z hoteli poza Hurghadą obowiązują dopłaty do transferu.",
    "heroImage": {
      "src": "/media/tours/h-jazda-na-wielbladzie",
      "alt": "Jazda na wielbłądzie - wycieczka z Hurghady - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-jazda-na-wielbladzie",
        "alt": "Jazda na wielbłądzie - wycieczka z Hurghady - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "1 godzina",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "2 godziny",
          "amount": 30,
          "currency": "USD"
        }
      ],
      "note": "Za odbiór z hoteli poza Hurghadą obowiązują dopłaty do transferu."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 1-2 godziny",
    "pickupLabel": "popołudnie, ok. 14:00-15:00",
    "returnLabel": "ok. 18:00",
    "transport": "Transfer z/do hotelu, jazda na wielbłądzie",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda na wielbłądzie",
      "Pustynia i tereny nadmorskie",
      "Popołudniowa pora",
      "Dla każdego, bez doświadczenia"
    ],
    "itinerary": [
      {
        "time": "ok. 14:00-15:00",
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie na miejsce zbiórki."
      },
      {
        "title": "Jazda na wielbłądzie",
        "description": "Jedno- lub dwugodzinna przejażdżka w spokojnym tempie po pustyni."
      },
      {
        "title": "Przejazd wzdłuż wybrzeża",
        "description": "Trasa obejmuje także tereny nadmorskie."
      },
      {
        "time": "ok. 18:00",
        "title": "Powrót",
        "description": "Powrót i transfer do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda na wielbłądzie"
    ],
    "excluded": [
      "Wydatki własne",
      "Napiwki dla kierowcy i przewodnika",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 5
      },
      {
        "zone": "Sahl Hasheesh, Makadi Bay, Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Wygodne, długie spodnie",
      "Nakrycie głowy i okulary przeciwsłoneczne",
      "Krem z filtrem UV",
      "Woda do picia"
    ],
    "requirements": [
      "Przejażdżka jest odpowiednia dla każdego, niezależnie od doświadczenia"
    ],
    "cancellationPolicy": "Rezerwację potwierdzamy na WhatsApp - to rezerwacja wstępna, bez płatności online. Za wycieczkę płacisz na miejscu. Jeśli chcesz zmienić lub odwołać termin, daj nam znać z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje przejażdżka na wielbłądzie?",
        "answer": "Godzinna przejażdżka to 25 USD za osobę, a dwugodzinna 30 USD za osobę."
      },
      {
        "question": "O której godzinie się zaczyna i kończy?",
        "answer": "Aktywność startuje po południu, około 14:00-15:00, a powrót planowany jest w okolicach godziny 18:00."
      },
      {
        "question": "Czy potrzebne jest doświadczenie?",
        "answer": "Nie. Wielbłądy prowadzą się w spokojnym tempie, a przejażdżka jest odpowiednia dla każdego, niezależnie od wieku i przygotowania."
      },
      {
        "question": "Co obejmuje cena?",
        "answer": "Transport z hotelu i z powrotem oraz jazdę na wielbłądzie. Zdjęcia fotografa i napiwki nie są wliczone."
      }
    ],
    "seo": {
      "title": "Jazda na wielbłądzie - wycieczka z Hurghady",
      "description": "Popołudniowa jazda na wielbłądzie z Hurghady przez pustynię i wybrzeże. Wariant 1h lub 2h, od 25 USD/os. Transfer z hotelu w cenie.",
      "canonicalPath": "/wycieczki-z-hurghady/jazda-na-wielbladzie/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "parasailing",
    "route": "/wycieczki-z-hurghady/parasailing",
    "title": "Parasailing w Hurghadzie",
    "h1": "Wycieczka z Hurghady - Parasailing",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Lot na spadochronie holowanym przez motorówkę nad zatoką w Hurghadzie - kilka minut w powietrzu z widokiem na morze i panoramę miasta. Można lecieć samodzielnie lub we dwoje. Transfer z hotelu w cenie.",
    "overview": "Parasailing to lot na spadochronie ciągniętym przez motorówkę. Sam lot trwa kilka minut (zwykle 5-7), a z góry rozciąga się widok na Morze Czerwone i panoramę Hurghady. Motorówka zabiera kilka osób naraz, więc cała wycieczka trwa dłużej niż pojedynczy lot.\n\nMożna wzbić się samodzielnie lub we dwoje. W trakcie lotu sam decydujesz, czy chcesz lecieć wyżej, czy niżej, oraz czy zanurzyć stopy w wodzie. W cenie jest transfer z hotelu oraz lot na spadochronie.",
    "heroImage": {
      "src": "/media/tours/h-parasailing",
      "alt": "Parasailing w Hurghadzie - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-parasailing",
        "alt": "Parasailing w Hurghadzie - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 27,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Lot samodzielny",
          "amount": 27,
          "currency": "USD",
          "unit": "osoba"
        },
        {
          "label": "Lot we dwoje (2 osoby)",
          "amount": 38,
          "currency": "USD",
          "unit": "para"
        },
        {
          "label": "Osoba towarzysząca (bez lotu)",
          "amount": 10,
          "currency": "USD"
        }
      ],
      "note": "Dla gości spoza Hurghady obowiązuje dopłata za transfer zależnie od strefy hotelowej."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu, lot za motorówką",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Lot na spadochronie za motorówką",
      "Widok na Hurghadę z lotu ptaka",
      "Lot samodzielnie lub we dwoje",
      "Transfer z hotelu w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Hurghadzie do miejsca startu nad wodą."
      },
      {
        "title": "Przygotowanie i instruktaż",
        "description": "Zapięcie uprzęży i krótkie wskazówki przed lotem."
      },
      {
        "title": "Lot na spadochronie",
        "description": "Kilkuminutowy lot (zwykle 5-7 minut) za motorówką, z możliwością wyboru wysokości."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Lot na spadochronie"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Okulary przeciwsłoneczne z paskiem",
      "Krem z filtrem UV",
      "Gotówka na zdjęcia"
    ],
    "requirements": [
      "Atrakcja dla osób bez przeciwwskazań zdrowotnych"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa lot na spadochronie?",
        "answer": "Sam lot trwa zwykle 5-7 minut, a cała wycieczka dłużej, ponieważ motorówka obsługuje kilka osób."
      },
      {
        "question": "Czy można lecieć we dwoje?",
        "answer": "Tak. Lot w pojedynkę kosztuje 27 USD od osoby, a wspólny lot dla dwóch osób 38 USD. Osoba towarzysząca bez lotu płaci 10 USD."
      },
      {
        "question": "Czy jest odbiór z hotelu?",
        "answer": "Tak, transfer z/do hotelu jest w cenie. Dla gości spoza Hurghady obowiązuje dopłata za transfer."
      },
      {
        "question": "Czy zamoczę się podczas lotu?",
        "answer": "Sam decydujesz - możesz zanurzyć stopy w wodzie albo lecieć sucho, a także wybrać, czy lecisz wyżej, czy niżej."
      }
    ],
    "seo": {
      "title": "Parasailing w Hurghadzie - lot na spadochronie",
      "description": "Parasailing w Hurghadzie: lot na spadochronie za motorówką z widokiem na morze i miasto. Solo lub we dwoje. Transfer w cenie. Cena od 27 USD.",
      "canonicalPath": "/wycieczki-z-hurghady/parasailing/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "city-tour",
    "route": "/wycieczki-z-hurghady/city-tour",
    "title": "City Tour po Hurghadzie",
    "h1": "Wycieczka City Tour z Hurghady",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Objazdowa wycieczka po Hurghadzie z odbiorem z hotelu - kościół koptyjski, meczet, lokalny bazar, targ rybny, nowa marina i punkt widokowy z panoramą miasta. Dobra opcja na poznanie miasta od środka.",
    "overview": "City Tour to spacer po najbardziej charakterystycznych miejscach Hurghady. Wycieczka rozpoczyna się o dogodnej porze - najczęściej około 10:00 lub około 14:00 - a odbiór odbywa się bezpośrednio z hotelu klimatyzowanym samochodem lub busem.\n\nW programie znajdują się kościół koptyjski, meczet oraz lokalny bazar (tzw. souk) z warzywami, owocami i mięsem, a także targ rybny i nowa marina, czyli nadmorski deptak. Na koniec dojeżdżamy na punkt widokowy z panoramą miasta.\n\nDla chętnych przewidziano wizytę w fabryce perfum oraz czas na zakup pamiątek.",
    "heroImage": {
      "src": "/media/tours/h-city-tour",
      "alt": "City Tour po Hurghadzie - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-city-tour",
        "alt": "City Tour po Hurghadzie - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 12,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 12,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 11 lat",
          "amount": 6,
          "currency": "USD"
        }
      ],
      "note": "Dla gości spoza Hurghady obowiązuje dopłata za transfer zależnie od strefy hotelowej."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "ok. 10:00 lub ok. 14:00 (do wyboru)",
    "transport": "Klimatyzowany samochód lub bus, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Kościół koptyjski i meczet",
      "Lokalny bazar i targ rybny",
      "Nowa Marina - nadmorski deptak",
      "Punkt widokowy z panoramą miasta"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu w Hurghadzie o wybranej porze - około 10:00 lub około 14:00."
      },
      {
        "title": "Kościół koptyjski i meczet",
        "description": "Wizyta przy koptyjskim kościele i miejskim meczecie."
      },
      {
        "title": "Bazar i targ rybny",
        "description": "Spacer po lokalnym souku z warzywami, owocami i mięsem oraz po targu rybnym."
      },
      {
        "title": "Nowa Marina",
        "description": "Przejście nadmorskim deptakiem nowej mariny."
      },
      {
        "title": "Punkt widokowy",
        "description": "Przejazd na punkt widokowy z panoramą Hurghady."
      },
      {
        "title": "Fabryka perfum (opcjonalnie)",
        "description": "Dla chętnych wizyta w fabryce perfum i czas na zakup pamiątek."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Zwiedzanie miasta"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla kierowcy i przewodnika",
      "Zakupy"
    ],
    "transferSupplements": [
      {
        "zone": "El Gouna",
        "amount": 10
      },
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 5
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Wygodne obuwie",
      "Nakrycie głowy",
      "Woda",
      "Gotówka na pamiątki i zakupy"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dziecko do 11 lat płaci 6 USD, a osoba dorosła 12 USD."
      },
      {
        "question": "O której godzinie startuje wycieczka?",
        "answer": "Wycieczka rusza najczęściej około 10:00 lub około 14:00 - porę ustalamy przy rezerwacji."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "W cenie jest transport z/do hotelu oraz zwiedzanie miasta. Wydatki osobiste, napiwki i zakupy są dodatkowe."
      },
      {
        "question": "Czy jest odbiór spoza Hurghady?",
        "answer": "Tak, dojeżdżamy m.in. do El Gouny, Sahl Hasheesh, Makadi, Safagi, Soma Bay i Abu Soma - obowiązuje wtedy dopłata za transfer."
      }
    ],
    "seo": {
      "title": "City Tour po Hurghadzie - zwiedzanie miasta",
      "description": "Objazdowa wycieczka po Hurghadzie: kościół koptyjski, bazar, targ rybny, marina i punkt widokowy. Odbiór z hotelu. Cena od 12 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/city-tour/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "el-gouna",
    "route": "/wycieczki-z-hurghady/el-gouna",
    "title": "Wycieczka z Hurghady do El Gouny",
    "h1": "Wycieczka z Hurghady do El Gouny",
    "destination": "hurghada",
    "category": "atrakcje",
    "departure": "Hurghada",
    "shortDescription": "Wycieczka z Hurghady do El Gouny - kurortu zwanego Egipską Wenecją, zbudowanego na sieci kanałów. W programie promenada przy przystani Abu Tig, dzielnica Down Town i wieża widokowa El Gouna. Przejazd prywatnym samochodem z przewodnikiem.",
    "overview": "El Gouna leży około 30 km na północ od Hurghady i bywa nazywana Egipską Wenecją - kurort zbudowano na sieci sztucznych kanałów wypełnionych wodą morską, wśród zieleni, ogrodów i pól golfowych. Znajdują się tu luksusowe hotele i prywatne wille.\n\nOdbiór z hotelu i przejazd do El Gouny odbywa się prywatnym, klimatyzowanym samochodem w towarzystwie przewodnika. Na miejscu spacerujemy po nadmorskiej promenadzie przy przystani Abu Tig, pełnej jachtów, kawiarni i restauracji, oraz po dzielnicy Down Town.\n\nNa zakończenie odwiedzamy wieżę El Gouna, z której rozciąga się widok na okolicę, po czym wracamy do hotelu.",
    "heroImage": {
      "src": "/media/tours/h-el-gouna",
      "alt": "Wycieczka z Hurghady do El Gouny - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-el-gouna",
        "alt": "Wycieczka z Hurghady do El Gouny - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 27,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 27,
          "currency": "USD"
        },
        {
          "label": "Dziecko",
          "amount": 14,
          "currency": "USD"
        }
      ],
      "note": "Dla gości spoza Hurghady obowiązuje dopłata za transfer zależnie od strefy hotelowej."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Prywatny klimatyzowany samochód z przewodnikiem, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Egipska Wenecja - miasto na kanałach",
      "Przystań Abu Tig",
      "Dzielnica Down Town",
      "Wieża widokowa El Gouna"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu w Hurghadzie i przejazd prywatnym klimatyzowanym samochodem do El Gouny."
      },
      {
        "title": "Przystań Abu Tig",
        "description": "Spacer nadmorską promenadą wśród jachtów, kawiarni i restauracji."
      },
      {
        "title": "Down Town",
        "description": "Spacer po dzielnicy Down Town w El Gounie."
      },
      {
        "title": "Wieża El Gouna",
        "description": "Wizyta przy wieży El Gouna z widokiem na okolicę."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Przejazd z powrotem do hotelu w Hurghadzie."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Zwiedzanie miasta z przewodnikiem"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla kierowcy i przewodnika",
      "Zakupy"
    ],
    "transferSupplements": [
      {
        "zone": "Sahl Hasheesh",
        "amount": 5
      },
      {
        "zone": "Makadi",
        "amount": 10
      },
      {
        "zone": "Safaga, Soma Bay, Abu Soma",
        "amount": 10
      }
    ],
    "extras": [],
    "whatToBring": [
      "Wygodne obuwie",
      "Nakrycie głowy",
      "Okulary przeciwsłoneczne",
      "Gotówka na kawiarnie i zakupy"
    ],
    "requirements": [],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Bilet dla dziecka to 14 USD, a dla osoby dorosłej 27 USD."
      },
      {
        "question": "Czym dojeżdża się do El Gouny?",
        "answer": "Prywatnym, klimatyzowanym samochodem w towarzystwie przewodnika, z odbiorem z hotelu."
      },
      {
        "question": "Co zobaczymy w El Gounie?",
        "answer": "Przystań Abu Tig z promenadą, dzielnicę Down Town oraz wieżę El Gouna z widokiem na okolicę."
      },
      {
        "question": "Czy jest odbiór spoza Hurghady?",
        "answer": "Tak, dojeżdżamy m.in. do Sahl Hasheesh, Makadi, Safagi, Soma Bay i Abu Soma - obowiązuje wtedy dopłata za transfer."
      }
    ],
    "seo": {
      "title": "Wycieczka z Hurghady do El Gouny - Egipska Wenecja",
      "description": "Wycieczka do El Gouny z Hurghady: przystań Abu Tig, Down Town i wieża widokowa. Prywatny samochód z przewodnikiem. Cena od 27 USD za osobę.",
      "canonicalPath": "/wycieczki-z-hurghady/el-gouna/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kurs-padi-open-water",
    "route": "/wycieczki-z-hurghady/kurs-padi-open-water",
    "title": "Kurs PADI Open Water Diver w Hurghadzie",
    "h1": "Kurs PADI Open Water Diver (OWD) w Hurghadzie",
    "destination": "hurghada",
    "category": "nurkowanie",
    "departure": "Hurghada",
    "shortDescription": "Podstawowy kurs nurkowy PADI w Hurghadzie dla początkujących, bez wcześniejszego doświadczenia. W ciągu 3-4 dni odbędziesz cztery nurkowania z instruktorem i zdobędziesz międzynarodowy certyfikat Open Water Diver, uprawniający do nurkowania z partnerem do 18 metrów.",
    "overview": "Open Water Diver to najczęściej wybierany kurs nurkowy PADI i naturalny początek przygody z nurkowaniem. Nie musisz mieć żadnego doświadczenia - instruktor prowadzi Cię krok po kroku, od teorii, przez ćwiczenia w płytkiej wodzie, aż po nurkowania w morzu.\n\nSzkolenie obejmuje cztery nurkowania na wodach otwartych, podczas których utrwalasz podstawowe umiejętności i uczysz się bezpiecznego nurkowania z partnerem. W cenie zapewniamy sprzęt, opiekę instruktora oraz lunch i napoje.\n\nKurs trwa 3-4 dni i kończy się międzynarodowym certyfikatem PADI Open Water Diver, honorowanym na całym świecie. Po jego zdobyciu możesz nurkować z partnerem do 18 metrów. Termin ustalamy indywidualnie i potwierdzamy szczegóły na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-kurs-padi-open-water",
      "alt": "Kurs PADI Open Water Diver w Hurghadzie - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-kurs-padi-open-water",
        "alt": "Kurs PADI Open Water Diver w Hurghadzie - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perCourse",
      "amount": 400,
      "unit": "kurs",
      "currency": "EUR",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Kurs",
          "amount": 400,
          "currency": "EUR",
          "unit": "kurs"
        }
      ],
      "note": "Cena za cały kurs obejmuje cztery nurkowania, sprzęt i certyfikat."
    },
    "availabilityLabel": "Terminy ustalane indywidualnie",
    "availabilityDays": [
      "Terminy ustalane indywidualnie"
    ],
    "durationLabel": "3-4 dni",
    "pickupLabel": "Do ustalenia",
    "transport": "Nurkowania na wodach otwartych z instruktorem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Certyfikat PADI OWD",
      "Kurs od podstaw",
      "4 nurkowania",
      "Sprzęt w cenie",
      "Szkolenie z instruktorem"
    ],
    "itinerary": [
      {
        "time": "Dzień 1",
        "title": "Teoria i podstawy",
        "description": "Zajęcia teoretyczne oraz pierwsze ćwiczenia z instruktorem: obsługa sprzętu i zasady bezpieczeństwa."
      },
      {
        "title": "Ćwiczenia w płytkiej wodzie",
        "description": "Nauka podstawowych umiejętności nurkowych krok po kroku, zanim wejdziesz na głębszą wodę."
      },
      {
        "time": "Dzień 2-4",
        "title": "4 nurkowania na wodach otwartych",
        "description": "Cztery nurkowania w morzu, podczas których utrwalasz umiejętności pod okiem instruktora."
      },
      {
        "title": "Certyfikat PADI Open Water Diver",
        "description": "Po zaliczeniu kursu otrzymujesz międzynarodowy certyfikat i możesz nurkować z partnerem do 18 metrów."
      }
    ],
    "included": [
      "Szkolenie z instruktorem PADI",
      "4 nurkowania na wodach otwartych",
      "Sprzęt nurkowy",
      "Międzynarodowy certyfikat PADI Open Water Diver",
      "Lunch i napoje"
    ],
    "excluded": [
      "Wydatki własne i pamiątki",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [
      "Umiejętność pływania",
      "Dobry ogólny stan zdrowia"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i szczegółów kursu na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy muszę mieć doświadczenie w nurkowaniu?",
        "answer": "Nie, to podstawowy kurs od zera - instruktor prowadzi Cię krok po kroku, od teorii po nurkowania w morzu."
      },
      {
        "question": "Ile trwa kurs Open Water Diver?",
        "answer": "Kurs trwa 3-4 dni i obejmuje cztery nurkowania na wodach otwartych."
      },
      {
        "question": "Do jakiej głębokości uprawnia certyfikat?",
        "answer": "Certyfikat PADI OWD pozwala nurkować z partnerem do 18 metrów na całym świecie."
      },
      {
        "question": "Czy sprzęt jest w cenie?",
        "answer": "Tak. W cenie są sprzęt nurkowy, szkolenie z instruktorem, certyfikat oraz lunch i napoje."
      }
    ],
    "seo": {
      "title": "Kurs PADI Open Water Diver w Hurghadzie - certyfikat",
      "description": "Podstawowy kurs PADI Open Water Diver w Hurghadzie: 4 nurkowania, sprzęt, instruktor i certyfikat PADI. Nurkowanie do 18 m. Cena kursu 400 EUR.",
      "canonicalPath": "/wycieczki-z-hurghady/kurs-padi-open-water/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kurs-padi-advanced-open-water",
    "route": "/wycieczki-z-hurghady/kurs-padi-advanced-open-water",
    "title": "Kurs PADI Advanced Open Water Diver w Hurghadzie",
    "h1": "Kurs PADI Advanced Open Water Diver (AOWD) w Hurghadzie",
    "destination": "hurghada",
    "category": "nurkowanie",
    "departure": "Hurghada",
    "shortDescription": "Zaawansowany kurs nurkowy PADI w Hurghadzie dla osób z certyfikatem Open Water Diver. W ciągu dwóch dni wykonasz pięć nurkowań z instruktorem, w tym Deep Dive i Navigation, a na koniec odbierzesz międzynarodowy certyfikat AOWD i uprawnienia do nurkowania do 30 metrów.",
    "overview": "Kurs Advanced Open Water Diver to kolejny krok dla osób, które mają już podstawowy certyfikat PADI OWD i chcą rozwinąć swoje umiejętności pod wodą. Szkolenie stawia na praktykę - większość czasu spędzasz w wodzie, a nie nad książką.\n\nW ramach kursu wykonasz pięć nurkowań typu Adventure Dive. Dwa z nich są obowiązkowe: Deep Dive, po którym możesz schodzić do 30 metrów, oraz Navigation, czyli orientacja i posługiwanie się kompasem pod wodą. Pozostałe nurkowania rozwijają konkretne umiejętności wybrane wspólnie z instruktorem.\n\nSzkolenie trwa dwa dni i kończy się międzynarodowym certyfikatem PADI Advanced Open Water Diver, uznawanym na całym świecie. Termin ustalamy indywidualnie - szczegóły i rezerwację potwierdzimy na WhatsApp.",
    "heroImage": {
      "src": "/media/tours/h-kurs-padi-advanced-open-water",
      "alt": "Kurs PADI Advanced Open Water Diver w Hurghadzie - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/h-kurs-padi-advanced-open-water",
        "alt": "Kurs PADI Advanced Open Water Diver w Hurghadzie - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perCourse",
      "amount": 360,
      "unit": "kurs",
      "currency": "EUR",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Kurs",
          "amount": 360,
          "currency": "EUR",
          "unit": "kurs"
        }
      ],
      "note": "Cena za cały kurs obejmujący pięć nurkowań."
    },
    "availabilityLabel": "Terminy ustalane indywidualnie",
    "availabilityDays": [
      "Terminy ustalane indywidualnie"
    ],
    "durationLabel": "2 dni",
    "pickupLabel": "Do ustalenia",
    "transport": "Nurkowania na wodach otwartych z instruktorem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Certyfikat PADI AOWD",
      "5 nurkowań",
      "Deep Dive do 30 m",
      "Nawigacja podwodna",
      "Szkolenie z instruktorem"
    ],
    "itinerary": [
      {
        "time": "Dzień 1",
        "title": "Odprawa i pierwsze nurkowania",
        "description": "Spotkanie z instruktorem, omówienie zasad kursu Adventure Dive i wejście do wody na pierwsze nurkowania."
      },
      {
        "title": "Deep Dive",
        "description": "Nurkowanie głębokie, po którym możesz schodzić do 30 metrów."
      },
      {
        "title": "Navigation",
        "description": "Nurkowanie z nawigacją podwodną - orientacja pod wodą i posługiwanie się kompasem."
      },
      {
        "time": "Dzień 2",
        "title": "Kolejne nurkowania Adventure",
        "description": "Pozostałe z pięciu wymaganych nurkowań, rozwijające wybrane umiejętności pod wodą."
      },
      {
        "title": "Certyfikat PADI AOWD",
        "description": "Po zaliczeniu wszystkich nurkowań otrzymujesz międzynarodowy certyfikat Advanced Open Water Diver."
      }
    ],
    "included": [
      "Szkolenie z instruktorem PADI",
      "5 nurkowań (Adventure Dive, w tym Deep Dive i Navigation)",
      "Międzynarodowy certyfikat PADI Advanced Open Water Diver",
      "Lunch i napoje"
    ],
    "excluded": [
      "Wydatki własne i pamiątki",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem przeciwsłoneczny",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [
      "Ukończony kurs PADI Open Water Diver lub równoważny",
      "Dobry ogólny stan zdrowia i umiejętność pływania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia terminu i szczegółów kursu na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa kurs Advanced Open Water Diver?",
        "answer": "Kurs trwa dwa dni i obejmuje pięć nurkowań typu Adventure Dive."
      },
      {
        "question": "Do jakiej głębokości mogę nurkować po kursie?",
        "answer": "Po ukończeniu kursu i nurkowaniu Deep Dive możesz schodzić do 30 metrów."
      },
      {
        "question": "Czy potrzebuję wcześniejszego certyfikatu?",
        "answer": "Tak, kurs jest przeznaczony dla osób, które mają już certyfikat PADI Open Water Diver lub równoważny."
      },
      {
        "question": "Co zawiera cena kursu?",
        "answer": "W cenie są: szkolenie z instruktorem, pięć nurkowań, międzynarodowy certyfikat PADI AOWD oraz lunch i napoje."
      }
    ],
    "seo": {
      "title": "Kurs PADI AOWD w Hurghadzie - nurkowanie do 30 m",
      "description": "Zaawansowany kurs PADI Advanced Open Water Diver w Hurghadzie - 5 nurkowań, Deep Dive i Navigation, certyfikat i nurkowanie do 30 m. Cena kursu 360 EUR.",
      "canonicalPath": "/wycieczki-z-hurghady/kurs-padi-advanced-open-water/",
      "ogImage": "/media/og/hurghada.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-stary-kair-piramidy",
    "route": "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy",
    "title": "Wycieczka z Marsa Alam do Kairu",
    "h1": "Wycieczka z Marsa Alam do Kairu",
    "destination": "marsa-alam",
    "category": "kair",
    "departure": "Marsa Alam",
    "shortDescription": "Rozbudowany program z Marsa Alam: Stary Kair z zabytkami trzech religii oraz piramidy i Sfinks w Gizie. Odbiór z hotelu i polskojęzyczny przewodnik.",
    "overview": "Wyprawa z Marsa Alam łączy dwie twarze Kairu. Rano poznajesz Stary Kair - dzielnicę, w której obok siebie stoją kościół Wiszący, meczet Amr ibn al-As i synagoga Ben Ezra. Po południu jedziesz na płaskowyż w Gizie, do piramid i Sfinksa. Ponieważ Marsa Alam leży daleko na południu, dzień jest długi, a program - naprawdę pełny.",
    "heroImage": {
      "src": "/media/tours/marsa-alam-kair",
      "alt": "Stary Kair - zabytkowa dzielnica z kościołem Wiszącym",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/marsa-alam-kair",
        "alt": "Stary Kair - zabytkowa dzielnica z kościołem Wiszącym",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 80,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 80,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 40,
          "currency": "USD"
        },
        {
          "label": "Dziecko poniżej 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "We wtorki",
    "availabilityDays": [
      "Wtorek"
    ],
    "durationLabel": "cała doba, dzień intensywny",
    "pickupLabel": "ok. 23:00-24:00",
    "transport": "Transfer z Marsa Alam do Hurghady, dalej klimatyzowany autokar",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Stary Kair",
      "Piramidy w Gizie",
      "Sfinks",
      "Obiad"
    ],
    "itinerary": [
      {
        "time": "23:00-24:00",
        "title": "Odbiór z hotelu",
        "description": "Wyjazd z hotelu w Marsa Alam minibusem lub samochodem w kierunku Hurghady."
      },
      {
        "title": "Przesiadka w Hurghadzie",
        "description": "W Hurghadzie przesiadasz się do klimatyzowanego autokaru jadącego do Kairu."
      },
      {
        "title": "Stary Kair",
        "description": "Kościół Wiszący, kościół świętego Sergiusza, meczet Amr ibn al-As i synagoga Ben Ezra - miejsca trzech religii w jednej dzielnicy."
      },
      {
        "title": "Płaskowyż w Gizie",
        "description": "Trzy piramidy i Sfinks. Na terenie Gizy spędzasz ok. 1,5 godziny - czas na zdjęcia i spacer."
      },
      {
        "title": "Obiad",
        "description": "Ciepły posiłek w restauracji (bez napojów)."
      },
      {
        "title": "Opcjonalny rejs po Nilu",
        "description": "Dla chętnych krótki rejs po Nilu za dopłatą."
      },
      {
        "title": "Powrót do Marsa Alam",
        "description": "Droga powrotna autokarem do Hurghady i dalej transferem do hotelu w Marsa Alam."
      }
    ],
    "included": [
      "Transport zgodnie z programem",
      "Polskojęzyczny przewodnik",
      "Zwiedzanie Starego Kairu",
      "Giza i Sfinks",
      "Obiad (bez napojów)"
    ],
    "excluded": [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Opcjonalny przejazd na wielbłądzie lub koniu",
      "Opcjonalny rejs po Nilu"
    ],
    "transferSupplements": [
      {
        "zone": "Hotele oddalone: Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay",
        "amount": 10
      }
    ],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "ok. 10-12 USD od osoby, płatny na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport (wymagany na trasie do Kairu)",
      "Skromniejszy ubiór na wizyty w miejscach kultu",
      "Wygodne buty i nakrycie głowy",
      "Woda i przekąski na długą drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje"
    ],
    "requirements": [
      "To najdłuższa z naszych tras - warto odpocząć przed wyjazdem.",
      "Dostępność w danym tygodniu i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Ustalamy wtedy dostępność w danym tygodniu, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": true,
    "faqs": [
      {
        "question": "Czym różni się ta trasa od wyjazdu z Hurghady?",
        "answer": "Program z Marsa Alam dodatkowo obejmuje Stary Kair, a droga jest dłuższa, bo najpierw jedziesz do Hurghady na przesiadkę."
      },
      {
        "question": "Ile czasu spędzam przy piramidach?",
        "answer": "Na płaskowyżu w Gizie masz około 1,5 godziny - czas na zdjęcia, spacer i obejrzenie Sfinksa."
      },
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci 5-11 lat: 40 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 80 USD od osoby."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka z Marsa Alam do Kairu | Stary Kair i Piramidy",
      "description": "Wycieczka z Marsa Alam do Kairu: Stary Kair, piramidy w Gizie i Sfinks. Cena od 80 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-wielkie-muzeum-gem",
    "route": "/wycieczki-z-marsa-alam/kair-wielkie-muzeum-gem",
    "title": "Kair i Grand Egyptian Museum (GEM) z Marsa Alam",
    "h1": "Kair i Grand Egyptian Museum (GEM) z Marsa Alam - Piramidy w Gizie i Sfinks",
    "destination": "marsa-alam",
    "category": "kair",
    "departure": "Marsa Alam",
    "shortDescription": "Nocna, jednodniowa wycieczka z Marsa Alam do Kairu: Grand Egyptian Museum, piramidy w Gizie i Sfinks. Dojazd mikrobusem do Hurghady, a dalej klimatyzowanym autokarem.",
    "overview": "Nocna, jednodniowa wycieczka z Marsa Alam do Kairu, której głównym punktem jest Grand Egyptian Museum (GEM) - nowe muzeum egipskie w pobliżu płaskowyżu w Gizie. W programie są także piramidy w Gizie i Sfinks.\n\nWyjazd odbywa się nocą, około 21:00-23:00. Najpierw mikrobusem lub vanem docierasz z Marsa Alam do Hurghady, a następnie klimatyzowanym autokarem jedziesz do Kairu. Powrót planowany jest na wieczór.\n\nWycieczka dostępna jest we wtorki, czwartki i niedziele. W cenie są transport oraz obiad w restauracji.",
    "heroImage": {
      "src": "/media/tours/ma-kair-wielkie-muzeum-gem",
      "alt": "Kair i Grand Egyptian Museum (GEM) z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-kair-wielkie-muzeum-gem",
        "alt": "Kair i Grand Egyptian Museum (GEM) z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 130,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 130,
          "currency": "USD"
        }
      ],
      "note": "Ceny dla dzieci potwierdzamy na WhatsApp."
    },
    "availabilityLabel": "Wtorek, czwartek i niedziela",
    "availabilityDays": [
      "Wtorek",
      "Czwartek",
      "Niedziela"
    ],
    "durationLabel": "ok. 1 dzień (wyjazd nocny)",
    "pickupLabel": "wieczór/noc, ok. 21:00-23:00",
    "returnLabel": "wieczorem",
    "transport": "Mikrobus/van z Marsa Alam do Hurghady, dalej klimatyzowany autokar do Kairu",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Grand Egyptian Museum (GEM)",
      "Piramidy w Gizie",
      "Sfinks",
      "Klimatyzowany autokar",
      "Obiad w restauracji"
    ],
    "itinerary": [
      {
        "time": "ok. 21:00-23:00",
        "title": "Nocny odbiór z hotelu",
        "description": "Odbiór z hotelu w Marsa Alam i przejazd mikrobusem lub vanem do Hurghady."
      },
      {
        "title": "Przejazd do Kairu",
        "description": "Z Hurghady jedziesz do Kairu klimatyzowanym autokarem."
      },
      {
        "title": "Grand Egyptian Museum (GEM)",
        "description": "Zwiedzanie nowego Wielkiego Muzeum Egipskiego przy Gizie."
      },
      {
        "title": "Piramidy w Gizie i Sfinks",
        "description": "Wizyta przy piramidach w Gizie oraz Sfinksie."
      },
      {
        "title": "Obiad",
        "description": "Obiad w restauracji."
      },
      {
        "time": "wieczorem",
        "title": "Powrót do Marsa Alam",
        "description": "Powrót tą samą trasą, planowany na wieczór."
      }
    ],
    "included": [
      "Transport z Marsa Alam do Hurghady (mikrobus/van)",
      "Klimatyzowany autokar z Hurghady do Kairu",
      "Obiad w restauracji"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Paszport",
      "Wygodne buty",
      "Ciepłe okrycie na nocny przejazd",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Paszport na trasie do Kairu",
      "Wyjazd nocny - długa podróż w obie strony"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Dostępność, godzinę nocnego odbioru i szczegóły transportu potwierdzamy przed wyjazdem.",
    "featured": false,
    "faqs": [
      {
        "question": "O której godzinie jest odbiór z hotelu?",
        "answer": "Wyjazd jest nocny, zwykle około 21:00-23:00. Najpierw jedziesz mikrobusem do Hurghady, a dalej autokarem do Kairu; powrót planowany jest na wieczór."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "We wtorki, czwartki i niedziele. Dostępność potwierdzamy na WhatsApp."
      },
      {
        "question": "Czym jest Grand Egyptian Museum?",
        "answer": "To nowe muzeum egipskie w pobliżu piramid w Gizie. W programie zobaczysz też piramidy i Sfinksa."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "Transport z Marsa Alam do Kairu (mikrobus i klimatyzowany autokar) oraz obiad w restauracji."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Kair i GEM z Marsa Alam - Piramidy w Gizie",
      "description": "Wycieczka z Marsa Alam do Kairu: Grand Egyptian Museum, Piramidy w Gizie i Sfinks, obiad w cenie. Wt, czw i niedz. Cena 130 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kair-wielkie-muzeum-gem/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-samolotem",
    "route": "/wycieczki-z-marsa-alam/kair-samolotem",
    "title": "Wycieczka z Marsa Alam do Kairu samolotem",
    "h1": "Wycieczka z Marsa Alam do Kairu samolotem",
    "destination": "marsa-alam",
    "category": "kair",
    "departure": "Marsa Alam",
    "shortDescription": "Jednodniowa wycieczka z Marsa Alam do Kairu samolotem z polskim przewodnikiem: piramidy w Gizie, Sfinks i Muzeum Egipskie, z obiadem i biletami wstępu w cenie.",
    "overview": "Jednodniowa wyprawa z Marsa Alam do Kairu, w której najdłuższy odcinek pokonujesz samolotem - przelot z lotniska w Hurghadzie do stolicy trwa około 50 minut. Dzięki temu w jeden dzień zwiedzisz najważniejsze zabytki Kairu bez wielogodzinnej jazdy autokarem.\n\nW programie znajdują się piramidy w Gizie, Sfinks oraz Muzeum Egipskie, a zwiedzanie odbywa się z polskim przewodnikiem w Kairze.\n\nCena obejmuje bilety lotnicze, transport, bilety wstępu, obiad w restauracji orientalnej oraz opiekę przewodnika. Wyjazdy dostępne są codziennie.",
    "heroImage": {
      "src": "/media/tours/ma-kair-samolotem",
      "alt": "Wycieczka z Marsa Alam do Kairu samolotem - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-kair-samolotem",
        "alt": "Wycieczka z Marsa Alam do Kairu samolotem - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 345,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 345,
          "currency": "USD"
        }
      ],
      "note": "Ceny dla dzieci potwierdzamy na WhatsApp."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "1 dzień (przelot ok. 50 min)",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z hotelu, przelot z lotniska w Hurghadzie do Kairu, transport po Kairze",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Przelot do Kairu (ok. 50 min)",
      "Piramidy w Gizie i Sfinks",
      "Muzeum Egipskie",
      "Polski przewodnik w Kairze",
      "Obiad w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór i transfer na lotnisko",
        "description": "Odbiór z hotelu w Marsa Alam i przejazd na lotnisko w Hurghadzie."
      },
      {
        "title": "Przelot do Kairu",
        "description": "Lot z Hurghady do Kairu trwa około 50 minut."
      },
      {
        "title": "Muzeum Egipskie",
        "description": "Zwiedzanie Muzeum Egipskiego z polskim przewodnikiem."
      },
      {
        "title": "Piramidy w Gizie i Sfinks",
        "description": "Wizyta przy piramidach w Gizie oraz Sfinksie."
      },
      {
        "title": "Obiad",
        "description": "Obiad w restauracji orientalnej."
      },
      {
        "title": "Powrót",
        "description": "Przelot z Kairu i transfer do hotelu w Marsa Alam."
      }
    ],
    "included": [
      "Bilety lotnicze",
      "Transport",
      "Polski przewodnik w Kairze",
      "Bilety wstępu",
      "Obiad w restauracji orientalnej"
    ],
    "excluded": [
      "Napoje do obiadu",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Paszport",
      "Wygodne buty",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Krem z filtrem",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Paszport wymagany na przelot krajowy",
      "Rezerwacja z wyprzedzeniem"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Dostępność, godziny lotów i transfer z hotelu potwierdzamy przed wyjazdem.",
    "featured": false,
    "faqs": [
      {
        "question": "Jak długo trwa przelot do Kairu?",
        "answer": "Lot z lotniska w Hurghadzie do Kairu trwa około 50 minut. Cała wycieczka to jeden dzień."
      },
      {
        "question": "Co obejmuje cena?",
        "answer": "Bilety lotnicze, transport, bilety wstępu, obiad w restauracji orientalnej oraz polskiego przewodnika w Kairze. Cena wynosi 345 USD od osoby."
      },
      {
        "question": "Czy potrzebuję paszportu?",
        "answer": "Tak, na przelot krajowy i podróż warto mieć przy sobie paszport. Szczegóły potwierdzamy przy rezerwacji."
      },
      {
        "question": "Co zobaczę w Kairze?",
        "answer": "W programie są piramidy w Gizie, Sfinks oraz Muzeum Egipskie."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Kair samolotem z Marsa Alam - Piramidy i Muzeum",
      "description": "Jednodniowa wycieczka z Marsa Alam do Kairu samolotem: Piramidy w Gizie, Sfinks i Muzeum Egipskie, obiad i polski przewodnik. Cena 345 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kair-samolotem/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "prywatna-wycieczka-do-kairu",
    "route": "/wycieczki-z-marsa-alam/prywatna-wycieczka-do-kairu",
    "title": "Prywatna wycieczka do Kairu z Marsa Alam",
    "h1": "Prywatna wycieczka do Kairu z Marsa Alam",
    "destination": "marsa-alam",
    "category": "prywatne",
    "departure": "Marsa Alam",
    "shortDescription": "Prywatna, całodniowa wycieczka z Marsa Alam do Kairu z polskojęzycznym przewodnikiem: Muzeum Egipskie, piramidy w Gizie i Sfinks oraz obiad. Wyjazd nocą, wyłącznie dla Waszej grupy, we własnym tempie.",
    "overview": "Prywatna wycieczka z Marsa Alam do Kairu to całodniowa wyprawa do stolicy Egiptu, organizowana wyłącznie dla Waszej grupy i we własnym tempie. Wyjazd odbywa się nocą, zwykle około 23:00-24:00, a przejazd zapewnia klimatyzowany samochód osobowy lub mikrobus.\n\nW Kairze zwiedzicie Muzeum Egipskie, gdzie na zwiedzanie przeznaczamy około 1,5-2 godzin - zobaczycie mumie, sarkofagi, ceramikę, biżuterię oraz skarby faraona Tutanchamona. Następnie udacie się do Gizy, gdzie głównymi punktami są piramidy i Sfinks, a w programie jest także obiad.\n\nDla chętnych przewidziano czas na rejs po Nilu oraz wejście do wnętrza piramid (dodatkowo płatne), a na koniec około 40 minut na zakup pamiątek, perfum i suwenirów. Przez cały pobyt w Kairze towarzyszy Wam polskojęzyczny przewodnik.",
    "heroImage": {
      "src": "/media/tours/ma-prywatna-wycieczka-do-kairu",
      "alt": "Prywatna wycieczka do Kairu z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-prywatna-wycieczka-do-kairu",
        "alt": "Prywatna wycieczka do Kairu z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 160,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły (2 osoby)",
          "amount": 220,
          "currency": "USD"
        },
        {
          "label": "Dorosły (3-4 osoby)",
          "amount": 200,
          "currency": "USD"
        },
        {
          "label": "Dorosły (5-9 osób)",
          "amount": 160,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 110,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Cena za osobę zależy od liczebności grupy. Dla wybranych, odleglejszych hoteli obowiązuje dopłata za transfer +10 USD za osobę."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Całodniowa (wyjazd nocą)",
    "pickupLabel": "wyjazd nocą, ok. 23:00-24:00",
    "transport": "Prywatny transfer klimatyzowanym samochodem osobowym lub mikrobusem",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Muzeum Egipskie w Kairze",
      "Piramidy w Gizie i Sfinks",
      "Polskojęzyczny przewodnik",
      "Wycieczka prywatna",
      "Obiad w cenie"
    ],
    "itinerary": [
      {
        "time": "ok. 23:00-24:00",
        "title": "Wyjazd nocą",
        "description": "Odbiór z hotelu i przejazd klimatyzowanym autem lub mikrobusem do Kairu."
      },
      {
        "title": "Muzeum Egipskie",
        "description": "Około 1,5-2 godzin zwiedzania: mumie, sarkofagi, ceramika, biżuteria i skarby Tutanchamona."
      },
      {
        "title": "Giza",
        "description": "Piramidy i Sfinks - główny punkt wycieczki."
      },
      {
        "title": "Obiad",
        "description": "Posiłek w Kairze (bez napojów)."
      },
      {
        "title": "Czas dla chętnych",
        "description": "Opcjonalny rejs po Nilu oraz wejście do wnętrza piramid (dodatkowo płatne)."
      },
      {
        "title": "Zakupy",
        "description": "Około 40 minut na pamiątki, perfumy i suweniry."
      },
      {
        "title": "Powrót",
        "description": "Przejazd z powrotem do hotelu w Marsa Alam."
      }
    ],
    "included": [
      "Prywatny transfer klimatyzowanym autem lub mikrobusem",
      "Muzeum Egipskie",
      "Piramidy w Gizie i Sfinks",
      "Obiad (bez napojów)",
      "Polskojęzyczny przewodnik"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Rejs po Nilu (ok. 10-12 USD za osobę)",
      "Wejście do wnętrza piramid",
      "Napoje",
      "Przejażdżka na wielbłądzie, koniu lub bryczką pod piramidami"
    ],
    "transferSupplements": [
      {
        "zone": "Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay",
        "amount": 10
      }
    ],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "ok. 10-12 USD za osobę, płatny na miejscu"
      },
      {
        "label": "Wejście do wnętrza piramid",
        "note": "dodatkowo płatne na miejscu"
      },
      {
        "label": "Przejażdżka na wielbłądzie, koniu lub bryczką",
        "note": "dodatkowo płatna na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport lub dokument tożsamości",
      "Wygodne obuwie",
      "Nakrycie głowy i krem z filtrem",
      "Gotówka na bilety dodatkowe i pamiątki",
      "Coś ciepłego na nocny przejazd"
    ],
    "requirements": [
      "Zabierz paszport lub dokument tożsamości na trasę do Kairu",
      "Długi nocny przejazd w obie strony"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin, godzinę odbioru z hotelu i szczegóły programu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje prywatna wycieczka do Kairu z Marsa Alam?",
        "answer": "Cena za osobę zależy od liczby uczestników: 160 USD przy 5-9 osobach, 200 USD przy 3-4 osobach i 220 USD dla 2 osób. Dziecko 5-11 lat 110 USD, do 5 lat bezpłatnie."
      },
      {
        "question": "O której zaczyna się wycieczka?",
        "answer": "Wyjazd odbywa się nocą, zwykle około 23:00-24:00, w zależności od hotelu."
      },
      {
        "question": "Czy jest przewodnik mówiący po polsku?",
        "answer": "Tak, w Kairze przez cały czas towarzyszy Wam polskojęzyczny przewodnik."
      },
      {
        "question": "Czy w cenie jest rejs po Nilu?",
        "answer": "Nie, rejs po Nilu jest dodatkowo płatny (ok. 10-12 USD za osobę), podobnie jak wejście do wnętrza piramid."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Prywatna wycieczka do Kairu z Marsa Alam",
      "description": "Prywatna wycieczka z Marsa Alam do Kairu: Muzeum Egipskie, piramidy w Gizie i Sfinks, polskojęzyczny przewodnik i obiad. Od 160 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/prywatna-wycieczka-do-kairu/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "luksor-dolina-krolow",
    "route": "/wycieczki-z-marsa-alam/luksor-dolina-krolow",
    "title": "Wycieczka do Luksoru z Marsa Alam",
    "h1": "Wycieczka do Luksoru z Marsa Alam",
    "destination": "marsa-alam",
    "category": "luksor",
    "departure": "Marsa Alam",
    "shortDescription": "Całodniowa wycieczka z Marsa Alam do Luksoru z polskim przewodnikiem: Karnak, Dolina Królów, świątynia Hatszepsut i Kolosy Memnona, z obiadem w cenie.",
    "overview": "Całodniowa wyprawa z Marsa Alam do Luksoru, czyli na teren dawnych Teb. Zwiedzasz świątynię w Karnaku, Dolinę Królów, świątynię Hatszepsut oraz Kolosy Memnona.\n\nOdbiór z hotelu odbywa się nad ranem, między 2:00 a 4:00, zależnie od lokalizacji. Cała wycieczka trwa około 18-20 godzin, a trasę pokonujesz mikrobusem i autokarem z polskim przewodnikiem.\n\nW cenie są transport, bilety wstępu zgodnie z programem, opieka przewodnika i obiad. Wyjazd dochodzi do skutku przy minimum 5 chętnych osobach w danym dniu.",
    "heroImage": {
      "src": "/media/tours/ma-luksor-dolina-krolow",
      "alt": "Wycieczka do Luksoru z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-luksor-dolina-krolow",
        "alt": "Wycieczka do Luksoru z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 95,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 95,
          "currency": "USD"
        }
      ],
      "note": "Ceny dla dzieci potwierdzamy na WhatsApp."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 18-20 godzin",
    "pickupLabel": "nad ranem, ok. 2:00-4:00 (zależnie od hotelu)",
    "transport": "Mikrobus i autokar, transfer z hotelu i z powrotem",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Świątynia w Karnaku",
      "Dolina Królów",
      "Świątynia Hatszepsut",
      "Kolosy Memnona",
      "Polski przewodnik"
    ],
    "itinerary": [
      {
        "time": "2:00-4:00",
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu w Marsa Alam nad ranem, zależnie od lokalizacji."
      },
      {
        "title": "Przejazd do Luksoru",
        "description": "Trasę pokonujesz mikrobusem i autokarem z polskim przewodnikiem."
      },
      {
        "title": "Świątynia w Karnaku",
        "description": "Zwiedzanie rozległego kompleksu świątynnego w Karnaku."
      },
      {
        "title": "Dolina Królów",
        "description": "Wizyta w Dolinie Królów z grobowcami władców Nowego Państwa."
      },
      {
        "title": "Świątynia Hatszepsut",
        "description": "Zwiedzanie tarasowej świątyni królowej Hatszepsut."
      },
      {
        "title": "Kolosy Memnona",
        "description": "Postój przy monumentalnych Kolosach Memnona."
      },
      {
        "title": "Obiad i powrót",
        "description": "Obiad w trakcie programu, a następnie powrót do Marsa Alam."
      }
    ],
    "included": [
      "Transport (mikrobus i autokar)",
      "Polski przewodnik",
      "Bilety wstępu zgodnie z programem",
      "Obiad"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Paszport",
      "Wygodne buty",
      "Woda i nakrycie głowy",
      "Krem z filtrem",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Paszport zalecany na trasie do Luksoru",
      "Wyjazd dochodzi do skutku przy minimum 5 osobach",
      "Wczesna pobudka - odbiór 2:00-4:00"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Realizacja zależy od zebrania minimum 5 osób; dostępność i godzinę odbioru potwierdzamy przed wyjazdem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa wycieczka do Luksoru?",
        "answer": "Około 18-20 godzin łącznie, z dojazdem mikrobusem i autokarem. Odbiór z hotelu jest nad ranem, między 2:00 a 4:00."
      },
      {
        "question": "Co zwiedzę w Luksorze?",
        "answer": "Świątynię w Karnaku, Dolinę Królów, świątynię Hatszepsut i Kolosy Memnona."
      },
      {
        "question": "Czy wycieczka zawsze się odbywa?",
        "answer": "Wyjazd dochodzi do skutku przy minimum 5 chętnych osobach w danym dniu. Liczbę uczestników potwierdzamy przed wyjazdem."
      },
      {
        "question": "Co obejmuje cena 95 USD?",
        "answer": "Transport, polskiego przewodnika, bilety wstępu zgodnie z programem oraz obiad."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka do Luksoru z Marsa Alam - Dolina Królów",
      "description": "Całodniowa wycieczka do Luksoru z Marsa Alam: Karnak, Dolina Królów, Hatszepsut i Kolosy Memnona, polski przewodnik i obiad. Cena 95 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/luksor-dolina-krolow/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "prywatna-wycieczka-luksor-dendera",
    "route": "/wycieczki-z-marsa-alam/prywatna-wycieczka-luksor-dendera",
    "title": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery",
    "h1": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery",
    "destination": "marsa-alam",
    "category": "prywatne",
    "departure": "Marsa Alam",
    "shortDescription": "Prywatna, całodniowa wycieczka z Marsa Alam do Luksoru i Dendery z polskojęzycznym przewodnikiem: świątynia Hathor w Denderze oraz Dolina Królów, Karnak, świątynia Hatszepsut i Kolosy Memnona w Luksorze. Wyłącznie dla Waszej grupy.",
    "overview": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery łączy dwa wyjątkowe miejsca starożytnego Egiptu i odbywa się wyłącznie dla Waszej grupy. Wyjazd następuje bardzo wcześnie rano, około 4:00, a dokładna godzina zależy od położenia hotelu.\n\nZaczynamy od Dendery, gdzie zwiedzicie świątynię bogini Hathor - jedną z najlepiej zachowanych świątyń w Egipcie, ze słynnymi kolumnami zwieńczonymi jej głową. Następnie przejeżdżamy do Luksoru, dawnej stolicy Egiptu, by zobaczyć Dolinę Królów, kompleks w Karnaku, świątynię Hatszepsut oraz Kolosy Memnona. W Luksorze czeka na Was obiad w lokalnej restauracji.\n\nDla chętnych przewidziany jest czas na rejs na Wyspę Bananową oraz wejście do grobowca Tutanchamona (dodatkowo płatne). Przez całą trasę towarzyszy Wam polskojęzyczny przewodnik.",
    "heroImage": {
      "src": "/media/tours/ma-prywatna-wycieczka-luksor-dendera",
      "alt": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-prywatna-wycieczka-luksor-dendera",
        "alt": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 220,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły (2 osoby)",
          "amount": 245,
          "currency": "USD"
        },
        {
          "label": "Dorosły (3 osoby)",
          "amount": 235,
          "currency": "USD"
        },
        {
          "label": "Dorosły (4 osoby)",
          "amount": 225,
          "currency": "USD"
        },
        {
          "label": "Dorosły (5-8 osób)",
          "amount": 220,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 125,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Cena za osobę zależy od liczebności grupy. Dla wybranych, odleglejszych hoteli obowiązuje dopłata za transfer +10 USD za osobę."
    },
    "availabilityLabel": "Poniedziałek, środa, piątek, sobota i niedziela",
    "availabilityDays": [
      "Poniedziałek",
      "Środa",
      "Piątek",
      "Sobota",
      "Niedziela"
    ],
    "durationLabel": "Całodniowa (wyjazd wczesnym rankiem)",
    "pickupLabel": "wczesny ranek, ok. 4:00",
    "transport": "Prywatny transfer klimatyzowanym autokarem lub mikrobusem",
    "guide": {
      "label": "Polski",
      "polishConfirmed": true
    },
    "highlights": [
      "Świątynia Hathor w Denderze",
      "Dolina Królów",
      "Karnak i świątynia Hatszepsut",
      "Kolosy Memnona",
      "Polskojęzyczny przewodnik"
    ],
    "itinerary": [
      {
        "time": "ok. 4:00",
        "title": "Wyjazd",
        "description": "Odbiór z hotelu i przejazd klimatyzowanym autokarem lub mikrobusem w kierunku Dendery."
      },
      {
        "title": "Dendera",
        "description": "Zwiedzanie świątyni bogini Hathor, jednej z najlepiej zachowanych w Egipcie."
      },
      {
        "title": "Dolina Królów",
        "description": "Skalne grobowce faraonów w Luksorze."
      },
      {
        "title": "Karnak",
        "description": "Rozległy kompleks świątynny w Luksorze."
      },
      {
        "title": "Świątynia Hatszepsut",
        "description": "Tarasowa świątynia grobowa w Deir el-Bahari."
      },
      {
        "title": "Kolosy Memnona",
        "description": "Dwa monumentalne posągi strzegące dawnej świątyni."
      },
      {
        "title": "Obiad i czas dla chętnych",
        "description": "Obiad w lokalnej restauracji w Luksorze; opcjonalnie rejs na Wyspę Bananową i wejście do grobowca Tutanchamona (dodatkowo płatne)."
      },
      {
        "title": "Powrót",
        "description": "Przejazd z powrotem do hotelu w Marsa Alam."
      }
    ],
    "included": [
      "Prywatny transfer klimatyzowanym autokarem lub mikrobusem",
      "Obiad",
      "Zwiedzanie: świątynia Hathor w Denderze, Dolina Królów, Karnak, świątynia Hatszepsut, Kolosy Memnona",
      "Polskojęzyczny przewodnik"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Wejście do grobowca Tutanchamona i Ramzesa III",
      "Napoje",
      "Rejs na Wyspę Bananową"
    ],
    "transferSupplements": [
      {
        "zone": "Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay",
        "amount": 10
      }
    ],
    "extras": [
      {
        "label": "Rejs na Wyspę Bananową",
        "note": "dodatkowo płatny na miejscu"
      },
      {
        "label": "Wejście do grobowca Tutanchamona i Ramzesa III",
        "note": "dodatkowo płatne na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport lub dokument tożsamości",
      "Wygodne obuwie",
      "Nakrycie głowy i woda",
      "Krem z filtrem",
      "Gotówka na bilety dodatkowe"
    ],
    "requirements": [
      "Zabierz paszport lub dokument tożsamości na trasę do Luksoru",
      "Wczesna pobudka - wyjazd około 4:00",
      "Dużo chodzenia w słońcu"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Dostępny termin, godzinę odbioru z hotelu i szczegóły programu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje prywatna wycieczka z Marsa Alam do Luksoru i Dendery?",
        "answer": "Cena za osobę zależy od liczby uczestników: 220 USD przy 5-8 osobach, 225 USD przy 4 osobach, 235 USD przy 3 osobach i 245 USD dla 2 osób. Dziecko 5-11 lat 125 USD, do 5 lat bezpłatnie."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "W poniedziałki, środy, piątki, soboty i niedziele."
      },
      {
        "question": "O której jest wyjazd?",
        "answer": "Bardzo wcześnie rano, około 4:00; dokładna godzina zależy od położenia hotelu."
      },
      {
        "question": "Co obejmuje zwiedzanie?",
        "answer": "Świątynię Hathor w Denderze oraz w Luksorze Dolinę Królów, Karnak, świątynię Hatszepsut i Kolosy Memnona, z obiadem i polskojęzycznym przewodnikiem."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Prywatna wycieczka Luksor i Dendera z Marsa Alam",
      "description": "Prywatna wycieczka z Marsa Alam do Luksoru i Dendery: Dolina Królów, Karnak, świątynia Hatszepsut i Hathor. Polski przewodnik, od 220 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/prywatna-wycieczka-luksor-dendera/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "sataya-dom-delfinow",
    "route": "/wycieczki-z-marsa-alam/sataya-dom-delfinow",
    "title": "Sataya z Marsa Alam - dom delfinów",
    "h1": "Wycieczka z Marsa Alam do domu delfinów Sataya",
    "destination": "marsa-alam",
    "category": "snorkeling-delfiny",
    "departure": "Marsa Alam",
    "shortDescription": "Rejs łodzią z Marsa Alam do rafy Sataya Dolphin Reef z możliwością pływania z delfinami i snorkelingiem przy rafach koralowych. Lunch na łodzi i transfer w cenie. Dla miłośników delfinów i podwodnego świata.",
    "overview": "Sataya Dolphin Reef to rozległa rafa koralowa na południe od Marsa Alam, znana jako dom delfinów. Rejs łodzią daje możliwość pływania z delfinami w rejonie rafy oraz snorkelingu przy kolorowych koralowcach.\n\nW cenie znajduje się transfer, rejs łodzią, lunch na łodzi oraz organizacja wycieczki. To propozycja dla osób, które chcą spędzić dzień na morzu i spotkać delfiny w ich naturalnym środowisku.\n\nWycieczka realizowana jest w poniedziałki, środy i piątki.",
    "heroImage": {
      "src": "/media/tours/ma-sataya-dom-delfinow",
      "alt": "Sataya z Marsa Alam - dom delfinów - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-sataya-dom-delfinow",
        "alt": "Sataya z Marsa Alam - dom delfinów - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 65,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 65,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Poniedziałki, środy i piątki",
    "availabilityDays": [
      "Poniedziałek",
      "Środa",
      "Piątek"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu; rejs łodzią",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Sataya Dolphin Reef",
      "Pływanie z delfinami",
      "Snorkeling na rafach",
      "Lunch na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Marsa Alam do portu."
      },
      {
        "title": "Rejs do rafy",
        "description": "Rejs łodzią na rafę Sataya Dolphin Reef."
      },
      {
        "title": "Pływanie z delfinami",
        "description": "Możliwość pływania z delfinami w rejonie rafy."
      },
      {
        "title": "Snorkeling",
        "description": "Snorkeling przy kolorowych rafach koralowych."
      },
      {
        "title": "Lunch na łodzi",
        "description": "Lunch na pokładzie i czas na odpoczynek."
      },
      {
        "title": "Powrót",
        "description": "Rejs powrotny i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs łodzią",
      "Lunch na łodzi",
      "Organizacja wycieczki"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Gotówka na dodatkowe wydatki",
      "Aparat wodoodporny (opcjonalnie)"
    ],
    "requirements": [
      "Zalecane dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Ponieważ jest to rejs morski, w razie złej pogody termin może zostać przełożony; zmianę lub odwołanie zgłoś z wyprzedzeniem.",
    "featured": true,
    "faqs": [
      {
        "question": "Czy będzie można pływać z delfinami?",
        "answer": "Rejs prowadzi na rafę Sataya, gdzie istnieje możliwość pływania z delfinami; spotkanie z nimi zależy jednak od danego dnia i nie jest gwarantowane."
      },
      {
        "question": "Czy lunch jest w cenie?",
        "answer": "Tak, w cenie znajduje się lunch na łodzi, a także transfer i rejs."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "W poniedziałki, środy i piątki."
      },
      {
        "question": "Ile kosztuje udział?",
        "answer": "Cena wynosi 65 USD od osoby dorosłej."
      }
    ],
    "seo": {
      "title": "Sataya z Marsa Alam - pływanie z delfinami",
      "description": "Rejs z Marsa Alam do rafy Sataya Dolphin Reef: pływanie z delfinami, snorkeling i lunch na łodzi. Cena od 65 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/sataya-dom-delfinow/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "samadai-dom-delfinow",
    "route": "/wycieczki-z-marsa-alam/samadai-dom-delfinow",
    "title": "Sha'ab Samadai z Marsa Alam - dom delfinów",
    "h1": "Wycieczka z Marsa Alam do domu delfinów Sha'ab Samadai",
    "destination": "marsa-alam",
    "category": "snorkeling-delfiny",
    "departure": "Marsa Alam",
    "shortDescription": "Rejs statkiem z Marsa Alam do rafy Sha'ab Samadai, znanej jako dom delfinów, z dwoma postojami na snorkeling. Lunch, napoje, sprzęt i transfer w cenie. Dla osób, które chcą zobaczyć delfiny i kolorowe rafy.",
    "overview": "Sha'ab Samadai to podkowiasta rafa koralowa w okolicach Marsa Alam, nazywana domem delfinów ze względu na stada, które przebywają w tym rejonie. Rejs statkiem obejmuje dwa postoje na snorkeling oraz możliwość obserwacji delfinów w ich naturalnym środowisku.\n\nW cenie znajduje się transfer, rejs statkiem, dwa postoje na snorkeling, sprzęt, lunch oraz ciepłe i zimne napoje. To całodniowa forma wypoczynku łącząca pływanie nad rafami z szansą spotkania delfinów.\n\nWycieczka realizowana jest w poniedziałki, środy i piątki. Dzieci w wieku 5-11 lat płacą 34 USD, a dzieci do 5 lat uczestniczą bezpłatnie.",
    "heroImage": {
      "src": "/media/tours/ma-samadai-dom-delfinow",
      "alt": "Sha'ab Samadai z Marsa Alam - dom delfinów - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-samadai-dom-delfinow",
        "alt": "Sha'ab Samadai z Marsa Alam - dom delfinów - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 65,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 65,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 34,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Poniedziałki, środy i piątki",
    "availabilityDays": [
      "Poniedziałek",
      "Środa",
      "Piątek"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu; rejs statkiem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rafa Sha'ab Samadai",
      "Delfiny w naturze",
      "2 postoje na snorkeling",
      "Lunch i napoje"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Marsa Alam do portu."
      },
      {
        "title": "Rejs do rafy",
        "description": "Rejs statkiem do rafy Sha'ab Samadai, znanej jako dom delfinów."
      },
      {
        "title": "Pierwszy postój na snorkeling",
        "description": "Pierwszy postój z pływaniem nad koralowcami."
      },
      {
        "title": "Obserwacja delfinów",
        "description": "Możliwość zobaczenia delfinów w ich naturalnym środowisku."
      },
      {
        "title": "Drugi postój i lunch",
        "description": "Drugi postój na snorkeling oraz lunch na statku."
      },
      {
        "title": "Powrót",
        "description": "Rejs powrotny i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs statkiem",
      "Dwa postoje na snorkeling",
      "Sprzęt do snorkelingu",
      "Lunch",
      "Ciepłe i zimne napoje"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Gotówka na dodatkowe wydatki",
      "Aparat wodoodporny (opcjonalnie)"
    ],
    "requirements": [
      "Zalecane dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Ponieważ jest to rejs morski, w razie złej pogody termin może zostać przełożony; zmianę lub odwołanie zgłoś z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 34 USD, a dzieci do 5 lat uczestniczą bezpłatnie."
      },
      {
        "question": "Czy na pewno zobaczę delfiny?",
        "answer": "Sha'ab Samadai to rejon, w którym często przebywają delfiny, jednak spotkanie z nimi zależy od danego dnia i nie jest gwarantowane."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transfer, rejs statkiem, dwa postoje na snorkeling, sprzęt, lunch oraz ciepłe i zimne napoje."
      },
      {
        "question": "W jakie dni odbywa się rejs?",
        "answer": "W poniedziałki, środy i piątki."
      }
    ],
    "seo": {
      "title": "Sha'ab Samadai z Marsa Alam - dom delfinów",
      "description": "Rejs z Marsa Alam do rafy Sha'ab Samadai: delfiny, 2 postoje na snorkeling, lunch i napoje w cenie. Cena od 65 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/samadai-dom-delfinow/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "abu-dabbab",
    "route": "/wycieczki-z-marsa-alam/abu-dabbab",
    "title": "Abu Dabbab z Marsa Alam - żółwie i snorkeling",
    "h1": "Wycieczka z Marsa Alam do zatoki Abu Dabbab",
    "destination": "marsa-alam",
    "category": "snorkeling-delfiny",
    "departure": "Marsa Alam",
    "shortDescription": "Wycieczka z Marsa Alam nad zatokę Abu Dabbab - plażę znaną z żółwi morskich. W cenie transfer z hotelu, wstęp na plażę oraz sprzęt do snorkelingu. Propozycja dla rodzin i miłośników podwodnego świata.",
    "overview": "Abu Dabbab to zatoka położona niedaleko Marsa Alam, słynąca z żółwi morskich, które można spotkać podczas snorkelingu tuż przy brzegu. Wycieczka obejmuje transfer z hotelu, wejście na plażę oraz komplet sprzętu do snorkelingu: maskę, rurkę i płetwy.\n\nCzas na miejscu spędzisz nad wodą i w wodzie - płynąc nad rafami koralowymi, masz szansę zobaczyć żółwie w ich naturalnym środowisku. To spokojniejsza forma wypoczynku niż całodniowe rejsy.\n\nWycieczka realizowana jest w poniedziałki i piątki. Dla grup liczących powyżej 4 osób może zostać zorganizowana także w inne dni.",
    "heroImage": {
      "src": "/media/tours/ma-abu-dabbab",
      "alt": "Abu Dabbab z Marsa Alam - żółwie i snorkeling - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-abu-dabbab",
        "alt": "Abu Dabbab z Marsa Alam - żółwie i snorkeling - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 60,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 60,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Dla grup powyżej 4 osób wycieczka może być organizowana także w inne dni."
    },
    "availabilityLabel": "Poniedziałki i piątki",
    "availabilityDays": [
      "Poniedziałek",
      "Piątek"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Zatoka Abu Dabbab",
      "Żółwie morskie",
      "Snorkeling na rafach",
      "Sprzęt w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Marsa Alam nad zatokę Abu Dabbab."
      },
      {
        "title": "Wejście na plażę",
        "description": "Wejście na plażę Abu Dabbab i odbiór sprzętu do snorkelingu."
      },
      {
        "title": "Snorkeling",
        "description": "Pływanie nad rafami koralowymi z szansą wypatrzenia żółwi morskich."
      },
      {
        "title": "Czas na plaży",
        "description": "Odpoczynek na plaży i kąpiel w zatoce."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer powrotny do hotelu po zakończeniu wycieczki."
      }
    ],
    "included": [
      "Transfer z hotelu",
      "Wstęp na plażę Abu Dabbab",
      "Sprzęt do snorkelingu: maska, rurka i płetwy"
    ],
    "excluded": [
      "Napoje i posiłki",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Gotówka na dodatkowe wydatki",
      "Własna maska, jeśli wolisz (opcjonalnie)"
    ],
    "requirements": [
      "Zalecane dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Termin możesz bezpłatnie zmienić lub odwołać z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 30 USD, a dzieci do 5 lat wchodzą bezpłatnie."
      },
      {
        "question": "Czy zobaczę żółwie?",
        "answer": "Abu Dabbab słynie z żółwi morskich, które często można spotkać podczas snorkelingu, choć ich obecność zależy od danego dnia."
      },
      {
        "question": "Czy sprzęt do snorkelingu jest w cenie?",
        "answer": "Tak, w cenie znajduje się maska, rurka i płetwy oraz wstęp na plażę i transfer z hotelu."
      },
      {
        "question": "W jakie dni odbywa się wycieczka?",
        "answer": "W poniedziałki i piątki, a dla grup powyżej 4 osób także w inne dni."
      }
    ],
    "seo": {
      "title": "Abu Dabbab z Marsa Alam - żółwie i snorkeling",
      "description": "Wycieczka z Marsa Alam nad zatokę Abu Dabbab: żółwie morskie, snorkeling na rafach, sprzęt i transfer w cenie. Cena od 60 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/abu-dabbab/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "marsa-mubarak-snorkeling",
    "route": "/wycieczki-z-marsa-alam/marsa-mubarak-snorkeling",
    "title": "Marsa Mubarak z Marsa Alam - snorkeling",
    "h1": "Wycieczka z Marsa Alam - snorkeling na Marsa Mubarak",
    "destination": "marsa-alam",
    "category": "snorkeling-delfiny",
    "departure": "Marsa Alam",
    "shortDescription": "Całodniowy rejs statkiem z Marsa Alam na zatokę Marsa Mubarak z dwoma postojami na snorkeling. Duża szansa na spotkanie żółwi morskich i diugoni. Lunch, napoje i sprzęt w cenie - dobra opcja na cały dzień na morzu.",
    "overview": "Marsa Mubarak to zatoka w okolicach Marsa Alam ceniona przez snorkelistów za kolorowe rafy koralowe oraz dużą szansę spotkania żółwi morskich i diugoni. Całodniowy rejs obejmuje dwa postoje na snorkeling oraz czas na relaks na pokładzie.\n\nW cenie znajduje się transfer klimatyzowanym busem z hotelu w Marsa Alam do portu i z powrotem, rejs statkiem, sprzęt do snorkelingu, lunch na statku oraz ciepłe i zimne napoje. Wliczony jest także bilet do Narodowego Parku Morza Czerwonego.\n\nWycieczka odbywa się codziennie, przy czym jej realizacja zależy od warunków pogodowych na morzu. Dla hoteli położonych na południe od Marsa Alam obowiązuje dopłata 5 USD od osoby.",
    "heroImage": {
      "src": "/media/tours/ma-marsa-mubarak-snorkeling",
      "alt": "Marsa Mubarak z Marsa Alam - snorkeling - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-marsa-mubarak-snorkeling",
        "alt": "Marsa Mubarak z Marsa Alam - snorkeling - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 53,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 53,
          "currency": "USD"
        }
      ],
      "note": "Dopłata 5 USD/os dla hoteli położonych na południe od Marsa Alam."
    },
    "availabilityLabel": "Codziennie (zależnie od pogody)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Całodniowa wycieczka morska",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer klimatyzowanym busem z/do hotelu; rejs statkiem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Zatoka Marsa Mubarak",
      "Żółwie i diugonie",
      "2 postoje na snorkeling",
      "Lunch i napoje",
      "Rejs całodniowy"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer klimatyzowanym busem z hotelu w Marsa Alam do portu."
      },
      {
        "title": "Rejs na zatokę",
        "description": "Rejs statkiem na zatokę Marsa Mubarak."
      },
      {
        "title": "Pierwszy postój na snorkeling",
        "description": "Pierwszy postój z pływaniem nad rafą koralową."
      },
      {
        "title": "Drugi postój na snorkeling",
        "description": "Kolejny postój z szansą spotkania żółwi morskich i diugoni."
      },
      {
        "title": "Lunch i relaks",
        "description": "Lunch na pokładzie i czas na odpoczynek."
      },
      {
        "title": "Powrót",
        "description": "Rejs powrotny do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer klimatyzowanym busem z/do hotelu w Marsa Alam",
      "Rejs statkiem",
      "Sprzęt do snorkelingu",
      "Lunch na statku",
      "Ciepłe i zimne napoje",
      "Bilet do Narodowego Parku Morza Czerwonego"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [
      {
        "zone": "hotele na południe od Marsa Alam",
        "amount": 5
      }
    ],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne i nakrycie głowy",
      "Gotówka na dodatkowe wydatki",
      "Aparat wodoodporny (opcjonalnie)"
    ],
    "requirements": [
      "Zalecane dla osób umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Ponieważ jest to rejs morski, w razie złej pogody termin może zostać przełożony; zmianę lub odwołanie zgłoś z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Jak długo trwa wycieczka?",
        "answer": "To całodniowa wycieczka morska z rejsem statkiem i dwoma postojami na snorkeling."
      },
      {
        "question": "Czy lunch i napoje są w cenie?",
        "answer": "Tak, w cenie znajduje się lunch na statku oraz ciepłe i zimne napoje, a także sprzęt do snorkelingu i bilet do Narodowego Parku Morza Czerwonego."
      },
      {
        "question": "Czy jest dopłata za odbiór z hotelu?",
        "answer": "Dla hoteli położonych na południe od Marsa Alam obowiązuje dopłata 5 USD od osoby."
      },
      {
        "question": "Co można zobaczyć pod wodą?",
        "answer": "Rafy koralowe oraz - z dużą szansą - żółwie morskie i diugonie."
      }
    ],
    "seo": {
      "title": "Marsa Mubarak z Marsa Alam - snorkeling z żółwiami",
      "description": "Całodniowy rejs z Marsa Alam na Marsa Mubarak: 2 postoje na snorkeling, żółwie i diugonie, lunch i napoje w cenie. Cena 53 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/marsa-mubarak-snorkeling/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspy-hamata",
    "route": "/wycieczki-z-marsa-alam/wyspy-hamata",
    "title": "Wycieczka z Marsa Alam na wyspy Hamata",
    "h1": "Wycieczka z Marsa Alam na wyspy Hamata",
    "destination": "marsa-alam",
    "category": "rejsy-wyspy",
    "departure": "Marsa Alam",
    "shortDescription": "Całodniowy rejs z Marsa Alam na wyspy Hamata, nazywane Egipskimi Malediwami: snorkeling przy rafach, plażowanie i relaks nad Morzem Czerwonym. Transfer, lunch i napoje w cenie.",
    "overview": "Wycieczka z Marsa Alam na wyspy Hamata, nazywane Egipskimi Malediwami, to całodniowy rejs połączony ze snorkelingiem i plażowaniem nad Morzem Czerwonym. To propozycja dla osób, które chcą spędzić dzień na wodzie i przy rafach koralowych.\n\nW programie znajduje się rejs na wyspy Hamata, snorkeling przy rafach oraz czas na relaks i plażowanie. Na łodzi podawany jest lunch, a do tego napoje.\n\nCena obejmuje transfer z hotelu, rejs, posiłek oraz napoje. Wycieczka odbywa się w niedziele, wtorki i czwartki.",
    "heroImage": {
      "src": "/media/tours/ma-wyspy-hamata",
      "alt": "Wycieczka z Marsa Alam na wyspy Hamata - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-wyspy-hamata",
        "alt": "Wycieczka z Marsa Alam na wyspy Hamata - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 60,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 60,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Niedziela, wtorek i czwartek",
    "availabilityDays": [
      "Wtorek",
      "Czwartek",
      "Niedziela"
    ],
    "durationLabel": "Całodniowa",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wyspy Hamata - Egipskie Malediwy",
      "Snorkeling przy rafach",
      "Plażowanie i relaks",
      "Lunch i napoje w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer do przystani, z której wypływa łódź."
      },
      {
        "title": "Rejs na wyspy Hamata",
        "description": "Wypłynięcie w kierunku wysp zwanych Egipskimi Malediwami."
      },
      {
        "title": "Snorkeling",
        "description": "Pływanie i obserwacja podwodnego świata przy rafach koralowych."
      },
      {
        "title": "Plażowanie",
        "description": "Relaks nad Morzem Czerwonym."
      },
      {
        "title": "Lunch na łodzi",
        "description": "Posiłek podawany na pokładzie wraz z napojami."
      },
      {
        "title": "Powrót",
        "description": "Transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs",
      "Lunch na łodzi",
      "Napoje",
      "Organizacja wycieczki"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne",
      "Zdjęcia robione przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem",
      "Nakrycie głowy",
      "Obuwie do wody"
    ],
    "requirements": [
      "Snorkeling zalecany dla umiejących pływać"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin, godzinę odbioru z hotelu i szczegóły rejsu ustalamy indywidualnie.",
    "featured": true,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka na wyspy Hamata?",
        "answer": "Cena wynosi 60 USD za osobę; w cenie transfer z hotelu, rejs, lunch i napoje."
      },
      {
        "question": "W jakie dni odbywa się rejs?",
        "answer": "W niedziele, wtorki i czwartki."
      },
      {
        "question": "Co robimy na wyspach Hamata?",
        "answer": "Plażowanie, snorkeling przy rafach koralowych i relaks nad Morzem Czerwonym."
      },
      {
        "question": "Czy w cenie jest posiłek?",
        "answer": "Tak, lunch podawany na łodzi oraz napoje są wliczone w cenę."
      }
    ],
    "seo": {
      "title": "Wyspy Hamata z Marsa Alam - Egipskie Malediwy",
      "description": "Rejs z Marsa Alam na wyspy Hamata, zwane Egipskimi Malediwami: snorkeling przy rafach, plażowanie, lunch i transfer w cenie. Od 60 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/wyspy-hamata/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "rejs-nefertari",
    "route": "/wycieczki-z-marsa-alam/rejs-nefertari",
    "title": "Rejs łodzią Nefertari z Marsa Alam",
    "h1": "Rejs łodzią Nefertari z Marsa Alam",
    "destination": "marsa-alam",
    "category": "rejsy-wyspy",
    "departure": "Marsa Alam",
    "shortDescription": "Rejs komfortową łodzią Nefertari z Marsa Alam z podwodnym pokładem: snorkeling w Marsa Mubarak, postój w Port Ghalib oraz lunch lub kolacja. Transfer z hotelu i napoje bezalkoholowe w cenie.",
    "overview": "Rejs łodzią Nefertari z Marsa Alam to wyprawa na wodę na komfortowej łodzi z podwodnym pokładem, dzięki któremu rafę można podziwiać także bez wchodzenia do wody. Rejs łączy pływanie, snorkeling i czas na relaks.\n\nW programie znajduje się snorkeling w rejonie Marsa Mubarak, postój w Port Ghalib oraz czas wolny. Na pokładzie podawany jest lunch lub kolacja, a do tego napoje bezalkoholowe.\n\nCena obejmuje transfer z hotelu, rejs łodzią Nefertari, posiłek oraz napoje bezalkoholowe. Wycieczka dostępna jest codziennie.",
    "heroImage": {
      "src": "/media/tours/ma-rejs-nefertari",
      "alt": "Rejs łodzią Nefertari z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-rejs-nefertari",
        "alt": "Rejs łodzią Nefertari z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 87,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 87,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 50,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią Nefertari, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Łódź Nefertari z podwodnym pokładem",
      "Snorkeling w Marsa Mubarak",
      "Port Ghalib",
      "Lunch lub kolacja w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer do przystani, z której wypływa łódź."
      },
      {
        "title": "Rejs łodzią Nefertari",
        "description": "Wypłynięcie komfortową łodzią z podwodnym pokładem."
      },
      {
        "title": "Marsa Mubarak",
        "description": "Snorkeling przy rafach koralowych."
      },
      {
        "title": "Podwodny pokład",
        "description": "Obserwacja podwodnego świata bez wchodzenia do wody."
      },
      {
        "title": "Port Ghalib",
        "description": "Postój i czas wolny."
      },
      {
        "title": "Posiłek na pokładzie",
        "description": "Lunch lub kolacja wraz z napojami bezalkoholowymi."
      },
      {
        "title": "Powrót",
        "description": "Transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs łodzią Nefertari",
      "Lunch lub kolacja",
      "Napoje bezalkoholowe"
    ],
    "excluded": [
      "Napoje alkoholowe",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem",
      "Okulary i fajka do snorkelingu, jeśli własne",
      "Gotówka na napiwki"
    ],
    "requirements": [
      "Podwodny pokład pozwala oglądać rafę także osobom, które nie pływają"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin, godzinę odbioru z hotelu i szczegóły rejsu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje rejs łodzią Nefertari z Marsa Alam?",
        "answer": "Dorosły 87 USD, dziecko 5-11 lat 50 USD, dziecko do 5 lat bezpłatnie."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "Transfer z hotelu, rejs łodzią Nefertari, lunch lub kolacja oraz napoje bezalkoholowe."
      },
      {
        "question": "Czy trzeba umieć pływać?",
        "answer": "Nie trzeba - podwodny świat można oglądać z podwodnego pokładu, a snorkeling jest opcjonalny."
      },
      {
        "question": "Gdzie odbywa się snorkeling?",
        "answer": "W rejonie Marsa Mubarak, przy rafach koralowych."
      }
    ],
    "seo": {
      "title": "Rejs łodzią Nefertari z Marsa Alam",
      "description": "Rejs łodzią Nefertari z Marsa Alam: podwodny pokład, snorkeling w Marsa Mubarak, Port Ghalib oraz lunch lub kolacja. Od 87 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/rejs-nefertari/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "lodz-seascope",
    "route": "/wycieczki-z-marsa-alam/lodz-seascope",
    "title": "Wycieczka łodzią Seascope z Marsa Alam",
    "h1": "Wycieczka łodzią Seascope z Marsa Alam",
    "destination": "marsa-alam",
    "category": "atrakcje",
    "departure": "Marsa Alam",
    "shortDescription": "Rejs półzanurzalną łodzią Seascope z Marsa Alam z podwodnym pokładem i panoramicznymi oknami. Dobra opcja dla rodzin i osób, które chcą zobaczyć rafy Morza Czerwonego bez nurkowania.",
    "overview": "Seascope to półzanurzalna łódź z przeszklonym pokładem położonym około 3 metrów pod powierzchnią wody. Podczas rejsu z Marsa Alam obserwujesz rafy koralowe i życie Morza Czerwonego zza panoramicznych okien, bez zakładania sprzętu i wchodzenia do wody.\n\nRejs trwa około dwóch godzin i odbywa się codziennie. Cena obejmuje transfer z hotelu i z powrotem oraz miejsce przy oknie na podwodnym pokładzie, dzięki czemu wyprawa sprawdzi się także dla dzieci i osób, które nie nurkują.",
    "heroImage": {
      "src": "/media/tours/ma-lodz-seascope",
      "alt": "Wycieczka łodzią Seascope z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-lodz-seascope",
        "alt": "Wycieczka łodzią Seascope z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 62,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 62,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 32,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true,
      "note": "Dzieci 5-11 lat: 32 USD, dzieci do 5 lat: bezpłatnie."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2 godziny (rejs)",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią Seascope, transfer z hotelu i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Podwodny pokład ok. 3 m",
      "Panoramiczne okna",
      "Rafy koralowe Morza Czerwonego",
      "Transfer z hotelu w cenie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Marsa Alam do portu, z którego wypływa łódź Seascope."
      },
      {
        "title": "Wejście na łódź",
        "description": "Zajmujesz miejsce na klimatyzowanym pokładzie podwodnym, około 3 metrów pod powierzchnią wody."
      },
      {
        "title": "Rejs po Morzu Czerwonym",
        "description": "Podczas około dwugodzinnego rejsu obserwujesz rafy koralowe i ryby zza panoramicznych okien."
      },
      {
        "title": "Powrót i transfer",
        "description": "Po rejsie wracasz do portu i transferem do hotelu."
      }
    ],
    "included": [
      "Transfer z hotelu i z powrotem",
      "Rejs łodzią Seascope",
      "Miejsce przy panoramicznym oknie na podwodnym pokładzie"
    ],
    "excluded": [
      "Napiwki",
      "Wydatki własne",
      "Zdjęcia pamiątkowe (opcjonalnie)"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Okulary przeciwsłoneczne",
      "Krem z filtrem i nakrycie głowy",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Odpowiednia także dla dzieci i osób, które nie nurkują"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Dostępność, godzinę odbioru i szczegóły rejsu ustalamy przed wycieczką; w razie złej pogody termin może zostać przesunięty.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa rejs łodzią Seascope?",
        "answer": "Sam rejs trwa około 2 godzin, a wyjazdy odbywają się codziennie. Dokładną godzinę odbioru z hotelu potwierdzamy na WhatsApp."
      },
      {
        "question": "Ile kosztuje bilet dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 32 USD, a dzieci do 5 lat wchodzą za darmo. Bilet dla dorosłego to 62 USD od osoby."
      },
      {
        "question": "Czy trzeba umieć nurkować lub pływać?",
        "answer": "Nie. Seascope ma przeszklony pokład pod wodą, więc rafy oglądasz zza okien, nie wchodząc do wody - to dobra opcja także dla dzieci."
      },
      {
        "question": "Czy transfer z hotelu jest w cenie?",
        "answer": "Tak, cena obejmuje transfer z hotelu i z powrotem oraz miejsce przy panoramicznym oknie."
      }
    ],
    "seo": {
      "title": "Seascope Marsa Alam - rejs łodzią podwodną",
      "description": "Rejs łodzią Seascope z Marsa Alam: podwodny pokład, panoramiczne okna i rafy Morza Czerwonego. Transfer w cenie. Cena od 62 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/lodz-seascope/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "sharm-el-lulli-ras-hankorab",
    "route": "/wycieczki-z-marsa-alam/sharm-el-lulli-ras-hankorab",
    "title": "Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab)",
    "h1": "Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab)",
    "destination": "marsa-alam",
    "category": "rejsy-wyspy",
    "departure": "Marsa Alam",
    "shortDescription": "Wyjazd z Marsa Alam na plażę Sharm el Lulli, znaną też jako Ras Hankorab - jedną z najpiękniejszych zatok regionu, około 60 km na południe. Plażowanie i snorkeling; sprzęt, wstęp i transfer w cenie. Wycieczka prywatna od 3 osób.",
    "overview": "Wycieczka z Marsa Alam na plażę Sharm el Lulli, znaną również jako Ras Hankorab, to wyjazd na jedną z najpiękniejszych zatok regionu, położoną około 60 km na południe od Marsa Alam. Dla urody błękitnej wody na tle pustyni bywa nazywana karaibską plażą.\n\nOdbiór z hoteli odbywa się rano, między 7:30 a 8:30. Na miejscu jest czas na kąpiele słoneczne, pływanie i snorkeling, podczas którego można obserwować podwodną faunę i florę. Powrót do hotelu planowany jest na godziny popołudniowe, około 15:00-16:00.\n\nTo wycieczka prywatna realizowana od minimum 3 osób. W cenie znajduje się przejazd klimatyzowanym pojazdem, wstęp na plażę oraz sprzęt do snorkelingu.",
    "heroImage": {
      "src": "/media/tours/ma-sharm-el-lulli-ras-hankorab",
      "alt": "Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab) - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-sharm-el-lulli-ras-hankorab",
        "alt": "Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab) - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 53,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 53,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 30,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie (wycieczka prywatna, min. 3 osoby)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 7-8 godzin",
    "pickupLabel": "poranek, ok. 7:30-8:30",
    "returnLabel": "popołudnie, ok. 15:00-16:00",
    "transport": "Transfer z/do hotelu klimatyzowanym autem, mikrobusem lub vanem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Karaibska plaża Sharm el Lulli",
      "Snorkeling przy rafie",
      "Wstęp na plażę i sprzęt w cenie",
      "Około 60 km od Marsa Alam"
    ],
    "itinerary": [
      {
        "time": "ok. 7:30-8:30",
        "title": "Odbiór z hotelu",
        "description": "Transfer klimatyzowanym pojazdem w kierunku południa."
      },
      {
        "title": "Przejazd na plażę",
        "description": "Dojazd na Sharm el Lulli (Ras Hankorab), około 60 km od Marsa Alam."
      },
      {
        "title": "Plażowanie",
        "description": "Kąpiele słoneczne i wypoczynek w karaibskiej zatoce."
      },
      {
        "title": "Snorkeling",
        "description": "Obserwacja podwodnej fauny i flory przy rafie."
      },
      {
        "title": "Czas wolny",
        "description": "Relaks nad morzem."
      },
      {
        "time": "ok. 15:00-16:00",
        "title": "Powrót",
        "description": "Przejazd z powrotem do hotelu."
      }
    ],
    "included": [
      "Przejazd klimatyzowanym autem, mikrobusem lub vanem",
      "Wstęp na plażę",
      "Sprzęt do snorkelingu"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napiwki",
      "Zdjęcia robione przez fotografa",
      "Kamizelki asekuracyjne (kapoki)"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem i nakrycie głowy",
      "Woda i przekąski",
      "Obuwie do wody"
    ],
    "requirements": [
      "Wycieczka prywatna od minimum 3 osób",
      "Snorkeling zalecany dla umiejących pływać; kapoki dodatkowo płatne"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin i godzinę odbioru z hotelu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka na plażę Sharm el Lulli?",
        "answer": "Dorosły 53 USD, dziecko 5-11 lat 30 USD, dziecko do 5 lat bezpłatnie."
      },
      {
        "question": "O której jest odbiór i powrót?",
        "answer": "Odbiór z hotelu między 7:30 a 8:30, powrót po południu około 15:00-16:00."
      },
      {
        "question": "Gdzie leży plaża Ras Hankorab?",
        "answer": "Około 60 km na południe od Marsa Alam."
      },
      {
        "question": "Czy sprzęt do snorkelingu jest w cenie?",
        "answer": "Tak, sprzęt do snorkelingu i wstęp na plażę są wliczone; kamizelki asekuracyjne (kapoki) są dodatkowo płatne."
      }
    ],
    "seo": {
      "title": "Plaża Sharm el Lulli (Ras Hankorab) z Marsa Alam",
      "description": "Wycieczka z Marsa Alam na plażę Sharm el Lulli (Ras Hankorab): karaibska zatoka, snorkeling i relaks. Sprzęt i transfer w cenie, od 53 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/sharm-el-lulli-ras-hankorab/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "nurkowanie-z-plazy",
    "route": "/wycieczki-z-marsa-alam/nurkowanie-z-plazy",
    "title": "Wycieczka z Marsa Alam - nurkowanie z plaży",
    "h1": "Nurkowanie z plaży w Marsa Alam",
    "destination": "marsa-alam",
    "category": "nurkowanie",
    "departure": "Marsa Alam",
    "shortDescription": "Nurkowanie prosto z brzegu w Marsa Alam z jednym lub dwoma zejściami pod wodę na rafach Morza Czerwonego. Sprzęt i transfer z hotelu w cenie, a wariant dobieramy zarówno dla początkujących, jak i nurków z certyfikatem.",
    "overview": "Nurkowanie z plaży w Marsa Alam to prosty sposób na zejście pod wodę bez wypływania łodzią - startujesz wprost z brzegu na wybranej plaży, gdzie rafa zaczyna się blisko lądu. Program obejmuje jedno lub dwa zejścia pod wodę, w zależności od wybranego wariantu.\n\nPod powierzchnią czekają rafy koralowe Morza Czerwonego, kolorowe ryby i bogaty podwodny świat okolic Marsa Alam. Wyprawę dostosowujemy zarówno do osób bez doświadczenia, jak i do nurków z certyfikatem.\n\nW cenie znajduje się transfer z hotelu klimatyzowanym autem lub mikrobusem, sprzęt do nurkowania oraz organizacja całej wycieczki. Realizacja zależy od warunków pogodowych na morzu.",
    "heroImage": {
      "src": "/media/tours/ma-nurkowanie-z-plazy",
      "alt": "Wycieczka z Marsa Alam - nurkowanie z plaży - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-nurkowanie-z-plazy",
        "alt": "Wycieczka z Marsa Alam - nurkowanie z plaży - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 70,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 70,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie, w zależności od pogody",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu klimatyzowanym autem lub mikrobusem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rafy Morza Czerwonego",
      "1 lub 2 zejścia pod wodę",
      "Sprzęt nurkowy w cenie",
      "Dla początkujących i z certyfikatem"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer klimatyzowanym autem lub mikrobusem na wybraną plażę."
      },
      {
        "title": "Przygotowanie sprzętu",
        "description": "Dobór i montaż sprzętu do nurkowania oraz krótkie omówienie zasad."
      },
      {
        "title": "Pierwsze zejście pod wodę",
        "description": "Nurkowanie z brzegu przy rafie, obserwacja koralowców i ryb."
      },
      {
        "title": "Drugie zejście (opcjonalnie)",
        "description": "W wariancie z dwoma nurkowaniami kolejne wejście na rafę."
      },
      {
        "title": "Powrót",
        "description": "Transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer klimatyzowanym autem lub mikrobusem",
      "Sprzęt do nurkowania",
      "Organizacja wycieczki"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne",
      "Zdjęcia i nagrania podwodne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem",
      "Woda do picia",
      "Coś ciepłego po nurkowaniu"
    ],
    "requirements": [
      "Podstawowa umiejętność pływania",
      "Dobry stan zdrowia, bez przeciwwskazań do nurkowania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin i wariant nurkowania ustalamy indywidualnie, a realizacja zależy od warunków pogodowych na morzu.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje nurkowanie z plaży w Marsa Alam?",
        "answer": "Cena wynosi 70 USD za osobę, a w cenie jest sprzęt do nurkowania oraz transfer z hotelu."
      },
      {
        "question": "Czy nurkowanie jest odpowiednie dla początkujących?",
        "answer": "Tak, wariant dobieramy zarówno dla osób bez doświadczenia, jak i dla nurków z certyfikatem."
      },
      {
        "question": "Ile zejść pod wodę obejmuje wycieczka?",
        "answer": "Jedno lub dwa zejścia pod wodę, w zależności od wybranego wariantu."
      },
      {
        "question": "Czy trzeba mieć własny sprzęt nurkowy?",
        "answer": "Nie, sprzęt do nurkowania jest wliczony w cenę."
      }
    ],
    "seo": {
      "title": "Nurkowanie z plaży Marsa Alam - 1 lub 2 zejścia",
      "description": "Nurkowanie z brzegu w Marsa Alam: rafy Morza Czerwonego, sprzęt i transfer z hotelu w cenie. 70 USD za osobę, wariant także dla początkujących.",
      "canonicalPath": "/wycieczki-z-marsa-alam/nurkowanie-z-plazy/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "nurkowanie-z-lodzi",
    "route": "/wycieczki-z-marsa-alam/nurkowanie-z-lodzi",
    "title": "Nurkowanie z łodzi w Marsa Alam",
    "h1": "Nurkowanie z łodzi w Marsa Alam - 2 zejścia pod wodę",
    "destination": "marsa-alam",
    "category": "nurkowanie",
    "departure": "Marsa Alam",
    "shortDescription": "Nurkowanie z łodzi w Marsa Alam dla początkujących i certyfikowanych nurków: 1 lub 2 zejścia na rafach Morza Czerwonego, sprzęt, obiad na łodzi i transfer w cenie.",
    "overview": "Nurkowanie z łodzi w Marsa Alam skierowane jest zarówno do początkujących, jak i certyfikowanych nurków. Program obejmuje 1 lub 2 zejścia pod wodę na rafach Morza Czerwonego.\n\nPo transferze z hotelu wypływasz łodzią na rafy, gdzie zobaczysz koralowce, kolorowe ryby i podwodny świat okolicy. Liczbę zejść i wariant ustalasz przy rezerwacji.\n\nW cenie są transfer, sprzęt do nurkowania, rejs łodzią, obiad na łodzi i ciepłe napoje. Wyjazdy odbywają się codziennie, w zależności od pogody.",
    "heroImage": {
      "src": "/media/tours/ma-nurkowanie-z-lodzi",
      "alt": "Nurkowanie z łodzi w Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-nurkowanie-z-lodzi",
        "alt": "Nurkowanie z łodzi w Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 75,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 75,
          "currency": "USD"
        }
      ],
      "note": "Cena zależy od liczby zejść pod wodę; szczegóły potwierdzamy na WhatsApp."
    },
    "availabilityLabel": "Codziennie, w zależności od pogody",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer z hotelu i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "1 lub 2 zejścia pod wodę",
      "Rafy Morza Czerwonego",
      "Sprzęt w cenie",
      "Obiad na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Marsa Alam do portu."
      },
      {
        "title": "Rejs na rafy",
        "description": "Wypływasz łodzią na rafy koralowe Morza Czerwonego."
      },
      {
        "title": "Briefing i sprzęt",
        "description": "Przygotowanie sprzętu do nurkowania i omówienie zejścia."
      },
      {
        "title": "1 lub 2 zejścia pod wodę",
        "description": "Nurkowanie na rafach z kolorowymi rybami; liczba zejść zależy od wybranego wariantu."
      },
      {
        "title": "Obiad na łodzi",
        "description": "Obiad na pokładzie i ciepłe napoje między zejściami."
      },
      {
        "title": "Powrót",
        "description": "Powrót do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z hotelu",
      "Sprzęt do nurkowania",
      "Rejs łodzią",
      "Obiad na łodzi",
      "Ciepłe napoje"
    ],
    "excluded": [
      "Ubezpieczenie nurkowe",
      "Dodatkowe nurkowania poza programem",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem",
      "Okulary przeciwsłoneczne",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Dla umiejących pływać",
      "Dostępne dla początkujących i certyfikowanych nurków"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Dostępność, godzinę odbioru i wariant nurkowania ustalamy przed wyjazdem; wyjazd zależy od warunków pogodowych.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy nurkowanie jest dla początkujących?",
        "answer": "Tak, program jest dostępny zarówno dla początkujących, jak i certyfikowanych nurków. Wariant i liczbę zejść ustalasz przy rezerwacji."
      },
      {
        "question": "Ile zejść pod wodę obejmuje wyjazd?",
        "answer": "1 lub 2 zejścia, w zależności od wybranego wariantu i pogody."
      },
      {
        "question": "Co jest w cenie?",
        "answer": "Transfer z hotelu, sprzęt do nurkowania, rejs łodzią, obiad na łodzi i ciepłe napoje. Cena od 75 USD od osoby."
      },
      {
        "question": "Czy pogoda może wpłynąć na wyjazd?",
        "answer": "Tak, nurkowanie odbywa się w zależności od warunków pogodowych; w razie potrzeby termin przesuwamy."
      }
    ],
    "seo": {
      "title": "Nurkowanie z łodzi w Marsa Alam - rafy Morza Czerwonego",
      "description": "Nurkowanie z łodzi w Marsa Alam: 1 lub 2 zejścia, rafy Morza Czerwonego, sprzęt, obiad i transfer. Cena od 75 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/nurkowanie-z-lodzi/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kurs-padi-open-water",
    "route": "/wycieczki-z-marsa-alam/kurs-padi-open-water",
    "title": "Kurs PADI Open Water Diver w Marsa Alam",
    "h1": "Kurs PADI Open Water Diver w Marsa Alam",
    "destination": "marsa-alam",
    "category": "nurkowanie",
    "departure": "Marsa Alam",
    "shortDescription": "Podstawowy kurs PADI Open Water Diver w Marsa Alam dla początkujących: 4 nurkowania, sprzęt i instruktor, międzynarodowy certyfikat i nurkowanie do 18 m.",
    "overview": "Kurs PADI Open Water Diver w Marsa Alam to podstawowe szkolenie nurkowe dla osób początkujących. Po jego ukończeniu zdobywasz międzynarodowy certyfikat PADI i możesz nurkować z partnerem do 18 metrów na całym świecie.\n\nSzkolenie prowadzi instruktor, a naukę rozkłada się na teorię, ćwiczenia i praktykę. W programie są 4 nurkowania w wodach otwartych. Kurs trwa 3-4 dni.\n\nW cenie znajdują się szkolenie z instruktorem, sprzęt nurkowy, transfer oraz obiad i napoje podczas rejsu. Do wyboru są dwa warianty: nurkowania z brzegu lub z łodzi.",
    "heroImage": {
      "src": "/media/tours/ma-kurs-padi-open-water",
      "alt": "Kurs PADI Open Water Diver w Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-kurs-padi-open-water",
        "alt": "Kurs PADI Open Water Diver w Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perCourse",
      "amount": 400,
      "unit": "kurs",
      "currency": "EUR",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Kurs z brzegu",
          "amount": 400,
          "currency": "EUR",
          "unit": "kurs"
        },
        {
          "label": "Kurs z łodzi",
          "amount": 450,
          "currency": "EUR",
          "unit": "kurs"
        }
      ],
      "note": "Cena zależna od wariantu: nurkowania z brzegu lub z łodzi."
    },
    "availabilityLabel": "Terminy ustalane indywidualnie",
    "availabilityDays": [
      "Terminy ustalane indywidualnie"
    ],
    "durationLabel": "3-4 dni",
    "pickupLabel": "Do ustalenia",
    "transport": "Nurkowania z brzegu lub z łodzi (rejs), transfer w cenie",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Certyfikat PADI OWD",
      "4 nurkowania",
      "Nurkowanie do 18 m",
      "Kurs od podstaw",
      "Sprzęt w cenie"
    ],
    "itinerary": [
      {
        "title": "Teoria",
        "description": "Podstawy nurkowania omawiane krok po kroku z instruktorem."
      },
      {
        "title": "Ćwiczenia w wodzie",
        "description": "Nauka technik i procedur przed nurkowaniami w wodach otwartych."
      },
      {
        "title": "4 nurkowania w wodach otwartych",
        "description": "Praktyczne nurkowania utrwalające zdobyte umiejętności."
      },
      {
        "title": "Certyfikat PADI OWD",
        "description": "Po ukończeniu otrzymujesz międzynarodowy certyfikat i możliwość nurkowania do 18 metrów."
      }
    ],
    "included": [
      "Szkolenie z instruktorem PADI",
      "4 nurkowania w wodach otwartych",
      "Sprzęt nurkowy",
      "Transfer",
      "Obiad i napoje podczas rejsu",
      "Certyfikat PADI Open Water Diver"
    ],
    "excluded": [
      "Ubezpieczenie nurkowe",
      "Dodatkowe nurkowania poza kursem",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Krem z filtrem",
      "Okulary przeciwsłoneczne",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Umiejętność pływania",
      "Dobry stan zdrowia i brak przeciwwskazań do nurkowania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Termin kursu, wariant i szczegóły ustalamy indywidualnie przed rozpoczęciem.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy kurs jest dla początkujących?",
        "answer": "Tak, to podstawowy kurs nurkowy od zera. Prowadzi go instruktor, a naukę rozkłada się na teorię, ćwiczenia i 4 nurkowania w wodach otwartych."
      },
      {
        "question": "Ile trwa kurs OWD?",
        "answer": "Zwykle 3-4 dni. Termin ustalamy indywidualnie."
      },
      {
        "question": "Jaki certyfikat otrzymam?",
        "answer": "Międzynarodowy certyfikat PADI Open Water Diver, który pozwala nurkować z partnerem do 18 metrów na całym świecie."
      },
      {
        "question": "Co jest w cenie kursu?",
        "answer": "Szkolenie z instruktorem, sprzęt nurkowy, transfer oraz obiad i napoje podczas rejsu. Do wyboru wariant z brzegu (400 EUR) lub z łodzi (450 EUR)."
      }
    ],
    "seo": {
      "title": "Kurs PADI Open Water Diver w Marsa Alam",
      "description": "Kurs PADI Open Water Diver w Marsa Alam: 4 nurkowania, sprzęt, instruktor i certyfikat do 18 m. Cena od 400 EUR.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kurs-padi-open-water/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kurs-padi-advanced-open-water",
    "route": "/wycieczki-z-marsa-alam/kurs-padi-advanced-open-water",
    "title": "Kurs PADI Advanced Open Water Diver w Marsa Alam",
    "h1": "Kurs PADI Advanced Open Water Diver w Marsa Alam",
    "destination": "marsa-alam",
    "category": "nurkowanie",
    "departure": "Marsa Alam",
    "shortDescription": "Kurs PADI Advanced Open Water Diver w Marsa Alam dla osób po OWD: 5 nurkowań, Deep Dive i nawigacja, nurkowanie do 30 m i certyfikat PADI.",
    "overview": "Kurs PADI Advanced Open Water Diver w Marsa Alam przeznaczony jest dla osób, które mają już certyfikat Open Water Diver i chcą rozwinąć umiejętności pod wodą. Po ukończeniu możesz nurkować do 30 metrów.\n\nProgram obejmuje 5 nurkowań typu Adventure Dive, w tym dwa obowiązkowe: Deep Dive (nurkowanie głębokie) i Underwater Navigation (nawigacja). Pozostałe nurkowania wybierasz spośród opcji takich jak Wreck Dive, Night Dive, Drift Dive czy Peak Performance Buoyancy.\n\nKurs trwa 2 dni i kończy się certyfikatem PADI AOWD. Dostępne są dwa warianty cenowe: nurkowania z brzegu lub z łodzi. W cenie obiad i napoje podczas rejsu.",
    "heroImage": {
      "src": "/media/tours/ma-kurs-padi-advanced-open-water",
      "alt": "Kurs PADI Advanced Open Water Diver w Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-kurs-padi-advanced-open-water",
        "alt": "Kurs PADI Advanced Open Water Diver w Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perCourse",
      "amount": 360,
      "unit": "kurs",
      "currency": "EUR",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Kurs z brzegu",
          "amount": 360,
          "currency": "EUR",
          "unit": "kurs"
        },
        {
          "label": "Kurs z łodzi",
          "amount": 410,
          "currency": "EUR",
          "unit": "kurs"
        }
      ],
      "note": "Cena zależna od wariantu: nurkowania z brzegu lub z łodzi."
    },
    "availabilityLabel": "Terminy ustalane indywidualnie",
    "availabilityDays": [
      "Terminy ustalane indywidualnie"
    ],
    "durationLabel": "2 dni",
    "pickupLabel": "Do ustalenia",
    "transport": "Nurkowania z brzegu lub z łodzi (rejs)",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "5 nurkowań Adventure Dive",
      "Nurkowanie do 30 m",
      "Deep Dive i nawigacja",
      "Certyfikat PADI AOWD"
    ],
    "itinerary": [
      {
        "title": "Briefing i teoria",
        "description": "Wprowadzenie z instruktorem i omówienie kolejnych nurkowań."
      },
      {
        "title": "Deep Dive",
        "description": "Obowiązkowe nurkowanie głębokie rozwijające umiejętności na większej głębokości."
      },
      {
        "title": "Underwater Navigation",
        "description": "Obowiązkowe nurkowanie z nawigacją i orientacją pod wodą."
      },
      {
        "title": "Nurkowania do wyboru",
        "description": "Pozostałe nurkowania specjalne, np. Wreck, Night, Drift lub Peak Performance Buoyancy."
      },
      {
        "title": "Certyfikat PADI AOWD",
        "description": "Po pięciu nurkowaniach otrzymujesz certyfikat i możliwość nurkowania do 30 metrów."
      }
    ],
    "included": [
      "Szkolenie z instruktorem PADI",
      "5 nurkowań (Adventure Dive)",
      "Obiad i napoje podczas rejsu",
      "Certyfikat PADI Advanced Open Water Diver"
    ],
    "excluded": [
      "Ubezpieczenie nurkowe",
      "Dodatkowe nurkowania poza kursem",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Certyfikat PADI Open Water Diver",
      "Krem z filtrem",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Wymagany certyfikat PADI Open Water Diver (lub równoważny)",
      "Dobry stan zdrowia"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Termin kursu, wariant i szczegóły ustalamy indywidualnie przed rozpoczęciem.",
    "featured": false,
    "faqs": [
      {
        "question": "Kto może zapisać się na kurs AOWD?",
        "answer": "Kurs jest przeznaczony dla osób z certyfikatem PADI Open Water Diver, które chcą rozwijać umiejętności i nurkować głębiej."
      },
      {
        "question": "Ile nurkowań obejmuje kurs?",
        "answer": "Pięć nurkowań typu Adventure Dive, w tym obowiązkowe Deep Dive i Underwater Navigation. Kurs trwa 2 dni."
      },
      {
        "question": "Do jakiej głębokości będę mógł nurkować?",
        "answer": "Po ukończeniu kursu możesz nurkować do 30 metrów."
      },
      {
        "question": "Ile kosztuje kurs?",
        "answer": "Wariant z brzegu to 360 EUR, a z łodzi 410 EUR za kurs. W cenie obiad i napoje podczas rejsu."
      }
    ],
    "seo": {
      "title": "Kurs PADI AOWD w Marsa Alam - nurkowanie do 30 m",
      "description": "Kurs PADI Advanced Open Water Diver w Marsa Alam: 5 nurkowań, Deep Dive i nawigacja, certyfikat PADI. Cena od 360 EUR.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kurs-padi-advanced-open-water/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kurs-padi-rescue-diver",
    "route": "/wycieczki-z-marsa-alam/kurs-padi-rescue-diver",
    "title": "Kurs PADI Rescue Diver w Marsa Alam",
    "h1": "Kurs PADI Rescue Diver w Marsa Alam",
    "destination": "marsa-alam",
    "category": "nurkowanie",
    "departure": "Marsa Alam",
    "shortDescription": "Kurs PADI Rescue Diver w Marsa Alam: nauka zapobiegania wypadkom i scenariusze ratunkowe. Dla nurków po AOWD z aktualnym First Aid / EFR, krok przed Divemaster.",
    "overview": "Kurs PADI Rescue Diver w Marsa Alam uczy zapobiegania wypadkom i skutecznego reagowania w sytuacjach awaryjnych pod wodą. To jeden z ważniejszych etapów w rozwoju nurka przed poziomem profesjonalnym, np. Divemaster.\n\nSzkolenie łączy teorię z praktycznymi scenariuszami ratunkowymi w Morzu Czerwonym. Kurs trwa 3-4 dni i przeznaczony jest dla nurków z certyfikatem Advanced Open Water Diver oraz aktualnym First Aid / EFR.\n\nPo ukończeniu otrzymujesz certyfikat PADI Rescue Diver. Dostępne są dwa warianty cenowe: nurkowania z brzegu lub z łodzi. W cenie obiad i napoje podczas rejsu.",
    "heroImage": {
      "src": "/media/tours/ma-kurs-padi-rescue-diver",
      "alt": "Kurs PADI Rescue Diver w Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-kurs-padi-rescue-diver",
        "alt": "Kurs PADI Rescue Diver w Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perCourse",
      "amount": 360,
      "unit": "kurs",
      "currency": "EUR",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Kurs z brzegu",
          "amount": 360,
          "currency": "EUR",
          "unit": "kurs"
        },
        {
          "label": "Kurs z łodzi",
          "amount": 410,
          "currency": "EUR",
          "unit": "kurs"
        }
      ],
      "note": "Cena zależna od wariantu: nurkowania z brzegu lub z łodzi."
    },
    "availabilityLabel": "Terminy ustalane indywidualnie",
    "availabilityDays": [
      "Terminy ustalane indywidualnie"
    ],
    "durationLabel": "3-4 dni",
    "pickupLabel": "Do ustalenia",
    "transport": "Nurkowania z brzegu lub z łodzi (rejs)",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Scenariusze ratunkowe",
      "Teoria i praktyka",
      "Certyfikat PADI Rescue",
      "Krok przed Divemaster"
    ],
    "itinerary": [
      {
        "title": "Teoria",
        "description": "Omówienie zapobiegania wypadkom i zasad reagowania w sytuacjach awaryjnych."
      },
      {
        "title": "Ćwiczenia i scenariusze ratunkowe",
        "description": "Praktyczne rozpoznawanie problemów i udzielanie pomocy innym nurkom."
      },
      {
        "title": "Praktyka w Morzu Czerwonym",
        "description": "Realistyczne scenariusze ratunkowe w warunkach otwartej wody."
      },
      {
        "title": "Certyfikat PADI Rescue Diver",
        "description": "Po ukończeniu otrzymujesz certyfikat i przygotowanie przed poziomem Divemaster."
      }
    ],
    "included": [
      "Szkolenie z instruktorem PADI",
      "Teoria i praktyczne scenariusze ratunkowe",
      "Obiad i napoje podczas rejsu",
      "Certyfikat PADI Rescue Diver"
    ],
    "excluded": [
      "Ubezpieczenie nurkowe",
      "Dodatkowe nurkowania poza kursem",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Certyfikat AOWD i zaświadczenie First Aid / EFR",
      "Krem z filtrem",
      "Gotówka na drobne wydatki"
    ],
    "requirements": [
      "Wymagany certyfikat Advanced Open Water Diver",
      "Aktualny kurs pierwszej pomocy First Aid / EFR"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online. Termin kursu, wariant i szczegóły ustalamy indywidualnie przed rozpoczęciem.",
    "featured": false,
    "faqs": [
      {
        "question": "Jakie wymagania trzeba spełnić?",
        "answer": "Kurs jest dla nurków z certyfikatem Advanced Open Water Diver i aktualnym kursem pierwszej pomocy First Aid / EFR."
      },
      {
        "question": "Czego uczy kurs Rescue Diver?",
        "answer": "Zapobiegania wypadkom oraz reagowania w sytuacjach awaryjnych - łączy teorię z praktycznymi scenariuszami ratunkowymi. Trwa 3-4 dni."
      },
      {
        "question": "Co daje ten kurs?",
        "answer": "Certyfikat PADI Rescue Diver i przygotowanie do dalszego rozwoju, np. przed poziomem Divemaster."
      },
      {
        "question": "Ile kosztuje kurs?",
        "answer": "Wariant z brzegu to 360 EUR, a z łodzi 410 EUR za kurs. W cenie obiad i napoje podczas rejsu."
      }
    ],
    "seo": {
      "title": "Kurs PADI Rescue Diver w Marsa Alam",
      "description": "Kurs PADI Rescue Diver w Marsa Alam: scenariusze ratunkowe, teoria i praktyka, certyfikat PADI. Cena od 360 EUR.",
      "canonicalPath": "/wycieczki-z-marsa-alam/kurs-padi-rescue-diver/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "super-safari-quady",
    "route": "/wycieczki-z-marsa-alam/super-safari-quady",
    "title": "Super Safari z Marsa Alam",
    "h1": "Wycieczka z Marsa Alam - Super Safari",
    "destination": "marsa-alam",
    "category": "safari",
    "departure": "Marsa Alam",
    "shortDescription": "Popołudniowo-wieczorne safari z Marsa Alam łączące przejazd terenowym jeepem, jazdę quadami, wizytę w wiosce Beduinów i przejażdżkę na wielbłądzie, zwieńczone kolacją z orientalnym pokazem. Dla osób szukających aktywnej wyprawy na pustynię.",
    "overview": "Super Safari to wyprawa na pustynię w okolicach Marsa Alam, która łączy dwie formy jazdy: terenowym jeepem oraz quadem. Odbiór z hotelu odbywa się po południu, zwykle między 12:30 a 14:00, w zależności od jego lokalizacji, a cały program trwa około 6-8 godzin.\n\nNa quadach spędzisz około 30-40 minut, przemierzając pustynne trasy. Po drodze odwiedzisz wioskę Beduinów i skorzystasz z krótkiej przejażdżki na wielbłądzie. Wieczorem czeka kolacja połączona z orientalnym pokazem.\n\nW cenie zawarty jest transport z hotelu i z powrotem, jazda jeepem oraz quadami, kolacja i pokaz. To propozycja dla osób ceniących aktywne popołudnie i wieczór poza hotelem.",
    "heroImage": {
      "src": "/media/tours/ma-super-safari-quady",
      "alt": "Super Safari z Marsa Alam - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-super-safari-quady",
        "alt": "Super Safari z Marsa Alam - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 38,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 38,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 6-8 godzin (popołudnie i wieczór)",
    "pickupLabel": "12:30-14:00, zależnie od hotelu",
    "transport": "Transfer z/do hotelu; terenowy jeep i quady na pustyni",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jeep safari",
      "Quady 30-40 min",
      "Wioska Beduinów",
      "Wielbłąd",
      "Kolacja i pokaz"
    ],
    "itinerary": [
      {
        "time": "12:30-14:00",
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu następuje po południu, w zależności od jego lokalizacji."
      },
      {
        "title": "Jeep safari",
        "description": "Przejazd terenowym jeepem w głąb pustyni."
      },
      {
        "title": "Jazda quadami",
        "description": "Około 30-40 minut jazdy quadem po pustynnych trasach."
      },
      {
        "title": "Wioska Beduinów i wielbłąd",
        "description": "Wizyta w wiosce Beduinów oraz krótka przejażdżka na wielbłądzie."
      },
      {
        "title": "Kolacja i orientalny pokaz",
        "description": "Wieczorna kolacja połączona z orientalnym pokazem."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer powrotny do hotelu po zakończeniu programu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jeep safari i jazda quadami",
      "Wizyta w wiosce Beduinów",
      "Przejażdżka na wielbłądzie",
      "Kolacja i orientalny pokaz"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Wygodne, zakryte buty",
      "Okulary przeciwsłoneczne",
      "Chusta lub ochrona twarzy przed piaskiem",
      "Bluza na chłodniejszy wieczór",
      "Gotówka na dodatkowe wydatki"
    ],
    "requirements": [
      "Jazda quadem wymaga podstawowej sprawności fizycznej"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Termin możesz bezpłatnie zmienić lub odwołać z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "O której godzinie jest odbiór z hotelu?",
        "answer": "Odbiór odbywa się po południu, zwykle między 12:30 a 14:00, w zależności od lokalizacji hotelu."
      },
      {
        "question": "Jak długo trwa cała wycieczka?",
        "answer": "Program obejmuje około 6-8 godzin i kończy się wieczorem."
      },
      {
        "question": "Ile czasu spędza się na quadach?",
        "answer": "Jazda quadami trwa około 30-40 minut."
      },
      {
        "question": "Co jest wliczone w cenę?",
        "answer": "Transport z hotelu i z powrotem, jazda jeepem oraz quadami, kolacja i orientalny pokaz."
      }
    ],
    "seo": {
      "title": "Super Safari z Marsa Alam - jeep, quady i kolacja",
      "description": "Super Safari z Marsa Alam: jeep, quady 30-40 min, wioska Beduinów, wielbłąd i kolacja z pokazem. Odbiór 12:30-14:00, codziennie. Cena 38 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/super-safari-quady/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-5h",
    "route": "/wycieczki-z-marsa-alam/quad-safari-5h",
    "title": "Quad Safari z Marsa Alam - 5 godzin",
    "h1": "Quad Safari z Marsa Alam - 5-godzinne safari na pustyni",
    "destination": "marsa-alam",
    "category": "safari",
    "departure": "Marsa Alam",
    "shortDescription": "Pięciogodzinne safari quadami z Marsa Alam: jazda po pustyni, wizyta w wiosce Beduinów, przejażdżka na wielbłądzie oraz wieczorna kolacja z pokazem. Dobra propozycja dla osób szukających aktywnego popołudnia poza hotelem.",
    "overview": "Wyprawa łączy jazdę quadami po pustynnych bezdrożach w okolicach Marsa Alam z odwiedzinami w wiosce Beduinów. Cały program trwa około pięciu godzin, a transfer z hotelu i z powrotem jest wliczony w cenę.\n\nNa trasie nie brakuje elementów typowych dla pustynnego safari: krótkiej przejażdżki na wielbłądzie oraz poznania codziennego życia mieszkańców pustyni. Dzień kończy się kolacją połączoną z pokazem na pustyni.\n\nTo wycieczka dla osób, które wolą aktywne spędzanie czasu i chcą zobaczyć Egipt poza terenem hotelu. Quady prowadzi się samodzielnie po krótkim instruktażu.",
    "heroImage": {
      "src": "/media/tours/ma-quad-safari-5h",
      "alt": "Quad Safari z Marsa Alam - 5 godzin - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-quad-safari-5h",
        "alt": "Quad Safari z Marsa Alam - 5 godzin - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 40,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 40,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 5 godzin",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer z/do hotelu w cenie; jazda quadami po pustyni",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Quady na pustyni",
      "Wioska Beduinów",
      "Przejażdżka na wielbłądzie",
      "Kolacja i pokaz"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Kierowca odbiera Cię z hotelu w Marsa Alam i zawozi na pustynny punkt startowy."
      },
      {
        "title": "Instruktaż i jazda quadami",
        "description": "Po krótkim przeszkoleniu ruszasz quadem przez pustynne bezdroża."
      },
      {
        "title": "Wioska Beduinów",
        "description": "Postój w wiosce Beduinów, gdzie poznasz codzienne życie mieszkańców pustyni."
      },
      {
        "title": "Przejażdżka na wielbłądzie",
        "description": "Krótka przejażdżka na wielbłądzie i czas na zdjęcia."
      },
      {
        "title": "Kolacja i pokaz",
        "description": "Wieczorem kolacja na pustyni połączona z pokazem."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer powrotny do hotelu po zakończeniu programu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Jazda quadami po pustyni",
      "Wizyta w wiosce Beduinów",
      "Przejażdżka na wielbłądzie",
      "Kolacja i pokaz na pustyni"
    ],
    "excluded": [
      "Napoje",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Wygodne, zakryte buty",
      "Okulary przeciwsłoneczne",
      "Chusta lub ochrona twarzy przed piaskiem",
      "Bluza na chłodniejszy wieczór",
      "Gotówka na dodatkowe wydatki"
    ],
    "requirements": [
      "Jazda quadem wymaga podstawowej sprawności fizycznej"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Termin możesz bezpłatnie zmienić lub odwołać z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa safari?",
        "answer": "Cały program zajmuje około 5 godzin, wraz z transferem z hotelu i z powrotem."
      },
      {
        "question": "Czy transfer z hotelu jest w cenie?",
        "answer": "Tak, odbiór i powrót do hotelu w Marsa Alam są wliczone w cenę."
      },
      {
        "question": "Co znajduje się na końcu programu?",
        "answer": "Wieczorem czeka kolacja połączona z pokazem na pustyni."
      },
      {
        "question": "Ile kosztuje udział?",
        "answer": "Cena wynosi 40 USD od osoby."
      }
    ],
    "seo": {
      "title": "Quad Safari z Marsa Alam - 5 godzin, Beduini i kolacja",
      "description": "Quad safari z Marsa Alam: jazda po pustyni, wioska Beduinów, wielbłąd i kolacja z pokazem. Codziennie, transfer z hotelu. Cena 40 USD/os.",
      "canonicalPath": "/wycieczki-z-marsa-alam/quad-safari-5h/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-2h",
    "route": "/wycieczki-z-marsa-alam/quad-safari-2h",
    "title": "Wycieczka z Marsa Alam - Moto Quad Safari 2h",
    "h1": "Moto Quad Safari 2h z Marsa Alam",
    "destination": "marsa-alam",
    "category": "safari",
    "departure": "Marsa Alam",
    "shortDescription": "Dwugodzinne safari quadami z Marsa Alam: jazda przez pustynię i odcinek wzdłuż brzegu morza. Transfer z hotelu i butelka wody w cenie; do wyboru quad pojedynczy lub podwójny dla dwóch osób.",
    "overview": "Moto Quad Safari 2h z Marsa Alam to dwugodzinna jazda quadami przez pustynię, w tym odcinek wzdłuż brzegu morza. To wycieczka nastawiona na dawkę adrenaliny i kontakt z pustynnym krajobrazem.\n\nDo wyboru są dwie pory startu: rano, około 8:00-9:00, lub po południu, około 13:00-14:00. Spod hotelu zabierają Was jeepy lub mikrobus, które dowożą do bazy - tam przesiadacie się na quady i ruszacie w głąb pustyni.\n\nCena obejmuje transfer z hotelu, jazdę quadami oraz butelkę wody. Samodzielnie kierować quadem może osoba, która ukończyła 16 lat. Do wyboru jest quad pojedynczy lub podwójny, dla dwóch osób.",
    "heroImage": {
      "src": "/media/tours/ma-quad-safari-2h",
      "alt": "Wycieczka z Marsa Alam - Moto Quad Safari 2h - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-quad-safari-2h",
        "alt": "Wycieczka z Marsa Alam - Moto Quad Safari 2h - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 33,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Pojedynczy quad",
          "amount": 33,
          "currency": "USD"
        },
        {
          "label": "Podwójny quad (2 os.)",
          "amount": 43,
          "currency": "USD",
          "unit": "quad"
        }
      ],
      "note": "Pojedynczy quad w cenie za osobę; podwójny quad to cena za dwie osoby na jednym quadzie."
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2 godziny (jazda quadami)",
    "pickupLabel": "rano ok. 8:00-9:00 lub po południu ok. 13:00-14:00",
    "transport": "Transfer z/do hotelu (jeep lub mikrobus), jazda quadami",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "2 godziny jazdy quadami",
      "Przejazd wzdłuż morza",
      "Transfer z hotelu w cenie",
      "Quad pojedynczy lub podwójny"
    ],
    "itinerary": [
      {
        "time": "ok. 8:00-9:00 lub 13:00-14:00",
        "title": "Odbiór z hotelu",
        "description": "Przejazd jeepem lub mikrobusem do bazy quadów."
      },
      {
        "title": "Baza quadów",
        "description": "Krótkie wprowadzenie i dosiadanie quadów."
      },
      {
        "title": "Jazda przez pustynię",
        "description": "Wyprawa quadami w głąb pustyni."
      },
      {
        "title": "Przejazd wzdłuż morza",
        "description": "Odcinek trasy wzdłuż brzegu morza."
      },
      {
        "title": "Powrót",
        "description": "Powrót do bazy i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Jazda quadami",
      "1 butelka wody"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje",
      "Zdjęcia robione przez fotografa",
      "Chusty (arafatki)",
      "Gogle"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Chusta i gogle na pył, jeśli własne",
      "Okulary przeciwsłoneczne",
      "Zamknięte obuwie",
      "Krem z filtrem",
      "Gotówka na napoje"
    ],
    "requirements": [
      "Samodzielnie quadem może kierować osoba, która ukończyła 16 lat",
      "Ze względu na pył zalecane okulary i chusta"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin, porę startu i godzinę odbioru z hotelu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje quad safari 2h z Marsa Alam?",
        "answer": "Pojedynczy quad 33 USD za osobę, podwójny quad 43 USD za dwie osoby na jednym quadzie."
      },
      {
        "question": "O której zaczyna się wycieczka?",
        "answer": "Do wyboru jest start rano około 8:00-9:00 lub po południu około 13:00-14:00."
      },
      {
        "question": "Od ilu lat można samodzielnie prowadzić quad?",
        "answer": "Samodzielnie kierować quadem może osoba, która ukończyła 16 lat."
      },
      {
        "question": "Ile trwa jazda quadami?",
        "answer": "Około 2 godzin."
      }
    ],
    "seo": {
      "title": "Moto Quad Safari 2h z Marsa Alam",
      "description": "Moto Quad Safari 2h z Marsa Alam: jazda quadami przez pustynię i wzdłuż morza, transfer w cenie. Od 33 USD za osobę, podwójny quad 43 USD.",
      "canonicalPath": "/wycieczki-z-marsa-alam/quad-safari-2h/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "jeep-safari",
    "route": "/wycieczki-z-marsa-alam/jeep-safari",
    "title": "Wycieczka z Marsa Alam - Jeep Safari",
    "h1": "Jeep Safari z Marsa Alam",
    "destination": "marsa-alam",
    "category": "safari",
    "departure": "Marsa Alam",
    "shortDescription": "Popołudniowo-wieczorne jeep safari z Marsa Alam do wioski beduińskiej: przejazd przez pustynię, przejażdżka na wielbłądach, zachód słońca, kolacja i pokaz tańca brzucha oraz tanoury. Dobre także na rodzinny wyjazd.",
    "overview": "Jeep safari z Marsa Alam to popołudniowo-wieczorna wyprawa w głąb pustyni, połączona z wizytą w wiosce beduińskiej położonej między górami. To propozycja dla osób ciekawych lokalnej kultury, dobra także na rodzinny wyjazd.\n\nZbiórka odbywa się przed hotelem około południa. Jeepami docieramy do wioski - po drodze, jeśli pozwoli pogoda, możliwy jest postój przy fatamorganie. W wiosce odpoczniecie w szałasach, zobaczycie wypiek beduińskiego chleba z możliwością degustacji, przejedziecie się na wielbłądach, odwiedzicie miejscową aptekę z ziołami i maściami oraz mini ZOO.\n\nPo podziwianiu zachodu słońca w górach czeka kolacja w formie szwedzkiego stołu, a następnie wieczorek egipski z pokazem tańca brzucha i tanoury.",
    "heroImage": {
      "src": "/media/tours/ma-jeep-safari",
      "alt": "Wycieczka z Marsa Alam - Jeep Safari - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/ma-jeep-safari",
        "alt": "Wycieczka z Marsa Alam - Jeep Safari - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 42,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 42,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 22,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "od południa do wieczora",
    "pickupLabel": "ok. południa",
    "transport": "Jazda jeepem, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda jeepem przez pustynię",
      "Wioska beduińska",
      "Przejażdżka na wielbłądach",
      "Zachód słońca i kolacja",
      "Pokaz tańca brzucha i tanoury"
    ],
    "itinerary": [
      {
        "time": "ok. południa",
        "title": "Zbiórka przed hotelem",
        "description": "Odbiór i start wyprawy."
      },
      {
        "title": "Przejazd przez pustynię",
        "description": "Jazda jeepem do wioski beduińskiej między górami; po drodze możliwy postój przy fatamorganie, jeśli pozwoli pogoda."
      },
      {
        "title": "Wioska beduińska",
        "description": "Odpoczynek w szałasach oraz wypiek beduińskiego chleba z możliwością degustacji."
      },
      {
        "title": "Przejażdżka na wielbłądach",
        "description": "Krótka przejażdżka po okolicy."
      },
      {
        "title": "Apteka i mini ZOO",
        "description": "Miejscowa apteka z ziołami, roślinami i maściami Beduinów oraz wizyta w mini ZOO."
      },
      {
        "title": "Zachód słońca",
        "description": "Podziwianie zachodu słońca w górach."
      },
      {
        "title": "Kolacja",
        "description": "Posiłek w formie szwedzkiego stołu."
      },
      {
        "title": "Wieczorek egipski",
        "description": "Pokaz tańca brzucha i tanoury, a następnie powrót do hotelu."
      }
    ],
    "included": [
      "Transport z/do hotelu",
      "Jazda jeepem",
      "Kolacja (szwedzki stół)",
      "Orientalny pokaz (taniec brzucha i tanoura)"
    ],
    "excluded": [
      "Wydatki osobiste",
      "Napiwki dla załogi",
      "Napoje",
      "Zdjęcia robione przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Chusta i okulary na pył",
      "Coś ciepłego na wieczór",
      "Zamknięte obuwie",
      "Gotówka na napoje i napiwki",
      "Aparat"
    ],
    "requirements": [
      "Wieczór na pustyni bywa chłodny - warto zabrać coś ciepłego"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp; nie pobieramy płatności online. Termin i godzinę odbioru z hotelu ustalamy indywidualnie.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje jeep safari z Marsa Alam?",
        "answer": "Dorosły 42 USD, dziecko 5-11 lat 22 USD, dziecko do 5 lat bezpłatnie."
      },
      {
        "question": "O której zaczyna się wycieczka?",
        "answer": "Zbiórka przed hotelem odbywa się około południa."
      },
      {
        "question": "Co jest w programie?",
        "answer": "Jazda jeepem przez pustynię, wioska beduińska, przejażdżka na wielbłądach, zachód słońca, kolacja oraz pokaz tańca brzucha i tanoury."
      },
      {
        "question": "Czy wycieczka jest odpowiednia dla rodzin z dziećmi?",
        "answer": "Tak, to propozycja także na rodzinny wypad; dla dzieci obowiązuje niższa cena."
      }
    ],
    "seo": {
      "title": "Jeep Safari z Marsa Alam - wioska beduińska",
      "description": "Jeep safari z Marsa Alam: przejazd przez pustynię, wioska beduińska, wielbłądy, zachód słońca, kolacja i pokaz tańca. Od 42 USD za osobę.",
      "canonicalPath": "/wycieczki-z-marsa-alam/jeep-safari/",
      "ogImage": "/media/og/marsa-alam.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-gem-piramidy",
    "route": "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy",
    "title": "Wycieczka z Sharm el Sheikh do Kairu",
    "h1": "Wycieczka z Sharm el Sheikh do Kairu",
    "destination": "sharm-el-sheikh",
    "category": "kair",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Z Synaju do Kairu krótszą trasą: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Odbiór z hotelu i klimatyzowany autokar.",
    "overview": "Wyprawa z Sharm el Sheikh prowadzi z Synaju do Kairu inną, krótszą trasą niż znad Morza Czerwonego. W programie jest Wielkie Muzeum Egipskie (GEM) - najnowocześniejsza placówka tego typu w kraju - oraz płaskowyż w Gizie z piramidami i Sfinksem. Dzień kończy się obiadem i czasem na zdjęcia, a dla chętnych opcjonalnym rejsem po Nilu.",
    "heroImage": {
      "src": "/media/tours/sharm-kair",
      "alt": "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/sharm-kair",
        "alt": "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 93,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 93,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 60,
          "currency": "USD"
        },
        {
          "label": "Dziecko poniżej 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie (wg dostępności)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "cały dzień, powrót ok. 22:00-23:00",
    "pickupLabel": "ok. 00:00-02:00",
    "returnLabel": "ok. 22:00-23:00",
    "transport": "Klimatyzowany autokar z Sharm el Sheikh do Kairu i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wielkie Muzeum Egipskie (GEM)",
      "Piramidy w Gizie",
      "Sfinks",
      "Obiad"
    ],
    "itinerary": [
      {
        "time": "00:00-02:00",
        "title": "Odbiór z hotelu",
        "description": "Kierowca odbiera Cię spod hotelu w Sharm el Sheikh. Godzinę podajemy wcześniej na WhatsApp."
      },
      {
        "title": "Przejazd do Kairu",
        "description": "Klimatyzowany autokar, ok. 6-8 godzin drogi z Synaju do stolicy."
      },
      {
        "title": "Wielkie Muzeum Egipskie (GEM)",
        "description": "Zwiedzanie najnowocześniejszego muzeum w Egipcie, położonego przy płaskowyżu w Gizie."
      },
      {
        "title": "Płaskowyż w Gizie",
        "description": "Piramidy i Sfinks z bliska, czas na zdjęcia."
      },
      {
        "title": "Obiad",
        "description": "Ciepły posiłek w restauracji (bez napojów)."
      },
      {
        "title": "Opcjonalny rejs po Nilu",
        "description": "Dla chętnych krótki rejs po Nilu za dopłatą."
      },
      {
        "time": "22:00-23:00",
        "title": "Powrót do hotelu",
        "description": "Droga powrotna autokarem, powrót do hotelu zwykle między 22:00 a 23:00."
      }
    ],
    "included": [
      "Transport klimatyzowanym autokarem",
      "Bilet wstępu do GEM",
      "Wstęp na płaskowyż w Gizie",
      "Obiad (bez napojów)"
    ],
    "excluded": [
      "Napoje",
      "Wejście do wnętrza piramidy",
      "Przejazd na wielbłądzie",
      "Wydatki własne i napiwki",
      "Opcjonalny rejs po Nilu"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Rejs po Nilu",
        "note": "ok. 10-12 USD od osoby, płatny na miejscu"
      }
    ],
    "whatToBring": [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień zwiedzania",
      "Nakrycie głowy, okulary i krem z filtrem",
      "Woda i przekąski na długą drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje"
    ],
    "requirements": [
      "Trasa z Synaju jest krótsza, ale dzień nadal jest długi.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Potwierdzamy dostępność, godzinę odbioru, język przewodnika i ostateczną cenę. Nie pobieramy płatności online.",
    "featured": true,
    "faqs": [
      {
        "question": "W jakim języku mówi przewodnik?",
        "answer": "Język przewodnika na tej trasie potwierdzamy przed rezerwacją. Cała obsługa rezerwacji odbywa się po polsku."
      },
      {
        "question": "Co to jest GEM?",
        "answer": "Wielkie Muzeum Egipskie (Grand Egyptian Museum) - nowa, bardzo duża placówka przy Gizie, wpisana w program tej wycieczki."
      },
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci 5-11 lat: 60 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 93 USD od osoby."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Wycieczka z Sharm el Sheikh do Kairu | GEM i Piramidy",
      "description": "Wycieczka z Sharm el Sheikh do Kairu: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Cena od 93 USD, odbiór z hotelu, rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "kair-samolotem",
    "route": "/wycieczki-z-sharm-el-sheikh/kair-samolotem",
    "title": "Wycieczka samolotem do Kairu z Sharm el Sheikh",
    "h1": "Wycieczka samolotem do Kairu z Sharm el Sheikh - piramidy w Gizie i Wielkie Muzeum Egipskie (GEM)",
    "destination": "sharm-el-sheikh",
    "category": "kair",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Całodniowa wycieczka samolotem z Sharm el Sheikh do Kairu, która w jeden dzień łączy piramidy w Gizie, Sfinksa i Wielkie Muzeum Egipskie (GEM). Dla tych, którzy chcą zobaczyć najważniejsze zabytki bez wielogodzinnej jazdy autokarem.",
    "overview": "Zamiast długiej trasy autokarem do stolicy lecisz do Kairu samolotem, dzięki czemu cały program mieści się w jednym dniu. Przelot odbywa się na trasie Sharm el Sheikh-Kair-Sharm el Sheikh, a transfery między hotelem, lotniskiem i zwiedzanymi miejscami są po stronie organizatora.\n\nW programie znajdują się piramidy w Gizie i Sfinks oraz Wielkie Muzeum Egipskie (GEM) - najnowsza duża placówka gromadząca zbiory starożytnego Egiptu. Do tego dochodzi obiad w lokalnej restauracji (bez napojów).\n\nOpcjonalnie, jeśli pozwoli na to czas, można doliczyć rejs po Nilu i zakupy pamiątek. Opieka nad grupą należy do licencjonowanego przewodnika anglojęzycznego.",
    "heroImage": {
      "src": "/media/tours/s-kair-samolotem",
      "alt": "Wycieczka samolotem do Kairu z Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-kair-samolotem",
        "alt": "Wycieczka samolotem do Kairu z Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 299,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 299,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Soboty, poniedziałki i środy",
    "availabilityDays": [
      "Poniedziałek",
      "Środa",
      "Sobota"
    ],
    "durationLabel": "Całodniowa",
    "pickupLabel": "Wczesny poranek (zależnie od godziny lotu)",
    "transport": "Przelot samolotem Sharm el Sheikh-Kair-Sharm el Sheikh, transfery busem hotel-lotnisko",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Przelot do Kairu i z powrotem",
      "Piramidy w Gizie i Sfinks",
      "Wielkie Muzeum Egipskie (GEM)",
      "Obiad w lokalnej restauracji"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu i transfer na lotnisko",
        "description": "Poranny odbiór z hotelu w Sharm el Sheikh i przejazd na lotnisko na lot do Kairu."
      },
      {
        "title": "Przelot do Kairu",
        "description": "Lot z Sharm el Sheikh do Kairu, skracający dojazd do stolicy do kilkudziesięciu minut."
      },
      {
        "title": "Wielkie Muzeum Egipskie (GEM)",
        "description": "Zwiedzanie Wielkiego Muzeum Egipskiego z kolekcjami sztuki i zabytków starożytnego Egiptu."
      },
      {
        "title": "Piramidy w Gizie i Sfinks",
        "description": "Wejście na płaskowyż w Gizie z widokiem na piramidy oraz Sfinksa."
      },
      {
        "title": "Obiad",
        "description": "Obiad w lokalnej restauracji (bez napojów)."
      },
      {
        "title": "Opcjonalnie: rejs po Nilu i pamiątki",
        "description": "Jeśli pozwoli na to czas, możliwy dodatkowy rejs po Nilu oraz zakupy pamiątek."
      },
      {
        "title": "Przelot powrotny i transfer do hotelu",
        "description": "Lot z Kairu do Sharm el Sheikh i transfer busem z lotniska do hotelu."
      }
    ],
    "included": [
      "Lot Sharm el Sheikh-Kair-Sharm el Sheikh",
      "Transfery hotel-lotnisko-hotel",
      "Wstęp do Wielkiego Muzeum Egipskiego (GEM)",
      "Wstęp na płaskowyż piramid w Gizie",
      "Obiad w lokalnej restauracji (bez napojów)",
      "Opieka licencjonowanego przewodnika anglojęzycznego"
    ],
    "excluded": [
      "Napoje do obiadu",
      "Wydatki osobiste i zakupy pamiątek",
      "Opcjonalny rejs po Nilu",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Rejs po Nilu i zakupy pamiątek",
        "note": "opcjonalnie, jeśli pozwoli na to czas"
      }
    ],
    "whatToBring": [
      "Dokument tożsamości / paszport do odprawy",
      "Wygodne obuwie",
      "Nakrycie głowy i krem z filtrem UV",
      "Woda i gotówka na napoje oraz drobne wydatki"
    ],
    "requirements": [
      "Do odprawy na lot krajowy potrzebny jest dokument tożsamości lub paszport",
      "Godziny lotów i odbiór z hotelu potwierdzamy na WhatsApp"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna - godziny lotów, dostępność terminu i odbiór z hotelu potwierdzamy na WhatsApp. Nie pobieramy płatności online. W razie zmiany planów prosimy o kontakt z wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "W które dni odbywa się wycieczka?",
        "answer": "Terminy przypadają w soboty, poniedziałki i środy. Dostępność konkretnej daty potwierdzamy przy rezerwacji na WhatsApp."
      },
      {
        "question": "Co dokładnie obejmuje cena?",
        "answer": "W cenie 299 USD za osobę jest lot na trasie Sharm el Sheikh-Kair-Sharm el Sheikh, transfery, wstęp do GEM, wejście na płaskowyż w Gizie, obiad bez napojów oraz opieka licencjonowanego przewodnika anglojęzycznego."
      },
      {
        "question": "Czy potrzebny jest paszport?",
        "answer": "Do odprawy na lot krajowy należy mieć przy sobie dokument tożsamości lub paszport. Szczegóły potwierdzamy przed wyjazdem."
      },
      {
        "question": "Czy rejs po Nilu jest w cenie?",
        "answer": "Nie. Rejs po Nilu i zakupy pamiątek są opcjonalne i realizowane tylko wtedy, gdy pozwoli na to czas w programie."
      }
    ],
    "relatedPostSlug": "co-zabrac-na-wycieczke-do-kairu",
    "seo": {
      "title": "Kair samolotem z Sharm el Sheikh - piramidy i GEM",
      "description": "Całodniowa wycieczka samolotem do Kairu z Sharm el Sheikh: piramidy w Gizie, Sfinks i Wielkie Muzeum GEM. Cena 299 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/kair-samolotem/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "gora-mojzesza-klasztor-sw-katarzyny",
    "route": "/wycieczki-z-sharm-el-sheikh/gora-mojzesza-klasztor-sw-katarzyny",
    "title": "Góra Mojżesza i klasztor św. Katarzyny",
    "h1": "Wycieczka z Sharm el Sheikh na Górę Mojżesza i do klasztoru św. Katarzyny",
    "destination": "sharm-el-sheikh",
    "category": "synaj",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Nocna wyprawa z Sharm el Sheikh na Górę Mojżesza (Górę Synaj): wejście na szczyt, wschód słońca i zwiedzanie jednego z najstarszych klasztorów chrześcijańskich - św. Katarzyny.",
    "overview": "To wyjątkowa, nocna wyprawa dla osób szukających czegoś więcej niż plaża. Wieczorem wyruszasz z Sharm el Sheikh, nocą wchodzisz na Górę Mojżesza (Górę Synaj), a na szczycie witasz wschód słońca - jeden z najbardziej poruszających widoków w Egipcie.\n\nPo zejściu czeka śniadanie i zwiedzanie klasztoru św. Katarzyny, jednego z najstarszych czynnych klasztorów chrześcijańskich na świecie. Powrót do hotelu następuje zwykle około południa.",
    "heroImage": {
      "src": "/media/tours/s-gora-mojzesza-klasztor-sw-katarzyny",
      "alt": "Wschód słońca ze szczytu Góry Mojżesza na Synaju",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-gora-mojzesza-klasztor-sw-katarzyny",
        "alt": "Wschód słońca ze szczytu Góry Mojżesza na Synaju",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 35,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 35,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Niedziela, środa, piątek",
    "availabilityDays": [
      "Środa",
      "Piątek",
      "Niedziela"
    ],
    "durationLabel": "noc + poranek, powrót ok. południa",
    "pickupLabel": "Wieczorny wyjazd, do ustalenia",
    "transport": "Klimatyzowany autokar z Sharm el Sheikh i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Nocne wejście na Górę Mojżesza",
      "Wschód słońca na szczycie",
      "Klasztor św. Katarzyny",
      "Śniadanie po zejściu"
    ],
    "itinerary": [
      {
        "title": "Wieczorny wyjazd",
        "description": "Nocny transfer z hotelu w Sharm el Sheikh w kierunku Góry Mojżesza."
      },
      {
        "title": "Nocne wejście na szczyt",
        "description": "Wejście na Górę Mojżesza z lokalnym przewodnikiem."
      },
      {
        "title": "Wschód słońca",
        "description": "Powitanie wschodu słońca na szczycie góry."
      },
      {
        "title": "Zejście i śniadanie",
        "description": "Zejście z góry i śniadanie u jej podnóża."
      },
      {
        "title": "Klasztor św. Katarzyny",
        "description": "Zwiedzanie jednego z najstarszych klasztorów chrześcijańskich."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Droga powrotna autokarem, powrót zwykle ok. południa."
      }
    ],
    "included": [
      "Transport klimatyzowanym autokarem",
      "Wejście na Górę Mojżesza z lokalnym przewodnikiem",
      "Zwiedzanie klasztoru św. Katarzyny",
      "Śniadanie po zejściu"
    ],
    "excluded": [
      "Napoje",
      "Wynajem koca lub latarki",
      "Napiwki",
      "Wydatki własne"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Ciepła kurtka (noc na górze jest chłodna)",
      "Wygodne buty trekkingowe",
      "Latarka i woda",
      "Skromniejszy ubiór do klasztoru"
    ],
    "requirements": [
      "Wejście na szczyt wymaga sprawności fizycznej - to kilka godzin marszu.",
      "Wymagania przed wejściem i godzinę wyjazdu potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność w danym tygodniu i godzinę wyjazdu. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Jak trudne jest wejście na Górę Mojżesza?",
        "answer": "To kilkugodzinny nocny marsz. Nie wymaga wspinaczki, ale trzeba być w rozsądnej formie i mieć wygodne buty oraz ciepłe ubranie - na szczycie bywa zimno."
      },
      {
        "question": "W które dni odbywa się wyprawa?",
        "answer": "Zwykle w niedziele, środy i piątki. Dostępność w danym tygodniu potwierdzamy na WhatsApp."
      }
    ],
    "seo": {
      "title": "Góra Mojżesza i klasztor św. Katarzyny | Sharm",
      "description": "Nocna wyprawa z Sharm el Sheikh na Górę Mojżesza: wschód słońca i klasztor św. Katarzyny. Cena od 35 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/gora-mojzesza-klasztor-sw-katarzyny/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "blue-hole-kolorowy-kanion",
    "route": "/wycieczki-z-sharm-el-sheikh/blue-hole-kolorowy-kanion",
    "title": "Blue Hole i Kolorowy Kanion z Sharm el Sheikh",
    "h1": "Wycieczka z Sharm el Sheikh do Blue Hole i Kolorowego Kanionu",
    "destination": "sharm-el-sheikh",
    "category": "synaj",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Całodniowa wyprawa z Sharm el Sheikh do Dahab: snorkeling w słynnym Blue Hole, wizyta w Kolorowym Kanionie i pustynne krajobrazy Synaju. W cenie obiad i bilet do parku narodowego.",
    "overview": "Ta wycieczka łączy dwie ikony Synaju: Blue Hole i Kolorowy Kanion. Blue Hole to głęboka, turkusowa dziura w rafie koło Dahab - jedno z najbardziej znanych miejsc do snorkelingu i nurkowania na świecie. Kolorowy Kanion zachwyca warstwami skał w odcieniach żółci, czerwieni i fioletu.\n\nW programie jest też krótki city tour po Dahab, obiad w restauracji i czas na zdjęcia. Wyprawa trwa cały dzień, a opiekę na miejscu zapewnia anglojęzyczny przewodnik.",
    "heroImage": {
      "src": "/media/tours/s-blue-hole-kolorowy-kanion",
      "alt": "Turkusowa woda Blue Hole w Dahab z pustynnym wybrzeżem Synaju",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-blue-hole-kolorowy-kanion",
        "alt": "Turkusowa woda Blue Hole w Dahab z pustynnym wybrzeżem Synaju",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 41,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 41,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "całodniowa wycieczka",
    "pickupLabel": "Rano, do ustalenia",
    "transport": "Transfer klimatyzowanym busem z hotelu w Sharm el Sheikh do Dahab i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Blue Hole w Dahab",
      "Snorkeling przy rafie",
      "Kolorowy Kanion",
      "City tour po Dahab"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Sharm el Sheikh w kierunku Dahab."
      },
      {
        "title": "Blue Hole",
        "description": "Snorkeling przy słynnej rafie Blue Hole."
      },
      {
        "title": "Kolorowy Kanion",
        "description": "Spacer wśród wielobarwnych warstw skalnych na pustyni Synaj."
      },
      {
        "title": "Obiad i city tour",
        "description": "Obiad w restauracji w Dahab (bez napojów) i krótkie zwiedzanie miasteczka."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu wyprawy."
      }
    ],
    "included": [
      "Transport klimatyzowanym busem",
      "Opieka anglojęzycznego przewodnika",
      "Pobyt w Blue Hole",
      "Wizyta w Kolorowym Kanionie",
      "Obiad (bez napojów)",
      "Bilet wstępu do parku narodowego"
    ],
    "excluded": [
      "Napoje",
      "Sprzęt do nurkowania (opcja)",
      "Wydatki własne i pamiątki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy i ręcznik",
      "Wygodne buty na kanion",
      "Nakrycie głowy i krem z filtrem",
      "Gotówka na napoje i pamiątki"
    ],
    "requirements": [
      "Do snorkelingu przydają się podstawy pływania.",
      "Godzinę odbioru i program potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy dostępność i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": true,
    "faqs": [
      {
        "question": "Czy Blue Hole jest bezpieczne do snorkelingu?",
        "answer": "Snorkeling odbywa się przy powierzchni, wzdłuż rafy, i jest bezpieczny dla umiejących pływać. Blue Hole słynie z głębokości głównie w kontekście nurkowania, które nie jest częścią tej wyprawy."
      },
      {
        "question": "Co to jest Kolorowy Kanion?",
        "answer": "To wąwóz na pustyni Synaj o skałach w wielu odcieniach - żółci, czerwieni i fioletu. Spaceruje się jego dnem między wysokimi ścianami."
      }
    ],
    "seo": {
      "title": "Blue Hole i Kolorowy Kanion z Sharm el Sheikh",
      "description": "Całodniowa wycieczka z Sharm el Sheikh do Dahab: snorkeling w Blue Hole i Kolorowy Kanion. Obiad i bilet do parku w cenie, od 41 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/blue-hole-kolorowy-kanion/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "jordania-petra-morze-martwe",
    "route": "/wycieczki-z-sharm-el-sheikh/jordania-petra-morze-martwe",
    "title": "Wycieczka z Sharm el Sheikh do Jordanii - Petra i Morze Martwe",
    "h1": "Wycieczka z Sharm el Sheikh do Jordanii - Petra i Morze Martwe",
    "destination": "sharm-el-sheikh",
    "category": "miedzynarodowe",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Całodniowa wycieczka międzynarodowa z Sharm el Sheikh do Jordanii: rejs łodzią przez Morze Czerwone, zwiedzanie skalnej Petry i kąpiel w Morzu Martwym. Dla podróżnych, którzy chcą w jeden dzień odwiedzić drugi kraj.",
    "overview": "Wyprawa zaczyna się rejsem łodzią z Egiptu do Jordanii, a następnie prowadzi do Petry - wykutego w różowej skale antycznego miasta Nabatejczyków, wpisanego na listę światowego dziedzictwa. Po zwiedzaniu przewidziany jest obiad w lokalnej restauracji.\n\nDrugim punktem dnia jest Morze Martwe, gdzie dzięki wyjątkowemu zasoleniu można bez wysiłku utrzymać się na powierzchni wody. Po relaksie następuje powrót do Sharm el Sheikh.\n\nJest to wycieczka międzynarodowa, dlatego wymaga ważnego paszportu i dopełnienia formalności granicznych. Wymagane dokumenty potwierdzamy przy rezerwacji. Nad grupą czuwa przewodnik anglojęzyczny.",
    "heroImage": {
      "src": "/media/tours/s-jordania-petra-morze-martwe",
      "alt": "Wycieczka z Sharm el Sheikh do Jordanii - Petra i Morze Martwe - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-jordania-petra-morze-martwe",
        "alt": "Wycieczka z Sharm el Sheikh do Jordanii - Petra i Morze Martwe - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 255,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 255,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Wtorek-środa oraz piątek-sobota",
    "availabilityDays": [
      "Wtorek",
      "Środa",
      "Piątek",
      "Sobota"
    ],
    "durationLabel": "Całodniowa (wycieczka międzynarodowa)",
    "pickupLabel": "Wczesny poranek (godzina potwierdzana)",
    "transport": "Rejs łodzią z Egiptu do Jordanii, transfer busem z/do hotelu w Sharm el Sheikh",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rejs łodzią z Egiptu do Jordanii",
      "Petra - miasto wykute w skale",
      "Kąpiel w Morzu Martwym",
      "Obiad w lokalnej restauracji"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Poranny odbiór z hotelu w Sharm el Sheikh i przejazd do portu."
      },
      {
        "title": "Rejs do Jordanii",
        "description": "Przeprawa łodzią przez Morze Czerwone z Egiptu do Jordanii."
      },
      {
        "title": "Zwiedzanie Petry",
        "description": "Zwiedzanie antycznego miasta Petra, wykutego w różowej skale przez Nabatejczyków."
      },
      {
        "title": "Obiad",
        "description": "Obiad w lokalnej restauracji w trakcie programu."
      },
      {
        "title": "Morze Martwe",
        "description": "Relaks i kąpiel w Morzu Martwym, którego zasolenie pozwala bez trudu unosić się na wodzie."
      },
      {
        "title": "Powrót do Sharm el Sheikh",
        "description": "Powrót rejsem do Egiptu i transfer do hotelu w Sharm el Sheikh."
      }
    ],
    "included": [
      "Transfer z/do hotelu w Sharm el Sheikh",
      "Rejs łodzią z Egiptu do Jordanii i z powrotem",
      "Obiad w lokalnej restauracji",
      "Opieka przewodnika anglojęzycznego"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Ważny paszport",
      "Strój kąpielowy i ręcznik na Morze Martwe",
      "Wygodne obuwie na zwiedzanie Petry",
      "Nakrycie głowy, okulary i krem z filtrem UV",
      "Gotówka na napoje i drobne wydatki"
    ],
    "requirements": [
      "Wymagany ważny paszport - to podróż międzynarodowa do Jordanii",
      "Wymagane dokumenty i formalności graniczne potwierdzamy przy rezerwacji na WhatsApp"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna - wymagane dokumenty, dostępność terminu i godzinę odbioru z hotelu potwierdzamy na WhatsApp. Nie pobieramy płatności online. Ze względu na charakter międzynarodowy prosimy o kontakt z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy potrzebny jest paszport?",
        "answer": "Tak. To wycieczka międzynarodowa do Jordanii, dlatego wymagany jest ważny paszport. Wymagane dokumenty i formalności potwierdzamy przy rezerwacji na WhatsApp."
      },
      {
        "question": "W które dni odbywa się wyjazd?",
        "answer": "Terminy przypadają w dni wtorek-środa oraz piątek-sobota. Dostępność konkretnej daty potwierdzamy indywidualnie."
      },
      {
        "question": "Jak dociera się do Jordanii?",
        "answer": "Trasa z Egiptu do Jordanii pokonywana jest łodzią przez Morze Czerwone, a transfer z hotelu i z powrotem realizowany jest busem."
      },
      {
        "question": "Co obejmuje cena?",
        "answer": "Cena 255 USD za osobę obejmuje transfer z/do hotelu w Sharm el Sheikh, obiad oraz opiekę przewodnika anglojęzycznego. Napoje i wydatki osobiste są dodatkowo płatne."
      }
    ],
    "seo": {
      "title": "Petra i Morze Martwe z Sharm el Sheikh - Jordania",
      "description": "Wycieczka z Sharm el Sheikh do Jordanii: Petra, Morze Martwe, rejs łodzią i obiad. 255 USD/os., wymagany paszport.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/jordania-petra-morze-martwe/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "white-island-ras-mohamed",
    "route": "/wycieczki-z-sharm-el-sheikh/white-island-ras-mohamed",
    "title": "Rejs na White Island i Ras Mohamed z nurkowaniem z butlą",
    "h1": "Rejs na White Island i Ras Mohamed z nurkowaniem z butlą (Sharm el Sheikh)",
    "destination": "sharm-el-sheikh",
    "category": "rejsy-wyspy",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Całodniowy rejs łodzią z Sharm el Sheikh na White Island (Białą Wyspę) i do Parku Narodowego Ras Mohamed, z dwoma postojami na snorkeling i jednym nurkowaniem intro z butlą pod opieką licencjonowanego instruktora. Lunch i napoje bez ograniczeń w cenie.",
    "overview": "Rejs prowadzi komfortową łodzią do White Island, czyli Białej Wyspy - piaszczystej łachy wyłaniającej się z morza - oraz do Parku Narodowego Ras Mohamed, jednego z najlepszych miejsc nurkowych regionu.\n\nW programie są dwa postoje na snorkeling oraz jedno nurkowanie intro z butlą, prowadzone pod opieką licencjonowanego instruktora, dzięki czemu spróbują go także osoby bez doświadczenia. Na pokładzie zapewniony jest lunch oraz napoje bez ograniczeń, a sprzęt do nurkowania jest w cenie.\n\nWycieczka trwa cały dzień i jest dostępna codziennie według dostępności. Transfer z hotelu i z powrotem oraz opieka załogi i instruktorów są po stronie organizatora.",
    "heroImage": {
      "src": "/media/tours/s-white-island-ras-mohamed",
      "alt": "Rejs na White Island i Ras Mohamed z nurkowaniem z butlą - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-white-island-ras-mohamed",
        "alt": "Rejs na White Island i Ras Mohamed z nurkowaniem z butlą - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 47,
      "unit": "os.",
      "currency": "USD",
      "from": false,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 47,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie (według dostępności)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "Całodniowa (wycieczka morska)",
    "pickupLabel": "Poranek (godzina potwierdzana)",
    "transport": "Rejs komfortową łodzią, transfer busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "White Island (Biała Wyspa)",
      "Park Narodowy Ras Mohamed",
      "2 postoje na snorkeling",
      "Nurkowanie intro z butlą",
      "Lunch i napoje bez ograniczeń"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu i transfer do portu",
        "description": "Poranny odbiór z hotelu w Sharm el Sheikh i przejazd do portu na zaokrętowanie."
      },
      {
        "title": "Rejs na White Island",
        "description": "Rejs komfortową łodzią do White Island, czyli piaszczystej Białej Wyspy pośród morza."
      },
      {
        "title": "Pierwszy snorkeling",
        "description": "Pierwszy postój na snorkeling nad rafami w rejonie wyspy."
      },
      {
        "title": "Park Narodowy Ras Mohamed",
        "description": "Rejs do Ras Mohamed, jednego z najlepszych akwenów nurkowych w regionie."
      },
      {
        "title": "Nurkowanie intro z butlą",
        "description": "Jedno nurkowanie intro z butlą pod opieką licencjonowanego instruktora - również dla początkujących."
      },
      {
        "title": "Drugi snorkeling i lunch",
        "description": "Kolejny postój na snorkeling oraz lunch i napoje bez ograniczeń na pokładzie."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Powrót rejsem do portu i transfer busem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Rejs komfortową łodzią",
      "Lunch na pokładzie",
      "Napoje bez ograniczeń",
      "Sprzęt do nurkowania",
      "Nurkowanie intro z butlą pod opieką licencjonowanego instruktora",
      "2 postoje na snorkeling",
      "Opieka załogi i instruktorów"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napiwki"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne",
      "Nakrycie głowy"
    ],
    "requirements": [
      "Zalecana umiejętność pływania",
      "Nurkowanie intro odbywa się pod opieką licencjonowanego instruktora i nie wymaga certyfikatu"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna - dostępność terminu, godzinę odbioru i program rejsu potwierdzamy na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": true,
    "faqs": [
      {
        "question": "Czy nurkowanie z butlą wymaga doświadczenia?",
        "answer": "Nie. Nurkowanie intro z butlą prowadzone jest pod opieką licencjonowanego instruktora, więc mogą w nim wziąć udział także osoby bez wcześniejszego doświadczenia."
      },
      {
        "question": "Co jest w cenie na łodzi?",
        "answer": "W cenie jest lunch na pokładzie oraz napoje bez ograniczeń, a także sprzęt do nurkowania i opieka załogi oraz instruktorów."
      },
      {
        "question": "Ile trwa wycieczka?",
        "answer": "To wycieczka całodniowa, dostępna codziennie według dostępności. Godzinę odbioru z hotelu potwierdzamy przy rezerwacji."
      },
      {
        "question": "Czym jest White Island?",
        "answer": "White Island, czyli Biała Wyspa, to piaszczysta łacha wyłaniająca się z morza w rejonie Ras Mohamed - jeden z głównych punktów rejsu obok postojów na snorkeling."
      }
    ],
    "seo": {
      "title": "White Island i Ras Mohamed z Sharm el Sheikh - rejs",
      "description": "Całodniowy rejs z Sharm el Sheikh na White Island i Ras Mohamed: snorkeling, nurkowanie intro z butlą, lunch i napoje. 47 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/white-island-ras-mohamed/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "ras-mohamed-snorkeling",
    "route": "/wycieczki-z-sharm-el-sheikh/ras-mohamed-snorkeling",
    "title": "Wycieczka do Ras Mohamed z Sharm el Sheikh",
    "h1": "Wycieczka do Ras Mohamed - podwodny raj i cuda natury",
    "destination": "sharm-el-sheikh",
    "category": "rejsy-wyspy",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Wycieczka z Sharm el Sheikh do Parku Narodowego Ras Mohamed ze snorkelingiem nad rafami oraz przystankami przy Earthquake Hole, Magicznym Jeziorze i gajach namorzynowych. Rodzinna propozycja na pół dnia z transferem busem.",
    "overview": "Ras Mohamed to jeden z najbardziej znanych parków narodowych Egiptu, położony na południowym krańcu Synaju. Program obejmuje snorkeling z plaży El Suez oraz w samym Ras Mohamed, gdzie rafy koralowe i mnogość ryb należą do najlepszych w regionie.\n\nOprócz podwodnego świata odwiedzasz Earthquake Hole (Zatopioną Szczelinę) powstałą po trzęsieniu ziemi, Magiczne Jezioro o intensywnie turkusowej barwie oraz gaje namorzynowe - miejsce, gdzie roślinność pustyni spotyka się z morzem.\n\nWyjazd z hotelu następuje około 8:00-9:00, a powrót około 13:00. Do miejsca dowozi klimatyzowany bus, a nad grupą czuwa przewodnik anglojęzyczny. To wygodna opcja także dla rodzin z dziećmi.",
    "heroImage": {
      "src": "/media/tours/s-ras-mohamed-snorkeling",
      "alt": "Wycieczka do Ras Mohamed z Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-ras-mohamed-snorkeling",
        "alt": "Wycieczka do Ras Mohamed z Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 28,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 28,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 18,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Według dostępności",
    "availabilityDays": [
      ""
    ],
    "durationLabel": "ok. 5 godzin (8:00-13:00)",
    "pickupLabel": "Poranek, ok. 8:00-9:00",
    "returnLabel": "ok. 13:00",
    "transport": "Transfer klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Snorkeling w Parku Narodowym Ras Mohamed",
      "Earthquake Hole (Zatopiona Szczelina)",
      "Magiczne Jezioro",
      "Gaje namorzynowe"
    ],
    "itinerary": [
      {
        "time": "8:00-9:00",
        "title": "Odbiór z hotelu",
        "description": "Poranny odbiór z hotelu i przejazd klimatyzowanym busem w kierunku Ras Mohamed."
      },
      {
        "title": "Snorkeling z plaży El Suez",
        "description": "Pierwsze zanurzenie z maską i fajką w czystych wodach Morza Czerwonego przy plaży El Suez."
      },
      {
        "title": "Snorkeling w Ras Mohamed",
        "description": "Pływanie nad kolorowymi rafami koralowymi w jednym z najlepszych miejsc do snorkelingu w regionie."
      },
      {
        "title": "Earthquake Hole",
        "description": "Postój przy Zatopionej Szczelinie powstałej w wyniku trzęsienia ziemi - dobre miejsce na zdjęcia."
      },
      {
        "title": "Magiczne Jezioro i gaje namorzynowe",
        "description": "Widok na słone jezioro o turkusowej barwie oraz przystanek przy gajach namorzynowych."
      },
      {
        "time": "13:00",
        "title": "Powrót do hotelu",
        "description": "Powrót busem do hotelu w okolicach godziny 13:00."
      }
    ],
    "included": [
      "Transfer klimatyzowanym busem",
      "Opieka przewodnika anglojęzycznego"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje",
      "Wypożyczenie sprzętu do snorkelingu"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Sprzęt do snorkelingu",
        "note": "możliwość wypożyczenia za dodatkową opłatą"
      }
    ],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Obuwie do wody",
      "Woda do picia"
    ],
    "requirements": [
      "Zalecana umiejętność pływania",
      "Własny sprzęt do snorkelingu lub wypożyczenie na miejscu za dopłatą"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia terminu oraz godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 18 USD, a dzieci do 5 lat wchodzą bezpłatnie. Cena dla osoby dorosłej to 28 USD."
      },
      {
        "question": "O której wracamy do hotelu?",
        "answer": "Wyjazd z hotelu przypada na około 8:00-9:00, a powrót około 13:00, więc wycieczka zajmuje mniej więcej pół dnia."
      },
      {
        "question": "Czy sprzęt do snorkelingu jest w cenie?",
        "answer": "Nie. Sprzęt do snorkelingu nie jest wliczony, ale można go wypożyczyć na miejscu za dodatkową opłatą lub zabrać własny."
      },
      {
        "question": "Czy wycieczka nadaje się dla rodzin?",
        "answer": "Tak. Program obejmuje spokojny snorkeling i widokowe przystanki, a dla dzieci obowiązuje niższa cena, co czyni ją wygodną propozycją rodzinną."
      }
    ],
    "seo": {
      "title": "Ras Mohamed z Sharm el Sheikh - snorkeling i natura",
      "description": "Wycieczka do Parku Narodowego Ras Mohamed z Sharm el Sheikh: snorkeling, Magiczne Jezioro i Earthquake Hole. Od 28 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/ras-mohamed-snorkeling/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-tiran-snorkeling",
    "route": "/wycieczki-z-sharm-el-sheikh/wyspa-tiran-snorkeling",
    "title": "Wyspa Tiran z Sharm el Sheikh",
    "h1": "Wycieczka z Sharm el Sheikh - Wyspa Tiran",
    "destination": "sharm-el-sheikh",
    "category": "rejsy-wyspy",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Rejs łodzią z Sharm el Sheikh na Wyspę Tiran z dwiema sesjami snorkelingu nad rafami koralowymi, z obiadem i napojami na pokładzie. Rodzinna wycieczka morska z niższą ceną dla dzieci.",
    "overview": "Wyspa Tiran to jedno z najbardziej znanych miejsc do snorkelingu w okolicach Sharm el Sheikh, słynące z kolorowych raf koralowych i przejrzystej wody. W programie są dwie sesje snorkelingu w najciekawszych miejscach wokół wyspy.\n\nNa pokładzie zapewniony jest obiad oraz napoje, a transfer z hotelu i z powrotem jest w cenie. Nad grupą czuwa przewodnik anglojęzyczny. Sprzęt do snorkelingu można wypożyczyć za dodatkową opłatą.\n\nWycieczka odbywa się codziennie i sprawdza się jako spokojny dzień na wodzie dla całej rodziny - dla dzieci obowiązują niższe ceny.",
    "heroImage": {
      "src": "/media/tours/s-wyspa-tiran-snorkeling",
      "alt": "Wyspa Tiran z Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-wyspa-tiran-snorkeling",
        "alt": "Wyspa Tiran z Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 38,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 38,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 23,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rejs na Wyspę Tiran",
      "2 sesje snorkelingu",
      "Kolorowe rafy koralowe",
      "Obiad i napoje na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór i transfer do portu",
        "description": "Odbiór z hotelu i przejazd do portu, gdzie zaczyna się rejs."
      },
      {
        "title": "Rejs na Wyspę Tiran",
        "description": "Rejs łodzią w rejon Wyspy Tiran, znanej z rozległych raf koralowych."
      },
      {
        "title": "Pierwszy snorkeling",
        "description": "Pierwsza sesja snorkelingu nad kolorowymi rafami wokół wyspy."
      },
      {
        "title": "Drugi snorkeling",
        "description": "Kolejny postój na snorkeling w innym miejscu przy wyspie."
      },
      {
        "title": "Obiad na łodzi",
        "description": "Obiad i napoje na pokładzie w trakcie rejsu."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Rejs do portu i transfer z powrotem do hotelu."
      }
    ],
    "included": [
      "Transfer z/do hotelu",
      "Opieka przewodnika anglojęzycznego",
      "2 sesje snorkelingu",
      "Obiad i napoje na łodzi"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Wypożyczenie sprzętu do snorkelingu",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Sprzęt do snorkelingu",
        "note": "możliwość wypożyczenia za dodatkową opłatą"
      }
    ],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [
      "Zalecana umiejętność pływania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia terminu oraz godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 23 USD, a dzieci do 5 lat podróżują gratis. Cena dla osoby dorosłej to 38 USD."
      },
      {
        "question": "Ile jest sesji snorkelingu?",
        "answer": "W programie są dwie sesje snorkelingu na kolorowych rafach koralowych wokół Wyspy Tiran."
      },
      {
        "question": "Czy na łodzi jest posiłek?",
        "answer": "Tak. Obiad oraz napoje na pokładzie są wliczone w cenę wycieczki."
      },
      {
        "question": "Czy trzeba mieć własny sprzęt do snorkelingu?",
        "answer": "Nie jest to konieczne. Sprzęt można wypożyczyć na miejscu za dodatkową opłatą lub zabrać własny."
      }
    ],
    "seo": {
      "title": "Wyspa Tiran z Sharm el Sheikh - rejs i snorkeling",
      "description": "Rejs na Wyspę Tiran z Sharm el Sheikh: 2x snorkeling na rafach, obiad i napoje na łodzi. Od 38 USD/os., dzieci taniej.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/wyspa-tiran-snorkeling/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "wyspa-tiran-nurkowanie",
    "route": "/wycieczki-z-sharm-el-sheikh/wyspa-tiran-nurkowanie",
    "title": "Wyspa Tiran z Sharm el Sheikh - z nurkowaniem",
    "h1": "Wycieczka z Sharm el Sheikh - Wyspa Tiran z nurkowaniem",
    "destination": "sharm-el-sheikh",
    "category": "nurkowanie",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Rejs z Sharm el Sheikh na Wyspę Tiran z dwoma sesjami snorkelingu i jednym nurkowaniem intro z butlą (ok. 15 min) w cenie. Dla osób, które chcą połączyć pływanie nad rafami z pierwszym zanurzeniem, z obiadem na łodzi.",
    "overview": "Wyspa Tiran leży u wejścia do Zatoki Akaba i słynie z rozległych raf koralowych. W programie są dwie sesje snorkelingu w najciekawszych miejscach wokół wyspy oraz jedno nurkowanie intro z butlą trwające około 15 minut - wliczone w cenę.\n\nNa pokładzie zapewniony jest obiad i napoje, a sprzęt do nurkowania i snorkelingu jest w cenie. Do portu dowozi klimatyzowany bus spod hotelu, a nad grupą czuwa przewodnik anglojęzyczny.\n\nWycieczka odbywa się codziennie i sprawdza się zarówno przy pierwszym kontakcie z butlą, jak i dla osób, które chcą po prostu popływać nad kolorowymi rafami.",
    "heroImage": {
      "src": "/media/tours/s-wyspa-tiran-nurkowanie",
      "alt": "Wyspa Tiran z Sharm el Sheikh - z nurkowaniem - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-wyspa-tiran-nurkowanie",
        "alt": "Wyspa Tiran z Sharm el Sheikh - z nurkowaniem - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 49,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 49,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Rejs łodzią, transfer klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Rejs na Wyspę Tiran",
      "2 sesje snorkelingu",
      "Nurkowanie intro z butlą (ok. 15 min)",
      "Obiad i napoje na łodzi"
    ],
    "itinerary": [
      {
        "title": "Odbiór i transfer do portu",
        "description": "Przejazd klimatyzowanym busem spod hotelu do portu i zaokrętowanie na łódź."
      },
      {
        "title": "Rejs na Wyspę Tiran",
        "description": "Rejs w rejon Wyspy Tiran, znanej z rozległych raf koralowych."
      },
      {
        "title": "Pierwszy snorkeling",
        "description": "Pierwsze zanurzenie z maską i fajką nad rafami wokół wyspy."
      },
      {
        "title": "Nurkowanie intro z butlą",
        "description": "Jedno krótkie nurkowanie z butlą trwające około 15 minut, wliczone w cenę."
      },
      {
        "title": "Drugi snorkeling",
        "description": "Kolejna sesja snorkelingu w innym miejscu wokół wyspy."
      },
      {
        "title": "Obiad na łodzi i powrót",
        "description": "Obiad i napoje na pokładzie, następnie rejs do portu i transfer do hotelu."
      }
    ],
    "included": [
      "Transfer klimatyzowanym busem",
      "Opieka przewodnika anglojęzycznego",
      "2 sesje snorkelingu",
      "Nurkowanie intro z butlą (ok. 15 min)",
      "Obiad i napoje na łodzi",
      "Sprzęt do nurkowania i snorkelingu"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje dodatkowe"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Strój kąpielowy",
      "Ręcznik",
      "Krem z filtrem UV",
      "Okulary przeciwsłoneczne"
    ],
    "requirements": [
      "Zalecana umiejętność pływania",
      "Nurkowanie intro odbywa się pod opieką i nie wymaga certyfikatu"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia terminu oraz godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy nurkowanie z butlą wymaga uprawnień?",
        "answer": "Nie. Jedno nurkowanie intro z butlą (ok. 15 min) jest wliczone w cenę i odbywa się pod opieką, więc nie trzeba mieć certyfikatu."
      },
      {
        "question": "Ile sesji snorkelingu jest w programie?",
        "answer": "W programie są dwie sesje snorkelingu w najciekawszych miejscach wokół Wyspy Tiran, a sprzęt do snorkelingu i nurkowania jest w cenie."
      },
      {
        "question": "Czy jest posiłek na łodzi?",
        "answer": "Tak. Na pokładzie zapewniony jest obiad oraz napoje. Dodatkowe napoje i zakupy własne są płatne osobno."
      },
      {
        "question": "Kiedy odbywa się wycieczka?",
        "answer": "Rejs na Wyspę Tiran odbywa się codziennie. Konkretny termin i godzinę odbioru potwierdzamy przy rezerwacji."
      }
    ],
    "seo": {
      "title": "Wyspa Tiran z Sharm el Sheikh - snorkeling i nurkowanie",
      "description": "Rejs na Wyspę Tiran z Sharm el Sheikh: 2x snorkeling i nurkowanie intro z butlą, obiad na łodzi. Od 49 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/wyspa-tiran-nurkowanie/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "dolphin-show",
    "route": "/wycieczki-z-sharm-el-sheikh/dolphin-show",
    "title": "Pokaz delfinów w Sharm el Sheikh",
    "h1": "Dolphin Show - pokaz delfinów w Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "atrakcje",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Około półtoragodzinny pokaz z udziałem delfinów, fok i krów morskich w Sharm el Sheikh, z transportem klimatyzowanym busem. Rodzinna atrakcja dla dzieci i dorosłych; chętni mogą dokupić pływanie z delfinami.",
    "overview": "Pokaz delfinów w Sharm el Sheikh to widowisko, w którym oprócz delfinów występują także foki i krowy morskie. Program trwa około 1,5 godziny i łączy tresurę, sztuczki oraz bliski kontakt ze zwierzętami.\n\nTo atrakcja odpowiednia dla całej rodziny - zarówno dla dzieci, jak i dorosłych. W cenie znajduje się transport klimatyzowanym busem oraz bilet wstępu na pokaz.\n\nDla chętnych dostępna jest dodatkowo płatna opcja 15 minut pływania z delfinami. Pokaz odbywa się codziennie.",
    "heroImage": {
      "src": "/media/tours/s-dolphin-show",
      "alt": "Pokaz delfinów w Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-dolphin-show",
        "alt": "Pokaz delfinów w Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 25,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 14,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 1,5 godziny (sam pokaz)",
    "pickupLabel": "Do ustalenia",
    "transport": "Transport klimatyzowanym busem z/do hotelu",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Pokaz delfinów",
      "Foki i krowy morskie",
      "ok. 1,5 godziny",
      "Atrakcja rodzinna"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Odbiór z hotelu klimatyzowanym busem i przejazd na miejsce pokazu."
      },
      {
        "title": "Pokaz",
        "description": "Około 1,5-godzinny pokaz z udziałem delfinów, fok i krów morskich."
      },
      {
        "title": "Pływanie z delfinami (opcjonalnie)",
        "description": "Chętni mogą dokupić 15 minut pływania z delfinami."
      },
      {
        "title": "Powrót",
        "description": "Transfer powrotny do hotelu po zakończeniu pokazu."
      }
    ],
    "included": [
      "Transport klimatyzowanym busem",
      "Bilet wstępu na pokaz"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste i zakupy",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Pływanie z delfinami (15 minut)",
        "note": "ok. 85 USD/osoba, płatne dodatkowo"
      }
    ],
    "whatToBring": [
      "Aparat lub telefon",
      "Nakrycie głowy",
      "Gotówka na zdjęcia i napoje"
    ],
    "requirements": [
      "Pokaz odpowiedni dla dzieci i dorosłych"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za bilet płacisz na miejscu w dniu wyjazdu. Termin możesz bezpłatnie zmienić lub odwołać z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa pokaz?",
        "answer": "Pokaz trwa około 1,5 godziny."
      },
      {
        "question": "Ile kosztuje bilet dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 14 USD, a dzieci do 5 lat wchodzą bezpłatnie."
      },
      {
        "question": "Czy można popływać z delfinami?",
        "answer": "Tak, dostępna jest dodatkowo płatna opcja 15 minut pływania z delfinami w cenie około 85 USD od osoby."
      },
      {
        "question": "Czy transport jest w cenie?",
        "answer": "Tak, w cenie znajduje się transport klimatyzowanym busem oraz bilet wstępu na pokaz."
      }
    ],
    "seo": {
      "title": "Pokaz delfinów w Sharm el Sheikh - Dolphin Show",
      "description": "Pokaz delfinów, fok i krów morskich w Sharm el Sheikh, ok. 1,5 godziny, transport w cenie. Codziennie. Cena od 25 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/dolphin-show/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "lodz-seascope",
    "route": "/wycieczki-z-sharm-el-sheikh/lodz-seascope",
    "title": "Łódź półpodwodna Seascope w Sharm el Sheikh",
    "h1": "Wycieczka łodzią półpodwodną Seascope w Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "atrakcje",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Około dwugodzinny rejs łodzią półpodwodną Seascope w Sharm el Sheikh z obserwacją raf koralowych przez panoramiczne okna pod wodą - bez konieczności nurkowania. Dobra propozycja dla rodzin, par i dzieci.",
    "overview": "Seascope to łódź półpodwodna, która pozwala oglądać rafy koralowe i podwodny świat Morza Czerwonego bez wchodzenia do wody. Podczas około dwugodzinnego rejsu obserwuje się rafy i ryby przez panoramiczne okna umieszczone pod powierzchnią wody.\n\nTo wygodny sposób na poznanie podwodnego świata dla osób, które nie chcą lub nie mogą nurkować, a także dla dzieci. W cenie znajduje się transport klimatyzowanym busem oraz sam rejs łodzią Seascope.\n\nWycieczka sprawdzi się dla rodzin i par, które chcą zobaczyć rafy Morza Czerwonego w komfortowych warunkach.",
    "heroImage": {
      "src": "/media/tours/s-lodz-seascope",
      "alt": "Łódź półpodwodna Seascope w Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-lodz-seascope",
        "alt": "Łódź półpodwodna Seascope w Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 38,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 38,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 20,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Według dostępności",
    "availabilityDays": [
      ""
    ],
    "durationLabel": "ok. 2 godziny (rejs)",
    "pickupLabel": "Do ustalenia",
    "transport": "Transport klimatyzowanym busem; rejs łodzią półpodwodną Seascope",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Łódź półpodwodna Seascope",
      "Rafy przez panoramiczne okna",
      "Bez nurkowania",
      "ok. 2 godziny"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transport klimatyzowanym busem z hotelu do portu."
      },
      {
        "title": "Wejście na łódź",
        "description": "Wejście na pokład łodzi półpodwodnej Seascope."
      },
      {
        "title": "Rejs z obserwacją raf",
        "description": "Około 2-godzinny rejs z podziwianiem raf i ryb przez panoramiczne okna pod wodą."
      },
      {
        "title": "Powrót",
        "description": "Transfer powrotny do hotelu po zakończeniu rejsu."
      }
    ],
    "included": [
      "Transport klimatyzowanym busem",
      "Rejs łodzią półpodwodną Seascope"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste i zakupy",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Aparat lub telefon",
      "Okulary przeciwsłoneczne",
      "Nakrycie głowy",
      "Gotówka na dodatkowe wydatki"
    ],
    "requirements": [
      "Nie wymaga umiejętności pływania ani nurkowania"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do potwierdzenia na WhatsApp. Nie pobieramy płatności online - za wycieczkę płacisz na miejscu w dniu wyjazdu. Termin możesz bezpłatnie zmienić lub odwołać z odpowiednim wyprzedzeniem.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy trzeba umieć pływać?",
        "answer": "Nie, rejs odbywa się na pokładzie łodzi półpodwodnej i nie wymaga pływania ani nurkowania."
      },
      {
        "question": "Ile trwa rejs?",
        "answer": "Rejs trwa około 2 godziny."
      },
      {
        "question": "Ile kosztuje bilet dla dziecka?",
        "answer": "Dzieci w wieku 5-11 lat płacą 20 USD, a dzieci do 5 lat wchodzą bezpłatnie."
      },
      {
        "question": "Jak ogląda się rafy?",
        "answer": "Rafy i ryby obserwuje się przez panoramiczne okna umieszczone pod powierzchnią wody."
      }
    ],
    "seo": {
      "title": "Łódź półpodwodna Seascope w Sharm el Sheikh",
      "description": "Rejs łodzią półpodwodną Seascope w Sharm el Sheikh: rafy przez okna pod wodą, bez nurkowania, ok. 2 godziny. Cena od 38 USD/os.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/lodz-seascope/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "parasailing",
    "route": "/wycieczki-z-sharm-el-sheikh/parasailing",
    "title": "Parasailing w Sharm el Sheikh",
    "h1": "Parasailing w Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "atrakcje",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Lot na spadochronie holowanym za motorówką nad Morzem Czerwonym, z odbiorem busem z hotelu w Sharm el Sheikh. Krótka atrakcja dla ceniących adrenalinę i widoki z lotu ptaka - dostępna solo lub w dwie osoby.",
    "overview": "Parasailing to lot na spadochronie holowanym za motorówką: unosisz się nad taflą Morza Czerwonego i patrzysz z góry na rafy, zatoki oraz panoramę Sharm el Sheikh. Sam lot trwa około 7-10 minut.\n\nAtrakcję można wykupić jako lot pojedynczy albo lot we dwoje, przy czym dla wariantu dwuosobowego obowiązuje limit łącznej wagi 140 kg. Do miejsca startu dowozi klimatyzowany bus spod hotelu.\n\nTo propozycja na kilka godzin, a nie na cały dzień - dobra jako dodatek do pobytu nad morzem lub sposób na mocne wrażenia i efektowne zdjęcia.",
    "heroImage": {
      "src": "/media/tours/s-parasailing",
      "alt": "Parasailing w Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-parasailing",
        "alt": "Parasailing w Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 37,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Lot pojedynczy (1 osoba)",
          "amount": 37,
          "currency": "USD"
        },
        {
          "label": "Lot we dwoje (razem maks. 140 kg)",
          "amount": 60,
          "currency": "USD",
          "unit": "za 2 os."
        }
      ]
    },
    "availabilityLabel": "Według dostępności",
    "availabilityDays": [
      ""
    ],
    "durationLabel": "Lot ok. 7-10 minut",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer klimatyzowanym busem, lot na spadochronie holowanym za motorówką",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Lot na spadochronie za motorówką",
      "Widok na Morze Czerwone z góry",
      "Panorama Sharm el Sheikh",
      "Lot solo lub we dwoje"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Przejazd klimatyzowanym busem spod hotelu do bazy parasailingu nad morzem."
      },
      {
        "title": "Lot na spadochronie",
        "description": "Lot holowany za motorówką nad Morzem Czerwonym, trwający około 7-10 minut - solo lub w dwie osoby (do 140 kg łącznie)."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer busem z powrotem do hotelu po zakończeniu lotu."
      }
    ],
    "included": [
      "Transfer klimatyzowanym busem",
      "Lot na spadochronie holowanym za motorówką"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje",
      "Zdjęcia wykonywane przez fotografa"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Zdjęcia od fotografa",
        "note": "opcjonalnie, płatne dodatkowo"
      }
    ],
    "whatToBring": [
      "Strój kąpielowy",
      "Okulary przeciwsłoneczne",
      "Krem z filtrem UV",
      "Ręcznik"
    ],
    "requirements": [
      "Dla wariantu we dwoje obowiązuje limit łącznej wagi 140 kg"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia terminu oraz godziny na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa lot?",
        "answer": "Sam lot na spadochronie trwa około 7-10 minut. Do tego doliczyć trzeba czas dojazdu busem i przygotowania na miejscu."
      },
      {
        "question": "Czy można lecieć we dwoje?",
        "answer": "Tak. Dostępny jest wariant lotu we dwoje za 60 USD za dwie osoby, z limitem łącznej wagi 140 kg. Lot pojedynczy kosztuje 37 USD."
      },
      {
        "question": "Skąd startuje wycieczka?",
        "answer": "Odbiór odbywa się z hotelu w Sharm el Sheikh, skąd klimatyzowany bus dowozi do bazy parasailingu nad morzem."
      },
      {
        "question": "Czy zdjęcia są w cenie?",
        "answer": "Nie. Zdjęcia wykonywane przez fotografa są dodatkowo płatne i nie wchodzą w cenę lotu."
      }
    ],
    "seo": {
      "title": "Parasailing Sharm el Sheikh - lot nad Morzem Czerwonym",
      "description": "Parasailing w Sharm el Sheikh od 37 USD/os. Lot 7-10 min nad Morzem Czerwonym, transfer busem. Dostepny solo lub we dwoje.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/parasailing/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-3h",
    "route": "/wycieczki-z-sharm-el-sheikh/quad-safari-3h",
    "title": "Quad safari z Sharm el Sheikh",
    "h1": "Quad safari z Sharm el Sheikh - wycieczka na pustynię Synaj",
    "destination": "sharm-el-sheikh",
    "category": "safari",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Krótka pustynna przygoda na quadach z Sharm el Sheikh: jazda po pustyni Synaj, tradycyjna herbata beduińska i krótka przejażdżka na wielbłądzie. Dobra opcja na poranek lub popołudnie.",
    "overview": "To najkrótszy sposób, by poczuć pustynię Synaj bez rezerwowania całego dnia. Prowadzisz quada po piaszczystych szlakach, zatrzymujesz się na tradycyjną herbatę beduińską i odbywasz krótką przejażdżkę na wielbłądzie.\n\nWyprawa trwa około dwóch godzin i dostępna jest rano lub po południu. W cenie są transfer z hotelu, jazda quadem i opieka instruktora.",
    "heroImage": {
      "src": "/media/tours/s-quad-safari-3h",
      "alt": "Quady na pustyni Synaj pod Sharm el Sheikh",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-quad-safari-3h",
        "alt": "Quady na pustyni Synaj pod Sharm el Sheikh",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 25,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Quad pojedynczy (1 osoba)",
          "amount": 25,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie (poranek lub popołudnie)",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 2 godziny",
    "pickupLabel": "Poranek lub popołudnie, do ustalenia",
    "transport": "Transfer z hotelu w Sharm el Sheikh na pustynię i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda quadem",
      "Pustynia Synaj",
      "Herbata beduińska",
      "Krótka jazda na wielbłądzie"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer z hotelu w Sharm el Sheikh na pustynię."
      },
      {
        "title": "Jazda quadem",
        "description": "Przejażdżka quadem po pustynnych krajobrazach Synaju z instruktorem."
      },
      {
        "title": "Herbata beduińska",
        "description": "Postój na tradycyjną herbatę i chwilę odpoczynku."
      },
      {
        "title": "Jazda na wielbłądzie",
        "description": "Krótka przejażdżka na wielbłądzie."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu wyprawy."
      }
    ],
    "included": [
      "Transfer z hotelu i z powrotem",
      "Jazda quadem po pustyni",
      "Herbata beduińska",
      "Krótka jazda na wielbłądzie",
      "Opieka instruktora"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste",
      "Zdjęcia u fotografa",
      "Chusta i gogle"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Podwójny quad",
        "note": "możliwość jazdy we dwoje na jednym quadzie"
      }
    ],
    "whatToBring": [
      "Chusta lub komin na twarz",
      "Okulary i zamknięte buty",
      "Coś na zmianę (pył)",
      "Gotówka na napoje i napiwki"
    ],
    "requirements": [
      "Przed startem instruktor przekazuje instruktaż.",
      "Termin poranny lub popołudniowy potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy termin i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Ile trwa quad safari?",
        "answer": "Około dwóch godzin. To krótka wyprawa, którą łatwo zmieścić w planie dnia - dostępna rano lub po południu."
      },
      {
        "question": "Czy potrzebuję prawa jazdy na quada?",
        "answer": "Nie. Przed startem dostajesz instruktaż, a jazda odbywa się pod opieką instruktora."
      }
    ],
    "seo": {
      "title": "Quad safari z Sharm el Sheikh | Pustynia Synaj",
      "description": "Krótkie quad safari z Sharm el Sheikh: pustynia Synaj, herbata beduińska i jazda na wielbłądzie. Cena od 25 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/quad-safari-3h/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "quad-safari-5h",
    "route": "/wycieczki-z-sharm-el-sheikh/quad-safari-5h",
    "title": "Quad safari 5h z Sharm el Sheikh z kolacją",
    "h1": "Moto Quad Safari 5h z Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "safari",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Dłuższa, pięciogodzinna wersja pustynnej przygody z Sharm el Sheikh: około 40 km jazdy quadem, wioska beduińska, jazda na wielbłądzie, pokaz orientalny i kolacja w stylu beduińskim.",
    "overview": "To rozbudowana wersja quad safari, która łączy adrenalinę z wieczorem w klimacie pustyni. Przejeżdżasz około 40 km quadem, odwiedzasz wioskę beduińską, próbujesz herbaty, jedziesz na wielbłądzie, a wieczór kończysz pokazem orientalnym i kolacją.\n\nWyprawa trwa około pięciu godzin i jest dostępna codziennie. To dobra propozycja dla osób, które chcą nie tylko poczuć pustynną prędkość, ale też poznać jej wieczorne oblicze.",
    "heroImage": {
      "src": "/media/tours/s-quad-safari-5h",
      "alt": "Quady na pustyni o zachodzie słońca pod Sharm el Sheikh",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-quad-safari-5h",
        "alt": "Quady na pustyni o zachodzie słońca pod Sharm el Sheikh",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 40,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Pojedynczy quad (1 osoba)",
          "amount": 40,
          "currency": "USD"
        },
        {
          "label": "Podwójny quad (2 osoby)",
          "amount": 55,
          "currency": "USD",
          "unit": "quad"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 5 godzin",
    "pickupLabel": "Popołudnie, do ustalenia",
    "transport": "Transfer klimatyzowanym busem z hotelu i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Ok. 40 km jazdy quadem",
      "Wioska beduińska",
      "Jazda na wielbłądzie",
      "Pokaz orientalny i kolacja"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer busem z hotelu w Sharm el Sheikh na pustynię."
      },
      {
        "title": "Jazda quadem",
        "description": "Około 40 km jazdy quadem po pustynnych szlakach."
      },
      {
        "title": "Wioska beduińska",
        "description": "Poznanie tradycji, herbata beduińska i jazda na wielbłądzie."
      },
      {
        "title": "Pokaz orientalny i kolacja",
        "description": "Taniec, muzyka i kolacja w stylu beduińskim."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu wieczoru."
      }
    ],
    "included": [
      "Transport klimatyzowanym busem",
      "Opieka instruktora / przewodnika",
      "Jazda na quadach",
      "Jazda na wielbłądzie",
      "Kolacja",
      "Pokaz orientalny"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje",
      "Chusta i gogle",
      "Zdjęcia u fotografa"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Podwójny quad",
        "note": "55 USD za quad (jazda we dwoje)"
      }
    ],
    "whatToBring": [
      "Chusta lub komin na twarz",
      "Okulary i zamknięte buty",
      "Coś ciepłego na wieczór",
      "Gotówka na napoje i napiwki"
    ],
    "requirements": [
      "Przed startem instruktor przekazuje instruktaż.",
      "Godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy termin i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Czym różni się wersja 5h od krótkiej?",
        "answer": "Wersja pięciogodzinna obejmuje dłuższą jazdę (ok. 40 km), wioskę beduińską, pokaz orientalny i kolację - to raczej wieczorna impreza na pustyni niż krótka przejażdżka."
      },
      {
        "question": "Ile kosztuje jazda we dwoje?",
        "answer": "Podwójny quad to 55 USD za quad (dla dwóch osób). Pojedynczy quad kosztuje 40 USD od osoby."
      }
    ],
    "seo": {
      "title": "Quad safari 5h z Sharm el Sheikh z kolacją",
      "description": "Pięciogodzinne quad safari z Sharm el Sheikh: 40 km jazdy, wioska beduińska, wielbłąd, pokaz i kolacja. Cena od 40 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/quad-safari-5h/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "sunset-safari-teleskop",
    "route": "/wycieczki-z-sharm-el-sheikh/sunset-safari-teleskop",
    "title": "Sunset safari z teleskopem - Sharm el Sheikh",
    "h1": "Moto Sunset Safari z teleskopem - Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "safari",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Wieczorne safari z Sharm el Sheikh: jazda quadem, wioska beduińska, zachód słońca na pustyni, kolacja oraz obserwacja gwiazd i planet przez teleskop.",
    "overview": "To wersja pustynnej wyprawy zaplanowana pod wieczór. Po jeździe quadem i wizycie w wiosce beduińskiej oglądasz zachód słońca na pustyni, a po zapadnięciu zmroku patrzysz przez teleskop na planety i konstelacje.\n\nProgram łączy adrenalinę, kolację w stylu beduińskim i spokojne obserwowanie nieba z dala od świateł kurortu. Dla dzieci 5-11 lat obowiązuje niższa cena, a najmłodsze jadą bezpłatnie.",
    "heroImage": {
      "src": "/media/tours/s-sunset-safari-teleskop",
      "alt": "Zachód słońca nad pustynią Synaj z quadami na pierwszym planie",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-sunset-safari-teleskop",
        "alt": "Zachód słońca nad pustynią Synaj z quadami na pierwszym planie",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 38,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Dorosły",
          "amount": 38,
          "currency": "USD"
        },
        {
          "label": "Dziecko 5-11 lat",
          "amount": 22,
          "currency": "USD"
        },
        {
          "label": "Dziecko do 5 lat",
          "amount": 0,
          "currency": "USD",
          "free": true
        }
      ],
      "childAgeMin": 5,
      "infantFree": true
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "wieczorne safari",
    "pickupLabel": "Popołudnie, przed zachodem słońca",
    "transport": "Transfer z hotelu w Sharm el Sheikh na pustynię i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Jazda quadem",
      "Zachód słońca na pustyni",
      "Kolacja beduińska",
      "Obserwacja gwiazd przez teleskop"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Popołudniowy transfer z hotelu na pustynię."
      },
      {
        "title": "Jazda quadem",
        "description": "Około 40 km jazdy quadem po pustynnych szlakach."
      },
      {
        "title": "Wioska beduińska i zachód słońca",
        "description": "Herbata, jazda na wielbłądzie i zachód słońca nad pustynią."
      },
      {
        "title": "Pokaz orientalny i kolacja",
        "description": "Taniec, muzyka i kolacja w stylu beduińskim."
      },
      {
        "title": "Obserwacja gwiazd",
        "description": "Patrzenie przez teleskop na planety i konstelacje."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu wieczoru."
      }
    ],
    "included": [
      "Transfer z hotelu i z powrotem",
      "Jazda quadem",
      "Wioska beduińska i jazda na wielbłądzie",
      "Kolacja i pokaz orientalny",
      "Obserwacja przez teleskop"
    ],
    "excluded": [
      "Napoje",
      "Wydatki osobiste",
      "Chusta i gogle",
      "Zdjęcia u fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Chusta lub komin na twarz",
      "Coś ciepłego na wieczór",
      "Okulary i zamknięte buty",
      "Gotówka na napoje i napiwki"
    ],
    "requirements": [
      "Przed startem instruktor przekazuje instruktaż.",
      "Godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy termin i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Co widać przez teleskop?",
        "answer": "Po zmroku, z dala od świateł kurortu, przez teleskop można obserwować planety, konstelacje i szczegóły nocnego nieba."
      },
      {
        "question": "Ile kosztuje wycieczka dla dziecka?",
        "answer": "Dzieci 5-11 lat: 22 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 38 USD od osoby."
      }
    ],
    "seo": {
      "title": "Sunset safari z teleskopem - Sharm el Sheikh",
      "description": "Wieczorne safari z Sharm el Sheikh: quad, zachód słońca, kolacja beduińska i obserwacja gwiazd przez teleskop. Cena od 38 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/sunset-safari-teleskop/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "buggy-safari",
    "route": "/wycieczki-z-sharm-el-sheikh/buggy-safari",
    "title": "Buggy Safari - Sharm el Sheikh",
    "h1": "Buggy Safari - Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "safari",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Safari pojazdami buggy po pustyni w okolicy Sharm el Sheikh: około 40 km jazdy oraz wizyta w wiosce beduińskiej z tradycyjną herbatą. Cena podawana za buggy - dla par i grup znajomych szukających mocnych wrażeń.",
    "overview": "Buggy Safari to około 40 km jazdy pojazdami buggy przez pustynię - z prędkością, piachem i kurzem, czyli sporą dawką adrenaliny. Po drodze odsłaniają się szerokie pustynne krajobrazy.\n\nElementem wycieczki jest wizyta w wiosce beduińskiej, gdzie można poznać lokalną kulturę i napić się tradycyjnej herbaty. Do miejsca startu dowozi klimatyzowany bus, a nad grupą czuwa przewodnik anglojęzyczny.\n\nCena podawana jest za buggy, a nie za osobę: dostępne są pojazdy 2-osobowe i 4-osobowe. To dobra propozycja dla par oraz grup znajomych lub rodzin ceniących mocne wrażenia.",
    "heroImage": {
      "src": "/media/tours/s-buggy-safari",
      "alt": "Buggy Safari - Sharm el Sheikh - zdjęcie poglądowe",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-buggy-safari",
        "alt": "Buggy Safari - Sharm el Sheikh - zdjęcie poglądowe",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perVehicle",
      "amount": 45,
      "unit": "buggy",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Buggy 2-osobowy",
          "amount": 45,
          "currency": "USD",
          "unit": "buggy"
        },
        {
          "label": "Buggy 4-osobowy",
          "amount": 65,
          "currency": "USD",
          "unit": "buggy"
        }
      ],
      "note": "Cena podawana jest za buggy, a nie za osobę."
    },
    "availabilityLabel": "Według dostępności",
    "availabilityDays": [
      ""
    ],
    "durationLabel": "",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer klimatyzowanym busem, jazda buggy po pustyni",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Ok. 40 km jazdy buggy przez pustynię",
      "Pustynne krajobrazy",
      "Wizyta w wiosce beduińskiej",
      "Tradycyjna herbata"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Przejazd klimatyzowanym busem spod hotelu do bazy buggy na skraju pustyni."
      },
      {
        "title": "Jazda buggy przez pustynię",
        "description": "Około 40 km jazdy pojazdem buggy po pustyni, z pustynnymi krajobrazami po drodze."
      },
      {
        "title": "Wioska beduińska",
        "description": "Postój w wiosce beduińskiej, gdzie można poznać lokalną kulturę i napić się tradycyjnej herbaty."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer busem z powrotem do hotelu po zakończeniu jazdy."
      }
    ],
    "included": [
      "Transfer klimatyzowanym busem",
      "Opieka przewodnika anglojęzycznego",
      "Jazda buggy (ok. 40 km)",
      "Wizyta w wiosce beduińskiej z tradycyjną herbatą"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Napoje",
      "Arafatka i gogle",
      "Zdjęcia wykonywane przez fotografa",
      "Przejażdżka na wielbłądzie"
    ],
    "transferSupplements": [],
    "extras": [
      {
        "label": "Przejażdżka na wielbłądzie",
        "note": "opcjonalnie, płatna dodatkowo"
      }
    ],
    "whatToBring": [
      "Chusta lub arafatka na twarz",
      "Okulary lub gogle chroniące oczy",
      "Zamknięte obuwie",
      "Krem z filtrem UV",
      "Ubranie, które może się zakurzyć"
    ],
    "requirements": [
      "Ochrona oczu i twarzy zalecana ze względu na piach i kurz na trasie"
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna i wymaga potwierdzenia terminu oraz godziny odbioru na WhatsApp. Nie pobieramy płatności online - należność regulujesz na miejscu. W razie zmiany planów prosimy o wcześniejszy kontakt.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy cena jest za osobę czy za pojazd?",
        "answer": "Cena podawana jest za buggy. Pojazd 2-osobowy kosztuje 45 USD, a 4-osobowy 65 USD, niezależnie od liczby pasażerów w ramach jego pojemności."
      },
      {
        "question": "Jak długa jest trasa?",
        "answer": "Trasa liczy około 40 km jazdy buggy przez pustynię, z widokowymi pustynnymi krajobrazami i postojem w wiosce beduińskiej."
      },
      {
        "question": "Co warto zabrać?",
        "answer": "Ze względu na piach i kurz warto mieć chustę lub arafatkę na twarz, okulary bądź gogle oraz zamknięte obuwie i ubranie, które może się zabrudzić."
      },
      {
        "question": "Czy przejażdżka na wielbłądzie jest w cenie?",
        "answer": "Nie. Przejażdżka na wielbłądzie nie jest wliczona i jest dostępna opcjonalnie za dodatkową opłatą."
      }
    ],
    "seo": {
      "title": "Buggy Safari Sharm el Sheikh - pustynia i Beduini",
      "description": "Buggy Safari z Sharm el Sheikh: ok. 40 km jazdy przez pustynię i wizyta w wiosce beduińskiej. Od 45 USD za buggy.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/buggy-safari/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  },
  {
    "slug": "jazda-na-wielbladzie",
    "route": "/wycieczki-z-sharm-el-sheikh/jazda-na-wielbladzie",
    "title": "Jazda na wielbłądzie lub konno - Sharm el Sheikh",
    "h1": "Jazda na wielbłądzie lub konno - Sharm el Sheikh",
    "destination": "sharm-el-sheikh",
    "category": "safari",
    "departure": "Sharm el Sheikh",
    "shortDescription": "Godzinna przejażdżka na wielbłądzie lub koniu po pustyni pod Sharm el Sheikh. Spokojna, tradycyjna alternatywa dla quadów - dla rodzin, par i osób szukających mniej adrenaliny.",
    "overview": "To najprostszy sposób, by poczuć klimat pustyni bez pędu quadów. Wybierasz przejażdżkę na wielbłądzie albo koniu i przez około godzinę jedziesz przez pustynne krajobrazy pod okiem instruktora.\n\nTo dobra propozycja dla rodzin, par i osób, które wolą spokojniejsze tempo. W cenie jest transfer klimatyzowanym busem, sama przejażdżka, opieka instruktora i kask.",
    "heroImage": {
      "src": "/media/tours/s-jazda-na-wielbladzie",
      "alt": "Wielbłądy na pustyni pod Sharm el Sheikh o zachodzie słońca",
      "width": 1600,
      "height": 1000
    },
    "gallery": [
      {
        "src": "/media/tours/s-jazda-na-wielbladzie",
        "alt": "Wielbłądy na pustyni pod Sharm el Sheikh o zachodzie słońca",
        "width": 1600,
        "height": 1000
      }
    ],
    "price": {
      "mode": "perPerson",
      "amount": 28,
      "unit": "os.",
      "currency": "USD",
      "from": true,
      "lastVerifiedAt": "2026-08-09",
      "options": [
        {
          "label": "Osoba",
          "amount": 28,
          "currency": "USD"
        }
      ]
    },
    "availabilityLabel": "Codziennie",
    "availabilityDays": [
      "Codziennie"
    ],
    "durationLabel": "ok. 1 godzina",
    "pickupLabel": "Do ustalenia",
    "transport": "Transfer klimatyzowanym busem z hotelu i z powrotem",
    "guide": {
      "label": "Potwierdzamy przed rezerwacją",
      "polishConfirmed": false
    },
    "highlights": [
      "Wielbłąd lub koń do wyboru",
      "Ok. 1 godzina jazdy",
      "Pustynne krajobrazy",
      "Dla rodzin i par"
    ],
    "itinerary": [
      {
        "title": "Odbiór z hotelu",
        "description": "Transfer busem z hotelu w Sharm el Sheikh na pustynię."
      },
      {
        "title": "Przejażdżka",
        "description": "Około godziny jazdy na wielbłądzie lub koniu w towarzystwie instruktora."
      },
      {
        "title": "Powrót do hotelu",
        "description": "Transfer pod hotel po zakończeniu przejażdżki."
      }
    ],
    "included": [
      "Transport klimatyzowanym busem",
      "Jazda konno lub na wielbłądzie",
      "Instruktor",
      "Kask"
    ],
    "excluded": [
      "Wydatki osobiste i zakupy",
      "Zdjęcia u fotografa"
    ],
    "transferSupplements": [],
    "extras": [],
    "whatToBring": [
      "Wygodne, zakryte obuwie",
      "Nakrycie głowy i okulary",
      "Krem z filtrem",
      "Gotówka na napiwki"
    ],
    "requirements": [
      "Atrakcja odpowiednia dla rodzin i par.",
      "Godzinę odbioru potwierdzamy na WhatsApp."
    ],
    "cancellationPolicy": "Rezerwacja jest wstępna do czasu potwierdzenia na WhatsApp. Ustalamy wtedy termin i godzinę odbioru. Nie pobieramy płatności online.",
    "featured": false,
    "faqs": [
      {
        "question": "Czy wybieram wielbłąda czy konia?",
        "answer": "Możesz wybrać jedną z opcji - jazdę na wielbłądzie lub koniu. Wystarczy zaznaczyć preferencję przy rezerwacji."
      },
      {
        "question": "Czy potrzebne jest doświadczenie?",
        "answer": "Nie. Przejażdżka odbywa się pod opieką instruktora w spokojnym tempie, więc nadaje się także dla początkujących i dzieci z opiekunem."
      }
    ],
    "seo": {
      "title": "Jazda na wielbłądzie lub konno - Sharm el Sheikh",
      "description": "Godzinna przejażdżka na wielbłądzie lub koniu po pustyni pod Sharm el Sheikh. Transfer, instruktor i kask w cenie, od 28 USD. Rezerwacja przez WhatsApp.",
      "canonicalPath": "/wycieczki-z-sharm-el-sheikh/jazda-na-wielbladzie/",
      "ogImage": "/media/og/sharm-el-sheikh.jpg"
    },
    "updatedAt": "2026-08-09"
  }
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getToursByDestination(destination: string): Tour[] {
  return tours.filter((t) => t.destination === destination);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((t) => t.featured);
}
