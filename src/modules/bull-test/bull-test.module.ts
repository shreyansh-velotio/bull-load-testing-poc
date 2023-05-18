import { Module } from '@nestjs/common';

import { BullTestController } from './bull-test.controller';
import { BullTestService } from './bull-test.service';
import { ProducerModule } from '../queues/producer/producer.module';

@Module({
  imports: [ProducerModule],
  controllers: [BullTestController],
  providers: [BullTestService],
})
export class BullTestModule {}
