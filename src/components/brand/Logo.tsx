import styles from "./Logo.module.css";

interface LogoProps {
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
  /** Monochrome (uses currentColor) - for footer/dark or single-colour contexts. */
  mono?: boolean;
  /** Accessible title when the logo stands alone (no wordmark). */
  title?: string;
  className?: string;
  size?: number;
}

/**
 * Egipskie Wakacje brand mark: an abstract sunrise behind a faceted pyramid over
 * a Red Sea wave. Original artwork. Reads at favicon size, in the header, in
 * monochrome, and on light or dark backgrounds.
 */
export function Logo({
  withWordmark = true,
  mono = false,
  title,
  className,
  size = 40,
}: LogoProps) {
  const sun = mono ? "currentColor" : "var(--terracotta-500)";
  const faceA = mono ? "currentColor" : "var(--gold-500)";
  const faceB = mono ? "currentColor" : "var(--gold-600)";
  const wave = mono ? "currentColor" : "var(--teal-500)";

  return (
    <span className={`${styles.logo}${className ? ` ${className}` : ""}`}>
      <svg
        className={styles.mark}
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        role={withWordmark ? "presentation" : "img"}
        aria-hidden={withWordmark ? true : undefined}
        aria-label={withWordmark ? undefined : (title ?? "Egipskie Wakacje")}
      >
        {!withWordmark && title ? <title>{title}</title> : null}
        {/* sun rising behind the pyramid */}
        <circle cx="24" cy="15" r="8" fill={sun} fillOpacity={mono ? 0.85 : 1} />
        {/* pyramid - two facets for depth */}
        <path d="M24 11 L9 38 L24 38 Z" fill={faceA} />
        <path d="M24 11 L39 38 L24 38 Z" fill={faceB} fillOpacity={mono ? 0.6 : 1} />
        {/* sea wave */}
        <path
          d="M6 43 q4.5 -3.5 9 0 t9 0 t9 0"
          stroke={wave}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          strokeOpacity={mono ? 0.8 : 1}
        />
      </svg>
      {withWordmark && (
        <span className={styles.wordmark} aria-hidden="false">
          Egipskie Wakacje
        </span>
      )}
    </span>
  );
}
