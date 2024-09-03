---
layout: post
title: "[JAVA] 클래스와 객체"
date: 2024-09-02
tags: [JAVA]
categories: JAVA
---

#### 1. 클래스 선언

- 클래스 : 객체를 만들기 위한 틀

```java
public class 클래스명 {

} //클래스 블록
```

---

#### 2. 참조타입

기본형 타입

- 논리형 : boolean
- 문자형 : char
- 정수형 : byte, short, int, long
- 실수형 : float, double

참조형 타입

- 기본형 타입을 제외한 모든 타입

---

#### 3. String 클래스

1. new 연산자를 이용하지 않고 인스턴스를 만드는 경우

```java
String str1 = "hello";
String str2 = "hello";
```

  - "hello"라는 문자열이 메모리 중에서 상수가 저장되는 영역에 저장, 상수 -> 변하지 않는 값
  - str1이 참조하는 인스턴스를 str2도 참조

2. new 연산자를 이용해서 인스턴스를 만드는 경우

```java
String str3 = new String("hello");
String str4 = new String("hello");
```

  - new 연산자를 이용하여 인스턴스를 만들면 인스턴스는 무조건 새롭게 만들어짐
  - str3과 str4는 서로 다른 인스턴스 참조

> string은 불변 클래스로 인스턴스가 될 때 가지고 있던 값을 나중에 수정할 수 없음

```java
String str5 = "hello world";
String str6 = str5.substring(3);
```

- substring(n) : n번째 index에서 문자열을 자른 결과를 반환하는 메소드

```java
if(str1.equals(str2)) {

}
```

- equals 메소드 : 두 문자열이 같은 값인지 비교

---

#### 4. 필드(field) 선언

- 속성 : 자동차는 자동차 이름, 자동차 번호를 가지고 있음 -> 자바에서는 필드라는 용어로 사용
- 속성 이용하기 : 참조 변수 다음에 나오는 점(dot)은 참조변수가 참조하는 객체가 가지고 있는 것을 사용할 때 사용

```java
Car c1 = new Car();

c1.name = "소방차";

System.out.println(c1.name);
```

---

#### 5. 메소드란?

- 메소드 : 물체의 행동
- 메소드는 입력값이 있고, 그 입력값을 받아서 무언가 한 다음 결과를 도출해 내는 수학의 함수와 비슷한 개념
- 입력값 = 매개변수, 결과값 = 리턴값
  - 인자(Argument) : 어떤 함수를 호출 시에 전달되는 값
  - 매개변수(Parameter) : 전달된 인자를 받아들이는 변수

---

#### 6. 메소드(Method) 선언

##### [다양한 형태의 메소드]

1. 매개변수X, 리턴값X

   - 리턴하는 것이 없을 경우 : void

   ```java
   public void method1(){
     System.out.println("method1이 실행됩니다.");
   }
   ```

2. 매개변수O, 리턴값X

  - 받아들이는 값 : 타입 상관 없음 / 여러 개일 경우 콤마(,)로 구분

```java
public void method2(int x){
  System.out.println(x + " 를 이용하는 method2입니다.");
}
```

3. 매개변수X, 리턴값O

   - 리턴하는 값 앞에 return
   - 메소드 이름 앞 : 리턴하는 타입

   ```java
   public int method3(){
     System.out.println("method3이 실행됩니다.");

     return 10;
   }
   //위 메소드가 실행되면, 콘솔에 'method3이 실행됩니다.' 를 출력하고, 이 메소드를 호출한 쪽에 10을 리턴한다.
   ```

4. 매개변수 2개, 리턴값X

   ```java
   public void method4(int x, int y){
     System.out.println(x + "," + y + " 를 이용하는 method4입니다.");
   }
   ```

5. 매개변수O, 리턴값O
   ```java
   public int method5(int y){
     System.out.println(y + " 를 이용하는 method5입니다.");
     return 5;
   }
   ```

---

#### 7. 메소드 사용해보기

```java
MyClass myclass = new MyClass();
```

- 메소드가 정의된 클래스인 myClass가 생성
- 객체 생성 시 new 연산자 이용

```java
my1.method1();
```

- 메소드 사용 시 생성된 클래스를 참조하는 레퍼런스변수.메소드명()으로 사용

---

#### 8. String 클래스의 메소드

- 문자열 길이 구하기

  - str.length() : str이 참조하는 문자열의 길이를 구해서 int 타입으로 리턴해주는 메소드

  ```java
  System.out.println(str.length());
  ```

- 문자열 붙이기

  - str.concat("world") : 해당 문자열을 붙혀서 String 타입으로 리턴하는 메소드
  - 원래 클래스는 변하지 않음

  ```java
  String str = new String("hello");

  System.out.println(str.concat(" world"));  //출력결과는 hello world
  System.out.println(str);  //출력결과는 hello
  ```

- 문자열 자르기
  - str.subString(1,3) : str이 참조하는 문자열을 인덱스 1번부터 3번까지 자른 결과
  - str.subString(2) : str이 참조하는 문자열을 2번 인덱스부터 마지막까지 자른 결과
  - 문자열의 인덱스는 0부터 시작
  ```java
  System.out.println(str.substring(1, 3)); //출력결과  el
  System.out.println(str.substring(2));   //출력결과 llo world
  ```

---

#### 9. 변수의 scope와 static

- 변수의 스코프 : 프로그램상에서 사용되는 변수들은 사용 가능한 범위를 가짐

1. 변수가 선언된 블럭이 그 변수의 사용범위
2. main은 static한 메소드이므로 static 하지 않은 필드 사용 불가

   ```java
   public class VariableScopeExam {
     int globalScope = 10;

     public void scopeTest(int value){
       int localScope = 20;
       System.out.println(globalScope);
       System.out.println(localScope);
       System.out.println(value);
     }
     public static void main(String[] args) {
       System.out.println(globalScope);  //오류
       System.out.println(localScope);   //오류
       System.out.println(value);        //오류
     }
   }
   ```

3. static : 같은 클래스 내에 있어도 사용 불가, static 필드는 인스턴스화 되지 않아도 사용 가능
4. 클래스 변수는 레퍼런스.변수명 하고 사용하기 보다는 클래스명.변수명 으로 사용하는것이 더 바람직
   ```java
   System.out.println(VariableScopeExam.staticVal);
   ```

※ static 변수는 인스턴스가 아닌 클래스에 귀속되므로 인스턴스가 여러개 생성되어도 static 변수는 딱 하나만 있음

---

#### 10. 열거형(enum)

특정 값만 가져야 한다면 열거형을 사용하는 것이 좋다.

```java
enum Gender{
  MALE, FEMALE;
}

or

Gender gender2;

gender2 = Gender.MALE;
gender2 = Gender.FEMALE;

//Gender타입의 변수에는 MALE이나 FEMALE만 대입이 가능. 다른 값은 저장할 수가 없다.
```

---
