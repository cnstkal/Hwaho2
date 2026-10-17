/* Shared app launch animation: observe every app's existing visible/open state. */
(() => {
  const ids = ["cal-app","pho-app","msg-app","tel-app","saf-app","kko-app","ig-app","clk-app","x-app","et-app","gp-app","sp-app","fm-app","yt-app","nf-app","dg-app","bm-app","am-app","notes-app","nt-app"];
  const roots = ids.map(id => document.getElementById(id)).filter(Boolean);
  const wasActive = new WeakMap();
  const timers = new WeakMap();
  const active = el => {
    const c = el.classList;
    if (el.id === "notes-app") return c.contains("on");
    return c.contains("show") || c.contains("open") || c.contains("on") || c.contains("active");
  };
  const animate = el => {
    if (!el.isConnected) return;
    clearTimeout(timers.get(el));
    el.classList.remove("hwaho-launching");
    void el.offsetWidth;
    el.classList.add("hwaho-launching");
    const finish = e => {
      if (e.target !== el || e.animationName !== "hwahoFrommStyleLaunch") return;
      el.classList.remove("hwaho-launching");
      el.removeEventListener("animationend", finish);
    };
    el.addEventListener("animationend", finish);
    timers.set(el, setTimeout(() => {
      el.classList.remove("hwaho-launching");
      el.removeEventListener("animationend", finish);
    }, 650));
  };
  const check = el => {
    const now = active(el), before = wasActive.get(el) || false;
    if (now && !before) animate(el);
    wasActive.set(el, now);
  };
  roots.forEach(el => {
    wasActive.set(el, active(el));
    new MutationObserver(() => check(el)).observe(el, { attributes: true, attributeFilter: ["class", "style", "aria-hidden"] });
  });
  document.addEventListener("app:close", () => {
    roots.forEach(el => {
      el.classList.remove("hwaho-launching");
      wasActive.set(el, false);
    });
  });
})();