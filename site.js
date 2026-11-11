const previews = {
  ascension: ["Ascension", "Entrenamiento y seguimiento"],
  loopdeck: ["LoopDeck", "Estudio y repetición espaciada"],
  porrapp: ["PorrApp", "Ligas, predicciones y partidas"],
  portfolio: ["Portfolio Tracker", "Vigilancia y registro de cartera"],
};

const previewLinks = [...document.querySelectorAll("[data-preview]")];
const heroStage = document.querySelector(".hero-devices");
const previewLabel = document.querySelector(".preview-label");

previewLinks.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    const id = link.dataset.preview;
    const project = document.querySelector(`[data-project="${id}"]`);
    heroStage.replaceChildren(
      ...[...project.querySelectorAll(".screen-link")].map((screen) => {
        const clone = screen.cloneNode(true);
        clone.querySelector("img").loading = "eager";
        return clone;
      }),
    );
    previewLabel.replaceChildren(
      document.createTextNode(`${previews[id][0]} `),
    );
    const detail = document.createElement("span");
    detail.textContent = previews[id][1];
    previewLabel.append(detail);
    document.querySelector(".preview-count").textContent = `0${index + 1} / 04`;
    previewLinks.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "true");
  });
});

const gallery = document.querySelector(".gallery");
const galleryImage = gallery.querySelector(".gallery-image");
let currentScreens = [];
let currentIndex = 0;
let galleryOpener;

function showScreen(index) {
  currentIndex = (index + currentScreens.length) % currentScreens.length;
  const screen = currentScreens[currentIndex];
  galleryImage.src = screen.href;
  galleryImage.alt = screen.querySelector("img").alt;
  document.querySelector("#gallery-title").textContent = screen.dataset.caption;
  document.querySelector("#gallery-project").textContent =
    previews[screen.dataset.gallery][0];
  gallery.querySelector(".gallery-position").textContent =
    `${currentIndex + 1} / ${currentScreens.length}`;
}

document.addEventListener("click", (event) => {
  const screen = event.target.closest("a[data-gallery]");
  if (
    !screen ||
    typeof gallery.showModal !== "function" ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  currentScreens = [
    ...document.querySelectorAll(
      `[data-project="${screen.dataset.gallery}"] .screen-link`,
    ),
  ];
  galleryOpener = screen;
  showScreen(currentScreens.findIndex((item) => item.href === screen.href));
  gallery.showModal();
  document.body.classList.add("gallery-open");
  gallery.querySelector(".gallery-close").focus();
});

gallery
  .querySelector(".gallery-close")
  .addEventListener("click", () => gallery.close());
gallery
  .querySelector(".gallery-prev")
  .addEventListener("click", () => showScreen(currentIndex - 1));
gallery
  .querySelector(".gallery-next")
  .addEventListener("click", () => showScreen(currentIndex + 1));
gallery.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showScreen(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
gallery.addEventListener("click", (event) => {
  if (event.target !== gallery) return;
  const bounds = gallery.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    gallery.close();
});
gallery.addEventListener("close", () => {
  document.body.classList.remove("gallery-open");
  galleryOpener?.focus({ preventScroll: true });
});
