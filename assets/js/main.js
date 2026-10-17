/* ---- EDIT THESE: your real contact details ---- */
const CONTACT = {
  phone: "919327094416",                    // WhatsApp number, international format, digits only
  email: "darshandyechem@gmail.com",        // every website enquiry is emailed here
  ccEmail: "patelarchit2572000@gmail.com"   // receives a copy of every enquiry
};
const ENQUIRY_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* mobile menu */
const mb = $("#menuBtn"), menu = $("#menu");
if (mb) {
  mb.addEventListener("click", () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
}

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

/* enquiry form: validates, emails the enquiry to the team, then confirms on the page.
   If sending fails, the visitor gets a WhatsApp link with the enquiry already typed in. */
const form = $("#enq");
if (form) {
  const out = $("#formMsg");
  const submitBtn = $('button[type="submit"]', form);
  const params = new URLSearchParams(location.search);
  if (params.get("product") && form.product) form.product.value = params.get("product");
  if (params.get("msg") && form.msg) form.msg.value = params.get("msg");

  const REQUIRED = [
    ["name", "Please enter your name."],
    ["email", "Please enter a valid email, for example name@company.com."],
    ["msg", "Please describe what you need."]
  ];

  /* shows an inline error per field; focuses the first invalid one */
  const validate = () => {
    let firstInvalid = null;
    REQUIRED.forEach(([id, message]) => {
      const field = form[id];
      const invalid = !field.value.trim() || (id === "email" && !field.validity.valid);
      $("#e-" + id).textContent = invalid ? message : "";
      field.setAttribute("aria-invalid", invalid);
      if (invalid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  const whatsappLink = text => {
    const a = document.createElement("a");
    a.href = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(text)}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Chat on WhatsApp";
    return a;
  };
  const setStatus = (message, link) => { out.textContent = message; if (link) out.append(" ", link); };

  /* resolves true only when the email service confirms delivery */
  const sendEnquiry = async d => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: d.name, company: d.company, email: d.email, phone: d.phone, product: d.product, message: d.msg,
          _subject: "New dye enquiry from the Darshan Dye-Chem website",
          _cc: CONTACT.ccEmail,
          _template: "table",
          _captcha: "false"
        }),
        signal: controller.signal
      });
      const data = await res.json().catch(() => ({}));
      return res.ok && String(data.success) === "true";
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!validate()) return;
    const d = Object.fromEntries(new FormData(form));
    if (d._honey) return; // hidden spam-trap field was filled in: a bot, not a visitor

    const text = `Enquiry for Darshan Dye-Chem\nName: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nProduct: ${d.product}\nRequirement: ${d.msg}`;
    const label = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    const sent = await sendEnquiry(d);
    submitBtn.disabled = false;
    submitBtn.textContent = label;

    if (sent) {
      form.reset();
      setStatus("Thank you. Your enquiry has been sent and our team will contact you soon.", whatsappLink(text));
    } else {
      setStatus("Sorry, we could not send your enquiry. Please send it on WhatsApp or call us.", whatsappLink(text));
    }
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

/* hero slideshow: fades between background images automatically; off for reduced motion.
   Slides after the first keep their image in data-bg and load once the page has finished loading. */
(function () {
  const wrap = $(".hero-slides");
  if (!wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const slides = $$(".hs", wrap);
  const INTERVAL = 5000;
  let current = 0, timer = null;

  const loadImages = () => slides.forEach(s => {
    if (s.dataset.bg) { s.style.backgroundImage = `url(${s.dataset.bg})`; delete s.dataset.bg; }
  });
  const show = n => {
    current = n % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === current));
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), INTERVAL); };

  if (document.readyState === "complete") loadImages(); else addEventListener("load", loadImages, { once: true });
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : start());
  start();
})();
