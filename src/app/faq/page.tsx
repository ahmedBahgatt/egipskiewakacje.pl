import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp, IconMail } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import styles from "./faq.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Najczęstsze pytania o wycieczki w Egipcie | FAQ",
  description:
    "Odpowiedzi na najczęstsze pytania o wycieczki do Kairu: rezerwacja, odbiór z hotelu, ceny dla dzieci, język przewodnika i rejs po Nilu.",
  canonicalPath: "/faq/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "FAQ", path: "/faq/" },
];

export default async function Page() {
  const faqs = await content.getSiteFaqs();

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
      <PageHeader
        eyebrow="FAQ"
        title="Najczęstsze pytania"
        intro="Zebraliśmy odpowiedzi na pytania, które najczęściej dostajemy przed rezerwacją."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container container-narrow">
          <Faq items={faqs} />
          <div className={styles.cta}>
            <p className={styles.ctaTitle}>Nie znalazłeś odpowiedzi?</p>
            <p className={styles.ctaText}>
              Napisz do Egipskie Wakacje na WhatsApp lub e-mail - odpowiadamy po polsku.
            </p>
            <div className={styles.ctaActions}>
              <Button
                href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
                external
                variant="whatsapp"
                size="lg"
                iconLeft={<IconWhatsApp />}
                analytics={{ ctaId: "faq_whatsapp", ctaType: "whatsapp", placement: "faq", waIntent: "enquiry" }}
              >
                Napisz na WhatsApp
              </Button>
              <Button
                href={`mailto:${siteConfig.email}`}
                variant="outline"
                size="lg"
                iconLeft={<IconMail />}
                ariaLabel="Napisz e-mail do Egipskie Wakacje"
                analytics={{ ctaId: "faq_email", ctaType: "email", placement: "faq" }}
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
