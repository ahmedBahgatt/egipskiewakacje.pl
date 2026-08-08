import type { Tour } from "@/content/types";

/**
 * Tour content. All Polish copy is original (written from scratch for this site).
 * Operational facts (prices, availability, transfers) were verified live against
 * the operator's source pages on 2026-08-08 - see CONTENT_SOURCES.md.
 *
 * Prices are the exact current values in USD. No fake "old" prices, discounts,
 * countdowns or bestseller labels. `variable: true` renders "Cena od" because the
 * final cost can change with transfer zones and optional extras.
 */

const VERIFIED = "2026-08-08";

export const tours: Tour[] = [
  // ---------------------------------------------------------------------------
  // A. HURGHADA -> KAIR
  // ---------------------------------------------------------------------------
  {
    slug: "kair-piramidy-muzeum-egipskie",
    route: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie",
    title: "Wycieczka z Hurghady do Kairu",
    h1: "Wycieczka z Hurghady do Kairu",
    destination: "hurghada",
    departure: "Hurghada",
    shortDescription:
      "Cały dzień w Kairze i Gizie: Muzeum Egipskie, piramidy i Sfinks. Odbiór z hotelu w Hurghadzie, klimatyzowany autokar i polskojęzyczny przewodnik.",
    overview:
      "To klasyczna, jednodniowa wyprawa z Hurghady do serca starożytnego Egiptu. Odwiedzasz Muzeum Egipskie w centrum Kairu, a następnie płaskowyż w Gizie z trzema piramidami i Sfinksem. Trasa jest długa, bo obejmuje dojazd w obie strony, dlatego wyruszamy nocą - dzięki temu na miejscu masz cały dzień na zwiedzanie.",
    heroImage: {
      src: "/media/tours/hurghada-kair",
      alt: "Piramidy w Gizie o złotej godzinie, widok z płaskowyżu",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/media/tours/hurghada-kair", alt: "Piramidy w Gizie o złotej godzinie", width: 1600, height: 1000 },
      { src: "/media/cairo/giza", alt: "Trzy piramidy w Gizie z pustynnym pierwszym planem", width: 1200, height: 800 },
      { src: "/media/cairo/museum", alt: "Wnętrze Muzeum Egipskiego z eksponatami starożytnego Egiptu", width: 1200, height: 800 },
      { src: "/media/cairo/sphinx", alt: "Wielki Sfinks z piramidą w tle", width: 1200, height: 800 },
    ],
    price: {
      adult: 60,
      child: 30,
      infantFree: true,
      childAgeMin: 5,
      childAgeMax: 11,
      currency: "USD",
      lastVerifiedAt: VERIFIED,
      variable: true,
    },
    availabilityLabel: "Codziennie",
    availabilityDays: ["Codziennie"],
    durationLabel: "ok. 20-22 godzin",
    pickupLabel: "ok. 00:00-02:00",
    transport: "Klimatyzowany autokar, odbiór i powrót pod hotel",
    guide: { label: "Polski", polishConfirmed: true },
    highlights: ["Muzeum Egipskie", "Piramidy w Gizie", "Sfinks", "Obiad"],
    itinerary: [
      { time: "00:00-02:00", title: "Odbiór z hotelu", description: "Kierowca odbiera Cię spod hotelu w Hurghadzie. Godzinę podajemy wcześniej na WhatsApp - zależy od trasy autokaru." },
      { title: "Przejazd do Kairu", description: "Nocna trasa klimatyzowanym autokarem w kierunku stolicy. To dobry moment na sen przed pełnym dniem zwiedzania." },
      { title: "Muzeum Egipskie", description: "Zwiedzanie Muzeum Egipskiego w centrum Kairu - najważniejsze zabytki starożytnego Egiptu w towarzystwie przewodnika." },
      { title: "Płaskowyż w Gizie", description: "Trzy wielkie piramidy z bliska, czas na zdjęcia i spacer po terenie płaskowyżu." },
      { title: "Sfinks", description: "Wielki Sfinks - jeden z najbardziej rozpoznawalnych symboli Egiptu." },
      { title: "Obiad", description: "Ciepły posiłek w restauracji (bez napojów). Chwila odpoczynku w środku dnia." },
      { title: "Opcjonalny rejs po Nilu", description: "Dla chętnych krótki rejs po Nilu za dopłatą - dobry sposób na inne spojrzenie na miasto." },
      { title: "Powrót do Hurghady", description: "Droga powrotna autokarem z postojami. Powrót pod hotel wieczorem lub w nocy." },
    ],
    included: [
      "Odbiór z hotelu i powrót",
      "Przejazd klimatyzowanym autokarem",
      "Polskojęzyczny przewodnik",
      "Bilety wstępu do głównych obiektów",
      "Obiad (bez napojów)",
    ],
    excluded: [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Przejazd na wielbłądzie, koniu lub bryczce",
      "Opcjonalny rejs po Nilu",
    ],
    transferSupplements: [
      { zone: "Safaga, Soma Bay, Abu Soma, El Gouna", amount: 10 },
      { zone: "Makadi Bay", amount: 5 },
      { zone: "Sahl Hasheesh", amount: 5 },
    ],
    extras: [
      { label: "Rejs po Nilu", note: "ok. 10-12 USD od osoby, płatny na miejscu" },
      { label: "Wejście do wnętrza piramidy", note: "bilet dodatkowy, płatny na miejscu" },
    ],
    whatToBring: [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień chodzenia",
      "Nakrycie głowy, okulary i krem z filtrem",
      "Woda i drobne przekąski na drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje",
    ],
    requirements: [
      "Trasa jest długa i męcząca - warto wyspać się przed wyjazdem.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp.",
    ],
    cancellationPolicy:
      "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Na tym etapie ustalamy dostępność, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    featured: true,
    faqs: [
      { question: "Czy przewodnik mówi po polsku?", answer: "Tak, na trasie z Hurghady zapewniamy polskojęzycznego przewodnika." },
      { question: "Ile kosztuje wycieczka dla dziecka?", answer: "Dzieci w wieku 5-11 lat: 30 USD. Dzieci poniżej 5 lat jadą bezpłatnie. Dorośli: 60 USD od osoby." },
      { question: "Czy rejs po Nilu jest w cenie?", answer: "Nie. To opcja dodatkowa (ok. 10-12 USD od osoby), płatna na miejscu dla chętnych." },
    ],
    relatedPostSlug: "co-zabrac-na-wycieczke-do-kairu",
    seo: {
      title: "Wycieczka z Hurghady do Kairu | Piramidy i Muzeum",
      description:
        "Jednodniowa wycieczka z Hurghady do Kairu: Muzeum Egipskie, piramidy w Gizie i Sfinks. Cena od 60 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
      ogImage: "/media/og/hurghada.jpg",
    },
    updatedAt: VERIFIED,
  },

  // ---------------------------------------------------------------------------
  // B. MARSA ALAM -> KAIR + STARY KAIR
  // ---------------------------------------------------------------------------
  {
    slug: "kair-stary-kair-piramidy",
    route: "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy",
    title: "Wycieczka z Marsa Alam do Kairu",
    h1: "Wycieczka z Marsa Alam do Kairu",
    destination: "marsa-alam",
    departure: "Marsa Alam",
    shortDescription:
      "Rozbudowany program z Marsa Alam: Stary Kair z zabytkami trzech religii oraz piramidy i Sfinks w Gizie. Odbiór z hotelu i polskojęzyczny przewodnik.",
    overview:
      "Wyprawa z Marsa Alam łączy dwie twarze Kairu. Rano poznajesz Stary Kair - dzielnicę, w której obok siebie stoją kościół Wiszący, meczet Amr ibn al-As i synagoga Ben Ezra. Po południu jedziesz na płaskowyż w Gizie, do piramid i Sfinksa. Ponieważ Marsa Alam leży daleko na południu, dzień jest długi, a program - naprawdę pełny.",
    heroImage: {
      src: "/media/tours/marsa-alam-kair",
      alt: "Kościół Wiszący w Starym Kairze z charakterystyczną fasadą",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/media/tours/marsa-alam-kair", alt: "Stary Kair - zabytkowa dzielnica", width: 1600, height: 1000 },
      { src: "/media/cairo/giza", alt: "Trzy piramidy w Gizie", width: 1200, height: 800 },
      { src: "/media/cairo/sphinx", alt: "Wielki Sfinks z piramidą w tle", width: 1200, height: 800 },
      { src: "/media/cairo/nile", alt: "Nil w Kairze o zachodzie słońca", width: 1200, height: 800 },
    ],
    price: {
      adult: 80,
      child: 40,
      infantFree: true,
      childAgeMin: 5,
      childAgeMax: 11,
      currency: "USD",
      lastVerifiedAt: VERIFIED,
      variable: true,
    },
    availabilityLabel: "We wtorki",
    availabilityDays: ["Wtorek"],
    durationLabel: "cała doba, dzień intensywny",
    pickupLabel: "ok. 23:00-24:00",
    transport: "Transfer z Marsa Alam do Hurghady, dalej klimatyzowany autokar",
    guide: { label: "Polski", polishConfirmed: true },
    highlights: ["Stary Kair", "Piramidy w Gizie", "Sfinks", "Obiad"],
    itinerary: [
      { time: "23:00-24:00", title: "Odbiór z hotelu", description: "Wyjazd z hotelu w Marsa Alam minibusem lub samochodem w kierunku Hurghady." },
      { title: "Przesiadka w Hurghadzie", description: "W Hurghadzie przesiadasz się do klimatyzowanego autokaru jadącego do Kairu." },
      { title: "Stary Kair", description: "Kościół Wiszący, kościół świętego Sergiusza, meczet Amr ibn al-As i synagoga Ben Ezra - miejsca trzech religii w jednej dzielnicy." },
      { title: "Płaskowyż w Gizie", description: "Trzy piramidy i Sfinks. Na terenie Gizy spędzasz ok. 1,5 godziny - czas na zdjęcia i spacer." },
      { title: "Obiad", description: "Ciepły posiłek w restauracji (bez napojów)." },
      { title: "Opcjonalny rejs po Nilu", description: "Dla chętnych krótki rejs po Nilu za dopłatą." },
      { title: "Powrót do Marsa Alam", description: "Droga powrotna autokarem do Hurghady i dalej transferem do hotelu w Marsa Alam." },
    ],
    included: [
      "Transport zgodnie z programem",
      "Polskojęzyczny przewodnik",
      "Zwiedzanie Starego Kairu",
      "Giza i Sfinks",
      "Obiad (bez napojów)",
    ],
    excluded: [
      "Napoje",
      "Wydatki własne i napiwki",
      "Wejście do wnętrza piramidy",
      "Opcjonalny przejazd na wielbłądzie lub koniu",
      "Opcjonalny rejs po Nilu",
    ],
    transferSupplements: [
      {
        zone: "Hotele oddalone: Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay",
        amount: 10,
      },
    ],
    extras: [{ label: "Rejs po Nilu", note: "ok. 10-12 USD od osoby, płatny na miejscu" }],
    whatToBring: [
      "Paszport (wymagany na trasie do Kairu)",
      "Skromniejszy ubiór na wizyty w miejscach kultu",
      "Wygodne buty i nakrycie głowy",
      "Woda i przekąski na długą drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje",
    ],
    requirements: [
      "To najdłuższa z naszych tras - warto odpocząć przed wyjazdem.",
      "Dostępność w danym tygodniu i godzinę odbioru potwierdzamy na WhatsApp.",
    ],
    cancellationPolicy:
      "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Ustalamy wtedy dostępność w danym tygodniu, godzinę odbioru i ostateczną cenę. Nie pobieramy płatności online.",
    featured: true,
    faqs: [
      { question: "Czym różni się ta trasa od wyjazdu z Hurghady?", answer: "Program z Marsa Alam dodatkowo obejmuje Stary Kair, a droga jest dłuższa, bo najpierw jedziesz do Hurghady na przesiadkę." },
      { question: "Ile czasu spędzam przy piramidach?", answer: "Na płaskowyżu w Gizie masz około 1,5 godziny - czas na zdjęcia, spacer i obejrzenie Sfinksa." },
      { question: "Ile kosztuje wycieczka dla dziecka?", answer: "Dzieci 5-11 lat: 40 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 80 USD od osoby." },
    ],
    relatedPostSlug: "co-zabrac-na-wycieczke-do-kairu",
    seo: {
      title: "Wycieczka z Marsa Alam do Kairu | Stary Kair i Piramidy",
      description:
        "Wycieczka z Marsa Alam do Kairu: Stary Kair, piramidy w Gizie i Sfinks. Cena od 80 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/",
      ogImage: "/media/og/marsa-alam.jpg",
    },
    updatedAt: VERIFIED,
  },

  // ---------------------------------------------------------------------------
  // C. SHARM EL SHEIKH -> KAIR + GEM
  // ---------------------------------------------------------------------------
  {
    slug: "kair-gem-piramidy",
    route: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy",
    title: "Wycieczka z Sharm el Sheikh do Kairu",
    h1: "Wycieczka z Sharm el Sheikh do Kairu",
    destination: "sharm-el-sheikh",
    departure: "Sharm el Sheikh",
    shortDescription:
      "Z Synaju do Kairu krótszą trasą: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Odbiór z hotelu i klimatyzowany autokar.",
    overview:
      "Wyprawa z Sharm el Sheikh prowadzi z Synaju do Kairu inną, krótszą trasą niż znad Morza Czerwonego. W programie jest Wielkie Muzeum Egipskie (GEM) - najnowocześniejsza placówka tego typu w kraju - oraz płaskowyż w Gizie z piramidami i Sfinksem. Dzień kończy się obiadem i czasem na zdjęcia, a dla chętnych opcjonalnym rejsem po Nilu.",
    heroImage: {
      src: "/media/tours/sharm-kair",
      alt: "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/media/tours/sharm-kair", alt: "Wielkie Muzeum Egipskie (GEM)", width: 1600, height: 1000 },
      { src: "/media/cairo/giza", alt: "Trzy piramidy w Gizie", width: 1200, height: 800 },
      { src: "/media/cairo/sphinx", alt: "Wielki Sfinks z piramidą w tle", width: 1200, height: 800 },
      { src: "/media/cairo/nile", alt: "Nil w Kairze o zachodzie słońca", width: 1200, height: 800 },
    ],
    price: {
      adult: 93,
      child: 60,
      infantFree: true,
      childAgeMin: 5,
      childAgeMax: 11,
      currency: "USD",
      lastVerifiedAt: VERIFIED,
      variable: true,
    },
    availabilityLabel: "Codziennie (wg dostępności)",
    availabilityDays: ["Codziennie"],
    durationLabel: "cały dzień, powrót ok. 22:00-23:00",
    pickupLabel: "ok. 00:00-02:00",
    transport: "Klimatyzowany autokar z Sharm el Sheikh do Kairu i z powrotem",
    // Guide language is INTERNALLY INCONSISTENT on the source page (one place says
    // Polish, another says English). Per the brief we do NOT guess - honest wording only.
    guide: { label: "Potwierdzamy przed rezerwacją", polishConfirmed: false },
    highlights: ["Wielkie Muzeum Egipskie (GEM)", "Piramidy w Gizie", "Sfinks", "Obiad"],
    itinerary: [
      { time: "00:00-02:00", title: "Odbiór z hotelu", description: "Kierowca odbiera Cię spod hotelu w Sharm el Sheikh. Godzinę podajemy wcześniej na WhatsApp." },
      { title: "Przejazd do Kairu", description: "Klimatyzowany autokar, ok. 6-8 godzin drogi z Synaju do stolicy." },
      { title: "Wielkie Muzeum Egipskie (GEM)", description: "Zwiedzanie najnowocześniejszego muzeum w Egipcie, położonego przy płaskowyżu w Gizie." },
      { title: "Płaskowyż w Gizie", description: "Piramidy i Sfinks z bliska, czas na zdjęcia." },
      { title: "Obiad", description: "Ciepły posiłek w restauracji (bez napojów)." },
      { title: "Opcjonalny rejs po Nilu", description: "Dla chętnych krótki rejs po Nilu za dopłatą." },
      { time: "22:00-23:00", title: "Powrót do hotelu", description: "Droga powrotna autokarem, powrót do hotelu zwykle między 22:00 a 23:00." },
    ],
    included: [
      "Transport klimatyzowanym autokarem",
      "Bilet wstępu do GEM",
      "Wstęp na płaskowyż w Gizie",
      "Obiad (bez napojów)",
    ],
    excluded: [
      "Napoje",
      "Wejście do wnętrza piramidy",
      "Przejazd na wielbłądzie",
      "Wydatki własne i napiwki",
      "Opcjonalny rejs po Nilu",
    ],
    transferSupplements: [],
    extras: [{ label: "Rejs po Nilu", note: "ok. 10-12 USD od osoby, płatny na miejscu" }],
    whatToBring: [
      "Paszport (wymagany na trasie do Kairu)",
      "Wygodne buty na cały dzień zwiedzania",
      "Nakrycie głowy, okulary i krem z filtrem",
      "Woda i przekąski na długą drogę",
      "Gotówka na napoje, napiwki i opcjonalne atrakcje",
    ],
    requirements: [
      "Trasa z Synaju jest krótsza, ale dzień nadal jest długi.",
      "Dostępność i godzinę odbioru potwierdzamy na WhatsApp.",
    ],
    cancellationPolicy:
      "Rezerwacja jest wstępna do czasu potwierdzenia przez naszą ekipę na WhatsApp. Potwierdzamy dostępność, godzinę odbioru, język przewodnika i ostateczną cenę. Nie pobieramy płatności online.",
    featured: true,
    faqs: [
      { question: "W jakim języku mówi przewodnik?", answer: "Język przewodnika na tej trasie potwierdzamy przed rezerwacją. Cała obsługa rezerwacji odbywa się po polsku." },
      { question: "Co to jest GEM?", answer: "Wielkie Muzeum Egipskie (Grand Egyptian Museum) - nowa, bardzo duża placówka przy Gizie, wpisana w program tej wycieczki." },
      { question: "Ile kosztuje wycieczka dla dziecka?", answer: "Dzieci 5-11 lat: 60 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 93 USD od osoby." },
    ],
    relatedPostSlug: "co-zabrac-na-wycieczke-do-kairu",
    seo: {
      title: "Wycieczka z Sharm el Sheikh do Kairu | GEM i Piramidy",
      description:
        "Wycieczka z Sharm el Sheikh do Kairu: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Cena od 93 USD, odbiór z hotelu, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
      ogImage: "/media/og/sharm-el-sheikh.jpg",
    },
    updatedAt: VERIFIED,
  },
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
