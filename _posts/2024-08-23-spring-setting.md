---
layout: post
title: "[SPRING] 프로젝트 환경설정"
date: 2024-08-23
tags: [SPRING]
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