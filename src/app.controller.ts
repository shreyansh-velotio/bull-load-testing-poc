import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('jobs')
  async addJob(@Body('jobType') jobType: string) {
    await this.appService.addJob(jobType);
    return {
      message: 'Job added',
    };
  }
}
