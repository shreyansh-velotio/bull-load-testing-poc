import { Body, Controller, Post } from '@nestjs/common';

import { SqLsChService } from './sq-ls-ch.service';
import { TestRequestDto } from './dtos/test-request.dto';

@Controller('/sq-ls-ch')
export class SqLsChController {
  constructor(private readonly sqLsChService: SqLsChService) {}

  @Post()
  async test(@Body() request: TestRequestDto) {
    this.sqLsChService.test(request.testParameter);
    return {
      message: `Locally scoped and computation intensive jobs on a single queue got triggered for test scenario: ${request.testParameter}`,
    };
  }
}
