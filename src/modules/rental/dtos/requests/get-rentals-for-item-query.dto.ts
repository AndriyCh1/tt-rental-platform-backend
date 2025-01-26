import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { RentalStatus, RentalStatusEnum } from '#shared/types/models';

export class GetRentalsForItemQueryDto {
  @ApiProperty({
    enum: RentalStatusEnum,
    required: false,
  })
  @IsOptional()
  status?: RentalStatus;
}
