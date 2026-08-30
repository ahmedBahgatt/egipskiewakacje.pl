import type { StructureResolver } from "sanity/structure";

/**
 * Desk structure (admin navigation, English labels). Two jobs:
 *  1. Pin siteSettings as a singleton at the fixed document id "siteSettings".
 *  2. Keep the legacy documents (old all-inclusive `tourPackage` concept)
 *     visible in their own list instead of hiding or deleting them. They are
 *     not part of this schema, so they render as "unknown type" - expected.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Egipskie Wakacje")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.documentTypeListItem("destination").title("Destinations"),
      S.documentTypeListItem("tour").title("Tours"),
      S.documentTypeListItem("tourCategory").title("Tour Categories"),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("review").title("Reviews"),
      S.documentTypeListItem("legalPage").title("Legal Pages"),
      S.divider(),
      S.listItem()
        .title("Legacy Documents (Review Only)")
        .id("legacy")
        .child(
          S.documentList()
            .title("Legacy Documents")
            .apiVersion("2024-01-01")
            .filter('_type == "tourPackage"'),
        ),
    ]);
