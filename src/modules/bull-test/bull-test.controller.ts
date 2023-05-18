import { Body, Controller, Post } from '@nestjs/common';

import { BullTestService } from './bull-test.service';
import { TestRequestDto } from './dtos/test-request.dto';

@Controller('/bull-test')
export class BullTestController {
  constructor(private readonly sqLsChService: BullTestService) {}

  @Post()
  test(@Body() testRequest: TestRequestDto) {
    this.sqLsChService.test(testRequest);

    const scope = testRequest.isJobGlobalScoped
      ? 'global scope'
      : 'local scope';
    const queue = testRequest.useMultipleQueue
      ? 'multiple queues'
      : 'a single queue';
    const computation = testRequest.isJobComputationIntensive
      ? 'computationally intensive'
      : 'non-computationally intensive';
    const testParameter = testRequest.testParameter
      ? `for ${testRequest.testParameter} test parameter `
      : '';

    return {
      message: `${computation} jobs with ${scope} got triggered on ${queue} ${testParameter}successfully`,
    };
  }
}
