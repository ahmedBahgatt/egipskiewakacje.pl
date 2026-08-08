import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Nie znaleźliśmy tej strony</h1>
        <p className={styles.text}>
          Strona mogła zostać przeniesiona lub nie istnieje. Wróć na stronę główną albo przejdź
          prosto do wycieczek.
        </p>
        <div className={styles.actions}>
          <Button href="/" size="lg" iconRight={<IconArrowRight />}>
            Strona główna
          </Button>
          <Button href="/wycieczki/" variant="outline" size="lg">
            Zobacz wycieczki
          </Button>
        </div>
        <nav className={styles.links} aria-label="Przydatne linki">
          <Link href="/wycieczki-z-hurghady/">Wycieczki z Hurghady</Link>
          <Link href="/wycieczki-z-marsa-alam/">Wycieczki z Marsa Alam</Link>
          <Link href="/wycieczki-z-sharm-el-sheikh/">Wycieczki z Sharm el Sheikh</Link>
          <Link href="/cennik/">Cennik</Link>
          <Link href="/kontakt/">Kontakt</Link>
        </nav>
      </div>
    </section>
  );
}
