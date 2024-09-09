---
layout: post
title: "[JAVA] Object 클래스"
date: 2024-09-09
tags: [JAVA]
categories: JAVA
---

#### 1. Object와 오버라이딩

- Object 클래스
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
