import { IsNumber, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class AddJobRequestDto {
  @IsNumber()
  @IsNotEmpty()
  readonly queueNumber: number;

  @IsOptional()
  @IsBoolean()
  readonly isComputationIntensive?: boolean = false;
}
