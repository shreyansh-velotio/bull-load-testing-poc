import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('local-jobs')
  async addLocalJob(@Body('jobType') jobType: string) {
    await this.appService.addLocalJob(jobType);
    return {
      message: 'Local job added',
    };
  }

  @Post('global-jobs')
  async addGlobalJob(@Body('jobType') jobType: string) {
    await this.appService.addGlobalJob(jobType);
    return {
      message: 'Global job added',
    };
  }
}
