import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  status: string;
}
