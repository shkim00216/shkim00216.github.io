---
layout: post
title: "[JAVA] 라이브러리와 모듈"
date: 2024-09-06
tags: [JAVA]
categories: JAVA
---

#### 1. 라이브러리

> 라이브러리 : 프로그램 개발 시 활용할 수 있는 클래스와 인터페이스들을 모아놓은 것   
> JAR 압축파일(.jar)형태로 존재

- 콘솔에서 프로그램 실행할 경우
  - java 명령어를 실행할 때 -classpath로 제공
  - CLASSPATH 환경 변수에 경로 추가
- 이클립스 프로젝트에서 실행할 경우
  - 프로젝트의 Build Path에 추가

##### [my_lib 라이브러리 프로젝트 생성]

1. JAR file로 생성
2. Build Path로 불러오기
3. 자동 import 되어 외부 class 사용 가능

---

#### 2. 모듈

> 모듈 : 패키지 관리 기능까지 포함된 라이브러리   
> 모듈은 일부 패키지를 은닉하여 접근할 수 없게끔 할 수 있음

- 의존관계를 쉽게 파악 가능
- 모듈별로 개발하고 조립 -> 재사용성 및 유지보수에 유리

```java
//my_module_a > module-info.java
module my_module_a {
	exports pack1;
	exports pack2;
} //모듈이 가지고 있는 패키지를 외부에서 사용할 수 있도록 노출시키는 역할
```

```java
//my_application_2 > module-info.java
module my_application_2 {
	requires my_module_a;
	requires my_module_b;
} //모듈에 대한 의존 설정
```

- 의존 설정 후 경로 설정까지 해줘야 함(Build Path 설정)

---

#### 3. 모듈 배포용 JAR 파일

(1번과 동일)
1. JAR file로 생성
2. Build Path로 불러오기
3. 자동 import 되어 외부 class 사용 가능

---

#### 4. 패키지 은닉

##### [패키지 은닉 이유]

- 모듈 사용 방법 통일
  - 모듈 외부에서 패키지2와 3을 사용하지 못하도록 막고, 패키지1로 사용 방법 통일
- 쉬운 수정
  - 모듈 성능 향상을 위해 패키지2와 3을 수정하더라도 모듈 사용 방법이 달라지지 않기 때문에 외부에 영향을 주지 않음

> 주석 처리로 진행

---

#### 5. 전이 의존

```java
module my_module_a {
  exports pack1;
  requires transitive my_module_b;
} //의존 설정 전이
```

---

#### 6. 집합 모듈

> 집합 모듈 : 여러 모듈을 모아놓은 모듈   
> 모듈들을 일일이 requires하는 번거로움을 피하고 싶을 때 생성   
> 자체적인 패키지를 가지지 않고, 모든 기술자에 전이 의존 설정만 함

```java
module my_module {
  requires transitive my_module_a;
  requires transitive my_module_b;
}
```

---

#### 7. 리플렉션 허용

> 리플렉션 : 실행 도중에 타입(클래스, 인터페이스 등)을 검사하고 구성 멤버를 조사하는 것   
> 경우에 따라서는 은닉된 패키지도 리플렉션을 허용해야 할 때가 있음

1. 모듈 전체를 리플렉션 허용
    ```java
    open module 모듈명 {
      ...
    }
    ```

2. 지정된 패키지에 대해 리플렉션 허용
    ```java
    module 모듈명 {
      ...
      opens 패키지1;
      opens 패키지2;
    }
    ```

3. 지정된 패키지에 대해 특정 외부 모듈에서만 리플렉션 허용
    ```java
    module 모듈명 {
      ...
      opens 패키지1 to 외부모듈명, 외부모듈명, ...;
      opens 패키지2 to 외부모듈명;
    }
    ```

---

#### 8. 자바 표준 모듈

> Java 21의 전체 모듈 그래프   
> https://docs.oracle.com/en/java/javase/11/docs/api/java.base/module-summary.html

- java.base : 모든 모듈이 의존하는 기본 모듈
  - java.lang, java.util, java.io 등
- java.se : JDK가 제공하는 모든 모듈을 제공하는 집합 모듈
    ```java
    module my_application {
      requires java.se;
    }
    ```

##### [작은 사이즈의 자바 실행 환경이 필요한 경우]

- 독립 실행형(응용프로그램 + 표준 라이브러리)으로 배포할 경우 표준 라이브러리의 크기가 작을수록 배포 사이즈가 줄어듬
- 제한된 자원만 가지고 있는 소형(임베디드) 기기에는 사이즈가 작은 자바 실행 환경이 필요

---