import Link from "next/link";
import type { CategorySlug, MediaImage, TourCategory } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Reveal } from "@/components/motion/Reveal";
import { pluralTours } from "@/lib/polish";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./CategoryBrowse.module.css";

// Real photography per category (1200x800, 3:2). Files live in
// /public/media/categories/<slug>.{avif,webp,jpg}; alt text is SEO-oriented Polish.
const CATEGORY_IMAGE: Partial<Record<CategorySlug, MediaImage>> = {
  kair: {
    src: "/media/categories/kair",
    alt: "Piramida w Gizie i Sfinks o zachodzie słońca",
    width: 1200,
    height: 800,
  },
  luksor: {
    src: "/media/categories/luksor",
    alt: "Kolumny i obelisk świątyni w Karnaku w Luksorze w złotym świetle",
    width: 1200,
    height: 800,
  },
  "rejsy-wyspy": {
    src: "/media/categories/rejsy-wyspy",
    alt: "Biały jacht na turkusowym Morzu Czerwonym przy piaszczystej wyspie",
    width: 1200,
    height: 800,
  },
  "snorkeling-delfiny": {
    src: "/media/categories/snorkeling-delfiny",
    alt: "Snorkeling z dzikimi delfinami w przejrzystej wodzie Morza Czerwonego",
    width: 1200,
    height: 800,
  },
  nurkowanie: {
    src: "/media/categories/nurkowanie",
    alt: "Nurek z butlą nad kolorową rafą koralową Morza Czerwonego",
    width: 1200,
    height: 800,
  },
  safari: {
    src: "/media/categories/safari",
    alt: "Quad na pustyni w Egipcie o zachodzie słońca wśród gór",
    width: 1200,
    height: 800,
  },
  atrakcje: {
    src: "/media/categories/atrakcje",
    alt: "Wieczorny pokaz kolorowych fontann i iluminacji przy egipskim kurorcie",
    width: 1200,
    height: 800,
  },
  prywatne: {
    src: "/media/categories/prywatne",
    alt: "Prywatny przewodnik i komfortowy van podczas prywatnej wycieczki w Egipcie",
    width: 1200,
    height: 800,
  },
};

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
            const img = CATEGORY_IMAGE[c.slug];
            return (
              <Reveal as="div" key={c.slug} delay={i * 0.04}>
                <Link href={`${c.routeBase}/`} className={styles.card}>
                  {img && (
                    <span className={styles.media}>
                      <OptimizedImage image={img} className={styles.img} />
                    </span>
                  )}
                  <span className={styles.body}>
                    <span className={styles.name}>{c.shortLabel}</span>
                    <span className={styles.desc}>{c.description}</span>
                    <span className={styles.foot}>
                      <span className={styles.count}>
                        {n} {pluralTours(n)}
                      </span>
                      <IconArrowRight className={styles.arrow} />
                    </span>
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
