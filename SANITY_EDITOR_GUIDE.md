# Przewodnik redaktora - Egipskie Wakacje (Sanity CMS)

Prosty przewodnik po edycji treści strony bez pomocy programisty. Treść strony
pochodzi z Sanity; strona jest budowana automatycznie po publikacji.

- **Studio (panel edycji):** adres podany przez administratora (`https://<nazwa>.sanity.studio`).
- **Projekt:** `ej04dib0`, zbiór danych `production`.
- **Logowanie:** kontem zaproszonym w Sanity (Manage -> Members).

---

## Jak działają zmiany (WAŻNE)

1. Edytujesz dokument w Studio i klikasz **Publish** (Publikuj).
2. Publikacja uruchamia automatyczne przebudowanie strony.
3. Po kilku minutach zmiana jest widoczna na `https://egipskiewakacje.pl`.

Wersje robocze (Draft) **nie** trafiają na stronę. Dopóki nie klikniesz
**Publish**, nikt poza Tobą nie widzi zmian. Usunięcie dokumentu też wymaga
publikacji przebudowy - zniknie ze strony przy następnym budowaniu.

---

## Struktura panelu

Po lewej stronie zobaczysz:

- **Ustawienia serwisu** - globalne dane (nazwa, WhatsApp, opis).
- **Kierunki** - Hurghada, Marsa Alam, Sharm el Sheikh.
- **Wycieczki** - wszystkie 78 wycieczek.
- **Kategorie wycieczek** - grupowanie (np. Kair, Safari, Rejsy).
- **Poradnik** - artykuły bloga.
- **Autorzy**, **FAQ**, **Opinie**, **Strony prawne**.
- **Dokumenty legacy** - stare dokumenty starej koncepcji; NIE edytuj i NIE usuwaj bez konsultacji.

---

## Edycja wycieczki

1. **Wycieczki** -> wybierz wycieczkę z listy.
2. Zakładki u góry grupują pola: **Treść, Media, Ceny, Logistyka, Program, Powiązania, SEO i publikacja**.
3. Wprowadź zmiany.
4. Kliknij **Publish**.

### Zmiana ceny

Zakładka **Ceny**:

- **Cena nagłówkowa** - kwota pokazywana na kartach i w karcie rezerwacji.
- **Jednostka** - `os.`, `łódź`, `buggy`, `kurs`, `pakiet`.
- **Cennik szczegółowy** - pełny rozkład (dorosły, dziecko, warianty). To ten cennik widzi klient w tabeli.
- **Cena zweryfikowana dnia** - ustaw datę, gdy sprawdzasz cenę u operatora (jest pokazywana na stronie).
- **Dopłaty za transfer** - tylko strefy, w których dopłata faktycznie obowiązuje.

Aktualizuj **Cena zweryfikowana dnia** tylko wtedy, gdy naprawdę sprawdziłeś
cenę - nie przy zmianie innego tekstu.

### Zdjęcia i galeria

Zakładka **Media**:

1. Przeciągnij plik na pole **Obraz główny** lub **Galeria**.
2. Ustaw **punkt ostrości (hotspot)** - klikając w najważniejszy element zdjęcia. Kadr na telefonie jest węższy niż na komputerze.
3. **Opis obrazu (alt)** jest **wymagany** - napisz po polsku, CO widać na zdjęciu (nie nazwę strony). To czyta czytnik ekranu i wyszukiwarka.

Nie podajesz rozmiaru ani ścieżki pliku - system sam generuje wersje na różne
ekrany z jednego przesłanego zdjęcia.

### Plan dnia (itinerary)

Zakładka **Program** -> **Plan dnia**. Każdy punkt: opcjonalna godzina, tytuł,
opis. Kolejność zmieniasz przeciągając punkty.

### W cenie / poza ceną / FAQ

Zakładka **Program**: osobne listy **W cenie** i **Poza ceną** (wypisz wszystko,
co bywa mylone z wliczonym - napoje, bilety dodatkowe). **FAQ wycieczki** to
pytania i odpowiedzi - te same, które pokazują się na stronie i w danych
strukturalnych (Google FAQ). Nie prowadź osobnej kopii FAQ.

### SEO

Zakładka **SEO i publikacja**:

- **SEO - tytuł** - ok. 50-60 znaków.
- **SEO - opis** - ok. 150-160 znaków.
- **Obraz Open Graph** - obraz przy udostępnianiu linku (Facebook/WhatsApp). Puste = użyty obraz główny.
- Pola **kanoniczne** / **noindex** to ustawienia zaawansowane - patrz niżej.

### Przypisanie kierunku i kategorii

- Zakładka **Treść** -> **Kierunek** (jeden) i **Kategorie** (jedna lub więcej).
- To decyduje, na których stronach kierunku i kategorii pojawia się wycieczka.

---

## Dodanie nowej wycieczki

1. **Wycieczki** -> **+ (Create)**.
2. Uzupełnij: **Tytuł**, **H1**, **Slug** (generuje się z tytułu - sprawdź go), **Pełna ścieżka URL** (`/kierunek/slug`), **Kierunek**, **Kategorie**.
3. **Krótki opis**, **Opis wycieczki**, **Główne atrakcje**.
4. **Media**: obraz główny + galeria (z opisami alt).
5. **Ceny**: sposób wyceny, cena nagłówkowa, jednostka, cennik szczegółowy, data weryfikacji.
6. **Logistyka**: dostępność, czas trwania, godzina odbioru, transport, język przewodnika.
7. **Program**: plan dnia, w cenie, poza ceną, warunki rezerwacji, FAQ.
8. **SEO**: tytuł, opis, ścieżka kanoniczna (ta sama ścieżka co URL, ale ZE slashem na końcu), data aktualizacji.
9. **Publish**.

Po przebudowie strona wycieczki, strona kierunku, strona kategorii, lista
`/wycieczki/` i mapa strony (sitemap) zawierają nową wycieczkę - bez zmian w kodzie.

---

## Dodanie artykułu (Poradnik)

1. **Poradnik** -> **+ (Create)**.
2. **Tytuł**, **H1**, **Slug**, **Pełna ścieżka URL** (`/poradnik/slug`).
3. **Zajawka**, **Odpowiedź wprost** (zwięzła odpowiedź na pytanie z tytułu).
4. **Obraz wyróżniający** + opis alt.
5. **Treść**: dodawaj bloki (nagłówek, akapit, lista, wyróżnienie, obraz, tabela, przycisk, polecana wycieczka). Do linków wewnętrznych używaj bloku **Polecana wycieczka** (wybierasz wycieczkę z listy - nie wpisujesz adresu ręcznie).
6. **Autor**, ewentualnie powiązany kierunek/wycieczki.
7. **SEO** + **Data publikacji**.
8. **Publish**.

---

## Czego NIE zmieniać bez potrzeby

- **Slug / ścieżka URL opublikowanej strony** - zmiana psuje pozycje w Google i istniejące linki. Zmieniaj tylko świadomie i za zgodą.
- **Ścieżka kanoniczna** - musi odpowiadać rzeczywistej ścieżce strony (ze slashem na końcu).
- **noindex** - ukrywa stronę przed Google. Używaj tylko celowo.
- **Slug kierunku** - musi pozostać: `hurghada`, `marsa-alam`, `sharm-el-sheikh`.
- **Dokumenty legacy** - nie usuwaj.
- **Polskojęzyczny przewodnik potwierdzony** - zaznaczaj tylko, gdy operator to jednoznacznie potwierdza (domyślnie wyłączone dla tras z Sharm el Sheikh).

## Zasady rzetelności (wbudowane w system)

- Brak pól na "starą cenę", rabaty, odliczanie czy sztuczne oceny - to celowe.
- Każdy obraz treściowy wymaga prawdziwego opisu alt.
- **Bez przedpłaty** - klient płaci dopiero przy rozpoczęciu wycieczki. Nie sugeruj płatności online.
- Ceny w USD (kursy nurkowe w EUR, zgodnie z cennikiem operatora).

Pytania techniczne (adres Studio, dostęp, przebudowa strony) - do administratora.
