import type { Metadata } from "next";
import { content } from "@/content";
import {
  buildMetadata,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { PageIntro } from "@/components/ui/PageIntro";
import { RelatedLinks, type RelatedLink } from "@/components/ui/RelatedLinks";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { ToursFilter } from "@/components/tour/ToursFilter";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconArrowRight, IconWhatsApp } from "@/components/ui/icons";
import { groupByCategory, groupByDestination } from "@/lib/grouping";
import { hubFacts } from "@/lib/facts";
import { formatTourCount } from "@/lib/polish";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import type { MediaImage } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "Wycieczki fakultatywne w Egipcie po polsku | Egipskie Wakacje",
  description:
    "Wszystkie wycieczki fakultatywne w Egipcie po polsku - z Hurghady, Marsa Alam i Sharm el Sheikh: Kair i piramidy, Luksor, rejsy i wyspy, snorkeling, nurkowanie, safari i atrakcje. Bez przedpłaty, rezerwacja przez WhatsApp.",
  canonicalPath: "/wycieczki/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Wycieczki", path: "/wycieczki/" },
];

const HERO_IMAGE: MediaImage = {
  src: "/media/hero/hero-poster",
  alt: "Wycieczki fakultatywne w Egipcie - Morze Czerwone, pustynia i piramidy w Gizie",
  width: 1440,
  height: 810,
  objectPosition: "center 45%",
};

const DEST_BLURB: Record<string, string> = {
  hurghada: "Największa baza nad Morzem Czerwonym - wyprawy w każdą stronę.",
  "marsa-alam": "Raj miłośników morza: dzikie delfiny, żółwie i dziewicze rafy.",
  "sharm-el-sheikh": "Synaj: najlepsze rafy, Góra Mojżesza i krótsza trasa do Kairu.",
};

export default async function Page() {
  const [tours, destinations, categories, siteFaqs] = await Promise.all([
    content.getTours(),
    content.getDestinations(),
    content.getCategories(),
    content.getSiteFaqs(),
  ]);

  const byDest = groupByDestination(tours);
  const byCat = groupByCategory(tours);
  const faqs = siteFaqs.slice(0, 8);

  const destinationLinks: RelatedLink[] = destinations.map((d) => ({
    title: `Wycieczki z ${d.nameGenitive}`,
    href: `${d.routeBase}/`,
    blurb: `${formatTourCount(byDest.get(d.slug)?.length ?? 0)} - ${DEST_BLURB[d.slug] ?? ""}`,
  }));

  const categoryLinks: RelatedLink[] = categories.map((c) => ({
    title: c.name,
    href: `${c.routeBase}/`,
    blurb: `${formatTourCount(byCat.get(c.slug)?.length ?? 0)} - ${c.description}`,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          collectionPageJsonLd({
            name: "Wycieczki fakultatywne w Egipcie",
            description:
              "Pełna oferta wycieczek fakultatywnych z Hurghady, Marsa Alam i Sharm el Sheikh.",
            path: "/wycieczki/",
            items: tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath })),
          }),
          faqJsonLd(faqs),
        ]}
      />

      <PageHero
        eyebrow="Cała oferta"
        title="Wycieczki fakultatywne w Egipcie"
        intro="Pełna oferta wypraw z Hurghady, Marsa Alam i Sharm el Sheikh - od Kairu i Luksoru, przez rejsy i snorkeling, po safari i nurkowanie. Rezerwacja po polsku przez WhatsApp, bez przedpłaty."
        crumbs={crumbs}
        image={HERO_IMAGE}
        imagePriority
        actions={
          <>
            <Button href="#wycieczki" variant="gold" iconRight={<IconArrowRight />}>
              Zobacz wycieczki
            </Button>
            <Button
              href={contactWhatsappUrl("Cześć! Chcę zapytać o wycieczki fakultatywne w Egipcie.")}
              external
              variant="whatsappOutline"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
          </>
        }
      />

      <PageIntro
        facts={hubFacts(tours)}
        lead={
          <>
            <p>
              <strong>Wycieczki fakultatywne w Egipcie</strong> to jednodniowe i krótsze wyprawy,
              na które wyruszasz z kurortu w czasie wakacji - bez wykupywania ich z góry w biurze
              podróży. Organizujemy je z trzech baz: <strong>Hurghady</strong>,{" "}
              <strong>Marsa Alam</strong> i <strong>Sharm el Sheikh</strong>, po polsku, z odbiorem
              spod hotelu.
            </p>
            <p>
              W ofercie znajdziesz {formatTourCount(tours.length)}: Kair i piramidy, Luksor i Dolinę
              Królów, rejsy na wyspy Morza Czerwonego, snorkeling i pływanie z delfinami, nurkowanie,
              pustynne safari quadami oraz lokalne atrakcje dla rodzin. Rezerwację potwierdzasz na
              WhatsApp, a <strong>za wycieczkę płacisz dopiero przy odbiorze</strong> - bez przedpłaty
              i płatności online.
            </p>
          </>
        }
      />

      <RelatedLinks
        eyebrow="Wybierz punkt wyjazdu"
        title="Wycieczki według kurortu"
        items={destinationLinks}
        columns={3}
        tone="paper"
      />

      <RelatedLinks
        eyebrow="Wybierz rodzaj wyprawy"
        title="Wycieczki według rodzaju"
        items={categoryLinks}
        columns={4}
      />

      <section className="section" id="wycieczki" style={{ background: "var(--bg-paper)" }}>
        <div className="container">
          <h2 className="visually-hidden">Lista wszystkich wycieczek</h2>
          <ToursFilter tours={tours} />
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section">
          <div className="container container-narrow">
            <h2 style={{ fontSize: "var(--step-3)", marginBottom: "1.4rem" }}>
              Najczęstsze pytania o wycieczki w Egipcie
            </h2>
            <Faq items={faqs} />
          </div>
        </section>
      )}

      <CtaBanner
        title="Nie wiesz, którą wycieczkę wybrać?"
        text="Napisz na WhatsApp - doradzimy, potwierdzimy dostępność i cenę dla Twojego hotelu. Bez przedpłaty."
        message="Cześć! Pomóżcie mi wybrać wycieczkę fakultatywną w Egipcie."
      />
    </>
  );
}
