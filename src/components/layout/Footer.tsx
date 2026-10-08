import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconWhatsApp, IconPhone } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import { footerNav } from "./nav";
import { SocialLinks } from "./SocialLinks";
import styles from "./Footer.module.css";

export function Footer() {
  const year = 2026;
  const cols = Object.values(footerNav);

  return (
    <footer className={`${styles.footer} motif-dark on-dark`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brandLink} aria-label="Egipskie Wakacje - strona główna">
            <Logo context="footer" />
          </Link>
          <p className={styles.tagline}>
            Wycieczki fakultatywne w Egipcie dla polskich turystów. Kair i piramidy z Hurghady,
            Marsa Alam i Sharm el Sheikh.
          </p>
          <Button
            href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
            external
            variant="whatsapp"
            iconLeft={<IconWhatsApp />}
            analytics={{
              ctaId: "footer_whatsapp",
              ctaType: "whatsapp",
              placement: "footer",
              waIntent: "enquiry",
            }}
          >
            Napisz na WhatsApp
          </Button>

          {/* Premium contact row. The phone leads in gold (a tel: call link);
              below it the shared gold-bordered Facebook / Instagram / Email icons
              (FB/IG keep rel="me" for entity linking) and the email address in a
              softer secondary tone so the phone stays the strongest element. */}
          <div className={styles.contact}>
            <a
              className={styles.phone}
              href={`tel:+${siteConfig.whatsappNumber}`}
              aria-label={`Zadzwoń: ${siteConfig.whatsappDisplay}`}
            >
              <span className={styles.phoneIcon}>
                <IconPhone />
              </span>
              <span>{siteConfig.whatsappDisplay}</span>
            </a>
            <span className={styles.divider} aria-hidden="true" />
            <SocialLinks variant="footer" />
            <a
              className={styles.email}
              href={`mailto:${siteConfig.email}`}
              aria-label="Napisz e-mail do Egipskie Wakacje"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <nav className={styles.cols} aria-label="Stopka">
          {cols.map((col) => (
            <div key={col.title} className={styles.col}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          &copy; {year} {siteConfig.name} - {siteConfig.domain}
        </p>
        <p className={styles.note}>Brak płatności online. Rezerwacje potwierdzamy na WhatsApp.</p>
      </div>
    </footer>
  );
}
