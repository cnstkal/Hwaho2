/* ===== albamon.js (fromm.js에서 분리) ===== */
/* 알바몬 앱 (#am-app) */
(()=>{const st=document.createElement("style");st.textContent=`
#am-app{--or:#ff5a1f;--ht:calc(env(safe-area-inset-top,0px) + 54px);--hh:calc(var(--ht) + 52px);--nb:calc(58px + env(safe-area-inset-bottom,0px) + 26px);position:absolute;inset:0;z-index:5;display:none;background:#f6f7f9;color:#111;overflow:hidden;opacity:0;transform:scale(.15);border-radius:44px;transition:transform .42s cubic-bezier(.2,.9,.25,1),opacity .22s,border-radius .42s;font-family:var(--font);font-size:15px;line-height:1.4;letter-spacing:-.03em}
#am-app.show{display:block}#am-app.open{opacity:1;transform:none;border-radius:0}#am-app *{box-sizing:border-box}
#am-app button{font-family:var(--font);letter-spacing:inherit;background:none;border:0;padding:0;cursor:pointer;color:inherit;text-align:left;-webkit-tap-highlight-color:transparent}
#am-app svg{display:block;flex:none}#am-app input{font-family:var(--font);letter-spacing:inherit}
#am-app .sc{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch}
#am-app .hd{position:absolute;left:0;right:0;top:0;z-index:4;height:var(--hh);padding:var(--ht) 16px 0;background:radial-gradient(circle at 8% 12%,rgba(255,200,80,.40),transparent 26%),radial-gradient(circle at 92% 6%,rgba(255,110,60,.32),transparent 24%),radial-gradient(circle at 50% 35%,rgba(255,150,170,.20),transparent 45%),#f7f7f9}
#am-app .hr{display:flex;align-items:center;height:44px}
#am-app .loc{display:flex;align-items:center;gap:6px;font-size:21px;font-weight:800;letter-spacing:-.05em;flex:1}
#am-app .ib{width:40px;height:44px;display:grid;place-items:center}
#am-app .rc{position:relative;padding:14px 0 26px;background:radial-gradient(ellipse 90% 30% at 50% 0,rgba(255,150,190,.32),transparent),radial-gradient(ellipse 80% 30% at 50% 78%,rgba(255,205,100,.45),transparent)}
#am-app .rs{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 9%;scrollbar-width:none;touch-action:pan-x}#am-app .rs::-webkit-scrollbar{display:none}
#am-app .rcd{flex:none;width:100%;scroll-snap-align:center;background:#fff;border:1.5px solid #fcc9ac;border-radius:28px;padding:20px 22px 18px;box-shadow:0 6px 24px rgba(255,150,100,.22);display:flex;flex-direction:column;gap:20px}
#am-app .jb{position:relative}
#am-app .jb small{display:block;font-size:15px;color:#8b8b95}
#am-app .jb b{display:block;font-size:19px;font-weight:800;letter-spacing:-.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:2px 0}
#am-app .jb .pay{font-size:19px}#am-app .pay em{color:var(--or)}
#am-app .ad{display:inline-block;height:22px;line-height:20px;padding:0 8px;border:1px solid #d4d4da;border-radius:6px;color:#9a9aa5;font-size:13px;font-weight:600}
#am-app .jb .ad{position:absolute;right:0;top:0}
#am-app .dots{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:16px}
#am-app .dots i{width:8px;height:8px;border-radius:4px;background:#c9c9cf;transition:width .2s,background .2s}#am-app .dots i.on{width:26px;background:var(--or)}
#am-app .cats{display:grid;grid-template-columns:repeat(5,1fr);row-gap:18px;padding:6px 6px 20px;background:#f6f7f9}
#am-app .cats div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:15px;font-weight:500}
#am-app .fl{position:sticky;top:var(--hh);z-index:3;background:#f6f7f9;display:flex;gap:8px;overflow-x:auto;padding:12px 16px;scrollbar-width:none;touch-action:pan-x}#am-app .fl::-webkit-scrollbar{display:none}
#am-app .fl span{flex:none;height:34px;padding:0 15px;border-radius:17px;border:1.5px solid #dcdce0;background:#fff;color:#444;font-size:15px;font-weight:500;display:flex;align-items:center;gap:4px;white-space:nowrap}
#am-app .fl span.ic{padding:0 11px}
#am-app .sh{display:flex;align-items:center;gap:10px;padding:22px 16px 12px;font-size:22px;font-weight:800;letter-spacing:-.05em}
#am-app .hot{display:grid;grid-auto-flow:column;grid-template-rows:repeat(3,auto);grid-auto-columns:200px;gap:12px;overflow-x:auto;padding:0 16px 4px;scrollbar-width:none;touch-action:pan-x}#am-app .hot::-webkit-scrollbar{display:none}
#am-app .hc{background:#fff;border-radius:22px;padding:16px;min-width:0}
#am-app .hc .lg{display:flex;justify-content:space-between;align-items:flex-start;height:44px}
#am-app .hc .lg i{background:#ff4e1f;color:#fff;font-style:normal;font-size:13px;font-weight:800;border-radius:14px;padding:1px 9px;height:22px}
#am-app .wm{font-size:20px;font-weight:800;letter-spacing:-.06em;line-height:1}#am-app .wm small{display:block;font-size:11.5px;font-weight:500;color:#777;letter-spacing:-.04em;margin-top:3px}
#am-app .hc>small{display:block;color:#8b8b95;font-size:14px;margin-top:8px}
#am-app .hc>b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:16.5px;line-height:1.35;font-weight:800;letter-spacing:-.05em;margin:3px 0 6px;min-height:44px}
#am-app .hc .pay{font-size:16.5px}
#am-app .vl{display:flex;flex-direction:column;gap:12px;padding:0 16px}
#am-app .vc{position:relative;background:#fff;border-radius:28px;padding:22px 24px 22px}
#am-app .vc small{display:block;font-size:16px;color:#8b8b95;padding-right:40px}
#am-app .vc b{display:block;font-size:19px;font-weight:800;letter-spacing:-.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:6px 0 10px}
#am-app .vc .rw{display:flex;align-items:center;gap:8px;font-size:17px;color:#8b8b95;height:30px}
#am-app .vc .rw u{text-decoration:none;color:#111}#am-app .vc .rw span.g{color:#12a150;font-weight:700}
#am-app .vc .st{position:absolute;right:20px;top:18px;width:34px;height:34px;display:grid;place-items:center;color:#a8a8b0}#am-app .vc .st.on{color:#ffb400}
#am-app .fab{position:absolute;right:16px;bottom:calc(var(--nb) + 18px);z-index:5;width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,.16);display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .2s}#am-app .fab.on{opacity:1;pointer-events:auto}
#am-app .nv{position:absolute;left:0;right:0;bottom:0;z-index:6;height:var(--nb);background:#efeff1;display:flex;padding:10px 4px 0}
#am-app .nv svg{width:28px;height:28px;flex:none}
#am-app .nv button{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:12.5px;font-weight:600;text-align:center;color:#222}
#am-app .ov{position:absolute;inset:0;z-index:8;background:#fff;transform:translateX(100%);visibility:hidden;transition:transform .3s cubic-bezier(.2,.9,.25,1),visibility 0s .3s}#am-app .ov.on{transform:none;visibility:visible;transition:transform .3s cubic-bezier(.2,.9,.25,1)}
#am-app #am-ap{z-index:9}
#am-app .mh{display:flex;align-items:center;justify-content:space-between;padding:var(--ht) 20px 0;height:calc(var(--ht) + 56px);font-size:22px;font-weight:800;letter-spacing:-.05em}
#am-app .adb{position:relative;margin:8px 20px 0;height:75px;border-radius:20px;background:#eceef2}#am-app .adb .ad{position:absolute;right:12px;top:8px;background:#f1f2f5}
#am-app .pf{display:flex;gap:16px;padding:22px 20px 0;align-items:flex-start}
#am-app .av{width:56px;height:56px;border-radius:50%;background:#f0f0f2;border:1px solid #e4e4e8;overflow:hidden;flex:none}
#am-app .pn{flex:1;min-width:0}#am-app .pn b{display:block;font-size:23px;font-weight:800;letter-spacing:-.05em}
#am-app .pn div{display:flex;align-items:center;gap:12px;margin-top:4px;font-size:15px;color:#666;white-space:nowrap}#am-app .pn div span:first-child{background:#f3f3f5;border-radius:6px;padding:4px 12px}
#am-app .mi{display:flex;align-items:center;gap:4px;color:#666;font-size:15px;white-space:nowrap;padding-top:2px}
#am-app .stt{display:grid;grid-template-columns:repeat(4,1fr);padding:26px 20px 0;text-align:center}
#am-app .stt button{text-align:center;position:relative}#am-app .stt button+button::before{content:"";position:absolute;left:0;top:14px;height:30px;width:1px;background:#e4e4e8}
#am-app .stt i{display:block;font-style:normal;color:#ee5a2a;font-size:22px;font-weight:500}#am-app .stt span{display:block;font-size:16px;margin-top:6px}
#am-app .sb3{margin:26px 20px 0;border:1.5px solid #ececf0;border-radius:20px;height:70px;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;text-align:center;font-size:16px}#am-app .sb3 b{font-weight:800}
#am-app .qk{margin:26px 20px 0;height:48px;border-radius:14px;background:#fdf4f0;display:flex;align-items:center;padding:0 16px 0 78px;position:relative;gap:8px;font-size:16px;white-space:nowrap}
#am-app .qk .ms{position:absolute;left:12px;top:-8px;width:58px;height:58px;border-radius:50% 50% 44% 44%;background:#f5731e;display:grid;place-items:center}#am-app .qk .ms i{width:34px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center;font-style:normal;font-size:15px;color:#e2531a}
#am-app .qk b{color:var(--or);font-weight:800}#am-app .qk span.t{flex:1;overflow:hidden;text-overflow:ellipsis}
#am-app .tg{flex:none;width:40px;height:26px;border-radius:13px;background:#d6d6dc;position:relative;transition:background .2s}#am-app .tg::after{content:"";position:absolute;left:2px;top:2px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s}#am-app .tg.on{background:var(--or)}#am-app .tg.on::after{transform:translateX(14px)}
#am-app .rg{margin-top:32px;background:#f7f7f8;padding:28px 20px 30px}
#am-app .rg h3{margin:0;font-size:24px;line-height:1.35;font-weight:800;letter-spacing:-.05em}#am-app .rg h3 em{font-style:normal;color:var(--or)}
#am-app .rgh{display:flex;justify-content:space-between;align-items:flex-end}#am-app .rgh span{display:flex;align-items:center;gap:2px;color:#9a9aa5;font-size:16px;padding-bottom:4px}
#am-app .rh{display:flex;gap:12px;overflow-x:auto;margin:18px -20px 0;padding:4px 20px 8px;scrollbar-width:none;touch-action:pan-x}#am-app .rh::-webkit-scrollbar{display:none}
#am-app .rh .vc{flex:none;width:calc(100% - 4px);padding:20px 24px;box-shadow:0 4px 14px rgba(0,0,0,.06)}
#am-app .rh .vc b{font-size:19px;margin:6px 0 10px}#am-app .rh .vc .st{top:14px}
#am-app .tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;height:34px;overflow:hidden}#am-app .tags span{height:34px;border:1.5px solid #e2e2e6;border-radius:8px;padding:0 12px;color:#8b8b95;font-size:15px;display:flex;align-items:center;white-space:nowrap}
#am-app .trk{height:3px;background:#dcdce0;margin-top:14px;position:relative}#am-app .trk i{position:absolute;left:0;top:0;height:3px;width:18%;background:#222}
#am-app .nw{padding:42px 20px 0;display:flex;justify-content:space-between;align-items:center}#am-app .nw b{font-size:29px;font-weight:800;letter-spacing:-.05em}#am-app .nw span{display:flex;align-items:center;gap:6px;color:#666;font-size:16px}
#am-app .em{text-align:center;color:#9a9aa5;padding:70px 0 calc(env(safe-area-inset-bottom,0px) + 140px);font-size:16px}
#am-app .ah{display:flex;align-items:center;gap:22px;padding:var(--ht) 20px 0;height:calc(var(--ht) + 56px);font-size:23px;font-weight:800;letter-spacing:-.05em}
#am-app .ainfo{display:flex;align-items:center;justify-content:space-between;background:#f1f2f4;padding:0 16px;height:57px;font-size:16.5px}
#am-app .ainfo button{height:32px;padding:0 16px 0 14px;border-radius:16px;background:#fff;border:1.5px solid #e2e2e6;display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px}
#am-app .asr{margin:16px 16px 0;height:48px;border-radius:24px;border:1.5px solid #dcdce0;display:flex;align-items:center;padding:0 18px 0 20px;gap:8px}#am-app .asr input{flex:1;min-width:0;border:0;outline:0;background:none;font-size:16px;color:#111}#am-app .asr input::placeholder{color:#9a9aa5}
#am-app .atb{display:flex;margin-top:22px;border-bottom:1.5px solid #e5e5e8}#am-app .atb button{flex:1;height:54px;text-align:center;font-size:17px;color:#9a9aa5;border-bottom:4px solid transparent;margin-bottom:-1.5px}#am-app .atb button.on{color:#111;font-weight:700;border-color:#ff4e1f}
#am-app .ast{display:grid;grid-template-columns:repeat(5,1fr);padding:16px 0;border-bottom:1.5px solid #e5e5e8}
#am-app .ast button{text-align:center;position:relative;padding:4px 0}#am-app .ast button+button::before{content:"";position:absolute;left:0;top:2px;height:50px;width:1px;background:#e4e4e8}
#am-app .ast i{display:block;font-style:normal;font-size:27px;font-weight:800;line-height:1.3}#am-app .ast span{display:block;font-size:16px;color:#9a9aa5;margin-top:4px;white-space:nowrap}#am-app .ast button.on i,#am-app .ast button.on span{color:#ff4e1f}#am-app .ast button.on span{font-weight:700}
#am-app .alist{background:#f5f5f6;min-height:160px}#am-app .ai{padding:24px 20px 28px;border-bottom:1.5px solid #ececef}
#am-app .ai .t1{display:flex;align-items:center;justify-content:space-between;color:#9a9aa5;font-size:17px}#am-app .ai .t1 span u{text-decoration:none;display:inline-block;width:1px;height:18px;background:#d8d8dc;vertical-align:middle;margin:0 12px}
#am-app .ai .t2{display:flex;align-items:center;justify-content:space-between;margin-top:18px;font-size:17px;color:#8b8b95}
#am-app .bdg{border:1.5px solid #d4d4d9;border-radius:6px;color:#9a9aa5;padding:3px 12px;font-size:16px}#am-app .bdg.on{border-color:#ff7a45;color:#ff5a1f}
#am-app .ai .co{margin-top:12px;font-size:16px}#am-app .ai .tt{font-size:19.5px;letter-spacing:-.04em;margin-top:6px;line-height:1.35;word-break:keep-all}
#am-app .ai .rv{display:flex;align-items:center;justify-content:center;width:100%;height:60px;margin-top:26px;border-radius:16px;background:#fff;border:1.5px solid #dcdce0;font-size:18px;font-weight:500;text-align:center}
#am-app .pg{text-align:center;color:#ff4e1f;font-weight:800;font-size:22px;padding:70px 0 46px}
#am-app .hid{display:flex;justify-content:flex-end;align-items:center;gap:4px;padding:30px 24px 38px;color:#8b8b95;font-size:17px}
#am-app .nt{margin:0 20px calc(env(safe-area-inset-bottom,0px) + 60px);background:#f5f5f6;padding:24px 22px;color:#8b8b95;font-size:15.5px;line-height:1.6}#am-app .nt p{margin:0 0 10px;padding-left:22px;position:relative;word-break:keep-all}#am-app .nt p:last-child{margin:0}#am-app .nt p::before{content:"";position:absolute;left:4px;top:.62em;width:6px;height:6px;border-radius:50%;background:#555}#am-app .nt b{color:#111;font-weight:400}
`;document.head.appendChild(st);})();

(()=>{const st=document.createElement("style");st.textContent=`
#am-app .hd,#am-app .nv,#am-app .fab,#am-app .fl{transform:translateZ(0)}
#am-app .rcd{box-shadow:0 2px 8px rgba(255,150,100,.2)!important}
#am-app .rcd,#am-app .hc,#am-app .vc,#am-app .ai{contain:layout paint}
#am-app .sc{will-change:scroll-position}
#am-app .tg,#am-app .dots i{transition:none}
`;document.head.appendChild(st);})();
const AmApp = (() => {
  const $ = q => document.querySelector(q), el = $("#am-app"), screen = $("#screen");
  const ic = (p, w = 2, s = 24, f = "none") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    pin: '<svg width="24" height="30" viewBox="0 0 24 30"><path d="M12 1C6 1 1.500 5.500 1.500 11.200 1.500 18.500 12 29 12 29s10.500-10.500 10.500-17.800C22.500 5.500 18 1 12 1z" fill="#ff6a1a"/><circle cx="12" cy="11.500" r="4.300" fill="#fff"/></svg>',
    dn: '<path d="M6 9l6 6 6-6"/>', up: '<path d="M6 15l6-6 6 6"/>', rt: '<path d="M9 5l7 7-7 7"/>',
    sr: '<circle cx="11" cy="11" r="7.500"/><path d="M20.500 20.500L16.500 16.500"/>', mn: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>', bk: '<path d="M21 12H4M10 5.500L3.500 12l6.500 6.500"/>',
    flt: '<path d="M3 8h8M17 8h4M3 16h4M13 16h8"/><circle cx="14" cy="8" r="2.500"/><circle cx="10" cy="16" r="2.500"/>',
    star: '<path d="M12 2.500l2.900 6 6.600.8-4.900 4.500 1.300 6.500L12 17l-5.900 3.300 1.300-6.500L2.500 9.300l6.600-.8z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.500l2 2.200 3-.4.8 2.900 2.700 1.400-1 2.900 1 2.900-2.700 1.400-.8 2.900-3-.4-2 2.200-2-2.200-3 .4-.8-2.900L3.500 15.200l1-2.900-1-2.900L6.200 8l.8-2.900 3 .4z"/>',
    bell: '<path d="M6 17.500V11a6 6 0 1 1 12 0v6.500l1.500 1.500h-15zM10 21.500h4"/>', ph: '<path d="M6.500 4.500l3 .8 1 3.500-2 1.500c1 2.200 2.700 3.900 4.900 4.900l1.500-2 3.500 1 .8 3c-.3 1.500-1.500 2.500-3 2.500C9 19.200 4.800 15 4 8c0-1.500 1-2.800 2.500-3.500zM14.500 4a5.500 5.500 0 0 1 5.500 5.500M14.500 7a2.500 2.500 0 0 1 2.500 2.500"/>',
    kb: '<circle cx="12" cy="5" r="1.600" fill="currentColor"/><circle cx="12" cy="12" r="1.600" fill="currentColor"/><circle cx="12" cy="19" r="1.600" fill="currentColor"/>'
  };
  const bellY = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v5l-1.500 2.500h15L18 14V9a6 6 0 0 0-6-6z" fill="#ffc400"/><path d="M10 19a2 2 0 0 0 4 0z" fill="#ffc400"/></svg>';
  const mk = (p, c) => `<svg width="46" height="46" viewBox="0 0 48 48">${p}</svg>`;
  const CAT = [
    ["제트", '<path d="M10 12h30l-9 10h9L12 40l8-14H10z" fill="#2a2a3a"/><path d="M16 16h18l-6 7h7L18 36l5-10h-8z" fill="#ff6a1a"/>'],
    ["맞춤", '<circle cx="22" cy="26" r="16" fill="#ff6a1a"/><circle cx="22" cy="26" r="9" fill="#fff"/><circle cx="22" cy="26" r="4" fill="#222"/><path d="M24 24l14-14" stroke="#ffc400" stroke-width="4" stroke-linecap="round"/>'],
    ["지역별", '<path d="M5 15V5h10M33 5h10v10M43 33v10H33M15 43H5V33" fill="none" stroke="#c4c6cc" stroke-width="3.500"/><path d="M24 12c-5 0-8 3.500-8 8 0 6 8 14 8 14s8-8 8-14c0-4.500-3-8-8-8z" fill="#ff6a1a"/><circle cx="24" cy="20" r="3.200" fill="#fff"/>'],
    ["단기", '<rect x="6" y="9" width="32" height="30" rx="3" fill="#eceef1"/><path d="M6 12a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v4H6z" fill="#ff6a1a"/><rect x="12" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><rect x="28" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><circle cx="34" cy="34" r="9" fill="#ff6a1a"/><circle cx="34" cy="34" r="6.500" fill="#fff"/><path d="M34 30v4.500l3 1.500" stroke="#222" stroke-width="2" fill="none"/>'],
    ["급구", '<path d="M13 36V25a11 11 0 0 1 22 0v11z" fill="#ff5a14"/><rect x="8" y="36" width="32" height="5" rx="1.500" fill="#222"/><path d="M24 6v4M10 11l3 3M38 11l-3 3" stroke="#ffc400" stroke-width="3" stroke-linecap="round"/>'],
    ["높은시급", '<path d="M18 9c2 3 10 3 12 0l2-4H16z" fill="#e8a600"/><path d="M19 12C9 20 6 28 8 34c2 6 10 8 16 8s14-2 16-8c2-6-1-14-11-22z" fill="#ffc400"/><circle cx="24" cy="30" r="7.500" fill="#fff" opacity=".35"/><text x="24" y="35" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">W</text>'],
    ["한달이상", '<rect x="6" y="9" width="36" height="34" rx="3" fill="#eceef1"/><path d="M6 12a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v8H6z" fill="#ff6a1a"/><rect x="13" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><rect x="32" y="4" width="3.500" height="9" rx="1.500" fill="#222"/><text x="24" y="37" text-anchor="middle" font-size="14" font-weight="900" fill="#ff6a1a">30+</text>'],
    ["재택", '<path d="M4 22L24 6l20 16v3H4z" fill="#ff6a1a"/><path d="M8 24h32v16H8z" fill="#c4c6cc"/><rect x="14" y="30" width="20" height="10" rx="1" fill="#444"/><circle cx="24" cy="35" r="2" fill="#fff"/>'],
    ["초보가능", '<g fill="#5ed25a"><circle cx="17" cy="17" r="9"/><circle cx="31" cy="17" r="9"/><circle cx="17" cy="31" r="9"/><circle cx="31" cy="31" r="9"/></g><path d="M16 16l16 16M32 16L16 32" stroke="#e6f9e4" stroke-width="2.500"/>'],
    ["바로출근", '<path d="M12 30l8-8 4-14h10l-3 18 10 6v6H10z" fill="#ff6a1a"/><path d="M12 30l10 8h18v-6l-8-4z" fill="#222" opacity=".8"/><path d="M3 30h8M5 35h8M7 40h8" stroke="#ffa060" stroke-width="2.500" stroke-linecap="round"/>']
  ];
  const wm = (k, a, b) => k === "cls" ? '<div class="wm"><span style="color:#8a4a1a">cou</span><span style="color:#3aa0d8">p</span><span style="color:#e5392a">an</span><span style="color:#2fa84f">g</span><small>logistics services</small></div>' : k === "cfs" ? '<div class="wm"><span style="color:#8a4a1a">cou</span><span style="color:#3aa0d8">p</span><span style="color:#e5392a">an</span><span style="color:#2fa84f">g</span><small>fulfillment services</small></div>' : '<div class="wm" style="font-style:italic;font-size:15px;color:#c8242b">HICARZ<small style="color:#444">AUTOPLAN</small></div>';
  const REC = [
    [["가천대길병원", "관악구", "가천대길병원 임상시험센터 사무보조 모집", "월급", "240만원"], ["(주)비즈원플러스", "신림동", "단기/행사/신림/이벤트) ㅇㅇ간호사회 기...", "시급", "11,000원"], ["쿠팡CFS", "신림동", "[초보환영/익일지급] 일최대16만★ 원하...", "일급", "16만원", 1]],
    [["스타벅스 신림점", "관악구", "스타벅스 신림역점 바리스타 파트너 모집", "시급", "10,320원"], ["GS25 낙성대점", "관악구", "GS25 낙성대점 주말 오전 근무자 모집", "시급", "10,030원"], ["CU 신림점", "관악구", "CU 신림점 야간 스태프 구합니다", "시급", "11,500원", 1]],
    [["서울 물류센터", "관악구", "[당일지급] 물류 상하차 단기 알바", "일급", "13만원"], ["맘스터치 대학동점", "구로구", "맘스터치 대학동점 평일 오후 크루 모집", "시급", "10,200원"], ["올리브영 신림", "관악구", "올리브영 신림점 주말 매장관리 모집", "시급", "10,500원", 1]],
    [["메가커피 사당점", "관악구", "메가커피 사당점 오픈/마감 파트타임", "시급", "10,100원"], ["이마트 신대방점", "관악구", "이마트 신대방점 계산/진열 사원 모집", "시급", "10,030원"], ["투썸플레이스", "영등포구", "투썸플레이스 주안점 주 3일 근무자", "시급", "10,500원", 1]],
    [["롯데시네마 신림", "관악구", "롯데시네마 신림역 매점 스태프", "시급", "10,200원"], ["본죽 난곡점", "관악구", "본죽 난곡점 주방 보조 모집", "시급", "10,800원"], ["다이소 신림", "관악구", "다이소 신림점 진열/계산 스태프", "시급", "10,030원", 1]]
  ];
  const HOT = [["cls", "쿠팡CLS", "계산동", "[입사축하금+면접비] 물류 알바관리자", "연봉", "5,020만원"], ["cls", "쿠팡CLS", "난곡동", "쿠팡CLS ★현장사무직★(인사/행정/급여 담당자...", "연봉", "3,500만원"], ["cfs", "쿠팡CFS", "대학동", "[초보환영/익일지급] 일최대 16만★ 원하는 날 하루만 ...", "일급", "16만원"],
    ["cfs", "쿠팡CFS", "선학동", "[초보환영/익일지급] 일최대16만★ 원하는 날 하루만...", "일급", "16만원"], ["cls", "쿠팡CLS", "용현동", "★징검다리 연휴★자유롭게 근무 3일 최대 40만원!#...", "일급", "10만원"], ["hz", "주식회사 하이카즈...", "신림동", "[인센티브50프로/정착지원금600]영업의중심/신차...", "월급", "500만원"],
    ["cls", "쿠팡CLS", "서운동", "[입사축하금] 물류 현장 알바관리자 모집", "연봉", "4,200만원"], ["cfs", "쿠팡CFS", "가좌동", "[초보환영/익일지급] 일최대16만★ 하루만 근무 ...", "일급", "16만원"], ["cls", "쿠팡CLS", "연수동", "쿠팡CLS 사무직 ★인사/총무 담당자 모집★", "연봉", "3,600만원"],
    ["cfs", "쿠팡CFS", "미성동", "[초보환영/익일지급] 일최대16만★ 주말 근무...", "일급", "16만원"], ["cls", "쿠팡CLS", "남촌동", "★연휴 특별★ 자유롭게 근무 2일 최대 30만원", "일급", "15만원"], ["hz", "주식회사 하이카즈...", "행운동", "[인센티브50프로]신차영업 경력/신입 모집", "월급", "450만원"]];
  const LST = [["컴포즈커피(신림포레스트점)", "컴포즈커피(신림포레스트점) 평일마감 모집합니다", "관악구 신림동", "요일협의 · 시간협의", "10,500원"], ["컴포즈커피 신림로점", "컴포즈 신림로점(평일 오후)함께하실분 모집합니다", "관악구 신림동", "요일협의 · 시간협의", "10,500원"]];
  const LST2 = [["테라커피 신림점", "테라커피 신림점 월,화,수,목,금요일 마감시간 모집", "관악구 신림동", "주5일 · 19:00~23:00", "10,320원"], ["카페드롭탑 신림점", "카페드롭탑 신림점 주말 오후 파트타임 구합니다", "관악구 신림동", "주말 · 13:00~18:00", "10,200원"], ["버거킹 신림점", "버거킹 신림점 크루 모집 (평일 저녁)", "관악구 신림동", "주4일 · 17:00~22:00", "10,400원"]];
  const MYJ = [["(주)에치와이", "[초보환영/교육비 지급] 한국야쿠르트 간단 배달 ...", ["매장관리", "판매", "도보배달", "뷰티", "헬스스토어"], "서울 관악구 신림동"], ["(주)오늘의식탁", "[주 2일 가능] 주방 보조 및 홀 서빙 모집", ["서빙", "주방보조", "단기"], "서울 관악구 신림동"], ["(주)한빛유통", "[3시간 단기] 오전 상품 진열 / 검수 알바", ["유통", "진열", "검수"], "서울 관악구 신림동"]];
  const AP = [{ d: "2026.06.29", m: "온라인지원", tab: 0, st: "합격", end: "06.30", co: "쿠팡풀필먼트서비스(유)", t: "[초보환영/익일지급] 일최대16만★ 인천 물류센터 하루만 근무" }, { d: "2026.06.27", m: "온라인지원", tab: 0, st: "합격", end: "06.30", co: "컬리(주)", t: "[컬리 김포센터] 새벽배송 물류 상하차·피킹 단기 알바" }, { d: "2026.06.24", m: "온라인지원", tab: 0, st: "합격", end: "06.28", co: "쿠팡로지스틱스서비스(유)", t: "★연휴 특별★ 자유롭게 근무 2일 최대 30만원" }, { d: "2026.06.21", m: "온라인지원", tab: 0, st: "합격", end: "06.25", co: "CJ대한통운(주)", t: "[당일지급] 택배 터미널 하차 단기 알바 (야간)" }, { d: "2026.06.18", m: "온라인지원", tab: 0, st: "합격", end: "06.22", co: "쿠팡풀필먼트서비스(유)", t: "[초보환영/익일지급] 일최대16만★ 주말 근무" }, { d: "2026.06.15", m: "온라인지원", tab: 0, st: "합격", end: "06.20", co: "컬리넥스트마일(주)", t: "새벽배송 분류·상차 보조 단기 알바" }, { d: "2026.06.12", m: "온라인지원", tab: 0, st: "합격", end: "06.16", co: "롯데글로벌로지스(주)", t: "롯데택배 터미널 상하차 일용직 모집" }, { d: "2026.06.09", m: "온라인지원", tab: 0, st: "합격", end: "06.13", co: "(주)한진", t: "한진택배 허브터미널 상하차 단기 알바" }, { d: "2026.06.06", m: "온라인지원", tab: 0, st: "합격", end: "06.10", co: "쿠팡풀필먼트서비스(유)", t: "물류센터 입고·출고 단기 알바 (일 최대 15만)" }, { d: "2026.06.03", m: "온라인지원", tab: 0, st: "합격", end: "06.07", co: "오아시스마켓 물류센터", t: "[당일지급] 신선식품 물류 상하차 일용직" }, { d: "2026.05.30", m: "온라인지원", tab: 0, st: "합격", end: "06.03", co: "컬리(주)", t: "[컬리 평택센터] 냉장·냉동 물류 상하차 단기" }, { d: "2026.05.26", m: "온라인지원", tab: 0, st: "합격", end: "05.30", co: "CJ대한통운(주)", t: "택배 간선 하차 알바 (주 2~3일 가능)" }, { d: "2026.05.22", m: "온라인지원", tab: 0, st: "합격", end: "05.26", co: "쿠팡로지스틱스서비스(유)", t: "캠프 배송 분류·상차 단기 알바" }, { d: "2026.05.18", m: "온라인지원", tab: 0, st: "합격", end: "05.22", co: "이마트 e-커머스 물류센터", t: "SSG 물류센터 피킹·포장 단기 알바" }, { d: "2026.05.12", m: "온라인지원", tab: 0, st: "합격", end: "05.16", co: "롯데글로벌로지스(주)", t: "택배 분류 및 상차 알바 (심야)" }, { d: "2026.05.08", m: "온라인지원", tab: 0, st: "합격", end: "05.12", co: "쿠팡풀필먼트서비스(유)", t: "[익일지급] 하루만 근무 가능한 물류 상하차" }, { d: "2026.05.02", m: "온라인지원", tab: 0, st: "합격", end: "05.06", co: "(주)로젠", t: "로젠택배 터미널 상하차 단기 알바" }, { d: "2026.04.25", m: "온라인지원", tab: 0, st: "합격", end: "04.29", co: "컬리넥스트마일(주)", t: "새벽 물류 상차 보조 일용직" }, { d: "2026.04.18", m: "온라인지원", tab: 0, st: "합격", end: "04.22", co: "쿠팡풀필먼트서비스(유)", t: "[초보환영] 일최대16만★ 인천 물류센터" }, { d: "2026.04.10", m: "온라인지원", tab: 0, st: "합격", end: "04.14", co: "(주)한진", t: "택배 대형 분류 하차 일용직" }];
  const stat = ["전체", "지원완료", "면접", "합격", "불합격/취소"];
  const pay = (a, b) => `<span class="pay"><em>${a}</em> ${b}</span>`;
  const star = '<button class="st" data-a="star" aria-label="스크랩">' + ic(I.star, 1.5, 28, "currentColor") + '</button>';
  const vcard = (j, k) => `<div class="vc"><small>${j[0]}</small><b>${j[1]}</b><div class="rw">${ic('<path d="M12 21s-6-5.500-6-10a6 6 0 0 1 12 0c0 4.500-6 10-6 10z"/>', 0, 22, "#c4c6cc")}${j[2]}</div><div class="rw">${ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke="#fff" fill="none"/>', 0, 22, "#c4c6cc")}${j[3]}</div><div class="rw"><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#c4c6cc"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">W</text></svg><span class="g">시급</span><u>${j[4]}</u></div>${star}</div>`;
  const navI = [["홈", '<path d="M3.500 11L12 3.500 20.500 11V20h-5.500v-6h-6v6H3.500z" fill="currentColor" stroke="currentColor" stroke-linejoin="round"/>'], ["커뮤니티", '<circle cx="12" cy="5" r="2.300"/><circle cx="5" cy="18" r="2.300"/><circle cx="19" cy="18" r="2.300"/><path d="M11 7.200L6 16M13 7.200L18 16M7.500 18h9"/>'], ["지도", '<path d="M12 3.500a5 5 0 0 0-5 5c0 3.700 5 8 5 8s5-4.300 5-8a5 5 0 0 0-5-5z"/><circle cx="12" cy="8.500" r="1.800"/><path d="M4 16l-1.500 4.500h19L20 16"/>'], ["채팅", '<path d="M12 4a8 8 0 0 0-6.800 12.200L4 20l4-1.200A8 8 0 1 0 12 4z"/>'], ["MY", '<circle cx="12" cy="8" r="4.200"/><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7z"/>']];
  el.innerHTML = `
  <div class="sc" id="am-hs"><div style="height:var(--hh)"></div>
    <div class="rc"><div class="rs" id="am-rs">${REC.map(sl => `<div class="rcd">${sl.map(j => `<div class="jb"><small>${j[0]} · ${j[1]}</small><b>${j[2]}</b>${pay(j[3], j[4])}${j[5] ? '<span class="ad">AD</span>' : ""}</div>`).join("")}</div>`).join("")}</div><div class="dots" id="am-dots">${REC.map((_, i) => `<i${i ? "" : ' class="on"'}></i>`).join("")}</div></div>
    <div class="cats">${CAT.map(c => `<div>${mk(c[1])}${c[0]}</div>`).join("")}</div>
    <div class="fl"><span class="ic">${ic(I.flt, 2, 22)}</span><span>하는 일 ${ic(I.dn, 2, 18)}</span><span>일하는 기간 ${ic(I.dn, 2, 18)}</span><span>일하는 요일 ${ic(I.dn, 2, 18)}</span><span>기타 조건 ${ic(I.dn, 2, 18)}</span></div>
    <div class="sh"><svg width="28" height="30" viewBox="0 0 28 30"><path d="M14 1c1 5 8 8 8 16a8 8 0 0 1-16 0c0-4 2-6 3-8 .5 2 1.500 3 3 3 0-4-1-7 2-11z" fill="#ff5a1f"/><path d="M14 14c3 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8z" fill="#ffc400"/></svg>적극 채용중<span class="ad">AD</span></div>
    <div class="hot">${HOT.map(h => `<div class="hc"><div class="lg">${wm(h[0])}<i>HOT</i></div><small${h[0] === "hz" ? ' style="color:#e5392a"' : ""}>${h[1]} · ${h[2]}</small><b>${h[3]}</b>${pay(h[4], h[5])}</div>`).join("")}</div>
    <div class="vl" style="margin-top:16px">${LST.map((j, i) => vcard(j, i)).join("")}</div>
    <div class="sh"><svg width="30" height="30" viewBox="0 0 30 30"><rect x="2" y="12" width="7" height="14" rx="1" fill="#3a6cf0"/><path d="M11 12l5-9c2 0 3 2 2 5l-1 3h8c2 0 3 2 2 4l-2 9c-.5 2-2 3-4 3H11z" fill="#ffd2b8"/></svg>나한테 딱 맞는 알바<span class="ad">AD</span></div>
    <div class="vl">${LST2.map((j, i) => vcard(j, i)).join("")}</div><div style="height:calc(var(--nb) + 70px)"></div></div>
  <div class="hd"><div class="hr"><div class="loc">${I.pin}<span>신림동</span>${ic(I.dn, 2.4, 22)}</div><span class="ib">${ic(I.sr, 2, 30)}</span><span class="ib">${ic(I.mn, 2, 30)}</span></div></div>
  <button class="fab" id="am-fab" aria-label="맨 위로">${ic(I.up, 2.2, 26)}</button>
  <nav class="nv">${navI.map((n, i) => `<button data-n="${i}">${ic(n[1], 2, 28)}${n[0]}</button>`).join("")}</nav>
  <div class="ov" id="am-my"><div class="sc" id="am-mys">
    <div class="mh"><span>마이페이지</span><button data-a="myx" aria-label="닫기">${ic(I.x, 1.8, 34)}</button></div>
    <div class="adb"><span class="ad">AD</span></div>
    <div class="pf"><div class="av"><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="22" r="9" fill="#dcdce0"/><path d="M8 56c0-12 8-16 20-16s20 4 20 16z" fill="#dcdce0"/></svg></div><div class="pn"><div style="justify-content:space-between;margin:0"><b>박성화님</b><span class="mi" style="background:none;padding:0;border-radius:0">${ic(I.gear, 1.6, 22)}회원정보</span></div><div><span>이력서 비공개중</span><span style="background:none;padding:0">인재정보에 공개하기</span></div></div></div>
    <div class="stt"><button><i>1</i><span>이력서관리</span></button><button data-a="goap"><i id="am-apn">${AP.length}</i><span>지원현황</span></button><button><i>0</i><span>스크랩</span></button><button><i>0</i><span>최근본알바</span></button></div>
    <div class="sb3"><span>알바제의 <b>0</b></span><span>이력서 열람 <b>0</b></span><span>관심기업 <b>0</b></span></div>
    <div class="qk"><div class="ms"><i>ᗜ</i></div><span class="t"><b>바로출근</b> 설정하고 더 빠르게 일하자!</span><button class="tg" data-a="tg" aria-label="바로출근"></button></div>
    <div class="rg"><div class="rgh"><h3>하루를 알차게 보내자!<br><em>하루 3시간 미만</em> 알바 공고 모음</h3><span>AI추천알바 ${ic(I.rt, 2, 16)}</span></div>
      <div class="rh" id="am-rh">${MYJ.map(j => `<div class="vc"><small style="padding:0;color:#111;font-weight:700;font-size:18px">${j[0]}</small><b>${j[1]}</b><div class="tags">${j[2].map(t => `<span>${t}</span>`).join("")}</div><div style="color:#8b8b95;font-size:16px">${j[3]}</div>${star}</div>`).join("")}</div>
      <div class="trk"><i id="am-trk"></i></div></div>
    <div class="nw"><b>나의 소식</b><span>${ic(I.bell, 1.6, 22)}푸시알림설정</span></div>
    <div class="em">새로운 소식이 없어요</div></div></div>
  <div class="ov" id="am-ap"><div class="sc" id="am-aps"></div></div>`;
  const hs = $("#am-hs"), fab = $("#am-fab"), my = $("#am-my"), ap = $("#am-ap"), aps = $("#am-aps");
  const S = { tab: 0, st: 0, q: "" };
  const apList = () => AP.filter(a => a.tab === S.tab);
  const match = (a, k) => k === 0 || (k === 4 ? (a.st === "불합격" || a.st === "취소") : a.st === stat[k]);
  const renderAp = (keep) => {
    const base = apList(), cnt = stat.map((_, k) => base.filter(a => match(a, k)).length), q = S.q.trim().toLowerCase();
    const rows = base.filter(a => match(a, S.st) && (!q || (a.co + a.t).toLowerCase().includes(q)));
    aps.innerHTML = `<div class="ah"><button data-a="apb" aria-label="뒤로">${ic(I.bk, 1.8, 34)}</button><span>지원현황</span></div>
    <div class="asr"><input id="am-q" placeholder="기업명, 채용제목, 연락처로 검색하세요." value="${S.q.replace(/"/g, "&quot;")}" autocomplete="off">${ic(I.sr, 1.8, 32)}</div>
    <div class="atb"><button data-a="atab" data-k="0"${S.tab === 0 ? ' class="on"' : ""}>온라인·문자·이메일 지원</button><button data-a="atab" data-k="1"${S.tab === 1 ? ' class="on"' : ""}>기타 지원</button></div>
    <div class="ast">${stat.map((n, k) => `<button data-a="ast" data-k="${k}"${S.st === k ? ' class="on"' : ""}><i>${cnt[k]}</i><span>${n}</span></button>`).join("")}</div>
    <div class="alist">${rows.length ? rows.map(a => `<div class="ai"><div class="t1"><span>${a.d}<u></u>${a.m}</span><span style="display:flex;align-items:center;gap:18px;color:#222">${ic(I.ph, 1.6, 30)}${ic(I.kb, 2, 22)}</span></div><div class="t2"><span class="bdg">${a.st}</span><span>마감 ${a.end}</span></div><div class="co">${a.co}</div><div class="tt">${a.t}</div><button class="rv">기업후기 작성하기</button></div>`).join("") : '<div class="em" style="padding:60px 0">지원 내역이 없습니다</div>'}</div>
    <div class="pg">1</div><div class="hid">숨긴 내역 보기 ${ic(I.rt, 2, 20)}</div>
    <div class="nt"><p>모든 지원 내역은 1년간 저장됩니다.</p><p>이력서를 수정하셔도 이미 지원한 이력서에는 반영되지 않습니다.</p><p>동네간편지원은 지원방법 특성상 " <b>지원취소</b>"가 불가능 합니다.</p></div>`;
    if (!keep) aps.scrollTop = 0;
  };
  let fabOn = false, fr = 0; hs.addEventListener("scroll", () => { if (fr) return; fr = requestAnimationFrame(() => { fr = 0; const o = hs.scrollTop > 500; if (o !== fabOn) { fabOn = o; fab.classList.toggle("on", o); } }); }, { passive: true });
  const rs = $("#am-rs"), dots = [...el.querySelectorAll("#am-dots i")];
  let rw = 0; rs.addEventListener("scroll", () => { const w = rw || (rw = rs.firstElementChild.offsetWidth + 12), k = Math.max(0, Math.min(dots.length - 1, Math.round(rs.scrollLeft / w))); dots.forEach((d, i) => d.classList.toggle("on", i === k)); }, { passive: true });
  const rh = $("#am-rh"), trk = $("#am-trk");
  rh.addEventListener("scroll", () => { const m = rh.scrollWidth - rh.clientWidth; trk.style.left = (m > 0 ? rh.scrollLeft / m * 82 : 0) + "%"; }, { passive: true });
  el.addEventListener("input", e => { if (e.target.id === "am-q") { S.q = e.target.value; const p = e.target.selectionStart; renderAp(true); const n = $("#am-q"); n.focus(); n.setSelectionRange(p, p); } });
  el.addEventListener("click", e => {
    const t = e.target.closest("[data-a],[data-n]"); if (!t) return;
    if (t.dataset.n !== undefined) { if (t.dataset.n === "4") { my.classList.add("on"); } else if (t.dataset.n === "0") { hs.scrollTo({ top: 0, behavior: "smooth" }); } return; }
    const a = t.dataset.a;
    if (a === "myx") my.classList.remove("on");
    else if (a === "goap") { S.tab = 0; S.st = 0; S.q = ""; renderAp(); ap.classList.add("on"); }
    else if (a === "apb") ap.classList.remove("on");
    else if (a === "atab") { S.tab = +t.dataset.k; S.st = 0; renderAp(true); }
    else if (a === "ast") { S.st = +t.dataset.k; renderAp(true); }
    else if (a === "tg") t.classList.toggle("on");
    else if (a === "star") t.classList.toggle("on");
  });
  fab.addEventListener("click", () => hs.scrollTo({ top: 0, behavior: "smooth" }));
  let isOpen = false;
  function open() { if (isOpen) return; isOpen = true; originFrom(el, "albamon"); my.classList.remove("on"); ap.classList.remove("on"); hs.scrollTop = 0; el.classList.add("show"); void el.offsetWidth; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); setTimeout(() => { if (isOpen) screen.classList.add("app-light"); }, 140); }
  function close() { if (!isOpen) return; isOpen = false; screen.classList.remove("app-light"); el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!isOpen) { el.classList.remove("show"); my.classList.remove("on"); ap.classList.remove("on"); } }, 430); }
  document.addEventListener("app:open", e => { if (e.detail.id === "albamon") open(); });
  document.addEventListener("app:close", close);
  return { open, close };
})();
