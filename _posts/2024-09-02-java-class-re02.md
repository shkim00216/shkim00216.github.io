---
layout: post
title: "[JAVA] 클래스 다듬기"
date: 2024-09-02
tags: [JAVA]
categories: JAVA
---

#### 1. 생성자

모든 클래스는 인스턴스화 될 때 생성자를 사용함

- 생성자는 리턴타입이 없음
- 기본생성자 : 매개변수가 없는 생성자

```java
public class 클래스명 {
  타입 필드명;

  public 클래스명(매개변수 목록) {

  } //생성자 블록

  public 리턴타입 메소드명(매개변수 목록) {

  }
}
```

##### [생성자의 역할]

- 생성자가 하는 일은 객체가 될 때 필드를 초기화 하는 역할
- Car 클래스 -> 반드시 이름을 가지도록

```java
public class Car{
  String name;
  int number;

  public Car(String n){
    name = n;
  }
}
```

- Car 클래스로 Car 인스턴스 생성

```java
public class CarExam2{
  public static void main(String args[]){

    Car c1 = new Car("소방차");
    Car c2 = new Car("구급차");
    //Car c3 = new Car(); // 컴파일 오류가 발생합니다.

    System.out.println(c1.name);

    System.out.println(c2.name);
  }
}
```

- Car 클래스는 기본 생성자를 가지지 않음, 기본 생성자로 Car 객체 생성 불가

---

#### 2. this

> this : 현재 객체, 자기 자신을 나타냄

```java
public Car(String name){
  this.name = name;
}
```

- 클래스 안에서 자기 자신이 가지고 있는 메소드를 사용할 때도 this.메소드명() 호출 가능

---

#### 3. 메소드 오버로딩

> 매개변수의 유형과 개수가 다르게 하여 같은 이름의 메소드를 여러 개 가질 수 있게 하는 기술

- 이름은 같지만 매개변수가 다른 메소드

```java
class MyClass2{
  public int plus(int x, int y){
    return x + y;
  }

  public int plus(int x, int y, int z){
    return x + y + z;
  }

  public String plus(String x, String y){
    return x + y;
  }
} //타입과 매개변수의 수가 중요
```

---

#### 4. 생성자 오버로딩과 this

> 생성자의 매개변수의 유형과 개수가 다르게 하여 같은 이름의 생성자를 여러 개 가질 수 있음

- 자신이 가지고 있는 다른 생성자 이용 가능
- this() : 자신의 생성자 호출 -> 비슷한 코드 중복 방지

```java
public Car(){
  this("이름없음", 0);
}
```

---

#### 5. 패키지

> 패키지(package)란 서로 관련이 있는 클래스 또는 인터페이스들을 묶어 놓은 묶음, 패키지를 사용함으로써 클래스들이 필요할 때만 사용될 수 있도록 하고, 클래스를 패키지 이름과 함께 계층적인 형태로 사용함으로써 다른 그룹에 속한 클래스와 발생할 수 있는 클래스 이름간의 충돌을 막아줌으로 클래스의 관리를 편하게 해줌

```java
package 패키지이름;

public class 클래스명 {
  ...
}
```

1. 패키지 정의 방법

    - package이름은 보통 도메인 이름을 거꾸로 적은 후, 그 뒤에 프로젝트 이름을 붙여서 만듬
    - package이름은 폴더명 점 폴더명 점 폴더명 과 같은 형식으로 만들어짐, 각각의 폴더명은 숫자로 시작할 수 없음

2. 패키지에 생성된 클래스 사용하기

      - 다른 패키지에 있는 클래스를 사용하려면 import 구문 적어줘야 함

    ```java
    import com.eightcrz.javastudy.*; //패키지 안에 있는 모든 파일을 쓸거임

    public class HelloExam {

      public static void main(String[] args) {
        Hello hello = new Hello();
        //hello 클래스가 정의되지 않음 -> import해줘야 함(Ctrl+Shift+O)
      }
    }
    ```

---
