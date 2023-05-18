import { BadRequestException, Injectable } from '@nestjs/common';

import { TestParameter } from '../../shared/enums/test-scenario.enum';
import { ProducerService } from '../../queues/producer/producer.service';

@Injectable()
export class SqLsChService {
  constructor(private readonly producerService: ProducerService) {}

  public test(testScenario: string) {
    switch (testScenario) {
      case TestParameter.NONE:
        this.testForNone();
        break;
      case TestParameter.BATCH_PROCESSING:
        this.testForBatchProcessing();
        break;
      case TestParameter.CONCURRENCY_SETTINGS:
        this.testForNone();
        break;
      case TestParameter.DELAYED_JOBS:
        this.testForDelayedJobs();
        break;
      default:
        throw new BadRequestException('Invalid test parameter');
    }
  }

  private async testForNone() {
    for (let i = 1; i <= 100; i++) {
      await this.producerService.addLocalJob(1, true);
    }
  }

  private async testForBatchProcessing() {
    for (let i = 0; i < 10; i++) {
      await this.producerService.addLocalJobInBatch(1, true, 10);
    }
  }

  private async testForDelayedJobs() {
    for (let i = 1; i <= 100; i++) {
      await this.producerService.addLocalJobWithDelay(1, true);
    }
  }
}
