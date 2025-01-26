import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { toNumberOrFallback } from '#shared/utils/convert-types';

export class GetItemsQueryDto {
  @ApiProperty({
    description: 'Item name, case insensitive, partial match',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Item category',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Minimum price per day',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => toNumberOrFallback(value, undefined))
  minPrice?: number;

  @ApiProperty({
    description: 'Maximum price per day',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => toNumberOrFallback(value, undefined))
  maxPrice?: number;

  @ApiProperty({
    description: 'Field to sort by',
    enum: ['pricePerDay', 'name'],
    required: false,
  })
  @IsOptional()
  @IsIn(['pricePerDay', 'name'])
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    required: false,
    default: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
