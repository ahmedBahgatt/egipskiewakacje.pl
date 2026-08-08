/**
 * Seed payload - a faithful mirror of the frontend's local content.
 *
 * SOURCE OF TRUTH while the site runs in local mode:
 *   src/content/config.ts            -> siteSettings
 *   src/content/local/site.ts        -> siteSettings, faq
 *   src/content/local/destinations.ts-> destination
 *   src/content/local/tours.ts       -> tour
 *   src/content/local/posts.ts       -> blogPost, author
 *   src/content/local/legal.ts       -> legalPage
 *
 * Every Polish string here is copied verbatim from those files. If you edit
 * content in the Studio after seeding, the local files become stale - that is
 * expected once NEXT_PUBLIC_CONTENT_SOURCE=sanity, but until then the local
 * files are what the public site actually ships.
 *
 * Document ids are DETERMINISTIC ("tour.kair-gem-piramidy", ...) so re-running
 * the seed replaces the same documents instead of creating duplicates.
 *
 * IMAGES
 * `img()` does NOT return a finished image value - it returns a marker holding
 * a path relative to /public/media. seed.mjs walks the payload, uploads each
 * distinct file to Sanity once (deduplicated by SHA-1, so re-runs reuse the
 * same asset id) and swaps the marker for a real image value:
 *
 *   { _type: "image", _upload: "tours/hurghada-kair.jpg", alt: "..." }
 *     -> { _type: "image", alt: "...", asset: { _type: "reference", _ref: "image-..." } }
 *
 * Hotspot/crop are left unset: editors set them in the Studio, and an unset
 * hotspot means "centre", which is what the current site already does.
 *
 * NOT seeded on purpose:
 *   - review: zero documents. No invented names, ratings or quotes. The
 *     reviews section stays hidden until a real, verified review is added.
 *   - tour.pickupZones / tour.previewVideo: no verified data exists yet.
 */

// --- helpers ---------------------------------------------------------------

const slug = (current) => ({ _type: "slug", current });
const ref = (id) => ({ _type: "reference", _ref: id });
/** Editorial cross-link: weak so deleting the target never blocks the owner. */
const weakRef = (id) => ({ _type: "reference", _ref: id, _weak: true });

/**
 * Image to upload. `file` is relative to /public/media (WITH the extension);
 * `alt` is the Polish description stored on the image itself.
 */
const img = (file, alt) => ({ _type: "image", _upload: file, alt });

const faqItem = (question, answer) => ({ _type: "faqItem", question, answer });
const step = (time, title, description) => ({
  _type: "itineraryStep",
  ...(time ? { time } : {}),
  title,
  description,
});
const fee = (zone, amount) => ({ _type: "transferSupplement", zone, amount });
const note = (label, noteText) => ({ _type: "labelledNote", label, note: noteText });

// Body blocks. The block's Sanity `_type` IS the discriminator - there is no
// second hand-written `type` field. See studio/schemas/objects/postBlocks.ts.
const heading = (anchor, text) => ({ _type: "blockHeading", text, anchor: slug(anchor) });
const paragraph = (text) => ({ _type: "blockParagraph", text });
const list = (ordered, items) => ({ _type: "blockList", ordered, items });
const callout = (tone, text) => ({ _type: "blockCallout", tone, text });
const imageBlock = (file, alt, caption) => ({
  _type: "blockImage",
  image: img(file, alt),
  ...(caption ? { caption } : {}),
});
const table = (caption, headers, rows) => ({
  _type: "blockTable",
  ...(caption ? { caption } : {}),
  headers,
  rows: rows.map((cells) => ({ _type: "tableRow", cells })),
});

/** Date the operator's prices and programmes were last verified. */
const VERIFIED = "2026-08-08";

// --- ids -------------------------------------------------------------------

export const IDS = {
  siteSettings: "siteSettings",
  author: "author.zespol",
  destinations: {
    hurghada: "destination.hurghada",
    marsaAlam: "destination.marsa-alam",
    sharm: "destination.sharm-el-sheikh",
  },
  categories: {
    kair: "tourCategory.kair-i-piramidy",
    calodniowe: "tourCategory.calodniowe",
  },
  tours: {
    hurghada: "tour.kair-piramidy-muzeum-egipskie",
    marsaAlam: "tour.kair-stary-kair-piramidy",
    sharm: "tour.kair-gem-piramidy",
  },
  post: "blogPost.co-zabrac-na-wycieczke-do-kairu",
};

// --- siteSettings (singleton) ----------------------------------------------

/**
 * NOTE: `description` is copied byte-for-byte from src/content/config.ts, which
 * currently stores it WITHOUT Polish diacritics ("turystow", "odbior") while
 * `tagline` has them. Kept as-is so the CMS matches what the site ships today.
 * Fix it in config.ts first if you want the accented version everywhere.
 */
export const siteSettings = {
  _id: IDS.siteSettings,
  _type: "siteSettings",
  title: "Egipskie Wakacje",
  tagline: "Wycieczki fakultatywne w Egipcie dla polskich turystów",
  description:
    "Wycieczki fakultatywne w Egipcie dla polskich turystow. Kair i piramidy z Hurghady, Marsa Alam i Sharm el Sheikh. Przejrzyste ceny, odbior z hotelu, rezerwacja przez WhatsApp.",
  whatsappNumber: "201055850536",
};

// --- author ----------------------------------------------------------------

export const author = {
  _id: IDS.author,
  _type: "author",
  name: "Zespół Egipskie Wakacje",
  role: "Redakcja",
  bio: "Treści przygotowuje zespół Egipskie Wakacje na podstawie programów wycieczek i informacji potwierdzanych u operatora. Ceny i szczegóły weryfikujemy przed publikacją i podajemy datę ostatniej weryfikacji.",
};

// --- tour categories -------------------------------------------------------

export const tourCategories = [
  {
    _id: IDS.categories.kair,
    _type: "tourCategory",
    title: "Kair i piramidy",
    slug: slug("kair-i-piramidy"),
    description: "Wyprawy do Kairu i na płaskowyż w Gizie z kurortów nad Morzem Czerwonym i z Synaju.",
  },
  {
    _id: IDS.categories.calodniowe,
    _type: "tourCategory",
    title: "Wycieczki całodniowe",
    slug: slug("calodniowe"),
    description: "Trasy zajmujące cały dzień, z odbiorem z hotelu i powrotem tego samego dnia lub w nocy.",
  },
];

// --- destinations ----------------------------------------------------------

export const destinations = [
  {
    _id: IDS.destinations.hurghada,
    _type: "destination",
    slug: slug("hurghada"),
    routeBase: "/wycieczki-z-hurghady",
    name: "Hurghada",
    nameGenitive: "Hurghady",
    shortIntro:
      "Hurghada to najkrótsza droga znad Morza Czerwonego do Kairu i piramid. Autokary ruszają spod hoteli nocą, dzięki czemu cały dzień spędzasz przy zabytkach, a nie w drodze. To wygodna baza na pierwszą wyprawę do stolicy.",
    heroImage: img(
      "destinations/hurghada.jpg",
      "Panorama wybrzeża Hurghady nad turkusowym Morzem Czerwonym o poranku",
    ),
    practical: [
      "Odbiór z hotelu w Hurghadzie i strefach sąsiednich - godzinę podajemy przed wyjazdem.",
      "Przejazd klimatyzowanym autokarem, z postojami w drodze powrotnej.",
      "Wyprawa do Kairu i Gizy trwa cały dzień - to najdłuższa z naszych jednodniowych tras.",
      "Dopłaty za transfer dotyczą tylko wybranych, bardziej oddalonych stref hotelowych.",
    ],
    faqs: [
      faqItem(
        "O której godzinie jest odbiór z hotelu w Hurghadzie?",
        "Odbiór odbywa się zwykle między 00:00 a 02:00, w zależności od położenia hotelu. Dokładną godzinę potwierdzamy na WhatsApp po rezerwacji, bo zależy ona od trasy autokaru danego dnia.",
      ),
      faqItem(
        "Czy z Hurghady da się pojechać do Kairu i wrócić tego samego dnia?",
        "Tak. Wyprawa jest jednodniowa, ale długa - łączny czas z dojazdami to około 20-22 godzin. Wyjazd jest w nocy, a powrót do hotelu następnego dnia wieczorem lub w nocy.",
      ),
      faqItem(
        "Które hotele w Hurghadzie mają dopłatę za transfer?",
        "Dopłata dotyczy stref bardziej oddalonych od centrum: El Gouna, Safaga, Soma Bay, Abu Soma - 10 USD od osoby, oraz Makadi Bay i Sahl Hasheesh - 5 USD od osoby. Hotele w samej Hurghadzie są bez dopłaty.",
      ),
    ],
    primaryQuery: "wycieczki z Hurghady",
    seoTitle: "Wycieczki z Hurghady do Kairu i piramid | Egipskie Wakacje",
    seoDescription:
      "Wycieczki fakultatywne z Hurghady: Kair, piramidy w Gizie i Muzeum Egipskie. Odbiór z hotelu, przejrzysta cena od 60 USD, rezerwacja przez WhatsApp.",
    canonicalPath: "/wycieczki-z-hurghady/",
    ogImage: img(
      "og/hurghada.jpg",
      "Piramidy w Gizie z podpisem Wycieczki z Hurghady do Kairu",
    ),
  },
  {
    _id: IDS.destinations.marsaAlam,
    _type: "destination",
    slug: slug("marsa-alam"),
    routeBase: "/wycieczki-z-marsa-alam",
    name: "Marsa Alam",
    nameGenitive: "Marsa Alam",
    shortIntro:
      "Marsa Alam leży najdalej na południe, dlatego droga do Kairu jest tu najdłuższa, a program - najbardziej rozbudowany. Do klasycznej Gizy dokładamy Stary Kair z jego kościołami, meczetem i synagogą. To wyprawa dla osób, które chcą zobaczyć wiele naraz.",
    heroImage: img(
      "destinations/marsa-alam.jpg",
      "Spokojna zatoka Marsa Alam z rafą koralową widoczną przez czystą wodę",
    ),
    practical: [
      "Początek trasy to przejazd z hotelu w Marsa Alam do Hurghady minibusem lub samochodem.",
      "W Hurghadzie następuje przesiadka do klimatyzowanego autokaru jadącego do Kairu.",
      "Wyjazd z hotelu jest późnym wieczorem - to najdłuższa z naszych tras.",
      "Program łączy Stary Kair i Gizę, dlatego dzień jest intensywny i pełny.",
    ],
    faqs: [
      faqItem(
        "W które dni odbywa się wycieczka z Marsa Alam?",
        "Standardowo we wtorki. Dostępność w danym tygodniu potwierdzamy na WhatsApp, bo zależy ona od liczby zgłoszeń i grafiku transferów z Marsa Alam do Hurghady.",
      ),
      faqItem(
        "Dlaczego trasa z Marsa Alam trwa dłużej niż z Hurghady?",
        "Marsa Alam leży dalej na południe. Najpierw jedziesz do Hurghady, gdzie następuje przesiadka do autokaru do Kairu. Dlatego wyjazd jest wcześniej, a cały dzień - dłuższy.",
      ),
      faqItem(
        "Co dokładnie zwiedzam w Starym Kairze?",
        "Kościół Wiszący, kościół świętego Sergiusza, meczet Amr ibn al-As oraz synagogę Ben Ezra. To dzielnica, w której obok siebie stoją miejsca trzech religii - stąd jej wyjątkowy charakter.",
      ),
    ],
    primaryQuery: "wycieczki z Marsa Alam",
    seoTitle: "Wycieczki z Marsa Alam do Kairu | Stary Kair i piramidy",
    seoDescription:
      "Wycieczki fakultatywne z Marsa Alam: Stary Kair, piramidy w Gizie i Sfinks. Odbiór z hotelu, cena od 80 USD, rezerwacja i potwierdzenie przez WhatsApp.",
    canonicalPath: "/wycieczki-z-marsa-alam/",
    ogImage: img(
      "og/marsa-alam.jpg",
      "Zabytki Starego Kairu z podpisem Wycieczki z Marsa Alam do Kairu",
    ),
  },
  {
    _id: IDS.destinations.sharm,
    _type: "destination",
    slug: slug("sharm-el-sheikh"),
    routeBase: "/wycieczki-z-sharm-el-sheikh",
    name: "Sharm el Sheikh",
    nameGenitive: "Sharm el Sheikh",
    shortIntro:
      "Sharm el Sheikh leży po drugiej stronie, na Synaju, dlatego droga do Kairu prowadzi inną trasą i jest krótsza niż znad Morza Czerwonego. Program obejmuje nowoczesne Wielkie Muzeum Egipskie (GEM) oraz płaskowyż w Gizie.",
    heroImage: img(
      "destinations/sharm-el-sheikh.jpg",
      "Wybrzeże Sharm el Sheikh na Synaju z górami w tle i turkusową zatoką",
    ),
    practical: [
      "Przejazd klimatyzowanym autokarem z Synaju do Kairu i z powrotem.",
      "Droga w jedną stronę to około 6-8 godzin, krócej niż z Hurghady czy Marsa Alam.",
      "W programie Wielkie Muzeum Egipskie (GEM) - najnowocześniejsze muzeum w kraju.",
      "Powrót do hotelu zwykle między 22:00 a 23:00, w zależności od strefy.",
    ],
    faqs: [
      faqItem(
        "Jak długo trwa dojazd z Sharm el Sheikh do Kairu?",
        "Około 6-8 godzin w jedną stronę. Trasa z Synaju jest krótsza niż znad Morza Czerwonego, dlatego powrót do hotelu jest zwykle wcześniej - między 22:00 a 23:00.",
      ),
      faqItem(
        "Czym różni się GEM od klasycznego Muzeum Egipskiego?",
        "Wielkie Muzeum Egipskie (GEM) to nowa, bardzo duża placówka przy płaskowyżu w Gizie. Wyprawa z Sharm el Sheikh obejmuje właśnie GEM oraz teren piramid i Sfinksa.",
      ),
      faqItem(
        "W jakim języku mówi przewodnik na trasie z Sharm el Sheikh?",
        "Język przewodnika na tej trasie potwierdzamy przed rezerwacją. Niezależnie od tego cała obsługa rezerwacji i kontakt z naszą ekipą odbywa się po polsku.",
      ),
    ],
    primaryQuery: "wycieczki z Sharm el Sheikh",
    seoTitle: "Wycieczki z Sharm el Sheikh do Kairu | GEM i piramidy",
    seoDescription:
      "Wycieczki fakultatywne z Sharm el Sheikh: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Cena od 93 USD, rezerwacja przez WhatsApp.",
    canonicalPath: "/wycieczki-z-sharm-el-sheikh/",
    ogImage: img(
      "og/sharm-el-sheikh.jpg",
      "Wielkie Muzeum Egipskie z podpisem Wycieczki z Sharm el Sheikh do Kairu",
    ),
  },
];

// --- tours -----------------------------------------------------------------

export const tours = [
  // A. HURGHADA -> KAIR ------------------------------------------------------
  {
    _id: IDS.tours.hurghada,
    _type: "tour",
    title: "Wycieczka z Hurghady do Kairu",
    h1: "Wycieczka z Hurghady do Kairu",
    slug: slug("kair-piramidy-muzeum-egipskie"),
    route: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie",
    destination: ref(IDS.destinations.hurghada),
    departure: "Hurghada",
    category: [ref(IDS.categories.kair), ref(IDS.categories.calodniowe)],
    tourType: "jednodniowa",
    shortDescription:
      "Cały dzień w Kairze i Gizie: Muzeum Egipskie, piramidy i Sfinks. Odbiór z hotelu w Hurghadzie, klimatyzowany autokar i polskojęzyczny przewodnik.",
    overview:
      "To klasyczna, jednodniowa wyprawa z Hurghady do serca starożytnego Egiptu. Odwiedzasz Muzeum Egipskie w centrum Kairu, a następnie płaskowyż w Gizie z trzema piramidami i Sfinksem. Trasa jest długa, bo obejmuje dojazd w obie strony, dlatego wyruszamy nocą - dzięki temu na miejscu masz cały dzień na zwiedzanie.",
    highlights: ["Muzeum Egipskie", "Piramidy w Gizie", "Sfinks", "Obiad"],
    heroImage: img(
      "tours/hurghada-kair.jpg",
      "Piramidy w Gizie o złotej godzinie, widok z płaskowyżu",
    ),
    gallery: [
      img("tours/hurghada-kair.jpg", "Piramidy w Gizie o złotej godzinie"),
      img("cairo/giza.jpg", "Trzy piramidy w Gizie z pustynnym pierwszym planem"),
      img("cairo/museum.jpg", "Wnętrze Muzeum Egipskiego z eksponatami starożytnego Egiptu"),
      img("cairo/sphinx.jpg", "Wielki Sfinks z piramidą w tle"),
    ],
    currency: "USD",
    adultPrice: 60,
    childPrice: 30,
    infantFree: true,
    childAgeMinimum: 5,
    childAgeMaximum: 11,
    priceLastVerifiedAt: VERIFIED,
    priceVariable: true,
    transferSupplements: [
      fee("Safaga, Soma Bay, Abu Soma, El Gouna", 10),
      fee("Makadi Bay", 5),
      fee("Sahl Hasheesh", 5),
    ],
    extras: [
      note("Rejs po Nilu", "ok. 10-12 USD od osoby, płatny na miejscu"),
      note("Wejście do wnętrza piramidy", "bilet dodatkowy, płatny na miejscu"),
    ],
    availabilityLabel: "Codziennie",
    availabilityDays: ["Codziennie"],
    durationLabel: "ok. 20-22 godzin",
    pickupTime: "ok. 00:00-02:00",
    transport: "Klimatyzowany autokar, odbiór i powrót pod hotel",
    guideLanguageLabel: "Polski",
    guidePolishConfirmed: true,
    itinerary: [
      step(
        "00:00-02:00",
        "Odbiór z hotelu",
        "Kierowca odbiera Cię spod hotelu w Hurghadzie. Godzinę podajemy wcześniej na WhatsApp - zależy od trasy autokaru.",
      ),
      step(
        null,
        "Przejazd do Kairu",
        "Nocna trasa klimatyzowanym autokarem w kierunku stolicy. To dobry moment na sen przed pełnym dniem zwiedzania.",
      ),
      step(
        null,
        "Muzeum Egipskie",
        "Zwiedzanie Muzeum Egipskiego w centrum Kairu - najważniejsze zabytki starożytnego Egiptu w towarzystwie przewodnika.",
      ),
      step(
        null,
        "Płaskowyż w Gizie",
        "Trzy wielkie piramidy z bliska, czas na zdjęcia i spacer po terenie płaskowyżu.",
      ),
      step(null, "Sfinks", "Wielki Sfinks - jeden z najbardziej rozpoznawalnych symboli Egiptu."),
      step(null, "Obiad", "Ciepły posiłek w restauracji (bez napojów). Chwila odpoczynku w środku dnia."),
      step(
        null,
        "Opcjonalny rejs po Nilu",
        "Dla chętnych krótki rejs po Nilu za dopłatą - dobry sposób na inne spojrzenie na miasto.",
      ),
      step(
        null,
        "Powrót do Hurghady",
        "Droga powrotna autokarem z postojami. Powrót pod hotel wieczorem lub w nocy.",
      ),
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
    faqs: [
      faqItem(
        "Czy przewodnik mówi po polsku?",
        "Tak, na trasie z Hurghady zapewniamy polskojęzycznego przewodnika.",
      ),
      faqItem(
        "Ile kosztuje wycieczka dla dziecka?",
        "Dzieci w wieku 5-11 lat: 30 USD. Dzieci poniżej 5 lat jadą bezpłatnie. Dorośli: 60 USD od osoby.",
      ),
      faqItem(
        "Czy rejs po Nilu jest w cenie?",
        "Nie. To opcja dodatkowa (ok. 10-12 USD od osoby), płatna na miejscu dla chętnych.",
      ),
    ],
    featured: true,
    relatedTours: [weakRef(IDS.tours.marsaAlam), weakRef(IDS.tours.sharm)],
    relatedPost: weakRef(IDS.post),
    seoTitle: "Wycieczka z Hurghady do Kairu | Piramidy i Muzeum",
    seoDescription:
      "Jednodniowa wycieczka z Hurghady do Kairu: Muzeum Egipskie, piramidy w Gizie i Sfinks. Cena od 60 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
    canonicalPath: "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/",
    ogImage: img("og/hurghada.jpg", "Piramidy w Gizie z podpisem Wycieczka z Hurghady do Kairu"),
    published: true,
    updatedAt: VERIFIED,
  },

  // B. MARSA ALAM -> KAIR + STARY KAIR ---------------------------------------
  {
    _id: IDS.tours.marsaAlam,
    _type: "tour",
    title: "Wycieczka z Marsa Alam do Kairu",
    h1: "Wycieczka z Marsa Alam do Kairu",
    slug: slug("kair-stary-kair-piramidy"),
    route: "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy",
    destination: ref(IDS.destinations.marsaAlam),
    departure: "Marsa Alam",
    category: [ref(IDS.categories.kair), ref(IDS.categories.calodniowe)],
    tourType: "jednodniowa",
    shortDescription:
      "Rozbudowany program z Marsa Alam: Stary Kair z zabytkami trzech religii oraz piramidy i Sfinks w Gizie. Odbiór z hotelu i polskojęzyczny przewodnik.",
    overview:
      "Wyprawa z Marsa Alam łączy dwie twarze Kairu. Rano poznajesz Stary Kair - dzielnicę, w której obok siebie stoją kościół Wiszący, meczet Amr ibn al-As i synagoga Ben Ezra. Po południu jedziesz na płaskowyż w Gizie, do piramid i Sfinksa. Ponieważ Marsa Alam leży daleko na południu, dzień jest długi, a program - naprawdę pełny.",
    highlights: ["Stary Kair", "Piramidy w Gizie", "Sfinks", "Obiad"],
    heroImage: img(
      "tours/marsa-alam-kair.jpg",
      "Kościół Wiszący w Starym Kairze z charakterystyczną fasadą",
    ),
    gallery: [
      img("tours/marsa-alam-kair.jpg", "Stary Kair - zabytkowa dzielnica"),
      img("cairo/giza.jpg", "Trzy piramidy w Gizie"),
      img("cairo/sphinx.jpg", "Wielki Sfinks z piramidą w tle"),
      img("cairo/nile.jpg", "Nil w Kairze o zachodzie słońca"),
    ],
    currency: "USD",
    adultPrice: 80,
    childPrice: 40,
    infantFree: true,
    childAgeMinimum: 5,
    childAgeMaximum: 11,
    priceLastVerifiedAt: VERIFIED,
    priceVariable: true,
    transferSupplements: [
      fee(
        "Hotele oddalone: Wadi Lahmy Azur, Lahami Bay, Shams Alam, Gorgonia, Fantazia, Sirena Beach, Reef Oasis, Sunrise Anjum, Gemma Resort, Blue Lagoon, Dream Lagoon, Emerald Lagoon, True Beach, Aurora Bay",
        10,
      ),
    ],
    extras: [note("Rejs po Nilu", "ok. 10-12 USD od osoby, płatny na miejscu")],
    availabilityLabel: "We wtorki",
    availabilityDays: ["Wtorek"],
    durationLabel: "cała doba, dzień intensywny",
    pickupTime: "ok. 23:00-24:00",
    transport: "Transfer z Marsa Alam do Hurghady, dalej klimatyzowany autokar",
    guideLanguageLabel: "Polski",
    guidePolishConfirmed: true,
    itinerary: [
      step(
        "23:00-24:00",
        "Odbiór z hotelu",
        "Wyjazd z hotelu w Marsa Alam minibusem lub samochodem w kierunku Hurghady.",
      ),
      step(
        null,
        "Przesiadka w Hurghadzie",
        "W Hurghadzie przesiadasz się do klimatyzowanego autokaru jadącego do Kairu.",
      ),
      step(
        null,
        "Stary Kair",
        "Kościół Wiszący, kościół świętego Sergiusza, meczet Amr ibn al-As i synagoga Ben Ezra - miejsca trzech religii w jednej dzielnicy.",
      ),
      step(
        null,
        "Płaskowyż w Gizie",
        "Trzy piramidy i Sfinks. Na terenie Gizy spędzasz ok. 1,5 godziny - czas na zdjęcia i spacer.",
      ),
      step(null, "Obiad", "Ciepły posiłek w restauracji (bez napojów)."),
      step(null, "Opcjonalny rejs po Nilu", "Dla chętnych krótki rejs po Nilu za dopłatą."),
      step(
        null,
        "Powrót do Marsa Alam",
        "Droga powrotna autokarem do Hurghady i dalej transferem do hotelu w Marsa Alam.",
      ),
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
    faqs: [
      faqItem(
        "Czym różni się ta trasa od wyjazdu z Hurghady?",
        "Program z Marsa Alam dodatkowo obejmuje Stary Kair, a droga jest dłuższa, bo najpierw jedziesz do Hurghady na przesiadkę.",
      ),
      faqItem(
        "Ile czasu spędzam przy piramidach?",
        "Na płaskowyżu w Gizie masz około 1,5 godziny - czas na zdjęcia, spacer i obejrzenie Sfinksa.",
      ),
      faqItem(
        "Ile kosztuje wycieczka dla dziecka?",
        "Dzieci 5-11 lat: 40 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 80 USD od osoby.",
      ),
    ],
    featured: true,
    relatedTours: [weakRef(IDS.tours.hurghada), weakRef(IDS.tours.sharm)],
    relatedPost: weakRef(IDS.post),
    seoTitle: "Wycieczka z Marsa Alam do Kairu | Stary Kair i Piramidy",
    seoDescription:
      "Wycieczka z Marsa Alam do Kairu: Stary Kair, piramidy w Gizie i Sfinks. Cena od 80 USD, odbiór z hotelu, polski przewodnik, rezerwacja przez WhatsApp.",
    canonicalPath: "/wycieczki-z-marsa-alam/kair-stary-kair-piramidy/",
    ogImage: img(
      "og/marsa-alam.jpg",
      "Zabytki Starego Kairu z podpisem Wycieczka z Marsa Alam do Kairu",
    ),
    published: true,
    updatedAt: VERIFIED,
  },

  // C. SHARM EL SHEIKH -> KAIR + GEM -----------------------------------------
  {
    _id: IDS.tours.sharm,
    _type: "tour",
    title: "Wycieczka z Sharm el Sheikh do Kairu",
    h1: "Wycieczka z Sharm el Sheikh do Kairu",
    slug: slug("kair-gem-piramidy"),
    route: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy",
    destination: ref(IDS.destinations.sharm),
    departure: "Sharm el Sheikh",
    category: [ref(IDS.categories.kair), ref(IDS.categories.calodniowe)],
    tourType: "jednodniowa",
    shortDescription:
      "Z Synaju do Kairu krótszą trasą: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Odbiór z hotelu i klimatyzowany autokar.",
    overview:
      "Wyprawa z Sharm el Sheikh prowadzi z Synaju do Kairu inną, krótszą trasą niż znad Morza Czerwonego. W programie jest Wielkie Muzeum Egipskie (GEM) - najnowocześniejsza placówka tego typu w kraju - oraz płaskowyż w Gizie z piramidami i Sfinksem. Dzień kończy się obiadem i czasem na zdjęcia, a dla chętnych opcjonalnym rejsem po Nilu.",
    highlights: ["Wielkie Muzeum Egipskie (GEM)", "Piramidy w Gizie", "Sfinks", "Obiad"],
    heroImage: img(
      "tours/sharm-kair.jpg",
      "Nowoczesna bryła Wielkiego Muzeum Egipskiego (GEM) przy Gizie",
    ),
    gallery: [
      img("tours/sharm-kair.jpg", "Wielkie Muzeum Egipskie (GEM)"),
      img("cairo/giza.jpg", "Trzy piramidy w Gizie"),
      img("cairo/sphinx.jpg", "Wielki Sfinks z piramidą w tle"),
      img("cairo/nile.jpg", "Nil w Kairze o zachodzie słońca"),
    ],
    currency: "USD",
    adultPrice: 93,
    childPrice: 60,
    infantFree: true,
    childAgeMinimum: 5,
    childAgeMaximum: 11,
    priceLastVerifiedAt: VERIFIED,
    priceVariable: true,
    transferSupplements: [],
    extras: [note("Rejs po Nilu", "ok. 10-12 USD od osoby, płatny na miejscu")],
    availabilityLabel: "Codziennie (wg dostępności)",
    availabilityDays: ["Codziennie"],
    durationLabel: "cały dzień, powrót ok. 22:00-23:00",
    pickupTime: "ok. 00:00-02:00",
    transport: "Klimatyzowany autokar z Sharm el Sheikh do Kairu i z powrotem",
    // The operator's source page contradicts itself about the guide language
    // (Polish in one place, English in another). We do not guess: the label
    // says it is confirmed before booking and guidePolishConfirmed stays false.
    guideLanguageLabel: "Potwierdzamy przed rezerwacją",
    guidePolishConfirmed: false,
    itinerary: [
      step(
        "00:00-02:00",
        "Odbiór z hotelu",
        "Kierowca odbiera Cię spod hotelu w Sharm el Sheikh. Godzinę podajemy wcześniej na WhatsApp.",
      ),
      step(null, "Przejazd do Kairu", "Klimatyzowany autokar, ok. 6-8 godzin drogi z Synaju do stolicy."),
      step(
        null,
        "Wielkie Muzeum Egipskie (GEM)",
        "Zwiedzanie najnowocześniejszego muzeum w Egipcie, położonego przy płaskowyżu w Gizie.",
      ),
      step(null, "Płaskowyż w Gizie", "Piramidy i Sfinks z bliska, czas na zdjęcia."),
      step(null, "Obiad", "Ciepły posiłek w restauracji (bez napojów)."),
      step(null, "Opcjonalny rejs po Nilu", "Dla chętnych krótki rejs po Nilu za dopłatą."),
      step(
        "22:00-23:00",
        "Powrót do hotelu",
        "Droga powrotna autokarem, powrót do hotelu zwykle między 22:00 a 23:00.",
      ),
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
    faqs: [
      faqItem(
        "W jakim języku mówi przewodnik?",
        "Język przewodnika na tej trasie potwierdzamy przed rezerwacją. Cała obsługa rezerwacji odbywa się po polsku.",
      ),
      faqItem(
        "Co to jest GEM?",
        "Wielkie Muzeum Egipskie (Grand Egyptian Museum) - nowa, bardzo duża placówka przy Gizie, wpisana w program tej wycieczki.",
      ),
      faqItem(
        "Ile kosztuje wycieczka dla dziecka?",
        "Dzieci 5-11 lat: 60 USD. Dzieci poniżej 5 lat bezpłatnie. Dorośli: 93 USD od osoby.",
      ),
    ],
    featured: true,
    relatedTours: [weakRef(IDS.tours.hurghada), weakRef(IDS.tours.marsaAlam)],
    relatedPost: weakRef(IDS.post),
    seoTitle: "Wycieczka z Sharm el Sheikh do Kairu | GEM i Piramidy",
    seoDescription:
      "Wycieczka z Sharm el Sheikh do Kairu: Wielkie Muzeum Egipskie (GEM), piramidy w Gizie i Sfinks. Cena od 93 USD, odbiór z hotelu, rezerwacja przez WhatsApp.",
    canonicalPath: "/wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/",
    ogImage: img(
      "og/sharm-el-sheikh.jpg",
      "Wielkie Muzeum Egipskie z podpisem Wycieczka z Sharm el Sheikh do Kairu",
    ),
    published: true,
    updatedAt: VERIFIED,
  },
];

// --- blog posts ------------------------------------------------------------

export const posts = [
  {
    _id: IDS.post,
    _type: "blogPost",
    title: "Co zabrać na wycieczkę do Kairu? Praktyczna lista",
    h1: "Co zabrać na wycieczkę do Kairu?",
    slug: slug("co-zabrac-na-wycieczke-do-kairu"),
    route: "/poradnik/co-zabrac-na-wycieczke-do-kairu",
    excerpt:
      "Konkretna lista rzeczy na jednodniową wyprawę z Hurghady, Marsa Alam lub Sharm el Sheikh do Kairu. Dokumenty, ubranie, woda, gotówka i kilka rzeczy, o których łatwo zapomnieć.",
    directAnswer:
      "Na wycieczkę do Kairu zabierz: paszport, wygodne buty, nakrycie głowy i krem z filtrem, wodę i przekąski na długą drogę, gotówkę w USD na napoje i opcjonalne atrakcje, powerbank oraz lekki, skromniejszy ubiór na wizyty w miejscach kultu. Wyprawa trwa cały dzień i zaczyna się nocą, dlatego liczy się wygoda.",
    featuredImage: img(
      "blog/co-zabrac-na-wycieczke-do-kairu.jpg",
      "Spakowany plecak podróżny z kapeluszem i butelką wody na tle pustyni",
    ),
    category: "Przed wyjazdem",
    author: ref(IDS.author),
    // relatedDestination is intentionally unset: the article covers all three.
    relatedTours: [
      weakRef(IDS.tours.hurghada),
      weakRef(IDS.tours.marsaAlam),
      weakRef(IDS.tours.sharm),
    ],
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    body: [
      paragraph(
        "Wyprawa do Kairu z kurortu nad Morzem Czerwonym to jeden z najdłuższych dni podczas wakacji w Egipcie. Wyjazd zaczyna się w nocy, droga w jedną stronę trwa kilka godzin, a na miejscu czeka pełny program: muzeum, piramidy i Sfinks. Dobre spakowanie się nie jest więc fanaberią - realnie decyduje o tym, czy dzień będzie wygodny, czy męczący. Poniżej znajdziesz konkretną listę, uporządkowaną od rzeczy najważniejszych.",
      ),
      heading("dokumenty", "Dokumenty"),
      paragraph(
        "Na trasę do Kairu zabierz paszport. Zabytki i punkty kontrolne po drodze bywają miejscami, w których trzeba okazać dokument tożsamości, a kopia w telefonie nie zawsze wystarcza. Warto mieć tę samą wersję dokumentu, na którą rezerwowałeś pobyt.",
      ),
      callout(
        "warning",
        "Przepisy wjazdowe i wymagania dotyczące dokumentów mogą się zmieniać. Przed wyjazdem sprawdź aktualne zasady u swojego biura, w hotelu lub w oficjalnym źródle. Ten poradnik ma charakter praktyczny i nie zastępuje aktualnych informacji urzędowych.",
      ),
      heading("ubranie-i-buty", "Ubranie i buty"),
      paragraph(
        "Klucz to wygoda i warstwy. W ciągu dnia w Kairze bywa gorąco, ale nocna droga autokarem i klimatyzacja potrafią być chłodne. Sprawdza się lekka bluza lub chusta na wierzch.",
      ),
      list(false, [
        "Wygodne, rozchodzone buty - przez większość dnia będziesz chodzić.",
        "Przewiewne, jasne ubranie na dzień.",
        "Lekka warstwa na chłodniejszy przejazd i klimatyzację.",
        "Skromniejszy ubiór (zakryte ramiona i kolana) na wizyty w miejscach kultu, zwłaszcza na trasie z Marsa Alam ze Starym Kairem.",
      ]),
      heading("ochrona-przed-sloncem", "Ochrona przed słońcem"),
      list(false, [
        "Nakrycie głowy - kapelusz lub czapka z daszkiem.",
        "Okulary przeciwsłoneczne.",
        "Krem z wysokim filtrem - na płaskowyżu w Gizie nie ma gdzie schować się w cieniu.",
      ]),
      // Demonstrates the `blockImage` type: image asset + alt + visible caption.
      imageBlock(
        "cairo/giza.jpg",
        "Trzy piramidy w Gizie z pustynnym pierwszym planem",
        "Płaskowyż w Gizie to otwarta pustynia - cienia praktycznie nie ma, dlatego nakrycie głowy i krem z filtrem są tu ważniejsze niż gdziekolwiek indziej na trasie.",
      ),
      heading("woda-i-przekaski", "Woda i przekąski"),
      paragraph(
        "Obiad jest w cenie wycieczki, ale bez napojów. Zabierz wodę na drogę i drobne przekąski - przydadzą się w długim przejeździe, szczególnie dzieciom. Większa butelka wody i coś energetycznego (baton, owoce, orzechy) realnie poprawiają komfort.",
      ),
      heading("gotowka", "Gotówka i płatności"),
      paragraph(
        "Miej przy sobie gotówkę, najlepiej w USD w drobnych nominałach. Przyda się na napoje, napiwki, pamiątki oraz opcjonalne atrakcje, które nie są wliczone w cenę - na przykład krótki rejs po Nilu (ok. 10-12 USD od osoby) czy wejście do wnętrza piramidy. Nie zakładaj, że wszędzie zapłacisz kartą.",
      ),
      heading("elektronika", "Elektronika"),
      list(false, [
        "Powerbank - telefon szybko się rozładowuje od zdjęć i nawigacji.",
        "Naładowany telefon z zapisanym kontaktem WhatsApp do obsługi.",
        "Opcjonalnie słuchawki - pomagają odpocząć podczas nocnego przejazdu.",
      ]),
      heading("apteczka", "Leki i apteczka"),
      paragraph(
        "Zabierz swoje stałe leki oraz mały, podręczny zestaw: coś na ból głowy, plastry, chusteczki nawilżane i - jeśli źle znosisz długie przejazdy - preparat na chorobę lokomocyjną. To rzeczy, których nie kupisz wygodnie w trasie.",
      ),
      heading("dzieci", "Podróż z dziećmi"),
      paragraph(
        "Dzieci poniżej 5 lat jadą bezpłatnie, a dla dzieci w wieku 5-11 lat obowiązuje niższa cena. Dla najmłodszych spakuj coś do picia i jedzenia, ulubioną przekąskę oraz coś, co zajmie uwagę podczas długiej drogi - książeczkę, słuchawki, grę. Wygodne ubranie na zmianę też się przyda.",
      ),
      heading("dluga-droga", "Jak przygotować się na długą drogę"),
      paragraph(
        "Najdłuższe trasy to wyjazdy z Marsa Alam i z Hurghady - potrafią zająć całą dobę z dojazdami. Z Sharm el Sheikh jest krócej, bo droga z Synaju do Kairu jest krótsza. Niezależnie od kurortu wyśpij się przed wyjazdem, a w autokarze wykorzystaj czas na sen. Poduszka pod kark i lekki koc lub bluza sprawiają, że noc w drodze mija znacznie lżej.",
      ),
      heading("czego-nie-pakowac", "Czego nie pakować"),
      list(false, [
        "Dużej, ciężkiej torby - liczy się lekki plecak, z którym wygodnie chodzisz.",
        "Wartościowych rzeczy, których nie potrzebujesz - zostaw je w hotelowym sejfie.",
        "Nadmiaru ubrań - to jeden dzień, nie potrzebujesz całej walizki.",
      ]),
      heading("roznice-kurorty", "Różnice między kurortami"),
      paragraph(
        "Z Hurghady jedziesz na klasyczną trasę: Muzeum Egipskie, piramidy i Sfinks. Z Marsa Alam program jest szerszy o Stary Kair, dlatego przyda się skromniejszy ubiór. Z Sharm el Sheikh zwiedzasz nowoczesne Wielkie Muzeum Egipskie (GEM) i Gizę, a dzień jest nieco krótszy. Dopłaty za transfer dotyczą tylko wybranych, bardziej oddalonych hoteli - warto to potwierdzić przy rezerwacji.",
      ),
      // Demonstrates the `blockTable` type. Prices verified on 2026-08-08 - keep
      // them in step with the tour documents above.
      table(
        "Porównanie tras do Kairu z trzech kurortów. Ceny dla osoby dorosłej, zweryfikowane 8 sierpnia 2026 r.",
        ["Kurort", "Program", "Czas trwania", "Cena od (dorosły)"],
        [
          [
            "Hurghada",
            "Muzeum Egipskie, piramidy w Gizie, Sfinks",
            "ok. 20-22 godzin",
            "60 USD",
          ],
          [
            "Marsa Alam",
            "Stary Kair, piramidy w Gizie, Sfinks",
            "cała doba, dzień intensywny",
            "80 USD",
          ],
          [
            "Sharm el Sheikh",
            "Wielkie Muzeum Egipskie (GEM), piramidy w Gizie",
            "cały dzień, powrót ok. 22:00-23:00",
            "93 USD",
          ],
        ],
      ),
    ],
    faqs: [
      faqItem(
        "Czy na wycieczkę do Kairu potrzebny jest paszport?",
        "Na trasę do Kairu zabierz paszport. Aktualne wymagania dokumentowe warto potwierdzić przed wyjazdem u biura, w hotelu lub w oficjalnym źródle.",
      ),
      faqItem(
        "Ile gotówki zabrać na wycieczkę do Kairu?",
        "Tyle, by starczyło na napoje, napiwki, pamiątki i opcjonalne atrakcje (np. rejs po Nilu ok. 10-12 USD od osoby). Najlepiej drobne nominały w USD.",
      ),
      faqItem(
        "Czy obiad jest w cenie wycieczki?",
        "Tak, obiad jest w cenie, ale bez napojów. Napoje warto zabrać ze sobą lub kupić na miejscu.",
      ),
    ],
    sources: [
      note(
        "Wymagania wjazdowe i dokumenty",
        "Zasady wjazdu do Egiptu mogą się zmieniać - przed wyjazdem sprawdź aktualne informacje w oficjalnym źródle rządowym lub u swojego biura podróży.",
      ),
    ],
    seoTitle: "Co zabrać na wycieczkę do Kairu? Praktyczna lista | Poradnik",
    seoDescription:
      "Praktyczna lista rzeczy na jednodniową wycieczkę do Kairu z Hurghady, Marsa Alam lub Sharm el Sheikh: dokumenty, ubranie, woda, gotówka i wskazówki na długą drogę.",
    canonicalPath: "/poradnik/co-zabrac-na-wycieczke-do-kairu/",
    ogImage: img(
      "og/poradnik.jpg",
      "Spakowany plecak podróżny z podpisem Co zabrać na wycieczkę do Kairu",
    ),
    published: true,
  },
];

// --- legal pages -----------------------------------------------------------

const LEGAL_UPDATED = "2026-08-08";

export const legalPages = [
  {
    _id: "legalPage.polityka-prywatnosci",
    _type: "legalPage",
    slug: slug("polityka-prywatnosci"),
    route: "/polityka-prywatnosci",
    title: "Polityka prywatności",
    updatedAt: LEGAL_UPDATED,
    body: [
      callout(
        "warning",
        "Dokument wymaga uzupełnienia pełnych danych operatora (nazwa podmiotu, adres, dane rejestrowe) oraz weryfikacji przez właściciela lub prawnika przed publikacją produkcyjną. Poniższa treść opisuje faktyczne działanie strony.",
      ),
      heading("administrator", "1. Administrator danych"),
      paragraph(
        "Administratorem danych związanych z serwisem egipskiewakacje.pl jest operator marki Egipskie Wakacje. Pełne dane identyfikacyjne i kontaktowe operatora zostaną uzupełnione po ich potwierdzeniu. Kontakt w sprawach bieżących odbywa się przez WhatsApp podany w serwisie.",
      ),
      heading("zakres", "2. Jakie dane przetwarzamy"),
      paragraph(
        "Strona ma charakter informacyjny i statyczny. Nie prowadzimy kont użytkowników ani płatności online. Formularz rezerwacji działa lokalnie w Twojej przeglądarce: na jego podstawie tworzona jest gotowa wiadomość, która otwiera się w aplikacji WhatsApp. Serwis nie zapisuje w żadnej bazie danych informacji podanych w formularzu (imię, hotel, data, liczba osób, uwagi).",
      ),
      heading("whatsapp", "3. Kontakt przez WhatsApp"),
      paragraph(
        "Po kliknięciu przycisku rezerwacji lub kontaktu przechodzisz do aplikacji WhatsApp. Od tego momentu przetwarzanie Twoich danych (w tym numeru telefonu i treści wiadomości) odbywa się na zasadach WhatsApp oraz jego dostawcy. Zachęcamy do zapoznania się z polityką prywatności WhatsApp.",
      ),
      heading("cookies", "4. Pliki cookies i analityka"),
      paragraph(
        "W obecnej wersji serwis nie używa plików cookies do śledzenia ani zewnętrznych narzędzi analitycznych. Jeśli w przyszłości wprowadzimy analitykę, przed uruchomieniem śledzenia poprosimy o zgodę. Szczegóły opisuje Polityka cookies.",
      ),
      heading("prawa", "5. Twoje prawa"),
      paragraph(
        "Przysługują Ci prawa wynikające z RODO, w tym prawo dostępu do danych, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Ponieważ serwis nie przechowuje danych z formularza, dotyczą one przede wszystkim korespondencji prowadzonej przez WhatsApp. W sprawach dotyczących danych napisz do nas przez WhatsApp.",
      ),
    ],
    seoTitle: "Polityka prywatności | Egipskie Wakacje",
    seoDescription:
      "Polityka prywatności serwisu egipskiewakacje.pl. Strona statyczna, brak płatności online, formularz rezerwacji działa lokalnie i otwiera WhatsApp.",
    canonicalPath: "/polityka-prywatnosci/",
  },
  {
    _id: "legalPage.polityka-cookies",
    _type: "legalPage",
    slug: slug("polityka-cookies"),
    route: "/polityka-cookies",
    title: "Polityka cookies",
    updatedAt: LEGAL_UPDATED,
    body: [
      heading("czym-sa", "1. Czym są pliki cookies"),
      paragraph(
        "Pliki cookies to niewielkie informacje zapisywane przez stronę w przeglądarce użytkownika. Mogą służyć działaniu strony lub celom analitycznym i marketingowym.",
      ),
      heading("jak-uzywamy", "2. Jak używamy cookies"),
      paragraph(
        "W obecnej wersji serwis egipskiewakacje.pl nie stosuje plików cookies do śledzenia ani nie ładuje zewnętrznych skryptów analitycznych i reklamowych. Z tego powodu nie wyświetlamy banera zgody na cookies - nie ma do tego niezbędnej podstawy.",
      ),
      heading("w-przyszlosci", "3. Ewentualne zmiany"),
      paragraph(
        "Jeśli w przyszłości wprowadzimy narzędzia analityczne (np. statystyki odwiedzin), zaktualizujemy ten dokument, a przed uruchomieniem śledzenia poprosimy o zgodę zgodnie z obowiązującymi przepisami.",
      ),
      heading("zarzadzanie", "4. Zarządzanie cookies"),
      paragraph(
        "Niezależnie od powyższego możesz w każdej chwili zarządzać plikami cookies w ustawieniach swojej przeglądarki - w tym je blokować i usuwać.",
      ),
    ],
    seoTitle: "Polityka cookies | Egipskie Wakacje",
    seoDescription:
      "Polityka cookies serwisu egipskiewakacje.pl. Obecnie strona nie stosuje cookies śledzących ani zewnętrznych skryptów analitycznych.",
    canonicalPath: "/polityka-cookies/",
  },
  {
    _id: "legalPage.regulamin",
    _type: "legalPage",
    slug: slug("regulamin"),
    route: "/regulamin",
    title: "Regulamin",
    updatedAt: LEGAL_UPDATED,
    body: [
      callout(
        "warning",
        "Regulamin wymaga uzupełnienia pełnych danych operatora oraz weryfikacji prawnej przed publikacją produkcyjną. Poniższa treść opisuje faktyczny sposób działania serwisu i rezerwacji.",
      ),
      heading("postanowienia", "1. Postanowienia ogólne"),
      paragraph(
        "Serwis egipskiewakacje.pl prezentuje wycieczki fakultatywne w Egipcie z odbiorem z hoteli w Hurghadzie, Marsa Alam i Sharm el Sheikh. Serwis ma charakter informacyjny i służy nawiązaniu kontaktu w celu rezerwacji.",
      ),
      heading("rezerwacja", "2. Rezerwacja"),
      paragraph(
        "Rezerwacje składasz przez formularz, który tworzy gotową wiadomość WhatsApp. Zgłoszenie jest wstępne. Umowa i szczegóły (dostępność, godzina odbioru, ostateczna cena) są potwierdzane w korespondencji z naszą ekipą. Serwis nie przyjmuje płatności online.",
      ),
      heading("ceny", "3. Ceny"),
      paragraph(
        "Ceny podawane są w USD i dotyczą aktualnej oferty. Ostateczny koszt może zależeć od strefy hotelowej (dopłata za transfer) oraz opcjonalnych atrakcji. Datę ostatniej weryfikacji ceny podajemy przy każdej wycieczce.",
      ),
      heading("zakres", "4. Zakres usługi"),
      paragraph(
        "Program, czas trwania i zakres wycieczki opisano na stronach poszczególnych wypraw. Elementy oznaczone jako opcjonalne lub nieujęte w cenie nie wchodzą w skład podstawowej usługi.",
      ),
      heading("kontakt", "5. Kontakt i reklamacje"),
      paragraph(
        "W sprawach dotyczących rezerwacji i ewentualnych reklamacji kontaktuj się z nami przez WhatsApp podany w serwisie. Pełne dane operatora i procedura reklamacyjna zostaną uzupełnione po ich potwierdzeniu.",
      ),
    ],
    seoTitle: "Regulamin | Egipskie Wakacje",
    seoDescription:
      "Regulamin serwisu egipskiewakacje.pl. Rezerwacja przez WhatsApp, brak płatności online, ceny w USD, potwierdzenie szczegółów przez ekipę.",
    canonicalPath: "/regulamin/",
  },
];

// --- site-wide FAQ ---------------------------------------------------------

/** Mirrors `siteFaqs` in src/content/local/site.ts, in the same order. */
export const faqs = [
  [
    "Jak zarezerwować wycieczkę?",
    "Wybierz wycieczkę, uzupełnij krótki formularz (imię, data, hotel, liczba osób) i wyślij zgłoszenie. Otworzy się WhatsApp z gotową wiadomością. Nasza ekipa potwierdza dostępność, godzinę odbioru i cenę. Nie ma płatności online.",
  ],
  [
    "Kiedy otrzymam godzinę odbioru?",
    "Godzinę odbioru podajemy na WhatsApp przed wyjazdem. Zależy ona od położenia hotelu i trasy autokaru danego dnia - zwykle jest to noc (ok. 00:00-02:00), a z Marsa Alam nieco wcześniej.",
  ],
  [
    "Czy odbiór odbywa się z hotelu?",
    "Tak. Odbieramy i odwozimy pod hotel. W przypadku bardziej oddalonych stref obowiązuje niewielka dopłata za transfer - podajemy ją przy potwierdzeniu rezerwacji.",
  ],
  [
    "Jak wygląda płatność?",
    "Nie pobieramy płatności online. Szczegóły rozliczenia ustalamy przy potwierdzeniu rezerwacji na WhatsApp. Ceny podajemy w USD.",
  ],
  [
    "Jak liczone są ceny dla dzieci?",
    "Dzieci poniżej 5 lat jadą bezpłatnie. Dla dzieci w wieku 5-11 lat obowiązuje niższa cena: 30 USD z Hurghady, 40 USD z Marsa Alam i 60 USD z Sharm el Sheikh.",
  ],
  [
    "Czy rejs po Nilu jest w cenie?",
    "Nie. Rejs po Nilu to opcja dodatkowa (ok. 10-12 USD od osoby), płatna na miejscu dla chętnych.",
  ],
  [
    "W jakim języku mówi przewodnik?",
    "Na trasach z Hurghady i Marsa Alam zapewniamy polskojęzycznego przewodnika. Na trasie z Sharm el Sheikh język przewodnika potwierdzamy przed rezerwacją. Niezależnie od trasy cała obsługa rezerwacji odbywa się po polsku.",
  ],
  [
    "Co zabrać na wycieczkę do Kairu?",
    "Przede wszystkim paszport, wygodne buty, nakrycie głowy, wodę, gotówkę na napoje i opcjonalne atrakcje oraz powerbank. Pełną listę znajdziesz w naszym poradniku.",
  ],
].map(([question, answer], index) => ({
  _id: `faq.site-${String(index + 1).padStart(2, "0")}`,
  _type: "faq",
  question,
  answer,
  scope: "site",
}));

/**
 * Upsert order matters only for readability - editorial cross-links between
 * tours and articles are weak references, so nothing depends on ordering.
 * Structural targets (destination, tourCategory, author) still come first.
 */
export const seedDocuments = [
  siteSettings,
  author,
  ...tourCategories,
  ...destinations,
  ...tours,
  ...posts,
  ...legalPages,
  ...faqs,
];
