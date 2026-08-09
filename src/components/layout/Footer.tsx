import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconWhatsApp } from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/config";
import { footerNav } from "./nav";
import styles from "./Footer.module.css";

export function Footer() {
  const year = 2026;
  const cols = Object.values(footerNav);

  return (
    <footer className={`${styles.footer} motif-dark on-dark`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Logo mono />
          <p className={styles.tagline}>
            Wycieczki fakultatywne w Egipcie dla polskich turystów. Kair i piramidy z Hurghady,
            Marsa Alam i Sharm el Sheikh.
          </p>
          <Button
            href={contactWhatsappUrl("Cześć! Mam pytanie o wycieczki w Egipcie.")}
            external
            variant="whatsapp"
            iconLeft={<IconWhatsApp />}
          >
            Napisz na WhatsApp
          </Button>
          <p className={styles.wa}>{siteConfig.whatsappDisplay}</p>
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
