/* Story sequence controller — uses the site's existing KakaoTalk UI */
(()=> {
 const style=document.createElement("style");
 style.textContent="#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .toast{pointer-events:auto;position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;right:12px;background:rgba(248,248,250,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#171717;border:0;border-radius:18px;padding:12px;box-shadow:0 4px 20px #0002;display:flex;gap:11px;text-align:left;align-items:center;width:calc(100% - 24px)}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none}#story-ui .copy{font-size:13px;line-height:1.35;flex:1;min-width:0}#story-ui b{display:block;margin-bottom:4px;font-weight:650}#story-ui .preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}#story-ui .when{font-size:11px;color:#777;align-self:flex-start;white-space:nowrap}";
 document.head.appendChild(style);
 const root=document.createElement("div");root.id="story-ui";document.querySelector("#screen")?.appendChild(root);
 const KAKAO_ICON="images/app/KakaoTalk/IMG_7149.png";
 const MANAGER="성현이형(매니저)";
 const ARTICLE1="정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”";
 const ARTICLE2="정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”";
 /* 기사 링크: 프로젝트에 등록된 기사 URL만 사용 (마스측 정윤호와 열애중 공식 인정 기사) */
 const ARTICLE2_URL="https://entertain.naver.com/article/sample/6";
 const MANAGER_AFTER_CALL_MSG="왜 상의도 없이 기사를 낸 거야?";
 const yunhoLines=[["me","이번 일로 뭐라하는 놈 있으면 나한테 데려와"],["me","내가 처리할게"],["f0","배고팡"],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?"],["f0","빨리와 💗"]];

 /* ---- 상태: 단계는 localStorage에 저장해 새로고침 후에도 카카오톡 메시지와 일관되게 유지한다 ---- */
 const KEY="hwaho-story-v1";
 const STAGES=["manager-link-alert","manager-question-alert","first-article","manager-call-alert","yunho-alert","yunho-chat","ig-alert","instagram","manager2-alert","manager2-chat","final-article"];
 let stage="idle",started=false,yunhoIndex=0,ack=false;
 const persist=()=>{if(!started)return;const v={v:1,started:true,stage,yunhoIndex,ack};try{if(window.HwahoStability)window.HwahoStability.writeJSON(KEY,v);else localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}};
 const setStage=s=>{stage=s;persist();};
 const load=()=>{try{const s=window.HwahoStability?window.HwahoStability.readJSON(KEY,null):JSON.parse(localStorage.getItem(KEY));if(s&&s.v===1&&s.started===true&&STAGES.indexOf(s.stage)>=0)return s;}catch(e){}return null;};

 /* ---- 타이머: 이름별로 하나만 등록되도록 관리 ---- */
 const timers={};
 const later=(k,fn,ms)=>{clearTimeout(timers[k]);timers[k]=setTimeout(()=>{delete timers[k];fn();},ms);};
 const cancel=k=>{clearTimeout(timers[k]);delete timers[k];};

 const toast=(name,msg,app="KakaoTalk")=>{const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":KAKAO_ICON;root.innerHTML='<button class="toast" data-story="open"><img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+name+'</b><span class="preview">'+msg+'</span></span><span class="when">지금</span></button>';};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}

 function start(){if(started)return;started=true;yunhoIndex=0;ack=false;setStage("manager-link-alert");toast(MANAGER,ARTICLE1);}
 function managerLink(){setStage("manager-question-alert");openManager();KakaoApp.appendStoryMessage(ARTICLE1,"link","https://entertain.naver.com/article/sample/4");later("ack",()=>{if(stage==="manager-question-alert"&&!ack)toast(MANAGER,"이거 합의된 거야?");},2000);}
 /* 극초반 성현이형(매니저)의 전화 */
 function scheduleRing(ms){later("ring",()=>{if(stage!=="first-article")return;if(window.FaceTimeApp&&typeof FaceTimeApp.ring==="function")FaceTimeApp.ring({caller:MANAGER});},ms);}
 function openFirstArticle(){cancel("ack");root.innerHTML="";const entering=stage!=="first-article";setStage("first-article");forceSafari("https://entertain.naver.com/article/sample/4");if(entering)scheduleRing(5000);}
 function scheduleInstagramAlert(){later("ig",()=>{if(stage!=="yunho-chat")return;setStage("ig-alert");toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},1200);}
 function scheduleManager2Alert(){later("m2",()=>{if(stage!=="instagram")return;setStage("manager2-alert");toast(MANAGER,"정윤호쪽에서 인정했네");},5000);}

 /* 성현이형 전화 종료 직후: 카톡 두 개(같은 분이 연달아 보낸 메시지 + 기사 링크)가 도착하고, 알림은 확인 전까지 유지 */
 function managerAfterCall(){
  setStage("manager-call-alert");
  KakaoApp.appendStoryMessage(MANAGER_AFTER_CALL_MSG,"text","","c3","f2");
  KakaoApp.appendStoryMessage(ARTICLE2,"link",ARTICLE2_URL,"c3","f2");
  toast(MANAGER,MANAGER_AFTER_CALL_MSG);
 }

 root.addEventListener("click",e=>{
  const b=e.target.closest("[data-story]");if(!b||b.dataset.story!=="open")return;
  const tappedStage=stage;root.innerHTML="";
  if(tappedStage==="manager-link-alert")managerLink();
  else if(tappedStage==="manager-question-alert"){ack=true;persist();openManager();KakaoApp.appendStoryMessage("이거 합의된 거야?","text","","c3","f2");}
  else if(tappedStage==="manager-call-alert"){openManager();setStage("yunho-alert");KakaoApp.appendStoryMessage("ㅎㅎ","text","","c0","f0");toast("윤둥이","ㅎㅎ");}
  else if(tappedStage==="yunho-alert"){yunhoIndex=0;setStage("yunho-chat");openYunhoChat();}
  else if(tappedStage==="ig-alert"){setStage("instagram");document.dispatchEvent(new CustomEvent("story:instagram-published"));if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();scheduleManager2Alert();}
  else if(tappedStage==="manager2-alert"){setStage("manager2-chat");openManager();KakaoApp.appendStoryMessage("정윤호쪽에서 인정했네");KakaoApp.appendStoryMessage(ARTICLE2,"link",ARTICLE2_URL);}
 });
 document.addEventListener("story:start",start);
 document.addEventListener("story:manager-link-opened",e=>{if(stage==="manager2-chat"||stage==="final-article"){root.innerHTML="";setStage("final-article");forceSafari(ARTICLE2_URL);return;}if(stage!=="manager-question-alert"&&stage!=="first-article")return;openFirstArticle();});
 document.addEventListener("story:call-ended",()=>{if(stage!=="first-article")return;cancel("ring");managerAfterCall();});

 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;const [from,msg]=yunhoLines[yunhoIndex++];persist();KakaoApp.appendStoryMessage(msg,"text","", "c0",from);if(yunhoIndex===yunhoLines.length)scheduleInstagramAlert();}
 document.addEventListener("click",e=>{if(stage!=="yunho-chat")return;const box=e.target.closest("#kko-app #kk-msgs");if(box)nextYunhoMessage();},true);

 /* ---- 새로고침 후 복원: 이미 진행된 단계의 알림만 다시 띄우고, 끝난 이벤트는 다시 실행하지 않는다 ---- */
 function resume(){
  if(["instagram","manager2-alert","manager2-chat","final-article"].indexOf(stage)>=0)document.dispatchEvent(new CustomEvent("story:instagram-published"));
  switch(stage){
   case "manager-link-alert":toast(MANAGER,ARTICLE1);break;
   case "manager-question-alert":if(!ack)toast(MANAGER,"이거 합의된 거야?");break;
   case "first-article":scheduleRing(10000);break;
   case "manager-call-alert":toast(MANAGER,MANAGER_AFTER_CALL_MSG);break;
   case "yunho-alert":toast("윤둥이","ㅎㅎ");break;
   case "yunho-chat":if(yunhoIndex>=yunhoLines.length)scheduleInstagramAlert();break;
   case "ig-alert":toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");break;
   case "instagram":scheduleManager2Alert();break;
   case "manager2-alert":toast(MANAGER,"정윤호쪽에서 인정했네");break;
  }
 }
 const saved=load();
 if(saved){started=true;stage=saved.stage;yunhoIndex=Math.max(0,Math.min(yunhoLines.length,saved.yunhoIndex|0));ack=!!saved.ack;resume();}
 else if(window.KakaoApp&&typeof KakaoApp.purgeStoryMessages==="function")KakaoApp.purgeStoryMessages();

 window.HwahoStory={start,get stage(){return stage;},get started(){return started;}};
})();
