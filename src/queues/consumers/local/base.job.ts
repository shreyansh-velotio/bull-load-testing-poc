import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { QUEUE_NAMES } from '../../enums/queue-name.enum';
import { JOB_NAMES } from 'src/queues/enums/job-name.enum';

@Processor(QUEUE_NAMES.LOCAL_SCHEDULED_JOBS_QUEUE)
export class LocalBaseJob {
  private readonly logger = new Logger(LocalBaseJob.name);

  @Process(JOB_NAMES.LOCAL_JOB)
  async base(job: Job) {
    this.logger.log(`Consuming the local job`);
  }
}
