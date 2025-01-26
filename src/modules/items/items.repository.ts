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
    const index = this.getIndexById(id);
    const updatedItem = { ...this.items[index], ...updateData };
    this.items[index] = updatedItem;

    return updatedItem;
  }

  async deleteById(id: Item['id']): Promise<boolean> {
    const index = this.getIndexById(id);
    this.items.splice(index, 1);

    return true;
  }

  private getIndexById(id: Item['id']): number {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with ID ${id} not found`);
    }

    return index;
  }
}
