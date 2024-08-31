---
layout: post
title: "[SPRING] 스프링 웹 개발 기초"
date: 2024-08-28
tags: [SPRING]
categories: SPRING
---

### 1. 정적 컨텐츠

https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content : 스프링부트 정적 컨텐츠 기능

- 파일 그대로 반환

---

### 2. MVC와 템플릿 엔진

- MVC : Model, View, Controller

#### 'Controller'

```java
@GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model) {
        model.addAttribute("name", name);
        return "hello-template";
    }
```

#### 'View'

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

### 3. API

#### @ResponseBody 문자 반환

```java
@GetMapping("hello-string")
@ResponseBody
    public String helloString(@RequestParam("name") String name) {
        return "hello " + name;
    }
```

- @ResponseBody를 사용하면 viewResolver를 사용하지 않음
- 문자 내용을 직접 반환(HTML 코드 없이)

실행 : http://localhost:8080/hello-string?name=spring

#### @ResponseBody 객체 반환

```java
@GetMapping("hello-api")
@ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello();
        hello.setName(name);
        return hello;
    }

    static class Hello {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
```

- 객체가 JSON으로 변환
- @ResponseBody를 사용하면 viewResolver 대신에 HttpMessageConverter가 동작
- 기본 문자처리 : StringHttpMessageConverter
- 기본 객체처리 : MappingJackson2HttpMessageConverter

---