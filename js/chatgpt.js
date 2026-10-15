/* ===== chatgpt.js (integrated) ===== */
/* ===== 16차: ChatGPT 앱 ===== */
const GptApp = (() => {
  const $ = q => document.querySelector(q), el = $("#gp-app"), screen = $("#screen");
  const ic = (p, w = 1.8, f = "none") => `<svg viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    menu: ic('<path d="M4 9h11M4 15h16"/>', 2),
    compose: ic('<path d="M12 5H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-5"/><path d="M17.5 3.5a1.8 1.8 0 0 1 2.6 2.6L11 15.2 7.5 16.5 8.8 13z"/>'),
    chev: ic('<path d="M7 10l5 5 5-5"/>', 2.2),
    more: ic('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>', 1.8, "currentColor"),
    plus: ic('<path d="M12 5v14M5 12h14"/>', 2),
    mic: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>'),
    up: ic('<path d="M12 19V5M6 11l6-6 6 6"/>', 2.4),
    stop: ic('<rect x="7" y="7" width="10" height="10" rx="2.2"/>', 1, "currentColor"),
    copy: ic('<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/>', 1.7),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.2),
    redo: ic('<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/>', 1.7),
    search: ic('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>', 1.9),
    trash: ic('<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>', 1.7),
    gear: ic('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>', 1.7),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>', 2),
    code: ic('<path d="M8.5 7L4 12l4.5 5M15.5 7L20 12l-4.5 5"/>'),
    list: ic('<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>', 2),
    quote: ic('<path d="M5 6v12M9 8h10M9 12h10M9 16h6"/>'),
    logo: '<svg class="lg" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M30 14l12 7v14M30 46l-12-7V25M18 25l12-7"/><circle cx="30" cy="30" r="6.5"/><path d="M30 14v9.5M42 21l-8.2 4.8M42 39l-8.2-4.8M30 46v-9.5M18 39l8.2-4.8M18 21l8.2 4.8"/></svg>',
  };
  const KEY = "ios-chatgpt-v1", MODELS = [["ChatGPT", "일상적인 질문에 적합"], ["ChatGPT mini", "더 빠른 응답"]];
  const SAMPLES = [[I.code, "코드 예시 요청", "파이썬으로 피보나치 함수 코드를 보여줘"], [I.list, "목록 서식 보기", "주말에 할 만한 일을 목록으로 정리해줘"], [I.quote, "인용문 서식 보기", "좋은 습관에 대한 인용문을 보여줘"]];
  let S = { chats: [], model: 0 }, cur = null, gen = null, isOpen = false, toastT = null, rec = null;
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && Array.isArray(d.chats)) S = { chats: d.chats.filter(c => c && Array.isArray(c.msgs)), model: d.model | 0 }; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const GP_SEED = [{"id": "g99", "title": "눈에 안 띄고 데이트할 수 있는 곳", "ago": 4, "msgs": [{"r": "u", "t": "눈에 안띄고 데이트할 수 있는 곳 알려줘"}, {"r": "a", "t": "뭐니 뭐니 해도 한강이지 ㅋㅋㅋㅋ 🌙\n특히 사람 많은 메인 구역 말고 살짝 외진 한강공원 구석 + 저녁 시간대 조합이면 둘이 조용히 있기 좋음. 서울시에서도 이촌한강공원을 노을 명소로 소개하고 있어.\n\n좀 더 조용한 느낌이면:\n\n🌅 이촌한강공원 — 야경·노을 보면서 앉아있기\n🌿 서울숲 안쪽 — 메인 산책로 말고 안쪽 정원 쪽\n🌃 달맞이봉공원 — 야경 보면서 둘이 이야기하기 좋음\n🌊 망원한강공원 — 돗자리 깔고 멍때리기\n🚲 한강 자전거도로 쪽 — 산책하면서 돌아다니기\n\n근데 “아예 사람 눈에 띄기 싫다”면 번화한 카페나 핫플보다는 그냥 공원이나 강변이 압승임 ㅋㅋㅋ\n특히 평일 저녁이 제일 무난해."}]}, {"id": "g00", "title": "루멘 컴백 주간 일정 정리 도와줘", "ago": 720, "msgs": [{"r": "u", "t": "컴백 주간이라 해야 할 일이 너무 많아. 10/12~10/16 사이 일정 정리를 도와줘. 티저 공개 시간, 앨범 예약 마감, 팬미팅 선예매가 있어."}, {"r": "a", "t": "좋아요! 날짜별로 정리해 볼게요.\n\n- **10/12 (월)** 0시 콘셉트 포토 확인 · 앨범 예약 마감 전 최종 점검\n- **10/13 (화)** 18시 하이라이트 메들리 공개\n- **10/14 (수)** 0시 MV 티저 2차\n- **10/16 (금)** 18시 앨범 발매 & MV 공개\n- **10/20 (화)** 14시 팬미팅 선예매\n\n공개 시간 알림을 미리 맞춰 두면 놓치지 않을 거예요. 알림용 체크리스트로도 만들어 드릴까요?"}]}, {"id": "g01", "title": "제주도 2박 3일 여행 코스", "ago": 180, "msgs": [{"r": "u", "t": "11월 초에 제주도 2박 3일로 가려고 해. 렌터카 있고, 바다랑 카페 위주로 코스 짜줘."}, {"r": "a", "t": "2박 3일 코스를 제안해 볼게요.\n\n**1일차 (제주시 · 애월)**\n- 도착 후 협재 해변 산책\n- 애월 해안도로 카페 투어\n- 저녁은 고기국수 또는 흑돼지\n\n**2일차 (서귀포)**\n- 오전 천지연폭포 → 올레시장\n- 오후 쇠소깍 · 섭지코지 노을\n\n**3일차**\n- 함덕 해변 산책 후 공항\n\n11월은 바람이 강한 편이라 얇은 겉옷을 챙기세요."}]}, {"id": "g02", "title": "계란 없이 팬케이크 만드는 법", "ago": 300, "msgs": [{"r": "u", "t": "집에 계란이 없는데 팬케이크 만들 수 있어?"}, {"r": "a", "t": "가능해요! 계란 없이도 충분히 부드럽게 돼요.\n\n• 팬케이크 믹스나 밀가루 1컵 + 베이킹파우더 1작은술 + 설탕 1큰술\n• 우유 3/4컵 + 식용유 1큰술\n• 으깬 바나나 1/2개를 넣으면 촉촉함이 더해져요\n\n덩어리가 약간 남을 정도로만 섞고, 약불에서 한 면당 2분쯤 구우면 됩니다."}]}, {"id": "g03", "title": "영어 이메일 정중하게 다듬기", "ago": 1200, "msgs": [{"r": "u", "t": "아래 문장을 비즈니스 이메일처럼 정중하게 바꿔줘: 'I need the report by tomorrow, please send it fast.'"}, {"r": "a", "t": "이렇게 바꿔 보세요.\n\n> Could you please send me the report by tomorrow? I would greatly appreciate it.\n\n더 부드럽게 하려면 이유를 덧붙여도 좋아요. 예: \"I need it for tomorrow's meeting.\""}]}, {"id": "g04", "title": "자기소개서 첫 문단 피드백", "ago": 1680, "msgs": [{"r": "u", "t": "지원 동기 첫 문단인데 너무 길다는 말을 들었어. 두 문장으로 줄이는 방향을 알려줘."}, {"r": "a", "t": "핵심 이유 하나와 직무 연결 한 문장만 남기세요.\n\n1. 어떤 계기로 관심을 갖게 되었는지\n2. 그 경험이 지원 직무와 어떻게 이어지는지\n\n초안을 붙여 주시면 직접 줄여 드릴게요."}]}, {"id": "g05", "title": "목이 칼칼할 때 도움 되는 것들", "ago": 1980, "msgs": [{"r": "u", "t": "요즘 목이 계속 칼칼한데 집에서 할 수 있는 거 있어?"}, {"r": "a", "t": "가볍게 시도해볼 만한 방법들이에요.\n\n• 따뜻한 물이나 꿀차를 자주 마시기\n• 실내 습도 40~60% 유지하기\n• 말을 많이 했다면 목을 쉬게 해주기\n• 가글은 미지근한 소금물로\n\n다만 열이 나거나 삼키기 힘들 정도거나 일주일 넘게 이어지면 병원에서 확인받는 게 좋아요."}]}, {"id": "g06", "title": "저녁 메뉴 추천 (냉장고 파먹기)", "ago": 3060, "msgs": [{"r": "u", "t": "냉장고에 계란, 대파, 김치, 두부밖에 없어. 20분 안에 되는 저녁 추천해줘."}, {"r": "a", "t": "**김치 두부 계란찜 덮밥**을 추천해요.\n\n1. 김치와 대파를 기름에 볶기\n2. 두부를 으깨 넣고 물 반 컵 추가\n3. 풀어 둔 계란을 부어 약불에서 5분\n\n밥 위에 올리면 15분 안에 끝나요."}]}, {"id": "g07", "title": "이미지 프롬프트: 가을 한강 노을", "ago": 4440, "msgs": [{"r": "u", "t": "AI 그림 생성용 프롬프트 만들어줘. 가을 한강 노을, 파스텔 톤, 잔잔한 분위기."}, {"r": "a", "t": "이런 프롬프트는 어떨까요?\n\n> Autumn sunset by the Han River, pastel orange and lavender sky, soft reflections on water, calm atmosphere, gentle film grain, wide shot\n\n사람이나 자전거를 넣고 싶으면 \"a lone cyclist silhouette\"를 추가해 보세요."}]}, {"id": "g08", "title": "토익 파트5 문법 정리", "ago": 6060, "msgs": [{"r": "u", "t": "토익 파트5에서 자주 나오는 문법 포인트 정리해줘."}, {"r": "a", "t": "자주 출제되는 포인트예요.\n\n- 품사 구분 (명사/형용사/부사 자리)\n- 동사 시제 · 수 일치\n- 전치사 vs 접속사\n- 관계대명사\n\n각 항목마다 예문 문제를 만들어 드릴 수 있어요."}]}, {"id": "g09", "title": "동아리 발표 아이디어 브레인스토밍", "ago": 7260, "msgs": [{"r": "u", "t": "동아리 학기 말 발표 주제로 재밌는 아이디어 5개만 뽑아줘."}, {"r": "a", "t": "아이디어 5가지예요.\n\n1. 우리 동아리 1년 타임라인 영상\n2. 회원 인터뷰 미니 다큐\n3. 활동 사진으로 만든 퀴즈 쇼\n4. 다음 학기 도전 과제 공개\n5. 베스트 활동 어워즈\n\n마음에 드는 것을 골라 주시면 구성안으로 확장해 드릴게요."}]}, {"id": "g10", "title": "한국어 → 일본어 번역 (여행 문장)", "ago": 8880, "msgs": [{"r": "u", "t": "'이 근처에 편의점이 어디 있나요?'를 일본어로 번역해줘."}, {"r": "a", "t": "「この近くにコンビニはどこにありますか？」\n\n발음: 고노 치카쿠니 콘비니와 도코니 아리마스카?"}]}, {"id": "g11", "title": "친구가 약속을 자꾸 미뤄서 서운해", "ago": 13320, "msgs": [{"r": "u", "t": "친한 친구가 약속을 자꾸 미뤄서 서운한데 말해도 될까"}, {"r": "a", "t": "서운한 마음이 드는 건 자연스러워요. 비난보다는 내 감정 중심으로 말해보면 부담이 덜해요.\n\n예: \"요즘 약속이 몇 번 미뤄져서 좀 서운했어. 요즘 바쁜 일 있어?\"\n\n이유를 먼저 물어보면 상대도 방어적이 되지 않고 이야기하기 편해져요."}]}, {"id": "g12", "title": "운동 루틴 주 3회 짜기", "ago": 17400, "msgs": [{"r": "u", "t": "운동 초보인데 주 3회 30분 루틴 짜줘."}, {"r": "a", "t": "주 3회 전신 루틴이에요.\n\n- 월: 스쿼트 · 푸시업 · 플랭크\n- 수: 걷기/조깅 20분 + 스트레칭\n- 금: 런지 · 힙브릿지 · 팔굽혀펴기\n\n무리하지 말고 2주마다 횟수를 조금씩 늘려 보세요."}]}, {"id": "g13", "title": "노트북 구매 고민 (대학생)", "ago": 26220, "msgs": [{"r": "u", "t": "과제랑 영상 편집 가끔 하는 대학생인데 노트북 고를 때 기준 알려줘."}, {"r": "a", "t": "확인할 기준이에요.\n\n- RAM 16GB 이상\n- SSD 512GB 이상\n- 무게 1.5kg 이하 (휴대성)\n- 배터리 사용 시간\n\n예산을 알려 주시면 범위를 좁혀 드릴게요."}]}, {"id": "g14", "title": "독서 감상문 구성 팁", "ago": 37620, "msgs": [{"r": "u", "t": "독서 감상문을 어떻게 시작하면 좋을까?"}, {"r": "a", "t": "책을 읽게 된 계기나 인상 깊은 문장으로 시작하면 자연스러워요. 이후 줄거리 요약은 짧게 하고 본인의 생각을 중심으로 쓰세요."}]}];
  (() => { let done = false; try { done = !!localStorage.getItem("ios-chatgpt-seed35"); } catch (e) {} if (done) return; const n = Date.now(); S.chats = S.chats.filter(c => !/^g(0\d|1\d)$/.test(c.id)); GP_SEED.forEach(g => { if (!S.chats.some(c => c.id === g.id)) S.chats.push({ id: g.id, title: g.title, ts: n - g.ago * 6e4, msgs: g.msgs.map(m => ({ r: m.r, t: m.t })) }); }); try { localStorage.setItem("ios-chatgpt-seed35", "1"); } catch (e) {} save(); })();
  const chat = () => S.chats.find(c => c.id === cur);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const F = "`".repeat(3), T = "`";

  /* ---------- Markdown ---------- */
  const inl = s => esc(s).replace(/`([^`\n]+)`/g, "<code>$1</code>").replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<i>$2</i>");
  const UL = /^\s*[-*]\s+/, OL = /^\s*\d+[.)]\s+/, QT = /^>\s?/;
  function md(t) {
    const out = [], ls = t.split("\n"); let i = 0, m;
    while (i < ls.length) {
      const l = ls[i];
      if ((m = l.match(/^```(\S*)/))) {
        const b = []; i++; while (i < ls.length && !/^```/.test(ls[i])) b.push(ls[i++]); i++;
        out.push(`<div class="gp-cb"><div class="gp-ch"><span>${esc(m[1] || "code")}</span><button data-a="cc">${I.copy}<span>복사</span></button></div><pre><code>${esc(b.join("\n"))}</code></pre></div>`);
      } else if (QT.test(l)) { const b = []; while (i < ls.length && QT.test(ls[i])) b.push(inl(ls[i++].replace(QT, ""))); out.push(`<blockquote>${b.join("<br>")}</blockquote>`); }
      else if (UL.test(l)) { const b = []; while (i < ls.length && UL.test(ls[i])) b.push(`<li>${inl(ls[i++].replace(UL, ""))}</li>`); out.push(`<ul>${b.join("")}</ul>`); }
      else if (OL.test(l)) { const b = []; while (i < ls.length && OL.test(ls[i])) b.push(`<li>${inl(ls[i++].replace(OL, ""))}</li>`); out.push(`<ol>${b.join("")}</ol>`); }
      else if ((m = l.match(/^#{1,4}\s+(.*)/))) { out.push(`<div class="gp-h">${inl(m[1])}</div>`); i++; }
      else if (!l.trim()) i++;
      else { const b = []; while (i < ls.length && ls[i].trim() && !/^(```|>|\s*[-*]\s|\s*\d+[.)]\s|#{1,4}\s)/.test(ls[i])) b.push(inl(ls[i++])); out.push(`<p>${b.join("<br>")}</p>`); }
    }
    return out.join("");
  }

  /* ---------- 응답 ---------- */
  function reply(q) {
    const s = q.replace(/\s+/g, " ").slice(0, 40);
    if (/^(안녕|하이|hi\b|hello)/i.test(q)) return "안녕하세요! 무엇을 도와드릴까요?";
    if (/코드|code|함수|스크립트|python|파이썬|자바스크립트|javascript/i.test(q)) return ["요청하신 내용에 맞는 예시 코드예요.", "", F + "python", "def fibonacci(n):", "    a, b = 0, 1", "    for _ in range(n):", "        yield a", "        a, b = b, a + b", "", "print(list(fibonacci(10)))", F, "", "- " + T + "yield" + T + "로 값을 하나씩 만들어 **메모리를 아껴요**.", "- " + T + "list()" + T + "로 감싸면 한 번에 확인할 수 있어요."].join("\n");
    if (/목록|리스트|추천|정리|방법|계획/.test(q)) return ["\"" + s + "\" 요청을 이렇게 정리해 봤어요.", "", "1. **가볍게 시작하기** — 부담 없는 것부터 하나만 골라요.", "2. **시간 정하기** — 짧게라도 정해 두면 꾸준히 할 수 있어요.", "3. **기록하기** — 끝낸 뒤 한 줄만 남겨도 충분해요.", "", "- 너무 많이 계획하지 않기", "- 쉬는 시간도 일정에 넣기"].join("\n");
    if (/인용|quote/i.test(q)) return ["좋은 습관에 어울리는 문장을 예시로 만들어 봤어요.", "", "> 작은 반복이 쌓이면 어느새 큰 변화가 됩니다.", "> 오늘 한 번이면 충분해요.", "", "인용문은 이렇게 왼쪽 선과 함께 표시돼요."].join("\n");
    return ["\"" + s + "\"에 대한 답변이에요.", "", "- **굵은 글씨**와 " + T + "인라인 코드" + T, "- 번호 목록과 글머리 기호 목록", "- 인용문과 코드 블록", "", "코드나 목록, 인용문을 요청해 보면 서식이 다른 예시를 볼 수 있어요."].join("\n");
  }

  /* ---------- 렌더링 ---------- */
  const acHtml = last => `<div class="gp-ac"><button data-a="cm" aria-label="복사">${I.copy}</button>${last ? `<button data-a="rg" aria-label="다시 생성">${I.redo}</button>` : ""}</div>`;
  const msgHtml = (m, i, last) => m.r === "u" ? `<div class="gp-m u" data-i="${i}">${esc(m.t)}</div>`
    : `<div class="gp-m a" data-i="${i}"><div class="gp-tx">${m.t ? md(m.t) : '<div class="gp-dot"></div>'}</div>${m.t && !(gen && gen.m === m) ? acHtml(last) : ""}</div>`;
  const toBottom = () => requestAnimationFrame(() => { const s = $("#gp-sc"); s.scrollTop = s.scrollHeight; });
  function render(keep) {
    const c = chat(), has = c && c.msgs.length, bd = $("#gp-bd");
    bd.innerHTML = has ? `<div class="gp-list">${c.msgs.map((m, i) => msgHtml(m, i, i === c.msgs.length - 1)).join("")}</div>`
      : `<div class="gp-em"><div class="gp-lg"><img src="https://raw.githubusercontent.com/cnstkal/Hwaho2/main/images/app/ChatGPT/IMG_7156.png" alt="" draggable="false"></div><h2>무엇을 도와드릴까요?</h2></div>`;
    $("#gp-more").style.display = has ? "" : "none";
    $("#gp-mn").textContent = S.model ? "mini" : "";
    if (!keep) toBottom();
  }
  function stream(m) {
    const s = $("#gp-sc"), near = s.scrollHeight - s.scrollTop - s.clientHeight < 140, l = $("#gp-bd .gp-list"), t = l && l.lastElementChild && l.lastElementChild.querySelector(".gp-tx");
    if (t) t.innerHTML = md(m.t); if (near) s.scrollTop = s.scrollHeight;
  }
  function btn() {
    const b = $("#gp-ac"), has = $("#gp-ta").value.trim();
    b.className = "gp-bt " + (gen || has ? "sd" : rec ? "rec" : "pl");
    b.innerHTML = gen ? I.stop : has ? I.up : I.mic;
    b.setAttribute("aria-label", gen ? "중지" : has ? "전송" : "음성 입력");
  }
  const fit = () => { const t = $("#gp-ta"); t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 144) + "px"; };
  function toast(t) { const e = $("#gp-ts"); e.textContent = t; e.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove("on"), 1600); }
  function copy(t) {
    const fb = () => { const a = document.createElement("textarea"); a.value = t; a.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); } catch (e) {} a.remove(); };
    try { return navigator.clipboard.writeText(t).catch(fb); } catch (e) { fb(); }
  }
  function flash(b, html) { const o = b.innerHTML; b.innerHTML = html; setTimeout(() => { b.innerHTML = o; }, 1400); }

  /* ---------- 전송 / 중지 ---------- */
  function start(c, q) {
    const m = { r: "a", t: "" }; c.msgs.push(m); gen = { m, c, tm: 0 }; btn(); render();
    const full = reply(q), step = S.model ? 6 : 3; let n = 0;
    gen.tm = setTimeout(function tick() {
      if (!gen || gen.m !== m) return;
      n = Math.min(full.length, n + step + (Math.random() * 2 | 0)); m.t = full.slice(0, n); stream(m);
      if (n >= full.length) { gen = null; save(); btn(); render(true); } else gen.tm = setTimeout(tick, 28);
    }, 700);
  }
  function stop() {
    if (!gen) return; clearTimeout(gen.tm); const { m, c } = gen; gen = null;
    if (!m.t) c.msgs.splice(c.msgs.indexOf(m), 1);
    save(); btn(); render(true);
  }
  function send() {
    const ta = $("#gp-ta"), t = ta.value.trim(); if (!t || gen) return;
    let c = chat();
    if (!c) { c = { id: "c" + Date.now().toString(36), title: t.replace(/\s+/g, " ").slice(0, 40), ts: 0, msgs: [] }; S.chats.push(c); cur = c.id; }
    c.msgs.push({ r: "u", t }); c.ts = Date.now(); ta.value = ""; fit(); save(); start(c, t);
  }
  function mic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast("이 브라우저는 음성 입력을 지원하지 않아요"); return; }
    if (rec) { try { rec.stop(); } catch (e) {} return; }
    try {
      const r = new SR(); r.lang = "ko-KR"; r.interimResults = false;
      r.onresult = ev => { const t = $("#gp-ta"); t.value += (t.value && !/\s$/.test(t.value) ? " " : "") + ev.results[0][0].transcript; fit(); btn(); };
      r.onend = r.onerror = () => { rec = null; btn(); };
      rec = r; r.start(); btn(); toast("듣고 있어요");
    } catch (e) { rec = null; btn(); toast("음성 입력을 시작할 수 없어요"); }
  }

  /* ---------- 사이드바 / 메뉴 / 시트 ---------- */
  function sbList() {
    const q = $("#gp-q").value.trim().toLowerCase(), l = S.chats.filter(c => c.msgs.length && c.title.toLowerCase().includes(q)).sort((a, b) => b.ts - a.ts);
    $("#gp-sl").innerHTML = l.length ? (() => { const t0 = new Date().setHours(0, 0, 0, 0), grp = c => { const d = Math.floor((t0 - new Date(c.ts).setHours(0, 0, 0, 0)) / 864e5); return d <= 0 ? "오늘" : d === 1 ? "어제" : d <= 7 ? "지난 7일" : d <= 30 ? "지난 30일" : "이전"; }; let g = ""; return l.map(c => { const k = grp(c); let h = ""; if (k !== g) { g = k; h = `<div class="gp-sec">${k}</div>`; } return h + `<button class="gp-si${c.id === cur ? " on" : ""}" data-a="chat" data-id="${c.id}">${esc(c.title)}</button>`; }).join(""); })()
      : `<div class="gp-sec c">${q ? "검색 결과가 없어요" : "대화 기록이 없어요"}</div>`;
  }
  function sb(o) { $("#gp-sb").classList.toggle("open", o); $("#gp-sm").classList.toggle("on", o); if (o) { $("#gp-q").value = ""; sbList(); } else $("#gp-q").blur(); }
  const POPS = ["pm", "pc", "pp"];
  function closePops() { POPS.forEach(p => $("#gp-" + p).classList.remove("on")); $("#gp-scr").classList.remove("on"); }
  function openPop(id) {
    const p = $("#gp-" + id), was = p.classList.contains("on"); closePops(); if (was) return;
    if (id === "pm") p.innerHTML = MODELS.map((m, i) => `<button class="gp-pi" data-a="pickm" data-i="${i}"><div><b>${m[0]}</b><small>${m[1]}</small></div>${i === S.model ? I.check : ""}</button>`).join("");
    if (id === "pc") p.innerHTML = `<button class="gp-pi" data-a="copyall">${I.copy}<b>대화 복사</b></button><button class="gp-pi red" data-a="del">${I.trash}<b>대화 삭제</b></button>`;
    if (id === "pp") { p.innerHTML = SAMPLES.map((s, i) => `<button class="gp-pi" data-a="sample" data-i="${i}">${s[0]}<b>${s[1]}</b></button>`).join(""); p.style.bottom = (el.getBoundingClientRect().bottom - $("#gp-cp").getBoundingClientRect().top + 4) + "px"; }
    p.classList.add("on"); $("#gp-scr").classList.add("on");
  }
  function sheet(o) { $("#gp-sh").classList.toggle("on", o); $("#gp-dim").classList.toggle("on", o); const b = $("#gp-clr"); b.dataset.s = ""; b.querySelector("b").textContent = "모든 대화 삭제"; }
  function newChat() { stop(); cur = null; closePops(); render(); sb(false); }

  el.innerHTML = `<div class="gp-hd"><div class="gp-hr">
    <button class="gp-ib" data-a="menu" aria-label="사이드바 열기">${I.menu}</button>
    <button class="gp-md" data-a="model" aria-label="모델 선택"><span>ChatGPT</span><small id="gp-mn"></small>${I.chev}</button>
    <span class="gp-sp"></span>
    <button class="gp-ib" id="gp-more" data-a="more" aria-label="대화 메뉴">${I.more}</button>
    <button class="gp-ib" data-a="new" aria-label="새 채팅">${I.compose}</button></div></div>
  <div class="gp-sc" id="gp-sc"><div id="gp-bd"></div></div>
  <div class="gp-cp" id="gp-cp"><div class="gp-bx">
    <button class="gp-bt pl" data-a="plus" aria-label="추가">${I.plus}</button>
    <textarea id="gp-ta" rows="1" placeholder="무엇이든 물어보세요" enterkeyhint="send"></textarea>
    <button class="gp-bt pl" id="gp-ac" data-a="act"></button></div>
    </div>
  <div class="gp-scr" id="gp-scr" data-a="scr"></div>
  <div class="gp-pop" id="gp-pm"></div><div class="gp-pop" id="gp-pc"></div><div class="gp-pop" id="gp-pp"></div>
  <div class="gp-sm" id="gp-sm" data-a="sbclose"></div>
  <aside class="gp-sb" id="gp-sb"><div class="gp-st"><img class="gp-sidebar-logo" src="https://raw.githubusercontent.com/cnstkal/Hwaho2/main/images/app/ChatGPT/IMG_7156.png" alt=""><b>ChatGPT</b><span class="gp-sp"></span>
    <button class="gp-ib" data-a="new" aria-label="새 채팅">${I.compose}</button><button class="gp-ib" data-a="sbclose" aria-label="사이드바 닫기">${I.x}</button></div>
    <label class="gp-sq">${I.search}<input id="gp-q" type="search" placeholder="검색" autocomplete="off"></label>
    <div class="gp-sl" id="gp-sl"></div>
    <button class="gp-sset" data-a="set"><img class="gp-account-logo" src="https://raw.githubusercontent.com/cnstkal/Hwaho2/main/images/app/ChatGPT/IMG_7156.png" alt=""><span>박성화</span>${I.gear}</button></aside>
  <div class="gp-dim" id="gp-dim" data-a="setclose"></div>
  <div class="gp-sheet" id="gp-sh"><div class="gp-grab"></div><h3>설정</h3>
    <p>대화 기록은 이 기기의 브라우저에만 저장됩니다.</p>
    <button class="gp-pi red" id="gp-clr" data-a="clr">${I.trash}<b>모든 대화 삭제</b></button>
    <button class="gp-done" data-a="setclose">닫기</button></div>
  <div class="gp-ts" id="gp-ts"></div>`;

  el.addEventListener("click", e => {
    const b = e.target.closest("[data-a]"); if (!b) return; const a = b.dataset.a, c = chat();
    switch (a) {
      case "menu": closePops(); sb(true); break;
      case "sbclose": sb(false); break;
      case "new": newChat(); break;
      case "chat": stop(); cur = b.dataset.id; render(); sb(false); break;
      case "model": case "more": case "plus": openPop(a === "model" ? "pm" : a === "more" ? "pc" : "pp"); break;
      case "scr": closePops(); break;
      case "pickm": S.model = +b.dataset.i; save(); closePops(); render(true); break;
      case "sample": { const t = $("#gp-ta"); t.value = SAMPLES[+b.dataset.i][2]; closePops(); fit(); btn(); t.focus(); break; }
      case "act": if (gen) stop(); else if ($("#gp-ta").value.trim()) send(); else mic(); break;
      case "cc": copy(b.closest(".gp-cb").querySelector("code").textContent); flash(b, I.check + "<span>복사됨</span>"); break;
      case "cm": { const m = c && c.msgs[+b.closest(".gp-m").dataset.i]; if (m) { copy(m.t); flash(b, I.check); toast("복사했어요"); } break; }
      case "rg": if (c && !gen) { c.msgs.pop(); const u = c.msgs.slice().reverse().find(x => x.r === "u"); if (u) start(c, u.t); } break;
      case "copyall": if (c) { copy(c.msgs.map(m => (m.r === "u" ? "나: " : "ChatGPT: ") + m.t).join("\n\n")); toast("대화를 복사했어요"); } closePops(); break;
      case "del": if (c) { stop(); S.chats = S.chats.filter(x => x !== c); cur = null; save(); render(); toast("대화를 삭제했어요"); } closePops(); break;
      case "set": sheet(true); break;
      case "setclose": sheet(false); break;
      case "clr": if (b.dataset.s) { stop(); S.chats = []; cur = null; save(); render(); sbList(); sheet(false); toast("모든 대화를 삭제했어요"); } else { b.dataset.s = "1"; b.querySelector("b").textContent = "정말 삭제할까요? 한 번 더 탭하세요"; } break;
    }
  });
  const ta = $("#gp-ta");
  ta.addEventListener("input", () => { fit(); btn(); });
  ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing && !matchMedia("(pointer:coarse)").matches) { e.preventDefault(); send(); } });
  $("#gp-q").addEventListener("input", sbList);
  let tx = null; const sbEl = $("#gp-sb");
  sbEl.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  sbEl.addEventListener("touchend", e => { if (tx !== null && e.changedTouches[0].clientX - tx < -60) sb(false); tx = null; }, { passive: true });
  const vv = window.visualViewport, kfit = () => { if (!isOpen || !vv) return; const k = Math.max(0, window.innerHeight - vv.height - vv.offsetTop); el.style.bottom = k + "px"; el.classList.toggle("kb", k > 80); if (k > 80) toBottom(); };
  if (vv) { vv.addEventListener("resize", kfit); vv.addEventListener("scroll", kfit); }
  render(); btn(); fit();
  function open() { if (isOpen) return; isOpen = true; originFrom(el, "chatgpt"); el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140); toBottom(); }
  function close() {
    if (!isOpen) return; isOpen = false; stop(); if (rec) { try { rec.stop(); } catch (e) {} }
    sb(false); closePops(); sheet(false); ta.blur(); screen.classList.remove("app-light"); el.classList.remove("open", "kb"); el.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (!isOpen) { el.classList.remove("show"); el.style.bottom = ""; } }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail.id === "chatgpt") open(); });
  document.addEventListener("app:close", close);
  return { open, close };
})();

(()=>{const s=document.createElement("style");s.textContent="/* ===== 16차: ChatGPT 앱 ===== */\n#gp-app{--gb:calc(env(safe-area-inset-bottom,0px) + 26px);position:absolute;inset:0;z-index:5;display:none;flex-direction:column;background:#fff;color:#0d0d0d;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font);font-size:16px;line-height:1.5}\n#gp-app.show{display:flex}\n#gp-app.open{opacity:1;transform:none;border-radius:0}\n#gp-app *{box-sizing:border-box}\n#gp-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent;text-align:left}\n#gp-app svg{width:22px;height:22px;display:block;flex:none}\n#gp-app .gp-hd{flex:none;padding-top:calc(env(safe-area-inset-top,0px) + 54px);background:#fff}\n#gp-app .gp-hr{height:52px;display:flex;align-items:center;gap:2px;padding:0 6px}\n#gp-app .gp-sp{flex:1;min-width:0}\n#gp-app .gp-ib{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none;transition:background .15s,transform .1s}\n#gp-app .gp-ib:active{background:#f0f0f0;transform:scale(.92)}\n#gp-app .gp-md{display:flex;align-items:center;gap:4px;height:44px;padding:0 10px;border-radius:22px;font-size:18px;font-weight:600;min-width:0;white-space:nowrap}\n#gp-app .gp-md small{font-size:15px;font-weight:400;color:#8e8e93}\n#gp-app .gp-md svg{width:16px;height:16px;color:#8e8e93}\n#gp-app .gp-md:active{background:#f0f0f0}\n#gp-app .gp-sc{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;touch-action:pan-y;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}\n#gp-app #gp-bd{min-height:100%;display:flex;flex-direction:column}\n#gp-app .gp-em{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:0 32px 48px;text-align:center}\n#gp-app .gp-lg{width:52px;height:52px;border-radius:50%;border:1px solid #e5e5e5;display:grid;place-items:center}\n#gp-app .gp-lg svg{width:28px;height:28px}\n#gp-app .gp-lg img{width:100%;height:100%;display:block;object-fit:cover;border-radius:50%}\n#gp-app .gp-em h2{margin:4px 0 0;font-size:24px;line-height:1.25;font-weight:600}\n#gp-app .gp-em p{margin:0;font-size:13px;line-height:1.5;color:#8e8e93}\n#gp-app .gp-list{width:100%;padding:8px 16px 24px;display:flex;flex-direction:column;gap:22px}\n#gp-app .gp-m.u{align-self:flex-end;max-width:82%;background:#f4f4f4;border-radius:20px;padding:10px 16px;white-space:pre-wrap;overflow-wrap:anywhere}\n#gp-app .gp-m.a{min-width:0;overflow-wrap:anywhere}\n#gp-app .gp-tx>*:last-child{margin-bottom:0}\n#gp-app .gp-tx p{margin:0 0 12px}\n#gp-app .gp-tx ul,#gp-app .gp-tx ol{margin:0 0 12px;padding-left:24px}\n#gp-app .gp-tx li{margin:4px 0;padding-left:2px}\n#gp-app .gp-tx b{font-weight:600}\n#gp-app .gp-tx code{background:#f0f0f0;border-radius:6px;padding:1px 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px}\n#gp-app .gp-tx blockquote{margin:0 0 12px;padding:0 0 0 14px;border-left:3px solid #d4d4d4;color:#5d5d5d}\n#gp-app .gp-h{font-size:18px;font-weight:700;margin:16px 0 8px}\n#gp-app .gp-cb{margin:0 0 12px;border-radius:14px;overflow:hidden;background:#0d0d0d;color:#ececec}\n#gp-app .gp-ch{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 4px 14px;background:#2f2f2f;color:#b4b4b4;font-size:13px}\n#gp-app .gp-ch button{display:flex;align-items:center;gap:6px;height:36px;padding:0 8px;border-radius:8px;color:#b4b4b4;font-size:13px}\n#gp-app .gp-ch button:active{background:#424242}\n#gp-app .gp-ch svg{width:16px;height:16px}\n#gp-app .gp-cb pre{margin:0;padding:12px 14px;overflow-x:auto;font-size:13.5px;line-height:1.55;-webkit-overflow-scrolling:touch}\n#gp-app .gp-tx .gp-cb code{background:none;padding:0;border-radius:0;font-size:inherit;color:inherit;white-space:pre}\n#gp-app .gp-ac{display:flex;gap:2px;margin:6px 0 0 -8px}\n#gp-app .gp-ac button{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;color:#8e8e93}\n#gp-app .gp-ac button:active{background:#f0f0f0}\n#gp-app .gp-ac svg{width:18px;height:18px}\n#gp-app .gp-dot{width:12px;height:12px;border-radius:50%;background:#0d0d0d;margin:8px 0;animation:gpp 1s ease-in-out infinite}\n#gp-app .gp-cp{flex:none;padding:8px 12px var(--gb);background:#fff}\n#gp-app.kb .gp-cp{padding-bottom:8px}\n#gp-app .gp-bx{display:flex;align-items:flex-end;gap:4px;background:#f4f4f4;border-radius:26px;padding:6px}\n#gp-app .gp-bx textarea{flex:1;min-width:0;display:block;height:40px;max-height:144px;border:0;outline:0;resize:none;background:none;font-family:var(--font);font-size:16px;line-height:24px;padding:8px 4px;color:#0d0d0d}\n#gp-app .gp-bx textarea::placeholder{color:#8e8e93}\n#gp-app .gp-bt{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;flex:none;color:#0d0d0d;transition:background .15s,transform .1s}\n#gp-app .gp-bt:active{transform:scale(.92)}\n#gp-app .gp-bt.pl:active{background:#e5e5e5}\n#gp-app .gp-bt.sd{background:#0d0d0d;color:#fff}\n#gp-app .gp-bt.rec{background:#ff3b30;color:#fff}\n#gp-app .gp-scr{position:absolute;inset:0;z-index:7;display:none}\n#gp-app .gp-scr.on{display:block}\n#gp-app .gp-pop{position:absolute;z-index:8;min-width:230px;max-width:calc(100% - 24px);background:#fff;border-radius:16px;box-shadow:0 4px 28px rgba(0,0,0,.18);padding:6px;display:none}\n#gp-app .gp-pop.on{display:block;animation:gpf .15s ease-out}\n#gp-app #gp-pm{left:12px;top:calc(env(safe-area-inset-top,0px) + 54px + 50px)}\n#gp-app #gp-pc{right:12px;top:calc(env(safe-area-inset-top,0px) + 54px + 50px)}\n#gp-app #gp-pp{left:12px}\n#gp-app .gp-pi{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:6px 12px;border-radius:12px}\n#gp-app .gp-pi:active{background:#f2f2f2}\n#gp-app .gp-pi div{flex:1;min-width:0}\n#gp-app .gp-pi b{display:block;font-weight:500;font-size:16px;line-height:1.3}\n#gp-app .gp-pi small{display:block;color:#8e8e93;font-size:13px;line-height:1.25}\n#gp-app .gp-pi svg{width:20px;height:20px}\n#gp-app .gp-pi.red{color:#e5382a}\n#gp-app .gp-sm{position:absolute;inset:0;z-index:5;background:rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .25s}\n#gp-app .gp-sm.on{opacity:1;pointer-events:auto}\n#gp-app .gp-sb{position:absolute;left:0;top:0;bottom:0;z-index:6;width:min(84%,330px);background:#f9f9f9;display:flex;flex-direction:column;padding-top:calc(env(safe-area-inset-top,0px) + 54px);transform:translateX(-102%);transition:transform .3s cubic-bezier(.2,.9,.25,1);box-shadow:0 0 30px rgba(0,0,0,.12)}\n#gp-app .gp-sb.open{transform:none}\n#gp-app .gp-st{flex:none;height:52px;display:flex;align-items:center;gap:8px;padding:0 6px 0 16px}\n#gp-app .gp-st svg.lg{width:24px;height:24px}\n#gp-app .gp-st .gp-sidebar-logo{width:24px;height:24px;display:block;flex:none;object-fit:cover;border-radius:50%}\n#gp-app .gp-st b{font-size:18px;font-weight:600}\n#gp-app .gp-sq{flex:none;display:flex;align-items:center;gap:8px;margin:4px 12px 8px;height:40px;padding:0 12px;border-radius:12px;background:#ececec;color:#8e8e93}\n#gp-app .gp-sq svg{width:18px;height:18px}\n#gp-app .gp-sq input{flex:1;min-width:0;height:40px;border:0;outline:0;background:none;font-family:var(--font);font-size:16px;color:#0d0d0d;padding:0;-webkit-appearance:none}\n#gp-app .gp-sl{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:0 8px 8px;-webkit-overflow-scrolling:touch}\n#gp-app .gp-sec{padding:8px 12px 4px;font-size:13px;color:#8e8e93}\n#gp-app .gp-sec.c{text-align:center;padding:40px 12px}\n#gp-app .gp-si{display:block;width:100%;height:44px;line-height:44px;padding:0 12px;border-radius:12px;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#gp-app .gp-si.on,#gp-app .gp-si:active{background:#ececec}\n#gp-app .gp-sset{flex:none;display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px var(--gb);border-top:.5px solid #e0e0e0;font-size:16px;font-weight:500}\n#gp-app .gp-sset i{width:32px;height:32px;border-radius:50%;background:#0d0d0d;color:#fff;display:grid;place-items:center;font-style:normal;font-size:14px;flex:none}\n#gp-app .gp-account-logo{width:32px;height:32px;border-radius:50%;object-fit:cover;display:block;flex:none}\n#gp-app .gp-sidebar-logo{width:28px;height:28px;border-radius:50%;object-fit:cover;display:block;flex:none}#gp-app .gp-account-logo{width:32px;height:32px;border-radius:50%;object-fit:cover;flex:none}#gp-app .gp-lg img{width:44px;height:44px;border-radius:12px;object-fit:cover;display:block}\n#gp-app .gp-sset span{flex:1}\n#gp-app .gp-sset svg{color:#8e8e93}\n#gp-app .gp-dim{position:absolute;inset:0;z-index:9;background:rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .25s}\n#gp-app .gp-dim.on{opacity:1;pointer-events:auto}\n#gp-app .gp-sheet{position:absolute;left:0;right:0;bottom:0;z-index:10;background:#fff;border-radius:20px 20px 0 0;padding:8px 16px var(--gb);transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.9,.25,1);box-shadow:0 -4px 30px rgba(0,0,0,.15)}\n#gp-app .gp-sheet.on{transform:none}\n#gp-app .gp-grab{width:36px;height:5px;border-radius:3px;background:#d4d4d4;margin:0 auto 8px}\n#gp-app .gp-sheet h3{margin:4px 0 8px;font-size:18px;font-weight:600}\n#gp-app .gp-sheet p{margin:0 0 12px;font-size:14px;line-height:1.5;color:#5d5d5d}\n#gp-app .gp-done{display:block;width:100%;height:48px;margin-top:8px;border-radius:24px;background:#0d0d0d;color:#fff!important;text-align:center!important;font-size:16px;font-weight:500}\n#gp-app .gp-ts{position:absolute;left:50%;bottom:calc(var(--gb) + 96px);transform:translate(-50%,10px);background:#0d0d0d;color:#fff;padding:9px 16px;border-radius:18px;font-size:14px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:20;white-space:nowrap}\n#gp-app .gp-ts.on{opacity:1;transform:translate(-50%,0)}";document.head.appendChild(s);})();
