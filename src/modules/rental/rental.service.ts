import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ItemsService } from '#modules/items/items.service';
import { Reservation } from '#shared/types/models';

import {
  InvalidDateRangeException,
  ItemNotFoundException,
  NoActiveReservationException,
  OverlappingReservationException,
  PastStartDateException,
} from './exceptions';
import { RentalRepository } from './rental.repository';
import { RentItemData } from './types';

dayjs.extend(utc);

@Injectable()
export class RentalService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly rentalRepository: RentalRepository,
  ) {}

  async rentItem(payload: RentItemData): Promise<Reservation> {
    const { itemId, startDate, endDate } = payload;

    const start = dayjs.utc(startDate).toDate();
    const end = dayjs.utc(endDate).toDate();

    await this.ensureItemExists(itemId);
    this.validateDateRange(start, end);

    const existingReservations = await this.getActiveItemReservations(itemId);

    if (this.hasOverlappingReservation(existingReservations, start, end)) {
      throw new OverlappingReservationException();
    }

    const reservation = await this.rentalRepository.insert({
      itemId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      status: 'active',
    });

    return reservation;
  }

  async getActiveItemReservations(
    itemId: Reservation['itemId'],
  ): Promise<Reservation[]> {
    const reservations = await this.rentalRepository.findAll();

    return reservations.filter(
      (reservation) =>
        reservation.itemId === itemId && reservation.status === 'active',
    );
  }

  async returnItem(itemId: Reservation['itemId']): Promise<void> {
    const currentDate = dayjs.utc().toDate();

    const reservation = await this.findActiveReservationForDate(
      itemId,
      currentDate,
    );

    if (!reservation) {
      throw new NoActiveReservationException();
    }

    await this.rentalRepository.updateById(reservation.id, {
      status: 'completed',
    });
  }

  private async ensureItemExists(itemId: Reservation['itemId']): Promise<void> {
    const item = await this.itemsService.getItemById(itemId);

    if (!item) {
      throw new ItemNotFoundException();
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

  private hasOverlappingReservation(
    reservations: Reservation[],
    start: Date,
    end: Date,
  ): boolean {
    return reservations.some((reservation) => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);

      return (
        (start <= resEnd && start >= resStart) ||
        (end <= resEnd && end >= resStart)
      );
    });
  }

  private async findActiveReservationForDate(
    itemId: Reservation['itemId'],
    date: Date,
  ): Promise<Reservation | null> {
    const reservations = await this.getActiveItemReservations(itemId);

    return (
      reservations.find((reservation) => {
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return start <= date && end >= date;
      }) || null
    );
  }
}
