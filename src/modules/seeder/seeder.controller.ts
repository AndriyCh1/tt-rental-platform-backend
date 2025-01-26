import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ItemResponseDto } from '#modules/items/dtos/responses/base-response.dto';

import { SeederService } from './seeder.service';

@ApiTags('API Seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/items')
  @ApiOperation({ summary: 'Seed items' })
  @ApiCreatedResponse({ type: ItemResponseDto, isArray: true })
  seedItems() {
    return this.seederService.seedItems();
  }
}
