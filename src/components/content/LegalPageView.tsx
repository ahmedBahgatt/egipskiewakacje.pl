import type { LegalPage } from "@/content/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { PostBody } from "@/components/content/PostBody";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { IconWhatsApp, IconMail } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import { formatDatePl } from "@/lib/format";
import styles from "./LegalPageView.module.css";

export function LegalPageView({ page }: { page: LegalPage }) {
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: page.title, path: `${page.route}/` },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webPageJsonLd({
            name: page.title,
            canonicalPath: page.seo.canonicalPath,
            description: page.seo.description,
          }),
        ]}
      />
      <PageHeader eyebrow="Informacje" title={page.title} crumbs={crumbs} />
      <section className="section">
        <div className="container container-narrow">
          <p className={styles.updated}>
            <span className={styles.updatedDot} aria-hidden="true" />
            Ostatnia aktualizacja: {formatDatePl(page.updatedAt)}
          </p>
          <PostBody blocks={page.body} />

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Masz pytania dotyczące tej strony?</p>
            <p className={styles.contactText}>
              Napisz do Egipskie Wakacje na WhatsApp lub e-mail:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
            <div className={styles.contactActions}>
              <Button
                href={contactWhatsappUrl("Cześć! Mam pytanie dotyczące serwisu egipskiewakacje.pl.")}
                external
                variant="whatsappSubtle"
                size="md"
                iconLeft={<IconWhatsApp />}
                analytics={{ ctaId: "legal_whatsapp", ctaType: "whatsapp", placement: "legal", waIntent: "enquiry" }}
              >
                Napisz na WhatsApp
              </Button>
              <Button
                href={`mailto:${siteConfig.email}`}
                variant="outline"
                size="md"
                iconLeft={<IconMail />}
                ariaLabel="Napisz e-mail do Egipskie Wakacje"
                analytics={{ ctaId: "legal_email", ctaType: "email", placement: "legal" }}
              >
                Napisz e-mail
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
