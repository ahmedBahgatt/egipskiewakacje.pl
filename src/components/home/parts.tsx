import Link from "next/link";
import type { BlogPost } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import {
  IconArrowRight,
  IconBus,
  IconCheck,
  IconGlobe,
  IconMapPin,
  IconShield,
  IconWhatsApp,
} from "@/components/ui/icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { formatDatePl } from "@/lib/format";
import styles from "./parts.module.css";

/* --- Trust strip ---------------------------------------------------------- */
const TRUST = [
  { icon: <IconShield />, label: "Bez przedpłaty" },
  { icon: <IconCheck />, label: "Płatność przy rozpoczęciu wycieczki" },
  { icon: <IconWhatsApp />, label: "Rezerwacja przez WhatsApp" },
  { icon: <IconMapPin />, label: "Odbiór z hotelu" },
  { icon: <IconGlobe />, label: "Obsługa po polsku" },
];

export function TrustStrip() {
  return (
    <section className={styles.trustWrap} aria-label="Nasze atuty">
      <div className="container">
        <ul className={styles.trust}>
          {TRUST.map((t) => (
            <li key={t.label} className={styles.trustItem}>
              <span className={styles.trustIcon}>{t.icon}</span>
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --- Booking steps -------------------------------------------------------- */
const STEPS = [
  {
    n: "1",
    title: "Wybierz wycieczkę",
    text: "Przejrzyj wyprawy z Hurghady, Marsa Alam i Sharm el Sheikh. Ceny i program masz od razu na stronie.",
  },
  {
    n: "2",
    title: "Zarezerwuj przez WhatsApp",
    text: "Podaj datę, hotel i liczbę osób w krótkim formularzu. Otwiera on WhatsApp z gotową wiadomością, a nasza ekipa potwierdza dostępność, godzinę odbioru i cenę.",
  },
  {
    n: "3",
    title: "Płać przy rozpoczęciu wycieczki",
    text: "Bez przedpłaty, zaliczki i płatności online. Za wycieczkę płacisz dopiero na miejscu, gdy odbieramy Cię spod hotelu.",
  },
];

export function BookingSteps() {
  return (
    <section className={`section ${styles.stepsSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Jak to działa"
          title="Rezerwacja w trzech krokach"
          intro="Bez logowania, bez przedpłaty i bez płatności online. Rezerwację potwierdzamy w rozmowie na WhatsApp, a płacisz dopiero przy rozpoczęciu wycieczki."
        />
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className={styles.step}>
              <span className={styles.stepNum}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --- Why us --------------------------------------------------------------- */
const WHY = [
  { icon: <IconShield />, title: "Bez przedpłaty", text: "Nie pobieramy zaliczki ani przedpłaty i nie ma płatności online. Płacisz dopiero przy rozpoczęciu wycieczki." },
  { icon: <IconCheck />, title: "Przejrzyste ceny", text: "Ceny w USD podane wprost, bez ukrytych kosztów i sztucznych promocji." },
  { icon: <IconMapPin />, title: "Odbiór z hotelu", text: "Kierowca odbiera i odwozi pod hotel. Godzinę potwierdzamy przed wyjazdem." },
  { icon: <IconGlobe />, title: "Obsługa po polsku", text: "Rezerwację i pytania załatwiasz po polsku, od pierwszej wiadomości." },
  { icon: <IconWhatsApp />, title: "Rezerwacja przez WhatsApp", text: "Krótki formularz zamiast długiego procesu - resztę ustalamy w rozmowie." },
  { icon: <IconBus />, title: "Lokalna wiedza", text: "Działamy na miejscu w Egipcie i znamy realny przebieg każdej trasy." },
];

export function WhyUs() {
  return (
    <section className={`section ${styles.whySection}`} aria-label="Dlaczego my">
      <div className="container">
        <SectionHeading eyebrow="Dlaczego my" title="Konkretne powody, dla których warto" />
        <div className={styles.whyGrid}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className={styles.whyCard}>
                <span className={styles.whyIcon}>{w.icon}</span>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyText}>{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- About preview -------------------------------------------------------- */
export function AboutPreview() {
  return (
    <section className={`section ${styles.about}`}>
      <div className={`container ${styles.aboutInner}`}>
        <Reveal className={styles.aboutText}>
          <p className="eyebrow">O nas</p>
          <h2 className={styles.aboutTitle}>Pomagamy polskim turystom odkrywać Egipt</h2>
          <p>
            Egipskie Wakacje pomaga polskim turystom znaleźć i zarezerwować wycieczki fakultatywne z
            Hurghady, Marsa Alam i Sharm el Sheikh. Skupiamy się na jasnych zasadach: przejrzysta
            cena, odbiór z hotelu i kontakt po polsku.
          </p>
          <p>
            Rezerwacja zaczyna się od krótkiej wiadomości na WhatsApp, a szczegóły - dostępność,
            godzinę odbioru i cenę - potwierdzamy indywidualnie.
          </p>
          <Button href="/o-nas/" variant="outline" iconRight={<IconArrowRight />}>
            Poznaj nas
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Guide preview -------------------------------------------------------- */
export function GuidePreview({ post }: { post: BlogPost }) {
  return (
    <section className={`section ${styles.guide}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Poradnik"
          title="Przygotuj się do wyprawy"
          intro="Praktyczna wiedza przed wyjazdem do Kairu - bez lania wody."
        />
        <Reveal>
          <Link href={`${post.route}/`} className={styles.guideCard}>
            <div className={styles.guideMedia}>
              <OptimizedImage image={post.featuredImage} className={styles.guideImg} />
            </div>
            <div className={styles.guideBody}>
              <span className={styles.guideCat}>{post.category}</span>
              <h3 className={styles.guideCardTitle}>{post.title}</h3>
              <p className={styles.guideExcerpt}>{post.excerpt}</p>
              <time className={styles.guideDate} dateTime={post.updatedAt}>
                Aktualizacja: {formatDatePl(post.updatedAt)}
              </time>
              <span className={styles.guideMore}>
                Czytaj poradnik <IconArrowRight />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Final CTA ------------------------------------------------------------ */
export function FinalCta() {
  return (
    <section className={`section ${styles.finalSection}`}>
      <div className="container">
        <Reveal className={`${styles.band} on-dark`}>
          <div className={styles.bandText}>
            <h2 className={styles.finalTitle}>Nie wiesz, którą wycieczkę wybrać?</h2>
            <p className={styles.finalText}>
              Napisz do nas na WhatsApp. Pomożemy dobrać wycieczkę do miejsca pobytu, terminu i
              liczby uczestników.
            </p>
          </div>
          <div className={styles.finalCtas}>
            <Button
              href={contactWhatsappUrl("Cześć! Pomożecie dobrać wycieczkę do Kairu?")}
              external
              variant="whatsapp"
              size="lg"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
            <Button href="/cennik/" variant="outline" size="lg">
              Zobacz cennik
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
