/* ===== spotify.js (integrated) ===== */
/* ===== 17차: Spotify 앱 ===== */
const SpApp = (() => {
  const $ = q => document.querySelector(q), el = $("#sp-app"), screen = $("#screen");
  const ic = (p, o = {}) => `<svg viewBox="0 0 24 24" fill="${o.f ? "currentColor" : "none"}" stroke="${o.f ? "none" : "currentColor"}" stroke-width="${o.w || 1.8}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const HP = "M12 20.3C6 16 3.5 12.8 3.5 9.3A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 8.5 1.9c0 3.500-2.500 6.700-8.500 11z";
  const I = {
    home: o => ic(o ? '<path d="M12 3L3 10.200V21h6.500v-6h5v6H21V10.200z"/>' : '<path d="M4.500 10.200L12 4l7.500 6.200V20h-5v-5.500h-5V20h-5z"/>', { f: o }),
    search: o => ic('<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500l5 5"/>', { w: o ? 2.8 : 1.9 }),
    lib: o => ic('<path d="M5 4v16M10 4v16M15 6l4 14"/>', { w: o ? 2.8 : 1.9 }),
    heart: o => ic(`<path d="${HP}"/>`, { f: o, w: 1.8 }).replace("currentColor", o ? "#1ed760" : "currentColor"),
    play: ic('<path d="M8 5.200v13.600L19 12z"/>', { f: 1 }), pause: ic('<rect x="6.500" y="5" width="4" height="14" rx="1"/><rect x="13.500" y="5" width="4" height="14" rx="1"/>', { f: 1 }),
    prev: ic('<path d="M6.500 5v14"/><path d="M19 5.500v13L9 12z"/>', { w: 2 }).replace('<path d="M19', '<path fill="currentColor" d="M19'),
    next: ic('<path d="M17.500 5v14"/><path d="M5 5.500v13L15 12z"/>', { w: 2 }).replace('<path d="M5 5.5', '<path fill="currentColor" d="M5 5.5'),
    shuf: ic('<path d="M3 7h3.500c3.500 0 4.500 10 8.500 10H21M3 17h3.500c1.500 0 2.500-1.500 3.500-3.500M14 9.500C14.700 8.300 15.800 7 17.500 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>'),
    rep: ic('<path d="M17 3l3 3-3 3M4 11V9.500A3.500 3.500 0 0 1 7.500 6H20M7 21l-3-3 3-3M20 13v1.500a3.500 3.500 0 0 1-3.500 3.500H4"/>'),
    down: ic('<path d="M6 9l6 6 6-6"/>', { w: 2.2 }), back: ic('<path d="M15 5l-7 7 7 7"/>', { w: 2.2 }),
    more: ic('<circle cx="5" cy="12" r="1.400"/><circle cx="12" cy="12" r="1.400"/><circle cx="19" cy="12" r="1.400"/>', { f: 1 }),
    plus: ic('<path d="M12 5v14M5 12h14"/>', { w: 2 }), bell: ic('<path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 1.500h-15z"/><path d="M10 20.500a2 2 0 0 0 4 0"/>'),
    dev: ic('<rect x="7" y="3" width="10" height="18" rx="2.500"/><path d="M11 18h2"/>'), queue: ic('<path d="M4 6h12M4 11h12M4 16h6M15 14v6l5-3z"/>'),
    trash: ic('<path d="M5 7h14M10 7V4.500h4V7M7 7l1 13h8l1-13"/>'), disc: ic('<circle cx="12" cy="12" r="8.500"/><circle cx="12" cy="12" r="2.500"/>'), user: ic('<circle cx="12" cy="8" r="3.500"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>'),
    sort: ic('<path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3"/>'), list: ic('<path d="M4 6h16M4 12h16M4 18h16"/>'), grid: ic('<rect x="4" y="4" width="6.500" height="6.500" rx="1"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1"/>'),
    check: ic('<path d="M5 12.500l4.500 4.500L19 7.500"/>', { w: 2.2 }),
  };
  /* ---------- 데이터 ---------- */
  const AL = [
    ["NO RECALL", "mars", 265, "힙합", [["3AM", 201], ["idontmissyoulikethat", 187], ["혼", 233]]],
    ["Paper Planes", "Luna Harbor", 330, "팝", [["Skyline Letters", 198], ["Paper Planes", 214], ["Soft Landing", 189], ["Tiny Orbit", 225]]],
    ["모래시계", "도시 곡선", 30, "힙합", [["오후 네 시", 172], ["골목 지도", 203], ["모래시계", 196], ["환승", 181]]],
    ["ENOuGH", "NO1", 350, "록", [["ENOuGH", 231]]],
    ["Midnight Grid", "Orbit Eleven", 190, "일렉트로닉", [["Grid Runner", 236], ["Pulse Theory", 212], ["Midnight Grid", 254], ["Cold Boot", 199]]],
    ["Desire", "FIXON", 200, "힙합", [["Tunnel", 205], ["AUTOBAHN", 221], ["ROAR", 233]]],
    ["Honey Static", "Kite & Co.", 45, "R&B", [["Honey Static", 205], ["Slow Burn", 227], ["Velvet Rain", 218], ["Late Reply", 191]]],
    ["작은 방", "하루종일", 140, "어쿠스틱", [["기타와 햇살", 189], ["작은 방", 202], ["빈 의자", 176], ["귀갓길", 217]]],
    ["Neon Garden", "Luna Harbor", 300, "팝", [["Neon Garden", 193], ["Glass Hours", 208], ["Daydream Loop", 186], ["Paper Moon", 222]]],
    ["Overdrive", "Velvet Static", 10, "록", [["Overdrive", 199], ["Red Line", 187], ["Burnout", 212], ["Quiet Riot Act", 234]]],
  ];
  const T = []; AL.forEach((a, ai) => a[4].forEach((s, i) => T.push({ id: T.length, t: s[0], a: a[1], ai, n: i + 1, d: s[1] })));
  const AR = [{ id: 0, n: "mars", h: 265 }, { id: 1, n: "NO1", h: 330 }, { id: 2, n: "FIXON", h: 30 }, { id: 3, n: "ATEEZ", h: 190 }];
  const byG = (...g) => T.filter(t => g.includes(AL[t.ai][3])).map(t => t.id);
  const PL = [
    ["오늘의 인기 곡 Top 10", 140, [1, 11, 18, 0, 2, 12, 13, 14, 3, 4]], ["집중이 필요할 때", 190, byG("일렉트로닉", "재즈")],
    ["드라이브 믹스", 20, byG("록", "팝", "힙합")], ["R&B 무드", 45, byG("R&B", "팝")],
  ];
  const GN = [["팝", "#8d67ab"], ["힙합", "#ba5d07"], ["인디", "#1e3264"], ["록", "#e8115b"], ["일렉트로닉", "#0d73ec"], ["재즈", "#477d95"], ["R&B", "#dc148c"], ["어쿠스틱", "#148a08"]];
  const KEY = "ios-spotify-v1";
  let S = { liked: [], ups: [], recent: ["a0", "a3", "a5", "p0"] };
  try { const d = window.HwahoStability ? window.HwahoStability.readJSON(KEY, null) : JSON.parse(localStorage.getItem(KEY)); if (d && Array.isArray(d.liked)) S = { liked: d.liked, ups: d.ups || [], recent: Array.isArray(d.recent) ? d.recent.filter(x => !/^p\d+$/.test(x)) : S.recent }; } catch (e) {}
  const save = () => { try { if (window.HwahoStability) window.HwahoStability.writeJSON(KEY, S); else localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fm = s => { s = Math.max(0, Math.floor(s)); return (s / 60 | 0) + ":" + String(s % 60).padStart(2, "0"); };
  const PAT = [
    '<circle cx="70" cy="35" r="26" fill="#fff" fill-opacity=".25"/><circle cx="30" cy="75" r="14" fill="#000" fill-opacity=".2"/>',
    '<path d="M0 70L100 20v22L0 92zM0 40L100-10v14L0 54z" fill="#fff" fill-opacity=".22"/>',
    '<circle cx="50" cy="50" r="34" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="8"/><circle cx="50" cy="50" r="14" fill="#fff" fill-opacity=".3"/>',
    '<path d="M50 14L88 82H12z" fill="#fff" fill-opacity=".25"/><path d="M50 14L88 82H50z" fill="#000" fill-opacity=".18"/>',
  ];
  const albumCovers = { "NO RECALL": "images/Spotify/Albums/NO-RECALL/cover.jpg", "Desire": "images/Spotify/Albums/Desire/cover.jpg", "ENOuGH": "images/Spotify/Albums/ENOuGH/cover.jpg" };
  const artistPhotos = { mars: "images/Spotify/Artists/mars/1969d38e20fc29da97dda95cfb8fd503.jpg", NO1: "images/Spotify/Artists/NO1/a855c56fa66453c89fe5abd272d6ea09.jpg", FIXON: "images/Spotify/Artists/FIXON/13790ef252a695e71b923c001fc97fb5.jpg", ATEEZ: "images/Spotify/Artists/ATEEZ/6cf131e8a471bdd258903aff74753431.jpg" };
  const cv = (e, c) => e.k === "l" ? `<div class="sp-cv lk">${I.heart(1).replace("#1ed760", "currentColor")}</div>` : e.k === "a" && albumCovers[e.t] ? `<div class="sp-cv${c || ""}" style="--h:${e.h};background:#242424 url(\'${albumCovers[e.t]}\') center/cover no-repeat"></div>` : `<div class="sp-cv${e.k === "r" ? " rd" : ""}${c || ""}" style="--h:${e.h}"><svg viewBox="0 0 100 100">${PAT[(e.v | 0) % 4]}</svg></div>`;
  function ent(id) {
    const k = id[0], x = id.slice(1);
    if (id === "liked") return { id, k: "l", t: "좋아요 표시한 곡", s: "플레이리스트 • " + S.liked.length + "곡", h: 270, tr: S.liked.slice().reverse() };
    if (k === "a" && AL[x]) { const a = AL[x]; return { id, k: "a", t: a[0], s: "앨범 • " + a[1], h: a[2], v: +x, tr: T.filter(t => t.ai == x).map(t => t.id) }; }
    if (k === "p" && PL[x]) { const p = PL[x]; return { id, k: "p", t: p[0], s: "플레이리스트 • Spotify", h: p[1], v: +x, tr: p[2] }; }
    if (k === "r" && AR[x]) { const r = AR[x]; return { id, k: "r", t: r.n, s: "아티스트", h: r.h, v: +x, tr: r.n === "mars" ? T.filter(t => t.ai === 0).map(t => t.id) : [] }; }
    if (k === "u") { const u = S.ups.find(u => u.id === id); return u ? { id, k: "u", t: u.name, s: "플레이리스트 • 떵화", h: u.h, v: S.ups.indexOf(u), tr: u.tr } : null; }
    return null;
  }
  const tcv = t => cv(ent("a" + t.ai));
  const cd = e => `<button class="sp-cd${e.k === "r" ? " ar" : ""}" data-a="open" data-id="${e.id}">${e.k === "r" && artistPhotos[e.t] ? `<div class="sp-cv rd" style="--h:${e.h};background:#242424 url(\\'${artistPhotos[e.t]}\\') center/cover no-repeat"></div>` : cv(e)}<b>${esc(e.t)}</b><small>${esc(e.k === "r" ? "아티스트" : e.k === "a" ? AL[e.v][1] : e.k === "p" ? "Spotify" : "내 플레이리스트")}</small></button>`;
  const row = e => `<button class="sp-row" data-a="open" data-id="${e.id}">${cv(e)}<div><b>${esc(e.t)}</b><small>${esc(e.s)}</small></div></button>`;
  const LST = {};
  const trow = (t, i, ctx, num, sub) => `<div class="sp-tr" data-tid="${t.id}" data-ctx="${ctx}" data-i="${i}"><button class="sp-tp" data-a="play">${num === 2 ? `<i>${i + 1}</i>${tcv(t)}` : num ? `<i>${i + 1}</i>` : tcv(t)}<div><b>${esc(t.t)}</b><small>${esc(sub || t.a)}</small></div></button><button class="sp-ib sm" data-a="tm" aria-label="더보기">${I.more}</button></div>`;

  /* ---------- 재생 상태 ---------- */
  const PLAY_KEY = "ios-spotify-playback-v1";
  let restored = null;
  try { restored = window.HwahoStability ? window.HwahoStability.readJSON(PLAY_KEY, null) : JSON.parse(localStorage.getItem(PLAY_KEY)); } catch (e) {}
  let Q = restored && Array.isArray(restored.Q) ? restored.Q : [], qi = restored && Number.isInteger(restored.qi) ? restored.qi : -1,
      pos = restored && Number.isFinite(restored.pos) ? restored.pos : 0,
      playing = !!(restored && restored.playing && restored.qi >= 0),
      shuf = !!(restored && restored.shuf), rep = restored && Number.isInteger(restored.rep) ? restored.rep : 0,
      src = restored && restored.src || null, orig = null, seek = false;
  const savePlayback = () => { try { const data = { Q, qi, pos, playing, shuf, rep, src }; if (window.HwahoStability) window.HwahoStability.writeJSON(PLAY_KEY, data); else localStorage.setItem(PLAY_KEY, JSON.stringify(data)); } catch (e) {} };
  let tab = "hm", stack = [], mT = null, mC = null, isOpen = false, toastT = null;
  const lib = { f: null, sort: 0, grid: 0, q: "", qo: 0 }, se = { q: "", f: "all" };
  const cur = () => T[Q[qi]];
  function toast(t) { const e = $("#sp-ts"); e.textContent = t; e.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove("on"), 2000); }
  function doShuf() { orig = Q.slice(); const c = Q[qi], r = Q.filter((_, k) => k !== qi); for (let i = r.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[r[i], r[j]] = [r[j], r[i]]; } Q = [c, ...r]; qi = 0; }
  function undoShuf() { if (orig) { const c = Q[qi]; Q = orig; orig = null; qi = Q.indexOf(c); } }
  function setPlay(b) { playing = b && qi >= 0; savePlayback(); sync(); }
  function startQ(ids, i, s) {
    if (!ids.length) return; Q = ids.slice(); qi = i; src = s; orig = null; if (shuf) doShuf(); pos = 0;
    const t = cur(), r = s && s !== "search" && s !== "liked" ? s : "a" + t.ai; S.recent = [r, ...S.recent.filter(x => x !== r)].slice(0, 12); save();
    
    setPlay(true);
  }
  function playEnt(e) {
    if (!e.tr.length) return;
    if (src === e.id && qi >= 0) { setPlay(!playing); return; }
    startQ(e.tr, shuf ? Math.random() * e.tr.length | 0 : 0, e.id);
  }
  function next(auto) {
    if (qi < 0) return;
    if (auto && rep === 2) pos = 0;
    else if (qi < Q.length - 1) { qi++; pos = 0; }
    else if (rep === 1) { qi = 0; pos = 0; }
    else { pos = 0; if (auto) playing = false; }
    savePlayback(); sync();
  }
  function prev() { if (qi < 0) return; if (pos > 3 || qi === 0) pos = 0; else { qi--; pos = 0; } savePlayback(); sync(); }
  setInterval(() => { if (!playing || seek || qi < 0 || !cur()) return; pos += .25; if (pos >= cur().d) next(true); else { savePlayback(); tick(); } }, 250);
  function tick() {
    const t = cur(); if (!t) return; const p = Math.min(1, pos / t.d);
    const sk = $("#sp-sk"); if (!seek) { sk.value = Math.round(p * 1000); } sk.style.setProperty("--p", (p * 100) + "%");
    $("#sp-t1").textContent = fm(pos); $("#sp-t2").textContent = fm(t.d); $("#sp-mg i").style.width = (p * 100) + "%";
  }
  function sync() {
    const t = cur(); el.classList.toggle("has", !!t);
    document.querySelectorAll("#sp-app [data-tid]").forEach(x => x.classList.toggle("sp-now", !!t && +x.dataset.tid === t.id));
    const pb = $("#sp-dt .sp-pb"); if (pb) pb.innerHTML = playing && src === stack[stack.length - 1] ? I.pause : I.play;
    const sb = $("#sp-dt [data-a=shuf]"); if (sb) sb.classList.toggle("on", shuf);
    if (!t) return;
    const a = ent("a" + t.ai), lk = S.liked.includes(t.id), h = $("#sp-mini");
    h.style.setProperty("--h", a.h); $("#sp-pl").style.setProperty("--h", a.h);
    $("#sp-mcv").innerHTML = cv(a); $("#sp-mt").textContent = t.t; $("#sp-ma").textContent = t.a;
    $("#sp-mh").innerHTML = I.heart(lk); $("#sp-mp").innerHTML = playing ? I.pause : I.play;
    $("#sp-fcv").innerHTML = cv(a); $("#sp-ft").textContent = t.t; $("#sp-fa").textContent = t.a; $("#sp-fh").innerHTML = I.heart(lk);
    $("#sp-fp").innerHTML = playing ? I.pause : I.play; $("#sp-fs").classList.toggle("on", shuf); $("#sp-fr").classList.toggle("on", rep > 0);
    $("#sp-fr").innerHTML = I.rep + (rep === 2 ? "<sup>1</sup>" : "");
    const e = src && ent(src); $("#sp-fsrc").textContent = e ? e.t : "검색 결과";
    tick();
  }

  /* ---------- 화면 ---------- */
  function home() {
    const h = new Date().getHours(), gr = h < 5 || h >= 21 ? "좋은 밤이에요" : h < 12 ? "좋은 아침이에요" : h < 18 ? "좋은 오후예요" : "좋은 저녁이에요";
    const sec = (t, l) => `<h2 class="sp-h">${t}</h2><div class="sp-hs">${l}</div>`, rc = [...new Set(S.recent)].map(ent).filter(Boolean).slice(0, 10);
    return `<div class="sp-hd"><button class="sp-av" data-a="set" aria-label="설정">떵</button><b>${gr}</b><span class="sp-sp"></span><button class="sp-ib" data-a="bell" aria-label="알림">${I.bell}</button><button class="sp-ib" data-a="sch" aria-label="검색" aria-disabled="true" style="opacity:.38;pointer-events:none">${I.search()}</button></div>`
      + `<div class="sp-qg">${["liked", "p0", "a0", "a3"].map(ent).map(e => `<button class="sp-qc" data-a="open" data-id="${e.id}">${cv(e)}<b>${esc(e.t)}</b></button>`).join("")}</div>`
      + sec("최근 재생", rc.map(cd).join(""))
      + sec("추천 아티스트", AR.slice(0, 5).map((_, i) => { const e = ent("r" + i); return `<div class="sp-cd ar" aria-label="${esc(e.t)}">${cv(e)}<b>${esc(e.t)}</b><small>아티스트</small></div>`; }).join(""));
  }
  function seBody() {
    const q = se.q.trim().toLowerCase(), b = $("#sp-sbd");
    if (!q) { b.innerHTML = `<h2 class="sp-h" style="margin-top:6px">모두 둘러보기</h2><div class="sp-gg">${GN.map((g, i) => `<button class="sp-gc" data-a="genre" data-g="${g[0]}" style="background:${g[1]}">${g[0]}${cv({ k: "a", h: AL[i][2], v: i })}</button>`).join("")}</div>`; return; }
    const m = s => s.toLowerCase().includes(q), tr = T.filter(t => m(t.t) || m(t.a) || m(AL[t.ai][3])), ar = AR.filter(r => m(r.n) || AL.some(a => a[1] === r.n && m(a[3])));
    const al = AL.map((a, i) => i).filter(i => m(AL[i][0]) || m(AL[i][1]) || m(AL[i][3])), pl = PL.map((_, i) => i).filter(i => m(PL[i][0]));
    LST.search = tr.map(t => t.id); const f = se.f, all = f === "all", lim = (a, n) => all ? a.slice(0, n) : a;
    let h = `<div class="sp-chips">${[["all", "전체"], ["t", "곡"], ["r", "아티스트"], ["a", "앨범"], ["p", "플레이리스트"]].map(c => `<button class="${f === c[0] ? "on" : ""}" data-a="chip" data-f="${c[0]}">${c[1]}</button>`).join("")}</div>`, n = 0;
    if (all || f === "t") lim(tr, 5).forEach((t, i) => { h += trow(t, i, "search", 0, "곡 • " + t.a); n++; });
    if (all || f === "r") lim(ar, 3).forEach(r => { h += row(ent("r" + r.id)); n++; });
    if (all || f === "a") lim(al, 4).forEach(i => { h += row(ent("a" + i)); n++; });
    if (all || f === "p") lim(pl, 3).forEach(i => { h += row(ent("p" + i)); n++; });
    b.innerHTML = h + (n ? "" : `<div class="sp-em"><b>"${esc(se.q.trim())}"에 대한 결과를 찾을 수 없음</b>철자를 확인하거나 다른 키워드로 검색해 보세요.</div>`);
    sync();
  }
  function lbBody() {
    const F = { pl: ["l", "u", "p"], ar: ["r"], al: ["a"] }, q = lib.q.trim().toLowerCase();
    let it = [ent("liked"), ...S.ups.slice().reverse().map(u => ent(u.id)), ...PL.map((_, i) => ent("p" + i)), ...AR.map((_, i) => ent("r" + i)), ...AL.map((_, i) => ent("a" + i))];
    if (lib.f) it = it.filter(e => F[lib.f].includes(e.k)); if (q) it = it.filter(e => e.t.toLowerCase().includes(q) || e.s.toLowerCase().includes(q));
    if (lib.sort) it.sort((a, b) => a.t.localeCompare(b.t, "ko"));
    $("#sp-lbb").innerHTML = `<div class="sp-chips">${[["pl", "플레이리스트"], ["ar", "아티스트"], ["al", "앨범"]].map(c => `<button class="${lib.f === c[0] ? "on" : ""}" data-a="lf" data-f="${c[0]}">${c[1]}</button>`).join("")}</div>`
      + `<div class="sp-ls"><button data-a="ls">${I.sort}<span>${lib.sort ? "가나다순" : "최근 추가순"}</span></button><span class="sp-sp"></span><button data-a="lg" aria-label="보기 방식">${lib.grid ? I.list : I.grid}</button></div>`
      + (it.length ? (lib.grid ? `<div class="sp-lg">${it.map(cd).join("")}</div>` : it.map(row).join("")) : `<div class="sp-em"><b>항목이 없어요</b>다른 검색어나 필터를 사용해 보세요.</div>`);
  }
  function dtHtml(e) {
    let h = `<div class="sp-dh"><button class="sp-ib" data-a="back" aria-label="뒤로">${I.back}</button><span class="sp-sp"></span>${e.k === "u" ? `<button class="sp-ib" data-a="ud" aria-label="더보기">${I.more}</button>` : ""}</div>`;
    h += `<div class="sp-hero${e.k === "r" ? " ar" : ""}">${cv(e)}</div><div class="sp-dm"><h1>${esc(e.t)}</h1><small>${esc(e.s)} • ${e.tr.length}곡</small></div>`;
    h += `<div class="sp-act"><button class="sp-ib${shuf ? " on" : ""}" data-a="shuf" aria-label="셔플">${I.shuf}</button><span class="sp-sp"></span><button class="sp-pb" data-a="pent" aria-label="재생">${playing && src === e.id ? I.pause : I.play}</button></div>`;
    if (!e.tr.length) return h + `<div class="sp-em"><b>플레이리스트가 비어 있어요</b>검색에서 곡을 찾아 ⋯ 메뉴로 추가해 보세요.</div>`;
    if (e.k === "r") return h + `<h2 class="sp-tl">인기</h2>` + e.tr.slice(0, 5).map((id, i) => trow(T[id], i, e.id, 1)).join("") + `<h2 class="sp-h">앨범</h2><div class="sp-hs">${AL.map((a, i) => i).filter(i => AL[i][1] === e.t).map(i => cd(ent("a" + i))).join("")}</div>`;
    if (e.k === "p" && e.t === "오늘의 인기 곡 Top 10") return h + e.tr.slice(0, 10).map((id, i) => trow(T[id], i, "popular", 2, "인기 차트 • " + T[id].a)).join("");
    return h + e.tr.map((id, i) => trow(T[id], i, e.id, e.k === "a")).join("");
  }
  function paintDt() {
    const d = $("#sp-dt"); let e = null;
    while (stack.length && !(e = ent(stack[stack.length - 1]))) stack.pop();
    if (!e) { d.classList.remove("on"); return; }
    const s = d.scrollTop; d.innerHTML = dtHtml(e); d.classList.add("on"); d.scrollTop = s; sync();
  }
  function paintTab() {
    const v = $("#sp-" + tab), s = v.scrollTop;
    ["hm", "se", "lb"].forEach(t => $("#sp-" + t).classList.toggle("on", t === tab));
    if (tab === "hm") v.innerHTML = home(); else if (tab === "se") seBody(); else lbBody();
    v.scrollTop = s; sync();
    $("#sp-tabs").innerHTML = [["hm", "홈", I.home], ["se", "검색", I.search], ["lb", "내 라이브러리", I.lib]].map(x => `<button class="${tab === x[0] ? "on" : ""}" data-a="${x[0] === "hm" ? "tab" : "inactive"}" data-t="${x[0]}" ${x[0] !== "hm" ? "aria-disabled=\"true\" style=\"opacity:.38;pointer-events:none\"" : ""}>${x[2](tab === x[0])}<span>${x[1]}</span></button>`).join("");
  }
  const refresh = () => { paintTab(); paintDt(); };
  function go(t) { stack = []; tab = t; if (t === "hm") $("#sp-hm").scrollTop = 0; paintTab(); paintDt(); }

  /* ---------- 시트 ---------- */
  const si = (i, l, a, c = "") => `<button class="sp-si ${c}" data-a="${a}">${i}<span>${l}</span></button>`;
  function sheet(h) { $("#sp-sh").innerHTML = h; $("#sp-sh").classList.add("on"); $("#sp-dim").classList.add("on"); }
  function shut() { $("#sp-sh").classList.remove("on"); $("#sp-dim").classList.remove("on"); }
  function tmSheet(tid, ctx) {
    mT = tid; mC = ctx; const t = T[tid], lk = S.liked.includes(tid), u = /^u\d/.test(ctx || "");
    sheet(`<div class="sp-sh1">${tcv(t)}<div><b>${esc(t.t)}</b><small>${esc(t.a)}</small></div></div>` + si(I.heart(lk), lk ? "좋아요 취소" : "좋아요 표시한 곡에 추가", "mlike") + si(I.queue, "대기열에 추가", "mq") + si(I.plus, "플레이리스트에 추가", "madd")
      + (u ? si(I.trash, "이 플레이리스트에서 삭제", "mrm") : "") + si(I.disc, "앨범으로 이동", "malbum") + si(I.user, "아티스트로 이동", "martist"));
  }
  const newUp = (name, tr) => { const u = { id: "u" + Date.now(), name, h: Math.random() * 360 | 0, tr: tr || [] }; S.ups.push(u); save(); return u; };
  function npSheet() { sheet(`<div class="sp-sh1"><b style="font-size:18px">플레이리스트 이름</b></div><input id="sp-np" placeholder="내 플레이리스트 #${S.ups.length + 1}" maxlength="40"><button class="sp-ok" data-a="npok">만들기</button>`); }
  function qSheet() {
    const t = cur(); if (!t) return;
    sheet(`<div class="sp-sh1"><b style="font-size:18px">재생 대기열</b></div><div style="padding:0 4px"><small style="padding:4px 12px">지금 재생 중</small>${trowQ(qi)}<small style="padding:12px 12px 4px">다음 곡</small>${Q.slice(qi + 1).map((_, k) => trowQ(qi + 1 + k)).join("") || '<p>다음 곡이 없어요.</p>'}</div>`);
  }
  const trowQ = k => { const t = T[Q[k]]; return `<button class="sp-si${k === qi ? " g" : ""}" data-a="jump" data-k="${k}">${tcv(t)}<span>${esc(t.t)}<small>${esc(t.a)}</small></span></button>`; };

  /* ---------- 이벤트 ---------- */
  const likeT = id => { const i = S.liked.indexOf(id); if (i < 0) S.liked.push(id); else S.liked.splice(i, 1); save(); refresh(); return i < 0; };
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-a]"); if (!b) return; const a = b.dataset.a, tr = b.closest(".sp-tr"), d = b.dataset, t = cur();
    switch (a) {
      case "tab": go(d.t); break;
      case "sch": go("se"); setTimeout(() => $("#sp-q").focus(), 60); break;
      case "open": stack.push(d.id); paintDt(); break;
      case "back": stack.pop(); paintDt(); break;
      case "bell": toast("새로운 알림이 없어요"); break;
      case "play": { const ctx = tr.dataset.ctx, ids = ctx === "search" ? LST.search : ent(ctx).tr; startQ(ids, +tr.dataset.i, ctx); break; }
      case "pent": playEnt(ent(stack[stack.length - 1])); break;
      case "shuf": if (shuf) { shuf = false; undoShuf(); } else { shuf = true; if (qi >= 0) doShuf(); } sync(); break;
      case "rep": rep = (rep + 1) % 3; sync(); break;
      case "pp": if (qi >= 0) setPlay(!playing); break;
      case "prev": prev(); break; case "next": next(false); break;
      case "like": if (t) { const on = likeT(t.id); toast(on ? "좋아요 표시한 곡에 추가됨" : "좋아요 표시한 곡에서 삭제됨"); } break;
      case "full": $("#sp-pl").classList.add("on"); break;
      case "fclose": $("#sp-pl").classList.remove("on"); break;
      case "tm": tmSheet(+tr.dataset.tid, tr.dataset.ctx); break;
      case "tmc": if (t) tmSheet(t.id, ""); break;
      case "mlike": { const on = likeT(mT); shut(); toast(on ? "좋아요 표시한 곡에 추가됨" : "좋아요 표시한 곡에서 삭제됨"); break; }
      case "mq": if (qi < 0) startQ([mT], 0, "search"); else { Q.splice(qi + 1, 0, mT); if (orig) orig.push(mT); } shut(); toast("대기열에 추가됨"); break;
      case "madd": sheet(`<div class="sp-sh1"><b style="font-size:18px">플레이리스트에 추가</b></div>` + si(I.plus, "새 플레이리스트", "addnew") + S.ups.slice().reverse().map(u => `<button class="sp-si" data-a="addto" data-id="${u.id}">${cv({ k: "u", h: u.h, v: 0 })}<span>${esc(u.name)}<small>${u.tr.length}곡</small></span>${u.tr.includes(mT) ? I.check : ""}</button>`).join("")); break;
      case "addnew": { const u = newUp("내 플레이리스트 #" + (S.ups.length + 1), [mT]); shut(); refresh(); toast("\"" + u.name + "\"에 추가됨"); break; }
      case "addto": { const u = S.ups.find(x => x.id === d.id); if (u.tr.includes(mT)) toast("이미 추가된 곡이에요"); else { u.tr.push(mT); save(); refresh(); toast("\"" + u.name + "\"에 추가됨"); } shut(); break; }
      case "mrm": { const u = S.ups.find(x => x.id === mC); if (u) { u.tr.splice(u.tr.indexOf(mT), 1); save(); } shut(); refresh(); toast("플레이리스트에서 삭제됨"); break; }
      case "malbum": shut(); $("#sp-pl").classList.remove("on"); stack.push("a" + T[mT].ai); paintDt(); break;
      case "martist": shut(); $("#sp-pl").classList.remove("on"); stack.push("r" + AR.findIndex(r => r.n === T[mT].a)); paintDt(); break;
      case "q": qSheet(); break;
      case "jump": qi = +d.k; pos = 0; setPlay(true); shut(); break;
      case "dv": sheet(`<div class="sp-sh1"><b style="font-size:18px">기기 선택</b></div>` + si(I.dev, "이 iPhone", "shut", "g") + `<p>다른 기기와는 연결할 수 없어요.</p>`); break;
      case "shut": shut(); break;
      case "np": npSheet(); setTimeout(() => { const i = $("#sp-np"); if (i) i.focus(); }, 320); break;
      case "npok": { const v = $("#sp-np").value.trim() || "내 플레이리스트 #" + (S.ups.length + 1), u = newUp(v); shut(); tab = "lb"; stack = [u.id]; paintTab(); paintDt(); break; }
      case "ud": sheet(si(I.trash, "플레이리스트 삭제", "udel")); break;
      case "udel": { const id = stack[stack.length - 1]; S.ups = S.ups.filter(u => u.id !== id); save(); stack.pop(); shut(); refresh(); toast("플레이리스트를 삭제했어요"); break; }
      case "genre": se.q = d.g; $("#sp-q").value = d.g; se.f = "all"; seBody(); break;
      case "chip": se.f = d.f; seBody(); break;
      case "lf": lib.f = lib.f === d.f ? null : d.f; lbBody(); break;
      case "ls": lib.sort = lib.sort ? 0 : 1; lbBody(); break;
      case "lg": lib.grid = lib.grid ? 0 : 1; lbBody(); break;
      case "lq": lib.qo = !lib.qo; lib.q = ""; $("#sp-lbf").innerHTML = lib.qo ? `<div class="sp-lqf">${I.search()}<input id="sp-lq" placeholder="내 라이브러리에서 찾기"></div>` : ""; if (lib.qo) $("#sp-lq").focus(); lbBody(); break;
      case "set": sheet(`<div class="sp-sh1"><b style="font-size:18px">떵화</b></div><p>설정</p><p>좋아요와 플레이리스트는 이 기기의 브라우저에만 저장돼요.</p>` + si(I.trash, "좋아요·플레이리스트 초기화", "reset")); break;
      case "reset": if (b.dataset.s) { S = { liked: [], ups: [], recent: ["a0", "a3", "a5", "p0"] }; save(); shut(); refresh(); toast("초기화했어요"); } else { b.dataset.s = 1; b.querySelector("span").textContent = "정말 초기화할까요? 한 번 더 탭하세요"; } break;
    }
  });
  el.addEventListener("input", e => {
    const i = e.target;
    if (i.id === "sp-sk") { const t = cur(); if (t) { pos = i.value / 1000 * t.d; tick(); } }
    else if (i.id === "sp-q") { se.q = i.value; seBody(); } else if (i.id === "sp-lq") { lib.q = i.value; lbBody(); }
  });
  ["pointerdown", "touchstart", "mousedown"].forEach(n => el.addEventListener(n, e => { if (e.target.id === "sp-sk") seek = true; }, { passive: true }));
  ["pointerup", "pointercancel", "touchend", "mouseup", "change"].forEach(n => document.addEventListener(n, () => { seek = false; }, { passive: true }));
  el.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "sp-np") { e.preventDefault(); $("[data-a=npok]").click(); } });

  el.innerHTML = `<div class="sp-v" id="sp-hm"></div>
  <div class="sp-v" id="sp-se"><h1 class="sp-tl" style="margin-top:6px;font-size:26px">검색</h1><label class="sp-sf">${I.search()}<input id="sp-q" type="search" placeholder="무엇을 듣고 싶으세요?" autocomplete="off"></label><div id="sp-sbd"></div></div>
  <div class="sp-v" id="sp-lb"><div class="sp-lh"><button class="sp-av" data-a="set" aria-label="설정">떵</button><b>내 라이브러리</b><span class="sp-sp"></span><button class="sp-ib" data-a="lq" aria-label="검색">${I.search()}</button><button class="sp-ib" data-a="np" aria-label="새 플레이리스트">${I.plus}</button></div><div id="sp-lbf"></div><div id="sp-lbb"></div></div>
  <div class="sp-v" id="sp-dt"></div>
  <div class="sp-mini" id="sp-mini"><button class="sp-mc" data-a="full" aria-label="재생 화면 열기"><span id="sp-mcv" style="display:block;width:40px"></span><div><b id="sp-mt"></b><small id="sp-ma"></small></div></button><button class="sp-ib" id="sp-mh" data-a="like" aria-label="좋아요"></button><button class="sp-ib" id="sp-mp" data-a="pp" aria-label="재생/일시정지"></button><div class="sp-mg" id="sp-mg"><i></i></div></div>
  <nav class="sp-tabs" id="sp-tabs"></nav>
  <div class="sp-pl" id="sp-pl"><div class="sp-ph"><button class="sp-ib" data-a="fclose" aria-label="닫기">${I.down}</button><div><small>재생 중인 항목</small><b id="sp-fsrc"></b></div><button class="sp-ib" data-a="tmc" aria-label="더보기">${I.more}</button></div>
    <div class="sp-pc" id="sp-fcv"></div>
    <div class="sp-pt"><div><b id="sp-ft"></b><small id="sp-fa"></small></div><button class="sp-ib" id="sp-fh" data-a="like" aria-label="좋아요"></button></div>
    <div class="sp-sk"><input id="sp-sk" type="range" min="0" max="1000" step="1" value="0" aria-label="재생 위치"><div class="sp-tm"><span id="sp-t1">0:00</span><span id="sp-t2">0:00</span></div></div>
    <div class="sp-ct"><button class="sp-ib" id="sp-fs" data-a="shuf" aria-label="셔플">${I.shuf}</button><button class="sp-ib" data-a="prev" aria-label="이전 곡">${I.prev}</button><button class="sp-ib big" id="sp-fp" data-a="pp" aria-label="재생/일시정지"></button><button class="sp-ib" data-a="next" aria-label="다음 곡">${I.next}</button><button class="sp-ib" id="sp-fr" data-a="rep" aria-label="반복">${I.rep}</button></div>
    <div class="sp-pf"><button class="sp-ib" data-a="dv" aria-label="기기 선택">${I.dev}</button><button class="sp-ib" data-a="q" aria-label="재생 대기열">${I.queue}</button></div></div>
  <div class="sp-dim" id="sp-dim" data-a="shut"></div><div class="sp-sh" id="sp-sh"></div><div class="sp-ts" id="sp-ts"></div>`;
  const vv = window.visualViewport, kfit = () => { if (!isOpen || !vv) return; const k = Math.max(0, window.innerHeight - vv.height - vv.offsetTop); el.style.bottom = k + "px"; el.classList.toggle("kb", k > 80); };
  if (vv) { vv.addEventListener("resize", kfit); vv.addEventListener("scroll", kfit); }
  paintTab(); sync();
  function open() { if (isOpen) return; isOpen = true; if (typeof originFrom === "function") originFrom(el, "spotify"); screen.classList.remove("app-light"); setTimeout(() => { if (isOpen) screen.classList.remove("app-light"); }, 200); el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); if (tab === "hm") paintTab(); }
  function close() {
    if (!isOpen) return; isOpen = false; shut(); $("#sp-pl").classList.remove("on"); el.classList.remove("open", "kb"); el.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (!isOpen) { el.classList.remove("show"); el.style.bottom = ""; } }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail.id === "spotify") open(); });
  document.addEventListener("app:close", close);
  return { open, close,
    info() { const t = cur(); return t ? { t: t.t, a: t.a, h: ent("a" + t.ai).h, pos, d: t.d, playing } : null; },
    toggle() { if (qi >= 0) setPlay(!playing); }, next() { next(); }, prev() { prev(); } };
})();

(()=>{const s=document.createElement("style");s.textContent="/* ===== 17차: Spotify 앱 ===== */\n#sp-app{--tb:calc(49px + env(safe-area-inset-bottom,0px) + 26px);--gb:calc(env(safe-area-inset-bottom,0px) + 26px);position:absolute;inset:0;z-index:5;display:none;background:#121212;color:#fff;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font);font-size:15px;line-height:1.35}\n#sp-app.show{display:block}\n#sp-app.open{opacity:1;transform:none;border-radius:0}\n#sp-app *{box-sizing:border-box}\n#sp-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent;text-align:left}\n#sp-app svg{width:24px;height:24px;display:block;flex:none}\n#sp-app b{font-weight:700}\n#sp-app small{display:block;color:#b3b3b3;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-sp{flex:1;min-width:0}\n#sp-app .sp-v{position:absolute;left:0;right:0;top:0;bottom:0;overflow-y:auto;overflow-x:hidden;touch-action:pan-y;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:calc(env(safe-area-inset-top,0px) + 54px) 0 calc(var(--tb) + 84px);display:none;z-index:1}\n#sp-app .sp-v.on{display:block}\n#sp-app #sp-dt{z-index:2;background:#121212}\n#sp-app .sp-ib{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none;transition:transform .1s}\n#sp-app .sp-ib:active{transform:scale(.88)}\n#sp-app .sp-ib.sm{width:40px;height:40px;color:#b3b3b3}\n#sp-app .sp-ib.sm svg{width:20px;height:20px}\n#sp-app .sp-ib.on{color:#1ed760}\n#sp-app .sp-hd{display:flex;align-items:center;gap:4px;padding:6px 8px 10px 16px;font-size:22px}\n#sp-app .sp-av{width:36px;height:36px;border-radius:50%;background:#1ed760;color:#000;font-weight:700;font-size:15px;display:grid;place-items:center;margin-right:8px;flex:none;text-align:center}\n#sp-app .sp-qg{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 12px 8px}\n#sp-app .sp-qc{display:flex;align-items:center;gap:10px;height:56px;border-radius:6px;background:#2a2a2a;overflow:hidden;padding-right:8px;min-width:0}\n#sp-app .sp-qc .sp-cv{width:56px;border-radius:0;flex:none}\n#sp-app .sp-qc b{font-size:13px;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n#sp-app .sp-qc:active,#sp-app .sp-row:active,#sp-app .sp-tr:active{background:#2a2a2a}\n#sp-app .sp-h{margin:22px 16px 10px;font-size:22px;font-weight:700}\n#sp-app .sp-hs{display:flex;gap:14px;overflow-x:auto;padding:0 16px;scrollbar-width:none}\n#sp-app .sp-hs::-webkit-scrollbar{display:none}\n#sp-app .sp-cd{flex:none;width:140px}\n#sp-app .sp-cd .sp-cv{width:140px;margin-bottom:8px}\n#sp-app .sp-cd b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-cd.ar{text-align:center}\n#sp-app .sp-cv{position:relative;width:100%;aspect-ratio:1;border-radius:6px;overflow:hidden;background:linear-gradient(135deg,hsl(var(--h) 70% 52%),hsl(calc(var(--h) + 50) 65% 26%));flex:none;display:block}\n#sp-app .sp-cv svg{width:100%;height:100%}\n#sp-app .sp-cv.rd{border-radius:50%}\n#sp-app .sp-cv.lk{background:linear-gradient(135deg,#4500f5,#9aa6e8);display:grid;place-items:center}\n#sp-app .sp-cv.lk svg{width:46%;height:46%;color:#fff}\n#sp-app .sp-row{display:flex;align-items:center;gap:12px;width:100%;padding:6px 16px}\n#sp-app .sp-row .sp-cv{width:56px}\n#sp-app .sp-row div{flex:1;min-width:0}\n#sp-app .sp-row b{display:block;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-tr{display:flex;align-items:center;padding:0 4px 0 16px}\n#sp-app .sp-tp{flex:1;min-width:0;display:flex;align-items:center;gap:12px;padding:6px 0}\n#sp-app .sp-tp .sp-cv{width:48px}\n#sp-app .sp-tr[data-ctx="popular"] .sp-tp .sp-cv{width:36px}\n#sp-app .sp-tp div{flex:1;min-width:0}\n#sp-app .sp-tp b{display:block;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-tp i{width:24px;text-align:center;font-style:normal;color:#b3b3b3;flex:none}\n#sp-app .sp-tr.sp-now b,#sp-app .sp-tr.sp-now i{color:#1ed760}\n#sp-app .sp-tl{margin:0 16px 10px;font-size:22px;font-weight:700}\n#sp-app .sp-chips{display:flex;gap:8px;overflow-x:auto;padding:4px 16px 10px;scrollbar-width:none}\n#sp-app .sp-chips::-webkit-scrollbar{display:none}\n#sp-app .sp-chips button{flex:none;height:34px;padding:0 14px;border-radius:17px;background:#2a2a2a;font-size:14px}\n#sp-app .sp-chips button.on{background:#1ed760;color:#000}\n#sp-app .sp-sf{display:flex;align-items:center;gap:8px;margin:4px 16px 12px;height:44px;border-radius:8px;background:#fff;color:#000;padding:0 12px}\n#sp-app .sp-sf input{flex:1;min-width:0;border:0;outline:0;background:none;font-family:var(--font);font-size:16px;color:#000;height:44px;padding:0;-webkit-appearance:none}\n#sp-app .sp-sf svg{width:22px;height:22px}\n#sp-app .sp-lqf{display:flex;align-items:center;gap:8px;margin:0 16px 10px;height:40px;border-radius:8px;background:#2a2a2a;padding:0 12px}\n#sp-app .sp-lqf input{flex:1;min-width:0;border:0;outline:0;background:none;font-family:var(--font);font-size:16px;color:#fff;height:40px;padding:0}\n#sp-app .sp-gg{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 16px}\n#sp-app .sp-gc{position:relative;height:96px;border-radius:8px;overflow:hidden;padding:12px;font-weight:700;font-size:17px}\n#sp-app .sp-gc .sp-cv{position:absolute;right:-12px;bottom:-4px;width:64px;transform:rotate(25deg);border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.3)}\n#sp-app .sp-em{padding:48px 32px;text-align:center;color:#b3b3b3}\n#sp-app .sp-em b{display:block;color:#fff;font-size:18px;margin-bottom:6px}\n#sp-app .sp-lh{display:flex;align-items:center;gap:4px;padding:6px 8px 6px 16px;font-size:22px}\n#sp-app .sp-ls{display:flex;align-items:center;gap:4px;padding:0 8px 6px 16px;font-size:13px;font-weight:600}\n#sp-app .sp-ls button{display:flex;align-items:center;gap:6px;height:36px}\n#sp-app .sp-ls svg{width:18px;height:18px}\n#sp-app .sp-lg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px 10px;padding:4px 16px}\n#sp-app .sp-lg .sp-cd{width:auto}\n#sp-app .sp-lg .sp-cd .sp-cv{width:100%}\n#sp-app .sp-dh{display:flex;align-items:center;padding:2px 8px}\n#sp-app .sp-hero{width:min(62%,230px);margin:8px auto 18px}\n#sp-app .sp-hero .sp-cv{box-shadow:0 8px 28px rgba(0,0,0,.5)}\n#sp-app .sp-hero.ar{width:min(50%,180px)}\n#sp-app .sp-dm{padding:0 16px}\n#sp-app .sp-dm h1{margin:0 0 2px;font-size:24px;line-height:1.2}\n#sp-app .sp-act{display:flex;align-items:center;padding:6px 12px 10px 8px}\n#sp-app .sp-pb{width:56px;height:56px;border-radius:50%;background:#1ed760;color:#000;display:grid;place-items:center}\n#sp-app .sp-pb svg{width:28px;height:28px}\n#sp-app .sp-pb:active{transform:scale(.93)}\n#sp-app .sp-mini{position:absolute;left:8px;right:8px;bottom:calc(var(--tb) + 6px);height:56px;border-radius:8px;background:hsl(var(--h) 32% 24%);z-index:4;display:none;align-items:center;padding-right:2px;overflow:hidden}\n#sp-app.has .sp-mini{display:flex}\n#sp-app .sp-mc{flex:1;min-width:0;display:flex;align-items:center;gap:10px;height:56px;padding-left:8px}\n#sp-app .sp-mc .sp-cv{width:40px;border-radius:4px}\n#sp-app .sp-mc div{min-width:0}\n#sp-app .sp-mc b{display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-mc small{font-size:12.5px;color:rgba(255,255,255,.7)}\n#sp-app .sp-mini .sp-ib{width:40px}\n#sp-app .sp-mini .sp-ib svg{width:24px;height:24px}\n#sp-app .sp-mg{position:absolute;left:8px;right:8px;bottom:0;height:2px;background:rgba(255,255,255,.25);border-radius:1px}\n#sp-app .sp-mg i{display:block;height:100%;width:0;background:#fff;border-radius:1px}\n#sp-app .sp-tabs{position:absolute;left:0;right:0;bottom:0;z-index:5;height:var(--tb);display:flex;align-items:flex-start;background:#121212}\n#sp-app .sp-tabs button{flex:1;height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:11px;color:#b3b3b3}\n#sp-app .sp-tabs button.on{color:#fff}\n#sp-app.kb .sp-tabs,#sp-app.kb .sp-mini{display:none}\n#sp-app .sp-pl{position:absolute;inset:0;z-index:20;display:flex;flex-direction:column;padding:calc(env(safe-area-inset-top,0px) + 54px) 24px var(--gb);background:linear-gradient(hsl(var(--h) 42% 34%),#121212 88%);transform:translateY(102%);transition:transform .35s cubic-bezier(.2,.9,.25,1);visibility:hidden}\n#sp-app .sp-pl.on{transform:none;visibility:visible}\n#sp-app .sp-ph{flex:none;display:flex;align-items:center;height:52px;margin:0 -12px}\n#sp-app .sp-ph div{flex:1;min-width:0;text-align:center}\n#sp-app .sp-ph small{font-size:11px;letter-spacing:.5px;color:#fff;opacity:.8}\n#sp-app .sp-ph b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-pc{flex:1;min-height:0;container-type:size;display:grid;place-items:center}\n#sp-app .sp-pc .sp-cv{width:min(100cqw,100cqh,360px);border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.5)}\n#sp-app .sp-pt{flex:none;display:flex;align-items:center;gap:8px;margin-top:18px}\n#sp-app .sp-pt div{flex:1;min-width:0}\n#sp-app .sp-pt b{display:block;font-size:22px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-pt small{font-size:16px}\n#sp-app .sp-pt .sp-ib{margin-right:-10px}\n#sp-app .sp-pt .sp-ib svg{width:26px;height:26px}\n#sp-app .sp-sk{flex:none;margin-top:10px}\n#sp-app input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:none;margin:0;display:block;touch-action:none}\n#sp-app input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:linear-gradient(to right,#fff var(--p,0%),rgba(255,255,255,.3) var(--p,0%))}\n#sp-app input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fff;margin-top:-4px}\n#sp-app input[type=range]::-moz-range-track{height:4px;border-radius:2px;background:rgba(255,255,255,.3)}\n#sp-app input[type=range]::-moz-range-progress{height:4px;background:#fff;border-radius:2px}\n#sp-app input[type=range]::-moz-range-thumb{width:12px;height:12px;border:0;border-radius:50%;background:#fff}\n#sp-app .sp-tm{display:flex;justify-content:space-between;font-size:12px;color:#b3b3b3;margin-top:2px}\n#sp-app .sp-ct{flex:none;display:flex;align-items:center;justify-content:space-between;margin:6px -8px 0}\n#sp-app .sp-ct .sp-ib{width:48px;height:48px}\n#sp-app .sp-ct .sp-ib svg{width:26px;height:26px}\n#sp-app .sp-ct .big{width:68px;height:68px;border-radius:50%;background:#fff;color:#000}\n#sp-app .sp-ct .big svg{width:32px;height:32px}\n#sp-app .sp-ct .on{position:relative}\n#sp-app .sp-ct .on::after{content:\"\";position:absolute;left:50%;bottom:5px;width:4px;height:4px;border-radius:50%;background:#1ed760;transform:translateX(-50%)}\n#sp-app .sp-ct sup{position:absolute;right:9px;top:8px;font-size:10px;font-weight:700}\n#sp-app .sp-pf{flex:none;display:flex;justify-content:space-between;margin:2px -8px 0;color:#fff}\n#sp-app .sp-dim{position:absolute;inset:0;z-index:30;background:rgba(0,0,0,.6);opacity:0;pointer-events:none;transition:opacity .25s}\n#sp-app .sp-dim.on{opacity:1;pointer-events:auto}\n#sp-app .sp-sh{position:absolute;left:0;right:0;bottom:0;z-index:31;max-height:80%;overflow-y:auto;background:#282828;border-radius:16px 16px 0 0;padding:8px 8px var(--gb);transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.9,.25,1)}\n#sp-app .sp-sh.on{transform:none}\n#sp-app .sp-sh1{display:flex;align-items:center;gap:12px;padding:12px 12px 14px;border-bottom:.5px solid #444;margin-bottom:6px}\n#sp-app .sp-sh1 .sp-cv{width:52px}\n#sp-app .sp-sh1 div{min-width:0;flex:1}\n#sp-app .sp-sh1 b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#sp-app .sp-si{display:flex;align-items:center;gap:16px;width:100%;min-height:52px;padding:6px 12px;font-size:16px;border-radius:8px}\n#sp-app .sp-si:active{background:#3a3a3a}\n#sp-app .sp-si svg{width:24px;height:24px;color:#b3b3b3}\n#sp-app .sp-si.g svg,#sp-app .sp-si.g{color:#1ed760}\n#sp-app .sp-si span{flex:1;min-width:0}\n#sp-app .sp-sh p{margin:4px 12px 10px;font-size:14px;color:#b3b3b3;line-height:1.5}\n#sp-app .sp-sh input{display:block;width:calc(100% - 24px);margin:8px 12px;height:48px;border:0;border-radius:8px;background:#3a3a3a;color:#fff;font-family:var(--font);font-size:17px;padding:0 14px;outline:0}\n#sp-app .sp-ok{display:block;width:calc(100% - 24px);margin:10px 12px 4px;height:48px;border-radius:24px;background:#1ed760;color:#000!important;font-weight:700;text-align:center!important}\n#sp-app .sp-ts{position:absolute;left:50%;bottom:calc(var(--tb) + 74px);transform:translate(-50%,10px);background:#fff;color:#000;padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:40;max-width:88%;text-align:center}\n#sp-app .sp-ts.on{opacity:1;transform:translate(-50%,0)}\n#sp-app .sp-si .sp-cv{width:44px}";document.head.appendChild(s);})();

/* App-specific styles moved from base.css */
(()=>{const s=document.createElement("style");s.textContent="/* ===== 사진 앱 (보관함) ===== */\n#pl-main{flex:1;min-height:0;display:flex;flex-direction:column;position:relative}";document.head.appendChild(s);})();
