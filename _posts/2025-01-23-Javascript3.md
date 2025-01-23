---
layout: post
title: "[Javascript] Javascript 응용"
date: 2025-01-23
categories: Javascript
---

# 자바스크립트

## #함수

> 우리가 직접 만드는 **기능**

```javascript
function hello() {
  alert("안녕하세요");
}

function 함수이름(매개변수) {
  함수를 호출했을 때 실행할 명령문
  (데이터 반환 : Optional)
} /* 함수 안에 데이터 제공이 필요할 때 매개변수를 넣어 줌 */
```

### [함수 작성 방법]

#### 1. 함수 선언식

```javascript
function hello(name) {
  alert(name + "님 안녕하세요");
} /* 호이스팅 문제로 인해 표현식 등장 */
```

#### 2. 함수 표현식

```javascript
const hello = function (name) {
  alert(name + "님 안녕하세요");
}; // 익명함수
```

#### 3. 화살표 함수

```javascript
const hello = (name) => {
  alert(name + "님 안녕하세요");
}; /* 표현식 간소화 */
```

⭐️ 함수 선언식 -> 화살표 함수로 변환하는게 어려움(실무에서는 화살표 함수 많이 사용)  
⭐️ 함수 실행 방법은 모두 동일

❗️ 매개변수(parameter)와 `return` 값은 필수가 아님

- 매개변수와 리턴값은 있어도 되고 없어도 되는 값이기 때문에 반드시 적어주실 필요는 없음, 상황에 따라 사용

#### ⭐️ 실무 예시

#### 1. 함수 언제 사용하는지

- 특정 기능이 필요하다 할 때마다 만들어서 사용

---

## #내장함수

> 자주 사용되는 함수를 자바스크립트에 내장하여 편리하게 이용할 수 있도록 한 것

### 1. setTimeout

- **시간 지연 함수**로 입력 시간이 만료된 후 함수나 지정한 코드를 실행

```javascript
setTimeout(func, time);
```

### 2. setInterval

- **시간 반복 함수**로 입력한 시간마다 함수를 반복적으로 호출하거나 코드를 실행

```javascript
setInterval(func, time);
```

### 3. alert

- 메세지를 지정할 수 있는 **경고 대화 상자**를 띄움

```javascript
alert("이렇게 만드시면 경고창이 생겨요!");
```

❗️ 시간 입력 시 ms(밀리세컨드) 단위로 입력

- 1초에 1000ms

### ⭐️ 실무 예시

#### 1. `setInterval()` 언제 사용하는지

- 휴대폰 인증 시, 인증만료시간을 보여줄 때 사용

### [시간지연함수와 시간반복함수의 종료]

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
