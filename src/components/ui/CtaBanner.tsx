import { Button } from "./Button";
import { IconWhatsApp } from "./icons";
import { contactWhatsappUrl } from "@/lib/whatsapp";
import styles from "./CtaBanner.module.css";

/**
 * Shared final WhatsApp CTA banner for the hub pages. Reinforces the one
 * conversion path (WhatsApp booking, no online payment) with the same dark
 * navy/gold treatment used across interior pages.
 */
export function CtaBanner({
  title,
  text,
  message,
}: {
  title: string;
  text: string;
  /** Pre-filled WhatsApp message. */
  message: string;
}) {
  return (
    <section className={`${styles.cta} motif-dark on-dark`}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Button
          href={contactWhatsappUrl(message)}
          external
          variant="whatsapp"
          size="lg"
          iconLeft={<IconWhatsApp />}
        >
          Napisz na WhatsApp
        </Button>
      </div>
    </section>
  );
}
