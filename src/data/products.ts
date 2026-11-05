import { DYES, type DyeFamily } from "./dyes";

const shadeCount = (family: DyeFamily) => DYES.filter((dye) => dye.family === family).length;

export const OTHER_COLOURANTS: readonly { name: string; description: string; colour: string }[] = [
  { name: "Yellow Chemical Dye", description: "General-purpose yellow colourant.", colour: "#ffd60a" },
  { name: "Acid Yellow GL", description: "Bright acid yellow for multiple applications.", colour: "#fbbf24" },
  { name: "Resin White Dye", description: "White colourant for resin and coating uses.", colour: "#e9edf3" },
  { name: "Magenta Chemical Dye", description: "Intense magenta for printing and dyeing.", colour: "#d6217f" },
  { name: "Blue Chemical Dye", description: "Rich blue colourant for varied substrates.", colour: "#1d4ed8" }
];

/** Products offered in the "Product of interest" list of the enquiry form. */
export const PRODUCT_OPTIONS: readonly string[] = [
  "Acid Red F2R",
  "Acid Fast Red A",
  "Acid Red Pink B",
  "Acid Yellow 2GLN",
  "Acid Fast Yellow 3RL",
  "Orange Chemical Dye",
  "Red Chemical Dye",
  "Vibrant Dye",
  "Black Dye",
  ...OTHER_COLOURANTS.map((product) => product.name)
];

export interface ShadeCardPdf {
  family: DyeFamily;
  title: string;
  /** Description shown on the download card. */
  summary: string;
  url: string;
  cover: string;
  coverAlt: string;
  pages: number;
  sizeLabel: string;
  sizeBytes: number;
}

export const SHADE_CARD_PDFS: Record<DyeFamily, ShadeCardPdf> = {
  acid: {
    family: "acid",
    title: "Acid Dyes shade card",
    summary: `${shadeCount("acid")} shades on nylon at 0.5% and 2.0% depth, with C.I. names, fastness ratings and an A–Z index.`,
    url: "/assets/downloads/darshan-acid-dyes-shade-card.pdf",
    cover: "/assets/shadecards/acid-cover.jpg",
    coverAlt: "Darshan Dye Chem Acid Dyes shade card cover",
    pages: 14,
    sizeLabel: "1.5 MB",
    sizeBytes: 1600914
  },
  direct: {
    family: "direct",
    title: "Direct Dyes shade card",
    summary: `${shadeCount("direct")} shades on cotton at 0.5% and 2.0% depth, including direct matching shades and an A–Z index.`,
    url: "/assets/downloads/darshan-direct-dyes-shade-card.pdf",
    cover: "/assets/shadecards/direct-cover.jpg",
    coverAlt: "Darshan Dye Chem Direct Dyes shade card cover",
    pages: 9,
    sizeLabel: "1.1 MB",
    sizeBytes: 1102476
  }
};
