# Nest-Study

# dependencies

    "@nestjs/common": "^7.6.17",             : nestjs Class 함수를 사용하기 위한 라이브러리
    "@nestjs/core": "^7.6.17",
    "@nestjs/platform-express": "^7.6.17",   : Http 통신을 처리할 수 있는 express 프레임워크 라이브러리, Fastify도 사용 가능...
    "reflect-metadata": "^0.1.13",           : Decorator를 사용할 수있도록 하는 라이브러리
    "typescript": "^4.3.2"


# 흐름
- Pipe : Validate request data
- Guard : user 인증 인가
- Controller : Url Route
- Service : Business logic
- Repository : DB 접근


# File Convention
- AppController => app.controller.ts
- AppModule => app.module.ts

# Nest CLI Setting
```
// nestjs 전역 설치
npm install -g @nestjs/cli

// nestjs 프로젝트 생성
nest new [app 이름]
```

# cli generate 명령어 
```
nest generate module messages => messages.module.ts (class MessageModule)  
주의 : module name에 module이란 단어 넣지 않기 (messages 폴더 자동 생성)  

nest generate controller messages/messages --flat
messages : messages 폴더 안에 파일을 놓는다. (/앞 messages)
messages : messages class controller의 이름 (/뒤 messages)
--flat : controllers 폴더를 생성하지 않음 

```

# HTTP 요청 데코레이터
1. @Param() => https://localhost:3000/[id]  => @Param(id)  
2. @Query()
3. @Body() => http의 body 
4. @Header()

# 자동 validation 세팅 과정
1. global validation 연결하기 
```
// main.ts
app.useGloablPipes(
    new ValidationPipe()
)
```
2. DTO 작성하기 (Data transfer object) => create-message.dto.ts
3. class에 validation rule 작성하기 => class-vlidator 사용
4. request handler에 class 적용하기

✨흐름  
1. class-transformer에 의해 body가 DTO 클래스의 인스턴스로 바뀜
2. class-validator로 인스턴스 검증
3. 검증받은 데이터 request handler에 제공  

🚧타입 정보가 JavaScript에서 유지되는 이유   
emitDecoratorMetadat option을 true로 설정하면 데코레이터의 타입을 할당해줄 수 있다. 

# 제어의 역전
class 내부에서 의존성을 가지고 있는 인스턴스를 생성해서는 안된다. 왜냐하면 재사용성이 떨어지는 안좋은 방식이기 때문이다.  
이를 해결하기 위해선 의존성 있는 객체를 외부에서 생성하여 의존성을 주입해야한다.    
또한, 더욱 더 범용성있는 외부 객체를 주입하기 위해 객체의 타입을 인터페이스로 정의하는 것이 좋다.  

# 의존성 주입 흐름
1. 모든 클래스와 클래스의 의존성 리스트가 컨테이너(인젝터)에 등록된다. 
2. 특정한 클래스 (대다수 컨트롤러)의 요청이 있으면 필요한 의존성들이 생성된다. 
3. 특정한 클래스(컨트롤러)가 만들어진다. 
4. 컨테이너에 저장된 인스턴스가 재요청되면 복사되지 않고 바로 사용되어 만들어진다.   

⚠️ 제어의 역전을 사용했을 때 코드의 복잡성을 낮추기 위해 의존성 주입을 사용한다.  


# 모듈 공유 방법
1. Module 안에 있는 Class(Service, Repository...)를 Export 한다.
2. 사용하려는 Module에서 위 Module을 Import한다.
3. Constructor 생성자에 인자로 Class(Service, Repo...)를 넘겨 사용한다.