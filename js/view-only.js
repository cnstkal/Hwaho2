/* ===== view-only.js (integrated) ===== */
/**
 * 보기 전용 모드
 * 앱 화면과 버튼은 볼 수 있지만 텍스트 입력/편집은 허용하지 않습니다.
 */
(() => {
  "use strict";

  const TEXT_INPUT_TYPES = new Set([
    "text", "search", "email", "password", "tel", "url", "number"
  ]);

  function lockElement(el) {
    if (!(el instanceof HTMLElement)) return;

    if (el instanceof HTMLInputElement && TEXT_INPUT_TYPES.has(el.type)) {
      el.readOnly = true;
      el.setAttribute("aria-readonly", "true");
      el.setAttribute("autocomplete", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("spellcheck", "false");
    } else if (el instanceof HTMLTextAreaElement) {
      el.readOnly = true;
      el.setAttribute("aria-readonly", "true");
      el.setAttribute("spellcheck", "false");
    }

    if (el.isContentEditable || el.hasAttribute("contenteditable")) {
      el.setAttribute("contenteditable", "false");
      el.setAttribute("aria-readonly", "true");
    }
  }

  function lockTree(root) {
    if (!(root instanceof Element || root instanceof Document)) return;
    if (root instanceof Element) lockElement(root);
    root.querySelectorAll?.(
      'input, textarea, [contenteditable]:not([contenteditable="false"])'
    ).forEach(lockElement);
  }

  // 최초 화면과 이후 앱에서 동적으로 생성되는 화면 모두 잠금
  const start = () => {
    lockTree(document);
    new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) lockTree(node);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  };

  // 브라우저가 입력을 반영하기 전 단계에서 편집 동작 차단
  document.addEventListener("beforeinput", event => {
    const target = event.target;
    if (target instanceof HTMLInputElement &&
        TEXT_INPUT_TYPES.has(target.type)) event.preventDefault();
    if (target instanceof HTMLTextAreaElement) event.preventDefault();
    if (target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('[contenteditable="true"]'))) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener("paste", event => {
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement &&
         event.target.closest('[contenteditable="true"]'))) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener("drop", event => {
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement &&
         event.target.closest('[contenteditable="true"]'))) {
      event.preventDefault();
    }
  }, true);

  // select 메뉴의 키보드 문자 검색 등 텍스트 입력성 키 조작 차단
  document.addEventListener("keydown", event => {
    if (event.isComposing) {
      event.preventDefault();
      return;
    }
    const target = event.target;
    const typingTarget =
      target instanceof HTMLInputElement && TEXT_INPUT_TYPES.has(target.type) ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('[contenteditable="true"]'));
    if (typingTarget) {
      if (event.key.length === 1 || event.key === "Backspace" ||
          event.key === "Delete" || event.key === "Enter") {
        event.preventDefault();
      }
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
