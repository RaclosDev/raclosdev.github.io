// Cambia de proyecto (pestañas y teclado) y carga la demo real dentro del dispositivo.
(() => {
  const NAMES = {
    ascension: "Ascension",
    loopdeck: "LoopDeck",
    porrapp: "PorrApp",
    portfolio: "Portfolio Tracker",
  };
  // Tamaño real que se le da a cada demo antes de escalarla al dispositivo.
  const VIEWPORT = { phone: 402, laptop: 1040 };
  // Con ?local se cargan los servidores de desarrollo en vez de producción.
  const LOCAL = new URLSearchParams(location.search).has("local");
  // Solo con sitio para verla bien: en móvil y tableta se abre la demo a pantalla completa.
  const LIVE = matchMedia("(min-width: 1024px) and (min-height: 600px)");

  const plan = document.querySelector(".plan");
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const picks = document.querySelector(".picks");
  const stage = document.querySelector(".stage");
  const devices = new Map(
    [...document.querySelectorAll(".device")].map((d) => [d.dataset.app, d]),
  );
  const order = tabs.map((t) => t.dataset.app);
  let current = order[0];

  const fitters = new ResizeObserver((entries) => {
    for (const { target } of entries) {
      const kind = target.closest(".device").classList.contains("laptop") ? "laptop" : "phone";
      target.style.setProperty("--live-scale", String(target.clientWidth / VIEWPORT[kind]));
    }
  });

  const demoUrl = (device) =>
    LOCAL ? device.dataset.local : device.dataset.src.replace("/demo/dashboard", "/demo");

  function load(app) {
    const device = devices.get(app);
    if (!LIVE.matches || device.querySelector("iframe")) return;
    const screen = device.querySelector(".screen");
    const frame = document.createElement("iframe");
    frame.title = `Demo de ${NAMES[app]}`;
    frame.src = LOCAL ? device.dataset.local : device.dataset.src;
    frame.allow = "clipboard-write";
    frame.addEventListener("load", () => device.classList.add("is-live"), { once: true });
    screen.append(frame);
    fitters.observe(screen);
  }

  function select(app, { focus = false } = {}) {
    if (app === current) return;
    const dir = order.indexOf(app) > order.indexOf(current) ? 1 : -1;
    stage.style.setProperty("--dir", String(dir));

    const leaving = devices.get(current);
    leaving.classList.remove("is-active");
    leaving.classList.add("is-leaving");
    setTimeout(() => leaving.classList.remove("is-leaving"), 500);
    devices.get(app).classList.add("is-active");

    for (const tab of tabs) {
      const on = tab.dataset.app === app;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      if (on) {
        plan.dataset.kind = tab.dataset.kind;
        if (focus) tab.focus();
        tab.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }

    current = app;
    load(app);

    // En móvil, si ya se había bajado, el proyecto nuevo empieza desde arriba.
    const gap = plan.getBoundingClientRect().top - picks.offsetHeight;
    if (!LIVE.matches && gap < 0) window.scrollBy(0, gap);
  }

  function step(delta, opts) {
    const i = (order.indexOf(current) + delta + order.length) % order.length;
    select(order[i], opts);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => select(tab.dataset.app));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
      if (event.key in keys) {
        event.preventDefault();
        step(keys[event.key], { focus: true });
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        select(order[event.key === "Home" ? 0 : order.length - 1], { focus: true });
      }
    });
  });

  devices.forEach((device) => {
    // En móvil y tableta el propio dispositivo abre la demo.
    device.addEventListener("click", () => {
      if (!LIVE.matches) window.open(demoUrl(device), "_blank", "noopener");
    });
    // En cuanto el ratón llega a la demo, la pista del toque sobra.
    device.querySelector(".body").addEventListener(
      "pointerenter",
      () => stage.classList.add("is-used"),
      { once: true },
    );
  });

  LIVE.addEventListener("change", () => load(current));
  load(current);
  // Precarga las demás cuando la primera ya está lista, para que el cambio sea inmediato.
  setTimeout(() => order.slice(1).forEach((app, i) => setTimeout(() => load(app), i * 1500)), 2500);
})();
