---
layout: post
title: "[SPRINGBOOT] 게시판 만들어보기"
date: 2024-09-13
tags: [SPRINGBOOT]
categories: SPRINGBOOT
---

### 개발환경

- IntelliJ IDEA Community Edition 2023.3.3
- Amazon Corretto 21
- mysql community server 8.0
- spring boot 3.1.8
- mybatis framework
- thymeleaf

---

### dependencies

- Spring Web
  - MVC 패턴 구현을 위한
- Lombok
- thymeleaf
- Spring Boot DevTools
  - 코드 수정 시 자동으로 서버 재시작   
##### DB 연동시
- MyBatis Framework
- MySQL Driver

---

#### 0. 프로젝트 세팅

1. file > new > project from existing sources에서 build.gradle 열기
2. file > project structure에서 jdk 버전 확인
3. 실행해보기

---

#### 1. 시작페이지 출력

1. HomeController 추가
    ```java
    @Controller
    public class HomeController {

        @GetMapping("/")
        public String index() {
            return "index";
        }
    }
    ```

2. index.html 추가

    > *오류*   
    index.html 추가했는데 화면 안뜸

    - thymeleaf 관련 의존성 추가해야 함
      - build.gradle에서 dependencies에 코드 추가 후 refresh
      ```java
      implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
      ```

3. file > settings > compiler > build project automatically 체크
4. 위와 같이 settings에서 advanced settings > allow auto-make to ~~~~ 체크
    - 코드 수정 시 자동으로 서버 재시작(DevTools)

---

#### 2. Controller, Service 클래스

1. dto, repository, service 패키지 및 내부 클래스 생성
2. ***BoardDTO*** : 용어 정리
3. file > settings > plugins > lombok 설치
4. BoardDTO : @Getter, @Setter, @ToString 추가
5. 생성자 주입 @RequiredArgsConstructor : BoardController, BoardService에 추가

---

#### 3. 게시글 작성화면 생성

```java
//BoardController
@GetMapping("/save")
    public String save() {
        return "save";
    }
```

- save.html 추가

---

#### 4. 게시글 작성 데이터 전송

```java
//BoardController
@PostMapping("/save")
    public String save(BoardDTO boardDTO) {
        System.out.println("boardDTO = " + boardDTO);
        return "index";
    }
```

- 데이터 잘 전송되는지 확인

---

#### 5. mybatis 세팅

```java
//build.gradle
	implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3'
	runtimeOnly 'com.mysql:mysql-connector-j'
```

1. dependencies 추가
2. application.properties -> application.yml로 이름 변경
    ```java
    # server port
      server:
        port: 8080

    # database
      spring:
        datasource:
          driver-class-name: com.mysql.cj.jdbc.Dirver
          url: jdbc:mysql://localhost:3306/db_board?serverTimezone=UTC&characterEncoding=UTF-8
          username: user_sohee
          password: 1234

    # mybatis
      mybatis:
        mapper-locations: classpath:mapper/*.xml //쿼리문 담고 있는 파일
        config-location: classpath:mybatis-config.xml //mybatis 관련 설정 파일
    ```
3. mybatis-config.xml 생성
4. mapper > board-mapper.xml 생성

---

#### 6. 게시글 데이터 DB 저장

> mysql 설치   
https://codingrecipe1.tistory.com/category/%EC%84%A4%EC%B9%98%20%EB%B0%8F%20%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0/Mysql