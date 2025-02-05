---
layout: post
title: "[Javascript] Javascript 응용"
date: 2025-01-23
categories: Javascript
---

# #내장함수

> 자주 사용되는 함수를 자바스크립트에 내장하여 편리하게 이용할 수 있도록 한 것

## 1. setTimeout

- **시간 지연 함수**로 입력 시간이 만료된 후 함수나 지정한 코드를 실행

```javascript
setTimeout(func, time);
```

## 2. setInterval

- **시간 반복 함수**로 입력한 시간마다 함수를 반복적으로 호출하거나 코드를 실행

```javascript
setInterval(func, time);
```

## 3. alert

- 메세지를 지정할 수 있는 **경고 대화 상자**를 띄움

```javascript
alert("이렇게 만드시면 경고창이 생겨요!");
```

❗️ 시간 입력 시 ms(밀리세컨드) 단위로 입력

- 1초에 1000ms

### 💡 실무 예시

#### 1. `setInterval()` 언제 사용하는지

- 휴대폰 인증 시, 인증만료시간을 보여줄 때 사용

<!-- precamp/class/03-javascript/06-timer.js 참고 -->

## [시간지연함수와 시간반복함수의 종료]

```javascript
// 시간지연함수 강제종료
const time = setTimeout(기능, 시간); // 시간지연함수를 임시로 변수/상수에 저장
clearTimeout(time); // 저장했던 시간지연함수를 종료

// 시간반복함수 강제종료
const time = setInterval(기능, 시간); // 시간반복함수를 임시로 변수/상수에 저장
clearInterval(time); // 저장했던 시간반복함수를 종료
```

- 각각의 종료 함수는 각자의 함수 안에서 사용할 수 있음
  - 즉, `clearInterval`은 `setInterval`안에서 사용할 수 있다는 뜻
