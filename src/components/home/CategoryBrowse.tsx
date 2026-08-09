import Link from "next/link";
import type { TourCategory } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pluralTours } from "@/lib/polish";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./CategoryBrowse.module.css";

export function CategoryBrowse({
  categories,
  counts,
}: {
  categories: TourCategory[];
  counts: Map<string, number>;
}) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Przeglądaj według rodzaju"
          title="Znajdź wycieczkę dla siebie"
          intro="Od historii i piramid, przez rejsy i snorkeling, po pustynne safari - wybierz rodzaj wyprawy, który najbardziej Ci odpowiada."
        />
        <div className={styles.grid}>
          {categories.map((c, i) => {
            const n = counts.get(c.slug) ?? 0;
            return (
              <Reveal as="div" key={c.slug} delay={i * 0.04}>
                <Link href={`${c.routeBase}/`} className={styles.card}>
                  <span className={styles.name}>{c.shortLabel}</span>
                  <span className={styles.desc}>{c.description}</span>
                  <span className={styles.foot}>
                    <span className={styles.count}>
                      {n} {pluralTours(n)}
                    </span>
                    <IconArrowRight className={styles.arrow} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
