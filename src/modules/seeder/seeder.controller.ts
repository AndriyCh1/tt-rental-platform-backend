import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SeederService } from './seeder.service';

@ApiTags('API Seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/items')
  @ApiOperation({ summary: 'Seed items' })
  seedItems() {
    return this.seederService.seedItems();
  }
}
