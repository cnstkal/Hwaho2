/* Story sequence controller — uses the site's existing KakaoTalk UI */
(()=> {
 const style=document.createElement("style");
 style.textContent="#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .toast{pointer-events:auto;transform-origin:50% 0;will-change:transform,opacity;animation:storyToastIn .62s cubic-bezier(.2,1,.3,1) both;position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;right:12px;background:rgba(248,248,250,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#171717;border:0;border-radius:18px;padding:12px;box-shadow:0 4px 20px #0002;display:flex;gap:11px;text-align:left;align-items:center;width:calc(100% - 24px)}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none}#story-ui .copy{font-size:13px;line-height:1.35;flex:1;min-width:0}#story-ui b{display:block;margin-bottom:4px;font-weight:650}#story-ui .preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}#story-ui .when{font-size:11px;color:#777;align-self:flex-start;white-space:nowrap}@keyframes storyToastIn{0%{transform:translateY(-135%) scale(.9);opacity:0}55%{transform:translateY(9px) scale(1.018);opacity:1}78%{transform:translateY(-2px) scale(.999)}100%{transform:none;opacity:1}}@keyframes storyToastOut{0%{transform:none;opacity:1}100%{transform:translateY(-135%) scale(.92);opacity:0}}#story-ui .toast.out{animation:storyToastOut .3s cubic-bezier(.5,0,.85,.45) both;pointer-events:none}";
 document.head.appendChild(style);
 const root=document.createElement("div");root.id="story-ui";document.querySelector("#screen")?.appendChild(root);
 const KAKAO_ICON="images/app/KakaoTalk/IMG_7149.png";
 const ARTICLE1="정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”";
 const ARTICLE2="정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”";
 /* 1=성화(me, 오른쪽 노란 말풍선), f0=윤둥이. ㅎㅎ(윤둥이)는 통화 종료 시 자동 추가되므로 여기엔 2~6번만 둔다. */
 const yunhoLines=[["me","이번 일로 뭐라하는 놈 있으면 나한테 데려와"],["me","내가 처리할게"],["f0","배고팡"],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?"],["f0","빨리와 💗"]];

 /* ---- 타이밍(ms) ---- */
 const RING_DELAY=5000;        /* 첫 기사 열람 후 전화까지 (기존 10초 → 5초) */
 const IG_ALERT_DELAY=1200;    /* 마지막 메시지 이후 인스타 알림까지 */
 const MANAGER2_DELAY=5000;    /* 게시물 확인 후 매니저 2차 알림까지 */
 const TAP_GUARD=250;          /* 한 번의 탭이 두 번 처리되는 것을 막는 최소 간격 */

 /* ---- 상태: 단계는 localStorage에 저장해 새로고침 후에도 카카오톡 메시지와 일관되게 유지한다 ---- */
 const KEY="hwaho-story-v1";
 const STAGES=["manager-link-alert","manager-question-alert","first-article","yunho-alert","yunho-chat","ig-alert","instagram","manager2-alert","manager2-chat","final-article"];
 let stage="idle",started=false,yunhoIndex=0,ack=false;
 const persist=()=>{if(!started)return;const v={v:1,started:true,stage,yunhoIndex,ack};try{if(window.HwahoStability)window.HwahoStability.writeJSON(KEY,v);else localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}};
 const setStage=s=>{stage=s;persist();};
 const load=()=>{try{const s=window.HwahoStability?window.HwahoStability.readJSON(KEY,null):JSON.parse(localStorage.getItem(KEY));if(s&&s.v===1&&s.started===true&&STAGES.indexOf(s.stage)>=0)return s;}catch(e){}return null;};

 /* ---- 타이머: 이름별로 하나만 등록되도록 관리 (앱 전환/홈 이동으로는 취소하지 않는다) ---- */
 const timers={};
 const later=(k,fn,ms)=>{clearTimeout(timers[k]);timers[k]=setTimeout(()=>{delete timers[k];fn();},ms);};
 const cancel=k=>{clearTimeout(timers[k]);delete timers[k];};

 const dismiss=()=>{const t=root.querySelector(".toast");if(!t||t.classList.contains("out"))return;t.classList.add("out");setTimeout(()=>{if(t.parentNode===root)root.removeChild(t);},320);};
 const toast=(name,msg,app="KakaoTalk")=>{try{navigator.vibrate&&navigator.vibrate(30);}catch(e){}const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":KAKAO_ICON;root.innerHTML='<button class="toast" data-story="open"><img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+name+'</b><span class="preview">'+msg+'</span></span><span class="when">지금</span></button>';};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}
 /* 지금 화면에 열려 있는 카카오톡 채팅방이 id 인지 (다른 방의 탭으로 윤둥이 대화가 진행되지 않도록) */
 const inChat=id=>!!(window.KakaoApp&&typeof KakaoApp.currentChatId==="function"&&KakaoApp.currentChatId()===id);

 function start(){if(started)return;try{localStorage.removeItem("hwaho-ig-yunho-t0");}catch(e){}started=true;yunhoIndex=0;ack=false;setStage("manager-link-alert");toast("성현이형(매니저)",ARTICLE1);}
 function managerLink(){setStage("manager-question-alert");openManager();KakaoApp.appendStoryMessage(ARTICLE1,"link","https://entertain.naver.com/article/sample/4");later("ack",()=>{if(stage==="manager-question-alert"&&!ack)toast("성현이형(매니저)","이거 합의된 거야?");},2000);}
 function scheduleRing(ms){later("ring",()=>{if(stage!=="first-article")return;if(window.FaceTimeApp&&typeof FaceTimeApp.ring==="function")FaceTimeApp.ring({caller:"윤둥이"});},ms);}
 function openFirstArticle(){cancel("ack");root.innerHTML="";const entering=stage!=="first-article";setStage("first-article");forceSafari("https://entertain.naver.com/article/sample/4");if(entering)scheduleRing(RING_DELAY);}
 function scheduleInstagramAlert(){later("ig",()=>{if(stage!=="yunho-chat")return;setStage("ig-alert");toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},IG_ALERT_DELAY);}
 function scheduleManager2Alert(){later("m2",()=>{if(stage!=="instagram")return;setStage("manager2-alert");toast("성현이형(매니저)","정윤호쪽에서 인정했네");},MANAGER2_DELAY);}

 root.addEventListener("click",e=>{
  const b=e.target.closest("[data-story]");if(!b||b.dataset.story!=="open")return;
  const tappedStage=stage;dismiss();
  if(tappedStage==="manager-link-alert")managerLink();
  else if(tappedStage==="manager-question-alert"){ack=true;persist();openManager();KakaoApp.appendStoryMessage("이거 합의된 거야?","text","","c3","f2");}
  /* ㅎㅎ 는 통화 종료 시 이미 추가되어 있다. 알림 탭은 방만 열고 메시지는 추가하지 않는다. */
  else if(tappedStage==="yunho-alert"){yunhoIndex=0;setStage("yunho-chat");openYunhoChat();}
  else if(tappedStage==="ig-alert"){setStage("instagram");document.dispatchEvent(new CustomEvent("story:instagram-published"));if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();scheduleManager2Alert();}
  else if(tappedStage==="manager2-alert"){setStage("manager2-chat");openManager();KakaoApp.appendStoryMessage("정윤호쪽에서 인정했네");KakaoApp.appendStoryMessage(ARTICLE2,"link","https://entertain.naver.com/article/sample/6");}
 });
 document.addEventListener("story:start",start);
 document.addEventListener("story:manager-link-opened",e=>{if(stage==="manager2-chat"||stage==="final-article"){root.innerHTML="";setStage("final-article");forceSafari("https://entertain.naver.com/article/sample/6");return;}if(stage!=="manager-question-alert"&&stage!=="first-article")return;openFirstArticle();});
 document.addEventListener("story:call-ended",()=>{if(stage!=="first-article")return;cancel("ring");setStage("yunho-alert");if(window.KakaoApp)KakaoApp.appendStoryMessage("ㅎㅎ","text","","c0","f0");toast("윤둥이","ㅎㅎ");});

 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;const [from,msg]=yunhoLines[yunhoIndex++];persist();KakaoApp.appendStoryMessage(msg,"text","", "c0",from);if(yunhoIndex===yunhoLines.length)scheduleInstagramAlert();}

 /* 채팅 영역 탭 → 다음 메시지 하나.
    - 윤둥이 채팅방(c0)이 실제로 열려 있을 때만 진행한다 (다른 방의 #kk-msgs 탭은 무시).
    - 알림을 거치지 않고 직접 윤둥이 방에 들어온 경우(yunho-alert)에도 첫 탭에서 진행을 이어 받고 남은 알림을 지운다.
    - 방에 들어가는 것만으로는 아무 것도 추가하지 않는다. */
 let lastTap=0;
 document.addEventListener("click",e=>{
  if(stage!=="yunho-alert"&&stage!=="yunho-chat")return;
  if(!e.target||!e.target.closest||!e.target.closest("#kko-app #kk-msgs"))return;
  if(!inChat("c0"))return;
  const t=Date.now();if(t-lastTap<TAP_GUARD)return;lastTap=t;
  if(stage==="yunho-alert"){root.innerHTML="";yunhoIndex=0;setStage("yunho-chat");}
  nextYunhoMessage();
 },true);

 /* ---- 새로고침 후 복원: 이미 진행된 단계의 알림만 다시 띄우고, 끝난 이벤트는 다시 실행하지 않는다 ---- */
 function resume(){
  if(["instagram","manager2-alert","manager2-chat","final-article"].indexOf(stage)>=0)document.dispatchEvent(new CustomEvent("story:instagram-published"));
  switch(stage){
   case "manager-link-alert":toast("성현이형(매니저)",ARTICLE1);break;
   case "manager-question-alert":if(!ack)toast("성현이형(매니저)","이거 합의된 거야?");break;
   case "first-article":scheduleRing(RING_DELAY);break;
   case "yunho-alert":toast("윤둥이","ㅎㅎ");break;
   case "yunho-chat":if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();break;
   case "ig-alert":toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");break;
   case "instagram":scheduleManager2Alert();break;
   case "manager2-alert":toast("성현이형(매니저)","정윤호쪽에서 인정했네");break;
  }
 }
 const saved=load();
 if(saved){started=true;stage=saved.stage;yunhoIndex=Math.max(0,Math.min(yunhoLines.length,saved.yunhoIndex|0));ack=!!saved.ack;resume();}
 else if(window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();

 window.HwahoStory={start,get stage(){return stage;},get started(){return started;}};
})();
