---
layout: post
title: "[SPRING] 환경세팅"
date: 2024-08-23
tags: [SPRING, JAVA]
categories: SPRING
---

https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-template-engines - 스프링부트 매뉴얼

---

### thymeleaf 템플릿 엔진

thymeleaf 공식 사이트 : https://www.thymeleaf.org/

```java
@Controller
public class HelloController {
    @GetMapping("hello")
    public String hello(Model model) {
        model.addAttribute("data", "hello!!");
        return "hello";
    }
}
```

- 컨트롤러에서 리턴 값으로 문자를 반환하면 viewResolver가 화면을 찾아서 처리
  - 스프링 부트 템플릿엔진 기본 viewName 매핑
  - resources:templates/ +{ViewName}+ .html

---

### 빌드하고 실행하기

콘솔로 이동

1. ./gradlew build
2. cd build/libs
3. java -jar hello-spring-0.0.1-SNAPSHOT.jar
4. 실행 확인

---

### 정적 컨텐츠

https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content : 스프링부트 정적 컨텐츠 기능

- 파일 그대로 반환

---

### MVC와 템플릿 엔진

- MVC : Model, View, Controller

'Controller'

```java
@GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model) {
        model.addAttribute("name", name);
        return "hello-template";
    }
```

'View'

```java
<html xmlns:th="http://www.thymleaf.org">
<body>
  <p th:text="'hello ' + ${name}">hello! empty</p>
</body>
</html>
```

- Copy>Absolute Path -> 주소창에 붙여넣기하면 기본 html 형식의 내용이 뜸
- build 후 실행 시에는 th:text로 치환됨

실행 : http://localhost:8080/hello-mvc?name=spring!

---

### API

@ResponseBody 문자 반환

```java
@GetMapping("hello-string")
@ResponseBody
    public String helloString(@RequestParam("name") String name) {
        return "hello " + name;
    }
```

- @ResponseBody를 사용하면 viewResolver를 사용하지 않음
- 문자 내용을 직접 반환

실행 : http://localhost:8080/hello-string?name=spring

@ResponseBody 객체 반환

```java

```
