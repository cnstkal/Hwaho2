# Hwaho2 story intro implementation notes

The story opening should use the existing in-project Dispatch virtual article route:
https://www.dispatch.co.kr/article/1
The existing article is a simulation page inside js/safari.js, not a verified real-world Dispatch report. The acknowledgement story page already lives at:
https://entertain.naver.com/article/sample/6

Required integration:
- Load js/facetime.js and js/story.js from index.html after the app scripts and before body end.
- Remove the Facetime elapsed timer that automatically calls prompt(); story starts when the lock screen is initialized.
- Extend FaceTimeApp.ring options with kind: "manager-first" (both accept and decline dismiss as missed, dispatch story:manager-first-call-missed), kind: "manager-second" (accept connects and on open emits story:manager-call-connected; on end emits story:manager-call-ended), avatar URL, and dialogue.
- Keep lock password 990323. HwahoLock notifications need a single slot, glass styling, onClick and clearNotification(id).
- Add PhoneApp.recordStoryMissedCall(name, storyKey) idempotently; create dir:"miss", dur:0 call record.
- story.js stage flow: first-call -> manager-chat-alert -> dispatch-alert -> dispatch-reading -> second-call-ringing -> second-call-active -> ack-article-alert -> ack-article-reading -> manager-ack-alert -> pre-existing Yunho chat, then Instagram continuation. First call is a missed call no matter which button is pressed. The urgent Kakao alert remains until tapped; then the Dispatch alert replaces it. Clicking Dispatch opens the existing virtual article. Once that page loads, schedule manager-second ringing in 7 seconds, and guard it from re-running via persisted state.
- Reuse manager profile image images/app/KakaoTalk/Profile/성현이형(매니저)/IMG_7422.jpeg.
- Keep existing acknowledgement article text exactly: 정윤호 측, 마스와 열애 인정…“서로 좋은 감정으로 만나고 있다”.
- In js/safari.js emit story:dispatch-article-viewed only after the virtual Dispatch page is loaded; emit story:ack-article-viewed after virtual Naver article sample/6 loaded. In Yunho’s Naver profile, show the Dispatch story item from the existing NVN dataset; do not fabricate external links.
- Bump script URLs in index.html to avoid cached older source.
