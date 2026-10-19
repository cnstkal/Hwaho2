/* Intro sequence: lock screen -> missed manager call -> urgent alerts -> Dispatch -> second call -> acknowledgement article. */
(()=> {
 const MANAGER="성현", AVATAR="images/app/KakaoTalk/Profile/성현/IMG_7422.jpeg";
 const DISPATCH="https://www.dispatch.co.kr/article/1";
 const ACK="https://entertain.naver.com/article/sample/6";
 const KEY="hwaho-story-intro-v1";
 const $=s=>document.querySelector(s);
 const saved=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}})();
 let stage=saved&&saved.stage||"first-call", secondStarted=!!(saved&&saved.secondStarted), viewedAt=saved&&saved.viewedAt||0, ringTimer=0;
 window.HwahoIntroFresh = stage === "first-call";
 /* story.js must not resume its previous sequence while this intro is in progress. */
 window.HwahoIntroDone = stage === "handoff";
 window.HwahoIntroActive = stage !== "handoff";
 if(stage==="second-call"||stage==="second-call-active"){stage="dispatch-reading";secondStarted=false;viewedAt=viewedAt||Date.now()-5500;}
 if(stage==="dispatch-reading"&&!viewedAt)stage="dispatch";
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({stage,secondStarted,viewedAt}))}catch(e){}};
 const root=document.createElement("div");root.id="story-intro-notice";document.querySelector("#screen")?.appendChild(root);
 const css=document.createElement("style");css.textContent="#story-intro-notice{position:absolute;z-index:1200;inset:0;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif}#story-intro-notice .card{pointer-events:auto;position:absolute;top:calc(env(safe-area-inset-top,0px) + 34px);left:12px;right:12px;box-sizing:border-box;display:flex;gap:11px;align-items:center;padding:12px 14px;border:1px solid rgba(255,255,255,.58);border-radius:21px;background:rgba(255,255,255,.66);backdrop-filter:blur(25px) saturate(170%);-webkit-backdrop-filter:blur(25px) saturate(170%);box-shadow:0 8px 28px #0002;color:#111;text-align:left;animation:intro-in .35s ease-out both}#story-intro-notice img{width:40px;height:40px;border-radius:11px;object-fit:cover}#story-intro-notice .txt{min-width:0;flex:1;font-size:14px;line-height:1.35}#story-intro-notice b{display:block;font-size:14px;margin-bottom:3px}#story-intro-notice .body{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}@keyframes intro-in{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}";document.head.appendChild(css);
 function notice(title,body,app,fn){root.innerHTML="";const b=document.createElement("button");b.className="card";b.type="button";const im=document.createElement("img");im.src=app==="Dispatch"?"images/app/Dispatch/정윤호_마스_열애설/collage 2.png":"images/app/KakaoTalk/IMG_7149.png";const t=document.createElement("span");t.className="txt";const h=document.createElement("b");h.textContent=title;const p=document.createElement("span");p.className="body";p.textContent=body;t.append(h,p);b.append(im,t);b.onclick=fn;root.appendChild(b);place()}
 function place(){const b=root.firstElementChild,l=document.getElementById("lock");if(!b)return;b.style.top="";if(l&&l.dataset.state!=="open"){const n=document.getElementById("lk-notis"),sc=document.querySelector("#screen");if(n&&sc){const r=n.getBoundingClientRect(),q=sc.getBoundingClientRect();if(r.top>q.top)b.style.top=(r.top-q.top)+"px"}}}
 {const l=document.getElementById("lock");if(l&&window.MutationObserver)new MutationObserver(place).observe(l,{attributes:true,attributeFilter:["data-state"]})}
 function clearNotice(){root.innerHTML=""}
 function ringFirst(){if(stage!=="first-call"||!window.FaceTimeApp)return;FaceTimeApp.ring({caller:MANAGER,kind:"manager-first",avatar:AVATAR,subtitle:"휴대전화"})}
 function urgent(){if(stage!=="first-call")return;if(window.PhoneApp&&PhoneApp.recordStoryMissedCall)PhoneApp.recordStoryMissedCall(MANAGER,"manager-first");stage="urgent";save();if(window.KakaoApp)KakaoApp.appendStoryMessage("성화야, 너 지금 장난해? 당장 회사로 와.","text","","c3","f2",[22,14]);notice(MANAGER,"윤호야, 너 지금 장난해? 당장 회사로 와.","KakaoTalk",()=>{clearNotice();stage="dispatch";save();setTimeout(dispatchNotice,350)})}
 function dispatchNotice(){if(stage!=="dispatch")return;notice("Dispatch","[단독] \"누가 봐도 평범한 사이는 아니었다\"…마스♥정윤호, 심야 데이트 포착","Dispatch",()=>{clearNotice();stage="dispatch-reading";viewedAt=0;save();openArticle(DISPATCH);})}
 function openArticle(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url)}}
 function scheduleSecond(ms){clearTimeout(ringTimer);ringTimer=setTimeout(ringSecond,Math.max(0,ms))}
 function ringSecond(){ringTimer=0;if(stage!=="dispatch-reading"||secondStarted||!viewedAt)return;secondStarted=true;stage="second-call";save();const dialogue=[["성현","성화야, 디스패치 기사 봤지? 너희 둘 실제로 사귀는 거 맞아?","them",2600],["성화","네, 맞아요.","me",2100],["성현","…회사 입장에서 봐도 생각보다 큰 타격은 아닐 것 같아.","them",2700],["성현","무조건 부인하기보다 인정하는 편이 낫겠어.","them",2400],["성화","저도 그렇게 생각해요.","me",2200],["성현","알았어. 회사에서 열애 인정 입장 낼게.","them",2500],["성화","네, 성현 씨.","me",1800]];FaceTimeApp.ring({caller:MANAGER,kind:"manager-second",avatar:AVATAR,subtitle:"휴대전화",dialogue})}
 function showAck(){stage="ack-article";save();notice("열애 인정 기사","정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”","Dispatch",()=>{clearNotice();stage="ack-reading";save();openArticle(ACK)})}
 document.addEventListener("story:manager-first-call-missed",urgent);
 document.addEventListener("story:dispatch-article-viewed",()=>{if(stage!=="dispatch-reading"||secondStarted||viewedAt)return;viewedAt=Date.now();save();scheduleSecond(7000)});
 document.addEventListener("story:manager-second-declined",()=>{if(stage!=="second-call"&&stage!=="second-call-active")return;secondStarted=false;stage="dispatch-reading";save();scheduleSecond(5000)});
 document.addEventListener("story:manager-call-connected",()=>{if(stage==="second-call")stage="second-call-active";save()});
 document.addEventListener("story:manager-call-ended",()=>{if(stage==="second-call-active")showAck()});
 document.addEventListener("story:ack-article-viewed",()=>{if(stage!=="ack-reading")return;stage="handoff";save();window.HwahoIntroDone=true;window.HwahoIntroActive=false;document.dispatchEvent(new CustomEvent("story:start"))});
 if(stage==="first-call")setTimeout(ringFirst,450);
 else if(stage==="urgent")notice(MANAGER,"윤호야, 너 지금 장난해? 당장 회사로 와.","KakaoTalk",()=>{clearNotice();stage="dispatch";save();dispatchNotice()});
 else if(stage==="dispatch")dispatchNotice();
 else if(stage==="dispatch-reading"&&viewedAt)scheduleSecond(7000-(Date.now()-viewedAt));
 else if(stage==="ack-article"||stage==="ack-reading")showAck();
})();