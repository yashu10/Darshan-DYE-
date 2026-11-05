/**
 * schema.org structured data (JSON-LD) builders.
 *
 * Each page emits one @graph that links the same few entities by @id: the Organization,
 * the WebSite, the WebPage, plus page-specific nodes (FAQ, breadcrumbs, shade card datasets...).
 * Search engines and AI assistants use this to understand who the business is and what it sells.
 */
import { DYES, type Dye } from "@/data/dyes";
import { faqAnswerText, type Faq } from "@/data/faqs";
import { SHADE_CARD_PDFS } from "@/data/products";
import { CONTACTS, OG_IMAGE, ROUTES, SITE } from "@/data/site";
import { shadeCount } from "@/lib/dyes";

type JsonObject = Record<string, unknown>;

export const absoluteUrl = (path: string): string => `${SITE.url}${path}`;

const ID = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  founder: `${SITE.url}${ROUTES.about}#founder`
} as const;

const pageId = (path: string, fragment: string): string => `${absoluteUrl(path)}#${fragment}`;

const toIntlPhone = (tel: string): string => tel.replace(/^\+91(\d{5})(\d{5})$/, "+91-$1-$2");

export function organization(): JsonObject {
  const [primary] = CONTACTS;
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ID.organization,
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SITE.description,
    logo: { "@type": "ImageObject", url: absoluteUrl("/assets/img/logo-full.webp"), width: 2000, height: 2000 },
    image: [absoluteUrl(OG_IMAGE.path), absoluteUrl("/assets/img/lab/lab-1.jpg")],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    telephone: primary ? toIntlPhone(primary.phoneTel) : undefined,
    email: primary?.email,
    taxID: SITE.gstNumber,
    founder: { "@id": ID.founder },
    contactPoint: CONTACTS.map((contact) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      name: contact.name,
      telephone: toIntlPhone(contact.phoneTel),
      email: contact.email
    })),
    areaServed: ["India", "Worldwide"],
    knowsAbout: [
      "Acid dyes",
      "Direct dyes",
      "Metal complex dyes",
      "Dyes for nylon, wool, silk and leather",
      "Dyes for cotton, viscose and paper",
      "Dye shade cards",
      "Colour fastness ratings"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dyes and colourants",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Acid dyes", url: absoluteUrl(`${ROUTES.products}?f=acid`) },
        { "@type": "OfferCatalog", name: "Direct dyes", url: absoluteUrl(`${ROUTES.products}?f=direct`) },
        { "@type": "OfferCatalog", name: "Other colourants", url: absoluteUrl(`${ROUTES.products}#other`) }
      ]
    },
    sameAs: [SITE.indiamartUrl]
  };
}

export function website(): JsonObject {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: absoluteUrl("/"),
    name: SITE.name,
    inLanguage: SITE.language,
    publisher: { "@id": ID.organization }
  };
}

interface WebPageOptions {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  /** Pages below the home page also get a BreadcrumbList. */
  breadcrumb?: boolean;
}

export function webPage({ path, name, description, type = "WebPage", breadcrumb = true }: WebPageOptions): JsonObject {
  return {
    "@type": type,
    "@id": pageId(path, "webpage"),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: SITE.language,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.organization },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(OG_IMAGE.path) },
    breadcrumb: breadcrumb ? { "@id": pageId(path, "breadcrumb") } : undefined
  };
}

export function breadcrumbs(path: string, name: string): JsonObject {
  return {
    "@type": "BreadcrumbList",
    "@id": pageId(path, "breadcrumb"),
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) }
    ]
  };
}

export function faqPage(path: string, faqs: readonly Faq[]): JsonObject {
  return {
    "@type": "FAQPage",
    "@id": pageId(path, "faq"),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(faq) }
    }))
  };
}

export function founder(): JsonObject {
  return {
    "@type": "Person",
    "@id": ID.founder,
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    worksFor: { "@id": ID.organization },
    image: absoluteUrl("/assets/img/girish-patel.jpg")
  };
}

const FASTNESS_PROPERTIES: readonly [string, (dye: Dye) => string][] = [
  ["Light fastness", (dye) => dye.light],
  ["Washing fastness", (dye) => dye.wash],
  ["Perspiration fastness", (dye) => dye.perspiration],
  ["Milling fastness", (dye) => dye.milling]
];

function dyeProduct(dye: Dye): JsonObject {
  return {
    "@type": "Product",
    name: dye.name,
    alternateName: dye.ci || undefined,
    category: dye.family === "acid" ? "Acid dye" : "Direct dye",
    color: dye.colourGroup,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ID.organization },
    additionalProperty: FASTNESS_PROPERTIES.filter(([, read]) => read(dye) !== "-").map(([propertyName, read]) => ({
      "@type": "PropertyValue",
      name: propertyName,
      value: read(dye)
    }))
  };
}

/** Every dye of the shade cards as a Product list, so the catalogue is machine readable. */
export function dyeCatalog(): JsonObject {
  return {
    "@type": "ItemList",
    "@id": pageId(ROUTES.products, "catalog"),
    name: `${SITE.name} acid and direct dye shades`,
    numberOfItems: DYES.length,
    itemListElement: DYES.map((dye, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: dyeProduct(dye)
    }))
  };
}

/** The two shade card PDFs, described as downloadable datasets. */
export function shadeCardDatasets(): JsonObject[] {
  const measured = FASTNESS_PROPERTIES.map(([propertyName]) => propertyName);
  return (["acid", "direct"] as const).map((family) => {
    const pdf = SHADE_CARD_PDFS[family];
    const substrate = family === "acid" ? "nylon" : "cotton";
    return {
      "@type": "Dataset",
      "@id": pageId(ROUTES.products, `dataset-${family}`),
      name: `${SITE.name} ${family} dyes shade card`,
      description: `Shade card of ${shadeCount(family)} ${family} dyes dyed on ${substrate} at 0.5% and 2.0% depth, with C.I. generic names and light, washing, perspiration and milling fastness ratings.`,
      url: absoluteUrl(ROUTES.products),
      creator: { "@id": ID.organization },
      isAccessibleForFree: true,
      inLanguage: SITE.language,
      keywords: [`${family} dyes`, "shade card", "colour fastness", "dye manufacturer", "Ahmedabad"],
      variableMeasured: measured,
      distribution: {
        "@type": "DataDownload",
        encodingFormat: "application/pdf",
        contentUrl: absoluteUrl(pdf.url),
        contentSize: `${pdf.sizeBytes} B`
      }
    };
  });
}

/** The free dye calculator and dye finder, described as web applications. */
export function toolApplications(): JsonObject[] {
  const common = {
    "@type": "WebApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    inLanguage: SITE.language,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@id": ID.organization }
  };
  return [
    {
      ...common,
      "@id": pageId(ROUTES.tools, "calculator"),
      name: "Dye calculator",
      url: absoluteUrl(ROUTES.tools),
      description: "Estimates the dye quantity, water and cost for a dyeing batch from material weight, shade depth (% owf) and liquor ratio."
    },
    {
      ...common,
      "@id": pageId(ROUTES.tools, "finder"),
      name: "Dye finder",
      url: absoluteUrl(ROUTES.tools),
      description: "Shows whether acid dyes or direct dyes are commonly used for a material such as wool, silk, nylon, leather, cotton, viscose or paper."
    }
  ];
}

export function graph(...nodes: JsonObject[]): JsonObject {
  return { "@context": "https://schema.org", "@graph": nodes };
}
