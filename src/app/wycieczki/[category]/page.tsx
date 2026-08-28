import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { ChipNav } from "@/components/ui/ChipNav";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionJumpNav, type JumpItem } from "@/components/experience/SectionJumpNav";
import { ExperienceVisual } from "@/components/experience/ExperienceVisual";
import { CategoryDestinationSection } from "@/components/category/CategoryDestinationSection";
import { CategoryComparison } from "@/components/category/CategoryComparison";
import {
  EXPERIENCE,
  CATEGORY_DESTINATION_ORDER,
  CATEGORY_HIGHLIGHT_SLUGS,
} from "@/lib/experiences";
import { categoryImage } from "@/lib/categories";
import { groupByDestination } from "@/lib/grouping";
import { hubFacts, fromPriceLabel, departureResorts, resortListLabel } from "@/lib/facts";
import { formatTourCount } from "@/lib/polish";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import { IconArrowRight, IconWhatsApp } from "@/components/ui/icons";
import type { Destination, Tour } from "@/content/types";
import styles from "./category.module.css";

type DestGroup = { destination: Destination; tours: Tour[] };

export const dynamicParams = false;

function routeSlug(routeBase: string): string {
  return routeBase.split("/").filter(Boolean).pop() as string;
}

export async function generateStaticParams() {
  const cats = await content.getCategories();
  return cats.map((c) => ({ category: routeSlug(c.routeBase) }));
}

async function resolve(param: string) {
  const cats = await content.getCategories();
  return cats.find((c) => routeSlug(c.routeBase) === param);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = await resolve(category);
  return c ? buildMetadata(c.seo) : {};
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = await resolve(category);
  if (!c) notFound();

  const [tours, allCats, destinations] = await Promise.all([
    content.getToursByCategory(c.slug),
    content.getCategories(),
    content.getDestinations(),
  ]);

  const destBySlug = new Map(destinations.map((d) => [d.slug, d]));
  const grouped = groupByDestination(tours);
  // Group the category BY DEPARTURE resort, in a stable order, present only.
  const presentDests: DestGroup[] = CATEGORY_DESTINATION_ORDER.flatMap((slug) => {
    const destination = destBySlug.get(slug);
    const list = grouped.get(slug) ?? [];
    return destination && list.length > 0 ? [{ destination, tours: list }] : [];
  });

  const meta = EXPERIENCE[c.slug];
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Wycieczki", path: "/wycieczki/" },
    { name: c.shortLabel, path: `${c.routeBase}/` },
  ];
  const jumpItems: JumpItem[] = presentDests.map(({ destination, tours }) => ({
    id: `z-${destination.slug}`,
    label: `Z ${destination.nameGenitive}`,
    count: tours.length,
  }));

  const price = fromPriceLabel(tours);
  const resorts = departureResorts(tours);
  const highlightLinks: RelatedLink[] = (CATEGORY_HIGHLIGHT_SLUGS[c.slug] ?? [])
    .map((s) => tours.find((t) => t.slug === s))
    .filter((t): t is Tour => Boolean(t))
    .map((t) => ({ title: t.title, href: `${t.route}/`, blurb: t.shortDescription }));
  const resortLinks: RelatedLink[] = presentDests.map(({ destination, tours: dt }) => ({
    title: `Wycieczki z ${destination.nameGenitive}`,
    href: `${destination.routeBase}/`,
    blurb: `Cała oferta z ${destination.nameGenitive}, w tym ${formatTourCount(dt.length)} z tej kategorii.`,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          collectionPageJsonLd({
            name: c.name,
            description: c.seo.description,
            path: c.seo.canonicalPath,
            items: tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath })),
          }),
          faqJsonLd(c.faqs),
        ]}
      />
      <PageHero
        eyebrow="Rodzaj wycieczki"
        title={c.name}
        intro={c.intro}
        crumbs={crumbs}
        image={categoryImage[c.slug]}
        imagePriority
        actions={
          <>
            <Button href="#wycieczki" variant="gold" iconRight={<IconArrowRight />}>
              Zobacz wycieczki
            </Button>
            <Button
              href={contactWhatsappUrl(`Cześć! Interesują mnie wycieczki: ${c.shortLabel}.`)}
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
              W kategorii <strong>{c.shortLabel}</strong> mamy {formatTourCount(tours.length)} z{" "}
              {resortListLabel(resorts)}
              {price ? `, ceny ${price}` : ""}. {c.description}
            </p>
            <p>
              Rezerwację potwierdzasz po polsku przez WhatsApp, a{" "}
              <strong>za wycieczkę płacisz dopiero przy jej rozpoczęciu</strong> - bez przedpłaty i
              płatności online. Odbiór spod hotelu jest w cenie większości wypraw.
            </p>
          </>
        }
      />

      <ChipNav
        ariaLabel="Rodzaje wycieczek"
        items={allCats.map((other) => ({
          label: other.shortLabel,
          href: `${other.routeBase}/`,
          active: other.slug === c.slug,
        }))}
      />

      <section className="section" id="wycieczki">
        <div className="container">
          <div className={styles.motifBand} style={{ color: meta.accent }}>
            <ExperienceVisual motif={meta.motif} accent={meta.accent} />
          </div>

          {presentDests.length > 1 && (
            <>
              <h2 className={styles.compareHeading}>Ta sama kategoria z różnych kurortów</h2>
              <div className={styles.compareWrap}>
                <CategoryComparison rows={presentDests} categoryLabel={c.shortLabel} />
              </div>
              <p className={styles.compareNote}>
                Ceny, liczba wariantów i czas dojazdu różnią się w zależności od kurortu wyjazdu.
                Wybierz swój kurort, aby zobaczyć wszystkie warianty.
              </p>
              <div className={styles.jumpWrap}>
                <SectionJumpNav items={jumpItems} label="Przejdź do kurortu" lead="Wyjazd" />
              </div>
            </>
          )}

          {presentDests.map(({ destination, tours }) => (
            <CategoryDestinationSection
              key={destination.slug}
              category={c}
              destination={destination}
              tours={tours}
            />
          ))}
        </div>
      </section>

      {highlightLinks.length > 0 && (
        <RelatedLinks
          eyebrow="Konkretne miejsca"
          title={`Popularne wycieczki i miejsca - ${c.shortLabel}`}
          items={highlightLinks}
          columns={3}
          tone="paper"
        />
      )}

      {resortLinks.length > 0 && (
        <RelatedLinks
          eyebrow="Wybierz punkt wyjazdu"
          title="Zobacz też wycieczki z kurortów"
          items={resortLinks}
          columns={3}
        />
      )}

      {c.faqs.length > 0 && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container container-narrow">
            <h2 className={styles.faqTitle}>Najczęstsze pytania</h2>
            <Faq items={c.faqs} />
          </div>
        </section>
      )}

      <CtaBanner
        title={`Masz pytania o wycieczki ${c.shortLabel}?`}
        text="Napisz na WhatsApp - potwierdzimy dostępność, godzinę odbioru i cenę dla Twojego hotelu. Bez przedpłaty."
        message={`Cześć! Mam pytanie o wycieczki: ${c.shortLabel}.`}
      />
    </>
  );
}
