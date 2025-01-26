import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  pricePerDay: number;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty({ required: false })
  contactPhone?: string;
}
