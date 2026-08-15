import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Marquee, type MarqueeItem } from "@/components/home/Marquee";
import { ResortTiles, type ResortTile } from "@/components/home/ResortTiles";
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
import { TourSlider } from "@/components/home/TourSlider";
import { CategoryBrowse } from "@/components/home/CategoryBrowse";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { IconArrowRight } from "@/components/ui/icons";
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

  // Per-destination counts for the hero selector and the resort tiles.
  const destCounts = { hurghada: 0, "marsa-alam": 0, "sharm-el-sheikh": 0 } as Record<
    DestinationSlug,
    number
  >;
  for (const t of allTours) destCounts[t.destination] += 1;

  const resortTiles: ResortTile[] = destinations.map((d) => ({
    slug: d.slug,
    name: d.name,
    nameGenitive: d.nameGenitive,
    routeBase: d.routeBase,
    heroImage: d.heroImage,
    total: destCounts[d.slug],
  }));

  // Ticker items - real categories + destinations, each linking to its existing page.
  const marqueeItems: MarqueeItem[] = [
    ...categories.map((c) => ({ label: c.shortLabel, href: `${c.routeBase}/` })),
    ...destinations.map((d) => ({ label: d.name, href: `${d.routeBase}/` })),
  ];

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

      <Marquee items={marqueeItems} />

      <ResortTiles resorts={resortTiles} />

      <section className="section" style={{ background: "var(--bg-paper)" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Polecane wycieczki"
            title="Najchętniej wybierane wyprawy"
            intro="Kilka wypraw z różnych kurortów i kategorii - od Kairu i piramid, przez rejsy i snorkeling, po safari. Przeciągnij lub użyj strzałek, aby przeglądać."
          />
          <TourSlider tours={featured} />
          <div style={{ marginTop: "1.6rem", display: "flex", justifyContent: "center" }}>
            <Button href="/wycieczki/" variant="outline" size="lg" iconRight={<IconArrowRight />}>
              Wszystkie wycieczki
            </Button>
          </div>
        </div>
      </section>

      <TrustStrip />

      <CategoryBrowse categories={categories} counts={catCounts} />

      <ThreeFacesStory />

      <HelpMeChoose />
      <BookingSteps />
      <WhyUs />
      {post && <GuidePreview post={post} />}
      <AboutPreview />

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
