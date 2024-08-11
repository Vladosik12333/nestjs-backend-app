import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject() private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
