import { Injectable } from '@nestjs/common';

import { TestParameter } from '../shared/enums/test-parameter.enum';
import { ProducerService } from '../queues/producer/producer.service';
import { TestRequestDto } from './dtos/test-request.dto';
import { MAX_JOB_PER_QUEUE, MAX_QUEUE } from '../shared/constants';

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
       * To test the concurrency settings, one need to manually change the QUEUE's concurrency
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
      for (let queue = 1; queue <= MAX_QUEUE; queue++) {
        for (let job = 1; job <= MAX_JOB_PER_QUEUE; job++) {
          this.producerService.addJob(
            queue,
            isJobComputationIntensive,
            isJobGlobalScoped,
          );
        }
      }
    } else {
      for (let i = 1; i <= MAX_QUEUE * MAX_JOB_PER_QUEUE; i++) {
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
      for (let queue = 1; queue <= MAX_QUEUE; queue++) {
        this.producerService.addJobInBatch(
          queue,
          isJobComputationIntensive,
          MAX_JOB_PER_QUEUE,
          isJobGlobalScoped,
        );
      }
    } else {
      for (let queue = 1; queue <= MAX_QUEUE; queue++) {
        this.producerService.addJobInBatch(
          1,
          isJobComputationIntensive,
          MAX_JOB_PER_QUEUE,
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
      for (let queue = 1; queue <= MAX_QUEUE; queue++) {
        for (let job = 1; job <= MAX_JOB_PER_QUEUE; job++) {
          this.producerService.addJobWithDelay(
            queue,
            isJobComputationIntensive,
            isJobGlobalScoped,
          );
        }
      }
    } else {
      for (let i = 1; i <= MAX_QUEUE * MAX_JOB_PER_QUEUE; i++) {
        this.producerService.addJobWithDelay(
          1,
          isJobComputationIntensive,
          isJobGlobalScoped,
        );
      }
    }
  }
}
