/* ===== imessage.js (integrated) ===== */
/* ===== 메시지 앱 (iMessage) ===== */
const MessagesApp = (() => {
  const $ = s => document.querySelector(s), el = $("#msg-app"), screen = $("#screen");
  const ic = p => `<svg viewBox="0 0 24 24">${p}</svg>`;
  const I = {
    compose: ic('<path d="M12 5H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-5"/><path d="M17.500 3.500a1.800 1.800 0 0 1 2.600 2.600L11 15.200 7.500 16.500 8.800 13z"/>'),
    search: ic('<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500l5 5"/>'),
    back: ic('<path d="M15 5l-7 7 7 7"/>'), info: ic('<circle cx="12" cy="12" r="9.500"/><path d="M12 11v6M12 7.500v.1"/>'),
    plus: ic('<path d="M12 5v14M5 12h14"/>'), up: ic('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  };
  const CONTACTS = ["철수","민기","홍중","엄마","아빠","동생 하은","레도형","이실장님","박대표님","강PD","승호형(믹싱)","한감독님","소율 누나","정팀장님","쇼미 김작가님","도현","지안","세준(사진)"];
  const REPLIES = ["ㅋㅋㅋ 그래","오 좋아!","잠깐만, 이따 다시 연락할게","알겠어 👍","진짜? 대박","지금 뭐해?","나중에 밥 먹자","확인했어, 고마워"];
  const CL = () => (window.PhoneData ? PhoneData.names() : CONTACTS), KEY = "ios-msgs-v4", uid = () => Math.random().toString(36).slice(2, 9);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let convs = [];
  try { convs = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
  const SEED_KEY = "ios-msgs-seed37", H = 60, D = 1440;
  const seedConvs = () => {
    const n = Date.now(), mk = (name, kind, unread, arr) => ({ id: uid(), name, kind, unread, msgs: arr.map(([me, text, ago]) => ({ id: uid(), me, text, ts: n - Math.round(ago * 6e4) })) });
    return [
      mk("이실장님", "", true, [[0, "형 오늘 화보 2시까지 성수 스튜디오예요. 헤어메이크업은 1시 시작", 190],[1, "넵 12시 50분까지 갈게요", 180],[0, "소율 누나가 의상 두 벌 더 챙겨왔대요. 비니는 형 걸로 쓰셔도 돼요", 140],[0, "아 그리고 10/14 합동 공연 대기실 시간표 나왔어요. 리허설 5시 반", 25],[0, "끝나고 인터뷰 질문지도 같이 보내드릴게요", 24]]),
      mk("박대표님", "", false, [[0, "1주차 음원 성적 보고 있는데 실시간 차트 계속 올라가네. 수고했다", 1800],[1, "감사합니다 대표님! 다 형들 덕분이에요", 1790],[0, "다음 주 정산 미팅 때 후속곡 얘기도 하자. 11/20 발매로 가닥 잡았어", 1680],[1, "넵 그때 뵙겠습니다 🙏", 1675]]),
      mk("강PD", "", true, [[0, "후속곡 비트 새로 만들었음. 808 좀 세게 눌렀어 들어봐", 3060],[1, "와 이거 미쳤는데요 형 훅에 샘플 얹어도 되나요", 3000],[0, "ㅇㅇ 클리어런스 되는 걸로 찾아보자 일단 가이드 녹음해와", 2940],[1, "내일 저녁에 작업실 갈게요", 2880],[0, "오케이 믹스는 승호한테 말해놓을게", 2870],[0, "참 11/4 녹음은 오후 2시로 잡아놨다", 240]]),
      mk("승호형(믹싱)", "", false, [[0, "후속곡 믹스 v2 올렸어 확인해봐. 보컬 에어감 조금 올리고 킥은 낮췄음", 1560],[1, "v2 좋아요! 2절 애드립만 조금 더 앞으로 땡겨주실 수 있나요", 1500],[0, "ㅇㅋ 수정해서 v3 오늘 중으로 줄게", 1470],[0, "v3 올렸다 이게 최종이면 좋겠다 ㅋㅋ", 180]]),
      mk("한감독님", "", false, [[0, "후속곡 MV 콘티 보냈어요. 11/18 촬영 장소 후보 두 군데 봤는데 지하 주차장이랑 폐공장이요", 4320],[1, "폐공장이 더 분위기 있을 듯요 ㅋㅋ 조명은 어떻게 가요?", 4300],[0, "네온 톤으로 가고 로케이션 헌팅은 다음 주에 같이 가요", 4280],[1, "좋습니다 감독님 믿고 갑니다 🔥", 4275]]),
      mk("소율 누나", "", false, [[0, "화보 의상 협찬 들어왔어 브랜드에서 오버핏 레더 자켓 보내준대", 1980],[1, "헉 대박 누나 사이즈 L이요", 1950],[0, "오버핏 레더 자켓이랑 와이드 데님 두 벌 준비했어. 신발은 270 맞지?", 1935],[1, "ㅇㅇ 265요", 1925],[0, "ㅇㅋ 내일 퀵으로 와. 안경은 네 거 써도 돼 ㅋㅋ", 1920]]),
      mk("정팀장님", "", false, [[0, "10/22 클럽 게스트 공연 페이 건 확인했습니다. 선입금 이번 주 안에 나갈 거예요", 3180],[1, "넵 감사합니다 세트리스트 20분 맞춰서 보내드릴게요", 3120],[0, "혹시 신곡 라이브 먼저 해주실 수 있나요? 현장 반응 보려구요", 1920],[1, "좋아요 후속곡 선공개 가볍게 하겠습니다 🔥", 1860]]),
      mk("쇼미 김작가님", "", false, [[0, "안녕하세요 쇼미 작가 김○○입니다. 다음 시즌 관련해서 미팅 요청드려요", 7200],[1, "안녕하세요! 연락 감사합니다. 매니저님 통해 일정 잡겠습니다", 7170],[0, "넵 이실장님께 따로 연락드렸어요. 시간 되실 때 편하게 답 주세요 :)", 7155]]),
      mk("지안", "", true, [[0, "오빠 피처링 버전 들어봤어? 후렴에 코러스 하나 더 쌓았어", 380],[1, "방금 들었어 소름 돋음 ㅋㅋ 이대로 가자", 360],[0, "진짜? 다행이다 ㅠㅠ 라이브 때도 불러줄게", 330],[0, "연습실 시간 정해지면 알려줘!", 300]]),
      mk("민기", "", true, [[0, "야 엠카 무대 봤다 ㅋㅋㅋ 쟤 누구야 내 친구 아닌데", 3060],[1, "ㅋㅋㅋㅋ 긴장해서 가사 한 줄 날릴 뻔했음", 3055],[0, "티 안 났어. 축하주 한잔 하자", 3000],[1, "토요일 홍중이도 부르자", 2990],[0, "이미 불렀음 ㅋㅋ 7시 우리 동네 고깃집", 2930]]),
      mk("철수", "", false, [[0, "야 신혼여행 다녀왔다 ㅋㅋㅋ 선물 사옴", 7200],[1, "오 미친 ㅋㅋㅋ 뭔데 뭔데", 7197],[0, "와서 봐라 임마 ㅋㅋ 토요일 되냐", 7194],[1, "ㅇㅇ 토요일 ㄱㄱ 와이프님도 데려와", 7192],[0, "ㅇㅋ ㅋㅋ 아 맞다 야 앨범 다 들었다 3번 트랙 계속 반복 중임", 2872],[1, "ㅋㅋㅋㅋ 고맙다 임마", 2842]]),
      mk("홍중", "", true, [[0, "야 성화 오늘 작업실 ㄱ?", 6120],[1, "ㅇㅇ 몇 시", 6117],[0, "나 3시쯤 도착할 듯. 강PD 새 비트 보냈더라", 6115],[1, "오 들어봤어? 나 아직 못 들음", 6111],[0, "후렴이 좀 쎄 ㅋㅋ 네 플로우에 딱일 듯", 6109],[0, "어제 늦게까지 고생했다 ㅋㅋ", 4920],[0, "훅 녹음본 아침에 다시 들어봤는데 2절 브릿지 진짜 좋음", 4915],[1, "그치? 근데 마지막 바 라임 좀 억지 같지 않아?", 4909],[0, "ㅇㅇ 나도 걸렸음 오늘 다시 써보자", 4906],[1, "ㅇㅋ 저녁에 국밥 먹고 시작하자", 4902],[0, "나 미용실 갔다가 좀 늦게 감", 3360],[1, "ㅋㅋㅋ 머리 또 바꿈?", 3355],[0, "쇼미 때 그 색 다시 해보려고 ㅋㅋ", 3353],[1, "아 인터뷰에서 우리 팀 된 계기 물어보더라", 3323],[0, "ㅋㅋㅋ 뭐라고 답할 건데", 3319],[1, "네가 나 골라가서 된 거라고 해야지", 3318],[0, "11/7 내 생일 안 잊었지?", 1980],[1, "ㅋㅋㅋ 이미 캘린더에 박아놨다", 1970],[0, "선물은 신곡 선공개로 대체 가능 ㅋㅋ", 1968],[0, "야 공연 리허설 시간 나옴?", 300],[1, "5시 반이래 이실장님이 보냄", 297],[0, "ㅇㅋ 대기실에서 보자", 295],[1, "합동 무대 신곡 먼저 하고 쇼미 때 곡 마지막으로 할까?", 291],[0, "오 좋은데? 마지막에 터질 듯 ㅋㅋ", 289]]),
      mk("레도형", "", false, [[0, "앨범 잘 들었다. 후배들 중에 제일 기대되는 건 너야. 근데 너무 빨리 달리지는 마", 4620],[1, "형 감사합니다 진짜 힘 나네요. 시간 되면 밥 한번 사주세요 ㅋㅋ", 4560],[0, "당연하지. 공연 끝나고 연락해라", 4500]]),
      mk("엄마", "", false, [[0, "아들 밥은 챙겨 먹고 다니니? 엄마 친구가 네 노래 나온다고 보내줬어 ㅎㅎ", 5040],[1, "챙겨 먹지~ 이번 주말에 집 갈게", 5015],[0, "그래 오면 갈비찜 해놓을게", 5012],[0, "김치도 보냈다 택배 확인해", 2132],[1, "응 고마워 엄마", 2042],[0, "사랑해 우리 아들 ❤️", 602]]),
      mk("아빠", "", false, [[0, "앨범 들어봤다. 가사는 잘 모르겠지만 목소리 좋더라. 건강 챙겨라", 3360],[1, "고마워요 아빠 ㅎㅎ 다음에 공연 오세요", 3300],[0, "그래 시간 되면 가마. 엄마랑 같이 가야겠다", 3270]]),
      mk("동생 하은", "", false, [[0, "오빠 사인 앨범 친구들이 부탁함 ㅠㅠ 5장만", 1620],[1, "ㅋㅋㅋ 집 가면 해줄게", 1560],[0, "학교에서 오빠 노래 틀었는데 애들이 다 따라 부름 ㅋㅋ", 1550],[1, "진짜? ㅋㅋㅋ 쪽팔리겠다", 1547],[0, "이번 주 집 와? 엄마가 갈비찜 한대", 107]]),
      mk("도현", "", false, [[0, "야 너 요즘 막 뜬다며? 우리 반 단톡에서 난리났음", 5760],[1, "ㅋㅋㅋ 아직 멀었다 밥 한번 먹자", 5745],[0, "ㅇㅋ 내가 쏜다. 금요일 7시 학교 앞에서 보자", 5742],[1, "학교 앞 그 칼국수집 아직 있냐", 5734],[0, "ㅇㅇ 아직 있음 사장님도 그대로", 5733]]),
      mk("세준(사진)", "", false, [[0, "앨범 아트웍 보정본 보냈어. 컬러 톤 확인해줘", 7320],[1, "헐 톤 너무 좋아요 이대로 가시죠 형", 7260],[0, "ㅇㅋ 그럼 이걸로 최종 넘길게", 7200]]),
      mk("KB국민은행", "svc", false, [[0, "[KB국민은행] 입금 3,200,000원 / 잔액 5,481,300원 / 보낸분: 스튜디오 정산", 3000],[0, "[KB국민은행] 입금 1,800,000원 / 잔액 7,281,300원 / 보낸분: 공연 선입금", 330]]),
      mk("한국음악저작권협회", "svc", false, [[0, "[한국음악저작권협회] 저작권료 분배 내역이 확정되었습니다. 회원 홈페이지에서 확인해 주세요.", 4380]]),
      mk("YouTube", "svc", true, [[0, "[YouTube] 새로 올린 MV가 조회수 100만을 돌파했어요. 축하합니다!", 540]]),
      mk("팬카페 운영팀", "svc", false, [[0, "[팬카페] 10/18 팬 이벤트 응모가 마감되었습니다. 총 1,240명이 신청했어요.", 1680]]),
      mk("멜론티켓", "svc", false, [[0, "[멜론티켓] 10/14 합동 공연 게스트 초대권 2매가 등록되었습니다.", 3240],[0, "[멜론티켓] 공연 전날 등록 내역을 확인해 주세요. 신분증 지참 후 현장 수령 가능합니다.", 2400]]),
      mk("CJ대한통운", "svc", false, [[0, "[CJ대한통운] 고객님의 상품을 접수하였습니다. 보내시는 분: 사운드웨어 / 운송장 6512 3487 0021", 3360],[0, "[CJ대한통운] 상품이 대전HUB에 도착했습니다. 내일 중 배송 예정입니다.", 1740],[0, "[CJ대한통운] 오늘 배송 예정입니다. 배송기사: 김태식 (010-5527-3309) 오전 중 방문 예정입니다.", 380],[0, "[CJ대한통운] 상품이 문 앞에 배송되었습니다. 배송 완료 사진을 확인해 주세요.", 135]]),
      mk("쿠팡", "svc", true, [[0, "[쿠팡] 주문이 접수되었습니다. 주문번호 30000-48271 / 마이크 팝필터 외 1건", 3060],[0, "[쿠팡] 결제가 완료되었습니다. 결제금액 18,900원", 3059],[0, "[쿠팡] 로켓배송 상품이 문 앞에 도착했어요. 도착 사진을 확인해보세요.", 540]]),
      mk("무신사", "svc", false, [[0, "[무신사] 주문이 접수되었습니다. 오버핏 후드집업(그레이/L) 59,000원", 8640],[0, "[무신사] 상품이 발송되었습니다.", 7440],[0, "[무신사] 교환 상품 검수가 완료되어 재발송 처리되었습니다.", 3000]]),
      mk("카카오", "svc", false, [[0, "[카카오] 인증번호 [482913]를 입력해 주세요. 타인에게 절대 알려주지 마세요.", 185],[0, "[카카오] 새로운 기기에서 로그인되었습니다. 본인이 아니라면 비밀번호를 변경해 주세요.", 182]]),
      mk("네이버", "svc", false, [[0, "[네이버] 인증번호 [071655] 타인에게 알려주지 마세요.", 3420]]),
      mk("KB국민카드", "svc", false, [[0, "[KB국민카드] 9월 청구금액 486,200원이 10/14 결제 예정입니다. 결제 계좌 잔액을 확인해 주세요.", 10080],[0, "[KB국민카드] 승인 5,800원 일시불 스타벅스 성수역점 누적 377,800원", 8760],[0, "[KB국민카드] 승인 4,300원 일시불 GS25 성수스튜디오점 누적 382,100원", 8640],[0, "[KB국민카드] 승인 14,500원 일시불 배달의민족 (국밥) 누적 396,600원", 7740],[0, "[KB국민카드] 승인 12,800원 일시불 카카오T 택시 누적 409,400원", 7440],[0, "[KB국민카드] 승인 59,000원 일시불 무신사 누적 468,400원", 7200],[0, "[KB국민카드] 승인 23,700원 일시불 올리브영 성수점 누적 492,100원", 6360],[0, "[KB국민카드] 승인 9,800원 일시불 맥도날드 성수점 누적 501,900원", 5940],[0, "[KB국민카드] 승인 11,600원 일시불 스타벅스 성수역점 누적 513,500원", 4800],[0, "[KB국민카드] 승인 18,900원 일시불 쿠팡 누적 532,400원", 4500],[0, "[KB국민카드] 승인 142,000원 일시불 고깃집 성수 (5명) 누적 674,400원", 4320],[0, "[KB국민카드] 승인 6,200원 일시불 GS25 성수스튜디오점 누적 680,600원", 3420],[0, "[KB국민카드] 승인 8,900원 일시불 서브웨이 성수역점 누적 689,500원", 3120],[0, "[KB국민카드] 승인 15,600원 일시불 카카오T 택시 누적 705,100원", 2880],[0, "[KB국민카드] 승인 3,400원 일시불 이마트24 성수점 누적 708,500원", 2280],[0, "[KB국민카드] 승인 9,700원 일시불 스타벅스 성수역점 누적 718,200원", 1920],[0, "[KB국민카드] 승인 21,500원 일시불 배달의민족 (치킨) 누적 739,700원", 1560],[0, "[KB국민카드] 승인 12,400원 일시불 스타벅스 성수역점 누적 752,100원", 310],[0, "[KB국민카드] 승인 3,500원 일시불 GS25 성수스튜디오점 누적 755,600원", 160]]),
      mk("다온피부과", "svc", false, [[0, "[다온피부과] 예약이 완료되었습니다. 10/14(수) 오후 4:30 진료 예정입니다.", 2940]]),
      mk("올리브영", "spam", false, [[0, "(광고) 올리브영 가을 세일 최대 70% 오늘 단 하루! 지금 앱에서 확인하세요. 무료수신거부 080-8827-110", 1860]]),
      mk("010-4829-7731", "spam", false, [[0, "[국제발신] 고객님 택배 주소 불일치로 반송 예정입니다. 주소 재확인: han-bae.top/a8Kd", 3000]]),
      mk("1588-0271", "spam", false, [[0, "[Web발신] 축하합니다!! 갤럭시 S26 경품 이벤트에 당첨되셨습니다. 수령 신청 → bit-lyy.kr/gift7 (24시간 내 미신청 시 소멸)", 4860]]),
      mk("070-7743-0816", "spam", false, [[0, "엄마야 폰 액정 깨져서 임시폰으로 문자해 ㅠㅠ 급하게 부탁할 게 있는데 이 번호로 톡 줄 수 있어?", 2100]]),
    ];
  };
  if (!convs.length) convs = seedConvs();
  else if (!localStorage.getItem(SEED_KEY)) convs = convs.concat(seedConvs().filter(s => !convs.some(c => c.name === s.name)));
  try { localStorage.setItem(SEED_KEY, "1"); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(convs)); } catch (e) {} };
  const last = c => c.msgs[c.msgs.length - 1];
  const sorted = () => convs.slice().sort((a, b) => (last(b)?.ts || b.created || 0) - (last(a)?.ts || a.created || 0));
  const find = id => convs.find(c => c.id === id);
  const av = (n, k) => `<div class="ms-av${k ? " " + k : ""}" style="position:relative;overflow:hidden">${k === "spam" ? "!" : esc(n.trim()[0] || "?")}${k !== "spam" && window.HwahoIdentity ? window.HwahoIdentity.avatarMarkup(n) : ""}</div>`;
  const pad = n => String(n).padStart(2, "0");
  function ftime(ts) {
    const d = new Date(ts), n = new Date(), d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate()), n0 = new Date(n.getFullYear(), n.getMonth(), n.getDate()), diff = Math.round((n0 - d0) / 864e5);
    const t = `${d.getHours() < 12 ? "오전" : "오후"} ${d.getHours() % 12 || 12}:${pad(d.getMinutes())}`;
    return diff <= 0 ? t : diff === 1 ? "어제" : diff < 7 ? "월화수목금토일".split("")[(d.getDay() + 6) % 7] + "요일" : `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
  }
  const full = ts => { const d = new Date(ts); return ftime(ts).length > 6 && !/^오/.test(ftime(ts)) ? `${ftime(ts)} ${d.getHours() < 12 ? "오전" : "오후"} ${d.getHours() % 12 || 12}:${pad(d.getMinutes())}` : ftime(ts); };

  el.innerHTML = `<div class="ms-v" id="ms-list"><div class="ms-bar"><span></span><button class="ms-blue" data-m="new" aria-label="새 메시지">${I.compose}</button></div><div class="ms-title">메시지</div><div class="ms-search">${I.search}<input id="ms-q" placeholder="검색" autocomplete="off"></div><div class="ms-rows" id="ms-rows"></div></div>
<div class="ms-v" id="ms-thread"><div class="ms-th"><button class="ms-blue ms-back" data-m="back">${I.back}<span id="ms-bc"></span></button><div class="ms-hc" id="ms-hc"></div><button class="ms-blue" data-m="info" aria-label="세부 정보">${I.info}</button></div><div class="ms-body" id="ms-body"></div>
<div class="ms-comp"><button class="ms-plus" data-m="attach" aria-label="첨부">${I.plus}</button><div class="ms-inwrap"><div class="ms-pend" id="ms-pend"></div><div class="ms-ir"><textarea id="ms-in" rows="1" placeholder="iMessage"></textarea><button class="ms-send" id="ms-send" data-m="send" aria-label="전송">${I.up}</button></div></div></div></div>
<div class="ms-v" id="ms-new"><div class="ms-nh"><span style="width:50px"></span><span>새로운 iMessage</span><button class="ms-blue" data-m="ncancel" style="font-weight:400">취소</button></div><div class="ms-to"><b>받는 사람:</b><input id="ms-to" autocomplete="off"></div><div class="ms-nl" id="ms-nl"></div></div>
<div class="ms-sheet-back" id="ms-sb" data-m="sheetx"></div><div class="ms-sheet" id="ms-sheet"></div>`;
  const rows = $("#ms-rows"), body = $("#ms-body"), inp = $("#ms-in"), send = $("#ms-send"), sheet = $("#ms-sheet"), sb = $("#ms-sb");
  let cur = null, pend = [];

  function renderList() {
    const q = $("#ms-q").value.trim().toLowerCase();
    const l = sorted().filter(c => !q || c.name.toLowerCase().includes(q) || c.msgs.some(m => (m.text || "").toLowerCase().includes(q)));
    rows.innerHTML = l.length ? l.map(c => { const m = last(c); return `<button class="ms-row" data-m="open" data-id="${c.id}"><i class="ms-dot${c.unread ? " on" : ""}"></i>${av(c.name, c.kind)}<div class="ms-rb"><div class="ms-r1"><span class="ms-nm">${esc(c.name)}</span><span class="ms-tm">${m ? ftime(m.ts) : ""}</span></div><div class="ms-pv">${m ? (m.img && !m.text ? "사진" : esc(m.text)) : "&nbsp;"}</div></div></button>`; }).join("") : `<div class="ms-empty">${q ? "검색 결과 없음" : "대화가 없습니다"}</div>`;
  }
  function bubble(m, i, ms) {
    const p = ms[i - 1], n = ms[i + 1], same = p && p.me === m.me && m.ts - p.ts < 36e5, tail = !(n && n.me === m.me && n.ts - m.ts < 36e5);
    let h = !p || m.ts - p.ts >= 36e5 ? `<div class="ms-ts">${full(m.ts)}</div>` : "";
    const cls = `ms-b ${m.me ? "me" : "th"}${same ? " g" : ""}${tail ? " tail" : ""}`;
    if (m.img) h += `<div class="ms-b ${m.me ? "me" : "th"} im${same ? " g" : ""}"><img src="${m.img}" alt=""></div>`;
    if (m.text) h += `<div class="${cls}">${esc(m.text)}</div>`;
    return h;
  }
  function renderThread() {
    const c = cur; body.innerHTML = c.msgs.map((m, i) => bubble(m, i, c.msgs)).join("") + (last(c)?.me ? `<div class="ms-dl">전달됨</div>` : "");
    body.scrollTop = body.scrollHeight;
  }
  const unreadCount = () => convs.filter(c => c.unread && (!cur || c.id !== cur.id)).length;
  function openConv(id) {
    cur = find(id); cur.unread = false; save();
    $("#ms-hc").innerHTML = `${av(cur.name, cur.kind)}<span>${esc(cur.name)}</span>`;
    $("#ms-bc").textContent = unreadCount() || "";
    pend = []; renderPend(); inp.placeholder = cur.kind ? "문자 메시지" : "iMessage"; inp.value = ""; autosize(); renderThread();
    $("#ms-thread").classList.add("on"); $("#ms-list").classList.add("back");
  }
  function back() { $("#ms-thread").classList.remove("on"); $("#ms-list").classList.remove("back"); inp.blur(); cur = null; renderList(); }
  function autosize() { inp.style.height = "22px"; inp.style.height = Math.min(inp.scrollHeight, 110) + "px"; send.classList.toggle("on", !!inp.value.trim() || pend.length > 0); }
  function renderPend() { $("#ms-pend").innerHTML = pend.map((p, i) => `<div style="background-image:url(${p})"><button data-m="rmpend" data-i="${i}">×</button></div>`).join(""); autosize(); }
  inp.addEventListener("input", autosize);
  inp.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); doSend(); } });

  function doSend() {
    const text = inp.value.trim(); if (!cur || (!text && !pend.length)) return;
    const c = cur, ts = Date.now();
    pend.forEach(img => c.msgs.push({ id: uid(), me: 1, img, ts }));
    if (text) c.msgs.push({ id: uid(), me: 1, text, ts });
    pend = []; renderPend(); inp.value = ""; autosize(); save(); renderThread();
    if (c.kind) return;
    setTimeout(() => {
      c.msgs.push({ id: uid(), me: 0, text: REPLIES[Math.floor(Math.random() * REPLIES.length)], ts: Date.now() });
      if (!cur || cur.id !== c.id) c.unread = true;
      save(); if (cur && cur.id === c.id) renderThread(); else renderList();
    }, 1500 + Math.random() * 1500);
  }

  /* 새 대화 */
  function renderNew() {
    const q = $("#ms-to").value.trim(), l = CL().filter(n => n.includes(q));
    let h = q && !CL().includes(q) ? `<button class="ms-row" data-m="start" data-n="${esc(q)}" style="padding:10px 16px">${av(q)}<div class="ms-rb" style="border:0"><span class="ms-nm">‘${esc(q)}’에게 보내기</span></div></button>` : "";
    h += l.map(n => `<button class="ms-row" data-m="start" data-n="${esc(n)}" style="padding:0 16px 0 16px">${av(n)}<div class="ms-rb"><span class="ms-nm">${esc(n)}</span></div></button>`).join("");
    $("#ms-nl").innerHTML = h || `<div class="ms-empty">연락처 없음</div>`;
  }
  $("#ms-to").addEventListener("input", renderNew);
  $("#ms-to").addEventListener("keydown", e => { if (e.key === "Enter") { const q = e.target.value.trim(), f = CL().filter(n => n.includes(q))[0] || q; if (f) startConv(f); } });
  function startConv(name) {
    let c = convs.find(x => x.name === name);
    if (!c) { c = { id: uid(), name, unread: false, msgs: [], created: Date.now() }; convs.push(c); save(); }
    $("#ms-new").classList.remove("on"); openConv(c.id); setTimeout(() => inp.focus(), 350);
  }
  $("#ms-q").addEventListener("input", renderList);

  /* 시트: 첨부 / 정보 */
  const openSheet = h => { sheet.innerHTML = h; sheet.classList.add("on"); sb.classList.add("on"); };
  const closeSheet = () => { sheet.classList.remove("on"); sb.classList.remove("on"); sheet.innerHTML = ""; };
  async function attach() {
    const all = (await Media.all()).filter(i => i.type === "photo").sort((a, b) => b.ts - a.ts);
    if (!all.length) { openSheet(`<div class="ms-sh"><span></span><b>사진</b><button class="ms-blue" data-m="sheetx">닫기</button></div><div class="ms-empty">사진이 없습니다.<br>카메라 앱으로 사진을 촬영하세요.</div>`); return; }
    const urls = all.map(a => URL.createObjectURL(a.thumb));
    openSheet(`<div class="ms-sh"><span></span><b>사진</b><button class="ms-blue" data-m="sheetx">취소</button></div><div class="ms-pg">${all.map((a, i) => `<button data-m="pick" data-id="${a.id}" style="background-image:url(${urls[i]})"></button>`).join("")}</div>`);
  }
  async function pick(id) {
    const rec = await Media.get(+id); if (!rec) return;
    const bm = await createImageBitmap(rec.blob), k = Math.min(1, 700 / Math.max(bm.width, bm.height)), cv = document.createElement("canvas");
    cv.width = Math.round(bm.width * k); cv.height = Math.round(bm.height * k); cv.getContext("2d").drawImage(bm, 0, 0, cv.width, cv.height);
    pend.push(cv.toDataURL("image/jpeg", .75)); renderPend(); closeSheet();
  }

  el.addEventListener("click", e => {
    const t = e.target.closest("[data-m]"); if (!t) return; const d = t.dataset;
    switch (d.m) {
      case "open": openConv(d.id); break;
      case "back": back(); break;
      case "new": $("#ms-to").value = ""; renderNew(); $("#ms-new").classList.add("on"); setTimeout(() => $("#ms-to").focus(), 300); break;
      case "ncancel": $("#ms-new").classList.remove("on"); $("#ms-to").blur(); break;
      case "start": startConv(d.n); break;
      case "send": doSend(); inp.focus(); break;
      case "attach": attach(); break;
      case "pick": pick(d.id); break;
      case "rmpend": pend.splice(+d.i, 1); renderPend(); break;
      case "sheetx": closeSheet(); break;
      case "info": openSheet(`<div class="ms-sh"><span></span><b>세부 정보</b><button class="ms-blue" data-m="sheetx">완료</button></div><div class="ms-info" style="display:flex;flex-direction:column">${av(cur.name)}<b style="font-size:22px">${esc(cur.name)}</b><span style="color:#8e8e93">iMessage</span><button class="red" data-m="del">대화 삭제</button></div>`); break;
      case "del": { const id = cur.id; closeSheet(); convs = convs.filter(c => c.id !== id); save(); back(); break; }
    }
  });

  /* 키보드에 맞춘 레이아웃 */
  const vv = window.visualViewport;
  const fit = () => { if (!el.classList.contains("open")) return; const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop); el.style.bottom = kb + "px"; el.classList.toggle("kb", kb > 80); const b = $("#ms-body"); if (kb > 80) b.scrollTop = b.scrollHeight; };
  if (vv) { vv.addEventListener("resize", fit); vv.addEventListener("scroll", fit); }

  let isOpen = false;
  function open() {
    if (isOpen) return; isOpen = true; renderList(); $("#ms-q").value = "";
    originFrom(el, "messages"); el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140);
  }
  function close() {
    if (!isOpen) return; isOpen = false; screen.classList.remove("app-light"); el.classList.remove("open", "kb"); el.style.bottom = ""; el.setAttribute("aria-hidden", "true");
    document.activeElement && document.activeElement.blur();
    setTimeout(() => { if (!isOpen) { el.classList.remove("show"); $("#ms-thread").classList.remove("on"); $("#ms-list").classList.remove("back"); $("#ms-new").classList.remove("on"); closeSheet(); cur = null; } }, 430);
  }
  document.addEventListener("app:open", e => { if (e.detail.id === "messages") open(); });
  document.addEventListener("app:close", close);
  return { open, close, chat(n) { if (!isOpen) open(); startConv(n); } };
})();

(()=>{const s=document.createElement("style");s.textContent="/* ===== 메시지 앱 ===== */\n#msg-app{position:absolute;inset:0;z-index:5;display:none;background:#fff;color:#000;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font)}\n#msg-app.show{display:block}\n#msg-app.open{opacity:1;transform:none;border-radius:0}\n#msg-app button{font-family:var(--font);background:none;border:0;padding:0;cursor:pointer;color:inherit}\n#msg-app button.ms-row{padding:0 20px 0 12px}\n#msg-app.kb .ms-comp{padding-bottom:8px}";document.head.appendChild(s);})();

/* App-specific styles moved from base.css */
(()=>{const s=document.createElement("style");s.textContent="#ms-thread{transform:translateX(100%);z-index:2;padding-top:0}\n#ms-thread .ms-th{padding-top:calc(env(safe-area-inset-top,0px) + 54px);background:#f6f6f6}\n#ms-thread .ms-body{overflow-x:hidden}\n#ms-thread.on{transform:none}\n#ms-list.back{transform:translateX(-30%)}\n#ms-new{transform:translateY(100%);z-index:3;background:#f2f2f7;padding-top:16px;border-radius:12px 12px 0 0;top:calc(env(safe-area-inset-top,0px) + 30px)}\n#ms-new.on{transform:none}";document.head.appendChild(s);})();
