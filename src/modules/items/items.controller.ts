import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateItemDto } from '#modules/items/dtos/requests/create-item.dto';
import { GetItemsQueryDto } from '#modules/items/dtos/requests/get-items-query.dto';
import { ItemResponseDto } from '#modules/items/dtos/responses/base-response.dto';
import { ItemsService } from '#modules/items/items.service';
import { Item } from '#shared/types/models';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('/')
  @ApiOperation({ summary: 'List an item for rent' })
  @ApiCreatedResponse({ type: ItemResponseDto })
  async addItem(@Body() dto: CreateItemDto): Promise<Item> {
    return this.itemsService.addItem(dto);
  }

  @Get('/')
  @ApiOperation({ summary: 'List all items, with filters and sorting' })
  @ApiOkResponse({ type: ItemResponseDto, isArray: true })
  async getItems(@Query() query: GetItemsQueryDto): Promise<Item[]> {
    return this.itemsService.getItems({
      filters: {
        name: query.name,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        category: query.category,
      },
      sort: {
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      },
    });
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiOkResponse({ type: ItemResponseDto })
  async updateItem(
    @Param('id') id: string,
    @Body() payload: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(+id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiOkResponse({ type: Boolean })
  async deleteItem(@Param('id') id: string): Promise<boolean> {
    return this.itemsService.deleteItem(+id);
  }
}