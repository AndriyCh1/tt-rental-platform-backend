import { Injectable } from '@nestjs/common';

import { Entity } from '#shared/types/database';
import { Rental } from '#shared/types/models';

@Injectable()
export class RentalRepository {
  private rentals: Rental[] = [];

  async insert(rental: Entity<Rental>): Promise<Rental> {
    const id = this.rentals.length + 1;
    const newRental = { ...rental, id };
    this.rentals.push(newRental);

    return newRental;
  }

  async findAll(): Promise<Rental[]> {
    return this.rentals;
  }

  async findById(id: Rental['id']): Promise<Rental | null> {
    return this.rentals.find((rental) => rental.id === id) || null;
  }
  async updateById(
    id: Rental['id'],
    updateData: Partial<Entity<Rental>>,
  ): Promise<Rental> {
    const index = this.rentals.findIndex((res) => res.id === id);

    if (index === -1) {
      throw new Error('Rental not found');
    }

    this.rentals[index] = { ...this.rentals[index], ...updateData };

    return this.rentals[index];
  }
}
