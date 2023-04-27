import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseJob } from './queue/consumers/base.job';
import { QUEUE_NAMES } from './queue/enums/queue.enum';
import { REDIS_PORT, REDIS_URL } from './constants';

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
  ],
  controllers: [AppController],
  providers: [AppService, BaseJob],
})
export class AppModule {}
