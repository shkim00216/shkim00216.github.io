---
layout: post
title: "[JAVA] 람다"
date: 2024-09-22
tags: [JAVA]
categories: JAVA
---

#### 1. 람다식

> 람다식은 다른말로 익명 메소드라고도 함

- 인터페이스 중에서 메서드를 하나만 가지고 있으면 함수형 인터페이스라고 함
    - ex) 쓰레드 만들 때 사용하는 Runnable 인터페이스의 경우 run() 메소드 하나
- 자바는 메서드만 매개변수로 전달할 수 있는 방법이 없음, 인스턴스만 가능

```java
//람다식을 이용하여 간단하게 코드 수정
public class LambdaExam {

	public static void main(String[] args) {
		new Thread(()-> { //이 부분이 람다식(JVM은 생성자 보고 무엇인지 추론함)
				for (int i=0; i<10; i++) {
					System.out.println("hello");
				}
		}).start();
	}

}
```

---

#### 2. 람다식 기본문법

> (매개변수목록)->{실행문}

```java
public static void exec(Compare compare) {
	int k = 10;
	int m = 20;
	int value = compare.compareTo(k, m);
	System.out.println(value);
}

public static void main(String[] args) {
	exec((i,j)-> {
		return i - j;
	});
} //인터페이스에 있는 compareTo 메서드 사용하여 람다식으로 함수 결과 호출
```

---