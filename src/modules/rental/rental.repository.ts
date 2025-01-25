import { Injectable } from '@nestjs/common';

import { Entity } from '#shared/types/database';
import { Reservation } from '#shared/types/models';

@Injectable()
export class RentalRepository {
  private reservations: Reservation[] = [];

  async insert(reservation: Entity<Reservation>): Promise<Reservation> {
    const id = this.reservations.length + 1;
    const newReservation = { ...reservation, id };
    this.reservations.push(newReservation);

    return newReservation;
  }

  async findAll(): Promise<Reservation[]> {
    return [...this.reservations];
  }

  async updateById(
    id: Reservation['id'],
    updateData: Partial<Entity<Reservation>>,
  ): Promise<void> {
    const index = this.reservations.findIndex((res) => res.id === id);

    if (index === -1) return;

    this.reservations[index] = { ...this.reservations[index], ...updateData };
  }
}
