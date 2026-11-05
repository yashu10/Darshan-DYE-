import { ROUTES } from "./site";

/** An answer is plain text interleaved with internal links. */
export type FaqSegment = string | { href: string; text: string };

export interface Faq {
  question: string;
  answer: readonly FaqSegment[];
}

/** Plain-text version of an answer, used for FAQPage structured data. */
export function faqAnswerText(faq: Faq): string {
  return faq.answer.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

const MANUFACTURER: Faq = {
  question: "Are you a manufacturer or a trader?",
  answer: ["Darshan Dye-Chem is a manufacturer, and also supplies wholesale and retail. We are based in Ahmedabad, Gujarat."]
};

const OVERSEAS: Faq = {
  question: "Do you supply overseas buyers?",
  answer: ["Yes, export enquiries are welcome. Share your product, quantity and destination country and we will respond with options."]
};

const RIGHT_DYE: Faq = {
  question: "Which dye is right for my material?",
  answer: [
    "Acid dyes are commonly used for wool, silk, nylon and leather, and direct dyes for cotton, other cellulosic fibres and paper. Try our ",
    { href: ROUTES.tools, text: "dye finder" },
    " or ask our team."
  ]
};

export const HOME_FAQS: readonly Faq[] = [
  MANUFACTURER,
  {
    question: "Which dyes do you make?",
    answer: [
      "Our range includes acid dyes, direct dyes and other specialty colourants. You can browse every shade, with its ratings, in the ",
      { href: `${ROUTES.products}#explorer`, text: "shade explorer" },
      " and download our shade cards as PDFs."
    ]
  },
  {
    question: "Can I get a sample before ordering in bulk?",
    answer: [
      "Yes. Request a sample through the ",
      { href: ROUTES.contact, text: "contact page" },
      " with the dye and shade you need, and our team will confirm the details."
    ]
  },
  RIGHT_DYE,
  OVERSEAS,
  {
    question: "How do I get pricing?",
    answer: [
      "Send us your requirement through the contact page, WhatsApp or phone with the dye name, quantity and delivery location, and we will reply with a quote."
    ]
  }
];

export const ABOUT_FAQS: readonly Faq[] = [
  MANUFACTURER,
  {
    question: "Can I get a sample before ordering in bulk?",
    answer: [
      "Yes, please request a sample through the contact page with your required dye and shade, and our team will confirm the details."
    ]
  },
  OVERSEAS,
  RIGHT_DYE,
  {
    question: "Can you match a specific shade?",
    answer: ["Send us your shade reference and requirement and we will advise what is possible."]
  },
  {
    question: "How do I get a price list or data sheet?",
    answer: ["Contact us with the products you are interested in and we will share pricing and available technical information."]
  }
];
