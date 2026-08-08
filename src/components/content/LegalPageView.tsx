import type { LegalPage } from "@/content/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { PostBody } from "@/components/content/PostBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDatePl } from "@/lib/format";

export function LegalPageView({ page }: { page: LegalPage }) {
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: page.title, path: `${page.route}/` },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader eyebrow="Informacje" title={page.title} crumbs={crumbs} />
      <section className="section">
        <div className="container container-narrow">
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Ostatnia aktualizacja: {formatDatePl(page.updatedAt)}
          </p>
          <PostBody blocks={page.body} />
        </div>
      </section>
    </>
  );
}
