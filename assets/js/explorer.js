(function () {
  const D = (window.DYES || []).map(r => ({
    id: r[0], fam: r[1], name: r[2], ci: r[3], l: r[4], w: r[5], p: r[6], m: r[7], c05: r[8], c20: r[9], page: r[10], grp: r[11]
  }));
  const grid = document.getElementById("exGrid");
  if (!grid || !D.length) return;

  const $ = id => document.getElementById(id);
  const q = $("exQ"), light = $("exLight"), count = $("exCount"), more = $("exMore"), empty = $("exEmpty");
  const FAMS = { all: "All dyes", acid: "Acid dyes", direct: "Direct dyes" };
  const GROUPS = ["Yellow", "Orange", "Red & Pink", "Violet", "Blue", "Green", "Brown", "Black & Grey"];
  const state = { fam: "all", grp: "all", q: "", light: 0, shown: 48 };
  const PAGE = 48;

  const lum = hex => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)); };
  const ink = hex => lum(hex) > 150 ? "#111" : "#fff";
  const lead = v => { const m = String(v).match(/^\d/); return m ? +m[0] : 0; };
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  D.forEach(d => { d.key = norm(d.name + " " + d.ci); d.lightN = lead(d.l); });
  const dash = v => v === "-" ? "–" : v;

  /* chips */
  const famBox = $("exFam"), grpBox = $("exGrp");
  Object.entries(FAMS).forEach(([k, label]) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "xchip"; b.dataset.k = k; b.textContent = label;
    b.setAttribute("aria-pressed", k === state.fam);
    b.onclick = () => { state.fam = k; state.shown = PAGE; sync(); render(); };
    famBox.appendChild(b);
  });
  ["all"].concat(GROUPS).forEach(g => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "xchip"; b.dataset.k = g;
    const dot = g === "all" ? "" : `<i class="gdot" style="background:${dotColor(g)}"></i>`;
    b.innerHTML = dot + (g === "all" ? "All colours" : g);
    b.setAttribute("aria-pressed", g === state.grp);
    b.onclick = () => { state.grp = g; state.shown = PAGE; sync(); render(); };
    grpBox.appendChild(b);
  });
  function dotColor(g) {
    return { "Yellow": "#f6c90e", "Orange": "#f2711c", "Red & Pink": "#d62839", "Violet": "#7b2cbf", "Blue": "#2b59ff", "Green": "#1aa26b", "Brown": "#7a4a2b", "Black & Grey": "#222" }[g];
  }
  function sync() {
    famBox.querySelectorAll(".xchip").forEach(c => c.setAttribute("aria-pressed", c.dataset.k === state.fam));
    grpBox.querySelectorAll(".xchip").forEach(c => c.setAttribute("aria-pressed", c.dataset.k === state.grp));
  }

  /* filtering */
  function list() {
    const terms = norm(state.q).split(" ").filter(Boolean);
    return D.filter(d =>
      (state.fam === "all" || d.fam === state.fam) &&
      (state.grp === "all" || d.grp === state.grp) &&
      (!state.light || d.lightN >= state.light) &&
      terms.every(t => d.key.includes(t)));
  }

  function card(d) {
    return `<button type="button" class="dye" data-id="${d.id}" aria-label="${d.name}, ${d.ci || "mix"}. Open details">
      <span class="dye-sw">
        <i style="background:${d.c05};color:${ink(d.c05)}"><em>0.5%</em></i>
        <i style="background:${d.c20};color:${ink(d.c20)}"><em>2.0%</em></i>
      </span>
      <span class="dye-b">
        <span class="dye-fam ${d.fam}">${d.fam === "acid" ? "Acid" : "Direct"}</span>
        <b>${d.name}</b>
        <small>${d.ci || "&nbsp;"}</small>
        <span class="dye-r"><span title="Light fastness">L ${dash(d.l)}</span><span title="Washing fastness">W ${dash(d.w)}</span><span title="Perspiration fastness">P ${dash(d.p)}</span></span>
      </span>
    </button>`;
  }

  function render() {
    const all = list();
    const part = all.slice(0, state.shown);
    grid.innerHTML = part.map(card).join("");
    count.textContent = `Showing ${part.length} of ${all.length} shade${all.length === 1 ? "" : "s"}`;
    more.hidden = all.length <= part.length;
    empty.hidden = all.length !== 0;
  }

  q.addEventListener("input", () => { state.q = q.value; state.shown = PAGE; render(); });
  light.addEventListener("change", () => { state.light = +light.value; state.shown = PAGE; render(); });
  more.addEventListener("click", () => { state.shown += PAGE; render(); });
  $("exReset").addEventListener("click", () => { state.fam = "all"; state.grp = "all"; state.q = ""; state.light = 0; state.shown = PAGE; q.value = ""; light.value = "0"; sync(); render(); });

  /* detail dialog */
  const dlg = $("exDlg"), body = $("exDlgBody");
  let lastFocus = null;
  function bar(v, max) {
    const n = parseFloat(String(v).replace("-", ".").split(".")[0]);
    const m = String(v).match(/^(\d)(?:-(\d))?$/);
    if (!m || +m[1] > max) return "";
    const val = m[2] ? (+m[1] + +m[2]) / 2 : +m[1];
    return `<span class="bar"><span style="width:${Math.min(100, val / max * 100)}%"></span></span>`;
  }
  function open(id) {
    const d = D.find(x => x.id === id); if (!d) return;
    lastFocus = document.activeElement;
    const msg = `Please send price and a sample for ${d.name}${d.ci ? " (" + d.ci + ")" : ""} from your ${d.fam === "acid" ? "Acid" : "Direct"} Dyes shade card.`;
    body.innerHTML = `
      <div class="dlg-sw">
        <div style="background:${d.c05};color:${ink(d.c05)}"><span>0.5%</span></div>
        <div style="background:${d.c20};color:${ink(d.c20)}"><span>2.0%</span></div>
      </div>
      <span class="dye-fam ${d.fam}">${d.fam === "acid" ? "Acid dye · shade on nylon" : "Direct dye · shade on cotton"}</span>
      <h3 id="exDlgTitle">${d.name}</h3>
      <p class="dlg-ci">${d.ci ? "C.I. generic name: <b>" + d.ci + "</b>" : "Mixed / matching shade"}</p>
      <table class="dlg-t"><caption class="sr-only">Fastness ratings</caption>
        <tbody>
          <tr><th scope="row">Light</th><td>${dash(d.l)}</td><td>${bar(d.l, 8)}</td></tr>
          <tr><th scope="row">Washing</th><td>${dash(d.w)}</td><td>${bar(d.w, 5)}</td></tr>
          <tr><th scope="row">Perspiration</th><td>${dash(d.p)}</td><td>${bar(d.p, 5)}</td></tr>
          <tr><th scope="row">Milling</th><td>${dash(d.m)}</td><td>${bar(d.m, 5)}</td></tr>
        </tbody>
      </table>
      <p class="sc-note">Ratings are as printed on our shade card (page ${d.page}). Colours are scanned and may differ slightly on screen. Request a sample to confirm the shade.</p>
      <div class="dlg-act">
        <a class="btn btn-amber" href="contact.html?msg=${encodeURIComponent(msg)}">Request price &amp; sample</a>
        <a class="btn btn-navy" href="assets/downloads/darshan-${d.fam}-dyes-shade-card.pdf#page=${d.page + 1}" target="_blank" rel="noopener">See on shade card</a>
      </div>`;
    if (!dlg.open) dlg.showModal();
  }
  grid.addEventListener("click", e => { const b = e.target.closest(".dye"); if (b) open(+b.dataset.id); });
  $("exDlgClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); });

  /* initial filters from URL: ?f=acid|direct&c=Blue */
  const sp = new URLSearchParams(location.search);
  if (FAMS[sp.get("f")]) state.fam = sp.get("f");
  if (GROUPS.includes(sp.get("c"))) state.grp = sp.get("c");
  sync(); render();
})();
