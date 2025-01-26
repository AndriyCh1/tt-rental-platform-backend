import { Test, TestingModule } from '@nestjs/testing';

import { ItemsRepository } from '#modules/items/items.repository';
import { itemsFactory } from '#shared/factories/items.factory';

describe('ItemsRepository', () => {
  let service: ItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsRepository],
    }).compile();

    service = module.get<ItemsRepository>(ItemsRepository);
  });

  it('should insert data to a storage', async () => {
    const data = itemsFactory.build();
    const item = await service.insert(data);
    const result = await service.findAll();

    expect(result[0]).toEqual(item);
  });

  it('should find all items', async () => {
    const data = itemsFactory.buildList(3);
    await service.insert(data[0]);
    await service.insert(data[1]);
    await service.insert(data[2]);

    const result = await service.findAll();

    expect(result.length).toEqual(3);
  });

  describe('Find by id', () => {
    it('should find item by id', async () => {
      const data = itemsFactory.build();
      const item = await service.insert(data);

      const result = await service.findById(item.id);

      expect(result).toEqual(item);
    });

    it('should return null if item was not found', async () => {
      const result = await service.findById(1);

      expect(result).toBeNull();
    });
  });

  describe('Update by id', () => {
    it('should update item by id', async () => {
      const data = itemsFactory.build();
      const item = await service.insert(data);
      const updatedItem = { ...item, name: 'Updated name' };
      const result = await service.updateById(item.id, updatedItem);

      expect(result).toEqual(updatedItem);
    });

    it('should throw error if item was not found', async () => {
      await expect(
        service.updateById(1, { name: 'Updated name' }),
      ).rejects.toThrow();
    });
  });

  describe('Delete by id', () => {
    it('should delete item by id', async () => {
      const data = itemsFactory.build();
      const item = await service.insert(data);
      await service.deleteById(item.id);

      const result = await service.findById(item.id);

      expect(result).toBeNull();
    });

    it('should return true if item was deleted', async () => {
      const data = itemsFactory.build();
      const item = await service.insert(data);

      const result = await service.deleteById(item.id);

      expect(result).toBe(true);
    });

    it('should throw error if item was not found', async () => {
      await expect(service.deleteById(1)).rejects.toThrow();
    });
  });
});
