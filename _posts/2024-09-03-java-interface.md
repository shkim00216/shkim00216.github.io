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
  public interface TV{
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
  public class LedTV implements TV{
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

---

#### 3. 인터페이스의 default method

1. default 메소드
  - 인터페이스가 default키워드로 선언되면 메소드가 구현 가능, 또한 이를 구현하는 클래스는 default메소드를 오버라이딩 가능