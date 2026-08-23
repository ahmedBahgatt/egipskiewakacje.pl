import type { Testimonial } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck } from "@/components/ui/icons";
import styles from "./Testimonials.module.css";

/**
 * "Opinie uczestników naszych wycieczek" - genuine, anonymised participant
 * testimonials in an editorial layout (one large featured + a 2x2 grid).
 *
 * Honesty rules enforced here:
 * - No reviewer identity is shown and no fake name is invented; attribution is the
 *   generic, truthful "Uczestnik wycieczki" plus a factual trip label.
 * - No other brand is named and NO Google branding/rating is shown.
 * - Per-card stars reflect each review's own genuine, verified rating only.
 * - This is display/trust content: NO Review/AggregateRating JSON-LD is emitted.
 */
function Stars({ rating }: { rating: number }) {
  const n = Math.max(0, Math.min(5, Math.round(rating)));
  if (n === 0) return null;
  return (
    <span className={styles.stars} role="img" aria-label={`Ocena ${n} na 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={styles.star} aria-hidden="true" focusable="false">
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.94-5.5-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Badge() {
  return (
    <span className={styles.badge}>
      <IconCheck aria-hidden="true" /> Opinia po wycieczce
    </span>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  const featured = items.find((t) => t.featured) ?? items[0];
  const rest = items.filter((t) => t !== featured);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="opinie-title">
      <div className="container">
        <SectionHeading
          eyebrow="Opinie uczestników"
          title={<span id="opinie-title">Opinie uczestników naszych wycieczek</span>}
          intro="Prawdziwe doświadczenia osób, które korzystały z wycieczek realizowanych przez nasz zespół."
        />

        <div className={styles.layout}>
          {/* Featured testimonial */}
          <Reveal className={styles.featuredWrap}>
            <figure className={styles.featured}>
              <span className={styles.markLg} aria-hidden="true">
                &ldquo;
              </span>
              <Stars rating={featured.rating} />
              <blockquote className={styles.featuredQuote}>{featured.quote}</blockquote>
              <figcaption className={styles.foot}>
                <span className={styles.who}>
                  <span className={styles.person}>Uczestnik wycieczki</span>
                  <span className={styles.trip}>{featured.trip}</span>
                </span>
                <Badge />
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting testimonials - 2x2 on desktop */}
          <div className={styles.grid}>
            {rest.map((t, i) => (
              <Reveal as="div" key={t.id} delay={i * 0.05}>
                <figure className={styles.card}>
                  <span className={styles.markSm} aria-hidden="true">
                    &ldquo;
                  </span>
                  <Stars rating={t.rating} />
                  <blockquote className={styles.quote}>{t.quote}</blockquote>
                  <figcaption className={styles.who}>
                    <span className={styles.person}>Uczestnik wycieczki</span>
                    <span className={styles.trip}>{t.trip}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <p className={styles.note}>{items.length} wybranych opinii uczestników</p>
      </div>
    </section>
  );
}
