import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField, imageMember } from "../objects/imageWithAlt";

/**
 * Mirrors `Tour` in src/content/types.ts.
 *
 * FIELD NAMES ARE A CONTRACT with src/content/sanity/queries.ts, which flattens
 * some of them:
 *   adultPrice/childPrice/infantFree/childAgeMinimum/childAgeMaximum/currency/
 *   priceLastVerifiedAt/priceVariable  -> Tour.price
 *   guideLanguageLabel/guidePolishConfirmed -> Tour.guide
 *   pickupTime -> pickupLabel, returnTime -> returnLabel
 *   relatedPost-> relatedPostSlug
 *   seoTitle/seoDescription/canonicalPath/ogImage -> Tour.seo
 * Renaming any of these without editing queries.ts breaks sanity mode silently.
 *
 * Honesty rules baked into the schema:
 *  - `guidePolishConfirmed` defaults to false. Tick it only when a
 *    Polish-speaking guide is unambiguously confirmed by the operator.
 *  - `priceLastVerifiedAt` is required; the frontend shows that date.
 *  - No "old price" / discount / countdown fields exist, by design.
 */
export const tour = defineType({
  name: "tour",
  title: "Wycieczka",
  type: "document",
  groups: [
    { name: "content", title: "Treść", default: true },
    { name: "media", title: "Media" },
    { name: "pricing", title: "Ceny" },
    { name: "logistics", title: "Logistyka" },
    { name: "program", title: "Program" },
    { name: "relations", title: "Powiązania" },
    { name: "seo", title: "SEO i publikacja" },
  ],
  fields: [
    // --- Treść ---------------------------------------------------------------
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      description: 'Nazwa używana na kartach i w nawigacji, np. "Wycieczka z Hurghady do Kairu".',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "h1",
      title: "Nagłówek H1",
      type: "string",
      group: "content",
      description: "Nagłówek na stronie wycieczki. Zwykle identyczny z tytułem.",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Pełna ścieżka URL",
      type: "string",
      group: "content",
      description:
        'Razem z bazą kierunku, BEZ slasha na końcu, np. "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie".',
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9]+(-[a-z0-9]+)*\/[a-z0-9]+(-[a-z0-9]+)*$/, {
          name: '"/kierunek/slug-wycieczki"',
        }),
    }),
    defineField({
      name: "destination",
      title: "Kierunek",
      type: "reference",
      group: "content",
      to: [{ type: "destination" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "departure",
      title: "Miejsce wyjazdu",
      type: "string",
      group: "content",
      description: 'Etykieta pokazywana na karcie, np. "Hurghada".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tourCategory" }] })],
      description: "Porządkowanie w CMS. Nie wpływa na publiczne adresy URL.",
    }),
    defineField({
      name: "tourType",
      title: "Typ wycieczki",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Jednodniowa (całodniowa)", value: "jednodniowa" },
          { title: "Półdniowa", value: "poldniowa" },
          { title: "Wielodniowa", value: "wielodniowa" },
        ],
        layout: "radio",
      },
      initialValue: "jednodniowa",
    }),
    defineField({
      name: "shortDescription",
      title: "Krótki opis",
      type: "text",
      group: "content",
      rows: 3,
      description: "2-3 zdania na kartę wycieczki i listingi.",
      validation: (rule) => rule.required().min(60).max(320),
    }),
    defineField({
      name: "overview",
      title: "Opis wycieczki",
      type: "text",
      group: "content",
      rows: 8,
      description: "Rozwinięcie: co dokładnie obejmuje wyprawa i jak wygląda dzień.",
      validation: (rule) => rule.required().min(120),
    }),
    defineField({
      name: "highlights",
      title: "Główne atrakcje",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Krótkie hasła pokazywane jako znaczniki na karcie, np. „Piramidy w Gizie”.",
      validation: (rule) => rule.min(1).max(8),
    }),

    // --- Media ---------------------------------------------------------------
    imageField({
      name: "heroImage",
      title: "Obraz główny",
      group: "media",
      required: true,
      description:
        "Przeciągnij zdjęcie. Ustaw punkt ostrości (hotspot) na najważniejszym elemencie - kadr na telefonie jest węższy niż na komputerze.",
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      group: "media",
      of: [imageMember()],
      options: { layout: "grid" },
      description: "Kilka zdjęć z trasy. Każde wymaga własnego opisu alt.",
    }),
    defineField({
      name: "previewVideo",
      title: "Krótkie wideo (opcjonalnie)",
      type: "file",
      group: "media",
      description:
        "Opcjonalny materiał poglądowy. Frontend jest eksportem statycznym - plik trzeba dodatkowo zapisać w /public, jeśli ma być użyty na stronie.",
      options: { accept: "video/mp4,video/webm" },
    }),

    // --- Ceny ----------------------------------------------------------------
    defineField({
      name: "currency",
      title: "Waluta",
      type: "string",
      group: "pricing",
      options: { list: [{ title: "USD", value: "USD" }], layout: "radio" },
      initialValue: "USD",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "adultPrice",
      title: "Cena - dorosły",
      type: "number",
      group: "pricing",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "childPrice",
      title: "Cena - dziecko",
      type: "number",
      group: "pricing",
      description: "Cena dla dzieci w podanym niżej przedziale wiekowym.",
      validation: (rule) =>
        rule
          .required()
          .min(0)
          .precision(2)
          .custom((value, ctx) => {
            const adult = (ctx.document as { adultPrice?: number } | undefined)?.adultPrice;
            if (typeof value !== "number" || typeof adult !== "number") return true;
            return value <= adult ? true : "Cena dla dziecka nie może być wyższa niż dla dorosłego";
          }),
    }),
    defineField({
      name: "infantFree",
      title: "Najmłodsze dzieci bezpłatnie",
      type: "boolean",
      group: "pricing",
      description: "Dzieci poniżej dolnej granicy wieku jadą bezpłatnie.",
      initialValue: true,
    }),
    defineField({
      name: "childAgeMinimum",
      title: "Wiek dziecka - od",
      type: "number",
      group: "pricing",
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(0).max(18),
    }),
    defineField({
      name: "childAgeMaximum",
      title: "Wiek dziecka - do",
      type: "number",
      group: "pricing",
      initialValue: 11,
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(0)
          .max(18)
          .custom((value, ctx) => {
            const min = (ctx.document as { childAgeMinimum?: number } | undefined)?.childAgeMinimum;
            if (typeof value !== "number" || typeof min !== "number") return true;
            return value >= min ? true : "Górna granica wieku musi być większa niż dolna";
          }),
    }),
    defineField({
      name: "priceLastVerifiedAt",
      title: "Cena zweryfikowana dnia",
      type: "date",
      group: "pricing",
      options: { dateFormat: "YYYY-MM-DD" },
      description: "Data ostatniego sprawdzenia ceny u operatora. Pokazywana na stronie.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceVariable",
      title: 'Cena zmienna (pokaż "Cena od")',
      type: "boolean",
      group: "pricing",
      description: "Włącz, gdy końcowy koszt zależy od strefy transferu lub opcji dodatkowych.",
      initialValue: true,
    }),
    defineField({
      name: "transferSupplements",
      title: "Dopłaty za transfer",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "transferSupplement" })],
      description: "Tylko strefy, w których dopłata faktycznie obowiązuje.",
    }),
    defineField({
      name: "extras",
      title: "Opcje dodatkowe (płatne na miejscu)",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "labelledNote" })],
    }),

    // --- Logistyka -----------------------------------------------------------
    defineField({
      name: "availabilityLabel",
      title: "Dostępność - etykieta",
      type: "string",
      group: "logistics",
      description: 'Tekst pokazywany użytkownikowi, np. "Codziennie" albo "We wtorki".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availabilityDays",
      title: "Dni",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
      description: 'Wartości do filtrowania, np. ["Codziennie"] lub ["Wtorek"].',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "durationLabel",
      title: "Czas trwania",
      type: "string",
      group: "logistics",
      description: 'Np. "ok. 20-22 godzin". Realny czas, łącznie z dojazdami.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pickupTime",
      title: "Godzina odbioru",
      type: "string",
      group: "logistics",
      description: 'Przedział, np. "ok. 00:00-02:00". Dokładna godzina jest potwierdzana na WhatsApp.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "returnTime",
      title: "Godzina powrotu (opcjonalnie)",
      type: "string",
      group: "logistics",
      description: "Wypełnij tylko wtedy, gdy powrót jest przewidywalny.",
    }),
    defineField({
      name: "transport",
      title: "Transport",
      type: "string",
      group: "logistics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pickupZones",
      title: "Strefy odbioru",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
      description: "Strefy hotelowe objęte odbiorem. Dopłaty ustaw w sekcji Ceny.",
    }),
    defineField({
      name: "guideLanguageLabel",
      title: "Język przewodnika - etykieta",
      type: "string",
      group: "logistics",
      description:
        'Dokładnie to, co widzi użytkownik. Jeśli język nie jest pewny, wpisz "Potwierdzamy przed rezerwacją" i NIE zaznaczaj pola poniżej.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guidePolishConfirmed",
      title: "Polskojęzyczny przewodnik potwierdzony",
      type: "boolean",
      group: "logistics",
      description:
        "Zaznacz wyłącznie wtedy, gdy operator jednoznacznie potwierdza polskojęzycznego przewodnika na tej trasie.",
      initialValue: false,
    }),

    // --- Program -------------------------------------------------------------
    defineField({
      name: "itinerary",
      title: "Plan dnia",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "itineraryStep" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "included",
      title: "W cenie",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "excluded",
      title: "Poza ceną",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
      description: "Wymień wszystko, co bywa mylone z pozycjami w cenie (napoje, bilety dodatkowe).",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "whatToBring",
      title: "Co zabrać",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "requirements",
      title: "Wymagania i uwagi",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cancellationPolicy",
      title: "Warunki rezerwacji i odwołania",
      type: "text",
      group: "program",
      rows: 4,
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "faqs",
      title: "FAQ wycieczki",
      type: "array",
      group: "program",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.min(1),
    }),

    // --- Powiązania ----------------------------------------------------------
    defineField({
      name: "featured",
      title: "Wyróżniona na stronie głównej",
      type: "boolean",
      group: "relations",
      initialValue: false,
    }),
    // Editorial cross-links are WEAK on purpose: deleting a tour or an article
    // must never be blocked by a "still referenced" error, and the seed can
    // write mutual links without any ordering constraint.
    defineField({
      name: "relatedTours",
      title: "Powiązane wycieczki",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }], weak: true })],
    }),
    defineField({
      name: "relatedPost",
      title: "Polecany artykuł",
      type: "reference",
      group: "relations",
      to: [{ type: "blogPost" }],
      weak: true,
      description: "Jeden artykuł poradnika pokazywany na stronie wycieczki. Może zostać pusty.",
    }),

    // --- SEO i publikacja ----------------------------------------------------
    defineField({
      name: "seoTitle",
      title: "SEO - tytuł",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO - opis",
      type: "text",
      group: "seo",
      rows: 3,
      validation: (rule) => rule.required().min(50).max(175),
    }),
    defineField({
      name: "canonicalPath",
      title: "Ścieżka kanoniczna",
      type: "string",
      group: "seo",
      description: 'Ścieżka z pola wyżej, ale ZE slashem na końcu, np. "/wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/".',
      validation: (rule) =>
        rule.required().regex(/^\/([a-z0-9-]+\/)*$/, {
          name: 'ścieżka zaczynająca i kończąca się "/"',
        }),
    }),
    imageField({
      name: "ogImage",
      title: "Obraz Open Graph (opcjonalnie)",
      group: "seo",
      description:
        "Obraz pokazywany przy udostępnianiu linku (Facebook, WhatsApp). Najlepiej kadr poziomy 1200x630. Puste = obraz główny wycieczki.",
    }),
    defineField({
      name: "published",
      title: "Opublikowana",
      type: "boolean",
      group: "seo",
      description: "Odznacz, aby ukryć wycieczkę na stronie bez usuwania dokumentu.",
      initialValue: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Ostatnia aktualizacja treści",
      type: "date",
      group: "seo",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Wyróżnione, potem cena rosnąco",
      name: "featuredThenPrice",
      by: [
        { field: "featured", direction: "desc" },
        { field: "adultPrice", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      departure: "departure",
      adultPrice: "adultPrice",
      currency: "currency",
      published: "published",
      media: "heroImage",
    },
    prepare: ({ title, departure, adultPrice, currency, published, media }) => ({
      title: published === false ? `${title} (ukryta)` : title,
      subtitle: [departure, adultPrice != null ? `od ${adultPrice} ${currency ?? "USD"}` : null]
        .filter(Boolean)
        .join(" - "),
      media,
    }),
  },
});
