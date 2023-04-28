import { Module } from '@nestjs/common';
import { BullModule, BullQueueProcessor } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import GLOBAL_CONSUMERS from '../queues/consumers/global';
import { REDIS_PORT, REDIS_URL } from 'src/constants';
import { QUEUE_NAMES } from '../queues/enums/queue-name.enum';
import LOCAL_CONSUMERS from '../queues/consumers/local';

const globalQueueProcessors: BullQueueProcessor[] = [...GLOBAL_CONSUMERS].map(
  (consumer) => {
    return {
      name: consumer.JOB_NAME,
      path: consumer.PATH,
      concurrency: consumer.CONCURRENCY,
    };
  },
);

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: REDIS_URL,
        port: REDIS_PORT,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.LOCAL_SCHEDULED_JOBS_QUEUE,
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.GLOBAL_SCHEDULED_JOBS_QUEUE,
      processors: globalQueueProcessors,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...LOCAL_CONSUMERS],
})
export class AppModule {}
