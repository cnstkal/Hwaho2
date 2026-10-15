/* ===== fromm.js (integrated) ===== */
/* App styles bundled with app logic */
(()=>{const style=document.createElement("style");style.textContent="#fm-app .fm-me{display:flex;align-items:center;gap:12px;padding:14px 16px 4px}#fm-app .fm-me b{display:block;font-size:20px;letter-spacing:-.4px}#fm-app .fm-me small{color:#8a8a8e;font-size:13px}\n#fm-app .fm-cps{display:flex;gap:8px;padding:10px 16px 2px}#fm-app .fm-cp{height:32px;padding:0 14px;border-radius:16px;background:#f2f2f4;font-size:14px;color:#3a3a3c}#fm-app .fm-cp.on{background:#111;color:#fff}\n\n/* ===== 19차: 메모 앱 ===== */\n#nt-app{--y:#e5a800;--gb:calc(env(safe-area-inset-bottom,0px) + 26px);--ht:calc(env(safe-area-inset-top,0px) + 54px);position:absolute;inset:0;z-index:5;display:none;background:#fff;color:#111;overflow:hidden;opacity:0;transform:scale(.9);transition:opacity .3s,transform .4s cubic-bezier(.2,.9,.25,1),border-radius .4s;border-radius:40px}\n#nt-app.show{display:block}#nt-app.open{opacity:1;transform:none;border-radius:0}#nt-app *{box-sizing:border-box}\n#nt-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent;text-align:left}\n#nt-app svg{width:24px;height:24px;display:block;flex:none}\n#nt-app .s{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;padding-top:var(--ht)}\n#nt-app .s.sl{z-index:3;transform:translateX(100%);visibility:hidden;transition:transform .32s cubic-bezier(.2,.9,.25,1)}#nt-app .s.sl.on{transform:none;visibility:visible}#nt-app #nt-ed2{z-index:4}\n#nt-app .hd{flex:none;height:44px;display:flex;align-items:center;gap:2px;padding:0 8px;color:var(--y)}\n#nt-app .tb{min-width:44px;height:44px;display:flex;align-items:center;gap:2px;font-size:17px;color:var(--y);flex:none;padding:0 4px}#nt-app .tb:active{opacity:.5}#nt-app .tb[hidden]{display:none}\n#nt-app .sp{flex:1}\n#nt-app .sc{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}\n#nt-app h1{font-size:34px;font-weight:800;letter-spacing:-.8px;margin:2px 20px 10px}\n#nt-app .sf{display:flex;align-items:center;gap:6px;margin:0 16px 8px;height:38px;border-radius:10px;background:#f2f2f4;padding:0 10px;color:#8e8e93}#nt-app .sf svg{width:18px;height:18px}\n#nt-app .sf input{flex:1;min-width:0;border:0;outline:0;background:none;font-family:var(--font);font-size:17px;color:#111;height:38px;padding:0}\n#nt-app .it{display:block;width:100%;padding:11px 20px 11px 20px;position:relative}#nt-app .it:active{background:#f2f2f4}\n#nt-app .it::after{content:\"\";position:absolute;left:20px;right:0;bottom:0;border-bottom:.5px solid #e5e5ea}\n#nt-app .it b{display:block;font-size:17px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#nt-app .it span{display:block;font-size:14px;color:#8e8e93;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}#nt-app .it span em{font-style:normal;color:#3c3c43;margin-right:8px}\n#nt-app .it small{display:flex;align-items:center;gap:4px;font-size:12.5px;color:#8e8e93;margin-top:3px}#nt-app .it small svg{width:13px;height:13px}\n#nt-app .em{padding:70px 30px;text-align:center;color:#8e8e93}\n#nt-app .bt{flex:none;height:calc(50px + var(--gb) - 26px);padding:0 16px var(--gb);padding-bottom:calc(env(safe-area-inset-bottom,0px) + 8px);display:flex;align-items:center;border-top:.5px solid #e5e5ea;background:#fff;font-size:12px;color:#3c3c43}\n#nt-app .bt .tb{padding:0}#nt-app .bt svg{width:26px;height:26px}\n#nt-app .fr{display:flex;align-items:center;gap:12px;width:100%;padding:0 20px;height:48px;font-size:17px;position:relative}#nt-app .fr svg{color:var(--y)}#nt-app .fr:active{background:#f2f2f4}#nt-app .fr i{font-style:normal;color:#8e8e93;margin-left:auto}#nt-app .fr .nx{width:14px;height:14px;color:#c7c7cc;margin-left:6px}\n#nt-app .fr::after{content:\"\";position:absolute;left:52px;right:0;bottom:0;border-bottom:.5px solid #e5e5ea}\n#nt-app .fh{font-size:20px;font-weight:700;letter-spacing:-.3px;padding:10px 20px 6px;color:#111}\n#nt-app .eh{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:4px 20px 30px}\n#nt-app #nt-ed{outline:none;min-height:100%;font-size:17px;line-height:1.45;caret-color:var(--y);word-break:break-word}\n#nt-app #nt-ed>:first-child{font-size:28px;font-weight:700;letter-spacing:-.5px;line-height:1.25;margin-bottom:4px}\n#nt-app #nt-ed h2{font-size:22px;font-weight:700;margin:10px 0 2px}#nt-app #nt-ed h3{font-size:18px;font-weight:700;margin:8px 0 2px}\n#nt-app #nt-ed ul,#nt-app #nt-ed ol{margin:4px 0;padding-left:26px}\n#nt-app #nt-ed ul.nck{list-style:none;padding:0}#nt-app #nt-ed ul.nck li{position:relative;padding:5px 0 5px 34px;min-height:32px}\n#nt-app #nt-ed ul.nck li::before{content:\"\";position:absolute;left:2px;top:8px;width:20px;height:20px;border-radius:50%;border:1.6px solid #c7c7cc}\n#nt-app #nt-ed ul.nck li.done::before{border-color:var(--y);background:var(--y) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 12.500l4 4 8-9'/%3E%3C/svg%3E\") center/14px no-repeat}\n#nt-app #nt-ed ul.nck li.done{color:#8e8e93}\n#nt-app .ac{flex:none;display:flex;align-items:center;gap:6px;padding:6px 10px;border-top:.5px solid #e5e5ea;background:#f9f9fb;color:var(--y)}#nt-app.kb .ac{display:flex}#nt-app #nt-ed2 .ac.always{display:flex}\n#nt-app .ac button{width:44px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:17px;font-weight:700}#nt-app .ac button:active{background:#ececf0}\n#nt-app .ps{padding-bottom:var(--gb)}#nt-app.kb .ps{padding-bottom:0}\n#nt-app .scr{position:absolute;inset:0;z-index:8;background:rgba(0,0,0,.28);opacity:0;pointer-events:none;transition:opacity .2s}#nt-app .scr.on{opacity:1;pointer-events:auto}\n#nt-app .pop{position:absolute;left:10px;right:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);z-index:9;background:#fff;border-radius:18px;padding:6px;transform:translateY(130%);transition:transform .3s cubic-bezier(.2,.9,.25,1)}#nt-app .pop.on{transform:none}\n#nt-app .pop button{display:flex;align-items:center;gap:12px;width:100%;height:50px;padding:0 14px;border-radius:12px;font-size:17px}#nt-app .pop button:active{background:#f2f2f4}#nt-app .pop button.rd{color:#ff3b30}#nt-app .pop button.on{color:var(--y);font-weight:700}\n#nt-app .pop p{margin:10px 14px;font-size:15px;color:#6b6b70}#nt-app .pop input{width:calc(100% - 20px);margin:8px 10px;height:44px;border-radius:10px;border:0;background:#f2f2f4;padding:0 12px;font-family:var(--font);font-size:17px;outline:0}\n#nt-app .ts{position:absolute;left:50%;bottom:calc(var(--gb) + 70px);transform:translateX(-50%) translateY(10px);z-index:12;background:rgba(40,40,44,.92);color:#fff;font-size:14px;padding:10px 16px;border-radius:20px;opacity:0;pointer-events:none;transition:.25s;white-space:nowrap}#nt-app .ts.on{opacity:1;transform:translateX(-50%)}\n";document.head.appendChild(style);})();

/* ===== 18차: fromm 앱 ===== */
const FrommApp = (() => {
  const $ = q => document.querySelector(q), el = $("#fm-app"), screen = $("#screen");
  const ic = (p, w = 1.8, f) => `<svg viewBox="0 0 24 24" fill="${f ? "currentColor" : "none"}" stroke="${f ? "none" : "currentColor"}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const star = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-1px;margin-left:2px"><path d="M12 2l3 7 7 .700-5.300 4.800 1.600 7.200L12 17.800 5.700 21.700l1.600-7.200L2 9.700 9 9z"/></svg>';
  const sv = (b, n) => `<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px">${b}</svg>`;
  const clk = n => sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', n);
  const won = sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 11) + " ";
  const pinI = sv('<path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.500"/>', 11) + " ";
  const hrt = "";
  const P = {
    home: ic('<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>'), bag: ic('<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>'),
    heart: ic('<path d="M12 20s-7-4.500-7-10a4 4 0 017-2.500A4 4 0 0119 10c0 5.500-7 10-7 10z"/>'), list: ic('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'),
    me: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>'), bell: ic('<path d="M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4"/>'),
    cart: ic('<path d="M3 4h3l2 12h10l2-8H7"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>'), right: ic('<path d="M9 5l7 7-7 7"/>', 2.2),
    search: ic('<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500l5 5"/>', 1.9), x: ic('<path d="M6 6l12 12M18 6L6 18"/>', 2)
  };
  const I = {
    back: ic('<path d="M15 5l-7 7 7 7"/>', 2.2), more: ic('<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>', 1.8, 1),
    search: ic('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>', 1.9), plus: ic('<path d="M12 5v14M5 12h14"/>', 2), send: ic('<path d="M12 19V5M6 11l6-6 6 6"/>', 2.4),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>', 2), play: ic('<path d="M8 5.2v13.6L19 12z"/>', 1, 1), pause: ic('<rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/>', 1, 1),
    img: ic('<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.500 4 3.500 3-2.500 4 3"/>'), user: ic('<circle cx="12" cy="8" r="3.500"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>'),
    trash: ic('<path d="M5 7h14M10 7V4.500h4V7M7 7l1 13h8l1-13"/>'), check: ic('<path d="M5 12.500l4.500 4.500L19 7.500"/>', 2.4), redo: ic('<path d="M20 12a8 8 0 1 1-2.600-5.900M20 4v5h-5"/>', 1.8),
    nx: ic('<path d="M9 5l7 7-7 7"/>', 2.2),
    down: ic('<path d="M5 9l7 7 7-7"/>', 2.2), info: ic('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.500M12 7.800v.2"/>'), cam: ic('<path d="M4 8.500A2.500 2.500 0 0 1 6.500 6H8l1.500-2h5L16 6h1.500A2.500 2.500 0 0 1 20 8.500v8a2.500 2.500 0 0 1-2.500 2.500h-11A2.500 2.500 0 0 1 4 16.500z"/><circle cx="12" cy="12.500" r="3.500"/>'),
    uadd: ic('<circle cx="10" cy="8" r="3.500"/><path d="M3.500 20c.8-3.600 3.300-5.500 6.500-5.500M18 9v6M15 12h6"/>'), gear: ic('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.500M12 18.500V21M3 12h2.500M18.500 12H21M5.600 5.600l1.800 1.800M16.600 16.600l1.800 1.800M5.600 18.400l1.800-1.800M16.600 7.400l1.800-1.800"/>'),
    heart: ic('<path d="M12 20.500s-7.500-4.600-7.500-10A4.300 4.300 0 0 1 12 7.600a4.300 4.300 0 0 1 7.500 2.900c0 5.400-7.500 10-7.500 10z"/>', 1, 1),
    tl: ic('<circle cx="9" cy="8" r="3"/><path d="M3.500 19c.6-3.200 2.800-5 5.500-5s4.900 1.800 5.500 5M16 8h5M16 12h5"/>'), tc: ic('<path d="M4 6.500A2.500 2.500 0 0 1 6.500 4h11A2.500 2.500 0 0 1 20 6.500v7a2.500 2.500 0 0 1-2.500 2.500H11l-4.500 4v-4A2.500 2.500 0 0 1 4 13.500z"/>'),
    tv: ic('<rect x="3.500" y="6" width="17" height="12" rx="2.500"/><path d="M10 9.500v5l4.500-2.500z"/>'), ts: ic('<path d="M5 8h14l-1 12H6zM9 8V6.500a3 3 0 0 1 6 0V8"/>'),
  };
  const PAT = ['<circle cx="68" cy="34" r="22" fill="#fff" fill-opacity=".28"/><circle cx="28" cy="78" r="16" fill="#000" fill-opacity=".15"/>', '<path d="M0 72L100 22v24L0 96zM0 40L100-8v14L0 56z" fill="#fff" fill-opacity=".24"/>', '<circle cx="50" cy="48" r="32" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="8"/><circle cx="50" cy="48" r="12" fill="#fff" fill-opacity=".3"/>', '<path d="M50 16L88 84H12z" fill="#fff" fill-opacity=".26"/><path d="M50 16L88 84H50z" fill="#000" fill-opacity=".16"/>'];
  const ME = { n: "떵화", h: 335 };
  const A = [
    { n: "마라연구소", bg: "#35353a", e: ["🦐", "🍜", "🥟", "🍢", "🌶", "🥘"], r: "5.0", c: "1,063", o: "1,900원", t: "약 24분", d: "576m", g: ["배민클럽", "픽업가능"] },
    { n: "빽보이피자 신림역점", bg: "#b01a22", e: ["🍕", "🥤", "🍕", "🍟", "🧀", "🍕"], r: "4.9", c: "824", o: "1,000원", t: "약 27분", d: "332m", g: ["배민클럽", "픽업가능"] },
    { n: "더블패티버거 신림점", bg: "#3a2c25", e: ["🍔", "🥤", "🍔", "🍟", "🍔", "🥤"], r: "4.9", c: "1,722", tip: "배달팁 0원 적용 중", o: "2,000원", t: "약 25분", d: "690m", g: ["배민클럽", "픽업가능"] },
    { n: "번쩍피자 신림점", bg: "#f0522b", e: ["🍕", "🧀", "🍕", "🍅", "🍕", "🥤"], r: "4.8", c: "941", tip: "배달팁 1,500원", t: "약 33분", d: "1.4km", g: ["배민클럽", "픽업가능"] },
    { n: "불난닭발 신림점", bg: "#7b302b", e: ["🍗", "🌶", "🍲", "🥚", "🍚", "🍗"], r: "4.8", c: "618", o: "2,000원", t: "약 30분", d: "820m", g: ["주문내역에 있음"] },
    { n: "맥도날드 신림역DT점", bg: "#c52232", e: ["🍔", "🍟", "🥤", "🍔", "🍟", "🥤"], r: "4.7", c: "2,840", o: "2,500원", t: "약 22분", d: "1.0km", g: ["주문내역에 있음"] }
  ];
  const B = [
    { n: "멘야 소라 신림점", bg: "#e9d6a5", e: ["🍜", "🥢", "🍥", "🍜", "🥚", "🍜"], r: "4.8", c: "532", tip: "배달팁 2,900원", t: "약 28분", d: "1.2km", g: ["주문내역에 있음"] },
    { n: "바다횟집 신림점", bg: "#2b6d8a", e: ["🐟", "🍣", "🦐", "🐟", "🍱", "🍣"], r: "4.8", c: "743", tip: "배달팁 3,000원", t: "약 35분", d: "1.5km", g: ["주문내역에 있음"] },
    { n: "토박이순대국 신림점", bg: "#8a5736", e: ["🍲", "🍚", "🥬", "🍲", "🥢", "🍚"], r: "4.9", c: "1,205", tip: "배달팁 1,500원", t: "약 26분", d: "900m", g: ["주문내역에 있음"] },
    { n: "청년다방 떡볶이 신림점", bg: "#c74432", e: ["🍢", "🍜", "🥟", "🍢", "🥢", "🍢"], r: "4.7", c: "982", tip: "배달팁 1,500원", t: "약 25분", d: "750m", g: ["주문내역에 있음"] }
  ];
  const C = [
    { n: "홍콩반점0410 신림점", bg: "#b3262d", e: ["🥡", "🍜", "🥢", "🍚", "🥟", "🍜"], r: "4.8", c: "1,450", tip: "배달팁 0원", t: "약 29분", d: "1.1km", g: ["주문내역에 있음"], p: "8,000원~" }
  ];
  const card = (s, k) => {
    const bar = k === "A" ? ["#5a5bf2", "알뜰 배달팁 0원"] : k === "B" ? ["#ee4f3a", "5,000원~12,000원 할인"] : ["#1faea8", "한그릇 " + s.p];
    const l1 = k === "A" ? `<span class="pu">배달팁 0원 적용 중</span><s>${s.o}</s>` : k === "B" ? (s.o ? `<span class="pu">${s.tip}</span><s>${s.o}</s>` : `<span>${s.tip}</span>`) : `<span>${s.tip}</span>`;
    return `<div class="bm-cd"><div class="bm-ph" style="background:${s.bg};--bc:${bar[0]}">${s.e.map(x => `<span>${x}</span>`).join("")}${hrt}<div class="bm-bar" style="background:${bar[0]}"><i>%</i>${bar[1]}</div></div><div class="bm-l bm-n"><b class="nm">${s.n}</b><i class="st">★</i><b class="rt">${s.r}</b><em>(${s.c})</em></div><div class="bm-l">${l1}</div><div class="bm-l">${won}${s.t} ${pinI}${s.d}</div><div class="bm-tg">${s.g.map(x => x.startsWith("<") ? x : `<span>${x}</span>`).join("")}</div></div>`;
  };
  const row = (l, k) => `<div class="bm-hs">${l.map(s => card(s, k)).join("")}</div>`;
  const cats = [["🍗", "치킨"], ["🍢", "분식"], ["🍕", "피자"], ["🍜", "중식"], ["🍔", "패스트푸드"]];
  const cvs = [
    ["B마트", "#6fe5cf", "배달팁0원", `<span style="font-size:17px;letter-spacing:-.06em">B마트</span><u>배민클럽 ✦</u>`],
    ["CU", "#5a2a8f", "배달팁혜택", `<span style="color:#e6f7ea;font-size:23px">CU</span><u style="background:#fff;color:#5a2a8f">배민클럽 ✦</u>`],
    ["GS25", "#2f6fe8", "", `<span style="color:#fff;font-size:20px;font-style:italic">GS25</span>`],
    ["세븐일레븐", "#e8f6f1", "최대5천원", `<span style="color:#e8412c;font-size:30px">7</span><span style="font-size:7.5px;color:#2a8a4a">ELEVEN</span>`],
    ["이마트24", "#f6b93b", "최대2천원", `<span style="font-size:9px;color:#fff;font-style:italic">emart</span><span style="color:#fff;font-size:25px">24</span><u class="y">배달팁0원</u>`],
    ["주류", "#c4f0e6", "", `<span style="font-size:30px">🥃</span>`]
  ];
  const fm = n => n.toLocaleString("ko-KR") + "원";
  const ords = [
    { n: "불난닭발 신림점", e: "🍗", h: 8, s: "10. 12 (월)", dt: "2026년 10월 12일 오후 9:48", no: "T2G40000M41A", ty: "한집배달", it: [["국물닭발(중)", 19000, 1, [["가격", "19,000원"]]],["치즈 추가", 2000, 1, [["가격", "2,000원"]]],["계란찜 추가", 3000, 1, [["가격", "3,000원"]]],["주먹밥 추가", 2500, 1, [["가격", "2,500원"]]]], tip: 2000, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "토스페이" },
    { n: "맥도날드 신림역DT점", e: "🍔", h: 45, s: "10. 10 (토)", dt: "2026년 10월 10일 오후 7:21", no: "T2G40000M33B", ty: "한집배달", it: [["빅맥 세트", 7900, 1, [["가격", "7,900원"]]],["상하이 치킨버거 세트", 7600, 1, [["가격", "7,600원"]]]], tip: 2500, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "카카오페이" },
    { n: "멘야 소라 신림점", e: "🍜", h: 20, s: "10. 8 (목)", dt: "2026년 10월 8일 오후 12:40", no: "T2G40000M18C", ty: "알뜰배달", it: [["아부라소바(특대)", 11500, 2, [["가격", "11,500원"]]]], tip: 2900, club: 1, cp: 1500, cpn: "배민클럽 쿠폰", pay: "토스페이" },
    { n: "바다횟집 신림점", e: "🐟", h: 200, s: "10. 3 (토)", dt: "2026년 10월 3일 오후 8:05", no: "T2G40000M02D", ty: "한집배달", it: [["모둠회(중)", 45000, 1, [["가격", "45,000원"]]],["매운탕", 8000, 1, [["가격", "8,000원"]]]], tip: 3000, club: 0, cp: 3000, cpn: "쿠폰 할인", pay: "신용카드" },
    { n: "토박이순대국 신림점", e: "🍲", h: 18, s: "9. 30 (수)", dt: "2026년 9월 30일 오후 1:12", no: "T2G40000L97E", ty: "한집배달", it: [["순대국", 9000, 2, [["가격", "9,000원"]]],["모듬순대", 12000, 1, [["가격", "12,000원"]]]], tip: 1500, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "토스페이" },
    { n: "청년다방 떡볶이 신림점", e: "🍢", h: 350, s: "9. 27 (일)", dt: "2026년 9월 27일 오후 6:08", no: "T2G40000L88F", ty: "한집배달", it: [["오리지널 떡볶이 2인세트", 15000, 1, [["가격", "15,000원"]]],["어묵 추가", 3000, 1, [["가격", "3,000원"]]]], tip: 1500, club: 0, cp: 2500, cpn: "쿠폰 할인", pay: "카카오페이" },
    { n: "홍콩반점0410 신림점", e: "🥡", h: 4, s: "9. 19 (토)", dt: "2026년 9월 19일 오후 8:30", no: "T2G40000L51G", ty: "한집배달", it: [["짬뽕", 8000, 1, [["가격", "8,000원"]]],["짜장면", 7000, 1, [["가격", "7,000원"]]],["탕수육(소)", 14000, 1, [["가격", "14,000원"]]]], tip: 0, club: 0, cp: 2500, cpn: "쿠폰 할인", pay: "신용카드" }
  ];
  ords.forEach(o => { o.menu = o.it.reduce((a, x) => a + x[1] * x[2], 0); o.orig = o.menu + o.tip; o.cd = o.club ? o.tip : 0; o.disc = o.cd + o.cp; o.fin = o.orig - o.disc; });
  const clubI = '<span class="bm-cb"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2.500l2.600 6.900 6.900 2.600-6.900 2.600L12 21.500l-2.600-6.900L2.500 12l6.900-2.600z"/></svg></span>';
  const boltI = '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4a1df0"><path d="M13.500 2L5 13.500h5.500L9.500 22 19 10h-5.800z"/></svg>';
  const oc = i => { const o = ords[i]; return `<div class="bm-oc"><div class="bm-oh2"><div class="bm-oi" style="--h:${o.h}">${o.e}</div><div class="t"><b>${o.n}</b><small>${o.s}</small></div><button class="bm-odb" data-od="${i}">주문상세</button></div><div class="bm-om">${o.it.map(x => `<div>${x[0]} <em>${x[2]}개</em></div>`).join("")}</div><div class="bm-hrl"></div><div class="bm-pl"><b>결제금액</b><div class="bm-pr"><div class="r1"><s>${fm(o.orig)}</s>${o.club ? clubI : o.bolt ? boltI : ""}<strong>${fm(o.fin)}</strong></div><div class="tp">배달팁 ${o.club ? "0원" : fm(o.tip)}</div></div></div>${o.closed ? '<div class="bm-gb">오픈 전 가게예요</div>' : '<div class="bm-bt"><button class="bm-b1">같은 메뉴 담기</button><button class="bm-b2">바로 주문</button></div>'}</div>`; };
  const promoO = `<div class="bm-bnr"><div class="l"><span>이 배너가 보인다면?</span><span>최대 10만원 할인 쿠폰</span></div><div class="r"><u>장보기·쇼핑</u><i>%</i><em>2 / 3</em></div></div>`;
  const dtl = i => { const o = ords[i];
    const row = (a, b, c = "") => `<div class="dpr ${c}"><span class="lb">${a}</span><span>${b}</span></div>`;
    const bn = o.disc ? (o.club ? `배달팁 0원! ${clubI} 배민클럽 포함 ${fm(o.disc)} 할인` : `쿠폰 포함 ${fm(o.disc)} 할인`) : "";
    const dli = (t, ls) => `<div class="dit"><div class="nm">${t}</div><div class="op">${ls.join("<br>")}</div></div>`;
    return `<div class="dh"><button data-a="dback" aria-label="뒤로">${ic('<path d="M20 12H4M10 5.500L3.500 12l6.500 6.500"/>', 2.2, 28)}</button><b>주문상세</b><span>${ic(P.cart, 2.2, 28)}</span></div>
    <div class="dcard"><div class="dst"><h2>배달이 완료됐어요</h2><p>${o.ty}<br>주문일시 ${o.dt}<br>주문번호 ${o.no}</p></div><div class="dsr"><div class="oi2" style="--h:${o.h}">${o.e}</div><b>${o.n}</b>${ic(P.right, 2.4, 16)}<span class="sp"></span>${ic(P.heart, 2, 26)}</div></div>
    <div class="dtb" id="bm-dtb"><button class="on" data-a="dtab" data-s="0">주문 메뉴</button><button data-a="dtab" data-s="1">결제 정보</button><button data-a="dtab" data-s="2">배달 정보</button></div>
    <section class="dsec" data-sec><h3>주문 메뉴</h3><div class="dbox">${o.it.map((x, k) => `<div class="dit"><div class="nm">${x[0]}</div><div class="op">${x[3].map(p => `• ${p[0]}: ${p[1]}`).join("<br>")}</div><div class="pr">${fm(x[1] * x[2])} <em>${x[2]}개</em></div>${o.closed && k === o.it.length - 1 ? '<div class="bm-gb" style="margin-top:22px">오픈 전 가게예요</div>' : ""}</div>`).join("")}</div></section>
    <section class="dsec" data-sec><h3>결제 정보</h3><div class="dbox"><div class="dpay">${row("메뉴금액", fm(o.menu))}${row("배달팁", fm(o.tip))}${o.disc ? `<div class="ddash"></div>${row("총 할인받은 금액 " + ic('<path d="M6 15l6-6 6 6"/>', 2.4, 16), "-" + fm(o.disc), "pu2 h")}${o.club ? row("배민클럽 할인 " + clubI, "-" + fm(o.cd), "pu2") : ""}${o.cp ? row(o.cpn, "-" + fm(o.cp), "pu2") : ""}` : ""}<div class="dsol"></div><div class="dfin"><b>결제금액</b><strong>${fm(o.fin)}</strong></div>${bn ? `<div class="dbn">${bn}</div>` : ""}<div class="dsub"></div>${row("결제방법", o.pay)}<div class="dgr">간편결제 또는 휴대폰결제 서비스를 이용해 결제하신 경우, 영수증은 해당 결제사를 통해 확인하실 수 있습니다.</div></div></div><button class="dbtn">현금영수증</button></section>
    <section class="dsec" data-sec><h3>배달 정보</h3><div class="dbox ddl">${dli("전화번호", ["050-*****-**** (안심번호)", "010-1999-0403"])}${dli("배달 주소", ["서울 관악구 신림동 1427-8 세인빌라 302호", "(도로명) 서울 관악구 신림로 77길 19 세인빌라 302호"])}${dli("라이더님께", ["문 앞에 두고 벨 눌러주세요"])}${dli("가게 사장님께", ["(수저, 포크 X)"])}${dli("품절 시 취소 방법", ["품절 메뉴만 부분 취소 해주세요"])}</div><button class="dbtn" style="margin-top:28px">주문내역 삭제</button></section>
    <div class="dnote">주문하신 가게에서는 중개이용료(2%~7.8%)와 결제정산수수료(1.4%~3%), 배달비(1,900원~3,400원)를 부담합니다.<br>*일부 가게는 프로모션 적용으로 중개이용료율, 배달비가 상이할 수 있습니다</div>
    <div class="dft"><div>고객센터(대표)</div><div>1600-0000 (예시)</div><div>24시간 운영, 연중무휴</div><div>ARS 번호 안내 ${ic(P.right, 2.2, 14)}</div></div>`; };
  const nav = [["home", "홈", P.home], ["shop", "장보기·쇼핑", P.bag], ["pick", "찜", P.heart], ["orders", "주문내역", P.list], ["my", "마이배민", P.me]];
  const spacer = '<div style="height:calc(var(--nb) + 8px);background:#fff"></div>';

  el.innerHTML = `
  <div class="bm-tab on" id="bm-home" data-t="home">
    <div class="bm-hd"><div class="bm-r1"><div class="bm-loc">우리집<svg width="12" height="12" viewBox="0 0 12 12" fill="#111"><path d="M1 3.500h10L6 9.500z"/></svg></div><span class="bm-club">배민클럽${star}</span><span class="bm-ib">${ic(P.bell)}</span><span class="bm-ib">${ic(P.cart)}</span></div><div class="bm-sr"><span>와플? 케이크?</span>${ic(P.search, 2.4, 24)}</div></div>
    <div class="bm-bn"><h2>배달팁 0원에<br>BBQ <mark>7,500원</mark>할인</h2><button>쿠폰 다운받기 ${ic(P.right, 2.6, 13)}</button><div class="bm-ck"><img src="Images/Baemin/Chicken/IMG_7163.png" alt="치킨 메뉴 사진"><b>핫딜</b></div></div>
    <div class="bm-sh"><div class="bm-sv" data-sub><button class="on">음식배달</button><button>픽업</button><button>장보기·쇼핑</button><button>선물하기</button><button>혜택모아보기</button></div>
      <div class="bm-cat">${cats.map(c => `<div><div class="bm-tl">${c[0]}</div>${c[1]}</div>`).join("")}
        <div><div class="bm-tl pp"><b>7,000원</b>쿠폰</div>배짱할인</div>
        <div><div class="bm-tl"><i class="bm-bd rd bm-tc">14:58</i>${clk(40)}</div>타임세일</div>
        <div><div class="bm-tl hn">한</div>한그릇</div>
        <div><div class="bm-tl pk"><i class="bm-bd">고객님만</i><i>픽</i></div>더벤티100원</div>
        <div><div class="bm-tl wf"><small>떡와플 등장</small>🧇<u>AD</u></div>카페인중독</div></div>
      <button class="bm-more"><b>음식배달</b>에서 더보기 ${ic(P.right, 2.2, 15)}</button></div>
    <div class="bm-gap"></div>
    <div class="bm-sec">${row(A, "A")}</div>
    <div class="bm-gap"></div>
    <div class="bm-ts" id="bm-tsec"><span class="bm-clk">${clk(64)}</span><h3>떵화님을 위한 타임세일<span class="bm-ii">i</span></h3><div class="bm-cl"><span class="bm-dg" data-cd></span>후 5,000원 할인이 사라져요</div>${row(B, "B")}<button class="bm-btn">타임세일 더보기 ${ic(P.right, 2.2, 15)}</button></div>
    <div class="bm-one"><h3>최소주문금액 없는 한그릇</h3>${row(C, "C")}</div>
    ${spacer}</div>
  <div class="bm-tab" id="bm-orders" data-t="orders"><div class="bm-oh"><div class="bm-r1"><h1>주문내역</h1><span class="bm-ib">${ic(P.cart)}</span></div><div class="bm-tbs" data-sub><button class="on">배달·픽업</button><button>장보기·쇼핑</button></div>
    <div class="bm-fl"><span>${ic(P.search, 2.4, 15)}검색</span><span>주소 ${ic('<path d="M6 9l6 6 6-6"/>', 2.4, 14)}</span><span>조회 기간 ${ic('<path d="M6 9l6 6 6-6"/>', 2.4, 14)}</span><span>주문 상태·정보 ${ic('<path d="M6 9l6 6 6-6"/>', 2.4, 14)}</span></div></div>
    <div class="bm-ol">${oc(0)}${promoO}${oc(1)}${oc(2)}${oc(3)}${oc(4)}${oc(5)}</div>${spacer}</div>
  <div class="bm-toast" id="bm-toast"><span><span class="r">5,000원 할인!</span> 15분 뒤 사라져요</span><span style="display:flex;align-items:center"><span class="bm-dg" data-cd></span><button class="x" data-a="tsx" aria-label="닫기">${ic(P.x, 2.2, 22)}</button></span></div>
  <div class="bm-dt" id="bm-dt"></div>
  <nav class="bm-nv"><div class="bm-pill">${nav.map(n => `<button data-n="${n[0]}"${n[0] === "home" ? ' class="on"' : ""}>${ic(n[2], 2.1, 27)}${n[1]}</button>`).join("")}</div></nav>`;

  let isOpen = false, tm = null, dis = false, cur = "home";
  const home = $("#bm-home"), toast = $("#bm-toast");
  const dg = v => String(v).padStart(2, "0").split("").map(d => `<i>${d}</i>`).join("");
  let cdN = null, tcN = null;
  const clock = () => { const s = 900 - (Math.floor(Date.now() / 1000) % 900), m = s / 60 | 0, c = s % 60; const h = `${dg(m)}<u>:</u>${dg(c)}`; if (cur !== "home") return; (cdN || (cdN = [...el.querySelectorAll("[data-cd]")])).forEach(n => n.innerHTML = h); const t = tcN || (tcN = el.querySelector(".bm-tc")); if (t) t.textContent = String(m).padStart(2, "0") + ":" + String(c).padStart(2, "0"); };
  let tsTop = -1, lastSc = null, lastToast = null, raf = 0;
  const sync = () => { raf = 0; const y = home.scrollTop; if (tsTop < 0) tsTop = $("#bm-tsec").offsetTop; const sc = cur === "orders" || y > 30, tt = cur === "home" && !dis && y > tsTop - 330; if (sc !== lastSc) { lastSc = sc; el.classList.toggle("sc", sc); } if (tt !== lastToast) { lastToast = tt; toast.classList.toggle("on", tt); } };
  const go = k => { cur = k; el.querySelectorAll(".bm-tab").forEach(t => t.classList.toggle("on", t.dataset.t === k)); el.querySelectorAll(".bm-pill button").forEach(b => b.classList.toggle("on", b.dataset.n === k)); lastSc = null; lastToast = null; tsTop = -1; sync(); };
  home.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(sync); }, { passive: true });
  const dt = $("#bm-dt"); let lk = false, lkT = 0;
  const secs = () => [...dt.querySelectorAll("[data-sec]")];
  const setTab = k => dt.querySelectorAll(".dtb button").forEach((b, j) => b.classList.toggle("on", j === k));
  const spy = () => { if (lk) return; const ss = secs(); if (!ss.length) return; const base = dt.getBoundingClientRect().top + dt.querySelector(".dh").offsetHeight + dt.querySelector(".dtb").offsetHeight + 8; let k = 0; ss.forEach((x, j) => { if (x.getBoundingClientRect().top <= base) k = j; }); if (dt.scrollTop + dt.clientHeight >= dt.scrollHeight - 4) k = ss.length - 1; setTab(k); };
  dt.addEventListener("scroll", spy, { passive: true });
  const openDet = i => { dt.innerHTML = dtl(i); dt.scrollTop = 0; dt.classList.add("on"); };
  const closeDet = () => dt.classList.remove("on");
  el.addEventListener("click", ev => {
    const od = ev.target.closest("[data-od]"); if (od) { openDet(+od.dataset.od); return; }
    if (ev.target.closest('[data-a="dback"]')) { closeDet(); return; }
    const dtab = ev.target.closest('[data-a="dtab"]'); if (dtab) { const k = +dtab.dataset.s, sec = secs()[k]; setTab(k); lk = true; clearTimeout(lkT); const top = sec.getBoundingClientRect().top - dt.getBoundingClientRect().top + dt.scrollTop - dt.querySelector(".dh").offsetHeight - dt.querySelector(".dtb").offsetHeight; dt.scrollTo({ top, behavior: "smooth" }); lkT = setTimeout(() => { lk = false; spy(); }, 700); return; }
    const n = ev.target.closest("[data-n]"); if (n) { if (n.dataset.n === "home" || n.dataset.n === "orders") go(n.dataset.n); return; }
    if (ev.target.closest('[data-a="tsx"]')) { dis = true; sync(); return; }
    const s = ev.target.closest("[data-sub] button"); if (s) s.parentNode.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === s));
  });
  let dr = null;
  el.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; const h = e.target.closest(".bm-hs,.bm-fl,.bm-cvs,.bm-sv"); if (h) dr = { h, x: e.clientX, l: h.scrollLeft }; });
  el.addEventListener("pointermove", e => { if (dr) dr.h.scrollLeft = dr.l - (e.clientX - dr.x); });
  ["pointerup", "pointercancel", "pointerleave"].forEach(t => el.addEventListener(t, () => { dr = null; }));

  function open() { if (isOpen) return; isOpen = true; dis = false; originFrom(el, "baemin"); el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); home.scrollTop = 0; closeDet(); go("home"); clock(); tm = setInterval(clock, 1000); setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140); }
  function close() { if (!isOpen) return; isOpen = false; closeDet(); clearInterval(tm); screen.classList.remove("app-light"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!isOpen) el.classList.remove("show"); }, 430); }
  document.addEventListener("app:open", e => { if (e.detail.id === "baemin") open(); });
  document.addEventListener("app:close", close);
  window.BaeminApp = { open, close };
  return { open, close };
})();
(()=>{const st=document.createElement("style");st.textContent=`
#am-app{--or:#ff5a1f;--ht:calc(env(safe-area-inset-top,0px) + 54px);--hh:calc(var(--ht) + 52px);--nb:calc(58px + env(safe-area-inset-bottom,0px) + 26px);position:absolute;inset:0;z-index:5;display:none;background:#f6f7f9;color:#111;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font);font-size:15px;line-height:1.4;letter-spacing:-.03em}
#am-app.show{display:block}#am-app.open{opacity:1;transform:none;border-radius:0}#am-app *{box-sizing:border-box}
#am-app button{font-family:var(--font);letter-spacing:inherit;background:none;border:0;padding:0;cursor:pointer;color:inherit;text-align:left;-webkit-tap-highlight-color:transparent}
#am-app svg{display:block;flex:none}#am-app input{font-family:var(--font);letter-spacing:inherit}
#am-app .sc{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch}
#am-app .hd{position:absolute;left:0;right:0;top:0;z-index:4;height:var(--hh);padding:var(--ht) 16px 0;background:radial-gradient(circle at 8% 12%,rgba(255,200,80,.40),transparent 26%),radial-gradient(circle at 92% 6%,rgba(255,110,60,.32),transparent 24%),radial-gradient(circle at 50% 35%,rgba(255,150,170,.20),transparent 45%),#f7f7f9}
#am-app .hr{display:flex;align-items:center;height:44px}
#am-app .loc{display:flex;align-items:center;gap:6px;font-size:21px;font-weight:800;letter-spacing:-.05em;flex:1}
#am-app .ib{width:40px;height:44px;display:grid;place-items:center}
#am-app .rc{position:relative;padding:14px 0 26px;background:radial-gradient(ellipse 90% 30% at 50% 0,rgba(255,150,190,.32),transparent),radial-gradient(ellipse 80% 30% at 50% 78%,rgba(255,205,100,.45),transparent)}
#am-app .rs{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 9%;scrollbar-width:none;touch-action:pan-x}#am-app .rs::-webkit-scrollbar{display:none}
#am-app .rcd{flex:none;width:100%;scroll-snap-align:center;background:#fff;border:1.5px solid #fcc9ac;border-radius:28px;padding:20px 22px 18px;box-shadow:0 6px 24px rgba(255,150,100,.22);display:flex;flex-direction:column;gap:20px}
#am-app .jb{position:relative}
#am-app .jb small{display:block;font-size:15px;color:#8b8b95}
#am-app .jb b{display:block;font-size:19px;font-weight:800;letter-spacing:-.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:2px 0}
#am-app .jb .pay{font-size:19px}#am-app .pay em{color:var(--or)}
#am-app .ad{display:inline-block;height:22px;line-height:20px;padding:0 8px;border:1px solid #d4d4da;border-radius:6px;color:#9a9aa5;font-size:13px;font-weight:600}
#am-app .jb .ad{position:absolute;right:0;top:0}
#am-app .dots{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:16px}
#am-app .dots i{width:8px;height:8px;border-radius:4px;background:#c9c9cf;transition:width .2s,background .2s}#am-app .dots i.on{width:26px;background:var(--or)}
#am-app .cats{display:grid;grid-template-columns:repeat(5,1fr);row-gap:18px;padding:6px 6px 20px;background:#f6f7f9}
#am-app .cats div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:15px;font-weight:500}
#am-app .fl{position:sticky;top:var(--hh);z-index:3;background:#f6f7f9;display:flex;gap:8px;overflow-x:auto;padding:12px 16px;scrollbar-width:none;touch-action:pan-x}#am-app .fl::-webkit-scrollbar{display:none}
#am-app .fl span{flex:none;height:34px;padding:0 15px;border-radius:17px;border:1.5px solid #dcdce0;background:#fff;color:#444;font-size:15px;font-weight:500;display:flex;align-items:center;gap:4px;white-space:nowrap}
#am-app .fl span.ic{padding:0 11px}
#am-app .sh{display:flex;align-items:center;gap:10px;padding:22px 16px 12px;font-size:22px;font-weight:800;letter-spacing:-.05em}
#am-app .hot{display:grid;grid-auto-flow:column;grid-template-rows:repeat(3,auto);grid-auto-columns:200px;gap:12px;overflow-x:auto;padding:0 16px 4px;scrollbar-width:none;touch-action:pan-x}#am-app .hot::-webkit-scrollbar{display:none}
#am-app .hc{background:#fff;border-radius:22px;padding:16px;min-width:0}
#am-app .hc .lg{display:flex;justify-content:space-between;align-items:flex-start;height:44px}
#am-app .hc .lg i{background:#ff4e1f;color:#fff;font-style:normal;font-size:13px;font-weight:800;border-radius:14px;padding:1px 9px;height:22px}
#am-app .wm{font-size:20px;font-weight:800;letter-spacing:-.06em;line-height:1}#am-app .wm small{display:block;font-size:11.5px;font-weight:500;color:#777;letter-spacing:-.04em;margin-top:3px}
#am-app .hc>small{display:block;color:#8b8b95;font-size:14px;margin-top:8px}
#am-app .hc>b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:16.5px;line-height:1.35;font-weight:800;letter-spacing:-.05em;margin:3px 0 6px;min-height:44px}
#am-app .hc .pay{font-size:16.5px}
#am-app .vl{display:flex;flex-direction:column;gap:12px;padding:0 16px}
#am-app .vc{position:relative;background:#fff;border-radius:28px;padding:22px 24px 22px}
#am-app .vc small{display:block;font-size:16px;color:#8b8b95;padding-right:40px}
#am-app .vc b{display:block;font-size:19px;font-weight:800;letter-spacing:-.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:6px 0 10px}
#am-app .vc .rw{display:flex;align-items:center;gap:8px;font-size:17px;color:#8b8b95;height:30px}
#am-app .vc .rw u{text-decoration:none;color:#111}#am-app .vc .rw span.g{color:#12a150;font-weight:700}
#am-app .vc .st{position:absolute;right:20px;top:18px;width:34px;height:34px;display:grid;place-items:center;color:#a8a8b0}#am-app .vc .st.on{color:#ffb400}
#am-app .fab{position:absolute;right:16px;bottom:calc(var(--nb) + 18px);z-index:5;width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,.16);display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .2s}#am-app .fab.on{opacity:1;pointer-events:auto}
#am-app .nv{position:absolute;left:0;right:0;bottom:0;z-index:6;height:var(--nb);background:#efeff1;display:flex;padding:10px 4px 0}
#am-app .nv svg{width:28px;height:28px;flex:none}
#am-app .nv button{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:12.5px;font-weight:600;text-align:center;color:#222}
#am-app .ov{position:absolute;inset:0;z-index:8;background:#fff;transform:translateX(100%);visibility:hidden;transition:transform .3s cubic-bezier(.2,.9,.25,1),visibility 0s .3s}#am-app .ov.on{transform:none;visibility:visible;transition:transform .3s cubic-bezier(.2,.9,.25,1)}
#am-app #am-ap{z-index:9}
#am-app .mh{display:flex;align-items:center;justify-content:space-between;padding:var(--ht) 20px 0;height:calc(var(--ht) + 56px);font-size:22px;font-weight:800;letter-spacing:-.05em}
#am-app .adb{position:relative;margin:8px 20px 0;height:75px;border-radius:20px;background:#eceef2}#am-app .adb .ad{position:absolute;right:12px;top:8px;background:#f1f2f5}
#am-app .pf{display:flex;gap:16px;padding:22px 20px 0;align-items:flex-start}
#am-app .av{width:56px;height:56px;border-radius:50%;background:#f0f0f2;border:1px solid #e4e4e8;overflow:hidden;flex:none}
#am-app .pn{flex:1;min-width:0}#am-app .pn b{display:block;font-size:23px;font-weight:800;letter-spacing:-.05em}
#am-app .pn div{display:flex;align-items:center;gap:12px;margin-top:4px;font-size:15px;color:#666;white-space:nowrap}#am-app .pn div span:first-child{background:#f3f3f5;border-radius:6px;padding:4px 12px}
#am-app .mi{display:flex;align-items:center;gap:4px;color:#666;font-size:15px;white-space:nowrap;padding-top:2px}
#am-app .stt{display:grid;grid-template-columns:repeat(4,1fr);padding:26px 20px 0;text-align:center}
#am-app .stt button{text-align:center;position:relative}#am-app .stt button+button::before{content:"";position:absolute;left:0;top:14px;height:30px;width:1px;background:#e4e4e8}
#am-app .stt i{display:block;font-style:normal;color:#ee5a2a;font-size:22px;font-weight:500}#am-app .stt span{display:block;font-size:16px;margin-top:6px}
#am-app .sb3{margin:26px 20px 0;border:1.5px solid #ececf0;border-radius:20px;height:70px;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;text-align:center;font-size:16px}#am-app .sb3 b{font-weight:800}
#am-app .qk{margin:26px 20px 0;height:48px;border-radius:14px;background:#fdf4f0;display:flex;align-items:center;padding:0 16px 0 78px;position:relative;gap:8px;font-size:16px;white-space:nowrap}
#am-app .qk .ms{position:absolute;left:12px;top:-8px;width:58px;height:58px;border-radius:50% 50% 44% 44%;background:#f5731e;display:grid;place-items:center}#am-app .qk .ms i{width:34px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center;font-style:normal;font-size:15px;color:#e2531a}
#am-app .qk b{color:var(--or);font-weight:800}#am-app .qk span.t{flex:1;overflow:hidden;text-overflow:ellipsis}
#am-app .tg{flex:none;width:40px;height:26px;border-radius:13px;background:#d6d6dc;position:relative;transition:background .2s}#am-app .tg::after{content:"";position:absolute;left:2px;top:2px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s}#am-app .tg.on{background:var(--or)}#am-app .tg.on::after{transform:translateX(14px)}
#am-app .rg{margin-top:32px;background:#f7f7f8;padding:28px 20px 30px}
#am-app .rg h3{margin:0;font-size:24px;line-height:1.35;font-weight:800;letter-spacing:-.05em}#am-app .rg h3 em{font-style:normal;color:var(--or)}
#am-app .rgh{display:flex;justify-content:space-between;align-items:flex-end}#am-app .rgh span{display:flex;align-items:center;gap:2px;color:#9a9aa5;font-size:16px;padding-bottom:4px}
#am-app .rh{display:flex;gap:12px;overflow-x:auto;margin:18px -20px 0;padding:4px 20px 8px;scrollbar-width:none;touch-action:pan-x}#am-app .rh::-webkit-scrollbar{display:none}
#am-app .rh .vc{flex:none;width:calc(100% - 4px);padding:20px 24px;box-shadow:0 4px 14px rgba(0,0,0,.06)}
#am-app .rh .vc b{font-size:19px;margin:6px 0 10px}#am-app .rh .vc .st{top:14px}
#am-app .tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;height:34px;overflow:hidden}#am-app .tags span{height:34px;border:1.5px solid #e2e2e6;border-radius:8px;padding:0 12px;color:#8b8b95;font-size:15px;display:flex;align-items:center;white-space:nowrap}
#am-app .trk{height:3px;background:#dcdce0;margin-top:14px;position:relative}#am-app .trk i{position:absolute;left:0;top:0;height:3px;width:18%;background:#222}
#am-app .nw{padding:42px 20px 0;display:flex;justify-content:space-between;align-items:center}#am-app .nw b{font-size:29px;font-weight:800;letter-spacing:-.05em}#am-app .nw span{display:flex;align-items:center;gap:6px;color:#666;font-size:16px}
#am-app .em{text-align:center;color:#9a9aa5;padding:70px 0 calc(env(safe-area-inset-bottom,0px) + 140px);font-size:16px}
#am-app .ah{display:flex;align-items:center;gap:22px;padding:var(--ht) 20px 0;height:calc(var(--ht) + 56px);font-size:23px;font-weight:800;letter-spacing:-.05em}
#am-app .ainfo{display:flex;align-items:center;justify-content:space-between;background:#f1f2f4;padding:0 16px;height:57px;font-size:16.5px}
#am-app .ainfo button{height:32px;padding:0 16px 0 14px;border-radius:16px;background:#fff;border:1.5px solid #e2e2e6;display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px}
#am-app .asr{margin:16px 16px 0;height:48px;border-radius:24px;border:1.5px solid #dcdce0;display:flex;align-items:center;padding:0 18px 0 20px;gap:8px}#am-app .asr input{flex:1;min-width:0;border:0;outline:0;background:none;font-size:16px;color:#111}#am-app .asr input::placeholder{color:#9a9aa5}
#am-app .atb{display:flex;margin-top:22px;border-bottom:1.5px solid #e5e5e8}#am-app .atb button{flex:1;height:54px;text-align:center;font-size:17px;color:#9a9aa5;border-bottom:4px solid transparent;margin-bottom:-1.5px}#am-app .atb button.on{color:#111;font-weight:700;border-color:#ff4e1f}
#am-app .ast{display:grid;grid-template-columns:repeat(5,1fr);padding:16px 0;border-bottom:1.5px solid #e5e5e8}
#am-app .ast button{text-align:center;position:relative;padding:4px 0}#am-app .ast button+button::before{content:"";position:absolute;left:0;top:2px;height:50px;width:1px;background:#e4e4e8}
#am-app .ast i{display:block;font-style:normal;font-size:27px;font-weight:800;line-height:1.3}#am-app .ast span{display:block;font-size:16px;color:#9a9aa5;margin-top:4px;white-space:nowrap}#am-app .ast button.on i,#am-app .ast button.on span{color:#ff4e1f}#am-app .ast button.on span{font-weight:700}
#am-app .alist{background:#f5f5f6;min-height:160px}#am-app .ai{padding:24px 20px 28px;border-bottom:1.5px solid #ececef}
#am-app .ai .t1{display:flex;align-items:center;justify-content:space-between;color:#9a9aa5;font-size:17px}#am-app .ai .t1 span u{text-decoration:none;display:inline-block;width:1px;height:18px;background:#d8d8dc;vertical-align:middle;margin:0 12px}
#am-app .ai .t2{display:flex;align-items:center;justify-content:space-between;margin-top:18px;font-size:17px;color:#8b8b95}
#am-app .bdg{border:1.5px solid #d4d4d9;border-radius:6px;color:#9a9aa5;padding:3px 12px;font-size:16px}#am-app .bdg.on{border-color:#ff7a45;color:#ff5a1f}
#am-app .ai .co{margin-top:12px;font-size:16px}#am-app .ai .tt{font-size:19.5px;letter-spacing:-.04em;margin-top:6px;line-height:1.35;word-break:keep-all}
#am-app .ai .rv{display:flex;align-items:center;justify-content:center;width:100%;height:60px;margin-top:26px;border-radius:16px;background:#fff;border:1.5px solid #dcdce0;font-size:18px;font-weight:500;text-align:center}
#am-app .pg{text-align:center;color:#ff4e1f;font-weight:800;font-size:22px;padding:70px 0 46px}
#am-app .hid{display:flex;justify-content:flex-end;align-items:center;gap:4px;padding:30px 24px 38px;color:#8b8b95;font-size:17px}
#am-app .nt{margin:0 20px calc(env(safe-area-inset-bottom,0px) + 60px);background:#f5f5f6;padding:24px 22px;color:#8b8b95;font-size:15.5px;line-height:1.6}#am-app .nt p{margin:0 0 10px;padding-left:22px;position:relative;word-break:keep-all}#am-app .nt p:last-child{margin:0}#am-app .nt p::before{content:"";position:absolute;left:4px;top:.62em;width:6px;height:6px;border-radius:50%;background:#555}#am-app .nt b{color:#111;font-weight:400}
`;document.head.appendChild(st);})();

(()=>{const st=document.createElement("style");st.textContent=`
#bm-app .bm-nv{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;background:#fff!important;transform:translateZ(0)}
#bm-app .bm-ck span,#bm-app .bm-ph>span{filter:none!important}
#bm-app .bm-cd,#bm-app .bm-oc,#bm-app .bm-bnr{contain:layout paint}
#bm-app .bm-holo{contain:paint}#bm-app .bm-tab{will-change:scroll-position}
#bm-app .bm-oh,#bm-app .bm-toast{transform:translateZ(0)}
#bm-app .bm-hd{transition:none!important}#bm-app::before{transition:none!important}
#am-app .hd,#am-app .nv,#am-app .fab,#am-app .fl{transform:translateZ(0)}
#am-app .rcd{box-shadow:0 2px 8px rgba(255,150,100,.2)!important}
#am-app .rcd,#am-app .hc,#am-app .vc,#am-app .ai{contain:layout paint}
#am-app .sc{will-change:scroll-position}
#am-app .tg,#am-app .dots i{transition:none}
`;document.head.appendChild(st);})();
const AmApp = (() => {
  const $ = q => document.querySelector(q), el = $("#am-app"), screen = $("#screen");
  const ic = (p, w = 2, s = 24, f = "none") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    pin: '<svg width="24" height="30" viewBox="0 0 24 30"><path d="M12 1C6 1 1.500 5.500 1.500 11.200 1.500 18.500 12 29 12 29s10.500-10.500 10.500-17.800C22.500 5.500 18 1 12 1z" fill="#ff6a1a"/><circle cx="12" cy="11.500" r="4.300" fill="#fff"/></svg>',
    dn: '<path d="M6 9l6 6 6-6"/>', up: '<path d="M6 15l6-6 6 6"/>', rt: '<path d="M9 5l7 7-7 7"/>',
    sr: '<circle cx="11" cy="11" r="7.500"/><path d="M20.500 20.500L16.500 16.500"/>', mn: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>', bk: '<path d="M21 12H4M10 5.500L3.500 12l6.500 6.500"/>',
    flt: '<path d="M3 8h8M17 8h4M3 16h4M13 16h8"/><circle cx="14" cy="8" r="2.500"/><circle cx="10" cy="16" r="2.500"/>',
    star: '<path d="M12 2.500l2.900 6 6.600.8-4.900 4.500 1.300 6.500L12 17l-5.900 3.300 1.300-6.500L2.500 9.300l6.600-.8z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.500l2 2.200 3-.4.8 2.900 2.700 1.400-1 2.900 1 2.900-2.700 1.400-.8 2.900-3-.4-2 2.200-2-2.200-3 .4-.8-2.900L3.500 15.200l1-2.900-1-2.900L6.200 8l.8-2.900 3 .4z"/>',
    bell: '<path d="M6 17.500V11a6 6 0 1 1 12 0v6.500l1.500 1.500h-15zM10 21.500h4"/>', ph: '<path d="M6.500 4.500l3 .8 1 3.500-2 1.500c1 2.200 2.700 3.900 4.900 4.900l1.500-2 3.500 1 .8 3c-.3 1.500-1.500 2.500-3 2.500C9 19.200 4.800 15 4 8c0-1.500 1-2.800 2.500-3.500zM14.500 4a5.500 5.500 0 0 1 5.500 5.500M14.500 7a2.500 2.500 0 0 1 2.500 2.500"/>',
    kb: '<circle cx="12" cy="5" r="1.600" fill="currentColor"/><circle cx="12" cy="12" r="1.600" fill="currentColor"/><circle cx="12" cy="19" r="1.600" fill="currentColor"/>'
  };
  const bellY = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v5l-1.500 2.500h15L18 14V9a6 6 0 0 0-6-6z" fill="#ffc400"/><path d="M10 19a2 2 0 0 0 4 0z" fill="#ffc400"/></svg>';
  const mk = (p, c) => `<svg width="46" height="46" viewBox="0 0 48 48">${p}</svg>`;
  const CAT = [
    ["제트", '<path d="M10 12h30l-9 10h9L12 40l8-14H10z" fill="#2a2a3a"/><path d="M16 16h18l-6 7h7L18 36l5-10h-8z" fill="#ff6a1a"/>'],
    ["맞춤", '<circle cx="22" cy="26" r="16" fill="#ff6a1a"/><circle cx="22" cy="26" r="9" fill="#fff"/><circle cx="22" cy="26" r="4" fill="#222"/><path d="M24 24l14-14" stroke="#ffc400" stroke-width="4" stroke-linecap="round"/>'],
    ["지역별", '<path d="M5 15V5h10M33 5h10v10M43 33v10H33M15 43H5V33" fill="none" stroke="#c4c6cc" stroke-width="3.500"/><path d="M24 12c-5 0-8 3.500-8 8 0 6 8 14 8 14s8-8 8-14c0-4.500-3-8-8-8z" fill="#ff6a1a"/><circle cx="24" cy="20" r="3.200" fill="#fff"/>'],
    ["단기", '<rect x="6" y="9" width="32" height="30" rx="3" fill="#eceef1"/><path d="M6 12a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v4H6z" fill="#ff6a1a"/><rect x="12" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><rect x="28" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><circle cx="34" cy="34" r="9" fill="#ff6a1a"/><circle cx="34" cy="34" r="6.500" fill="#fff"/><path d="M34 30v4.500l3 1.500" stroke="#222" stroke-width="2" fill="none"/>'],
    ["급구", '<path d="M13 36V25a11 11 0 0 1 22 0v11z" fill="#ff5a14"/><rect x="8" y="36" width="32" height="5" rx="1.500" fill="#222"/><path d="M24 6v4M10 11l3 3M38 11l-3 3" stroke="#ffc400" stroke-width="3" stroke-linecap="round"/>'],
    ["높은시급", '<path d="M18 9c2 3 10 3 12 0l2-4H16z" fill="#e8a600"/><path d="M19 12C9 20 6 28 8 34c2 6 10 8 16 8s14-2 16-8c2-6-1-14-11-22z" fill="#ffc400"/><circle cx="24" cy="30" r="7.500" fill="#fff" opacity=".35"/><text x="24" y="35" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">W</text>'],
    ["한달이상", '<rect x="6" y="9" width="36" height="34" rx="3" fill="#eceef1"/><path d="M6 12a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v8H6z" fill="#ff6a1a"/><rect x="13" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><rect x="32" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><text x="24" y="37" text-anchor="middle" font-size="14" font-weight="900" fill="#ff6a1a">30+</text>'],
    ["재택", '<path d="M4 22L24 6l20 16v3H4z" fill="#ff6a1a"/><path d="M8 24h32v16H8z" fill="#c4c6cc"/><rect x="14" y="30" width="20" height="10" rx="1" fill="#444"/><circle cx="24" cy="35" r="2" fill="#fff"/>'],
    ["초보가능", '<g fill="#5ed25a"><circle cx="17" cy="17" r="9"/><circle cx="31" cy="17" r="9"/><circle cx="17" cy="31" r="9"/><circle cx="31" cy="31" r="9"/></g><path d="M16 16l16 16M32 16L16 32" stroke="#e6f9e4" stroke-width="2.500"/>'],
    ["바로출근", '<path d="M12 30l8-8 4-14h10l-3 18 10 6v6H10z" fill="#ff6a1a"/><path d="M12 30l10 8h18v-6l-8-4z" fill="#222" opacity=".8"/><path d="M3 30h8M5 35h8M7 40h8" stroke="#ffa060" stroke-width="2.500" stroke-linecap="round"/>']
  ];
  const wm = (k, a, b) => k === "cls" ? '<div class="wm"><span style="color:#8a4a1a">cou</span><span style="color:#3aa0d8">p</span><span style="color:#e5392a">an</span><span style="color:#2fa84f">g</span><small>logistics services</small></div>' : k === "cfs" ? '<div class="wm"><span style="color:#8a4a1a">cou</span><span style="color:#3aa0d8">p</span><span style="color:#e5392a">an</span><span style="color:#2fa84f">g</span><small>fulfillment services</small></div>' : '<div class="wm" style="font-style:italic;font-size:15px;color:#c8242b">HICARZ<small style="color:#444">AUTOPLAN</small></div>';
  const REC = [
    [["가천대길병원", "관악구", "가천대길병원 임상시험센터 사무보조 모집", "월급", "240만원"], ["(주)비즈원플러스", "신림동", "단기/행사/신림/이벤트) ㅇㅇ간호사회 기...", "시급", "11,000원"], ["쿠팡CFS", "신림동", "[초보환영/익일지급] 일최대16만★ 원하...", "일급", "16만원", 1]],
    [["스타벅스 신림점", "관악구", "스타벅스 신림역점 바리스타 파트너 모집", "시급", "10,320원"], ["GS25 낙성대점", "관악구", "GS25 낙성대점 주말 오전 근무자 모집", "시급", "10,030원"], ["CU 신림점", "관악구", "CU 신림점 야간 스태프 구합니다", "시급", "11,500원", 1]],
    [["서울 물류센터", "관악구", "[당일지급] 물류 상하차 단기 알바", "일급", "13만원"], ["맘스터치 대학동점", "구로구", "맘스터치 대학동점 평일 오후 크루 모집", "시급", "10,200원"], ["올리브영 신림", "관악구", "올리브영 신림점 주말 매장관리 모집", "시급", "10,500원", 1]],
    [["메가커피 사당점", "관악구", "메가커피 사당점 오픈/마감 파트타임", "시급", "10,100원"], ["이마트 신대방점", "관악구", "이마트 신대방점 계산/진열 사원 모집", "시급", "10,030원"], ["투썸플레이스", "영등포구", "투썸플레이스 주안점 주 3일 근무자", "시급", "10,500원", 1]],
    [["롯데시네마 신림", "관악구", "롯데시네마 신림역 매점 스태프", "시급", "10,200원"], ["본죽 난곡점", "관악구", "본죽 난곡점 주방 보조 모집", "시급", "10,800원"], ["다이소 신림", "관악구", "다이소 신림점 진열/계산 스태프", "시급", "10,030원", 1]]
  ];
  const HOT = [["cls", "쿠팡CLS", "계산동", "[입사축하금+면접비] 물류 알바관리자", "연봉", "5,020만원"], ["cls", "쿠팡CLS", "난곡동", "쿠팡CLS ★현장사무직★(인사/행정/급여 담당자...", "연봉", "3,500만원"], ["cfs", "쿠팡CFS", "대학동", "[초보환영/익일지급] 일최대 16만★ 원하는 날 하루만 ...", "일급", "16만원"],
    ["cfs", "쿠팡CFS", "선학동", "[초보환영/익일지급] 일최대16만★ 원하는 날 하루만...", "일급", "16만원"], ["cls", "쿠팡CLS", "용현동", "★징검다리 연휴★자유롭게 근무 3일 최대 40만원!#...", "일급", "10만원"], ["hz", "주식회사 하이카즈...", "신림동", "[인센티브50프로/정착지원금600]영업의중심/신차...", "월급", "500만원"],
    ["cls", "쿠팡CLS", "서운동", "[입사축하금] 물류 현장 알바관리자 모집", "연봉", "4,200만원"], ["cfs", "쿠팡CFS", "가좌동", "[초보환영/익일지급] 일최대16만★ 하루만 근무 ...", "일급", "16만원"], ["cls", "쿠팡CLS", "연수동", "쿠팡CLS 사무직 ★인사/총무 담당자 모집★", "연봉", "3,600만원"],
    ["cfs", "쿠팡CFS", "미성동", "[초보환영/익일지급] 일최대16만★ 주말 근무...", "일급", "16만원"], ["cls", "쿠팡CLS", "남촌동", "★연휴 특별★ 자유롭게 근무 2일 최대 30만원", "일급", "15만원"], ["hz", "주식회사 하이카즈...", "행운동", "[인센티브50프로]신차영업 경력/신입 모집", "월급", "450만원"]];
  const LST = [["컴포즈커피(신림포레스트점)", "컴포즈커피(신림포레스트점) 평일마감 모집합니다", "관악구 신림동", "요일협의 · 시간협의", "10,500원"], ["컴포즈커피 신림로점", "컴포즈 신림로점(평일 오후)함께하실분 모집합니다", "관악구 신림동", "요일협의 · 시간협의", "10,500원"]];
  const LST2 = [["테라커피 신림점", "테라커피 신림점 월,화,수,목,금요일 마감시간 모집", "관악구 신림동", "주5일 · 19:00~23:00", "10,320원"], ["카페드롭탑 신림점", "카페드롭탑 신림점 주말 오후 파트타임 구합니다", "관악구 신림동", "주말 · 13:00~18:00", "10,200원"], ["버거킹 신림점", "버거킹 신림점 크루 모집 (평일 저녁)", "관악구 신림동", "주4일 · 17:00~22:00", "10,400원"]];
  const MYJ = [["(주)에치와이", "[초보환영/교육비 지급] 한국야쿠르트 간단 배달 ...", ["매장관리", "판매", "도보배달", "뷰티", "헬스스토어"], "서울 관악구 신림동"], ["(주)오늘의식탁", "[주 2일 가능] 주방 보조 및 홀 서빙 모집", ["서빙", "주방보조", "단기"], "서울 관악구 신림동"], ["(주)한빛유통", "[3시간 단기] 오전 상품 진열 / 검수 알바", ["유통", "진열", "검수"], "서울 관악구 신림동"]];
  const AP = [{ d: "2026.04.14", m: "온라인지원", tab: 0, st: "불합격", end: "04.22", co: "런코리아㈜", t: "[5/9](토) 2026 나는 솔로런 운영요원 모집" }];
  const stat = ["전체", "지원완료", "면접", "합격", "불합격/취소"];
  const pay = (a, b) => `<span class="pay"><em>${a}</em> ${b}</span>`;
  const star = '<button class="st" data-a="star" aria-label="스크랩">' + ic(I.star, 1.5, 28, "currentColor") + '</button>';
  const vcard = (j, k) => `<div class="vc"><small>${j[0]}</small><b>${j[1]}</b><div class="rw">${ic('<path d="M12 21s-6-5.500-6-10a6 6 0 0 1 12 0c0 4.500-6 10-6 10z"/>', 0, 22, "#c4c6cc")}${j[2]}</div><div class="rw">${ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke="#fff" fill="none"/>', 0, 22, "#c4c6cc")}${j[3]}</div><div class="rw"><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#c4c6cc"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">W</text></svg><span class="g">시급</span><u>${j[4]}</u></div>${star}</div>`;
  const navI = [["홈", '<path d="M3.500 11L12 3.500 20.500 11V20h-5.500v-6h-6v6H3.500z" fill="currentColor" stroke="currentColor" stroke-linejoin="round"/>'], ["커뮤니티", '<circle cx="12" cy="5" r="2.300"/><circle cx="5" cy="18" r="2.300"/><circle cx="19" cy="18" r="2.300"/><path d="M11 7.200L6 16M13 7.200L18 16M7.500 18h9"/>'], ["지도", '<path d="M12 3.500a5 5 0 0 0-5 5c0 3.700 5 8 5 8s5-4.300 5-8a5 5 0 0 0-5-5z"/><circle cx="12" cy="8.500" r="1.800"/><path d="M4 16l-1.500 4.500h19L20 16"/>'], ["채팅", '<path d="M12 4a8 8 0 0 0-6.800 12.200L4 20l4-1.200A8 8 0 1 0 12 4z"/>'], ["MY", '<circle cx="12" cy="8" r="4.200"/><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7z"/>']];
  el.innerHTML = `
  <div class="sc" id="am-hs"><div style="height:var(--hh)"></div>
    <div class="rc"><div class="rs" id="am-rs">${REC.map(sl => `<div class="rcd">${sl.map(j => `<div class="jb"><small>${j[0]} · ${j[1]}</small><b>${j[2]}</b>${pay(j[3], j[4])}${j[5] ? '<span class="ad">AD</span>' : ""}</div>`).join("")}</div>`).join("")}</div><div class="dots" id="am-dots">${REC.map((_, i) => `<i${i ? "" : ' class="on"'}></i>`).join("")}</div></div>
    <div class="cats">${CAT.map(c => `<div>${mk(c[1])}${c[0]}</div>`).join("")}</div>
    <div class="fl"><span class="ic">${ic(I.flt, 2, 22)}</span><span>하는 일 ${ic(I.dn, 2, 18)}</span><span>일하는 기간 ${ic(I.dn, 2, 18)}</span><span>일하는 요일 ${ic(I.dn, 2, 18)}</span><span>기타 조건 ${ic(I.dn, 2, 18)}</span></div>
    <div class="sh"><svg width="28" height="30" viewBox="0 0 28 30"><path d="M14 1c1 5 8 8 8 16a8 8 0 0 1-16 0c0-4 2-6 3-8 .5 2 1.500 3 3 3 0-4-1-7 2-11z" fill="#ff5a1f"/><path d="M14 14c3 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8z" fill="#ffc400"/></svg>적극 채용중<span class="ad">AD</span></div>
    <div class="hot">${HOT.map(h => `<div class="hc"><div class="lg">${wm(h[0])}<i>HOT</i></div><small${h[0] === "hz" ? ' style="color:#e5392a"' : ""}>${h[1]} · ${h[2]}</small><b>${h[3]}</b>${pay(h[4], h[5])}</div>`).join("")}</div>
    <div class="vl" style="margin-top:16px">${LST.map((j, i) => vcard(j, i)).join("")}</div>
    <div class="sh"><svg width="30" height="30" viewBox="0 0 30 30"><rect x="2" y="12" width="7" height="14" rx="1" fill="#3a6cf0"/><path d="M11 12l5-9c2 0 3 2 2 5l-1 3h8c2 0 3 2 2 4l-2 9c-.5 2-2 3-4 3H11z" fill="#ffd2b8"/></svg>나한테 딱 맞는 알바<span class="ad">AD</span></div>
    <div class="vl">${LST2.map((j, i) => vcard(j, i)).join("")}</div><div style="height:calc(var(--nb) + 70px)"></div></div>
  <div class="hd"><div class="hr"><div class="loc">${I.pin}<span>신림동</span>${ic(I.dn, 2.4, 22)}</div><span class="ib">${ic(I.sr, 2, 30)}</span><span class="ib">${ic(I.mn, 2, 30)}</span></div></div>
  <button class="fab" id="am-fab" aria-label="맨 위로">${ic(I.up, 2.2, 26)}</button>
  <nav class="nv">${navI.map((n, i) => `<button data-n="${i}">${ic(n[1], 2, 28)}${n[0]}</button>`).join("")}</nav>
  <div class="ov" id="am-my"><div class="sc" id="am-mys">
    <div class="mh"><span>마이페이지</span><button data-a="myx" aria-label="닫기">${ic(I.x, 1.8, 34)}</button></div>
    <div class="adb"><span class="ad">AD</span></div>
    <div class="pf"><div class="av"><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="22" r="9" fill="#dcdce0"/><path d="M8 56c0-12 8-16 20-16s20 4 20 16z" fill="#dcdce0"/></svg></div><div class="pn"><div style="justify-content:space-between;margin:0"><b>진소윤님</b><span class="mi" style="background:none;padding:0;border-radius:0">${ic(I.gear, 1.6, 22)}회원정보</span></div><div><span>이력서 비공개중</span><span style="background:none;padding:0">인재정보에 공개하기</span></div></div></div>
    <div class="stt"><button><i>1</i><span>이력서관리</span></button><button data-a="goap"><i id="am-apn">${AP.length}</i><span>지원현황</span></button><button><i>0</i><span>스크랩</span></button><button><i>0</i><span>최근본알바</span></button></div>
    <div class="sb3"><span>알바제의 <b>0</b></span><span>이력서 열람 <b>0</b></span><span>관심기업 <b>0</b></span></div>
    <div class="qk"><div class="ms"><i>ᗜ</i></div><span class="t"><b>바로출근</b> 설정하고 더 빠르게 일하자!</span><button class="tg" data-a="tg" aria-label="바로출근"></button></div>
    <div class="rg"><div class="rgh"><h3>하루를 알차게 보내자!<br><em>하루 3시간 미만</em> 알바 공고 모음</h3><span>AI추천알바 ${ic(I.rt, 2, 16)}</span></div>
      <div class="rh" id="am-rh">${MYJ.map(j => `<div class="vc"><small style="padding:0;color:#111;font-weight:700;font-size:18px">${j[0]}</small><b>${j[1]}</b><div class="tags">${j[2].map(t => `<span>${t}</span>`).join("")}</div><div style="color:#8b8b95;font-size:16px">${j[3]}</div>${star}</div>`).join("")}</div>
      <div class="trk"><i id="am-trk"></i></div></div>
    <div class="nw"><b>나의 소식</b><span>${ic(I.bell, 1.6, 22)}푸시알림설정</span></div>
    <div class="em">새로운 소식이 없어요</div></div></div>
  <div class="ov" id="am-ap"><div class="sc" id="am-aps"></div></div>`;
  const hs = $("#am-hs"), fab = $("#am-fab"), my = $("#am-my"), ap = $("#am-ap"), aps = $("#am-aps");
  const S = { tab: 0, st: 0, q: "" };
  const apList = () => AP.filter(a => a.tab === S.tab);
  const match = (a, k) => k === 0 || (k === 4 ? (a.st === "불합격" || a.st === "취소") : a.st === stat[k]);
  const renderAp = (keep) => {
    const base = apList(), cnt = stat.map((_, k) => base.filter(a => match(a, k)).length), q = S.q.trim().toLowerCase();
    const rows = base.filter(a => match(a, S.st) && (!q || (a.co + a.t).toLowerCase().includes(q)));
    aps.innerHTML = `<div class="ah"><button data-a="apb" aria-label="뒤로">${ic(I.bk, 1.8, 34)}</button><span>지원현황</span></div>
    <div class="ainfo"><span>지원한 공고의 진행 상황을 알려드려요</span><button>${bellY}알림받기</button></div>
    <div class="asr"><input id="am-q" placeholder="기업명, 채용제목, 연락처로 검색하세요." value="${S.q.replace(/"/g, "&quot;")}" autocomplete="off">${ic(I.sr, 1.8, 32)}</div>
    <div class="atb"><button data-a="atab" data-k="0"${S.tab === 0 ? ' class="on"' : ""}>온라인·문자·이메일 지원</button><button data-a="atab" data-k="1"${S.tab === 1 ? ' class="on"' : ""}>기타 지원</button></div>
    <div class="ast">${stat.map((n, k) => `<button data-a="ast" data-k="${k}"${S.st === k ? ' class="on"' : ""}><i>${cnt[k]}</i><span>${n}</span></button>`).join("")}</div>
    <div class="alist">${rows.length ? rows.map(a => `<div class="ai"><div class="t1"><span>${a.d}<u></u>${a.m}</span><span style="display:flex;align-items:center;gap:18px;color:#222">${ic(I.ph, 1.6, 30)}${ic(I.kb, 2, 22)}</span></div><div class="t2"><span class="bdg">${a.st}</span><span>마감 ${a.end}</span></div><div class="co">${a.co}</div><div class="tt">${a.t}</div><button class="rv">기업후기 작성하기</button></div>`).join("") : '<div class="em" style="padding:60px 0">지원 내역이 없습니다</div>'}</div>
    <div class="pg">1</div><div class="hid">숨긴 내역 보기 ${ic(I.rt, 2, 20)}</div>
    <div class="nt"><p>모든 지원 내역은 1년간 저장됩니다.</p><p>이력서를 수정하셔도 이미 지원한 이력서에는 반영되지 않습니다.</p><p>동네간편지원은 지원방법 특성상 " <b>지원취소</b>"가 불가능 합니다.</p></div>`;
    if (!keep) aps.scrollTop = 0;
  };
  let fabOn = false, fr = 0; hs.addEventListener("scroll", () => { if (fr) return; fr = requestAnimationFrame(() => { fr = 0; const o = hs.scrollTop > 500; if (o !== fabOn) { fabOn = o; fab.classList.toggle("on", o); } }); }, { passive: true });
  const rs = $("#am-rs"), dots = [...el.querySelectorAll("#am-dots i")];
  let rw = 0; rs.addEventListener("scroll", () => { const w = rw || (rw = rs.firstElementChild.offsetWidth + 12), k = Math.max(0, Math.min(dots.length - 1, Math.round(rs.scrollLeft / w))); dots.forEach((d, i) => d.classList.toggle("on", i === k)); }, { passive: true });
  const rh = $("#am-rh"), trk = $("#am-trk");
  rh.addEventListener("scroll", () => { const m = rh.scrollWidth - rh.clientWidth; trk.style.left = (m > 0 ? rh.scrollLeft / m * 82 : 0) + "%"; }, { passive: true });
  el.addEventListener("input", e => { if (e.target.id === "am-q") { S.q = e.target.value; const p = e.target.selectionStart; renderAp(true); const n = $("#am-q"); n.focus(); n.setSelectionRange(p, p); } });
  el.addEventListener("click", e => {
    const t = e.target.closest("[data-a],[data-n]"); if (!t) return;
    if (t.dataset.n !== undefined) { if (t.dataset.n === "4") { my.classList.add("on"); } else if (t.dataset.n === "0") { hs.scrollTo({ top: 0, behavior: "smooth" }); } return; }
    const a = t.dataset.a;
    if (a === "myx") my.classList.remove("on");
    else if (a === "goap") { S.tab = 0; S.st = 0; S.q = ""; renderAp(); ap.classList.add("on"); }
    else if (a === "apb") ap.classList.remove("on");
    else if (a === "atab") { S.tab = +t.dataset.k; S.st = 0; renderAp(true); }
    else if (a === "ast") { S.st = +t.dataset.k; renderAp(true); }
    else if (a === "tg") t.classList.toggle("on");
    else if (a === "star") t.classList.toggle("on");
  });
  fab.addEventListener("click", () => hs.scrollTo({ top: 0, behavior: "smooth" }));
  let isOpen = false;
  function open() { if (isOpen) return; isOpen = true; originFrom(el, "albamon"); my.classList.remove("on"); ap.classList.remove("on"); hs.scrollTop = 0; el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140); }
  function close() { if (!isOpen) return; isOpen = false; screen.classList.remove("app-light"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!isOpen) { el.classList.remove("show"); my.classList.remove("on"); ap.classList.remove("on"); } }, 430); }
  document.addEventListener("app:open", e => { if (e.detail.id === "albamon") open(); });
  document.addEventListener("app:close", close);
  return { open, close };
})();
