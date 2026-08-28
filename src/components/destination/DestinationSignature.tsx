import type { DestinationSlug } from "@/content/types";
import styles from "./DestinationSignature.module.css";

/**
 * Destination "signature band": a wide, purely-decorative illustration that
 * bridges the PageIntro/Quick Facts block and the "Praktycznie" section, giving
 * each resort its own identity, plus one short factual Polish sentence beneath.
 *
 * The artwork is a supplied, hand-made transparent illustration (one per resort)
 * served as an optimized responsive WebP (near-lossless, so the fine line-art
 * stays crisp) with a PNG fallback. It sits directly on the cream page
 * background - no card, no box. Intrinsic width/height reserve space, so there is
 * no layout shift, and no JS or animation is involved.
 */

const ART_W = 2172;
const ART_H = 724;

type Signature = { alt: string; caption: string };

const DATA: Record<DestinationSlug, Signature> = {
  hurghada: {
    alt: "Ilustracja liniowa Morza Czerwonego, jachtu, nadmorskiej Hurghady i piramid",
    caption: "Morze Czerwone, rejsy, snorkeling i wygodny dojazd do Kairu oraz Luksoru.",
  },
  "marsa-alam": {
    alt: "Ilustracja liniowa rafy koralowej, żółwia i delfina na wybrzeżu Marsa Alam",
    caption:
      "Rafy koralowe, spotkania z delfinami i żółwiami oraz spokojny rytm wybrzeża Marsa Alam.",
  },
  "sharm-el-sheikh": {
    alt: "Ilustracja liniowa rafy Morza Czerwonego, gór Synaju i pustyni w Sharm el Sheikh",
    caption: "Rafy Synaju, Ras Mohammed, pustynne safari i dalsze wyprawy z Sharm el Sheikh.",
  },
};

export function DestinationSignature({
  slug,
  className,
}: {
  slug: DestinationSlug;
  className?: string;
}) {
  const { alt, caption } = DATA[slug];
  const base = `/media/destinations/signatures/destination-signature-${slug}`;

  return (
    <section className={`${styles.band} ${className ?? ""}`} aria-label="O kurorcie">
      <div className={`container ${styles.inner}`}>
        <span className={styles.rail} aria-hidden="true">
          <span className={styles.line} />
          <span className={styles.diamond} />
        </span>

        <picture className={styles.art}>
          <source
            type="image/webp"
            srcSet={`${base}-900.webp 900w, ${base}-1600.webp 1600w`}
            sizes="(min-width: 960px) 900px, 92vw"
          />
          <img
            src={`${base}.png`}
            alt={alt}
            width={ART_W}
            height={ART_H}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <span className={`${styles.rail} ${styles.railEnd}`} aria-hidden="true">
          <span className={styles.diamond} />
          <span className={styles.line} />
        </span>
      </div>

      <p className={styles.caption}>{caption}</p>
    </section>
  );
}
