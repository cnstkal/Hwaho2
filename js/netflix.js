/* ===== netflix.js ===== 넷플릭스 앱 (#nf-app / id: "netflix")
   포스터 이미지는 PO 데이터의 img 칸에 URL을 넣으면 그림으로 바뀜 (없으면 색 그라데이션+제목) */
const NfApp = (() => {
  const $ = q => el.querySelector(q), el = document.querySelector("#nf-app"), screen = document.querySelector("#screen");
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ic = (p, w = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    cast: ic('<path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M3 12a9 9 0 0 1 9 9M3 16a5 5 0 0 1 5 5M3 20h.01"/>'),
    dl: ic('<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>', 2), bell: ic('<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    home: ic('<path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M10 15h4"/>'), search: ic('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>', 2),
    info: ic('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>', 2), dots: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
    send: ic('<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13l11-10"/>'), chev: ic('<path d="M9 5l7 7-7 7"/>', 2), play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    dd: '<svg viewBox="0 0 12 8" fill="currentColor"><path d="M0 0h12L6 8z"/></svg>', pen: ic('<path d="M4 20l1-4L16 5a2.100 2.100 0 0 1 3 3L8 19z"/>', 1.8),
    N: '<svg viewBox="0 0 16 28"><path fill="#b20710" d="M0 0h5v28H0zM11 0h5v28h-5z"/><path fill="#e50914" d="M0 0h5l11 28h-5z"/></svg>'
  };
  /* 포스터: [제목, 색1, 색2, img] */
  const PO = {
    gian: ["대환장 기안장", "#c4d2e0", "#52697f"], down: ["다운타임", "#7a5644", "#241610"], p3: ["", "#d49a8a", "#5a2a2a"],
    ssang: ["쌍화점", "#8a5a20", "#1a0e04"], mun: ["먼작귀", "#f6f6f2", "#cfd8c8"], yak: ["약사의 혼잣말", "#4a3a7a", "#140c28"], one: ["ONE PIECE", "#4a7bc0", "#e6c14a"], p4: ["", "#3a8a3a", "#10301a"],
    lie: ["100일의 거짓말", "#5a4e44", "#1a1412"], rat: ["들쥐", "#3a5a6e", "#8a1c14"], edu: ["참교육", "#6a7080", "#1c1f28"], p5: ["", "#666", "#222"],
    drx: ["닥터X", "#e4e8ee", "#7a1a1a"], solo: ["나는 SOLO", "#7a9a5a", "#243818"], p6: ["", "#444", "#111"],
    st: ["기묘한 이야기", "#b8401a", "#1e3a5a"], kai: ["괴수 8호", "#6a7078", "#20242a"], reb: ["리바운드", "#2a6ac0", "#0a2a60"], p7: ["", "#5a8a7a", "#1a3030"],
    d365: ["365일", "#4a5260", "#12151c"], ing: ["인간중독", "#8a3a3a", "#2a0e0e"], min: ["미인도", "#c8a8a0", "#4a2a2a"], ano: ["아노라", "#2a1a50", "#6a0a1a"],
    bb: ["브레이킹 배드", "#d9a62a", "#3a2a08"], ob: ["오렌지 이즈 더 뉴 블랙", "#2a1c18", "#c9a690"], mha: ["나의 히어로 아카데미아", "#a9c4ee", "#2a3a8a"], four: ["포핸즈", "#e8e8ea", "#3a3a44"],
    scan: ["스캔들", "#2a2a28", "#6a5a4a"], kim: ["신인감독 김연경", "#d8d8e0", "#4a5a8a"], saul: ["베터콜 사울", "#6a5a48", "#14100a"], end: ["빌어먹을 세상따위", "#8a8078", "#1c1a18"],
    p8: ["", "#e8b090", "#4a2a1a"], p9: ["나를…", "#c8c0b8", "#2a2a30"]
  };
  const HERO = { rat: "linear-gradient(90deg,#4d6f82 0%,#2c4250 46%,#7a1a14 54%,#b02a1c 100%)", drx: "linear-gradient(#a52018,#3a0c0c)" };
  const bg = k => { const p = PO[k]; return p[3] ? `url(${esc(p[3])}) center/cover` : `linear-gradient(165deg,${p[1]},${p[2]})`; };
  const card = (k, tag = "", top = 0, sub = "", cls = "") => `<button class="nf-c ${cls}" data-work="${k}" style="background:${bg(k)}"><b>${esc(PO[k][0])}</b>${top ? '<i class="nf-t">TOP<br>10</i>' : ""}${tag ? `<em>${tag}</em>` : ""}${sub ? `<u>${sub}</u>` : ""}</button>`;
  const row = (t, inner, more) => `<h3 class="nf-h">${t}${more ? `<span>모두 보기${I.chev}</span>` : ""}</h3><div class="nf-r">${inner}</div>`;
  const cont = k => `<div class="nf-cw">${card(k, "", 0, "", "")}<div class="nf-pb"><i></i></div><div class="nf-ab"><span>${I.info}</span><s></s><span>${I.dots}</span></div><div class="nf-pl">${I.play}</div></div>`;
  const share = k => `<div class="nf-cw nf-sh">${card(k)}<div class="nf-ab nf-sb">${I.send}공유</div></div>`;
  const rank = (n, k) => `<div class="nf-rk" style="width:${n === 1 ? 141 : 179}px"><span>${n}</span>${card(k, "새로운 에피소드", 0, "지금 시청하기")}</div>`;
  const PF = [["박성화", "#2a7ae0,#e8f2ff", "🏴‍☠️"], ["uu", "#5a0fb0,#3a0a80", "🐧"]];
  const SL = [["ssang", "쌍화점"], ["mun", "먼가 작고 귀여운 녀석"], ["d365", "365일"], ["ing", "인간중독"], ["min", "미인도"], ["ano", "아노라"]];
  let prof = null, tab = "hm", isOpen = false, q = "", savedWorks = [];
  const av = (i, s) => `<div class="nf-av" style="width:${s}px;height:${s}px;border-radius:${Math.round(s * .2)}px;background:linear-gradient(160deg,${PF[i][1]});font-size:${Math.round(s * .55)}px">${PF[i][2]}</div>`;
  const META = {
    gian:["대환장 기안장","예능 · 리얼리티","2026","12+","낯선 공간에서 펼쳐지는 예측 불가한 생활과 도전.","기안84, 초대 손님","시즌 1 · 8화","관찰 예능, 여행, 코미디"],
    down:["다운타임","드라마 · 미스터리","2026","15+","멈춰버린 도시에서 시간이 멈춘 이유를 추적한다.","김도윤, 이서연","시즌 1 · 10화","미스터리, 서스펜스"],
    ssang:["쌍화점","영화 · 시대극","2008","청불","고려 왕실을 둘러싼 사랑과 권력, 충성의 갈등을 그린 시대극.","조인성, 주진모, 송지효","영화 · 2시간 13분","시대극, 멜로"],
    mun:["먼작귀","애니메이션 · 일상","2024","전체 관람가","작고 귀여운 친구들이 일상 속에서 우정과 용기를 발견한다.","먼작귀 친구들","시즌 1 · 24화","애니메이션, 코미디"],
    yak:["약사의 혼잣말","애니메이션 · 추리","2023","15+","궁중에서 약초 지식이 뛰어난 소녀가 여러 사건의 수수께끼를 푼다.","마오마오, 진시","시즌 2 · 24화","추리, 시대극"],
    one:["ONE PIECE","애니메이션 · 모험","1999","12+","해적왕을 꿈꾸는 루피와 동료들이 전설의 보물을 찾아 나선다.","루피, 조로, 나미","시즌 다수 · 에피소드 목록","모험, 액션"],
    lie:["100일의 거짓말","드라마 · 로맨스","2026","15+","단 하나의 거짓말로 시작된 관계가 숨겨진 진실을 드러낸다.","정유나, 강태오","시즌 1 · 12화","로맨스, 미스터리"],
    drx:["닥터X","드라마 · 메디컬","2026","15+","냉철한 의사가 병원 안의 비리와 맞서 환자들을 지켜낸다.","정윤호, 김서현, 이도현","시즌 1 · 16화","메디컬, 서스펜스"],
    solo:["나는 SOLO","예능 · 연애 리얼리티","2021","15+","솔로 남녀가 인연을 찾으며 솔직한 감정과 선택을 보여준다.","출연자 다수","방송 회차별 공개","연애, 리얼리티"],
    st:["기묘한 이야기","드라마 · SF","2016","15+","작은 마을의 실종 사건이 기이한 실험과 다른 세계로 이어진다.","주요 출연진","시즌 1–5","SF, 미스터리"],
    kai:["괴수 8호","애니메이션 · 액션","2024","15+","괴수의 힘을 얻게 된 남자가 방위대에 도전한다.","카프카, 아시로 미나","시즌 1 · 12화","액션, SF"],
    reb:["리바운드","영화 · 스포츠","2023","12+","해체 위기의 농구부가 전국 대회를 향해 다시 코트에 선다.","안재홍, 이신영","영화 · 2시간 2분","스포츠, 드라마"],
    d365:["365일","영화 · 로맨스","2020","청불","위험한 관계에 얽힌 두 사람이 사랑과 선택 사이에서 갈등한다.","주요 출연진","영화 · 1시간 54분","로맨스, 드라마"],
    ing:["인간중독","영화 · 멜로","2014","청불","군 관사에서 시작된 금지된 사랑과 그로 인한 갈등을 그린다.","송승헌, 임지연","영화 · 2시간 12분","멜로, 시대극"],
    min:["미인도","영화 · 시대극","2008","청불","조선 시대 화가를 둘러싼 예술과 정체성, 사랑의 이야기.","주요 출연진","영화 · 1시간 48분","시대극, 멜로"],
    ano:["아노라","영화 · 드라마","2024","청불","예상치 못한 결혼 이후 혼란스러운 상황에 휘말린 한 여성의 이야기.","주요 출연진","영화 · 2시간 19분","드라마, 로맨스"]
  };
  META.rat = ["들쥐","리미티드 시리즈","2026","청불","베일에 싸인 필명의 천재 작가. 의문의 인물 '들쥐'에게 자신의 이름을 빼앗기자, 그를 추적하기 위해 결국 지독한 악연의 사채업자와 손을 잡는다. 긴장감 넘치는 스릴러 시리즈.","류준열, 설경구","리미티드 시리즈 · 10화","스릴러"];
  const CRE = { rat: "김홍선, 이재곤" };
  const RATD = ["세상을 피해 스스로 은둔한 소설가 제문재. 갑자기 자신의 신원을 증명할 수 있는 모든 것이 먹통이 되고 만다. 심지어 자신이 사칭범으로 몰리는데. 그런 문재 앞에 자신과 똑 닮은 인물이 등장한다.","겨우 사채업자 노자의 손아귀를 벗어난 문재. 그 사이 노자는 신분 세탁에 대한 어두운 진실을 알게 된다. 한편, 형사 박순용은 문재와 노자와의 접점을 발견한다.","문재와 노자는 공동의 목적을 위해 동맹을 맺는다. 두 사람은 본격적으로 '들쥐'를 잡기 위한 덫을 놓기 시작하고, 그 첫 단계로 사라진 문재의 친구 수현의 행방을 쫓기 시작한다."];
  const EPD = ["의문의 사건이 벌어지고, 주인공은 예상치 못한 선택을 강요받는다.","숨겨진 단서가 하나씩 드러나며 인물들 사이의 의심이 깊어진다.","뜻밖의 동맹이 맺어지고 새로운 위기가 시작된다.","과거의 비밀이 밝혀지며 상황은 걷잡을 수 없이 흘러간다.","엇갈린 진실 앞에서 각자의 선택이 갈린다.","마지막 단서를 쥔 인물이 모습을 드러낸다.","모든 것을 건 대결이 시작된다.","돌이킬 수 없는 선택이 모두를 흔든다.","이야기의 끝이 가까워지고 진실이 모습을 드러낸다.","그리고 마지막 진실이 밝혀진다."];
  const MIN = [56, 56, 50, 58, 54, 52, 55, 57, 53, 60];
  const epsOf = k => Array.from({ length: k === "rat" ? 10 : 8 }, (_, i) => ({ t: `${i + 1}. ${i + 1}화`, m: k === "rat" ? MIN[i] : 40 + (i * 3) % 12, d: k === "rat" && RATD[i] ? RATD[i] : EPD[i] }));
  let dtab = 0, curK = null;
  const metaFor = k => META[k] || [PO[k]?.[0] || "추천 작품","영화 · 드라마","2025","15+","새로운 인물과 세계를 만나는 이야기.","출연진 정보","시즌 1 · 8화","드라마"];
  const XI = ic('<path d="M5.500 5.500l13 13M18.500 5.500l-13 13"/>', 1.5);
  const MU = ['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z" fill="currentColor"/><path d="M15.500 9.500l5 5M20.500 9.500l-5 5"/></svg>', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.500h3.500L12 5.500v13l-4.500-4H4z" fill="currentColor"/><path d="M15.500 9a4.500 4.500 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/></svg>'];
  const AGE = { "19": "#e5252a", "15": "#f0a020", "12": "#c8b400", "ALL": "#2aa04a" };
  const detailV = k => {
    const m = metaFor(k), title = PO[k]?.[0] || m[0], saved = savedWorks.includes(k), rat = k === "rat";
    const age = { "청불": "19", "전체 관람가": "ALL" }[m[3]] || m[3].replace("+", ""), sect = rat ? "리미티드 시리즈" : m[6].split(" · ")[0], eps = epsOf(k);
    const others = Object.keys(PO).filter(x => x !== k && PO[x][0]);
    const body = dtab === 0 ? `<div class="nf-sr"><span>${esc(sect)}</span><i>i</i></div>${eps.map((e, i) => `<div class="nf-ep"><div class="nf-er" data-act="play"><span class="nf-et"><u style="background:${bg(k)};filter:hue-rotate(${i * 38}deg) brightness(${.8 + (i % 3) * .12})"></u><b>${I.play}</b></span><span class="nf-en"><b>${e.t}</b><small>${e.m}분</small></span><span class="nf-ed2">${I.dl}</span></div><p>${esc(e.d)}</p></div>`).join("")}`
      : dtab === 1 ? `<div class="nf-gr">${others.slice(0, 9).map(x => card(x)).join("")}</div>`
      : ["공식 예고편", "티저 예고편", "메이킹 영상"].map((t, i) => `<div class="nf-ep"><div class="nf-er" data-act="play"><span class="nf-et"><u style="background:${bg(k)};filter:hue-rotate(${i * 50}deg)"></u><b>${I.play}</b></span><span class="nf-en"><b>${t}</b><small>${i + 1}:${String(12 + i * 17).padStart(2, "0")}</small></span></div></div>`).join("");
    const act = (ic2, lb, a, extra = "") => `<button class="nf-ac" data-act="${a}" ${extra}>${ic2}<span>${lb}</span></button>`;
    return `<section class="nf-detail nf-enter"><div class="nf-dh"><div class="nf-hv" data-act="hero" style="background:${HERO[k] || bg(k)}"><div class="nf-scn"></div><button class="nf-hb c" data-act="noop">${I.cast}</button><button class="nf-hb x" data-act="dclose">${XI}</button><button class="nf-hp" data-act="hero">${I.play}</button><div class="nf-cap">누가요?</div><button class="nf-mu" data-act="mute">${MU[0]}</button><div class="nf-pr"><i></i></div></div></div>
<div class="nf-db"><div class="nf-lg">NETFLIX</div><h2>${esc(title)}</h2><div class="nf-mt"><span>${esc(m[2])}</span><em style="background:${AGE[age] || "#e5252a"}">${age}</em><span>${esc(m[1].split(" · ")[0])}</span><i class="nf-b1">HD</i><i class="nf-b2">AD)))</i><svg class="nf-b3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2.500" y="4" width="19" height="13" rx="2"/><path d="M6 9h12M6 12.500h7M8 20.500l4-3.500 4 3.500"/></svg></div>
<button class="nf-bp" data-act="play">${I.play}<span>재생</span></button><button class="nf-bs" data-act="save" data-key="${k}">${I.dl}<span>${saved ? "저장됨" : "저장"}</span></button>
<p class="nf-ds">${esc(m[4])}</p><p class="nf-cs">출연: ${esc(m[5])} … 더 보기</p><p class="nf-cs">크리에이터: ${esc(CRE[k] || "제작진 정보")}</p>
<div class="nf-ar">${act(ic('<path d="M12 4v16M4 12h16"/>', 1.8), "내가 찜한 리스트", "noop")}${act(ic('<path d="M7 11v9H4v-9zM7 11l4-7.500c1.600 0 2.600 1.300 2.100 2.900L12.500 9H19a2 2 0 0 1 2 2.300l-1.200 7A2 2 0 0 1 17.800 20H7"/>', 1.8), "평가", "noop")}${act(ic('<path d="M21.500 3 2.500 10.500l7 3 3 7.500z"/><path d="M9.500 13.500 21.500 3"/>', 1.6), "공유", "share")}${act(ic('<path d="M12 3v11M7.500 10l4.500 4.500 4.500-4.500M5 17.500h14M7 21h10"/>', 1.8), "저장<br>에피소드 " + eps.length + "개", "noop")}</div>
<div class="nf-dt2">${["회차", "비슷한 콘텐츠", "예고편 및 다른 영상"].map((t, i) => `<button class="${i === dtab ? "on" : ""}" data-act="dtab" data-i="${i}">${t}</button>`).join("")}</div>${body}</div></section>`;
  };
  function showDetail(k, keep) {
    if (!PO[k]) return; const bd = $("#nf-main"); if (!bd) return; const y = keep ? ($(".nf-detail")?.scrollTop || 0) : 0;
    if (!keep) dtab = 0; curK = k; el.classList.add("nf-dt"); bd.style.background = "#000"; bd.innerHTML = detailV(k); const d = $(".nf-detail"); if (d) d.scrollTop = y;
  }
  const picker = () => `<div class="nf-pk nf-enter"><div class="nf-pp"><div class="nf-pt">프로필을 선택하세요</div><div class="nf-pg">${PF.map((p, i) => `<button data-p="${i}">${av(i, 78)}<span>${p[0]}</span></button>`).join("")}</div></div></div>`;

  const head = () => {
    const l = tab === "hm" ? `<div class="nf-hl nf-N">${I.N}<b>홈</b></div>` : tab === "sr" ? `<div class="nf-hl"><b>검색</b></div>` : `<div class="nf-hl" data-act="pick">${av(prof, 38)}<b>${PF[prof][0]}</b><em>${I.dd}</em></div>`;
    return `<header class="nf-hd">${l}<div class="nf-hr"><span>${I.cast}</span><span>${I.dl}</span><span class="nf-bl">${I.bell}<i>1</i></span></div></header>`;
  };
  const SIL = '<svg viewBox="0 0 342 340" class="nf-sil"><path d="M95 340 L108 192 Q112 150 150 140 L192 140 Q232 150 236 192 L249 340Z" fill="#14100f"/><path d="M96 205 Q70 222 78 282 L100 292Z M246 205 Q272 222 264 282 L242 292Z" fill="#1d1716"/><path d="M146 138 L171 190 L196 138Z" fill="#e9d2c8"/><ellipse cx="171" cy="84" rx="30" ry="38" fill="#e9d2c8"/><path d="M132 92 Q128 36 171 34 Q214 36 210 92 L206 120 Q198 70 171 66 Q144 70 136 120Z" fill="#0b0909"/></svg>';
  const heroV = () => `<div class="nf-chips">${["시리즈", "영화", "NEW & HOT"].map(t => `<button data-act="chip">${t}</button>`).join("")}<button data-act="chip" class="cat">카테고리${I.dd}</button></div>
<section class="nf-fc"><div class="nf-fa" data-work="drx">${SIL}<div class="nf-fl"><strong>닥터<i>X</i></strong><small>하 얀 마 피 아 의 시 대</small></div></div><p>매주 금요일 새로운 에피소드 공개</p><button class="nf-fp" data-act="hplay">${I.play}<span>시리즈 재생</span></button><button class="nf-fs" data-act="hsave">${ic('<path d="M12 4v16M4 12h16"/>', 2)}<span>${savedWorks.includes("drx") ? "찜한 리스트에 추가됨" : "내가 찜한 리스트"}</span></button></section>`;
  const nw = k => card(k, "새로운 에피소드", 1, "지금 시청하기");
  const homeV = () => heroV()
    + row("해외 시리즈", card("bb") + card("ob") + card("mha") + card("p8"))
    + row("한국 드라마", card("edu") + card("four", "새로운 에피소드", 0, "지금 시청하기") + card("scan", "최신 등록") + card("rat"))
    + row(`${PF[prof][0]} 님이 시청 중인 콘텐츠`, cont("ssang"))
  const srchV = () => `<div class="nf-sb2">${I.search}<input id="nf-q" placeholder="시리즈, 영화, 게임을 검색해 보세요..." value="${esc(q)}"></div><h3 class="nf-h">추천 시리즈 &amp; 영화</h3><div id="nf-sl">${listV()}</div>`;
  const listV = () => SL.filter(s => s[1].includes(q)).map(s => `<button class="nf-li" data-work="${s[0]}"><div class="nf-th" style="background:${bg(s[0])}"><b>${esc(PO[s[0]][0])}</b></div><span>${esc(s[1])}</span><div class="nf-lp">${I.play}</div></button>`).join("") || '<p class="nf-em">검색 결과가 없습니다</p>';
  const myV = () => `<div class="nf-sv"><div>${I.dl}</div><div><b>저장한 콘텐츠 목록</b><small>저장하신 시리즈와 영화가 여기에 표시됩니다.</small></div>${I.chev}</div>`
    + row("시청 중인 콘텐츠", cont("ssang"))
    + row("내가 찜한 리스트", card("one") + card("kai") + card("reb") + card("p7"), 1);
  const tb = () => `<nav class="nf-tb">${[["hm", I.home, "홈"], ["sr", I.search, "검색"], ["my", av(prof, 36), "나의 넷플릭스"]].map(t => `<button data-t="${t[0]}" class="${tab === t[0] ? "on" : ""}">${t[1]}<span>${t[2]}</span></button>`).join("")}</nav>`;

  function render() {
    el.classList.remove("nf-dt", "nf-sc"); curK = null;
    if (prof === null) { el.classList.remove("nf-hm"); el.innerHTML = picker(); return; }
    el.classList.toggle("nf-hm", tab === "hm");
    el.innerHTML = head() + `<div class="nf-bd nf-enter" id="nf-main">${tab === "hm" ? homeV() : tab === "sr" ? srchV() : myV()}</div>` + tb();
    if (tab === "hm") $("#nf-main").style.background = "linear-gradient(#6b2328,#2e1013 380px,#000 720px) local no-repeat";
    const i = $("#nf-q"); if (i) i.addEventListener("input", () => { q = i.value.trim(); $("#nf-sl").innerHTML = listV(); });
  }
  el.addEventListener("scroll", e => { if (e.target.id === "nf-main") el.classList.toggle("nf-sc", e.target.scrollTop > 24); }, true);
  function act(a) {
    const d = a.dataset.act;
    if (d === "back" || d === "dclose") render();
    else if (d === "save") { const k = a.dataset.key; savedWorks = savedWorks.includes(k) ? savedWorks.filter(x => x !== k) : [...savedWorks, k]; showDetail(k, 1); }
    else if (d === "share") a.querySelector("span").textContent = "링크 복사됨";
    else if (d === "play") { const h = $(".nf-dh"); if (h) h.classList.add("pl"); const dt = $(".nf-detail"); if (dt) dt.scrollTo({ top: 0, behavior: "smooth" }); }
    else if (d === "hero") { const h = $(".nf-dh"); if (h) h.classList.toggle("pl"); }
    else if (d === "mute") { const on = a.classList.toggle("on"); a.innerHTML = MU[on ? 1 : 0]; }
    else if (d === "dtab") { dtab = +a.dataset.i; showDetail(curK, 1); }
    else if (d === "chip") { const on = a.classList.contains("on"); el.querySelectorAll(".nf-chips button").forEach(b => b.classList.remove("on")); if (!on) a.classList.add("on"); }
    else if (d === "hplay") { showDetail("drx"); const h = $(".nf-dh"); if (h) h.classList.add("pl"); }
    else if (d === "hsave") { savedWorks = savedWorks.includes("drx") ? savedWorks.filter(x => x !== "drx") : [...savedWorks, "drx"]; a.querySelector("span").textContent = savedWorks.includes("drx") ? "찜한 리스트에 추가됨" : "내가 찜한 리스트"; }
    else if (d === "pick") { prof = null; render(); }
  }
  el.addEventListener("click", e => {
    const p = e.target.closest("[data-p]"), t = e.target.closest("[data-t]"), a = e.target.closest("[data-act]"), w = e.target.closest("[data-work]");
    if (p) { if (p.dataset.p !== "x") { prof = +p.dataset.p; tab = "hm"; q = ""; render(); } }
    else if (t) { tab = t.dataset.t; q = ""; render(); }
    else if (a) act(a);
    else if (w) showDetail(w.dataset.work);
  });
  function open() { if (isOpen) return; isOpen = true; render(); el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); }
  function close() { if (!isOpen) return; isOpen = false; el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!isOpen) el.classList.remove("show"); }, 430); }
  document.addEventListener("app:open", e => { if (e.detail.id === "netflix") open(); });
  document.addEventListener("app:close", close);
  return { open, close };
})();

(() => {
  const s = document.createElement("style");
  s.textContent = `#nf-app{position:absolute;inset:0;z-index:5;display:none;background:#000;color:#fff;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:"Pretendard Variable",Pretendard,var(--font);letter-spacing:-0.02em}
#nf-app.show{display:block}#nf-app.open{opacity:1;transform:none;border-radius:0}
#nf-app *{box-sizing:border-box}#nf-app button{font-family:var(--font);background:none;border:0;color:inherit;padding:0}
#nf-app .nf-t{display:inline-block;background:#e50914;color:#fff;font:900 11px/10px var(--font);font-style:normal;padding:4px 5px 5px;border-radius:2px 2px 6px 2px;text-align:center}
#nf-app .nf-hd{position:absolute;top:0;left:0;right:0;z-index:3;height:calc(env(safe-area-inset-top,0px) + 54px + 44px);padding:calc(env(safe-area-inset-top,0px) + 54px) 16px 0;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(#000 70%,transparent)}
#nf-app .nf-hl{display:flex;align-items:center;gap:8px}#nf-app .nf-hl b{font-size:25px;font-weight:700}#nf-app .nf-N svg{width:16px;height:28px;margin-right:6px}#nf-app .nf-hl em{display:flex;width:12px;height:8px;margin-left:2px}
#nf-app .nf-hr{display:flex;gap:18px}#nf-app .nf-hr span{width:26px;height:26px;position:relative;display:block}#nf-app .nf-hr svg{width:100%;height:100%}
#nf-app .nf-bl i{position:absolute;top:-8px;right:-6px;min-width:18px;height:18px;border-radius:9px;background:#e50914;font:700 12px/18px var(--font);font-style:normal;text-align:center}
#nf-app .nf-bd{position:absolute;inset:0;overflow-y:auto;padding:calc(env(safe-area-inset-top,0px) + 54px + 46px) 0 150px;-webkit-overflow-scrolling:touch} @keyframes nf-page-enter{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}} #nf-app .nf-bd.nf-enter,#nf-app .nf-pk.nf-enter{animation:nf-page-enter .24s cubic-bezier(.2,.7,.3,1) both}
#nf-app .nf-h{font-size:20px;font-weight:600;margin:20px 16px 12px;display:flex;justify-content:space-between;align-items:center}#nf-app .nf-h b{font-weight:800}
#nf-app .nf-h span{font-size:15px;font-weight:500;display:flex;align-items:center;gap:2px}#nf-app .nf-h span svg{width:16px;height:16px}
#nf-app .nf-r{display:flex;gap:8px;overflow-x:auto;padding:0 10px;scrollbar-width:none}#nf-app .nf-r::-webkit-scrollbar{display:none}
#nf-app .nf-c{flex:none;width:110px;aspect-ratio:11/15.4;border-radius:6px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}
#nf-app .nf-c b{font-size:15px;font-weight:800;padding:0 6px;text-shadow:0 1px 6px rgba(0,0,0,.7);word-break:keep-all;color:#fff}
#nf-app .nf-c.big{width:164px;aspect-ratio:1/2.02}#nf-app .nf-c.big b{position:absolute;bottom:60px;font-size:22px}#nf-app .nf-c.wide{width:250px;aspect-ratio:16/9}
#nf-app .nf-c .nf-t{position:absolute;top:0;left:6px}
#nf-app .nf-c em{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:#e50914;color:#fff;font:700 11px/1 var(--font);font-style:normal;padding:5px 7px;border-radius:3px;white-space:nowrap}
#nf-app .nf-c u{position:absolute;bottom:0;left:6%;right:6%;background:#fff;color:#000;font:700 11px/1 var(--font);text-decoration:none;padding:7px 0;text-align:center;border-radius:3px 3px 0 0}
#nf-app .nf-c em:has(+u){bottom:24px}
#nf-app .nf-cw{flex:none;width:110px;position:relative;background:#1a1a1a;border-radius:8px;overflow:hidden}#nf-app .nf-cw .nf-c{border-radius:8px 8px 0 0}
#nf-app .nf-pl{position:absolute;top:56px;left:50%;transform:translateX(-50%);width:44px;height:44px;border:2px solid #fff;border-radius:50%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}#nf-app .nf-pl svg{width:22px;height:22px}
#nf-app .nf-pb{margin:8px 8px 0;height:4px;background:#5a5a5a;border-radius:2px}#nf-app .nf-pb i{display:block;width:17%;height:100%;background:#e50914;border-radius:2px}
#nf-app .nf-ab{display:flex;align-items:center;justify-content:space-around;height:50px}#nf-app .nf-ab span{width:26px;height:26px}#nf-app .nf-ab svg{width:100%;height:100%}#nf-app .nf-ab s{width:1px;height:22px;background:#444}
#nf-app .nf-sb{gap:8px;font-size:15px;height:46px;background:#1a1a1a}#nf-app .nf-sb svg{width:22px;height:22px}#nf-app .nf-sh .nf-c{border-radius:8px 8px 0 0}
#nf-app .nf-rk{flex:none;width:182px;position:relative;display:flex;align-items:flex-end;justify-content:flex-end;height:158px}
#nf-app .nf-rk span{position:absolute;left:0;bottom:-12px;font:700 150px/1 var(--font);color:#000;-webkit-text-stroke:3px #fff;letter-spacing:-12px}#nf-app .nf-rk .nf-c{width:113px;position:relative;z-index:1;margin-right:0}
#nf-app .nf-tb{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom,0px) + 22px);width:64%;min-width:250px;height:66px;border-radius:33px;background:rgba(24,24,24,.88);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:space-around;padding:0 6px;z-index:4}
#nf-app .nf-tb button{flex:1;height:52px;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#999;font-size:10px}#nf-app .nf-tb button.on{background:rgba(255,255,255,.1);color:#fff}
#nf-app .nf-tb button svg{width:26px;height:26px}#nf-app .nf-tb .nf-av{width:28px!important;height:28px!important;font-size:16px!important;border-radius:6px!important}
#nf-app .nf-av{display:flex;align-items:center;justify-content:center;flex:none;line-height:1}#nf-app .nf-ed{background:rgba(255,255,255,.2)!important;color:#fff}#nf-app .nf-ed svg{width:38px;height:38px}
#nf-app .nf-sb2{margin:0 12px;height:48px;border-radius:14px;background:#262626;display:flex;align-items:center;gap:12px;padding:0 16px;color:#999}#nf-app .nf-sb2 svg{width:24px;height:24px;flex:none}
#nf-app .nf-sb2 input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font:16px var(--font);-webkit-user-select:text;user-select:text}
#nf-app .nf-li{display:flex;align-items:center;gap:14px;padding:5px 16px}#nf-app .nf-li>span{flex:1;font-size:16px}#nf-app .nf-th{width:132px;height:74px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex:none}#nf-app .nf-th b{font-size:15px;text-shadow:0 1px 5px #000;text-align:center}
#nf-app .nf-lp{width:36px;height:36px;border:2px solid #ddd;border-radius:50%;display:flex;align-items:center;justify-content:center}#nf-app .nf-lp svg{width:18px;height:18px}#nf-app .nf-em{color:#888;text-align:center;margin-top:40px}
#nf-app .nf-sv{margin:6px 8px 0;border:1px solid #333;border-radius:12px;background:#141414;padding:16px 14px;display:grid;grid-template-columns:44px 1fr 22px;align-items:center}#nf-app .nf-sv svg{width:24px;height:24px}#nf-app .nf-sv b{display:block;font-size:17px;font-weight:700}#nf-app .nf-sv small{color:#aaa;font-size:13px}
#nf-app .nf-c{font:inherit;cursor:pointer;color:inherit;border:0;padding:0}
#nf-app .nf-li{width:100%;border:0;background:none;color:inherit;text-align:left;cursor:pointer;font-family:inherit;letter-spacing:inherit}
#nf-app .nf-detail{position:absolute;inset:0;z-index:6;overflow-y:auto;background:#080808;padding-bottom:40px;animation:nf-page-enter .24s ease both}
#nf-app .nf-back{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:6px;padding:calc(env(safe-area-inset-top,0px) + 58px) 16px 12px;background:linear-gradient(#080808 60%,transparent);font-size:14px;color:#fff;cursor:pointer}
#nf-app .nf-back svg{width:20px;height:20px}
#nf-app .nf-detail-hero{position:relative;min-height:230px;margin-top:-20px;display:flex;flex-direction:column;justify-content:flex-end;padding:26px 18px 18px;background-size:cover;background-position:center;isolation:isolate}
#nf-app .nf-detail-hero:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(0deg,#080808 0%,rgba(0,0,0,.35) 70%,rgba(0,0,0,.08))}
#nf-app .nf-detail-n{font-size:12px;color:#e50914;font-weight:800;letter-spacing:.12em;margin-bottom:6px}
#nf-app .nf-detail-title{font-size:32px;font-weight:800;line-height:1.15;text-shadow:0 2px 8px #000;margin-bottom:16px}
#nf-app .nf-detail-actions{display:flex;align-items:center;gap:10px}
#nf-app .nf-play-main{flex:1;height:44px;border-radius:6px;background:#fff!important;color:#111!important;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer}
#nf-app .nf-play-main svg{width:20px;height:20px}
#nf-app .nf-round{width:44px;height:44px;border:1px solid #777!important;border-radius:50%;background:rgba(20,20,20,.7)!important;font-size:26px;display:grid;place-items:center;cursor:pointer}
#nf-app .nf-detail-body{padding:14px 18px 30px}
#nf-app .nf-meta-line{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:#bcbcbc;font-size:12px;margin-bottom:12px}
#nf-app .nf-meta-line b{color:#fff}#nf-app .nf-meta-line span{border:1px solid #777;padding:1px 5px;border-radius:2px}
#nf-app .nf-detail-body h2{font-size:21px;font-weight:750;margin:4px 0 8px}
#nf-app .nf-desc{font-size:14px;line-height:1.55;color:#eee;margin-bottom:12px}
#nf-app .nf-cast{font-size:12px;line-height:1.6;color:#aaa;margin:4px 0}
#nf-app .nf-detail-section{margin-top:24px}#nf-app .nf-detail-section h3{font-size:19px;font-weight:700;margin-bottom:10px}
#nf-app .nf-info-grid{display:grid;grid-template-columns:94px 1fr;gap:9px 12px;font-size:13px;line-height:1.4}
#nf-app .nf-info-grid span{color:#888}#nf-app .nf-info-grid b{font-weight:500;color:#eee}
#nf-app .nf-muted{font-size:12px;color:#888;margin:-4px 0 8px}
#nf-app .nf-episode{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:10px 0;border-bottom:1px solid #292929!important;cursor:pointer;font-family:inherit;letter-spacing:inherit}
#nf-app .nf-ep-thumb{width:100px;height:58px;flex:none;border-radius:5px;display:grid;place-items:center;background-size:cover}
#nf-app .nf-ep-thumb svg{width:24px;height:24px}#nf-app .nf-episode>span:nth-child(2){flex:1;min-width:0}
#nf-app .nf-episode b{display:block;font-size:12px;font-weight:650;margin-bottom:5px}#nf-app .nf-episode small{display:block;font-size:11px;color:#aaa;line-height:1.4}
#nf-app .nf-ep-dl{color:#aaa;flex:none}#nf-app .nf-ep-dl svg{width:20px;height:20px}#nf-app .nf-pressed{transform:scale(.98);opacity:.8}
#nf-app .nf-pk{position:absolute;inset:0;overflow:hidden;background:linear-gradient(#5a0000,#8a0a0a 55%,#4a1a1a 70%,#7a3a3a)}
#nf-app .nf-hero{position:absolute;top:0;left:0;right:0;height:64%;background:radial-gradient(ellipse at 50% 30%,#c01818,#6a0000 70%);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:12px}
#nf-app .nf-hero h1{font:900 66px/1 var(--font);margin:0;letter-spacing:-3px;text-shadow:0 2px 12px #000;color:#e8e8e8}#nf-app .nf-hero h1 span{font-weight:300;color:#bbb}#nf-app .nf-hero small{letter-spacing:4px;font-size:13px;color:#ccc;margin-top:2px}
#nf-app .nf-hero p{display:flex;flex-direction:column;align-items:center;gap:7px;font-size:19px;line-height:1.25;margin:10px 0 0} #nf-app .nf-hero p span{display:block;white-space:nowrap} #nf-app .nf-hero p .nf-t{order:2}
#nf-app .nf-pp{position:absolute;left:0;right:0;bottom:0;height:34%;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 14px)}#nf-app .nf-pt{text-align:center;color:#d8b8b8;font-size:17px;margin-bottom:14px}
#nf-app .nf-pg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 0;justify-items:center;max-width:280px;margin:0 auto}#nf-app .nf-pg button{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:17px;cursor:pointer;transform:translateY(0) scale(1);transition:transform .16s cubic-bezier(.2,.8,.2,1);will-change:transform}#nf-app .nf-pg button:active{transform:translateY(4px) scale(.97)}#nf-app .nf-pg button .nf-av{transition:box-shadow .16s}#nf-app .nf-pg button:active .nf-av{box-shadow:0 2px 3px rgba(0,0,0,.35)}@media (hover:hover){#nf-app .nf-pg button:hover{transform:translateY(-3px)}}`;
  document.head.appendChild(s);
})();

(() => {
  const s = document.createElement("style");
  s.textContent = `
#nf-app .nf-hd{background:#000;transition:background .2s}#nf-app.nf-hm:not(.nf-sc) .nf-hd{background:transparent}#nf-app.nf-dt .nf-hd,#nf-app.nf-dt .nf-tb{display:none}
#nf-app .nf-c .nf-t{left:0;top:0;font:900 8px/8.500px var(--font);padding:3px 3px 4px;border-radius:0 0 4px 0}
#nf-app .nf-c::before{content:"";position:absolute;left:50%;top:13%;width:34%;aspect-ratio:1;border-radius:50%;background:rgba(0,0,0,.22);transform:translateX(-50%)}
#nf-app .nf-c::after{content:"";position:absolute;left:12%;right:12%;top:38%;bottom:-20%;border-radius:50% 50% 0 0;background:rgba(0,0,0,.2)}
#nf-app .nf-c b,#nf-app .nf-c em,#nf-app .nf-c u,#nf-app .nf-c .nf-t{z-index:1}
#nf-app .nf-c em{font-size:9.500px;padding:3px 6px}#nf-app .nf-c u{font-size:9.500px;left:14%;right:14%;padding:5px 0}#nf-app .nf-c em:has(+u){bottom:19px}
#nf-app .nf-h{font-weight:500;font-size:21px;letter-spacing:-.04em}
#nf-app .nf-tb{background:rgba(30,25,20,.9);border:1px solid rgba(255,255,255,.14);bottom:28px;width:252px;min-width:0;height:64px}#nf-app .nf-tb button{font-size:12px;height:50px}#nf-app .nf-tb button.on{background:#1b1b1d;color:#fff}#nf-app .nf-tb button svg{width:28px;height:28px}
#nf-app .nf-rk{height:160px}#nf-app .nf-rk span{left:auto;right:104px;font-size:146px;letter-spacing:-6px;bottom:-14px;-webkit-text-stroke:3px #fff}
#nf-app .nf-chips{display:flex;gap:9px;padding:6px 12px 0;overflow-x:auto;scrollbar-width:none}#nf-app .nf-chips::-webkit-scrollbar{display:none}
#nf-app .nf-chips button{flex:none;height:44px;padding:0 21px;border-radius:15px;background:rgba(40,28,28,.7);border:1px solid rgba(255,255,255,.14);font-size:17px;display:flex;align-items:center;gap:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}#nf-app .nf-chips button.on{background:#fff;color:#000}#nf-app .nf-chips .cat svg{width:11px;height:8px}
#nf-app .nf-fc{position:relative;margin:20px 24px 0;height:495px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:linear-gradient(#a82219 0,#82130f 45%,#2a0b0b 78%,#1a0808)}
#nf-app .nf-fa{position:absolute;left:0;right:0;top:0;height:350px;cursor:pointer;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,.0),rgba(0,0,0,.25))}#nf-app .nf-sil{position:absolute;left:0;top:10px;width:100%;height:340px}
#nf-app .nf-fl{position:absolute;left:0;right:0;top:246px;text-align:center}#nf-app .nf-fl strong{display:block;font:900 80px/1 var(--font);letter-spacing:-7px;background:linear-gradient(#fff,#b9b9bd 55%,#f2f2f2);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 3px 6px rgba(0,0,0,.5))}#nf-app .nf-fl strong i{font-style:normal;font-weight:300;font-size:92px}#nf-app .nf-fl small{display:block;margin-top:4px;font-size:15px;font-weight:700;color:#d9d3d3;letter-spacing:.5px}
#nf-app .nf-fc p{position:absolute;left:0;right:0;top:350px;text-align:center;font-size:17.500px;margin:0}
#nf-app .nf-fp,#nf-app .nf-fs{position:absolute;left:15px;right:15px;height:40px;border-radius:20px;display:flex;align-items:center;justify-content:center;gap:10px;font-size:17px}#nf-app .nf-fp{top:392px;background:#fff;color:#111}#nf-app .nf-fs{top:440px;background:rgba(80,70,70,.85);color:#fff}#nf-app .nf-fp svg{width:22px;height:22px}#nf-app .nf-fs svg{width:24px;height:24px}
#nf-app .nf-detail{background:#000;padding-bottom:70px}
#nf-app .nf-dh{position:sticky;top:0;z-index:5;background:#000;padding-top:59px}
#nf-app .nf-hv{position:relative;height:221px;border-radius:20px 20px 0 0;overflow:hidden;background-size:cover;cursor:pointer}
#nf-app .nf-hv::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 70%,rgba(0,0,0,.35));pointer-events:none}
#nf-app .nf-scn{position:absolute;inset:0;opacity:0;transition:opacity .3s;background:linear-gradient(#8fb0a8,#b4c3b6 40%,#6f7f78 62%,#4c4f58)}#nf-app .pl .nf-scn{opacity:1}
#nf-app .nf-hb{position:absolute;top:11px;width:45px;height:45px;border-radius:50%;background:rgba(18,18,18,.72);border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;z-index:2;color:#fff}#nf-app .nf-hb svg{width:24px;height:24px}#nf-app .nf-hb.c{right:70px}#nf-app .nf-hb.x{right:15px}
#nf-app .nf-hp{position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;border:2px solid #fff;border-left-color:#e50914;background:rgba(0,0,0,.3);display:grid;place-items:center;z-index:2}#nf-app .nf-hp svg{width:26px;height:26px}#nf-app .pl .nf-hp{display:none}
#nf-app .nf-mu{position:absolute;right:4px;bottom:16px;width:26px;height:26px;border-radius:50%;background:rgba(18,18,18,.72);display:grid;place-items:center;z-index:2;color:#fff}#nf-app .nf-mu svg{width:16px;height:16px}
#nf-app .nf-cap,#nf-app .nf-pr{display:none}#nf-app .pl .nf-cap{display:block;position:absolute;left:50%;bottom:14px;transform:translateX(-50%);background:rgba(0,0,0,.65);padding:3px 8px;border-radius:3px;font-size:14px;z-index:2}#nf-app .pl .nf-pr{display:block;position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.25);z-index:2}#nf-app .nf-pr i{display:block;width:4%;height:100%;background:#e50914;animation:nfpr 60s linear forwards}@keyframes nfpr{to{width:100%}}
#nf-app .nf-db{padding:6px 10px 30px}
#nf-app .nf-lg{font:900 21px/1 Impact,"Arial Narrow",Arial,sans-serif;color:#e50914;transform:scaleX(.76);transform-origin:left;letter-spacing:0;margin-top:2px}
#nf-app .nf-db h2{font-size:29px;font-weight:500;margin:4px 0 0;letter-spacing:-.04em}
#nf-app .nf-mt{display:flex;align-items:center;gap:8px;margin-top:18px;font-size:17px}#nf-app .nf-mt em{font-style:normal;font-weight:900;font-size:12px;color:#fff;padding:2px 3px;border-radius:3px;min-width:19px;text-align:center;line-height:14px}
#nf-app .nf-b1{font-style:normal;font-weight:800;font-size:12px;border:2px solid #777;color:#bbb;border-radius:3px;padding:0 4px;line-height:14px}#nf-app .nf-b2{font-style:italic;font-weight:900;font-size:16px;color:#ccc}#nf-app .nf-b3{width:26px;height:24px;color:#bbb}
#nf-app .nf-bp,#nf-app .nf-bs{width:100%;height:42px;border-radius:21px;display:flex;align-items:center;justify-content:center;gap:10px;font-size:17px;font-weight:600;margin-top:12px}#nf-app .nf-bp{background:#fff;color:#111;margin-top:16px}#nf-app .nf-bs{background:#333;color:#fff}#nf-app .nf-bp svg,#nf-app .nf-bs svg{width:22px;height:22px}
#nf-app .nf-ds{font-size:17px;line-height:1.52;margin:22px 0 14px;letter-spacing:-.03em}#nf-app .nf-cs{font-size:15px;color:#8d8d8d;margin:3px 0}
#nf-app .nf-ar{display:flex;margin-top:30px}#nf-app .nf-ac{flex:1;display:flex;flex-direction:column;align-items:center;gap:9px;font-size:12px;line-height:1.35;text-align:center;min-height:68px}#nf-app .nf-ac svg{width:30px;height:30px}
#nf-app .nf-dt2{display:flex;gap:26px;margin-top:26px;border-top:0}#nf-app .nf-dt2 button{position:relative;padding-top:20px;font-size:20px;font-weight:500;color:#777;letter-spacing:-.04em}#nf-app .nf-dt2 .on{color:#fff}#nf-app .nf-dt2 .on::before{content:"";position:absolute;left:0;top:0;width:30px;height:3px;background:#e50914}
#nf-app .nf-sr{display:flex;justify-content:space-between;align-items:center;margin:26px 0 22px;font-size:20px;color:#ddd}#nf-app .nf-sr i{width:26px;height:26px;border-radius:50%;background:#fff;color:#000;font:900 18px/26px Georgia,serif;text-align:center;margin-right:10px}
#nf-app .nf-ep{margin-bottom:26px}#nf-app .nf-er{display:flex;align-items:center;gap:12px;cursor:pointer}#nf-app .nf-et{position:relative;width:112px;height:63px;border-radius:6px;overflow:hidden;flex:none}#nf-app .nf-et u{position:absolute;inset:0}#nf-app .nf-et b{position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px 0 0 -19px;border:1.5px solid #ddd;border-radius:50%;background:rgba(0,0,0,.45);display:grid;place-items:center}#nf-app .nf-et svg{width:18px;height:18px}
#nf-app .nf-en{flex:1;min-width:0}#nf-app .nf-en b{display:block;font-size:18px;font-weight:700}#nf-app .nf-en small{display:block;margin-top:4px;font-size:16px;color:#9a9a9a}#nf-app .nf-ed2{width:30px;height:30px;margin-right:12px;color:#fff}#nf-app .nf-ed2 svg{width:100%;height:100%}
#nf-app .nf-ep p{margin:14px 0 0;font-size:16px;line-height:1.55;color:#c8c8c8;letter-spacing:-.03em}
#nf-app .nf-gr{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:22px}#nf-app .nf-gr .nf-c{width:100%}`;
  document.head.appendChild(s);
})();
