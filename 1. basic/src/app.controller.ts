import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
    @Get('/hi')
    getRootRouter() {
        return 'hi there!';
    }

    @Get('/bye')
    getByeRouter() {
        return 'Bye Bye';
    }
}