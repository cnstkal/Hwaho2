/* Story sequence controller — uses the site's existing KakaoTalk UI */
(()=> {
 const style=document.createElement("style");
 style.textContent="#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .toast{pointer-events:auto;position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;right:12px;background:rgba(248,248,250,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#171717;border:0;border-radius:18px;padding:12px;box-shadow:0 4px 20px #0002;display:flex;gap:11px;text-align:left;align-items:center;width:calc(100% - 24px)}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none}#story-ui .copy{font-size:13px;line-height:1.35;flex:1;min-width:0}#story-ui b{display:block;margin-bottom:4px;font-weight:650}#story-ui .preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}#story-ui .when{font-size:11px;color:#777;align-self:flex-start;white-space:nowrap}";
 document.head.appendChild(style);
 const root=document.createElement("div");root.id="story-ui";document.querySelector("#screen")?.appendChild(root);
 const KAKAO_ICON="images/app/KakaoTalk/IMG_7149.png";
 const ARTICLE1="정윤호 측, 마스 열애설에 선 긋기…“사실무근, 열애 관계 아니다”";
 const ARTICLE2="정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”";
 let stage="idle",started=false,yunhoIndex=0;
 const toast=(name,msg,app="KakaoTalk")=>{const icon=app==="Instagram"?"images/app/Instagram/IMG_7148.png":KAKAO_ICON;root.innerHTML='<button class="toast" data-story="open"><img class="ico" src="'+icon+'" alt=""><span class="copy"><b>'+name+'</b><span class="preview">'+msg+'</span></span><span class="when">지금</span></button>';};
 function openManager(){if(window.Home)Home.openApp("kakaotalk");KakaoApp.open();KakaoApp.openStoryChat("c3");}
 function start(){if(started)return;started=true;stage="manager-link-alert";toast("성현이형(매니저)",ARTICLE1);}
 function managerLink(){stage="manager-question-alert";openManager();KakaoApp.appendStoryMessage(ARTICLE1,"link","https://entertain.naver.com/article/sample/4");setTimeout(()=>toast("성현이형(매니저)","이거 합의된 거야?"),2000);}
 function forceSafari(url){if(window.Home)Home.openApp("safari");if(window.SafariApp){SafariApp.open();SafariApp.navigate(url);}}
 function openFirstArticle(){stage="first-article";root.innerHTML="";forceSafari("https://entertain.naver.com/article/sample/4");setTimeout(()=>{if(window.FaceTimeApp)FaceTimeApp.ring();},10000);}
 root.addEventListener("click",e=>{const b=e.target.closest("[data-story]");if(!b)return;const tappedStage=stage;root.innerHTML="";if(b.dataset.story==="open"&&tappedStage==="manager-link-alert")managerLink();else if(b.dataset.story==="open"&&tappedStage==="manager-question-alert"){openManager();KakaoApp.appendStoryMessage("이거 합의된 거야?","text","","c3","f2");}else if(b.dataset.story==="open"&&tappedStage==="yunho-alert"){stage="yunho-chat";yunhoIndex=0;openYunhoChat();}else if(b.dataset.story==="open"&&tappedStage==="ig-alert"){stage="instagram";document.dispatchEvent(new CustomEvent("story:instagram-published"));root.innerHTML="";if(window.Home)Home.openApp("instagram");if(window.IgApp)IgApp.open();setTimeout(()=>{stage="manager2-alert";toast("성현이형(매니저)","정윤호쪽에서 인정했네");},5000);}else if(b.dataset.story==="open"&&tappedStage==="manager2-alert"){stage="manager2-chat";openManager();KakaoApp.appendStoryMessage("정윤호쪽에서 인정했네");KakaoApp.appendStoryMessage(ARTICLE2,"link","https://entertain.naver.com/article/sample/6");} });
 document.addEventListener("story:start",start);
 document.addEventListener("story:manager-link-opened",e=>{if(stage==="manager2-chat"||stage==="final-article"){stage="final-article";root.innerHTML="";forceSafari("https://entertain.naver.com/article/sample/6");return;}if(stage!=="manager-question-alert"&&stage!=="first-article")return;openFirstArticle();});
 document.addEventListener("story:call-ended",()=>{if(stage!=="first-article")return;stage="yunho-alert";if(window.KakaoApp)KakaoApp.appendStoryMessage("ㅎㅎ","text","","c0","f0");toast("윤둥이","ㅎㅎ");});
 const yunhoLines=[["me","이번 일로 뭐라하는 놈 있으면 나한테 데려와"],["me","내가 처리할게"],["f0","배고팡"],["me","무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?"],["f0","빨리와 💗"]];
 function openYunhoChat(){if(window.Home)Home.openApp("kakaotalk");if(window.KakaoApp){KakaoApp.open();KakaoApp.openStoryChat("c0");}}
 function nextYunhoMessage(){if(stage!=="yunho-chat"||yunhoIndex>=yunhoLines.length)return;const [from,msg]=yunhoLines[yunhoIndex++];KakaoApp.appendStoryMessage(msg,"text","", "c0",from);if(yunhoIndex===yunhoLines.length)setTimeout(()=>{stage="ig-alert";toast("Instagram","yunou._.u 님이 게시물을 올렸습니다","Instagram");},1200);}
 document.addEventListener("click",e=>{if(stage!=="yunho-chat")return;const box=e.target.closest("#kko-app #kk-msgs");if(box)nextYunhoMessage();},true);
 window.HwahoStory={start,get stage(){return stage;}};
})();