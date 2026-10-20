/* ===== phone.js (integrated) ===== */
/* ===== 전화 앱 ===== */
const PhoneApp = (() => {
  const $ = q => document.querySelector(q), el = $("#tel-app"), screen = $("#screen");
  const ic = p => `<svg viewBox="0 0 24 24">${p}</svg>`;
  const PH = 'M6.600 3.500c-.8-.8-2-.8-2.800 0L2.600 4.700c-1 1-1.200 2.600-.4 3.900 3 5 6.800 8.800 11.800 11.800 1.300.8 2.900.6 3.900-.4l1.200-1.200c.8-.8.8-2 0-2.800l-2.500-2.500c-.7-.7-1.800-.8-2.600-.2l-1.200.9c-2.300-1.200-4.300-3.200-5.500-5.500l.9-1.200c.6-.8.5-1.900-.2-2.600z';
  const dots = [4.5, 9.5, 14.5, 19.5].map(y => [6, 12, 18].map(x => `<circle cx="${x}" cy="${y}" r="1.300" fill="currentColor" stroke="none"/>`).join("")).join("");
  const I = {
    star: ic('<path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800-5.200-2.800-5.200 2.800 1-5.800L3.500 9.700l5.900-.8z"/>'), clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3.500 2"/>'),
    person: ic('<circle cx="12" cy="12" r="9.500"/><circle cx="12" cy="10" r="3"/><path d="M6 18.500c1.500-2.800 4-3.800 6-3.800s4.500 1 6 3.800"/>'), keys: ic(dots),
    search: ic('<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500l5 5"/>'), phone: `<svg viewBox="0 0 24 24"><path d="${PH}" fill="currentColor"/></svg>`,
    msg: ic('<path d="M12 4c-4.700 0-8.500 3.100-8.500 7s3.800 7 8.500 7c1 0 2-.1 2.900-.4 1.200 1 2.800 1.600 4.500 1.700-.8-.9-1.300-1.900-1.500-3 1.700-1.300 2.600-3.100 2.600-5.300C20.500 7.100 16.700 4 12 4z"/>'),
    back: ic('<path d="M15 5l-7 7 7 7" stroke-width="2.200"/>'), info: ic('<circle cx="12" cy="12" r="9.500"/><path d="M12 11v6M12 7.500v.1"/>'), plus: ic('<path d="M12 5v14M5 12h14" stroke-width="1.800"/>'),
    inn: ic('<path d="M17 7L7 17M15 17H7V9"/>'), out: ic('<path d="M7 17L17 7M9 7h8v8"/>'), bs: ic('<path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z"/><path d="M12.500 9.500l5 5M17.500 9.500l-5 5"/>'),
    mic: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3"/>'), micoff: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3M4 4l16 16"/>'),
    spk: ic('<path d="M4 9.500h3.500L12 5.500v13L7.500 14.500H4z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/>'), pause: ic('<path d="M9 5v14M15 5v14" stroke-width="2.600"/>'),
    rec: ic('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.500" fill="currentColor"/>'), grid: ic(dots),
  };
  I.cam = ic('<rect x="2" y="6" width="14" height="12" rx="2.500" fill="currentColor" stroke="none"/><path d="M18 10l4-2.500v9L18 14z" fill="currentColor" stroke="none"/><path d="M8.500 10.500a1.500 1.500 0 1 1 1.800 1.500c-.4.200-.3.600-.3 1M9 15v.1" stroke="#3d5b53" stroke-width="1.600"/>');
  I.more = ic('<circle cx="5" cy="12" r="1.700" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.700" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.700" fill="currentColor" stroke="none"/>');
  const uid = () => Math.random().toString(36).slice(2, 9), esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const NAMES = ["윤둥이", "철수", "민기", "홍중", "엄마", "아빠", "형", "레도형", "성현이형(매니저)", "박대표", "강PD", "승호형(믹싱)", "한감독님", "소율 누나", "정팀장님", "쇼미 김작가님", "도현", "지안", "세준(사진)", "엠더스트", "블루후디", "녹스", "가온", "새벽 레코즈 대표", "녹음실 사장님", "김팀장님(레코드)", "최PD(무대감독)", "박팀장(조명)", "성민(동창)", "수아 실장"], KEY = "ios-phone-v5";
  let D = null; try { D = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!D || !D.contacts || !D.siteCallsV1) {
    const NUMS = ["010-3321-4408", "010-7745-0291", "010-2290-6613", "010-5518-3342", "010-5518-9027", "010-8836-1150", "010-4102-7788", "010-9937-2204", "010-6620-5581", "010-3374-9910", "010-2851-4476", "010-7219-3067", "010-4467-1203", "010-5093-7821", "010-8120-3395", "010-9645-1812", "010-3708-5524", "010-2476-9031", "010-6158-2247", "010-3902-8815", "010-7731-4096", "010-5284-6670", "010-9140-3328", "010-2667-5193", "010-8473-1026", "010-4519-7782", "010-6035-2941", "010-3817-6504", "010-7296-1138", "010-5942-8067"], FAVS = NAMES.map(n => n === "윤둥이" || n === "엄마" ? 1 : 0);
    D = { contacts: NAMES.map((n, i) => ({ id: uid(), name: n, num: NUMS[i], email: "", fav: !!FAVS[i] })), calls: [] };
    const c = D.contacts, mk = (nm, dir, ago, hm, dur) => { const ct = c.find(x => x.name === nm), d = new Date(2026, 9, 19); d.setDate(d.getDate() - ago); d.setHours(+hm.slice(0, 2), +hm.slice(3), 0, 0); const ts = d.getTime(); return { id: uid(), num: ct ? ct.num : nm, dir, ts, dur }; };
    D.calls = [mk("윤둥이", "out", 0, "15:10", 0), mk("윤둥이", "out", 0, "15:12", 0), mk("윤둥이", "out", 0, "15:14", 0), mk("성현이형(매니저)", "in", 0, "15:18", 96), mk("윤둥이", "out", 0, "15:20", 0), mk("윤둥이", "out", 0, "15:22", 0), mk("윤둥이", "out", 0, "15:24", 0), mk("윤둥이", "out", 0, "15:26", 0), mk("윤둥이", "out", 0, "15:33", 412), mk("윤둥이", "in", 45, "13:40", 4980),mk("윤둥이", "out", 46, "09:15", 612),mk("승호형(믹싱)", "out", 46, "11:05", 236),mk("강PD", "miss", 47, "10:22", 0),mk("윤둥이", "out", 48, "23:20", 7860),mk("윤둥이", "in", 49, "14:05", 321),mk("엄마", "in", 50, "20:15", 305),mk("레도형", "in", 51, "18:47", 642),mk("성현이형(매니저)", "in", 51, "12:03", 125),mk("녹음실 사장님", "out", 33, "15:30", 58),mk("윤둥이", "in", 1, "21:50", 5400),mk("윤둥이", "miss", 1, "12:30", 0),mk("지안", "out", 2, "22:10", 540),mk("한감독님", "in", 3, "16:20", 198),mk("승호형(믹싱)", "in", 4, "14:05", 871),mk("엠더스트", "miss", 5, "19:36", 0),mk("윤둥이", "out", 6, "00:35", 8420),mk("윤둥이", "in", 6, "18:10", 1260),mk("성현이형(매니저)", "in", 7, "09:20", 89),mk("새벽 레코즈 대표", "in", 8, "17:44", 330),mk("소율 누나", "miss", 9, "13:28", 0),mk("윤둥이", "in", 10, "22:40", 3910),mk("철수", "out", 11, "21:03", 95),mk("김팀장님(레코드)", "in", 11, "15:17", 264),mk("홍중", "in", 12, "15:00", 76),mk("쇼미 김작가님", "out", 13, "11:50", 142),mk("윤둥이", "out", 14, "13:15", 188),mk("윤둥이", "miss", 15, "20:05", 0),mk("레도형", "miss", 16, "23:41", 0),mk("녹스", "in", 16, "20:08", 415),mk("민기", "out", 17, "18:30", 67),mk("최PD(무대감독)", "in", 18, "14:12", 180),mk("소율 누나", "out", 19, "11:20", 90),mk("윤둥이", "in", 20, "23:55", 6720),mk("아빠", "out", 21, "19:26", 44),mk("성현이형(매니저)", "out", 21, "10:15", 33),mk("윤둥이", "out", 22, "15:30", 2540),mk("박대표", "in", 23, "16:58", 226),mk("강PD", "out", 24, "13:11", 388),mk("윤둥이", "in", 25, "22:10", 4300),mk("엄마", "miss", 26, "09:52", 0),mk("윤둥이", "miss", 26, "11:45", 0),mk("홍중", "in", 27, "22:35", 152),mk("지안", "in", 28, "19:03", 310),mk("성현이형(매니저)", "out", 29, "08:50", 47),mk("윤둥이", "out", 30, "01:20", 9100),mk("도현", "miss", 31, "12:27", 0),mk("형", "in", 31, "21:20", 205),mk("엄마", "out", 32, "19:40", 612),mk("윤둥이", "in", 34, "19:30", 3600),mk("성민(동창)", "miss", 35, "18:15", 0),mk("철수", "in", 36, "20:30", 1740),mk("윤둥이", "out", 36, "21:00", 5150),mk("한감독님", "out", 37, "14:32", 121),mk("수아 실장", "out", 38, "11:09", 36),mk("블루후디", "in", 39, "20:44", 276),mk("소율 누나", "in", 40, "17:21", 167),mk("세준(사진)", "out", 41, "16:05", 89),mk("가온", "miss", 41, "23:08", 0),mk("레도형", "out", 42, "22:14", 953),mk("정팀장님", "in", 43, "10:41", 142),mk("02-3489-7720", "miss", 44, "14:55", 0)];
    D.siteCallsV1 = 1;
  }
  { D.contacts.forEach(c => { if (c.name === "성현이형(매니저)") c.name = "성현이형(매니저)"; }); const y = D.contacts.find(c => c.name === "울윤호"); if (y) y.name = "윤둥이"; try { localStorage.setItem(KEY, JSON.stringify(D)); } catch(e) {} }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} };
  /* 사이트는 기기의 현재 날짜·시각을 읽지 않음. 모든 표시 시각은 고정된 가상 시간 사용. */
  if (D.v12 !== 1) {
    const RN = { "철수": "김철수", "민기": "송민기 (FIXON)", "홍중": "김홍중 (NO1)", "레도형": "강레도", "성현이형(매니저)": "성현이형(매니저)", "박대표": "박재영(대표)", "강PD": "강민우(PD)", "승호형(믹싱)": "오승호(믹싱)", "한감독님": "한서진(감독)", "정팀장님": "정우석(팀장)", "쇼미 김작가님": "김하나(쇼미 작가)", "도현": "문도현", "지안": "한지안", "세준(사진)": "임세준(사진)", "김팀장님(레코드)": "김태훈(레코드)", "최PD(무대감독)": "최민재(무대감독)", "박팀장(조명)": "박서준(조명)", "성민(동창)": "이성민(동창)", "수아 실장": "윤수아 실장" };
    D.contacts.forEach(c => { if (RN[c.name]) c.name = RN[c.name]; });
    const num = n => (D.contacts.find(c => c.name === n) || {}).num || n, yn = num("윤둥이");
    D.calls = D.calls.filter(c => !(c.num === yn && c.dir === "in" && (c.dur === 4980 || c.dur === 1260)));
    const T = d => new Date(`2026-${d}+09:00`).getTime(), add = (nm, dir, d, dur) => D.calls.push({ id: uid(), num: num(nm), dir, ts: T(d), dur }), p2 = n => String(n).padStart(2, "0");
    add("윤둥이", "in", "10-15T18:05:00", 3600);
    [0, 18, 36].forEach(s => add("윤둥이", "out", `10-18T14:09:${p2(s)}`, 0));
    for (let i = 0; i < 7; i++) add("윤둥이", "out", `10-18T15:15:${p2(i * 8)}`, 0);
    add("성현이형(매니저)", "in", "10-18T14:08:00", 180);
    D.v12 = 1; save();
  }
  if (D.v14 !== 1) {
    const yunho = D.contacts.find(c => c.name === "윤둥이");
    if (yunho && !D.calls.some(c => c.blueRecord === "yunho-call-17-days")) {
      D.calls.push({ id: uid(), num: yunho.num, dir: "out", ts: new Date("2026-10-01T20:10:00+09:00").getTime(), dur: 3720, blueRecord: "yunho-call-17-days" });
    }
    D.v14 = 1; save();
  }
  if (D.v13 !== 1) {
    const y = D.contacts.find(c => c.name === "윤둥이");
    if (y) { const o = String(y.num).replace(/\D/g, ""); y.num = "010-1999-0323"; D.calls.forEach(c => { if (String(c.num).replace(/\D/g, "") === o) c.num = y.num; }); }
    D.v13 = 1; save();
  }
  window.PhoneData = { names: () => D.contacts.map(c => c.name) };
  const dg = x => String(x).replace(/\D/g, "");
  const msk = n => { const t = String(n); return t.replace(/\D/g, "") === "01019990323" ? t : t.replace(/\d{4}(?=\D*$)/, "****"); };
  function fmt(x) { const d = dg(x); if (!d) return ""; if (d.startsWith("010") || d.startsWith("011")) return d.length <= 3 ? d : d.length <= 7 ? d.slice(0, 3) + "-" + d.slice(3) : d.slice(0, 3) + "-" + d.slice(3, 7) + "-" + d.slice(7, 11); return String(x).trim(); }
  const byNum = n => dg(n) ? D.contacts.find(c => dg(c.num) === dg(n)) : null, nameOf = n => (byNum(n) || {}).name || (fmt(n) && msk(fmt(n))) || "알 수 없음";
  const byId = id => D.contacts.find(c => c.id === id), pad = n => String(n).padStart(2, "0");
  const tm = d => `${d.getHours() < 12 ? "오전" : "오후"} ${d.getHours() % 12 || 12}:${pad(d.getMinutes())}`;
  function ft(ts, c, n) { if (c && nameOf(c.num) === "성현이형(매니저)" && (c.blueRecord || c.storyDialogue)) return "오늘"; if (c && nameOf(c.num) === "윤둥이" && (c.blueRecord || c.storyDialogue)) return "오늘"; if (c && c.dir === "out" && n === 7 && nameOf(c.num) === "윤둥이") return "오늘"; const d = new Date(ts), base = new Date(2026, 9, 19), df = Math.round((base - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5); return df <= 1 ? "어제" : df < 7 ? "월화수목금토일"[(d.getDay() + 6) % 7] + "요일" : `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`; }
  const fdur = s => s >= 3600 ? `${Math.floor(s / 3600)}시간 ${Math.floor(s % 3600 / 60)}분 ${s % 60}초` : s >= 60 ? `${Math.floor(s / 60)}분 ${s % 60}초` : `${s}초`, mmss = s => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
  const initial = n => /[0-9+*#\s-]/.test((n || "")[0] || "#") ? "" : n[0];
  const av = (n, c = "tl-av") => `<div class="${c}">${esc(initial(n)) || ic('<circle cx="12" cy="9" r="3.500"/><path d="M5 20c1-4 4-5.500 7-5.500s6 1.500 7 5.500" fill="currentColor"/>').replace("<svg", '<svg style="width:55%;height:55%;fill:#fff;stroke:none"')}</div>`;
  const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", MAP = { ㄲ: "ㄱ", ㄸ: "ㄷ", ㅃ: "ㅂ", ㅆ: "ㅅ", ㅉ: "ㅈ" };
  function grp(n) { const c = n.charCodeAt(0) - 0xAC00; if (c >= 0 && c < 11172) { let h = CHO[Math.floor(c / 588)]; h = MAP[h] || h; return [CHO.indexOf(h), h]; } const u = n[0].toUpperCase(); return /[A-Z]/.test(u) ? [100 + u.charCodeAt(0), u] : [999, "#"]; }
  let tab = "rec", filt = "all", edit = false, keyNum = "", conQ = "", ovs = [], call = null;

  /* ---- 페이지 ---- */
  const empty = t => `<div class="tl-empty">${t}</div>`;
  function pFav() {
    const l = D.contacts.filter(c => c.fav).sort((a, b) => a.name.localeCompare(b.name, "ko"));
    return `<div class="tl-bar"><button class="tl-b" data-t="edit">${edit ? "완료" : "편집"}</button><button class="tl-b" data-t="favadd" aria-label="추가">${I.plus}</button></div><div class="tl-title">즐겨찾기</div><div class="tl-list">${l.map(c => `<div class="tl-r" data-t="callc" data-id="${c.id}">${edit ? `<button class="tl-minus" data-t="unfav" data-id="${c.id}">−</button>` : ""}<div class="tl-rb"><div class="tl-nm">${esc(c.name)}</div><div class="tl-sub">휴대전화</div></div><button class="tl-i" data-t="msg" data-n="${esc(c.name)}" aria-label="메시지">${I.msg}</button></div>`).join("") || empty("즐겨찾기가 없습니다.<br>+ 버튼으로 연락처를 추가하세요.")}</div>`;
  }
  function pRec() {
    const l = D.calls.filter(c => filt === "all" || c.dir === "miss").sort((a, b) => b.ts - a.ts);
    const G = []; l.forEach(c => { const g = G[G.length - 1]; if (g && dg(g.c.num) === dg(c.num) && g.c.dir === c.dir && !g.c.dur && !c.dur && g.last - c.ts <= 12e5) { g.n++; g.ids.push(c.id); g.last = c.ts; } else G.push({ c, n: 1, ids: [c.id], last: c.ts }); });
    return `<div class="tl-bar"><button class="tl-b" data-t="edit">${edit ? "완료" : "편집"}</button>${edit ? `<button class="tl-b" data-t="clearall">지우기</button>` : "<span></span>"}</div><div class="tl-title">최근 통화</div><div class="tl-seg"><button class="${filt === "all" ? "on" : ""}" data-t="seg" data-k="all">전체</button><button class="${filt === "miss" ? "on" : ""}" data-t="seg" data-k="miss">부재중</button></div><div class="tl-list">${G.map(({ c, n, ids }) => { const m = c.dir === "miss"; return `<div class="tl-r" data-t="${(c.storyDialogue || (c.blueRecord && SCRIPTS[c.blueRecord])) ? "replayrecord" : "noop"}" data-id="${c.id}" data-n="${esc(c.num)}"${(c.blueRecord || c.storyDialogue) ? ` data-b="${c.blueRecord || ""}" style="color:#007aff"` : ""}>${edit ? `<button class="tl-minus" data-t="delcall" data-id="${ids.join(",")}">−</button>` : ""}<span class="tl-dir ${m ? "red" : ""}"${(c.blueRecord || c.storyDialogue) ? ' style="color:#007aff"' : ""}>${c.dir === "out" ? I.out : I.inn}</span><div class="tl-rb"><div class="tl-nm ${m ? "red" : ""}"${(c.blueRecord || c.storyDialogue) ? ' style="color:#007aff"' : ""}>${esc(nameOf(c.num))}</div><div class="tl-sub"${(c.blueRecord || c.storyDialogue) ? ' style="color:#007aff"' : ""}>${byNum(c.num) ? "휴대전화" : "알 수 없음"}${n > 1 ? " (" + n + ")" : ""}${c.dur ? " · " + fdur(c.dur) : ""}</div></div><span class="tl-tm"${(c.blueRecord || c.storyDialogue) ? ' style="color:#007aff"' : ""}>${ft(c.ts, c, n)}</span><span class="tl-i" aria-label="정보">${I.info}</span></div>`; }).join("") || empty(filt === "miss" ? "부재중 전화가 없습니다." : "최근 통화가 없습니다.")}</div>`;
  }
  function conList() {
    const q = conQ.trim().toLowerCase(), l = D.contacts.filter(c => !q || c.name.toLowerCase().includes(q) || (dg(q) && dg(c.num).includes(dg(q)))).sort((a, b) => { const x = grp(a.name), y = grp(b.name); return x[0] - y[0] || a.name.localeCompare(b.name, "ko"); });
    let h = "", last = ""; l.forEach(c => { const g = grp(c.name)[1]; if (g !== last) { h += `<div class="tl-sec">${g}</div>`; last = g; } h += `<div class="tl-r" data-t="opencon" data-id="${c.id}"><div class="tl-rb"><div class="tl-nm">${esc(c.name)}</div></div></div>`; });
    return h ? h + `<div class="tl-empty">연락처 ${q ? l.length : l.length + 390}명</div>` : empty("검색 결과 없음");
  }
  const pCon = () => `<div class="tl-bar"><span></span><button class="tl-b" data-t="newcon" aria-label="새 연락처">${I.plus}</button></div><div class="tl-title">연락처</div><div class="tl-search">${I.search}<input id="tl-cq" placeholder="검색" autocomplete="off" disabled value="${esc(conQ)}"></div><div class="tl-list" id="tl-cl">${conList()}</div>`;
  const kdisp = () => `<div class="tl-kn">${esc(fmt(keyNum))}</div><div class="tl-ks">${keyNum ? (byNum(keyNum) ? esc(byNum(keyNum).name) : `<button data-t="keyadd">연락처에 추가</button>`) : ""}</div>`;
  function pKey() {
    const K = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]];
    return `<div class="tl-kd" id="tl-kd">${kdisp()}</div><div class="tl-kp">${K.map(k => `<button class="tl-k" data-t="key" data-k="${k[0]}"><b>${k[0]}</b><small>${k[1]}</small></button>`).join("")}</div><div class="tl-kb"><span></span><button class="tl-call" data-t="keycall" aria-label="전화">${I.phone}</button><button class="tl-kdel" id="tl-kdel" data-t="keydel" aria-label="삭제" style="visibility:${keyNum ? "visible" : "hidden"}">${I.bs}</button></div>`;
  }
  function results(q) {
    q = q.trim().toLowerCase(); if (!q) return empty("연락처와 최근 통화를 검색하세요.");
    const m = (n, num) => n.toLowerCase().includes(q) || (dg(q) && dg(num).includes(dg(q)));
    const cs = D.contacts.filter(c => m(c.name, c.num)), rs = D.calls.filter(c => m(nameOf(c.num), c.num)).sort((a, b) => b.ts - a.ts).slice(0, 20);
    let h = dg(q).length >= 3 ? `<div class="tl-r" data-t="recall" data-n="${esc(q)}"><div class="tl-rb"><div class="tl-nm" style="color:#007aff">${esc(fmt(q))} 전화 걸기</div></div></div>` : "";
    if (cs.length) h += `<div class="tl-sec">연락처</div>` + cs.map(c => `<div class="tl-r" data-t="opencon" data-id="${c.id}">${av(c.name)}<div class="tl-rb"><div class="tl-nm">${esc(c.name)}</div><div class="tl-sub">${esc(msk(c.num))}</div></div></div>`).join("");
    if (rs.length) h += `<div class="tl-sec">최근 통화</div>` + rs.map(c => `<div class="tl-r" data-t="cdet" data-id="${c.id}"><div class="tl-rb"><div class="tl-nm ${c.dir === "miss" ? "red" : ""}">${esc(nameOf(c.num))}</div><div class="tl-sub">${c.dir === "out" ? "발신" : c.dir === "in" ? "수신" : "부재중"} · ${ft(c.ts)}</div></div></div>`).join("");
    return h || empty("검색 결과 없음");
  }
  const pSearch = () => `<div class="tl-bar"></div><div class="tl-title">검색</div><div class="tl-search">${I.search}<input id="tl-sq" placeholder="연락처, 최근 통화" autocomplete="off"></div><div class="tl-list" id="tl-sr">${results("")}</div>`;
  const PAGES = { fav: pFav, rec: pRec, con: pCon, key: pKey, search: pSearch };
  el.innerHTML = `<div class="tl-main"><div id="tl-c"></div><div class="tl-tabs" id="tl-tabs">${[["fav", "즐겨찾기", I.star], ["rec", "최근 통화", I.clock], ["con", "연락처", I.person], ["key", "키패드", I.keys], ["search", "검색", I.search]].map(t => `<button data-t="tab" data-k="${t[0]}"${t[0] === "search" ? ' disabled aria-disabled="true"' : ""}>${t[2]}<span>${t[1]}</span></button>`).join("")}</div></div><div class="tl-ov" id="tl-ov"></div><div class="tl-sb" id="tl-sb" data-t="sheetx"></div><div class="tl-sh" id="tl-sh"></div><div class="tl-call-s" id="tl-cs-w"></div>`;
  const cEl = $("#tl-cs-w"), shEl = $("#tl-sh"), sbEl = $("#tl-sb"), ovEl = $("#tl-ov");
  function render() { $("#tl-c").innerHTML = PAGES[tab](); document.querySelectorAll("#tl-tabs button").forEach(b => b.classList.toggle("on", b.dataset.k === tab)); }
  const updKey = () => { $("#tl-kd").innerHTML = kdisp(); $("#tl-kdel").style.visibility = keyNum ? "visible" : "hidden"; };

  /* ---- 오버레이 ---- */
  function ovHtml(o) {
    if (o.t === "contact") {
      const c = byId(o.id); if (!c) return "";
      return `<div class="tl-ovp"><div class="tl-bar"><button class="tl-b" data-t="back">${I.back}<span>뒤로</span></button><button class="tl-b" data-t="editcon" data-id="${c.id}">편집</button></div><div class="tl-hero">${av(c.name)}<div class="tl-hn">${esc(c.name)}</div></div><div class="tl-acts"><button data-t="msg" data-n="${esc(c.name)}">${I.msg}<span>메시지</span></button><button data-t="callc" data-id="${c.id}">${I.phone}<span>통화</span></button><button class="${c.fav ? "on" : ""}" data-t="favtoggle" data-id="${c.id}">${I.star}<span>${c.fav ? "즐겨찾기 해제" : "즐겨찾기"}</span></button></div><div class="tl-card">${c.num ? `<button data-t="callnum" data-n="${esc(c.num)}"><small>휴대전화</small><span class="blue">${esc(msk(c.num))}</span></button>` : ""}${c.email ? `<div><small>이메일</small><span class="blue">${esc(c.email)}</span></div>` : ""}</div><div class="tl-card"><button data-t="delcon" data-id="${c.id}"><span class="red">연락처 삭제</span></button></div></div>`;
    }
    if (o.t === "edit") {
      const c = o.id ? byId(o.id) : null;
      return `<div class="tl-ovp"><div class="tl-bar"><button class="tl-b" data-t="back">취소</button><b>${c ? "" : "새로운 연락처"}</b><button class="tl-b" data-t="save" data-id="${o.id || ""}" style="font-weight:600">완료</button></div><div class="tl-hero">${av(c ? c.name : "")}</div><div class="tl-card tl-form"><div><input id="tl-fn" placeholder="이름" value="${esc(c ? c.name : "")}"></div><div><input id="tl-fp" type="tel" placeholder="전화번호" value="${esc(c ? c.num : o.num || "")}"></div><div><input id="tl-fe" type="email" placeholder="이메일" value="${esc(c ? c.email : "")}"></div></div>${c ? `<div class="tl-card"><button data-t="delcon" data-id="${c.id}"><span class="red">연락처 삭제</span></button></div>` : ""}</div>`;
    }
    if (o.t === "cdet") {
      const k = D.calls.find(x => x.id === o.id); if (!k) return "";
      const h = D.calls.filter(x => dg(x.num) === dg(k.num)).sort((a, b) => b.ts - a.ts), nm = nameOf(k.num), con = byNum(k.num);
      return `<div class="tl-ovp"><div class="tl-bar"><button class="tl-b" data-t="back">${I.back}<span>뒤로</span></button><span></span></div><div class="tl-hero">${av(con ? nm : "")}<div class="tl-hn">${esc(nm)}</div>${con ? `<div class="tl-hs">${esc(msk(k.num))}</div>` : ""}</div><div class="tl-acts"><button data-t="msg" data-n="${esc(nm)}">${I.msg}<span>메시지</span></button><button data-t="callnum" data-n="${esc(k.num)}">${I.phone}<span>통화</span></button>${con ? `<button data-t="opencon" data-id="${con.id}">${I.person}<span>연락처</span></button>` : `<button data-t="addnum" data-n="${esc(k.num)}">${I.plus}<span>연락처 추가</span></button>`}</div><div class="tl-card">${h.map(x => { const d = new Date(x.ts); return `<div class="tl-hr"><div><b${x.dir === "miss" ? ' style="color:#ff3b30;font-weight:600"' : ' style="font-weight:600"'}>${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}. ${tm(d)}</b><small>${x.dir === "out" ? "발신 전화" : x.dir === "in" ? "수신 전화" : "부재중 전화"}</small></div><span>${x.dur ? fdur(x.dur) : x.dir === "out" ? "취소됨" : ""}</span></div>`; }).join("")}</div><div class="tl-card"><button data-t="delnum" data-n="${esc(k.num)}"><span class="red">통화 기록 삭제</span></button></div></div>`;
    }
    return "";
  }
  function renderOv() { ovEl.innerHTML = ovs.length ? ovHtml(ovs[ovs.length - 1]) : ""; ovEl.classList.toggle("on", ovs.length > 0); if (ovs.length && !ovEl.innerHTML) { ovs.pop(); renderOv(); } }
  const pushOv = o => { ovs.push(o); renderOv(); };
  const popOv = () => { ovs.pop(); renderOv(); };

  /* ---- 시트 ---- */
  const sheet = h => { shEl.innerHTML = h; shEl.classList.add("on"); sbEl.classList.add("on"); };
  const closeSheet = () => { shEl.classList.remove("on"); sbEl.classList.remove("on"); shEl.innerHTML = ""; };
  const confirmSheet = (msg, label, t, extra = "") => sheet(`<div class="tl-sg"><div class="m">${msg}</div><button class="red" data-t="${t}" ${extra}>${label}</button></div><div class="tl-sg"><button data-t="sheetx">취소</button></div>`);

  /* ---- 통화 ---- */
  function startCall(num, pb) {
    if (!dg(num) || call) return;
    call = { num, state: "dialing", mute: 0, spk: 0, hold: 0, rec: 0, keys: false, dt: "", t0: 0, pb: pb || "", pl: [], pt: [] };
    screen.classList.add("in-call"); renderCall(); cEl.classList.add("on");
    call.t1 = setTimeout(() => { if (!call) return; call.state = "on"; call.t0 = performance.now(); updCall(); call.iv = setInterval(updCall, 1000); if (call.pb) playScript(); }, 800 + Math.random() * 400);
  }
  const SCRIPTS = { "yunho-call-17-days": [["윤호", "여보세요?"], ["성화", "응 왜?"], ["윤호", "뭐해"], ["성화", "그냥 있지 왜"], ["윤호", "형 우리 반지 다시 낄까?"], ["성화", "…. 엉?"], ["윤호", "아니 전에 맞췄던 거 있는데 굳이 다시 맞춰야할까 싶어서"], ["윤호", "추억도 있고"], ["성화", "어.. 아직도 갖고있구나"], ["윤호", "서랍 열 때마다 보이던데 뭐"], ["윤호", "설마 버린 거 아니지?"], ["성화", "…"], ["성화", "아니야 ㅋㅋ 나도 있어"], ["성화", "어디 넣어놔서 그래"], ["윤호", "어디?"], ["성화", "이사하면서… 박스에 있을 걸"], ["윤호", "형 그 박스 아직도 안 풀었어?"], ["성화", "풀었는데 그 박스만 안 풀었어"], ["윤호", "ㅋㅋㅋ 이번 주말에 끼고 나와"], ["성화", "알았어 찾아볼게 (좆됐다)"]], "mom-call-jul3": [["엄마", "너는 요즘 소식없니?"], ["성화", "갑자기 무슨 소리야"], ["엄마", "그냥 궁금해서"], ["엄마", "만나는 사람 없냐고"], ["성화", "바뻐"], ["성화", "만날 시간도 없어"], ["엄마", "그래도 만날 사람은 다 만나"], ["엄마", "밥은 먹었어?"], ["성화", "먹었어"], ["엄마", "엄마는 윤호가 참 좋았는데"], ["성화", "무슨 일년 전 얘기를 해"], ["엄마", "윤호 요즘 잘나가더라"], ["성화", "알아"], ["엄마", "알아? 너 연락하니?"], ["성화", "아니 테레비에 나오잖아"], ["엄마", "영숙 아줌마도 윤호 좋아해"], ["성화", "그게 나랑 무슨 상관인데..."], ["엄마", "말도 이쁘게하고"], ["엄마", "밥도 복스럽게 잘먹고 얼마나 예뻤는데"], ["성화", "엄마"], ["엄마", "그냥 하는 말이야"], ["성화", "나 일해야 돼 끊는다"], ["엄마", "다시 잘해봐~"], ["성화", "끊는다 쉬세요"], ["엄마", "밥 챙겨 먹어"]], "yunho-call-aug": [["윤호", "술 마셨어?"], ["성화", "쪼금…"], ["윤호", "목소리가 쪼금이 아닌데"], ["윤호", "내 번호 어떻게 알았어?"], ["성화", "민기한테 물어봤지…"], ["성화", "걔 뭐라 하지 마 내가 협박했어"], ["윤호", "나 바뻐 용건만 말해"], ["성화", "어… 용건…"], ["성화", "그게… 어디서부터 말해야 되지"], ["성화", "다시 만나고 싶어…"], ["윤호", "…"], ["성화", "진심이야…"], ["성화", "맨정신이면 말 못 할 거 같아서 마신 거야"], ["성화", "많이 반성했고 다시는 그런 일 안 일어나게 잘할게"], ["윤호", "그런 일이 뭔데"], ["성화", "어… 다…? 그냥 다"], ["윤호", "어딘데?"], ["성화", "왜..?"], ["윤호", "전화로 할 얘기 아니잖아"], ["윤호", "만나서 얘기하자고"]] };
  function playScript() { let t = 1200; SCRIPTS[call.pb].forEach(l => { call.pt.push(setTimeout(() => { if (!call) return; call.pl.push(l); const e = $("#tl-pb"); if (e) e.innerHTML = pbHtml(); }, t)); t += l[2] || (1500 + l[1].length * 90 + (/^…|…$|\.{2,}$/.test(l[1]) ? 1200 : 0)); }); call.pt.push(setTimeout(endCall, t + 1500)); }
  const pbHtml = () => call.pl.slice(-6).map((l, i, a) => `<div class="tl-pb-line ${l[0] === "성화" || l[0] === "나" ? "me" : "them"}" style="opacity:${(0.45 + 0.55 * (i + 1) / a.length).toFixed(2)}"><span class="tl-pb-speaker">${esc(l[0])}</span><span class="tl-pb-words">${esc(l[1])}</span></div>`).join("");
  const csec = () => call && call.state === "on" ? Math.floor((performance.now() - call.t0) / 1000) : 0;
  function updCall() { const e = $("#tl-cst"); if (e && call) e.textContent = call.state === "dialing" ? "연결 중..." : call.hold ? "통화 보류 중" : (call.rec ? "● " : "") + mmss(csec()); }
  function renderCall() {
    const k = call, b = (t, on, i, l, c = "") => `<button class="tl-cb${on ? " on" : ""}${c}" data-t="${t}"><i>${i}</i><span>${l}</span></button>`;
    cEl.innerHTML = `<div class="tl-cs" id="tl-cst"></div><div class="tl-cn">${esc(nameOf(k.num))}</div>${byNum(k.num) ? "" : `<div class="tl-cnum">대한민국</div>`}` + (k.keys
      ? `<div class="kx-dt">${esc(k.dt)}</div><div class="kx-g">${"123456789*0#".split("").map((x, i) => `<button data-t="ckey" data-k="${x}"><b>${x}</b><small>${i < 9 ? ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"][i] : x === "0" ? "+" : ""}</small></button>`).join("")}</div><div class="kx-b"><span></span><button class="kx-end" data-t="endcall" aria-label="통화 종료">${I.phone}</button><button class="kx-h" data-t="ckeyx">키패드 가리기</button></div>`
      : (call.pb ? `<div class="tl-pb" id="tl-pb">${pbHtml()}</div>` : "") + `<div class="tl-cg">${b("cspk", k.spk, I.spk, "스피커")}${b("cft", 0, I.cam, "FaceTime")}${b("cmute", k.mute, I.micoff, "소리 끔")}${b("cmore", 0, I.more, "더 보기")}${b("endcall", 0, I.phone, "종료", " end")}${b("ckeys", 0, I.grid, "키패드")}</div>`);
    updCall();
  }
  function endCall() {
    if (!call) return; const ended = call, onEnd = call.onEnd; clearTimeout(call.t1); clearInterval(call.iv); call.pt.forEach(clearTimeout);
    if (ended.storyDialogue && !ended.storyReplay) { const storyTs = new Date("2026-10-19T16:45:00+09:00").getTime(); D.calls.unshift({ id: uid(), num: ended.num, dir: "in", ts: storyTs, dur: Math.max(0, Math.floor((performance.now() - (ended.t0 || performance.now())) / 1000)), storyKey: ended.storyKey || "", storyDialogue: ended.storyDialogue.map(l => [l[0], l[1]]) }); save(); }
    call = null; cEl.classList.remove("on"); screen.classList.remove("in-call"); render(); renderOv();
    if (onEnd) { try { onEnd(); } catch (e) {} }
  }
  /* 스토리 통화: 기존 전화 앱의 통화 화면(성현이형 등)을 그대로 사용하고 대사만 재생 */
  function storyCall(o) {
    if (call || !o || !o.lines) return false;
    const c = D.contacts.find(x => x.name === o.name); if (!c) return false;
    const key = "story-call"; SCRIPTS[key] = o.lines;
    if (window.Home && Home.current !== "phone") Home.openApp("phone"); else open();
    startCall(c.num, key); if (!call) return false; call.onEnd = o.onEnd; if (!o.replay) { call.storyDialogue = o.lines.map(l => [l[0], l[1]]); call.storyKey = o.kind || ("story-" + uid()); } return true;
  }
  if (D.v15 !== 1) { const bl = D.calls.filter(c => c.blueRecord), r = D.calls.filter(c => !c.blueRecord).sort((a, b) => b.ts - a.ts).slice(0, 18); D.calls = bl.concat(r); D.v15 = 1; save(); }
  if (D.v16 !== 1) { const y = D.contacts.find(c => c.name === "윤둥이"); if (y && !D.calls.some(c => c.blueRecord === "yunho-call-aug")) D.calls.push({ id: uid(), num: y.num, dir: "out", ts: new Date("2026-08-01T23:40:00+09:00").getTime(), dur: 154, blueRecord: "yunho-call-aug" }); D.v16 = 1; save(); }
  if (D.v17 !== 1) {
    const T = (d, h) => new Date(`2026-${d}T${h}:00+09:00`).getTime(), nm = n => (D.contacts.find(c => c.name === n) || {}).num || n;
    const L = [["송민기 (FIXON)", "out", "07-31", "22:50", 75], ["송민기 (FIXON)", "in", "08-01", "23:55", 210], ["김철수", "in", "08-04", "18:20", 330], ["엄마", "out", "08-07", "20:10", 420], ["성현이형(매니저)", "in", "08-11", "11:05", 130], ["강민우(PD)", "miss", "08-14", "15:42", 0], ["한지안", "out", "08-18", "21:30", 560], ["오승호(믹싱)", "in", "08-22", "14:15", 905], ["김홍중 (NO1)", "in", "08-27", "23:10", 240], ["박재영(대표)", "out", "09-01", "10:30", 190], ["엄마", "in", "09-05", "19:45", 380], ["소율 누나", "miss", "09-08", "13:20", 0], ["강레도", "in", "09-12", "22:05", 1480], ["김하나(쇼미 작가)", "out", "09-15", "16:40", 145], ["아빠", "out", "09-19", "12:15", 62], ["송민기 (FIXON)", "in", "09-23", "20:35", 610], ["한서진(감독)", "miss", "09-26", "17:50", 0], ["성현이형(매니저)", "out", "09-29", "09:40", 95], ["김철수", "out", "10-04", "21:15", 780], ["엠더스트", "in", "10-06", "19:25", 320], ["최민재(무대감독)", "in", "10-09", "14:50", 175], ["엄마", "miss", "10-11", "08:55", 0], ["오승호(믹싱)", "out", "10-12", "16:10", 240]];
    D.calls = D.calls.filter(c => c.blueRecord || c.ts >= T("10-14", "00:00")).concat(L.map(([n, dir, d, h, dur]) => ({ id: uid(), num: nm(n), dir, ts: T(d, h), dur, fixed: 1 })));
    D.v17 = 1; save();
  }
  if (D.v18 !== 1) { D.v18 = 1; save(); }
  if (D.v19 !== 1) {
    const m = D.contacts.find(x => x.name === "엄마");
    if (m && !D.calls.some(x => x.blueRecord === "mom-call-jul3")) D.calls.push({ id: uid(), num: m.num, dir: "in", ts: new Date("2026-07-03T20:10:00+09:00").getTime(), dur: 210, blueRecord: "mom-call-jul3", fixed: 1 });
    D.v19 = 1; save();
  }
  if (D.v23 !== 1) {
    const y = D.contacts.find(c => c.name === "윤둥이");
    if (y && !D.calls.some(c => c.blueRecord === "yunho-call-oct15-1805")) {
      D.calls.push({
        id: uid(),
        num: y.num,
        dir: "in",
        ts: new Date("2026-10-15T18:05:00+09:00").getTime(),
        dur: 3741,
        fixed: 1
      });
    }
    D.v23 = 1; save();
  }
  if (D.v22 !== 1) {
    const y = D.contacts.find(c => c.name === "윤둥이");
    if (y) {
      D.calls = D.calls.filter(c => !(String(c.num) === String(y.num) && c.dir === "in" && c.dur === 5400));
    }
    D.v22 = 1; save();
  }
  if (D.v21 !== 1) {
    const y = D.contacts.find(c => c.name === "윤둥이");
    const sh = D.contacts.find(c => c.name === "성현이형(매니저)");
    if (y) {
      const yNum = String(y.num);
      D.calls = D.calls.filter(c => {
        if (String(c.num) !== yNum || c.dir !== "out") return true;
        const d = new Date(c.ts);
        const hm = d.getHours() * 60 + d.getMinutes();
        const sec = d.getSeconds();
        // Remove only the crossed-out 3-call group, 4-call group, 6m52s call, and 1h30m call.
        if (c.dur === 412) return false;
        if (c.dur === 5400 && hm === 21 * 60 + 50) return false;
        if (!c.dur && sec === 0 && [15*60+10,15*60+12,15*60+14,15*60+20,15*60+22,15*60+24,15*60+26].includes(hm)) return false;
        return true;
      });
    }
    if (sh) {
      D.calls = D.calls.filter(c => !(String(c.num) === String(sh.num) && c.dir === "in" && c.dur === 96));
    }
    D.v21 = 1; save();
  }
  if (D.v20 !== 1) {
    const sh = D.contacts.find(c => c.name === "성현이형(매니저)");
    D.calls = D.calls.filter(c => c.blueRecord !== "sunghyun-call-today" && !(sh && c.num === sh.num && c.dir === "in" && c.dur === 180));
    D.v20 = 1; save();
  }
  if (D.v24 !== 1) {
    // The 2026-10-15 incoming Yun둥이 call (1:02:21) is a normal black call record, not a blue story call.
    D.calls.forEach(c => {
      if (c.dir === "in" && c.dur === 3741 && c.ts === new Date("2026-10-15T18:05:00+09:00").getTime() && String(c.num) === String((D.contacts.find(x => x.name === "윤둥이") || {}).num)) {
        delete c.blueRecord;
        c.fixed = 1;
      }
    });
    D.v24 = 1; save();
  }
  if (D.v25 !== 1) {
    const yunho = D.contacts.find(x => x.name === "윤둥이");
    if (yunho) {
      const yesterdayStart = new Date("2026-10-20T00:00:00+09:00").getTime();
      const todayStart = new Date("2026-10-21T00:00:00+09:00").getTime();
      const yesterdayCall = D.calls
        .filter(x => String(x.num) === String(yunho.num) && x.ts >= yesterdayStart && x.ts < todayStart)
        .sort((a, b) => b.ts - a.ts)[0];
      if (yesterdayCall) yesterdayCall.dur = 182;
    }
    D.v25 = 1; save();
  }
  const gotoMsg = n => { closeApp(); if (window.Home) Home.openApp("messages"); setTimeout(() => window.MessagesApp && MessagesApp.chat(n), 80); };
  function recordStoryMissedCall(name,key){if(key&&D.calls.some(x=>x.storyKey===key))return;const c=D.contacts.find(x=>x.name===name);D.calls.unshift({id:uid(),num:c?c.num:name,dir:"miss",ts:new Date("2026-10-19T16:45:00+09:00").getTime(),dur:0,storyKey:key||""});save();if(isOpen)render();}

  /* ---- 이벤트 ---- */
  el.addEventListener("click", e => {
    const t = e.target.closest("[data-t]"); if (!t) return; const d = t.dataset;
    switch (d.t) {
      case "tab": if (d.k === "search") break; tab = d.k; edit = false; ovs = []; renderOv(); render(); break;
      case "edit": edit = !edit; render(); break;
      case "seg": filt = d.k; render(); break;
      case "callc": { const c = byId(d.id); if (c) startCall(c.num); break; }
      case "callnum": startCall(d.n); break;
      case "recall": startCall(d.n, d.b); break;
      case "replayrecord": { const x = D.calls.find(v => v.id === d.id); if (x) { const key = "saved-call-" + x.id; if (Array.isArray(x.storyDialogue)) SCRIPTS[key] = x.storyDialogue.map(l => [l[0], l[1]]); else if (x.blueRecord && SCRIPTS[x.blueRecord]) SCRIPTS[key] = SCRIPTS[x.blueRecord].map(l => [l[0], l[1]]); if (SCRIPTS[key]) { startCall(x.num, key); if (call) call.storyReplay = true; } } break; }
      case "msg": gotoMsg(d.n); break;
      case "cdet": pushOv({ t: "cdet", id: d.id }); break;
      case "opencon": pushOv({ t: "contact", id: d.id }); break;
      case "back": popOv(); render(); break;
      case "newcon": pushOv({ t: "edit" }); break;
      case "keyadd": pushOv({ t: "edit", num: fmt(keyNum) }); break;
      case "addnum": pushOv({ t: "edit", num: d.n }); break;
      case "editcon": pushOv({ t: "edit", id: d.id }); break;
      case "save": {
        let name = $("#tl-fn").value.trim(); const num = $("#tl-fp").value.trim(), email = $("#tl-fe").value.trim();
        if (!name && !num) return; if (!name) name = fmt(num);
        let id = d.id; if (id) Object.assign(byId(id), { name, num, email }); else { id = uid(); D.contacts.push({ id, name, num, email, fav: false }); }
        save(); ovs.pop(); if (!d.id) ovs.push({ t: "contact", id }); renderOv(); render(); break;
      }
      case "favtoggle": { const c = byId(d.id); c.fav = !c.fav; save(); renderOv(); break; }
      case "favadd": { const l = D.contacts.filter(c => !c.fav).sort((a, b) => a.name.localeCompare(b.name, "ko")); sheet(`<div class="tl-sg"><div class="m">즐겨찾기에 추가할 연락처</div>${l.map(c => `<button class="p" data-t="pickfav" data-id="${c.id}">${av(c.name)}<span>${esc(c.name)}</span></button>`).join("") || `<div class="m">추가할 연락처가 없습니다</div>`}</div><div class="tl-sg"><button data-t="sheetx">취소</button></div>`); break; }
      case "pickfav": byId(d.id).fav = true; save(); closeSheet(); render(); break;
      case "unfav": byId(d.id).fav = false; save(); render(); e.stopPropagation(); break;
      case "delcall": { const ids = d.id.split(","); D.calls = D.calls.filter(c => !ids.includes(c.id)); } save(); render(); break;
      case "clearall": confirmSheet("모든 최근 통화를 삭제할까요?", "모두 삭제", "doclear"); break;
      case "doclear": D.calls = []; save(); closeSheet(); edit = false; render(); break;
      case "delnum": confirmSheet("이 번호의 통화 기록을 삭제할까요?", "기록 삭제", "dodelnum", `data-n="${d.n}"`); break;
      case "dodelnum": D.calls = D.calls.filter(c => dg(c.num) !== dg(d.n)); save(); closeSheet(); ovs = []; renderOv(); render(); break;
      case "delcon": confirmSheet("이 연락처를 삭제할까요?", "연락처 삭제", "dodelcon", `data-id="${d.id}"`); break;
      case "dodelcon": D.contacts = D.contacts.filter(c => c.id !== d.id); save(); closeSheet(); ovs = []; renderOv(); render(); break;
      case "sheetx": closeSheet(); break;
      case "key": break; /* 키패드 입력 고정: 아무 동작 없음 */
      case "keydel": keyNum = keyNum.slice(0, -1); updKey(); break;
      case "keycall": { if (!keyNum) { const l = D.calls.filter(c => c.dir === "out").sort((a, b) => b.ts - a.ts)[0]; if (l) { keyNum = l.num; updKey(); } break; } const n = keyNum; startCall(n); break; }
      case "cmute": call.mute ^= 1; renderCall(); break;
      case "cspk": call.spk ^= 1; renderCall(); break;
      case "chold": call.hold ^= 1; renderCall(); break;
      case "crec": call.rec ^= 1; renderCall(); break;
      case "ckeys": call.keys = true; renderCall(); break;
      case "ckeyx": call.keys = false; renderCall(); break;
      case "ckey": break; /* 통화 중 키패드 입력 고정 */
      case "endcall": endCall(); break;
    }
  });
  el.addEventListener("input", e => { if (e.target.id === "tl-cq" || e.target.id === "tl-sq") return; if (false) { conQ = e.target.value; $("#tl-cl").innerHTML = conList(); } else if (e.target.id === "tl-sq") $("#tl-sr").innerHTML = results(e.target.value); });
  document.addEventListener("keydown", e => {
    if (!isOpen || tab !== "key" || ovs.length || call || /INPUT|TEXTAREA/.test((e.target || {}).tagName || "")) return;
    if (/^[0-9*#+]$/.test(e.key) && keyNum.length < 20) { keyNum += e.key; updKey(); } else if (e.key === "Backspace") { keyNum = keyNum.slice(0, -1); updKey(); } else if (e.key === "Enter" && keyNum) startCall(keyNum);
  });

  let isOpen = false;
  function open() {
    if (isOpen) return; isOpen = true; render(); renderOv(); originFrom(el, "phone");
    el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140);
  }
  function closeApp() {
    if (!isOpen) return; endCall(); isOpen = false; screen.classList.remove("app-light", "in-call"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true");
    document.activeElement && document.activeElement.blur();
    setTimeout(() => { if (!isOpen) { el.classList.remove("show"); ovs = []; renderOv(); closeSheet(); edit = false; } }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail.id === "phone") open(); });
  document.addEventListener("app:close", closeApp);
  return { open, close: closeApp, startCall, recordStoryMissedCall, storyCall };
})();

(()=>{const s=document.createElement("style");s.textContent="#tel-app{position:absolute;inset:0;z-index:5;display:none;background:#fff;color:#000;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font)}\n#tel-app.show{display:block}\n#tel-app.open{opacity:1;transform:none;border-radius:0}\n#tel-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit}\n#tel-app svg{stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}\n#tel-app .tl-card>button[data-t=delnum]{min-height:52px;justify-content:center;align-items:flex-start;padding:0 16px!important}\n/* ===== 11차: 키패드 취소선 제거 ===== */\n#tel-app .tl-kd,#tel-app .tl-kn,#tel-app .tl-kn *,#tel-app .tl-k,#tel-app .tl-k *{text-decoration:none!important;-webkit-text-decoration:none!important;border-image:none;background-image:none}\n#tel-app .tl-kn{line-height:1.25;overflow:visible}\n#tel-app .tl-kp{margin-top:clamp(24px,7vh,64px)}\n#tel-app .tl-tabs button[data-k=search]{opacity:.4;pointer-events:none}\n#tel-app .tl-search{opacity:.6;pointer-events:none}";s.textContent += "\\n#tel-app .tl-saved-dialogue{display:flex;flex-direction:column;gap:9px;padding:14px!important;background:#f5f5f7;border-radius:14px}\\n#tel-app .tl-saved-line{max-width:88%;display:flex;flex-direction:column;gap:3px;padding:9px 12px;border-radius:16px;font-size:14px;line-height:1.4;overflow-wrap:anywhere}\\n#tel-app .tl-saved-line small{font-size:10px;color:inherit;opacity:.62}\\n#tel-app .tl-saved-line.me{align-self:flex-end;background:#007aff;color:white;border-bottom-right-radius:5px}\\n#tel-app .tl-saved-line.them{align-self:flex-start;background:#e5e5ea;color:#111;border-bottom-left-radius:5px}";document.head.appendChild(s);})();

/* App-specific styles moved from base.css */
(()=>{const s=document.createElement("style");s.textContent="#tl-c{flex:1;min-height:0;display:flex;flex-direction:column}";document.head.appendChild(s);})();

/* 통화 화면 (iOS 스타일) */
(()=>{const s=document.createElement("style");s.textContent=`
#tel-app .tl-call-s{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:100!important;display:none;background:linear-gradient(180deg,#24252a 0%,#111216 48%,#050506 100%)!important;color:#fff!important;flex-direction:column;align-items:center;padding:0!important;overflow:hidden;box-sizing:border-box;pointer-events:auto}
#tel-app .tl-call-s.on{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}
#tel-app .tl-cs{margin-top:calc(env(safe-area-inset-top,0px) + 13%)!important;font-size:20px!important;font-weight:500;color:rgba(255,255,255,.45)!important}
#tel-app .tl-cn{margin-top:8px!important;font-size:34px!important;font-weight:600!important;letter-spacing:-1px;color:#fff!important}
#tel-app .tl-cnum{margin-top:8px;font-size:20px;font-weight:500;color:rgba(255,255,255,.45)}
#tel-app .tl-cg{position:absolute!important;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 7%)!important;margin:0!important;padding:0 10%;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));justify-items:center;gap:22px 0}
#tel-app .tl-cb{display:flex!important;flex-direction:column;align-items:center;gap:10px;font-size:15px!important;color:#fff!important;background:none!important}
#tel-app .tl-cb i{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);box-shadow:inset 0 1px 1px rgba(255,255,255,.2)}
#tel-app .tl-cb i svg{width:30px;height:30px}
#tel-app .tl-cb.on i{background:#fff;color:#254138}
#tel-app .tl-cb.end i{background:#c62a22;border-color:#e0453c}
#tel-app .tl-cb.end svg{transform:rotate(135deg)}
#tel-app .tl-cdt{margin-top:18px;font-size:34px;min-height:42px}
#tel-app .tl-ck{display:grid;grid-template-columns:repeat(3,64px);gap:12px;margin:18px 0 90px}
#tel-app .tl-ck button{height:64px;border-radius:50%;background:rgba(255,255,255,.12)!important;color:#fff;font-size:26px}`;document.head.appendChild(s);})();

/* 통화 중 키패드 화면 */
(()=>{const s=document.createElement("style");s.textContent="#tel-app .tl-call-s .kx-dt{min-height:24px;font-size:22px;margin-top:6px;word-break:break-all;text-align:center}#tel-app .kx-g,#tel-app .kx-b{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:100%;justify-items:center;padding:0 clamp(16px,6vw,28px);box-sizing:border-box}#tel-app .kx-g{margin-top:clamp(16px,5vh,56px)}#tel-app .kx-g button{width:100%;max-width:92px;aspect-ratio:1;border-radius:50%;background:#06140f;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}#tel-app .kx-g b{font-size:34px;font-weight:400;line-height:1}#tel-app .kx-g small{font-size:10px;font-weight:600;letter-spacing:.2em;height:12px;margin-top:3px}#tel-app .kx-b{margin-top:22px;align-items:center}#tel-app .kx-end{grid-column:2;width:72px;height:72px;border-radius:50%;background:#ff3b30;color:#fff;display:flex;align-items:center;justify-content:center}#tel-app .kx-end svg{width:32px;height:32px;fill:#fff;stroke:none;transform:rotate(135deg)}#tel-app .kx-h{justify-self:end;font-size:16px;color:#fff;white-space:nowrap}";document.head.appendChild(s);})();

(()=>{const s=document.createElement("style");s.textContent="#tel-app .tl-pb{position:absolute;top:clamp(180px,24%,250px);bottom:calc(env(safe-area-inset-bottom,0px) + clamp(340px,39%,430px));left:0;width:100%;box-sizing:border-box;padding:12px 22px;margin:0;text-align:left;color:#fff;font-size:15px;line-height:1.4;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:10px}#tel-app .tl-pb-line{max-width:88%;padding:10px 13px;border-radius:17px;display:flex;flex-direction:column;gap:3px;overflow-wrap:anywhere;box-shadow:0 1px 1px #0001}#tel-app .tl-pb-line.me{align-self:flex-end;background:#0a84ff;border-bottom-right-radius:5px}#tel-app .tl-pb-line.them{align-self:flex-start;background:#343438;border-bottom-left-radius:5px}#tel-app .tl-pb-speaker{font-size:10px;opacity:.65}#tel-app .tl-pb-words{font-size:15px;color:#fff}";document.head.appendChild(s);})();

window.PhoneApp = PhoneApp;
