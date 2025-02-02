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

