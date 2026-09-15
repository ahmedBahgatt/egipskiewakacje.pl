import Link from "next/link";
import type { Tour } from "@/content/types";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin, IconWhatsApp, IconGlobe } from "@/components/ui/icons";
import { priceLabel, priceUnit, formatMoney } from "@/lib/format";
import { buildQuestionWhatsappUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import styles from "./TourCard.module.css";

export function TourCard({
  tour,
  priority = false,
  placement = "tour_grid",
}: {
  tour: Tour;
  /** Stable analytics placement, e.g. all_tours / related_tours / destination_listing. */
  placement?: string;
  priority?: boolean;
}) {
  const childOpt = tour.price.options.find((o) => /dziecko/i.test(o.label) && !o.free);

  // Card WhatsApp CTA is a question ("Zapytaj o..."), not a booking - no
  // placeholder date/hotel/adults; just the tour title + its URL.
  const waUrl = buildQuestionWhatsappUrl({
    type: "tour",
    title: tour.title,
    url: absoluteUrl(tour.seo.canonicalPath),
  });

  return (
    <article
      className={styles.card}
      data-testid="tour-card"
      data-card="tour"
      data-tour-slug={tour.slug}
      data-destination={tour.destination}
      data-placement={placement}
    >
      <Link href={`${tour.route}/`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <OptimizedImage image={tour.heroImage} priority={priority} className={styles.img} />
        <span className={styles.badge}>{tour.availabilityLabel}</span>
        <span className={styles.dur}>
          <IconClock /> {tour.durationLabel}
        </span>
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <IconMapPin /> {tour.departure}
          </span>
        </div>

        <h3 className={styles.title}>
          <Link href={`${tour.route}/`} className={styles.titleLink}>
            {tour.title}
          </Link>
        </h3>

        <ul className={styles.highlights}>
          {tour.highlights.slice(0, 4).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <p className={styles.guide}>
          <IconGlobe /> Przewodnik: {tour.guide.polishConfirmed ? "polski" : tour.guide.label.toLowerCase()}
        </p>

        <div className={styles.priceRow}>
          <div data-testid="tour-price">
            <span className={styles.price}>{priceLabel(tour.price)}</span>
            <span className={styles.priceUnit}> {priceUnit(tour.price)}</span>
          </div>
          {childOpt && !childOpt.free && (
            <span className={styles.childPrice}>
              dziecko {formatMoney(childOpt.amount, childOpt.currency)}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <Link href={`${tour.route}/`} className={styles.details}>
            Szczegóły <IconArrowRight />
          </Link>
          <a
            href={waUrl}
            rel="noopener noreferrer"
            className={styles.wa}
            aria-label={`Zapytaj o wycieczkę ${tour.title} na WhatsApp`}
            data-cta-id="tour_card_whatsapp"
            data-cta-type="whatsapp"
            data-placement="tour_card"
            data-wa-intent="enquiry"
            data-tour-slug={tour.slug}
            data-destination={tour.destination}
          >
            <IconWhatsApp /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
