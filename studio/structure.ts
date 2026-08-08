import type { StructureResolver } from "sanity/structure";

/**
 * Desk structure. Two jobs:
 *  1. Pin siteSettings as a singleton at the fixed document id "siteSettings".
 *  2. Keep the legacy documents (old all-inclusive `tourPackage` concept)
 *     visible in their own list instead of hiding or deleting them. They are
 *     not part of this schema, so they render as "unknown type" - that is
 *     expected. Review them manually before removing anything.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Egipskie Wakacje")
    .items([
      S.listItem()
        .title("Ustawienia serwisu")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Ustawienia serwisu"),
        ),
      S.divider(),
      S.documentTypeListItem("destination").title("Kierunki"),
      S.documentTypeListItem("tour").title("Wycieczki"),
      S.documentTypeListItem("tourCategory").title("Kategorie wycieczek"),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Poradnik"),
      S.documentTypeListItem("author").title("Autorzy"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("review").title("Opinie"),
      S.documentTypeListItem("legalPage").title("Strony prawne"),
      S.divider(),
      S.listItem()
        .title("Dokumenty legacy (do przeglądu)")
        .id("legacy")
        .child(
          S.documentList()
            .title("Dokumenty legacy")
            .apiVersion("2024-01-01")
            .filter('_type == "tourPackage"'),
        ),
    ]);
