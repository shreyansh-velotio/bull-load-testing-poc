import { Job } from 'bull';
import { Processor } from '@nestjs/bull';
import { basename, join } from 'path';
import { Logger } from '@nestjs/common';

import { QUEUE_NAMES } from '../../enums/queue-name.enum';
import { JOB_NAMES } from '../../enums/job-name.enum';
import { QUEUE_CONCURRENCY } from '../../../shared/constants';
import {
  simulateComputationIntensiveTask,
  simulateComputationLightTask,
} from '../tasks';

@Processor(QUEUE_NAMES.QUEUE8)
export class Queue8Job {
  static get PATH() {
    const filePath = join(__dirname, basename(__filename));
    return filePath;
  }

  static get JOB_NAME() {
    return JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE8;
  }

  static get CONCURRENCY() {
    return QUEUE_CONCURRENCY;
  }

  static get QUEUE_NAME() {
    return QUEUE_NAMES.QUEUE8;
  }

  static handleJob(job: Job) {
    const logger = new Logger(Queue8Job.name);
    logger.log(`${JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE8}: Started`);
    const { data } = job;
    if (data.isComputationIntensive) {
      simulateComputationIntensiveTask();
    } else {
      simulateComputationLightTask();
    }
    logger.log(`${JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE8}: Completed`);
  }
}

export default Queue8Job.handleJob.bind(Queue8Job);
