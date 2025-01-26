import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor({ id }: { id: number }) {
    super(`${`Item with ID ${id} not found`}`);
  }
}

export class RentalNotFoundException extends NotFoundException {
  constructor({ id }: { id: number }) {
    super(`Rental with ID ${id} not found`);
  }
}

export class InvalidDateRangeException extends BadRequestException {
  constructor() {
    super('End date is before start date');
  }
}

export class PastStartDateException extends BadRequestException {
  constructor() {
    super('Start date is in the past');
  }
}

export class OverlappingRentalsException extends ConflictException {
  constructor() {
    super('Item is already rented on this date');
  }
}
