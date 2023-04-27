import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

import { QUEUE_NAMES } from './queue/enums/queue.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(QUEUE_NAMES.LOCAL_SCHEDULED_JOBS_QUEUE)
    private baseJobQueue: Queue,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addJob(): Promise<Job<any>> {
    return this.baseJobQueue.add({});
  }
}
