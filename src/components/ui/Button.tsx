import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant =
  | "primary"
  | "secondary"
  | "whatsapp"
  | "whatsappOutline"
  | "whatsappSubtle"
  | "gold"
  | "outline"
  | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * Non-PII analytics annotation. Emitted as data-* attributes and read by the
 * global delegated click listener (see AnalyticsRuntime). Presence of `waIntent`
 * marks a WhatsApp handoff; it NEVER carries user-entered text.
 */
export interface CtaAnalytics {
  ctaId: string;
  ctaType?: "whatsapp" | "booking" | "contact" | "tour" | "destination" | "phone" | "email";
  placement?: string;
  waIntent?: "enquiry" | "booking";
  tourSlug?: string;
  destination?: string;
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  analytics?: CtaAnalytics;
}

function dataAttrs(a?: CtaAnalytics): Record<string, string> {
  if (!a) return {};
  const out: Record<string, string> = { "data-cta-id": a.ctaId };
  if (a.ctaType) out["data-cta-type"] = a.ctaType;
  if (a.placement) out["data-placement"] = a.placement;
  if (a.waIntent) out["data-wa-intent"] = a.waIntent;
  if (a.tourSlug) out["data-tour-slug"] = a.tourSlug;
  if (a.destination) out["data-destination"] = a.destination;
  return out;
}

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classes(v: Variant, s: Size, full?: boolean, extra?: string) {
  return [styles.btn, styles[v], styles[s], full ? styles.full : "", extra ?? ""]
    .filter(Boolean)
    .join(" ");
}

/** Shared button/link. External links get rel="noopener noreferrer". */
export function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    iconLeft,
    iconRight,
    fullWidth,
    analytics,
  } = props;
  const data = dataAttrs(analytics);

  const inner = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const cls = classes(variant, size, fullWidth, className);
    if (props.external) {
      return (
        <a
          href={props.href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
          aria-label={props.ariaLabel}
          {...data}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        className={cls}
        onClick={props.onClick}
        aria-label={props.ariaLabel}
        {...data}
      >
        {inner}
      </Link>
    );
  }

  const { type = "button", analytics: _analytics, ...rest } = props as AsButton;
  return (
    <button className={classes(variant, size, fullWidth, className)} type={type} {...rest} {...data}>
      {inner}
    </button>
  );
}
