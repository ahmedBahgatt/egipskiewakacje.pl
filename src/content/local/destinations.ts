import type { Destination } from "@/content/types";

/**
 * Destination overview content. Original Polish copy - written from scratch,
 * not paraphrased from any source page. Each destination targets a distinct
 * primary query to avoid cannibalisation (see SEO_PLAN.md).
 */
export const destinations: Destination[] = [
  {
    slug: "hurghada",
    routeBase: "/wycieczki-z-hurghady",
    name: "Hurghada",
    nameGenitive: "Hurghady",
    shortIntro:
      "Hurghada to najlepsza baza wypadowa nad Morzem Czerwonym. Stąd pojedziesz na wycieczki fakultatywne w każdą stronę: Kair i piramidy, Luksor, rejsy na wyspy takie jak Orange Bay i Mahmya, snorkeling z delfinami, safari quadami i buggy oraz lokalne atrakcje jak Wielkie Akwarium. Odbiór z hotelu w cenie, a szczegóły potwierdzamy po polsku.",
    heroImage: {
      src: "/media/destinations/hurghada",
      alt: "Panorama wybrzeża Hurghady nad turkusowym Morzem Czerwonym o poranku",
      width: 1600,
      height: 1000,
    },
    practical: [
      "Odbiór z hotelu w Hurghadzie i strefach sąsiednich - godzinę podajemy przed wyjazdem.",
      "Przejazd klimatyzowanym autokarem, z postojami w drodze powrotnej.",
      "Wyprawa do Kairu i Gizy trwa cały dzień - wyjazd wypada w nocy, a powrót wieczorem lub w nocy.",
      "Dopłaty za transfer dotyczą tylko wybranych, bardziej oddalonych stref hotelowych.",
    ],
    faqs: [
      {
        question: "O której godzinie jest odbiór z hotelu w Hurghadzie?",
        answer:
          "Odbiór odbywa się zwykle między 00:00 a 02:00, w zależności od położenia hotelu. Dokładną godzinę potwierdzamy na WhatsApp po rezerwacji, bo zależy ona od trasy autokaru danego dnia.",
      },
      {
        question: "Czy z Hurghady da się pojechać do Kairu i wrócić tego samego dnia?",
        answer:
          "Tak. Wyprawa jest jednodniowa, ale długa - łączny czas z dojazdami to około 20-22 godzin. Wyjazd jest w nocy, a powrót do hotelu następnego dnia wieczorem lub w nocy.",
      },
      {
        question: "Które hotele w Hurghadzie mają dopłatę za transfer?",
        answer:
          "Dopłata dotyczy stref bardziej oddalonych od centrum: El Gouna, Safaga, Soma Bay, Abu Soma - 10 USD od osoby, oraz Makadi Bay i Sahl Hasheesh - 5 USD od osoby. Hotele w samej Hurghadzie są bez dopłaty.",
      },
    ],
    seo: {
      title: "Wycieczki z Hurghady - fakultatywne, Kair, morze, safari",
      description:
        "Wycieczki fakultatywne z Hurghady: Kair i piramidy, Luksor, rejsy na wyspy, snorkeling, delfiny, nurkowanie i safari. Odbiór z hotelu, ceny od 12 USD, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-hurghady/",
      ogImage: "/media/og/hurghada.jpg",
    },
    primaryQuery: "wycieczki z Hurghady",
  },
  {
    slug: "marsa-alam",
    routeBase: "/wycieczki-z-marsa-alam",
    name: "Marsa Alam",
    nameGenitive: "Marsa Alam",
    shortIntro:
      "Marsa Alam to raj dla miłośników morza. To najlepsze miejsce na wycieczki fakultatywne ze snorkelingiem i pływaniem z dzikimi delfinami - Sataya, Samadai i zatoka Abu Dabbab ze żółwiami. Z Marsa Alam pojedziesz też do Kairu i Luksoru, na rejsy, nurkowanie i pustynne safari. Odbiór z hotelu, obsługa po polsku.",
    heroImage: {
      src: "/media/destinations/marsa-alam",
      alt: "Spokojna zatoka Marsa Alam z rafą koralową widoczną przez czystą wodę",
      width: 1600,
      height: 1000,
    },
    practical: [
      "Początek trasy to przejazd z hotelu w Marsa Alam do Hurghady minibusem lub samochodem.",
      "W Hurghadzie następuje przesiadka do klimatyzowanego autokaru jadącego do Kairu.",
      "Wyjazd z hotelu jest późnym wieczorem - to najdłuższa z naszych tras.",
      "Program łączy Stary Kair i Gizę, dlatego dzień jest intensywny i pełny.",
    ],
    faqs: [
      {
        question: "W które dni odbywa się wycieczka z Marsa Alam?",
        answer:
          "Standardowo we wtorki. Dostępność w danym tygodniu potwierdzamy na WhatsApp, bo zależy ona od liczby zgłoszeń i grafiku transferów z Marsa Alam do Hurghady.",
      },
      {
        question: "Dlaczego trasa z Marsa Alam trwa dłużej niż z Hurghady?",
        answer:
          "Marsa Alam leży dalej na południe. Najpierw jedziesz do Hurghady, gdzie następuje przesiadka do autokaru do Kairu. Dlatego wyjazd jest wcześniej, a cały dzień - dłuższy.",
      },
      {
        question: "Co dokładnie zwiedzam w Starym Kairze?",
        answer:
          "Kościół Wiszący, kościół świętego Sergiusza, meczet Amr ibn al-As oraz synagogę Ben Ezra. To dzielnica, w której obok siebie stoją miejsca trzech religii - stąd jej wyjątkowy charakter.",
      },
    ],
    seo: {
      title: "Wycieczki z Marsa Alam - fakultatywne, delfiny, snorkeling",
      description:
        "Wycieczki fakultatywne z Marsa Alam: pływanie z delfinami (Sataya, Samadai), snorkeling, Abu Dabbab, rejsy, Kair, Luksor i safari. Odbiór z hotelu, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-marsa-alam/",
      ogImage: "/media/og/marsa-alam.jpg",
    },
    primaryQuery: "wycieczki z Marsa Alam",
  },
  {
    slug: "sharm-el-sheikh",
    routeBase: "/wycieczki-z-sharm-el-sheikh",
    name: "Sharm el Sheikh",
    nameGenitive: "Sharm el Sheikh",
    shortIntro:
      "Sharm el Sheikh na Synaju łączy najlepsze rafy świata z bliskością wyjątkowych miejsc. Stąd wybierzesz wycieczki fakultatywne na snorkeling w Ras Mohammed i na wyspę Tiran, nurkowanie w Blue Hole, nocne wejście na Górę Mojżesza, wyprawę do Kairu z Wielkim Muzeum GEM, a nawet do Jordanii (Petra). Do tego safari i atrakcje dla rodzin.",
    heroImage: {
      src: "/media/destinations/sharm-el-sheikh",
      alt: "Wybrzeże Sharm el Sheikh na Synaju z górami w tle i turkusową zatoką",
      width: 1600,
      height: 1000,
    },
    practical: [
      "Przejazd klimatyzowanym autokarem z Synaju do Kairu i z powrotem.",
      "Droga w jedną stronę to około 6-8 godzin, krócej niż z Hurghady czy Marsa Alam.",
      "W programie Wielkie Muzeum Egipskie (GEM) - najnowocześniejsze muzeum w kraju.",
      "Powrót do hotelu zwykle między 22:00 a 23:00, w zależności od strefy.",
    ],
    faqs: [
      {
        question: "Jak długo trwa dojazd z Sharm el Sheikh do Kairu?",
        answer:
          "Około 6-8 godzin w jedną stronę. Trasa z Synaju jest krótsza niż znad Morza Czerwonego, dlatego powrót do hotelu jest zwykle wcześniej - między 22:00 a 23:00.",
      },
      {
        question: "Czym różni się GEM od klasycznego Muzeum Egipskiego?",
        answer:
          "Wielkie Muzeum Egipskie (GEM) to nowa, bardzo duża placówka przy płaskowyżu w Gizie. Wyprawa z Sharm el Sheikh obejmuje właśnie GEM oraz teren piramid i Sfinksa.",
      },
      {
        question: "W jakim języku mówi przewodnik na trasie z Sharm el Sheikh?",
        answer:
          "Język przewodnika na tej trasie potwierdzamy przed rezerwacją. Niezależnie od tego cała obsługa rezerwacji i kontakt z naszą ekipą odbywa się po polsku.",
      },
    ],
    seo: {
      title: "Wycieczki z Sharm el Sheikh - fakultatywne, Ras Mohammed, Kair",
      description:
        "Wycieczki fakultatywne z Sharm el Sheikh: Ras Mohammed, wyspa Tiran, Blue Hole, Góra Mojżesza, Kair z GEM, Jordania (Petra) i safari. Odbiór z hotelu, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki-z-sharm-el-sheikh/",
      ogImage: "/media/og/sharm-el-sheikh.jpg",
    },
    primaryQuery: "wycieczki z Sharm el Sheikh",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
