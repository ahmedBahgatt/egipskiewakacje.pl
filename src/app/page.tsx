import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata, faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { EgyptMap } from "@/components/home/EgyptMap";
import { DestinationCards } from "@/components/home/DestinationCards";
import { CairoStory } from "@/components/home/CairoStory";
import {
  AboutPreview,
  BookingSteps,
  FinalCta,
  GuidePreview,
  TrustStrip,
  WhyUs,
} from "@/components/home/parts";
import { ToursGrid } from "@/components/tour/ToursGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Egipskie Wakacje - wycieczki fakultatywne w Egipcie dla polskich turystów",
  description:
    "Wycieczki fakultatywne w Egipcie dla polskich turystów. Kair i piramidy z Hurghady, Marsa Alam i Sharm el Sheikh. Przejrzyste ceny, odbiór z hotelu, rezerwacja przez WhatsApp.",
  canonicalPath: "/",
});

export default async function HomePage() {
  const [featured, faqs, post, destinations, allTours] = await Promise.all([
    content.getFeaturedTours(),
    content.getSiteFaqs(),
    content.getPost("co-zabrac-na-wycieczke-do-kairu"),
    content.getDestinations(),
    content.getTours(),
  ]);

  const homeFaqs = faqs.slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(homeFaqs),
          itemListJsonLd(featured.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
        ]}
      />

      <Hero destinations={destinations} />
      <TrustStrip />
      <EgyptMap destinations={destinations} tours={allTours} />
      <DestinationCards destinations={destinations} />

      <section className="section" style={{ background: "var(--bg-paper)" }}>
        <div className="container">
          <SectionHeading
            eyebrow="Wycieczki do Kairu"
            title="Nasze wyprawy do Kairu i piramid"
            intro="Trzy trasy z trzech kurortów - wszystkie prowadzą do Gizy i Kairu. Ceny w USD, bez ukrytych kosztów."
          />
          <ToursGrid tours={featured} priorityFirst />
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <Button href="/wycieczki/" variant="outline" size="lg" iconRight={<IconArrowRight />}>
              Wszystkie wycieczki
            </Button>
          </div>
        </div>
      </section>

      <CairoStory />
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
