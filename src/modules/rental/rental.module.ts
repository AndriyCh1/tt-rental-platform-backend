import { Module } from '@nestjs/common';

import { ItemsModule } from '#modules/items/items.module';
import { RentalRepository } from '#modules/rental/rental.repository';

import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [ItemsModule],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository],
  exports: [RentalService],
})
export class RentalModule {}
