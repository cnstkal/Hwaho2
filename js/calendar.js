/* ===== calendar.js (integrated) ===== */
/* ===== Calendar app ===== */
(() => {
  const $ = (s) => document.querySelector(s);
  const el = $("#cal-app"), screen = $("#screen");
  el.innerHTML = '<div id="cal-main"></div><div class="cal-backdrop" data-act="sheet-close"></div><div class="cal-sheet" id="cal-sheet"></div><div class="act-back" data-act="act-close"></div><div class="act" id="cal-act"></div><div class="pm-back" data-act="pm-close"></div><div class="cal-pm" id="cal-pm"></div>';
  const main = $("#cal-main"), sheet = $("#cal-sheet"), bd = el.querySelector(".cal-backdrop"), act = $("#cal-act"), ab = el.querySelector(".act-back"), pm = $("#cal-pm"), pmb = el.querySelector(".pm-back");

  const WD = ["일","월","화","수","목","금","토"];
  const CALS = [
    { id: "personal", name: "개인", color: "#ff9500" },
    { id: "school", name: "학교", color: "#2fa8e8" },
    { id: "meet", name: "약속", color: "#34c759" },
    { id: "important", name: "중요", color: "#ff3b30" },
  ];
  const KEY_E = "ioshome.calendar.events.v1", KEY_H = "ioshome.calendar.hidden.v1", KEY_V = "ioshome.calendar.style.v1", KEY_A = "ioshome.calendar.alerts.v1";
  const pad = n => String(n).padStart(2, "0");
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hm = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const iso = d => `${ymd(d)}T${hm(d)}`;
  const pd = s => { const [y, m, d] = s.slice(0, 10).split("-").map(Number); return new Date(y, m - 1, d); };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtT = t => { const h = +t.slice(0, 2); return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${t.slice(3, 5)}`; };
  const dl = s => { const d = pd(s); return `${d.getMonth() + 1}월 ${d.getDate()}일 ${WD[d.getDay()]}요일`; };
  const dlY = s => `${pd(s).getFullYear()}년 ${dl(s)}`;
  const load = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? f : v; } catch (e) { return f; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  let events = load(KEY_E, []), hidden = load(KEY_H, []);
  /* 기본 일정 시드 (최초 1회) */
  (function seed() {
    const KEY_S = "ioshome.calendar.seed.v5"; if (load(KEY_S, false)) return;
    events = events.filter(e => !String(e.id).startsWith("seed"));
    const Y = new Date().getFullYear();
    const R = [[1,8,"엄마 생일",8],[1,14,"타투",14],[1,22,"여행",24],[1,29,"건강검진",29],[2,11,"철수 생일",11],[2,20,"부산",20],[2,26,"치과",26],[3,16,"동창회",16],[3,23,"강아지 생일",23],[4,3,"생일",3],[4,26,"제주도",30],[5,12,"가족 식사",12],[5,18,"철수 결혼식",18],[6,10,"레도형 결혼식",10],[6,24,"베트남",28],[7,9,"프로필 사진 촬영",9],[7,21,"앨범 콘셉트 미팅",21],[8,2,"앨범 시작",2],[8,7,"피처링 녹음",7],[8,9,"민기 생일",9],[8,12,"1차 마감",12],[8,16,"프로듀서 미팅",16],[8,20,"재킷 촬영",20],[8,22,"뮤직비디오 사전 미팅",22],[8,27,"뮤직비디오 촬영",27],[8,30,"마스터링 마감",30],[9,1,"트랙리스트 확정",1],[9,3,"타이틀곡 믹싱 마감",3],[9,7,"클럽 공연",7],[9,11,"앨범 전달",11],[9,13,"힙페",13],[9,21,"대축",21],[10,1,"발매",1],[10,4,"대축",4],[10,10,"엠카",10],[10,12,"화보",12],[10,14,"공연",14],[10,20,"지방 공연",20],[10,22,"클럽 공연",22],[10,30,"해외 공연",30],[11,4,"녹음",4],[11,6,"대학 축제",6],[11,7,"홍중 생일",7],[11,8,"힙페",8],[11,10,"리믹스 작업 마감",10],[11,14,"클럽 공연",14],[11,18,"뮤직비디오 촬영",18],[11,20,"발매",20],[11,22,"음악 방송",22],[11,24,"지방 공연",24],[11,28,"합동 공연",28],[12,2,"연말 무대 사전 녹화",2],[12,4,"브랜드 행사",4],[12,10,"합동 싱글 발매",10],[12,12,"클럽 공연",12],[12,18,"연말 공연",18],[12,27,"마지막 공연",27],[12,29,"앨범 미팅",29],[2,8,"쇼미",8],[3,15,"쇼미",15],[4,19,"쇼미",19],[5,24,"쇼미",24],[6,28,"쇼미",28],[7,25,"쇼미",25]];
    R.forEach((r, i) => { const k = `${Y}-${pad(r[0])}-${pad(r[1])}`, k2 = `${Y}-${pad(r[0])}-${pad(r[3])}`; events.push({ id: "seed" + i, title: r[2], loc: "", notes: "", allDay: true, start: k + "T00:00", end: k2 + "T23:59", cal: "school", rep: "", trv: "0", alr: "", url: "" }); });
    store(KEY_E, events); store(KEY_S, true);
  })();
  let today = ymd(new Date());
  const T0 = new Date();
  const S = { view: "month", y: T0.getFullYear(), m: T0.getMonth(), sel: today, q: "" };
  let isOpen = false, editing = null, pv = null;

  const ico = {
    l: '<svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    r: '<svg width="12" height="20" viewBox="0 0 12 20"><path d="M2 2l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    s: '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="9.500" cy="9.500" r="6.500" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14.500 14.500L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    v: '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    p: '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 3v16M3 11h16" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"/></svg>',
  };

  /* ---------- 데이터 ---------- */
  const vis = e => !hidden.includes(e.cal);
  const STY = [["compact", "간결"], ["stacked", "누적"], ["details", "세부 정보"], ["list", "목록"]];
  const REP = [["", "안 함"], ["d", "매일"], ["w", "매주"], ["b", "격주"], ["m", "매월"], ["y", "매년"]];
  const TRV = [["0", "없음"], ["5", "5분"], ["15", "15분"], ["30", "30분"], ["60", "1시간"]];
  const ALR = [["", "없음"], ["0", "일정 시작 시"], ["5", "5분 전"], ["15", "15분 전"], ["30", "30분 전"], ["60", "1시간 전"], ["1440", "1일 전"]];
  let mstyle = load(KEY_V, "compact"); if (!STY.some(s => s[0] === mstyle)) mstyle = "compact";
  let editK = null, pend = null;
  const addD = (k, n) => { const d = pd(k); d.setDate(d.getDate() + n); return ymd(d); };
  const dd = (a, b) => Math.round((pd(b) - pd(a)) / 864e5);
  const col = e => (CALS.find(x => x.id === e.cal) || CALS[0]).color;
  const nm = (arr, v) => (arr.find(x => x[0] === String(v == null ? "" : v)) || arr[0])[1];
  const newId = () => "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function rmatch(e, s) {
    const sd = e.start.slice(0, 10); if (s < sd || (e.ex && e.ex.includes(s))) return false;
    const n = dd(sd, s), a = pd(sd), b = pd(s);
    switch (e.rep) {
      case "d": return true; case "w": return n % 7 === 0; case "b": return n % 14 === 0;
      case "m": return a.getDate() === b.getDate();
      case "y": return a.getDate() === b.getDate() && a.getMonth() === b.getMonth();
    }
    return s === sd;
  }
  function occOn(e, k) {
    const sd = e.start.slice(0, 10), ed = e.end.slice(0, 10);
    if (!e.rep) return sd <= k && ed >= k ? [Object.assign({}, e, { oc: sd })] : [];
    const span = dd(sd, ed);
    for (let j = 0; j <= span; j++) {
      const s = addD(k, -j);
      if (rmatch(e, s)) { const sh = dd(sd, s); return [Object.assign({}, e, { oc: s, start: addD(sd, sh) + e.start.slice(10), end: addD(ed, sh) + e.end.slice(10) })]; }
    }
    return [];
  }
  const onDay = k => events.filter(vis).flatMap(e => occOn(e, k))
    .sort((a, b) => (Number(b.allDay) - Number(a.allDay)) || a.start.localeCompare(b.start));
  const mins = s => +s.slice(11, 13) * 60 + +s.slice(14, 16);
  function lanes(items) {
    items.sort((a, b) => a.s - b.s || b.en - a.en);
    const out = []; let cl = [], end = 0;
    const flush = () => { const cs = []; cl.forEach(it => { let c = cs.findIndex(x => x <= it.s); if (c < 0) { c = cs.length; cs.push(0); } cs[c] = it.en; it.c = c; }); cl.forEach(it => { it.n = cs.length; }); out.push(...cl); cl = []; };
    items.forEach(it => { if (cl.length && it.s >= end) { flush(); end = 0; } cl.push(it); end = Math.max(end, it.en); });
    if (cl.length) flush(); return out;
  }
  const timeCol = (e, k) => {
    const sd = e.start.slice(0, 10), ed = e.end.slice(0, 10);
    if (e.allDay) return ["종일", ""];
    if (sd === ed) return [fmtT(e.start.slice(11)), fmtT(e.end.slice(11))];
    if (k === sd) return [fmtT(e.start.slice(11)), ""];
    if (k === ed) return ["종일", fmtT(e.end.slice(11))];
    return ["종일", ""];
  };
  const evRow = (e, k) => {
    const c = CALS.find(x => x.id === e.cal) || CALS[0], t = timeCol(e, k);
    return `<div class="ev" data-act="ev-open" data-id="${e.id}" data-k="${e.oc || k}"><div class="t"><b>${t[0]}</b><span>${t[1]}</span></div><i class="bar" style="background:${c.color}"></i><div class="c"><div class="ti">${esc(e.title)}</div>${e.loc ? `<div class="lo">${esc(e.loc)}</div>` : ""}</div></div>`;
  };

  /* ---------- 렌더 ---------- */
  const WDM = ["월", "화", "수", "목", "금", "토", "일"], mOff = d => (d.getDay() + 6) % 7;
  const HH = 56, MM = HH / 60, RED = "#eb4a47";
  const HOL_FIX = { "01-01": "신정", "03-01": "삼일절", "05-05": "어린이날", "06-06": "현충일", "08-15": "광복절", "10-03": "개천절", "10-09": "한글날", "12-25": "크리스마스" };
  const HOL_26 = { "02-16": "설날 연휴", "02-17": "설날", "02-18": "설날 연휴", "03-02": "삼일절 대체공휴일", "05-01": "노동절", "05-24": "부처님오신날", "05-25": "부처님오신날 대체공휴일", "06-03": "전국동시지방선거", "07-17": "제헌절", "08-17": "광복절 대체공휴일", "09-24": "추석 연휴", "09-25": "추석", "09-26": "추석 연휴", "10-05": "개천절 대체공휴일" };
  const hol = k => (k.slice(0, 4) === "2026" && HOL_26[k.slice(5)]) || HOL_FIX[k.slice(5)] || "";
  const IC = {
    back: '<svg width="14" height="22" viewBox="0 0 14 22"><path d="M11 2L3 11l8 9" fill="none" stroke="currentColor" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mon: '<svg width="30" height="30" viewBox="0 0 30 30"><rect x="3" y="3" width="24" height="11" rx="3.500" fill="none" stroke="currentColor" stroke-width="2.600"/><rect x="3" y="18" width="24" height="9" rx="3.500" fill="none" stroke="currentColor" stroke-width="2.600"/><path d="M8 8.500h8M8 22.500h6" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"/></svg>',
    day: '<svg width="30" height="30" viewBox="0 0 30 30"><rect x="8" y="3.500" width="19" height="23" rx="4" fill="none" stroke="currentColor" stroke-width="2.600"/><path d="M8 10.500h19M8 19.500h19" stroke="currentColor" stroke-width="2.200"/><circle cx="3" cy="8" r="1.300" fill="currentColor"/><circle cx="3" cy="15" r="1.300" fill="currentColor"/><circle cx="3" cy="22" r="1.300" fill="currentColor"/></svg>',
    s: '<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="13" cy="13" r="8.500" fill="none" stroke="currentColor" stroke-width="2.700"/><path d="M19.500 19.500L26 26" stroke="currentColor" stroke-width="2.700" stroke-linecap="round"/></svg>',
    p: '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M15 4v22M4 15h22" stroke="currentColor" stroke-width="2.700" stroke-linecap="round"/></svg>',
    cal: '<svg width="30" height="30" viewBox="0 0 30 30"><rect x="3" y="4" width="24" height="23" rx="4" fill="currentColor"/><rect x="3" y="4" width="24" height="6" rx="3" fill="currentColor"/><g fill="#fff"><circle cx="9" cy="14" r="1.200"/><circle cx="13" cy="14" r="1.200"/><circle cx="17" cy="14" r="1.200"/><circle cx="21" cy="14" r="1.200"/><circle cx="9" cy="18" r="1.200"/><circle cx="13" cy="18" r="1.200"/><circle cx="17" cy="18" r="1.200"/><circle cx="21" cy="18" r="1.200"/><circle cx="9" cy="22" r="1.200"/><circle cx="13" cy="22" r="1.200"/><circle cx="17" cy="22" r="1.200"/></g><path d="M3 10h24" stroke="#fff" stroke-width="1"/></svg>',
    inbox: '<svg width="32" height="30" viewBox="0 0 32 30"><path d="M4 16l4-10a2 2 0 0 1 2-1.300h12a2 2 0 0 1 2 1.300l4 10v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linejoin="round"/><path d="M4 16h7a2 2 0 0 1 2 2 3 3 0 0 0 6 0 2 2 0 0 1 2-2h7" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linejoin="round"/></svg>'
  };
  const tb = (left, v) => `<div class="cal-top">${left}<div class="cal-r gl">${v === "year" ? "" : `<button class="cal-btn ib" data-act="views" aria-label="보기 전환">${v === "month" ? IC.mon : IC.day}</button>`}<button class="cal-btn ib" data-act="search" aria-label="검색">${IC.s}</button><button class="cal-btn ib" data-act="add" aria-label="일정 추가">${IC.p}</button></div></div>`;
  const bottom = () => `<div class="cal-bottom"></div>`;
  const holChip = n => `<span class="chip hol"><u>★</u>${n}</span>`;

  function cellIn(k, d) {
    const l = onDay(k), h = hol(k); let x = `<span class="n">${d.getDate()}</span>`;
    if (mstyle === "stacked" || mstyle === "list") x += `<span class="dots">${(h ? ['<i style="--c:#b56fd8"></i>'] : []).concat(l.slice(0, 3).map(e => `<i style="--c:${col(e)}"></i>`)).slice(0, 3).join("")}</span>`;
    else {
      const it = []; if (h) it.push(`<i class="mc hol"><u>★</u><b class="mt">${h}</b></i>`);
      l.forEach(e => it.push(`<i class="mc" style="--c:${col(e)};--bg:${col(e)}33"><b class="mt">${esc(e.title)}</b></i>`));
      const lim = mstyle === "details" ? 4 : 3;
      x += `<span class="mcs">${it.slice(0, lim).join("")}${it.length > lim ? `<em>+${it.length - lim}</em>` : ""}</span>`;
    }
    return x;
  }
  function monthHTML() {
    const off = mOff(new Date(S.y, S.m, 1)), n = new Date(S.y, S.m + 1, 0).getDate(), rows = Math.ceil((off + n) / 7);
    let cells = "";
    for (let i = 0; i < rows * 7; i++) {
      const d = new Date(S.y, S.m, 1 - off + i), k = ymd(d);
      cells += `<button class="d${d.getMonth() !== S.m ? " out" : ""}${i % 7 > 4 ? " we" : ""}${k === today ? " today" : ""}${k === S.sel ? " sel" : ""}" data-act="day" data-k="${k}">${cellIn(k, d)}</button>`;
    }
    return tb(`<button class="cal-btn gl lb" data-act="year">${IC.back}<span>${S.y}년</span></button>`, "month") +
      `<div class="cal-title"><h1>${S.m + 1}월</h1></div>` +
      `<div class="cal-wd">${WDM.map(w => `<span>${w}</span>`).join("")}</div><div class="cal-grid m-${mstyle}" style="--rows:${rows}">${cells}</div>` + bottom();
  }
  function tgHTML() {
    const wk = S.view === "week", n = wk ? 7 : 1, sdt = pd(S.sel), first = new Date(sdt); first.setDate(sdt.getDate() - mOff(sdt));
    const LW = wk ? 52 : 80;
    const wdays = Array.from({ length: 7 }, (_, i) => { const d = new Date(first); d.setDate(first.getDate() + i); return ymd(d); });
    const days = wk ? wdays : [S.sel];
    const dh = (k, i) => { const d = pd(k); return `<button class="dh${i > 4 ? " we" : ""}${k === today ? " today" : ""}${k === S.sel ? " sel" : ""}" data-act="tgday" data-k="${k}"><small>${WD[d.getDay()]}</small><b>${d.getDate()}</b></button>`; };
    const head = wk ? `<div class="tg-hd" style="grid-template-columns:${LW}px repeat(7,1fr)"><span></span>${wdays.map(dh).join("")}</div><div class="dtitle">${sdt.getFullYear()}년 ${sdt.getMonth() + 1}월</div>` : `<div class="tg-hd strip">${wdays.map(dh).join("")}</div><div class="dtitle">${dlY(S.sel)}</div>`;
    const per = days.map(k => onDay(k));
    const adI = days.map((k, i) => (hol(k) ? [holChip(hol(k))] : []).concat(per[i].filter(e => e.allDay).map(e => `<button class="chip" data-act="ev-open" data-id="${e.id}" data-k="${e.oc}" style="--c:${col(e)};--bg:${col(e)}33"><u class="ci"><svg viewBox="0 0 12 12" width="60%" height="60%"><rect x="1.5" y="2.5" width="9" height="8" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M1.5 5h9M4 1.5v2M8 1.5v2" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg></u>${esc(e.title)}</button>`)));
    const ad = adI.some(x => x.length) ? `<div class="tg-ad${wk ? " wk" : ""}" style="grid-template-columns:${LW}px 1fr"><span class="g">하루<br>종일</span><div class="cs" style="--n:${n}">${adI.map(x => `<div>${x.join("")}</div>`).join("")}</div></div>` : "";
    let hl = ""; for (let h = 1; h < 24; h++) hl += `<div class="hl" style="top:${h * HH}px"><span>${h === 12 ? '<b class="nn">정오</b>' : `<small>${h < 12 ? "오전" : "오후"}</small><b>${h % 12}</b><small>시</small>`}</span><i></i></div>`;
    const nw = new Date(), nowM = nw.getHours() * 60 + nw.getMinutes();
    const cols = days.map((k, i) => {
      const its = per[i].filter(e => !e.allDay).map(e => { const s0 = e.start.slice(0, 10) === k ? mins(e.start) : 0, en = e.end.slice(0, 10) === k ? mins(e.end) : 1440; return { e, s: s0, en: Math.min(1440, Math.max(en, s0 + 30)) }; });
      const bl = lanes(its).map(it => {
        const e = it.e, c = col(e), top = it.s * MM, h = Math.max((it.en - it.s) * MM - 1, 20), w = `left:calc(${it.c / it.n * 100}% + 1px);width:calc(${100 / it.n}% - 2px)`;
        const tr = +e.trv > 0 && e.start.slice(0, 10) === k && top > 0 ? `<i class="trv" style="top:${Math.max(0, top - e.trv * MM)}px;height:${Math.min(top, e.trv * MM)}px;${w};--c:${c};--bg:${c}33"></i>` : "";
        return tr + `<button class="tev" data-act="ev-open" data-id="${e.id}" data-k="${e.oc}" style="top:${top}px;height:${h}px;${w};--c:${c};--bg:${c}33"><b>${esc(e.title)}</b>${h >= 36 ? `<span>${fmtT(e.start.slice(11))}</span>` : ""}</button>`;
      }).join("");
      return `<div class="tc" style="left:calc(${LW}px + (100% - ${LW}px) * ${i} / ${n});width:calc((100% - ${LW}px) / ${n})">${bl}${k === today ? `<div class="now" style="top:${nowM * MM}px"></div>` : ""}</div>`;
    }).join("");
    S.dsc = days.includes(today) ? Math.max(0, nowM * MM - 160) : 5 * HH - 6;
    return tb(`<button class="cal-btn gl lb" data-act="to-month">${IC.back}<span>${sdt.getMonth() + 1}월</span></button>`, S.view) + head + ad + `<div class="tg-sc" id="tg-sc"><div class="tg-b${wk ? " wk" : ""}" style="--lw:${LW}px">${hl}${cols}</div></div>` + bottom();
  }
  function yearHTML() {
    const ty = +today.slice(0, 4), tm = +today.slice(5, 7) - 1;
    let h = "";
    for (let m = 0; m < 12; m++) {
      const off = mOff(new Date(S.y, m, 1)), n = new Date(S.y, m + 1, 0).getDate();
      let c = "";
      for (let i = 0; i < off; i++) c += "<i></i>";
      for (let d = 1; d <= n; d++) c += `<span${`${S.y}-${pad(m + 1)}-${pad(d)}` === today ? ' class="t"' : ""}>${d}</span>`;
      h += `<button class="ym${S.y === ty && m === tm ? " cur" : ""}" data-act="pick-month" data-m="${m}"><b>${m + 1}월</b><div class="mg">${c}</div></button>`;
    }
    return tb('<span class="sp"></span>', "year") + `<div class="ytitle${S.y === ty ? " cur" : ""}">${S.y}년</div><div class="year">${h}</div>` + bottom();
  }
  function render(dir) {
    if (S.view === "search") return renderSearch();
    const old = main.querySelector(".tg-sc"); if (old) S.sc = old.scrollTop;
    const tg = S.view === "day" || S.view === "week";
    main.innerHTML = S.view === "year" ? yearHTML() : tg ? tgHTML() : monthHTML();
    if (dir && S.view === "month") main.querySelector(".cal-grid").classList.add(dir > 0 ? "sl" : "sr");
    if (tg) { const sc = $("#tg-sc"); sc.scrollTop = S.sc != null ? S.sc : S.dsc; if (dir) sc.firstChild.classList.add(dir > 0 ? "sl" : "sr"); }
  }
  function step(dl2) {
    if (S.view === "year") { S.y += dl2; render(dl2); return; }
    if (S.view === "day" || S.view === "week") { S.sel = addD(S.sel, dl2 * (S.view === "week" ? 7 : 1)); const d = pd(S.sel); setMonth(d.getFullYear(), d.getMonth()); render(dl2); } else go(dl2);
  }
  const chk = '<svg viewBox="0 0 16 16"><path d="M2 8.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function openViews() {
    const it = (a, v, l, on) => `<button class="pm${on ? " on" : ""}" data-act="${a}" data-v="${v}"><span>${l}</span>${chk}</button>`;
    pm.innerHTML = [["day", "일"], ["week", "주"], ["month", "월"], ["year", "년"]].map(([v, l]) => it("setview", v, l, S.view === v)).join("") + '<div class="ps">월간 표시 방식</div>' + STY.map(([v, l]) => it("setstyle", v, l, mstyle === v)).join("");
    pm.classList.add("on"); pmb.classList.add("on");
  }
  const closePm = () => { pm.classList.remove("on"); pmb.classList.remove("on"); };
  function renderSearch() {
    main.innerHTML = `<div class="cal-sbar"><label class="sfield">${ico.s}<input id="q" type="search" placeholder="일정 검색" autocomplete="off" autocapitalize="off" spellcheck="false"></label><button class="cal-btn" data-act="search-close">취소</button></div><div class="cal-list sres" id="res"></div>`;
    const q = $("#q"); q.value = S.q; updateRes();
    q.addEventListener("input", () => { S.q = q.value; updateRes(); });
    q.focus();
  }
  function updateRes() {
    const q = S.q.trim().toLowerCase(), nowI = iso(new Date());
    let l = events.filter(vis);
    l = q ? l.filter(e => `${e.title} ${e.loc || ""} ${e.notes || ""}`.toLowerCase().includes(q)) : l.filter(e => e.end >= nowI);
    l.sort((a, b) => a.start.localeCompare(b.start));
    let h = "", last = "";
    l.forEach(e => { const k = e.start.slice(0, 10); if (k !== last) { h += `<div class="list-date">${dlY(k)}</div>`; last = k; } h += evRow(e, k); });
    $("#res").innerHTML = h || `<div class="empty">${q ? "검색 결과 없음" : "예정된 일정 없음"}</div>`;
  }
  const refresh = () => { if (S.view === "search") updateRes(); else render(); };

  function setMonth(y, m) { S.y = y; S.m = m; }
  function go(delta) {
    const d = new Date(S.y, S.m + delta, 1); setMonth(d.getFullYear(), d.getMonth());
    if (ymd(d).slice(0, 7) === today.slice(0, 7)) S.sel = today;
    else S.sel = `${S.y}-${pad(S.m + 1)}-${pad(Math.min(+S.sel.slice(8, 10), new Date(S.y, S.m + 1, 0).getDate()))}`;
    render(delta);
  }

  /* ---------- 시트 ---------- */
  function openSheet(html) { sheet.innerHTML = html; sheet.scrollTop = 0; sheet.classList.add("on"); bd.classList.add("on"); }
  function closeSheet() {
    sheet.classList.remove("on"); bd.classList.remove("on"); closeAct();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }
  function openAct(msg, btns) {
    act.innerHTML = `<div class="ag"><div class="am">${msg}</div>${btns.map(b => `<button class="ab${b[2] ? " red" : ""}" data-act="${b[0]}">${b[1]}</button>`).join("")}</div><div class="ag"><button class="ab" data-act="act-close">취소</button></div>`;
    act.classList.add("on"); ab.classList.add("on");
  }
  function askDel() {
    if (editing && editing.rep) openAct("반복되는 일정입니다.", [["do-del-one", "이 일정만 삭제", 1], ["do-del-all", "모든 이벤트 삭제", 1]]);
    else openAct("이 일정을 삭제하시겠습니까?", [["do-del-all", "일정 삭제", 1]]);
  }
  function delEv(scope) {
    if (!editing) return;
    if (editing.rep && scope === "one") editing.ex = (editing.ex || []).concat(editK);
    else events = events.filter(e => e !== editing);
    store(KEY_E, events); closeSheet(); refresh();
  }
  function commit(f, scope) {
    const old = editing, sel0 = f.start.slice(0, 10);
    if (!old) events.push(Object.assign({ id: newId() }, f));
    else if (old.rep && scope === "one") { old.ex = (old.ex || []).concat(editK); events.push(Object.assign({}, f, { id: newId(), rep: "" })); }
    else {
      if (old.rep) { const span = dd(f.start.slice(0, 10), f.end.slice(0, 10)), bs = addD(old.start.slice(0, 10), dd(editK, f.start.slice(0, 10))); f.start = bs + f.start.slice(10); f.end = addD(bs, span) + f.end.slice(10); }
      events[events.indexOf(old)] = Object.assign({}, f, { id: old.id, ex: old.ex });
    }
    store(KEY_E, events);
    S.sel = sel0; const d = pd(S.sel); setMonth(d.getFullYear(), d.getMonth());
    closeSheet(); refresh();
  }
  const selH = (id, arr) => `<span class="calsel"><select id="${id}">${arr.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></span>`;
  function openDetail(id, k) {
    const p = events.find(e => e.id === id); if (!p) return;
    editing = p; editK = k || p.start.slice(0, 10);
    const e = occOn(p, editK)[0] || p, c = CALS.find(x => x.id === e.cal) || CALS[0], sd = e.start.slice(0, 10), ed = e.end.slice(0, 10);
    const when = e.allDay ? `${dlY(sd)}${sd !== ed ? " – " + dlY(ed) : ""}<small>종일</small>` : sd === ed ? `${dlY(sd)}<small>${fmtT(e.start.slice(11))} – ${fmtT(e.end.slice(11))}</small>` : `${dlY(sd)} ${fmtT(e.start.slice(11))}<small>${dlY(ed)} ${fmtT(e.end.slice(11))}까지</small>`;
    const row = (l, v) => v ? `<div class="dr"><span>${l}</span><div>${v}</div></div>` : "";
    const url = e.url ? (/^https?:\/\//i.test(e.url) ? `<a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.url)}</a>` : esc(e.url)) : "";
    openSheet(`<div class="sh-top"><button class="cal-btn" data-act="sheet-close">닫기</button><b>세부사항</b><button class="cal-btn strong" data-act="edit">편집</button></div><div class="sh-body"><div class="grp"><div class="dh1" style="--c:${c.color}"><b>${esc(e.title)}</b><div class="wn">${when}</div></div></div><div class="grp">${row("캘린더", `<i class="dot2" style="background:${c.color}"></i>${c.name}`)}${row("위치", esc(e.loc || ""))}${row("반복", e.rep ? nm(REP, e.rep) : "")}${row("이동 시간", +e.trv > 0 ? nm(TRV, e.trv) : "")}${row("알림", e.alr !== "" && e.alr != null ? nm(ALR, e.alr) : "")}${row("URL", url)}</div>${e.notes ? `<div class="grp">${row("메모", esc(e.notes))}</div>` : ""}<div class="grp"><button class="row danger" data-act="ask-del">일정 삭제</button></div></div>`);
  }
  function closeAct() { act.classList.remove("on"); ab.classList.remove("on"); }

  const fv = id => $("#" + id);
  const getDT = p => new Date(`${fv("f-" + p + "d").value || today}T${fv("f-" + p + "t").value || "00:00"}`);
  const setDT = (p, d) => { fv("f-" + p + "d").value = ymd(d); fv("f-" + p + "t").value = hm(d); };

  function openEditor(id, k) {
    editing = id ? events.find(e => e.id === id) : null; editK = k || (editing && editing.start.slice(0, 10));
    let e = editing && (occOn(editing, editK)[0] || editing);
    if (!e) {
      const b = pd(S.sel), h = S.sel === today ? Math.min(new Date().getHours() + 1, 23) : 9;
      const s = new Date(b.getFullYear(), b.getMonth(), b.getDate(), h, 0);
      e = { title: "", loc: "", notes: "", allDay: false, start: iso(s), end: iso(new Date(s.getTime() + 3600000)), cal: "personal", rep: "", trv: "0", alr: "", url: "" };
    }
    openSheet(`<div class="sh-top"><button class="cal-btn" data-act="sheet-close">취소</button><b>${editing ? "일정 편집" : "새로운 일정"}</b><button class="cal-btn strong" data-act="save">${editing ? "완료" : "추가"}</button></div>
<div class="sh-body">
<div class="grp"><div class="row"><input id="f-title" type="text" placeholder="제목" enterkeyhint="done"></div><div class="row"><input id="f-loc" type="text" placeholder="위치" enterkeyhint="done"></div></div>
<div class="grp">
<div class="row"><span>종일</span><label class="sw"><input type="checkbox" id="f-all"><i></i></label></div>
<div class="row"><span>시작</span><span class="pair"><input type="date" id="f-sd"><input class="tm" type="time" id="f-st"></span></div>
<div class="row"><span>종료</span><span class="pair"><input type="date" id="f-ed"><input class="tm" type="time" id="f-et"></span></div>
<div class="row"><span>반복</span>${selH("f-rep", REP)}</div><div class="row tm"><span>이동 시간</span>${selH("f-trv", TRV)}</div>
</div>
<div class="grp"><div class="row"><span>캘린더</span><span class="calsel"><i class="dot" id="f-dot"></i><select id="f-cal">${CALS.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select></span></div><div class="row"><span>알림</span>${selH("f-alr", ALR)}</div></div>
<div class="grp"><div class="row"><input id="f-url" type="text" inputmode="url" placeholder="URL" autocapitalize="off" autocorrect="off" spellcheck="false"></div><div class="row notes"><textarea id="f-notes" placeholder="메모"></textarea></div></div>
${editing ? '<div class="grp"><button class="row danger" data-act="ask-del">일정 삭제</button></div>' : ""}
</div>`);
    fv("f-title").value = e.title; fv("f-loc").value = e.loc || ""; fv("f-notes").value = e.notes || "";
    fv("f-all").checked = !!e.allDay; sheet.classList.toggle("allday", !!e.allDay);
    fv("f-sd").value = e.start.slice(0, 10); fv("f-st").value = e.start.slice(11);
    fv("f-ed").value = e.end.slice(0, 10); fv("f-et").value = e.end.slice(11);
    fv("f-rep").value = e.rep || ""; fv("f-trv").value = String(e.trv || "0"); fv("f-alr").value = e.alr == null ? "" : String(e.alr); fv("f-url").value = e.url || "";
    fv("f-cal").value = e.cal; fv("f-dot").style.background = (CALS.find(c => c.id === e.cal) || CALS[0]).color;
    pv = getDT("s");
    if (!editing) setTimeout(() => { if (sheet.classList.contains("on")) fv("f-title").focus(); }, 380);
  }
  sheet.addEventListener("change", ev => {
    const id = ev.target.id;
    if (id === "f-all") sheet.classList.toggle("allday", ev.target.checked);
    else if (id === "f-cal") fv("f-dot").style.background = CALS.find(c => c.id === ev.target.value).color;
    else if (id === "f-sd" || id === "f-st") {
      const s = getDT("s");
      if (!isNaN(s) && pv && !isNaN(pv)) setDT("e", new Date(getDT("e").getTime() + (s - pv)));
      pv = s;
    } else if (id === "f-ed" || id === "f-et") {
      const s = getDT("s"), e = getDT("e");
      if (fv("f-all").checked ? ymd(e) < ymd(s) : e < s) setDT("e", s);
    }
  });
  sheet.addEventListener("keydown", ev => { if (ev.key === "Enter" && ev.target.type === "text") ev.target.blur(); });

  function saveEv() {
    const all = fv("f-all").checked;
    let sd = fv("f-sd").value || today, ed = fv("f-ed").value || sd, st = fv("f-st").value || "09:00", et = fv("f-et").value || "10:00";
    if (all) { st = "00:00"; et = "23:59"; if (ed < sd) ed = sd; }
    const start = `${sd}T${st}`; let end = `${ed}T${et}`;
    if (end < start) { const d = new Date(start); d.setHours(d.getHours() + 1); end = iso(d); }
    const f = { title: fv("f-title").value.trim() || "새로운 일정", loc: fv("f-loc").value.trim(), notes: fv("f-notes").value.trim(), allDay: all, start, end, cal: fv("f-cal").value, rep: fv("f-rep").value, trv: all ? "0" : fv("f-trv").value, alr: fv("f-alr").value, url: fv("f-url").value.trim() };
    if (editing && editing.rep) { pend = f; openAct("반복되는 일정입니다.", [["save-one", "이 일정만 저장"], ["save-all", "모든 이벤트 저장"]]); return; }
    commit(f, "all");
  }
  function openCals() {
    openSheet(`<div class="sh-top"><span class="sp"></span><b>캘린더</b><button class="cal-btn strong" data-act="sheet-close">완료</button></div><div class="sh-body"><div class="grp">${CALS.map(c => `<button class="row cl" data-act="tog" data-id="${c.id}"><span class="ck${hidden.includes(c.id) ? "" : " on"}" style="--c:${c.color}"></span><span>${c.name}</span></button>`).join("")}</div></div>`);
  }

  /* ---------- 이벤트 ---------- */
  let sx = 0, sy = 0, sw = false, swiped = false;
  el.addEventListener("pointerdown", e => { sw = !!e.target.closest(".cal-grid,.tg-sc,.tg-hd,.year,.ytitle"); sx = e.clientX; sy = e.clientY; });
  el.addEventListener("pointerup", e => {
    if (!sw) return; sw = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { swiped = true; setTimeout(() => (swiped = false), 60); step(dx < 0 ? 1 : -1); }
  });
  el.addEventListener("click", ev => {
    if (swiped) { swiped = false; return; }
    const t = ev.target.closest("[data-act]"); if (!t) return;
    const a = t.dataset.act;
    switch (a) {
      case "day": {
        const d = pd(t.dataset.k);
        S.sel = t.dataset.k; setMonth(d.getFullYear(), d.getMonth()); S.view = "day"; S.sc = null; render(); break;
      }
      case "prev": step(-1); break;
      case "next": step(1); break;
      case "views": openViews(); break;
      case "pm-close": closePm(); break;
      case "setview": S.view = t.dataset.v; closePm(); render(); break;
      case "setstyle": mstyle = t.dataset.v; store(KEY_V, mstyle); S.view = "month"; closePm(); render(); break;
      case "to-month": S.view = "month"; render(); break;
      case "tgday": { S.sel = t.dataset.k; const d = pd(S.sel); setMonth(d.getFullYear(), d.getMonth()); if (S.view === "week") S.view = "day"; S.sc = null; render(); break; }
      case "edit": openEditor(editing.id, editK); break;
      case "save-one": case "save-all": closeAct(); if (pend) commit(pend, a === "save-one" ? "one" : "all"); pend = null; break;
      case "do-del-one": delEv("one"); break;
      case "year": S.view = "year"; render(); break;
      case "prev-year": S.y--; render(); break;
      case "next-year": S.y++; render(); break;
      case "pick-month": {
        S.m = +t.dataset.m; S.view = "month";
        S.sel = `${S.y}-${pad(S.m + 1)}` === today.slice(0, 7) ? today : `${S.y}-${pad(S.m + 1)}-01`; render(); break;
      }
      case "search": case "upcoming": S.view = "search"; S.q = ""; render(); break;
      case "search-close": S.view = "month"; render(); break;
      case "add": openEditor(null); break;
      case "today": { today = ymd(new Date()); const d = new Date(); if (S.view === "year" || S.view === "search") S.view = "month"; S.sc = null; setMonth(d.getFullYear(), d.getMonth()); S.sel = today; render(); break; }
      case "cals": openCals(); break;
      case "ev-open": { const k = t.dataset.k; if (S.view === "search" && k) { S.sel = k; const d = pd(k); setMonth(d.getFullYear(), d.getMonth()); } openDetail(t.dataset.id, k); break; }
      case "sheet-close": closeSheet(); break;
      case "save": saveEv(); break;
      case "ask-del": askDel(); break;
      case "act-close": closeAct(); break;
      case "do-del-all": delEv("all"); break;
      case "tog": {
        const id = t.dataset.id;
        hidden = hidden.includes(id) ? hidden.filter(x => x !== id) : hidden.concat(id);
        store(KEY_H, hidden); t.querySelector(".ck").classList.toggle("on"); refresh(); break;
      }
    }
  });

  /* ---------- 알림 ---------- */
  let fired = load(KEY_A, {}), bnT = 0;
  const bn = document.createElement("div"); bn.id = "cal-banner"; screen.appendChild(bn);
  function banner(title, sub, day) {
    bn.innerHTML = `<span class="bi">${day}</span><div class="bt"><small>캘린더 · 지금</small><b>${esc(title)}</b><span>${esc(sub)}</span></div>`;
    bn.classList.add("on"); clearTimeout(bnT); bnT = setTimeout(() => bn.classList.remove("on"), 5000);
    try { if (window.Notification && Notification.permission === "granted") new Notification(title, { body: sub }); } catch (e) {}
  }
  bn.addEventListener("click", () => { bn.classList.remove("on"); if (!isOpen && window.Home) Home.openApp("calendar"); });
  function checkAlerts() {
    const now = Date.now(); let dirty = false, base = ymd(new Date());
    events.forEach(e => {
      if (e.alr === "" || e.alr == null || !vis(e)) return;
      [-1, 0, 1].forEach(j => occOn(e, addD(base, j)).forEach(o => {
        const st = new Date(o.start).getTime(), tr = st - (+e.alr) * 60000, key = e.id + "|" + o.start + "|" + e.alr;
        if (tr <= now && now - tr < 600000 && !fired[key]) { fired[key] = now; dirty = true; banner(o.title, o.allDay ? "오늘 · 종일" : fmtT(o.start.slice(11)) + (+e.alr ? " · " + nm(ALR, e.alr) : ""), pd(o.start).getDate()); }
      }));
    });
    if (dirty) { Object.keys(fired).forEach(k => { if (now - fired[k] > 2592e5) delete fired[k]; }); store(KEY_A, fired); }
  }
  setInterval(checkAlerts, 15000); setTimeout(checkAlerts, 1500);
  const dark = () => false;
  if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (isOpen) screen.classList.toggle("app-light", !dark()); });

  /* ---------- 열기/닫기 (홈 화면 연결) ---------- */
  function open() {
    if (isOpen) return; isOpen = true;
    today = ymd(new Date());
    if (S.view === "search") S.view = "month";
    render();
    const ic = document.querySelector('[data-app="calendar"] .icon'), sr = screen.getBoundingClientRect();
    if (ic) { const r = ic.getBoundingClientRect(); el.style.transformOrigin = `${r.left + r.width / 2 - sr.left}px ${r.top + r.height / 2 - sr.top}px`; }
    el.classList.add("show"); void el.offsetWidth; el.classList.add("open");
    el.setAttribute("aria-hidden", "false");
    setTimeout(() => { if (isOpen && !dark()) screen.classList.add("app-light"); }, 140);
  }
  function close() {
    if (!isOpen) return; isOpen = false;
    closeSheet();
    el.classList.remove("open"); screen.classList.remove("app-light"); el.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (!isOpen) el.classList.remove("show"); }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail.id === "calendar") open(); });
  document.addEventListener("app:close", close);
})();

/* App-specific styles */
(()=>{const style=document.createElement("style");style.textContent="/* ===== Calendar app ===== */\n#cal-app{position:absolute;inset:0;z-index:5;background:#fff;color:#000;display:none;flex-direction:column;padding-top:calc(env(safe-area-inset-top,0px) + 54px);opacity:0;transform:scale(.15);border-radius:44px;overflow:hidden;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s}\n#cal-app.show{display:flex}\n#cal-app.open{opacity:1;transform:none;border-radius:0}\n#cal-app button{font-family:var(--font)}\n";document.head.appendChild(style);})();
(()=>{const st=document.createElement("style");st.textContent=`
#cal-app .cal-top{height:60px;padding:6px 16px 0;align-items:flex-start;flex:none}
#cal-app .gl{background:#fff;border:1px solid #e4e4e8;border-radius:24px;box-shadow:0 4px 16px rgba(0,0,0,.09)}
#cal-app .cal-btn{color:#000}
#cal-app .cal-btn.lb{height:44px;padding:0 18px 0 14px;gap:12px;font-size:21px;font-weight:500;border-radius:24px}
#cal-app .cal-r.gl{height:44px;padding:0 4px}
#cal-app .cal-btn.ib{width:56px;height:44px;padding:0;justify-content:center;border-radius:22px}
#cal-app .cal-bottom{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:0 16px calc(env(safe-area-inset-bottom,0px) + 34px);background:none;border:0;pointer-events:none;align-items:flex-end}
#cal-app .cal-bottom>*{pointer-events:auto}
#cal-app .cal-bottom{justify-content:flex-end}
#cal-app .cal-bottom .tdy{height:48px;padding:0 26px;font-size:21px;font-weight:500;border-radius:24px}
#cal-app .cal-bottom .two{display:flex;height:48px;padding:0 4px;border-radius:24px}
#cal-app .cal-bottom .two .ib{height:48px;width:54px}
#cal-app .cal-title{padding:6px 20px 0}
#cal-app .cal-title h1{font-size:46px;font-weight:800;letter-spacing:-1.5px;line-height:1.15}
#cal-app .cal-wd{padding:6px 0 6px;font-size:13px;font-weight:700;color:#000;border-bottom:1px solid #d9d9dd}
#cal-app .cal-wd span:nth-child(n+6){color:#8e8e93}
#cal-app .cal-grid{flex:1;min-height:0;padding:0;grid-template-rows:repeat(var(--rows,5),1fr)}
#cal-app .cal-grid .d,#cal-app .cal-grid.m-stacked .d,#cal-app .cal-grid.m-details .d,#cal-app .cal-grid.m-list .d{height:auto;justify-content:flex-start;align-items:center;gap:6px;padding:12px 0 0;border-top:1px solid #d9d9dd;overflow:hidden;min-height:0}
#cal-app .cal-grid .d:nth-child(-n+7){border-top:0;padding-top:14px}
#cal-app .cal-grid .d.out{visibility:hidden}
#cal-app .cal-grid .d .n,#cal-app .cal-grid.m-stacked .d .n,#cal-app .cal-grid.m-details .d .n,#cal-app .cal-grid.m-list .d .n{width:40px;height:40px;font-size:25px;font-weight:600;flex:none}
#cal-app .cal-grid .d.we .n{color:#8e8e93}
#cal-app .cal-grid .d.sel .n{background:#000;color:#fff}
#cal-app .cal-grid .d.today .n{background:#eb4a47;color:#fff}
#cal-app .mcs{width:100%;display:flex;flex-direction:column;gap:3px;padding:0 1px;min-width:0}
#cal-app .mc{display:block;font-style:normal;font-size:13px;font-weight:700;line-height:26px;height:26px;border-radius:5px;padding:0 6px;background:var(--bg);color:var(--c);overflow:hidden;white-space:nowrap;text-align:left}
#cal-app .mc.hol{background:#ecdcf4;color:#6c3a8c}
#cal-app .mc u,#cal-app .chip u{display:inline-grid;place-items:center;width:19px;height:19px;border-radius:50%;background:#b56fd8;color:#fff;font-size:11px;text-decoration:none;margin-right:4px;vertical-align:middle;line-height:1}
#cal-app .mcs em{font-size:11px;color:#8e8e93;font-style:normal;text-align:center}
#cal-app .tg-hd.strip{padding:4px 8px 8px;border-bottom:1px solid #d9d9dd}
#cal-app .tg-hd{border-bottom:1px solid #d9d9dd}
#cal-app .dh small{font-size:13px;font-weight:700;color:#000}
#cal-app .dh b{width:34px;height:34px;border-radius:10px;font-size:25px;font-weight:400;color:#000}
#cal-app .dh.we small,#cal-app .dh.we b{color:#8e8e93}
#cal-app .dh.sel b{background:#000;color:#fff;font-weight:600}
#cal-app .dh.today b{color:#eb4a47;background:none}
#cal-app .dh.today small{color:#000}
#cal-app .dh.today.sel b{background:#eb4a47;color:#fff}
#cal-app .dtitle{text-align:center;font-weight:700;font-size:18px;padding:10px 0 8px;flex:none}
#cal-app .tg-ad{align-items:center;padding:4px 0 8px;border-bottom:1px solid #d9d9dd;font-size:13px}
#cal-app .tg-ad .g{text-align:right;padding:0 6px 0 0;font-size:14px;line-height:1.15;color:#8e8e93}
#cal-app .tg-ad .cs>div{gap:4px}
#cal-app .tg-ad .chip{display:flex;align-items:center;height:28px;border-radius:6px;border-left:0;font-size:16px;font-weight:700;padding:0 8px;background:var(--bg);color:var(--c)}
#cal-app .tg-ad .chip.hol{background:#f3e8f8;color:#6c3a8c}
#cal-app .chip u.ci{background:var(--c);width:24px;height:24px}#cal-app .tg-ad.wk .chip u.ci{width:14px;height:14px}
#cal-app .tg-ad .chip{font-weight:600}
#cal-app .tg-ad.wk .chip{font-size:11px;height:22px;padding:0 4px}
#cal-app .tg-ad.wk .chip u{width:14px;height:14px;font-size:8px;margin-right:2px}
#cal-app .tg-b{height:1344px;margin-top:10px}
#cal-app .hl i{left:var(--lw,80px);border-top:1px solid #dcdce0}
#cal-app .hl span{left:0;width:calc(var(--lw,80px) - 8px);top:-14px;display:flex;justify-content:flex-end;align-items:baseline;gap:2px;font-size:inherit}
#cal-app .hl small{font-size:13px;color:#8e8e93}
#cal-app .hl b{font-size:21px;font-weight:500;color:#555}
#cal-app .hl b.nn{font-size:16px;color:#000;font-weight:700}
#cal-app .tg-b.wk .hl small{font-size:9px}#cal-app .tg-b.wk .hl b{font-size:13px}#cal-app .tg-b.wk .hl b.nn{font-size:11px}
#cal-app .ytitle{font-size:42px;font-weight:800;letter-spacing:-1px;padding:12px 0 6px 36.8%;flex:none;line-height:1.15}
#cal-app .ytitle.cur{color:#eb4a47}
#cal-app .year{padding:10px 22px 0;gap:20px 12px;grid-template-columns:repeat(3,1fr);align-content:start}
#cal-app .ym b{font-size:25px;font-weight:800;margin-bottom:8px;letter-spacing:-.5px}
#cal-app .ym.cur b{color:#eb4a47}
#cal-app .mg{display:grid;grid-template-columns:repeat(7,1fr);line-height:19px;font-size:13px;font-weight:600;text-align:center;letter-spacing:-.03em}
#cal-app .mg span,#cal-app .mg i{height:18px}
#cal-app .mg .t{background:#eb4a47;color:#fff;border-radius:50%;width:20px;height:20px}
#cal-app .cal-title h1{font-size:34px}
#cal-app .cal-btn.lb{height:38px;font-size:18px;padding:0 14px 0 10px}
#cal-app .cal-r.gl{height:38px}
#cal-app .cal-btn.ib{width:46px;height:38px}
#cal-app .cal-top{height:52px}
#cal-app .cal-bottom .tdy{height:40px;font-size:17px;padding:0 20px}
#cal-app .cal-wd{font-size:11px}
#cal-app .cal-grid .d,#cal-app .cal-grid.m-stacked .d,#cal-app .cal-grid.m-details .d,#cal-app .cal-grid.m-list .d{padding:8px 0 8px;gap:4px}
#cal-app .cal-grid .d .n,#cal-app .cal-grid.m-stacked .d .n,#cal-app .cal-grid.m-details .d .n,#cal-app .cal-grid.m-list .d .n{width:32px;height:32px;font-size:20px;font-weight:500}
#cal-app .mc{position:relative;font-size:11px;line-height:20px;height:20px;border-radius:4px;padding:0 5px;text-overflow:clip;display:flex;align-items:center}
#cal-app .mc .mt{display:block;flex:1;min-width:0;overflow:hidden;white-space:nowrap;font-weight:inherit;-webkit-mask-image:linear-gradient(90deg,#000 70%,rgba(0,0,0,.1));mask-image:linear-gradient(90deg,#000 70%,rgba(0,0,0,.1))}
#cal-app .mc u,#cal-app .chip u{width:15px;height:15px;font-size:9px;margin-right:3px}
#cal-app .ytitle{font-size:30px;font-weight:500;padding-left:36%;margin-top:-60px;pointer-events:none;position:relative;z-index:0}
#cal-app .year{padding:4px 14px 0;gap:8px 8px}
#cal-app .ym b{font-size:19px;margin-bottom:6px}
#cal-app .mg{font-size:9.5px;font-weight:500;line-height:18px;letter-spacing:0!important}
#cal-app .tg-ad .chip{font-size:13px;height:24px}
`;document.head.appendChild(st);})();

/* App-specific styles moved from base.css */
(()=>{const s=document.createElement("style");s.textContent="#cal-main{flex:1;display:flex;flex-direction:column;min-height:0}\n#cal-banner{position:absolute;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 56px);z-index:30;background:rgba(250,250,250,.94);color:#000;border-radius:22px;padding:12px 14px;display:flex;gap:10px;align-items:center;box-shadow:0 8px 30px rgba(0,0,0,.25);transform:translateY(-160%);opacity:0;transition:transform .4s cubic-bezier(.2,.9,.25,1),opacity .3s;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);cursor:pointer}\n#cal-banner.on{transform:none;opacity:1}\n#cal-banner .bi{width:38px;height:38px;border-radius:9px;background:#fff;color:#ff3b30;display:grid;place-items:center;font-size:20px;font-weight:700;flex:none;box-shadow:0 0 0 .5px rgba(0,0,0,.15)}\n#cal-banner .bt{min-width:0;display:flex;flex-direction:column}\n#cal-banner small{font-size:12px;color:#6e6e73}\n#cal-banner b{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#cal-banner .bt span{font-size:14px;color:#3c3c43}";document.head.appendChild(s);})();
