import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { AddJobRequestDto } from './dto/add-job-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('local-job')
  async addLocalJob(@Body() request: AddJobRequestDto) {
    await this.appService.addLocalJob(
      request.queueNumber,
      request.isComputationIntensive,
    );
    return {
      message: 'Local job added',
    };
  }

  @Post('global-job')
  async addGlobalJob(@Body() request: AddJobRequestDto) {
    await this.appService.addGlobalJob(
      request.queueNumber,
      request.isComputationIntensive,
    );
    return {
      message: 'Global job added',
    };
  }
}
