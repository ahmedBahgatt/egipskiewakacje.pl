import { IconFacebook, IconInstagram, IconMail } from "@/components/ui/icons";
import { siteConfig } from "@/content/config";
import styles from "./SocialLinks.module.css";

/**
 * Shared Facebook / Instagram / Email circular icon group - one source of truth
 * for the premium contact icons used in the header, the mobile drawer and the
 * footer, so the two surfaces never drift (gold border, navy circle, soft-gold
 * glyph). `rel="me"` on the FB/IG anchors keeps the existing entity-linking
 * signal; the mailto never needs target/rel. The size is context-driven: the
 * drawer/footer variant uses >=44px touch targets, the desktop header a tighter
 * 40px (it only ever renders on wide, pointer-driven viewports).
 */
type SocialVariant = "header" | "drawer" | "footer";

export function SocialLinks({
  variant = "header",
  className,
}: {
  variant?: SocialVariant;
  className?: string;
}) {
  return (
    <ul
      className={`${styles.list} ${styles[variant]} ${className ?? ""}`}
      aria-label="Profile i kontakt - Egipskie Wakacje"
    >
      <li>
        <a
          href={siteConfig.social.facebook}
          className={styles.icon}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="Egipskie Wakacje na Facebooku"
        >
          <IconFacebook />
        </a>
      </li>
      <li>
        <a
          href={siteConfig.social.instagram}
          className={styles.icon}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label="Egipskie Wakacje na Instagramie"
        >
          <IconInstagram />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${siteConfig.email}`}
          className={styles.icon}
          aria-label="Napisz e-mail do Egipskie Wakacje"
        >
          <IconMail />
        </a>
      </li>
    </ul>
  );
}
