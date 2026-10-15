/* 배달의민족 앱 — 참고 사진 기반 신규 구현 (#bm-app, 전용 클래스: bmx-*) */
(() => {
  const el = document.querySelector("#bm-app"), screen = document.querySelector("#screen");
  if (!el || el.dataset.bmxReady) return;
  el.dataset.bmxReady = "1";

  /* ---------- 데이터 ---------- */
  const stores = [
    { id: 1, name: "파스타일 파스타&필라프 미추홀점", em: "🍝", bg: "radial-gradient(circle at 40% 45%,#f4c27c,#c9783a 70%,#7a4a2c)", r: "4.9", rv: "1,321", t: "약 40분", d: "1.8km", z: 502, label: "5,000원~12,000원 할인", cat: "타임세일", menu: [["까르보나라 파스타", 9800], ["로제 새우 파스타", 11500], ["베이컨 필라프", 10500]] },
    { id: 2, name: "빌리언박스 버거&치킨", em: "🍔", bg: "linear-gradient(135deg,#2b2b2b,#6b5a3c)", r: "4.8", rv: "812", t: "약 27분", d: "480m", z: 462, label: "5,000원~9,000원 할인", cat: "패스트푸드", menu: [["더블 치즈버거", 8900], ["치킨 박스", 12900], ["감자튀김", 3500]] },
    { id: 3, name: "갱스터닭강정 미추홀점", em: "🍗", bg: "linear-gradient(135deg,#7b4a2a,#c27a3d)", r: "4.9", rv: "559", t: "약 35분", d: "1.7km", z: 301, label: "20% 할인", cat: "치킨", menu: [["[1인분] 갱스터 닭강정", 12000], ["순살 닭강정 (중)", 17000]] },
    { id: 4, name: "치킨플러스 동구점", em: "🍗", bg: "linear-gradient(135deg,#e7b660,#c8873a)", r: "4.9", rv: "304", t: "약 30분", d: "0.6km", z: 210, label: "10% 할인", cat: "치킨", menu: [["싱글윙봉 소떡소떡 세트", 11400], ["후라이드 치킨", 18000]] },
    { id: 5, name: "동대문엽기떡볶이 인천제물포점", em: "🍲", bg: "linear-gradient(135deg,#e8493f,#c92d25)", r: "4.8", rv: "2,044", t: "약 32분", d: "1.1km", z: 733, label: "", cat: "분식", menu: [["로제메뉴", 16000], ["오리지널 떡볶이", 14000], ["엽기 오뎅", 3000]] },
    { id: 6, name: "빽보이피자 동인천점", em: "🍕", bg: "linear-gradient(135deg,#b3202a,#e0563c)", r: "4.9", rv: "1,102", t: "약 38분", d: "2.3km", z: 389, label: "", cat: "피자", menu: [["꿀고구마스틱", 7900], ["토마토 치즈 스파게티", 9800], ["콤비네이션 피자 (L)", 19900]] },
    { id: 7, name: "밥퍼맨 짜글이", em: "🍲", bg: "linear-gradient(135deg,#a8441f,#d98a3a)", r: "4.9", rv: "1,034", t: "약 33분", d: "1.3km", z: 256, label: "25% 할인", cat: "한그릇", menu: [["[한그릇] 돼지 짜글이", 11250], ["계란말이", 6000]] },
    { id: 8, name: "두찜 제물포점", em: "🥘", bg: "linear-gradient(135deg,#c0391c,#f08a3a)", r: "4.7", rv: "1,650", t: "약 36분", d: "1.5km", z: 420, label: "9,500원 할인", cat: "찜·탕", menu: [["순살 찜닭 (중)", 22900], ["치즈 찜닭", 25900]] },
    { id: 9, name: "스시로 제물포점", em: "🍣", bg: "linear-gradient(135deg,#f6dcc9,#e88a6a)", r: "4.8", rv: "690", t: "약 41분", d: "2.0km", z: 175, label: "", cat: "돈까스·회", menu: [["모둠초밥 12p", 15900], ["수제 등심돈까스", 9500]] },
    { id: 10, name: "컴포즈커피 동인천점", em: "☕", bg: "linear-gradient(135deg,#d9c3a5,#8b6a4a)", r: "4.9", rv: "430", t: "약 20분", d: "0.4km", z: 98, label: "", cat: "카페·디저트", menu: [["아이스 아메리카노", 2000], ["바닐라 라떼", 3500]] }
  ];
  const hot = [
    { sid: 3, t: "[1인분] 갱스터 닭강정", pct: 20, price: 12000, orig: 15000, sn: "갱스터닭강정 미추홀…", d: "1.7km", r: "4.9", rv: "559" },
    { sid: 4, t: "싱글윙봉 소떡소떡 세트", pct: 10, price: 11400, orig: 12800, sn: "치킨플러스 동구…", d: "0.6km", r: "4.9", rv: "304" },
    { sid: 7, t: "[한그릇] 밥퍼맨 짜글이", pct: 25, price: 11250, orig: 15000, sn: "밥퍼맨 짜글이", d: "1.3km", r: "4.9", rv: "1,024" }
  ];
  const cats = [
    ["치킨", "🍗", "치킨"], ["피자", "🍕", "피자"], ["분식", "🍢", "분식"], ["카페·디저트", "🧋", "카페·디저트"], ["패스트푸드", "🍔", "패스트푸드"],
    ["배짱할인", "bk"], ["타임세일", "alarm"], ["한그릇", "han"], ["돈까스·회", "🍣", "돈까스·회"], ["BHC", "bhc"]
  ];
  const orders = [
    { id: 1, sid: 5, date: "9. 8 (화)", full: "9월 8일 오후 12:31", no: "T2G40000L03C", items: [{ n: "로제메뉴", o: ["가격: (16,000원)", "메뉴 선택: 로제떡볶이", "맛 선택: 착한맛"], p: 16000, q: 1 }], tip: 2700, club: 2700, coupon: 2000 },
    { id: 2, sid: 6, date: "8. 18 (화)", full: "8월 18일 오후 6:42", no: "T2G40000K88A", bolt: 1, items: [{ n: "꿀고구마스틱", o: [], p: 7900, q: 1 }, { n: "토마토 치즈 스파게티", o: [], p: 9800, q: 1 }], tip: 2700, club: 2700, coupon: 6300 },
    { id: 3, sid: 3, date: "8. 12 (수)", full: "8월 12일 오후 7:18", no: "T2G40000J31B", items: [{ n: "[1인분] 갱스터 닭강정", o: [], p: 12000, q: 1 }], tip: 3000, club: 0, coupon: 2400 },
    { id: 4, sid: 1, date: "7. 29 (수)", full: "7월 29일 오후 12:05", no: "T2G40000H27C", items: [{ n: "까르보나라 파스타", o: [], p: 9800, q: 1 }, { n: "베이컨 필라프", o: [], p: 10500, q: 1 }], tip: 2500, club: 2500, coupon: 1500 },
    { id: 5, sid: 7, date: "7. 16 (목)", full: "7월 16일 오후 6:51", no: "T2G40000G16D", items: [{ n: "[한그릇] 돼지 짜글이", o: [], p: 11250, q: 1 }], tip: 2500, club: 0, coupon: 2800 },
    { id: 6, sid: 4, date: "6. 30 (화)", full: "6월 30일 오후 8:12", no: "T2G40000F04E", items: [{ n: "후라이드 치킨", o: [], p: 18000, q: 1 }], tip: 3000, club: 3000, coupon: 1800 },
    { id: 7, sid: 5, date: "6. 11 (목)", full: "6월 11일 오후 12:24", no: "T2G40000E91F", items: [{ n: "오리지널 떡볶이", o: [], p: 14000, q: 1 }], tip: 2500, club: 2500, coupon: 2000 }
  ];

  /* ---------- 상태 ---------- */
  let opened = false, page = "home", stack = [], tab = 0, otab = 0, sid = null, oid = null, sheet = null, listT = "", q = "", rendered = null, discOpen = true, got = false, timer = 855, tm = null, pg = 1, pgT = null;
  const liked = new Set([3]), cart = [], memo = {};
  let cartSid = null;

  /* ---------- 유틸 / 아이콘 ---------- */
  const E = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const W = n => n.toLocaleString("ko-KR") + "원";
  const $ = s => el.querySelector(s);
  const P = {
    back: '<path d="M19 12H5M11 5l-7 7 7 7"/>', cart: '<path d="M2.500 3.500h3l2.300 11.500h10.500l2.200-8.500H6"/><circle cx="9.300" cy="19.300" r="1.500"/><circle cx="17" cy="19.300" r="1.500"/>',
    bell: '<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.500 2h-15z"/><path d="M10 21.500a2.300 2.300 0 0 0 4 0"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m16.500 16.500 4.500 4.500"/>',
    chev: '<path d="m9 5 7 7-7 7"/>', down: '<path d="m6 9 6 6 6-6"/>', up: '<path d="m6 15 6-6 6 6"/>', caret: '<path d="M6 9h12l-6 7.500z"/>',
    heart: '<path d="M12 20.500S3.200 15 3.200 8.900A4.700 4.700 0 0 1 12 6.400a4.700 4.700 0 0 1 8.800 2.500C20.800 15 12 20.500 12 20.500z"/>',
    info: '<circle cx="12" cy="12" r="9.500"/><path d="M12 11v6M12 7.500v.1"/>', close: '<path d="M6 6l12 12M18 6 6 18"/>', plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
    bolt: '<path d="M13.500 2 5 13.500h6l-1 8.500L19 10h-6z"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3.500 2"/>', pin: '<path d="M12 21s7-6 7-11.500a7 7 0 0 0-14 0C5 15 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>'
  };
  const ic = (n, s = 24, w = 2, f = 0, st = "") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f ? "currentColor" : "none"}" stroke="${f ? "none" : "currentColor"}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${st ? ` style="${st}"` : ""}>${P[n]}</svg>`;
  const club = (s = 18) => `<svg class="bmx-cl" width="${s}" height="${s}" viewBox="0 0 24 24"><rect width="24" height="24" rx="5.500" fill="#2ac1bc"/><path d="M12 4.200c.5 3.700 2.600 6 7.800 7.800-5.200 1.800-7.300 4.100-7.800 7.800-.5-3.700-2.600-6-7.800-7.800C9.400 10.200 11.500 7.900 12 4.200z" fill="#fff"/></svg>`;
  const nav = (k, on) => ({
    home: on ? '<path d="M12 3.300 3 10.800V20.500h6.300v-6h5.400v6H21V10.800z" fill="currentColor" stroke="none"/>' : '<path d="M12 3.800 4 10.500V20h5.500v-6h5v6H20v-9.500z"/>',
    shop: '<path d="M5 8h14l-1 12.500H6z"' + (on ? ' fill="currentColor"' : "") + '/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/>',
    zzim: P.heart.replace("<path", on ? '<path fill="currentColor"' : "<path"),
    orders: on ? '<rect x="4.500" y="3" width="15" height="18" rx="3" fill="currentColor" stroke="none"/><path d="M8.500 9.500h7M8.500 14h5" stroke="#fff" stroke-width="2"/>' : '<rect x="4.500" y="3" width="15" height="18" rx="3"/><path d="M8.500 9.500h7M8.500 14h5"/>',
    my: '<circle cx="12" cy="12" r="9.500"' + (on ? ' fill="currentColor"' : "") + '/><path d="M7.500 13.500c1.300 2.400 3 3.300 4.800 3.300 2 0 3.700-1.200 4.200-3.300" stroke="' + (on ? "#fff" : "currentColor") + '"/>'
  }[k]);
  const NAVS = [["home", "홈"], ["shop", "장보기·쇼핑"], ["zzim", "찜"], ["orders", "주문내역"], ["my", "마이배민"]];
  const navH = cur => `<nav class="bmx-nav">${NAVS.map(([k, l]) => `<button class="${k === cur ? "on" : ""}" data-bx="nav" data-id="${k}"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${nav(k, k === cur)}</svg><span>${l}</span></button>`).join("")}</nav>`;
  const cartN = () => cart.reduce((a, c) => a + c.q, 0);
  const cartBtn = () => `<button class="bmx-ib" data-bx="cart" aria-label="장바구니">${ic("cart", 26, 1.9)}${cartN() ? `<b class="bmx-bd">${cartN()}</b>` : ""}</button>`;
  const mmss = () => String(Math.floor(timer / 60)).padStart(2, "0") + ":" + String(timer % 60).padStart(2, "0");
  const sOf = id => stores.find(s => s.id === id);
  const sum = o => o.items.reduce((a, i) => a + i.p * i.q, 0);
  const payOf = o => sum(o) + o.tip - o.club - o.coupon;
  const thumb = (s, z = 48, r = 12) => `<i class="bmx-th" style="width:${z}px;height:${z}px;border-radius:${r}px;background:${s.bg};font-size:${z * .55}px">${s.em}</i>`;
  const heartB = s => `<button class="bmx-hz ${liked.has(s.id) ? "on" : ""}" data-bx="like" data-id="${s.id}" aria-label="찜">${ic("heart", 24, 1.9, liked.has(s.id))}</button>`;

  /* ---------- 공통 컴포넌트 ---------- */
  const hdr = (title, right = "") => `<header class="bmx-hd"><button class="bmx-ib" data-bx="back" aria-label="뒤로">${ic("back", 26, 2.2)}</button><h1>${E(title)}</h1><div class="bmx-hr">${right || cartBtn()}</div></header>`;
  const tmBoxes = () => mmss().split("").map(c => c === ":" ? "<u>:</u>" : `<b>${c}</b>`).join("");
  const timeCard = s => `<div class="bmx-tc" data-bx="store" data-id="${s.id}"><div class="bmx-ti" style="background:${s.bg}"><span class="bmx-em">${s.em}</span><div class="bmx-lb">${ic("clock", 15, 2.6)} ${s.label}</div></div><div class="bmx-r1"><b>${E(s.name)}</b><span><i class="bmx-st">★</i>${s.r} <em>(${s.rv})</em></span></div><div class="bmx-tip">배달팁 0원 적용 중</div><div class="bmx-mt"><i class="bmx-won">₩</i>${s.t}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6 7-11.500a7 7 0 0 0-14 0C5 15 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>${s.d}</div><div class="bmx-mt">${ic("heart", 17, 1.8)}${s.z}명이 찜했어요</div><div class="bmx-tag">${club(15)}배민클럽 가입 시 배달팁 0원</div></div>`;
  const hotCard = h => `<div class="bmx-hc" data-bx="store" data-id="${h.sid}"><div class="bmx-hi" style="background:${sOf(h.sid).bg}"><span class="bmx-em">${sOf(h.sid).em}</span><em class="bmx-pc">${h.pct}%</em><em class="bmx-pp">인기</em><div class="bmx-mo">최소주문금액 없음</div></div><div class="bmx-ht">${E(h.t)}</div><div class="bmx-hp"><b>${h.pct}% ${h.price.toLocaleString("ko-KR")}원</b><s>${h.orig.toLocaleString("ko-KR")}원</s></div><div class="bmx-hs">${E(h.sn)}<span>· ${h.d}</span></div><div class="bmx-hr2"><i class="bmx-st">★</i><b>${h.r}</b> (${h.rv})</div><small>광고</small></div>`;
  const row = s => `<div class="bmx-row" data-bx="store" data-id="${s.id}">${thumb(s, 76, 16)}<div class="bmx-rb"><b>${E(s.name)}</b><div><i class="bmx-st">★</i>${s.r} <em>(${s.rv})</em></div><div class="bmx-tip">배달팁 0원 적용 중</div><div class="bmx-mt">${s.t} · ${s.d}</div></div>${heartB(s)}</div>`;
  const catTile = ([n, a, b]) => {
    const art = a === "bk" ? '<i class="bmx-bk">버거킹<br>쿠폰</i>' : a === "alarm" ? `<svg viewBox="0 0 48 48" width="42" height="42"><circle cx="24" cy="26" r="15" fill="#e8402f"/><circle cx="24" cy="26" r="11" fill="#fff"/><circle cx="10" cy="11" r="6" fill="#e8402f"/><circle cx="38" cy="11" r="6" fill="#e8402f"/><path d="M19 22l10 8M19 30l1-1M29 22l-1 1" stroke="#222" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="22" r="1.800" fill="#222"/><circle cx="28" cy="30" r="1.800" fill="#222"/></svg>` : a === "han" ? '<i class="bmx-han">한<s>%</s></i>' : a === "bhc" ? '<i class="bmx-bhc">커링클 할인!<br><span>🍗</span><small>AD</small></i>' : `<span class="bmx-ce">${a}</span>`;
    const bdg = a === "alarm" ? `<em class="bmx-bg r bmx-tmb">${mmss()}</em>` : a === "han" ? '<em class="bmx-bg p">최주금0원</em>' : "";
    return `<button class="bmx-ct" data-bx="cat" data-id="${n}">${bdg}<span class="bmx-ctt${a === "bk" || a === "bhc" ? " fl" : ""}">${art}</span><span class="bmx-cl2">${n === "배짱할인" ? "배짱할인" : n}</span></button>`;
  };

  /* ---------- 페이지 ---------- */
  const PAGES = {
    home: () => `<div class="bmx-pg bmx-homepg"><div class="bmx-sc" data-sp="home">
<div class="bmx-lav bmx-hh"><button class="bmx-loc" data-bx="toast" data-m="배달 주소 설정은 준비 중이에요">우리집 ${ic("caret", 18, 0, 1)}</button><div class="bmx-hr"><span class="bmx-club">배민클럽<svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2c.8 6 4 9.600 10 10-6 .6-9.200 4-10 10-.8-6-4-9.400-10-10 6-.4 9.200-4 10-10z" fill="#2ac1bc"/></svg></span><button class="bmx-ib" data-bx="toast" data-m="새로운 알림이 없어요">${ic("bell", 26, 1.9)}</button>${cartBtn()}</div></div>
<div class="bmx-ssw"><button class="bmx-sb" data-bx="search"><span>해장국? 부대찌개?</span>${ic("search", 25, 2.3)}</button><div class="bmx-strip" data-bx="cat" data-id="타임세일">지금 주문하면 배달팁 0원 ${ic("chev", 15, 2.6)}</div></div>
<div class="bmx-lav bmx-bn"><h2>배달팁 0원에<br>두찜 <mark>9,500원</mark> 할인</h2><button class="bmx-cp ${got ? "got" : ""}" data-bx="coupon">${got ? "쿠폰 받기 완료" : `쿠폰 다운받기 ${ic("chev", 12, 3)}`}</button><div class="bmx-bp"><span class="bmx-food">🍗</span><i class="bmx-hd2">핫딜</i></div></div>
<div class="bmx-sheet"><div class="bmx-tabs">${["음식배달", "픽업", "장보기·쇼핑", "선물하기", "혜택모아보기"].map((t, i) => `<button class="${i === tab ? "on" : ""}" data-bx="tab" data-id="${i}">${t}</button>`).join("")}</div>
<div class="bmx-cg">${cats.map(catTile).join("")}</div><button class="bmx-more" data-bx="cat" data-id="전체">음식배달<span>에서 더보기</span> ${ic("chev", 18, 2.4)}</button></div>
<section class="bmx-sec bmx-ts"><div class="bmx-sh"><div><h3>주키님을 위한 타임세일 <i class="bmx-i">i</i></h3><div class="bmx-tr"><span class="bmx-tmw">${tmBoxes()}</span> 후 5,000원 할인이 사라져요</div></div><svg class="bmx-al" viewBox="0 0 48 48" width="62" height="62"><circle cx="24" cy="27" r="16" fill="#e8402f"/><circle cx="24" cy="27" r="12" fill="#fff"/><circle cx="9" cy="12" r="7" fill="#e8402f"/><circle cx="39" cy="12" r="7" fill="#e8402f"/><text x="24" y="33" text-anchor="middle" font-size="17" font-weight="900" fill="#222">%</text></svg></div>
<div class="bmx-hs-row">${[1, 2, 8].map(i => timeCard(sOf(i))).join("")}</div><button class="bmx-pill" data-bx="cat" data-id="타임세일"><b>타임세일 가게</b> 더보기 ${ic("chev", 16, 2.4)}</button></section>
<section class="bmx-sec bmx-hg"><div class="bmx-sh2"><h3>최소주문금액 없는 한그릇 <i class="bmx-i">i</i></h3><button data-bx="cat" data-id="한그릇">전체보기 ${ic("chev", 16, 2.4)}</button></div><div class="bmx-hs-row">${hot.map(hotCard).join("")}</div></section>
<div style="height:120px"></div></div>${navH("home")}</div>`,

    orders: () => `<div class="bmx-pg bmx-ordpg"><header class="bmx-hd bmx-big"><h1>주문내역</h1><div class="bmx-hr">${cartBtn()}</div></header>
<div class="bmx-ot">${["배달·픽업", "장보기·쇼핑"].map((t, i) => `<button class="${i === otab ? "on" : ""}" data-bx="otab" data-id="${i}">${t}</button>`).join("")}</div>
<div class="bmx-chrow">${[["search", "검색"], ["", "주소 ⌄"], ["", "조회 기간 ⌄"], ["", "주문 상태·정보 ⌄"]].map(([i, t]) => `<button class="bmx-chip" data-bx="toast" data-m="${t.replace(" ⌄", "")} 필터는 준비 중이에요">${i ? ic(i, 20, 2.2) : ""}${t.replace(" ⌄", "")}${i ? "" : ic("down", 16, 2.4)}</button>`).join("")}</div>
<div class="bmx-sc bmx-gray" data-sp="ord">${otab ? '<div class="bmx-empty">장보기·쇼핑 주문내역이 없어요</div>' : orders.length ? orders.slice(0, 7).map((o, i) => { const s = sOf(o.sid), p = payOf(o); return `<article class="bmx-oc"><div class="bmx-oh">${thumb(s, 48, 12)}<div class="bmx-on"><b>${E(s.name)}</b><small>${E(o.full || o.date)}</small></div><button class="bmx-pl" data-bx="odet" data-id="${o.id}">주문상세</button></div><div class="bmx-oi">${o.items.map(t => `<div>${E(t.n)} <span>${t.q}개 · ${W(t.p * t.q)}</span></div>`).join("")}</div><div class="bmx-op"><b>결제금액</b><div><s>${W(sum(o) + o.tip)}</s>${o.bolt ? `<em class="bmx-bo">${ic("bolt", 22, 0, 1)}</em>` : club(26)}<strong>${W(p)}</strong></div></div><div class="bmx-ot0">배달팁 0원</div>${o.live ? `<button class="bmx-dis ok">${o.live}</button>` : '<button class="bmx-dis" disabled>오픈 전 가게예요</button>'}</article>${i === 0 ? `<div class="bmx-bnr"><svg viewBox="0 0 100 80" width="104" height="84"><ellipse cx="38" cy="36" rx="30" ry="24" fill="#fff" stroke="#111" stroke-width="3"/><rect x="52" y="20" width="30" height="52" rx="6" transform="rotate(14 66 46)" fill="#35e0c0" stroke="#111" stroke-width="3"/><circle cx="30" cy="30" r="1.800" fill="#111"/></svg><div><b>이 배너가 보인다면?</b><strong>최대 <small>최대</small>10만원 할인 쿠폰</strong></div><span>${pg} / 3</span></div>` : ""}`; }).join("") : '<div class="bmx-empty">주문내역이 없어요</div>'}<div style="height:120px"></div></div>${navH("orders")}</div>`,

    detail: () => {
      const o = orders.find(x => x.id === oid); if (!o) return PAGES.orders();
      const s = sOf(o.sid), m = sum(o), d = o.club + o.coupon;
      return `<div class="bmx-pg bmx-detpg">${hdr("주문상세")}<div class="bmx-sc" data-sp="det">
<section class="bmx-tcard"><h2>배달이 완료됐어요</h2><p>알뜰배달<br>주문일시 ${o.full}<br>주문번호 ${o.no}</p><div class="bmx-ds" data-bx="store" data-id="${s.id}">${thumb(s, 36, 8)}<b>${E(s.name)}</b>${ic("chev", 18, 2.6)}<button class="bmx-hz ${liked.has(s.id) ? "on" : ""}" data-bx="like" data-id="${s.id}">${ic("heart", 26, 1.9, liked.has(s.id))}</button></div></section>
<div class="bmx-chips"><button class="on" data-bx="jump" data-id="menu">주문 메뉴</button><button data-bx="jump" data-id="pay">결제 정보</button><button data-bx="jump" data-id="ship">배달 정보</button></div>
<div data-sec="menu"><h3 class="bmx-h3">주문 메뉴</h3>${o.items.map(t => `<div class="bmx-card"><div class="bmx-mn">${E(t.n)}</div>${t.o.map(x => `<div class="bmx-op2">${E(x)}</div>`).join("")}<div class="bmx-mp"><b>${W(t.p)}</b> ${t.q}개</div><button class="bmx-dis" disabled>오픈 전 가게예요</button></div>`).join("")}</div>
<div data-sec="pay"><h3 class="bmx-h3">결제 정보</h3><div class="bmx-card bmx-pay"><div class="bmx-pr"><span>메뉴금액</span><span>${W(m)}</span></div><div class="bmx-pr"><span>배달팁</span><span>${W(o.tip)}</span></div><hr class="bmx-dash"><button class="bmx-pr bmx-dc" data-bx="disc"><span>총 할인받은 금액 ${ic(discOpen ? "up" : "down", 18, 2.6)}</span><span>-${W(d)}</span></button>${discOpen ? `<div class="bmx-pr bmx-sub"><span>배민클럽 할인 ${club(20)}</span><span>-${W(o.club)}</span></div>${o.coupon ? `<div class="bmx-pr bmx-sub"><span>배민클럽 쿠폰</span><span>-${W(o.coupon)}</span></div>` : ""}` : ""}<hr class="bmx-solid"><div class="bmx-tot"><span>결제금액</span><b>${W(payOf(o))}</b></div><div class="bmx-sv">배달팁 0원! ${club(20)} 배민클럽 포함 <b>${W(d)} 할인</b></div><hr class="bmx-thin"><div class="bmx-pr bmx-pm"><span>결제방법</span><span>${o.method || "토스페이"}</span></div><div class="bmx-note">간편결제 또는 휴대폰결제 서비스를 이용해 결제하신 경우, 영수증은 해당 결제사를 통해 확인하실 수 있습니다.</div></div><button class="bmx-btn" data-bx="toast" data-m="현금영수증을 발급할 수 있는 내역이 없어요">현금영수증</button></div>
<div data-sec="ship"><h3 class="bmx-h3">배달 정보</h3><div class="bmx-card bmx-ship"><div><h4>전화번호</h4><p>050-*****-**** (안심번호)<br>010-2846-8238</p></div><div><h4>배달 주소</h4><p>인천 제물포구 송현동 154 126동 501호<br>(도로명) 인천 제물포구 송현로 50 126동 501호</p></div><div><h4>라이더님께</h4><p>몰래 시키는 거라 문옆 계단 쪽에 놔주세요</p></div><div><h4>가게 사장님께</h4><p>(수저, 포크 X)</p></div><div><h4>품절 시 취소 방법</h4><p>품절 메뉴만 부분 취소 해주세요</p></div></div><button class="bmx-btn" data-bx="odel">주문내역 삭제</button><p class="bmx-fine">주문하신 가게에서는 중개이용료(2%~7.8%)와 결제정산수수료(1.4%~3%), 배달비(1,900원~3,400원)를 부담합니다.<br>*일부 가게는 프로모션 적용으로 중개이용료율, 배달비가 상이할 수 있습니다</p></div>
<div style="height:60px"></div></div></div>`;
    },

    list: () => { const l = listT === "전체" || listT === "타임세일" || listT === "배짱할인" || listT === "BHC" ? stores : stores.filter(s => s.cat === listT || (listT === "한그릇" && s.cat === "한그릇")); const arr = l.length ? l : stores; return `<div class="bmx-pg">${hdr(listT)}<div class="bmx-sc"><div class="bmx-cnt">${arr.length}개의 가게</div>${arr.map(row).join("")}<div style="height:40px"></div></div></div>`; },

    search: () => { const k = ["치킨", "피자", "떡볶이", "파스타", "버거", "찜닭"], r = q ? stores.filter(s => s.name.includes(q) || s.cat.includes(q) || s.menu.some(m => m[0].includes(q))) : []; return `<div class="bmx-pg"><header class="bmx-hd"><button class="bmx-ib" data-bx="back">${ic("back", 26, 2.2)}</button><div class="bmx-sb2"><span class="${q ? "" : "ph"}">${E(q || "해장국? 부대찌개?")}</span>${q ? `<button data-bx="clr">${ic("close", 18, 2.4)}</button>` : ic("search", 22, 2.3)}</div></header><div class="bmx-sc"><h4 class="bmx-kt">추천 검색어</h4><div class="bmx-kw">${k.map(w => `<button class="${q === w ? "on" : ""}" data-bx="kw" data-id="${w}">${w}</button>`).join("")}</div>${q ? `<div class="bmx-cnt">‘${E(q)}’ 검색 결과 ${r.length}개</div>${r.map(row).join("") || '<div class="bmx-empty">검색 결과가 없어요</div>'}` : ""}</div></div>`; },

    store: () => { const s = sOf(sid), mine = cartSid === s.id ? cart : [], n = mine.reduce((a, c) => a + c.q, 0), t = mine.reduce((a, c) => a + c.q * c.p, 0); return `<div class="bmx-pg">${hdr(s.name, heartB(s) + cartBtn())}<div class="bmx-sc"><div class="bmx-hero" style="background:${s.bg}">${s.em}</div><div class="bmx-sinfo"><h2>${E(s.name)}</h2><div><i class="bmx-st">★</i><b>${s.r}</b> <em>(${s.rv})</em> · ${s.t} · ${s.d}</div><div class="bmx-tag">${club(15)}배민클럽 가입 시 배달팁 0원</div></div><h3 class="bmx-h3">메뉴</h3>${s.menu.map((m, i) => { const c = mine.find(x => x.n === m[0]); return `<div class="bmx-mi"><div><b>${E(m[0])}</b><span>${W(m[1])}</span></div><div class="bmx-qt">${c ? `<button data-bx="sub" data-id="${i}">${ic("minus", 16, 2.6)}</button><i>${c.q}</i>` : ""}<button data-bx="add" data-id="${i}">${ic("plus", 16, 2.6)}</button></div></div>`; }).join("")}<div style="height:110px"></div></div>${n ? `<button class="bmx-ob" data-bx="order"><i>${n}</i><span>배달 주문하기</span><b>${W(t)}</b></button>` : ""}</div>`; },

    shop: () => `<div class="bmx-pg"><header class="bmx-hd bmx-big"><h1>장보기·쇼핑</h1><div class="bmx-hr">${cartBtn()}</div></header><div class="bmx-sc"><div class="bmx-gg">${[["🥬", "채소·과일"], ["🥩", "정육·계란"], ["🥛", "유제품"], ["🍞", "간식·빵"], ["🧴", "생활용품"], ["🍜", "라면·즉석"], ["🧊", "냉동식품"], ["🥤", "음료·주류"]].map(([e, n]) => `<button data-bx="toast" data-m="${n} 상품은 준비 중이에요"><i>${e}</i><span>${n}</span></button>`).join("")}</div></div>${navH("shop")}</div>`,
    zzim: () => { const l = stores.filter(s => liked.has(s.id)); return `<div class="bmx-pg"><header class="bmx-hd bmx-big"><h1>찜</h1><div class="bmx-hr">${cartBtn()}</div></header><div class="bmx-sc">${l.map(row).join("") || '<div class="bmx-empty">찜한 가게가 없어요</div>'}</div>${navH("zzim")}</div>`; },
    my: () => `<div class="bmx-pg"><header class="bmx-hd bmx-big"><h1>마이배민</h1><div class="bmx-hr">${cartBtn()}</div></header><div class="bmx-sc"><div class="bmx-prof"><b>주키님</b><span>${club(20)} 배민클럽 이용 중</span></div><div class="bmx-menu">${[["주문내역", "nav"], ["찜한 가게", "nav"], ["쿠폰함", ""], ["리뷰 관리", ""], ["설정", ""]].map(([n, a], i) => `<button ${a ? `data-bx="nav" data-id="${i ? "zzim" : "orders"}"` : `data-bx="toast" data-m="${n}은(는) 준비 중이에요"`}>${n}${ic("chev", 18, 2.2)}</button>`).join("")}</div></div>${navH("my")}</div>`
  };

  /* ---------- 렌더 / 이동 ---------- */
  function sheetH() { return '<div class="bmx-dim" data-bx="closesheet"></div><div class="bmx-bs"><h3>주문내역을 삭제할까요?</h3><p>삭제한 주문내역은 복구할 수 없어요.</p><div><button data-bx="closesheet">취소</button><button class="k" data-bx="delok">삭제</button></div></div>'; }
  function render() {
    if (!opened) return;
    const s0 = $(".bmx-sc"); if (s0 && rendered) memo[rendered] = s0.scrollTop;
    el.innerHTML = PAGES[page]() + (sheet ? sheetH() : "");
    rendered = page; const s = $(".bmx-sc"); if (s) s.scrollTop = memo[page] || 0;
    const h = $(".bmx-homepg"); if (h && s) h.classList.toggle("stuck", s.scrollTop > 150);
  }
  const go = p => { stack.push(page); if (p === "detail" || p === "store") memo[p] = 0; page = p; sheet = null; render(); };
  const back = () => { page = stack.pop() || "home"; sheet = null; render(); };
  const root = p => { stack = []; page = p; sheet = null; render(); };
  function toast(m) { const t = document.createElement("div"); t.className = "bmx-toast"; t.textContent = m; el.appendChild(t); setTimeout(() => t.remove(), 1700); }

  function act(a, b) {
    const id = b.dataset.id;
    switch (a) {
      case "nav": if (id === "shop" || id === "zzim" || id === "my") break; root(id); break;
      case "back": back(); break;
      case "toast": toast(b.dataset.m); break;
      case "search": q = ""; go("search"); break;
      case "kw": q = q === id ? "" : id; render(); break;
      case "clr": q = ""; render(); break;
      case "cat": listT = id; go("list"); break;
      case "store": sid = +id; go("store"); break;
      case "like": { const n = +id; liked.has(n) ? liked.delete(n) : liked.add(n); const on = liked.has(n); document.querySelectorAll('[data-bx="like"][data-id="' + n + '"]').forEach(x => { x.classList.toggle("on", on); x.innerHTML = ic("heart", +x.firstElementChild.getAttribute("width"), 1.9, on); }); if (page === "zzim") render(); break; }
      case "tab": if (id === "0") { tab = 0; render(); } else if (id === "2") root("shop"); else toast(["", "픽업", "", "선물하기", "혜택모아보기"][+id] + "은(는) 준비 중이에요"); break;
      case "coupon": got = true; render(); toast("쿠폰이 발급됐어요"); break;
      case "otab": otab = +id; render(); break;
      case "odet": oid = +id; discOpen = true; go("detail"); break;
      case "disc": discOpen = !discOpen; render(); break;
      case "jump": { const sc = $(".bmx-sc"), sec = sc.querySelector('[data-sec="' + id + '"]'); sc.scrollTo({ top: sec.offsetTop - $(".bmx-chips").offsetHeight - 4, behavior: "smooth" }); break; }
      case "odel": sheet = true; render(); break;
      case "closesheet": sheet = null; render(); break;
      case "delok": { const i = orders.findIndex(o => o.id === oid); if (i > -1) orders.splice(i, 1); sheet = null; stack = []; page = "orders"; render(); toast("주문내역이 삭제됐어요"); break; }
      case "cart": if (!cart.length) toast("장바구니가 비어 있어요"); else { sid = cartSid; go("store"); } break;
      case "add": case "sub": {
        const s = sOf(sid), m = s.menu[+id]; if (cartSid !== s.id) { cart.length = 0; cartSid = s.id; }
        let c = cart.find(x => x.n === m[0]);
        if (a === "add") { c ? c.q++ : cart.push({ n: m[0], p: m[1], q: 1 }); } else if (c && --c.q <= 0) cart.splice(cart.indexOf(c), 1);
        render(); break;
      }
      case "order": {
        const s = sOf(cartSid), d = new Date(), h = d.getHours(), dn = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
        orders.unshift({ id: Date.now(), sid: s.id, live: "조리 중이에요", date: (d.getMonth() + 1) + ". " + d.getDate() + " (" + dn + ")", full: (d.getMonth() + 1) + "월 " + d.getDate() + "일 " + (h < 12 ? "오전 " : "오후 ") + (h % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"), no: "T2G" + String(Date.now()).slice(-8) + "X", items: cart.map(c => ({ n: c.n, o: [], p: c.p, q: c.q })), tip: 2700, club: 2700, coupon: 0 });
        cart.length = 0; cartSid = null; otab = 0; root("orders"); toast("주문이 접수됐어요"); break;
      }
    }
  }

  /* ---------- 이벤트 ---------- */
  el.addEventListener("click", e => { const b = e.target.closest("[data-bx]"); if (b && el.contains(b)) { e.stopPropagation(); act(b.dataset.bx, b); } });
  el.addEventListener("scroll", e => {
    const sc = e.target; if (!sc.classList || !sc.classList.contains("bmx-sc")) return;
    if (sc.dataset.sp === "home") sc.parentNode.classList.toggle("stuck", sc.scrollTop > 150);
    else if (sc.dataset.sp === "det") { let cur = "menu"; sc.querySelectorAll("[data-sec]").forEach(s => { if (s.offsetTop - sc.scrollTop <= 90) cur = s.dataset.sec; }); sc.querySelectorAll(".bmx-chips button").forEach(c => c.classList.toggle("on", c.dataset.id === cur)); }
  }, true);
  let drag = null;
  el.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; const h = e.target.closest(".bmx-hs-row,.bmx-chrow,.bmx-tabs"); if (h) drag = { h, x: e.clientX, l: h.scrollLeft, m: 0 }; });
  el.addEventListener("pointermove", e => { if (drag) { drag.m = Math.abs(e.clientX - drag.x); drag.h.scrollLeft = drag.l - (e.clientX - drag.x); } });
  ["pointerup", "pointercancel", "pointerleave"].forEach(t => el.addEventListener(t, () => { drag = null; }));
  el.addEventListener("click", e => { if (drag && drag.m > 6) { e.stopPropagation(); e.preventDefault(); } }, true);

  function tick() {
    timer = timer <= 0 ? 899 : timer - 1;
    el.querySelectorAll(".bmx-tmw").forEach(n => { n.innerHTML = tmBoxes(); });
    el.querySelectorAll(".bmx-tmb").forEach(n => { n.textContent = mmss(); });
  }
  function open() {
    if (opened) return; opened = true;
    el.className = ""; el.style.display = ""; el.innerHTML = ""; page = "home"; stack = []; tab = 0; sheet = null; rendered = null; q = ""; Object.keys(memo).forEach(k => delete memo[k]);
    try { originFrom(el, "baemin"); } catch (_) {}
    el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    render(); clearInterval(tm); tm = setInterval(tick, 1000); clearInterval(pgT); pgT = setInterval(() => { pg = pg % 3 + 1; const s = el.querySelector(".bmx-bnr>span"); if (s) s.textContent = pg + " / 3"; }, 3500);
    setTimeout(() => { if (opened) screen.classList.add("app-light"); }, 140);
  }
  function close() {
    if (!opened) return; opened = false; clearInterval(tm); clearInterval(pgT); screen.classList.remove("app-light");
    el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!opened) el.classList.remove("show"); }, 430);
  }
  /* 기존(fromm.js 내장) 배민 화면이 열리지 않도록 window 캡처 단계에서 배민 이벤트를 가로챔 */
  window.addEventListener("app:open", e => { if (e.detail && e.detail.id === "baemin") { e.stopImmediatePropagation(); open(); } }, true);
  window.addEventListener("app:close", e => { if (opened) close(); }, true);
  window.BaeminApp = { open, close };

  /* ---------- 스타일 ---------- */
  const css = `
.bmx-pg{position:absolute;inset:0;display:flex;flex-direction:column;background:#fff}
.bmx-sc{position:relative;flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.bmx-sc::-webkit-scrollbar{display:none}
button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bmx-ib{position:relative;width:38px;height:38px;display:grid;place-items:center;color:#111}
.bmx-bd{position:absolute;right:0;top:0;min-width:17px;height:17px;border-radius:9px;background:#4a22f0;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;padding:0 4px}
.bmx-hd{flex:none;height:102px;padding:54px 10px 0 12px;display:flex;align-items:center;background:#fff;z-index:4;position:relative}
.bmx-hd h1{position:absolute;left:0;right:0;top:54px;height:48px;display:flex;align-items:center;justify-content:center;margin:0;font-size:20px;font-weight:800;pointer-events:none;padding:0 70px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bmx-hd.bmx-big{padding-left:16px}.bmx-hd.bmx-big h1{justify-content:flex-start;left:16px;font-size:23px;padding:0}
.bmx-hr{margin-left:auto;display:flex;align-items:center;gap:6px}.bmx-hd .bmx-hr{position:relative;z-index:1}
.bmx-lav{background:#eef0ff}
.bmx-hh{height:100px;padding:54px 12px 0 16px;display:flex;align-items:center}.bmx-loc{font-size:20px;font-weight:800;display:flex;align-items:center;gap:5px}
.bmx-club{background:#111;color:#fff;border-radius:3px;height:19px;padding:0 5px;display:flex;align-items:center;gap:1px;font-size:12px;font-weight:900;margin-right:12px;transform:skewX(-8deg)}
.bmx-ssw{position:sticky;top:56px;z-index:6;background:#eef0ff;padding:0 16px 0;height:44px;margin-top:0;transition:background .15s}
.bmx-ssw::before{content:"";position:absolute;left:0;right:0;bottom:100%;height:80px;background:inherit}
.bmx-sb{width:100%;height:44px;border:1.5px solid #1b1b1f;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 22px;font-size:16px;color:#8b8b90}
.bmx-strip{position:absolute;left:0;right:0;top:100%;height:0;overflow:hidden;background:#eef0ff;text-align:center;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:2px;transition:height .15s;cursor:pointer}
.stuck .bmx-ssw{background:#fff;padding-bottom:0}.stuck .bmx-strip{height:36px}
.bmx-bn{position:relative;height:122px;padding:16px 16px 0;margin-top:-1px}.bmx-bn h2{margin:0;font-size:20px;line-height:1.3;font-weight:800;padding-top:4px}.bmx-bn mark{background:linear-gradient(transparent 62%,#cdc3ff 62%);color:inherit}
.bmx-cp{margin-top:12px;height:26px;padding:0 10px;border-radius:4px;background:#111;color:#fff;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:3px}.bmx-cp.got{background:#4a22f0}
.bmx-bp{position:absolute;right:10px;top:8px;width:116px;height:100px}.bmx-food{position:absolute;left:4px;top:30px;width:104px;height:70px;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,#e5442a,#a32314 80%);display:grid;place-items:center;font-size:44px;box-shadow:0 8px 12px rgba(0,0,0,.18)}
.bmx-hd2{position:absolute;right:-6px;top:2px;background:#111;color:#fff;font-style:italic;font-weight:900;font-size:19px;padding:3px 10px;transform:skewX(-12deg) rotate(-4deg)}
.bmx-sheet{background:#fff;border-radius:24px 24px 0 0;position:relative;z-index:1;margin-top:0}
.bmx-tabs{display:flex;gap:16px;padding:0 16px;height:54px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid #e5e5e8}.bmx-tabs::-webkit-scrollbar{display:none}
.bmx-tabs button{position:relative;flex:none;font-size:22px;font-weight:500;height:54px;padding:2px 0 0;color:#222}.bmx-tabs .on{font-weight:800}.bmx-tabs .on::after{content:"";position:absolute;left:0;bottom:-1px;width:72px;max-width:100%;height:4px;border-radius:3px 3px 0 0;background:#1b1b1f}
.bmx-hn{position:absolute;left:50%;top:-8px;transform:translateX(-50%);font-style:normal;font-size:12px;font-weight:700;border:1.5px solid #999;border-radius:11px;background:#f4f4f5;padding:1px 7px;color:#555;white-space:nowrap}
.bmx-cg{display:grid;grid-template-columns:repeat(5,1fr);row-gap:16px;padding:16px 10px 12px}
.bmx-ct{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13.5px}.bmx-ctt{width:60px;height:60px;border-radius:20px;background:#f4f4f6;display:grid;place-items:center;overflow:hidden}.bmx-ce{font-size:34px}
.bmx-bg{position:absolute;top:-8px;left:50%;transform:translateX(-50%);z-index:2;font-style:normal;font-size:12.5px;font-weight:800;background:#fff;border:1.5px solid #c9c9d2;border-radius:12px;padding:0 6px;white-space:nowrap}.bmx-bg.r{color:#e8402f}.bmx-bg.p{color:#4a22f0}
.bmx-bk{background:#d4631b;width:100%;height:100%;display:grid;place-items:center;color:#fff;font-style:normal;font-weight:900;font-size:17px;line-height:1.1;text-align:center}
.bmx-han{font-style:normal;font-weight:900;font-size:36px;color:#5d38f5;position:relative;line-height:1}.bmx-han s{position:absolute;right:-12px;bottom:-4px;background:#e8402f;color:#fff;font-size:12px;border-radius:3px;text-decoration:none;padding:0 3px}
.bmx-bhc{width:100%;height:100%;background:linear-gradient(#5a3a1f,#3b2412);color:#ffd84d;font-style:normal;font-size:9.5px;font-weight:900;text-align:center;padding-top:7px;position:relative;line-height:1.1}.bmx-bhc span{font-size:28px;display:block;margin-top:2px}.bmx-bhc small{position:absolute;right:3px;bottom:2px;color:#fff;background:#0006;font-size:8px;padding:0 3px;border-radius:3px}
.bmx-more{width:100%;height:56px;border-top:1px solid #ececef;display:flex;align-items:center;justify-content:center;gap:2px;font-size:17px;font-weight:800}.bmx-more span{font-weight:500}
.bmx-sec{padding:20px 0 0;border-top:8px solid #f2f3f5}.bmx-ts{background:linear-gradient(#fde9ec,#fff 120px);border-top:0;margin-top:8px}
.bmx-sh{display:flex;justify-content:space-between;padding:0 16px 14px;align-items:flex-start}.bmx-sh h3,.bmx-sh2 h3{margin:0;font-size:21px;font-weight:800;display:flex;align-items:center;gap:5px;letter-spacing:-.04em}
.bmx-i{width:16px;height:16px;border-radius:50%;border:1.5px solid #aaa;color:#aaa;font-size:11px;font-style:normal;display:inline-grid;place-items:center;font-weight:700}
.bmx-tr{margin-top:6px;font-size:15px;color:#777;display:flex;align-items:center;gap:5px}.bmx-tmw{display:inline-flex;align-items:center;gap:2px}.bmx-tmw b{width:17px;height:19px;border-radius:4px;background:#17171a;color:#fff;font-size:15px;display:grid;place-items:center;font-weight:800}.bmx-tmw u{text-decoration:none;color:#111;font-weight:800}
.bmx-hs-row{display:flex;gap:10px;padding:0 16px;overflow-x:auto;scrollbar-width:none}.bmx-hs-row::-webkit-scrollbar{display:none}
.bmx-tc{flex:none;width:248px;cursor:pointer}.bmx-ti{position:relative;height:143px;border-radius:12px;overflow:hidden;display:grid;place-items:center}.bmx-em{font-size:70px;filter:drop-shadow(0 6px 6px rgba(0,0,0,.25))}
.bmx-lb{position:absolute;left:0;right:0;bottom:0;height:24px;background:#ee5249;color:#fff;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;gap:4px}
.bmx-r1{display:flex;justify-content:space-between;align-items:center;gap:6px;margin-top:11px;font-size:16px}.bmx-r1 b{font-weight:700;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-r1 span{flex:none;font-weight:800}.bmx-r1 em,.bmx-hr2{font-style:normal;color:#888;font-weight:400}
.bmx-st{color:#ffc61a;font-style:normal;margin-right:2px}.bmx-tip{margin-top:3px;font-size:15px;font-weight:800;color:#4a22f0}
.bmx-mt{display:flex;align-items:center;gap:4px;margin-top:3px;font-size:15px;color:#666}.bmx-mt svg{margin-left:6px}.bmx-won{width:16px;height:16px;border-radius:50%;background:#2f7cf6;color:#fff;font-size:10px;font-style:normal;display:grid;place-items:center;font-weight:800}
.bmx-tag{display:inline-flex;align-items:center;gap:4px;margin-top:8px;border:1.5px solid #4fcfc6;color:#0d6f69;border-radius:4px;font-size:12.5px;font-weight:800;padding:2px 6px 2px 4px}
.bmx-pill{display:flex;align-items:center;justify-content:center;gap:2px;margin:26px auto 0;width:162px;height:38px;border:1px solid #ddd;border-radius:20px;font-size:15px}.bmx-pill b{font-weight:800}
.bmx-hg{margin-top:22px;padding-top:22px}.bmx-sh2{display:flex;justify-content:space-between;align-items:center;padding:0 16px 14px}.bmx-sh2 button{display:flex;align-items:center;font-size:15px}
.bmx-hc{flex:none;width:149px;position:relative}.bmx-hi{position:relative;height:126px;border-radius:12px 12px 0 0;overflow:hidden;display:grid;place-items:center;padding-bottom:20px}.bmx-hi .bmx-em{font-size:54px}
.bmx-pc,.bmx-pp{position:absolute;top:6px;font-style:normal;font-weight:800;border-radius:6px;padding:3px 7px}.bmx-pc{left:6px;background:#ee5249;color:#fff;font-size:19px}.bmx-pp{left:62px;background:#eeeff1;color:#555;font-size:14px;top:6px;padding:7px 8px}
.bmx-mo{position:absolute;left:0;right:0;bottom:0;height:24px;background:#3414d8;color:#fff;font-size:14px;font-weight:800;display:grid;place-items:center}
.bmx-ht{margin-top:9px;font-size:15px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-hp{margin-top:3px;display:flex;align-items:baseline;gap:4px;white-space:nowrap}.bmx-hp b{color:#ee5249;font-size:17px;font-weight:800}.bmx-hp b{color:#111}.bmx-hp s{color:#aaa;font-size:12.5px}
.bmx-hs{font-size:13px;color:#888;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-hr2{margin-top:2px;font-size:14px}.bmx-hr2 b{color:#111}.bmx-hc small{display:block;margin-top:8px;color:#999;font-size:13px}
.bmx-nav{position:absolute;left:21px;right:21px;bottom:26px;height:64px;border-radius:32px;background:rgba(255,255,255,.97);border:1px solid #dcdce0;box-shadow:0 6px 22px rgba(0,0,0,.1);display:flex;align-items:center;padding:0 5px;z-index:9}
.bmx-nav button{flex:1;height:54px;border-radius:27px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:12px;font-weight:700;color:#111}.bmx-nav button.on{background:#efeff1}.bmx-nav span{letter-spacing:-.05em}
.bmx-ot{flex:none;display:flex;height:36px;background:#fff}.bmx-ot button{flex:1;font-size:18px;font-weight:800;color:#a2a2a8;border-bottom:1px solid #e5e5e8;position:relative}.bmx-ot .on{color:#111}.bmx-ot .on::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:4px;background:#1b1b1f}
.bmx-chrow{flex:none;display:flex;gap:8px;padding:10px 16px 9px;overflow-x:auto;scrollbar-width:none;background:#fff;border-bottom:1px solid #f2f3f5}.bmx-chrow::-webkit-scrollbar{display:none}
.bmx-chip{flex:none;height:35px;padding:0 14px;border:1px solid #dcdce0;border-radius:18px;font-size:15.5px;display:flex;align-items:center;gap:5px;background:#fff}
.bmx-gray{background:#f2f3f5;padding:12px 16px 0}.bmx-oc{background:#fff;border-radius:24px;padding:20px;margin-bottom:12px}.bmx-oh{display:flex;align-items:center;gap:10px}.bmx-th{display:grid;place-items:center;font-style:normal;flex:none}
.bmx-on{flex:1;min-width:0}.bmx-on b{display:block;font-size:17px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-on small{font-size:14px;color:#888}
.bmx-pl{flex:none;background:#f1f2f4;border-radius:15px;padding:7px 12px;font-size:13.5px;color:#444}.bmx-oi{margin-top:16px;font-size:16px;line-height:26px}.bmx-oi span{color:#999}
.bmx-op{margin-top:16px;padding-top:18px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.bmx-op b{font-size:16px;font-weight:800}.bmx-op>div{display:flex;align-items:center;gap:4px}.bmx-op s{color:#aaa;font-size:15px;margin-right:4px}.bmx-op strong{font-size:21px;font-weight:800;color:#4a22f0}.bmx-bo{color:#4a22f0;display:flex}
.bmx-ot0{text-align:right;font-size:13px;font-weight:800;color:#4a22f0;margin-top:2px}.bmx-dis{width:100%;height:44px;margin-top:14px;border:1px solid #cfcfd4;border-radius:12px;font-size:16px;font-weight:700;color:#c3c3c8}.bmx-dis.ok{color:#4a22f0;border-color:#4a22f0}
.bmx-bnr{position:relative;height:120px;border-radius:24px;margin-bottom:12px;background:#4a1ff5;color:#fff;display:flex;align-items:center;padding:0 16px 0 12px;gap:4px;overflow:hidden}.bmx-bnr b{display:block;font-size:24px;font-weight:900;font-style:italic}.bmx-bnr strong{display:block;font-size:26px;font-weight:900;font-style:italic;margin-top:2px}.bmx-bnr small{font-size:11px;display:block;line-height:1;margin-bottom:-2px;float:left;width:11px;margin-right:2px}
.bmx-bnr>span{position:absolute;right:10px;bottom:8px;background:#1a0b66;border:1px solid #6d55ff;border-radius:14px;padding:3px 12px;font-size:14px}.bmx-empty{text-align:center;color:#999;padding:80px 0;font-size:15px}
.bmx-tcard{margin:8px 16px 0;border:1px solid #e6e6ea;border-radius:24px;padding:20px 20px 0}.bmx-tcard h2{margin:2px 0 12px;font-size:21px;font-weight:800}.bmx-tcard p{margin:0 0 18px;color:#8b8b90;font-size:15px;line-height:23px}
.bmx-ds{display:flex;align-items:center;gap:8px;margin:0 -20px;padding:18px 20px;border-top:1px solid #eee;cursor:pointer}.bmx-ds b{font-size:17px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-ds .bmx-hz{margin-left:auto}
.bmx-hz{color:#111;display:grid;place-items:center;width:34px;height:34px;flex:none}.bmx-hz.on{color:#ee3f5a}
.bmx-chips{position:sticky;top:0;z-index:3;background:#fff;display:flex;gap:8px;padding:16px 16px 10px}.bmx-chips button{height:36px;padding:0 20px;border:1px solid #e6e6ea;border-radius:18px;font-size:16px;font-weight:500;background:#fff}.bmx-chips .on{background:#17171a;color:#fff;border-color:#17171a;font-weight:800}
.bmx-h3{margin:18px 20px 12px;font-size:19px;font-weight:800}.bmx-card{margin:0 16px 12px;border:1px solid #e6e6ea;border-radius:24px;padding:22px 20px}.bmx-mn{font-size:18px;margin-bottom:12px}.bmx-op2{font-size:15.5px;color:#8b8b90;line-height:30px}.bmx-op2::before{content:"• ";color:#aaa}
.bmx-mp{margin-top:8px;font-size:15.5px;color:#888}.bmx-mp b{font-size:21px;color:#111;font-weight:800;margin-right:2px}
.bmx-pr{display:flex;justify-content:space-between;align-items:center;width:100%;font-size:16px;line-height:30px;margin-bottom:5px}.bmx-pr span:last-child{font-size:17px}.bmx-dash{border:0;border-top:1.5px dashed #ddd;margin:16px 0}.bmx-dc{color:#4a22f0;font-weight:800;margin-bottom:2px}.bmx-dc span:first-child{display:flex;align-items:center;gap:4px}.bmx-sub{color:#5a38ee;margin-bottom:2px}.bmx-sub span:first-child{display:flex;align-items:center;gap:6px;color:#222}.bmx-sub span:last-child{color:#4a22f0}
.bmx-solid{border:0;border-top:1.5px solid #222;margin:18px 0}.bmx-tot{display:flex;justify-content:space-between;align-items:center}.bmx-tot span{font-size:18px;font-weight:800}.bmx-tot b{font-size:31px;font-weight:900;letter-spacing:-.04em}
.bmx-sv{margin:18px 0 22px;background:#eef0ff;border-radius:14px;padding:19px 8px;text-align:center;font-weight:800;font-size:17px;color:#4a22f0;display:flex;justify-content:center;align-items:center;gap:5px;flex-wrap:wrap}.bmx-sv b{color:#4a22f0}
.bmx-thin{border:0;border-top:1px solid #eee;margin:0 0 20px}.bmx-pm{margin-bottom:18px}.bmx-note{background:#f2f3f5;border-radius:14px;padding:20px 22px;text-align:center;color:#8b8b90;font-size:16px;line-height:1.55}
.bmx-btn{display:block;width:calc(100% - 32px);height:52px;margin:0 16px;border:1px solid #dcdce0;border-radius:14px;font-size:18px;font-weight:800}
.bmx-ship>div{padding:20px 0;border-top:1px solid #eee}.bmx-ship>div:first-child{border:0;padding-top:0}.bmx-ship>div:last-child{padding-bottom:0}.bmx-ship h4{margin:0 0 8px;font-size:18px;font-weight:500}.bmx-ship p{margin:0;color:#8b8b90;font-size:16px;line-height:25px}
.bmx-fine{margin:20px 16px 0;color:#8b8b90;font-size:14px;line-height:1.55}
.bmx-cnt{padding:14px 16px 6px;font-size:14px;color:#888}.bmx-row{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer}.bmx-rb{flex:1;min-width:0;font-size:14px}.bmx-rb b{font-size:16px;font-weight:800;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bmx-rb em{font-style:normal;color:#999}
.bmx-sb2{flex:1;height:42px;margin-right:6px;border:1.5px solid #1b1b1f;border-radius:21px;display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 18px;font-size:16px;z-index:1;position:relative}.bmx-sb2 .ph{color:#8b8b90}
.bmx-kt{margin:16px 16px 10px;font-size:15px;font-weight:800}.bmx-kw{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px}.bmx-kw button{height:34px;padding:0 14px;border:1px solid #dcdce0;border-radius:17px;font-size:15px}.bmx-kw .on{background:#17171a;color:#fff}
.bmx-hero{height:200px;display:grid;place-items:center;font-size:96px}.bmx-sinfo{padding:18px 16px 6px}.bmx-sinfo h2{margin:0 0 6px;font-size:22px;font-weight:800}.bmx-sinfo div{font-size:15px;color:#666}.bmx-sinfo em{font-style:normal;color:#999}
.bmx-mi{display:flex;justify-content:space-between;align-items:center;padding:16px 16px;border-bottom:1px solid #f0f0f2}.bmx-mi b{display:block;font-size:16px;font-weight:700}.bmx-mi span{font-size:15px;color:#666}.bmx-qt{display:flex;align-items:center;gap:8px}.bmx-qt button{width:32px;height:32px;border-radius:50%;border:1px solid #dcdce0;display:grid;place-items:center}.bmx-qt i{font-style:normal;font-weight:800;min-width:14px;text-align:center}
.bmx-ob{position:absolute;left:16px;right:16px;bottom:34px;height:56px;border-radius:14px;background:#4a22f0;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-size:17px;font-weight:800;z-index:9}.bmx-ob i{font-style:normal;width:24px;height:24px;border-radius:50%;background:#fff;color:#4a22f0;display:grid;place-items:center;font-size:14px}
.bmx-gg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px 6px;padding:20px 12px}.bmx-gg button{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13px}.bmx-gg i{width:64px;height:64px;border-radius:20px;background:#f4f4f6;display:grid;place-items:center;font-size:32px;font-style:normal}
.bmx-prof{margin:8px 16px 16px;padding:22px 20px;border-radius:24px;background:#eef0ff}.bmx-prof b{display:block;font-size:22px;font-weight:800;margin-bottom:8px}.bmx-prof span{display:flex;align-items:center;gap:6px;font-size:15px;color:#4a22f0;font-weight:700}.bmx-menu button{width:100%;display:flex;justify-content:space-between;align-items:center;padding:18px 20px;font-size:17px;border-bottom:1px solid #f0f0f2}
.bmx-dim{position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:20}.bmx-bs{position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:24px 24px 0 0;padding:28px 20px 40px;z-index:21}.bmx-bs h3{margin:0 0 8px;font-size:20px}.bmx-bs p{margin:0 0 22px;color:#777;font-size:15px}.bmx-bs div{display:flex;gap:10px}.bmx-bs button{flex:1;height:52px;border-radius:14px;background:#f1f2f4;font-size:17px;font-weight:800}.bmx-bs .k{background:#4a22f0;color:#fff}
.bmx-toast{position:absolute;left:50%;bottom:110px;transform:translateX(-50%);background:rgba(20,20,24,.92);color:#fff;border-radius:22px;padding:11px 18px;font-size:14px;z-index:30;white-space:nowrap;animation:bmxt .2s}
.bmx-cl{flex:none;vertical-align:middle}`;
  const st = document.createElement("style"); st.id = "bmx-style";
  st.textContent = `#bm-app{position:absolute;inset:0;z-index:6;display:none;overflow:hidden;background:#fff;color:#16161a;font-family:"Pretendard Variable",Pretendard,-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;letter-spacing:-.03em;opacity:0;transform:scale(.9);transition:opacity .25s,transform .38s cubic-bezier(.22,.8,.3,1)}#bm-app.show{display:block}#bm-app.open{opacity:1;transform:none}#bm-app *{box-sizing:border-box}#bm-app::before{content:none!important}`
    + css.replace(/([^{}]+)\{/g, (m, sel) => sel.split(",").map(s => "#bm-app " + s.trim()).join(",") + "{")+ "@keyframes bmxt{from{opacity:0;transform:translate(-50%,8px)}}";
  document.head.appendChild(st);
})();
