/* iOS-style lock screen (add-on). Does not touch existing storage/state. */
(function () {
  'use strict';
  var PW = '0323', T = 420;
  var L = document.getElementById('lock');
  if (!L) return;
  var $ = function (s) { return L.querySelector(s); };
  var state = 'locked', busy = false, checking = false, buf = '';
  var UNLOCK_KEY = 'hwaho2_lock_unlocked';
  function wasUnlocked() { try { return localStorage.getItem(UNLOCK_KEY) === '1'; } catch (e) { return false; } }
  function saveUnlocked(value) { try { if (value) localStorage.setItem(UNLOCK_KEY, '1'); else localStorage.removeItem(UNLOCK_KEY); } catch (e) {} }
  var dots = L.querySelectorAll('.lk-dots i'), act = $('#lk-act'), delBtn = $('#lk-del'), dotsBox = $('.lk-dots');
  var ICON_DEL = '<svg viewBox="0 0 24 24"><path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/></svg>';

  if (getComputedStyle(L.parentElement).position === 'static') L.parentElement.style.position = 'relative';

  /* 암호 힌트: 점과 키패드 사이 (은은한 회색 글씨) */
  if (dotsBox && !L.querySelector('.lk-hint')) {
    var hint = document.createElement('div');
    hint.className = 'lk-hint';
    hint.textContent = '힌트 : 🐶';
    dotsBox.insertAdjacentElement('afterend', hint);
  }

  function setState(s) { state = s; L.dataset.state = s; }
  function hold(ms) { busy = true; setTimeout(function () { busy = false; }, ms); }

  /* wallpaper: reuse existing one */
  function syncBg() {
    var wp = document.getElementById('wallpaper'), bg = $('.lk-bg');
    if (!wp) return;
    var cs = getComputedStyle(wp);
    bg.style.backgroundColor = cs.backgroundColor;
    bg.style.backgroundImage = cs.backgroundImage;
    if (cs.backgroundSize !== 'auto') bg.style.backgroundSize = cs.backgroundSize;
    bg.style.backgroundPosition = cs.backgroundPosition;
    if (cs.backgroundImage === 'none' && wp.firstElementChild) bg.innerHTML = wp.innerHTML;
  }

  /* clock: mirrors site #clock; date from system date */
  var DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  function tick() {
    var c = document.getElementById('clock'), m = c && c.textContent.match(/\d{1,2}:\d{2}/), d = new Date();
    $('#lk-time').textContent = m ? m[0] : (d.getHours() % 12 || 12) + ':' + ('0' + d.getMinutes()).slice(-2);
    var fd = new Date(2026, 9, 19); $('#lk-date').textContent = (fd.getMonth() + 1) + '월 ' + fd.getDate() + '일 ' + DAYS[fd.getDay()] + '요일';
    var bl = document.getElementById('bat-level'), w = bl && parseFloat(bl.style.width);
    if (w) $('.lk-bat .b i').style.width = w + '%';
  }
  var clk = document.getElementById('clock');
  if (clk && window.MutationObserver) new MutationObserver(tick).observe(clk, { childList: true, characterData: true, subtree: true });
  setInterval(tick, 1000);

  /* transitions */
  function enter() {
    if (busy || state !== 'locked') return;
    hold(T + 40); setState('pass');
  }
  function back() {
    if (busy || state !== 'pass' || checking) return;
    hold(T + 40); setState('locked');
  }
  delBtn.innerHTML = ICON_DEL;
  function render() {
    dots.forEach(function (d, i) { d.classList.toggle('on', i < buf.length); });
    act.textContent = '취소'; act.setAttribute('aria-label', '취소'); act.dataset.m = 'cancel';
    delBtn.classList.toggle('dim', !buf.length);
  }
  function press(d) {
    if (state !== 'pass' || busy || checking || buf.length >= PW.length) return;
    buf += d; render();
    if (buf.length === PW.length) {
      checking = true;
      setTimeout(buf === PW ? ok : fail, 160);
    }
  }
  function del() { if (state !== 'pass' || checking || !buf) return; buf = buf.slice(0, -1); render(); }
  function ok() {
    saveUnlocked(true);
    setState('unlocking');
    setTimeout(function () { setState('open'); buf = ''; checking = false; render(); }, T + 30);
  }
  function fail() {
    dotsBox.classList.add('shake');
    setTimeout(function () {
      dotsBox.classList.remove('shake'); buf = ''; checking = false; render();
    }, 400);
  }

  /* gestures on lock screen: tap or swipe up */
  var sx = 0, sy = 0, down = false;
  L.addEventListener('pointerdown', function (e) {
    if (state !== 'locked' || e.target.closest('.lk-ico')) return;
    down = true; sx = e.clientX; sy = e.clientY;
  });
  L.addEventListener('pointerup', function (e) {
    if (!down) return; down = false;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (dy < -40 || (Math.abs(dx) < 10 && Math.abs(dy) < 10)) enter();
  });
  L.addEventListener('pointercancel', function () { down = false; });
  /* iOS Safari fallback: ensure a normal tap always opens the passcode screen. */
  L.addEventListener('click', function (e) {
    if (state !== 'locked' || e.target.closest('.lk-ico')) return;
    enter();
  });
  [].forEach.call(L.querySelectorAll('.lk-ico'), function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); }); });

  /* keypad */
  L.querySelector('.lk-pad').addEventListener('click', function (e) {
    var k = e.target.closest('button'); if (!k) return;
    if (k.dataset.k != null) press(k.dataset.k);
    else if (k.id === 'lk-del') del();
    else if (k.id === 'lk-act') back();
  });
  document.addEventListener('keydown', function (e) {
    if (state === 'locked' && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp')) { e.preventDefault(); enter(); }
    else if (state === 'pass') {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') del();
      else if (e.key === 'Escape') back();
    }
  });

  /* optional API: HwahoLock.notify({app,title,body,time}) / HwahoLock.lock() */
  var notiSlot = 0;
  window.HwahoLock = {
    promptUnlock: function () { if (state === 'locked') enter(); },
    notify: function (n) {
      var el = document.createElement('div'); el.className = 'lk-n';
      var h = document.createElement('div'); h.className = 'h';
      var a = document.createElement('span'), t = document.createElement('span'), b = document.createElement('b'), p = document.createElement('span');
      a.textContent = n.app || ''; t.textContent = n.time || '지금'; p.className = 't';
      b.textContent = n.title || ''; p.textContent = n.body || '';
      h.appendChild(a); h.appendChild(t); el.appendChild(h); el.appendChild(b); el.appendChild(p);
      var box = $('#lk-notis');
      /* 알림은 최대 2개: 이미 2개면 같은 자리에서 하나씩 교체 (아래로 쌓지 않음) */
      if (box.children.length < 2) { box.appendChild(el); }
      else { box.replaceChild(el, box.children[notiSlot]); notiSlot = (notiSlot + 1) % 2; }
    },
    lock: function () { saveUnlocked(false); buf = ''; checking = false; render(); setState('locked'); }
  };

  syncBg(); window.addEventListener('load', syncBg); tick(); render(); setState(wasUnlocked() ? 'open' : 'locked');
})();
