import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { IconArrowRight } from "@/components/ui/icons";
import { formatDatePl } from "@/lib/format";
import styles from "./poradnik.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Poradnik o Egipcie dla polskich turystów | Egipskie Wakacje",
  description:
    "Praktyczny poradnik o Egipcie: przygotowanie do wycieczek do Kairu, co zabrać, dokumenty i wskazówki przed wyjazdem. Rzetelnie i po polsku.",
  canonicalPath: "/poradnik/",
});

const crumbs = [
  { name: "Strona główna", path: "/" },
  { name: "Poradnik", path: "/poradnik/" },
];

export default async function Page() {
  const posts = await content.getPosts();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Poradnik"
        title="Poradnik o Egipcie dla polskich turystów"
        intro="Konkretna, praktyczna wiedza przed wyjazdem - bez lania wody i marketingu."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`${post.route}/`} className={styles.media} aria-hidden="true" tabIndex={-1}>
                  <OptimizedImage
                    image={post.featuredImage}
                    className={styles.img}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                  />
                </Link>
                <div className={styles.body}>
                  <span className={styles.cat}>{post.category}</span>
                  <h2 className={styles.title}>
                    <Link href={`${post.route}/`} className={styles.titleLink}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.foot}>
                    <time dateTime={post.updatedAt}>{formatDatePl(post.updatedAt)}</time>
                    <span className={styles.more}>
                      Czytaj <IconArrowRight />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.hubs} aria-labelledby="poradnik-hubs">
            <h2 id="poradnik-hubs" className={styles.hubsTitle}>Odkryj nasze wycieczki w Egipcie</h2>
            <div className={styles.hubsGrid}>
              <Link href="/wycieczki-z-hurghady/" className={styles.hub}>
                Wycieczki z Hurghady <IconArrowRight />
              </Link>
              <Link href="/wycieczki-z-marsa-alam/" className={styles.hub}>
                Wycieczki z Marsa Alam <IconArrowRight />
              </Link>
              <Link href="/wycieczki-z-sharm-el-sheikh/" className={styles.hub}>
                Wycieczki z Sharm el Sheikh <IconArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
