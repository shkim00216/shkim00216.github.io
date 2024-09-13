---
layout: post
title: "[SPRINGBOOT] 게시판 만들어보기 - 02"
date: 2024-09-13
tags: [SPRINGBOOT]
categories: SPRINGBOOT
---

#### 개발환경

- Spring Tool Suite 4
- mysql community server 8.0
- spring boot 3.2.9
- mybatis framework
- JSP

---

#### dependencies

- Spring Web
  - MVC 패턴 구현을 위한
- Lombok
- Spring Boot DevTools
  - 코드 수정 시 자동으로 서버 재시작
- MySQL
- mybatis

---

##### 실행 전 참고사항

- 자바 버전 확인
  - preferences > java > installed JREs에서 jdk 버전 확인
- application.properties 추가

  ```properties
  # port
  server.port=8088

  # JSP view
  <!-- jsp 설정 따로 해줘야 함 -->
  spring.mvc.view.prefix=/WEB-INF/views/
  spring.mvc.view.suffix=.jsp

  # encoding
  server.servlet.encoding.charset=UTF-8
  server.servlet.encoding.enabled=true
  server.servlet.encoding.force=true

  # MySQL
  spring.datasource.url=jdbc:mysql://localhost:3306/notice?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
  spring.datasource.username=root
  spring.datasource.password=1234
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  ```

- gradle 따로 refresh 해줌
- JSP 사용 시 폴더 구조 main > webapp > WEB-INT > views에 저장(폴더 구조 확인)

  ```jsp
  <!-- index.jsp -->
  <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NOTICE</title>
  </head>
  <body>
      안녕
  </body>
  </html>
  ```

---

#### 내용 정리

- @RequestMapping : url의 mapping의 정보를 받는 것(GET, POST 둘다 받으나 정확히 명시하는 것이 좋음)
