import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";

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
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
              Nie znalazłeś odpowiedzi? Napisz do nas.
            </p>
            <Button
              href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
              external
              variant="whatsapp"
              size="lg"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
