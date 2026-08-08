"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  m,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconArrowRight, IconClock, IconCalendar, IconGlobe } from "@/components/ui/icons";
import { priceLabel } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Destination, DestinationSlug, Tour } from "@/content/types";
import styles from "./EgyptMap.module.css";

interface Point {
  slug: DestinationSlug;
  name: string;
  nameGenitive: string;
  x: number;
  y: number;
}

const CAIRO = { x: 150, y: 116, label: "Kair / Giza" };

// Presentation-only pin coordinates and their render order (z-order of labels).
const COORDS: Record<DestinationSlug, { x: number; y: number }> = {
  hurghada: { x: 214, y: 214 },
  "sharm-el-sheikh": { x: 268, y: 170 },
  "marsa-alam": { x: 236, y: 322 },
};
const RENDER_ORDER: DestinationSlug[] = ["hurghada", "sharm-el-sheikh", "marsa-alam"];

function routePath(p: Point): string {
  // gentle quadratic curve towards Cairo
  const mx = (p.x + CAIRO.x) / 2 + 18;
  const my = (p.y + CAIRO.y) / 2 - 22;
  return `M ${p.x} ${p.y} Q ${mx} ${my} ${CAIRO.x} ${CAIRO.y}`;
}

export function EgyptMap({
  destinations,
  tours,
}: {
  destinations: Destination[];
  tours: Tour[];
}) {
  const reduce = useReducedMotion();

  // Join CMS/content destinations with pin coordinates, in a stable order.
  const points: Point[] = RENDER_ORDER.map((slug) => {
    const d = destinations.find((x) => x.slug === slug);
    if (!d) return null;
    return { slug, name: d.name, nameGenitive: d.nameGenitive, ...COORDS[slug] };
  }).filter((p): p is Point => p !== null);

  const [selected, setSelected] = useState<DestinationSlug>(points[0]?.slug ?? "hurghada");

  const parX = useMotionValue(0);
  const parY = useMotionValue(0);
  const sX = useSpring(parX, { stiffness: 50, damping: 18 });
  const sY = useSpring(parY, { stiffness: 50, damping: 18 });

  const data = useMemo(() => {
    const dest = destinations.find((d) => d.slug === selected);
    const tour = tours.find((t) => t.destination === selected);
    return { dest, tour };
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

  const { dest, tour } = data;

  return (
    <section className={`${styles.section} on-dark`} aria-label="Interaktywna mapa kierunków">
      <div className="container">
        <SectionHeading
          eyebrow="Trzy kurorty"
          title="Trzy kurorty. Jeden niezwykły Egipt."
          intro="Wszystkie wyprawy prowadzą do Kairu i Gizy - wybierz punkt startowy i zobacz szczegóły."
        />

        <div className={styles.layout}>
          {/* --- map --- */}
          <div className={styles.mapWrap} onPointerMove={onPointerMove} onPointerLeave={resetParallax}>
            <svg
              className={styles.map}
              viewBox="0 0 400 460"
              role="img"
              aria-label="Mapa Egiptu z zaznaczonymi kurortami: Hurghada, Marsa Alam, Sharm el Sheikh oraz Kairem"
            >
              <defs>
                <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#16344a" />
                  <stop offset="1" stopColor="#0f2634" />
                </linearGradient>
              </defs>

              <m.g style={reduce ? undefined : { x: sX, y: sY }}>
                {/* mainland Egypt (stylised) */}
                <path
                  d="M60 70 L190 66 L196 150 L172 250 L150 360 L120 400 L96 360 L104 250 L86 160 Z"
                  fill="url(#land)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                {/* Sinai peninsula */}
                <path
                  d="M214 96 L292 120 L268 176 L236 150 L214 120 Z"
                  fill="url(#land)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                {/* Nile */}
                <path
                  d="M150 118 C 146 170, 152 240, 150 320 L150 360"
                  fill="none"
                  stroke="var(--teal-500)"
                  strokeOpacity="0.5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </m.g>

              {/* routes (faint for all, bright for selected) */}
              {points.map((p) => (
                <path
                  key={`r-${p.slug}`}
                  d={routePath(p)}
                  className={`${styles.route} ${p.slug === selected ? styles.routeActive : ""}`}
                  fill="none"
                />
              ))}

              {/* Cairo destination marker */}
              <g className={styles.cairo}>
                <circle cx={CAIRO.x} cy={CAIRO.y} r="7" />
                <text x={CAIRO.x - 12} y={CAIRO.y - 12} className={styles.cairoLabel}>
                  {CAIRO.label}
                </text>
              </g>

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
                    {/* transparent hit-target button overlay */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="20"
                      fill="transparent"
                      className={styles.hit}
                      role="button"
                      tabIndex={0}
                      aria-label={`Pokaż wycieczkę z ${p.nameGenitive}`}
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

            {tour && dest && (
              <div className={styles.card} aria-live="polite">
                <span className={styles.cardKicker}>Wycieczka z {dest.nameGenitive}</span>
                <h3 className={styles.cardTitle}>{tour.title}</h3>
                <p className={styles.cardDesc}>{tour.shortDescription}</p>

                <ul className={styles.facts}>
                  <li>
                    <IconClock /> {tour.durationLabel}
                  </li>
                  <li>
                    <IconCalendar /> {tour.availabilityLabel}
                  </li>
                  <li>
                    <IconGlobe /> Przewodnik:{" "}
                    {tour.guide.polishConfirmed ? "polski" : tour.guide.label.toLowerCase()}
                  </li>
                </ul>

                <div className={styles.cardFoot}>
                  <div className={styles.cardPrice}>
                    <span className={styles.priceValue}>{priceLabel(tour.price)}</span>
                    <span className={styles.priceUnit}>/ dorosły</span>
                  </div>
                  <Link
                    href={`${tour.route}/`}
                    className={styles.cardCta}
                    onClick={() => track("tour_details_click", { tour_slug: tour.slug, destination: selected })}
                  >
                    Zobacz wycieczkę <IconArrowRight />
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
