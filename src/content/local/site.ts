import type { FaqItem, Review, SiteSettings } from "@/content/types";
import { siteConfig } from "@/content/config";

export const siteSettings: SiteSettings = {
  title: siteConfig.name,
  tagline: "Wycieczki fakultatywne w Egipcie dla polskich turystów",
  description: siteConfig.description,
  whatsappNumber: siteConfig.whatsappNumber,
};

/**
 * Site-wide FAQ. Broad, excursion-site level questions (types of trips, resort
 * differences, pickup, family options, guide language, payment) - factual and
 * original, not Cairo-only and not generic filler.
 */
export const siteFaqs: FaqItem[] = [
  {
    question: "Jak zarezerwować wycieczkę?",
    answer:
      "Wybierz wycieczkę, uzupełnij krótki formularz (imię, data, hotel, liczba osób) i wyślij zgłoszenie. Otworzy się WhatsApp z gotową wiadomością. Nasza ekipa potwierdza dostępność, godzinę odbioru i cenę. Nie ma płatności online.",
  },
  {
    question: "Jakie rodzaje wycieczek oferujecie?",
    answer:
      "Organizujemy wycieczki morskie (rejsy na wyspy, snorkeling z delfinami, nurkowanie), historyczne (Kair i piramidy, Luksor), pustynne safari (quady, buggy, jeep), lokalne atrakcje dla rodzin oraz wyprawy prywatne. Ofertę można przeglądać według kurortu wyjazdu albo rodzaju wycieczki.",
  },
  {
    question: "Czym różnią się kurorty Hurghada, Marsa Alam i Sharm el Sheikh?",
    answer:
      "Hurghada to najbardziej uniwersalna baza z największym wyborem wycieczek w każdą stronę. Marsa Alam słynie z morza - pływania z dzikimi delfinami, żółwi w Abu Dabbab i dziewiczych raf. Sharm el Sheikh na Synaju oferuje najlepsze rafy (Ras Mohammed, Tiran), nocne wejście na Górę Mojżesza i krótszą trasę do Kairu.",
  },
  {
    question: "Czy odbiór odbywa się z hotelu?",
    answer:
      "Tak. Większość wycieczek obejmuje odbiór spod hotelu i powrót w to samo miejsce. W przypadku bardziej oddalonych stref obowiązuje niewielka dopłata za transfer - podajemy ją przy potwierdzeniu rezerwacji.",
  },
  {
    question: "Kiedy i o której otrzymam godzinę odbioru?",
    answer:
      "Godzinę odbioru podajemy na WhatsApp przed wyjazdem. Zależy ona od rodzaju wycieczki i położenia hotelu: krótkie atrakcje i rejsy startują zwykle rano lub po południu, a dalekie trasy do Kairu i Luksoru wcześnie rano lub nocą.",
  },
  {
    question: "Które wycieczki są najlepsze dla rodzin z dziećmi?",
    answer:
      "Najbardziej rodzinne są rejsy na wyspy, spokojny snorkeling (np. w zatoce Abu Dabbab), akwaria, aquaparki i pokazy delfinów. Są krótkie, atrakcyjne i nie wymagają całodniowej podróży. Dzieci poniżej 5 lat zwykle jadą bezpłatnie.",
  },
  {
    question: "Jak liczone są ceny dla dzieci?",
    answer:
      "Dzieci poniżej 5 lat jadą bezpłatnie. Dla dzieci w wieku 5-11 lat obowiązuje niższa cena - dokładne stawki znajdziesz na stronie każdej wycieczki oraz w cenniku.",
  },
  {
    question: "W jakim języku mówi przewodnik?",
    answer:
      "Na trasach z Hurghady i Marsa Alam zapewniamy polskojęzycznego przewodnika. Na trasie z Sharm el Sheikh język przewodnika potwierdzamy przed rezerwacją. Niezależnie od trasy cała obsługa rezerwacji odbywa się po polsku.",
  },
  {
    question: "Jak wygląda płatność?",
    answer:
      "Nie pobieramy płatności online. Szczegóły rozliczenia ustalamy przy potwierdzeniu rezerwacji na WhatsApp. Ceny podajemy w USD (kursy nurkowe w EUR, zgodnie z cennikiem operatora).",
  },
  {
    question: "Co zabrać na wycieczkę?",
    answer:
      "To zależy od typu wyprawy. Na morskie: strój kąpielowy, ręcznik, krem z filtrem i okulary. Na historyczne (Kair, Luksor): paszport, wygodne buty, nakrycie głowy i wodę. Na safari: chustę na twarz, okulary i coś ciepłego na wieczór. Zawsze warto mieć gotówkę na napoje i opcjonalne atrakcje.",
  },
];

/**
 * Verified customer reviews. EMPTY by design - no fabricated names, ratings or
 * quotes. The reviews section and any "Opinie" nav item only appear once real,
 * verified reviews are added here.
 */
export const reviews: Review[] = [];

export const hasVerifiedReviews = reviews.some((r) => r.verified);
