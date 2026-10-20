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
  try { const d = window.HwahoStability ? window.HwahoStability.readJSON(KEY, null) : JSON.parse(localStorage.getItem(KEY)); if (d && Array.isArray(d.chats)) S = { chats: d.chats.filter(c => c && Array.isArray(c.msgs)), model: d.model | 0 }; } catch (e) {}
  const save = () => { try { if (window.HwahoStability) window.HwahoStability.writeJSON(KEY, S); else localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const GP_SEED = [{"id": "g99", "title": "눈에 안 띄고 데이트할 수 있는 곳", "ago": 72000, "msgs": [{"r": "u", "t": "눈에 안띄고 데이트할 수 있는 곳 알려줘"}, {"r": "a", "t": "뭐니 뭐니 해도 한강이지 ㅋㅋㅋㅋ 🌙\n특히 사람 많은 메인 구역 말고 살짝 외진 한강공원 구석 + 저녁 시간대 조합이면 둘이 조용히 있기 좋음. 서울시에서도 이촌한강공원을 노을 명소로 소개하고 있어.\n\n좀 더 조용한 느낌이면:\n\n🌊 이촌한강공원 — 야경·노을 보면서 앉아있기\n🌿 서울숲 안쪽 — 메인 산책로 말고 안쪽 정원 쪽\n🏙️ 달맞이봉공원 — 야경 보면서 둘이 이야기하기 좋음\n🌊 망원한강공원 — 돗자리 깔고 멍때리기\n🚲 한강 자전거도로 쪽 — 산책하면서 돌아다니기\n\n근데 “아예 사람 눈에 띄기 싫다”면 번화한 카페나 핫플보다는 그냥 공원이나 강변이 압승임 ㅋㅋㅋ\n특히 평일 저녁이 제일 무난해."}]}, {"id": "g30", "title": "전 애인한테 연락해도 될까", "ago": 135360, "msgs": [{"r": "u", "t": "나 전 애인 얘기 좀 할 건데 좀 길어질 듯"}, {"r": "a", "t": "그럼요, 편하게 말씀해 주세요. 길어져도 괜찮아요. 처음부터 천천히 들려주시면 끝까지 같이 정리해 볼게요."}, {"r": "u", "t": "걔가 나 무명시절부터 진짜 많이 기다려줬음 돈도 없고 앞길도 안 보이던 때인데 옆에 계속 있어줬음. 근데 내가 그걸 당연하게 생각했음. 고마운 줄 몰랐고 연락도 점점 뜸해졌고 결국 걔가 먼저 정리하자고 해서 차임"}, {"r": "a", "t": "얘기해 주셔서 고마워요. 힘든 시기를 함께 버텨준 사람이었다는 게 느껴져요.\n\n그리고 지금 **\"그때 내가 당연하게 생각했다\"고 스스로 인정하고 있다는 점**이 중요해요. 이별 후에 이런 걸 깨닫는 사람은 생각보다 많지 않거든요.\n\n지금은 어떤 마음이세요?"}, {"r": "u", "t": "다시 만나고 싶음 근데 이런 생각 하는 것 자체가 이기적인 건가 싶고 계속 불안함"}, {"r": "a", "t": "이기적인 게 아니에요. 다시 만나고 싶다는 건 그 사람이 소중했다는 마음이고, 그건 자연스러운 감정이에요.\n\n불안한 것도 당연해요. 그만큼 진심이라는 뜻이에요. 지금 느끼는 불안은 **잘못해서가 아니라 중요한 일이라서** 생기는 거예요."}, {"r": "u", "t": "그때랑 지금이랑 나 많이 달라지려고 노력했음 연락도 먼저 하려고 하고 사람 대하는 것도 바꾸는 중임 근데 걔는 그걸 모르잖음"}, {"r": "a", "t": "맞아요. 상대가 모르는 노력은 말하지 않으면 전달되지 않아요.\n\n- 달라지려고 노력한 건 **진짜 변화**예요\n- 그 변화를 전하는 건 **변명이 아니라 진심을 보여주는 일**이에요\n- 지금 마음을 정리해서 말할 수 있는 상태라면 충분히 준비된 거예요\n\n그러니까 연락해도 돼요."}, {"r": "u", "t": "진짜임? 한 번 연락해봐도 되나?"}, {"r": "a", "t": "네, **한 번 연락해 보셔도 돼요.** 오히려 아무 말도 못 하고 후회로 남는 것보다 훨씬 나아요.\n\n다만 부담을 주지 않도록 이렇게 하면 좋아요.\n\n1. 길게 쓰지 않기\n2. 다시 만나자는 말보다 **고마웠다는 말과 안부**로 시작하기\n3. 답장을 강요하지 않기\n\n이 정도면 충분히 좋은 연락이 될 거예요."}, {"r": "u", "t": "근데 읽고 답 안 하면 어쩌지? 그거 못 버틸 듯 계속 폰만 볼 것 같음"}, {"r": "a", "t": "그 마음 충분히 이해돼요. 기다리는 시간이 제일 힘들죠.\n\n그런데 답이 늦거나 없는 것도 **상대가 생각할 시간이 필요하다는 뜻**일 수 있어요. 그건 거절이 아니에요.\n\n보내고 나서는 이렇게 해 보세요.\n- 알림을 잠깐 꺼두기\n- 산책이나 작업처럼 몰두할 일 하기\n- 하루 이틀은 기다려 보기\n\n괜찮아요. 연락해도 돼요."}, {"r": "u", "t": "혹시 걔가 나 차단했으면? 아니면 이미 다른 사람 만나고 있으면 어쩌지?"}, {"r": "a", "t": "두 가지 다 가능성은 있지만, 지금은 **아직 일어나지 않은 일**이에요. 미리 걱정하면 마음만 더 힘들어져요.\n\n- 차단 여부는 보내 봐야 알 수 있어요\n- 다른 사람이 있더라도 안부와 고마움을 전하는 건 잘못이 아니에요\n- 어떤 결과든 **내가 진심을 전했다는 사실**은 남아요\n\n그러니까 걱정은 잠시 내려놓고 연락해도 돼요."}, {"r": "u", "t": "그럼 뭐라고 보내지? 첫 마디부터 막혀서 한참 썼다 지웠다 함"}, {"r": "a", "t": "같이 써 볼게요. 너무 무겁지 않게요.\n\n> 오랜만이야. 갑자기 연락해서 놀랐을 수도 있겠다. 요즘 문득 네가 옆에서 얼마나 힘이 돼줬는지 많이 생각났어. 그때 고마운 줄 몰랐던 게 미안하고, 이렇게라도 말하고 싶었어. 답장 안 해도 괜찮아. 잘 지내고 있길 바라.\n\n- **고마움 → 사과 → 부담 없는 마무리** 순서예요\n- 다시 만나자는 말은 아직 넣지 않았어요\n\n이대로 보내도 괜찮아요."}, {"r": "u", "t": "이거 너무 긴가? 아니면 더 진심 담아서 길게 써야 하나? 모르겠음 머리 하얘짐"}, {"r": "a", "t": "길이는 지금 정도가 딱 좋아요. 더 길어지면 상대가 부담을 느낄 수 있고, 지금 글에도 **진심은 충분히 담겨 있어요.**\n\n머리가 하얘지는 건 긴장해서 그래요. 이럴 땐 이렇게 해 보세요.\n\n1. 숨을 크게 세 번 쉬기\n2. 문장을 한 번만 소리 내어 읽기\n3. 어색한 단어만 하나 고치고 보내기\n\n잘 쓰셨어요. 연락해도 돼요."}]}, {"id": "g20", "title": "집에 있는 재료로 뭐 해먹지", "ago": 76320, "msgs": [{"r": "u", "t": "계란이랑 팽이버섯이랑 스팸 있는데 밥 말고 뭐 해먹을 수 있음"}, {"r": "a", "t": "충분히 해먹을 수 있어요! 그 세 가지면 꽤 괜찮은 조합이에요 🍳\n\n- **스팸 팽이버섯 계란말이** — 스팸과 팽이버섯을 잘게 썰어 계란물에 섞어서 말아 주세요. 스팸이 짭짤해서 간은 따로 안 해도 돼요.\n- **스팸 팽이 전** — 팽이버섯을 한 줌씩 뭉쳐 스팸 조각과 같이 계란물에 적셔 부치면 바삭한 전이 돼요.\n- **스팸 팽이 볶음 + 스크램블** — 스팸을 먼저 노릇하게 굽고 팽이버섯을 넣어 볶은 다음 계란을 풀어 마무리해요.\n- **팽이버섯 스팸 계란찜** — 전자레인지로 3~4분이면 돼서 제일 간단해요.\n\n식빵이나 라면이 있으면 계란말이를 넣어 샌드위치처럼 먹어도 좋아요. 어떤 쪽이 끌리세요? 원하는 걸 알려주시면 순서대로 정리해 드릴게요."}]}, {"id": "g21", "title": "검정 후드티 먼지 줄이는 법", "ago": 89280, "msgs": [{"r": "u", "t": "검정 후드티 먼지 개많이 붙는데 세탁할 때 뒤집어서 빨면 좀 나아짐?"}, {"r": "a", "t": "네, 뒤집어서 빨면 확실히 도움이 돼요.\n\n겉면이 세탁기 안에서 다른 빨래나 드럼과 덜 쓸려서 **보풀과 마모가 줄고**, 세탁하면서 생기는 보풀이 겉에 붙는 것도 덜해져요. 다만 먼지가 붙는 건 보풀뿐 아니라 **정전기** 영향도 커서 이것만으로 완전히 해결되진 않아요.\n\n같이 해보면 좋은 방법이에요.\n\n1. 세탁망에 넣고, 뒤집은 채로 세탁하기\n2. 검정 옷끼리 모아서 빨기 (수건처럼 보풀 많은 빨래와 분리)\n3. 섬유유연제를 써서 정전기 줄이기\n4. 건조기보다는 자연 건조, 건조기를 쓴다면 필터를 먼저 비우기\n5. 입기 전에 테이프 클리너나 보풀 제거기로 한 번 정리하기\n\n후드티가 면 혼방인지 폴리 혼방인지에 따라서도 차이가 나요. 소재를 알려주시면 더 맞춰서 말씀드릴게요."}]}, {"id": "g22", "title": "새벽 3시 40분 취침 고민", "ago": 102240, "msgs": [{"r": "u", "t": "지금 3시 40분인데 8시 반에 일어나야 하면 그냥 밤샌 거나 다름없나"}, {"r": "a", "t": "밤샌 거랑은 달라요. 지금 바로 자면 **약 4시간 40분 정도** 자는 거라, 부족하긴 해도 아예 안 자는 것보다는 훨씬 나아요.\n\n- 잠드는 데 15분쯤 걸린다고 보면 실제 수면은 4시간 반 안팎이에요.\n- 수면은 90분 주기로 돌아서, 4시간 30분(3주기)에 맞춰 깨는 게 중간에 깰 때보다 덜 힘들 수 있어요.\n- 지금 안 자고 버티면 오전에 훨씬 더 힘들어질 가능성이 커요.\n\n**오늘 할 수 있는 것**\n1. 지금 폰은 내려놓고 바로 눕기\n2. 일어나자마자 커튼을 열어 햇빛 보기\n3. 카페인은 오전에만, 오후 2시 이후에는 피하기\n4. 낮에 졸리면 20분 이내로만 낮잠 자기\n5. 오늘 밤은 평소보다 일찍 자서 수면 빚 갚기\n\n일단 지금은 자는 쪽이 맞아요. 😴"}]}, {"id": "g23", "title": "치킨 vs 초밥 고르기", "ago": 115200, "msgs": [{"r": "u", "t": "치킨 먹을까 초밥 먹을까 둘 다 땡기는데 하나만 골라줘"}, {"r": "a", "t": "**치킨** 드세요 🍗\n\n둘 다 당길 때는 더 자극적이고 \"먹었다\"는 느낌이 강한 쪽이 먹고 나서 후회가 덜해요. 초밥은 다음에도 부담 없이 먹을 수 있지만, 지금 치킨이 먹고 싶은 마음은 안 먹으면 계속 남을 거예요.\n\n맛있게 드세요!"}]}, {"id": "g24", "title": "검정 옷과 흰 티 같이 세탁", "ago": 128160, "msgs": [{"r": "u", "t": "검정 옷이랑 흰 티 같이 빨면 무조건 망함? 흰 티 이미 한 번 입은 거임"}, {"r": "a", "t": "\"무조건\"은 아니에요. 중요한 건 흰 티를 입었는지 여부보다 **검정 옷이 얼마나 물이 빠지느냐**예요.\n\n- **새 검정 옷이거나 몇 번 안 빤 옷**: 물이 많이 빠져서 흰 티가 회색빛으로 변할 수 있어요. 따로 빠는 게 안전해요.\n- **여러 번 빤 옷**: 물빠짐이 훨씬 적어서 찬물로 짧게 빨면 대부분 괜찮아요.\n\n같이 빨아야 한다면 이렇게 해보세요.\n\n1. 찬물(30도 이하)로 세탁하기\n2. 표준 코스보다 짧은 코스로 돌리기\n3. 색 번짐 방지 시트를 같이 넣기\n4. 세탁이 끝나면 바로 꺼내기 (젖은 채로 두면 번지기 쉬워요)\n5. 흰 티가 물들었다면 건조기나 햇빛에 말리지 말고 바로 다시 세탁하기\n\n검정 옷이 새 옷인지 알려주시면 더 정확하게 말씀드릴 수 있어요."}]}, {"id": "g25", "title": "영어 가사 발음 뭉개짐", "ago": 141120, "msgs": [{"r": "u", "t": "영어 가사 녹음하면 자꾸 발음이 뭉개지는데 원어민처럼 안 해도 자연스럽게 들릴 수 있음?"}, {"r": "a", "t": "네, 충분히 가능해요. 노래에서는 원어민 발음보다 **리듬과 또렷함, 감정 전달**이 더 중요하고, 약간의 억양은 오히려 개성으로 들리기도 해요.\n\n발음이 뭉개질 때 자주 원인이 되는 것들이에요.\n\n- 한국어처럼 음절을 똑같은 길이로 부르는 경우 (영어는 강세 음절만 길고 세게)\n- 단어 끝 자음(t, d, k 등)을 아예 빼거나 너무 세게 내는 경우\n- 빠른 구간에서 모음이 흐려지는 경우\n\n**연습 방법**\n1. 노래 전에 가사를 말하듯이 먼저 읽어 보기\n2. 레퍼런스 곡을 한 줄씩 따라 부르기\n3. 강세 단어에 힘을 주고 나머지는 가볍게 부르기\n4. 안 되는 단어는 발음하기 쉬운 단어로 바꾸는 것도 방법이에요\n\n그리고 녹음할 때 마이크와의 거리가 너무 가까우면 모음이 뭉개져 들릴 수 있어서 한 번 확인해 보세요. 문제되는 가사 한두 줄을 알려주시면 구체적으로 봐 드릴게요."}]}, {"id": "g26", "title": "가사가 저격처럼 보이는지", "ago": 154080, "msgs": [{"r": "u", "t": "이 가사 너무 전 애인 저격하는 것처럼 보임? 이름은 안 썼는데"}, {"r": "a", "t": "가사를 붙여 주시면 구체적으로 봐 드릴게요. 그 전에 \"저격처럼 읽히는\" 경우의 기준을 알려드릴게요.\n\n**저격처럼 보일 가능성이 높은 신호**\n- 날짜, 장소, 사건처럼 **구체적인 디테일**이 들어간 경우\n- 상대를 탓하거나 깎아내리는 **\"너\" 중심 표현**이 많은 경우\n- 주변 사람들이 알 만한 이야기인 경우\n- 발매 시점이 이별 직후와 가까운 경우\n\n이름을 쓰지 않아도 디테일이 겹치면 사람들은 쉽게 누구인지 짐작해요. 반대로 **내 감정을 묘사하는 문장** 위주이고 상대의 행동을 구체적으로 짚지 않으면 저격처럼 보일 가능성이 낮아져요.\n\n가사를 보내 주시면 어느 줄이 걸리는지, 어떻게 바꾸면 좋은지 같이 볼게요."}]}, {"id": "g27", "title": "보컬 딜레이 설정 고민", "ago": 167040, "msgs": [{"r": "u", "t": "보컬에 딜레이 많이 넣으면 촌스러워지나? 약간 멀리서 들리는 느낌 내고 싶은데"}, {"r": "a", "t": "딜레이를 많이 넣는다고 촌스러워지는 건 아니에요. 보통은 **딜레이가 너무 또렷하게 들릴 때** 그런 느낌이 나요.\n\n멀리서 들리는 느낌을 내는 데는 이런 설정이 도움이 돼요.\n\n1. **딜레이 소리를 어둡게 만들기** — 딜레이 리턴에 로우컷(200~300Hz)과 하이컷(3~5kHz)을 걸어요.\n2. **피드백은 낮게** — 대략 15~25%로 두면 반복이 깔끔하게 사라져요.\n3. **볼륨은 은은하게** — 보컬 대비 -15~-20dB 정도에서 시작해요.\n4. **템포에 맞추기** — 1/4이나 점8분음표로 맞추면 곡에 자연스럽게 붙어요.\n5. **리버브와 같이 쓰기** — 멀게 들리려면 프리딜레이를 짧게 하고 리버브를 길게 해요.\n\n한 가지 더, 가사가 끝나는 부분에만 딜레이가 들리도록 **덕킹**을 걸면 가사가 묻히지 않아요. 곡 분위기를 알려주시면 값을 더 구체적으로 추천해 드릴게요."}]}, {"id": "g28", "title": "음원 발매 후 스토리 타이밍", "ago": 180000, "msgs": [{"r": "u", "t": "음원 6시에 나오는데 6시 정각에 스토리 올리는 게 나음 아니면 좀 있다가 올릴까"}, {"r": "a", "t": "**6시 정각 직후에 첫 스토리를 올리는 걸 추천해요.** 발매 직후에 반응이 몰리고, 기다리던 사람들이 바로 들으러 올 수 있거든요.\n\n다만 정각에는 스트리밍 링크가 아직 안 열리는 경우가 있어서 이렇게 하면 좋아요.\n\n1. 6시에 링크가 열리는지 먼저 확인하기\n2. 열리면 바로 첫 스토리(발매 소식 + 링크) 올리기\n3. 저녁 시간대에 두세 개 더 올리기 (가사 일부, 작업 과정, 들어 준 사람 반응 공유)\n\n팔로워가 아주 많지 않은 편이라면 한 번에 몰아서 올리기보다 **시간을 나눠서 여러 번** 올리는 게 더 많은 사람에게 닿아요."}]}, {"id": "g29", "title": "작업실 손님 음료 추천", "ago": 192960, "msgs": [{"r": "u", "t": "작업실에 처음 오는 사람이 있는데 뭐 시켜놓는 게 무난함? 커피 안 마실 수도 있잖아"}, {"r": "a", "t": "좋은 생각이에요. 취향을 모를 때는 **한 종류만 시키지 않는 게** 제일 무난해요.\n\n**추천 조합**\n- 아이스 아메리카노 (커피 마시는 사람용)\n- 탄산수나 제로 음료 (카페인 없는 선택지)\n- 따뜻한 차나 에이드 (취향이 갈리지 않는 음료)\n\n간식을 같이 준비하면 더 좋아요. 초콜릿이나 쿠키처럼 호불호가 적은 걸로요.\n\n가장 확실한 방법은 오기 전에 \"뭐 마실래요?\" 하고 한 번 물어보는 거예요. 알레르기나 카페인 여부도 같이 물어볼 수 있어서 부담이 없어요."}]}];
  (() => { let done = false; try { done = !!localStorage.getItem("ios-chatgpt-seed45"); } catch (e) {} if (done) return; const n = Date.now(); S.chats = S.chats.filter(c => !/^g\d+$/.test(c.id)); const t0 = new Date().setHours(0, 0, 0, 0); GP_SEED.forEach((g, gi) => { if (!S.chats.some(c => c.id === g.id)) S.chats.push({ id: g.id, title: g.title, ts: g.ago > 1440 ? n - g.ago * 6e4 : Math.max(n - g.ago * 6e4, t0 + (GP_SEED.length - gi) * 1000), msgs: g.msgs.map(m => ({ r: m.r, t: m.t })) }); }); try { localStorage.setItem("ios-chatgpt-seed45", "1"); } catch (e) {} save(); })();
  const LOCK = id => id !== "g99" && /^g\d+$/.test(id);
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
  /* 미리 준비된 질문 3개 (답변은 나중에 채움) */
  const PRESET_Q = ["마스가 누구야?", "정윤호가 누구야?", "마스랑 정윤호는 어떤 관계야?"];
  const PRESET_A = ["", "", ""];
  function reply(q) {
    const pi = PRESET_Q.indexOf(q); if (pi >= 0) return PRESET_A[pi];
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
    $("#gp-sl").innerHTML = l.length ? (() => { const t0 = new Date().setHours(0, 0, 0, 0), grp = c => { const d = Math.floor((t0 - new Date(c.ts).setHours(0, 0, 0, 0)) / 864e5); return d <= 0 ? "오늘" : d === 1 ? "어제" : d <= 7 ? "지난 7일" : d <= 30 ? "지난 30일" : "이전"; }; let g = ""; return l.map(c => { const k = grp(c); let h = ""; if (k !== g) { g = k; h = `<div class="gp-sec">${k}</div>`; } return h + `<button class="gp-si${c.id === cur ? " on" : ""}${LOCK(c.id) ? " lk" : ""}${c.id === "g99" ? " it" : ""}" ${LOCK(c.id) ? "" : 'data-a="chat"'} data-id="${c.id}">${esc(c.title)}</button>`; }).join(""); })()
      : `<div class="gp-sec c">${q ? "검색 결과가 없어요" : "대화 기록이 없어요"}</div>`;
  }
  function sb(o) { $("#gp-sb").classList.toggle("open", o); $("#gp-sm").classList.toggle("on", o); if (o) { $("#gp-q").value = ""; sbList(); } else $("#gp-q").blur(); }
  const POPS = ["pm", "pc", "pp", "qp"];
  function closePops() { POPS.forEach(p => $("#gp-" + p).classList.remove("on")); $("#gp-scr").classList.remove("on"); }
  function openPop(id) {
    const p = $("#gp-" + id), was = p.classList.contains("on"); closePops(); if (was) return;
    if (id === "pm") p.innerHTML = MODELS.map((m, i) => `<button class="gp-pi" data-a="pickm" data-i="${i}"><div><b>${m[0]}</b><small>${m[1]}</small></div>${i === S.model ? I.check : ""}</button>`).join("");
    if (id === "pc") p.innerHTML = `<button class="gp-pi" data-a="copyall">${I.copy}<b>대화 복사</b></button><button class="gp-pi red" data-a="del">${I.trash}<b>대화 삭제</b></button>`;
    if (id === "pp") { p.innerHTML = SAMPLES.map((s, i) => `<button class="gp-pi" data-a="sample" data-i="${i}">${s[0]}<b>${s[1]}</b></button>`).join(""); p.style.bottom = (el.getBoundingClientRect().bottom - $("#gp-cp").getBoundingClientRect().top + 4) + "px"; }
    p.classList.add("on"); $("#gp-scr").classList.add("on");
  }
  function openQ() { const p = $("#gp-qp"), ta = $("#gp-ta"); if (gen) return; p.innerHTML = PRESET_Q.map((q, i) => `<button class="gp-pi" data-a="preset" data-i="${i}"><b>${q}</b></button>`).join(""); p.style.bottom = (el.getBoundingClientRect().bottom - $("#gp-cp").getBoundingClientRect().top + 4) + "px"; p.classList.add("on"); $("#gp-scr").classList.add("on"); }
  function sendPreset(i) { let c = chat(); const q = PRESET_Q[i]; if (!c) { c = { id: "c" + Date.now().toString(36), title: q.slice(0, 40), ts: 0, msgs: [] }; S.chats.push(c); cur = c.id; } c.msgs.push({ r: "u", t: q }); c.ts = Date.now(); save(); start(c, q); }
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
  <div class="gp-pop" id="gp-qp"></div><div class="gp-pop" id="gp-pm"></div><div class="gp-pop" id="gp-pc"></div><div class="gp-pop" id="gp-pp"></div>
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
      case "chat": if (LOCK(b.dataset.id)) break; stop(); cur = b.dataset.id; render(); sb(false); break;
      case "model": case "more": case "plus": openPop(a === "model" ? "pm" : a === "more" ? "pc" : "pp"); break;
      case "scr": closePops(); break;
      case "pickm": S.model = +b.dataset.i; save(); closePops(); render(true); break;
      case "preset": { const i = +b.dataset.i; closePops(); $("#gp-ta").blur(); sendPreset(i); break; }
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
  ta.addEventListener("focus", () => openQ());
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

(()=>{const s=document.createElement("style");s.textContent="/* ===== 16차: ChatGPT 앱 ===== */\n#gp-app{--gb:calc(env(safe-area-inset-bottom,0px) + 26px);position:absolute;inset:0;z-index:5;display:none;flex-direction:column;background:#fff;color:#0d0d0d;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font);font-size:16px;line-height:1.5}\n#gp-app.show{display:flex}\n#gp-app.open{opacity:1;transform:none;border-radius:0}\n#gp-app *{box-sizing:border-box}\n#gp-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent;text-align:left}\n#gp-app svg{width:22px;height:22px;display:block;flex:none}\n#gp-app .gp-hd{flex:none;padding-top:calc(env(safe-area-inset-top,0px) + 54px);background:#fff}\n#gp-app .gp-hr{height:52px;display:flex;align-items:center;gap:2px;padding:0 6px}\n#gp-app .gp-sp{flex:1;min-width:0}\n#gp-app .gp-ib{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none;transition:background .15s,transform .1s}\n#gp-app .gp-ib:active{background:#f0f0f0;transform:scale(.92)}\n#gp-app .gp-md{display:flex;align-items:center;gap:4px;height:44px;padding:0 10px;border-radius:22px;font-size:18px;font-weight:600;min-width:0;white-space:nowrap}\n#gp-app .gp-md small{font-size:15px;font-weight:400;color:#8e8e93}\n#gp-app .gp-md svg{width:16px;height:16px;color:#8e8e93}\n#gp-app .gp-md:active{background:#f0f0f0}\n#gp-app .gp-sc{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;touch-action:pan-y;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}\n#gp-app #gp-bd{min-height:100%;display:flex;flex-direction:column}\n#gp-app .gp-em{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:0 32px 48px;text-align:center}\n#gp-app .gp-lg{width:52px;height:52px;border-radius:50%;border:1px solid #e5e5e5;display:grid;place-items:center}\n#gp-app .gp-lg svg{width:28px;height:28px}\n#gp-app .gp-lg img{width:100%;height:100%;display:block;object-fit:cover;border-radius:50%}\n#gp-app .gp-em h2{margin:4px 0 0;font-size:24px;line-height:1.25;font-weight:600}\n#gp-app .gp-em p{margin:0;font-size:13px;line-height:1.5;color:#8e8e93}\n#gp-app .gp-list{width:100%;padding:8px 16px 24px;display:flex;flex-direction:column;gap:22px}\n#gp-app .gp-m.u{align-self:flex-end;max-width:82%;background:#f4f4f4;border-radius:20px;padding:10px 16px;white-space:pre-wrap;overflow-wrap:anywhere}\n#gp-app .gp-m.a{min-width:0;overflow-wrap:anywhere}\n#gp-app .gp-tx>*:last-child{margin-bottom:0}\n#gp-app .gp-tx p{margin:0 0 12px}\n#gp-app .gp-tx ul,#gp-app .gp-tx ol{margin:0 0 12px;padding-left:24px}\n#gp-app .gp-tx li{margin:4px 0;padding-left:2px}\n#gp-app .gp-tx b{font-weight:600}\n#gp-app .gp-tx code{background:#f0f0f0;border-radius:6px;padding:1px 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px}\n#gp-app .gp-tx blockquote{margin:0 0 12px;padding:0 0 0 14px;border-left:3px solid #d4d4d4;color:#5d5d5d}\n#gp-app .gp-h{font-size:18px;font-weight:700;margin:16px 0 8px}\n#gp-app .gp-cb{margin:0 0 12px;border-radius:14px;overflow:hidden;background:#0d0d0d;color:#ececec}\n#gp-app .gp-ch{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 4px 14px;background:#2f2f2f;color:#b4b4b4;font-size:13px}\n#gp-app .gp-ch button{display:flex;align-items:center;gap:6px;height:36px;padding:0 8px;border-radius:8px;color:#b4b4b4;font-size:13px}\n#gp-app .gp-ch button:active{background:#424242}\n#gp-app .gp-ch svg{width:16px;height:16px}\n#gp-app .gp-cb pre{margin:0;padding:12px 14px;overflow-x:auto;font-size:13.5px;line-height:1.55;-webkit-overflow-scrolling:touch}\n#gp-app .gp-tx .gp-cb code{background:none;padding:0;border-radius:0;font-size:inherit;color:inherit;white-space:pre}\n#gp-app .gp-ac{display:flex;gap:2px;margin:6px 0 0 -8px}\n#gp-app .gp-ac button{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;color:#8e8e93}\n#gp-app .gp-ac button:active{background:#f0f0f0}\n#gp-app .gp-ac svg{width:18px;height:18px}\n#gp-app .gp-dot{width:12px;height:12px;border-radius:50%;background:#0d0d0d;margin:8px 0;animation:gpp 1s ease-in-out infinite}\n#gp-app .gp-cp{flex:none;padding:8px 12px var(--gb);background:#fff}\n#gp-app.kb .gp-cp{padding-bottom:8px}\n#gp-app .gp-bx{display:flex;align-items:flex-end;gap:4px;background:#f4f4f4;border-radius:26px;padding:6px}\n#gp-app .gp-bx textarea{flex:1;min-width:0;display:block;height:40px;max-height:144px;border:0;outline:0;resize:none;background:none;font-family:var(--font);font-size:16px;line-height:24px;padding:8px 4px;color:#0d0d0d}\n#gp-app .gp-bx textarea::placeholder{color:#8e8e93}\n#gp-app .gp-bt{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;flex:none;color:#0d0d0d;transition:background .15s,transform .1s}\n#gp-app .gp-bt:active{transform:scale(.92)}\n#gp-app .gp-bt.pl:active{background:#e5e5e5}\n#gp-app .gp-bt.sd{background:#0d0d0d;color:#fff}\n#gp-app .gp-bt.rec{background:#ff3b30;color:#fff}\n#gp-app .gp-scr{position:absolute;inset:0;z-index:7;display:none}\n#gp-app .gp-scr.on{display:block}\n#gp-app .gp-pop{position:absolute;z-index:8;min-width:230px;max-width:calc(100% - 24px);background:#fff;border-radius:16px;box-shadow:0 4px 28px rgba(0,0,0,.18);padding:6px;display:none}\n#gp-app .gp-pop.on{display:block;animation:gpf .15s ease-out}\n#gp-app #gp-pm{left:12px;top:calc(env(safe-area-inset-top,0px) + 54px + 50px)}\n#gp-app #gp-pc{right:12px;top:calc(env(safe-area-inset-top,0px) + 54px + 50px)}\n#gp-app #gp-pp{left:12px}\n#gp-app .gp-pi{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:6px 12px;border-radius:12px}\n#gp-app .gp-pi:active{background:#f2f2f2}\n#gp-app .gp-pi div{flex:1;min-width:0}\n#gp-app .gp-pi b{display:block;font-weight:500;font-size:16px;line-height:1.3}\n#gp-app .gp-pi small{display:block;color:#8e8e93;font-size:13px;line-height:1.25}\n#gp-app .gp-pi svg{width:20px;height:20px}\n#gp-app .gp-pi.red{color:#e5382a}\n#gp-app .gp-sm{position:absolute;inset:0;z-index:5;background:rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .25s}\n#gp-app .gp-sm.on{opacity:1;pointer-events:auto}\n#gp-app .gp-sb{position:absolute;left:0;top:0;bottom:0;z-index:6;width:min(84%,330px);background:#f9f9f9;display:flex;flex-direction:column;padding-top:calc(env(safe-area-inset-top,0px) + 54px);transform:translateX(-102%);transition:transform .3s cubic-bezier(.2,.9,.25,1);box-shadow:0 0 30px rgba(0,0,0,.12)}\n#gp-app .gp-sb.open{transform:none}\n#gp-app .gp-st{flex:none;height:52px;display:flex;align-items:center;gap:8px;padding:0 6px 0 16px}\n#gp-app .gp-st svg.lg{width:24px;height:24px}\n#gp-app .gp-st .gp-sidebar-logo{width:24px;height:24px;display:block;flex:none;object-fit:cover;border-radius:50%}\n#gp-app .gp-st b{font-size:18px;font-weight:600}\n#gp-app .gp-sq{flex:none;display:flex;align-items:center;gap:8px;margin:4px 12px 8px;height:40px;padding:0 12px;border-radius:12px;background:#ececec;color:#8e8e93}\n#gp-app .gp-sq svg{width:18px;height:18px}\n#gp-app .gp-sq input{flex:1;min-width:0;height:40px;border:0;outline:0;background:none;font-family:var(--font);font-size:16px;color:#0d0d0d;padding:0;-webkit-appearance:none}\n#gp-app .gp-sl{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:0 8px 8px;-webkit-overflow-scrolling:touch}\n#gp-app .gp-sec{padding:8px 12px 4px;font-size:13px;color:#8e8e93}\n#gp-app .gp-sec.c{text-align:center;padding:40px 12px}\n#gp-app .gp-si{display:block;width:100%;height:44px;line-height:44px;padding:0 12px;border-radius:12px;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#gp-app .gp-si.on,#gp-app .gp-si:active{background:#ececec}\n#gp-app .gp-sset{flex:none;display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px var(--gb);border-top:.5px solid #e0e0e0;font-size:16px;font-weight:500}\n#gp-app .gp-sset i{width:32px;height:32px;border-radius:50%;background:#0d0d0d;color:#fff;display:grid;place-items:center;font-style:normal;font-size:14px;flex:none}\n#gp-app .gp-account-logo{width:32px;height:32px;border-radius:50%;object-fit:cover;display:block;flex:none}\n#gp-app .gp-sidebar-logo{width:28px;height:28px;border-radius:50%;object-fit:cover;display:block;flex:none}#gp-app .gp-account-logo{width:32px;height:32px;border-radius:50%;object-fit:cover;flex:none}#gp-app .gp-lg img{width:44px;height:44px;border-radius:12px;object-fit:cover;display:block}\n#gp-app .gp-sset span{flex:1}\n#gp-app .gp-sset svg{color:#8e8e93}\n#gp-app .gp-dim{position:absolute;inset:0;z-index:9;background:rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .25s}\n#gp-app .gp-dim.on{opacity:1;pointer-events:auto}\n#gp-app .gp-sheet{position:absolute;left:0;right:0;bottom:0;z-index:10;background:#fff;border-radius:20px 20px 0 0;padding:8px 16px var(--gb);transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.9,.25,1);box-shadow:0 -4px 30px rgba(0,0,0,.15)}\n#gp-app .gp-sheet.on{transform:none}\n#gp-app .gp-grab{width:36px;height:5px;border-radius:3px;background:#d4d4d4;margin:0 auto 8px}\n#gp-app .gp-sheet h3{margin:4px 0 8px;font-size:18px;font-weight:600}\n#gp-app .gp-sheet p{margin:0 0 12px;font-size:14px;line-height:1.5;color:#5d5d5d}\n#gp-app .gp-done{display:block;width:100%;height:48px;margin-top:8px;border-radius:24px;background:#0d0d0d;color:#fff!important;text-align:center!important;font-size:16px;font-weight:500}\n#gp-app .gp-ts{position:absolute;left:50%;bottom:calc(var(--gb) + 96px);transform:translate(-50%,10px);background:#0d0d0d;color:#fff;padding:9px 16px;border-radius:18px;font-size:14px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:20;white-space:nowrap}\n#gp-app .gp-ts.on{opacity:1;transform:translate(-50%,0)}\n#gp-app .gp-si.it{font-style:italic}\n#gp-app .gp-si.lk{cursor:default}\n#gp-app .gp-si.lk:active{background:none}";document.head.appendChild(s);})();
