import { Module } from '@nestjs/common';

import { SqLsChController } from './sq-ls-ch.controller';
import { SqLsChService } from './sq-ls-ch.service';
import { ProducerModule } from '../../queues/producer/producer.module';

/**
 * SQ: Single queue
 * LS: Local scoped jobs
 * CI: Computation intensive jobs
 */
@Module({
  imports: [ProducerModule],
  controllers: [SqLsChController],
  providers: [SqLsChService],
})
export class SqLsChModule {}
