// Capa de movimiento progresiva: sin JavaScript o con movimiento reducido la
// página se ve completa y estática. Todo lo que se oculta aquí lo marca este
// mismo script antes de animarlo.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches || !root.classList.contains("motion")) {
    root.classList.remove("motion");
    return;
  }
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Divide un título con <br> en líneas enmascaradas que suben al aparecer.
  function splitLines(heading) {
    const lines = [[]];
    const push = (node) => lines.at(-1).push(node);
    heading.childNodes.forEach((node) => {
      if (node.nodeName === "BR") return lines.push([]);
      if (node.nodeType === 1 && node.querySelector("br")) {
        node.childNodes.forEach((child) => {
          if (child.nodeName === "BR") return lines.push([]);
          const wrapper = node.cloneNode(false);
          wrapper.append(child.cloneNode(true));
          push(wrapper);
        });
        return;
      }
      push(node.cloneNode(true));
    });
    heading.replaceChildren(
      ...lines
        .filter((parts) => parts.some((part) => part.textContent.trim()))
        .map((parts, index) => {
          const line = document.createElement("span");
          line.className = "line";
          const inner = document.createElement("span");
          inner.className = "line-inner";
          inner.style.setProperty("--i", index);
          inner.append(...parts);
          line.append(inner);
          return line;
        }),
    );
    heading.classList.add("split");
  }

  document
    .querySelectorAll("main h2, .project h3")
    .forEach((heading) => splitLines(heading));

  // Aparición al hacer scroll, con un pequeño escalonado entre hermanos.
  const groups = [
    ".section-heading > *",
    ".project-heading",
    ".project-copy > *",
    ".project-visual",
    ".about-intro",
    ".about-copy > *",
    ".work-principles > div",
    ".contact-layout > *",
    ".source-note",
  ];
  const revealables = [];
  groups.forEach((selector) => {
    let previousParent;
    let step = 0;
    document.querySelectorAll(selector).forEach((element) => {
      step = element.parentElement === previousParent ? step + 1 : 0;
      previousParent = element.parentElement;
      element.dataset.reveal = "";
      element.style.setProperty("--d", `${Math.min(step, 5) * 80}ms`);
      revealables.push(element);
    });
  });
  document.querySelectorAll(".split").forEach((heading) => {
    if (!heading.closest("[data-reveal]")) revealables.push(heading);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  revealables.forEach((element) => revealObserver.observe(element));

  // Banda de tecnologías en bucle: la copia es decorativa.
  const strip = document.querySelector(".tech-strip .section-wrap");
  if (strip) {
    const track = document.createElement("div");
    track.className = "marquee-track";
    const original = document.createElement("div");
    original.className = "marquee-group";
    original.append(...strip.childNodes);
    const copies = [1, 2, 3].map(() => {
      const copy = original.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      return copy;
    });
    track.append(original, ...copies);
    strip.append(track);
    strip.classList.add("marquee");
  }

  // Barra de progreso de lectura y parallax de los móviles de cada proyecto.
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const stages = [...document.querySelectorAll(".project .device-stage")];
  const speeds = { "phone-1": 0.07, "phone-2": -0.05, "phone-3": 0.11 };
  let ticking = false;

  function onScroll() {
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    stages.forEach((stage) => {
      const box = stage.getBoundingClientRect();
      if (box.bottom < -200 || box.top > innerHeight + 200) return;
      const offset = box.top + box.height / 2 - innerHeight / 2;
      stage.querySelectorAll(".phone").forEach((phone) => {
        const key = [...phone.classList].find((name) => name in speeds);
        phone.style.translate = `0 ${(offset * speeds[key]).toFixed(1)}px`;
      });
    });
    ticking = false;
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  addEventListener("resize", onScroll, { passive: true });
  onScroll();

  // Al cambiar de proyecto en la portada, los móviles entran escalonados.
  const heroStage = document.querySelector(".hero-devices");
  new MutationObserver(() => {
    heroStage.classList.remove("is-switching");
    void heroStage.offsetWidth;
    heroStage.classList.add("is-switching");
  }).observe(heroStage, { childList: true });

  if (!finePointer) return;

  // Inclinación 3D de la portada siguiendo al puntero.
  const heroPreview = document.querySelector(".hero-preview");
  heroPreview.addEventListener("pointermove", (event) => {
    const box = heroPreview.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    heroStage.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    heroStage.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
  });
  heroPreview.addEventListener("pointerleave", () => {
    heroStage.style.setProperty("--tilt-x", "0deg");
    heroStage.style.setProperty("--tilt-y", "0deg");
  });

  // Foco de luz que sigue al puntero dentro de cada proyecto.
  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("pointermove", (event) => {
      const box = project.getBoundingClientRect();
      project.style.setProperty("--mx", `${event.clientX - box.left}px`);
      project.style.setProperty("--my", `${event.clientY - box.top}px`);
    });
  });

  // Botones magnéticos: se desplazan levemente hacia el puntero.
  document.querySelectorAll(".button, .nav-contact").forEach((button) => {
    button.classList.add("magnetic");
    button.addEventListener("pointermove", (event) => {
      const box = button.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      button.style.translate = `${(x * 0.18).toFixed(1)}px ${(y * 0.3).toFixed(1)}px`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.translate = "";
    });
  });
})();
