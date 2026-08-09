import Link from "next/link";
import type { TourCategory } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./CategoryBrowse.module.css";

function tourWord(n: number): string {
  if (n === 1) return "wycieczka";
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) return "wycieczki";
  return "wycieczek";
}

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
                      {n} {tourWord(n)}
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
