import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconWhatsApp, IconPhone, IconGlobe, IconMapPin, IconCheck, IconArrowRight } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import styles from "./kontakt.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt | Egipskie Wakacje",
  description:
    "Skontaktuj się z Egipskie Wakacje przez WhatsApp, telefon lub e-mail. Obsługę rezerwacji prowadzimy po polsku - wycieczki z Hurghady, Marsa Alam i Sharm el Sheikh.",
  canonicalPath: "/kontakt/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Kontakt", path: "/kontakt/" },
];

/** What to include in a first message so we can answer in one reply. */
const TIPS = [
  "kierunek lub kurort (Hurghada, Marsa Alam, Sharm el Sheikh)",
  "preferowany termin wycieczki",
  "liczbę osób i wiek dzieci",
  "nazwę hotelu, jeśli jest już znana",
];

const INTERNAL_LINKS = [
  { label: "Wszystkie wycieczki", href: "/wycieczki/" },
  { label: "Wycieczki z Hurghady", href: "/wycieczki-z-hurghady/" },
  { label: "Wycieczki z Marsa Alam", href: "/wycieczki-z-marsa-alam/" },
  { label: "Wycieczki z Sharm el Sheikh", href: "/wycieczki-z-sharm-el-sheikh/" },
  { label: "Rezerwacja", href: "/rezerwacja/" },
  { label: "FAQ", href: "/faq/" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          contactPageJsonLd({
            name: "Kontakt - Egipskie Wakacje",
            canonicalPath: "/kontakt/",
            description:
              "Oficjalna strona kontaktowa Egipskie Wakacje - wycieczki fakultatywne w Egipcie. Kontakt przez WhatsApp, telefon i e-mail.",
          }),
        ]}
      />
      <PageHeader
        eyebrow="Kontakt"
        title="Napisz do nas"
        intro="Z Egipskie Wakacje skontaktujesz się przez WhatsApp, telefon lub e-mail. Najszybciej odpowiadamy na WhatsApp, a całą obsługę rezerwacji prowadzimy po polsku."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Primary channel - WhatsApp (strongest CTA). */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <IconWhatsApp />
              </span>
              <h2 className={styles.cardTitle}>WhatsApp</h2>
              <p className={styles.cardText}>
                Rezerwacje, dostępność, godziny odbioru i pytania - wszystko załatwisz w rozmowie.
              </p>
              <p className={styles.number}>{siteConfig.whatsappDisplay}</p>
              <Button
                href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
                external
                variant="whatsapp"
                size="lg"
                iconLeft={<IconWhatsApp />}
                analytics={{
                  ctaId: "contact_whatsapp",
                  ctaType: "whatsapp",
                  placement: "contact_section",
                  waIntent: "enquiry",
                }}
              >
                Napisz na WhatsApp
              </Button>
            </div>

            <div className={styles.info}>
              {/* Secondary channels: phone + e-mail + social, same premium gold icons. */}
              <div className={styles.channels}>
                <a
                  className={styles.phone}
                  href={`tel:+${siteConfig.whatsappNumber}`}
                  aria-label={`Zadzwoń do Egipskie Wakacje: ${siteConfig.whatsappDisplay}`}
                >
                  <span className={styles.phoneIcon}>
                    <IconPhone />
                  </span>
                  <span>
                    <span className={styles.channelLabel}>Telefon</span>
                    <span className={styles.channelValue}>{siteConfig.whatsappDisplay}</span>
                  </span>
                </a>
                <div className={styles.social}>
                  <span className={styles.channelLabel}>Facebook, Instagram, e-mail</span>
                  <SocialLinks variant="footer" />
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <IconGlobe />
                </span>
                <div>
                  <h3>Obsługa po polsku</h3>
                  <p>Rezerwację i pytania prowadzimy w języku polskim.</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <IconMapPin />
                </span>
                <div>
                  <h3>Odbiór z hotelu</h3>
                  <p>Obsługujemy hotele w Hurghadzie, Marsa Alam i Sharm el Sheikh.</p>
                </div>
              </div>

              <div className={styles.tips}>
                <h3 className={styles.tipsTitle}>Pisząc do nas, podaj:</h3>
                <ul>
                  {TIPS.map((t) => (
                    <li key={t}>
                      <IconCheck className={styles.tipCheck} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.note}>
                <p>
                  Nie prowadzimy płatności online. Zgłoszenie z formularza rezerwacji tworzy gotową
                  wiadomość na WhatsApp, a szczegóły potwierdzamy indywidualnie.
                </p>
              </div>
              <Button
                href="/rezerwacja/"
                variant="outline"
                size="lg"
                iconRight={<IconArrowRight />}
                analytics={{ ctaId: "contact_booking", ctaType: "booking", placement: "contact_section" }}
              >
                Przejdź do rezerwacji
              </Button>
            </div>
          </div>

          <nav className={styles.links} aria-label="Przydatne strony">
            <span className={styles.linksLabel}>Zobacz też:</span>
            <ul>
              {INTERNAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
