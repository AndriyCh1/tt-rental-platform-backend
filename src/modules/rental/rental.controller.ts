import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { RentItemDto } from '#modules/rental/dtos/requests/rent-item.dto';
import { ReservationResponseDto } from '#modules/rental/dtos/responses/base-response.dto';
import { RentalService } from '#modules/rental/rental.service';
import { Reservation } from '#shared/types/models';

@ApiTags('Rent')
@Controller('/')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get('/items/:itemId/reservations')
  @ApiOperation({ summary: 'Returns all active reservations for an item.' })
  @ApiOkResponse({ type: ReservationResponseDto, isArray: true })
  async getItemReservations(
    @Param('itemId') id: string,
  ): Promise<Reservation[]> {
    return this.rentalService.getActiveItemReservations(+id);
  }

  @Post('/items/:itemId/rent')
  @ApiOperation({ summary: 'Rents an item for a given date range.' })
  @ApiConflictResponse({
    description: 'Reservation not available, item is already reserved.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid date range / End date is before start date / Start date is in the past.',
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async rentItem(
    @Body() dto: RentItemDto,
    @Param('itemId') itemId: string,
  ): Promise<Reservation> {
    return this.rentalService.rentItem({
      itemId: +itemId,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
  }

  @Patch('/items/:itemId/return')
  @ApiOperation({ summary: 'Returns an item.' })
  @ApiNotFoundResponse({ description: 'No active reservation found.' })
  async returnItem(@Param('itemId') id: string): Promise<void> {
    return this.rentalService.returnItem(+id);
  }
}
