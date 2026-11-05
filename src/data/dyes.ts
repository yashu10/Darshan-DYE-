/**
 * Shade card data: every dye in the Darshan Acid and Direct dye shade cards.
 *
 * Names, C.I. names and fastness ratings are transcribed from the printed shade cards
 * (checked against the brochure PDFs in public/assets/downloads). Ratings are kept as
 * printed, including "-" where the card has none.
 * `swatch05` / `swatch20` are colours sampled from the scanned cards at 0.5% and 2.0% depth, so they are indicative.
 * `pdfPage` is the page of the family's PDF brochure that shows the dye.
 */

export type DyeFamily = "acid" | "direct";

export type ColourGroup =
  | "Yellow"
  | "Orange"
  | "Red & Pink"
  | "Violet"
  | "Blue"
  | "Green"
  | "Brown"
  | "Black & Grey";

export interface Dye {
  id: number;
  family: DyeFamily;
  /** Trade name as printed on the card. */
  name: string;
  /** C.I. generic name. Empty for mixes and matching shades. */
  ci: string;
  light: string;
  wash: string;
  perspiration: string;
  milling: string;
  swatch05: string;
  swatch20: string;
  pdfPage: number;
  colourGroup: ColourGroup;
}

export const DYES: readonly Dye[] = [
  { id: 1, family: "acid", name: "Acid Yellow 5G", ci: "Acid Yellow 186", light: "3-4", wash: "3", perspiration: "3", milling: "3", swatch05: "#f4f142", swatch20: "#fbf00b", pdfPage: 3, colourGroup: "Yellow" },
  { id: 2, family: "acid", name: "Acid Yellow 5GN", ci: "Acid Yellow 110", light: "5", wash: "5", perspiration: "4-5", milling: "4", swatch05: "#faea3a", swatch20: "#fee200", pdfPage: 3, colourGroup: "Yellow" },
  { id: 3, family: "acid", name: "Acid Yellow 5GNX", ci: "Acid Yellow 64", light: "6-7", wash: "5", perspiration: "5", milling: "-", swatch05: "#f8ee5a", swatch20: "#f0db01", pdfPage: 3, colourGroup: "Yellow" },
  { id: 4, family: "acid", name: "Acid Tartarzine Yellow N", ci: "Acid Yellow 23", light: "5", wash: "4-5", perspiration: "3-4", milling: "5", swatch05: "#feda00", swatch20: "#fcd700", pdfPage: 3, colourGroup: "Yellow" },
  { id: 5, family: "acid", name: "Acid Light Fast Yellow G", ci: "Acid Yellow 11", light: "4-5", wash: "4-5", perspiration: "4", milling: "2-3", swatch05: "#f5e02d", swatch20: "#fad201", pdfPage: 3, colourGroup: "Yellow" },
  { id: 6, family: "acid", name: "Acid Light Fast Yellow 2G", ci: "Acid Yellow 17", light: "4-5", wash: "4-5", perspiration: "3-4", milling: "3-4", swatch05: "#f5dd1c", swatch20: "#f8cc02", pdfPage: 3, colourGroup: "Yellow" },
  { id: 7, family: "acid", name: "Acid Fast Yellow FGL/4GL", ci: "Acid Yellow 49", light: "5-6", wash: "4", perspiration: "3", milling: "3", swatch05: "#f7d900", swatch20: "#f9cb02", pdfPage: 3, colourGroup: "Yellow" },
  { id: 8, family: "acid", name: "Acid Yellow MR", ci: "Acid Yellow 42", light: "4", wash: "5", perspiration: "4-5", milling: "3", swatch05: "#f3bd01", swatch20: "#f0a702", pdfPage: 3, colourGroup: "Yellow" },
  { id: 9, family: "acid", name: "Acid Metanil Yellow G", ci: "Acid Yellow 36", light: "3", wash: "4-5", perspiration: "3", milling: "4", swatch05: "#eda400", swatch20: "#f08f02", pdfPage: 3, colourGroup: "Yellow" },
  { id: 10, family: "acid", name: "Acid Yellow GL", ci: "Acid Yellow 114", light: "5-6", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#f5ca2f", swatch20: "#e9a600", pdfPage: 4, colourGroup: "Yellow" },
  { id: 11, family: "acid", name: "Acid Yellow 2GLN", ci: "Acid Yellow 59", light: "7", wash: "4-5", perspiration: "4-5", milling: "4-5", swatch05: "#f3c20f", swatch20: "#de8d01", pdfPage: 4, colourGroup: "Yellow" },
  { id: 12, family: "acid", name: "Acid Yellow GR", ci: "Acid Yellow 99", light: "4-5", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#e6a201", swatch20: "#d27c01", pdfPage: 4, colourGroup: "Yellow" },
  { id: 13, family: "acid", name: "Acid Fast Yellow 3RL", ci: "Acid Yellow 194", light: "5-6", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#dc8e02", swatch20: "#c56a02", pdfPage: 4, colourGroup: "Yellow" },
  { id: 14, family: "acid", name: "Acid Yellow 2RL", ci: "Acid Orange 80", light: "7", wash: "5", perspiration: "5", milling: "3-4", swatch05: "#e7ad41", swatch20: "#c56403", pdfPage: 4, colourGroup: "Orange" },
  { id: 15, family: "acid", name: "Acid Light Fast Orange 2G", ci: "Acid Orange 10", light: "3-4", wash: "4-5", perspiration: "3", milling: "4-5", swatch05: "#fc9900", swatch20: "#fa8f02", pdfPage: 4, colourGroup: "Orange" },
  { id: 16, family: "acid", name: "Acid Orange II", ci: "Acid Orange 7", light: "3-4", wash: "4", perspiration: "2-3", milling: "3", swatch05: "#fa7d02", swatch20: "#f26201", pdfPage: 4, colourGroup: "Orange" },
  { id: 17, family: "acid", name: "Acid Orange SGR", ci: "Acid Orange 56", light: "7", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#f16602", swatch20: "#e32502", pdfPage: 4, colourGroup: "Orange" },
  { id: 18, family: "acid", name: "Acid Orange G", ci: "Acid Orange 74", light: "5-6", wash: "4-5", perspiration: "4-5", milling: "5", swatch05: "#d04202", swatch20: "#b21103", pdfPage: 4, colourGroup: "Orange" },
  { id: 19, family: "acid", name: "Acid Orange RL", ci: "Acid Orange 86", light: "7", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#f1955e", swatch20: "#d64a02", pdfPage: 5, colourGroup: "Orange" },
  { id: 20, family: "acid", name: "Acid Orange MRL", ci: "Acid Orange 142", light: "6", wash: "4-5", perspiration: "4-5", milling: "6-4", swatch05: "#d84803", swatch20: "#b10902", pdfPage: 5, colourGroup: "Orange" },
  { id: 21, family: "acid", name: "Acid Scarlet G", ci: "Acid Red 97", light: "3", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#f2530c", swatch20: "#de0b02", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 22, family: "acid", name: "Acid Crocine Scarlet MOO", ci: "Acid Red 73", light: "5", wash: "3-4", perspiration: "2-3", milling: "2-3", swatch05: "#dd1703", swatch20: "#ca0000", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 23, family: "acid", name: "Acid Red MBL", ci: "Acid Red 362", light: "5-6", wash: "4-5", perspiration: "5", milling: "3", swatch05: "#b30804", swatch20: "#920001", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 24, family: "acid", name: "Acid Fast Scarlet GL", ci: "Acid Red 357", light: "6", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#ce2803", swatch20: "#a40100", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 25, family: "acid", name: "Acid Red G", ci: "Acid Red 183", light: "5-6", wash: "5", perspiration: "4", milling: "5", swatch05: "#d84b0e", swatch20: "#990101", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 26, family: "acid", name: "Acid Scarlet 3R", ci: "Acid Red 18", light: "4", wash: "5", perspiration: "3-4", milling: "4", swatch05: "#d2060a", swatch20: "#ce0101", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 27, family: "acid", name: "Acid Fast Red RS", ci: "Acid Red 114", light: "4", wash: "5", perspiration: "3", milling: "4", swatch05: "#be0100", swatch20: "#a60000", pdfPage: 5, colourGroup: "Red & Pink" },
  { id: 28, family: "acid", name: "Acid Red F2R", ci: "Acid Red 151", light: "4", wash: "4", perspiration: "3-4", milling: "4", swatch05: "#cb0102", swatch20: "#a90100", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 29, family: "acid", name: "Acid Fast Red A", ci: "Acid Red 88", light: "2-3", wash: "3", perspiration: "1", milling: "2", swatch05: "#c5011b", swatch20: "#a60000", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 30, family: "acid", name: "Acid Brillient Carmoisine WS", ci: "Acid Red 14", light: "3-4", wash: "4-5", perspiration: "3", milling: "4", swatch05: "#b2010b", swatch20: "#a90100", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 31, family: "acid", name: "Acid Red Geramine Red 2G/Rose/2G", ci: "Acid Red 1", light: "4-5", wash: "4-5", perspiration: "3", milling: "2-3", swatch05: "#d10119", swatch20: "#c80106", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 32, family: "acid", name: "Acid Pink Red EB", ci: "Acid Red 195", light: "4-5", wash: "4-5", perspiration: "4", milling: "4", swatch05: "#c50f5c", swatch20: "#930008", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 33, family: "acid", name: "Acid Pink B", ci: "Acid Red 186", light: "4-5", wash: "5", perspiration: "4-5", milling: "3-4", swatch05: "#ba2c67", swatch20: "#9b0219", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 34, family: "acid", name: "Acid Sulpho Rhodamine B", ci: "Acid Red 52", light: "3-4", wash: "4-5", perspiration: "3-4", milling: "4", swatch05: "#fd33ad", swatch20: "#fe058a", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 35, family: "acid", name: "Acid Red 3BN", ci: "Acid Red 131", light: "4-5", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#b0006d", swatch20: "#98002d", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 36, family: "acid", name: "Acid Fast Brillient Red 8", ci: "Acid Red 249", light: "3-4", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#cf1f71", swatch20: "#be002b", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 37, family: "acid", name: "Acid Crimson Red", ci: "(Mix)", light: "4-5", wash: "4-5", perspiration: "4", milling: "3", swatch05: "#9b0134", swatch20: "#6c0000", pdfPage: 7, colourGroup: "Red & Pink" },
  { id: 38, family: "acid", name: "Acid Red NG", ci: "(Mix)", light: "3", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#f5500c", swatch20: "#df0402", pdfPage: 7, colourGroup: "Red & Pink" },
  { id: 39, family: "acid", name: "Acid Maroon V", ci: "Acid Red 119", light: "4-5", wash: "5", perspiration: "4-5", milling: "3-4", swatch05: "#5d011a", swatch20: "#1a0001", pdfPage: 7, colourGroup: "Red & Pink" },
  { id: 40, family: "acid", name: "Acid Red SRS", ci: "", light: "3", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#db0910", swatch20: "#b80000", pdfPage: 7, colourGroup: "Red & Pink" },
  { id: 41, family: "acid", name: "Acid Bordeaux MB", ci: "Acid Violet 90", light: "5", wash: "4-5", perspiration: "4-5", milling: "3", swatch05: "#af1f65", swatch20: "#810010", pdfPage: 7, colourGroup: "Violet" },
  { id: 42, family: "acid", name: "Acid Brillient Red 10B", ci: "Acid Violet 54", light: "4-5", wash: "5", perspiration: "5", milling: "5", swatch05: "#c43ba5", swatch20: "#920040", pdfPage: 7, colourGroup: "Violet" },
  { id: 43, family: "acid", name: "Acid Violet RL", ci: "Acid Violet 92", light: "5", wash: "4-5", perspiration: "4-5", milling: "5", swatch05: "#6d4576", swatch20: "#080007", pdfPage: 7, colourGroup: "Violet" },
  { id: 44, family: "acid", name: "Acid Brown Violet L", ci: "Acid Violet 78", light: "6-7", wash: "5", perspiration: "4-5", milling: "4-5", swatch05: "#77647f", swatch20: "#040005", pdfPage: 7, colourGroup: "Violet" },
  { id: 45, family: "acid", name: "Acid Violet 4BN/5BN", ci: "Acid Violet 17", light: "1-2", wash: "5", perspiration: "4-5", milling: "4", swatch05: "#100dc0", swatch20: "#0100a3", pdfPage: 7, colourGroup: "Violet" },
  { id: 46, family: "acid", name: "Acid Violet 4BS", ci: "Acid Violet 49", light: "1-2", wash: "5", perspiration: "4-5", milling: "4", swatch05: "#0000a0", swatch20: "#010187", pdfPage: 8, colourGroup: "Violet" },
  { id: 47, family: "acid", name: "Acid Patent Blue VS", ci: "Acid Blue 1", light: "2-3", wash: "4", perspiration: "2-3", milling: "3-4", swatch05: "#0081cd", swatch20: "#0057b7", pdfPage: 8, colourGroup: "Blue" },
  { id: 48, family: "acid", name: "Acid Brillient Blue FCF", ci: "Acid Blue 9", light: "1-2", wash: "2", perspiration: "3-4", milling: "3-4", swatch05: "#0158b9", swatch20: "#013da7", pdfPage: 8, colourGroup: "Blue" },
  { id: 49, family: "acid", name: "Acid Patent Blue AS", ci: "Acid Blue 7", light: "1-2", wash: "5", perspiration: "4-5", milling: "4-5", swatch05: "#018cc1", swatch20: "#015ba5", pdfPage: 8, colourGroup: "Blue" },
  { id: 50, family: "acid", name: "Acid Cornassive Blue FF", ci: "Acid Blue 15", light: "1", wash: "5", perspiration: "4", milling: "4", swatch05: "#023ec2", swatch20: "#01008a", pdfPage: 8, colourGroup: "Blue" },
  { id: 51, family: "acid", name: "Acid Royal Blue N", ci: "(Mix)", light: "2-3", wash: "4", perspiration: "4-5", milling: "4", swatch05: "#243fd2", swatch20: "#0001b0", pdfPage: 8, colourGroup: "Blue" },
  { id: 52, family: "acid", name: "Acid Brillient Comasse Fast Blue 2R", ci: "Acid Blue 92", light: "5-6", wash: "4", perspiration: "3-4", milling: "1-2", swatch05: "#01004e", swatch20: "#00001a", pdfPage: 8, colourGroup: "Blue" },
  { id: 53, family: "acid", name: "Acid Blue 2G", ci: "Acid Blue 158", light: "4-5", wash: "4-5", perspiration: "4", milling: "4-5", swatch05: "#010e4e", swatch20: "#000004", pdfPage: 8, colourGroup: "Blue" },
  { id: 54, family: "acid", name: "Acid Fast Navy Blue S5R/2RNS", ci: "Acid Blue 113", light: "5", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#010759", swatch20: "#01000a", pdfPage: 8, colourGroup: "Blue" },
  { id: 55, family: "acid", name: "Acid Dark Blue MTR", ci: "Acid Blue 193", light: "6-7", wash: "5", perspiration: "4-5", milling: "3-4", swatch05: "#031b50", swatch20: "#000004", pdfPage: 9, colourGroup: "Blue" },
  { id: 56, family: "acid", name: "Acid Blue AG", ci: "Acid Blue 25", light: "5-6", wash: "3", perspiration: "3", milling: "2-3", swatch05: "#011aa5", swatch20: "#00036e", pdfPage: 9, colourGroup: "Blue" },
  { id: 57, family: "acid", name: "Acid Veporaid PXE", ci: "Acid Green 1", light: "6", wash: "3-4", perspiration: "3-4", milling: "2-3", swatch05: "#76864d", swatch20: "#2f6c1f", pdfPage: 9, colourGroup: "Green" },
  { id: 58, family: "acid", name: "Acid Green 3GR (Mix)", ci: "Parrot Green", light: "4-5", wash: "4-5", perspiration: "3", milling: "4", swatch05: "#7dd17d", swatch20: "#26af2c", pdfPage: 9, colourGroup: "Green" },
  { id: 59, family: "acid", name: "Acid Green V", ci: "Acid Green 16", light: "3", wash: "4-5", perspiration: "3", milling: "3-4", swatch05: "#017c57", swatch20: "#02440f", pdfPage: 9, colourGroup: "Green" },
  { id: 60, family: "acid", name: "Acid Fast Green B", ci: "Acid Green 9", light: "1-2", wash: "4-5", perspiration: "3-4", milling: "2-3", swatch05: "#01869d", swatch20: "#024869", pdfPage: 9, colourGroup: "Green" },
  { id: 61, family: "acid", name: "Acid Alazarine Natural Green G", ci: "Acid Green 25", light: "5-6", wash: "4-5", perspiration: "4", milling: "3-4", swatch05: "#025159", swatch20: "#01050e", pdfPage: 9, colourGroup: "Green" },
  { id: 62, family: "acid", name: "Acid Green BS", ci: "Acid Green 111", light: "4-5", wash: "4-5", perspiration: "4", milling: "4", swatch05: "#010d01", swatch20: "#000000", pdfPage: 9, colourGroup: "Green" },
  { id: 63, family: "acid", name: "Acid Dark Green N", ci: "Acid Green 68", light: "4", wash: "4", perspiration: "3", milling: "3", swatch05: "#011614", swatch20: "#000000", pdfPage: 9, colourGroup: "Green" },
  { id: 64, family: "acid", name: "Acid Dark Green B", ci: "Acid Green 20", light: "4-5", wash: "4", perspiration: "4", milling: "4", swatch05: "#02180b", swatch20: "#000000", pdfPage: 10, colourGroup: "Green" },
  { id: 65, family: "acid", name: "Acid Brown RL", ci: "Acid Brown 425", light: "5", wash: "4-3", perspiration: "4", milling: "4", swatch05: "#5d160d", swatch20: "#160001", pdfPage: 10, colourGroup: "Brown" },
  { id: 66, family: "acid", name: "Acid Brown HTG B", ci: "Acid Brown 422", light: "4", wash: "3-4", perspiration: "3", milling: "3", swatch05: "#db7e01", swatch20: "#bb4802", pdfPage: 10, colourGroup: "Brown" },
  { id: 67, family: "acid", name: "Acid Brown CG", ci: "Acid Brown 83", light: "4", wash: "3", perspiration: "4", milling: "3", swatch05: "#b74803", swatch20: "#930302", pdfPage: 10, colourGroup: "Brown" },
  { id: 68, family: "acid", name: "Acid Brown GBP", ci: "Acid Brown 420", light: "4-5", wash: "4", perspiration: "3", milling: "4", swatch05: "#a63803", swatch20: "#760102", pdfPage: 10, colourGroup: "Brown" },
  { id: 69, family: "acid", name: "Acid Brown NT", ci: "Acid Brown 165", light: "4-5", wash: "4", perspiration: "3", milling: "4", swatch05: "#744129", swatch20: "#4b0c09", pdfPage: 10, colourGroup: "Brown" },
  { id: 70, family: "acid", name: "Acid Brown 2RL", ci: "Acid Brown 45", light: "6-7", wash: "4-5", perspiration: "4-5", milling: "3-4", swatch05: "#945f4e", swatch20: "#4f0c07", pdfPage: 10, colourGroup: "Brown" },
  { id: 71, family: "acid", name: "Acid Brown 3R", ci: "Acid Brown 75", light: "4", wash: "4", perspiration: "3", milling: "4", swatch05: "#4a0705", swatch20: "#080100", pdfPage: 10, colourGroup: "Brown" },
  { id: 72, family: "acid", name: "Acid Brown RL", ci: "Acid Brown 365", light: "6-7", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#841e02", swatch20: "#5a0000", pdfPage: 10, colourGroup: "Brown" },
  { id: 73, family: "acid", name: "Acid Fast Brown ESR", ci: "Acid Brown 348", light: "4-5", wash: "4", perspiration: "3", milling: "2-3", swatch05: "#3b2e2f", swatch20: "#1f0b11", pdfPage: 11, colourGroup: "Brown" },
  { id: 74, family: "acid", name: "Acid Brown ESG", ci: "Acid Brown 349", light: "4", wash: "4", perspiration: "3-4", milling: "4", swatch05: "#4f2c32", swatch20: "#1d0407", pdfPage: 11, colourGroup: "Brown" },
  { id: 75, family: "acid", name: "Acid Brown MBL", ci: "Acid Brown 355", light: "6-7", wash: "4-5", perspiration: "4-5", milling: "4", swatch05: "#552925", swatch20: "#1d0202", pdfPage: 11, colourGroup: "Brown" },
  { id: 76, family: "acid", name: "Acid Brown GR", ci: "Acid Brown 282", light: "6-7", wash: "5", perspiration: "5", milling: "4", swatch05: "#4c241d", swatch20: "#180102", pdfPage: 11, colourGroup: "Brown" },
  { id: 77, family: "acid", name: "Cofee Brown (Mix)", ci: "", light: "4", wash: "4", perspiration: "3-4", milling: "4", swatch05: "#502608", swatch20: "#160203", pdfPage: 11, colourGroup: "Brown" },
  { id: 78, family: "acid", name: "Acid Black AB", ci: "Acid Black 210", light: "3-4", wash: "3-4", perspiration: "4", milling: "4", swatch05: "#03242b", swatch20: "#010105", pdfPage: 11, colourGroup: "Black & Grey" },
  { id: 79, family: "acid", name: "Acid Black 10BX", ci: "Acid Black 1", light: "5-6", wash: "2", perspiration: "2-3", milling: "3", swatch05: "#011743", swatch20: "#000111", pdfPage: 11, colourGroup: "Black & Grey" },
  { id: 80, family: "acid", name: "Acid Fast Grey BGL", ci: "Acid Black 58", light: "6-7", wash: "5", perspiration: "4-5", milling: "4-5", swatch05: "#394d6a", swatch20: "#060d32", pdfPage: 11, colourGroup: "Black & Grey" },
  { id: 81, family: "acid", name: "Acid Black NBR", ci: "Acid Black 234", light: "3-4", wash: "3-4", perspiration: "4", milling: "4", swatch05: "#021b21", swatch20: "#000000", pdfPage: 11, colourGroup: "Black & Grey" },
  { id: 82, family: "acid", name: "Acid Black WA", ci: "Acid Black 52", light: "7-8", wash: "4-5", perspiration: "3-4", milling: "3-4", swatch05: "#51586a", swatch20: "#00020c", pdfPage: 12, colourGroup: "Black & Grey" },
  { id: 83, family: "acid", name: "Acid Black LDN", ci: "Acid Black 172", light: "7", wash: "4-5", perspiration: "4", milling: "4", swatch05: "#172137", swatch20: "#000000", pdfPage: 12, colourGroup: "Black & Grey" },
  { id: 84, family: "acid", name: "Acid Black MSRL", ci: "Acid Black 194", light: "7", wash: "4", perspiration: "4", milling: "4", swatch05: "#020419", swatch20: "#000000", pdfPage: 12, colourGroup: "Black & Grey" },
  { id: 85, family: "acid", name: "Crome Black T", ci: "Bordant Black 11", light: "7-8", wash: "5", perspiration: "4", milling: "5", swatch05: "#343b4e", swatch20: "#000000", pdfPage: 12, colourGroup: "Black & Grey" },
  { id: 86, family: "acid", name: "Acid Black BX (Mix)", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#031624", swatch20: "#000000", pdfPage: 12, colourGroup: "Black & Grey" },
  { id: 87, family: "acid", name: "Green LP", ci: "", light: "4-5", wash: "4-5", perspiration: "3", milling: "5", swatch05: "#78a783", swatch20: "#0f481f", pdfPage: 12, colourGroup: "Green" },
  { id: 88, family: "acid", name: "Bottle Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#02897a", swatch20: "#065239", pdfPage: 12, colourGroup: "Green" },
  { id: 89, family: "acid", name: "Dark Green (Mix)", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#044434", swatch20: "#000000", pdfPage: 12, colourGroup: "Green" },
  { id: 90, family: "direct", name: "Direct Lemon Yellow 6G/CFG", ci: "Direct Yellow 8", light: "2", wash: "2-3", perspiration: "2-3", milling: "40", swatch05: "#fcf366", swatch20: "#fef660", pdfPage: 3, colourGroup: "Yellow" },
  { id: 91, family: "direct", name: "Direct Fast Lemon Yellow 5GLL", ci: "Direct Yellow 44", light: "5", wash: "3-4", perspiration: "4-5", milling: "60", swatch05: "#fbe232", swatch20: "#fcd301", pdfPage: 3, colourGroup: "Yellow" },
  { id: 92, family: "direct", name: "Direct Fast Yellow 3GX", ci: "Direct Yellow 6", light: "6", wash: "3", perspiration: "2", milling: "60", swatch05: "#fece00", swatch20: "#ffb600", pdfPage: 3, colourGroup: "Yellow" },
  { id: 93, family: "direct", name: "Direct Chrysopenine G", ci: "Direct Yellow 12", light: "5", wash: "1", perspiration: "1", milling: "40", swatch05: "#fec802", swatch20: "#ffbb01", pdfPage: 3, colourGroup: "Yellow" },
  { id: 94, family: "direct", name: "Direct Sun Yellow RCH", ci: "Direct Yellow 99", light: "4", wash: "2", perspiration: "2", milling: "60", swatch05: "#f9bc01", swatch20: "#f99f01", pdfPage: 3, colourGroup: "Yellow" },
  { id: 95, family: "direct", name: "Direct Fast Yellow RL", ci: "Direct Yellow 86", light: "6", wash: "3", perspiration: "3-4", milling: "80", swatch05: "#f7ad00", swatch20: "#f78f02", pdfPage: 3, colourGroup: "Yellow" },
  { id: 96, family: "direct", name: "Direct Fast Orange TGLL (Y)", ci: "Direct Orange 34", light: "6", wash: "7", perspiration: "2-3", milling: "80", swatch05: "#e17602", swatch20: "#cb4004", pdfPage: 3, colourGroup: "Orange" },
  { id: 97, family: "direct", name: "Direct Fast Orange TGLL (R)", ci: "Direct Orange 39", light: "6-7", wash: "2-3", perspiration: "4-5", milling: "80", swatch05: "#de7001", swatch20: "#c93e02", pdfPage: 3, colourGroup: "Orange" },
  { id: 98, family: "direct", name: "Direct Viscose Orange A", ci: "Direct Orange 108", light: "2-3", wash: "2-3", perspiration: "2-3", milling: "80", swatch05: "#e75303", swatch20: "#d92401", pdfPage: 3, colourGroup: "Orange" },
  { id: 99, family: "direct", name: "Direct Fast Orange SE", ci: "Direct Orange 26", light: "3", wash: "4", perspiration: "2-3", milling: "50", swatch05: "#fe7c2f", swatch20: "#f14e01", pdfPage: 4, colourGroup: "Orange" },
  { id: 100, family: "direct", name: "Direct Fast Scarlet 4BS", ci: "Direct Red 23", light: "3-4", wash: "2", perspiration: "3-4", milling: "60", swatch05: "#ce1a0f", swatch20: "#b40001", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 101, family: "direct", name: "Direct Fast Red BLN", ci: "Direct Red 80", light: "5", wash: "3-4", perspiration: "3-4", milling: "80", swatch05: "#d11740", swatch20: "#af010f", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 102, family: "direct", name: "Direct Light Fast Red 6BL", ci: "Direct Red 79", light: "6", wash: "3-4", perspiration: "3-4", milling: "70", swatch05: "#b31b32", swatch20: "#b91c31", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 103, family: "direct", name: "Direct Fast Red 5BL", ci: "Direct Red 81", light: "4-5", wash: "3-4", perspiration: "3-4", milling: "70", swatch05: "#bc1236", swatch20: "#940000", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 104, family: "direct", name: "Direct Fast Red 12B", ci: "Direct Red 31", light: "2", wash: "2", perspiration: "3", milling: "60", swatch05: "#b0033b", swatch20: "#840000", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 105, family: "direct", name: "Direct Fast Rubine Violet 2R", ci: "Direct Red 83", light: "7", wash: "3-4", perspiration: "2-3", milling: "60", swatch05: "#880a4e", swatch20: "#5b010b", pdfPage: 4, colourGroup: "Red & Pink" },
  { id: 106, family: "direct", name: "Direct Brillient Helio 2R", ci: "Direct Violet 35", light: "4", wash: "2", perspiration: "2-3", milling: "60", swatch05: "#3d3195", swatch20: "#0d0263", pdfPage: 4, colourGroup: "Violet" },
  { id: 107, family: "direct", name: "Direct Brillient Violet Helio B", ci: "Direct Violet 51", light: "4", wash: "2", perspiration: "2-3", milling: "60", swatch05: "#190265", swatch20: "#010015", pdfPage: 4, colourGroup: "Violet" },
  { id: 108, family: "direct", name: "Direct Fast Violet MB", ci: "Direct Violet 9", light: "2-3", wash: "2", perspiration: "2-3", milling: "40", swatch05: "#1d0363", swatch20: "#00011c", pdfPage: 5, colourGroup: "Violet" },
  { id: 109, family: "direct", name: "Direct Fast Turquoies Blue GL", ci: "Direct Blue 86", light: "6", wash: "4", perspiration: "1-2", milling: "80", swatch05: "#01bef4", swatch20: "#0085cf", pdfPage: 5, colourGroup: "Blue" },
  { id: 110, family: "direct", name: "Direct Fast Turquoie FBL", ci: "Direct Blue 199", light: "6", wash: "3", perspiration: "3", milling: "60", swatch05: "#019ce2", swatch20: "#006dbf", pdfPage: 5, colourGroup: "Blue" },
  { id: 111, family: "direct", name: "Direct Sky Blue FF", ci: "Direct Blue 15", light: "2", wash: "3", perspiration: "3", milling: "50", swatch05: "#035da0", swatch20: "#030a5a", pdfPage: 5, colourGroup: "Blue" },
  { id: 112, family: "direct", name: "Direct Fast Blue 2RLL", ci: "Direct Blue 80", light: "6", wash: "3", perspiration: "3", milling: "50", swatch05: "#021675", swatch20: "#010041", pdfPage: 5, colourGroup: "Blue" },
  { id: 113, family: "direct", name: "Direct Fast Blue GLL", ci: "Direct Blue 71", light: "5-6", wash: "5-6", perspiration: "3", milling: "70", swatch05: "#13498c", swatch20: "#000131", pdfPage: 5, colourGroup: "Blue" },
  { id: 114, family: "direct", name: "Direct Fast Sky Blue 7GLL", ci: "Direct Blue 218", light: "4-5", wash: "3-4", perspiration: "2", milling: "60", swatch05: "#0f5983", swatch20: "#010233", pdfPage: 5, colourGroup: "Blue" },
  { id: 115, family: "direct", name: "Direct Fast Green BLL", ci: "Direct Green 96", light: "4-5", wash: "3-4", perspiration: "2", milling: "60", swatch05: "#065248", swatch20: "#000000", pdfPage: 5, colourGroup: "Green" },
  { id: 116, family: "direct", name: "Direct Paper Brown SD", ci: "Direct Brown 44", light: "4", wash: "2-3", perspiration: "2-3", milling: "60", swatch05: "#bf8747", swatch20: "#9a5205", pdfPage: 5, colourGroup: "Brown" },
  { id: 117, family: "direct", name: "Direct Fast Brown MN", ci: "(Mix)", light: "5", wash: "1-2", perspiration: "1-2", milling: "60", swatch05: "#83543d", swatch20: "#3c0101", pdfPage: 6, colourGroup: "Brown" },
  { id: 118, family: "direct", name: "Direct Black OB", ci: "Direct Black 80", light: "5-6", wash: "3", perspiration: "3", milling: "50", swatch05: "#061c3f", swatch20: "#000000", pdfPage: 6, colourGroup: "Black & Grey" },
  { id: 119, family: "direct", name: "Direct Fast Black VSF 600", ci: "Direct Black 22", light: "4-5", wash: "3-4", perspiration: "3-4", milling: "45", swatch05: "#01021d", swatch20: "#000000", pdfPage: 6, colourGroup: "Black & Grey" },
  { id: 120, family: "direct", name: "Direct Swiss Pink", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#e2568f", swatch20: "#bb0942", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 121, family: "direct", name: "Direct Tomato Red", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#e35973", swatch20: "#c40f2c", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 122, family: "direct", name: "Direct Rose", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#cc187c", swatch20: "#ad003a", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 123, family: "direct", name: "Direct Maroon", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#b76a77", swatch20: "#851419", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 124, family: "direct", name: "Direct Magenta", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#721a71", swatch20: "#410028", pdfPage: 6, colourGroup: "Red & Pink" },
  { id: 125, family: "direct", name: "Direct Royal Blue", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#145e9b", swatch20: "#011263", pdfPage: 6, colourGroup: "Blue" },
  { id: 126, family: "direct", name: "Direct Navy Blue", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#133065", swatch20: "#010010", pdfPage: 6, colourGroup: "Blue" },
  { id: 127, family: "direct", name: "Direct Rama Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#95da99", swatch20: "#52b55b", pdfPage: 6, colourGroup: "Green" },
  { id: 128, family: "direct", name: "Direct Amrol Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#19b9a6", swatch20: "#019273", pdfPage: 6, colourGroup: "Green" },
  { id: 129, family: "direct", name: "Direct Shakuntala Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#0b9886", swatch20: "#02644f", pdfPage: 7, colourGroup: "Green" },
  { id: 130, family: "direct", name: "Direct Mehandi Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#b0b725", swatch20: "#768608", pdfPage: 7, colourGroup: "Green" },
  { id: 131, family: "direct", name: "Direct Chatani Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#8c9619", swatch20: "#485a03", pdfPage: 7, colourGroup: "Green" },
  { id: 132, family: "direct", name: "Direct Military Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#5a7b48", swatch20: "#103205", pdfPage: 7, colourGroup: "Green" },
  { id: 133, family: "direct", name: "Direct Bottle Green", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#1f6a58", swatch20: "#01260b", pdfPage: 7, colourGroup: "Green" },
  { id: 134, family: "direct", name: "Direct Khakhi", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#b68c1a", swatch20: "#844e02", pdfPage: 7, colourGroup: "Brown" },
  { id: 135, family: "direct", name: "Direct Brown GG", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#e7970d", swatch20: "#c76301", pdfPage: 7, colourGroup: "Brown" },
  { id: 136, family: "direct", name: "Direct Brown 2GLL", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#d98802", swatch20: "#b65400", pdfPage: 7, colourGroup: "Brown" },
  { id: 137, family: "direct", name: "Direct Rust", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#cc7419", swatch20: "#a13901", pdfPage: 7, colourGroup: "Brown" },
  { id: 138, family: "direct", name: "Direct Chiku Brown", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#b86007", swatch20: "#861b01", pdfPage: 7, colourGroup: "Brown" },
  { id: 139, family: "direct", name: "Direct Grey 2RL", ci: "", light: "-", wash: "-", perspiration: "-", milling: "-", swatch05: "#525267", swatch20: "#130f1e", pdfPage: 7, colourGroup: "Black & Grey" }
];
