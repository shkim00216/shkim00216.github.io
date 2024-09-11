---
layout: post
title: "[JAVA] 예외처리"
date: 2024-09-05
tags: [JAVA]
categories: JAVA
---

#### 1. Exception

> 예외 : 프로그램 실행 중 예기치 못한 사건  
> 예외 처리 : 예외 상황을 미리 예측하고 처리할 수 있음

- 일반 예외(Exception) : 컴파일러가 예외 처리 코드 여부를 검사하는 예외
- 실행 예외(Runtime Exception) : 컴파일러가 예외 처리 코드 여부를 검사하지 않는 예외

```java
try {
  ... //수행할 코드, 예외 발생 가능성이 있는 블록
} catch (예외클래스변수명) {
  ... //예외 처리 블록(여러개 사용 가능)
} finally {
  ... //(생략 가능) 예외 발생 여부에 상관없이 반드시 실행되는 블록
}
```

##### [예외 정보를 얻는 3가지 방법]

1. 예외클래스변수명.getMessage() : 발생한 예외 클래스의 인스턴스에 저장된 메세지를 얻을 수 있음 -> 아주 간단한 정보만 보여줌
2. 예외클래스변수명.toString() : getMessage() + 예외의 정보를 알려주는 메소드
3. 예외클래스변수명.printStackTrace() : getMessage() + 어떤 예외가 발생했는지와 에러가 발생한 위치까지 보여줌


- catch 블록이 여러 개여도 해당 예외의 catch 블록 단 하나만 실행
- 처리해야 할 예외 클래스들이 상속 관계에 있을 때는 하위 클래스 catch 블록 먼저 생성
  - 예외 발생 시 위에서부터 차례대로 검사
- 예외클래스 Exception : 모든 오류 처리하는 예외클래스
  - 어떤 Exception이 발생할지 모를 때는 catch(Exception e)와 같이 Exception 클래스 이용

---

#### 2. Throws

> 예외 떠넘기기 : throws는 예외가 발생했을때 예외를 호출한 쪽에서 처리하도록 던져줌

```java
public static int divide(int i, int j) throws ArithmeticException {
		int k = i/j;
		return k;
} //divide 메소드는 예외가 발생하니 divide 메소드를 호출하는 쪽에서 처리하라고 떠넘김
```

---

#### 3. Exception 발생시키기

> 강제로 오류를 발생시키는 throw  
> throw는 오류를 떠넘기는 throws와 보통 같이 사용

```java
if(j == 0){
  throw new IllegalArgumentException("0으로 나눌 수 없어요.");
} //직접 오류 발생시키고, 호출한 쪽에서 예외 처리 진행
```

- if문으로 적절하지 않은 값 리턴 시 값이 정확하지 않아 문제가 생길 수 있음

---

#### 4. 사용자 정의 Exception

```java
public class 클래스이름 extends Exception {
  ...
} //Exception이나 Exception의 후손을 상속받아 만들어진 클래스
```

- 클래스의 이름만으로 어떤 오류가 발생했는지 알려주어 코드의 직관성을 높임

- Exception 클래스를 상속 받아 정의한 checked Exception
  - 반드시 오류 처리 해야만 하는 Exception
  - 예외 처리하지 않으면 컴파일 오류 발생
- RuntimeException 클래스를 상속 받아 정의한 unChecked Exception
  - 예외 처리하지 않아도 컴파일 시에는 오류를 발생시키지 않음

```java
public class BizException extends RuntimeException {
    public BizException(String msg){
        super(msg);
    }
    public BizException(Exception ex){
        super(ex);
    }
} //RuntimeException을 상속받은 BizException객체
```

```java
public class MyCheckedException extends Exception{

} //Exception을 상속받은 MyCheckedException객체
```

---

#### 5. 예외 모음

- ArithmeticException : 나누기 0을 하면 발생하는 예외
- IllegalArgument : 적합하지 않거나 적절하지 못한 인자를 메소드에 넘겨주었을 때 발생