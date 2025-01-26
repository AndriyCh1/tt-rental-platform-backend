import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { IsDateWithTimezoneConstraint } from '#shared/utils/validators';

function IsDateWithTimezone(options?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string) => {
    const validationOptions: ValidationOptions = {
      ...options,
      message: `${propertyKey} must be a valid ISO 8601 date with timezone`,
    };
    registerDecorator({
      name: 'IsDateWithTimezone',
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [],
      validator: IsDateWithTimezoneConstraint,
    });
  };
}

export class RequestItemRentDto {
  @ApiProperty({
    example: '2025-03-25T13:00:00.000Z',
    description:
      'The start date of the rental in ISO 8601 format with a timezone.',
  })
  @IsDateWithTimezone()
  startDate: string;

  @ApiProperty({
    example: '2025-04-25T13:00:00.000Z',
    description:
      'The end date of the rental in ISO 8601 format with a timezone.',
  })
  @IsDateWithTimezone()
  endDate: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  contactEmail: string;

  @ApiProperty({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  contactPhone?: string;
}
