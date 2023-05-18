import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

import { QUEUE_NAMES } from '../enums/queue-name.enum';
import { JOB_NAMES } from '../enums/job-name.enum';
import { MAX_QUEUE_SIZE } from '../../shared/constants';

@Injectable()
export class ProducerService {
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

  async addLocalJob(
    queueNumber: number,
    isComputationIntensive = false,
  ): Promise<Job<any>> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getLocalJobName(queueNumber);

    return queue.add(JOB_NAMES[jobName], {
      isComputationIntensive,
    });
  }

  async addLocalJobInBatch(
    queueNumber: number,
    isComputationIntensive = false,
    batchSize = 10,
  ): Promise<Job<any>[]> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getLocalJobName(queueNumber);

    const jobs = [];
    for (let i = 0; i < batchSize; i++) {
      jobs.push({
        name: JOB_NAMES[jobName],
        data: {
          isComputationIntensive,
        },
      });
    }
    return queue.addBulk(jobs);
  }

  async addLocalJobWithDelay(
    queueNumber: number,
    isComputationIntensive = false,
  ): Promise<Job<any>> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getLocalJobName(queueNumber);

    return queue.add(
      JOB_NAMES[jobName],
      {
        isComputationIntensive,
      },
      {
        delay: 1000,
      },
    );
  }

  async addGlobalJob(
    queueNumber: number,
    isComputationIntensive = false,
  ): Promise<Job<any>> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getGlobalJobName(queueNumber);

    return queue.add(JOB_NAMES[jobName], {
      isComputationIntensive,
    });
  }

  private validateAndGetQueue(queueNumber: number): Queue<any> {
    if (queueNumber < 1 && queueNumber > MAX_QUEUE_SIZE)
      throw new BadRequestException('Invalid queue number');

    const queue = [
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
    return queue[queueNumber - 1];
  }

  private getLocalJobName(queueNumber: number): string {
    return `LOCAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`;
  }

  private getGlobalJobName(queueNumber: number): string {
    return `GLOBAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`;
  }
}
