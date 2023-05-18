import { IsNotEmpty, IsEnum } from 'class-validator';

import { TestParameter } from '../../../shared/enums/test-scenario.enum';

export class TestRequestDto {
  @IsEnum(TestParameter)
  @IsNotEmpty()
  readonly testParameter: string;
}
