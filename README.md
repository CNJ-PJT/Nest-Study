# Nest-Study

# dependencies

    "@nestjs/common": "^7.6.17",             : nestjs Class 함수를 사용하기 위한 라이브러리
    "@nestjs/core": "^7.6.17",
    "@nestjs/platform-express": "^7.6.17",   : Http 통신을 처리할 수 있는 express 프레임워크 라이브러리, Fastify도 사용 가능...
    "reflect-metadata": "^0.1.13",           : Decorator를 사용할 수있도록 하는 라이브러리
    "typescript": "^4.3.2",
    "class-transformer": "^0.5.1",           : body가 DTO 클래스의 인스턴스로 바뀜
    "class-validator": "^0.14.1",            : 인스턴스 검증
    "sqlite3": "^5.1.7",
    "typeorm": "^0.3.20",
    "@nestjs/typeorm": "^11.0.0",

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

1. @Param() => https://localhost:3000/[id] => @Param(id)
2. @Query()
3. @Body() => http의 body
4. @Header()

# 자동 validation 세팅 과정

1. global validation 연결하기

```
// main.ts
app.useGloablPipes(
    new ValidationPipe({
        whitelist:true
    })
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

🚧whitelist 설정
True: DTO로 정의한 변수만 전달받음
False: Request한 모든 변수를 전달받음

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

# 엔터티 생성방법

1. Entity class를 생성한다.
2. 부모 모듈에 entity를 import한다. (TypeORM.forFeature([엔터티]))
3. app 모듈의 entities에 entity를 나열한다. => 나열한 entity들은 db에 테이블로 만들어진다.

# TypeOrm Synchronize

True로 설정하여 테이블을 반영합니다.  
⚠️ 운영 DB로 전환했을 시 사용하면 안됨 열이 삭제되어 레코드가 사라질 수 있음

# Nest가 추천하는 응답 속성 제외 방법

1. entity에서 제외하고자하는 변수에 @Exclude 설정
2. 컨트롤러에서 @UseInterceptors(ClassSerializeInterceptor) 설정
   ⚠️ 단점 : 엔터티를 다르게 보여주고 싶을 때는 사용이 불가능하다. (동적으로 필드를 제외하거나 포함하는 기능 사용 불가능)

# 더 좋은 방식의 응답 속성 제외 방법

1. 보내고자하는 변수를 가진 dto 생성 (@Expose() 사용)
2. serialize.interceptor.ts에서 SerializeInterceptor 클래스 생성 (NestInterceptor implements)
3. 직렬화 타입 안전성을 위해 serialize 커스텀 데코레이터에 생성자 인터페이스(new (...args : any[] : {})) 적용
4. 컨트롤러 또는 컨트롤러의 매서드에 serialize 커스텀 데코레이터 적용

😊생성자 시그니처란?
클래스처럼 new 키워드로 호출될 수 있는 객체가 어떤 인자를 받고, 어떤 타입의 인스턴스를 반환하는지 정의하는 타입이다.  
TypeScript에서 인터페이스에 생성자 시그니처와 일반 속성을 함께 정의할 수 있지만,  
생성자 시그니처는 인터페이스의 인스턴스 속성이 아니라 타입을 제한하는 용도로 사용되기 때문에 무시된다.  
즉, 인터페이스 자체는 인스턴스의 구조를 정의하는 것이지, 생성된 객체의 내부 속성을 직접 포함하는 것이 아니다.
