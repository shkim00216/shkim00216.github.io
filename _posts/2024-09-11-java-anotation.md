---
layout: post
title: "[JAVA] 어노테이션"
date: 2024-09-11
tags: [JAVA]
categories: JAVA
---

#### 1. 어노테이션

> 어노테이션(Annotation)은 Java5에 추가된 기능   
> 클래스나 메서드 위에 붙여 사용 ex) @Override   
> 소스코드에 메타코드(추가정보)를 주는 것   
> 사용자 정의 가능 -> Custom 어노테이션

- 커스텀 어노테이션 이용 방법
    1. 어노테이션 정의
    2. 어노테이션을 클래스에서 사용(타겟에 적용)
    3. 어노테이션을 이용하여 실행

```java
//어노테이션 사용자 정의
@Retention(RetentionPolicy.RUNTIME)
public @interface Count100 {
	
}
```

```java
//어노테이션 잘 적용되었는지 확인
public static void main(String[] args) {
    MyHello hello = new MyHello();
    
    try {
        Method method = hello.getClass().getDeclaredMethod("hello"); //예외처리
        
        if (method.isAnnotationPresent(Count100.class)) {
            for (int i=0; i<100; i++) {
                hello.hello(); //hello 메서드가 @Count100 어노테이션이 설정되어 있을 경우, hello() 메서드 100번 호출
            } 
        } else {
            hello.hello();
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

---