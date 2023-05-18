import { IsEnum, IsBoolean, IsOptional } from 'class-validator';

import { TestParameter } from '../../shared/enums/test-parameter.enum';

export class TestRequestDto {
  @IsBoolean()
  @IsOptional()
  useMultipleQueue: boolean;

  @IsBoolean()
  @IsOptional()
  isJobGlobalScoped: boolean;

  @IsBoolean()
  @IsOptional()
  isJobComputationIntensive: boolean;

  @IsEnum(TestParameter)
  @IsOptional()
  readonly testParameter: string;
}
