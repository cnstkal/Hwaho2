/* Karrot / 당근 앱 시뮬레이션 — 홈 / 채팅 / 나의 당근 / 판매관리 */
(() => {
  const el = document.querySelector("#dg-app");
  if (!el || el.dataset.karrotReady) return;
  el.dataset.karrotReady = "1";
  let opened=false, page="home", stack=[], category="전체", query="", searching=false, selected=null, chatId=null, saleTab="sale", sheet=null, banner=true, hoodIdx=0, rendered=null;
  const hoods=["신림동"], liked=new Set(), memo={}, NAME="psh";
  const BOOKS="linear-gradient(90deg,#cfcabd 0 12%,#1d1f22 12% 22%,#34373b 22% 34%,#1d1f22 34% 46%,#3a3d41 46% 56%,#58d68d 56% 72%,#2b2d30 72%)";
  const products=[
    {id:3,title:"마스 친필 사인 앨범",meta:"신림동 · 4일 전",price:280000,cat:"음반/굿즈",bg:"linear-gradient(145deg,#17191d,#393c42)",emoji:"💿",st:["chat",2,12],seller:"MARS",sloc:"신림동",temp:"36.8",time:"4일 전",chat:2,like:12,view:73,imgs:3,desc:"마스 친필 사인이 들어간 앨범입니다.\n이름 없이 사인만 되어 있어요."},
    {id:4,title:"에어팟 프로 3 미개봉",meta:"봉천동 · 1.2km · 5일 전",price:210000,cat:"디지털기기",bg:"linear-gradient(145deg,#f4f4f4,#d8d8d8)",emoji:"🎧",st:["chat",5,10],seller:"포카러버",sloc:"봉천동",temp:"37.4",time:"5일 전",chat:5,like:10,view:230,imgs:2,desc:"에어팟 프로 3 미개봉 제품입니다.\n개봉하지 않은 새 상품이에요."},
    {id:5,title:"아디다스 와플 클래식 트랙탑",meta:"신림동 · 1주일 전",price:60000,cat:"남성의류",bg:"linear-gradient(90deg,#cfcabd 0 12%,#1d1f22 12% 22%,#34373b 22% 34%,#1d1f22 34% 46%,#3a3d41 46% 56%,#58d68d 56% 72%,#2b2d30 72%)",emoji:"🧥",st:["chat",0,3],seller:"뽀끔이",sloc:"신림동",temp:"37.9",time:"1주일 전",chat:0,like:3,view:1128,imgs:8,desc:"아디다스 와플 클래식 트랙탑 판매합니다.\n상태는 사진 참고해주세요."},
    {id:6,title:"이케아 원목 협탁",meta:"신림동 · 600m · 2시간 전",price:15000,cat:"가구/인테리어",bg:"#e8d8c5",emoji:"🪑",st:["chat",2,4],seller:"오늘도정리",sloc:"신림동",temp:"38.2",time:"2시간 전",chat:2,like:4,view:96,imgs:3,desc:"방 정리하면서 내놓아요.\n생활 기스 조금 있지만 튼튼해요."},
    {id:7,title:"나이키 운동화 235",meta:"대학동 · 2.1km · 4시간 전",price:30000,cat:"여성의류",bg:"#e8e9eb",emoji:"👟",st:["chat",1,3],seller:"구름한점",sloc:"대학동",temp:"37.1",time:"4시간 전",chat:1,like:3,view:64,imgs:2,desc:"몇 번 안 신어서 상태 좋아요.\n사이즈 235입니다."},
    {id:8,title:"미개봉 블루투스 이어폰",meta:"남현동 · 3km · 어제",price:45000,cat:"디지털기기",bg:"#e6e6e6",emoji:"🎧",buy:1,st:["chat",0,2],seller:"당근초보",sloc:"남현동",temp:"36.5",time:"어제",chat:0,like:2,view:41,imgs:2,desc:"선물 받았는데 사용하지 않아 판매합니다.\n미개봉이에요."}
  ];
  const mySales=[
    {id:101,title:"커플링 반지 구매 원해요 가격 제시",loc:"신림동",ago:"17일 전",lift:0,price:"가격 제시",bg:"linear-gradient(135deg,#d8d5d0,#aaa49c)",emoji:"💍",photo:"images/Karrot/CouplingRing/B2994A6C-9C7E-461F-AD9B-93AA46A085F5.png",views:262,s2:["chat",1],st:"sale"},
    {id:102,title:"슈어 SM58 다이나믹 마이크 + 스탠드",loc:"신림동",ago:"5일 전",lift:0,price:170000,bg:"linear-gradient(135deg,#c9ccd1,#6d7178)",emoji:"🎤",photo:"images/Karrot/ShureSM58/IMG_7436.jpeg",views:142,s2:["heart",6],st:"sale"},
    {id:103,title:"AKG K240 모니터링 헤드폰",loc:"신림동",ago:"1주 전",lift:0,price:100000,bg:"linear-gradient(135deg,#1c1d20,#5a5f66)",emoji:"🎧",photo:"images/Karrot/AKGK240/IMG_7435.jpeg",views:96,s2:["chat",2],st:"sale"},
    {id:104,title:"가변 덤벨 20kg 세트 (집에서 안 써요)",loc:"신림동",ago:"1주 전",lift:0,price:60000,bg:"linear-gradient(135deg,#2a2e35,#7a828c)",emoji:"🏋️",views:121,s2:["heart",5],st:"sold"},
    {id:105,title:"AB 롤러 + 푸시업 바 세트",loc:"신림동",ago:"2주 전",lift:0,price:12000,bg:"linear-gradient(135deg,#e4e7ea,#9aa3ad)",emoji:"💪",views:58,s2:["heart",1],st:"sold"},
    {id:106,title:"M-Audio 미디 키보드 49건반",loc:"신림동",ago:"1개월 전",lift:0,price:80000,bg:"linear-gradient(135deg,#1f2023,#4a4d52)",emoji:"🎹",views:210,s2:["chat",3],st:"sold"},
    {id:107,title:"아이패드 에어 케이스 + 펜슬 팁",loc:"신림동",ago:"1개월 전",lift:0,price:25000,bg:"linear-gradient(135deg,#d9dde2,#8d949d)",emoji:"📱",views:84,s2:["chat",1],st:"sold"}
  ];
  const rooms=[
    {id:1,name:"당근",kind:"logo",official:1,ago:"1달 전",msg:"개인정보 이용내역 안내 🥕 psh님 안녕하세요! 개인정보 이용내역을 안내드려요.",unread:2,msgs:[{t:"개인정보 이용내역 안내 🥕 psh님 안녕하세요! 개인정보 이용내역을 안내드려요.",time:"오전 10:02",date:"2026년 9월 10일"}]},
    {id:2,name:"후하호요",loc:"봉천동",temp:"41.4",kind:"thumb",tb:"#f5f6f7",ph:1,ago:"1달 전",msg:"쿠팡애서 시킨 배송내역은잇어요",unread:1,msgs:[{me:1,t:"안녕하세요 혹시 구매영수증 같은 거 볼 수 있을까요?",time:"오전 11:56",date:"2026년 9월 10일"},{t:"쿠팡애서 시킨 배송내역은잇어요",time:"오후 12:52",date:"2026년 9월 10일"}]},
    {id:3,name:"날치알파스타",loc:"서림동",temp:"39.7",kind:"thumb",tb:"linear-gradient(135deg,#f6d6e2,#e8b8cc)",emoji:"🍨",ago:"2달 전",msg:"psh님, 거래 잘 하셨나요? 거래한 이웃에게 따뜻한 후기를 남겨주세요.",unread:1,msgs:[{t:"psh님, 거래 잘 하셨나요? 거래한 이웃에게 따뜻한 후기를 남겨주세요.",time:"오후 3:20",date:"2026년 8월 12일"}]},
    {id:4,name:"Park BGM",kind:"face",official:1,ago:"3달 전",msg:"(광고) 신림동 좋은 미용실·헬스장을 알고 계신가요?",unread:1,msgs:[{t:"(광고) 신림동 좋은 미용실·헬스장을 알고 계신가요?",time:"오전 9:30",date:"2026년 7월 3일"}]},
    {id:5,name:"제이룸",loc:"난곡동",temp:"37.8",kind:"thumb",tb:"linear-gradient(90deg,#d8d2b8,#b9b196)",emoji:"📚",ago:"1주 전",msg:"토스뱅크 6332로 입금됐어요. 바로구매를 이용해주셔서 감사합니다.",unread:0,msgs:[{t:"토스뱅크 6332로 입금됐어요. 바로구매를 이용해주셔서 감사합니다.",time:"오후 6:12",date:"2026년 10월 8일"}]},
    {id:6,name:"마음이",loc:"미성동",temp:"36.9",kind:"thumb",tb:"linear-gradient(135deg,#dfe9f3,#bcd0e4)",emoji:"🧥",ago:"2주 전",msg:"혹시 내일 오후에 거래 가능하실까요?",unread:1,msgs:[{t:"혹시 내일 오후에 거래 가능하실까요?",time:"오후 2:41",date:"2026년 10월 1일"}]}
  ];
  const fmt=n=>typeof n==="number"?(n===0?"나눔":n.toLocaleString("ko-KR")+"원"):n;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const $=s=>el.querySelector(s);
  const prodOf=id=>products.find(p=>p.id===id)||mySales.find(p=>p.id===id);
  const sMeta=x=>x.loc+" · "+(x.lift?"끌올 ":"")+x.ago+(x.lift?" · 끌올 "+x.lift+"회":"");
  const DOTS='<circle style="fill:var(--dc,currentColor);stroke:none" cx="8" cy="11.4" r="1.1"/><circle style="fill:var(--dc,currentColor);stroke:none" cx="12" cy="11.4" r="1.1"/><circle style="fill:var(--dc,currentColor);stroke:none" cx="16" cy="11.4" r="1.1"/>';
  const BUB='<path d="M12 3.800c-4.900 0-8.800 3.300-8.800 7.500 0 2.200 1.100 4.200 2.900 5.600L5.300 20.700l4.200-2.100c.8.200 1.600.3 2.500.3 4.900 0 8.800-3.300 8.800-7.500S16.900 3.800 12 3.800z"/>';
  const I={
    search:{p:'<circle cx="11" cy="11" r="7.2"/><path d="m16.500 16.500 4.500 4.500"/>'},
    bell:{p:'<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.500 2h-15z"/><path d="M10 21.300a2.200 2.200 0 0 0 4 0"/>'},
    menu:{p:'<path d="M3 6.500h18M3 12h18M3 17.500h18"/>'},
    back:{p:'<path d="M15.500 4.500 8 12l7.500 7.500"/>',sw:2.2},
    chev:{p:'<path d="m9 5 7 7-7 7"/>',sw:1.8},
    more:{p:'<circle cx="12" cy="4.500" r="1.700"/><circle cx="12" cy="12" r="1.700"/><circle cx="12" cy="19.500" r="1.700"/>',f:1},
    gear:{p:'<circle cx="12" cy="12" r="3"/><path d="M19.400 15a1.650 1.650 0 0 0 .33 1.820l.06.060a2 2 0 1 1-2.830 2.830l-.06-.06a1.650 1.650 0 0 0-1.820-.33 1.650 1.650 0 0 0-1 1.510V21a2 2 0 1 1-4 0v-.09A1.650 1.650 0 0 0 9 19.400a1.650 1.650 0 0 0-1.820.33l-.06.060a2 2 0 1 1-2.830-2.830l.06-.06a1.650 1.650 0 0 0 .33-1.820 1.650 1.650 0 0 0-1.510-1H3a2 2 0 1 1 0-4h.09A1.650 1.650 0 0 0 4.600 9a1.650 1.650 0 0 0-.33-1.820l-.06-.06a2 2 0 1 1 2.830-2.830l.06.06a1.650 1.650 0 0 0 1.820.33H9a1.650 1.650 0 0 0 1-1.510V3a2 2 0 1 1 4 0v.09a1.650 1.650 0 0 0 1 1.510 1.650 1.650 0 0 0 1.820-.33l.06-.06a2 2 0 1 1 2.830 2.830l-.06.06a1.650 1.650 0 0 0-.33 1.820V9a1.650 1.650 0 0 0 1.510 1H21a2 2 0 1 1 0 4h-.09a1.650 1.650 0 0 0-1.510 1z"/>',sw:1.9},
    pinF:{p:'<path d="M12 22s7.500-6.400 7.500-12.200a7.500 7.500 0 0 0-15 0C4.500 15.600 12 22 12 22z"/><circle cx="12" cy="9.800" r="2.700" style="fill:#fff"/>',f:1},
    pinO:{p:'<path d="M12 21.500s7-6 7-11.500a7 7 0 0 0-14 0c0 5.500 7 11.500 7 11.500z"/><circle cx="12" cy="10" r="2.800"/>',sw:2.100},
    homeO:{p:'<path d="M4 10.500 12 4l8 6.500V19a1.500 1.500 0 0 1-1.500 1.500H15v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H5.500A1.500 1.500 0 0 1 4 19z"/>',sw:2.100},
    homeF:{p:'<path d="M4 10.500 12 4l8 6.500V19a1.500 1.500 0 0 1-1.500 1.500H15v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H5.500A1.500 1.500 0 0 1 4 19z"/><path d="M10 20.500V16a2 2 0 0 1 4 0v4.500" style="fill:var(--dc,#fff);stroke:none"/>',f:1,sw:1.500},
    commO:{p:'<circle cx="7.500" cy="5.500" r="2"/><circle cx="16.500" cy="5.500" r="2"/><circle cx="12" cy="12" r="2.600"/><path d="M3 12.500a4.500 4.500 0 0 1 3-2.500M21 12.500a4.500 4.500 0 0 0-3-2.500M6.500 21v-.5a5.500 5.500 0 0 1 11 0v.5"/>',sw:2},
    chatO:{p:BUB+DOTS,sw:2},
    chatF:{p:BUB+DOTS,f:1},
    persO:{p:'<circle cx="12" cy="8" r="4"/><path d="M4.500 21a7.500 7.500 0 0 1 15 0z"/>',sw:2.100},
    persF:{p:'<circle cx="12" cy="8" r="4"/><path d="M4.500 21a7.500 7.500 0 0 1 15 0z"/>',f:1,sw:1.500},
    x:{p:'<path d="M5.500 5.500l13 13M18.500 5.500l-13 13"/>',sw:1.800},
    arrowUR:{p:'<path d="M7.500 16.500 16.500 7.500M8.500 7.500h8v8"/>',sw:2},
    eye:{p:'<path d="M12 5.500C6.500 5.500 3 10 1.800 12 3 14 6.500 18.500 12 18.500s9-4.500 10.200-6.500C21 10 17.500 5.500 12 5.500z"/><circle cx="12" cy="12" r="3.100" style="fill:#fff"/>',f:1},
    peopleS:{p:'<circle cx="9" cy="8" r="3.300"/><path d="M2.500 19.500a6.500 6.500 0 0 1 13 0z"/><circle cx="17" cy="9.500" r="2.600"/><path d="M16.500 14.300a5.500 5.500 0 0 1 5.300 5.200h-4.300z"/>',f:1},
    heartF:{p:'<path d="M12 20.800S3 15.200 3 8.800A4.900 4.900 0 0 1 12 6.200a4.900 4.900 0 0 1 9 2.600c0 6.400-9 12-9 12z"/>',f:1},
    heartO:{p:'<path d="M12 20.800S3 15.200 3 8.800A4.900 4.900 0 0 1 12 6.200a4.900 4.900 0 0 1 9 2.600c0 6.400-9 12-9 12z"/>',sw:1.700},
    share:{p:'<path d="M12 15V3.500M7.500 7.500 12 3l4.500 4.500"/><path d="M7 10.500H5.500a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8.500a1 1 0 0 0-1-1H17"/>',sw:1.900},
    phone:{p:'<path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.300 1.800.6 2.800.7a2 2 0 0 1 1.700 2z"/>',sw:1.800},
    smile:{p:'<circle cx="12" cy="12" r="9.500"/><path d="M8 14c1 1.600 2.300 2.400 4 2.400s3-.8 4-2.400"/><circle cx="9" cy="9.500" r=".7" style="fill:currentColor"/><circle cx="15" cy="9.500" r=".7" style="fill:currentColor"/>',sw:1.600},
    plus:{p:'<path d="M12 4v16M4 12h16"/>',sw:1.700},
    send:{p:'<path d="M2.500 3.300 22 12 2.500 20.700 5 12.700 14 12 5 11.300z"/>',f:1},
    receipt:{p:'<path d="M6 3h12a1 1 0 0 1 1 1v17l-2.500-1.700L14 21l-2-1.700L10 21l-2.500-1.700L5 21V4a1 1 0 0 1 1-1z"/><path d="M9 8h6M9 12h6"/>',sw:1.800},
    clock:{p:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3 2"/>',sw:1.800},
    ticket:{p:'<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.500a2.500 2.500 0 0 0 0 5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.500a2.500 2.500 0 0 0 0-5z"/><path d="M14.500 8.500v1.500M14.500 11.300v1.400M14.500 14v1.500"/>',sw:1.800},
    diamond:{p:'<path d="M6.500 4h11L21 9l-9 11L3 9z"/><path d="M3 9h18M9.500 4 8 9l4 11 4-11-1.500-5"/>',sw:1.700},
    scan:{p:'<path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3M4 12h16"/>',sw:2},
    bagO:{p:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/>',sw:1.800},
    ques:{p:'<circle cx="12" cy="12" r="9.500"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 1-1 1.700M12 17v.1"/>',sw:1.800},
    info:{p:'<circle cx="12" cy="12" r="9.500"/><path d="M12 11v6M12 7.500v.1"/>',sw:1.600}
  };
  const svg=(n,s=24,st="")=>{const i=I[n];return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="'+(i.f?"currentColor":"none")+'" stroke="'+(i.f&&!i.sw?"none":"currentColor")+'" stroke-width="'+(i.sw||2)+'" stroke-linecap="round" stroke-linejoin="round"'+(st?' style="'+st+'"':"")+'>'+i.p+'</svg>'};
  const BAG='<path d="M4.500 10h19l-1.600 13.500a2.500 2.500 0 0 1-2.500 2.200H8.600a2.500 2.500 0 0 1-2.500-2.200z" fill="#ee7230"/><path d="M10.500 15.500v1a3.500 3.500 0 0 0 7 0v-1" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round"/>';
  const C={
    logo:[28,'<path d="M14 25.500c-4.800 0-8-3.300-8-7.400 0-3.900 3.100-7.100 8-7.100s8 3.200 8 7.100c0 4.100-3.200 7.400-8 7.400z" fill="#ee712d"/><circle cx="14" cy="18.100" r="2.800" fill="#fff"/><path d="M14 11C10.500 11 8.800 8.700 8.800 6.300c3.300 0 5.200 1.700 5.200 4.700z" fill="#3f9b5f"/><path d="M14 11c0-2.600 1.500-4.700 5.400-4.700 0 2.600-1.800 4.700-5.400 4.700z" fill="#2f8f55"/>'],
    bag:[28,'<path d="M9.500 10 11 5.500a2 2 0 0 1 1.900-1.400h2.200a2 2 0 0 1 1.900 1.400L18.500 10" fill="none" stroke="#f26b1d" stroke-width="2.600" stroke-linecap="round"/>'+BAG],
    used:[28,'<path d="M10 9.500 13 3.500h7.500l-2.500 6z" fill="#f7c35a"/>'+BAG],
    job:[28,'<circle cx="12.500" cy="12.500" r="9" fill="none" stroke="#ee7230" stroke-width="3.200"/><path d="m19.500 19.500 6 6" stroke="#ee7230" stroke-width="3.600" stroke-linecap="round"/><circle cx="12.500" cy="10" r="3.200" fill="#f5a14d"/><path d="M6.500 18.500a6 6 0 0 1 12 0z" fill="#f5a14d"/>'],
    house:[28,'<path d="M3 12.500 14 3l11 9.500V23a2.500 2.500 0 0 1-2.500 2.500h-17A2.500 2.500 0 0 1 3 23z" fill="#c95fc5"/><path d="M3 12.500 14 3l11 9.500-1.800 1.800L14 6.700 4.800 14.300z" fill="#a23bab"/><g fill="#fff"><rect x="9.500" y="16" width="3" height="3" rx=".8"/><rect x="15.500" y="16" width="3" height="3" rx=".8"/><rect x="9.500" y="21" width="3" height="3" rx=".8"/><rect x="15.500" y="21" width="3" height="3" rx=".8"/></g>'],
    gb:[28,'<path d="M5 4h18v13l-9 8-9-8z" fill="#e8506a" stroke="#e8506a" stroke-width="2.400" stroke-linejoin="round"/><path d="M18.500 8.500 9.500 17" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="9.500" r="1.800" fill="#fff"/><circle cx="18" cy="16" r="1.800" fill="#fff"/>'],
    shoe:[28,'<path d="M3 17.500c0-1.800.8-3 2.600-3.600L11 8l3.500 3.200 6.300 2.700c2.500 1 4.200 2.500 4.200 5V21H3z" fill="#ee7230"/><path d="M3 20.500h22v3.200H3z" fill="#f7c35a"/>'],
    wash:[28,'<path d="M9 3 3 7l2.500 4.500L8 10.500V24h10V10.500l2.500 1L23 7l-6-4c-.5 1.500-2 2.500-4 2.500S9.500 4.500 9 3z" fill="#5db2f0"/><circle cx="20" cy="22" r="4.500" fill="#3a78d8"/>'],
    car:[28,'<path d="M6 11.500 8.200 5.800A2.500 2.500 0 0 1 10.500 4h7a2.500 2.500 0 0 1 2.300 1.800L22 11.500c1.700.6 3 2.100 3 4V22a1.500 1.500 0 0 1-1.500 1.500H21v2H7v-2H4.500A1.500 1.500 0 0 1 3 22v-6.500c0-1.900 1.300-3.400 3-4z" fill="#4a8cf0"/><path d="M10.200 6.500h7.600l1.700 4.500H8.500z" fill="#d6e8ff"/><circle cx="8" cy="16.500" r="1.600" fill="#fff"/><circle cx="20" cy="16.500" r="1.600" fill="#fff"/>'],
    all:[28,'<circle cx="14" cy="14" r="12.500" fill="none" stroke="#cfd2d6" stroke-width="1.400"/><path d="m12 8.500 5.500 5.500-5.500 5.500" fill="none" stroke="#868b94" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round"/>'],
    wand:[28,'<path d="m5 25 12-12" stroke="#b55a2b" stroke-width="3.500" stroke-linecap="round"/><path d="M19 4l1.600 4 4 1.600-4 1.600L19 15l-1.600-3.800-4-1.600 4-1.600z" fill="#e8506a"/><path d="M8 6 8.800 8l2 .8-2 .8L8 11.600 7.200 9.600 5.200 8.800l2-.8z" fill="#ee712d"/><circle cx="24" cy="20" r="1.400" fill="#e8506a"/>'],
    spark:[28,'<path d="M11 8 13.200 14.800 20 17 13.200 19.200 11 26 8.800 19.200 2 17 8.800 14.800z" fill="#ee712d"/><path d="M20 2l1.400 3.600L25 7l-3.600 1.400L20 12l-1.400-3.600L15 7l3.600-1.400z" fill="#c455a8"/>'],
    check:[24,'<circle cx="12" cy="12" r="11" fill="#4ca56b"/><path d="m7 12.200 3.300 3.300L17 8.800" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/>'],
    face:[24,'<circle cx="12" cy="12" r="11" fill="#fbc470"/><path d="M7.200 10.500c.8-.9 1.800-.9 2.600 0M14.200 10.500c.8-.9 1.800-.9 2.600 0M8.500 14.800c1.800 1.600 5.200 1.600 7 0" fill="none" stroke="#a45a1a" stroke-width="1.200" stroke-linecap="round"/><circle cx="6.800" cy="14" r="2" fill="#f79a8c" opacity=".7"/><circle cx="17.200" cy="14" r="2" fill="#f79a8c" opacity=".7"/>'],
    adchat:[24,'<rect x="2" y="3" width="20" height="16" rx="3" fill="#ee712d"/><path d="M6 19v4l5-4z" fill="#ee712d"/><path d="M6.500 9h11M6.500 13h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'],
    star:[24,'<path d="m12 2.500 2.900 6 6.600.9-4.800 4.600 1.200 6.500L12 17.400 6.100 20.500l1.200-6.500L2.500 9.400l6.600-.9z" fill="#ee712d"/>'],
    ph:[80,'<g fill="none" stroke="#dcdee2" stroke-width="7" stroke-linecap="round"><circle cx="36" cy="36" r="25"/><path d="M54 54l17 17"/></g><circle cx="36" cy="30" r="9" fill="#dcdee2"/><path d="M19 52a17 17 0 0 1 34 0z" fill="#dcdee2"/>']
  };
  const col=(n,s=24)=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 '+C[n][0]+' '+C[n][0]+'">'+C[n][1]+'</svg>';
  const avatar=(s,st="")=>'<svg class="kg-av" width="'+s+'" height="'+s+'" viewBox="0 0 48 48" style="border-radius:50%;'+st+'"><rect width="48" height="48" fill="#c9cbd0"/><circle cx="24" cy="19" r="8" fill="#fff"/><ellipse cx="24" cy="44" rx="15" ry="11" fill="#fff"/></svg>';

  const style=document.createElement("style");
  const R=[
    ".kg-screen{position:absolute;inset:0;display:flex;flex-direction:column;background:#fff}",
    ".kg-screen.gray{background:#f4f5f6}",
    ".kg-top{position:relative;flex:none;height:calc(var(--kst) + 56px);padding:var(--kst) 6px 0 16px;display:flex;align-items:center}",
    ".kg-top.b{padding-left:5px}",
    ".kg-top.c .kg-t{position:absolute;left:0;right:0;bottom:0;height:56px;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:700;letter-spacing:-.04em;pointer-events:none}",
    ".kg-h{font-size:21px;font-weight:700;letter-spacing:-.04em}",
    ".kg-sp{flex:1}",
    ".kg-ib{position:relative;width:44px;height:44px;display:grid;place-items:center;flex:none;color:#212529}",
    ".kg-dot{position:absolute;left:30px;top:6px;width:8px;height:8px;border-radius:50%;background:#ee712d}",
    ".kg-loc{display:flex;align-items:center;min-width:0;color:#212529}",
    ".kg-loc b{font-size:21px;font-weight:700;letter-spacing:-.04em;margin-left:4px;white-space:nowrap}",
    ".kg-loc b.g{color:#b4b8be;margin-left:9px}",
    ".kg-search{flex:none;margin:2px 16px 0;height:40px;border-radius:10px;background:#f1f2f4;display:flex;align-items:center;gap:8px;padding:0 12px;color:#868b94}",
    ".kg-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;font-size:16px;color:#212529}",
    ".kg-chips{flex:none;display:flex;gap:8px;padding:0 16px 10px;margin-top:10px;overflow-x:auto;scrollbar-width:none}",
    ".kg-chips::-webkit-scrollbar{display:none}",
    ".kg-chip{flex:none;height:40px;padding:0 16px;border-radius:20px;background:#f1f2f4;color:#2c2f34;font-size:15px;font-weight:500;display:flex;align-items:center;gap:2px;white-space:nowrap}",
    ".kg-chip.on{background:#2a2e35;color:#fff}",
    ".kg-chips.s{margin-top:17px}.kg-chips.s .kg-chip{height:35px;border-radius:18px;padding:0 17px}",
    ".kg-chips.g .kg-chip{background:#e8eaed}.kg-chips.g .kg-chip.on{background:#2a2e35}",
    ".kg-content{flex:1;min-height:0;overflow-y:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}",
    ".kg-content::-webkit-scrollbar{display:none}",
    ".kg-feed{padding:8px 16px 110px}",
    ".kg-item{display:flex;gap:15px;padding:16px 0;border-bottom:1px solid #eef0f2;cursor:pointer}",
    ".kg-photo{position:relative;width:128px;height:128px;flex:none;border-radius:10px;display:grid;place-items:center;font-size:56px;overflow:hidden}",
    ".kg-photo:after{content:'';position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(0,0,0,.06)}",
    ".kg-photo.ph{background:#f5f6f7}.kg-photo.ph:after{border-color:#e3e5e8}",
    ".kg-info{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start}",
    ".kg-title{font-size:16px;line-height:23px;color:#212529;padding-right:30px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:-.03em}",
    ".kg-meta{font-size:14px;line-height:20px;color:#868b94;margin-top:3px;letter-spacing:-.02em}",
    ".kg-price{font-size:17px;line-height:28px;font-weight:700}",
    ".kg-buy{display:inline-flex;align-items:center;gap:3px;height:20px;margin-top:1px;padding:0 6px 0 4px;border-radius:5px;background:#fdeee4;color:#d15209;font-size:14px;font-weight:700}",
    ".kg-more{position:absolute;right:-10px;top:-7px;width:36px;height:36px;display:grid;place-items:center;color:#3b3f45}",
    ".kg-stat{position:absolute;right:0;bottom:0;display:flex;align-items:center;gap:2px;font-size:14px;line-height:20px;color:#868b94}",
    ".kg-stat svg{color:#c5c8cd}.kg-stat i{font-style:normal;margin-right:5px}.kg-stat i:last-child{margin-right:0}",
    ".kg-empty{padding:60px 20px;text-align:center;color:#868b94;font-size:15px;line-height:1.7}",
    ".kg-fab{position:absolute;right:20px;bottom:103px;height:47px;padding:0 20px 0 14px;border-radius:24px;background:#ee712d;color:#fff;display:flex;align-items:center;gap:3px;font-size:18px;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.18);z-index:4}",
    ".kg-nav{position:absolute;left:0;right:0;bottom:0;height:83px;padding:0 21px 21px;background:#fff;border-top:1px solid #efefef;z-index:5}",
    ".kg-pill{position:relative;isolation:isolate;height:62px;display:flex;padding:0 15px;border:1px solid #dcdee1;border-radius:31px;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.08)}",
    ".kg-pill button{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;color:#212529;font-size:12px;font-weight:500;letter-spacing:-.03em;white-space:nowrap}",
    ".kg-pill button.on:before{content:'';position:absolute;left:50%;top:50%;width:84px;height:54px;margin:-27px 0 0 -42px;border-radius:27px;background:#f1f2f4;z-index:-1}",
    ".kg-nb{position:absolute;top:8px;left:calc(50% + 6px);min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#ee712d;color:#fff;font-style:normal;font-size:12px;font-weight:700;line-height:17px;text-align:center}",
    ".kg-card{background:#fff;border-radius:22px;margin:0 16px 12px;padding:16px}",
    ".kg-my{padding-bottom:110px}",
    ".kg-prof{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;margin-top:12px}",
    ".kg-prof b{font-size:21px;font-weight:700;letter-spacing:-.04em;margin-right:-8px}",
    ".kg-badge{height:20px;padding:0 9px;border-radius:10px;background:#fdeee4;color:#ee712d;font-size:16px;font-weight:700;line-height:20px;letter-spacing:-.02em}",
    ".kg-payrow{display:flex;align-items:center;height:36px}",
    ".kg-paytxt{font-size:23px;font-weight:800;color:#ee712d;letter-spacing:-.04em;margin:0 16px 0 2px;line-height:1}",
    ".kg-payrow>button:not(.kg-pbtn){font-size:16.5px;font-weight:500;color:#2c2f34}",
    ".kg-vl{width:1px;height:18px;background:#e3e5e8;margin:0 17px}",
    ".kg-pbtn{height:36px;padding:0 14px 0 12px;border-radius:18px;background:#2a2e35;color:#fff;display:flex;align-items:center;gap:3px;font-size:16px;font-weight:700}",
    ".kg-bal{margin-top:9px;height:43px;border-radius:14px;background:#f1f2f4;display:flex;align-items:center}",
    ".kg-bal button{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;font-size:16px;color:#6b7076;letter-spacing:-.03em}",
    ".kg-bal b{color:#212529;font-weight:700}.kg-bal svg{color:#868b94}",
    ".kg-bal .kg-vl{height:18px;margin:0}",
    ".kg-grid{display:grid;grid-template-columns:repeat(4,1fr);row-gap:20px;padding:16px 6px}",
    ".kg-grid button,.kg-quick button{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:15px;color:#212529;letter-spacing:-.03em}",
    ".kg-quick{display:grid;grid-template-columns:repeat(4,1fr);padding:16px 6px 21px}",
    ".kg-quick button{position:relative;gap:0}",
    ".kg-quick button+button:before{content:'';position:absolute;left:0;top:15px;width:1px;height:22px;background:#e9ebee}",
    ".kg-sec{font-size:17px;font-weight:700;line-height:24px;letter-spacing:-.03em}",
    ".kg-use{padding:14px 16px 4px}.kg-use .kg-sec{margin-bottom:5px}",
    ".kg-row{width:100%;height:56px;display:flex;align-items:center;gap:11px;padding-left:0;font-size:16px;letter-spacing:-.03em;text-align:left}",
    ".kg-row svg:first-child{margin-left:-1px}.kg-row span{flex:1}.kg-row .c{color:#868b94}",
    ".kg-ad{margin:17px 16px 0;padding:12px;border:1px solid #e6e8eb;border-radius:18px;cursor:pointer}",
    ".kg-adtop{display:flex;gap:10px;align-items:flex-start}.kg-adtx{flex:1;min-width:0}",
    ".kg-adt{font-size:16px;font-weight:600;line-height:22px;letter-spacing:-.03em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
    ".kg-ads{display:flex;align-items:center;gap:3px;margin-top:3px;font-size:14px;line-height:20px;color:#868b94;white-space:nowrap}",
    ".kg-ads em{font-style:normal;max-width:148px;overflow:hidden;text-overflow:ellipsis}",
    ".kg-adr{display:flex;align-items:center;gap:3px;margin-top:3px;font-size:16px;line-height:22px;color:#868b94}.kg-adr b{color:#212529;font-weight:700}",
    ".kg-adimg{width:68px;height:68px;flex:none;border-radius:8px;background:linear-gradient(160deg,#1f2e46,#0f1a2b);color:#fff;font-size:12px;font-weight:800;line-height:1.1;padding:8px 6px;overflow:hidden}.kg-adimg em{font-style:normal;color:#f7e04a;font-size:15px}",
    ".kg-adbar{margin-top:10px;height:39px;border-radius:9px;background:#f4f5f6;display:flex;align-items:center;gap:10px;padding:0 10px 0 11px;font-size:16px;font-weight:500;letter-spacing:-.03em}.kg-adbar span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".kg-room{display:flex;align-items:center;gap:16px;padding:14px 16px;cursor:pointer}",
    ".kg-rav{position:relative;width:56px;height:56px;flex:none}",
    ".kg-rav .m{position:absolute;inset:0;border-radius:10px;display:grid;place-items:center;font-size:26px;overflow:hidden;border:1px solid rgba(0,0,0,.05)}",
    ".kg-rav .m.o{border-radius:50%}.kg-rav .m.logo{background:#fff;border:1px solid #e6e8eb}",
    ".kg-rav .s{position:absolute;left:32px;top:32px;width:32px;height:32px;border-radius:50%;border:2px solid #fff;background:#fff}",
    ".kg-rtx{flex:1;min-width:0}",
    ".kg-rn{display:flex;align-items:center;gap:4px;height:22px;white-space:nowrap;overflow:hidden}",
    ".kg-rn b{font-size:16px;font-weight:700;letter-spacing:-.03em}.kg-room.rd .kg-rn b{font-weight:500}",
    ".kg-rn span{font-size:14px;color:#868b94;margin-left:1px}",
    ".kg-rm{display:flex;align-items:center;gap:8px;height:22px}",
    ".kg-rm span{flex:1;min-width:0;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.03em}.kg-room.rd .kg-rm span{color:#868b94}",
    ".kg-bd{flex:none;min-width:17px;height:17px;padding:0 5px;border-radius:9px;background:#ee712d;color:#fff;font-style:normal;font-size:12px;font-weight:700;line-height:17px;text-align:center}",
    ".kg-sales{padding:20px 16px 40px}",
    ".kg-sale{background:#fff;border-radius:24px;padding:12px 16px 16px;margin-bottom:12px}",
    ".kg-sh{display:flex;align-items:center;gap:6px;height:26px}.kg-sh b{font-size:17px;font-weight:700;letter-spacing:-.03em}",
    ".kg-buyt{display:flex;align-items:center;gap:2px;color:#f26b0f;font-size:17px;font-weight:800;letter-spacing:-.03em}",
    ".kg-sh .kg-more{position:static;width:30px;height:30px;margin-right:-8px}",
    ".kg-srow{display:flex;gap:10px;margin-top:10px;cursor:pointer}",
    ".kg-sphoto{width:72px;height:72px;flex:none;border-radius:12px;display:grid;place-items:center;font-size:34px;overflow:hidden}",
    ".kg-sinfo{flex:1;min-width:0}.kg-sinfo .kg-stit{font-size:16px;line-height:24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.03em;margin-top:0}",
    ".kg-sinfo .kg-meta{margin-top:2px;font-size:14px}.kg-sinfo .kg-price{line-height:26px}",
    ".kg-sstat{height:22px;display:flex;justify-content:flex-end;align-items:center;gap:2px;font-size:15px;color:#868b94}.kg-sstat svg{color:#c5c8cd}.kg-sstat i{font-style:normal;margin-right:6px}.kg-sstat i:last-child{margin-right:0}",
    ".kg-lift{display:block;width:100%;height:36px;margin-top:13px;border-radius:10px;background:#f3f4f6;font-size:16px;font-weight:700}",
    ".kg-tip{margin-top:12px;border-radius:12px;background:linear-gradient(90deg,#fdeeea,#fdf4ee);padding:13px 12px;display:flex;gap:10px;align-items:flex-start}",
    ".kg-tip p{flex:1;margin:0;font-size:15.5px;line-height:20.5px;color:#343a40;letter-spacing:-.03em}.kg-tip b{color:#212529;font-weight:700}.kg-tip u{color:#212529}",
    ".kg-tip svg{margin-top:2px}",
    ".kg-dscreen{position:absolute;inset:0;background:#fff}",
    ".kg-dscroll{position:absolute;left:0;right:0;top:0;bottom:105px;overflow-y:auto;scrollbar-width:none}.kg-dscroll::-webkit-scrollbar{display:none}",
    ".kg-dh{position:absolute;top:0;left:0;right:0;z-index:3;height:calc(var(--kst) + 56px);padding:var(--kst) 6px 0 5px;display:flex;align-items:center;color:#fff;background:linear-gradient(rgba(0,0,0,.32),rgba(0,0,0,0));transition:background .15s}",
    ".kg-dh .kg-ib{color:inherit}.kg-dscreen.sc .kg-dh{background:#fff;color:#212529}",
    ".kg-hero{position:relative;width:100%;aspect-ratio:1;display:grid;place-items:center;font-size:150px}.kg-hero.ph{background:#f5f6f7}",
    ".kg-cnt{position:absolute;right:12px;bottom:12px;height:25px;padding:0 11px;border-radius:13px;background:rgba(40,40,40,.88);color:#fff;font-size:15px;font-weight:500;line-height:25px;letter-spacing:0}",
    ".kg-seller{display:flex;align-items:center;gap:12px;margin:0 16px;padding:19px 0 18px;border-bottom:1px solid #eceef0}",
    ".kg-seller .n{flex:1;min-width:0}.kg-seller b{display:block;font-size:17px;line-height:22px;font-weight:700;letter-spacing:-.03em}.kg-seller small{display:block;font-size:15px;line-height:20px;color:#868b94}",
    ".kg-seller .t{display:flex;align-items:center;gap:6px;justify-content:flex-end;color:#ee712d;font-size:18px;font-weight:700;line-height:22px}",
    ".kg-seller .r{text-align:right}.kg-seller u{display:block;font-size:14px;line-height:20px;color:#868b94}",
    ".kg-db{padding:23px 16px 28px}",
    ".kg-dt{margin:0;font-size:22px;line-height:32px;font-weight:700;letter-spacing:-.04em}",
    ".kg-dp{display:flex;align-items:center;gap:9px;margin-top:9px;font-size:22px;line-height:30px;font-weight:800;letter-spacing:-.03em}",
    ".kg-pay{display:flex;align-items:center;gap:1px}.kg-pay b{font-size:20px;font-weight:800;color:#ee712d;letter-spacing:-.04em}",
    ".kg-dc{margin-top:8px;font-size:16px;line-height:22px;color:#868b94}.kg-dc u{color:#868b94}",
    ".kg-dd{margin-top:18px;font-size:17px;line-height:25.3px;letter-spacing:-.02em}",
    ".kg-dn{margin-top:34px;font-size:16px;line-height:22px;color:#868b94}",
    ".kg-dr{margin-top:22px;font-size:16px;line-height:22px;color:#868b94;text-decoration:underline}",
    ".kg-da{display:flex;align-items:center;gap:7px;margin-top:44px;font-size:18px;font-weight:700;line-height:24px;letter-spacing:-.03em}.kg-da svg{color:#9a9ea5}",
    ".kg-dl{display:flex;gap:10px;margin:22px -16px 0;padding:0 16px;overflow-x:auto;scrollbar-width:none}.kg-dl::-webkit-scrollbar{display:none}",
    ".kg-dli{flex:none;width:108px}.kg-dli i{display:grid;place-items:center;width:108px;height:108px;border-radius:12px;font-size:48px;font-style:normal}",
    ".kg-dli p{margin:8px 0 0;font-size:15px;line-height:19px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.kg-dli b{display:block;margin-top:4px;font-size:17px;font-weight:700}",
    ".kg-dbar{position:absolute;left:0;right:0;bottom:0;height:105px;padding:11px 16px 0 9px;border-top:1px solid #f0f1f3;background:#fff;display:flex;gap:7px;align-items:flex-start;z-index:3}",
    ".kg-heart{width:38px;height:52px;display:grid;place-items:center;color:#212529}.kg-heart.on{color:#ee712d}",
    ".kg-chatbtn{flex:1;height:52px;border-radius:16px;background:#ff6a00;color:#fff;font-size:19px;font-weight:700}",
    ".kg-msgs{flex:1;min-height:0;overflow-y:auto;scrollbar-width:none;padding:10px 16px 130px}.kg-msgs::-webkit-scrollbar{display:none}",
    ".kg-slot{flex:none;height:61px;border-bottom:1px solid #eef0f2}",
    ".kg-ct{display:flex;flex-direction:column;align-items:center;gap:0;margin-left:-4px}",
    ".kg-ct .a{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:700;line-height:26px;letter-spacing:-.04em}",
    ".kg-ct .a i{font-style:normal;height:22px;padding:0 9px;border-radius:11px;background:#fdeee4;color:#ee712d;font-size:16px;line-height:22px}",
    ".kg-ct small{font-size:14px;line-height:20px;color:#868b94}",
    ".kg-date{text-align:center;font-size:15px;line-height:22px;color:#868b94;margin:0 0 15px}",
    ".kg-mrow{display:flex;align-items:flex-end;gap:5px;margin-bottom:12px}.kg-mrow.me{justify-content:flex-end}.kg-mrow .kg-av{margin-right:3px;align-self:flex-start}",
    ".kg-bub{max-width:calc(100% - 100px);padding:9px 12px;border-radius:20px;background:#f1f2f4;font-size:17px;line-height:22.5px;letter-spacing:-.02em;word-break:break-word}",
    ".kg-bub.me{max-width:calc(100% - 59px);background:#ee712d;color:#fff}",
    ".kg-tm{font-style:normal;font-size:13px;line-height:18px;color:#adb5bd;white-space:nowrap}",
    ".kg-ai{position:absolute;left:16px;bottom:99px;width:35px;height:35px;border-radius:50%;background:#fff;border:1px solid #eceef0;box-shadow:0 2px 8px rgba(0,0,0,.08);display:grid;place-items:center}",
    ".kg-compose{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:8px;padding:0 9px 40px 8px;background:#fff}",
    ".kg-compose>button{width:32px;height:40px;display:grid;place-items:center;color:#868b94;flex:none}.kg-compose>button.send{color:#c5c8cd}.kg-compose>button.send.on{color:#ee712d}",
    ".kg-inp{flex:1;min-width:0;height:40px;border-radius:20px;background:#f3f4f5;display:flex;align-items:center;padding:0 5px 0 14px}",
    ".kg-inp input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;font-size:16px;color:#212529}.kg-inp input::placeholder{color:#aeb3ba}",
    ".kg-inp span{position:relative;color:#868b94}.kg-inp span i{position:absolute;right:1px;top:1px;width:7px;height:7px;border-radius:50%;background:#ee712d}",
    ".kg-dim{position:absolute;inset:0;background:rgba(0,0,0,.2);z-index:10}",
    ".kg-sheet{position:absolute;left:8px;right:9px;bottom:8px;z-index:11;background:#fff;border-radius:38px;padding:24px 24px 48px;animation:kgUp .2s ease-out}",
    ".kg-grab{position:absolute;left:50%;top:8px;width:57px;height:4px;margin-left:-28px;border-radius:2px;background:#c9ccd1}",
    ".kg-sheet h3{margin:0;font-size:21px;line-height:28px;font-weight:700;letter-spacing:-.04em}",
    ".kg-sheet p{margin:10px 0 0;font-size:16px;line-height:22px;color:#868b94;letter-spacing:-.02em}",
    ".kg-hoods{margin-top:16px}.kg-hood{display:flex;align-items:center;gap:12px;height:58px;font-size:17px;cursor:pointer}.kg-hood>span:nth-child(2){flex:1}",
    ".kg-radio{width:23px;height:23px;border-radius:50%;border:1.5px solid #d8dadf;flex:none}.kg-radio.on{border:6px solid #2a2e35}",
    ".kg-hood .kg-ib{width:36px;height:36px;margin-right:-6px;color:#868b94}",
    ".kg-help{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;height:24px;font-size:17px;font-weight:700;color:#868b94;letter-spacing:-.03em}",
    ".kg-sheet.act{padding:14px 24px 30px}.kg-arow{display:block;width:100%;height:56px;text-align:left;font-size:17px}.kg-arow.d{color:#e5484d}",
    ".kg-toast{position:absolute;bottom:110px;left:50%;transform:translateX(-50%);background:rgba(33,37,41,.92);color:#fff;padding:10px 16px;border-radius:20px;font-size:13px;z-index:30;white-space:nowrap}",
    "@keyframes kgUp{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}"
  ];
  style.textContent="#dg-app{--kst:max(env(safe-area-inset-top,0px),54px);position:absolute;inset:0;z-index:6;display:none;overflow:hidden;background:#fff;color:#212529;font-family:'Pretendard Variable',Pretendard,-apple-system,'Apple SD Gothic Neo',var(--font,Arial,sans-serif);letter-spacing:-.025em;-webkit-font-smoothing:antialiased}#dg-app.show{display:block}#dg-app *{box-sizing:border-box}#dg-app svg{display:block;flex:none}#dg-app button{font:inherit;letter-spacing:inherit;border:0;padding:0;background:none;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}#dg-app button:active{opacity:.7}"+R.map(r=>r.replace(/^[^{]+/,s=>s.split(",").map(x=>"#dg-app "+x.trim()).join(","))).join("");
  document.head.appendChild(style);

  /* ---------- 공통 조각 ---------- */
  const T=m=>' data-toast="'+m+'"';
  const stat=(k,a,b)=>'<span class="kg-stat">'+svg(k==="people"?"peopleS":"chatF",18,"--dc:#fff")+'<i>'+a+'</i>'+svg("heartF",18)+'<i>'+b+'</i></span>';
  function item(p){
    const ph=p.ph?'<span class="kg-photo ph">'+col("ph",84)+'</span>':'<span class="kg-photo" style="background:'+p.bg+'">'+(p.emoji||"")+'</span>';
    const s=p.st||["chat",0,0];
    return '<div class="kg-item" data-product="'+p.id+'">'+ph+'<div class="kg-info"><span class="kg-title">'+esc(p.title)+'</span><span class="kg-meta">'+esc(p.meta||sMeta(p))+'</span><span class="kg-price">'+esc(fmt(p.price))+'</span>'+(p.buy?'<span class="kg-buy">'+col("bag",16)+'바로구매</span>':"")+stat(s[0],s[1],s[2]+(liked.has(p.id)?1:0))+'<button class="kg-more"'+T("게시글 메뉴")+'>'+svg("more",20)+'</button></div></div>'}
  function feedHTML(){
    const q=query.trim().toLowerCase();
    const list=products.filter(p=>(category==="전체"||(category==="알바"&&p.cat==="알바")||(category==="가까운 동네"&&p.near))&&(!q||(p.title+p.meta+p.cat).toLowerCase().includes(q)));
    return list.length?list.map(item).join(""):'<div class="kg-empty">검색 결과가 없어요.<br>다른 검색어를 입력해보세요.</div>'}
  const unreadAll=()=>rooms.reduce((s,r)=>s+r.unread,0);
  function nav(){
    const tabs=[["home","홈","homeO","homeF"],["community","커뮤니티","commO","commO"],["map","동네지도","pinO","pinO"],["chat","채팅","chatO","chatF"],["my","나의 당근","persO","persF"]];
    return '<nav class="kg-nav"><div class="kg-pill">'+tabs.map(([id,l,o,f])=>{const on=page===id;return '<button data-tab="'+id+'" class="'+(on?"on":"")+'">'+svg(on?f:o,26,on?"--dc:#f1f2f4":"")+'<span>'+l+'</span>'+(id==="chat"&&unreadAll()?'<i class="kg-nb">'+unreadAll()+'</i>':"")+'</button>'}).join("")+'</div></nav>'}
  const chip=(x,arrow)=>'<button class="kg-chip '+(category===x?"on":"")+'" data-cat="'+x+'">'+x+(arrow?svg("arrowUR",18):"")+'</button>';

  /* ---------- 홈 ---------- */
  function homeScreen(){
    const other=hoods.length>1?hoods[1-hoodIdx]:"";
    return '<section class="kg-screen"><header class="kg-top"><button class="kg-loc" data-act="location">'+svg("pinF",20)+'<b>'+esc(hoods[hoodIdx])+'</b>'+(other?'<b class="g">'+esc(other)+'</b>':"")+'</button><span class="kg-sp"></span><button class="kg-ib" data-act="search">'+svg("search",26)+'</button><button class="kg-ib"'+T("새로운 알림이 없어요")+'>'+svg("bell",26)+'<i class="kg-dot"></i></button><button class="kg-ib"'+T("전체 메뉴")+'>'+svg("menu",26)+'</button></header>'+(searching?'<div class="kg-search">'+svg("search",20)+'<input id="kg-query" placeholder="검색어를 입력하세요" value="'+esc(query)+'"></div>':"")+'<div class="kg-chips">'+chip("전체")+chip("중고차",1)+chip("알바",1)+chip("부동산",1)+chip("가까운 동네")+'</div><div class="kg-content kg-feed">'+feedHTML()+'</div></section>'+nav()+'<button class="kg-fab" data-act="write">'+svg("plus",22)+'글쓰기</button>'}

  /* ---------- 채팅 ---------- */
  function room(r){
    const av=r.kind==="logo"?'<span class="m o logo">'+col("logo",38)+'</span>':r.kind==="face"?'<span class="m o" style="background:linear-gradient(160deg,#dfe8f6,#b9c8e0);font-size:30px">🧑</span>':'<span class="m" style="background:'+r.tb+'">'+(r.ph?col("logo",34).replace('<svg','<svg opacity=".12"'):(r.emoji||""))+'</span>'+avatar(32,"").replace('class="kg-av"','class="kg-av s"');
    return '<div class="kg-room '+(r.unread?"":"rd")+'" data-chat="'+r.id+'"><div class="kg-rav">'+av+'</div><div class="kg-rtx"><div class="kg-rn"><b>'+esc(r.name)+'</b>'+(r.official?col("check",20):"")+'<span>'+(r.loc?esc(r.loc)+" · ":"")+r.ago+'</span></div><div class="kg-rm"><span>'+esc(r.msg)+'</span>'+(r.unread?'<i class="kg-bd">'+r.unread+'</i>':"")+'</div></div></div>'}
  function chatScreen(){
    return '<section class="kg-screen"><header class="kg-top"><b class="kg-h">채팅</b><span class="kg-sp"></span><button class="kg-ib"'+T("채팅 알림")+'>'+svg("bell",26)+'<i class="kg-dot"></i></button><button class="kg-ib"'+T("채팅 설정")+'>'+svg("gear",26)+'<i class="kg-dot"></i></button></header><div class="kg-chips s">'+["전체","중고거래","모임","알바","부동산","중고차"].map((x,i)=>'<button class="kg-chip '+(i?"":"on")+'"'+(i?T("준비 중이에요"):"")+'>'+x+'</button>').join("")+'</div><div class="kg-content" style="padding-bottom:100px"><div class="kg-ad"'+T("광고")+'><div class="kg-adtop"><div class="kg-adtx"><div class="kg-adt">신림동 국비 디자인과정 선착순모집중</div><div class="kg-ads"><em>그린컴퓨터아트학원 인천구월점</em><span>· 구월동 · 광고</span>'+svg("info",17,"color:#9a9ea5")+'</div><div class="kg-adr">'+col("star",20)+'<b>4.6</b> · 후기 11</div></div><div class="kg-adimg">국비지원<br><em>무료<br>교육</em></div></div><div class="kg-adbar">'+col("adchat",22)+'<span>저는 6월말~8월 동안 전산회계, 전산세무 과정 수강하고 싶어요</span></div></div>'+rooms.map(room).join("")+'</div></section>'+nav()}
  function chatroom(){
    const r=rooms.find(x=>x.id===chatId)||rooms[1];
    const rows=r.msgs.map((m,i)=>(i===0||r.msgs[i-1].date!==m.date?'<div class="kg-date">'+m.date+'</div>':"")+(m.me?'<div class="kg-mrow me"><i class="kg-tm">'+m.time+'</i><div class="kg-bub me">'+esc(m.t)+'</div></div>':'<div class="kg-mrow">'+avatar(32)+'<div class="kg-bub">'+esc(m.t)+'</div><i class="kg-tm">'+m.time+'</i></div>')).join("");
    return '<section class="kg-screen"><header class="kg-top b"><button class="kg-ib" data-act="back">'+svg("back",26)+'</button><span class="kg-sp"></span><div class="kg-ct" style="position:absolute;left:0;right:0;bottom:0;height:56px;justify-content:center;pointer-events:none"><div class="a">'+esc(r.name)+(r.temp?'<i>'+r.temp+'°C</i>':"")+'</div>'+(r.loc?'<small>'+esc(r.loc)+', 보통 10분 이내 응답</small>':"")+'</div><button class="kg-ib"'+T("전화 걸기")+'>'+svg("phone",26)+'</button><button class="kg-ib"'+T("채팅방 메뉴")+'>'+svg("more",24)+'</button></header><div class="kg-slot"></div><div class="kg-msgs">'+rows+'</div><button class="kg-ai"'+T("AI 답장 추천")+'>'+col("spark",22)+'</button><form class="kg-compose" id="kg-compose"><button type="button"'+T("사진·파일 보내기")+'>'+svg("plus",30)+'</button><div class="kg-inp"><input id="kg-message" placeholder="메시지 보내기" autocomplete="off"><span>'+svg("smile",30)+'<i></i></span></div><button type="submit" class="send" id="kg-send">'+svg("send",28)+'</button></form></section>'}

  /* ---------- 나의 당근 ---------- */
  function myScreen(){
    const svc=[["used","중고거래"],["job","알바"],["house","부동산"],["gb","공동구매"],["shoe","동네걷기"],["wash","세탁 수거"],["car","중고차"],["all","전체보기"]];
    const q=[["heartO","관심목록",'data-act="favorites"'],["clock","최근 본",T("최근 본 게시글")],["ticket","쿠폰",T("쿠폰함")],["diamond","혜택",T("혜택")]];
    return '<section class="kg-screen gray"><header class="kg-top"><b class="kg-h">나의 당근</b><span class="kg-sp"></span><button class="kg-ib"'+T("설정")+'>'+svg("gear",26)+'</button></header><div class="kg-content kg-my"><div class="kg-card kg-prof"'+T("프로필")+'>'+avatar(48)+'<b>'+NAME+'</b><span class="kg-badge">38.1°C</span><span class="kg-sp"></span>'+svg("chev",24,"color:#868b94")+'</div><div class="kg-card"><div class="kg-payrow">'+col("logo",26)+'<b class="kg-paytxt">pay</b><button'+T("충전")+'>충전</button><i class="kg-vl"></i><button'+T("송금")+'>송금</button><span class="kg-sp"></span><button class="kg-pbtn"'+T("결제")+'>'+svg("scan",20)+'결제</button></div><div class="kg-bal"><button'+T("머니")+'>머니 <b>0원</b>'+svg("chev",16)+'</button><i class="kg-vl"></i><button'+T("포인트")+'>포인트 <b>0원</b>'+svg("chev",16)+'</button></div></div><div class="kg-card" style="padding:0"><div class="kg-grid">'+svc.map(([i,l])=>'<button'+T("준비 중이에요")+'>'+col(i,28)+'<span>'+l+'</span></button>').join("")+'</div></div><div class="kg-card" style="padding:0"><div class="kg-quick">'+q.map(([i,l,a])=>'<button '+a+'>'+svg(i,28,"stroke-width:1.7")+'<span>'+l+'</span></button>').join("")+'</div></div><div class="kg-card kg-use"><div class="kg-sec">자주 사용</div><button class="kg-row" data-act="sales">'+svg("receipt",28)+'<span>판매관리</span>'+svg("chev",24,"color:#868b94")+'</button></div><div class="kg-card kg-use"><div class="kg-sec">나의 거래</div><button class="kg-row" data-act="sales">'+svg("receipt",28)+'<span>판매내역</span>'+svg("chev",24,"color:#868b94")+'</button><button class="kg-row"'+T("구매내역")+'>'+svg("bagO",28)+'<span>구매내역</span>'+svg("chev",24,"color:#868b94")+'</button><button class="kg-row"'+T("당근가계부")+'>'+svg("clock",28)+'<span>당근가계부</span>'+svg("chev",24,"color:#868b94")+'</button></div></div></section>'+nav()}

  /* ---------- 판매관리 ---------- */
  function saleCard(x,first){
    const s=x.s2;
    return '<div class="kg-sale"><div class="kg-sh"><b>'+({sale:"판매중",sold:"거래완료",hide:"숨김"})[x.st]+'</b>'+(x.buy?'<span class="kg-buyt">'+col("bag",20)+'바로구매</span>':"")+'<span class="kg-sp"></span><button class="kg-more" data-act="salemore" data-id="'+x.id+'">'+svg("more",22)+'</button></div><div class="kg-srow" data-sale="'+x.id+'"><span class="kg-sphoto" style="background:'+x.bg+'">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="'+esc(x.title)+'" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">' :x.emoji)+'</span><div class="kg-sinfo"><div class="kg-stit">'+esc(x.title)+'</div><div class="kg-meta">'+esc(sMeta(x))+'</div><div class="kg-price">'+fmt(x.price)+'</div></div></div><div class="kg-sstat">'+svg("eye",19)+'<i>'+x.views+'</i>'+svg(s[0]==="heart"?"heartF":"chatF",19,"--dc:#fff")+'<i>'+s[1]+'</i></div>'+(x.st==="sale"?'<button class="kg-lift" data-act="lift" data-id="'+x.id+'">끌어올리기</button>':"")+(first&&banner&&x.st==="sale"?'<div class="kg-tip">'+col("wand",30)+'<p><b>판매글을 다듬을까요?</b> 자세히 쓴 판매자의 물품이 더 잘 팔려요. <u>수정안 보기</u></p><button data-act="closetip">'+svg("x",24)+'</button></div>':"")+'</div>'}
  function salesScreen(){
    const n=s=>mySales.filter(x=>x.st===s).length;
    const tabs=[["sale","판매중 "+n("sale")],["sold","거래완료 "+n("sold")],["hide","숨김"]];
    const list=mySales.filter(x=>x.st===saleTab);
    return '<section class="kg-screen gray"><header class="kg-top b c"><button class="kg-ib" data-act="back">'+svg("back",26)+'</button><span class="kg-t">판매관리</span><span class="kg-sp"></span><button data-act="write" style="font-size:18px;font-weight:500;padding:0 10px;height:44px;margin-right:0">글쓰기</button></header><div class="kg-chips g" style="margin-top:16px">'+tabs.map(([k,l])=>'<button class="kg-chip '+(saleTab===k?"on":"")+'" data-saletab="'+k+'">'+l+'</button>').join("")+'</div><div class="kg-content kg-sales">'+(list.length?list.map((x,i)=>saleCard(x,i===0)).join(""):'<div class="kg-empty">게시글이 없어요.</div>')+'</div></section>'}
  function favScreen(){
    const list=[...products,...mySales].filter(p=>liked.has(p.id));
    return '<section class="kg-screen"><header class="kg-top b c"><button class="kg-ib" data-act="back">'+svg("back",26)+'</button><span class="kg-t">관심목록</span></header><div class="kg-content kg-feed">'+(list.length?list.map(item).join(""):'<div class="kg-empty">'+svg("heartO",40,"margin:0 auto 12px;color:#c5c8cd")+'아직 관심 목록이 비어있어요.<br>마음에 드는 게시글에 하트를 눌러보세요.</div>')+'</div></section>'}

  /* ---------- 상세 ---------- */
  function detail(){
    const p=prodOf(selected);if(!p)return homeScreen();
    const lk=liked.has(p.id), n=p.imgs||1, chat=p.chat??1, like=(p.like??0)+(lk?1:0), view=p.view??p.views??10;
    const time=p.time||((p.lift?"끌올 ":"")+(p.ago||"방금 전"));
    const hero=p.ph?'<div class="kg-hero ph">'+col("ph",150)+'<i class="kg-cnt">1 / '+n+'</i></div>':'<div class="kg-hero" style="background:'+p.bg+'">'+(p.emoji||"")+'<i class="kg-cnt">1 / '+n+'</i></div>';
    const ads=[["📱","아이폰 18 프로 맥스 17 프로 맥스 케이스",6781,"linear-gradient(160deg,#e9d7d3,#cdb8b3)"],["📱","휴대폰 케이스 - 라이트 퍼플 라벤더",4832,"linear-gradient(160deg,#cfc8dc,#9d92b8)"],["📱","아이폰 18 프로 맥스 17 프로 맥스 케이스",6618,"linear-gradient(160deg,#e9d7d3,#cdb8b3)"],["📱","휴대폰 2D 입체 케이스",3790,"linear-gradient(160deg,#e6e6e6,#c9c9c9)"]];
    return '<section class="kg-dscreen'+"\""+'><div class="kg-dh"><button class="kg-ib" data-act="back">'+svg("back",26)+'</button><button class="kg-ib" data-act="home">'+svg("homeO",26)+'</button><span class="kg-sp"></span><button class="kg-ib"'+T("게시글 링크를 준비했어요")+'>'+svg("share",26)+'</button><button class="kg-ib"'+T("게시글 메뉴")+'>'+svg("more",24)+'</button></div><div class="kg-dscroll">'+hero+'<div class="kg-seller">'+avatar(42)+'<div class="n"><b>'+esc(p.seller||NAME)+'</b><small>'+esc(p.sloc||hoods[hoodIdx])+'</small></div><div class="r"><div class="t">'+(p.temp||"38.1")+'°C'+col("face",24)+'</div><u>매너온도</u></div></div><div class="kg-db"><h2 class="kg-dt">'+esc(p.title)+'</h2><div class="kg-dp">'+fmt(p.price)+(p.pay?'<span class="kg-pay">'+col("logo",24)+'<b>pay</b></span>':"")+'</div><div class="kg-dc"><u>'+esc(p.cat||"기타")+'</u> · '+esc(time)+'</div><div class="kg-dd">'+esc(p.desc||"판매자가 등록한 게시글이에요.").replace(/\n/g,"<br>")+'</div><div class="kg-dn">채팅 '+chat+' · 관심 '+like+' · 조회 '+view.toLocaleString("ko-KR")+'</div><div class="kg-dr">이 게시글 신고하기</div></div></div><div class="kg-dbar"><button class="kg-heart '+(lk?"on":"")+'" data-act="like" data-id="'+p.id+'">'+svg(lk?"heartF":"heartO",30)+'</button><button class="kg-chatbtn" data-act="message" data-id="'+p.id+'">채팅하기</button></div></section>'}

  /* ---------- 시트 / 토스트 ---------- */
  function sheetHTML(){
    if(!sheet)return "";
    if(sheet==="town")return '<div class="kg-dim" data-act="closesheet"></div><div class="kg-sheet"><i class="kg-grab"></i><h3>내 동네 설정</h3><p>최대 2개의 동네를 선택할 수 있어요.</p><div class="kg-hoods">'+hoods.map((h,i)=>'<div class="kg-hood" data-hood="'+i+'"><span class="kg-radio '+(i===hoodIdx?"on":"")+'"></span><span>'+esc(h)+'</span><button class="kg-ib" data-act="delhood" data-i="'+i+'">'+svg("x",24)+'</button></div>').join("")+(hoods.length<2?'<div class="kg-hood" data-act="addhood"><span style="width:23px;text-align:center;font-size:22px;color:#868b94">+</span><span style="color:#868b94">동네 추가</span></div>':"")+'</div><div class="kg-help">'+svg("ques",24)+'내 동네 설정이 무엇인가요?</div></div>';
    const x=mySales.find(s=>s.id===sheet.id);if(!x)return "";
    const acts=x.st==="sale"?[["sold","거래완료로 변경"],["hide","숨기기"]]:x.st==="sold"?[["sale","판매중으로 변경"],["hide","숨기기"]]:[["sale","숨김 해제"]];
    return '<div class="kg-dim" data-act="closesheet"></div><div class="kg-sheet act"><i class="kg-grab"></i>'+acts.map(([v,l])=>'<button class="kg-arow" data-act="salest" data-id="'+x.id+'" data-v="'+v+'">'+l+'</button>').join("")+'<button class="kg-arow d" data-act="salest" data-id="'+x.id+'" data-v="del">삭제</button></div>'}
  function toast(s){const n=document.createElement("div");n.className="kg-toast";n.textContent=s;el.appendChild(n);setTimeout(()=>n.remove(),1700)}

  /* ---------- 렌더 / 이동 ---------- */
  const scr=()=>el.querySelector(".kg-content,.kg-dscroll,.kg-msgs");
  function render(){
    if(!opened)return;
    const s0=scr();if(s0&&rendered)memo[rendered]=s0.scrollTop;
    const body=({home:homeScreen,chat:chatScreen,my:myScreen,sales:salesScreen,fav:favScreen,detail:detail,chatroom:chatroom})[page]();
    el.innerHTML=body+sheetHTML();rendered=page;
    const s=scr();if(s){s.scrollTop=page==="chatroom"?s.scrollHeight:(memo[page]||0)}
    const d=$(".kg-dscreen");if(d&&s)d.classList.toggle("sc",s.scrollTop>280);
  }
  function go(p){stack.push(page);if(p==="detail"||p==="chatroom")memo[p]=0;page=p;sheet=null;render()}
  function back(){page=stack.pop()||"home";sheet=null;render()}
  function open(){opened=true;setTimeout(()=>{if(opened)document.querySelector("#screen")?.classList.add("app-light")},140);el.classList.add("show");el.setAttribute("aria-hidden","false");page="home";stack=[];sheet=null;rendered=null;render()}
  function close(){opened=false;document.querySelector("#screen")?.classList.remove("app-light");el.classList.remove("show");el.setAttribute("aria-hidden","true")}
  const ap=d=>{const h=d.getHours();return (h<12?"오전 ":"오후 ")+(h%12||12)+":"+String(d.getMinutes()).padStart(2,"0")};
  function write(){
    const t=prompt("어떤 물건을 판매할까요?");if(!t||!t.trim())return;
    const pr=Number(String(prompt("가격을 입력하세요","0")||"0").replace(/\D/g,""))||0,id=Date.now(),title=t.trim();
    products.unshift({id,title,meta:hoods[hoodIdx]+" · 방금 전",price:pr,cat:"기타",bg:"#f1e5dc",emoji:"📦",st:["chat",0,0],seller:NAME,sloc:hoods[hoodIdx],temp:"38.1",time:"방금 전",chat:0,like:0,view:0,imgs:1,desc:"판매자가 등록한 게시글이에요."});
    mySales.unshift({id:id+1,title,loc:hoods[hoodIdx],ago:"방금 전",lift:0,price:pr,bg:"#f1e5dc",emoji:"📦",views:0,s2:["heart",0],st:"sale"});
    if(page!=="sales"){stack=[];page="home"}render();toast("게시글이 등록됐어요")}
  function act(a,b){
    const id=Number(b.dataset.id);
    if(a==="back")back();
    else if(a==="home"){stack=[];page="home";render()}
    else if(a==="search"){searching=!searching;if(!searching)query="";render();if(searching)$("#kg-query")?.focus()}
    else if(a==="location"){sheet="town";render()}
    else if(a==="closesheet"){sheet=null;render()}
    else if(a==="delhood"){const i=Number(b.dataset.i);if(hoods.length<2)toast("동네는 1개 이상 필요해요");else{hoods.splice(i,1);hoodIdx=0;render()}}
    else if(a==="addhood"){const n=prompt("추가할 동네를 입력하세요");if(n&&n.trim()){hoods.push(n.trim());render()}}
    else if(a==="like"){liked.has(id)?liked.delete(id):liked.add(id);const on=liked.has(id);b.classList.toggle("on",on);b.innerHTML=svg(on?"heartF":"heartO",30);const p=prodOf(id),dn=$(".kg-dn");if(dn&&p)dn.textContent="채팅 "+(p.chat??1)+" · 관심 "+((p.like??0)+(on?1:0))+" · 조회 "+(p.view??p.views??10).toLocaleString("ko-KR")}
    else if(a==="message"){const p=prodOf(id);let r=rooms.find(x=>x.pid===id);if(!r){r={id:Date.now(),pid:id,name:p.seller||NAME,loc:p.sloc,temp:p.temp,kind:"thumb",tb:p.bg||"#f5f6f7",emoji:p.emoji,ph:p.ph,ago:"방금 전",msg:"",unread:0,msgs:[]};rooms.unshift(r)}chatId=r.id;go("chatroom")}
    else if(a==="favorites")go("fav");
    else if(a==="sales")go("sales");
    else if(a==="write")write();
    else if(a==="closetip"){banner=false;render()}
    else if(a==="salemore"){sheet={id};render()}
    else if(a==="salest"){const i=mySales.findIndex(s=>s.id===id);if(i>-1){if(b.dataset.v==="del")mySales.splice(i,1);else mySales[i].st=b.dataset.v}sheet=null;render();toast("변경됐어요")}
    else if(a==="lift"){const x=mySales.find(s=>s.id===id);if(x){x.lift++;x.ago="방금 전";render();toast("끌어올렸어요")}}
  }

  /* ---------- 이벤트 ---------- */
  document.addEventListener("app:open",e=>{if(e.detail?.id==="danggeun")open()});
  document.addEventListener("app:close",e=>{if(!e.detail?.id||e.detail.id==="danggeun")close()});
  el.addEventListener("click",e=>{
    const t=e.target;
    const tt=t.closest("[data-toast]");if(tt){toast(tt.dataset.toast);return}
    const a=t.closest("[data-act]");if(a){act(a.dataset.act,a);return}
    const tab=t.closest("[data-tab]");if(tab){const k=tab.dataset.tab;if(k==="community"||k==="map"){toast("준비 중이에요");return}stack=[];page=k;sheet=null;render();return}
    const c=t.closest("[data-cat]");if(c){const k=c.dataset.cat;if(k==="중고차"||k==="부동산"||k==="알바"){return}category=k;render();return}
    const h=t.closest("[data-hood]");if(h){hoodIdx=Number(h.dataset.hood);sheet=null;render();return}
    const st=t.closest("[data-saletab]");if(st){saleTab=st.dataset.saletab;render();return}
    const pr=t.closest("[data-product]");if(pr){selected=Number(pr.dataset.product);go("detail");return}
    const sl=t.closest("[data-sale]");if(sl){selected=Number(sl.dataset.sale);go("detail");return}
    const ch=t.closest("[data-chat]");if(ch){chatId=Number(ch.dataset.chat);const r=rooms.find(x=>x.id===chatId);if(r)r.unread=0;go("chatroom")}
  });
  el.addEventListener("input",e=>{
    if(e.target.id==="kg-query"){query=e.target.value;const f=$(".kg-feed");if(f)f.innerHTML=feedHTML()}
    else if(e.target.id==="kg-message"){$("#kg-send")?.classList.toggle("on",!!e.target.value.trim())}
  });
  el.addEventListener("submit",e=>{
    if(e.target.id!=="kg-compose")return;e.preventDefault();
    const i=$("#kg-message"),v=i?.value.trim();if(!v)return;
    const r=rooms.find(x=>x.id===chatId);if(!r)return;const d=new Date();
    r.msgs.push({me:1,t:v,time:ap(d),date:d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+d.getDate()+"일"});r.msg=v;r.ago="방금 전";
    render();$("#kg-message")?.focus()});
  el.addEventListener("scroll",e=>{const s=e.target;if(s.classList&&s.classList.contains("kg-dscroll"))s.closest(".kg-dscreen")?.classList.toggle("sc",s.scrollTop>280)},true);
  window.KarrotMock={open,close};
})();
