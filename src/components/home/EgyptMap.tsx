"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";
import { categoryLabel } from "@/lib/categories";
import { orderedPresentCategories } from "@/lib/grouping";
import { formatTourCount } from "@/lib/polish";
import { track } from "@/lib/analytics";
import type { CategorySlug, Destination, DestinationSlug, Tour } from "@/content/types";
import styles from "./EgyptMap.module.css";

interface Point {
  slug: DestinationSlug;
  name: string;
  nameGenitive: string;
  x: number;
  y: number;
}

// Target destinations reachable from the coast (the sea + desert are local to
// each resort and covered in the panel chips).
const CAIRO = { x: 150, y: 110, label: "Kair / Giza" };
const LUKSOR = { x: 150, y: 300, label: "Luksor" };

const COORDS: Record<DestinationSlug, { x: number; y: number }> = {
  hurghada: { x: 214, y: 214 },
  "sharm-el-sheikh": { x: 272, y: 150 },
  "marsa-alam": { x: 236, y: 330 },
};
const RENDER_ORDER: DestinationSlug[] = ["hurghada", "sharm-el-sheikh", "marsa-alam"];

function curve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bendX: number,
  bendY: number,
): string {
  const mx = (from.x + to.x) / 2 + bendX;
  const my = (from.y + to.y) / 2 + bendY;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export function EgyptMap({ destinations, tours }: { destinations: Destination[]; tours: Tour[] }) {
  const reduce = useReducedMotion();

  const points: Point[] = RENDER_ORDER.map((slug) => {
    const d = destinations.find((x) => x.slug === slug);
    return d ? { slug, name: d.name, nameGenitive: d.nameGenitive, ...COORDS[slug] } : null;
  }).filter((p): p is Point => p !== null);

  const [selected, setSelected] = useState<DestinationSlug>(points[0]?.slug ?? "hurghada");

  const parX = useMotionValue(0);
  const parY = useMotionValue(0);
  const sX = useSpring(parX, { stiffness: 50, damping: 18 });
  const sY = useSpring(parY, { stiffness: 50, damping: 18 });

  const data = useMemo(() => {
    const dest = destinations.find((d) => d.slug === selected);
    const destTours = tours.filter((t) => t.destination === selected);
    const cats = orderedPresentCategories(selected, destTours).slice(0, 6);
    const countByCat = new Map<CategorySlug, number>();
    for (const t of destTours) countByCat.set(t.category, (countByCat.get(t.category) ?? 0) + 1);
    return { dest, total: destTours.length, cats, countByCat };
  }, [selected, destinations, tours]);

  function select(slug: DestinationSlug, source: string) {
    if (slug === selected) return;
    setSelected(slug);
    track("destination_select", { destination: slug, source });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    parX.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    parY.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  }
  function resetParallax() {
    parX.set(0);
    parY.set(0);
  }

  const { dest, total, cats, countByCat } = data;

  return (
    <section className={`${styles.section} on-dark`} aria-label="Interaktywna mapa kierunków">
      <div className="container">
        <SectionHeading
          eyebrow="Trzy kurorty, cały Egipt"
          title="Dokąd pojedziesz z Twojego kurortu?"
          intro="Wybierz kurort, w którym się zatrzymujesz - pokażemy, co możesz stąd zobaczyć: od Kairu i Luksoru po rafy, wyspy i pustynię."
        />

        <div className={styles.layout}>
          {/* --- map --- */}
          <div className={styles.mapWrap} onPointerMove={onPointerMove} onPointerLeave={resetParallax}>
            <svg
              className={styles.map}
              viewBox="0 0 400 460"
              role="img"
              aria-label="Mapa Egiptu z kurortami Hurghada, Marsa Alam i Sharm el Sheikh oraz kierunkami Kair i Luksor"
            >
              <defs>
                <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#16344a" />
                  <stop offset="1" stopColor="#0f2634" />
                </linearGradient>
              </defs>

              <m.g style={reduce ? undefined : { x: sX, y: sY }}>
                <path
                  d="M60 70 L190 66 L196 150 L172 250 L150 360 L120 400 L96 360 L104 250 L86 160 Z"
                  fill="url(#land)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <path
                  d="M214 96 L292 120 L268 176 L236 150 L214 120 Z"
                  fill="url(#land)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <path
                  d="M150 112 C 146 170, 152 240, 150 320 L150 360"
                  fill="none"
                  stroke="var(--teal-500)"
                  strokeOpacity="0.5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </m.g>

              {/* routes: every resort reaches Kair and Luksor; the selected one is bright */}
              {points.map((p) => {
                const active = p.slug === selected;
                return (
                  <g key={`r-${p.slug}`}>
                    <path
                      d={curve(p, CAIRO, 18, -24)}
                      className={`${styles.route} ${active ? styles.routeActive : ""}`}
                      fill="none"
                    />
                    <path
                      d={curve(p, LUKSOR, -14, 10)}
                      className={`${styles.route} ${active ? styles.routeActive : ""}`}
                      fill="none"
                    />
                  </g>
                );
              })}

              {/* target markers */}
              {[CAIRO, LUKSOR].map((t) => (
                <g key={t.label} className={styles.cairo}>
                  <circle cx={t.x} cy={t.y} r="6.5" />
                  <text x={t.x - 11} y={t.y - 10} className={styles.cairoLabel}>
                    {t.label}
                  </text>
                </g>
              ))}

              {/* departure points */}
              {points.map((p) => {
                const active = p.slug === selected;
                return (
                  <g key={p.slug}>
                    {active && !reduce && <circle cx={p.x} cy={p.y} r="14" className={styles.pulse} />}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={active ? 8 : 6}
                      className={`${styles.point} ${active ? styles.pointActive : ""}`}
                    />
                    <text
                      x={p.x + 13}
                      y={p.y + 4}
                      className={`${styles.pointLabel} ${active ? styles.pointLabelActive : ""}`}
                    >
                      {p.name}
                    </text>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="20"
                      fill="transparent"
                      className={styles.hit}
                      role="button"
                      tabIndex={0}
                      aria-label={`Pokaż, co można zwiedzić z ${p.nameGenitive}`}
                      aria-pressed={active}
                      onMouseEnter={() => select(p.slug, "map-hover")}
                      onFocus={() => select(p.slug, "map-focus")}
                      onClick={() => select(p.slug, "map-click")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          select(p.slug, "map-key");
                        }
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* --- details panel (info never hover-only) --- */}
          <div className={styles.panel}>
            <div className={styles.tabs} role="tablist" aria-label="Wybierz kurort">
              {points.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={p.slug === selected}
                  className={`${styles.tab} ${p.slug === selected ? styles.tabActive : ""}`}
                  onClick={() => select(p.slug, "tabs")}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {dest && (
              <div className={styles.card} aria-live="polite">
                <span className={styles.cardKicker}>Z {dest.nameGenitive}</span>
                <h3 className={styles.cardTitle}>{formatTourCount(total)} w jednym miejscu</h3>
                <p className={styles.cardLead}>
                  Wybierz rodzaj wyprawy, żeby przejść prosto do wycieczek, albo zobacz całą ofertę.
                </p>

                <ul className={styles.expList}>
                  {cats.map((c) => (
                    <li key={c}>
                      <Link href={`${dest.routeBase}/#sekcja-${c}`} className={styles.expChip}>
                        {categoryLabel[c]}
                        <span className={styles.expCount}>{countByCat.get(c)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFoot}>
                  <Link
                    href={`${dest.routeBase}/`}
                    className={styles.cardCta}
                    onClick={() => track("destination_select", { destination: selected, source: "map-cta" })}
                  >
                    Wszystkie wycieczki z {dest.nameGenitive} <IconArrowRight />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
