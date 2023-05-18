import { Module } from '@nestjs/common';

import { ProducerModule } from './modules/queues/producer/producer.module';
import { BullTestModule } from './modules/bull-test/bull-test.module';

@Module({
  imports: [ProducerModule, BullTestModule],
})
export class AppModule {}
