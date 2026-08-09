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
      "Z Hurghady wyruszysz w każdą stronę: rejsy na wyspy (Orange Bay, Mahmya), snorkeling z delfinami, nurkowanie, safari quadami, a także Kair, Giza i Luksor.",
      "Odbiór spod hotelu jest w cenie większości wycieczek - dokładną godzinę podajemy na WhatsApp przed wyjazdem, bo zależy od wyprawy i strefy hotelu.",
      "Krótkie atrakcje (akwarium, aquapark, rejsy) startują zwykle rano lub po południu; dalekie trasy do Kairu i Luksoru wyruszają wcześnie rano lub nocą.",
      "Dla bardziej oddalonych stref (El Gouna, Makadi Bay, Sahl Hasheesh, Soma Bay) może obowiązywać niewielka dopłata za transfer.",
    ],
    faqs: [
      {
        question: "Jakie wycieczki warto wybrać z Hurghady?",
        answer:
          "Najpopularniejsze są rejsy na wyspy (Orange Bay, Paradise, Mahmya), snorkeling z delfinami, safari quadami i buggy oraz całodniowe wyprawy do Kairu i Luksoru. Wybór zależy od tego, czy wolisz morze, pustynię, czy historię.",
      },
      {
        question: "Co wybrać: rejs, safari czy wycieczkę historyczną?",
        answer:
          "Rejs na wyspę to najbardziej relaksująca, rodzinna opcja. Safari quadami lub jeepem to przygoda na pół dnia albo wieczór z zachodem słońca. Kair i Luksor to całodniowe wyprawy dla miłośników historii - dłuższe, ale robiące ogromne wrażenie.",
      },
      {
        question: "Czy odbiór jest z hotelu i o której godzinie?",
        answer:
          "Tak, większość wycieczek obejmuje odbiór spod hotelu. Godzina zależy od wyprawy: przy krótkich atrakcjach i rejsach to zwykle poranek, przy Kairze i Luksorze - wczesny ranek lub noc. Dokładną godzinę potwierdzamy na WhatsApp przed wyjazdem.",
      },
      {
        question: "Które strefy hotelowe mogą mieć dopłatę za transfer?",
        answer:
          "Dopłata dotyczy stref bardziej oddalonych od centrum, np. El Gouna, Safaga, Soma Bay i Abu Soma (zwykle ok. 10 USD od osoby) oraz Makadi Bay i Sahl Hasheesh (ok. 5 USD). Hotele w samej Hurghadzie są zwykle bez dopłaty. Kwotę dla Twojego hotelu potwierdzamy przy rezerwacji.",
      },
      {
        question: "Czy są wycieczki odpowiednie dla dzieci?",
        answer:
          "Tak. Rejsy na wyspy, Wielkie Akwarium, aquaparki i pokazy delfinów to opcje, które dzieci lubią najbardziej. Dzieci poniżej 5 lat zwykle jadą bezpłatnie, a dla dzieci 5-11 lat obowiązuje niższa cena.",
      },
      {
        question: "Czy z Hurghady można pojechać do Kairu i Luksoru?",
        answer:
          "Tak. Kair zwiedzisz w ramach całodniowej wyprawy autokarem lub szybciej samolotem. Luksor leży bliżej - dojazd w jedną stronę to zwykle ok. 4-5 godzin, dzięki czemu na zwiedzanie masz cały dzień.",
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
      "Marsa Alam słynie z morza: pływanie z dzikimi delfinami (Sataya, Samadai), zatoka Abu Dabbab z żółwiami, snorkeling i nurkowanie na dziewiczych rafach.",
      "Stąd pojedziesz też na rejsy, pustynne safari oraz do Kairu i Luksoru - te dalekie trasy są dłuższe niż z Hurghady, bo Marsa Alam leży dalej na południe.",
      "Odbiór spod hotelu jest w cenie większości wycieczek; przy morskich wyprawach start wypada zwykle rano, przy Kairze - wcześnie rano lub nocą.",
      "Dla bardziej oddalonych stref hotelowych może obowiązywać niewielka dopłata za transfer - potwierdzamy ją przy rezerwacji.",
    ],
    faqs: [
      {
        question: "Sataya czy Samadai - gdzie lepiej popłynąć do delfinów?",
        answer:
          "Sataya (Dolphin House) to duża rafa w kształcie podkowy i dłuższy rejs, znany z dużych stad delfinów. Samadai (Dom Delfinów) leży bliżej i ma wyznaczone strefy ochronne. W obu miejscach delfiny są dzikie, więc spotkania są częste, ale nie gwarantowane.",
      },
      {
        question: "Co oferuje zatoka Abu Dabbab?",
        answer:
          "Abu Dabbab to spokojna zatoka słynąca ze snorkelingu z żółwiami morskimi, a przy odrobinie szczęścia z diugoniem. Płytka, osłonięta woda sprawia, że to jedno z najlepszych miejsc dla rodzin z dziećmi.",
      },
      {
        question: "Jakie wycieczki są najlepsze z Marsa Alam?",
        answer:
          "Przede wszystkim morskie: pływanie z delfinami, Abu Dabbab, rejsy na rafy i nurkowanie. Dla chętnych na historię dostępne są też całodniowe wyprawy do Kairu i Luksoru.",
      },
      {
        question: "Czy odbiór jest z hotelu?",
        answer:
          "Tak, większość wycieczek obejmuje odbiór spod hotelu i powrót. Godzina zależy od wyprawy - przy morskich jest to zwykle poranek. Dokładną godzinę potwierdzamy na WhatsApp przed wyjazdem.",
      },
      {
        question: "Czy są wycieczki odpowiednie dla dzieci?",
        answer:
          "Tak. Zatoka Abu Dabbab, spokojny snorkeling i rejsy dobrze sprawdzają się z dziećmi. Dzieci poniżej 5 lat zwykle jadą bezpłatnie, a dla dzieci 5-11 lat obowiązuje niższa cena.",
      },
      {
        question: "Jak daleko z Marsa Alam do Kairu i Luksoru?",
        answer:
          "Luksor jest bliżej - dojazd zajmuje zwykle ok. 3-4 godziny w jedną stronę. Kair to całodniowa, dłuższa trasa (Marsa Alam leży najdalej na południe), dlatego wyjazd wypada wcześnie rano lub nocą.",
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
      "Sharm to najlepsze rafy Synaju: Ras Mohammed, wyspa Tiran i Blue Hole - snorkeling i nurkowanie w miejscach światowej klasy.",
      "Stąd wybierzesz też pustynne safari, nocne wejście na Górę Mojżesza z klasztorem św. Katarzyny, wyprawę do Kairu z Wielkim Muzeum GEM, a nawet wyjazd do Jordanii (Petra).",
      "Trasa do Kairu z Synaju (ok. 6-8 godzin w jedną stronę) jest krótsza niż znad Morza Czerwonego; morskie wycieczki startują zwykle rano.",
      "Odbiór spod hotelu jest w cenie większości wycieczek - przy dalekich trasach wyjazd wypada nocą lub wcześnie rano.",
    ],
    faqs: [
      {
        question: "Ras Mohammed czy wyspa Tiran - co wybrać na snorkeling?",
        answer:
          "Ras Mohammed to park narodowy ze słynnymi ścianami rafowymi i mangrowcami - zwykle dojazd autokarem i snorkeling z brzegu lub pomostu. Tiran to rejs łodzią z kilkoma postojami przy rafach wokół cieśniny. Oba miejsca są świetne; Tiran ma bardziej rejsowy, plażowy charakter.",
      },
      {
        question: "Czym jest Blue Hole i czy to bezpieczne?",
        answer:
          "Blue Hole koło Dahab to słynne miejsce do snorkelingu i nurkowania. Snorkeling przy brzegu jest dostępny dla każdego i bezpieczny; głębokie nurkowanie techniczne w samej dziurze jest tylko dla wykwalifikowanych nurków i nie wchodzi w zakres zwykłej wycieczki.",
      },
      {
        question: "Co obejmuje wejście na Górę Mojżesza?",
        answer:
          "To nocna wyprawa: wejście na szczyt na wschód słońca, a następnie zwiedzanie klasztoru św. Katarzyny u podnóża góry. Warto zabrać ciepłe ubranie, czołówkę i wygodne, zamknięte buty - noc na wysokości potrafi być chłodna.",
      },
      {
        question: "Czy z Sharm el Sheikh można pojechać do Kairu?",
        answer:
          "Tak. To całodniowa wyprawa obejmująca Wielkie Muzeum Egipskie (GEM), płaskowyż w Gizie i Sfinksa. Trasa z Synaju (ok. 6-8 godzin w jedną stronę) jest krótsza niż znad Morza Czerwonego, dlatego powrót jest zwykle wcześniej.",
      },
      {
        question: "W jakim języku mówi przewodnik na wycieczkach z Sharm el Sheikh?",
        answer:
          "Język przewodnika na trasach z Sharm el Sheikh potwierdzamy przed rezerwacją. Niezależnie od tego cała obsługa rezerwacji i kontakt z naszą ekipą odbywa się po polsku.",
      },
      {
        question: "Czy są wycieczki odpowiednie dla dzieci?",
        answer:
          "Tak. Rejsy, spokojny snorkeling i lokalne atrakcje dobrze sprawdzają się z dziećmi. Dzieci poniżej 5 lat zwykle jadą bezpłatnie, a dla dzieci 5-11 lat obowiązuje niższa cena.",
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
