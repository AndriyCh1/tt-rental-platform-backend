import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { RentalStatus, RentalStatusEnum } from '#shared/types/models';

export class UpdateRentalStatusDto {
  @ApiProperty({
    enum: RentalStatusEnum,
    description:
      'Rental status. Allowed values: "pending", "approved", "declined", "reserved", "completed", "cancelled',
  })
  @IsEnum(RentalStatusEnum)
  status: RentalStatus;
}
