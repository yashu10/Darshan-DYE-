import { DYES, type ColourGroup, type Dye, type DyeFamily } from "@/data/dyes";

export const FAMILY_LABEL: Record<DyeFamily, string> = { acid: "Acid", direct: "Direct" };

export const COLOUR_GROUPS: readonly ColourGroup[] = [
  "Yellow",
  "Orange",
  "Red & Pink",
  "Violet",
  "Blue",
  "Green",
  "Brown",
  "Black & Grey"
];

/** Dot colour shown next to each colour filter. */
export const COLOUR_GROUP_DOT: Record<ColourGroup, string> = {
  Yellow: "#f6c90e",
  Orange: "#f2711c",
  "Red & Pink": "#d62839",
  Violet: "#7b2cbf",
  Blue: "#2b59ff",
  Green: "#1aa26b",
  Brown: "#7a4a2b",
  "Black & Grey": "#222"
};

export const shadeCount = (family?: DyeFamily): number =>
  family ? DYES.filter((dye) => dye.family === family).length : DYES.length;

/** Lower-case, punctuation-free text used for searching ("Acid Yellow 42" matches "acid yellow 42"). */
export const normalise = (text: string): string => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export const searchKey = (dye: Dye): string => normalise(`${dye.name} ${dye.ci}`);

/** Leading digit of a rating such as "4-5" (4) or "6-7" (6). Missing ratings count as 0. */
export const leadingRating = (rating: string): number => {
  const match = /^\d/.exec(rating);
  return match ? Number(match[0]) : 0;
};

/** Cards print "-" where a rating is missing; show a proper dash instead. */
export const displayRating = (rating: string): string => (rating === "-" ? "–" : rating);

/** Black or white text, whichever reads better on the given hex background. */
export const readableInk = (hex: string): "#111" | "#fff" => {
  const n = Number.parseInt(hex.slice(1), 16);
  const luminance = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return luminance > 150 ? "#111" : "#fff";
};

/**
 * Width (0-100) of the rating bar, or null when the value cannot be drawn on a 1..max scale
 * (for example the plain numbers on the direct card's milling column).
 */
export const ratingBarPercent = (rating: string, max: number): number | null => {
  const match = /^(\d)(?:-(\d))?$/.exec(rating);
  if (!match) return null;
  const low = Number(match[1]);
  if (low > max) return null;
  const value = match[2] ? (low + Number(match[2])) / 2 : low;
  return Math.min(100, (value / max) * 100);
};

/** Link that opens the family's PDF shade card on the page showing this dye. */
export const shadeCardPageUrl = (dye: Dye): string => `/assets/downloads/darshan-${dye.family}-dyes-shade-card.pdf#page=${dye.pdfPage}`;

export const dyeReference = (dye: Dye): string => `${dye.name}${dye.ci ? ` (${dye.ci})` : ""}`;
