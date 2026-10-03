(function () {
  const SETS = {
    acid:   { name: "Acid Dyes",   n: 10, base: "assets/shadecards/acid-",   cover: "assets/shadecards/acid-cover.jpg",   sub: "Shade on nylon at 0.5% and 2.0%" },
    direct: { name: "Direct Dyes", n: 6,  base: "assets/shadecards/direct-", cover: "assets/shadecards/direct-cover.jpg", sub: "Shade on cotton at 0.5% and 2.0%" }
  };
  const $ = s => document.querySelector(s);
  const main = $("#scImg"), count = $("#scCount"), thumbs = $("#scThumbs"), prev = $("#scPrev"), next = $("#scNext"),
        sub = $("#scSub"), cover = $("#scCover"), req = $("#scReq"), title = $("#scTitle");
  if (!main) return;
  let key = "acid", page = 1;

  function show() {
    const s = SETS[key];
    main.src = s.base + page + ".jpg";
    main.alt = `${s.name} shade card, page ${page} of ${s.n}`;
    count.textContent = `Page ${page} of ${s.n}`;
    prev.disabled = page === 1;
    next.disabled = page === s.n;
    [...thumbs.children].forEach((b, i) => b.setAttribute("aria-current", i + 1 === page));
  }

  function load(k) {
    key = k; page = 1;
    const s = SETS[k];
    title.textContent = s.name + " shade card";
    sub.textContent = s.sub;
    cover.src = s.cover;
    cover.alt = "Darshan Dye Chem " + s.name + " shade card cover";
    req.href = "contact.html?msg=" + encodeURIComponent("Please send me the " + s.name + " shade card / sample details.");
    thumbs.innerHTML = Array.from({ length: s.n }, (_, i) =>
      `<button type="button" aria-label="Go to page ${i + 1}"><img src="${s.base}${i + 1}.jpg" alt="" loading="lazy"></button>`).join("");
    [...thumbs.children].forEach((b, i) => b.addEventListener("click", () => { page = i + 1; show(); }));
    document.querySelectorAll(".sc-tab").forEach(t => t.setAttribute("aria-selected", t.dataset.k === k));
    show();
  }

  document.querySelectorAll(".sc-tab").forEach(t => t.addEventListener("click", () => load(t.dataset.k)));
  prev.addEventListener("click", () => { if (page > 1) { page--; show(); } });
  next.addEventListener("click", () => { if (page < SETS[key].n) { page++; show(); } });

  /* full-screen viewer with zoom */
  const lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  function openLb() {
    lbImg.src = main.src; lbImg.alt = main.alt;
    lbCap.textContent = SETS[key].name + " · " + count.textContent;
    lb.classList.add("open"); lb.classList.remove("zoom");
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    $("#scOpen").focus();
  }
  $("#scOpen").addEventListener("click", openLb);
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbZoom").addEventListener("click", () => lb.classList.toggle("zoom"));
  lbImg.addEventListener("click", () => lb.classList.toggle("zoom"));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb-scroll")) closeLb(); });
  addEventListener("keydown", e => {
    if (lb.classList.contains("open")) { if (e.key === "Escape") closeLb(); return; }
    if (!$("#shadecards").matches(":hover, :focus-within")) return;
    if (e.key === "ArrowRight") next.click();
    if (e.key === "ArrowLeft") prev.click();
  });

  window.ShadeCard = {
    goto(k, p) { if (!SETS[k]) return; load(k); page = Math.min(Math.max(1, p), SETS[k].n); show(); }
  };

  load("acid");
})();
