/**
 * Plain-text summaries of the site for AI assistants (the llms.txt convention).
 * Built from the same data as the pages, so the facts can never disagree with the website.
 */
import { DYES, type Dye, type DyeFamily } from "@/data/dyes";
import { ABOUT_FAQS, HOME_FAQS, faqAnswerText, type Faq } from "@/data/faqs";
import { SHADE_CARD_PDFS } from "@/data/products";
import { PAGE_SEO } from "@/data/seo";
import { CONTACTS, FULL_ADDRESS, SITE } from "@/data/site";
import { shadeCount } from "@/lib/dyes";
import { absoluteUrl } from "@/lib/schema";

const SUMMARY =
  `${SITE.name} is a manufacturer and exporter of acid dyes, direct dyes and specialty colourants based in Vatva GIDC, ` +
  `Ahmedabad, Gujarat, India. It supplies wholesale and bulk buyers in textile, leather and paper industries across India and ` +
  `overseas. Its shade cards show ${DYES.length} dye shades with C.I. names and fastness ratings.`;

const contactLines = (): string[] => [
  `- Address: ${FULL_ADDRESS}, India`,
  ...CONTACTS.map((contact) => `- ${contact.name}: ${contact.phoneDisplay}, ${contact.email}`),
  `- WhatsApp: +${SITE.whatsappNumber}`,
  `- GST number: ${SITE.gstNumber}`,
  `- IndiaMART profile: ${SITE.indiamartUrl}`
];

const faqLines = (faqs: readonly Faq[]): string[] => faqs.flatMap((faq) => [`**${faq.question}**`, faqAnswerText(faq), ""]);

export function buildLlmsTxt(): string {
  const pages = Object.values(PAGE_SEO).map((page) => `- [${page.name}](${absoluteUrl(page.path)}): ${page.description}`);
  const cards = Object.values(SHADE_CARD_PDFS).map(
    (pdf) => `- [${pdf.title} (PDF, ${pdf.pages} pages)](${absoluteUrl(pdf.url)}): ${pdf.summary}`
  );

  return [
    `# ${SITE.name}`,
    "",
    `> ${SUMMARY}`,
    "",
    "## Key facts",
    "",
    "- Business type: manufacturer; also wholesale and retail. Proprietorship led by Girish Patel.",
    ...contactLines(),
    "",
    "## Pages",
    "",
    ...pages,
    "",
    "## Shade cards and data",
    "",
    ...cards,
    `- [Complete dye list with fastness ratings](${absoluteUrl("/llms-full.txt")}): every dye, its C.I. name and light, washing, perspiration and milling ratings in one text file.`,
    "",
    "## Optional",
    "",
    `- [IndiaMART profile](${SITE.indiamartUrl}): third-party marketplace listing of ${SITE.name}.`,
    ""
  ].join("\n");
}

const tableRow = (dye: Dye): string =>
  `| ${dye.name} | ${dye.ci || "-"} | ${dye.light} | ${dye.wash} | ${dye.perspiration} | ${dye.milling} | ${dye.colourGroup} |`;

const familyTable = (family: DyeFamily): string[] => {
  const substrate = family === "acid" ? "nylon" : "cotton";
  const title = family === "acid" ? "Acid dyes" : "Direct dyes";
  return [
    `## ${title} (${shadeCount(family)} shades, dyed on ${substrate} at 0.5% and 2.0% depth)`,
    "",
    "| Dye | C.I. generic name | Light | Washing | Perspiration | Milling | Colour |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...DYES.filter((dye) => dye.family === family).map(tableRow),
    ""
  ];
};

export function buildLlmsFullTxt(): string {
  return [
    `# ${SITE.name}: full reference`,
    "",
    `> ${SUMMARY}`,
    "",
    "## About the company",
    "",
    `${SITE.name} is a proprietorship led by ${SITE.founder.name} (${SITE.founder.jobTitle}). It manufactures dyes in Vatva GIDC, Ahmedabad, and also supplies wholesale and retail. Product families: acid dyes (commonly used for nylon, wool, silk and leather), direct dyes (commonly used for cotton, viscose and paper) and other specialty colourants.`,
    "",
    "## Contact",
    "",
    ...contactLines(),
    "",
    "## Frequently asked questions",
    "",
    ...faqLines([...HOME_FAQS, ...ABOUT_FAQS.filter((faq) => !HOME_FAQS.some((home) => home.question === faq.question))]),
    "## How to read the shade card data",
    "",
    "Ratings are copied as printed on the shade cards. Light fastness uses a 1-8 scale; washing, perspiration and milling use a 1-5 scale; a dash means the card gives no rating. On the direct dyes card the milling column holds whole numbers such as 40 or 60, kept exactly as printed.",
    "",
    ...familyTable("acid"),
    ...familyTable("direct"),
    "## Pages",
    "",
    ...Object.values(PAGE_SEO).map((page) => `- ${absoluteUrl(page.path)}`),
    ""
  ].join("\n");
}
