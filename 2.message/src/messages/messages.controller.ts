import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return 'hi'
    }

    @Post()
    createMessage() {

    }

    @Get("/:id")
    getMessage() {

    }
}
