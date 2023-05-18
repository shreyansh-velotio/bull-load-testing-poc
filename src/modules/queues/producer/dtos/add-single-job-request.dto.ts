import { IsNumber, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class AddSingleJobRequestDto {
  @IsNumber()
  @IsNotEmpty()
  readonly queueNumber: number;

  @IsOptional()
  @IsBoolean()
  readonly isComputationIntensive?: boolean = false;
}
