import { Injectable } from '@nestjs/common';

import { CreateItemData, UpdateItemData } from '#modules/items/types';
import { Item } from '#shared/types/models';

@Injectable()
export class ItemsRepository {
  private items: Item[] = [];

  async insert(item: CreateItemData): Promise<Item> {
    const id = this.items.length + 1;
    const newItem: Item = { ...item, id };
    this.items.push(newItem);

    return newItem;
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }

  async findById(id: Item['id']): Promise<Item | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async updateById(id: Item['id'], updateData: UpdateItemData): Promise<Item> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Item not found');
    }

    this.items[index] = { ...this.items[index], ...updateData };

    return this.items[index];
  }

  async deleteById(id: Item['id']): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) return false;

    this.items.splice(index, 1);

    return true;
  }
}
