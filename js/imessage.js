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
  const CONTACTS = ["홍중","민기","성현이형","형","엄마","아빠","철수","레도형","박대표님","강PD","승호형(믹싱)","한감독님","소율 누나","정팀장님","쇼미 김작가님","도현","지안","세준(사진)"];
  const REPLIES = ["그래","오 좋아","잠깐만 이따 연락할게","ㅇㅋ","진짜? 대박","지금 뭐해?","나중에 밥 먹자","확인했어 고마워"];
  const REPLIES_BY = {
    "홍중": ["미친놈","ㅇㅇ ㄱㄱ","야 잠깐만 이따 전화함","ㅇㅋ 작업실에서 보자","인정","헐 진짜?"],
    "민기": ["ㅇㅇ 형","오 알았음","형 진짜?","이따 연락함","ㅇㅋ"],
    "성현이형": ["ㅇㅇ 알겠다","ㅇㅋ 이따 전화할게","확인했다. 고생","그래","ㅇㅋ"],
    "형": ["ㅇㅇ","그래","알았다","오 ㅇㅋ","엄마한테도 말해놨다"],
    "엄마": ["그래 우리 아들~","밥은 먹었니?","응 조심히 와 ❤️","엄마가 전화할게~"],
    "아빠": ["그래.","알았다","건강 챙겨라","ㅇㅇ"],
  };
  const baseName = n => String(n).replace(/\(.*\)$/, "");
  const pickReply = n => { const a = REPLIES_BY[baseName(n)] || REPLIES; return a[Math.floor(Math.random() * a.length)]; };
  const CL = () => (window.PhoneData ? PhoneData.names() : CONTACTS), KEY = "ios-msgs-v7", uid = () => Math.random().toString(36).slice(2, 9);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let convs = [];
  try { convs = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
  const SEED_KEY = "ios-msgs-seed40", H = 60, D = 1440, MIN = 6e4;
  const seedConvs = () => {
    const NOW = Date.now(), p2 = n => String(n).padStart(2, "0"), fmt = n => n.toLocaleString("en-US");
    const at = (d, h, m = 0) => { const x = new Date(NOW); x.setDate(x.getDate() - d); x.setHours(h, m, 0, 0); return x.getTime(); };
    const fd = n => { const x = new Date(NOW + n * 864e5); return `${x.getMonth() + 1}/${x.getDate()}`; };
    const wk = n => "일월화수목금토"[new Date(NOW + n * 864e5).getDay()];
    const nx = dow => (dow - new Date(NOW).getDay() + 7) % 7 || 7;
    const md = ts => { const x = new Date(ts); return `${p2(x.getMonth() + 1)}/${p2(x.getDate())}`; };
    const hm = ts => { const x = new Date(ts); return `${p2(x.getHours())}:${p2(x.getMinutes())}`; };
    const cap = t => Math.min(t, NOW - 20000);
    /* rows: [me, text, gap] — gap: 직전 메시지 이후 분(number) | [며칠 전, 시, 분] | {a: 지금으로부터 n분 전} */
    const mk = (name, kind, unread, start, rows) => {
      let t = start;
      return { id: uid(), name, kind, unread, msgs: rows.map(([me, text, gap], i) => {
        if (i) t = Array.isArray(gap) ? at(...gap) : (gap && gap.a != null) ? NOW - gap.a * MIN : t + (gap == null ? 1 : gap) * MIN;
        return { id: uid(), me, text, ts: cap(t) };
      }) };
    };
    const abs = (name, kind, unread, rows) => ({ id: uid(), name, kind, unread, msgs: rows.map(([me, text, ts]) => ({ id: uid(), me, text, ts: cap(ts) })) });
    const tue = nx(2);

    /* 카드·은행: 누적/잔액을 코드로 계산해서 숫자가 항상 맞게 */
    let cum = 301600;
    const cardRows = [
      [at(9, 14, 40), 4300, "GS25 성수스튜디오점"], [at(8, 20, 31), 14500, "배달의민족"],
      [at(7, 23, 48), 12800, "카카오T"], [at(6, 19, 5), 59000, "무신사"], [at(5, 15, 22), 23700, "올리브영 성수점"],
      [at(5, 22, 10), 9800, "맥도날드 성수점"], [at(4, 15, 2), 18900, "쿠팡(주)"],
      [at(3, 21, 50), 142000, "성수정육식당"], [at(3, 23, 59), 6200, "GS25 성수스튜디오점"], [at(2, 13, 5), 8900, "서브웨이 성수역점"],
      [at(2, 23, 40), 15600, "카카오T"], [at(1, 21, 15), 21500, "배달의민족"],
      [NOW - 160 * MIN, 3500, "GS25 성수스튜디오점"],
    ].map(([ts, amt, shop]) => { cum += amt; return [0, `[Web발신]\nKB국민카드 4471승인\n박*화님\n${fmt(amt)}원 일시불\n${md(ts)} ${hm(ts)}\n${shop}\n누적 ${fmt(cum)}원`, ts]; });

    let bal = 3842100;
    const bankRows = [
      [at(14, 9, 0), "출금", 650000, "자동이체(월세)"], [at(11, 15, 22), "입금", 3200000, "스튜디오정산"], [at(6, 10, 41), "출금", 89000, "KT통신요금"],
      [at(3, 16, 5), "입금", 1800000, "공연선입금"], [at(1, 9, 30), "출금", 300000, "엄마"],
    ].map(([ts, type, amt, memo]) => { bal += type === "입금"? amt : -amt; return [0, `[KB국민]${md(ts)} ${hm(ts)}\n123401**567\n박*화\n${type} ${fmt(amt)}\n잔액 ${fmt(bal)}\n${memo}`, ts]; });

    return [
      /* ── 성현이형: 매니저. 성화가 동생이라 형은 반말, 성화는 존댓말 ── */
      mk("성현이형", "", true, at(3, 19, 12), [
        [0, "성화야 내일 스케줄 나왔다"],
        [0, "11시 라디오 녹화 → 2시 화보(성수) → 6시 합동무대 리허설 이렇게야"],
        [0, "9시 반에 숙소 앞으로 갈게"],
        [1, "넵 형 알겠습니다", 14],
        [1, "내일 일찍 자야겠네요", 0.5],
        [0, "ㅇㅇ 어제도 3시에 잤잖아 오늘은 좀 자라", 4],
        [1, "들켰네요 바로 잘게요", 2],
        [0, "일어났냐", [2, 8, 52]],
        [0, "10분 뒤에 도착", 0.5],
        [1, "헉 일어났어요 형 5분만요", 7],
        [0, "천천히 내려와 커피 사왔다 아아 맞지?", 1],
        [1, "넵 감사합니다 형 🙏", 2],
        [0, "화보 의상 소율 누나가 두 벌 더 챙겨왔대. 비니는 네 거 써도 된다고", [2, 13, 41]],
        [1, "오 그럼 저 후드는 안 입어도 되나요", 9],
        [0, "그건 가서 보고 정하자", 3],
        [0, "끝나고 리허설 바로 가야 돼서 밥은 차에서 먹자. 김밥 사놓을게", 1],
        [1, "넵 참치로요", 5],
        [0, "ㅇㅋ", 1],
        [0, "오늘 고생했다. 인터뷰 진짜 잘하더라", [2, 22, 3]],
        [1, "감사합니다 형 떨려서 죽는 줄 알았어요", 11],
        [0, "티 하나도 안 났어. 홍중이 민기도 칭찬하더라", 2],
        [1, "걔네가요? 신기하네", 1],
        [0, "푹 자라 내일은 오후에 보자", 2],
        [1, "넵 형 들어가세요", 3],
        [0, "성화야 박대표님이 후속곡 일정 얘기하고 싶으시대", [1, 15, 20]],
        [0, `다음 주 ${wk(tue)}요일(${fd(tue)}) 3시에 합정 사무실 가능해?`, 0.5],
        [1, "넵 형 괜찮아요! 몇 시요?", 6],
        [0, "3시. 후속곡 얘기랑 정산도 같이 하신대", 2],
        [1, "오 정산 좋네요", 3],
        [0, "좋긴 한데 너 쓰지 마라 이번 달 카드값 봤다", 1],
        [1, "형이 그걸 어떻게 봐요 ㅠㅠ", 2],
        [0, "농담이고. 일정 캘린더에 넣어둘게", 1],
        [0, `합동 무대 큐시트 나왔어. ${fd(3)} 공연이고 메일로 보냈으니까 확인해봐`, { a: 26 }],
        [0, "홍중이랑 곡 순서 상의해서 알려줘", 1],
      ]),

      /* ── 홍중: 동갑 동료 래퍼. 서로 반말 ── */
      mk("홍중", "", true, at(3, 15, 20), [
        [0, "야 작업실 오늘 오냐"],
        [1, "ㅇㅇ 3시 반쯤 도착", 4],
        [0, "ㅇㅋ 강PD 새 비트 보냄 들어봤음?", 1],
        [1, "아직 못 들었음 어때", 3],
        [0, "후렴 808 미쳤음 ㅋㅋ 네 플로우 얹으면 딱일 듯", 1],
        [1, "오 바로 들어볼게", 0.5],
        [1, "헐", 6],
        [1, "이거 뭐냐 ㅋㅋ 개좋은데", 0.2],
        [0, "내가 말했잖아", 1],
        [0, "야 훅 녹음본 다시 들어봤는데 2절 브릿지 소름", [2, 1, 48]],
        [1, "안 자고 뭐함", 14],
        [0, "너도 안 잤잖아", 1],
        [1, "근데 마지막 바 라임 좀 억지 같지 않냐", 2],
        [0, "ㅇㅇ 나도 걸렸음", 1],
        [0, "내일 다시 써보자", 0.5],
        [1, "ㅇㅋ 저녁에 국밥 먹고 하자", 3],
        [0, "순대국 ㄱㄱ", 1],
        [0, "인터뷰에서 우리 팀 된 계기 물어보면 뭐라고 할 거냐", [2, 16, 20]],
        [1, "네가 나 골라가서 된 거라고 해야지", 8],
        [0, "사실이잖아", 1],
        [0, "아 나 내일 미용실 감 늦으면 먼저 시작해라", 2],
        [1, "ㅇㅋ 또 색 바꿈?", 3],
        [0, "쇼미 때 그 색 다시 해보려고", 1],
        [1, "말려도 소용없겠지", 2],
        [1, "합동 무대 신곡 먼저 하고 쇼미 때 곡 마지막으로 하는 거 어때", [1, 18, 5]],
        [0, "오 괜찮은데? 마지막에 터지겠다", 2],
        [0, "근데 2절 때 내가 라이브로 한 번 더 받쳐줄까", 1],
        [1, "ㅇㅇ 그게 낫겠다 대기실에서 맞춰보자", 3],
        [0, "ㅇㅋ 대기실에서 보자", 1],
        [0, "야 일어났냐", { a: 95 }],
        [0, "오늘 작업실 와?", 1],
        [0, "나 3시쯤 감 국밥 사갈게", 1],
      ]),

      /* ── 민기: 한 살 어린 동료. 성화를 '형'이라 부르지만 말은 반말 ── */
      mk("민기", "", true, at(2, 22, 40), [
        [0, "형 방금 무대 봤다"],
        [0, "쟤 누구냐 내 친구 아닌데", 0.5],
        [1, "긴장해서 가사 한 줄 날릴 뻔했음", 6],
        [0, "전혀 티 안 났음", 1],
        [0, "축하주 한잔 해야지 형", 1],
        [1, "주말에 하자 홍중이도 부르고", 3],
        [0, "이미 불렀음 7시에 우리 동네 고깃집", 2],
        [1, "빠르네 알겠다 ㄱㄱ", 2],
        [0, "형 후속곡 비트 들었음?", [1, 13, 20]],
        [1, "ㅇㅇ 강PD형이 보내줌 너도 받았어?", 5],
        [0, "받았지 형 플로우로 들어야 맛있겠던데", 1],
        [1, "너 피처링 한 번 해라 8마디만", 2],
        [0, "헐 진짜? 나야 영광이지", 1],
        [0, "눈치 안 보고 해도 되는 거지?", 1],
        [1, "눈치는 무슨 그냥 네 스타일대로 해", 3],
        [0, "ㅇㅋ 오늘 가사 써볼게", 2],
        [0, "형 오늘 작업실 감?", { a: 120 }],
        [0, "나 4시쯤 갈 듯", 1],
        [0, "홍중이 형은 3시라던데", 1],
      ]),

      /* ── 형: 친형(위로 형만 있음). 서로 반말 ── */
      mk("형", "", false, at(1, 20, 30), [
        [0, "너 이번 주말에 집에 옴?"],
        [1, "ㅇㅇ", 3],
        [0, "윤호도 같이 오냐?", 2],
        [0, "다시 만나는 거 맞지?", 0.3],
        [1, "ㅇㅇ 아마 같이감", 4],
        [0, "그럼 뭐 해놓으면 되냐", 2],
        [0, "걔 뭐 좋아하지", 0.3],
        [1, "김치찜이면 될 듯", 3],
        [0, "ㅇㅋ", 2],
      ]),

      mk("엄마", "", false, at(4, 14, 20), [
        [0, "아들 밥은 챙겨 먹고 다니니~ 요즘 방송에서 자주 나오던데 엄마 친구들이 난리야 ㅎㅎ"],
        [1, "챙겨 먹지~ 이번 주말에 집 갈게", 35],
        [0, "그래그래~ 오면 갈비찜 해놓을게", 3],
        [0, "김치도 보냈다 택배 확인해", [2, 10, 5]],
        [1, "응 고마워 엄마", 42],
        [0, "냉장고에 넣어놓고 먹어~ 너무 오래 두지 말고", 5],
        [1, "알겠어", 3],
        [0, "사랑해 우리 아들 ❤️", [1, 22, 10]],
        [1, "나도 주무세요", 12],
      ]),

      mk("아빠", "", false, at(3, 20, 40), [
        [0, "앨범 들어봤다. 가사는 잘 모르겠지만 목소리가 좋더라."],
        [0, "건강 챙겨라", 1],
        [1, "고마워요 아빠 ㅎㅎ 다음에 공연 오세요", 25],
        [0, "그래 시간 되면 가마", 4],
        [0, "엄마랑 같이 가야겠다", 1],
      ]),

      mk("철수", "", false, at(4, 13, 10), [
        [0, "야 신혼여행 다녀왔다 선물 사옴"],
        [1, "오 뭔데", 4],
        [0, "와서 봐라 임마", 1],
        [1, "이번 주 되냐 와이프님도 데려와", 3],
        [0, "ㅇㅇ 주말에 ㄱㄱ 우리 집 와라 와이프가 음식 한대", 2],
        [1, "헐 갑니다", 1],
        [0, "야 앨범 다 들었다 3번 트랙 계속 반복 중임", [1, 23, 15]],
        [1, "ㅋㅋ 고맙다 임마", 20],
        [0, "인간적으로 이거 너무 잘 만든 거 아니냐 와이프도 좋다더라", 3],
      ]),

      mk("레도형", "", false, at(3, 17, 30), [
        [0, "앨범 잘 들었다. 후배들 중에 제일 기대되는 건 너야"],
        [0, "근데 너무 빨리 달리지는 마. 오래 하는 게 더 중요하다", 1],
        [1, "형 감사합니다 진짜 힘 나네요", 14],
        [1, "시간 되면 밥 한 번 사주세요", 1],
        [0, "당연하지. 공연 끝나고 연락해라", 5],
        [1, "넵 형 꼭 연락드릴게요", 2],
      ]),

      mk("박대표님", "", false, at(5, 11, 20), [
        [0, "1주차 음원 성적 보고 있는데 실시간 차트 계속 올라가네. 수고했다"],
        [1, "감사합니다 대표님! 다 형들 덕분이에요", 9],
        [0, `성현이한테 들었지? ${wk(tue)}요일 3시에 사무실에서 보자`, [1, 16, 0]],
        [0, `후속곡은 ${fd(34)} 발매로 가닥 잡고 있다`, 1],
        [1, "넵 그때 뵙겠습니다 🙏", 5],
      ]),

      mk("강PD", "", true, at(3, 23, 5), [
        [0, "후속곡 비트 새로 만들었음. 808 좀 세게 눌렀어 들어봐"],
        [1, "와 형 이거 미쳤는데요", 18],
        [1, "훅에 샘플 얹어도 되나요", 0.5],
        [0, "ㅇㅇ 클리어런스 되는 걸로 찾아보자. 일단 가이드 녹음해와", 5],
        [1, "내일 저녁에 작업실 갈게요", 3],
        [0, "오케이 믹스는 승호한테 말해놓을게", 2],
        [0, `녹음은 ${fd(18)} 오후 2시로 잡아놨다`, [1, 12, 30]],
      ]),

      mk("승호형(믹싱)", "", false, at(2, 14, 10), [
        [0, "후속곡 믹스 v2 올렸어 확인해봐. 보컬 에어감 조금 올리고 킥은 낮췄음"],
        [1, "v2 좋아요! 2절 애드립만 조금 더 앞으로 땡겨주실 수 있나요", 70],
        [0, "ㅇㅋ 수정해서 v3 오늘 중으로 줄게", 5],
        [0, "v3 올렸다 이게 최종이면 좋겠다", [1, 2, 40]],
        [1, "형 v3 들어봤는데 이거 최종 가도 될 것 같아요 고생하셨어요", [1, 11, 30]],
        [0, "ㅇㅋ 그럼 마스터링 넘길게", 9],
      ]),

      mk("한감독님", "", false, at(4, 13, 0), [
        [0, `후속곡 MV 콘티 보내드렸습니다. ${fd(14)} 촬영 장소 후보 두 군데 봤는데 지하 주차장이랑 폐공장이요`],
        [1, "폐공장이 더 분위기 있을 것 같아요 조명은 어떻게 가나요?", 18],
        [0, "네온 톤으로 가려고요. 로케이션 헌팅은 다음 주에 같이 가요", 9],
        [1, "좋습니다 감독님 믿고 갑니다 🔥", 4],
      ]),

      mk("소율 누나", "", false, at(3, 14, 30), [
        [0, "화보 의상 협찬 들어왔어 브랜드에서 오버핏 레더 자켓 보내준대"],
        [1, "헉 대박 누나 사이즈 L이요", 11],
        [0, "오버핏 레더 자켓이랑 와이드 데님 두 벌 준비했어. 신발은 270 맞지?", 4],
        [1, "아니 265요", 3],
        [0, "ㅇㅋ 내일 퀵으로 보낼게. 안경은 네 거 써도 돼", 4],
      ]),

      mk("정팀장님", "", false, at(2, 10, 10), [
        [0, `${fd(5)} 클럽 게스트 공연 페이 건 확인했습니다. 선입금 이번 주 안에 나갈 거예요`],
        [1, "넵 감사합니다 세트리스트 20분 맞춰서 보내드릴게요", 52],
        [0, "혹시 신곡 라이브 먼저 해주실 수 있나요? 현장 반응 보려고요", [1, 10, 0]],
        [1, "좋아요 후속곡 선공개 가볍게 하겠습니다 🔥", 31],
      ]),

      mk("쇼미 김작가님", "", false, at(5, 11, 0), [
        [0, "안녕하세요 쇼미 작가 김○○입니다. 다음 시즌 관련해서 미팅 요청드려요"],
        [1, "안녕하세요! 연락 감사합니다. 매니저 형 통해서 일정 잡겠습니다", 30],
        [0, "넵 성현 매니저님께도 따로 연락드렸어요. 편하실 때 답 주세요 :)", 15],
      ]),

      mk("세준(사진)", "", false, at(5, 12, 0), [
        [0, "앨범 아트웍 보정본 보냈어. 컬러 톤 확인해줘"],
        [1, "헐 톤 너무 좋아요 이대로 가시죠 형", 60],
        [0, "ㅇㅋ 그럼 이걸로 최종 넘길게", 60],
      ]),

      /* ── 서비스 / 알림 ── */
      abs("KB국민은행", "svc", false, bankRows),
      abs("KB국민카드", "svc", false, cardRows),
      abs("한국음악저작권협회", "svc", false, [[0, "[한국음악저작권협회] 저작권료 분배 내역이 확정되었습니다. 회원 홈페이지에서 확인해 주세요.", at(3, 11, 0)]]),
      abs("팬카페 운영팀", "svc", false, [[0, "[팬카페] 팬 이벤트 응모가 마감되었습니다. 총 1,240명이 신청했어요.", at(1, 18, 0)]]),
      abs("CJ대한통운", "svc", false, [
        [0, "[CJ대한통운] 고객님의 상품을 접수하였습니다. 보내시는 분: 사운드웨어 / 운송장 6512 3487 0021", at(3, 10, 4)],
        [0, "[CJ대한통운] 상품이 대전HUB에 도착했습니다. 내일 중 배송 예정입니다.", at(2, 5, 12)],
        [0, "[CJ대한통운] 오늘 배송 예정입니다. 배송기사: 김태식 (010-5527-3309) 오전 중 방문 예정입니다.", at(1, 8, 40)],
        [0, "[CJ대한통운] 상품이 문 앞에 배송되었습니다. 배송 완료 사진을 확인해 주세요.", at(1, 10, 58)],
      ]),
      abs("무신사", "svc", false, [
        [0, "[무신사] 주문이 접수되었습니다. 오버핏 후드집업(그레이/L) 59,000원", at(6, 19, 5)],
        [0, "[무신사] 상품이 발송되었습니다.", at(5, 9, 30)],
        [0, "[무신사] 교환 상품 검수가 완료되어 재발송 처리되었습니다.", at(2, 15, 10)],
      ]),
      abs("카카오", "svc", false, [
        [0, "[카카오] 인증번호 [482913]를 입력해 주세요. 타인에게 절대 알려주지 마세요.", NOW - 185 * MIN],
        [0, "[카카오] 새로운 기기에서 로그인되었습니다. 본인이 아니라면 비밀번호를 변경해 주세요.", NOW - 182 * MIN],
      ]),
      abs("네이버", "svc", false, [[0, "[네이버] 인증번호 [071655] 타인에게 알려주지 마세요.", at(2, 14, 55)]]),
      abs("다온피부과", "svc", false, [[0, `[다온피부과] 예약이 완료되었습니다. ${fd(3)}(${wk(3)}) 오후 4:30 진료 예정입니다.`, at(2, 12, 0)]]),

      /* ── 스팸 ── */
      abs("올리브영", "spam", false, [[0, "(광고) 올리브영 가을 세일 최대 70% 오늘 단 하루! 지금 앱에서 확인하세요. 무료수신거부 080-8827-110", at(1, 8, 0)]]),
      abs("010-4829-7731", "spam", false, [[0, "[국제발신] 고객님 택배 주소 불일치로 반송 예정입니다. 주소 재확인: han-bae.top/a8Kd", at(2, 13, 20)]]),
      abs("1588-0271", "spam", false, [[0, "[Web발신] 축하합니다!! 갤럭시 S26 경품 이벤트에 당첨되셨습니다. 수령 신청 → bit-lyy.kr/gift7 (24시간 내 미신청 시 소멸)", at(3, 9, 0)]]),
      abs("070-7743-0816", "spam", false, [[0, "엄마야 폰 액정 깨져서 임시폰으로 문자해 ㅠㅠ 급하게 부탁할 게 있는데 이 번호로 톡 줄 수 있어?", at(2, 11, 40)]]),
    ];
  };
  if (!convs.length) convs = seedConvs();
  else if (!localStorage.getItem(SEED_KEY)) convs = convs.concat(seedConvs().filter(s => !convs.some(c => c.name === s.name)));
  try { localStorage.setItem(SEED_KEY, "1"); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(convs)); } catch (e) {} };
  { let done = false; try { done = localStorage.getItem("ios-msgs-list-date-v1") === "1"; } catch (e) {} if (!done) { const names = ["KB국민카드","카카오","박재영(대표)","강민우(PD)","CJ대한통운","정우석(팀장)","KB국민은행","올리브영"]; let t = new Date(); t.setHours(12,0,0,0); for (const conv of convs) { if (names.includes(conv.name) && conv.msgs && conv.msgs.length) { let latest = conv.msgs[0]; for (const msg of conv.msgs) if ((msg.ts||0) > (latest.ts||0)) latest = msg; latest.ts = t.getTime(); t.setMinutes(t.getMinutes()+1); } } try { localStorage.setItem("ios-msgs-list-date-v1","1"); } catch(e) {} save(); } }
  { let mg = 0; try { mg = localStorage.getItem("ios-msgs-mig11"); } catch (e) {}
    if (!mg) {
      const DEL = ["홍중", "민기", "철수", "성현이형", "엄마", "형", "팬카페 운영팀", "승호형(믹싱)", "소율 누나"], RN = { "레도형": "강레도", "박대표님": "박재영(대표)", "강PD": "강민우(PD)", "한감독님": "한서진(감독)", "정팀장님": "정우석(팀장)", "쇼미 김작가님": "김하나(쇼미 작가)", "도현": "문도현", "지안": "한지안", "세준(사진)": "임세준(사진)" };
      convs = convs.filter(c => !DEL.includes(c.name)).map(c => RN[c.name] ? { ...c, name: RN[c.name] } : c);
      try { localStorage.setItem("ios-msgs-mig11", "1"); } catch (e) {} save();
    } }
  { let m12 = 0; try { m12 = localStorage.getItem("ios-msgs-mig12"); } catch (e) {}
    if (!m12) {
      const DEL12 = ["YouTube", "멜론티켓", "쿠팡", "도현", "지안", "문도현", "한지안"];
      convs = convs.filter(c => !DEL12.includes(c.name));
      try { localStorage.setItem("ios-msgs-mig12", "1"); } catch (e) {} save();
    } }
  { let l = 0; try { l = +localStorage.getItem("ios-msgs-day"); } catch (e) {} const t0 = new Date().setHours(0, 0, 0, 0), k = Math.round((t0 - (l || t0)) / 864e5), nw = Date.now(); if (k > 0) convs.forEach(c => { (c.msgs || []).forEach(x => { x.ts += k * 864e5; if (x.ts > nw) x.ts -= 864e5; }); if (c.created) c.created += k * 864e5; }); if (l !== t0) { try { localStorage.setItem("ios-msgs-day", t0); } catch (e) {} save(); } } /* 날짜가 바뀌면 대화 시각을 접속일 기준으로 이동 */
  const last = c => c.msgs[c.msgs.length - 1];
  const sorted = () => convs.slice().sort((a, b) => (last(b)?.ts || b.created || 0) - (last(a)?.ts || a.created || 0));
  const find = id => convs.find(c => c.id === id);
  const av = (n, k) => `<div class="ms-av${k ? " " + k : ""}" style="position:relative;overflow:hidden">${k === "spam" ? "!" : esc(n.trim()[0] || "?")}</div>`;
  const pad = n => String(n).padStart(2, "0");
  function ftime(ts) {
    const d = new Date(ts), n = new Date(2026, 9, 19), d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate()), n0 = new Date(n.getFullYear(), n.getMonth(), n.getDate()), diff = Math.round((n0 - d0) / 864e5);
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
      c.msgs.push({ id: uid(), me: 0, text: pickReply(c.name), ts: Date.now() });
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
    let c = convs.find(x => x.name === name || baseName(x.name) === baseName(name));
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
