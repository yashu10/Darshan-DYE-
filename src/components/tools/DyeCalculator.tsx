"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/data/site";
import { calculateDye } from "@/lib/calculator";

const INITIAL_VALUES = { weight: "100", shade: "2", liquor: "10", batches: "1", price: "" };
type Field = keyof typeof INITIAL_VALUES;

/** Estimates dye, water and cost for a dyeing batch. After the first "Calculate" the result updates as you type. */
export function DyeCalculator() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [calculated, setCalculated] = useState(false);

  const result = calculated
    ? calculateDye({
        weightKg: parseFloat(values.weight),
        shadePercent: parseFloat(values.shade),
        liquorRatio: parseFloat(values.liquor),
        batches: parseInt(values.batches, 10),
        pricePerKg: parseFloat(values.price)
      })
    : null;
  const hasError = calculated && result === null;

  const bind = (field: Field) => ({
    value: values[field],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValues((current) => ({ ...current, [field]: event.target.value }))
  });

  return (
    <>
      <form
        className="form-plain"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setCalculated(true);
        }}
      >
        <div className="grid2">
          <div className="fld">
            <label htmlFor="kg">Material weight (kg)</label>
            <input id="kg" name="kg" type="number" min="0" step="any" inputMode="decimal" {...bind("weight")} />
          </div>
          <div className="fld">
            <label htmlFor="shade">Shade depth (% owf)</label>
            <input id="shade" name="shade" type="number" min="0" step="any" inputMode="decimal" {...bind("shade")} />
          </div>
          <div className="fld">
            <label htmlFor="lr">Liquor ratio (1 : N)</label>
            <input id="lr" name="lr" type="number" min="0" step="any" inputMode="decimal" {...bind("liquor")} />
          </div>
          <div className="fld">
            <label htmlFor="batches">Number of batches</label>
            <input id="batches" name="batches" type="number" min="1" step="1" inputMode="numeric" {...bind("batches")} />
          </div>
        </div>
        <div className="fld">
          <label htmlFor="price">Dye price per kg, optional (Rs)</label>
          <input id="price" name="price" type="number" min="0" step="any" inputMode="decimal" placeholder="e.g. 450" {...bind("price")} />
        </div>
        <span className="err" id="calcErr" role="alert">
          {hasError ? "Enter fabric weight, shade % and liquor ratio (all above zero)." : ""}
        </span>
        <button className="btn btn-amber" type="submit">
          Calculate
        </button>
      </form>

      <div className="result" id="calcOut" hidden={result === null} aria-live="polite">
        {result ? (
          <>
            <span className="result-label">Dye required</span>
            <div className="big">{result.dyeLabel}</div>
            <div className="rows">
              <div>
                <span>Total material</span>
                <b>{result.totalMaterialLabel}</b>
              </div>
              <div>
                <span>Water needed</span>
                <b>{result.waterLabel}</b>
              </div>
              <div>
                <span>Estimated dye cost</span>
                <b>{result.costLabel}</b>
              </div>
            </div>
            <small>
              Indicative only. Shade, dye strength and substrate change the real figure, so we recommend a sample trial before bulk.
            </small>
            <Link className="btn btn-amber" href={`${ROUTES.contact}?msg=${encodeURIComponent(result.quoteMessage)}`}>
              Get a quote for this
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
}
