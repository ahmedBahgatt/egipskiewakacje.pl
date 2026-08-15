import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant =
  | "primary"
  | "secondary"
  | "whatsapp"
  | "whatsappOutline"
  | "gold"
  | "outline"
  | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
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
  } = props;

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
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} onClick={props.onClick} aria-label={props.ariaLabel}>
        {inner}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as AsButton;
  return (
    <button className={classes(variant, size, fullWidth, className)} type={type} {...rest}>
      {inner}
    </button>
  );
}
