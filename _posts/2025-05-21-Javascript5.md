---
layout: post
title: "[Javascript] 키보드 감지 및 API"
date: 2025-05-21
categories: Javascript
---

# #키보드 감지

<!-- CSS-JS/class-js/section05/05-01/01-keyboard.html 참고 -->

- `keydown` : 사용자가 키를 눌렀을 때 발생, 키가 눌리는 순간 트리거되며 여러번 키보드를 누를 경우 여러번 발생
- `keyup` : 사용자가 키에서 손을 뗄 때 발생, 키를 떼는 순간 트리거되며 주로 입력이 완료된 후에 검색과 같은 특정 동작을 하거나 검증을 수행할 때 사용
- `keypress` : deprecated, 사용자가 문자를 입력할 때 발생하고 일반적으로 인쇄 가능한 문자에 대해 트리거, 지금은 사용 X

```javascript
document.addEventListener("keydown", function (event) {
  console.log("Key down: ", event.key);
});
```

📌 [키 밸류 확인](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

## [입력창에서의 엔터키 적용]

<!-- CSS-JS/class-js/section05/05-01/02-keyboard-with-input.html 참고 -->

```javascript
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // 엔터키 인지 여부 확인
    console.log("엔터키가 눌렸습니다!");
  }
});
```

## [폼]

<!-- CSS-JS/class-js/section05/05-01/03-form1.html 참고 -->
<!-- CSS-JS/class-js/section05/05-01/03-form2-with-button.html 참고 -->

> **폼(Form)** : 회원가입, 게시글 등에서 입력창 그룹으로 묶은 요소

### ⭐️ 폼에서 사용되는 버튼

- `submit`: 버튼을 클릭하면 폼을 제출하는 역할, type 속성 기본값`submit`, URL로 데이터 전송(`default`값)
- `button` : 특별한 기능이 없는 일반 버튼, js와 함께 사용하여 특정 동작 수행하도록 설정
- `reset` : 폼의 모든 입력 필드를 초기값으로 돌리는 버튼

### 💡 action 생략방법

- `action` : 폼 데이터가 전송될 URL을 지정하는 속성, 생략 시 현재 페이지로 전송
- `action` 속성에 `#`을 사용하면 페이지의 맨 위로 스크롤됨, 페이지 내에서 다른 동작 수행할 때 유용

---

# #브라우저 API

## [API]

> **API(Application Programming Interface)** : 미리 만들어 놓은 기능(함수)

- 브라우저 `API` : 브라우저에 만들어져 있는 기능, `console.log(), localStorage.getItem()`
- 백엔드 `API` : 백엔드 개발자가 프론트엔드 개발자에게 쓰라고 만들어준 기능
- 오픈 `API` : 다른사람이 만들어서 공개한 기능
- 외부 `API` : 외부 기관에 허락 맡거나 돈 내고 쓰는 기능

### ⭐️ 웹 API

<!-- CSS-JS/class-js/section05/05-02/01-browser-api.html 참고 -->

1. 웹 스토리지 API (Web Storage API)

- `localStorage` : 브라우저에 대한 데이터를 저장할 수 있는 API, 저장된 데이터는 브라우저를 닫아도 유지됨
- `sessionStorage` : 브라우저 세션 동안만 데이터를 저장, 브라우저를 닫으면 데이터가 사라짐

2. DOM API (Document Object Model API)

- `document.getElementById()` : 웹 페이지의 HTML 요소를 `JavaScript`로 접근하고 조작할 수 있게 해줌

3. 콘솔 API (Console API)

- `console.log()` : 디버깅 목적으로 `JavaScript`에서 메시지를 콘솔에 출력할 수 있게 해줌

#### ❗️ 내장되어 있는 브라우저API는 다 window 기반이라 앞에 window가 생략되어 있다는 것 인지

## [navigator]

> **navigator** : 블루투스, 내위치, USB 등을 연동할 수 있는 브라우저 API

### 1. navigator.clipboard

<!-- CSS-JS/class-js/section05/05-02/02-navigator1-clipboard.html 참고 -->

- 클립보드와 상호작용할 수 있는 API를 제공하는 객체
- **클립보드** : `Ctrl + C` 누르면 복사 내용이 저장되는 장소, `Ctrl + V` 누르면 복사 내용을 가져오는 장소

```javascript
navigator.clipboard.writeText(text):
```

### 2. navigator.geolocation

<!-- CSS-JS/class-js/section05/05-02/02-navigator2-geolocation.html 참고 -->

- 사용자의 위치 정보를 얻을 수 있도록 해주는 브라우저 API
- 근처 맛집 찾기, 지도 앱, 위치 기반 알림 등 구현 가능

```javascript
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options):
```

- `successCallback` : 위치 정보를 성공적으로 가져왔을 때 호출되는 함수(필수 값)
- `errorCallback` : 위치 정보를 가져오는 데 실패했을 때 호출되는 함수(필수 값 X)
- `options` : 위치 정보를 가져올 때의 옵션을 설정할 수 있음(필수 값 X)

## ⭐️ mousemove 이벤트

<!-- CSS-JS/class-js/section05/05-02/03-timer.html 참고 -->

> **mousemove** : 사용자가 마우스를 움직일 때마다 발생, 마우스의 현재 위치 추적 가능

```javascript
window.addEventListener("mousemove", (event) => {
  const 가짜마우스 = document.getElementById("HTML_가짜마우스");
  가짜마우스.style.top = `${
    event.clientY + 5
  }px`; /* 진짜마우스에서 5만큼 떨어뜨리기(아래 클릭 가능하도록) */
  가짜마우스.style.left = `${
    event.clientX + 5
  }px`; /* 진짜마우스에서 5만큼 떨어뜨리기(아래 클릭 가능하도록) */
});
```

## 💡 setTimeout vs setInterval

|                | `setTimeout    `                                                            | `setInterval`                          |
| :------------: | --------------------------------------------------------------------------- | -------------------------------------- |
| 반복 실행 여부 | 지정한 시간 후에 한 번만 실행                                               | 지정한 시간 간격으로 반복적으로 실행   |
|      용도      | 일회성 작업이나 특정 지연 후 실행할 때 사용                                 | 반복적인 작업을 수행할 때 사용         |
|      예시      | 사용자 인터페이스에서 지연 효과를 주거나, 특정 이벤트 후에 작업을 실행할 때 | 타이머나 주기적으로 데이터를 갱신할 때 |
