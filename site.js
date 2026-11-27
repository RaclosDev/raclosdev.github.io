// Portada: datos de los proyectos, demo viva incrustada y selector de color.
// El diseño (baraja.js) se registra con LAB.add({ name, bg, fonts, css, mob, raw, render, on }).
// Demo viva de cada app: [producción, servidor local].
const LIVE = {
  ascension: ["https://ascension.raclos.es/demo/dashboard", "http://localhost:5302/demo/dashboard"],
  loopdeck: ["https://loopdeck.raclos.es/demo", "http://localhost:5303/demo"],
  porrapp: ["https://porrapp.app/demo", "http://localhost:5301/demo"],
  portfolio: ["https://cartera.raclos.es/demo?vista=watchlist&tema=oscuro", "http://localhost:5304/demo?vista=watchlist&tema=oscuro"],
};
// Demos con dos caras que se eligen con un conmutador encima del dispositivo: [etiqueta, LIVE, solo en web].
// El entrenador entra directamente en la ficha de una atleta; su panel aún no está pensado para móvil.
const MODES = {
  ascension: [["Atleta", LIVE.ascension], ["Entrenador", ["https://ascension.raclos.es/demo/entrenador/atletas/tour-lucia", "http://localhost:5302/demo/entrenador/atletas/tour-lucia"], true]],
};
const D = {
  me: {
    name: "Carlos Sanz Tomero",
    role: "Ingeniero backend · Java y Spring Boot",
    city: "Madrid",
    tagline: "Backend con Java y Spring Boot, de la API al último clic.",
    bio: "Llevo cada producto de principio a fin: modelo de datos, API, pruebas, despliegue y la interfaz en React y TypeScript. Estas cuatro aplicaciones las he diseñado, construido y desplegado yo, y puedes probarlas sin registro.",
    skills: ["Java", "Spring Boot", "PostgreSQL", "React", "TypeScript"],
    mail: "raclosdev@gmail.com",
    github: "https://github.com/RaclosDev",
    linkedin: "https://www.linkedin.com/in/carlos-sanz-tomero/",
    cv: "assets/CV_Carlos_Sanz_Tomero.pdf",
  },
  apps: [
    {
      id: "portfolio", name: "Portfolio Tracker", cat: "Inversión y cartera", color: "#f0a800", wide: true,
      claim: "De cada operación a la cartera completa.",
      desc: "Acciones, ETF y fondos: tu cartera, en directo.",
      feats: ["Watchlist con niveles de compra, el PER a cada nivel y avisos en el móvil", "Tu cartera real a partir de tus operaciones: compras, ventas, dividendos, scrip, splits, traspasos…", "Calculadora de la renta con lotes FIFO, compensación de pérdidas y regla antiaplicación", "Exposición real empresa a empresa, desglosando fondos y ETF", "Velas en múltiples temporalidades, indicadores, herramientas de dibujo y tus niveles de compra en el gráfico"],
      stack: ["Java 21", "Spring Boot 4.1", "React 19", "TypeScript", "PostgreSQL"],
      demo: "https://cartera.raclos.es/demo", code: "https://github.com/RaclosDev/portfolio-tracker",
      shots: ["watchlist", "summary", "positions"],
    },
    {
      id: "ascension", name: "Ascension", cat: "Entreno, nutrición y entrenadores", color: "#e8452c",
      claim: "Del gimnasio a la cocina, y del atleta a su entrenador.",
      desc: "Para atletas y entrenadores: entrenos, comidas y progreso.",
      feats: ["Modo entrenador: atletas, programas y pautas nutricionales con versiones, y seguimientos semanales", "Planifica tu entreno o apúntalo sobre la marcha, con descansos avisados, historial y récords", "Comidas y macros a partir de una foto del plato, una descripción, el código de barras o la etiqueta", "Powerlifting: competiciones, bloques, intentos y control de cargas con RPE y RIR", "Seguimiento de peso, calorías, pasos y fatiga muscular"],
      stack: ["Java 21", "Spring Boot 4.1", "React 19", "TypeScript", "PostgreSQL"],
      demo: "https://ascension.raclos.es/demo", code: "https://github.com/RaclosDev/ascension-tracker",
      shots: ["workout", "nutrition", "coach"],
    },
    {
      id: "porrapp", name: "PorrApp", cat: "Ligas con amigos", color: "#12a150",
      claim: "Del pronóstico del domingo a la partida del jueves.",
      desc: "Porras, torneos, póker y juegos de mesa.",
      feats: ["Porras de fútbol, NBA, F1, UFC, tenis, LoL y más, con resultados oficiales sincronizados y puntos al momento", "Compite por jornadas, cuadro completo, eliminatorias, superviviente o Grandes Premios", "Ligas de póker con reloj de ciegas, modo TV, recompras, premios, pagos y estadísticas con ROI y rachas", "Torneos propios en liga o eliminatoria, con enlace o QR para seguirlos sin registro", "Resultados y clasificación en directo, y en cuanto empieza cada partido, ves qué ha elegido cada uno"],
      stack: ["Java 21", "Spring Boot 4.1", "React 19", "PostgreSQL", "WebSocket"],
      demo: "https://porrapp.app/demo", code: "https://github.com/RaclosDev/porrApp",
      shots: ["league", "ranking", "bracket"],
    },
    {
      id: "loopdeck", name: "LoopDeck", cat: "Estudio y repaso", color: "#2f6bff",
      claim: "Estudiar hoy. Recordarlo después.",
      desc: "Mazos, apuntes y tests con repaso espaciado.",
      feats: ["Repetición espaciada con FSRS-5: valoras cuánto recuerdas y cada tarjeta vuelve cuando toca", "Tarjetas en masa con IA: de una lista de términos a un mazo con sus definiciones", "Tutor con IA que responde sobre el contenido de cada mazo", "Varias formas de estudiar: guía, recorrido libre, práctica por bloques y tests de cuatro opciones", "Tarjetas reversibles o con huecos, con imágenes, etiquetas y apuntes DOCX vinculados"],
      stack: ["Java 21", "Spring Boot 4.1", "React 19", "TypeScript", "PostgreSQL"],
      demo: "https://loopdeck.raclos.es/demo", code: "https://github.com/RaclosDev/loopdeck",
      shots: ["decks", "hub", "study"],
    },
  ],
};
D.apps.forEach((a, i) => {
  a.n = String(i + 1).padStart(2, "0");
  a.icon = `assets/icons/${a.id}.webp`;
  a.shots = a.shots.map((s) => `assets/screens/${a.id}-${s}.webp`);
  a.shot = a.shots[0];
  a.arch = a.code + "/blob/main/docs/arquitectura.md";
  a.host = a.demo.replace("https://", "");
  a.ink = a.id === "portfolio" ? "#1d1500" : "#fff";
  a.live = LIVE[a.id];
  a.native = !!a.wide; // vista con la que nace: móvil en todas menos Portfolio Tracker
  a.wide = a.native;
});

// Atajos de marcado compartidos.
const T = 'target="_blank" rel="noopener"';
const MAIL = "mailto:" + D.me.mail;
const btns = (a, l = ["Abrir la demo ↗", "Código", "Arquitectura y decisiones"]) =>
  `<a href="${a.demo}" ${T}>${l[0]}</a><a href="${a.code}" ${T}>${l[1]}</a><a href="${a.arch}" ${T}>${l[2]}</a>`;
const contact = () =>
  `<a href="${MAIL}">${ico("M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z")}Hablemos</a><a href="${D.me.cv}" download>${ico("M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z")}Descargar CV</a><a href="${D.me.github}" ${T} aria-label="GitHub">${ico("M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3")}<span>GitHub</span></a><a href="${D.me.linkedin}" ${T} aria-label="LinkedIn">${ico("M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1M7.1 20.5H3.6V9h3.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0")}<span>LinkedIn</span></a>`;
const ico = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${d}"/></svg>`;
// Un solo color de acento por diseño (accent: [color, tinta]); ya no depende del proyecto.
let AC = ["#888", "#fff"];
const accent = (d) => (AC = d.accent || ["#888", "#fff"]);
const cv = () => `style="--c:${AC[0]};--ci:${AC[1]}"`;
const feats = (a) => `<ul class="ft">${a.feats.map((f) => `<li>${f}</li>`).join("")}</ul>`;
const stack = (a) => `<ul class="st">${a.stack.map((s) => `<li>${s}</li>`).join("")}</ul>`;
const info = (a, l) =>
  `<p class="k"><b>${a.n}</b><span>${a.cat}</span></p><h2>${a.name}<i class="dt">.</i></h2><p class="ds">${a.desc}</p>${feats(a)}${stack(a)}<p class="bt">${btns(a, l)}</p>`;
// Dispositivo con la demo viva. La captura solo se usa en pantallas pequeñas, donde no cabe un iframe.
// Selector Móvil/Web de un proyecto; puede ir dentro del escenario o en otro sitio del diseño.
const vw = (a) => {
  const v = `<div class="vw" data-app="${a.id}" role="group" aria-label="Vista de la demo de ${a.name}"><button data-vw="ph" aria-pressed="${!a.wide}" title="Ver en móvil">Móvil</button><button data-vw="lap" aria-pressed="${!!a.wide}" title="Ver en web">Web</button></div>`;
  const m = MODES[a.id];
  return m
    ? `<div class="vws"><div class="vw" data-md-app="${a.id}" role="group" aria-label="Cara de la demo de ${a.name}">${m.map(([l], k) => `<button data-md="${k}" aria-pressed="${k === (a.md || 0)}">${l}</button>`).join("")}</div>${v}</div>`
    : v;
};
// Cara de la demo (Ascension: atleta o entrenador): cambia la dirección del iframe y del enlace «Abrir la demo».
const mode = (root, id, k) => {
  const a = D.apps.find((x) => x.id === id);
  if ((a.md || 0) === k) return;
  a.md = k;
  a.live = MODES[id][k][1];
  // Las caras que aún no están pensadas para móvil se ven siempre en web.
  if (MODES[id][k][2] && !a.wide) view(root, id, true);
  root.querySelectorAll(`[data-md-app="${id}"] [data-md]`).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.md === k));
  root.querySelectorAll(`.dm[data-app="${id}"]`).forEach((fig) => {
    fig.querySelector(".op").href = a.live[0].replace(/\/dashboard$/, "");
    const f = fig.querySelector("iframe");
    if (!f) return;
    fig.classList.remove("live", "off", "used");
    f.src = a.live[HERE ? 1 : 0];
    setTimeout(() => fig.classList.contains("live") || fig.classList.add("off"), 12000);
  });
};
const demo = (a, i, tg = true) =>
  `<div class="stage"${i == null ? "" : ` data-sl="${i}" ${cv(a)}`}>${tg ? vw(a) : ""}<div class="fr"><figure class="dm ${a.wide ? "lap" : "ph"}${a.wide !== a.native ? " alt" : ""}" data-app="${a.id}"><div class="scr">${CAN.matches ? `<p class="ld"><i></i>Cargando la demo…</p>` : `<img src="${a.shot}" alt="Captura de ${a.name}">`}<a class="op" href="${a.demo}" ${T}>Abrir la demo ↗</a>${CAN.matches ? HINT : ""}</div></figure></div></div>`;
// Aviso de que la demo se usa aquí: un toque que se pasea por la pantalla y una etiqueta.
const HINT = `<span class="touch" aria-hidden="true"></span><span class="hint" aria-hidden="true">Demo real: haz clic y navega</span>`;
const each = (fn) => D.apps.map(fn).join("");
const slide = (a, i, inner) => `<article class="sl${a.wide ? " w" : ""}" data-sl="${i}" ${cv(a)}>${inner}</article>`;
const std = (l, out) => each((a, i) => slide(a, i, `<div class="tx">${info(a, l)}${out ? vw(a) : ""}</div>${demo(a, null, !out)}`));
const tabs = (fn) =>
  `<nav class="nav" aria-label="Proyectos">${each((a, i) => `<button data-go="${i}" style="--a:${AC[0]};--ai:${AC[1]}">${fn ? fn(a, i) : a.name}</button>`)}</nav>`;
const head = (x = "") =>
  `<header class="top"><h1 class="me"><b>${D.me.name}</b><span>${D.me.role} · ${D.me.city}</span></h1>${x}<nav class="ct">${contact()}</nav></header>`;
// En localhost las demos de producción no se dejan incrustar (CSP): se usan los servidores locales si están arrancados.
const HERE = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
const CAN = matchMedia("(min-width: 760px) and (min-height: 440px)");
const probes = {};
const probe = (u) =>
  (probes[u] ??= !HERE ? Promise.resolve(true) : fetch(u, { mode: "no-cors", signal: AbortSignal.timeout(3000) }).then(() => true, () => false));
const fit = (fig) => fig.style.setProperty("--k", fig.firstElementChild.clientWidth / (fig.classList.contains("lap") ? 1440 : 402));
const RO = new ResizeObserver((es) => es.forEach((e) => fit(e.target.parentElement)));
// Devuelve una promesa que se cumple cuando la demo ha cargado (o se ha dado por perdida).
const live = (fig) => {
  if (fig.dataset.on || !CAN.matches) return fig.ready;
  fig.dataset.on = 1;
  const a = D.apps.find((x) => x.id === fig.dataset.app);
  const u = a.live[HERE ? 1 : 0];
  return (fig.ready = probe(u).then((ok) => new Promise((done) => {
    if (!fig.isConnected) return done();
    if (!ok) return fig.classList.add("off"), done();
    const f = document.createElement("iframe");
    f.title = "Demo de " + a.name;
    f.allow = "clipboard-write";
    f.src = u;
    f.onload = () => (fig.classList.add("live"), done());
    // Si tarda demasiado, se ofrece abrirla aparte (y si al final carga, el aviso se va solo).
    setTimeout(() => (fig.classList.contains("live") || fig.classList.add("off"), done()), 12000);
    fig.firstElementChild.append(f);
    RO.observe(fig.firstElementChild);
    fit(fig);
  })));
};

// Vista de la demo de un proyecto: móvil o web. Se guarda en el proyecto, así que se mantiene al cambiar de diseño.
const view = (root, id, wide) => {
  const a = D.apps.find((x) => x.id === id);
  if (!wide && MODES[id]?.[a.md]?.[2]) mode(root, id, 0);
  a.wide = wide;
  root.querySelectorAll(`.dm[data-app="${id}"]`).forEach((fig) => {
    fig.classList.toggle("lap", wide);
    fig.classList.toggle("ph", !wide);
    fig.classList.toggle("alt", wide !== a.native);
    fig.classList.remove("used");
    fig.closest(".sl")?.classList.toggle("w", wide);
    if (fig.dataset.on) fit(fig);
  });
  root.querySelectorAll(`.vw[data-app="${id}"] [data-vw]`).forEach((b) => b.setAttribute("aria-pressed", (b.dataset.vw === "lap") === wide));
  if (D.apps[+root.dataset.cur] === a) root.classList.toggle("wide", wide);
};

// Proyecto activo: [data-go] cambia, [data-sl] recibe .on / .pre, y la raíz lleva el color.
const sel = (root, signal, cb) => {
  const n = D.apps.length;
  let cur = -1;
  const go = (i) => {
    i = ((i % n) + n) % n;
    if (i === cur) return;
    const prev = cur;
    cur = i;
    const a = D.apps[i];
    root.dataset.cur = i;
    root.classList.toggle("wide", !!a.wide);
    root.style.setProperty("--c", AC[0]);
    root.style.setProperty("--ci", AC[1]);
    root.querySelectorAll("[data-go]").forEach((b) => {
      const on = +b.dataset.go === i;
      b.classList.toggle("on", on);
      if (b.tagName === "BUTTON" && !isNaN(+b.dataset.go)) b.setAttribute("aria-pressed", on);
    });
    root.querySelectorAll("[data-sl]").forEach((s) => {
      const k = +s.dataset.sl;
      s.classList.toggle("on", k === i);
      s.classList.toggle("pre", k < i);
      s.style.setProperty("--r", (k - i + n) % n);
      s.style.setProperty("--d", k - i);
    });
    root.querySelectorAll("[data-t]").forEach((el) => (el.textContent = a[el.dataset.t]));
    root.querySelectorAll(`.dm[data-app="${a.id}"]`).forEach((fig) => (fig.classList.remove("used"), live(fig)));
    cb?.(root, i, prev);
  };
  root.addEventListener("pointerover", (e) => e.target.closest(".dm.live")?.classList.add("used"), { signal });
  let px = 0, py = 0;
  root.addEventListener("pointerdown", (e) => ((px = e.clientX), (py = e.clientY)), { signal });
  root.addEventListener("click", (e) => {
    const v = e.target.closest("[data-vw]");
    if (v) return view(root, v.closest(".vw").dataset.app, v.dataset.vw === "lap");
    const md = e.target.closest("[data-md]");
    if (md) return mode(root, md.closest(".vw").dataset.mdApp, +md.dataset.md);
    if (e.target.closest("a")) return;
    const g = e.target.closest("[data-go]")?.dataset.go;
    // Arrastrar o seleccionar texto en la ficha no pasa de proyecto; un clic sin moverse, sí.
    if (g === "+" && (Math.hypot(e.clientX - px, e.clientY - py) > 6 || String(getSelection()).trim())) return;
    if (g != null) go(g === "+" ? cur + 1 : g === "-" ? cur - 1 : +g);
  }, { signal });
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") go(cur + 1);
    if (e.key === "ArrowUp") go(cur - 1);
  }, { signal });
  go(0);
  // Cuando la demo visible ha cargado, las demás se cargan por detrás, una tras otra: al cambiar de proyecto ya están listas.
  [...root.querySelectorAll(".dm")].reduce(
    (prev, fig) => prev.then(() => signal?.aborted || live(fig)),
    Promise.resolve(root.querySelector(".dm[data-on]")?.ready),
  );
};

// Estilo de partida (dentro de #root): cada diseño lo pisa. MOB va al final y recoloca en móvil.
const BASE = `&{height:100dvh;overflow:hidden;position:relative;display:grid;grid-template-rows:auto minmax(0,1fr);gap:clamp(10px,2.2vh,24px);padding:clamp(14px,2.4vh,26px) clamp(16px,2.6vw,40px);font:400 15px/1.4 system-ui,sans-serif;--c:#888;--ci:#fff}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;min-width:0}
.me{display:flex;gap:10px;align-items:baseline;font-size:14px;font-weight:400;white-space:nowrap}
.me span{color:color-mix(in srgb,currentColor 62%,transparent)}
.ct{display:flex;gap:4px;font-size:13px;font-weight:600;white-space:nowrap}
.ct a{padding:.55em .9em;border-radius:999px;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.ct svg{width:14px;height:14px;flex:none}
.ct a:hover{background:color-mix(in srgb,currentColor 12%,transparent)}
.ct a:first-child{background:var(--c);color:var(--ci);transition:background .4s}
.nav{display:flex;gap:4px}
.nav button{all:unset;box-sizing:border-box;cursor:pointer;padding:.55em 1em;border-radius:999px;font-size:13.5px;font-weight:600;white-space:nowrap;color:color-mix(in srgb,currentColor 65%,transparent);transition:background .3s,color .3s}
.nav button:hover{color:inherit}
.nav button.on{background:var(--a);color:var(--ai)}
:focus-visible{outline:2px solid var(--c);outline-offset:2px}
.sl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:clamp(16px,3vw,48px);align-items:center}
.sl.w{grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}
.stage{width:100%;height:100%}
.tx{display:flex;flex-direction:column;gap:clamp(6px,1.5vh,14px);min-width:0}
.k{display:flex;gap:.7em;font-size:12px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:color-mix(in srgb,currentColor 62%,transparent)}
h2{font-size:clamp(30px,4.2vh + 1.5vw,64px);line-height:1;letter-spacing:-.025em;font-weight:700}
.cl{font-size:clamp(15px,1.3vh + .55vw,21px);font-weight:600;line-height:1.25}
.ds{font-size:clamp(13px,.9vh + .5vw,16px);line-height:1.45;max-width:54ch;color:color-mix(in srgb,currentColor 76%,transparent)}
.ft{display:grid;gap:clamp(3px,.9vh,9px);font-size:clamp(12.5px,.8vh + .46vw,15px);line-height:1.35;max-width:56ch}
.ft li{position:relative;padding-left:1.25em}
.ft li::before{content:"";position:absolute;left:.1em;top:.48em;width:.42em;height:.42em;border-radius:50%;background:var(--c)}
.st{display:flex;flex-wrap:wrap;gap:5px;font-size:11.5px;font-weight:600}
.st li{padding:.3em .7em;border-radius:999px;border:1px solid color-mix(in srgb,currentColor 28%,transparent)}
.bt{display:flex;flex-wrap:wrap;gap:8px;margin-top:clamp(2px,.8vh,8px);font-size:13.5px;font-weight:700}
.bt a{padding:.7em 1.15em;border-radius:999px;text-decoration:none;border:1px solid color-mix(in srgb,currentColor 28%,transparent);white-space:nowrap}
.bt a:first-child{background:var(--c);color:var(--ci);border-color:transparent}
@media (max-width:1400px){.top:has(.nav) .me span{display:none}}
@media (max-width:1320px){.ct a{padding:.5em .6em}}
@media (max-width:1180px){.top:has(.nav) .ct a:nth-child(n+3) span,.w .st,&.wide .st{display:none}.w h2,&.wide h2{font-size:clamp(24px,3vh + 1vw,44px)}}
@media (max-height:680px){.w .st,&.wide .st{display:none}}
`;
const MOB = `@media (max-width:760px){
&{display:flex;flex-direction:column;gap:10px;padding:12px}
.top{display:flex;flex-wrap:wrap;gap:8px}
.top .nav{order:3;width:100%;justify-content:space-between}
.me span,.ct a:nth-child(n+3),.ft,.st,.bt a:nth-child(3),.xm,.vw,.vws{display:none}
.nav button{padding:.5em .7em;font-size:12.5px}
.deck{flex:1}
.sl,.sl.w{display:flex;flex-direction:column;gap:10px;align-items:stretch}
.tx{flex:none;gap:6px}
.stage{flex:1;min-height:0;height:auto;width:auto}
h2{font-size:28px}
}`;

const LAB = {
  list: [],
  cur: -1,
  ctl: null,
  add(d) {
    this.list.push(d);
  },
  show(i) {
    const n = this.list.length;
    i = ((i % n) + n) % n;
    this.ctl?.abort();
    this.ctl = new AbortController();
    this.cur = i;
    const d = this.list[i];
    accent(d);
    const root = document.getElementById("root");
    document.getElementById("dfont")?.remove();
    if (d.fonts) {
      const l = document.createElement("link");
      l.id = "dfont";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=" + d.fonts + "&display=swap";
      document.head.append(l);
    }
    // El CSS de cada diseño va anidado bajo #root: no puede filtrarse a otro diseño.
    document.getElementById("dcss").textContent =
      "#root{" + BASE + d.css + MOB + (d.mob ? "@media (max-width:760px){" + d.mob + "}" : "") + "}" + (d.raw || "");
    document.body.style.background = d.bg || "";
    root.className = "d" + (i + 1);
    root.removeAttribute("style");
    root.innerHTML = d.render(D);
    d.init?.(root, D, this.ctl.signal);
    sel(root, this.ctl.signal, d.on);
  },
  start() {
    this.show(0);
  },
};
