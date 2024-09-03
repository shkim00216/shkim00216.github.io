---
layout: post
title: "[JAVA] 상속"
date: 2024-09-03
tags: [JAVA]
categories: JAVA
---

#### 1. 상속

> 상속이란?
>
> - 부모가 가진 것을 자식에게 물려주는 것을 의미(is a 관계 혹은 kind of 관계)

```java
public class Car{

}

public class Bus extends Car{

}
```

- 자바는 클래스 이름 뒤에 extends 키워드를 적고 부모클래스 이름을 적게 되면 부모 클래스가 가지고 있는 것을 상속받을 수 있게 됨
- 부모가 가지고 있는 메소드 외에 추가로 메소드를 선언하는 것을 확장하였다고 표현

---

#### 2. 접근제한자

캡슐화 : 관련된 내용을 모아서 가지고 있는 것

> 접근 제한자란 클래스 내에서 멤버의 접근을 제한하는 역할

##### [접근제한자의 종류]

1. public : 어떤 클래스든 접근 가능
2. protected : 자기 자신, 같은 패키지, 서로 다른 패키지여도 상속받은 자식 클래스에서는 접근 가능
3. private : 자기 자신만 접근 가능
4. default 접근 지정자 : 자기자신과 같은 패키지에서만 접근 가능

- 패키지는 다르지만 상속관계에 있으므로 protected 접근제한자로 지정된 필드 p2에 접근 가능

```java
public class AccessObjExam extends AccessObj{
    public static void main(String[] args) {
        AccessObjExam obj = new AccessObjExam();
        System.out.println(obj.p);
        System.out.println(obj.p2);
        System.out.println(obj.k);// 컴파일 오류가 발생합니다.
        System.out.println(obj.i);// 컴파일 오류가 발생합니다.
    }
}
```

_Q. 왜 AccessObjExam 클래스를 불러오는지?_

---

#### 3. 추상 클래스

> 추상 클래스란 구체적이지 않은 클래스를 의미  
> ex) 구체적 - 독수리, 타조 등 / 추상적 - 새, 포유류 등

##### [추상 클래스 정의하기]

- 추상 클래스는 클래스 앞에 abstract 키워드를 이용해서 정의
- 추상 클래스는 미완성의 추상 메소드를 포함
  - 추상 메소드란, 내용이 없는 메소드 이다. 즉 구현이 되지 않은 메소드
  - 추상 메소드는 리턴 타입 앞에 abstract라는 키워드를 붙여야 함
- 추상 클래스는 인스턴스를 생성할 수 없음

```java
public abstract class Bird{
    public abstract void sing();

    public void fly(){
        System.out.println("날다.");
    }
}
```

- 추상 클래스는 객체 생성 불가(부모로서의 역할은 가능함)

_Q. 추상 클래스는 언제 사용하는 것인지?_

---

#### 4. super와 부모생성자

> class가 인스턴스화 될때 생성자가 실행되면서 객체의 초기화
> 자신의 생성자만 실행이 되는것이 아니고, 부모의 생성자부터 실행

##### super

- 자신을 가리키는 키워드가 this 라면, 부모들 가리키는 키워드는 super
- super()는 부모의 생성자를 의미

##### [부모의 기본 생성자가 아닌 다른 생성자를 호출하는 방법]

- 클래스는 기본 생성자가 없는 경우도 존재

  ```java
  public class Car{
      public Car(String name){
          System.out.println(name + " 을 받아들이는 생성자입니다.");
      }
  }
  ```

- 이런 문제를 해결하려면 자식 클래스의 생성자에서 직접 부모의 생성자를 호출해야 함

  ```java
  public Bus(){
      super("소방차"); // 문자열을 매개변수로 받는 부모 생성자를 호출하였다.
      System.out.println("Bus의 기본생성자입니다.");
  }
  ```

※ super 키워드는 자식에서 부모의 메소드나 필드를 사용할 때도 사용

---

#### 5. 오버라이딩

> 오버라이딩이란 부모가 가지고 있는 메소드와 똑같은 모양의 메소드를 자식이 가지고 있는 것, 즉 오버라이딩이란 메소드를 재정의

##### [메소드 오버라이딩]

- 메소드를 오버라이드 하면, 항상 자식클래스에서 정의된 메소드가 호출
- 오버라이딩 한다고 해서 부모의 메소드가 사라지는 것은 아님
  - super 키워드 이용 시, 부모 메소드 호출 가능
  ```java
  public class Bus extends Car{
    public void run(){
        super.run();  // 부모의 run()메소드를 호출
        System.out.println("Bus의 run메소드");
    }
  }
  ```

---

#### 6. 클래스 형변환

- 부모타입으로 자식객체를 참조 가능
  - 부모가 가지고 있는 메소드만 사용 가능
- 객체들끼리도 형변환이 가능하며, 상속관계에서만 가능

```java
public class BusExam{
    public static void main(String args[]){
        Car car = new Bus();
        car.run();
        //car.ppangppang(); // 컴파일 오류 발생

        Bus bus = (Bus)car;  //부모타입을 자식타입으로 형변환
        bus.run();
        bus.ppangppang();
    }
}
```

- 부모타입 -> 자식타입 객체 참조 : 묵시적 형변환
- 자식타입 -> 부모타입 객체 참조 : 명시적 형변환  
  ※ 형변환 할때에는 부모가 참조하는 인스턴스가 형변환 하려는 자식타입일 때만 가능

---
