import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemsModule } from '#modules/items/items.module';
import { RentalModule } from '#modules/rental/rental.module';
import { SeederModule } from '#modules/seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ItemsModule,
    RentalModule,
    SeederModule,
  ],
})
export class AppModule {}
