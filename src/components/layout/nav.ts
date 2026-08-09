/** Navigation model shared by the header, mobile menu and footer. */

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  {
    label: "Wycieczki",
    href: "/wycieczki/",
    children: [
      { label: "Wszystkie wycieczki", href: "/wycieczki/" },
      { label: "Wycieczki z Hurghady", href: "/wycieczki-z-hurghady/" },
      { label: "Wycieczki z Marsa Alam", href: "/wycieczki-z-marsa-alam/" },
      { label: "Wycieczki z Sharm el Sheikh", href: "/wycieczki-z-sharm-el-sheikh/" },
      { label: "Kair i piramidy", href: "/wycieczki/kair-i-piramidy/" },
      { label: "Rejsy i wyspy", href: "/wycieczki/rejsy-i-wyspy/" },
      { label: "Snorkeling i delfiny", href: "/wycieczki/snorkeling-i-delfiny/" },
      { label: "Safari i quady", href: "/wycieczki/safari-i-quady/" },
      { label: "Nurkowanie", href: "/wycieczki/nurkowanie/" },
    ],
  },
  { label: "Cennik", href: "/cennik/" },
  { label: "Poradnik", href: "/poradnik/" },
  { label: "O nas", href: "/o-nas/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export const footerNav = {
  destynacje: {
    title: "Kierunki",
    links: [
      { label: "Wycieczki z Hurghady", href: "/wycieczki-z-hurghady/" },
      { label: "Wycieczki z Marsa Alam", href: "/wycieczki-z-marsa-alam/" },
      { label: "Wycieczki z Sharm el Sheikh", href: "/wycieczki-z-sharm-el-sheikh/" },
    ],
  },
  oferta: {
    title: "Rodzaje wycieczek",
    links: [
      { label: "Kair i piramidy", href: "/wycieczki/kair-i-piramidy/" },
      { label: "Rejsy i wyspy", href: "/wycieczki/rejsy-i-wyspy/" },
      { label: "Snorkeling i delfiny", href: "/wycieczki/snorkeling-i-delfiny/" },
      { label: "Safari i quady", href: "/wycieczki/safari-i-quady/" },
      { label: "Wszystkie wycieczki", href: "/wycieczki/" },
    ],
  },
  firma: {
    title: "Egipskie Wakacje",
    links: [
      { label: "O nas", href: "/o-nas/" },
      { label: "Kontakt", href: "/kontakt/" },
      { label: "FAQ", href: "/faq/" },
    ],
  },
  legal: {
    title: "Informacje",
    links: [
      { label: "Polityka prywatności", href: "/polityka-prywatnosci/" },
      { label: "Polityka cookies", href: "/polityka-cookies/" },
      { label: "Regulamin", href: "/regulamin/" },
    ],
  },
} as const;
