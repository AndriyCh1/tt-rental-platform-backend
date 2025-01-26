import { Injectable } from '@nestjs/common';

import { ItemsService } from '#modules/items/items.service';
import { CreateItemData } from '#modules/items/types';

import { itemSeeds } from './seeds';

@Injectable()
export class SeederService {
  constructor(private readonly itemsService: ItemsService) {}

  async seedItems() {
    for (const item of itemSeeds) {
      await this.itemsService.createItem(item as CreateItemData);
    }

    return await this.itemsService.getItems();
  }
}
