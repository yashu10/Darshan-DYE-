/* ---- EDIT THESE: your real contact details ---- */
const CONTACT = {
  email: "",   // e.g. "info@yourdomain.com"
  phone: "919327094416"    // international format, digits only
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* mobile menu */
const mb = $("#menuBtn"), menu = $("#menu");
if (mb) {
  mb.addEventListener("click", () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
}

/* contact links */
const showPhone = p => p.replace(/^(\d{2})(\d{5})(\d{5})$/, "+$1 $2 $3");
$$("[data-phone]").forEach(a => { if (CONTACT.phone) { a.textContent = showPhone(CONTACT.phone); a.href = "tel:+" + CONTACT.phone; } });
$$("[data-mail]").forEach(a => { if (CONTACT.email) { a.textContent = CONTACT.email; a.href = "mailto:" + CONTACT.email; } });

/* reveal on scroll */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 })
  : null;
$$(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

/* product filter */
$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
  const f = chip.dataset.f;
  $$(".pcard").forEach(c => c.classList.toggle("hide", f !== "all" && c.dataset.c !== f));
}));

/* enquiry form: validates, then opens WhatsApp or email with the details */
const form = $("#enq");
if (form) {
  const out = $("#formMsg");
  const pre = new URLSearchParams(location.search).get("product");
  const qs = new URLSearchParams(location.search);
  if (pre && form.product) form.product.value = pre;
  if (qs.get("msg") && form.msg) form.msg.value = qs.get("msg");
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    [["name", "Please enter your name."], ["email", "Please enter a valid email, for example name@company.com."], ["msg", "Please describe what you need."]].forEach(([id, m]) => {
      const f = form[id], err = $("#e-" + id);
      const bad = !f.value.trim() || (id === "email" && !f.validity.valid);
      err.textContent = bad ? m : ""; f.setAttribute("aria-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { $('[aria-invalid="true"]', form).focus(); return; }
    const d = Object.fromEntries(new FormData(form));
    const text = `Enquiry for Darshan Dye-Chem\nName: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nProduct: ${d.product}\nRequirement: ${d.msg}`;
    if (CONTACT.phone) window.open("https://wa.me/" + CONTACT.phone + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    else if (CONTACT.email) location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Dye enquiry") + "&body=" + encodeURIComponent(text);
    else { out.textContent = "The form works, but no phone or email is set yet. Add them in assets/js/main.js (CONTACT block)."; return; }
    out.textContent = "Thank you. Your message is ready to send in the app that just opened.";
  });
}

/* timeline: line draws as you scroll, number counts up */
const tline = $(".line");
if (tline) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const upd = () => {
    const r = tline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    tline.style.setProperty("--p", (p * 100).toFixed(1));
  };
  if (!reduce) { addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd(); }
  const num = $("[data-count]");
  if (num && !reduce && "IntersectionObserver" in window) {
    const target = +num.dataset.count; num.textContent = "0";
    new IntersectionObserver((es, o) => es.forEach(x => {
      if (!x.isIntersecting) return; o.disconnect();
      const t0 = performance.now(), dur = 1600;
      const tick = t => { const k = Math.min(1, (t - t0) / dur); num.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }), { threshold: .6 }).observe(num);
  }
}

/* hero slideshow: fades between background images automatically; off for reduced motion */
(function () {
  const wrap = $(".hero-slides");
  if (!wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const slides = $$(".hs", wrap);
  let i = 0, timer = null;
  const start = () => { clearInterval(timer); timer = setInterval(() => { i = (i + 1) % slides.length; slides.forEach((s, k) => s.classList.toggle("on", k === i)); }, 5000); };
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : start());
  start();
})();
