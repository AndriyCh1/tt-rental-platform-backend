import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ItemsService } from '#modules/items/items.service';
import { Rental } from '#shared/types/models';
import { checkDatesOverlapping } from '#shared/utils/dates';

import {
  InvalidDateRangeException,
  ItemNotFoundException,
  OverlappingRentalsException,
  PastStartDateException,
  RentalNotFoundException,
} from './exceptions';
import { RentalRepository } from './rental.repository';
import { CreateRentalData, GetRentalsByItemOptions } from './types';

dayjs.extend(utc);

@Injectable()
export class RentalService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly rentalRepository: RentalRepository,
  ) {}

  async initiateItemRent(payload: CreateRentalData): Promise<Rental> {
    const { itemId, startDate, endDate, contactEmail, contactPhone } = payload;

    const start = dayjs.utc(startDate).toDate();
    const end = dayjs.utc(endDate).toDate();

    await this.ensureItemExists(itemId);
    this.validateDateRange(start, end);

    const reservedRentals = await this.getRentalsByItemId(itemId, {
      status: 'reserved',
    });

    if (this.hasOverlappingRentals(reservedRentals, start, end)) {
      throw new OverlappingRentalsException();
    }

    const rental = await this.rentalRepository.insert({
      itemId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      status: 'pending',
      contactEmail,
      contactPhone,
    });

    return rental;
  }

  async updateRentalStatus(
    id: Rental['id'],
    status: Rental['status'],
  ): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);

    if (!rental) {
      throw new RentalNotFoundException({ id });
    }

    return this.rentalRepository.updateById(id, { status });
  }

  async getRentalsByItemId(
    itemId: Rental['itemId'],
    options: GetRentalsByItemOptions = {},
  ): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findAll();

    const filteredRentals = rentals.filter((rental) => {
      if (rental.itemId !== itemId) {
        return false;
      }

      if (options.status && rental.status !== options.status) {
        return false;
      }

      return true;
    });

    return filteredRentals;
  }

  private async ensureItemExists(itemId: Rental['itemId']): Promise<void> {
    const item = await this.itemsService.getItemById(itemId);

    if (!item) {
      throw new ItemNotFoundException({ id: itemId });
    }
  }

  private validateDateRange(start: Date, end: Date): void {
    if (dayjs(end).isBefore(start)) {
      throw new InvalidDateRangeException();
    }

    if (dayjs(start).isBefore(dayjs.utc())) {
      throw new PastStartDateException();
    }
  }

  private hasOverlappingRentals(
    rentals: Rental[],
    start: Date,
    end: Date,
  ): boolean {
    return rentals.some((rental) => {
      const rentalStart = new Date(rental.startDate);
      const rentalEnd = new Date(rental.endDate);

      return checkDatesOverlapping(start, end, rentalStart, rentalEnd);
    });
  }
}
