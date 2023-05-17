import { Job } from 'bull';
import { Processor } from '@nestjs/bull';
import { basename, join } from 'path';
import { Logger } from '@nestjs/common';

import { QUEUE_NAMES } from '../../enums/queue-name.enum';
import { JOB_NAMES } from '../../enums/job-name.enum';
import { QUEUE_CONCURRENCY } from '../../../../constants';
import {
  simulateComputationIntensiveTask,
  simulateComputationLightTask,
} from '../tasks';

@Processor(QUEUE_NAMES.QUEUE7)
export class Queue7Job {
  static get PATH() {
    const filePath = join(__dirname, basename(__filename));
    return filePath;
  }

  static get JOB_NAME() {
    return JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE7;
  }

  static get CONCURRENCY() {
    return QUEUE_CONCURRENCY;
  }

  static get QUEUE_NAME() {
    return QUEUE_NAMES.QUEUE7;
  }

  static handleJob(job: Job) {
    const logger = new Logger(Queue7Job.name);
    logger.log(`${JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE7}: Started`);
    const { data } = job;
    if (data.isComputationIntensive) {
      simulateComputationIntensiveTask();
    } else {
      simulateComputationLightTask();
    }
    logger.log(`${JOB_NAMES.GLOBAL_SCOPED_JOB_FOR_QUEUE7}: Completed`);
  }
}

export default Queue7Job.handleJob.bind(Queue7Job);
