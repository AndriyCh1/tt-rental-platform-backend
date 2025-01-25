import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor() {
    super('Item not found');
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

export class OverlappingReservationException extends ConflictException {
  constructor() {
    super('Reservation not available, item is already reserved');
  }
}

export class NoActiveReservationException extends NotFoundException {
  constructor() {
    super('No active reservation found');
  }
}
