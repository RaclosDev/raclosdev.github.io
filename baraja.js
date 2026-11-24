// El doblez de la ficha de delante crece al acercar el ratón a la esquina y vuelve con suavidad al salir.
function fold(pile) {
  pile.dataset.fx = 1;
  let f = 0, to = 0, raf = 0, on = false;
  const tick = () => {
    f += (to - f) * 0.16;
    pile.style.setProperty("--f3", f.toFixed(3));
    if (Math.abs(to - f) > 0.004) raf = requestAnimationFrame(tick);
    else if ((raf = 0), !on) pile.classList.remove("hv"), pile.style.removeProperty("--f3");
  };
  const run = () => raf || (raf = requestAnimationFrame(tick));
  pile.addEventListener("pointermove", (e) => {
    const c = e.target.closest(".cd.on");
    if (e.pointerType === "touch") return;
    if (!c) return on && ((on = false), (to = 0), run());
    const b = c.getBoundingClientRect();
    const near = Math.max(0, 1 - Math.hypot(b.right - e.clientX, e.clientY - b.top) / Math.max(b.width, b.height));
    if (!on) (on = true), (f = parseFloat(getComputedStyle(pile).getPropertyValue("--f3")) || 0), pile.classList.add("hv");
    to = 2 + near * near * 1.4;
    run();
  });
  pile.addEventListener("pointerleave", () => { on = false; to = 0; run(); });
}

// 3 · Baraja — cuatro fichas apiladas con su pestaña a la vista; la elegida pasa delante y la demo cambia.
LAB.add({
  name: "Baraja",
  bg: "#14161b",
  accent: ["#fbbf24", "#14161b"],
  fonts: "Anton&family=Space+Grotesk:wght@400;500;700",
  css: `&{font-family:"Space Grotesk",system-ui,sans-serif;color:#eceef2}
  .mn{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:clamp(16px,3vw,48px);min-height:0;transition:grid-template-columns .6s cubic-bezier(.3,.7,.2,1)}
  &.wide .mn{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}
  .pile{position:relative;min-height:0;--o:clamp(26px,5vh,40px);--x:clamp(8px,1.2vw,18px)}
  .cd{position:absolute;inset:calc(3*var(--o)) calc(3*var(--x)) 0 0;background:#f4eddd;color:#1b1a17;border-radius:16px;padding:0 clamp(16px,2vw,28px) clamp(12px,2vh,22px);display:flex;flex-direction:column;overflow:hidden;cursor:pointer;
    transform:translate(calc(var(--r)*var(--x)),calc(var(--r)*var(--o)*-1));z-index:calc(4 - var(--r));filter:brightness(calc(1 - var(--r)*.1));box-shadow:0 -8px 22px -10px #000c;transition:transform .6s cubic-bezier(.2,.7,.2,1),filter .5s}
  .cd:not(.on):hover{filter:brightness(1)}
  .tb{flex:none;height:var(--o);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;white-space:nowrap}
  .tb img{width:20px;height:20px;border-radius:5px;flex:none}.tb span{font-weight:400;opacity:.6}
  .tb .pg{margin-left:auto;padding:.3em .7em;border-radius:999px;background:#1b1a17;color:#f4eddd;opacity:1;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums;display:none}.on .tb .pg{display:block;margin-right:max(0px,calc(var(--fw) - 10px))}
  .pile{--o:clamp(34px,5.4vh,42px)}
  .cd:not(.on) .tx{pointer-events:none}
  .pile{--fw:calc(var(--o)*var(--f3)*1.14);--fh:calc(var(--o)*var(--f3));transition:--f3 .4s cubic-bezier(.3,.7,.2,1);animation:peel3 5s cubic-bezier(.4,0,.2,1) 1.2s infinite}
  .pile.hv{animation:none;transition:none}
  .cd.on{background:linear-gradient(to bottom left,#0000 calc(50% + 1px),#f4eddd calc(50% + 2.4px)) top right/var(--fw) var(--fh) no-repeat,linear-gradient(#f4eddd 0 0) left/calc(100% - var(--fw) + .5px) 100% no-repeat,linear-gradient(#f4eddd 0 0) bottom/100% calc(100% - var(--fh) + .5px) no-repeat;box-shadow:none;filter:brightness(1) drop-shadow(0 -1px 1.5px #0000002e)}
  .cd.on::before,.cd.on::after{content:"";position:absolute;right:0;top:0;width:var(--fw);height:var(--fh);pointer-events:none}
  .cd.on::before{display:none}
  .cd.on::after{border-bottom-left-radius:5px;clip-path:polygon(0 0,100% 100%,0 100%);background:linear-gradient(to bottom left,#0000 calc(50% - .75px),#1b1a1759 50%,#0000 calc(50% + .75px)),#fffcf4}
  @media (prefers-reduced-motion:reduce){.pile{animation:none}}
  .tx{flex:1;justify-content:center;min-height:0;opacity:0;transition:opacity .25s}.on .tx{opacity:1;transition-delay:.25s}
  .on .tx>*{animation:rise3 .6s cubic-bezier(.2,.7,.2,1) both}.on .tx>:nth-child(2){animation-delay:0.310s}.on .tx>:nth-child(3){animation-delay:0.355s}.on .tx>:nth-child(4){animation-delay:0.400s}.on .tx>:nth-child(5){animation-delay:0.445s}.on .tx>:nth-child(6){animation-delay:0.490s}.on .tx>:nth-child(7){animation-delay:0.535s}
  .k{display:none}h2{font-family:Anton,"Arial Narrow",sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:.01em}h2 .dt{font-style:normal;color:var(--c);transition:color .4s}
  .stage{isolation:isolate;transform:translateY(14px) scale(.94)}.stage.on{transform:none}
  .stage::before{content:"";position:absolute;inset:14% 10%;z-index:-1;border-radius:50%;background:var(--c);opacity:.35;filter:blur(70px)}`,
  raw: `@property --f3{syntax:"<number>";inherits:true;initial-value:0}@keyframes rise3{from{opacity:0;transform:translateY(10px)}}@keyframes peel3{0%,50%,100%{--f3:0}68%{--f3:2.4}78%{--f3:2.15}88%{--f3:2.15}}`,
  mob: `.mn,&.wide .mn{flex:1;display:flex;flex-direction:column;gap:10px}.pile{flex:none;height:262px;--o:26px;--x:6px}.mn .deck{flex:1;min-height:0}.cd{padding:0 14px 10px}.tb span{display:none}`,
  on: (root, i, prev) => {
    const pile = root.querySelector(".pile");
    if (!pile || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [...pile.querySelectorAll(".cd")];
    const n = cards.length;
    const T = (r, x = "") => `translate(calc(${r} * var(--x)), calc(${r} * var(--o) * -1)) ${x}`;
    if (!pile.dataset.fx) fold(pile);
    // Primera carga: las fichas se reparten de la de atrás a la de delante.
    if (prev < 0) {
      cards.forEach((c, k) => {
        const r = (k - i + n) % n;
        c.animate([{ transform: T(r, "translateY(48px) rotate(-2deg)"), opacity: 0 }, { transform: T(r), opacity: 1 }],
          { duration: 700, delay: 200 + (n - 1 - r) * 90, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
      });
      return;
    }
    // Hacia delante, las fichas de delante bajan, pasan por detrás y suben a su sitio; hacia atrás, al revés.
    const d = (i - prev + n) % n;
    const fwd = d <= n / 2;
    const out = "translate(-5%, 34%) rotate(-5deg)";
    let s = 0;
    cards.map((c, k) => [c, (k - prev + n) % n, (k - i + n) % n]).sort((a, b) => a[1] - b[1]).forEach(([c, r0, r1]) => {
      if (fwd ? r1 <= r0 : r1 >= r0) return;
      c.getAnimations().forEach((a) => a.cancel());
      c.style.transition = "filter .5s";
      const kf = fwd
        ? [{ transform: T(r0), zIndex: 9, offset: 0, easing: "cubic-bezier(.4,0,.6,1)" },
           { transform: T(r0, out), zIndex: 9, offset: .42 },
           { transform: T(r0, out), zIndex: 0, offset: .44, easing: "cubic-bezier(.3,.7,.2,1)" },
           { transform: T(r1), zIndex: 0, offset: 1 }]
        : [{ transform: T(r0), zIndex: 0, offset: 0, easing: "cubic-bezier(.4,0,.6,1)" },
           { transform: T(0, out), zIndex: 0, offset: .48 },
           { transform: T(0, out), zIndex: 9, offset: .5, easing: "cubic-bezier(.2,.8,.2,1.04)" },
           { transform: T(0), zIndex: 9, offset: 1 }];
      c.animate(kf, { duration: 820, delay: s++ * 110 }).finished.then(() => (c.style.transition = ""), () => {});
    });
  },
  render: () =>
    head(tabs()) +
    `<main class="mn"><div class="pile">${each((a, i) =>
      `<article class="cd" data-sl="${i}" data-go="${i}" ${cv(a)}><p class="tb"><img src="${a.icon}" alt=""><b>${a.name}</b><span>${a.cat}</span><span class="pg">${i + 1}/4</span></p><div class="tx" data-go="+" title="Clic para pasar al siguiente proyecto">${info(a)}</div></article>`)}</div>` +
    `<div class="deck">${each((a, i) => demo(a, i))}</div></main>`,
});
