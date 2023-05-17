import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

import { QUEUE_NAMES } from '../queues/enums/queue-name.enum';
import { JOB_NAMES } from '../queues/enums/job-name.enum';
import { MAX_QUEUE_SIZE } from '../../constants';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(QUEUE_NAMES.QUEUE1)
    private queue1: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE2)
    private queue2: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE3)
    private queue3: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE4)
    private queue4: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE5)
    private queue5: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE6)
    private queue6: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE7)
    private queue7: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE8)
    private queue8: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE9)
    private queue9: Queue,
    @InjectQueue(QUEUE_NAMES.QUEUE10)
    private queue10: Queue,
  ) {}

  getQueues() {
    return [
      this.queue1,
      this.queue2,
      this.queue3,
      this.queue4,
      this.queue5,
      this.queue6,
      this.queue7,
      this.queue8,
      this.queue9,
      this.queue10,
    ];
  }

  async addGlobalJob(
    queueNumber: number,
    isComputationIntensive = false,
  ): Promise<Job<any>> {
    if (queueNumber < 1 && queueNumber > MAX_QUEUE_SIZE)
      throw new BadRequestException('Invalid queue number');
    const queue = this.getQueues()[queueNumber - 1];
    const jobName = `GLOBAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`;
    return queue.add(JOB_NAMES[jobName], {
      isComputationIntensive,
    });
  }

  async addLocalJob(
    queueNumber: number,
    isComputationIntensive = false,
  ): Promise<Job<any>> {
    if (queueNumber < 1 && queueNumber > MAX_QUEUE_SIZE)
      throw new BadRequestException('Invalid queue number');
    const queue = this.getQueues()[queueNumber - 1];
    const jobName = `LOCAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`;
    return queue.add(JOB_NAMES[jobName], {
      isComputationIntensive,
    });
  }
}
