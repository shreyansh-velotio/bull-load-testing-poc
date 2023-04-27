import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';

import { QUEUE_NAMES } from '../enums/queue.enum';

@Processor(QUEUE_NAMES.LOCAL_SCHEDULED_JOBS_QUEUE)
export class BaseJob {
  @Process()
  async base(job: Job) {
    console.log(`Consuming the job`);
  }
}
