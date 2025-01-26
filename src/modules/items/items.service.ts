import { Injectable } from '@nestjs/common';

import { Item } from '#shared/types/models';

import { ItemNotFoundException } from './exceptions';
import { ItemsRepository } from './items.repository';
import { CreateItemData, GetItemsOptions, UpdateItemData } from './types';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async createItem(payload: CreateItemData): Promise<Item> {
    return this.itemsRepository.insert(payload);
  }

  async getItems(options: GetItemsOptions = {}): Promise<Item[]> {
    const allItems = await this.itemsRepository.findAll();
    const filteredItems = this.applyFilters(allItems, options.filters);
    const sortedItems = this.applySorting(filteredItems, options.sort);

    return sortedItems;
  }

  async getItemById(id: Item['id']): Promise<Item> {
    const item = await this.itemsRepository.findById(id);

    if (!item) {
      throw new ItemNotFoundException();
    }

    return item;
  }

  async updateItem(id: Item['id'], payload: UpdateItemData): Promise<Item> {
    return this.itemsRepository.updateById(id, payload);
  }

  async deleteItem(id: Item['id']): Promise<boolean> {
    return this.itemsRepository.deleteById(id);
  }

  private applyFilters(
    items: Item[],
    filters?: GetItemsOptions['filters'],
  ): Item[] {
    if (!filters) return items;

    const { name, minPrice, maxPrice, category } = filters;

    return items.filter((item) => {
      if (name && !item.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      if (minPrice !== undefined && item.pricePerDay < minPrice) {
        return false;
      }

      if (maxPrice !== undefined && item.pricePerDay > maxPrice) {
        return false;
      }

      if (category && item.category !== category) {
        return false;
      }

      return true;
    });
  }

  private applySorting(items: Item[], sort?: GetItemsOptions['sort']): Item[] {
    if (!sort || !sort.sortBy || !sort.sortOrder) return items;

    const { sortBy, sortOrder } = sort;

    return [...items].sort((a, b) => {
      const key = sortBy as keyof Item;
      const aItem = a[key] as number;
      const bItem = b[key] as number;

      if (sortOrder === 'asc') {
        return aItem > bItem ? 1 : -1;
      }

      return aItem < bItem ? 1 : -1;
    });
  }
}
