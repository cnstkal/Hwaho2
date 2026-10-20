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
 const MANAGER_Q="너 윤호랑 헤어졌냐?",BRO="형";
 /* 윤호 카톡: 첫 메시지는 '배고팡', 나머지는 기존 대사 그대로 (탭할 때마다 한 줄씩) */
 const yunhoLines=[["f0","배고팡",[16,2]],["me","그게 지금 할 말이야?",[16,2]],["me","야",[16,2]],["me","아니 윤호야",[16,2]],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?",[16,7]],["f0","빨리왕 💗",[16,7]]];

 /* ---- 상태: 단계는 localStorage에 저장해 새로고침 후에도 유지 ---- */
 const KEY="hwaho-story-v1";
 const STAGES=["manager-wait","manager-msg","deny-reading","yunho-call","yunho-alert","yunho-chat","ig-alert","instagram"];
 let stage="idle",started=false,yunhoIndex=0,viewedAt=0;
 const persist=()=>{if(!started)return;const v={v:2,started:true,stage,yunhoIndex,viewedAt};try{if(window.HwahoStability)window.HwahoStability.writeJSON(KEY,v);else localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}};
 const setStage=s=>{stage=s;persist();};
 const load=()=>{try{const s=window.HwahoStability?window.HwahoStability.readJSON(KEY,null):JSON.parse(localStorage.getItem(KEY));if(s&&s.v===2&&s.started===true&&STAGES.indexOf(s.stage)>=0)return s;}catch(e){}return null;};

 /* ---- 타이머: 이름별로 하나만 등록 ---- */
 const timers={};
 const later=(k,fn,ms)=>{clearTimeout(timers[k]);timers[k]=setTimeout(()=>{delete timers[k];fn();},ms);};
 const cancel=k=>{clearTimeout(timers[k]);delete timers[k];};

 const toast=(name,msg,app="KakaoTalk")=>{const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":KAKAO_ICON;root.innerHTML='<button class="toast" data-story="open"><img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+name+'</b><span class="preview">'+msg+'</span></span><span class="when">지금</span></button>';};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openBrother(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c19");}
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}

 /* 4. 열애 인정 기사 확인(story:start) 3초 후 성현 카톡 */
 function start(){if(started||window.HwahoIntroActive)return;started=true;yunhoIndex=0;viewedAt=0;setStage("manager-wait");later("m1",managerMsg,3000);}
 const bro1=()=>KakaoApp.appendStoryMessage(MANAGER_Q,"text","","c19","f7",[14,52]);
 const bro2=()=>KakaoApp.appendStoryMessage(DENY_TITLE,"link",DENY_URL,"c19","f7",[14,52]);
 function managerMsg(){
  if(stage!=="manager-wait")return;
  bro1();setStage("manager-msg");toast(BRO,MANAGER_Q);
  later("m2",bro2,1500);
 }
 /* 5. 열애 부인 기사를 연 시점부터 7초 후 윤호 전화 */
 function ringYunho(){if(window.FaceTimeApp&&typeof FaceTimeApp.ring==="function")FaceTimeApp.ring({caller:"윤둥이",kind:"yunho"});}
 function scheduleCall(ms){later("ring",()=>{if(stage!=="deny-reading"||!viewedAt)return;setStage("yunho-call");ringYunho();},Math.max(0,ms));}
 /* 6. 윤호 통화 종료 직후 카톡 알림 (첫 메시지 '배고팡') */
 function yunhoAfterCall(){
  if(stage!=="yunho-call")return;
  yunhoIndex=0;sendYunho();setStage("yunho-alert");toast("윤둥이",yunhoLines[0][1]);
 }
 function sendYunho(){if(yunhoIndex>=yunhoLines.length)return;const [from,msg,at]=yunhoLines[yunhoIndex++];persist();KakaoApp.appendStoryMessage(msg,"text","","c0",from,at);hint();}
 /* 7. 윤호 카톡 대화가 끝나면 즉시 인스타 알림 */
 function scheduleInstagramAlert(){later("ig",()=>{if(stage!=="yunho-chat")return;setStage("ig-alert");toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},1500);}

 root.addEventListener("click",e=>{
  const b=e.target.closest("[data-story]");if(!b||b.dataset.story!=="open")return;
  const t=stage;root.innerHTML="";
  if(t==="manager-msg"){bro1();bro2();openBrother();}
  else if(t==="yunho-alert"){setStage("yunho-chat");openYunhoChat();if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();}
  else if(t==="ig-alert"){setStage("instagram");document.dispatchEvent(new CustomEvent("story:instagram-published"));if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();}
 });
 document.addEventListener("story:start",start);
 /* 성현 카톡의 기사 링크 → 사파리 (이미 등록된 기사로 이동) */
 document.addEventListener("story:manager-link-opened",e=>{
  const url=(e.detail&&e.detail.url)||DENY_URL;
  if(stage==="manager-msg"||stage==="deny-reading"){root.innerHTML="";if(stage==="manager-msg"){viewedAt=0;setStage("deny-reading");}if(window.KakaoApp)KakaoApp.close();forceSafari(url);}
  else forceSafari(url);
 });
 /* 열애 부인 기사가 실제로 열린 시점부터 7초 */
 document.addEventListener("story:deny-article-viewed",()=>{
  if((stage!=="manager-msg"&&stage!=="deny-reading")||viewedAt)return;
  root.innerHTML="";viewedAt=Date.now();setStage("deny-reading");scheduleCall(7000);
 });
 document.addEventListener("story:call-ended",e=>{if(e.detail&&e.detail.kind==="yunho")yunhoAfterCall();});

 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;sendYunho();if(yunhoIndex===yunhoLines.length)scheduleInstagramAlert();}
 document.addEventListener("click",e=>{if(stage!=="yunho-chat")return;if(window.KakaoApp&&KakaoApp.currentChatId&&KakaoApp.currentChatId()!=="c0")return;const box=e.target.closest("#kko-app #kk-msgs");if(box)nextYunhoMessage();},true);

 /* ---- 새로고침 후 복원: 끝난 이벤트는 다시 실행하지 않는다 ---- */
 function resume(){
  if(stage==="instagram")document.dispatchEvent(new CustomEvent("story:instagram-published"));
  switch(stage){
   case "manager-wait":later("m1",managerMsg,3000);break;
   case "manager-msg":bro1();bro2();toast(BRO,MANAGER_Q);break;
   case "deny-reading":if(viewedAt)scheduleCall(7000-(Date.now()-viewedAt));break;
   case "yunho-call":ringYunho();break;
   case "yunho-alert":toast("윤둥이",yunhoLines[0][1]);break;
   case "yunho-chat":if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();break;
   case "ig-alert":toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");break;
  }
 }
 const saved=load();
 if(saved){started=true;stage=saved.stage;yunhoIndex=Math.max(0,Math.min(yunhoLines.length,saved.yunhoIndex|0));viewedAt=Number(saved.viewedAt)||0;resume();}
 else if(window.HwahoIntroFresh&&window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();

 /* 윤둥이 방 입력창 힌트 (탭으로 진행) */
 function hint(){const t=document.querySelector("#kko-app #kk-ta");if(!t)return;const on=stage==="yunho-chat"&&yunhoIndex<yunhoLines.length&&window.KakaoApp&&KakaoApp.currentChatId&&KakaoApp.currentChatId()==="c0";const v=on?"화면을 탭하세요.":"";if(t.placeholder!==v)t.placeholder=v;}
 {const ka=document.getElementById("kko-app");if(ka&&window.MutationObserver)new MutationObserver(hint).observe(ka,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});}
 document.addEventListener("click",()=>setTimeout(hint,60),true);
 window.HwahoStory={start,get stage(){return stage;},get started(){return started;}};
})();
