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
    return x+y;
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

#### 5. 