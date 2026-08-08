"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Tour } from "@/content/types";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconArrowRight, IconClock, IconMapPin, IconWhatsApp, IconGlobe } from "@/components/ui/icons";
import { priceLabel, formatMoney } from "@/lib/format";
import { buildBookingWhatsappUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import { track } from "@/lib/analytics";
import styles from "./TourCard.module.css";

export function TourCard({
  tour,
  position,
  priority = false,
}: {
  tour: Tour;
  position?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seen.current) {
            seen.current = true;
            track("tour_card_view", { tour_slug: tour.slug, destination: tour.destination });
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tour.slug, tour.destination]);

  const waUrl = buildBookingWhatsappUrl({
    tourTitle: tour.title,
    departure: tour.departure,
    date: "(do ustalenia)",
    hotel: "(do podania)",
    adults: 2,
    name: "(do podania)",
    pageUrl: absoluteUrl(tour.seo.canonicalPath),
  });

  return (
    <article ref={ref} className={styles.card}>
      <Link href={`${tour.route}/`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <OptimizedImage image={tour.heroImage} priority={priority} className={styles.img} />
        <span className={styles.badge}>{tour.availabilityLabel}</span>
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <IconMapPin /> {tour.departure}
          </span>
          <span className={styles.metaItem}>
            <IconClock /> {tour.durationLabel}
          </span>
        </div>

        <h3 className={styles.title}>
          <Link
            href={`${tour.route}/`}
            className={styles.titleLink}
            onClick={() =>
              track("tour_details_click", {
                tour_slug: tour.slug,
                destination: tour.destination,
                ...(position ? { position } : {}),
              })
            }
          >
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
          <div>
            <span className={styles.price}>{priceLabel(tour.price)}</span>
            <span className={styles.priceUnit}> / dorosły</span>
          </div>
          <span className={styles.childPrice}>
            dziecko {formatMoney(tour.price.child, tour.price.currency)}
          </span>
        </div>

        <div className={styles.actions}>
          <Link
            href={`${tour.route}/`}
            className={styles.details}
            onClick={() =>
              track("tour_details_click", { tour_slug: tour.slug, destination: tour.destination })
            }
          >
            Szczegóły <IconArrowRight />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.wa}
            aria-label={`Zapytaj o wycieczkę ${tour.title} na WhatsApp`}
          >
            <IconWhatsApp /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
