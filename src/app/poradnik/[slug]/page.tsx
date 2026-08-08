import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import {
  buildMetadata,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { PostBody, tableOfContents, relatedTourSlugsInBody } from "@/components/content/PostBody";
import { ToursGrid } from "@/components/tour/ToursGrid";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconWhatsApp } from "@/components/ui/icons";
import { formatDatePl } from "@/lib/format";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import type { Tour } from "@/content/types";
import styles from "./article.module.css";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await content.getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await content.getPost(slug);
  return post ? buildMetadata({ ...post.seo, type: "article" }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await content.getPost(slug);
  if (!post) notFound();

  // Resolve tours referenced both in the related list AND inline in the body blocks.
  const referencedSlugs = Array.from(
    new Set([...post.relatedTourSlugs, ...relatedTourSlugsInBody(post.body)]),
  );
  const resolvedTours = (
    await Promise.all(referencedSlugs.map((s) => content.getTour(s)))
  ).filter((t): t is Tour => Boolean(t));
  const relatedTours = resolvedTours.filter((t) => post.relatedTourSlugs.includes(t.slug));

  const toc = tableOfContents(post.body);
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: "Poradnik", path: "/poradnik/" },
    { name: post.title, path: `${post.route}/` },
  ];

  return (
    <article className={styles.page}>
      <JsonLd
        data={[breadcrumbJsonLd(crumbs), blogPostingJsonLd(post), faqJsonLd(post.faqs)]}
      />

      <div className="container">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <header className={`container ${styles.head}`}>
        <span className={styles.cat}>{post.category}</span>
        <h1 className={styles.title}>{post.h1}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <span>{post.author}</span>
          <span aria-hidden="true">-</span>
          <time dateTime={post.publishedAt}>Publikacja: {formatDatePl(post.publishedAt)}</time>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden="true">-</span>
              <time dateTime={post.updatedAt}>Aktualizacja: {formatDatePl(post.updatedAt)}</time>
            </>
          )}
        </div>
      </header>

      <div className={`container ${styles.featured}`}>
        <OptimizedImage image={post.featuredImage} priority rounded />
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <aside className={styles.answer} aria-label="Krótka odpowiedź">
            <strong className={styles.answerLabel}>W skrócie</strong>
            <p>{post.directAnswer}</p>
          </aside>

          {toc.length > 2 && (
            <nav className={styles.toc} aria-label="Spis treści">
              <span className={styles.tocTitle}>Spis treści</span>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <PostBody blocks={post.body} tours={resolvedTours} />

          {post.sources.length > 0 && (
            <section className={styles.sources}>
              <h2 className={styles.sourcesTitle}>Źródła i uwagi</h2>
              <ul>
                {post.sources.map((s) => (
                  <li key={s.label}>
                    <strong>{s.label}:</strong> {s.note}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {relatedTours.length > 0 && (
        <section className="section" style={{ background: "var(--bg-paper)" }}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Powiązane wycieczki</h2>
            <ToursGrid tours={relatedTours} />
          </div>
        </section>
      )}

      <section className={`${styles.cta} motif-dark on-dark`}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Masz pytania przed wyjazdem?</h2>
          <p className={styles.ctaText}>Napisz na WhatsApp - odpowiemy po polsku.</p>
          <div className={styles.ctaButtons}>
            <Button
              href={contactWhatsappUrl("Cześć! Mam pytanie przed wycieczką do Kairu.")}
              external
              variant="whatsapp"
              size="lg"
              iconLeft={<IconWhatsApp />}
            >
              Napisz na WhatsApp
            </Button>
            <Button href="/wycieczki/" variant="outline" size="lg" iconRight={<IconArrowRight />}>
              Zobacz wycieczki
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
