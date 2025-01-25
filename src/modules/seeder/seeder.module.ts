import { Module } from '@nestjs/common';

import { ItemsModule } from '#modules/items/items.module';

import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [ItemsModule],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
