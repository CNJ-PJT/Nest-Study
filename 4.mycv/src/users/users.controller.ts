import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('/signup')
    CreateUser(@Body() body: CreateUserDto) {
        console.log(body.email);
        console.log(body.password);
        console.log(body);
    }
}
