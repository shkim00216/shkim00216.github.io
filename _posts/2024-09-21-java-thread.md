---
layout: post
title: "[JAVA] 쓰레드"
date: 2024-09-21
tags: [JAVA]
categories: JAVA
---

#### 1. 쓰레드란?

> 동시에 여러가지 작업을 동시에 수행할 수 있게하는 것

- 운영 체제(Operating System) : 컴퓨터의 하드웨어를 사용하게 해주는 프로그램
- 프로세스(Process) : 현재 실행되고 있는 프로그램
    - Java -> JVM에 의해 실행됨, 프로그램 중 하나
    - 자바도 하나의 프로세스로 실행하는 것
- Thread : 하나의 프로세스 안에서도 여러 개의 흐름이 동작할 수 있는 것

---

#### 2. 쓰레드 만들기(extend Thread)

> Thread 클래스를 상속받는 방법

```java
//Thread 클래스 구현
public class MyThread1 extends Thread { //Thread 클래스 상속받음

    String str;
    public MyThread1 (String str) {
        this.str = str;
    }

    @Override
    public void run() {
        for (int i=0; i<10; i++) {
            System.out.println(str);
            
            try {
                Thread.sleep((int) (Math.random() * 1000)); //랜덤하게 몇 초 동안 쉬어라(컴퓨터가 너무 빨라 결과 확인 어려우므로)
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    } //다른 흐름의 main 메서드

}
```

```java
public static void main(String[] args) {
    MyThread1 t1 = new MyThread1("*");
    MyThread1 t2 = new MyThread1("-");
    
    t1.start();
    t2.start(); //호출 시 run이 아니라 start임
    
    System.out.println("main end !!");
}
```

---

#### 3. 쓰레드 만들기(implements Runnable)

> Runnable 인터페이스를 구현하는 방법

```java
public class MyThread2 implements Runnable { //Runnable 인터페이스 구현(다른 클래스 상속 시에 사용 가능)
	
	String str;
	public MyThread2(String str) {
		this.str = str;
	}

	@Override
	public void run() {
		for (int i=0; i<10; i++) {
			System.out.println(str);
			
			try {
				Thread.sleep((int) (Math.random() * 1000));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
```

```java
public static void main(String[] args) {
    MyThread2 t1 = new MyThread2("*");
    MyThread2 t2 = new MyThread2("-");
    
    //start() 메서드를 호출하기 위해 Thread 클래스 객체 생성해줘야 함
    Thread thread1 = new Thread(t1);
    Thread thread2 = new Thread(t2);
    
    thread1.start();
    thread2.start();
    System.out.println("!!!");
}
```

---

#### 4. 쓰레드와 공유객체

> 하나의 객체를 여러개의 Thread가 사용한다는 것을 의미

```java
//공유 객체 MusicBox
public class MusicBox {
	//3개의 메서드 가지고 있음
	public void playMusicA() {
		for (int i=0; i<10; i++) {
			System.out.println("신나는 음악!!!");
			
			try {
				Thread.sleep((int) (Math.random() * 1000));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	public void playMusicB() {
		for (int i=0; i<10; i++) {
			System.out.println("슬픈 음악!!!");
			
			try {
				Thread.sleep((int) (Math.random() * 1000));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	public void playMusicC() {
		for (int i=0; i<10; i++) {
			System.out.println("카페 음악!!!");
			
			try {
				Thread.sleep((int) (Math.random() * 1000));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
```

```java
//MusicBox를 가지는 Thread 객체 MusicPlayer
public class MusicPlayer extends Thread {
	int type;
	MusicBox musicBox;
	
	//생성자 초기화
	public MusicPlayer(int type, MusicBox musicBox) {
		this.type = type;
		this.musicBox = musicBox;
	}

	//타입에 따라 다른 메서드 호출
	@Override
	public void run() {
		switch(type) {
			case 1: musicBox.playMusicA(); break;
			case 2: musicBox.playMusicB(); break;
			case 3: musicBox.playMusicC(); break;
		}
	}
}
```

```java
//MusicBox와 MusicPlayer를 이용하는 클래스
public static void main(String[] args) {
    MusicBox box = new MusicBox();
    
    MusicPlayer kang = new MusicPlayer(1, box);
    MusicPlayer kim = new MusicPlayer(2, box);
    MusicPlayer lee = new MusicPlayer(3, box);
    
    kang.start();
    kim.start();
    lee.start();
}
```

---

#### 5. 동기화 메서드와 동기화 블록

- 공유 객체가 가진 메서드를 동시에 호출되지 않도록 하는 방법
    - 메소드 앞에 synchronized 를 붙힘
    - 여러개의 Thread들이 공유객체의 메소드를 사용할 때 메소드에 synchronized가 붙어 있을 경우 먼저 호출한 메소드가 객체의 사용권(Monitoring Lock)을 얻음

```java
public synchronized void playMusicA() {
    for (int i=0; i<10; i++) {
        System.out.println("신나는 음악!!!");
        
        try {
            Thread.sleep((int) (Math.random() * 1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
} //메서드 하나가 모두 실행된 후에 다음 메서드 실행(모니터링 락 - 메서드 종료나 wait() 만나기 전까지 유지)
```

```java
public void playMusicC() {
    for (int i=0; i<10; i++) {
        synchronized(this) { //synchronized 블록을 사용
            System.out.println("카페 음악!!!");
        }
        
        try {
            Thread.sleep((int) (Math.random() * 1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
※ synchronized를 메서드에 붙혀서 사용할 경우, 메서드의 코드가 길어지면, 마지막에 대기하는 쓰레드가 너무 오래 기다리는 것을 막기 위해서 메서드에 synchronized를 붙이지 않고, 문제가 있을 것 같은 부분만 synchronized 블록을 사용

---

#### 6. 쓰레드와 상태제어

> 쓰레드가 3개가 있다면 JVM은 시간을 잘게 쪼갠 후에 한번은 쓰레드1을, 한번은 쓰레드 2를, 한번은 쓰레드 3을 실행   
> 이것에 빠르게 일어나다 보니 쓰레드가 모두 동작하는 것처럼 보이는 것   
> 완전히 멈추진 않고 실행대기 상태임(Runnable과 Running 상태로 왔다갔다함)

- Blocked 되는 경우 : sleep(), wait()
    - sleep() 메서드는 잠시 멈추었다가 Runnable로 돌아옴
    - wait() 메서드는 notify()나 notifyAll() 메서드 호출 전에는 해제되지 않음
        - wait() 메서드는 호출되면 모니터링 락을 놓게 되므로 대기중인 다른 메서드가 실행됨
- Dead 되는 경우 : run 메서드 종료 시, 쓰레드 종료
- yeild 메소드 호출 : 해당 쓰레드는 다른 쓰레드에게 자원을 양보
- join 메소드 호출 : 해당 쓰레드 종료될 때까지 대기

---

#### 7. 쓰레드와 상태제어(join)

> join()메소드는 쓰레드가 멈출때까지 기다리게 함

```java
public static void main(String[] args) {
    MyThread5 thread5 = new MyThread5();
    
    thread5.start();
    
    System.out.println("시작");
    
    try {
        thread5.join();
    } catch (InterruptedException e) {
        e.printStackTrace();
    } //쓰레드 종료 시까지 대기하게 해줌
    
    System.out.println("종료!");
}
```

---

#### 8. 쓰레드와 상태제어(wait, notify)

> wait와 notify는 동기화된 블록안에서 사용해야 함   
> wait를 만나게 되면 해당 쓰레드는 해당 객체의 모니터링 락에 대한 권한을 가지고 있다면 모니터링 락의 권한을 놓고 대기

```java
public class ThreadB extends Thread {
	//해당 쓰레드가 실행되면 자기 자신의 모니터링 락 획득
	//5번 반복하면서 0.5초씩 쉬면서 total에 값 누적
	//그 후에 notify() 메서드 호출하여 wait하고 있는 쓰레드 깨움
	
	int total;
	
	public void run() {
		synchronized (this) {
			for (int i=0; i<5; i++) {
				System.out.println(i + "를 더합니다.");
				total += i;
				
				try {
					Thread.sleep(500);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			notify();
		}
	}
}
```

```java
public class ThreadA {
	public static void main(String[] args) {
		ThreadB b = new ThreadB();
		b.start();
		
		//b에 대하여 동기화 블럭 설정
		synchronized (b) {
			try {
				//b.wait(); 메서드 호출
				//메인쓰레드 정지
				//ThreadB가 5번 값을 더한 후 notify를 호출하게 되면 wait에서 깨어남
				System.out.println("b가 완료될 때까지 기다립니다.");
				b.wait();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			System.out.println("Total is: " + b.total);
		}
	}
}
```

---

#### 9. 데몬 쓰레드

> 데몬(Daemon) : 보통 리눅스와 같은 유닉스계열의 운영체제에서 백그라운드로 동작하는 프로그램   
> 데몬 쓰레드(Daemon Thread) : 자바에서 데몬과 유사하게 동작하는 쓰레드

- 데몬쓰레드 만드는 방법 : 쓰레드에 데몬 설정
    - 자바 프로그램 만들 때 백그라운드에서 특별한 작업을 처리하게 하는 용도로 만듬
- 데몬쓰레드는 일반 쓰레드가 모두 종료되면 강제적으로 종료됨

```java
public class DaemonThread implements Runnable {

	//무한루프 안에서 0.5초씩 쉬면서 데몬쓰레드가 실행중입니다를 출력하도록 run() 메서드 작성
	@Override
	public void run() {
		while(true) {
			System.out.println("데몬 쓰레드가 실행중입니다.");
			
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
				break; //Exception 발생 시 while문 빠져나오기
			}
		}
	}
	
	public static void main(String[] args) {
		Thread thread = new Thread(new DaemonThread());
		thread.setDaemon(true); //데몬쓰레드 설정
		thread.start();
		
		//메인 쓰레드가 0.5초 뒤에 종료되도록 설정
		//데몬쓰레드는 다른 쓰레드 종료 시 자동종료
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("메인 쓰레드가 종료됩니다.");
	}

}
```

---