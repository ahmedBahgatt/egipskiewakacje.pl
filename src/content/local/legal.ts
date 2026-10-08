import type { LegalPage } from "@/content/types";

const UPDATED_LEGAL = "2026-10-09";
const UPDATED_COOKIES = "2026-09-15";

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
    updatedAt: UPDATED_LEGAL,
    body: [
      {
        type: "callout",
        tone: "info",
        text: "Pełne dane rejestrowe operatora (nazwa podmiotu, adres, numer rejestrowy) zostaną podane po ich potwierdzeniu. Poniższa treść opisuje faktyczny sposób działania serwisu i przetwarzania danych.",
      },
      { type: "heading", id: "administrator", text: "1. Administrator danych" },
      {
        type: "paragraph",
        text: "Administratorem danych związanych z serwisem egipskiewakacje.pl jest operator marki Egipskie Wakacje. Pełne dane identyfikacyjne i kontaktowe operatora zostaną uzupełnione po ich potwierdzeniu. Kontakt w sprawach bieżących odbywa się przez WhatsApp lub na adres e-mail info.egipskiewakacje@gmail.com podany w serwisie.",
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
        text: "Serwis egipskiewakacje.pl korzysta z Google Analytics 4 (GA4) do zbiorczego pomiaru ruchu i ważnych interakcji na stronie. Zgoda na przechowywanie danych (Google Consent Mode) jest skonfigurowana regionalnie: dla użytkowników z Europejskiego Obszaru Gospodarczego i Wielkiej Brytanii (w tym z Polski) przechowywanie danych analitycznych i reklamowych jest domyślnie wyłączone, a pomiar działa w trybie bezplikowym. Do GA4 nie wysyłamy treści formularza rezerwacji ani danych osobowych (imię, numer telefonu, adres e-mail, treść wiadomości). Szczegóły opisuje Polityka cookies.",
      },
      { type: "heading", id: "prawa", text: "5. Twoje prawa" },
      {
        type: "paragraph",
        text: "Przysługują Ci prawa wynikające z RODO, w tym prawo dostępu do danych, ich sprostowania, usunięcia oraz ograniczenia przetwarzania. Ponieważ serwis nie przechowuje danych z formularza, dotyczą one przede wszystkim korespondencji prowadzonej przez WhatsApp. W sprawach dotyczących danych napisz do nas przez WhatsApp lub na adres e-mail info.egipskiewakacje@gmail.com.",
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
    updatedAt: UPDATED_COOKIES,
    body: [
      { type: "heading", id: "czym-sa", text: "1. Czym są pliki cookies" },
      {
        type: "paragraph",
        text: "Pliki cookies to niewielkie informacje zapisywane przez stronę w przeglądarce użytkownika. Mogą służyć działaniu strony lub celom analitycznym i marketingowym.",
      },
      { type: "heading", id: "jak-uzywamy", text: "2. Jak używamy cookies" },
      {
        type: "paragraph",
        text: "Serwis egipskiewakacje.pl korzysta z Google Analytics 4 (GA4) do zbiorczego pomiaru sposobu korzystania ze strony oraz ważnych interakcji - m.in. odsłon stron, kliknięć przycisków (CTA), kontaktów przez WhatsApp i działań związanych z rezerwacją. Zgoda na przechowywanie danych (Google Consent Mode) jest skonfigurowana regionalnie. Dla użytkowników z Europejskiego Obszaru Gospodarczego, Wielkiej Brytanii oraz Szwajcarii, Norwegii, Islandii i Liechtensteinu (w tym z Polski) domyślnie wyłączamy przechowywanie danych analitycznych i reklamowych (analytics_storage, ad_storage, ad_user_data i ad_personalization = denied) - w tych krajach strona nie zapisuje analitycznych plików cookies Google, takich jak _ga czy _gid, a pomiar odbywa się w trybie bezplikowym (cookieless) tam, gdzie jest to obsługiwane. Dla użytkowników spoza tego regionu Google Analytics może korzystać ze standardowego pomiaru i zapisywać analityczne pliki cookies (np. _ga). W żadnym przypadku nie wysyłamy do GA4 treści formularza rezerwacji ani innych danych osobowych, takich jak imię, numer telefonu, adres e-mail czy treść wiadomości. Nie wyświetlamy okna zgody na cookies.",
      },
      { type: "heading", id: "w-przyszlosci", text: "3. Ewentualne zmiany" },
      {
        type: "paragraph",
        text: "Jeśli w przyszłości wprowadzimy narzędzia wymagające zapisu plików cookies lub innych informacji w Twoim urządzeniu (np. w celach reklamowych albo statystycznych z użyciem cookies), zaktualizujemy ten dokument i udostępnimy odpowiedni mechanizm zgody, zgodnie z obowiązującymi przepisami.",
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
        "Polityka cookies egipskiewakacje.pl. Google Analytics 4 z regionalnym trybem zgody: w UE/EOG i Wielkiej Brytanii bez plików cookies, poza tym regionem pomiar standardowy.",
      canonicalPath: "/polityka-cookies/",
    },
  },
  {
    slug: "regulamin",
    route: "/regulamin",
    title: "Regulamin",
    updatedAt: UPDATED_LEGAL,
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
        text: "Aktualne ceny podajemy w USD na stronie każdej wycieczki. Ostateczny koszt może zależeć od strefy hotelowej (dopłata za transfer) oraz wybranych atrakcji opcjonalnych. Ostateczną cenę i dostępność potwierdzamy przy rezerwacji, w korespondencji z naszą ekipą.",
      },
      { type: "heading", id: "zakres", text: "4. Zakres usługi" },
      {
        type: "paragraph",
        text: "Program, czas trwania i zakres wycieczki opisano na stronach poszczególnych wypraw. Elementy oznaczone jako opcjonalne lub nieujęte w cenie nie wchodzą w skład podstawowej usługi.",
      },
      { type: "heading", id: "kontakt", text: "5. Kontakt i reklamacje" },
      {
        type: "paragraph",
        text: "W sprawach dotyczących rezerwacji i ewentualnych reklamacji kontaktuj się z nami przez WhatsApp lub na adres e-mail info.egipskiewakacje@gmail.com podany w serwisie. Pełne dane operatora i procedura reklamacyjna zostaną uzupełnione po ich potwierdzeniu.",
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
