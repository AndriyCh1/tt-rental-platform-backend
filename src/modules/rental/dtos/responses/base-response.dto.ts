import { ApiProperty } from '@nestjs/swagger';

export class RentalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty({ required: false })
  contactPhone?: string;
}
