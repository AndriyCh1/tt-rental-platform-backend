import { Module } from '@nestjs/common';

import { ItemsRepository } from '#modules/items/items.repository';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService],
})
export class ItemsModule {}
