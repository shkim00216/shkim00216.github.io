---
layout: post
title: "[Javascript] Javascript 이벤트 변경 감지"
date: 2025-01-24
categories: Javascript
---

# 자바스크립트

<!-- precamp/class/03-javascript/07-signup.html,js 참고 -->
<!-- precamp/class/03-javascript/08-phone.html,js 참고 -->

## #이벤트 핸들러

> 함수는 `event`를 처리하거나 반응
> 이벤트 핸들러는 **이벤트 청취자**, 즉 위와 같은 **이벤트가 발생하는것을 감지하는 역할**

### [이벤트 핸들러의 종류]

#### 1. onclick

```javascript
onclick = "자바스크립트함수();"; // 해당 태그를 클릭했을 때 자바스크립트 함수 실행
```

#### 2. onchange

```javascript
onchange = "자바스크립트함수();"; // 해당 태그가 변경됐을 때 자바스크립트 함수 실행
```

#### 3. onblur

```javascript
onblur = "자바스크립트함수();"; // 해당 태그에서 벗어났을 때 자바스크립트 함수 실행
```

### 💡 실무 예시

#### 1. 이벤트 핸들러 언제 사용하는지

- 버튼을 눌렀을 때 함수를 실행해야 한다거나 인풋창이 변할 때 함수를 실행해야 하는 등 **적절한 시기에 함수를 실행해야 할 때 사용**
