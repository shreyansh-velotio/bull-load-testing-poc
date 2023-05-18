import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import GLOBAL_CONSUMERS from '../consumers/global';
import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from '../../shared/constants';
import { QUEUE_NAMES } from '../enums/queue-name.enum';
import LOCAL_CONSUMERS from '../consumers/local';

const globalQueueProcessors = [...GLOBAL_CONSUMERS].map((consumer) => {
  return {
    queueName: consumer.QUEUE_NAME,
    name: consumer.JOB_NAME,
    path: consumer.PATH,
    concurrency: consumer.CONCURRENCY,
  };
});

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: REDIS_URL,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE1,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE1),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE2,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE2),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE3,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE3),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE4,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE4),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE5,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE5),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE6,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE6),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE7,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE7),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE8,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE8),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE9,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE9),
      ],
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.QUEUE10,
      processors: [
        globalQueueProcessors.find((p) => p.queueName === QUEUE_NAMES.QUEUE10),
      ],
    }),
  ],
  controllers: [ProducerController],
  providers: [ProducerService, ...LOCAL_CONSUMERS],
  exports: [ProducerService],
})
export class ProducerModule {}
