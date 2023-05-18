import { BadRequestException, Injectable } from '@nestjs/common';

import { TestParameter } from '../shared/enums/test-parameter.enum';
import { ProducerService } from '../queues/producer/producer.service';
import { TestRequestDto } from './dtos/test-request.dto';

@Injectable()
export class BullTestService {
  constructor(private readonly producerService: ProducerService) {}

  public test(testRequestDto: TestRequestDto) {
    const {
      testParameter,
      useMultipleQueue,
      isJobComputationIntensive,
      isJobGlobalScoped,
    } = testRequestDto;

    switch (testParameter) {
      case TestParameter.BATCH_PROCESSING:
        this.testForBatchProcessing(
          useMultipleQueue,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
        break;
      case TestParameter.DELAYED_JOBS:
        this.testForDelayedJobs(
          useMultipleQueue,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
        break;
      /**
       * To test concurrency-settings, one need to manually change the QUEUE's concurrency
       * on file src/modules/shared/constants.ts to test different concurrency settings
       */
      case TestParameter.CONCURRENCY_SETTINGS:
      default:
        this.testForNone(
          useMultipleQueue,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
        break;
    }
  }

  private testForNone(
    useMultipleQueue = false,
    isJobComputationIntensive = false,
    isJobGlobalScoped = false,
  ) {
    if (useMultipleQueue) {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          this.producerService.addJob(
            i,
            isJobComputationIntensive,
            isJobGlobalScoped,
          );
        }
      }
    } else {
      for (let i = 1; i <= 100; i++) {
        this.producerService.addJob(
          1,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
      }
    }
  }

  private testForBatchProcessing(
    useMultipleQueue = false,
    isJobComputationIntensive = false,
    isJobGlobalScoped = false,
  ) {
    if (useMultipleQueue) {
      for (let i = 1; i <= 10; i++) {
        this.producerService.addJobInBatch(
          i,
          isJobComputationIntensive,
          10,
          isJobGlobalScoped,
        );
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        this.producerService.addJobInBatch(
          1,
          isJobComputationIntensive,
          10,
          isJobGlobalScoped,
        );
      }
    }
  }

  private testForDelayedJobs(
    useMultipleQueue = false,
    isJobComputationIntensive = false,
    isJobGlobalScoped = false,
  ) {
    if (useMultipleQueue) {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          this.producerService.addJobWithDelay(
            i,
            isJobComputationIntensive,
            isJobGlobalScoped,
          );
        }
      }
    } else {
      for (let i = 1; i <= 100; i++) {
        this.producerService.addJobWithDelay(
          1,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
      }
    }
  }
}
