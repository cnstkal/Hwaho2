/* ===== 일반 전화 시뮬레이션: 안내창 → 수신 전화 → 대화 → 자동 끊김 ===== */
const FaceTimeApp = (() => {
  const CFG = {
    delaySec: 30,
    ringDelayMs: 1500,
    missedSec: 0,
    caller: "윤둥이",
    callerSub: "휴대전화"
  };
  const $ = q => document.querySelector(q), screen = $("#screen");
  if (!screen) return {};
  const phoneSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5c-.8-.8-2-.8-2.8 0L2.6 4.7c-1 1-1.2 2.6-.4 3.9 3 5 6.8 8.8 11.8 11.8 1.3.8 2.9.6 3.9-.4l1.2-1.2c.8-.8.8-2 0-2.8l-2.5-2.5c-.7-.7-1.8-.8-2.6-.2l-1.2.9c-2.3-1.2-4.3-3.2-5.5-5.5l.9-1.2c.6-.8.5-1.9-.2-2.6z" fill="currentColor"/></svg>';
  const ICO = {
    spk:'<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/></svg>',
    cam:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2.5" fill="currentColor" stroke="none"/><path d="M18 10l4-2.5v9L18 14z" fill="currentColor" stroke="none"/><path d="M8.5 10.5a1.5 1.5 0 1 1 1.8 1.5c-.4.2-.3.6-.3 1M9 15v.1" stroke="#2c2c30" stroke-width="1.6"/></svg>',
    micoff:'<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M4 4l16 16"/></svg>',
    more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.7" fill="currentColor" stroke="none"/></svg>',
    dots:'<svg viewBox="0 0 24 24">'+[4.5,9.5,14.5,19.5].map(y=>[6,12,18].map(x=>'<circle cx="'+x+'" cy="'+y+'" r="1.3" fill="currentColor" stroke="none"/>').join("")).join("")+'</svg>'
  };
  const cb = (k,l,svg,c="") => `<button class="ft-cb${c}" data-ft="${k}" aria-label="${l}"><i>${svg}</i><span>${l}</span></button>`;
  const root = document.createElement("div");
  root.id = "ft-root";
  root.innerHTML = `
<div class="ft-dim" id="ft-dim"></div>
<div class="ft-alert" id="ft-alert" role="alertdialog" aria-hidden="true">
  <div class="ft-at">진행하시겠습니까?</div>
  <div class="ft-ab"><button data-ft="no">아니요</button><button data-ft="yes" class="b">네</button></div>
  <div class="ft-note">* 아니오를 누르면 40초 후 창이 다시 활성화됩니다.</div>
</div>
<div class="ft-incoming" id="ft-incoming" aria-hidden="true">
  <div class="ft-in-small">&nbsp;</div>
  <div class="ft-contact-avatar">${CFG.caller.slice(0,1)}</div>
  <div class="ft-in-name">${CFG.caller}</div>
  <div class="ft-in-sub">${CFG.callerSub}</div>
  <div class="ft-in-actions">
    <button class="ft-round decline" data-ft="decline" aria-label="거절"><span>${phoneSvg}</span><small>거절</small></button>
    <button class="ft-round accept" data-ft="accept" aria-label="응답"><span>${phoneSvg}</span><small>응답</small></button>
  </div>
</div>
<div class="ft-call" id="ft-call" aria-hidden="true">
  <div class="ft-cs" id="ft-st">연결 중...</div>
  <div class="ft-cn">${CFG.caller}</div>
  <div class="ft-pb" id="ft-transcript" aria-live="polite"></div>
  <div class="ft-cg">${cb("speaker","스피커",ICO.spk)}${cb("facetime","FaceTime",ICO.cam)}${cb("mute","소리 끔",ICO.micoff)}${cb("more","더 보기",ICO.more)}${cb("end","종료",phoneSvg," end")}${cb("keypad","키패드",ICO.dots)}</div>
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
#ft-root .ft-note{padding:8px 14px 10px;font-size:11px;line-height:1.35;color:#8e8e93;border-top:.5px solid rgba(60,60,67,.18)}
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
#ft-root .ft-call{padding:0}
#ft-root .ft-cs{margin-top:calc(env(safe-area-inset-top,0px) + 13%);font-size:20px;font-weight:500;color:rgba(255,255,255,.45);font-variant-numeric:tabular-nums}
#ft-root .ft-cn{margin-top:8px;font-size:34px;font-weight:600;letter-spacing:-1px;color:#fff}
#ft-root .ft-pb{-webkit-mask-image:linear-gradient(to bottom,transparent 0,rgba(0,0,0,.3) 14%,#000 46%);mask-image:linear-gradient(to bottom,transparent 0,rgba(0,0,0,.3) 14%,#000 46%);position:absolute;top:clamp(180px,24%,250px);bottom:calc(env(safe-area-inset-bottom,0px) + clamp(340px,39%,430px));left:0;width:100%;padding:12px 22px;text-align:left;color:#fff;font-size:15px;line-height:1.4;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:10px}
#ft-root .ft-pb-line{max-width:88%;padding:10px 13px;border-radius:17px;display:flex;flex-direction:column;gap:3px;overflow-wrap:anywhere;box-shadow:0 1px 1px #0001}
#ft-root .ft-pb-line.me{align-self:flex-end;background:#0a84ff;border-bottom-right-radius:5px}
#ft-root .ft-pb-line.them{align-self:flex-start;background:#343438;border-bottom-left-radius:5px}
#ft-root .ft-pb-line.note{align-self:center;max-width:92%;background:none;box-shadow:none;padding:4px 8px;text-align:center}#ft-root .ft-pb-line.note .ft-pb-words{font-size:13px;color:rgba(255,255,255,.62);font-style:italic}#ft-root .ft-pb-line.note .ft-pb-speaker{display:none}#ft-root .ft-pb-speaker{font-size:10px;opacity:.65}
#ft-root .ft-pb-words{font-size:15px;color:#fff}
#ft-root .ft-cg{position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 7%);margin:0;padding:0 10%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));justify-items:center;gap:22px 0}
#ft-root .ft-cb{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:15px;color:#fff;background:none}
#ft-root .ft-cb i{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;font-style:normal;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);box-shadow:inset 0 1px 1px rgba(255,255,255,.2)}
#ft-root .ft-cb i svg{width:30px;height:30px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
#ft-root .ft-cb.on i{background:#fff;color:#254138}
#ft-root .ft-cb.end i{background:#c62a22;border-color:#e0453c}
#ft-root .ft-cb.end svg{transform:rotate(135deg)}
#screen.ft-call-on #statusbar{z-index:60!important;color:#fff!important}
#screen.ft-call-on .sb-wifi{fill:#fff!important}
#screen.ft-call-on .bat-body{border-color:rgba(255,255,255,.4)!important}
#screen.ft-call-on .bat-body i{background:#fff!important}
#screen.ft-call-on .bat-cap{background:rgba(255,255,255,.4)!important}
`;
  document.head.appendChild(style);
  const el = id => $("#" + id);
  let state = "idle", missT = 0, ringT = 0, tickT = 0, dialogueT = 0, sec = 0, lineIndex = 0, alertOpen = false;
  const storyStarted = () => !!(window.HwahoStory && window.HwahoStory.started);
  const mmss = n => String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");
  let lines = [], incOn = false, callOn = false;
  const syncBar = () => screen.classList.toggle("ft-call-on", incOn || callOn);
  function renderLines(){const box=el("ft-transcript");box.innerHTML="";const vis=lines.slice(-6);vis.forEach((l,i)=>{const row=document.createElement("div");row.className="ft-pb-line "+l.side;row.style.opacity=(0.45+0.55*(i+1)/vis.length).toFixed(2);const sp=document.createElement("span");sp.className="ft-pb-speaker";sp.textContent=l.speaker;const w=document.createElement("span");w.className="ft-pb-words";w.textContent=l.text;row.append(sp,w);box.appendChild(row);});}
  const vib = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
  const DEFAULT_DIALOGUE = [
    ["성화","여보세요?","me",1600],
    ["윤호","어~ 형 왜","them",2000],
    ["성화","전화는 왜 안받았어?","me",2000],
    ["윤호","어? 전화 왔었어? 몰랐네","them",2400],
    ["성화","톡도 몇 개나 보냈잖아","me",2200],
    ["윤호","아 그래? 이따 볼게","them",2200],
    ["성화","괜찮은 거 맞지?","me",2000],
    ["윤호","나야 괜찮지","them",2200],
    ["성화","기사는 본 거지?","me",2000],
    ["윤호","기사? 아 그거. 봤지","them",2300],
    ["성화","근데 왜 이렇게 아무렇지 않아?","me",2400],
    ["윤호","내가 뭐 어때서ㅋㅋ 밥은 먹었어?","them",2500],
    ["성화","지금 밥이 중요해?","me",1900],
    ["성화","아니 근데 사실무근은 무슨 소리야?","me",2500],
    ["윤호","음~ 글쎄","them",2200],
    ["윤호","왜?","them",1800],
    ["성화","우리 헤어졌어?","me",2200],
    ["윤호","아니?","them",1800],
    ["성화","그럼 왜?","me",1900],
    ["윤호","왜긴. 다 이유가 있겠지","them",2500],
    ["성화","무슨 이유?","me",1900],
    ["윤호","그건 나중에 알려줄게. 오늘 날씨 좋다 그치","them",2800],
    ["성화","아니 잠깐, 나 지금 이해가 안 되는데","me",2500],
    ["성화","알았어","me",1800],
    ["성화","정정기사는 내줄거지?","me",2200],
    ["윤호","형 하는 거 봐서","them",2300],
    ["성화","아니 윤호야,","me",1800],
    ["윤호","형, 나 스케줄 들어가야 돼서 끊을게. 이따 봐~","them",2600],
    ["성화","윤호야? 여보세요? 윤호야!","me",1800]
  ];
  let dialogue = DEFAULT_DIALOGUE;
  function setAlert(on){alertOpen=!!on;el("ft-dim").classList.toggle("on",on);el("ft-alert").classList.toggle("on",on);el("ft-alert").setAttribute("aria-hidden",on?"false":"true");}
  function showIncoming(on){incOn=!!on;syncBar();el("ft-incoming").classList.toggle("on",on);el("ft-incoming").setAttribute("aria-hidden",on?"false":"true");}
  function showCall(on){callOn=!!on;syncBar();el("ft-call").classList.toggle("on",on);el("ft-call").setAttribute("aria-hidden",on?"false":"true");}
  /* 안내창은 한 번에 하나만, 그리고 스토리가 이미 시작된 뒤에는 다시 띄우지 않는다 */
  function prompt(){if(state!=="idle"||alertOpen||storyStarted())return;state="prompt";document.dispatchEvent(new CustomEvent("story:start"));}
  /* 수신 화면의 이름/아바타 요소는 id가 아니라 class로 존재하므로 root 안에서 class로 찾는다 */
  function ring(options={}){clearTimeout(missT);if(state==="call"||state==="ringing")return;if(typeof options==="string")options={caller:options};CFG.caller=options.caller||"윤둥이";dialogue=Array.isArray(options.dialogue)?options.dialogue:DEFAULT_DIALOGUE;const ini=CFG.caller.slice(0,1);root.querySelector(".ft-in-name").textContent=CFG.caller;root.querySelector(".ft-contact-avatar").textContent=ini;root.querySelector(".ft-cn").textContent=CFG.caller;state="ringing";showIncoming(true);vib([400,200,400,200,400]);}
  function playDialogue(){
    if(state!=="call")return;
    if(lineIndex>=dialogue.length){endCall();return;}
    const [speaker,text,side,wait]=dialogue[lineIndex++];
    lines.push({speaker,text,side});renderLines();
    el("ft-st").textContent=mmss(sec);
    dialogueT=setTimeout(()=>{if(lineIndex>=dialogue.length)endCall();else playDialogue();},wait);
  }
  function openCall(){
    clearTimeout(missT);clearTimeout(dialogueT);showIncoming(false);state="call";sec=0;lineIndex=0;
    lines=[];el("ft-transcript").innerHTML="";showCall(true);el("ft-st").textContent="연결 중...";
    clearInterval(tickT);tickT=setInterval(()=>{sec++;el("ft-st").textContent=mmss(sec);},1000);
    dialogueT=setTimeout(playDialogue,900);
  }
  function endCall(){
    if(state!=="call")return;
    clearInterval(tickT);clearTimeout(dialogueT);state="idle";showCall(false);document.dispatchEvent(new CustomEvent("story:call-ended"));
    lines=[];el("ft-transcript").innerHTML="";
    root.querySelectorAll('[data-ft="mute"],[data-ft="speaker"]').forEach(b=>b.classList.remove("on"));
  }
  root.addEventListener("click",e=>{
    const b=e.target.closest("[data-ft]");if(!b)return;
    switch(b.dataset.ft){
      case "yes":if(!alertOpen)break;setAlert(false);state="prompt";clearTimeout(ringT);ringT=0;document.dispatchEvent(new CustomEvent("story:start"));break;
      case "no":if(!alertOpen)break;setAlert(false);state="idle";clearTimeout(ringT);ringT=setTimeout(()=>{ringT=0;if(state==="idle")prompt();},40000);break;
      case "decline":clearTimeout(missT);showIncoming(false);state="idle";missT=setTimeout(()=>{if(state==="idle")ring();},1000);break;
      case "accept":openCall();break;
      case "end":endCall();break;
      case "mute":case "speaker":b.classList.toggle("on");break;
      case "keypad":case "more":case "facetime":break;
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