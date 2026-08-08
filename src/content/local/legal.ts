import type { LegalPage } from "@/content/types";

const UPDATED = "2026-08-08";

/**
 * Legal pages describe the ACTUAL implementation: a static website with local
 * media, no payment processing, no booking data stored by the site, and a
 * WhatsApp redirect after which WhatsApp's own terms apply.
 *
 * The operator's full legal identity (entity name, registered address, NIP/KRS,
 * Egyptian licence) is NOT invented here. Missing fields are flagged for owner /
 * legal review - see CONTENT_REQUIRED.md.
 */
export const legalPages: LegalPage[] = [
  {
    slug: "polityka-prywatnosci",
    route: "/polityka-prywatnosci",
    title: "Polityka prywatności",
    updatedAt: UPDATED,
    body: [
      {
        type: "callout",
        tone: "info",
        text: "Pełne dane rejestrowe operatora (nazwa podmiotu, adres, numer rejestrowy) zostaną podane po ich potwierdzeniu. Poniższa treść opisuje faktyczny sposób działania serwisu i przetwarzania danych.",
      },
      { type: "heading", id: "administrator", text: "1. Administrator danych" },
      {
        type: "paragraph",
        text: "Administratorem danych związanych z serwisem egipskiewakacje.pl jest operator marki Egipskie Wakacje. Pełne dane identyfikacyjne i kontaktowe operatora zostaną uzupełnione po ich potwierdzeniu. Kontakt w sprawach bieżących odbywa się przez WhatsApp podany w serwisie.",
      },
      { type: "heading", id: "zakres", text: "2. Jakie dane przetwarzamy" },
      {
        type: "paragraph",
        text: "Strona ma charakter informacyjny i statyczny. Nie prowadzimy kont użytkowników ani płatności online. Formularz rezerwacji działa lokalnie w Twojej przeglądarce: na jego podstawie tworzona jest gotowa wiadomość, która otwiera się w aplikacji WhatsApp. Serwis nie zapisuje w żadnej bazie danych informacji podanych w formularzu (imię, hotel, data, liczba osób, uwagi).",
      },
      { type: "heading", id: "whatsapp", text: "3. Kontakt przez WhatsApp" },
      {
        type: "paragraph",
        text: "Po kliknięciu przycisku rezerwacji lub kontaktu przechodzisz do aplikacji WhatsApp. Od tego momentu przetwarzanie Twoich danych (w tym numeru telefonu i treści wiadomości) odbywa się na zasadach WhatsApp oraz jego dostawcy. Zachęcamy do zapoznania się z polityką prywatności WhatsApp.",
      },
      { type: "heading", id: "cookies", text: "4. Pliki cookies i analityka" },
      {
        type: "paragraph",
        text: "W obecnej wersji serwis nie używa plików cookies do śledzenia ani zewnętrznych narzędzi analitycznych. Jeśli w przyszłości wprowadzimy analitykę, przed uruchomieniem śledzenia poprosimy o zgodę. Szczegóły opisuje Polityka cookies.",
      },
      { type: "heading", id: "prawa", text: "5. Twoje prawa" },
      {
        type: "paragraph",
        text: "Przysługują Ci prawa wynikające z RODO, w tym prawo dostępu do danych, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Ponieważ serwis nie przechowuje danych z formularza, dotyczą one przede wszystkim korespondencji prowadzonej przez WhatsApp. W sprawach dotyczących danych napisz do nas przez WhatsApp.",
      },
    ],
    seo: {
      title: "Polityka prywatności | Egipskie Wakacje",
      description:
        "Polityka prywatności serwisu egipskiewakacje.pl. Strona statyczna, brak płatności online, formularz rezerwacji działa lokalnie i otwiera WhatsApp.",
      canonicalPath: "/polityka-prywatnosci/",
    },
  },
  {
    slug: "polityka-cookies",
    route: "/polityka-cookies",
    title: "Polityka cookies",
    updatedAt: UPDATED,
    body: [
      { type: "heading", id: "czym-sa", text: "1. Czym są pliki cookies" },
      {
        type: "paragraph",
        text: "Pliki cookies to niewielkie informacje zapisywane przez stronę w przeglądarce użytkownika. Mogą służyć działaniu strony lub celom analitycznym i marketingowym.",
      },
      { type: "heading", id: "jak-uzywamy", text: "2. Jak używamy cookies" },
      {
        type: "paragraph",
        text: "W obecnej wersji serwis egipskiewakacje.pl nie stosuje plików cookies do śledzenia ani nie ładuje zewnętrznych skryptów analitycznych i reklamowych. Z tego powodu nie wyświetlamy banera zgody na cookies - nie ma do tego niezbędnej podstawy.",
      },
      { type: "heading", id: "w-przyszlosci", text: "3. Ewentualne zmiany" },
      {
        type: "paragraph",
        text: "Jeśli w przyszłości wprowadzimy narzędzia analityczne (np. statystyki odwiedzin), zaktualizujemy ten dokument, a przed uruchomieniem śledzenia poprosimy o zgodę zgodnie z obowiązującymi przepisami.",
      },
      { type: "heading", id: "zarzadzanie", text: "4. Zarządzanie cookies" },
      {
        type: "paragraph",
        text: "Niezależnie od powyższego możesz w każdej chwili zarządzać plikami cookies w ustawieniach swojej przeglądarki - w tym je blokować i usuwać.",
      },
    ],
    seo: {
      title: "Polityka cookies | Egipskie Wakacje",
      description:
        "Polityka cookies serwisu egipskiewakacje.pl. Obecnie strona nie stosuje cookies śledzących ani zewnętrznych skryptów analitycznych.",
      canonicalPath: "/polityka-cookies/",
    },
  },
  {
    slug: "regulamin",
    route: "/regulamin",
    title: "Regulamin",
    updatedAt: UPDATED,
    body: [
      {
        type: "callout",
        tone: "info",
        text: "Pełne dane rejestrowe operatora zostaną podane po ich potwierdzeniu. Poniższy regulamin opisuje faktyczny sposób działania serwisu i rezerwacji.",
      },
      { type: "heading", id: "postanowienia", text: "1. Postanowienia ogólne" },
      {
        type: "paragraph",
        text: "Serwis egipskiewakacje.pl prezentuje wycieczki fakultatywne w Egipcie z odbiorem z hoteli w Hurghadzie, Marsa Alam i Sharm el Sheikh. Serwis ma charakter informacyjny i służy nawiązaniu kontaktu w celu rezerwacji.",
      },
      { type: "heading", id: "rezerwacja", text: "2. Rezerwacja" },
      {
        type: "paragraph",
        text: "Rezerwacje składasz przez formularz, który tworzy gotową wiadomość WhatsApp. Zgłoszenie jest wstępne. Umowa i szczegóły (dostępność, godzina odbioru, ostateczna cena) są potwierdzane w korespondencji z naszą ekipą. Serwis nie przyjmuje płatności online.",
      },
      { type: "heading", id: "ceny", text: "3. Ceny" },
      {
        type: "paragraph",
        text: "Ceny podawane są w USD i dotyczą aktualnej oferty. Ostateczny koszt może zależeć od strefy hotelowej (dopłata za transfer) oraz opcjonalnych atrakcji. Datę ostatniej weryfikacji ceny podajemy przy każdej wycieczce.",
      },
      { type: "heading", id: "zakres", text: "4. Zakres usługi" },
      {
        type: "paragraph",
        text: "Program, czas trwania i zakres wycieczki opisano na stronach poszczególnych wypraw. Elementy oznaczone jako opcjonalne lub nieujęte w cenie nie wchodzą w skład podstawowej usługi.",
      },
      { type: "heading", id: "kontakt", text: "5. Kontakt i reklamacje" },
      {
        type: "paragraph",
        text: "W sprawach dotyczących rezerwacji i ewentualnych reklamacji kontaktuj się z nami przez WhatsApp podany w serwisie. Pełne dane operatora i procedura reklamacyjna zostaną uzupełnione po ich potwierdzeniu.",
      },
    ],
    seo: {
      title: "Regulamin | Egipskie Wakacje",
      description:
        "Regulamin serwisu egipskiewakacje.pl. Rezerwacja przez WhatsApp, brak płatności online, ceny w USD, potwierdzenie szczegółów przez ekipę.",
      canonicalPath: "/regulamin/",
    },
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug);
}
