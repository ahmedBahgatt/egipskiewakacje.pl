"use client";

import Link from "next/link";
import { destinations } from "@/content/local/destinations";
import { Tilt } from "@/components/motion/Tilt";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import styles from "./DestinationCards.module.css";

export function DestinationCards() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Kierunki"
          title="Skąd chcesz wyruszyć?"
          intro="Wybierz kurort, w którym się zatrzymujesz - pokażemy wycieczki dostępne z tego miejsca."
        />
        <div className={styles.grid}>
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.07} className={styles.cell}>
              <Tilt className={styles.tilt}>
                <Link
                  href={`${d.routeBase}/`}
                  className={styles.card}
                  onClick={() => track("destination_select", { destination: d.slug, source: "cards" })}
                >
                  <div className={styles.media}>
                    <OptimizedImage image={d.heroImage} className={styles.img} />
                    <div className={styles.scrim} />
                    <div className={styles.caption}>
                      <span className={styles.kicker}>Wycieczki z</span>
                      <h3 className={styles.name}>{d.name}</h3>
                    </div>
                  </div>
                  <p className={styles.more}>
                    Zobacz wycieczki <IconArrowRight />
                  </p>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
