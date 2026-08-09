import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { ResortExplorer, type ResortSummary } from "@/components/home/ResortExplorer";
import { ThreeFacesStory } from "@/components/home/ThreeFacesStory";
import { HelpMeChoose } from "@/components/home/HelpMeChoose";
import {
  AboutPreview,
  BookingSteps,
  FinalCta,
  GuidePreview,
  TrustStrip,
  WhyUs,
} from "@/components/home/parts";
import { ToursGrid } from "@/components/tour/ToursGrid";
import { CategoryBrowse } from "@/components/home/CategoryBrowse";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { IconArrowRight } from "@/components/ui/icons";
import { groupByCategory, groupByDestination, orderedPresentCategories } from "@/lib/grouping";
import type { DestinationSlug } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "Egipskie Wakacje - wycieczki fakultatywne w Egipcie dla polskich turystów",
  description:
    "Wycieczki fakultatywne w Egipcie z Hurghady, Marsa Alam i Sharm el Sheikh: Kair i piramidy, Luksor, rejsy na wyspy, snorkeling z delfinami, nurkowanie i pustynne safari. Przejrzyste ceny, odbiór z hotelu, rezerwacja przez WhatsApp.",
  canonicalPath: "/",
});

export default async function HomePage() {
  const [featured, faqs, post, destinations, allTours, categories] = await Promise.all([
    content.getFeaturedTours(),
    content.getSiteFaqs(),
    content.getPost("co-zabrac-na-wycieczke-do-kairu"),
    content.getDestinations(),
    content.getTours(),
    content.getCategories(),
  ]);

  // Category counts for the "browse by experience" grid.
  const catCounts = new Map<string, number>();
  for (const t of allTours) catCounts.set(t.category, (catCounts.get(t.category) ?? 0) + 1);

  // Per-destination counts for the hero selector.
  const destCounts = { hurghada: 0, "marsa-alam": 0, "sharm-el-sheikh": 0 } as Record<
    DestinationSlug,
    number
  >;
  for (const t of allTours) destCounts[t.destination] += 1;

  // Compact, server-computed resort summaries for the explorer (keeps the client
  // payload tiny - the full 78-tour list never crosses into the browser here).
  const byDest = groupByDestination(allTours);
  const resortSummaries: ResortSummary[] = destinations.map((d) => {
    const dTours = byDest.get(d.slug) ?? [];
    const byCat = groupByCategory(dTours);
    return {
      slug: d.slug,
      name: d.name,
      nameGenitive: d.nameGenitive,
      routeBase: d.routeBase,
      heroImage: d.heroImage,
      total: dTours.length,
      cats: orderedPresentCategories(d.slug, dTours).map((c) => ({
        slug: c,
        count: byCat.get(c)?.length ?? 0,
      })),
    };
  });

  const homeFaqs = faqs.slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(homeFaqs),
          itemListJsonLd(featured.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
        ]}
      />

      <Hero destinations={destinations} counts={destCounts} total={allTours.length} />
      <TrustStrip />

      <ResortExplorer resorts={resortSummaries} />
      <ThreeFacesStory />
      <CategoryBrowse categories={categories} counts={catCounts} />

      <section className="section" style={{ background: "var(--bg-paper)" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Polecane wycieczki"
            title="Wybrane wycieczki z naszej oferty"
            intro="Kilka wypraw z różnych kurortów i kategorii - od Kairu i piramid, przez rejsy i snorkeling, po safari. Pełną ofertę znajdziesz na liście wszystkich wycieczek."
          />
          <ToursGrid tours={featured} priorityFirst />
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <Button href="/wycieczki/" variant="outline" size="lg" iconRight={<IconArrowRight />}>
              Wszystkie wycieczki
            </Button>
          </div>
        </div>
      </section>

      <HelpMeChoose />
      <BookingSteps />
      <WhyUs />
      <AboutPreview />
      {post && <GuidePreview post={post} />}

      <section className="section" style={{ background: "var(--bg-paper)" }}>
        <div className="container container-narrow">
          <SectionHeading
            eyebrow="Najczęstsze pytania"
            title="Masz pytanie? Sprawdź odpowiedzi"
            align="center"
          />
          <Faq items={homeFaqs} />
          <div style={{ marginTop: "1.6rem", display: "flex", justifyContent: "center" }}>
            <Button href="/faq/" variant="ghost" iconRight={<IconArrowRight />}>
              Wszystkie pytania
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
