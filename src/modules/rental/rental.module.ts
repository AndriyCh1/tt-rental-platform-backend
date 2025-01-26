import { Module } from '@nestjs/common';

import { ItemsModule } from '#modules/items/items.module';

import { RentalController } from './rental.controller';
import { RentalRepository } from './rental.repository';
import { RentalService } from './rental.service';

@Module({
  imports: [ItemsModule],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository],
  exports: [RentalService],
})
export class RentalModule {}
