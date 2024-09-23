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

  # MySQL8.0
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

- @RequestMapping : url의 mapping의 정보를 받는 것(GET, POST 둘다 받으나 정확히 명시하는 것이 좋음)

---

#### 테이블 생성

mysql 테이블 생성 후

- JUnit 라이브러리 추가 방법
  - 프로젝트 오른쪽 클릭 > Build Path > Configure Build Path
  - Libraries > Classpath > JUnit 라이브러리 추가
  - test 패키지에서 오른쪽 클릭 > New > Other... > JUnit Test Case 생성

```java
//NoticeBatch.java
class NoticeBatch {

	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt = null;
	int cnt = 0;

	public static final String DRIVER = "com.mysql.cj.jdbc.Driver";
	public static final String URL = "jdbc:mysql://localhost:3306/notice";
	public static final String USERID = "root";
	public static final String USERPW = "1234";

	public static final String SQL_WRITE_INSERT =
			"INSERT INTO notice_tb"
				+ "(nt_title, nt_author)"
				+ "VALUES(?, ?)";

	@Test
	void genDate() {
		try {
			Class.forName(DRIVER);
			conn = DriverManager.getConnection(URL, USERID, USERPW);

			//Data 삽입
			pstmt = conn.prepareStatement(SQL_WRITE_INSERT);

			int num = 10;
			for (int i=0; i<num; i++) {
				pstmt.setString(1, String.format("제목%03d", i));
				pstmt.setString(2, String.format("작성자%03d", i));
				cnt += pstmt.executeUpdate();
			}
			System.out.println(cnt + "개의 데이터 INSERT");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (stmt != null) stmt.close();
				if (pstmt != null) pstmt.close();
				if (conn != null) conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
```

---

#### DTO, DAO, Controller 생성

- DTO(Data Transfer Object) 생성

  - DAO 등과 연동하여 데이터를 실어나르는 객체, 필요한 객체만큼 작성
  - VO(Volumne Object)라고도 하는데, VO는 read only/immutable 속성을 가짐
  - 웹 개발 시 클래스 필드명, DB 필드명, form의 name명은 일치시켜 주어야 편리함

- DAO(Data Access Object) 생성

  - 특정 데이터 리소스(ex. DB)에 접속하여 트랜잭션 등을 전담하는 객체
  - DTO 객체를 통해 데이터 연결
  - 일반적으로 데이터 리소스별로 작성하거나 기능별(게시판용, 회원관리용 등)로 작성
  - 데이터베이스와 관련된 부분은 따로 관리하는게 좋음

- Controller(spring MVC)
  - 요청 URL에 따라 각 메서드를 매핑하고, 비즈니스 로직을 처리한 후 결과를 뷰로 반환

---

#### 전체 글 목록 구현

---

#### 문제 해결

1. sts 환경에서 Lombok 설치

   https://m.blog.naver.com/daka1122/222837239050

2. 이클립스 자동 import 설정

   https://hianna.tistory.com/652
