const $t = id => document.getElementById(id);
const fmt = (n, d = 1) => n.toLocaleString("en-IN", { maximumFractionDigits: d });

/* ---- Dye calculator ---- */
const calc = $t("calc"), out = $t("calcOut");
function runCalc() {
  const kg = parseFloat(calc.kg.value), shade = parseFloat(calc.shade.value), lr = parseFloat(calc.lr.value);
  const price = parseFloat(calc.price.value), batches = parseInt(calc.batches.value) || 1;
  const err = $t("calcErr");
  if (!(kg > 0) || !(shade > 0) || !(lr > 0)) { err.textContent = "Enter fabric weight, shade % and liquor ratio (all above zero)."; out.hidden = true; return; }
  err.textContent = "";
  const total = kg * batches;
  const dyeKg = total * shade / 100;
  const water = total * lr;
  const dyeTxt = dyeKg < 1 ? fmt(dyeKg * 1000, 0) + " g" : fmt(dyeKg, 2) + " kg";
  $t("rDye").textContent = dyeTxt;
  $t("rFab").textContent = fmt(total, 1) + " kg";
  $t("rWater").textContent = fmt(water, 0) + " L";
  $t("rCost").textContent = price > 0 ? "₹ " + fmt(dyeKg * price, 0) : "Add price to see";
  const msg = `Dye requirement: ${dyeTxt} for ${fmt(total, 1)} kg material at ${shade}% shade (liquor ratio 1:${lr}). Please quote and advise suitable dye.`;
  $t("calcQuote").href = "contact.html?msg=" + encodeURIComponent(msg);
  out.hidden = false;
}
calc.addEventListener("submit", e => { e.preventDefault(); runCalc(); });
calc.addEventListener("input", () => { if (!out.hidden) runCalc(); });

/* ---- Dye finder ---- */
const MAT = {
  wool:   { fam: "Acid Dyes", why: "Acid dyes are the standard choice for protein fibres like wool.", p: ["Acid Red F2R", "Acid Fast Red A", "Acid Yellow 2GLN", "Acid Fast Yellow 3RL"] },
  silk:   { fam: "Acid Dyes", why: "Acid dyes give bright shades on silk.", p: ["Acid Red Pink B", "Acid Red F2R", "Acid Yellow GL", "Acid Yellow 2GLN"] },
  nylon:  { fam: "Acid Dyes", why: "Nylon (polyamide) is commonly dyed with acid dyes.", p: ["Acid Red F2R", "Acid Fast Red A", "Acid Fast Yellow 3RL"] },
  leather:{ fam: "Acid Dyes", why: "Acid dyes are widely used for leather colouring.", p: ["Acid Fast Red A", "Acid Fast Yellow 3RL", "Black Dye"] },
  cotton: { fam: "Direct Dyes", why: "Direct dyes colour cellulosic fibres like cotton without a separate mordant step.", p: ["Red Chemical Dye", "Orange Chemical Dye", "Black Dye", "Blue Chemical Dye"] },
  viscose:{ fam: "Direct Dyes", why: "Direct dyes suit viscose and other cellulosic fibres.", p: ["Red Chemical Dye", "Orange Chemical Dye", "Vibrant Dye"] },
  paper:  { fam: "Direct Dyes", why: "Direct dyes are commonly used for paper and board.", p: ["Orange Chemical Dye", "Red Chemical Dye", "Yellow Chemical Dye", "Magenta Chemical Dye"] },
  polyester:{ no: true, why: "Polyester is normally dyed with disperse dyes, which are not in our current catalogue." },
  acrylic:  { no: true, why: "Acrylic is normally dyed with basic (cationic) dyes, which are not in our current catalogue." }
};
const find = $t("find"), mOut = $t("matchOut");
function runFind() {
  const m = MAT[find.mat.value];
  if (!m) { mOut.hidden = true; return; }
  if (m.no) {
    mOut.className = "match no";
    mOut.innerHTML = `<h3>Not our range</h3><p>${m.why} Ask us anyway — we may be able to help or point you in the right direction.</p><a class="btn btn-navy" href="contact.html">Ask our team</a>`;
  } else {
    mOut.className = "match";
    mOut.innerHTML = `<h3>${m.fam}</h3><p>${m.why}</p><div class="tags">${m.p.map(x => `<a href="contact.html?product=${encodeURIComponent(x)}">${x}</a>`).join("")}</div><a class="btn btn-amber" href="contact.html?product=${encodeURIComponent(m.p[0])}">Request price</a>`;
  }
  mOut.hidden = false;
}
find.addEventListener("change", runFind);
