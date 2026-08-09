import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./HelpMeChoose.module.css";

interface Intent {
  q: string;
  hint: string;
  href: string;
}

/**
 * "Pomóż mi wybrać" - intent-based navigation. Every option routes into the
 * existing category/destination architecture (no dead ends, no invented pages),
 * so a visitor who knows what they want but not what it's called still lands right.
 */
const INTENTS: Intent[] = [
  { q: "Podróżuję z dziećmi", hint: "Atrakcje, akwaria i rodzinne rejsy", href: "/wycieczki/atrakcje-i-rozrywka/" },
  { q: "Chcę zobaczyć zabytki", hint: "Kair, piramidy i Luksor", href: "/wycieczki/kair-i-piramidy/" },
  { q: "Chcę snorkeling i delfiny", hint: "Rafy, delfiny i żółwie", href: "/wycieczki/snorkeling-i-delfiny/" },
  { q: "Chcę nurkować", hint: "Nurkowanie i kursy PADI", href: "/wycieczki/nurkowanie/" },
  { q: "Szukam aktywnej przygody", hint: "Safari, quady i buggy", href: "/wycieczki/safari-i-quady/" },
  { q: "Chcę relaksu na łodzi", hint: "Rejsy na wyspy Morza Czerwonego", href: "/wycieczki/rejsy-i-wyspy/" },
  { q: "Mam tylko pół dnia", hint: "Krótkie atrakcje blisko hotelu", href: "/wycieczki/atrakcje-i-rozrywka/" },
  { q: "Chcę wycieczkę tylko dla nas", hint: "Prywatne wyprawy z własnym planem", href: "/wycieczki/wycieczki-prywatne/" },
];

export function HelpMeChoose() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Pomóż mi wybrać"
          title="Powiedz, czego szukasz"
          intro="Nie wiesz, od czego zacząć? Wybierz to, co pasuje do Twojego wyjazdu - pokażemy dopasowane wycieczki."
        />
        <div className={styles.grid}>
          {INTENTS.map((it, i) => (
            <Reveal as="div" key={it.q} delay={i * 0.03}>
              <Link href={it.href} className={styles.card}>
                <span className={styles.q}>{it.q}</span>
                <span className={styles.hint}>{it.hint}</span>
                <span className={styles.more} aria-hidden="true">
                  <IconArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
