/* Photo gallery lightbox: any <a data-lb href="photo.jpg" data-cap="Caption"> opens in a full-screen viewer. */
(function () {
  const links = [...document.querySelectorAll("a[data-lb]")];
  if (!links.length) return;

  const dlg = document.createElement("dialog");
  dlg.className = "lb2";
  dlg.setAttribute("aria-label", "Photo viewer");
  dlg.innerHTML = `
    <button type="button" class="lb2-x" aria-label="Close">&times;</button>
    <button type="button" class="lb2-n lb2-prev" aria-label="Previous photo">&#8592;</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button type="button" class="lb2-n lb2-next" aria-label="Next photo">&#8594;</button>`;
  document.body.appendChild(dlg);

  const img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption");
  let i = 0, opener = null;

  function show(n) {
    i = (n + links.length) % links.length;
    const a = links[i];
    img.src = a.href;
    img.alt = a.dataset.alt || a.dataset.cap || "";
    cap.textContent = `${a.dataset.cap || ""}  ·  ${i + 1} / ${links.length}`;
    const nxt = new Image(); nxt.src = links[(i + 1) % links.length].href;
  }

  links.forEach((a, k) => a.addEventListener("click", e => {
    e.preventDefault();
    opener = a; show(k);
    if (!dlg.open) dlg.showModal();
  }));
  dlg.querySelector(".lb2-x").addEventListener("click", () => dlg.close());
  dlg.querySelector(".lb2-prev").addEventListener("click", () => show(i - 1));
  dlg.querySelector(".lb2-next").addEventListener("click", () => show(i + 1));
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
  dlg.addEventListener("close", () => { if (opener) opener.focus(); });
})();
