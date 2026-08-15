import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import { formatTourCount } from "@/lib/polish";
import type { DestinationSlug, MediaImage } from "@/content/types";
import styles from "./ResortTiles.module.css";

export interface ResortTile {
  slug: DestinationSlug;
  name: string;
  nameGenitive: string;
  routeBase: string;
  heroImage: MediaImage;
  total: number;
}

/**
 * "Skąd wyruszasz?" - the homepage resort chooser as three large, image-led
 * tiles (one per Red Sea base). Each links straight into that resort's full
 * excursion offer, with a gold call-to-action disc echoing the brand palette.
 */
export function ResortTiles({ resorts }: { resorts: ResortTile[] }) {
  return (
    <section className="section" aria-labelledby="resorts-title">
      <div className="container">
        <SectionHeading
          eyebrow="Trzy kurorty nad Morzem Czerwonym"
          title={<span id="resorts-title">Skąd wyruszasz?</span>}
          intro="Wybierz kurort, w którym się zatrzymujesz - pokażemy wszystkie wycieczki, które możesz stamtąd zarezerwować, z odbiorem spod hotelu."
        />

        <div className={styles.tiles}>
          {resorts.map((r, i) => (
            <Reveal as="div" key={r.slug} delay={i * 0.08}>
              <Link href={`${r.routeBase}/`} className={styles.tile}>
                <span className={styles.media}>
                  <OptimizedImage image={r.heroImage} className={styles.img} />
                </span>
                <span className={styles.body}>
                  <span className={styles.info}>
                    <span className={styles.name}>{r.name}</span>
                    <span className={styles.count}>{formatTourCount(r.total)}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    <IconArrowRight />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
