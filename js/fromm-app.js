/* 프롬(Fromm) 앱 — 참고 사진 기반 신규 구현 (#fm-app, 전용 클래스: fmx-*, 화이트 테마 고정) */
(() => {
  const el = document.querySelector("#fm-app"), screen = document.querySelector("#screen");
  if (!el || el.dataset.fmxReady) return;
  el.dataset.fmxReady = "1";

  /* ---------- 데이터 ---------- */
  const G = ["linear-gradient(135deg,#caa27c,#6d4a38)", "linear-gradient(135deg,#2b2b33,#7b5a4a)", "linear-gradient(135deg,#9db7d6,#34445c)", "linear-gradient(135deg,#e6c3c3,#a56e7a)", "linear-gradient(135deg,#d9cfa5,#7e7a52)", "linear-gradient(135deg,#b9a3d6,#5a4a86)", "linear-gradient(135deg,#a7d3c4,#3f7c6c)", "linear-gradient(135deg,#f3c58c,#c0703a)"];
  const me = { n: "춘삼이", s: "", ph: 1 };
  const best = [{ n: "내 행복❤️", s: "하튜", g: G[0], hearts: "+1100" }];
  const arts = [
    { n: "애옹이", s: "🤍🪽", g: G[1] }, { n: "도동이", s: "동코리타🌱", g: G[2] }, { n: "민기", s: "", ph: 1 }, { n: "정우영", s: "🤦‍♂️", g: G[4] },
    { n: "떵화", s: "", ph: 1 }, { n: "쯍이", s: "애정하는 아티 💗💗", g: G[3] }, { n: "재현이", s: "오늘도 화이팅 ✨", g: G[5] }, { n: "하준이", s: "", g: G[6] },
    { n: "은솔", s: "🍀", g: G[7] }, { n: "유찬이", s: "밥 먹었어?", g: G[0] }, { n: "세훈이", s: "", g: G[2] }
  ];
  const live = [
    { n: "지구", g: G[0], t: "지구야 미안해", time: "오전 03:48" }, { n: "달이", g: G[7], t: "미안해", time: "오전 03:48" },
    { n: "별이", g: G[4], t: "지구야 미안해", time: "오전 03:48" }, { n: "해리", g: G[0], t: "지구야 미안해", time: "오전 03:48" }
  ];
  const room = { name: "바보", g: "radial-gradient(circle at 40% 40%,#f1c9b8,#b98a76 70%,#6b4a3e)", last: "새로운 메시지가 있습니다.", time: "오후 11:18", unread: 1, msgs: [
    { r: 1 }, { me: 1, t: "그런 기능은 없는데", time: "PM 10:51" }, { r: 1 }, { me: 1, t: "스크롤해서", time: "PM 10:51" }, { r: 1 }, { me: 1, t: "찾아야함", time: "PM 10:51" }, { r: 1 }, { me: 1, t: "나는 보통 프롬 실시간으로 하는데", time: "PM 10:52" }, { r: 1 }
  ] };
  const quick = ["안녕! 👋", "ㅋㅋㅋㅋㅋ", "보고싶다 💗", "오늘 뭐해?", "지구야 미안해", "좋아!", "잠깐만~", "사랑해 ❤️"];
  const stores = [["🧸", "아티 인형", "18,000원"], ["💿", "앨범 세트", "24,500원"], ["🎫", "포토카드", "3,000원"], ["👕", "공식 티셔츠", "32,000원"], ["🕯️", "응원봉", "39,000원"], ["📒", "다이어리", "9,900원"]];

  /* ---------- 상태 ---------- */
  let opened = false, page = "list", tab = "list", stack = [], sheet = null, prof = null, rendered = null, tt = null, showReplies = false;
  const memo = {};

  /* ---------- 유틸 / 아이콘 ---------- */
  const E = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = s => el.querySelector(s);
  const P = {
    back: '<path d="M20 12H4.500M10.500 5.500 4 12l6.500 6.500"/>', down: '<path d="m4 8.500 8 8 8-8"/>', info: '<circle cx="12" cy="12" r="9.600"/><path d="M12 7v6M12 16.200v.1" stroke-width="2.200"/>',
    menu: '<path d="M3.500 5.500h17M3.500 12h17M3.500 18.500h17"/>', plus: '<path d="M12 3.500v17M3.500 12h17"/>',
    send: '<path d="M21.500 2.800 2.800 10.800l6.400 2.600 2.600 6.500z"/><path d="m9.300 13.400 12.200-10.600" stroke="#fff" stroke-width="1.400"/>',
    cam: '<path d="M8 6.500 9.300 4h5.400L16 6.500h3.500a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><circle cx="12" cy="12.800" r="3.400" fill="#fff"/>',
    uadd: '<circle cx="10" cy="7.500" r="4"/><path d="M2.800 20.500c0-4 3.200-6.800 7.200-6.800 1.200 0 2.200.2 3.200.7"/><path d="M18 14.500v7M14.500 18h7"/>',
    gear: '<circle cx="12" cy="12" r="3.200"/><path d="M19.400 15a1.650 1.650 0 0 0 .33 1.820l.06.060a2 2 0 1 1-2.830 2.830l-.06-.06a1.650 1.650 0 0 0-1.820-.33 1.650 1.650 0 0 0-1 1.510V21a2 2 0 1 1-4 0v-.09A1.650 1.650 0 0 0 9 19.400a1.650 1.650 0 0 0-1.820.33l-.06.060a2 2 0 1 1-2.830-2.830l.06-.06a1.650 1.650 0 0 0 .33-1.820 1.650 1.650 0 0 0-1.510-1H3a2 2 0 1 1 0-4h.09A1.650 1.650 0 0 0 4.600 9a1.650 1.650 0 0 0-.33-1.820l-.06-.06a2 2 0 1 1 2.830-2.830l.06.06a1.650 1.650 0 0 0 1.820.33H9a1.650 1.650 0 0 0 1-1.510V3a2 2 0 1 1 4 0v.09a1.650 1.650 0 0 0 1 1.510 1.650 1.650 0 0 0 1.820-.33l.06-.06a2 2 0 1 1 2.830 2.830l-.06.06a1.650 1.650 0 0 0-.33 1.820V9a1.650 1.650 0 0 0 1.510 1H21a2 2 0 1 1 0 4h-.09a1.650 1.650 0 0 0-1.510 1z"/>',
    chev: '<path d="m9.500 5 7 7-7 7"/>'
  };
  const ic = (n, s = 24, w = 1.8, f = 0) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f ? "currentColor" : "none"}" stroke="${f ? "none" : "currentColor"}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
  const heart = (s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 21.500S2.500 15.600 2.500 8.800A5.200 5.200 0 0 1 12 6.200a5.200 5.200 0 0 1 9.500 2.600c0 6.800-9.500 12.700-9.500 12.700z" fill="#f03a3a"/></svg>`;
  const NAV = {
    list: on => on ? '<circle cx="12" cy="12" r="10" fill="#3a3a40" stroke="none"/><path d="m12 6.600 1.600 3.500 3.800.4-2.800 2.600.8 3.800-3.400-1.900-3.400 1.900.8-3.800-2.800-2.600 3.800-.4z" fill="#fff" stroke="none"/>' : '<path d="m12 3.500 2.600 5.400 5.900.7-4.300 4.100 1.100 5.800-5.300-2.900-5.300 2.900 1.100-5.800-4.300-4.100 5.900-.7z"/>',
    chat: on => '<path d="M12 3.200c-5 0-9 3.300-9 7.500 0 2.300 1.200 4.300 3.100 5.700L5.300 21l4.300-2.300c.8.200 1.600.3 2.400.3 5 0 9-3.300 9-7.500s-4-7.500-9-7.500z"' + (on ? ' fill="currentColor"' : "") + '/><circle cx="8" cy="11" r="1" fill="' + (on ? "#fff" : "currentColor") + '" stroke="none"/><circle cx="12" cy="11" r="1" fill="' + (on ? "#fff" : "currentColor") + '" stroke="none"/><circle cx="16" cy="11" r="1" fill="' + (on ? "#fff" : "currentColor") + '" stroke="none"/>',
    channel: on => '<rect x="3.500" y="9" width="17" height="11" rx="3"' + (on ? ' fill="currentColor"' : "") + '/><path d="M6 6h12M8 3.200h8"/>',
    store: on => '<path d="M5 8.500h14l1 12H4z"' + (on ? ' fill="currentColor"' : "") + '/><path d="M8.500 8.500V7a3.500 3.500 0 0 1 7 0v1.500"/>',
    more: () => '<circle cx="5" cy="12" r="1.500" fill="currentColor"/><circle cx="12" cy="12" r="1.500" fill="currentColor"/><circle cx="19" cy="12" r="1.500" fill="currentColor"/>'
  };
  const NAVS = [["list", "목록"], ["chat", "채팅"], ["channel", "채널"], ["store", "스토어"], ["more", "더보기"]];
  const navH = () => `<nav class="fmx-nav">${NAVS.map(([k, l]) => `<button class="${k === tab ? "on" : ""}" data-fx="tab" data-id="${k}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round">${NAV[k](k === tab)}</svg><span>${l}</span></button>`).join("")}</nav>`;
  const ava = (u, z = 48) => u.ph ? `<i class="fmx-av" style="width:${z}px;height:${z}px"><svg viewBox="0 0 48 48" width="${z}" height="${z}"><circle cx="24" cy="24" r="24" fill="#f1f1f2"/><circle cx="24" cy="18.500" r="6.500" fill="#fff"/><rect x="12.500" y="28" width="23" height="9.500" rx="4.750" fill="#fff"/></svg></i>` : `<i class="fmx-av" style="width:${z}px;height:${z}px;background:${u.g}"></i>`;
  const hm = () => { const d = new Date(), h = d.getHours(), m = String(d.getMinutes()).padStart(2, "0"); return { en: (h < 12 ? "AM " : "PM ") + (h % 12 || 12) + ":" + m, ko: (h < 12 ? "오전 " : "오후 ") + (h % 12 || 12) + ":" + m }; };
  const fr = (u, i) => `<div class="fmx-fr" data-fx="prof" data-id="${u.n}">${ava(u)}<div class="fmx-fn"><b>${E(u.n)}</b>${u.s ? `<small>${E(u.s)}</small>` : ""}</div>${u.hearts ? `<span class="fmx-hs">${heart(22)}${u.hearts}</span>` : ""}</div>`;

  /* ---------- 페이지 ---------- */
  const top = (t, r = "") => `<header class="fmx-top"><h1>${t}</h1>${r}</header>`;
  const PAGES = {
    list: () => `<div class="fmx-pg">${top("목록", `<div class="fmx-pl"><button data-fx="toast" data-m="친구 추가는 준비 중이에요">${ic("uadd", 28, 1.7)}</button><button data-fx="toast" data-m="설정은 준비 중이에요">${ic("gear", 28, 1.7)}</button></div>`)}
<div class="fmx-sc" data-k="list"><div class="fmx-fr me" data-fx="prof" data-id="춘삼이">${ava(me, 48)}<div class="fmx-fn"><b>춘삼이</b></div></div>
</div>${navH()}</div>`,

    chat: () => `<div class="fmx-pg">${top("채팅")}<div class="fmx-sc">${room ? `<div class="fmx-cr" data-fx="room"><span class="fmx-cw"><i class="fmx-av" style="width:54px;height:54px;background:${room.g}"></i><em class="fmx-cb"><svg width="12" height="12" viewBox="0 0 24 24"><path d="M3 8l4.500 4L12 5l4.500 7L21 8l-2 11H5z" fill="#fff"/></svg></em></span><div class="fmx-cn"><b>${room.name}</b><small class="${room.unread ? "u" : ""}">${E(room.last)}</small></div><span class="fmx-ct">${room.time}</span></div>` : ""}</div>${navH()}</div>`,

    room: () => `<div class="fmx-pg"><header class="fmx-hd"><button class="fmx-ib" data-fx="back">${ic("back", 28, 1.8)}</button><h2>채팅방</h2><div class="fmx-hr"><button class="fmx-lv" data-fx="live"><svg width="34" height="34" viewBox="0 0 34 34"><path d="M17 3C9 3 3 8.500 3 15.200c0 3.500 1.600 6.600 4.300 8.800L6 30l5.700-3.200c1.700.5 3.500.7 5.300.7 8 0 14-5.500 14-12.300S25 3 17 3z" fill="#d8d9dd"/><text x="17" y="19.500" text-anchor="middle" font-size="9.500" font-weight="900" fill="#222" font-family="Arial">LIVE</text></svg></button><button class="fmx-ib" data-fx="toast" data-m="채팅방 메뉴는 준비 중이에요">${ic("menu", 28, 1.7)}</button></div></header>
<div class="fmx-sc fmx-ms" data-k="room">${room.msgs.map((m, i) => m.me ? `<div class="fmx-mr"><small>${m.time}</small><div class="fmx-bb me">${E(m.t)}</div></div>${showReplies ? live.map((q, j) => `<div class="fmx-lm fmx-inline-reply" style="margin-left:8px"><i class="fmx-av" style="width:32px;height:32px;background:${q.g}"></i><div><span class="fmx-nm">${E(q.n)}</span><div class="fmx-lr"><div class="fmx-bb">${E(q.t)}</div><small>${q.time}</small></div></div></div>`).join("") : ""}` : showReplies ? "" : `<div class="fmx-ml"><button class="fmx-bb rp" data-fx="live">답장보기 ${ic("chev", 17, 1.8)}</button></div>`).join("")}</div>${inputBar(1)}</div>`,

    live: () => `<div class="fmx-pg"><header class="fmx-hd"><button class="fmx-ib" data-fx="back">${ic("down", 32, 1.7)}</button><h2>실시간 채팅</h2><div class="fmx-hr"><button class="fmx-ib" data-fx="toast" data-m="실시간 채팅 안내: 프롬친구 모두에게 보여요">${ic("info", 34, 1.7)}</button></div></header>
<div class="fmx-sc fmx-ms lv" data-k="live">${live.map(m => m.me ? `<div class="fmx-mr"><small>${m.time}</small><div class="fmx-bb me">${E(m.t)}</div></div>` : `<div class="fmx-lm"><i class="fmx-av" style="width:32px;height:32px;background:${m.g}"></i><div><span class="fmx-nm">${E(m.n)}</span><div class="fmx-lr"><div class="fmx-bb">${E(m.t)}</div><small>${m.time}</small></div></div></div>`).join("")}</div>${inputBar(0)}</div>`,

    channel: () => `<div class="fmx-pg">${top("채널")}<div class="fmx-sc"><div class="fmx-cc">${["아티 소식", "공식 공지", "라이브 일정", "팬레터"].map((n, i) => `<button data-fx="toast" data-m="${n} 채널은 준비 중이에요"><i style="background:${G[i + 1]}"></i><b>${n}</b><small>구독 중</small></button>`).join("")}</div></div>${navH()}</div>`,
    store: () => `<div class="fmx-pg">${top("스토어")}<div class="fmx-sc"><div class="fmx-sg">${stores.map(([e, n, p]) => `<button data-fx="toast" data-m="${n}을(를) 담았어요"><i>${e}</i><b>${n}</b><small>${p}</small></button>`).join("")}</div></div>${navH()}</div>`,
    more: () => `<div class="fmx-pg">${top("더보기")}<div class="fmx-sc fmx-mm">${["공지사항", "이용 안내", "알림 설정", "화면 설정", "고객센터", "버전 정보"].map(n => `<button data-fx="toast" data-m="${n}은(는) 준비 중이에요">${n}${ic("chev", 18, 1.8)}</button>`).join("")}</div>${navH()}</div>`
  };
  function inputBar(isRoom) { return `<div class="fmx-ib2 ${isRoom ? "room" : ""}">${isRoom ? `<button class="fmx-pl2" data-fx="sheet">${ic("plus", 30, 1.5)}</button>` : ""}<button class="fmx-fd" data-fx="sheet"><span>프롬친구들에게 메시지 보내기</span>${isRoom ? `<i class="fmx-sd" data-fx="sendhint">${ic("send", 28, 1, 1)}</i>` : `<i class="fmx-cm">${ic("cam", 30, 1.5, 1)}</i>`}</button></div>`; }
  const sheetH = () => '<div class="fmx-dim" data-fx="closesheet"></div><div class="fmx-bs"><i class="fmx-gr"></i>' + (prof ? `<div class="fmx-pf">${ava(prof, 84)}<b>${E(prof.n)}</b><small>${E(prof.s || "상태메시지가 없어요")}</small><button class="fmx-pb" data-fx="room">채팅하기</button></div>` : `<h3>메시지 보내기</h3><div class="fmx-qk">${quick.map(q => `<button data-fx="send" data-m="${E(q)}">${E(q)}</button>`).join("")}</div>`) + "</div>";

  /* ---------- 렌더 / 이동 ---------- */
  function render(keep) {
    if (!opened) return;
    const s0 = $(".fmx-sc"); if (s0 && rendered) memo[rendered] = s0.scrollTop;
    el.innerHTML = PAGES[page]() + (sheet ? sheetH() : "");
    rendered = page; const s = $(".fmx-sc"); if (!s) return;
    s.scrollTop = (page === "room" || page === "live") ? s.scrollHeight : (memo[page] || 0);
  }
  const go = p => { stack.push(page); page = p; sheet = null; prof = null; render(); };
  const back = () => { page = stack.pop() || tab; sheet = null; prof = null; render(); };
  function toast(m) { const t = document.createElement("div"); t.className = "fmx-toast"; t.textContent = m; el.appendChild(t); setTimeout(() => t.remove(), 1600); }
  function send(t) {
    const x = hm();
    if (page === "live") { live.push({ me: 1, t, time: x.ko }); sheet = null; render(); return; }
    room.msgs.push({ me: 1, t, time: x.en }); room.last = t; room.time = x.ko; room.unread = 0; sheet = null; render();
    clearTimeout(tt); tt = setTimeout(() => { room.msgs.push({ r: 1 }); room.last = "새로운 메시지가 있습니다."; if (opened && page === "room") render(); else room.unread = 1; }, 1100);
  }
  function act(a, b) {
    const id = b.dataset.id;
    switch (a) {
      case "tab": tab = id; stack = []; page = id; sheet = null; render(); break;
      case "toast": toast(b.dataset.m); break;
      case "room": room.unread = 0; prof = null; sheet = null; if (page !== "room") go("room"); else render(); break;
      case "live": showReplies = !showReplies; render(); break;
      case "back": back(); break;
      case "sheet": prof = null; sheet = true; render(); break;
      case "closesheet": sheet = null; prof = null; render(); break;
      case "sendhint": sheet = true; prof = null; render(); break;
      case "send": send(b.dataset.m); break;
      case "prof": prof = id === "춘삼이" ? me : arts.concat(best).find(u => u.n === id) || me; sheet = true; render(); break;
    }
  }

  /* ---------- 이벤트 ---------- */
  el.addEventListener("click", e => { const b = e.target.closest("[data-fx]"); if (b && el.contains(b)) { e.stopPropagation(); act(b.dataset.fx, b); } });
  function open() {
    if (opened) return; opened = true;
    el.className = ""; el.style.display = ""; el.innerHTML = ""; page = "list"; tab = "list"; stack = []; sheet = null; prof = null; rendered = null; Object.keys(memo).forEach(k => delete memo[k]);
    try { originFrom(el, "fromm"); } catch (_) {}
    el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    render(); setTimeout(() => { if (opened) screen.classList.add("app-light"); }, 140);
  }
  function close() {
    if (!opened) return; opened = false; clearTimeout(tt); screen.classList.remove("app-light");
    el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!opened) el.classList.remove("show"); }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail && e.detail.id === "fromm") open(); });
  document.addEventListener("app:close", () => close());
  window.FrommUI = { open, close };

  /* ---------- 스타일 ---------- */
  const css = `
.fmx-pg{position:absolute;inset:0;display:flex;flex-direction:column;background:#fff}
.fmx-sc{position:relative;flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;overscroll-behavior:contain}.fmx-sc::-webkit-scrollbar{display:none}
button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
.fmx-top{flex:none;height:113px;padding:54px 16px 0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ececef;background:#fff;z-index:3}.fmx-top h1{margin:0;font-size:28px;font-weight:700;letter-spacing:-.04em;padding-top:2px}
.fmx-pl{height:44px;width:100px;border-radius:22px;background:#fff;border:1px solid #e2e2e6;box-shadow:0 4px 14px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:space-around;margin-top:-6px;padding:0 6px}.fmx-pl button{display:grid;place-items:center;width:40px;height:40px;color:#111}
.fmx-fr{display:flex;align-items:center;gap:24px;padding:0 24px;height:64px;cursor:pointer}.fmx-fr.me{height:72px;margin-top:8px}.fmx-av{display:block;border-radius:50%;flex:none;overflow:hidden}
.fmx-fn{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.fmx-fn b{font-size:19px;font-weight:500;letter-spacing:-.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fmx-fn small{font-size:16px;color:#9a9aa0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fmx-fr:has(small){height:64px}.fmx-hs{display:flex;align-items:center;gap:4px;font-size:21px;color:#8d8d93;font-weight:400}
.fmx-st{margin:0;padding:34px 24px 8px;font-size:17px;font-weight:600;color:#8d8d93;letter-spacing:-.03em}.fmx-st span{font-weight:400;margin-left:2px}.fmx-ed{position:relative}.fmx-ed button{position:absolute;right:20px;top:36px;font-size:17px;color:#222;font-weight:500}
.fmx-fr+.fmx-fr{margin-top:0}.fmx-fr:has(small)+.fmx-fr{margin-top:0}
.fmx-line{height:2px;margin:12px 24px 0;background:#ececef}.fmx-gap{display:none}.fmx-ed{padding-top:36px}.fmx-sc .fmx-st:nth-of-type(2){padding-top:28px}
.fmx-nav{position:absolute;left:21px;right:21px;bottom:26px;height:66px;border-radius:33px;background:rgba(255,255,255,.97);border:1px solid #dcdce0;box-shadow:0 6px 22px rgba(0,0,0,.1);display:flex;align-items:center;padding:0 5px;z-index:9}
.fmx-nav button{flex:1;height:56px;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:12.5px;font-weight:600;color:#111;transition:flex .2s}.fmx-nav button.on{background:#efeff1;flex:1.35}.fmx-nav span{letter-spacing:-.04em}
.fmx-cr{display:flex;align-items:center;gap:16px;padding:20px 24px;cursor:pointer}.fmx-cw{position:relative;flex:none}.fmx-cb{position:absolute;right:-3px;bottom:-3px;width:22px;height:22px;border-radius:50%;background:#f94f6d;display:grid;place-items:center;font-style:normal;border:0}
.fmx-cn{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}.fmx-cn b{font-size:20px;font-weight:600}.fmx-cn small{font-size:16px;color:#8d8d93}.fmx-cn small.u{color:#222}.fmx-ct{align-self:flex-start;margin-top:8px;font-size:14px;color:#9a9aa0}
.fmx-hd{flex:none;height:102px;padding:54px 14px 0 18px;display:flex;align-items:center;justify-content:space-between;background:#fff;position:relative;z-index:3}.fmx-hd h2{position:absolute;left:0;right:0;top:54px;height:48px;margin:0;display:grid;place-items:center;font-size:19px;font-weight:700;pointer-events:none}
.fmx-ib{width:40px;height:40px;display:grid;place-items:center;color:#111;position:relative;z-index:1}.fmx-hr{display:flex;align-items:center;gap:14px;position:relative;z-index:1}.fmx-lv{width:34px;height:34px;display:grid;place-items:center}
.fmx-ms{padding:22px 16px 16px;display:flex;flex-direction:column;gap:16px}
.fmx-ml{display:flex}.fmx-mr{display:flex;justify-content:flex-end;align-items:flex-end;gap:7px}.fmx-mr small{font-size:14px;color:#9a9aa0;padding-bottom:2px}
.fmx-bb{min-height:46px;padding:11px 22px;border-radius:23px;font-size:17.5px;line-height:1.4;letter-spacing:-.03em;max-width:76%;word-break:break-all;display:flex;align-items:center}
.fmx-bb.me{background:#fa5673;color:#fff;border-top-right-radius:5px}.fmx-bb.rp{background:#f1f2f4;color:#333;border-top-left-radius:5px;gap:10px;padding:0 20px 0 18px;height:46px}.fmx-bb.rp svg{color:#b3b3b8}
.fmx-lm{display:flex;gap:7px;align-items:flex-start}.fmx-lm>i{margin-top:2px}.fmx-nm{display:block;font-size:13px;color:#8d8d93;margin:0 0 4px 6px}.fmx-lr{display:flex;align-items:flex-end;gap:8px}.fmx-lr .fmx-bb{background:#f1f2f4;color:#222;border-top-left-radius:23px;padding:11px 22px}.fmx-lr small{font-size:14px;color:#9a9aa0;padding-bottom:3px;white-space:nowrap}.lv{gap:20px}
.fmx-ib2{flex:none;display:flex;align-items:center;gap:6px;padding:8px 16px 38px 12px;background:#fff}.fmx-ib2.room{padding-left:6px}.fmx-pl2{width:46px;height:48px;display:grid;place-items:center;color:#111;flex:none}
.fmx-fd{flex:1;height:48px;border-radius:24px;background:#f1f2f4;display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 20px;font-size:17px;color:#b8b9bf;text-align:left}.fmx-ib2:not(.room) .fmx-fd{height:50px}.fmx-sd,.fmx-cm{display:grid;place-items:center;font-style:normal}.fmx-sd{color:#f9a2b1}.fmx-cm{color:#b0b1b8}
.fmx-cc{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:20px}.fmx-cc button{border-radius:20px;background:#f6f7f9;padding:18px 14px;display:flex;flex-direction:column;align-items:flex-start;gap:6px}.fmx-cc i{width:52px;height:52px;border-radius:16px}.fmx-cc b{font-size:17px;font-weight:700}.fmx-cc small{font-size:13px;color:#8d8d93}
.fmx-sg{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:20px}.fmx-sg button{text-align:left;display:flex;flex-direction:column;gap:4px}.fmx-sg i{height:130px;border-radius:18px;background:#f6f7f9;display:grid;place-items:center;font-style:normal;font-size:56px}.fmx-sg b{font-size:15.5px;font-weight:600;margin-top:6px}.fmx-sg small{font-size:15px;color:#444;font-weight:700}
.fmx-mm button{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;font-size:18px;border-bottom:1px solid #f0f0f2}
.fmx-dim{position:absolute;inset:0;background:rgba(0,0,0,.4);z-index:20}.fmx-bs{position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:26px 26px 0 0;padding:12px 20px 42px;z-index:21}.fmx-gr{display:block;width:40px;height:5px;border-radius:3px;background:#ddd;margin:0 auto 16px}.fmx-bs h3{margin:0 0 14px;font-size:18px;font-weight:700}
.fmx-qk{display:flex;flex-wrap:wrap;gap:8px}.fmx-qk button{height:42px;padding:0 18px;border-radius:21px;background:#f1f2f4;font-size:16px}.fmx-qk button:active{background:#fa5673;color:#fff}
.fmx-pf{display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:6px}.fmx-pf b{font-size:21px;margin-top:8px}.fmx-pf small{font-size:15px;color:#8d8d93}.fmx-pb{margin-top:16px;width:100%;height:52px;border-radius:26px;background:#fa5673;color:#fff;font-size:17px;font-weight:700}
.fmx-toast{position:absolute;left:50%;bottom:110px;transform:translateX(-50%);background:rgba(20,20,24,.92);color:#fff;border-radius:22px;padding:11px 18px;font-size:14px;z-index:30;white-space:nowrap}`;
  const st = document.createElement("style"); st.id = "fmx-style";
  st.textContent = `#fm-app{position:absolute;inset:0;z-index:6;display:none;overflow:hidden;background:#fff;color:#16161a;font-family:"Pretendard Variable",Pretendard,-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;letter-spacing:-.03em;opacity:0;transform:scale(.9);transition:opacity .25s,transform .38s cubic-bezier(.22,.8,.3,1)}#fm-app.show{display:block}#fm-app.open{opacity:1;transform:none}#fm-app *{box-sizing:border-box}`
    + css.replace(/([^{}]+)\{/g, (m, sel) => sel.split(",").map(s => "#fm-app " + s.trim()).join(",") + "{");
  document.head.appendChild(st);
})();
