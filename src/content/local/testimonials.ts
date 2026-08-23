import type { Testimonial } from "@/content/types";

/**
 * Real participant testimonials - NOT fabricated, and ANONYMISED.
 *
 * These are faithful excerpts of genuine, publicly visible 5-star opinions written
 * by people who took excursions operated by the same team. Reviewer identities are
 * deliberately removed (no real names shown, no fake names invented) and presented
 * honestly as anonymous participant experiences ("Uczestnik wycieczki"). Only light
 * punctuation/spacing cleanup and meaning-preserving shortening were applied - no
 * sentence was invented, no sentiment changed, no reviewers combined.
 *
 * `rating` is the exact star count from the original review (each of these five was
 * independently a verified 5/5 in the source). `trip` labels come straight from what
 * the review actually describes - never guessed.
 *
 * IMPORTANT: display/trust content only. NEVER emit Review/AggregateRating JSON-LD
 * for these, and never present them as reviews written for the Egipskie Wakacje
 * brand/profile or as a Google rating.
 */
export const testimonials: Testimonial[] = [
  {
    id: "safari-luksor-nurkowanie",
    featured: true,
    rating: 5,
    quote:
      "Skorzystałam z wycieczek fakultatywnych i to była najlepsza decyzja. Byłam na safari na quadach, w Luksorze i na nurkowaniu - każda z tych wypraw była niesamowitym przeżyciem. Wszystko świetnie zorganizowane, bez spóźnień. Przewodnicy mówili po polsku, a ceny były znacznie niższe niż u rezydenta.",
    trip: "Safari • Luksor • Nurkowanie",
  },
  {
    id: "kair-luksor-safari",
    rating: 5,
    quote:
      "Wszystkie wycieczki ogarnięte przez organizatora szybko i sprawnie. Wychodzisz przed hotel i nie musisz się niczym przejmować. Pełen profesjonalizm i bardzo atrakcyjna cena.",
    trip: "Kair • Luksor • Safari",
  },
  {
    id: "jeep-safari-marsa-alam",
    rating: 5,
    quote:
      "Fantastyczne, profesjonalne biuro z doskonałym kontaktem. Jeep safari w Marsa Alam było niezapomnianą przygodą - piękne widoki, świetna organizacja i mnóstwo wrażeń.",
    trip: "Jeep safari • Marsa Alam",
  },
  {
    id: "nurkowanie",
    rating: 5,
    quote:
      "Fajna wycieczka, przemiły instruktor nurkowania, wspaniałe podwodne światy - w sumie bardzo mile spędzony dzień.",
    trip: "Nurkowanie",
  },
  {
    id: "zwiedzanie-hurghady",
    rating: 5,
    quote:
      "Bardzo szybki i profesjonalny kontakt, a sama wycieczka po Hurghadzie była bardzo ciekawa. Godne polecenia.",
    trip: "Hurghada",
  },
];
