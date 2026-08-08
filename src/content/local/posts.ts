import type { BlogPost } from "@/content/types";

/**
 * Poradnik articles. Original Polish content. `directAnswer` is surfaced near
 * the top for featured-snippet / AIO intent. Sources are shown when the article
 * touches changeable official rules (documents, entry requirements).
 */
export const posts: BlogPost[] = [
  {
    slug: "co-zabrac-na-wycieczke-do-kairu",
    route: "/poradnik/co-zabrac-na-wycieczke-do-kairu",
    title: "Co zabrać na wycieczkę do Kairu? Praktyczna lista",
    h1: "Co zabrać na wycieczkę do Kairu?",
    excerpt:
      "Konkretna lista rzeczy na jednodniową wyprawę z Hurghady, Marsa Alam lub Sharm el Sheikh do Kairu. Dokumenty, ubranie, woda, gotówka i kilka rzeczy, o których łatwo zapomnieć.",
    directAnswer:
      "Na wycieczkę do Kairu zabierz: paszport, wygodne buty, nakrycie głowy i krem z filtrem, wodę i przekąski na długą drogę, gotówkę w USD na napoje i opcjonalne atrakcje, powerbank oraz lekki, skromniejszy ubiór na wizyty w miejscach kultu. Wyprawa trwa cały dzień i zaczyna się nocą, dlatego liczy się wygoda.",
    featuredImage: {
      src: "/media/blog/co-zabrac-na-wycieczke-do-kairu",
      alt: "Spakowany plecak podróżny z kapeluszem i butelką wody na tle pustyni",
      width: 1600,
      height: 900,
    },
    author: "Zespół Egipskie Wakacje",
    category: "Przed wyjazdem",
    relatedDestination: undefined,
    relatedTourSlugs: [
      "kair-piramidy-muzeum-egipskie",
      "kair-stary-kair-piramidy",
      "kair-gem-piramidy",
    ],
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-08",
    body: [
      {
        type: "paragraph",
        text: "Wyprawa do Kairu z kurortu nad Morzem Czerwonym to jeden z najdłuższych dni podczas wakacji w Egipcie. Wyjazd zaczyna się w nocy, droga w jedną stronę trwa kilka godzin, a na miejscu czeka pełny program: muzeum, piramidy i Sfinks. Dobre spakowanie się nie jest więc fanaberią - realnie decyduje o tym, czy dzień będzie wygodny, czy męczący. Poniżej znajdziesz konkretną listę, uporządkowaną od rzeczy najważniejszych.",
      },
      { type: "heading", id: "dokumenty", text: "Dokumenty" },
      {
        type: "paragraph",
        text: "Na trasę do Kairu zabierz paszport. Zabytki i punkty kontrolne po drodze bywają miejscami, w których trzeba okazać dokument tożsamości, a kopia w telefonie nie zawsze wystarcza. Warto mieć tę samą wersję dokumentu, na którą rezerwowałeś pobyt.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Przepisy wjazdowe i wymagania dotyczące dokumentów mogą się zmieniać. Przed wyjazdem sprawdź aktualne zasady u swojego biura, w hotelu lub w oficjalnym źródle. Ten poradnik ma charakter praktyczny i nie zastępuje aktualnych informacji urzędowych.",
      },
      { type: "heading", id: "ubranie-i-buty", text: "Ubranie i buty" },
      {
        type: "paragraph",
        text: "Klucz to wygoda i warstwy. W ciągu dnia w Kairze bywa gorąco, ale nocna droga autokarem i klimatyzacja potrafią być chłodne. Sprawdza się lekka bluza lub chusta na wierzch.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Wygodne, rozchodzone buty - przez większość dnia będziesz chodzić.",
          "Przewiewne, jasne ubranie na dzień.",
          "Lekka warstwa na chłodniejszy przejazd i klimatyzację.",
          "Skromniejszy ubiór (zakryte ramiona i kolana) na wizyty w miejscach kultu, zwłaszcza na trasie z Marsa Alam ze Starym Kairem.",
        ],
      },
      { type: "heading", id: "ochrona-przed-sloncem", text: "Ochrona przed słońcem" },
      {
        type: "list",
        ordered: false,
        items: [
          "Nakrycie głowy - kapelusz lub czapka z daszkiem.",
          "Okulary przeciwsłoneczne.",
          "Krem z wysokim filtrem - na płaskowyżu w Gizie nie ma gdzie schować się w cieniu.",
        ],
      },
      { type: "heading", id: "woda-i-przekaski", text: "Woda i przekąski" },
      {
        type: "paragraph",
        text: "Obiad jest w cenie wycieczki, ale bez napojów. Zabierz wodę na drogę i drobne przekąski - przydadzą się w długim przejeździe, szczególnie dzieciom. Większa butelka wody i coś energetycznego (baton, owoce, orzechy) realnie poprawiają komfort.",
      },
      { type: "heading", id: "gotowka", text: "Gotówka i płatności" },
      {
        type: "paragraph",
        text: "Miej przy sobie gotówkę, najlepiej w USD w drobnych nominałach. Przyda się na napoje, napiwki, pamiątki oraz opcjonalne atrakcje, które nie są wliczone w cenę - na przykład krótki rejs po Nilu (ok. 10-12 USD od osoby) czy wejście do wnętrza piramidy. Nie zakładaj, że wszędzie zapłacisz kartą.",
      },
      { type: "heading", id: "elektronika", text: "Elektronika" },
      {
        type: "list",
        ordered: false,
        items: [
          "Powerbank - telefon szybko się rozładowuje od zdjęć i nawigacji.",
          "Naładowany telefon z zapisanym kontaktem WhatsApp do obsługi.",
          "Opcjonalnie słuchawki - pomagają odpocząć podczas nocnego przejazdu.",
        ],
      },
      { type: "heading", id: "apteczka", text: "Leki i apteczka" },
      {
        type: "paragraph",
        text: "Zabierz swoje stałe leki oraz mały, podręczny zestaw: coś na ból głowy, plastry, chusteczki nawilżane i - jeśli źle znosisz długie przejazdy - preparat na chorobę lokomocyjną. To rzeczy, których nie kupisz wygodnie w trasie.",
      },
      { type: "heading", id: "dzieci", text: "Podróż z dziećmi" },
      {
        type: "paragraph",
        text: "Dzieci poniżej 5 lat jadą bezpłatnie, a dla dzieci w wieku 5-11 lat obowiązuje niższa cena. Dla najmłodszych spakuj coś do picia i jedzenia, ulubioną przekąskę oraz coś, co zajmie uwagę podczas długiej drogi - książeczkę, słuchawki, grę. Wygodne ubranie na zmianę też się przyda.",
      },
      { type: "heading", id: "dluga-droga", text: "Jak przygotować się na długą drogę" },
      {
        type: "paragraph",
        text: "Najdłuższe trasy to wyjazdy z Marsa Alam i z Hurghady - potrafią zająć całą dobę z dojazdami. Z Sharm el Sheikh jest krócej, bo droga z Synaju do Kairu jest krótsza. Niezależnie od kurortu wyśpij się przed wyjazdem, a w autokarze wykorzystaj czas na sen. Poduszka pod kark i lekki koc lub bluza sprawiają, że noc w drodze mija znacznie lżej.",
      },
      { type: "heading", id: "czego-nie-pakowac", text: "Czego nie pakować" },
      {
        type: "list",
        ordered: false,
        items: [
          "Dużej, ciężkiej torby - liczy się lekki plecak, z którym wygodnie chodzisz.",
          "Wartościowych rzeczy, których nie potrzebujesz - zostaw je w hotelowym sejfie.",
          "Nadmiaru ubrań - to jeden dzień, nie potrzebujesz całej walizki.",
        ],
      },
      { type: "heading", id: "roznice-kurorty", text: "Różnice między kurortami" },
      {
        type: "paragraph",
        text: "Z Hurghady jedziesz na klasyczną trasę: Muzeum Egipskie, piramidy i Sfinks. Z Marsa Alam program jest szerszy o Stary Kair, dlatego przyda się skromniejszy ubiór. Z Sharm el Sheikh zwiedzasz nowoczesne Wielkie Muzeum Egipskie (GEM) i Gizę, a dzień jest nieco krótszy. Dopłaty za transfer dotyczą tylko wybranych, bardziej oddalonych hoteli - warto to potwierdzić przy rezerwacji.",
      },
    ],
    faqs: [
      {
        question: "Czy na wycieczkę do Kairu potrzebny jest paszport?",
        answer:
          "Na trasę do Kairu zabierz paszport. Aktualne wymagania dokumentowe warto potwierdzić przed wyjazdem u biura, w hotelu lub w oficjalnym źródle.",
      },
      {
        question: "Ile gotówki zabrać na wycieczkę do Kairu?",
        answer:
          "Tyle, by starczyło na napoje, napiwki, pamiątki i opcjonalne atrakcje (np. rejs po Nilu ok. 10-12 USD od osoby). Najlepiej drobne nominały w USD.",
      },
      {
        question: "Czy obiad jest w cenie wycieczki?",
        answer: "Tak, obiad jest w cenie, ale bez napojów. Napoje warto zabrać ze sobą lub kupić na miejscu.",
      },
    ],
    sources: [
      {
        label: "Wymagania wjazdowe i dokumenty",
        note: "Zasady wjazdu do Egiptu mogą się zmieniać - przed wyjazdem sprawdź aktualne informacje w oficjalnym źródle rządowym lub u swojego biura podróży.",
      },
    ],
    seo: {
      title: "Co zabrać na wycieczkę do Kairu? Praktyczna lista | Poradnik",
      description:
        "Praktyczna lista rzeczy na jednodniową wycieczkę do Kairu z Hurghady, Marsa Alam lub Sharm el Sheikh: dokumenty, ubranie, woda, gotówka i wskazówki na długą drogę.",
      canonicalPath: "/poradnik/co-zabrac-na-wycieczke-do-kairu/",
      ogImage: "/media/og/poradnik.jpg",
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
