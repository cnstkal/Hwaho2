/* Story sequence controller — uses the site's existing KakaoTalk UI */
(()=> {
 const style=document.createElement("style");
 style.textContent="#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .toast{pointer-events:auto;position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;right:12px;background:rgba(248,248,250,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#171717;border:0;border-radius:18px;padding:12px;box-shadow:0 4px 20px #0002;display:flex;gap:11px;text-align:left;align-items:center;width:calc(100% - 24px)}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none}#story-ui .copy{font-size:13px;line-height:1.35;flex:1;min-width:0}#story-ui b{display:block;margin-bottom:4px;font-weight:650}#story-ui .preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}#story-ui .toast{animation:st-in .6s cubic-bezier(.2,.9,.25,1) both}@keyframes st-in{0%{opacity:0;transform:translateY(-90px) scale(.94)}55%{opacity:1}100%{opacity:1;transform:translateY(0) scale(1)}}#kko-app #kk-ta::placeholder{color:#b5b5b5}#story-ui .when{font-size:11px;color:#777;align-self:flex-start;white-space:nowrap}";
 document.head.appendChild(style);
 const root=document.createElement("div");root.id="story-ui";document.querySelector("#screen")?.appendChild(root);
 const KAKAO_ICON="images/app/KakaoTalk/IMG_7149.png";
 const MANAGER="성현이형(매니저)";
 /* 기존에 등록된 열애 부인 기사 (네이버 엔터 sample/4) */
 const DENY_TITLE="정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”";
 const DENY_URL="https://entertain.naver.com/article/sample/4";
 const MANAGER_Q="너 윤호랑 헤어졌냐?",BRO="형",BRO_REPLY="뭔솔?";
 /* 윤호 카톡: 첫 메시지는 '배고팡', 나머지는 기존 대사 그대로 (탭할 때마다 한 줄씩) */
 const yunhoLines=[["f0","배고팡",[16,2]],["me","그게 지금 할 말이야?",[16,2]],["me","야",[16,2]],["me","아니 윤호야",[16,2]],["f0",".",[16,2]],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?",[16,7]],["f0","빨리왕 💗",[16,7]]];
 /* '.' 는 '아니 윤호야' 직후 자동 전송, 무뼈국물닭발 대사는 '.' 전송 시점부터 정확히 5분 뒤 자동 전송 */
 const DOT_IDX=4,LONG_IDX=5,DOT_DELAY=1500,YUNHO_WAIT=5*60*1000;

 /* ---- 상태: 단계는 localStorage에 저장해 새로고침 후에도 유지 ---- */
 const KEY="hwaho-story-v1";
 const STAGES=["manager-wait","manager-msg","brother-chat","brother-link","deny-reading","yunho-call","yunho-alert","yunho-chat","ig-alert","instagram","final-wait","final-alert","final-article"];
 const FINAL_URL="https://entertain.naver.com/article/sample/6",NAVER_ICON="images/app/Naver/IMG_7151.png",FINAL_TITLE="정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”",FINAL_DELAY=6000;
 let stage="idle",started=false,yunhoIndex=0,viewedAt=0,igViewedAt=0,dotAt=0;
 const persist=()=>{if(!started)return;const v={v:2,started:true,stage,yunhoIndex,viewedAt,igViewedAt,dotAt};try{if(window.HwahoStability)window.HwahoStability.writeJSON(KEY,v);else localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}};
 const setStage=s=>{stage=s;persist();};
 const load=()=>{try{const s=window.HwahoStability?window.HwahoStability.readJSON(KEY,null):JSON.parse(localStorage.getItem(KEY));if(s&&s.v===2&&s.started===true&&STAGES.indexOf(s.stage)>=0)return s;}catch(e){}return null;};

 /* ---- 타이머: 이름별로 하나만 등록 ---- */
 const timers={};
 const later=(k,fn,ms)=>{clearTimeout(timers[k]);timers[k]=setTimeout(()=>{delete timers[k];fn();},ms);};
 const cancel=k=>{clearTimeout(timers[k]);delete timers[k];};

 const toast=(name,msg,app="KakaoTalk")=>{const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":app==="Naver"?NAVER_ICON:KAKAO_ICON;root.innerHTML='<button class="toast" data-story="open"><img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+name+'</b><span class="preview">'+msg+'</span></span><span class="when">지금</span></button>';};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openBrother(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c19");}
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}

 /* 4. 열애 인정 기사 확인(story:start) 3초 후 성현 카톡 */
 function start(){if(started||window.HwahoIntroActive)return;started=true;yunhoIndex=0;viewedAt=0;igViewedAt=0;dotAt=0;setStage("manager-wait");later("m1",managerMsg,8000);}
 const bro1=()=>KakaoApp.appendStoryMessage(MANAGER_Q,"text","","c19","f7",[14,52]);
 const broReply=()=>KakaoApp.appendStoryMessage(BRO_REPLY,"text","","c19","me",[14,52]);
 const broCare1=()=>KakaoApp.appendStoryMessage("기사에 아니라고 떴길래","text","","c19","f7",[14,52]);
 const broCare2=()=>KakaoApp.appendStoryMessage("무슨 일 있는 건 아니지?","text","","c19","f7",[14,52]);
 const bro2=()=>KakaoApp.appendStoryMessage(DENY_TITLE,"link",DENY_URL,"c19","f7",[14,52]);
 const onBrotherTap=()=>{if(stage!=="manager-msg"&&stage!=="brother-chat")return;setStage("brother-link");broReply();later("bro2a",()=>{if(stage==="brother-link")broCare1();},1400);later("bro2b",()=>{if(stage==="brother-link")broCare2();},3000);later("bro3",()=>{if(stage==="brother-link")bro2();},4800);hint();};
 function managerMsg(){
  if(stage!=="manager-wait")return;
  bro1();setStage("manager-msg");toast(BRO,MANAGER_Q);
 }
 /* 5. 열애 부인 기사를 연 시점부터 7초 후 윤호 전화 */
 function ringYunho(){if(window.FaceTimeApp&&typeof FaceTimeApp.ring==="function")FaceTimeApp.ring({caller:"윤둥이",kind:"yunho"});}
 function scheduleCall(ms){later("ring",()=>{if(stage!=="deny-reading"||!viewedAt)return;setStage("yunho-call");ringYunho();},Math.max(0,ms));}
 /* 6. 윤호 통화 종료 직후 카톡 알림 (첫 메시지 '배고팡') */
 function yunhoAfterCall(){
  if(stage!=="yunho-call")return;
  if(window.HwahoClock)HwahoClock.set(16,2,0);
  yunhoIndex=0;sendYunho();setStage("yunho-alert");toast("윤둥이",yunhoLines[0][1]);
 }
 function sendYunho(){
  if(yunhoIndex>=yunhoLines.length)return;
  const isDot=yunhoIndex===DOT_IDX;
  const [from,msg,at]=yunhoLines[yunhoIndex++];
  if(isDot)dotAt=Date.now();/* 5분 타이머 기준: '.' 가 전송된 시점 (한 번만 기록) */
  persist();KakaoApp.appendStoryMessage(msg,"text","","c0",from,at);hint();
  if(yunhoIndex===DOT_IDX)later("ydot",sendDot,DOT_DELAY);/* '아니 윤호야' 직후 → '.' 예약 */
  else if(yunhoIndex===LONG_IDX)scheduleLong();/* '.' 전송 직후 → 5분 타이머 시작 */
 }
 /* '.' 자동 전송 (중복 방지: 인덱스·단계가 맞을 때만, 타이머는 이름당 하나) */
 function sendDot(){if(stage!=="yunho-chat"||yunhoIndex!==DOT_IDX)return;sendYunho();}
 /* 5분 대기: dotAt 기준 남은 시간만큼만 예약 — 새로고침/재진입해도 처음부터 다시 세지 않는다 */
 function scheduleLong(){
  if(stage!=="yunho-chat"||yunhoIndex!==LONG_IDX)return;
  if(!dotAt){dotAt=Date.now();persist();}
  later("ylong",checkLong,Math.max(0,YUNHO_WAIT-(Date.now()-dotAt)));
 }
 function checkLong(){
  if(stage!=="yunho-chat"||yunhoIndex!==LONG_IDX||!dotAt)return;
  const rem=YUNHO_WAIT-(Date.now()-dotAt);
  if(rem>50){scheduleLong();return;}
  sendYunho();/* 무뼈국물닭발… (성화) — 한 번만 */
 }
 /* 앱 전환·화면 꺼짐 등으로 타이머가 밀렸을 때, 화면이 다시 보이면 남은 시간 재확인 */
 const wakeYunho=()=>{if(!document.hidden&&stage==="yunho-chat"&&yunhoIndex===LONG_IDX&&dotAt)checkLong();};
 document.addEventListener("visibilitychange",wakeYunho);window.addEventListener("pageshow",wakeYunho);
 /* 8. 윤호 새 게시물을 실제로 확인한 뒤 3초 후 네이버 최종 인정 기사 알림 */
 function finalAlert(){if(stage!=="final-wait")return;setStage("final-alert");toast("네이버 뉴스",FINAL_TITLE,"Naver");}
 function scheduleFinal(ms){later("final",finalAlert,Math.max(0,ms));}
 document.addEventListener("story:yunho-post-viewed",()=>{if(stage!=="instagram"||igViewedAt)return;igViewedAt=Date.now();setStage("final-wait");scheduleFinal(FINAL_DELAY);});
 document.addEventListener("story:final-article-viewed",()=>{if(stage==="final-alert"||stage==="final-article"){root.innerHTML="";setStage("final-article");}});
 /* 7. 윤호 카톡 대화가 끝나면 즉시 인스타 알림 */
 function scheduleInstagramAlert(){later("ig",()=>{if(stage!=="yunho-chat")return;setStage("ig-alert");toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},1500);}

 root.addEventListener("click",e=>{
  const b=e.target.closest("[data-story]");if(!b||b.dataset.story!=="open")return;
  const t=stage;root.innerHTML="";
  if(t==="manager-msg"){bro1();setStage("brother-chat");openBrother();hint();}
  else if(t==="yunho-alert"){setStage("yunho-chat");openYunhoChat();if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();}
  else if(t==="ig-alert"){setStage("instagram");document.dispatchEvent(new CustomEvent("story:instagram-published"));if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();}
  else if(t==="final-alert"){setStage("final-article");forceSafari(FINAL_URL);}
 });
 document.addEventListener("story:start",start);
 /* 성현 카톡의 기사 링크 → 사파리 (이미 등록된 기사로 이동) */
 document.addEventListener("story:manager-link-opened",e=>{
  const url=(e.detail&&e.detail.url)||DENY_URL;
  if(stage==="brother-link"||stage==="deny-reading"){root.innerHTML="";if(stage==="brother-link"){viewedAt=0;setStage("deny-reading");}if(window.KakaoApp)KakaoApp.close();forceSafari(url);}
  else forceSafari(url);
 });
 /* 열애 부인 기사가 실제로 열린 시점부터 7초 */
 document.addEventListener("story:deny-article-viewed",()=>{
  if((stage!=="brother-link"&&stage!=="deny-reading")||viewedAt)return;
  root.innerHTML="";viewedAt=Date.now();setStage("deny-reading");scheduleCall(9000);
 });
 document.addEventListener("story:call-ended",e=>{if(e.detail&&e.detail.kind==="yunho")yunhoAfterCall();});

 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;if(yunhoIndex===DOT_IDX||yunhoIndex===LONG_IDX)return;/* '.' 예약·5분 대기 중에는 탭으로 진행하지 않음 */sendYunho();if(yunhoIndex===yunhoLines.length)scheduleInstagramAlert();}
 document.addEventListener("click",e=>{if(stage==="manager-msg"||stage==="brother-chat"){if(window.KakaoApp&&KakaoApp.currentChatId&&KakaoApp.currentChatId()==="c19"&&e.target.closest("#kko-app #kk-msgs"))onBrotherTap();return;}if(stage!=="yunho-chat")return;if(window.KakaoApp&&KakaoApp.currentChatId&&KakaoApp.currentChatId()!=="c0")return;const box=e.target.closest("#kko-app #kk-msgs");if(box)nextYunhoMessage();},true);

 /* ---- 새로고침 후 복원: 끝난 이벤트는 다시 실행하지 않는다 ---- */
 function resume(){
  if(["instagram","final-wait","final-alert","final-article"].indexOf(stage)>=0)document.dispatchEvent(new CustomEvent("story:instagram-published"));
  switch(stage){
   case "manager-wait":later("m1",managerMsg,8000);break;
   case "manager-msg":bro1();toast(BRO,MANAGER_Q);break;
   case "brother-chat":bro1();break;
   case "brother-link":bro1();broReply();broCare1();broCare2();bro2();break;
   case "deny-reading":if(viewedAt)scheduleCall(9000-(Date.now()-viewedAt));break;
   case "yunho-call":ringYunho();break;
   case "yunho-alert":toast("윤둥이",yunhoLines[0][1]);break;
   case "yunho-chat":if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();else if(yunhoIndex===DOT_IDX)later("ydot",sendDot,DOT_DELAY);else if(yunhoIndex===LONG_IDX)scheduleLong();break;
   case "ig-alert":toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");break;
   case "final-wait":scheduleFinal(FINAL_DELAY-(Date.now()-igViewedAt));break;
   case "final-alert":toast("네이버 뉴스",FINAL_TITLE,"Naver");break;
  }
 }
 const saved=load();
 if(saved){started=true;stage=saved.stage;yunhoIndex=Math.max(0,Math.min(yunhoLines.length,saved.yunhoIndex|0));viewedAt=Number(saved.viewedAt)||0;igViewedAt=Number(saved.igViewedAt)||0;dotAt=Number(saved.dotAt)||0;resume();}
 else if(window.HwahoIntroFresh&&window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();

 /* 윤둥이 방 입력창 힌트 (탭으로 진행) */
 function hint(){const t=document.querySelector("#kko-app #kk-ta");if(!t)return;const cid=window.KakaoApp&&KakaoApp.currentChatId?KakaoApp.currentChatId():null;const on=(stage==="yunho-chat"&&yunhoIndex<yunhoLines.length&&yunhoIndex!==DOT_IDX&&yunhoIndex!==LONG_IDX&&cid==="c0")||((stage==="manager-msg"||stage==="brother-chat")&&cid==="c19");const v=on?"화면을 탭하세요.":"";if(t.placeholder!==v)t.placeholder=v;}
 {const ka=document.getElementById("kko-app");if(ka&&window.MutationObserver)new MutationObserver(hint).observe(ka,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});}
 document.addEventListener("click",()=>setTimeout(hint,60),true);
 window.HwahoStory={start,get stage(){return stage;},get started(){return started;}};
})();
