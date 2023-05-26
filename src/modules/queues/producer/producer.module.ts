import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import GLOBAL_CONSUMERS from '../consumer/global';
import {
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_URL,
  REDIS_USER,
} from '../../shared/constants';
import LOCAL_CONSUMERS from '../consumer/local';
import { getQueues } from './helpers/producer.helper';

const globalQueueProcessors = [...GLOBAL_CONSUMERS].map((consumer) => {
  return {
    queueName: consumer.QUEUE_NAME,
    name: consumer.JOB_NAME,
    path: consumer.PATH,
    concurrency: consumer.CONCURRENCY,
  };
});

const registeredQueues = getQueues().map((queueName) => {
  return BullModule.registerQueue({
    name: queueName,
    processors: [globalQueueProcessors.find((p) => p.queueName === queueName)],
  });
});

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: REDIS_URL,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
        username: REDIS_USER,
      },
    }),
    ...registeredQueues,
  ],
  controllers: [ProducerController],
  providers: [ProducerService, ...LOCAL_CONSUMERS],
  exports: [ProducerService],
})
export class ProducerModule {}
