/* ===== home.js (integrated) ===== */
/**
 * 홈 화면 설정 — 아이콘/배경 교체는 이 파일만 수정하면 됩니다.
 *
 * 아이콘 이미지로 교체: 앱 항목에 `img: "icons/kakaotalk.png"` 추가 (정사각형 PNG, 모서리는 자동 마스킹).
 * 배경 이미지로 교체: WALLPAPER 에 "url(wallpapers/bg.jpg)" 지정.
 */
window.WALLPAPER = ""; // 예: "url(wallpapers/bg.jpg)" — 비워 두면 기본 그라데이션

const g = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="60" height="60" fill="url(#${id})"/>`;

window.APPS = {
  // 홈 그리드 (위→아래, 왼→오)
  grid: [
    { id: "calendar", label: "캘린더", dynamic: "calendar" },
    { id: "photos", label: "사진", img: "images/app/Photos/photos.svg", svg:
      `<rect width="60" height="60" fill="#fff"/><g style="mix-blend-mode:multiply"><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#ffcc00"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#ff9500" transform="rotate(45 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#ff3b30" transform="rotate(90 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#ff2d92" transform="rotate(135 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#af52de" transform="rotate(180 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#007aff" transform="rotate(225 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#32ade6" transform="rotate(270 30 30)"/><ellipse cx="30" cy="19" rx="6.500" ry="11" fill="#34c759" transform="rotate(315 30 30)"/></g>` },
    { id: "messages", label: "메시지", img: "images/app/iMessage/ios-message.svg", svg:
      g("ms", "#62e86f", "#12b52b") +
      `<path d="M30 15c-9.400 0-17 6.100-17 13.700 0 4.300 2.400 8.100 6.200 10.600-.4 2-1.500 4-3 5.700 3.200-.2 6-1.400 8-3 1.800.5 3.800.7 5.800.7 9.400 0 17-6.100 17-13.700S39.400 15 30 15z" fill="#fff"/>` },
    { id: "instagram", label: "Instagram", img: "images/app/Instagram/IMG_7148.png", svg:
      `<defs><radialGradient id="ig" cx=".3" cy="1.05" r="1.2"><stop offset="0" stop-color="#fdf497"/><stop offset=".12" stop-color="#fdf497"/><stop offset=".4" stop-color="#fd5949"/><stop offset=".65" stop-color="#d6249f"/><stop offset="1" stop-color="#285AEB"/></radialGradient></defs><rect width="60" height="60" fill="url(#ig)"/>` +
      `<rect x="15" y="15" width="30" height="30" rx="9" fill="none" stroke="#fff" stroke-width="3"/><circle cx="30" cy="30" r="7" fill="none" stroke="#fff" stroke-width="3"/><circle cx="38.5" cy="21.5" r="2" fill="#fff"/>` },
    { id: "x", label: "X", img: "images/app/Twitter/IMG_7154.jpeg", svg:
      `<rect width="60" height="60" fill="#000"/><path d="M17 16h8.5l6.200 8.600L39 16h4l-9.200 10.600L44 44h-8.500l-6.700-9.300L20.800 44h-4l9.800-11.300z" fill="#fff"/><path d="M24 19.500l16 21" stroke="#000" stroke-width="2" fill="none"/>` },
    { id: "everytime", label: "에브리타임", img: "images/app/Everytime/IMG_7145.png", svg:
      g("ev", "#ff4b3a", "#d9251a") +
      `<path d="M16 20a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H29l-8 7v-7h-1a4 4 0 0 1-4-4z" fill="#fff"/><path d="M23 26h14M23 32h9" stroke="#e8321f" stroke-width="2.6" stroke-linecap="round"/>` },
    { id: "chatgpt", label: "ChatGPT", img: "images/app/ChatGPT/IMG_7156.png", svg:
      `<rect width="60" height="60" fill="#10a37f"/><g fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M30 14l12 7v14M30 46l-12-7V25M18 25l12-7"/><path d="M30 14l-12 7v10M18 39l12 7 12-7M42 21v10" opacity=".0"/><circle cx="30" cy="30" r="6.500"/><path d="M30 14v9.500M42 21l-8.200 4.800M42 39l-8.200-4.800M30 46v-9.500M18 39l8.200-4.800M18 21l8.200 4.800"/></g>` },
    { id: "spotify", label: "Spotify", img: "images/app/Spotify/IMG_7153.jpeg", svg:
      `<rect width="60" height="60" fill="#000"/><circle cx="30" cy="30" r="19" fill="#1ed760"/><g fill="none" stroke="#000" stroke-linecap="round"><path d="M19.5 25c8.500-2.700 18-2 24 2" stroke-width="3.400"/><path d="M21 31.500c7-1.900 14.500-1.200 19.500 1.800" stroke-width="3"/><path d="M22.500 37.500c5.200-1.200 10.500-.8 14.500 1.400" stroke-width="2.600"/></g>` },
    { id: "fromm", label: "fromm(아티용)", img: "images/app/Fromm/IMG_7146.png", svg:
      `<defs><linearGradient id="fmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff86ab"/><stop offset="1" stop-color="#7a5cff"/></linearGradient></defs><rect width="60" height="60" fill="url(#fmg)"/><path d="M16 22a7 7 0 0 1 7-7h14a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H29l-8 7v-7a7 7 0 0 1-5-6.700z" fill="#fff"/><path d="M30 35c-5-3.500-7.500-6-7.500-9a4 4 0 0 1 7.500-1.800A4 4 0 0 1 37.500 26c0 3-2.500 5.500-7.500 9z" fill="#ff5a8a"/>` },
    { id: "youtube", label: "YouTube", img: "images/app/YouTube/IMG_7155.png", svg:
      `<rect width="60" height="60" fill="#fff"/><rect x="7" y="15" width="46" height="32" rx="10" fill="#f00"/><path d="M25 23v16l14-8z" fill="#fff"/>` },
    { id: "netflix", label: "Netflix", img: "images/app/Netflix/IMG_7152.png", svg:
      `<rect width="60" height="60" fill="#000"/><path d="M20 12h6v36h-6zM34 12h6v36h-6z" fill="#b20710"/><path d="M20 12h6l14 36h-6z" fill="#e50914"/>` },
    { id: "danggeun", label: "당근", img: "images/app/Karrot/IMG_7150.png", svg: `<svg viewBox="0 0 60 60" width="100%" height="100%"><rect width="60" height="60" fill="#ff6f0f"/><path d="M30 20c-9 0-15 6-15 14s6 12 15 12 15-4 15-12-6-14-15-14z" fill="#fff"/><path d="M30 20c-1-5-4-8-8-9 1 4 4 7 8 9zM30 20c1-5 4-8 8-9-1 4-4 7-8 9z" fill="#fff"/></svg>` },
    { id: "albamon", label: "알바몬", img: "images/app/Albamon/IMG_7144.png", svg:
      `<rect width="60" height="60" fill="#ff5a1f"/><text x="30" y="37" text-anchor="middle" font-size="19" font-weight="900" fill="#fff" font-family="sans-serif">알바몬</text><circle cx="44" cy="15" r="3" fill="#ffd23f"/>` },
    { id: "notes", label: "메모", img: "images/app/Notes/notes.svg", svg:
      `<rect width="60" height="60" fill="#fff"/><rect width="60" height="17" fill="#ffcc00"/><g stroke="#d1d1d6" stroke-width="1.6" stroke-linecap="round"><path d="M11 27h38M11 36h38M11 45h24"/></g>` },
    { id: "clock", label: "시계", img: "images/app/Clock/clock.svg", svg:
      `<rect width="60" height="60" fill="#000"/><circle cx="30" cy="30" r="24" fill="#fff"/><g stroke="#000" stroke-linecap="round"><path d="M30 9.500v3M30 47.500v3M9.500 30h3M47.500 30h3" stroke-width="2"/><path d="M40.250 12.250l-1.500 2.600M49.750 21.750l-2.600 1.500M49.750 38.250l-2.600-1.500M40.250 47.750l-1.500-2.600M19.750 47.750l1.500-2.600M10.250 38.250l2.600-1.500M10.250 21.750l2.600 1.500M19.750 12.250l1.500 2.600" stroke-width="1"/><path d="M30 30V17.500" stroke-width="3"/><path d="M30 30l8 4.500" stroke-width="3"/></g><path d="M30 38V13" stroke="#ff9500" stroke-width="1.200" stroke-linecap="round" transform="rotate(130 30 30)"/><circle cx="30" cy="30" r="2" fill="#ff9500"/>` },
  ],
  // 하단 독
  dock: [
    { id: "phone", label: "전화", img: "", svg:
      g("ph", "#6cf27f", "#17b934") +
      `<path d="M0 0h60v28H0z" fill="#fff" opacity=".07"/><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#fff" transform="translate(12.2 12.2) scale(1.48)"/>` },
    { id: "safari", label: "Safari", img: "images/app/Safari/safari.svg", svg:
      g("sf", "#ffffff", "#e5e5ea") +
      `<circle cx="30" cy="30" r="20" fill="#0a84ff"/><circle cx="30" cy="30" r="20" fill="none" stroke="#fff" stroke-width="1.200" opacity=".7"/><path d="M30 12v3M30 45v3M12 30h3M45 30h3" stroke="#fff" stroke-width="1.400" stroke-linecap="round"/><path d="M37.500 22.500L33 33l-10.500 4.500L27 27z" fill="#ff3b30"/><path d="M22.500 37.500L27 27l6 6z" fill="#fff"/>` },
    { id: "kakaotalk", label: "카카오톡", img: "images/app/KakaoTalk/IMG_7149.png", svg:
      `<rect width="60" height="60" fill="#FEE500"/><ellipse cx="30" cy="28.500" rx="15" ry="12.500" fill="#2b1d1d"/><path d="M23 37l-3 7 8-4.500z" fill="#2b1d1d"/><g fill="#FEE500"><path d="M24 24v9h2.400v-9zM21 24h8.400v2.200H21z"/><path d="M33 24v9h2.400v-4l4 4h3l-4.500-4.800L42 24h-2.800l-3.800 4V24z"/></g>` },
  ],
};

(() => {
  const $ = (s) => document.querySelector(s);
  const DOW = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];

  /* ---------- 확대 방지 ---------- */
  ["gesturestart","gesturechange","gestureend"].forEach(e => document.addEventListener(e, ev => ev.preventDefault(), { passive: false }));
  document.addEventListener("dblclick", e => e.preventDefault(), { passive: false });
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("touchmove", e => { if (e.touches.length > 1 || e.scale && e.scale !== 1) e.preventDefault(); }, { passive: false });

  /* ---------- 배경 ---------- */
  if (window.WALLPAPER) $("#wallpaper").style.setProperty("background", window.WALLPAPER + " center/cover no-repeat");

  /* ---------- 앱 렌더 ---------- */
  function iconInner(app) {
    if (app.img) return `<img src="${app.img}" alt="" draggable="false">`;
    if (app.dynamic === "calendar") {
      const d = new Date(2026, 9, 19);
      return `<div class="cal"><span class="dow">${DOW[d.getDay()]}</span><span class="day">${d.getDate()}</span></div>`;
    }
    return `<svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice">${app.svg}</svg>`;
  }
  function renderApps(list, mount) {
    mount.innerHTML = "";
    list.forEach(app => {
      const el = document.createElement("div");
      el.className = "app"; el.dataset.app = app.id; el.setAttribute("role", "button"); el.setAttribute("aria-label", app.label);
      el.innerHTML = `<div class="icon">${iconInner(app)}</div><span class="label">${app.label}</span>`;
      mount.appendChild(el);
    });
  }
  const render = () => { renderApps(APPS.grid, $("#grid")); renderApps(APPS.dock, $("#dock")); };
  render();

  /* ---------- 앱 열기/홈 복귀 훅 (앱 UI는 추후 구현) ---------- */

  const HOME_STATE_KEY = "hwaho-last-screen-v1";
  let closeTimer = null;
  const Home = {
    current: null,
    openApp(id) {
      if (!id || Home.current === id) return;
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      // Clear any stale invisible app layers left behind by a previous home-indicator gesture.
      document.querySelectorAll("#screen [id$='-app']").forEach(app => {
        app.style.pointerEvents = "";
        if (app.getAttribute("aria-hidden") === "true") app.removeAttribute("aria-hidden");
        app.style.display = "";
      });
      const h = $("#home");
      h.style.display = "";
      h.style.pointerEvents = "";
      Home.current = id;
      try { localStorage.setItem(HOME_STATE_KEY, id); } catch (_) {}
      document.dispatchEvent(new CustomEvent("app:open", { detail: { id } }));
      if (id === "instagram" && window.IgApp) window.IgApp.open();
    },
    goHome() {
      if (closeTimer) return;
      const had = Home.current; Home.current = null;
      try { localStorage.removeItem(HOME_STATE_KEY); } catch (_) {}
      document.dispatchEvent(new CustomEvent("app:close", { detail: { id: had } }));
      const h = $("#home");
      h.style.display = "flex";
      h.style.opacity = "1";
      h.style.transform = "none";
      h.style.pointerEvents = "auto";
      h.classList.remove("returning"); void h.offsetWidth; h.classList.add("returning");
      // After the closing animation, fully deactivate every app layer so it cannot block later taps.
      closeTimer = setTimeout(() => {
        closeTimer = null;
        if (Home.current !== null) return;
        document.querySelectorAll("#screen [id$='-app']").forEach(app => {
          app.classList.remove("open", "show", "on", "active", "opening", "in-app");
          app.setAttribute("aria-hidden", "true");
          app.style.pointerEvents = "none";
          app.style.display = "none";
        });
        h.style.display = "flex";
        h.style.pointerEvents = "auto";
      }, 460);
    },
    refresh: render,
  };
  window.Home = Home;

  /* ---------- 아이콘 터치 피드백 / 탭 ---------- */
  let pressed = null, moved = false, sx = 0, sy = 0;
  document.addEventListener("pointerdown", e => {
    const a = e.target.closest(".app"); if (!a) return;
    pressed = a; moved = false; sx = e.clientX; sy = e.clientY; a.classList.add("pressed");
  });
  document.addEventListener("pointermove", e => {
    if (pressed && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) { moved = true; pressed.classList.remove("pressed"); }
  });
  const release = e => {
    if (!pressed) return;
    const a = pressed; pressed = null; a.classList.remove("pressed");
    if (!moved && e.type === "pointerup") Home.openApp(a.dataset.app);
  };
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);

  /* ---------- 가벼운 홈 인디케이터: 위로 쓸면 홈으로 ---------- */
  const homeZone = $("#home-indicator-zone");
  let homeTouch = null;
  homeZone.addEventListener("pointerdown", e => {
    homeTouch = { y: e.clientY, x: e.clientX, id: e.pointerId };
    try { homeZone.setPointerCapture(e.pointerId); } catch (_) {}
  });
  homeZone.addEventListener("pointerup", e => {
    if (!homeTouch) return;
    const dy = homeTouch.y - e.clientY;
    const dx = Math.abs(homeTouch.x - e.clientX);
    const distance = Math.hypot(dx, dy);
    homeTouch = null;
    if (!Home.current) return;
    // 탭하면 즉시 홈으로, 위로 쓸어도 홈으로
    if (distance < 14 || (dy > 18 && dy > dx * 0.8)) Home.goHome();
  });
  homeZone.addEventListener("pointercancel", () => { homeTouch = null; });
  homeZone.addEventListener("click", e => { if (Home.current) { e.preventDefault(); e.stopPropagation(); Home.goHome(); } });
  /* 하단 인디케이터가 앱 레이어에 가려져도 문서 캡처 단계에서 홈 복귀 처리 */
  let lastHomeAction = 0;
  const homeFromBottomGesture = e => {
    if (!e.isTrusted) return;
    const p = e.changedTouches ? e.changedTouches[0] : e;
    if (!p) return;
    const r = $("#screen").getBoundingClientRect();
    const x = p.clientX - r.left, y = p.clientY - r.top;
    const nearIndicator = y >= r.height - 34 && Math.abs(x - r.width / 2) <= 75;
    if (!nearIndicator || Date.now() - lastHomeAction < 500) return;
    lastHomeAction = Date.now();
    // Home.current가 비어 있어도 모든 앱에 app:close를 보내 강제로 홈 복귀
    Home.goHome();
    document.querySelectorAll("#screen [id$='-app']").forEach(app => {
      app.classList.remove("on", "active", "opening");
      if (app.id !== "home") app.style.display = "none";
    });
    $("#home").style.display = "flex";
    $("#home").style.opacity = "1";
    $("#home").style.transform = "none";
    $("#home").style.pointerEvents = "auto";
  };
  document.addEventListener("pointerup", homeFromBottomGesture, true);
  document.addEventListener("touchend", homeFromBottomGesture, { capture: true, passive: true });

  /* ---------- 시계 ---------- */
  let lastDay = 19;
  function tick() {
    const now = new Date();
    const d = new Date(2026, 9, 19, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    $("#clock").textContent = `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
    if (d.getDate() !== lastDay) { lastDay = d.getDate(); render(); }
    setTimeout(tick, 60000 - d.getSeconds() * 1000 - d.getMilliseconds() + 20);
  }
  tick();

  /* ---------- 배터리 ---------- */
  const bat = { level: 1, charging: false, linked: false }, batBox = document.querySelector(".sb-battery");
  const paintBat = () => {
    const p = Math.round(bat.level * 100);
    $("#bat-level").style.width = Math.max(8, p) + "%";
    batBox.classList.toggle("low", p <= 20 && !bat.charging);
    batBox.classList.toggle("charging", bat.charging);
    batBox.setAttribute("aria-label", bat.linked
      ? "배터리 " + p + "%" + (bat.charging ? ", 충전 중" : "")
      : "배터리 상태는 이 브라우저에서 연동할 수 없음");
    batBox.dataset.linked = bat.linked ? "true" : "false";
  };
  Home.battery = { get: () => ({ level: bat.level, charging: bat.charging, linked: bat.linked }) };
  paintBat();
  // Battery Status API가 지원되는 브라우저에서만 실제 기기 배터리와 연동합니다.
  // 지원되지 않으면 충전 아이콘을 탭해서 가짜로 바뀌게 하지 않습니다.
  if (typeof navigator.getBattery === "function") {
    navigator.getBattery().then(b => {
      const up = () => {
        bat.level = b.level;
        bat.charging = b.charging;
        bat.linked = true;
        paintBat();
      };
      up();
      b.addEventListener("levelchange", up);
      b.addEventListener("chargingchange", up);
    }).catch(() => { bat.linked = false; paintBat(); });
  }
})();
