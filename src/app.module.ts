import { Module } from '@nestjs/common';

import { ProducerModule } from './modules/queues/producer/producer.module';
import { SqLsChModule } from './modules/scenarios/sq-ls-ch/sq-ls-ch.module';

@Module({
  imports: [ProducerModule, SqLsChModule],
})
export class AppModule {}
