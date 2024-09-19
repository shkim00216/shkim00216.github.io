---
layout: post
title: "[JAVA] Object 클래스 및 java.lang 패키지"
date: 2024-09-07
tags: [JAVA]
categories: JAVA
---

#### 1. Object와 오버라이딩

- Object클래스
  - 모든 클래스의 최상위 클래스
  - 아무것도 상속받지 않으면 자동으로 Object를 상속
  - Object가 가지고 있는 메소드는 모든 클래스에서 다 사용할 수 있다는 것을 의미
  - ex) 같은 값인지 다른 값인지 비교할 수 있는 메서드 제공

##### 메서드를 오버라이딩 하여 그 기준을 정해줄 때 사용

- equals : 객체가 가진 값을 비교할 때 사용
- hashCode : 객체의 해시코드 값 반환
- toString : 객체가 가진 값을 문자열로 반환

```java
@Override
public int hashCode() {
  return Objects.hash(number);
}

@Override
public boolean equals(Object obj) {
  if (this == obj)
    return true;
  if (obj == null)
    return false;
  if (getClass() != obj.getClass())
    return false;
  Student other = (Student) obj;
  return Objects.equals(number, other.number);
}

@Override
public String toString() {
  return "Student [name=" + name + ", number=" + number + ", birthYear=" + birthYear + "]";
}
```

---

#### 2. java.lang 패키지/오토박싱

https://docs.oracle.com/javase/8/docs/api/ : 자바8 문법 참고

> java.lang 패키지 : 자바는 기본적으로 다양한 패키지를 지원 그중에서 가장 중요한 패키지

##### [java.lang 패키지에 포함된 클래스]
- Wrapper 클래스 -> 기본형 타입을 객체로 변환
  - Boolean, Byte, Short, Integer, Long, Float, Double 클래스
- 모든 클래스의 최상위 클래스인 Object
- 문자열과 관련된 String, StringBuffer, StringBuilder
- System 클래스 -> 화면에 값을 출력할 때 사용
- Math 클래스 -> 수학과 관련
- Thread와 관련된 중요 클래스

```java
public static void main(String[] args) {
  int i = 5; //기본형 타입 -> 객체X (필드와 메소드 사용 불가)
  Integer i2 = new Integer(5); //객체로 바꿔줌
    
  Integer i3 = 5; //문제없이 작동 가능(Auto Boxing : 자동으로 기본형 -> Integer 형태로 변환)
  
  int i4 = i3.intValue(); 
  
  int i5 = i3; //Auto unboxing : 자동으로 Integer 형태의 값을 기본형으로 변환
}
```

---

#### 3. 스트링버퍼

```java
public static void main(String[] args) {
  StringBuffer sb = new StringBuffer(); //StringBuffer가 가지고 있는 메소드들은 대부분 자기 자신을 반환
  sb.append("hello");
  sb.append(" ");
  sb.append("world");
  
  String str = sb.toString();
  System.out.println(str);
  
  StringBuffer sb2 = new StringBuffer();
  StringBuffer sb3 = sb2.append("hello");
  if (sb2 == sb3) {
    System.out.println("sb2 == sb3");
  }
  
  String str2 = new StringBuffer().append("hello").append(" ").append("world").toString();
  //메소드체이닝 : 자기 자신의 메소드를 호출하여 자기 자신의 값을 바꿔나가는 것
  System.out.println(str2);
}
```

- StringBuffer는 append메소드 외에도 길이를 구하거나, 자르거나 등의 다양한 메소드를 가지고 있음

---

#### 4. 스트링 클래스의 문제점

> String클래스 : 문자열을 다룰 때 사용하는 클래스(불변클래스)

```java
public static void main(String[] args) {
		String str3 = str1 + str2;
		System.out.println(str3); //hello world world
		
		String str4 = new StringBuffer().append(str1).append(str2).toString();
		System.out.println(str4); //hello world world
		
		String str5 = "";
		for (int i=0; i<100; i++) {
			str5 = str5 + "*";
		}
		System.out.println(str5); //100번 동안 내부적으로 StringBuffer 객체를 계속 만들어냄 -> new 연산자가 많이 사용될수록 프로그래밍 속도 저하
		
		StringBuffer sb = new StringBuffer();
		for (int i=0; i<100; i++) {
			 sb.append("*");
		}
		String str6 = sb.toString();
		System.out.println(str6); //훨씬 효율적인 코드 사용
	}
```

- str3을 수행하게 되면 내부적으로 str4처럼 실행됨
- 반복문 안에서 StringBuffer가 연속적으로 실행될 경우 성능상 문제 발생
- str6의 효율적인 코드 사용 지향

---

#### 5. Math

> Math클래스 : 이름 그대로 수학계산을 위한 클래스

- cos, sin, tan, abs, random 등 사용
- Math클래스는 생성자가 private으로 되어 있기 때문에 new 연산자를 이용하여 객체를 생성할 수 없음
- 모든 메소드와 속성이 static으로 정의되어 있어 객체 생성 없이 사용 가능

```java
public static void main(String[] args) {
  int value1 = Math.max(5, 30); //큰 값 출력
  System.out.println(value1);
  
  int value2 = Math.min(5, 30); //작은 값 출력
  System.out.println(value2);
  
  System.out.println(Math.abs(-10)); //절댓값 출력
  
  System.out.println(Math.random()); //랜덤수 출력(double 값 출력) 0 이상 1.0 미만
  
  System.out.println(Math.sqrt(25)); //제곱근값 출력
}
```

---