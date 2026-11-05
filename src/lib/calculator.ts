export interface DyeCalculatorInput {
  /** Weight of material per batch, in kg. */
  weightKg: number;
  /** Shade depth as % on weight of fabric (owf). */
  shadePercent: number;
  /** Liquor ratio 1 : N. */
  liquorRatio: number;
  batches: number;
  /** Optional dye price per kg; 0 or NaN when not given. */
  pricePerKg: number;
}

export interface DyeCalculatorResult {
  dyeLabel: string;
  totalMaterialLabel: string;
  waterLabel: string;
  costLabel: string;
  /** Prefilled message for the enquiry form. */
  quoteMessage: string;
}

const format = (value: number, maximumFractionDigits: number) => value.toLocaleString("en-IN", { maximumFractionDigits });

/** Dye needed = material weight x shade % / 100. Returns null when the inputs cannot give a result. */
export function calculateDye(input: DyeCalculatorInput): DyeCalculatorResult | null {
  const { weightKg, shadePercent, liquorRatio, pricePerKg } = input;
  const batches = Number.isFinite(input.batches) && input.batches > 0 ? Math.trunc(input.batches) : 1;
  if (!(weightKg > 0) || !(shadePercent > 0) || !(liquorRatio > 0)) return null;

  const totalKg = weightKg * batches;
  const dyeKg = (totalKg * shadePercent) / 100;
  const waterLitres = totalKg * liquorRatio;
  const dyeLabel = dyeKg < 1 ? `${format(dyeKg * 1000, 0)} g` : `${format(dyeKg, 2)} kg`;

  return {
    dyeLabel,
    totalMaterialLabel: `${format(totalKg, 1)} kg`,
    waterLabel: `${format(waterLitres, 0)} L`,
    costLabel: pricePerKg > 0 ? `₹ ${format(dyeKg * pricePerKg, 0)}` : "Add price to see",
    quoteMessage: `Dye requirement: ${dyeLabel} for ${format(totalKg, 1)} kg material at ${shadePercent}% shade (liquor ratio 1:${liquorRatio}). Please quote and advise suitable dye.`
  };
}
