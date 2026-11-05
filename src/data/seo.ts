import { DYES } from "./dyes";
import { ROUTES } from "./site";

/**
 * Title and description of every page, as shown in Google results and link previews.
 * Titles stay under ~60 characters and descriptions under ~160 so they are not cut off.
 * `title` gets " | Darshan Dye-Chem" appended by the layout; the home page uses `absoluteTitle`.
 */
export const PAGE_SEO = {
  home: {
    path: ROUTES.home,
    name: "Home",
    absoluteTitle: "Acid & Direct Dye Manufacturer, Ahmedabad | Darshan Dye-Chem",
    description: `Ahmedabad manufacturer and exporter of acid dyes, direct dyes and specialty colourants. Browse ${DYES.length} shades with fastness ratings and request a quote.`
  },
  about: {
    path: ROUTES.about,
    name: "About Us",
    title: "About Us: Dye Maker in Vatva, Ahmedabad",
    description:
      "Darshan Dye-Chem is a proprietor-led dye manufacturer in Vatva GIDC, Ahmedabad. Meet the team, see our laboratory and learn how we supply buyers worldwide."
  },
  products: {
    path: ROUTES.products,
    name: "Products",
    title: `Acid & Direct Dye Shade Cards (${DYES.length} Shades)`,
    description: `Search ${DYES.length} acid and direct dye shades by name, C.I. number or colour, check fastness ratings and download the shade cards as PDF. Request a sample.`
  },
  contact: {
    path: ROUTES.contact,
    name: "Contact Us",
    title: "Contact & Get a Dye Quote, Ahmedabad",
    description:
      "Request a quote or sample from Darshan Dye-Chem, Vatva GIDC, Ahmedabad. Call, WhatsApp or email us your dye, shade and quantity requirement."
  },
  tools: {
    path: ROUTES.tools,
    name: "Dye Tools",
    title: "Free Dye Calculator & Dye Finder",
    description:
      "Free dye calculator for dye quantity, water and cost per batch, plus a dye finder to see if acid or direct dyes suit wool, silk, nylon, leather or cotton."
  }
} as const;
