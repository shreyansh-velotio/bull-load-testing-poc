import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

import { QUEUE_NAMES } from './queues/enums/queue-name.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(QUEUE_NAMES.LOCAL_SCHEDULED_JOBS_QUEUE)
    private localBaseJobQueue: Queue,
    @InjectQueue(QUEUE_NAMES.GLOBAL_SCHEDULED_JOBS_QUEUE)
    private globalBaseJobQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addLocalJob(jobType: string): Promise<Job<any>> {
    return this.localBaseJobQueue.add(jobType);
  }

  async addGlobalJob(jobType: string): Promise<Job<any>> {
    return this.globalBaseJobQueue.add(jobType);
  }
}
