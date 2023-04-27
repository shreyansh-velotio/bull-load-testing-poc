import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { AppService } from './app.service';
import { QUEUE_NAMES } from './queue/enums/queue.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async addJob() {
    await this.appService.addJob();
    return {
      message: 'Job added',
    };
  }
}
