/* ===== facetime.js : 안내창 → 페이스타임 수신 알림 → 페이스타임 화면 ===== */
const FaceTimeApp = (() => {
  /* ---------- 설정 (여기만 바꾸면 됨) ---------- */
  const CFG = {
    delaySec: 45,            // 사이트를 보고 있는 시간이 이 값(초)에 도달하면 안내창이 뜸
    ringDelayMs: 1500,       // "네" 누른 뒤 수신 알림이 오기까지 시간
    missedSec: 30,           // 수신 알림을 이 시간 동안 안 받으면 부재중 처리
    caller: "울윤호",         // 전화 거는 사람 이름
    callerSub: "FaceTime 비디오",
  };
  const $ = q => document.querySelector(q), screen = $("#screen");
  if (!screen) return {};

  const ic = (p, w = 1.8, f = "none") => `<svg viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    cam: ic('<rect x="2.8" y="6" width="12.4" height="12" rx="2.8"/><path d="M15.2 10.4l5.6-3.2v9.6l-5.6-3.2z"/>', 1.9, "currentColor"),
    camOff: ic('<rect x="2.8" y="6" width="12.4" height="12" rx="2.8"/><path d="M15.2 10.4l5.6-3.2v9.6l-5.6-3.2zM3 3l18 18"/>', 1.9),
    phone: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>', 1.8, "currentColor"),
    mic: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>', 1.9),
    micOff: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M3 3l18 18"/>', 1.9),
    flip: ic('<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H9M20 16v2.5a1.5 1.5 0 0 1-1.500 1.500H15M4 8l2.5-2.500M4 8l2.500 2.500M20 16l-2.500 2.500M20 16l-2.500-2.500"/><circle cx="12" cy="12" r="3"/>', 1.8),
  };

  /* ---------- DOM ---------- */
  const root = document.createElement("div");
  root.id = "ft-root";
  root.innerHTML = `
<div class="ft-dim" id="ft-dim"></div>
<div class="ft-alert" id="ft-alert" role="alertdialog" aria-hidden="true">
  <div class="ft-at">진행하시겠습니까?</div>
  <div class="ft-ab"><button data-ft="no">아니요</button><button data-ft="yes" class="b">네</button></div>
</div>
<div class="ft-banner" id="ft-banner" aria-hidden="true">
  <div class="ft-bi">${I.cam}</div>
  <div class="ft-bt"><small>FaceTime</small><b>${CFG.caller}</b><span>${CFG.callerSub}</span></div>
  <button class="ft-bb dec" data-ft="decline" aria-label="거절"><i>${I.phone}</i></button>
  <button class="ft-bb acc" data-ft="accept" aria-label="수락">${I.cam}</button>
</div>
<div class="ft-page" id="ft-page" aria-hidden="true">
  <div class="ft-remote" id="ft-v1"><div class="ft-av">${CFG.caller.slice(0, 1)}</div></div>
  <div class="ft-top"><b>${CFG.caller}</b><span id="ft-st">연결 중…</span></div>
  <div class="ft-self" id="ft-v2"></div>
  <div class="ft-ctl">
    <button data-ft="flip" aria-label="카메라 전환">${I.flip}</button>
    <button data-ft="cam" aria-label="카메라">${I.cam}</button>
    <button data-ft="mic" aria-label="마이크">${I.mic}</button>
    <button data-ft="end" class="end" aria-label="종료"><i>${I.phone}</i></button>
  </div>
</div>`;
  screen.appendChild(root);

  const st = document.createElement("style");
  st.textContent = `
#ft-root{position:absolute;inset:0;pointer-events:none;z-index:40;font-family:var(--font)}
#ft-root *{box-sizing:border-box}
#ft-root button{font-family:var(--font);background:none;border:0;padding:0;margin:0;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
#ft-root svg{width:100%;height:100%;display:block}
#ft-root .ft-dim{position:absolute;inset:0;background:rgba(0,0,0,.4);opacity:0;transition:opacity .25s}
#ft-root .ft-dim.on{opacity:1;pointer-events:auto}
#ft-root .ft-alert{position:absolute;left:50%;top:50%;width:270px;border-radius:14px;overflow:hidden;background:rgba(246,246,246,.96);color:#000;text-align:center;transform:translate(-50%,-50%) scale(1.12);opacity:0;transition:transform .22s cubic-bezier(.2,.9,.25,1),opacity .18s}
#ft-root .ft-alert.on{transform:translate(-50%,-50%) scale(1);opacity:1;pointer-events:auto}
#ft-root .ft-at{padding:22px 16px 20px;font-size:17px;font-weight:600;line-height:1.3}
#ft-root .ft-ab{display:flex;border-top:.5px solid rgba(60,60,67,.3)}
#ft-root .ft-ab button{flex:1;height:44px;font-size:17px;color:#007aff}
#ft-root .ft-ab button.b{font-weight:600;border-left:.5px solid rgba(60,60,67,.3)}
#ft-root .ft-ab button:active{background:rgba(0,0,0,.08)}
#ft-root .ft-banner{position:absolute;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 58px);display:flex;align-items:center;gap:10px;padding:12px;border-radius:26px;background:rgba(44,44,46,.96);color:#fff;transform:translateY(-190%);transition:transform .45s cubic-bezier(.2,.9,.25,1);box-shadow:0 8px 30px rgba(0,0,0,.35)}
#ft-root .ft-banner.on{transform:none;pointer-events:auto}
#ft-root .ft-bi{width:40px;height:40px;border-radius:10px;background:#34c759;display:grid;place-items:center;flex:none;padding:9px;color:#fff}
#ft-root .ft-bt{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.25}
#ft-root .ft-bt small{font-size:12px;color:#aeaeb2}
#ft-root .ft-bt b{font-size:17px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#ft-root .ft-bt span{font-size:13px;color:#aeaeb2}
#ft-root .ft-bb{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;flex:none;padding:12px;color:#fff;transition:transform .1s}
#ft-root .ft-bb:active{transform:scale(.9)}
#ft-root .ft-bb.dec{background:#ff3b30}
#ft-root .ft-bb.dec i{display:block;width:100%;height:100%;transform:rotate(135deg)}
#ft-root .ft-bb.acc{background:#34c759}
#ft-root .ft-page{position:absolute;inset:0;z-index:-1;background:#000;color:#fff;opacity:0;transform:scale(.96);transition:opacity .3s,transform .3s}
#ft-root .ft-page.on{opacity:1;transform:none;pointer-events:auto;z-index:6}
#ft-root .ft-remote{position:absolute;inset:0;background:linear-gradient(160deg,#3a3f4b,#16181d 70%);display:grid;place-items:center;overflow:hidden}
#ft-root .ft-remote video,#ft-root .ft-self video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000}
#ft-root .ft-av{width:110px;height:110px;border-radius:50%;background:linear-gradient(160deg,#8e8e93,#5b5b60);display:grid;place-items:center;font-size:52px;font-weight:500}
#ft-root .ft-top{position:absolute;left:0;right:0;top:calc(env(safe-area-inset-top,0px) + 62px);display:flex;flex-direction:column;align-items:center;gap:2px;text-shadow:0 1px 8px rgba(0,0,0,.5);pointer-events:none}
#ft-root .ft-top b{font-size:22px;font-weight:600}
#ft-root .ft-top span{font-size:15px;color:rgba(255,255,255,.75);font-variant-numeric:tabular-nums}
#ft-root .ft-self{position:absolute;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 150px);width:104px;height:150px;border-radius:16px;background:linear-gradient(160deg,#55555a,#2b2b2e);box-shadow:0 4px 16px rgba(0,0,0,.4);overflow:hidden}
#ft-root .ft-ctl{position:absolute;left:16px;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 34px);height:84px;display:flex;align-items:center;justify-content:space-around;border-radius:42px;background:rgba(40,40,42,.88);padding:0 14px}
#ft-root .ft-ctl button{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;padding:15px;background:rgba(120,120,128,.4);transition:background .15s,transform .1s}
#ft-root .ft-ctl button:active{transform:scale(.92)}
#ft-root .ft-ctl button.off{background:#fff;color:#000}
#ft-root .ft-ctl button.end{background:#ff3b30;color:#fff}
#ft-root .ft-ctl button.end i{display:block;width:100%;height:100%;transform:rotate(135deg)}`;
  document.head.appendChild(st);

  /* ---------- 상태/동작 ---------- */
  const el = id => $("#" + id);
  let state = "idle", missT = 0, ringT = 0, tickT = 0, sec = 0;   // idle | prompt | ringing | call
  const vib = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };

  function setAlert(on) { el("ft-dim").classList.toggle("on", on); el("ft-alert").classList.toggle("on", on); el("ft-alert").setAttribute("aria-hidden", on ? "false" : "true"); }
  function setBanner(on) { el("ft-banner").classList.toggle("on", on); el("ft-banner").setAttribute("aria-hidden", on ? "false" : "true"); }

  function prompt() { if (state !== "idle") return; state = "prompt"; setAlert(true); }
  function ring() {
    state = "ringing"; setBanner(true); vib([400, 200, 400, 200, 400]);
    missT = setTimeout(() => { if (state === "ringing") { setBanner(false); state = "idle"; } }, CFG.missedSec * 1000);
  }
  function openCall() {
    clearTimeout(missT); setBanner(false); state = "call"; sec = 0;
    const p = el("ft-page"); p.classList.add("on"); p.setAttribute("aria-hidden", "false");
    el("ft-st").textContent = "연결 중…";
    clearInterval(tickT);
    tickT = setInterval(() => { sec++; el("ft-st").textContent = sec < 2 ? "연결 중…" : String(Math.floor((sec - 2) / 60)).padStart(2, "0") + ":" + String((sec - 2) % 60).padStart(2, "0"); }, 1000);
  }
  function endCall() {
    if (state !== "call") return;
    clearInterval(tickT); state = "idle";
    const p = el("ft-page"); p.classList.remove("on"); p.setAttribute("aria-hidden", "true");
    ["cam", "mic"].forEach(k => { const b = root.querySelector(`[data-ft="${k}"]`); b.classList.remove("off"); b.innerHTML = k === "cam" ? I.cam : I.mic; });
  }
  function toggle(k) {
    const b = root.querySelector(`[data-ft="${k}"]`), off = b.classList.toggle("off");
    b.innerHTML = k === "cam" ? (off ? I.camOff : I.cam) : (off ? I.micOff : I.mic);
  }

  root.addEventListener("click", e => {
    const b = e.target.closest("[data-ft]"); if (!b) return;
    switch (b.dataset.ft) {
      case "yes": setAlert(false); state = "idle"; clearTimeout(ringT); state = "prompt"; ringT = setTimeout(() => { if (state === "prompt") ring(); }, CFG.ringDelayMs); break;
      case "no": setAlert(false); state = "idle"; break;
      case "decline": clearTimeout(missT); setBanner(false); state = "idle"; break;
      case "accept": openCall(); break;
      case "end": endCall(); break;
      case "cam": toggle("cam"); break;
      case "mic": toggle("mic"); break;
      case "flip": break;
    }
  });
  document.addEventListener("app:close", () => { if (state === "call") endCall(); });   // 홈 제스처 = 통화 종료

  /* ---------- 자동 트리거: 사이트를 보고 있는 시간이 delaySec 에 도달하면 1회 ---------- */
  const q = new URLSearchParams(location.search).get("ft");     // 테스트용: ?ft=now → 2초 뒤 바로 안내창
  let viewed = 0, fired = false;
  const timer = setInterval(() => {
    if (fired) return clearInterval(timer);
    if (document.hidden) return;
    viewed++;
    if (viewed >= (q === "now" ? 2 : CFG.delaySec)) { fired = true; clearInterval(timer); prompt(); }
  }, 1000);

  return { prompt, ring, openCall, endCall };   // 콘솔 테스트: FaceTimeApp.prompt()
})();
