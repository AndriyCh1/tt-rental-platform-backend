import { NotFoundException } from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor({ id }: { id: number }) {
    super(`Item with ID ${id} not found`);
  }
}
