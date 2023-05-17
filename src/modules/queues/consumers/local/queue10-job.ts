import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { QUEUE_NAMES } from '../../enums/queue-name.enum';
import { JOB_NAMES } from '../../enums/job-name.enum';
import {
  simulateComputationIntensiveTask,
  simulateComputationLightTask,
} from '../tasks';
import { QUEUE_CONCURRENCY } from '../../../../constants';

@Processor(QUEUE_NAMES.QUEUE10)
export class Queue10Job {
  private readonly logger = new Logger(Queue10Job.name);

  @Process({
    name: JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE10,
    concurrency: QUEUE_CONCURRENCY,
  })
  async queue10Job(job: Job) {
    this.logger.log(`${JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE10}: Started`);
    const { data } = job;
    if (data.isComputationIntensive) {
      simulateComputationIntensiveTask();
    } else {
      simulateComputationLightTask();
    }
    this.logger.log(`${JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE10}: Completed`);
  }
}
