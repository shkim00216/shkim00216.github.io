---
layout: post
title: "[SPRINGBOOT] 게시판 만들어보기 - 02"
date: 2024-09-23
tags: [SPRINGBOOT]
categories: SPRINGBOOT
---

https://congsong.tistory.com/category/Spring%20Boot 참고

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
  spring.application.name=miniProject

  # port
  server.port=8086

  # JSP view
  spring.mvc.view.prefix=/WEB-INF/views/
  spring.mvc.view.suffix=.jsp

  # devtools
  spring.devtools.livereload.enabled=true
  spring.devtools.restart.enabled=false

  # encoding
  server.servlet.encoding.charset=UTF-8
  server.servlet.encoding.enabled=true
  server.servlet.encoding.force=true

  # MySQL8.0
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  spring.datasource.hikari.jdbc-url=jdbc:mysql://localhost:3306/notice?useSSL=false&characterEncoding=UTF-8&serverTimeZone=UTC
  spring.datasource.username=root
  spring.datasource.password=1234
  spring.datasource.hikari.connection-test-query=SELECT NOW() FROM dual

  # mybatis
  mybatis.mapper-locations=classpath:classpath:/mapper/**/*.xml
  #mybatis.configuration.map-underscore-to-camel-case=true
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

#### DB 연동 및 빈 설정, 단위테스트

```java
//단위테스트 코드
@SpringBootTest
public class NoticeApplicationTests {
	@Autowired
    private ApplicationContext context;

    @Autowired
    private SqlSessionFactory sessionFactory;

    @Test
    void contextLoads() {
    }

    @Test
    public void testByApplicationContext() {
        try {
            System.out.println("=========================");
            System.out.println(context.getBean("sqlSessionFactory"));
            System.out.println("=========================");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testBySqlSessionFactory() {
        try {
            System.out.println("=========================");
            System.out.println(sessionFactory.toString());
            System.out.println("=========================");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

#### CRUD 쿼리 작성

- DAO(Data Access Object) 패턴
  - MyBatis가 도입되기 전 일반적으로 사용
  - DAO 클래스에 데이터베이스 접근 로직과 SQL 쿼리를 직접 작성한 후, 해당 클래스에 @Repository를 선언하여 DB와 통신하는 클래스임을 명시
- MyBatis는 SQL 쿼리를 XML 파일에 따로 분리하여 작성하는 방식 사용
  - Mapper 파일의 메서드와 XML Mapper 파일에 동일한 id를 가진 SQL 쿼리를 찾아 실행

---

#### 게시글 등록 기능 구현

- 게시글 서비스(Service) 클래스 생성
  - 서비스는 MVC 패턴 중 M(Model)에 해당되며, 사용자(고객)의 요구사항을 처리하는 로직을 실행하는 핵심 영역
- @RequiredArgsConstructor란?
  - 해당 어노테이션은 클래스 내에 final로 선언된 모든 멤버 변수의 생성자를 만들어줌

```java
@Test
void save() {
  PostRequest params = new PostRequest();
  params.setTitle("게시글 제목 테스트");
  params.setContent("게시글 내용 테스트");
  params.setWriter("tester");

  Long id = noticeService.savePost(params);
  System.out.println("생성된 게시글 ID : " + id);
}
//id 값이 null이 뜨는 이유 : 현재 PK인 ID 값이 auto_increment에 의해 자동으로 1씩 증가하여 생성되는데, 이렇게 생성된 PK를 객체에 담아주려면 MyBatis의 "useGeneratedKeys" 기능 이용
```

```xml
<!-- 게시글 저장 -->
<insert id="save" parameterType="com.project.miniProject.notice.vo.PostRequest" useGeneratedKeys="true" keyProperty="id">
  insert into notice_tb (<include refid="noticeColumns"></include>) values (#{uid}, #{title}, #{content}, #{writer}, now())
</insert>
<!-- useGeneratedKeys true 설정 시 게시글의 PK가 Request객체에 저장, keyProperty에 선언된 id에 값이 매핑 -->
```

---

#### 게시글 목록 조회 기능 구현

- JSTL 코드 추가 시 에러 발생

```gradle
//스프링부트 3.0 이상부터는 다음과 같이 코드 추가
implementation 'jakarta.servlet:jakarta.servlet-api'
implementation 'jakarta.servlet.jsp.jstl:jakarta.servlet.jsp.jstl-api'
implementation 'org.glassfish.web:jakarta.servlet.jsp.jstl'
```

- 테이블 형태로는 뜨는데 값이 뜨지 않는 오류 발생

  https://blog.naver.com/simpolor/221301210063

```java
@Getter
public class PostResponse {

	//게시글 응답 클래스
	private Long id;
	private String title;
	private String content;
	private String writer;
	private Date regDate; //Date로 객체 생성해줘야 함
}
//table 컬럼명과 객체명 맞춰줘야 데이터 값 들어감, LocalDateTime 사용 시 jsp에서 설정 못하므로 백단에서 따로 설정해줘야 함
```

- jsp 코드로 변환

```jsp
//noticeList.jsp
<c:if test="${not empty posts}">
  <c:forEach var="row" varStatus="status" items="${posts}">
    <tr>
      <td><input type="checkbox" /></td>
      <td>${row.id}</td>
      <td>
        <a href="<c:url value='/post/view.do'/>?id=${row.id}"
          >${row.title}</a
        >
      </td>
      <td>${row.writer}</td>
      <!-- 날짜 포맷팅 -->
      <td>
        <fmt:formatDate
          value="${row.regDate}"
          pattern="yyyy-MM-dd"
        />
      </td>
    </tr>
  </c:forEach>
</c:if>
```

---

#### 게시글 상세정보 조회 및 수정

- 상세 페이지 확인 시 오류 발생

```java
//게시글 상세 페이지
@GetMapping("/notice/view.do")
public String openPostView(@RequestParam("id") final Long id, Model model) {
  PostResponse post = noticeService.findPostById(id);
  model.addAttribute("post", post);
  return "notice/noticeView";
} //@RequestParam("id")에 매개변수값 넣어줘야 정상 작동
```

- noticeInsert.jsp javascript 코드 오류 발생

```jsp
//noticeInsert.jsp
<script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.13/dayjs.min.js"></script> //dayjs 라이브러리 추가
<script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.13/plugin/customParseFormat.min.js"></script>
<script>
  dayjs.extend(dayjs_plugin_customParseFormat);
</script>
<script type="text/javascript">
  window.onload = () => {
    renderPostInfo();
  };

  // 게시글 상세정보 렌더링
  function renderPostInfo() {
    const post = "${post}";

    // 문자열에서 'PostResponse('와 ')' 제거
    const postFormatted = post
      .replace("PostResponse(", "")
      .replace(")", "");

    if (!post) {
      initCreatedDate();
      return false;
    }

    // 각 속성 값을 파싱하여 객체 생성
    const postParts = postFormatted.split(", ").reduce((acc, part) => {
      const [key, value] = part.split("=");
      acc[key.trim()] = value.trim();
      return acc;
    }, {});
    console.log(postParts);

    const form = document.getElementById("saveForm");
    const fields = ["id", "title", "content", "writer", "regDate"];

    fields.forEach((field) => {
      form[field].value = postParts[field];
    });
  }

  // 등록일 초기화
  function initCreatedDate() {
    document.getElementById("regDate").value = dayjs().format("YYYY-MM-DD");
  }

  // 게시글 저장(수정)
  function savePost() {
    const form = document.getElementById("saveForm");
    const fields = [form.title, form.writer, form.content];
    const fieldNames = ["제목", "작성자", "내용"];

    for (let i = 0; i < fields.length; i++) {
      isValid(fields[i], fieldNames[i]);
    }

    document.getElementById("saveBtn").disabled = true;
    // form.noticeYn.value = form.isNotice.checked;
    const post = "${post}";
    if (!post) {
      form.action = "/notice/save.do";
    } else {
      form.action = "/notice/update.do";
    }
    form.submit();
  }

  function isValid(field, name) {
    if (!field.value.trim()) {
      alert(name + "을(를) 입력해 주세요.");
      field.focus();
      throw new Error(name + "이(가) 입력되지 않았습니다.");
    }
  }
</script>
//post 값이 제대로 나오지 않아 코드 수정
//게시글 수정 및 저장 시에 action 코드 수정
//아직 수정 시에 값 렌더링 후 날짜값 포맷 변경 불가...
```

```jsp
//noticeInsert.jsp
fields.forEach((field) => {
  if (field === "regDate") {
    da = postParts[field];
    const fieldFormatted = da.replace("KST", "");
    form[field].value = dayjs(fieldFormatted).format("YYYY-MM-DD");
  } else {
    form[field].value = postParts[field];
  }
});
//위에서 못한 날짜값 포맷 성공함...!!
```

---

#### 게시글 삭제 구현

```jsp
//noticeView.jsp
<script type="text/javascript">
  // 게시글 삭제
  function deletePost() {
    const id = "${post.id}";

    if (!confirm(id + "번 게시글을 삭제할까요?")) {
      return false;
    }

    const formHtml = `
          <form id="deleteForm" action="${pageContext.request.contextPath}/notice/delete.do" method="post">
              <input type="hidden" id="id" name="id" value="${post.id}" />
          </form>
      `;
    const doc = new DOMParser().parseFromString(formHtml, "text/html");
    const form = doc.body.firstChild;
    document.body.append(form);
    document.getElementById("deleteForm").submit();
  }
</script>
```

---

#### 컨트롤러 Alert 메시지 처리

- messageRedirect.jsp 코드 수정

```jsp
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Map.Entry" %>
//jsp 페이지에 임포트 추가
```

---

#### 로그 출력

- 인터셉트 로그 출력은 완료했으나, sql 쿼리 로그가 찍히지 않음
  - log4j2 로그 설정에 대해 더 알아볼 것 !

---

#### 문제 해결

1. sts 환경에서 Lombok 설치

   https://m.blog.naver.com/daka1122/222837239050

2. 이클립스 자동 import 설정

   https://hianna.tistory.com/652
