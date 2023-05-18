import { IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { TestParameter } from '../../shared/enums/test-scenario.enum';

export class TestRequestDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value ?? false)
  useMultipleQueue: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value ?? false)
  isJobGlobalScoped: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value ?? false)
  isJobComputationIntensive: boolean;

  @IsEnum(TestParameter)
  @IsOptional()
  @Transform(({ value }) => value || TestParameter.NONE)
  readonly testParameter: string;
}
