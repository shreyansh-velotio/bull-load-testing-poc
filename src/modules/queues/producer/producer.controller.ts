import { Body, Controller, Post } from '@nestjs/common';

import { ProducerService } from './producer.service';
import { AddSingleJobRequestDto } from './dtos/add-single-job-request.dto';

@Controller('produce')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}
  @Post('local-job')
  async addLocalJob(@Body() request: AddSingleJobRequestDto) {
    await this.producerService.addJob(
      request.queueNumber,
      request.isComputationIntensive,
      false,
    );
    return {
      message: 'Local job added',
    };
  }

  @Post('global-job')
  async addGlobalJob(@Body() request: AddSingleJobRequestDto) {
    await this.producerService.addJob(
      request.queueNumber,
      request.isComputationIntensive,
      true,
    );
    return {
      message: 'Global job added',
    };
  }
}
