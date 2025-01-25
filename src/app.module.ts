import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemsModule } from '#modules/items/items.module';
import { RentalModule } from '#modules/rental/rental.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ItemsModule,
    RentalModule,
  ],
})
export class AppModule {}
