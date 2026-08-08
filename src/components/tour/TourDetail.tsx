import Link from "next/link";
import type { BlogPost, Destination, Tour } from "@/content/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { DataTable } from "@/components/ui/DataTable";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ItineraryTimeline } from "./ItineraryTimeline";
import { BookingForm } from "@/components/booking/BookingForm";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";
import {
  IconArrowRight,
  IconBus,
  IconCalendar,
  IconCheck,
  IconClock,
  IconGlobe,
  IconMapPin,
  IconWhatsApp,
  IconX,
} from "@/components/ui/icons";
import { priceLabel, formatMoney, formatDatePl } from "@/lib/format";
import { buildBookingWhatsappUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/content/config";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  tourJsonLd,
} from "@/lib/seo";
import styles from "./TourDetail.module.css";

export function TourDetail({
  tour,
  destination,
  relatedPost,
}: {
  tour: Tour;
  destination: Destination;
  relatedPost?: BlogPost;
}) {
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: `Wycieczki z ${destination.nameGenitive}`, path: `${destination.routeBase}/` },
    { name: tour.title, path: `${tour.route}/` },
  ];

  const quickFacts = [
    { icon: <IconMapPin />, label: "Wyjazd", value: tour.departure },
    { icon: <IconClock />, label: "Czas", value: tour.durationLabel },
    { icon: <IconCalendar />, label: "Dostępność", value: tour.availabilityLabel },
    { icon: <IconBus />, label: "Transport", value: tour.transport },
    { icon: <IconClock />, label: "Odbiór", value: tour.pickupLabel },
    {
      icon: <IconGlobe />,
      label: "Przewodnik",
      value: tour.guide.polishConfirmed ? "Polski" : tour.guide.label,
    },
  ];

  const waQuick = buildBookingWhatsappUrl({
    tourTitle: tour.title,
    departure: tour.departure,
    date: "(do ustalenia)",
    hotel: "(do podania)",
    adults: 2,
    name: "(do podania)",
    pageUrl: absoluteUrl(tour.seo.canonicalPath),
  });

  const bookingOption = {
    slug: tour.slug,
    title: tour.title,
    departure: tour.departure,
    destination: tour.destination,
    canonicalPath: tour.seo.canonicalPath,
  };

  return (
    <article className={styles.page}>
      <JsonLd
        data={[breadcrumbJsonLd(crumbs), tourJsonLd(tour), faqJsonLd(tour.faqs)]}
      />

      <div className="container">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      {/* --- top: gallery + summary / sticky booking card --- */}
      <section className={`container ${styles.top}`}>
        <div className={styles.main}>
          <div className={styles.gallery}>
            <div className={styles.heroImg}>
              <OptimizedImage image={tour.heroImage} priority rounded />
            </div>
            <div className={styles.thumbs}>
              {tour.gallery.slice(1, 4).map((img) => (
                <div key={img.src} className={styles.thumb}>
                  <OptimizedImage image={img} rounded />
                </div>
              ))}
            </div>
          </div>

          <h1 className={styles.title}>{tour.h1}</h1>
          <p className={styles.lead}>{tour.shortDescription}</p>

          <ul className={styles.facts}>
            {quickFacts.map((f) => (
              <li key={f.label} className={styles.fact}>
                <span className={styles.factIcon}>{f.icon}</span>
                <span>
                  <span className={styles.factLabel}>{f.label}</span>
                  <span className={styles.factValue}>{f.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.aside}>
          <div className={styles.bookingCard}>
            <div className={styles.priceHead}>
              <div>
                <span className={styles.priceBig}>{priceLabel(tour.price)}</span>
                <span className={styles.priceUnit}> / dorosły</span>
              </div>
              <span className={styles.availPill}>{tour.availabilityLabel}</span>
            </div>

            <ul className={styles.priceList}>
              <li>
                <span>Dorosły</span>
                <strong>{formatMoney(tour.price.adult, tour.price.currency)}</strong>
              </li>
              <li>
                <span>Dziecko {tour.price.childAgeMin}-{tour.price.childAgeMax} lat</span>
                <strong>{formatMoney(tour.price.child, tour.price.currency)}</strong>
              </li>
              <li>
                <span>Dziecko poniżej {tour.price.childAgeMin} lat</span>
                <strong>bezpłatnie</strong>
              </li>
            </ul>

            <Button href="#rezerwacja" size="lg" fullWidth>
              Zarezerwuj wycieczkę
            </Button>
            <Button
              href={waQuick}
              external
              variant="whatsapp"
              fullWidth
              iconLeft={<IconWhatsApp />}
            >
              Szybkie pytanie
            </Button>

            <p className={styles.verified}>
              Cena zweryfikowana: {formatDatePl(tour.price.lastVerifiedAt)}
            </p>
            <p className={styles.noPay}>Brak płatności online. Szczegóły potwierdzamy na WhatsApp.</p>
          </div>
        </aside>
      </section>

      {/* --- content --- */}
      <div className={`container ${styles.contentWrap}`}>
        <div className={styles.content}>
          <section className={styles.block}>
            <h2 className={styles.h2}>O wycieczce</h2>
            <p className={styles.para}>{tour.overview}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Plan dnia</h2>
            <ItineraryTimeline steps={tour.itinerary} />
          </section>

          <section className={styles.block}>
            <div className={styles.twoCol}>
              <div className={styles.includeBox}>
                <h3 className={styles.h3}>Cena zawiera</h3>
                <ul className={styles.checkList}>
                  {tour.included.map((it) => (
                    <li key={it}>
                      <IconCheck className={styles.yes} /> {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.excludeBox}>
                <h3 className={styles.h3}>Cena nie zawiera</h3>
                <ul className={styles.checkList}>
                  {tour.excluded.map((it) => (
                    <li key={it}>
                      <IconX className={styles.no} /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Ceny</h2>
            <DataTable
              columns={["Kategoria", "Wiek", "Cena"]}
              rows={[
                ["Dorosły", "-", formatMoney(tour.price.adult, tour.price.currency)],
                [
                  "Dziecko",
                  `${tour.price.childAgeMin}-${tour.price.childAgeMax} lat`,
                  formatMoney(tour.price.child, tour.price.currency),
                ],
                ["Dziecko", `poniżej ${tour.price.childAgeMin} lat`, "bezpłatnie"],
              ]}
            />
            <p className={styles.note}>
              Cena w USD. Ostateczny koszt może zależeć od strefy hotelowej i opcjonalnych atrakcji.
              Cena zweryfikowana {formatDatePl(tour.price.lastVerifiedAt)}.
            </p>
          </section>

          {tour.transferSupplements.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.h2}>Dopłaty za transfer</h2>
              <DataTable
                columns={["Strefa / hotele", "Dopłata (od osoby)"]}
                rows={tour.transferSupplements.map((t) => [
                  t.zone,
                  formatMoney(t.amount, tour.price.currency),
                ])}
              />
            </section>
          )}

          <section className={styles.block}>
            <h2 className={styles.h2}>Odbiór z hotelu</h2>
            <p className={styles.para}>
              Odbiór i powrót odbywają się pod hotel. Planowany odbiór: {tour.pickupLabel}. Dokładną
              godzinę potwierdzamy na WhatsApp przed wyjazdem, ponieważ zależy ona od trasy danego
              dnia.
            </p>
          </section>

          <section className={styles.block}>
            <div className={styles.twoCol}>
              <div>
                <h3 className={styles.h3}>Co zabrać</h3>
                <ul className={styles.dotList}>
                  {tour.whatToBring.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.h3}>Warto wiedzieć</h3>
                <ul className={styles.dotList}>
                  {tour.requirements.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {tour.extras.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.h2}>Opcjonalne atrakcje</h2>
              <ul className={styles.extras}>
                {tour.extras.map((e) => (
                  <li key={e.label}>
                    <strong>{e.label}</strong> - {e.note}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className={styles.block}>
            <h2 className={styles.h2}>Rezerwacja i potwierdzenie</h2>
            <p className={styles.para}>{tour.cancellationPolicy}</p>
          </section>

          {/* --- booking form anchor target --- */}
          <section className={styles.block} id="rezerwacja">
            <h2 className={styles.h2}>Zarezerwuj tę wycieczkę</h2>
            <p className={styles.para}>
              Uzupełnij dane - przygotujemy gotową wiadomość na WhatsApp, a my potwierdzimy
              dostępność, godzinę odbioru i cenę.
            </p>
            <div className={styles.formShell}>
              <BookingForm tours={[bookingOption]} fixedTourSlug={tour.slug} />
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Najczęstsze pytania</h2>
            <Faq items={tour.faqs} />
          </section>

          {/* related */}
          <section className={`${styles.block} ${styles.related}`}>
            <Link href={`${destination.routeBase}/`} className={styles.relatedCard}>
              <span className={styles.relatedKicker}>Kierunek</span>
              <span className={styles.relatedTitle}>Wycieczki z {destination.nameGenitive}</span>
              <span className={styles.relatedMore}>
                Zobacz kierunek <IconArrowRight />
              </span>
            </Link>
            {relatedPost && (
              <Link href={`${relatedPost.route}/`} className={styles.relatedCard}>
                <span className={styles.relatedKicker}>Poradnik</span>
                <span className={styles.relatedTitle}>{relatedPost.title}</span>
                <span className={styles.relatedMore}>
                  Czytaj poradnik <IconArrowRight />
                </span>
              </Link>
            )}
          </section>
        </div>
      </div>

      <StickyBookingBar priceLabel={priceLabel(tour.price)} targetId="rezerwacja" />
    </article>
  );
}
