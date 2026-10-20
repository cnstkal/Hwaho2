/* ===== 일반 전화 시뮬레이션: 안내창 → 수신 전화 → 대화 → 자동 끊김 ===== */
const FaceTimeApp = (() => {
  const CFG = {
    delaySec: 45,
    ringDelayMs: 1500,
    missedSec: 0,
    caller: "윤둥이",
    callerSub: "휴대전화"
  };
  const $ = q => document.querySelector(q), screen = $("#screen");
  if (!screen) return {};
  const phoneSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5c-.8-.8-2-.8-2.8 0L2.6 4.7c-1 1-1.2 2.6-.4 3.9 3 5 6.8 8.8 11.8 11.8 1.3.8 2.9.6 3.9-.4l1.2-1.2c.8-.8.8-2 0-2.8l-2.5-2.5c-.7-.7-1.8-.8-2.6-.2l-1.2.9c-2.3-1.2-4.3-3.2-5.5-5.5l.9-1.2c.6-.8.5-1.9-.2-2.6z" fill="currentColor"/></svg>';
  const root = document.createElement("div");
  root.id = "ft-root";
  root.innerHTML = `
<div class="ft-dim" id="ft-dim"></div>
<div class="ft-alert" id="ft-alert" role="alertdialog" aria-hidden="true">
  <div class="ft-at">진행하시겠습니까?</div>
  <div class="ft-ab"><button data-ft="no">아니요</button><button data-ft="yes" class="b">네</button></div>
</div>
<div class="ft-incoming" id="ft-incoming" aria-hidden="true">
  <div class="ft-in-small">전화가 오고 있습니다</div>
  <div class="ft-contact-avatar">${CFG.caller.slice(0,1)}</div>
  <div class="ft-in-name">${CFG.caller}</div>
  <div class="ft-in-sub">${CFG.callerSub}</div>
  <div class="ft-in-actions">
    <button class="ft-round decline" data-ft="decline" aria-label="거절"><span>${phoneSvg}</span><small>거절</small></button>
    <button class="ft-round accept" data-ft="accept" aria-label="응답"><span>${phoneSvg}</span><small>응답</small></button>
  </div>
</div>
<div class="ft-call" id="ft-call" aria-hidden="true">
  <div class="ft-call-head"><div class="ft-call-avatar">${CFG.caller.slice(0,1)}</div><b>${CFG.caller}</b><span id="ft-st">연결 중…</span></div>
  <div class="ft-transcript" id="ft-transcript" aria-live="polite"></div>
  <div class="ft-call-controls">
    <button data-ft="mute" aria-label="음소거"><span class="ft-control-icon">⌁</span><small>음소거</small></button>
    <button data-ft="keypad" aria-label="키패드"><span class="ft-control-icon ft-keypad">⠿</span><small>키패드</small></button>
    <button data-ft="speaker" aria-label="스피커"><span class="ft-control-icon">◖))</span><small>스피커</small></button>
    <button data-ft="add" aria-label="통화 추가"><span class="ft-control-icon">＋</span><small>통화 추가</small></button>
  </div>
  <div class="ft-call-bottom">
    <button data-ft="end" class="ft-end" aria-label="통화 종료"><span>${phoneSvg}</span><small>종료</small></button>
  </div>
</div>`;
  screen.appendChild(root);
  const style = document.createElement("style");
  style.textContent = `
#ft-root{position:absolute;inset:0;z-index:40;font-family:var(--font);pointer-events:none;color:#fff}
#ft-root *{box-sizing:border-box}
#ft-root button{font:inherit;border:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
#ft-root svg{width:100%;height:100%;display:block}
#ft-root .ft-dim{position:absolute;inset:0;background:rgba(0,0,0,.42);opacity:0;transition:opacity .2s}
#ft-root .ft-dim.on{opacity:1;pointer-events:auto}
#ft-root .ft-alert{position:absolute;z-index:9;left:50%;top:50%;width:270px;border-radius:14px;overflow:hidden;background:rgba(246,246,246,.97);color:#000;text-align:center;transform:translate(-50%,-50%) scale(1.08);opacity:0;transition:transform .2s,opacity .2s}
#ft-root .ft-alert.on{transform:translate(-50%,-50%) scale(1);opacity:1;pointer-events:auto}
#ft-root .ft-at{padding:22px 16px 20px;font-size:17px;font-weight:600;line-height:1.3}
#ft-root .ft-ab{display:flex;border-top:.5px solid rgba(60,60,67,.3)}
#ft-root .ft-ab button{flex:1;height:44px;font-size:17px;color:#007aff;background:transparent}
#ft-root .ft-ab button.b{font-weight:600;border-left:.5px solid rgba(60,60,67,.3)}
#ft-root .ft-incoming,#ft-root .ft-call{position:absolute;inset:0;background:linear-gradient(180deg,#24252a 0%,#111216 48%,#050506 100%);opacity:0;visibility:hidden;transition:opacity .25s;display:flex;flex-direction:column;align-items:center}
#ft-root .ft-incoming.on,#ft-root .ft-call.on{opacity:1;visibility:visible;pointer-events:auto}
#ft-root .ft-in-small{margin-top:calc(env(safe-area-inset-top,0px) + 82px);font-size:15px;color:#c5c5ca}
#ft-root .ft-contact-avatar{margin-top:44px;width:112px;height:112px;border-radius:50%;background:linear-gradient(145deg,#8c8c92,#55565d);display:grid;place-items:center;font-size:54px;font-weight:400}
#ft-root .ft-in-name{margin-top:20px;font-size:34px;font-weight:400;letter-spacing:-1px}
#ft-root .ft-in-sub{margin-top:8px;font-size:16px;color:#b7b7bd}
#ft-root .ft-in-actions{position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 66px);display:flex;justify-content:space-evenly;align-items:center}
#ft-root .ft-round{background:transparent;display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px}
#ft-root .ft-round span{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;padding:22px}
#ft-root .ft-round svg{transform:rotate(135deg)}
#ft-root .ft-round small{font-size:13px;color:#ddd}
#ft-root .ft-round.decline span{background:#ff453a}
#ft-root .ft-round.accept span{background:#30d158}

/* 통화 화면: 상단(이름·시간) / 가운데(메시지 카드 → 제어 버튼) / 하단(종료) 세 영역으로 분리 */
#ft-root .ft-call{justify-content:flex-start;padding:calc(env(safe-area-inset-top,0px) + 35px) 18px calc(env(safe-area-inset-bottom,0px) + 16px);min-height:0}
#ft-root .ft-call-head{display:flex;flex-direction:column;align-items:center;gap:7px;flex:none}
#ft-root .ft-call-avatar{width:58px;height:58px;border-radius:50%;background:linear-gradient(145deg,#8c8c92,#55565d);display:grid;place-items:center;font-size:28px}
#ft-root .ft-call-head b{font-size:23px;font-weight:600}
#ft-root .ft-call-head span{font-size:14px;color:#c3c3c8;font-variant-numeric:tabular-nums}
#ft-root .ft-transcript{width:100%;flex:1 1 auto;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:10px;padding:16px 0 16px}
#ft-root .ft-line{max-width:88%;padding:10px 13px;border-radius:17px;font-size:15px;line-height:1.42;animation:ftLineIn .22s ease-out;overflow-wrap:anywhere}
#ft-root .ft-line.me{align-self:flex-end;background:#0a84ff;border-bottom-right-radius:5px}
#ft-root .ft-line.them{align-self:flex-start;background:#343438;border-bottom-left-radius:5px}
#ft-root .ft-line .ft-speaker{display:block;font-size:10px;opacity:.65;margin-bottom:3px}
@keyframes ftLineIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
#ft-root .ft-call-controls{width:100%;flex:none;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;justify-items:center;margin:14px 0 26px}
#ft-root .ft-call-controls button{background:transparent;display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0}
#ft-root .ft-control-icon{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#393a40;font-size:24px}
#ft-root .ft-keypad{font-size:30px}
#ft-root .ft-call-controls small{font-size:11px;color:#f3f3f5;white-space:nowrap}
#ft-root .ft-call-bottom{width:100%;flex:none;display:flex;justify-content:center;padding-top:4px}
#ft-root .ft-call-bottom button{background:transparent;display:flex;flex-direction:column;align-items:center;gap:8px}
#ft-root .ft-call-bottom .ft-end span{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;padding:18px;background:#ff453a}
#ft-root .ft-call-bottom .ft-end svg{transform:rotate(135deg)}
#ft-root .ft-call-bottom small{font-size:11px;color:#f3f3f5}
#ft-root .ft-call-controls button.off .ft-control-icon{background:#fff;color:#111}
`;
  document.head.appendChild(style);
  const el = id => $("#" + id);
  let state = "idle", missT = 0, ringT = 0, tickT = 0, dialogueT = 0, sec = 0, lineIndex = 0, alertOpen = false, curKind = "", lastOpts = null;
  const storyStarted = () => !!(window.HwahoStory && window.HwahoStory.started);
  const vib = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
  const DEFAULT_DIALOGUE = [
    ["성화","여보세요?","me",1500],
    ["성화","전화는 왜 안받았어?","me",1800],
    ["성화","괜찮은 거 맞지?","me",1800],
    ["윤호","나야 괜찮지","them",1900],
    ["성화","아니 근데 사실무근은 무슨 소리야?","me",2300],
    ["윤호","왜?","them",1400],
    ["성화","우리 헤어졌어?","me",1700],
    ["윤호","아니?","them",1300],
    ["성화","그럼 왜?","me",1500],
    ["성화","알았어","me",1300],
    ["성화","정정기사는 내줄거지?","me",1900],
    ["윤호","형 하는 거 봐서","them",1900],
    ["성화","아니 윤호야,","me",1300]
  ];
  let dialogue = DEFAULT_DIALOGUE;
  function setAlert(on){alertOpen=!!on;el("ft-dim").classList.toggle("on",on);el("ft-alert").classList.toggle("on",on);el("ft-alert").setAttribute("aria-hidden",on?"false":"true");}
  function showIncoming(on){el("ft-incoming").classList.toggle("on",on);el("ft-incoming").setAttribute("aria-hidden",on?"false":"true");}
  function showCall(on){el("ft-call").classList.toggle("on",on);el("ft-call").setAttribute("aria-hidden",on?"false":"true");}
  /* 안내창은 한 번에 하나만, 그리고 스토리가 이미 시작된 뒤에는 다시 띄우지 않는다 */
  function prompt(){if(state!=="idle"||alertOpen||storyStarted()||window.HwahoIntroActive)return;state="prompt";setAlert(true);}
  /* 수신 화면의 이름/아바타 요소는 id가 아니라 class로 존재하므로 root 안에서 class로 찾는다 */
  function ring(options={}){clearTimeout(missT);if(state==="call"||state==="ringing")return;if(typeof options==="string")options={caller:options};lastOpts=options;curKind=options.kind||"";CFG.caller=options.caller||"윤둥이";dialogue=Array.isArray(options.dialogue)?options.dialogue:DEFAULT_DIALOGUE;const ini=CFG.caller.slice(0,1);root.querySelector(".ft-in-name").textContent=CFG.caller;root.querySelector(".ft-contact-avatar").textContent=ini;root.querySelector(".ft-call-head b").textContent=CFG.caller;root.querySelector(".ft-call-avatar").textContent=ini;state="ringing";showIncoming(true);vib([400,200,400,200,400]);}
  function playDialogue(){
    if(state!=="call")return;
    if(lineIndex>=dialogue.length){endCall();return;}
    const [speaker,text,side,wait]=dialogue[lineIndex++];
    const row=document.createElement("div");row.className="ft-line "+side;
    row.innerHTML='<span class="ft-speaker"></span><span class="ft-words"></span>';
    row.querySelector(".ft-speaker").textContent=speaker;
    row.querySelector(".ft-words").textContent=text;
    el("ft-transcript").appendChild(row);
    while(el("ft-transcript").children.length>5)el("ft-transcript").firstElementChild.remove();
    el("ft-st").textContent="00:"+String(sec).padStart(2,"0");
    dialogueT=setTimeout(()=>{if(lineIndex>=dialogue.length)endCall();else playDialogue();},wait);
  }
  function finishCall(){
    if(state!=="pcall")return;
    state="idle";const k=curKind,who=CFG.caller;
    if(window.Home&&Home.goHome)Home.goHome();
    document.dispatchEvent(new CustomEvent("story:call-ended",{detail:{kind:k,caller:who}}));
    if(k==="manager-second")document.dispatchEvent(new CustomEvent("story:manager-call-ended"));
  }
  function openCall(){
    /* 기존 전화 앱의 통화 화면으로 진행 (연락처가 없으면 아래 기본 화면 사용) */
    if(window.PhoneApp&&PhoneApp.storyCall){
      clearTimeout(missT);clearTimeout(dialogueT);showIncoming(false);state="pcall";
      if(curKind==="manager-second")document.dispatchEvent(new CustomEvent("story:manager-call-connected"));
      if(PhoneApp.storyCall({name:CFG.caller,lines:dialogue.map(l=>[l[0],l[1],l[3]]),onEnd:finishCall}))return;
      state="ringing";showIncoming(true);
    }
        clearTimeout(missT);clearTimeout(dialogueT);showIncoming(false);state="call";sec=0;lineIndex=0;if(curKind==="manager-second")document.dispatchEvent(new CustomEvent("story:manager-call-connected"));
    el("ft-transcript").innerHTML="";showCall(true);el("ft-st").textContent="연결 중…";
    clearInterval(tickT);tickT=setInterval(()=>{sec++;el("ft-st").textContent="00:"+String(sec).padStart(2,"0");},1000);
    dialogueT=setTimeout(playDialogue,900);
  }
  function endCall(){
    if(state==="pcall")return;
    if(state!=="call")return;
    clearInterval(tickT);clearTimeout(dialogueT);state="idle";showCall(false);const k=curKind,who=CFG.caller;document.dispatchEvent(new CustomEvent("story:call-ended",{detail:{kind:k,caller:who}}));if(k==="manager-second")document.dispatchEvent(new CustomEvent("story:manager-call-ended"));
    el("ft-transcript").innerHTML="";
    root.querySelectorAll('[data-ft="mute"],[data-ft="speaker"]').forEach(b=>b.classList.remove("off"));
  }
  root.addEventListener("click",e=>{
    const b=e.target.closest("[data-ft]");if(!b)return;
    switch(b.dataset.ft){
      case "yes":if(!alertOpen)break;setAlert(false);state="prompt";clearTimeout(ringT);ringT=0;document.dispatchEvent(new CustomEvent("story:start"));break;
      case "no":if(!alertOpen)break;setAlert(false);state="idle";clearTimeout(ringT);ringT=setTimeout(()=>{ringT=0;if(state==="idle")prompt();},40000);break;
      case "decline":clearTimeout(missT);showIncoming(false);state="idle";if(curKind==="manager-second"){document.dispatchEvent(new CustomEvent("story:manager-second-declined"));break;}{const o=lastOpts||{},mgr=String(o.kind||"").indexOf("manager")===0;missT=setTimeout(()=>{if(state==="idle")ring(mgr&&o.redial?Object.assign({},o,{dialogue:o.redial}):o);},mgr?20000:1000);}break;
      case "accept":openCall();break;
      case "end":endCall();break;
      case "mute":case "speaker":b.classList.toggle("off");break;
      case "keypad":case "add":b.classList.toggle("off");break;
    }
  });
  document.addEventListener("app:close",()=>{if(state==="call")endCall();});
  const q=new URLSearchParams(location.search).get("ft");
  let viewed=0,fired=false;
  const timer=setInterval(()=>{
    if(fired)return clearInterval(timer);
    if(document.hidden)return;
    viewed++;
    if(viewed>=(q==="now"?2:CFG.delaySec)){fired=true;clearInterval(timer);prompt();}
  },1000);
  return {prompt,ring,openCall,endCall};
})();
window.FaceTimeApp = FaceTimeApp;
