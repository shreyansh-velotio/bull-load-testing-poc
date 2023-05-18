import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { QUEUE_NAMES } from '../enums/queue-name.enum';
import { JOB_NAMES } from '../enums/job-name.enum';
import { MAX_QUEUE } from '../../shared/constants';

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

  public async addJob(
    queueNumber: number,
    isComputationIntensive: boolean,
    isJobGlobalScoped: boolean,
  ): Promise<Job<any>> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getJobName(queueNumber, isJobGlobalScoped);

    return queue.add(JOB_NAMES[jobName], {
      isComputationIntensive,
    });
  }

  public async addJobInBatch(
    queueNumber: number,
    isComputationIntensive: boolean,
    batchSize: number,
    isJobGlobalScoped: boolean,
  ): Promise<Job<any>[]> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getJobName(queueNumber, isJobGlobalScoped);

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

  public async addJobWithDelay(
    queueNumber: number,
    isComputationIntensive: boolean,
    isJobGlobalScoped: boolean,
  ): Promise<Job<any>> {
    const queue = this.validateAndGetQueue(queueNumber);
    const jobName = this.getJobName(queueNumber, isJobGlobalScoped);

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

  private validateAndGetQueue(queueNumber: number): Queue<any> {
    if (queueNumber < 1 && queueNumber > MAX_QUEUE)
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

  private getJobName(queueNumber: number, isJobGlobalScoped: boolean): string {
    return isJobGlobalScoped
      ? `GLOBAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`
      : `LOCAL_SCOPED_JOB_FOR_QUEUE${queueNumber}`;
  }
}
