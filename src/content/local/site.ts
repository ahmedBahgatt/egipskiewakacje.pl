import type { FaqItem, Review, SiteSettings } from "@/content/types";
import { siteConfig } from "@/content/config";

export const siteSettings: SiteSettings = {
  title: siteConfig.name,
  tagline: "Wycieczki fakultatywne w Egipcie dla polskich turystów",
  description: siteConfig.description,
  whatsappNumber: siteConfig.whatsappNumber,
};

/**
 * Site-wide FAQ. Answers reflect the ACTUAL differences between the three tours
 * (guide language, availability, child pricing) - not generic filler.
 */
export const siteFaqs: FaqItem[] = [
  {
    question: "Jak zarezerwować wycieczkę?",
    answer:
      "Wybierz wycieczkę, uzupełnij krótki formularz (imię, data, hotel, liczba osób) i wyślij zgłoszenie. Otworzy się WhatsApp z gotową wiadomością. Nasza ekipa potwierdza dostępność, godzinę odbioru i cenę. Nie ma płatności online.",
  },
  {
    question: "Kiedy otrzymam godzinę odbioru?",
    answer:
      "Godzinę odbioru podajemy na WhatsApp przed wyjazdem. Zależy ona od położenia hotelu i trasy autokaru danego dnia - zwykle jest to noc (ok. 00:00-02:00), a z Marsa Alam nieco wcześniej.",
  },
  {
    question: "Czy odbiór odbywa się z hotelu?",
    answer:
      "Tak. Odbieramy i odwozimy pod hotel. W przypadku bardziej oddalonych stref obowiązuje niewielka dopłata za transfer - podajemy ją przy potwierdzeniu rezerwacji.",
  },
  {
    question: "Jak wygląda płatność?",
    answer:
      "Nie pobieramy płatności online. Szczegóły rozliczenia ustalamy przy potwierdzeniu rezerwacji na WhatsApp. Ceny podajemy w USD.",
  },
  {
    question: "Jak liczone są ceny dla dzieci?",
    answer:
      "Dzieci poniżej 5 lat jadą bezpłatnie. Dla dzieci w wieku 5-11 lat obowiązuje niższa cena: 30 USD z Hurghady, 40 USD z Marsa Alam i 60 USD z Sharm el Sheikh.",
  },
  {
    question: "Czy rejs po Nilu jest w cenie?",
    answer:
      "Nie. Rejs po Nilu to opcja dodatkowa (ok. 10-12 USD od osoby), płatna na miejscu dla chętnych.",
  },
  {
    question: "W jakim języku mówi przewodnik?",
    answer:
      "Na trasach z Hurghady i Marsa Alam zapewniamy polskojęzycznego przewodnika. Na trasie z Sharm el Sheikh język przewodnika potwierdzamy przed rezerwacją. Niezależnie od trasy cała obsługa rezerwacji odbywa się po polsku.",
  },
  {
    question: "Co zabrać na wycieczkę do Kairu?",
    answer:
      "Przede wszystkim paszport, wygodne buty, nakrycie głowy, wodę, gotówkę na napoje i opcjonalne atrakcje oraz powerbank. Pełną listę znajdziesz w naszym poradniku.",
  },
];

/**
 * Verified customer reviews. EMPTY by design - no fabricated names, ratings or
 * quotes. The reviews section and any "Opinie" nav item only appear once real,
 * verified reviews are added here.
 */
export const reviews: Review[] = [];

export const hasVerifiedReviews = reviews.some((r) => r.verified);
