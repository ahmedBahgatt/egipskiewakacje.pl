import type { TourCategory } from "@/content/types";

/**
 * Final category taxonomy. Only categories with enough real inventory and an
 * independent search intent get an indexable landing page (see
 * SEO_CONTENT_ARCHITECTURE.md). "synaj" and "miedzynarodowe" exist as tour tags
 * (used by filters and card chips) but have no standalone landing page yet - too
 * few offers to justify unique, non-thin content.
 *
 * Presentation maps (categoryLabel/categoryRoute) live in @/lib/categories so
 * client components can use them without importing the content layer.
 */

export { categoryLabel } from "@/lib/categories";

/** Categories that get an indexable landing page under /wycieczki/<routeBase>. */
export const categories: TourCategory[] = [
  {
    slug: "kair",
    routeBase: "/wycieczki/kair-i-piramidy",
    name: "Wycieczki do Kairu i piramid",
    shortLabel: "Kair i piramidy",
    description: "Piramidy w Gizie, Sfinks oraz Muzeum Egipskie i nowe GEM - jednodniowo lub samolotem.",
    intro:
      "Kair to najczęściej wybierana wyprawa z egipskich kurortów. Z Hurghady, Marsa Alam i Sharm el Sheikh dojedziesz do piramid w Gizie, Sfinksa oraz muzeów ze skarbami faraonów - autokarem w jeden dzień albo samolotem, gdy zależy Ci na czasie. Poniżej zebraliśmy wszystkie warianty: klasyczny Kair, trasę z Wielkim Muzeum Egipskim (GEM), wersję z rejsem po Nilu oraz szybkie wyjazdy samolotem.",
    faqs: [
      {
        question: "Czy do Kairu lepiej jechać autokarem czy lecieć samolotem?",
        answer:
          "Autokar jest tańszy i pozwala zobaczyć więcej za jedną cenę, ale oznacza długą, nocną trasę. Samolot skraca dojazd do minimum i jest wygodniejszy, kosztuje jednak wyraźnie więcej. Wybór zależy od budżetu i tego, ile czasu chcesz spędzić w drodze.",
      },
      {
        question: "Czym różni się Muzeum Egipskie od GEM?",
        answer:
          "Klasyczne Muzeum Egipskie leży w centrum Kairu i ma bogaty, historyczny zbiór. Wielkie Muzeum Egipskie (GEM) to nowoczesna, ogromna placówka przy płaskowyżu w Gizie. Część naszych tras obejmuje właśnie GEM.",
      },
    ],
    seo: {
      title: "Wycieczki do Kairu i piramid w Egipcie | Egipskie Wakacje",
      description:
        "Wycieczka do Kairu z Hurghady, Marsa Alam i Sharm el Sheikh: piramidy w Gizie, Sfinks, Muzeum Egipskie w Kairze i nowe GEM. Autokarem lub samolotem, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/kair-i-piramidy/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "wycieczka do Kairu",
  },
  {
    slug: "luksor",
    routeBase: "/wycieczki/luksor",
    name: "Wycieczki do Luksoru",
    shortLabel: "Luksor",
    description: "Dolina Królów, Karnak i świątynie Teb - dzień pełen historii nad Nilem.",
    intro:
      "Luksor bywa nazywany największym muzeum pod otwartym niebem. W Dolinie Królów zajrzysz do grobowców faraonów, zobaczysz świątynię Hatszepsut, Kolosy Memnona i potężny kompleks w Karnaku. Z Hurghady i Marsa Alam dojedziesz tu autokarem w jeden dzień, a dla chętnych mamy też wersję z lotem balonem o wschodzie słońca i wyjazd dwudniowy.",
    faqs: [
      {
        question: "Ile trwa dojazd do Luksoru z Hurghady?",
        answer:
          "Przejazd w jedną stronę to zwykle około 4-5 godzin. Wyjazd jest wczesnym rankiem, dzięki czemu na zwiedzanie masz cały dzień, a wieczorem wracasz do hotelu.",
      },
      {
        question: "Czy warto dopłacić do lotu balonem?",
        answer:
          "Lot balonem nad Luksorem o wschodzie słońca to jedno z najbardziej widowiskowych przeżyć w Egipcie - widok na Nil, świątynie i Dolinę Królów z góry. Jeśli budżet pozwala, warto.",
      },
    ],
    seo: {
      title: "Wycieczki do Luksoru z Hurghady i Marsa Alam | Egipskie Wakacje",
      description:
        "Wycieczki do Luksoru: Dolina Królów, Karnak, świątynia Hatszepsut i lot balonem. Wyjazdy z Hurghady i Marsa Alam, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/luksor/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "wycieczki do Luksoru",
  },
  {
    slug: "rejsy-wyspy",
    routeBase: "/wycieczki/rejsy-i-wyspy",
    name: "Rejsy i wyspy na Morzu Czerwonym",
    shortLabel: "Rejsy i wyspy",
    description: "Orange Bay, Paradise, Mahmya, wyspy Hamata, White Island - rejsy łodzią z plażowaniem i snorkelingiem.",
    intro:
      "Rejs na jedną z wysp Morza Czerwonego to najprzyjemniejszy sposób na relaks w Egipcie. Turkusowa woda, białe łachy piasku, postoje na snorkeling przy rafach i lunch na łodzi - takie wyprawy pasują rodzinom, parom i grupom znajomych. Wybierz między popularną Orange Bay, spokojną Mahmyą, wyspami Hamata z Marsa Alam czy White Island koło Sharm el Sheikh.",
    faqs: [
      {
        question: "Czy na rejsach jest sprzęt do snorkelingu?",
        answer:
          "Tak, maska i fajka są zwykle w cenie rejsu. Jeśli masz własny sprzęt, możesz zabrać go ze sobą. O płetwach i piance warto zapytać przy rezerwacji.",
      },
      {
        question: "Czy rejs na wyspę jest dobry dla dzieci?",
        answer:
          "Tak, to jedna z najbardziej rodzinnych opcji. Płytka woda przy plażach, krótkie postoje i lunch na łodzi sprawiają, że dzieci dobrze znoszą taki dzień. Dla najmłodszych zwykle obowiązuje niższa cena.",
      },
    ],
    seo: {
      title: "Rejsy i wyspy na Morzu Czerwonym | Orange Bay, Mahmya, Hamata",
      description:
        "Rejsy łodzią na wyspy Morza Czerwonego z Hurghady, Marsa Alam i Sharm el Sheikh: Orange Bay, Paradise, Mahmya, Hamata, White Island. Snorkeling i lunch na łodzi.",
      canonicalPath: "/wycieczki/rejsy-i-wyspy/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "rejsy i wyspy Egipt",
  },
  {
    slug: "snorkeling-delfiny",
    routeBase: "/wycieczki/snorkeling-i-delfiny",
    name: "Snorkeling i pływanie z delfinami",
    shortLabel: "Snorkeling i delfiny",
    description: "Dom Delfinów, Sataya, Samadai, Abu Dabbab - snorkeling z delfinami, żółwiami i diugoniami.",
    intro:
      "Morze Czerwone to jedno z najlepszych miejsc na świecie do snorkelingu. Na tych wyprawach popłyniesz nad rafy pełne kolorowych ryb, a przy odrobinie szczęścia spotkasz dzikie delfiny (Sataya, Samadai, Dom Delfinów) lub żółwie i diugonie w zatoce Abu Dabbab. To spokojne, przyrodnicze wycieczki dla osób, które chcą być blisko podwodnego świata.",
    faqs: [
      {
        question: "Czy na pewno zobaczę delfiny?",
        answer:
          "Delfiny w tych rejonach żyją dziko, więc spotkania są bardzo częste, ale nie gwarantowane - to natura, nie pokaz. Rejony takie jak Sataya czy Samadai słyną z dużych stad, co zwiększa szanse.",
      },
      {
        question: "Czy trzeba umieć pływać?",
        answer:
          "Podstawy się przydają, ale kamizelki asekuracyjne i bliskość łodzi sprawiają, że snorkeling jest dostępny także dla mniej pewnych pływaków. Przewodnicy pomagają wejść do wody i pilnują grupy.",
      },
    ],
    seo: {
      title: "Snorkeling i pływanie z delfinami w Egipcie | Sataya, Samadai",
      description:
        "Wycieczki snorkelingowe z delfinami, żółwiami i diugoniami: Dom Delfinów, Sataya, Samadai, Abu Dabbab. Wyjazdy z Hurghady i Marsa Alam, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/snorkeling-i-delfiny/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "snorkeling z delfinami Egipt",
  },
  {
    slug: "nurkowanie",
    routeBase: "/wycieczki/nurkowanie",
    name: "Nurkowanie i kursy nurkowe",
    shortLabel: "Nurkowanie",
    description: "Nurkowanie na próbę, wyprawy z butlą i kursy PADI z Hurghady oraz Marsa Alam.",
    intro:
      "Rafy Morza Czerwonego zachwycają zarówno pierwszy raz, jak i doświadczonych nurków. Zaczynasz od nurkowania na próbę pod okiem instruktora, wybierasz nurkowanie z łodzi lub z brzegu, albo robisz pełny kurs PADI - od Open Water po Rescue Diver. Kursy rozliczane są w euro, zgodnie z cennikiem operatora.",
    faqs: [
      {
        question: "Czy nurkowanie na próbę wymaga doświadczenia?",
        answer:
          "Nie. Nurkowanie na próbę (intro dive) jest przeznaczone dla osób bez uprawnień - instruktor prowadzi Cię przez cały czas, na niewielkiej głębokości. To dobry sposób, by sprawdzić, czy nurkowanie jest dla Ciebie.",
      },
      {
        question: "Ile trwa kurs PADI Open Water?",
        answer:
          "Kurs Open Water Diver zwykle zajmuje kilka dni i łączy teorię, ćwiczenia na płytkiej wodzie oraz nurkowania w morzu. Po jego ukończeniu otrzymujesz certyfikat uznawany na całym świecie.",
      },
    ],
    seo: {
      title: "Nurkowanie i kursy PADI w Egipcie | Hurghada, Marsa Alam",
      description:
        "Nurkowanie na próbę, nurkowanie z butlą i kursy PADI (Open Water, Advanced, Rescue) z Hurghady i Marsa Alam. Ceny kursów w EUR, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/nurkowanie/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "nurkowanie Egipt kursy",
  },
  {
    slug: "safari",
    routeBase: "/wycieczki/safari-i-quady",
    name: "Safari, quady i pustynia",
    shortLabel: "Safari i quady",
    description: "Quady, buggy, jeep safari, zachód słońca na pustyni i wieczór w wiosce beduińskiej.",
    intro:
      "Pustynia to druga twarz Egiptu - tuż za pasem hoteli zaczyna się przestrzeń wydm i skał. Na tych wyprawach prowadzisz quada lub buggy, jedziesz jeepem przez bezdroża, oglądasz zachód słońca i odwiedzasz wioskę beduińską z herbatą i pokazami. Mamy warianty krótsze i dłuższe, rodzinne oraz z jazdą na wielbłądzie i koniu.",
    faqs: [
      {
        question: "Czy trzeba mieć prawo jazdy na quada?",
        answer:
          "Na quady i buggy w ramach safari zwykle nie jest wymagane prawo jazdy - przed startem dostajesz instruktaż. Dzieci mogą jechać jako pasażer z dorosłym lub podwójnym pojazdem, w zależności od wariantu.",
      },
      {
        question: "Jak ubrać się na safari?",
        answer:
          "Przyda się chusta lub komin na twarz (chroni przed pyłem), okulary, zamknięte buty i coś ciepłego na wieczór - po zachodzie słońca na pustyni potrafi się ochłodzić.",
      },
    ],
    seo: {
      title: "Safari, quady i buggy w Egipcie | Hurghada, Marsa Alam, Sharm",
      description:
        "Wycieczki safari: quady, buggy, jeep, zachód słońca na pustyni i wioska beduińska. Wyjazdy z Hurghady, Marsa Alam i Sharm el Sheikh, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/safari-i-quady/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "safari quady Egipt",
  },
  {
    slug: "atrakcje",
    routeBase: "/wycieczki/atrakcje-i-rozrywka",
    name: "Atrakcje i rozrywka",
    shortLabel: "Atrakcje i rozrywka",
    description: "Akwaria, delfinaria, aquaparki, łodzie z podwodnym pokładem, parasailing i zwiedzanie lokalne.",
    intro:
      "Nie każdy dzień musi oznaczać całodniową wyprawę. W tej sekcji zebraliśmy krótsze atrakcje blisko kurortu: wielkie akwarium, pokazy delfinów, aquaparki, łodzie z podwodnym pokładem (seascope), parasailing oraz spokojne zwiedzanie miasta. To dobre pomysły na popołudnie, dzień z dziećmi albo przerwę między większymi wycieczkami.",
    faqs: [
      {
        question: "Które atrakcje są najlepsze dla dzieci?",
        answer:
          "Aquaparki, akwarium, pokaz delfinów i łódź seascope z podwodnym pokładem to opcje, które najbardziej podobają się dzieciom. Są krótkie, atrakcyjne wizualnie i nie wymagają całodniowej podróży.",
      },
      {
        question: "Czy atrakcje obejmują odbiór z hotelu?",
        answer:
          "W większości przypadków tak - transfer z hotelu i z powrotem jest wliczony lub dostępny za dopłatą zależną od strefy. Szczegóły potwierdzamy przy rezerwacji na WhatsApp.",
      },
    ],
    seo: {
      title: "Atrakcje w Egipcie - Hurghada i Marsa Alam | Akwarium, delfiny",
      description:
        "Atrakcje blisko kurortu w Hurghadzie i Marsa Alam: Hurghada Grand Aquarium, delfinarium, aquaparki, łódź seascope, parasailing i zwiedzanie miasta. Rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/atrakcje-i-rozrywka/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "atrakcje Hurghada Marsa Alam",
  },
  {
    slug: "prywatne",
    routeBase: "/wycieczki/wycieczki-prywatne",
    name: "Wycieczki prywatne",
    shortLabel: "Wycieczki prywatne",
    description: "Kair i Luksor tylko dla Twojej grupy - własny kierowca, przewodnik i elastyczny plan.",
    intro:
      "Wycieczka prywatna to komfort i elastyczność: jedziesz tylko ze swoją grupą, własnym samochodem, z przewodnikiem do dyspozycji i planem dnia dopasowanym do Was. To dobre rozwiązanie dla rodzin z dziećmi, seniorów i osób, które nie chcą trzymać się sztywnego grafiku dużej grupy. Cena liczona jest od osoby i maleje wraz z liczbą uczestników.",
    faqs: [
      {
        question: "Dlaczego cena prywatnej wycieczki spada przy większej grupie?",
        answer:
          "Koszt samochodu, kierowcy i przewodnika dzieli się na wszystkich uczestników. Im więcej osób, tym niższa cena od osoby - dlatego podajemy widełki zależne od wielkości grupy.",
      },
      {
        question: "Czy plan prywatnej wycieczki można zmienić?",
        answer:
          "Tak, w rozsądnym zakresie. Ponieważ jedziesz tylko ze swoją grupą, można dopasować tempo, kolejność i czas na poszczególne miejsca. Szczegóły ustalamy przed wyjazdem.",
      },
    ],
    seo: {
      title: "Wycieczki prywatne w Egipcie | Kair i Luksor dla Twojej grupy",
      description:
        "Prywatne wycieczki do Kairu i Luksoru z Hurghady i Marsa Alam: własny kierowca, przewodnik i elastyczny plan. Cena od osoby, rezerwacja przez WhatsApp.",
      canonicalPath: "/wycieczki/wycieczki-prywatne/",
      ogImage: "/media/og/default.jpg",
    },
    primaryQuery: "prywatne wycieczki Egipt",
  },
];

export function getCategory(slug: string): TourCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
