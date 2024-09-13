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

#### 0. 프로젝트 세팅

1. file > new > project from existing sources에서 build.gradle 열기
2. file > project structure에서 jdk 버전 확인
3. 실행해보기

---

#### 1. 시작페이지 출력

1. HomeController 추가

   ```java
   //HomeController
   @Controller
   public class HomeController {

       @GetMapping("/")
       public String index() {
           return "index";
       }
   }
   ```

2. index.html 추가

   > _오류_  
   > index.html 추가했는데 화면 안뜸

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
2. **_BoardDTO_** : 용어 정리
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

   ```yml
   # server port
     server:
       port: 8080

   # database
     spring:
       datasource:
         driver-class-name: com.mysql.cj.jdbc.Driver
         url: jdbc:mysql://127.0.0.1:3306/board?serverTimezone=UTC&characterEncoding=UTF-8
         username: root
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

1. controller, service, repository에 save() 메소드 추가

    ```java
    //BoardRepository
    private final SqlSessionTemplate sql;

        public void save(BoardDTO boardDTO) {
            sql.insert("Board.save", boardDTO);
        } //mapper의 namespace.id, 넘길 객체(두 개 이상의 파라미터를 적을 수는 없음 -> 해쉬맵)
    ```

2. mapper에 insert문 작성

    ```xml
    <!-- board-mapper.xml -->
    <insert id="save" parameterType="board">
            insert into board_table(boardTitle, boardWriter, boardPass, boardContents)
                values(#{boardTitle}, #{boardWriter}, #{boardPass}, #{boardContents})
    </insert>
    ```

3. mysql 설치  

    > https://codingrecipe1.tistory.com/category/%EC%84%A4%EC%B9%98%20%EB%B0%8F%20%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0/Mysql

    - 주의사항 : root 비번 설정 시 쉬운걸로 하고, 절대 까먹지 말 것!(귀찮은 일 발생)
    - application.yml 작성 시 오타 주의할 것

    > *오류*   
    > mybatis-config.xml에서 BoardFileDTO가 없어 오류 발생 -> 일단 주석 처리

---

#### 7. 게시글 목록 출력 메서드 구현

- Model : 데이터를 화면으로 가져갈 수 있도록 전달해주는 객체

```java
//BoardController
@GetMapping("/list")
    public String findAll(Model model) {
        List<BoardDTO> boardDTOList = boardService.findAll();
        model.addAttribute("boardList", boardDTOList);
        return "list";
    }
```

```xml
<!-- board-mapper.xml -->
<select id="findAll" resultType="board">
        select * from board_table order by id desc
</select>
```
- select -> resultType 필수   
- mapper.xml 작성 시 오타나 오류를 잡아주지 않으니 주의

---

#### 8. 게시글 목록 출력 화면 구현

```html
<!-- list.html -->
<html lang="en" xmlns:th="http://www.thymeleaf.org"> <!-- 타임리프 형식 -->
  <tr th:each="board: ${boardList}"> <!-- 반복문(foreach) 반복변수:반복대상(controller의 attributename과 동일하게) -->
    <td th:text="${board.id}"></td> <!-- 이너 텍스트 형태로 여기 값을 보여줌(DTO의 필드 이름 따라감) -->
    <td th:text="${board.boardTitle}"></td>
    <td th:text="${board.boardWriter}"></td>
    <td th:text="${board.createdAt}"></td>
    <td th:text="${board.boardHits}"></td>
  </tr>
```

```xml
<!-- board-mapper.xml -->
<select id="findAll" resultType="board">
        select id, boardTitle, boardWriter, boardHits, date_format(createdAt, "%Y-%m-%d") as createdAt
        from board_table order by id desc
</select> <!-- date_format으로 형식 변환(년월일) -->
```

---

#### 9. 게시글 조회 클래스 메서드 구현

```java
//BoardController
// /10, /1 (n번 게시글)
@GetMapping("/{id}")
public String findById(@PathVariable("id") Long id, Model model) {
    //조회수 처리
    boardService.updateHits(id);

    //상세내용 가져옴
    BoardDTO boardDTO = boardService.findById(id);
    model.addAttribute("board", boardDTO);
    System.out.println("boardDTO = " + boardDTO);
    return "detail";
}
```

- 번호가 계속 바뀌므로 중괄호 처리 -> id란 이름으로 받겠다   
- 조회수 처리 고민 -> 게시글 보면 조회수 올라가야 함

```java
//BoardRepository
public BoardDTO findById(Long id) {
        return sql.selectOne("Board.findById", id);
} //하나 처리 시 selectOne, 여러개 처리 시 selectList
```

```xml
<!-- board-mapper.xml -->
<!-- update, select 쿼리 추가 -->
<update id="updateHits" parameterType="Long">
    update board_table set boardHits=boardHits+1 where id=#{id}
</update>
<select id="findById" parameterType="Long" resultType="board">
    select id, boardTitle, boardWriter, boardPass, boardContents, boardHits,
    date_format(createdAt, "%Y-%m-%d %H:%i:%s") as createdAt, fileAttached
    from board_table where id=#{id}
</select>
```

---

#### 10. 게시글 조회 화면 구현

```html
<!-- detail.html -->
<!-- 버튼 추가 -->
<button onclick="listReq()">목록</button>
<button onclick="updateReq()">수정</button>
<button onclick="deleteReq()">삭제</button>

<!-- 함수 작성 -->
<script th:inline="javascript">
  const listReq = () => {
      location.href = "/list";
  }
  const updateReq = () => {
      location.href = `/update/[[${board.id}]]`;
  }
  const deleteReq = () => {
      location.href = `/delete/[[${board.id}]]`;
  }
</script>
```

```html
<!-- list.html -->
<td>
    <a th:text="${board.boardTitle}" th:href="@{|/${board.id}|}"></a>
</td> <!-- 경로 상에 파라미터를 같이 써야 하는 경우 @{||} -->
```

---

#### 11. 게시글 수정 클래스 메서드 구현

```java
//BoardController
@GetMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, Model model) {
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("board", boardDTO);
        return "update";
    }

@PostMapping("/update/{id}")
    public String update(BoardDTO boardDTO, Model model) {
        boardService.update(boardDTO);
        BoardDTO dto = boardService.findById(boardDTO.getId()); //alt + Enter 좌변 자동 생성
        model.addAttribute("board", dto);
        return "detail";
    }
```

```java
//BoardController
@PostMapping("/save")
    public String save(BoardDTO boardDTO) {
        System.out.println("boardDTO = " + boardDTO);
        boardService.save(boardDTO);
        return "redirect:/list"; //list 불러오게 수정
    }
```

```xml
<!-- board-mapper.xml -->
<update id="update">
        update board_table set boardTitle=#{boardTitle}, boardContents=#{boardContents} where id=#{id}
</update>
```

---

#### 12. 게시글 수정 화면 구현

```html
<!-- update.html -->
 <form th:action="@{|/update/${board.id}|}" method="post" name="updateForm">
  <!-- th:action 경로 맞추기 -->
    <input type="hidden" name="id" th:value="${board.id}"> <!-- id값 hidden 추가 - mapper에서 활용 위하여 -->
    writer: <input type="text" name="boardWriter" th:value="${board.boardWriter}" readonly><br> <!-- th:value 값을 먼저 보여줌, 수정 안되어야 해서 readonly -->
    title: <input type="text" name="boardTitle" th:value="${board.boardTitle}"><br>
    pass: <input type="text" name="boardPass" id="board-pass"><br>
    contents: <textarea name="boardContents" cols="30" rows="10" th:text="${board.boardContents}"></textarea><br>
    <input type="button" value="수정" onclick="board_update()"> <!-- 버튼을 이용하여 함수를 통해 비번 검증 후 넘김 -->
</form>

<script th:inline="javascript"> /* 모델 값 사용 시 th:inline 필요 */
    const board_update = () => {
        const boardPass = document.getElementById("board-pass").value;
        const passDB = [[${board.boardPass}]]; /* js에서 모델값 표현 */
        if (boardPass == passDB) {
            updateForm.submit(); /* form 태그의 name 값과 동일 */
        } else {
            alert("비밀번호가 틀립니다!!");
        }
    }
</script> <!-- 비밀번호 검증 -->
```

---

#### 13. 게시글 삭제 기능 구현

```java
//BoardController
@GetMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        boardService.delete(id);
        return "redirect:/list";
    }
```

```xml
<!-- board-mapper.xml -->
<delete id="delete" parameterType="Long">
        delete from board_table where id=#{id}
</delete>
```

---

#### 14. 파일첨부 메서드 구현

- BoardDTO, BoardFileDTO 파일 필드 추가

```java
//BoardDTO
private int fileAttached; //파일추가됐는지
private MultipartFile boardFile; //게시글 작성 시 파일 자체를 담기 위한 필드
```

```java
//BoardFileDTO
@Getter
@Setter
@ToString
public class BoardFileDTO {
    private Long id;
    private Long boardId; //어떤 게시물에 포함된 파일인지
    private String originalFileName; //원본 파일
    private String storedFileName; //데이터 추가한 파일 - 파일 이름이 중복되면 구분어려워 데이터 수정 필요
}
```

```java
//BoardService
public void save(BoardDTO boardDTO) throws IOException {
    if (boardDTO.getBoardFile().isEmpty()) {
        //파일 없음
        boardDTO.setFileAttached(0);
        boardRepository.save(boardDTO);
    } else {
        //파일 있음
        boardDTO.setFileAttached(1);
        //게시글 저장 후 id값 활용을 위해 리턴 받음
        BoardDTO savedBoard = boardRepository.save(boardDTO);
        //파일만 따로 가져오기
        MultipartFile boardFile = boardDTO.getBoardFile();
        //파일 이름 가져오기
        String originalFilename = boardFile.getOriginalFilename();
        System.out.println("originalFilename = " + originalFilename);
        //저장용 이름 만들기
        System.out.println(System.currentTimeMillis()); //1970.01부터 몇 밀리초가 지났는지 알려주는 메서드
        String storedFileName = System.currentTimeMillis() + "-" + originalFilename;
        System.out.println("storedFileName = " + storedFileName);
        //BoardFileDTO 세팅
        BoardFileDTO boardFileDTO = new BoardFileDTO();
        boardFileDTO.setOriginalFileName(originalFilename);
        boardFileDTO.setStoredFileName(storedFileName);
        boardFileDTO.setBoardId(savedBoard.getId());
        //파일 저장용 폴더에 파일 저장 처리
        String savePath = "C:/workspace/study/board_study/src/main/resources/file/" + storedFileName; //file/ 뒤를 꼭 /로 막아주어야 함
        boardFile.transferTo(new File(savePath)); //transferTo 전달 메서드
        //board_file_table 저장 처리
        boardRepository.saveFile(boardFileDTO);
    }
}
```

- repository, mapper 수정 및 추가
  - mapper에 fileAttached 관련 내용 전체 추가해야 함

```java
//BoardRepository
public BoardDTO save(BoardDTO boardDTO) {
    sql.insert("Board.save", boardDTO);
    return boardDTO;
}
```

- mybatis-config.xml에 boardFile 추가

```xml
<!-- board-mapper.xml -->
<insert id="save" parameterType="board" useGeneratedKeys="true" keyProperty="id">
    insert into board_table(boardTitle, boardWriter, boardPass, boardContents, fileAttached)
        values(#{boardTitle}, #{boardWriter}, #{boardPass}, #{boardContents}, #{fileAttached})
</insert> <!-- id 값 포함된 dto 리턴 -->
```

- controller, service에 throws 예외던지기 추가
- mysql에 board_file_table 추가

---

#### 15. 파일조회 메서드 구현

```java
//BoardController
@GetMapping("/{id}")
    public String findById(@PathVariable("id") Long id, Model model) {
        //조회수 처리
        boardService.updateHits(id);

        //상세내용 가져옴
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("board", boardDTO);
        System.out.println("boardDTO = " + boardDTO);
        if (boardDTO.getFileAttached() == 1) {
            BoardFileDTO boardFileDTO = boardService.findFile(id);
            model.addAttribute("boardFile", boardFileDTO);
        }
        return "detail";
    }
```

- service, repository에 findFile() 추가

```java
//BoardRepository
public BoardFileDTO findFile(Long id) {
    return sql.selectOne("Board.findFile", id);
}
```

- mapper에 select 추가

---

#### 16. 파일조회 화면 구현

- WebConfig 파일 생성

```java
@Configuration //설정을 하는 
public class WebConfig implements WebMvcConfigurer {
    private String resourcePath = "/upload/**"; //view에서 사용할 경로
    private String savePath = "file:///C:/workspace/study/board_study/src/main/resources/file/"; //실제 파일 저장 경로

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(resourcePath)
                .addResourceLocations(savePath);
    }
}
```

```html
<!-- save.html -->
<form action="/save" method="post" enctype="multipart/form-data"> <!-- 파일타입 추가로 인해 -->
  제목: <input type="text" name="boardTitle"><br>
  작성자: <input type="text" name="boardWriter"><br>
  비밀번호: <input type="text" name="boardPass"><br>
  내용: <textarea name="boardContents" cols="30" rows="10"></textarea><br>
  파일: <input type="file" name="boardFile"><br> <!-- DTO랑 맞춰서 사용 -->
  <input type="submit" value="작성">
</form>
```

```html
<!-- detail.html -->
<tr th:if="${board.fileAttached == 1}"> <!-- if - 파일 있으면 보여줘 -->
    <th>image</th>
    <td>
      <img th:src="@{|/upload/${boardFile.storedFileName}|}" alt="" width="200" height="200"> <!-- webconfig에서 정의한 경로 -->
    </td>
  </tr>
```

> *오류*   
> 여러 코드가 빨강색 표시   
> 해결 - lombok 설치

> *오류*   
> 이미지가 화면 상에 뜨지 않음   
> 문제 - List<>로 되어 있는 파일 그대로 복사해옴   
> 해결 - 단일과 다중은 코드 다름

---

#### 17. 다중 파일첨부 메서드 구현

```java
//BoardController
if (boardDTO.getFileAttached() == 1) {
    List<BoardFileDTO> boardFileDTOList = boardService.findFile(id);
    model.addAttribute("boardFileList", boardFileDTOList);
}
```

- List<>로 변경

```java
//BoardDTO
private List<MultipartFile> boardFile;
```

```java
public void save(BoardDTO boardDTO) throws IOException {
    if (boardDTO.getBoardFile().get(0).isEmpty()) {
        //파일 없음
        boardDTO.setFileAttached(0);
        boardRepository.save(boardDTO);
    } else {
        //파일 있음
        boardDTO.setFileAttached(1);
        //게시글 저장 후 id값 활용을 위해 리턴 받음
        BoardDTO savedBoard = boardRepository.save(boardDTO);
        //파일만 따로 가져오기
        for (MultipartFile boardFile: boardDTO.getBoardFile()) {
//                MultipartFile boardFile = boardDTO.getBoardFile();
            //파일 이름 가져오기
            String originalFilename = boardFile.getOriginalFilename();
            System.out.println("originalFilename = " + originalFilename);
            //저장용 이름 만들기
            System.out.println(System.currentTimeMillis());
            String storedFileName = System.currentTimeMillis() + "-" + originalFilename;
            System.out.println("storedFileName = " + storedFileName);
            //BoardFileDTO 세팅
            BoardFileDTO boardFileDTO = new BoardFileDTO();
            boardFileDTO.setOriginalFileName(originalFilename);
            boardFileDTO.setStoredFileName(storedFileName);
            boardFileDTO.setBoardId(savedBoard.getId());
            //파일 저장용 폴더에 파일 저장 처리
            String savePath = "C:/workspace/study/board_study/src/main/resources/file/" + storedFileName;
            boardFile.transferTo(new File(savePath));
            //board_file_table 저장 처리
            boardRepository.saveFile(boardFileDTO);
        }
    }
}
```

- for문으로 묶기
- service, repository에 List<> 추가

---

#### 18. 다중 파일첨부 화면 구현

```html
<!-- save.html -->
파일: <input type="file" name="boardFile" multiple>
```

```html
<!-- detail.html -->
<td th:each="boardFile: ${boardFileList}">
  <img th:src="@{|/upload/${boardFile.storedFileName}|}" alt="" width="200" height="200">
</td>
```

---