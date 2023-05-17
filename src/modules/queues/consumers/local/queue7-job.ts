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

@Processor(QUEUE_NAMES.QUEUE7)
export class Queue7Job {
  private readonly logger = new Logger(Queue7Job.name);

  @Process({
    name: JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE7,
    concurrency: QUEUE_CONCURRENCY,
  })
  async queue7Job(job: Job) {
    this.logger.log(`${JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE7}: Started`);
    const { data } = job;
    if (data.isComputationIntensive) {
      simulateComputationIntensiveTask();
    } else {
      simulateComputationLightTask();
    }
    this.logger.log(`${JOB_NAMES.LOCAL_SCOPED_JOB_FOR_QUEUE7}: Completed`);
  }
}
