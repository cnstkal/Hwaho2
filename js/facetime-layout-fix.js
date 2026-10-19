/* ===== facetime-layout-fix.js =====
 * 수신 화면 / 통화 화면 레이아웃 수정 (facetime.js 뒤에 로드)
 * 수신: 상단 상태 문구 → 중앙 프로필·이름·정보 → 하단 거절/응답 버튼
 * 통화: 상단 이름·시간 → 중앙 대화 영역(남는 공간) → 하단 제어 버튼
 * 고정 위치(absolute, 고정 margin) 대신 flex로 배치해 화면 높이에 맞게 줄어듦
 */
(() => {
  const s = document.createElement("style");
  s.id = "facetime-layout-fix";
  s.textContent = `
#ft-root .ft-incoming,
#ft-root .ft-call {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 0;
}
/* 수신 화면 */
#ft-root .ft-incoming {
  padding: calc(env(safe-area-inset-top, 0px) + clamp(44px, 9vh, 82px)) 20px calc(env(safe-area-inset-bottom, 0px) + clamp(40px, 8vh, 70px));
  justify-content: space-between;
}
#ft-root .ft-in-small {
  position: static !important;
  margin-top: 0 !important;
  flex: none;
  text-align: center;
}
#ft-root .ft-contact-avatar {
  margin: auto 0 0 !important;
  flex: none;
  width: clamp(84px, 18vh, 112px) !important;
  height: clamp(84px, 18vh, 112px) !important;
  font-size: clamp(38px, 8vh, 54px) !important;
}
#ft-root .ft-in-name {
  margin: 18px 0 0 !important;
  flex: none;
  text-align: center;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#ft-root .ft-in-sub {
  margin: 8px 0 0 !important;
  flex: none;
  text-align: center;
}
#ft-root .ft-in-actions {
  position: static !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  margin: auto 0 0 !important;
  flex: none;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
/* 통화 화면: 실제 facetime.js 클래스명(.ft-pb / .ft-cg)에 맞춰 transcript와 버튼 영역 분리 */
#ft-root .ft-call {
  padding: calc(env(safe-area-inset-top, 0px) + clamp(24px, 5vh, 40px)) 18px calc(env(safe-area-inset-bottom, 0px) + clamp(14px, 3vh, 24px));
}
#ft-root .ft-call-head {
  flex: none;
  width: 100%;
}
#ft-root .ft-pb {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  width: 100%;
  overflow: hidden;
  padding: 16px 0 12px !important;
}
#ft-root .ft-cg {
  flex: none !important;
  width: 100%;
  margin-top: 0;
  padding-top: 8px;
  gap: clamp(10px, 2.2vh, 18px) 8px;
}
#ft-root .ft-cg button {
  min-height: 0;
}
`;
  document.head.appendChild(s);
})();

/* 대화 말풍선이 통화 버튼·라벨 뒤로 비치지 않도록 영역을 분리 */
#ft-root .ft-pb {
  top: clamp(150px, 21%, 220px) !important;
  bottom: calc(env(safe-area-inset-bottom, 0px) + clamp(390px, 46%, 460px)) !important;
  z-index: 1 !important;
}
#ft-root .ft-cg {
  bottom: calc(env(safe-area-inset-bottom, 0px) + 5%) !important;
  gap: clamp(10px, 1.8vh, 16px) 0 !important;
  z-index: 3 !important;
}
