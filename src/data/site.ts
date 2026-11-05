/**
 * Single source of truth for business details. Everything that shows a name,
 * address, phone number or email (pages, footer, structured data, llms.txt)
 * reads from here, so a change only ever needs to be made once.
 */

const DEFAULT_SITE_URL = "https://darshandyechem.com";

/** Public address of the live site, without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, "");

export const ROUTES = {
  home: "/",
  about: "/about/",
  products: "/products/",
  contact: "/contact/",
  tools: "/tools/"
} as const;

export const SITE = {
  name: "Darshan Dye-Chem",
  /** Short description reused as the default meta description and in structured data. */
  description:
    "Darshan Dye-Chem is an Ahmedabad-based manufacturer and exporter of acid dyes, direct dyes and specialty colourants.",
  url: SITE_URL,
  locale: "en_IN",
  language: "en-IN",
  gstNumber: "24ALMPP2816Q1ZI",
  indiamartUrl: "https://www.indiamart.com/darshan-dye-chem/",
  /** WhatsApp number, international format without "+". */
  whatsappNumber: "919327094416",
  /** FormSubmit fallback only: recipient, with a copy to `enquiryCc`. Web3Forms sends to yashrp018@gmail.com. */
  enquiryRecipient: "darshandyechem@gmail.com",
  enquiryCc: "patelarchit2572000@gmail.com",
  /**
   * Web3Forms access key (web3forms.com, free). Enquiries go to the email the key was made with.
   * Public by design, safe to keep in code. Leave empty to fall back to FormSubmit.
   */
  web3formsKey: "a57f40a8-89ff-4b12-9d11-7caf97b26b46",
  address: {
    street: "I/149A, Vinoba Bhave Nagar, Dibiyapur, Phase 2, Vatva GIDC",
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "382445",
    country: "IN"
  },
  founder: { name: "Girish Patel", jobTitle: "Founder & Proprietor" }
} as const;

/** Date (YYYY-MM-DD) of the last content change. Bump it when pages change; it feeds sitemap.xml. */
export const SITE_LAST_MODIFIED = "2026-11-05";

/** One-line postal address, as shown in the footer. */
export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`;

export interface Contact {
  name: string;
  phoneDisplay: string;
  /** Value for tel: links. */
  phoneTel: string;
  email: string;
}

export const CONTACTS: readonly Contact[] = [
  { name: "Girish Patel", phoneDisplay: "+91 93270 94416", phoneTel: "+919327094416", email: "darshandyechem@gmail.com" },
  { name: "Archit Patel", phoneDisplay: "+91 95740 68089", phoneTel: "+919574068089", email: "patelarchit2572000@gmail.com" }
];

/** Google Maps links built from the address, so they never drift from it. */
const mapQuery = encodeURIComponent(FULL_ADDRESS);
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.about, label: "About Us" },
  { href: ROUTES.products, label: "Products" },
  { href: ROUTES.contact, label: "Contact" }
] as const;

/** Where the image used for link previews (Open Graph / Twitter) lives. */
export const OG_IMAGE = { path: "/assets/img/og-image.jpg", width: 1200, height: 630, alt: "Darshan Dye Chem logo" } as const;

/** The address split into the lines used on the Contact page. */
export const ADDRESS_LINES: readonly string[] = [
  SITE.name,
  "I/149A, Vinoba Bhave Nagar, Dibiyapur,",
  "Phase 2, Vatva GIDC, Ahmedabad,",
  "Gujarat 382445"
];
