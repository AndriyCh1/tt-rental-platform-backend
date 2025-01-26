import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetRentalsForItemQueryDto } from '#modules/rental/dtos/requests/get-rentals-for-item-query.dto';
import { RequestItemRentDto } from '#modules/rental/dtos/requests/request-item-rent.dto';
import { UpdateRentalStatusDto } from '#modules/rental/dtos/requests/update-rental-status.dto';
import { RentalResponseDto } from '#modules/rental/dtos/responses/base-response.dto';
import { RentalService } from '#modules/rental/rental.service';
import { Rental } from '#shared/types/models';

@ApiTags('Rentals')
@Controller('/rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('/items/:itemId')
  @ApiOperation({ summary: 'Requests an item to be rented.' })
  @ApiCreatedResponse({ type: RentalResponseDto })
  @ApiConflictResponse({ description: 'Item is already rented.' })
  @ApiBadRequestResponse({
    description:
      'Invalid date range / End date is before start date / Start date is in the past.',
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async requestItemRent(
    @Body() dto: RequestItemRentDto,
    @Param('itemId') itemId: string,
  ): Promise<Rental> {
    return this.rentalService.initiateItemRent({
      itemId: +itemId,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      contactEmail: dto.contactEmail,
      contactPhone: dto.contactPhone,
    });
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update the status of a rental.' })
  @ApiOkResponse({ type: RentalResponseDto })
  async updateRentalStatus(
    @Param('id') id: string,
    @Body() dto: UpdateRentalStatusDto,
  ) {
    return this.rentalService.updateRentalStatus(+id, dto.status);
  }

  @Get('/items/:itemId')
  @ApiOperation({ summary: 'Return all rentals for an item.' })
  @ApiOkResponse({ type: RentalResponseDto, isArray: true })
  async getRentalsByItemId(
    @Param('itemId') id: string,
    @Query() query: GetRentalsForItemQueryDto,
  ): Promise<Rental[]> {
    return this.rentalService.getRentalsByItemId(+id, { status: query.status });
  }
}
