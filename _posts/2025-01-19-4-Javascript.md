---
layout: post
title: "[Javascript] Javascript의 기본"
date: 2025-01-19
categories: Javascript
---

<!-- precamp/class/03-javascript/01-variable.js 참고 -->

# #변수와 상수

- 변수 : 어떤 관계나 범위 안에서 여러가지 값으로 변할 수 있는 수
  - `var`, `let`
- 상수 : 변하지 아니하는 일정한 값을 가진 수나 양
  - `const`

## [변수와 상수 만들기]

### 1. 선언(declaration)

- 변수의 이름을 알려주는 행위

```javascript
let apple;
```

### 2. 할당(definition)

- 변수에 데이터를 담아주는 행위

```javascript
apple = "맛있는 사과";
```

### ⭐️ 선언과 할당을 한번에

```javascript
let apple = "맛있는 사과";
```

## [변수와 상수의 종류와 특징]

|                         | `var` | `let` | `const` |
| :---------------------: | :---: | :---: | :-----: |
|  이름 중복<br>(재선언)  |   O   |   X   |    X    |
| 데이터 수정<br>(재할당) |   O   |   O   |    X    |

```javascript
// 상수 변경하기(예제)
const classmate1 = "철수";
classmate1 = "민수"; // 에러!!  (다시 담기 불가능)

// 변수 변경하기(예제)
let classmate2 = "훈이";
classmate2 = "민수"; // 성공!!  (다시 담기 가능)

// 변수 변경하기(예제)
let classmate3; // 처음에 빈 상자로 둘 수도 있음
classmate3 = "짱구"; // 성공!!
```

## [변수와 상수의 작명 규칙]

- `camelCase` : let myMoney -> js
- `snake_case` : my_money -> python

---

<!-- precamp/class/03-javascript/연습-01-array.js 참고 -->

# #배열

## 배열이란?

> 여러개의 데이터를 한번에 담을 수 있음

- 대괄호 [ ] 안에 데이터를 쉼표 , 로 각 데이터를 구분

## [배열에 데이터 담아보기]

```javascript
// 빈 배열
const blanksArr = []; // 아무것도 안담는 것도 가능

// 숫자들로 이루어진 배열
const numbers = [2, 10, 7, 3.3]; // 숫자 담기

// 문자들로 이루어진 배열
const classmates = ["코드", "캠프"]; // 문자 담기
```

## [배열 특징(index)]

- `index` : 배열에 있는 각 데이터의 위치  
  ❗️ (주의) **index는 0부터 시작**, 배열은 1부터 시작하지 않고, 0부터 시작한다는 것에 주의 ❗️
- `length` : 배열의 길이, index와 다르게 1부터 시작

## [배열의 메서드와 속성]

- 일종의 기능일 경우 메서드 뒤에 소괄호()가 붙음

```javascript
// 배열 만들기
const blanks = []; // 비어있는 배열
const numbers = [2, 10, 7, 3.3]; // 숫자들로 이루어진 배열
const classmates = ["철수", "영희", "훈이"]; // 문자들로 이루어진 배열

// 배열의 길이 구하기 _ length
classmates.length; // 3

// 배열의 값 꺼내기
classmates[0]; // "철수"
classmates[1]; // "영희"

// 배열의 맨 뒤에 추가하기 _ push
classmates.push("민지"); // ["철수", "영희", "훈이", "민지"]

// 배열의 맨 마지막 삭제하기 _ pop
classmates.pop(); // ["철수", "영희", "훈이"]

// 배열의 요소 정렬하기, 거꾸로 뒤집기 _ sort
classmates.sort(); // ["영희", "철수", "훈이"]

// 배열이 가지고있는 데이터 확인하기 _ includes
classmates.includes("철수"); // true
classmates.includes("영구"); // false
```

```javascript
const classmates1 = ["철수", "영희", "훈이"];
const classmates2 = ["민지", "민수"];

// 배열 2개 연결하기 _ concat
classmates1.concat(classmates2); // ["철수", "영희", "훈이", "민지", "민수"]

// 배열을 문자로 만들기 _ join
classmates.join(", "); // 철수, 영희, 훈이
classmates.join("와 "); // 철수와 영희와 훈이

// 배열 분리하기 _ splice
const classmates = ["철수", "영희", "훈이"];
classmates.splice(0, 1); // ["철수"]

// 배열에서 원하는 요소만 뽑아내기 _ filter
classmates.filter((data) => data === "영희"); // ["영희"]
classmates.filter((data) => data !== "영희"); // ["철수", "훈이"]

// 배열에서 모든 요소 변경하기 _ map
classmates.map((data) => data + "어린이"); // ["철수어린이", "영희어린이", "훈이어린이"]
```

---

<!-- precamp/class/03-javascript/연습-02-email-split.js 참고 -->

# #문자열

- 문자열도 배열과 같이 메서드를 이용할 수 있고, `index`를 이용해 요소를 가지고 올 수 있음

## [문자열의 메서드와 속성]

```javascript
// 문자열(배열)
const classmates1 = "철수";
classmates1[0]; // "철"
classmates1[1]; // "수"

// 문자열 쪼개기
const classmates2 = "철수&영희";
classmates2.split("&"); // ["철수", "영희"]

// 문자열 양쪽 공백 제거하기
const classmates3 = " 철수 & Milk ";
classmates3.trim(); // "철수 & Milk"

// 문자열 대소문자 변환하기
classmates3.toUpperCase(); // "철수 & MILK"
classmates3.toLowerCase(); // "철수 & milk"

// 문자열에 빈칸 채우기
const chulsooNumber = "1234";
chulsooNumber.padStart(10, "0"); // "0000001234"
chulsooNumber.padEnd(10, "0"); // "1234000000"
```

### 💡 실무 예시

#### 1. `split()` 기능

- 아이디/이메일을 `rosa.ka**@gmail.com`처럼 \*\*마스킹해야 할 때 사용

#### 2. `toUpperCase, toLowerCase` 기능

- 사용자가 검색 기능을 사용할 때 문자열의 `toUpperCase, toLowerCase` 사용
- 컴퓨터에 저장된 단어, 내가 찾을 단어를 모두 소문자 또는 대문자로 변경하고 찾아냄

---

<!-- precamp/class/03-javascript/02-object-array.js 참고
 precamp/class/03-javascript/연습-03-object.js 참고
 precamp/class/03-javascript/연습-04-object-in-arr.js 참고 -->

# #객체

## 객체란?

> 객체는 다양한 데이터를 하나의 그룹으로 묶는 보따리와 같음  
> 다양한 데이터를 하나로 묶기 위해서, 각각의 데이터를 키와 값으로 연결

- `{}`중괄호 안에 데이터를 넣고 `,`로 각 데이터를 구분

```javascript
const profile = {
  name: "홍길동",
  age: 50,
  height: 165,
};
```

- 값은 비어있을 수 있으나, 키는 비어있을 수 없음
- 빈 객체, 숫자 값, 문자열 값 넣을 수 있음
- 키에는 따옴표를 적지 않음

### [객체에 담긴 값(Value)을 가져오는 방법]

- 변수명.KEY -> `profile.name`
- 변수명["KEY"] -> `profile["school"]`

## [객체와 배열 함께 쓰기]

```javascript
// 객체들을 배열에 담아서 선언하기
const classmates = [
  {
    name: "철수", // 1번째 객체
    age: 8,
    school: "다람쥐초등학교",
  },
  {
    name: "영희", // 2번째 객체
    age: 8,
    school: "다람쥐초등학교",
  },
  {
    name: "훈이", // 3번째 객체
    age: 7,
    school: "토끼초등학교",
  },
];

// 위 객체들을 깔끔하게 한줄로 적기
const classmates = [
  { name: "철수", age: 8, school: "다람쥐초등학교" },
  { name: "영희", age: 8, school: "다람쥐초등학교" },
  { name: "훈이", age: 7, school: "토끼초등학교" },
];

// 배열안의 객체에서 뽑아내기
classmates[0].name; // 철수
classmates[0].age; // 8
classmates[0].school; // 다람쥐초등학교
```

### 💡 실무 예시

#### 1. 배열에 담긴 객체를 언제 사용하는지

- 페이스북 또는 카카오톡 등에서 친구 목록이나 여러 속성이 있는 리스트를 보여줄 때 사용
- 예를 들어 **실시간 검색어와 같은 창 띄울 때 사용**
