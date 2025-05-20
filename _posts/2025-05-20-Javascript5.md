---
layout: post
title: "[Javascript] 디바이스 및 모바일 감지"
date: 2025-05-20
categories: Javascript
---

# #디바이스 감지

<!-- CSS-JS/class-js/section04/04-01/01-device-height.html 참고 -->

## [디바이스 사이즈 계산하는 법]

<!-- CSS-JS/class-js/section04/04-01/.html 참고 -->

- `window.innerWidth` : 현재 창의 너비
- `window.innerHeight` : 현재 창의 높이
- `window.outerHeight` : 브라우저 창의 전체 크기(UI 요소 - 메뉴, 주소 표시줄, 도구 모음 등 포함)
- `getBoundingClientRect()` : 특정 요소의 크기와 위치 반환

```javascript
const element = document.getElementById("myElement");
const rect = element.getBoundingClientRect();

// 해당 요소의 너비, 높이, 위치 등을 확인할 수 있음
// 너비와 높이는 뷰포트의 왼쪽 상단을 기준으로 함
console.log(`Element Width: ${rect.width}, Element Height: ${rect.height}`);
console.log(`Element Position: (${rect.top}, ${rect.left})`);
```
