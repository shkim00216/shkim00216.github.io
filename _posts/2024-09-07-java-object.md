---
layout: post
title: "[JAVA] java.base 모듈"
date: 2024-09-07
tags: [JAVA]
categories: JAVA
---

#### 1. Object 클래스

- Object 클래스
  - 모든 클래스의 최상위 클래스
  - 아무것도 상속받지 않으면 자동으로 Object를 상속
  - Object가 가지고 있는 메소드는 모든 클래스에서 다 사용할 수 있다는 것을 의미

##### Object가 가진 주요 메소드

- equals() : 객체의 번지를 비교하고 결과를 리턴
  - 메소드를 재정의하여 동등 비교용으로 사용(객체가 달라도 내부의 데이터가 같은지 비교)

    ```java
    public class Member {
      public String id;

      public Member(String id) {
        this.id = id;
      }

      //equals() 메소드 재정의
      @Override
      public boolean equals(Object obj) {
        if(obj instanseof Member target) { 
          //obj가 Member 타입인지 검사하고 타입 변환 후 target 변수에 대입
          if(id.equals(target.id)) {
            //id 문자열이 같은지 비교
            return true;
          }
        }
        return false;
      }
    }
    ```
- hashCode : 객체의 해시코드 값 반환
  - 객체가 달라도 내부 데이터가 동일하다면 같은 정수값 리턴을 위해 객체의 데이터를 기준으로 재정의
    ```java
    @Override
    public int hashCode() {
      int hashCode = no + name.hashCode();
      return hashCode;
    } //학생 번호와 이름 해시코드를 합한 새로운 해시코드 리턴(번호와 이름이 같으면 동일한 해시코드 출력)
    ```
- toString : 객체가 가진 값을 문자열로 반환
  - '클래스명@16진수해시코드'로 구성된 문자열 리턴
    ```java
    @Override
    public String toString() {
      return "Student [name=" + name + ", number=" + number + ", birthYear=" + birthYear + "]";
    } //원하는 문자열 출력
    ```

##### 롬복 사용

> Lombok : 개발자들이 즐겨 쓰는 자동 코드 생성 라이브러리

- Getter, Setter hasCode(), equals(), toString() 메소드 자동 생성 가능
- @Data -> @RequiredArgsConstructor, @Getter, @Setter, @EqualsAndHashCode, @ToString 어노테이션들이 합쳐진 것과 동일한 효과

---

#### 2. java.lang 패키지

https://docs.oracle.com/javase/8/docs/api/ : 자바8 문법 참고

> java.lang 패키지 : 자바는 기본적으로 다양한 패키지를 지원, 그중에서 가장 중요한 패키지

##### [System 클래스]

> System 클래스 : 프로그램 종료, 키보드 입력, 콘솔 출력, 현재 시간 읽기, 시스템 프로퍼티 읽기 등이 가능

##### [문자열 클래스]

> String 클래스 : 문자열을 저장하고 조작할 때 사용

```java
//기본 문자셋으로 byte 배열을 디코딩해서 String 객체로 생성
//byte 배열 -> String(기본: UTF-8 디코딩)
String str1 = new String(arr1);

//특정 문자셋으로 byte 배열을 디코딩해서 String 객체로 생성
//byte 배열 -> String(EUC-KR 디코딩)
String str2 = new String(arr2, "EUC-KR");
```

> StringBuilder : 내부 버퍼에 문자열을 저장해두고 그 안에서 추가, 수정, 삭제 작업을 하도록 설계되어 있음

- append() : 문자열을 끝에 추가
- insert() : 문자열을 지정 위치에 추가
- delete() : 문자열 일부를 삭제
- replace() : 문자열 일부를 대체
- toString() : 완성된 문자열 리턴

```java
public static void main(String[] args) {
		String data = new StringBuilder()
				.append("DEF")
				.insert(0,"ABC")
				.delete(3,4)
				.toString();
		System.out.println(data);
		//메소드 체이닝 : 자기 자신의 메소드를 호출하여 자기 자신의 값을 바꿔나가는 것
		}
```
** String에서는 + 연산보다는 StringBuilder를 사용해야 효율적인 코드임(문자열을 더할 때 내부에서는 StringBuilder 객체를 계속 만들어내므로 프로그래밍 속도 저하)

> StringTokenizer 클래스 : 여러 종류가 아닌 한 종류의 구분자만 있을 때 문자열을 분리

##### [포장 클래스]

> 기본 타입(byte, char, short, int, long 등)의 값을 갖는 객체 생성

- 박싱과 언박싱
```java
Integer obj = 100; //박싱 : 기본 타입의 값을 포장 객체로 만드는 과정
int value = obj; //언박싱 : 포장 객체에서 기본 타입의 값을 얻어내는 과정
```
```java
public static void main(String[] args) {
  //Boxing
  Integer obj = 100;
  System.out.println("value: " + obj.intValue()); //Integer 객체 내부의 int 값 리턴
  
  //Unboxing
  int value = obj;
  System.out.println("value: " + value);
  
  //연산 시 Unboxing
  int result = obj + 100;
  System.out.println("result: " + result);
}
```

##### [수학 클래스]

> Math 클래스 : 수학 계산에 사용할 수 있는 메소드 제공

- Math.abs(절대값), Math.ceil(올림값), Math.floor(버림값), Math.max(최대값), Math.min(최소값), Math.random(랜덤값), Math.round(반올림값) 등
- 모든 메소드와 속성이 static으로 정의되어 있어 객체 생성 없이 사용 가능

```java
int num = (int) (Math.random() * n) + start;
//random() 메소드는 double 타입이므로 start부터 시작하는 랜덤 정수를 만들기 위한 공식(형변환 필수)
```

##### [날짜와 시간 클래스]

> Date 클래스 : 날짜와 시간을 구하기 위한 클래스

- 대부분의 생성자와 메소드가 Deprecated되어 있음
- java.util.SimpleDateFormat 클래스 사용
    - yyyy : 년, MM : 월, dd : 일
    - hh : 시간, mm : 분, ss : 초, a : 오전/오후
    - zzz : TimeZone(한국의 경우 KST)

```java
public static void main(String[] args) {
    Date date = new Date(); //현재 시간과 날짜 정보를 Date 인스턴스가 가지게 됨
    System.out.println(date.toString());
    
    SimpleDateFormat ft = new SimpleDateFormat("yyyy.MM.dd 'at' hh:mm:ss a zzz");
    System.out.println(ft.format(date));
    
    System.out.println(date.getTime()); //현재 시간을 Long값으로 구하는 방법
    //System이 가지고 있는 메소드 이용
    long today = System.currentTimeMillis();
    System.out.println(today);
    
    System.out.println(today - date.getTime()); //시간으로 연산도 가능
}
```

> Calendar 클래스 : Date의 단점을 해결하고 등장한 클래스

- Calendar 클래스 생성 방법
    - 추상 클래스
    - 인스턴스 생성 시 getInstance() 메소드 사용
    - 내부적으로 java.util.GregorianCalendar 인스턴스 만들어 리턴
    - GregorianCalendar는 Calendar의 자식 클래스   
    (새로운 형식의 표준 달력이 생성될 수 있으므로...)

```java
public static void main(String[] args) {
    Calendar cal = Calendar.getInstance();
    System.out.println(cal.get(Calendar.YEAR));
    System.out.println(cal.get(Calendar.MONTH) + 1); //월은 0부터 시작함
    System.out.println(cal.get(Calendar.DATE));
    
    System.out.println(cal.get(Calendar.HOUR)); //0~11시로 표시
    System.out.println(cal.get(Calendar.HOUR_OF_DAY)); //0~24시로 표시
    System.out.println(cal.get(Calendar.MINUTE));

    cal.add(Calendar.HOUR, 5); //add메소드 이용하여 쉽게 날짜 계산 가능
}
```

> LocalDateTime 클래스 : 날짜와 시간 조작 가능

```java
public static void main(String[] args) {
  LocalDateTime now = LocalDateTime.now();
  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy.MM.dd a HH:mm:ss");
  System.out.println("현재 시간: " + now.format(dtf));
  
  LocalDateTime result1 = now.plusYears(1);
  System.out.println("1년 덧셈: " + result1.format(dtf));
  
  LocalDateTime result2 = now.minusMonths(2);
  System.out.println("2월 뺄셈: " + result2.format(dtf));
  
  LocalDateTime result3 = now.plusDays(7);
  System.out.println("7일 덧셈: " + result3.format(dtf));
}
```

- 날짜와 시간 비교도 가능

```java
LocalDateTime target = LocalDateTime.of(year, month, dayOfMonth, hour, minute, second);
```

##### [형식 클래스]

> Format 클래스 : 숫자 또는 날짜를 원하는 형태의 문자열로 변환해주는 기능 제공

- DecimalFormat : 숫자를 형식화된 문자열로 변환

```java
DecimalFormat df = new DecimalFormat("#,###.0");
String result = df.format(1234567.89); //1,234,567.9
```

- SimpleDateFormat : 날짜를 형식화된 문자열로 변환하는 기능 제공

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
String strDate = sdf.format(new Date()); //2024년 09월 02일
```
---