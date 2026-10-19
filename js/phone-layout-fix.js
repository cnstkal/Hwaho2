/* ===== phone-layout-fix.js =====
 * 통화 화면 레이아웃 수정 패치
 * - 적용: phone.js 파일 맨 끝에 붙여넣거나, phone.js 다음에 <script src="js/phone-layout-fix.js"></script> 로 로드
 * - 원인: .tl-pb(메시지 카드)가 absolute + 고정 top/bottom 이라 통화 제어 버튼과 겹침
 * - 해결: 통화 화면 전체를 flex 세로 배치로 바꿈 (상단 정보 → 메시지 카드(남는 공간) → 제어 버튼)
 * - 안전 영역(상단 노치, 하단 홈 인디케이터) 반영
 */
(() => {
  const s = document.createElement("style");
  s.id = "phone-call-layout-fix";
  s.textContent = `
#tel-app .tl-call-s.on {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 100%;
  padding: 0 0 calc(env(safe-area-inset-bottom, 0px) + 24px) !important;
  overflow: hidden;
}
/* 상단: 통화 시간 + 상대방 이름 */
#tel-app .tl-cs,
#tel-app .tl-cn,
#tel-app .tl-cnum {
  position: static !important;
  flex: 0 0 auto;
  max-width: 90%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#tel-app .tl-cs {
  margin-top: calc(env(safe-area-inset-top, 0px) + 13%) !important;
}
/* 중앙: 메시지 카드 (남는 공간을 채우고, 버튼과 겹치지 않음) */
#tel-app .tl-pb {
  position: relative !important;
  top: auto !important;
  bottom: auto !important;
  left: auto !important;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  margin: 12px 0;
  padding: 12px 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
/* 하단: 통화 제어 버튼 (항상 메시지 카드 아래) */
#tel-app .tl-cg {
  position: relative !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  flex: 0 0 auto;
  width: 100%;
  margin: 0 !important;
  padding: 0 10%;
  box-sizing: border-box;
}
/* 통화 중 키패드 화면은 기존 레이아웃 유지 */
#tel-app .tl-call-s .kx-b,
#tel-app .tl-call-s .kx-g {
  position: relative;
}
`;
  document.head.appendChild(s);
})();
