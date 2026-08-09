"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ExperienceVisual } from "@/components/experience/ExperienceVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";
import { categoryLabel } from "@/lib/categories";
import { EXPERIENCE } from "@/lib/experiences";
import { formatTourCount } from "@/lib/polish";
import { track } from "@/lib/analytics";
import type { CategorySlug, DestinationSlug, MediaImage } from "@/content/types";
import styles from "./ResortExplorer.module.css";

/** Compact, server-computed summary of a resort's offer (small client payload). */
export interface ResortSummary {
  slug: DestinationSlug;
  name: string;
  nameGenitive: string;
  routeBase: string;
  heroImage: MediaImage;
  total: number;
  /** Present experience families for the resort, in editorial order. */
  cats: { slug: CategorySlug; count: number }[];
}

/**
 * Short, factual one-line hint per experience family. Presentation copy (not
 * inventory) - it tells a first-time visitor what each family means at a glance.
 */
const HINT: Record<CategorySlug, string> = {
  kair: "Piramidy, Sfinks i muzea faraonów",
  luksor: "Dolina Królów i świątynie Teb",
  "rejsy-wyspy": "Wyspy, laguny i lunch na łodzi",
  "snorkeling-delfiny": "Rafy, delfiny i żółwie",
  nurkowanie: "Rafy Morza Czerwonego pod okiem instruktora",
  safari: "Quady, buggy i pustynny zachód słońca",
  atrakcje: "Akwaria, aquaparki i pokazy delfinów",
  prywatne: "Tylko Wasza grupa, własny plan dnia",
  synaj: "Góra Mojżesza i klasztor św. Katarzyny",
  miedzynarodowe: "Wyprawy sięgające poza granice Egiptu",
};

/**
 * "Odkryj Egipt z Twojego kurortu" - the homepage's primary discovery section
 * (replaces the old Cairo/Luksor pointer map). Pick the resort you are staying in
 * and see the WHOLE excursion universe reachable from there - sea, reefs, desert,
 * Cairo, Luksor and more - each linking straight into that resort's offer.
 */
export function ResortExplorer({ resorts }: { resorts: ResortSummary[] }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<DestinationSlug>(resorts[0]?.slug ?? "hurghada");

  const active = useMemo(
    () => resorts.find((r) => r.slug === selected) ?? resorts[0],
    [resorts, selected],
  );

  // Subtle pointer parallax on the media (desktop, fine pointer only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  function select(slug: DestinationSlug, source: string) {
    if (slug === selected) return;
    setSelected(slug);
    track("destination_select", { destination: slug, source });
  }

  function onMediaMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -16);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  }
  function resetMedia() {
    mx.set(0);
    my.set(0);
  }

  if (!active) return null;

  return (
    <section className={styles.section} aria-labelledby="explorer-title">
      <div className="container">
        <SectionHeading
          eyebrow="Trzy kurorty, cały Egipt"
          title={<span id="explorer-title">Odkryj Egipt z Twojego kurortu</span>}
          intro="Wybierz kurort, w którym się zatrzymujesz - pokażemy wszystkie rodzaje wypraw, które możesz stąd zarezerwować: od raf i wysp, przez pustynię, po Kair i Luksor."
        />

        <div className={styles.switch} role="group" aria-label="Wybierz kurort">
          {resorts.map((r) => {
            const on = r.slug === selected;
            return (
              <button
                key={r.slug}
                type="button"
                aria-pressed={on}
                className={`${styles.switchBtn} ${on ? styles.switchOn : ""}`}
                onClick={() => select(r.slug, "explorer-switch")}
              >
                <span className={styles.switchName}>{r.name}</span>
                <span className={styles.switchCount}>{formatTourCount(r.total)}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.panel}>
          <m.div
            key={`media-${active.slug}`}
            className={styles.media}
            onPointerMove={onMediaMove}
            onPointerLeave={resetMedia}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <m.div className={styles.mediaInner} style={{ x: smx, y: smy }}>
              <OptimizedImage image={active.heroImage} className={styles.mediaImg} />
            </m.div>
            <div className={styles.mediaScrim} />
            <div className={styles.mediaCaption}>
              <span className={styles.mediaKicker}>Wycieczki z</span>
              <span className={styles.mediaName}>{active.nameGenitive}</span>
              <span className={styles.mediaSub}>{formatTourCount(active.total)} do wyboru</span>
            </div>
            <Link
              href={`${active.routeBase}/`}
              className={styles.mediaCta}
              onClick={() => track("destination_select", { destination: active.slug, source: "explorer-cta" })}
            >
              Wszystkie wycieczki z {active.nameGenitive}
              <IconArrowRight />
            </Link>
          </m.div>

          <m.ul
            key={`exps-${active.slug}`}
            className={styles.exps}
            aria-label={`Rodzaje wypraw z ${active.nameGenitive}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {active.cats.map((c) => {
              const meta = EXPERIENCE[c.slug];
              return (
                <li key={c.slug}>
                  <Link
                    href={`${active.routeBase}/#sekcja-${c.slug}`}
                    className={styles.exp}
                    style={{ "--accent": meta.accent } as React.CSSProperties}
                  >
                    <span className={styles.expVisual} aria-hidden="true">
                      <ExperienceVisual motif={meta.motif} accent="var(--accent)" />
                    </span>
                    <span className={styles.expText}>
                      <span className={styles.expName}>{categoryLabel[c.slug]}</span>
                      <span className={styles.expHint}>{HINT[c.slug]}</span>
                    </span>
                    <span className={styles.expCount}>{c.count}</span>
                    <IconArrowRight className={styles.expArrow} />
                  </Link>
                </li>
              );
            })}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
