/* Story sequence controller (수정본) — 순서: 잠금 알림 → 성현 첫 통화 → 잠금 복귀 → 성현 카톡(디스패치 링크) → 기사 확인 → 윤호 통화 → 윤호 카톡 → 성현 카톡 → 최종 인정 기사 → 인스타 알림 */
(() => {
  const style = document.createElement("style");
  style.textContent = "#story-ui{position:absolute;inset:0;z-index:1000;pointer-events:none;font-family:var(--font,-apple-system,sans-serif)}#story-ui .toast{pointer-events:auto;position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;right:12px;background:rgba(248,248,250,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#171717;border:0;border-radius:18px;padding:12px;box-shadow:0 4px 20px #0002;display:flex;gap:11px;text-align:left;align-items:center;width:calc(100% - 24px)}#story-ui .ico{width:40px;height:40px;border-radius:10px;object-fit:cover;flex:none}#story-ui .copy{font-size:13px;line-height:1.35;flex:1;min-width:0}#story-ui b{display:block;margin-bottom:4px;font-weight:650}#story-ui .preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}#story-ui .when{font-size:11px;color:#777;align-self:flex-start;white-space:nowrap}";
  document.head.appendChild(style);
  const root = document.createElement("div");
  root.id = "story-ui";
  document.querySelector("#screen")?.appendChild(root);

  const KAKAO_ICON = "images/app/KakaoTalk/IMG_7149.png";
  const DISPATCH_URL = "https://www.dispatch.co.kr/article/1";
  const DISPATCH_TITLE = "[단독] \"누가 봐도 평범한 사이는 아니었다\"…마스♥정윤호, 심야 데이트 포착";
  const ARTICLE2 = "정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”";
  const FINAL_URL = "https://entertain.naver.com/article/sample/6";

  const SUNG_CALL = [
    ["성현", "야 너 이거 뭐야", "them", 1800],
    ["성화", "형 저 아니에요", "me", 1600],
    ["성현", "그럼 윤호 쪽에서 낸 거야?", "them", 1900],
    ["성화", "모르겠어요 전화를 안 받아요", "me", 1900],
    ["성현", "일단 회사로 와", "them", 1600]
  ];
  const yunhoLines = [["me", "이번 일로 뭐라하는 놈 있으면 나한테 데려와"], ["me", "내가 처리할게"], ["f0", "배고팡"], ["me", "무뼈국물닭발에 치즈 주먹밥 계란찜 추가 맞지?"], ["f0", "빨리와 💗"]];

  /* ---- 상태 (새로고침 후에도 유지) ---- */
  const KEY = "hwaho-story-v1";
  const STAGES = ["lock-notified", "sung-call", "after-call-1", "blame-sent", "article-read", "yunho-call", "yunho-alert", "yunho-chat", "manager2-alert", "manager2-chat", "final-article", "ig-alert", "instagram"];
  let stage = "idle", started = false, yunhoIndex = 0;
  const persist = () => { if (!started) return; const v = { v: 1, started: true, stage, yunhoIndex }; try { if (window.HwahoStability) window.HwahoStability.writeJSON(KEY, v); else localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  const setStage = s => { stage = s; persist(); };
  const load = () => { try { const s = window.HwahoStability ? window.HwahoStability.readJSON(KEY, null) : JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1 && s.started === true && STAGES.indexOf(s.stage) >= 0) return s; } catch (e) {} return null; };

  const timers = {};
  const later = (k, fn, ms) => { clearTimeout(timers[k]); timers[k] = setTimeout(() => { delete timers[k]; fn(); }, ms); };
  const cancel = k => { clearTimeout(timers[k]); delete timers[k]; };

  /* ---- 표시 ---- */
  const toast = (name, msg, app = "KakaoTalk", onTap) => {
    const icon = app === "Instagram" ? "images/app/Instagram/IMG_7148.png" : KAKAO_ICON;
    root.innerHTML = '<button class="toast" data-story="open"><img class="ico" src="' + icon + '" alt=""><span class="copy"><b>' + name + '</b><span class="preview">' + msg + '</span></span><span class="when">지금</span></button>';
    root.querySelector(".toast").addEventListener("click", () => { root.innerHTML = ""; onTap && onTap(); }, { once: true });
  };
  const lockNotify = n => {
    if (!window.HwahoLock) return false;
    const box = document.querySelector("#lk-notis"); if (box) box.innerHTML = "";
    HwahoLock.notify(n); return true;
  };
  const lockOn = () => { if (window.HwahoLock) HwahoLock.lock(); };
  const openManager = () => { if (window.Home) Home.openApp("kakaotalk"); KakaoApp.open(); KakaoApp.openStoryChat("c3"); };
  const openYunhoChat = () => { if (window.Home) Home.openApp("kakaotalk"); if (window.KakaoApp) { KakaoApp.open(); KakaoApp.openStoryChat("c0"); } };
  const forceSafari = url => { if (window.Home) Home.openApp("safari"); if (window.SafariApp) { SafariApp.open(); SafariApp.navigate(url); } };

  /* ---- 단계별 동작 ---- */
  function start() {
    if (started) return;
    started = true; yunhoIndex = 0;
    setStage("lock-notified");
    if (!lockNotify({ app: "카카오톡", title: "성현이형(매니저)", body: "너 이거 뭐야?  🔗 디스패치 기사", time: "지금" })) toast("성현이형(매니저)", "너 이거 뭐야?");
    later("lock2", () => {
      if (stage !== "lock-notified") return;
      lockNotify({ app: "카카오톡", title: "성현이형(매니저)", body: "윤호랑 진짜 사귀는 거야? 전화 받아", time: "지금" });
    }, 2500);
    later("sungRing", () => {
      if (stage !== "lock-notified") return;
      setStage("sung-call");
      if (window.FaceTimeApp) FaceTimeApp.ring({ caller: "성현이형(매니저)", dialogue: SUNG_CALL });
    }, 5000);
  }

  function blameMessage() {
    setStage("blame-sent");
    lockOn();
    toast("성현이형(매니저)", "윤호한테 왜 상의도 없이 기사가 나간 거야?", "KakaoTalk", () => forceSafari(DISPATCH_URL));
    if (window.KakaoApp) KakaoApp.appendStoryMessage("윤호한테 왜 상의도 없이 기사가 나간 거야?", "text", "", "c3", "f2");
    if (window.KakaoApp) KakaoApp.appendStoryMessage(DISPATCH_TITLE, "link", DISPATCH_URL, "c3", "f2");
  }

  function startYunhoCall() {
    if (stage !== "article-read") return;
    setStage("yunho-call");
    if (window.FaceTimeApp) FaceTimeApp.ring({ caller: "윤둥이" });
  }

  function yunhoAlert() {
    setStage("yunho-alert");
    if (window.KakaoApp) KakaoApp.appendStoryMessage("ㅎㅎ", "text", "", "c0", "f0");
    toast("윤둥이", "ㅎㅎ", "KakaoTalk", () => { setStage("yunho-chat"); openYunhoChat(); });
  }

  function nextYunhoMessage() {
    if (stage !== "yunho-chat" || yunhoIndex >= yunhoLines.length) return;
    const [from, msg] = yunhoLines[yunhoIndex++];
    persist();
    KakaoApp.appendStoryMessage(msg, "text", "", "c0", from);
    if (yunhoIndex === yunhoLines.length) later("m2", () => { if (stage === "yunho-chat") managerSecondAlert(); }, 1200);
  }

  function managerSecondAlert() {
    setStage("manager2-alert");
    toast("성현이형(매니저)", "정윤호쪽에서 인정했네", "KakaoTalk", () => {
      setStage("manager2-chat");
      openManager();
      KakaoApp.appendStoryMessage("정윤호쪽에서 인정했네");
      KakaoApp.appendStoryMessage(ARTICLE2, "link", FINAL_URL);
    });
  }

  function instagramAlert() {
    setStage("ig-alert");
    toast("Instagram", "yunou._.u 님이 게시물을 올렸습니다", "Instagram", () => {
      setStage("instagram");
      document.dispatchEvent(new CustomEvent("story:instagram-published"));
      if (window.Home) Home.openApp("instagram");
      if (window.IgApp) IgApp.open();
    });
  }

  /* 성현 첫 통화 종료 → 잠금 복귀 → 성현 카톡 */
  document.addEventListener("story:call-ended", () => {
    if (stage === "sung-call") {
      setStage("after-call-1");
      lockOn();
      later("blame", blameMessage, 3000);
    } else if (stage === "yunho-call") {
      yunhoAlert();
    }
  });

  /* 기사 확인 → 윤호 통화 */
  document.addEventListener("story:dispatch-article-viewed", () => {
    if (stage !== "blame-sent") return;
    setStage("article-read");
    later("yunhoRing", startYunhoCall, 4000);
  });

  /* 매니저 채팅의 기사 링크 */
  document.addEventListener("story:manager-link-opened", e => {
    if (stage === "manager2-chat") { root.innerHTML = ""; setStage("final-article"); forceSafari(FINAL_URL); return; }
    if (stage === "blame-sent") { root.innerHTML = ""; forceSafari(DISPATCH_URL); }
  });

  /* 최종 인정 기사 확인 후 인스타 알림 */
  document.addEventListener("story:ack-article-viewed", () => {
    if (stage !== "final-article") return;
    later("ig", () => { if (stage === "final-article") instagramAlert(); }, 3000);
  });

  root.addEventListener("click", e => {
    if (!e.target.closest("[data-story]")) return;
    if (stage === "yunho-alert") { /* toast 콜백에서 처리 */ }
  });

  document.addEventListener("story:start", start);
  document.addEventListener("click", e => { if (stage === "yunho-chat" && e.target.closest("#kko-app #kk-msgs")) nextYunhoMessage(); }, true);

  /* ---- 새로고침 복원 ---- */
  function resume() {
    if (["instagram", "manager2-alert", "manager2-chat", "final-article", "ig-alert"].indexOf(stage) >= 0) document.dispatchEvent(new CustomEvent("story:instagram-published"));
    switch (stage) {
      case "lock-notified": lockOn(); break;
      case "sung-call": if (window.FaceTimeApp) FaceTimeApp.ring({ caller: "성현이형(매니저)", dialogue: SUNG_CALL }); break;
      case "after-call-1": lockOn(); later("blame", blameMessage, 1000); break;
      case "blame-sent": toast("성현이형(매니저)", "윤호한테 왜 상의도 없이 기사가 나간 거야?", "KakaoTalk", () => forceSafari(DISPATCH_URL)); break;
      case "article-read": later("yunhoRing", startYunhoCall, 1000); break;
      case "yunho-call": if (window.FaceTimeApp) FaceTimeApp.ring({ caller: "윤둥이" }); break;
      case "yunho-alert": toast("윤둥이", "ㅎㅎ", "KakaoTalk", () => { setStage("yunho-chat"); openYunhoChat(); }); break;
      case "yunho-chat": if (yunhoIndex >= yunhoLines.length) managerSecondAlert(); break;
      case "manager2-alert": managerSecondAlert(); break;
      case "ig-alert": instagramAlert(); break;
      case "instagram": break;
    }
  }

  const saved = load();
  if (saved) { started = true; stage = saved.stage; yunhoIndex = Math.max(0, Math.min(yunhoLines.length, saved.yunhoIndex | 0)); resume(); }
  else if (window.KakaoApp && typeof KakaoApp.purgeStoryMessages === "function") KakaoApp.purgeStoryMessages();

  window.HwahoStory = { start, get stage() { return stage; }, get started() { return started; } };
})();
