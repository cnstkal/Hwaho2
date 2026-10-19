/* Story sequence controller — uses the site's existing KakaoTalk UI */
(()=> {
 const style=document.createElement("style");
 style.textContent="#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .stack{position:absolute;top:calc(env(safe-area-inset-top,0px) + 36px);left:12px;right:12px;display:flex;flex-direction:column;gap:8px;pointer-events:none}#story-ui .toast{pointer-events:auto;position:relative;width:100%;box-sizing:border-box;min-height:64px;margin:0;padding:12px 16px;display:flex;gap:11px;align-items:center;text-align:left;font:inherit;color:#000;cursor:pointer;-webkit-tap-highlight-color:transparent;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:.5px solid rgba(255,255,255,.65);border-radius:24px;box-shadow:0 8px 28px rgba(0,0,0,.18),0 1px 0 rgba(255,255,255,.5) inset;will-change:transform,opacity;backface-visibility:hidden;animation:storyToastIn .55s cubic-bezier(.16,1,.3,1) both,storyToastFade .4s cubic-bezier(.16,1,.3,1) both}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none;box-shadow:0 0 0 .5px rgba(0,0,0,.12)}#story-ui .copy{font-size:14.5px;line-height:1.35;flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}#story-ui b{display:block;margin:0;font-size:15px;font-weight:600;letter-spacing:-.2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#story-ui .preview{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;white-space:normal;word-break:normal;overflow-wrap:break-word;color:rgba(0,0,0,.78)}#story-ui .when{font-size:12.5px;line-height:1.3;color:rgba(60,60,67,.65);align-self:flex-start;white-space:nowrap;flex:none;padding-left:2px}#story-ui .ico{margin-right:1px}@keyframes storyToastIn{from{transform:translate3d(0,-130%,0)}to{transform:translate3d(0,0,0)}}@keyframes storyToastFade{from{opacity:0}to{opacity:1}}@keyframes storyToastOut{from{transform:translate3d(0,0,0);opacity:1}to{transform:translate3d(0,-130%,0);opacity:0}}#story-ui .toast.out{animation:storyToastOut .35s cubic-bezier(.4,0,.6,1) both;pointer-events:none}@media (prefers-reduced-motion:reduce){#story-ui .toast{animation:storyToastFade .2s linear both}#story-ui .toast.out{animation:storyToastOut .2s linear both}}";
 document.head.appendChild(style);
 const root=document.createElement("div");root.id="story-ui";document.querySelector("#screen")?.appendChild(root);
 const KAKAO_ICON="images/app/KakaoTalk/IMG_7149.png";
 const ARTICLE1="정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”";
 const ARTICLE2="정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”";
 /* 1=성화(me, 오른쪽 노란 말풍선), f0=윤둥이. 통화 종료 후에는 배고팡부터 진행한다. */
 const yunhoLines=[["f0","배고팡",[15,43]],["me","지금 그런 말이 나와?",[15,43]],["f0","배고프다고",[15,43]],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가?",[15,43]],["f0","웅 맞아",[15,43]],["f0","형은 나를 너무 잘알아",[15,43]],["f0","빨리와",[15,43]],];

 /* ---- 타이밍(ms) ---- */
 const RING_DELAY=5000;        /* 첫 기사 열람 후 전화까지 (기존 10초 → 5초) */
 const IG_ALERT_DELAY=3500;    /* 마지막 메시지 이후 인스타 알림까지 */
 const MANAGER2_DELAY=5000;    /* 게시물 확인 후 매니저 2차 알림까지 */
 const MANAGER_MSG2_DELAY=2500; /* 성현이형: 기사 → 합의된 거냐 (자동 연속 전송) */
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

 const dismiss=()=>{root.querySelectorAll(".toast:not(.out)").forEach(t=>{t.classList.add("out");setTimeout(()=>{if(t.parentNode)t.parentNode.removeChild(t);const st=root.querySelector(".stack");if(st&&!st.children.length)st.remove();},320);});};
 const toast=(name,msg,app="KakaoTalk",stackOn=false)=>{try{navigator.vibrate&&navigator.vibrate(30);}catch(e){}const k=name+"|"+msg+"|"+app;if(!stackOn)root.innerHTML="";const dup=[...root.querySelectorAll(".toast:not(.out)")].some(t=>t.dataset.k===k);if(dup)return;let st=root.querySelector(".stack");if(!st){st=document.createElement("div");st.className="stack";root.appendChild(st);}const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":KAKAO_ICON,b=document.createElement("button");b.className="toast";b.dataset.story="open";b.dataset.k=k;const esc=x=>String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;");b.innerHTML='<img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+esc(name)+'</b><span class="preview">'+esc(msg)+'</span></span><span class="when">지금</span>';st.appendChild(b);};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}
 /* 지금 화면에 열려 있는 카카오톡 채팅방이 id 인지 (다른 방의 탭으로 윤둥이 대화가 진행되지 않도록) */
 const inChat=id=>!!(window.KakaoApp&&typeof KakaoApp.currentChatId==="function"&&KakaoApp.currentChatId()===id);

 function start(){if(started)return;try{localStorage.removeItem("hwaho-ig-yunho-t0");}catch(e){}if(window.HwahoIntroDone){started=true;yunhoIndex=0;ack=true;setStage("yunho-alert");toast("윤둥이","배고팡");return;}if(window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();started=true;yunhoIndex=0;ack=false;setStage("manager-link-alert");sendManagerMessages();}
 /* 성현이형이 기사를 먼저 보내고 잠시 뒤 "합의된 거야?"를 이어서 보낸다. 카톡창 진입과 무관하게 진행되며 추가 알림은 없다. */
 function sendManagerMessages(){if(!window.KakaoApp)return;const U="https://entertain.naver.com/article/sample/4";KakaoApp.appendStoryMessage(ARTICLE1,"link",U,"c3","f2",[15,37]);if(stage==="manager-link-alert")toast("성현이형(매니저)",ARTICLE1);later("m1",()=>{if(!window.KakaoApp)return;KakaoApp.appendStoryMessage("이거 합의된 거야?","text","","c3","f2",[15,37]);if(stage==="manager-link-alert"){dismiss();later("m1b",()=>{if(stage==="manager-link-alert")toast("성현이형(매니저)","이거 합의된 거야?");},420);}},MANAGER_MSG2_DELAY);}
 function sendManagerMessagesSilent(){if(!window.KakaoApp)return;KakaoApp.appendStoryMessage(ARTICLE1,"link","https://entertain.naver.com/article/sample/4","c3","f2",[15,37]);KakaoApp.appendStoryMessage("이거 합의된 거야?","text","","c3","f2",[15,37]);}
 function managerLink(){setStage("manager-question-alert");openManager();}
 function scheduleRing(ms){later("ring",()=>{if(stage!=="first-article")return;if(window.FaceTimeApp&&typeof FaceTimeApp.ring==="function")FaceTimeApp.ring({caller:"윤둥이"});},ms);}
 function openFirstArticle(){cancel("ack");root.innerHTML="";const entering=stage!=="first-article";setStage("first-article");forceSafari("https://entertain.naver.com/article/sample/4");if(entering)scheduleRing(RING_DELAY);}
 function scheduleInstagramAlert(){later("ig",()=>{if(stage!=="yunho-chat")return;setStage("ig-alert");toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},IG_ALERT_DELAY);}
 function scheduleManager2Alert(){later("m2",()=>{if(stage!=="instagram")return;setStage("manager2-alert");toast("성현이형(매니저)","정윤호쪽에서 인정했네");},MANAGER2_DELAY);}

 root.addEventListener("click",e=>{
  const b=e.target.closest("[data-story]");if(!b||b.dataset.story!=="open")return;
  const tappedStage=stage;dismiss();
  if(tappedStage==="manager-link-alert")managerLink();
  else if(tappedStage==="manager-question-alert"){ack=true;persist();openManager();}
  /* 알림 탭은 방만 열고 메시지는 추가하지 않는다. */
  else if(tappedStage==="yunho-alert"){yunhoIndex=0;setStage("yunho-chat");openYunhoChat();}
  else if(tappedStage==="ig-alert"){setStage("instagram");document.dispatchEvent(new CustomEvent("story:instagram-published"));if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();scheduleManager2Alert();}
  else if(tappedStage==="manager2-alert"){setStage("manager2-chat");openManager();KakaoApp.appendStoryMessage("정윤호쪽에서 인정했네","text","","c3","f2",[15,44]);KakaoApp.appendStoryMessage(ARTICLE2,"link","https://entertain.naver.com/article/sample/6","c3","f2",[15,44]);}
 });
 document.addEventListener("story:start",start);
 /* 카카오톡 앱을 열어 확인하면 알림을 지운다 (그 전에는 사라지지 않음) */
 document.addEventListener("app:open",e=>{if(!e.detail||e.detail.id!=="kakaotalk")return;if(stage==="manager-link-alert"){cancel("m1");cancel("m1b");setStage("manager-question-alert");sendManagerMessagesSilent();dismiss();}else if(stage==="yunho-alert")dismiss();});
 document.addEventListener("story:manager-link-opened",e=>{if(stage==="manager2-chat"||stage==="final-article"){root.innerHTML="";setStage("final-article");forceSafari("https://entertain.naver.com/article/sample/6");return;}if(stage!=="manager-link-alert"&&stage!=="manager-question-alert"&&stage!=="first-article")return;openFirstArticle();});
 document.addEventListener("story:call-ended",()=>{if(stage!=="first-article")return;cancel("ring");setStage("yunho-alert");toast("윤둥이","배고팡");});

 /* 윤둥이 방에서 탭으로 진행하는 동안 입력창에 회색 안내 문구 표시 */
 const HINT="화면을 탭하세요";
 function updateHint(){const ta=document.querySelector("#kko-app #kk-ta");if(!ta)return;const on=(stage==="yunho-alert"||stage==="yunho-chat")&&yunhoIndex<yunhoLines.length&&inChat("c0");if(on)ta.placeholder=HINT;else if(ta.placeholder===HINT)ta.placeholder="";}
 document.addEventListener("kakao:room-opened",()=>setTimeout(updateHint,0));
 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;const [from,msg,at]=yunhoLines[yunhoIndex++];persist();KakaoApp.appendStoryMessage(msg,"text","", "c0",from,at);if(yunhoIndex===yunhoLines.length)scheduleInstagramAlert();updateHint();}

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
   case "manager-link-alert":sendManagerMessages();break;
   case "manager-question-alert":sendManagerMessages();break;
   case "first-article":scheduleRing(RING_DELAY);break;
   case "yunho-alert":toast("윤둥이","배고팡");break;
   case "yunho-chat":if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();break;
   case "ig-alert":toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");break;
   case "instagram":scheduleManager2Alert();break;
   case "manager2-alert":toast("성현이형(매니저)","정윤호쪽에서 인정했네");break;
  }
 }
 document.addEventListener("click",()=>setTimeout(updateHint,0),true);
 const saved=load();
 if(saved){started=true;stage=saved.stage;yunhoIndex=Math.max(0,Math.min(yunhoLines.length,saved.yunhoIndex|0));ack=!!saved.ack;resume();}
 else if(window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();

 window.HwahoStory={start,get stage(){return stage;},get started(){return started;}};
})();
