import type { SVGProps } from "react";

/** Inline icon set. All decorative by default (aria-hidden); pass role/aria for meaning. */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
);
export const IconChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Base>
);
export const IconChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6l6 6-6 6" />
  </Base>
);
export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Base>
);
export const IconX = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);
export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);
export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </Base>
);
export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 16.9v2.1a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.3 2 2 0 0 1 3.1 1h2.1a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.7a2 2 0 0 1-.5 2.1L6.6 10.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Base>
);
export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);
export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);
export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.8 20a6.2 6.2 0 0112.4 0M16 5.2a3 3 0 010 5.8M21.2 20a6 6 0 00-4-5.6" />
  </Base>
);
export const IconBus = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="12" rx="2" />
    <path d="M4 11h16M8 16v2M16 16v2" />
    <circle cx="8" cy="16" r="1" />
    <circle cx="16" cy="16" r="1" />
  </Base>
);
export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
  </Base>
);
export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4" />
  </Base>
);
export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);
export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </Base>
);
export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />
  </Base>
);
export const IconPause = (p: IconProps) => (
  <Base {...p}>
    <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
  </Base>
);

/* --- travel motifs (decorative, gold on dark / navy on light) ------------- */
export const IconPalm = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21c0-3.3.3-6.2 1.5-8.5" />
    <path d="M13.5 12.5c-3-1-5.6.1-7.2 2.6M13.5 12.5c3-1 5.6.1 7.2 2.6M13.5 12.5c-1.7-1.9-1.5-4.6.4-6.9M13.5 12.5c1.9-1 4.2-.8 6.3.7" />
    <circle cx="13.5" cy="12.5" r="0.9" />
    <path d="M9.5 21h5" />
  </Base>
);
export const IconBoat = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v10M12 3l6 10h-6" />
    <path d="M4 14h16l-2.3 4.8a1.6 1.6 0 0 1-1.4.9H7.7a1.6 1.6 0 0 1-1.4-.9z" />
  </Base>
);
export const IconBuggy = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6.5" cy="16.5" r="2.6" />
    <circle cx="17.5" cy="16.5" r="2.6" />
    <path d="M3.6 13l1.8-3.6h6.6l3 3.6M9 9.4V6.4h4M9.2 16.5h5.6" />
  </Base>
);
export const IconTemple = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 9.5 12 4l9 5.5" />
    <path d="M4 20h16M4 9.8V20M8 9.8V20M12 9.8V20M16 9.8V20M20 9.8V20M3 20h18" />
  </Base>
);
export const IconDolphin = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 13.5c3.4 3.2 7.6 3.1 10.6-.2 1.8-2 2.9-4.8 5.4-4.9-.6 2.2-.9 4.3-2.9 6.4-3.3 3.5-8.4 4-13.1 1.6z" />
    <path d="M7.5 14.4c.9.8 2.4.9 3.5.2" />
  </Base>
);
export const IconPyramid = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 20h20" />
    <path d="M2 20 9 7l7 13" />
    <path d="M12.5 20 17 10.5 22 20" />
  </Base>
);
export const IconFish = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12c3-4 8-4 12-1.2M5 12c3 4 8 4 12 1.2" />
    <path d="M17 10.8 21 8.5v7l-4-2.3" />
    <path d="M7.6 11.2h.01" />
  </Base>
);
export const IconMask = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="7" width="17" height="8.6" rx="4.2" />
    <path d="M3.5 10.4H1.6M22.4 10.4h-1.9" />
    <path d="M9.5 15.6c0 1.6 1 2.6 2.5 2.6s2.5-1 2.5-2.6" />
  </Base>
);
export const IconBalloon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3a6.2 6.2 0 0 1 6.2 6.2c0 3.6-3.1 6.1-6.2 8-3.1-1.9-6.2-4.4-6.2-8A6.2 6.2 0 0 1 12 3z" />
    <path d="M12 3v14.2M8.4 6.2c-.7 3.6-.7 7.4 0 11M15.6 6.2c.7 3.6.7 7.4 0 11" />
    <path d="M10.3 17.2h3.4l-.5 3h-2.4z" />
  </Base>
);
export const IconBuilding = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 21V6l7-3 7 3v15" />
    <path d="M3 21h18M10 21v-4h4v4M8.5 8h.01M12 8h.01M15.5 8h.01M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </Base>
);
/** Suitcase - reads instantly as trips / excursions for the hero trust stats. */
export const IconSuitcase = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="7.5" width="17" height="12.5" rx="2.4" />
    <path d="M8.5 7.5V5.6a1.9 1.9 0 0 1 1.9-1.9h3.2a1.9 1.9 0 0 1 1.9 1.9V7.5M9 12v3M15 12v3" />
  </Base>
);

/** WhatsApp glyph - recognisable brand mark. Uses currentColor so the button
 *  controls the colour. Filled path. */
export const IconWhatsApp = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.99 2.898 9.825 9.825 0 012.892 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449A11.815 11.815 0 0012.05.002C5.495.002.16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.821 11.821 0 00-3.422-8.452z" />
  </svg>
);

/** Facebook "f" glyph. Filled; inherits colour via currentColor. Decorative by
 *  default - wrap in a labelled link for meaning. */
export const IconFacebook = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796v8.437C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

/** Instagram glyph (rounded square + lens + dot). Filled; inherits colour via
 *  currentColor. Decorative by default - wrap in a labelled link for meaning. */
export const IconInstagram = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.56-.477.96-.896 1.382-.42.419-.819.679-1.382.896-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.249-2.227-.413-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.382-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.413-2.227.217-.562.477-.961.896-1.381.42-.419.819-.679 1.382-.896.422-.166 1.057-.362 2.227-.415 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.132 4.902.333 4.14.63c-.789.306-1.459.717-2.126 1.384C1.347 2.681.935 3.35.63 4.14.333 4.902.131 5.775.072 7.052.012 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.913.306.788.717 1.458 1.384 2.126.667.666 1.336 1.079 2.126 1.384.763.296 1.636.498 2.913.558C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.072c1.277-.06 2.15-.262 2.913-.558.788-.306 1.458-.718 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.296-.763.498-1.636.558-2.913.06-1.28.072-1.689.072-4.948s-.012-3.668-.072-4.948c-.06-1.277-.262-2.15-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.763-.297-1.636-.498-2.913-.558C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
