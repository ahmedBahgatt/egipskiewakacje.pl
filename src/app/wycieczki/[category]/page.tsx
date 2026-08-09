import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToursFilter } from "@/components/tour/ToursFilter";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./category.module.css";

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
  const tours = await content.getToursByCategory(c.slug);
  const allCats = await content.getCategories();

  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Wycieczki", path: "/wycieczki/" },
    { name: c.shortLabel, path: `${c.routeBase}/` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(tours.map((t) => ({ name: t.title, path: t.seo.canonicalPath }))),
          faqJsonLd(c.faqs),
        ]}
      />
      <PageHeader eyebrow="Rodzaj wycieczki" title={c.name} intro={c.intro} crumbs={crumbs} />

      <nav className={styles.catNav} aria-label="Rodzaje wycieczek">
        {allCats.map((other) => (
          <Link
            key={other.slug}
            href={`${other.routeBase}/`}
            className={`${styles.chip} ${other.slug === c.slug ? styles.chipActive : ""}`}
            aria-current={other.slug === c.slug ? "page" : undefined}
          >
            {other.shortLabel}
          </Link>
        ))}
      </nav>

      <section className="section">
        <div className="container">
          <h2 className="visually-hidden">Wycieczki - {c.name}</h2>
          <ToursFilter tours={tours} hideCategory />
        </div>
      </section>

      {c.faqs.length > 0 && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container container-narrow">
            <h2 className={styles.faqTitle}>Najczęstsze pytania</h2>
            <Faq items={c.faqs} />
          </div>
        </section>
      )}
    </>
  );
}
