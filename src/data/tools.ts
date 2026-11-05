/** Which dye family is commonly used for which material (dye finder). */
export type MaterialAdvice =
  | { supported: true; family: "Acid Dyes" | "Direct Dyes"; reason: string; suggestions: readonly string[] }
  | { supported: false; reason: string };

export const MATERIAL_OPTIONS: readonly { value: string; label: string }[] = [
  { value: "wool", label: "Wool" },
  { value: "silk", label: "Silk" },
  { value: "nylon", label: "Nylon" },
  { value: "leather", label: "Leather" },
  { value: "cotton", label: "Cotton" },
  { value: "viscose", label: "Viscose / rayon" },
  { value: "paper", label: "Paper" },
  { value: "polyester", label: "Polyester" },
  { value: "acrylic", label: "Acrylic" }
];

export const MATERIAL_ADVICE: Record<string, MaterialAdvice> = {
  wool: {
    supported: true,
    family: "Acid Dyes",
    reason: "Acid dyes are the standard choice for protein fibres like wool.",
    suggestions: ["Acid Red F2R", "Acid Fast Red A", "Acid Yellow 2GLN", "Acid Fast Yellow 3RL"]
  },
  silk: {
    supported: true,
    family: "Acid Dyes",
    reason: "Acid dyes give bright shades on silk.",
    suggestions: ["Acid Red Pink B", "Acid Red F2R", "Acid Yellow GL", "Acid Yellow 2GLN"]
  },
  nylon: {
    supported: true,
    family: "Acid Dyes",
    reason: "Nylon (polyamide) is commonly dyed with acid dyes.",
    suggestions: ["Acid Red F2R", "Acid Fast Red A", "Acid Fast Yellow 3RL"]
  },
  leather: {
    supported: true,
    family: "Acid Dyes",
    reason: "Acid dyes are widely used for leather colouring.",
    suggestions: ["Acid Fast Red A", "Acid Fast Yellow 3RL", "Black Dye"]
  },
  cotton: {
    supported: true,
    family: "Direct Dyes",
    reason: "Direct dyes colour cellulosic fibres like cotton without a separate mordant step.",
    suggestions: ["Red Chemical Dye", "Orange Chemical Dye", "Black Dye", "Blue Chemical Dye"]
  },
  viscose: {
    supported: true,
    family: "Direct Dyes",
    reason: "Direct dyes suit viscose and other cellulosic fibres.",
    suggestions: ["Red Chemical Dye", "Orange Chemical Dye", "Vibrant Dye"]
  },
  paper: {
    supported: true,
    family: "Direct Dyes",
    reason: "Direct dyes are commonly used for paper and board.",
    suggestions: ["Orange Chemical Dye", "Red Chemical Dye", "Yellow Chemical Dye", "Magenta Chemical Dye"]
  },
  polyester: {
    supported: false,
    reason: "Polyester is normally dyed with disperse dyes, which are not in our current catalogue."
  },
  acrylic: {
    supported: false,
    reason: "Acrylic is normally dyed with basic (cationic) dyes, which are not in our current catalogue."
  }
};
