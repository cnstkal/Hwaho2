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
    { n: "불난닭발 신림점", e: "🍗", h: 8, s: "10. 12 (월)", dt: "10월 12일 오후 9:48", no: "T2G40000M41A", ty: "한집배달", it: [["국물닭발(중)", 19000, 1, [["가격", "19,000원"]]],["치즈 추가", 2000, 1, [["가격", "2,000원"]]],["계란찜 추가", 3000, 1, [["가격", "3,000원"]]],["주먹밥 추가", 2500, 1, [["가격", "2,500원"]]]], tip: 2000, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "토스페이" },
    { n: "맥도날드 신림역DT점", e: "🍔", h: 45, s: "10. 10 (토)", dt: "10월 10일 오후 7:21", no: "T2G40000M33B", ty: "한집배달", it: [["빅맥 세트", 7900, 1, [["가격", "7,900원"]]],["상하이 치킨버거 세트", 7600, 1, [["가격", "7,600원"]]]], tip: 2500, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "카카오페이" },
    { n: "멘야 소라 신림점", e: "🍜", h: 20, s: "10. 8 (목)", dt: "10월 8일 오후 12:40", no: "T2G40000M18C", ty: "알뜰배달", it: [["아부라소바(특대)", 11500, 2, [["가격", "11,500원"]]]], tip: 2900, club: 1, cp: 1500, cpn: "배민클럽 쿠폰", pay: "토스페이" },
    { n: "바다횟집 신림점", e: "🐟", h: 200, s: "10. 3 (토)", dt: "10월 3일 오후 8:05", no: "T2G40000M02D", ty: "한집배달", it: [["모둠회(중)", 45000, 1, [["가격", "45,000원"]]],["매운탕", 8000, 1, [["가격", "8,000원"]]]], tip: 3000, club: 0, cp: 3000, cpn: "쿠폰 할인", pay: "신용카드" },
    { n: "토박이순대국 신림점", e: "🍲", h: 18, s: "9. 30 (수)", dt: "9월 30일 오후 1:12", no: "T2G40000L97E", ty: "한집배달", it: [["순대국", 9000, 2, [["가격", "9,000원"]]],["모듬순대", 12000, 1, [["가격", "12,000원"]]]], tip: 1500, club: 0, cp: 2000, cpn: "쿠폰 할인", pay: "토스페이" },
    { n: "청년다방 떡볶이 신림점", e: "🍢", h: 350, s: "9. 27 (일)", dt: "9월 27일 오후 6:08", no: "T2G40000L88F", ty: "한집배달", it: [["오리지널 떡볶이 2인세트", 15000, 1, [["가격", "15,000원"]]],["어묵 추가", 3000, 1, [["가격", "3,000원"]]]], tip: 1500, club: 0, cp: 2500, cpn: "쿠폰 할인", pay: "카카오페이" },
    { n: "홍콩반점0410 신림점", e: "🥡", h: 4, s: "9. 19 (토)", dt: "9월 19일 오후 8:30", no: "T2G40000L51G", ty: "한집배달", it: [["짬뽕", 8000, 1, [["가격", "8,000원"]]],["짜장면", 7000, 1, [["가격", "7,000원"]]],["탕수육(소)", 14000, 1, [["가격", "14,000원"]]]], tip: 0, club: 0, cp: 2500, cpn: "쿠폰 할인", pay: "신용카드" }
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
#bm-app .bm-nv{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;background:#fff!important;transform:translateZ(0)}
#bm-app .bm-ck span,#bm-app .bm-ph>span{filter:none!important}
#bm-app .bm-cd,#bm-app .bm-oc,#bm-app .bm-bnr{contain:layout paint}
#bm-app .bm-holo{contain:paint}#bm-app .bm-tab{will-change:scroll-position}
#bm-app .bm-oh,#bm-app .bm-toast{transform:translateZ(0)}
#bm-app .bm-hd{transition:none!important}#bm-app::before{transition:none!important}
`;document.head.appendChild(st);})();
