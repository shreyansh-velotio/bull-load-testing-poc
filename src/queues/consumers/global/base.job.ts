import { Job } from 'bull';
import { Processor } from '@nestjs/bull';
import { basename, join } from 'path';
import { Logger } from '@nestjs/common';

import { QUEUE_NAMES } from '../../enums/queue-name.enum';

@Processor(QUEUE_NAMES.GLOBAL_SCHEDULED_JOBS_QUEUE)
export class GlobalBaseJob {
  static get PATH() {
    const filePath = join(__dirname, basename(__filename));
    return filePath;
  }

  static get JOB_NAME() {
    return 'global-job';
  }

  static get CONCURRENCY() {
    return 5;
  }

  static handleJob(job: Job) {
    const logger = new Logger(GlobalBaseJob.name);
    logger.log(`Consuming the global job`);
  }
}

export default GlobalBaseJob.handleJob;
