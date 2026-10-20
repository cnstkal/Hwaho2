/* Intro sequence: lock screen -> missed manager call -> urgent alerts -> Dispatch -> second call -> acknowledgement article. */
(()=> {
 const MANAGER="성현이형(매니저)", AVATAR="images/app/KakaoTalk/Profile/성현이형(매니저)/IMG_7422.jpeg";
 const DISPATCH="https://www.dispatch.co.kr/article/1";
 const ACK="https://entertain.naver.com/article/sample/3";
 const KEY="hwaho-story-intro-v3";
 const $=s=>document.querySelector(s);
 const saved=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}})();
 let redialNext=false, stage=saved&&saved.stage||"manager-message", secondStarted=!!(saved&&saved.secondStarted), viewedAt=saved&&saved.viewedAt||0, ringTimer=0, messageTimer=0;
 window.HwahoIntroFresh = stage === "manager-message";
 /* story.js must not resume its previous sequence while this intro is in progress. */
 window.HwahoIntroDone = stage === "handoff";
 window.HwahoIntroActive = stage !== "handoff";
 if(stage==="second-call"||stage==="second-call-active"){stage="dispatch-reading";secondStarted=false;viewedAt=viewedAt||Date.now()-5500;}
 if(stage==="first-call"||stage==="urgent")stage="dispatch";
 if(stage==="dispatch-reading"&&!viewedAt)stage="dispatch";
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({stage,secondStarted,viewedAt}))}catch(e){}};
 const root=document.createElement("div");root.id="story-intro-notice";document.querySelector("#screen")?.appendChild(root);
 const css=document.createElement("style");css.textContent="#story-intro-notice{position:absolute;z-index:1200;inset:0;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif}#story-intro-notice .card{pointer-events:auto;position:relative;left:auto;right:auto;top:auto;width:100%;box-sizing:border-box;display:flex;gap:11px;align-items:center;padding:12px 14px;border:1px solid rgba(255,255,255,.72);border-radius:21px;background:rgba(255,255,255,.43);backdrop-filter:blur(30px) saturate(190%);-webkit-backdrop-filter:blur(30px) saturate(190%);box-shadow:0 8px 28px #0002;color:#111;text-align:left;animation:intro-in .6s cubic-bezier(.2,.9,.25,1) both}#story-intro-notice .stack{position:absolute;top:34%;left:8px;right:8px;display:flex;flex-direction:column;gap:9px;pointer-events:auto}#story-intro-notice img{width:40px;height:40px;border-radius:11px;object-fit:cover}#story-intro-notice .txt{min-width:0;flex:1;font-size:14px;line-height:1.35}#story-intro-notice .meta{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:3px}#story-intro-notice b{display:block;font-size:14px;margin-bottom:0}#story-intro-notice .time{font-size:11px;line-height:1.4;color:rgba(30,30,35,.55);white-space:nowrap;padding-top:1px}#story-intro-notice .body{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#story-intro-notice .stack.top{top:calc(env(safe-area-inset-top,0px) + 12px)}@keyframes intro-in{0%{opacity:0;transform:translateY(-90px) scale(.94)}55%{opacity:1}100%{opacity:1;transform:translateY(0) scale(1)}}";document.head.appendChild(css);
 function makeNotice(title,body,app,fn,time){const b=document.createElement("button");b.className="card";b.type="button";const im=document.createElement("img");im.src=app==="Dispatch"?"images/app/Dispatch/정윤호_마스_열애설/collage 2.png":app==="Naver"?"images/app/Naver/IMG_7151.png":"images/app/KakaoTalk/IMG_7149.png";const t=document.createElement("span");t.className="txt";const meta=document.createElement("span");meta.className="meta";const h=document.createElement("b");h.textContent=title;meta.append(h);if(time){const tm=document.createElement("small");tm.className="time";tm.textContent=time;meta.append(tm)}const p=document.createElement("span");p.className="body";p.textContent=body;t.append(meta,p);b.append(im,t);b.onclick=fn;return b}
 const sendText=()=>{if(window.KakaoApp)KakaoApp.appendStoryMessage("너 이거 뭐야?","text","","c3","f2",[14,25])};
 const sendLink=()=>{if(window.KakaoApp)KakaoApp.appendStoryMessage("[단독] 마스♥정윤호, 심야 데이트 포착 — 디스패치 기사 링크","link",DISPATCH,"c3","f2",[14,25])};
 function showManagerNotification(){root.innerHTML="";if(window.HwahoClock&&window.HwahoIntroFresh)HwahoClock.set(14,25,0);sendText();const stack=document.createElement("div");stack.className="stack";const go=()=>{if(stage!=="manager-message")return;clearTimeout(messageTimer);stage="unlock-chat";save();root.innerHTML="";if(window.HwahoLock)HwahoLock.promptUnlock();};stack.appendChild(makeNotice("성현이형","너 이거 뭐야?","KakaoTalk",go,"오후 2:25"));root.appendChild(stack);stage="manager-message";save();place();
  /* 잠시 뒤 기사 링크가 위쪽에 새로 도착 (최신 알림이 맨 위) */
  clearTimeout(messageTimer);messageTimer=setTimeout(()=>{if(stage!=="manager-message"||!stack.isConnected)return;sendLink();stack.insertBefore(makeNotice("성현이형","[단독] 마스♥정윤호, 심야 데이트 포착 — 디스패치 기사 링크","KakaoTalk",go,"오후 2:25"),stack.firstChild);},1600)}
 function showManagerChat(){if(stage!=="unlock-chat")return;stage="manager-chat";save();root.innerHTML="";if(window.KakaoApp){KakaoApp.openStoryChat("c3");sendText();sendLink();}}
 function place(){const stack=root.querySelector(".stack:not(.top)");if(stack)stack.style.top="39%"}
 function clearNotice(){root.innerHTML=""}
 function notice(title,body,app,fn,time){root.innerHTML="";const stack=document.createElement("div");stack.className="stack top";stack.appendChild(makeNotice(title,body,app,fn,time||"지금"));root.appendChild(stack);place()}
 function ringFirst(){if(stage!=="first-call"||!window.FaceTimeApp)return;FaceTimeApp.ring({caller:MANAGER,kind:"manager-first",avatar:AVATAR,subtitle:"휴대전화"})}
 function urgent(){if(stage!=="first-call")return;if(window.PhoneApp&&PhoneApp.recordStoryMissedCall)PhoneApp.recordStoryMissedCall(MANAGER,"manager-first");stage="urgent";save();if(window.KakaoApp)KakaoApp.appendStoryMessage("성화야, 너 지금 장난해? 당장 회사로 와.","text","","c3","f2",[22,14]);notice(MANAGER,"윤호야, 너 지금 장난해? 당장 회사로 와.","KakaoTalk",()=>{clearNotice();stage="dispatch";save();setTimeout(dispatchNotice,350)})}
 function dispatchNotice(){if(stage!=="dispatch")return;notice("Dispatch","[단독] \"누가 봐도 평범한 사이는 아니었다\"…마스♥정윤호, 심야 데이트 포착","Dispatch",()=>{clearNotice();stage="dispatch-reading";viewedAt=0;save();openArticle(DISPATCH);})}
 function openArticle(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url)}}
 function scheduleSecond(ms){clearTimeout(ringTimer);ringTimer=setTimeout(ringSecond,Math.max(0,ms))}
 function ringSecond(){ringTimer=0;if(stage!=="dispatch-reading"||secondStarted||!viewedAt)return;secondStarted=true;stage="second-call";save();const dialogue=[["성현","기사 봤지?","them",1700],["성화","네, 방금 봤어요.","me",1900],["성현","솔직하게 말해. 너희 진짜 사귀는 거 맞아?","them",2700],["성화","네, 맞아요. 숨길 생각도 딱히 없었고요.","me",2400],["성현","하… 그럴 줄 알았다. 그래도 기사로 먼저 보게 하냐, 나는.","them",3200],["성화","일부러 숨긴 건 아니에요. 말할 타이밍을 보고 있었어요.","me",2800],["성현","일단 회사 입장에선 이걸로 크게 타격 받을 건 없어 보여. 괜히 아니라고 버티는 것보다 인정하는 게 낫겠다.","them",4300],["성화","저도 그게 낫다고 생각해요. 거짓말하는 것도 싫고요.","me",2600],["성현","알았어. 회사에서 열애 인정 입장 낼게.","them",2300],["성화","네 형. 미리 말 못 해서 죄송해요. 고마워요.","me",2400]];const redial=[["성현","왜 안 받냐.","them",1700],["성화","아 형, 기사 보고 있었어요.","me",2100]].concat(dialogue);const useRedial=redialNext;redialNext=false;FaceTimeApp.ring({caller:"성현이형",kind:"manager-second",avatar:AVATAR,subtitle:"휴대전화",dialogue:useRedial?redial:dialogue,redial})}
 function showAck(){stage="ack-article";save();if(window.HwahoClock)HwahoClock.set(14,53,0);notice("네이버 뉴스","[단독] 마스 측 “정윤호와 열애 중” 공식 인정…‘친한 동료’에서 연인으로","Naver",()=>{clearNotice();stage="ack-reading";save();openArticle(ACK)})}
 document.addEventListener("story:manager-link-opened",e=>{if(stage==="dispatch-reading"){e.stopImmediatePropagation();if(window.KakaoApp)KakaoApp.close();openArticle((e.detail&&e.detail.url)||DISPATCH);return}if(stage!=="manager-chat")return;e.stopImmediatePropagation();stage="dispatch-reading";viewedAt=0;save();if(window.KakaoApp)KakaoApp.close();openArticle((e.detail&&e.detail.url)||DISPATCH);});
 document.addEventListener("story:dispatch-article-viewed",()=>{if(stage!=="dispatch-reading"||secondStarted||viewedAt)return;viewedAt=Date.now();save();scheduleSecond(4000)});
 document.addEventListener("story:manager-second-declined",()=>{if(stage!=="second-call"&&stage!=="second-call-active")return;redialNext=true;secondStarted=false;stage="dispatch-reading";save();scheduleSecond(5000)});
 document.addEventListener("story:manager-call-connected",()=>{if(stage==="second-call")stage="second-call-active";save()});
 document.addEventListener("story:manager-call-ended",()=>{if(stage==="second-call-active")showAck()});
 document.addEventListener("story:ack-article-viewed",()=>{if(stage!=="ack-reading")return;if(window.HwahoClock)HwahoClock.set(15,2,0);stage="handoff";save();window.HwahoIntroDone=true;window.HwahoIntroActive=false;document.dispatchEvent(new CustomEvent("story:start"))});
 const lockNode=document.getElementById("lock");
 if(lockNode&&window.MutationObserver)new MutationObserver(()=>{if(lockNode.dataset.state==="open"&&stage==="unlock-chat")showManagerChat();}).observe(lockNode,{attributes:true,attributeFilter:["data-state"]});
 if(stage==="manager-message")setTimeout(showManagerNotification,450);
 else if(stage==="unlock-chat")setTimeout(()=>{if(document.getElementById("lock")?.dataset.state==="open")showManagerChat();},300);
   else if(stage==="dispatch")dispatchNotice();
 else if(stage==="dispatch-reading"&&viewedAt)scheduleSecond(4000-(Date.now()-viewedAt));
 else if(stage==="ack-article"||stage==="ack-reading")showAck();
})();