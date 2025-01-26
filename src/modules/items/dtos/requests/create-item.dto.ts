import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'Toyota Camry 2022' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Toyota Camry 2022, 4 doors, 2.5L, 4WD, black, automatic',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  image?: string;

  @ApiProperty({ example: 'cars' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  pricePerDay: number;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  contactEmail: string;

  @ApiProperty({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  contactPhone?: string;
}
