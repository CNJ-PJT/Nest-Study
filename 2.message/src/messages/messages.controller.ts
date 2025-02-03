import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messageService: MessagesService;
  constructor() {
    // DONT APPLY THIS CODE AT REAL APP
    // UPDATE DEPENDENCY INJECTION
    this.messageService = new MessagesService();
  }
  @Get()
  listMessages() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }
}
