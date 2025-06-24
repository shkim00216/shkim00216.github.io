---
layout: post
title: "[Javascript] 디바운싱과 스로틀링"
date: 2025-06-24
categories: Javascript
---

# #검색과 디바운싱

<!-- CSS-JS/class-js/section07/07-01/01-search.html 참고 -->

## [검색]

> **검색** : 사용자가 특정 키워드를 입력하여 관련된 정보를 찾는 과정

- 사용자가 입력한 텍스트를 바탕으로 미리 정의된 친구 목록에서 검색어를 포함하는 이름들을 필터링하여 화면에 표시

```javascript
const 친구목록 = ["철수", "영희", "철희", "철민", "민희"];

const JS_검색기능 = () => {
  const 내가검색한단어 =
    event.target
      .value; /* 재사용을 위해 event.target.value를 getElementById() 대신에 더 자주 사용하자! */
  console.log(내가검색한단어);

  const 검색결과들 = 친구목록.filter((el) => el.includes(내가검색한단어));
  console.log(검색결과들);

  document.getElementById("HTML_검색결과보여주는곳").innerText = 검색결과들;
};
```

## [디바운싱]

<!-- CSS-JS/class-js/section07/07-01/02-debounce-search.html, 03-debounce-search-with-api.html 참고 -->

> **디바운싱(Debouncing)** : 짧은 시간 동안 여러 번 발생하는 이벤트가 있을 때, 마지막 이벤트만 처리되도록 하는 기술

- 디바운싱의 주요 목적은 `성능 최적화`
  - 사용자가 검색어를 입력할 때마다 검색을 수행하면 서버에 많은 요청을 보내게 되어 성능이 저하될 수 있음
  - 디바운싱을 사용하면 사용자가 입력을 멈춘 후 일정 시간 후에 검색을 실행하게 되어 불필요한 검색 요청을 줄일 수 있음

### \* setTimeout을 이용한 디바운싱 구현

```javascript
let 타이머 = "아직실행안함";

const JS_검색기능 = (event) => {
  clearTimeout(타이머); /* 이전에 설정된 타이머 취소, 검색 요청 중복 안되게 */

  타이머 = setTimeout(() => {
    /* 입력을 멈춘 후 1초 동안 추가 입력이 없으면 검색 실행 */
    const 내가검색한단어 = event.target.value;
    console.log(내가검색한단어);

    const 검색결과들 = 친구목록.filter((el) => el.includes(내가검색한단어));
    console.log(검색결과들);

    document.getElementById("HTML_검색결과보여주는곳").innerText = 검색결과들;
  }, 1000);
};
```

---

# #무한스크롤과 스로틀링

<!-- CSS-JS/class-js/section07/07-02/01-scroll.html 참고 -->

## [무한스크롤]

> **무한스크롤** : 웹 페이지에서 사용자가 페이지 끝까지 스크롤하면 자동으로 추가 콘텐츠를 불러와서 보여주는 기술

- ⭐️ 예시) 인스타그램에서의 무한스크롤

### 💡 무한스크롤 사용 이유

1. 사용자 참여 증가
2. 편리함
3. 매끄러운 경험

### ❗️ 무한스크롤 작동원리

1. **페이지 로드** : 일정량의 초기 콘텐츠 표시
2. **스크롤 이벤트 감지** : 스크롤 시 스크롤 위치 감지
3. **새로운 콘텐츠 로드** : 사용자가 페이지 끝에 도달하면, 서버에 추가 콘텐츠 요청
4. **콘텐츠 추가** : 서버에서 받아온 새로운 콘텐츠를 현재 페이지에 추가
5. **반복** : 위 과정 반복하여 무한히 콘텐츠 불러옴

```javascript
window.addEventListener("scroll", () => {
  const 스크롤퍼센트 =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  console.log("스크롤을 검사합니다.");

  if (스크롤퍼센트 >= 0.7) {
    console.log("상자를 그려줍니다.");
    document.getElementById(
      "HTML_상자보여주는곳"
    ).innerHTML += `<div class="CSS_상자"></div>`;
  }
});
```

## [스로틀링]

<!-- CSS-JS/class-js/section07/07-02/02-throttle-scroll1.html, 02-throttle-scroll2-ealry-exit.html, 03-throttle-scroll-with-api.html 참고 -->

> **스로틀링(Throttling)** : 이벤트가 너무 자주 발생하는 것을 방지하고, 성능을 최적화하기 위해 사용되는 기술

### 💡 스로틀링 사용 이유

1. 성능 최적화 : 이벤트 핸들러 실행 빈도를 줄이면, CPU 사용률과 메모리 사용 줄일 수 있음
2. 리소스 절약 : 리소스를 많이 사용하는 작업을 제한된 빈도로 실행함

```javascript
let 타이머 = "아직실행안함";

window.addEventListener("scroll", () => {
  if (타이머 === "아직실행안함") {
    const 스크롤퍼센트 =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
    console.log("스크롤을 검사합니다.");

    if (스크롤퍼센트 >= 0.7) {
      console.log("상자를 그려줍니다.");
      document.getElementById(
        "HTML_상자보여주는곳"
      ).innerHTML += `<div class="CSS_상자"></div>`;
    }

    타이머 = setTimeout(() => {
      타이머 = "아직실행안함";
    }, 500);
  }
});
```

### ❗️ Early exit pattern

- `if`문을 사용해서 실행 여부를 판단할 경우, 실행시키지 않을 조건으로 조건문을 작성해 함수를 종료하게 하는 경우를 상단에 작성
- 코드 가독성이 높여짐
- 리팩토링으로 수행 가능

```javascript
let 타이머 = "아직실행안함";

window.addEventListener("scroll", () => {
  if (타이머 !== "아직실행안함") return; /* early exit */

  타이머 = setTimeout(() => {
    타이머 = "아직실행안함";
  }, 500);

  const 스크롤퍼센트 =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  console.log("스크롤을 검사합니다.");

  if (!(스크롤퍼센트 >= 0.7)) return; /* early exit */

  console.log("상자를 그려줍니다.");
  document.getElementById(
    "HTML_상자보여주는곳"
  ).innerHTML += `<div class="CSS_상자"></div>`;
});
```
