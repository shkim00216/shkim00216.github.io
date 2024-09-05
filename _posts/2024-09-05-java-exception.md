---
layout: post
title: "[JAVA] 예외처리"
date: 2024-09-05
tags: [JAVA]
categories: JAVA
---

#### 1. Exception

> 예외 : 프로그램 실행 중 예기치 못한 사건  
> 예외 처리 : 예외 상황을 미리 예측하고 처리할 수 있음

```java
try {
  ... //수행할 코드, 예외 발생 가능성이 있는 블록
} catch (예외클래스변수명) {
  ... //예외 처리 블록
} finally {
  ... //(생략 가능) 예외 발생 여부에 상관없이 반드시 실행되는 블록
}
```
