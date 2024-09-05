---
layout: post
title: "[JAVA] 인터페이스와 다른 형식의 클래스"
date: 2024-09-04
tags: [JAVA]
categories: JAVA
---

#### 1. 인터페이스 만들기

> 인터페이스(interface): 서로 관계가 없는 물체들이 상호 작용을 하기 위해서 사용하는 장치나 시스템

- 인터페이스 정의하는 방법

  - 추상 메소드와 상수를 정의할 수 있음

  ```java
  public interface TV {
    public int MAX_VOLUME = 100;
    public int MIN_VOLUME = 0;

    public void turnOn();
    public void turnOff();
    public void changeVolume(int volume);
    public void changeChannel(int channel);
  } //인터페이스 자체가 구현은 없고, 이러한 기능이 있다만 정의해줌
  ```

---

#### 2. 인터페이스 사용하기

- 인터페이스 사용하는 방법

  - 인터페이스는 사용할때 해당 인터페이스를 구현하는 클래스에서 implements 키워드를 이용

  ```java
  public class LedTV implements TV {
    public void on(){
      System.out.println("켜다");
    }
    public void off(){
      System.out.println("끄다");
    }
    public void volume(int value){
      System.out.println(value + "로 볼륨조정하다.");
    }
    public void channel(int number){
      System.out.println(number + "로 채널조정하다.");
    }
  }
  ```

- 동일한 인터페이스를 구현한다는 것은 클래스 사용법이 같다는 것을 의미(클래스는 이러한 인터페이스를 여러개 구현할 수 있음)
- interface 안에서 변수 선언 시, 상수로 선언되어 변경 불가함 -> interface가 상속되어 있는 class 안에서 선언 시 변경 가능

---

#### 3. 인터페이스의 default method

1. default 메소드

   - 인터페이스가 default키워드로 선언되면 메소드가 구현 가능, 또한 이를 구현하는 클래스는 default메소드를 오버라이딩 가능

   ```java
   public interface Calculator {
       default int exec(int i, int j){ //default로 선언함으로 메소드를 구현 가능
           return i + j;
       }
   }
   ```

   - 인터페이스가 변경이 되면, 인터페이스를 구현하는 모든 클래스들이 해당 메소드를 구현해야 하는 문제가 있음, 문제 해결을 위해 인터페이스에 메소드를 구현해 놓을 수 있도록 함

2. static 메소드

   - 인터페이스에 static 메소드를 선언함으로써, 인터페이스를 이용하여 간단한 기능을 가지는 유틸리티성 인터페이스를 만들 수 있음

   ```java
   public interface Calculator {
       public static int exec2(int i, int j){   //static 메소드
           return i * j;
       }
   }
   ```

   - 인터페이스에서 정의한 static메소드는 반드시 인터페이스명.메소드 형식으로 호출

   ```java
   public class MyCalculatorExam {
       public static void main(String[] args){
           Calculator cal = new MyCalculator();

           int value2 = Calculator.exec2(5, 10);  //static메소드 호출
           System.out.println(value2);
       }
   }
   ```

---

#### 4. 내부 클래스

> 내부 클래스란 클래스 안에 선언된 클래스

1. 중첩클래스 = 인스턴스 클래스 : 클래스 안에 인스턴스 변수, 즉 필드를 선언하는 위치에 선언

   - 내부에 있는 Cal객체를 생성하기 위해서는, 밖에는 InnerExam1의 객체를 만든 후에 InnerExam1.Cal cal = t.new Cal();과 같은 방법으로 Cal객체를 생성한 후 사용

   ```java
   public class InnerExam1{
     class Cal{
         int value = 0;
         public void plus(){
             value++;
         }
     }

     public static void main(String args[]){
         InnerExam1 t = new InnerExam1();
         InnerExam1.Cal cal = t.new Cal();
         cal.plus();
         System.out.println(cal.value);

     }
   }
   ```

2. 정적 중첩 클래스 = static 클래스 : 내부 클래스가 static으로 정의된 경우

   - 필드 선언할 때 static한 필드로 선언한 것과 같음

   ```java
   public class InnerExam2{
     static class Cal{
         int value = 0;
         public void plus(){
             value++;
         }
     }

     public static void main(String args[]){
         InnerExam2.Cal cal = new InnerExam2.Cal();
         cal.plus();
         System.out.println(cal.value);

     }
   }
   ```

3. 지역 중첩 클래스 = 지역 클래스 : 메소드 안에 클래스를 선언한 경우

   - 메소드 안에서 해당 클래스 이용

   ```java
   public class InnerExam3{
     public void exec(){
       class Cal{
           int value = 0;
           public void plus(){
               value++;
           }
       }
       Cal cal = new Cal();
       cal.plus();
       System.out.println(cal.value);
     }


     public static void main(String args[]){
         InnerExam3 t = new InnerExam3();
         t.exec();
     }
   }
   ```

---

#### 5. 익명 클래스

> 익명 중첩 클래스는 익명 클래스라고 보통 말하며, 내부 클래스이기도 함

```java
public class ActionExam {

	public static void main(String[] args) {
		Action action = new Action() {

			@Override
			public void exec() {
				System.out.println("exec");
			}
		}; //MyAction을 사용하지 않고 Action을 상속받는 익명 클래스를 만들어서 사용하도록 수정
		action.exec();
	}

}

```

- 생성자 다음에 중괄호가 나오면, 생성자 이름에 해당하는 클래스를 상속받는 이름없는 객체를 만든다는 것
- 이렇게 생성된 이름 없는 객체를 action이라는 참조변수가 참조하도록 함
- Action을 상속받는 클래스가 해당 클래스에서만 사용되고 다른 클래스에서는 사용되지 않음

---
