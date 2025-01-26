import { Test, TestingModule } from '@nestjs/testing';

import { ItemNotFoundException } from '#modules/items/exceptions';
import { ItemsRepository } from '#modules/items/items.repository';
import { ItemsService } from '#modules/items/items.service';
import { itemsFactory } from '#shared/factories/items.factory';

describe('ItemsService', () => {
  let service: ItemsService;

  const itemsRepositoryMock = {
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: ItemsRepository, useValue: itemsRepositoryMock },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should insert data', async () => {
    const data = itemsFactory.build();
    await service.createItem(data);
    expect(itemsRepositoryMock.insert).toHaveBeenCalledWith(data);
  });

  describe('Find all items', () => {
    const item1 = itemsFactory.build({
      name: 'Electric Drill',
      pricePerDay: 30,
      category: 'Tools',
    });

    const item2 = itemsFactory.build({
      name: 'Mountain Bike',
      pricePerDay: 200,
      category: 'Outdoor',
    });

    beforeEach(() => {
      itemsRepositoryMock.findAll.mockResolvedValueOnce([item1, item2]);
    });

    it('should find all items', async () => {
      await service.getItems();
      expect(itemsRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should find all with name filter', async () => {
      const result = await service.getItems({ filters: { name: 'Electric' } });
      expect(result).toEqual([item1]);
    });

    it('should find all with category filter', async () => {
      const result = await service.getItems({ filters: { category: 'Tools' } });
      expect(result).toEqual([item1]);
    });

    it('should find all with price filter', async () => {
      const result = await service.getItems({
        filters: { minPrice: 100, maxPrice: 300 },
      });

      expect(result).toEqual([item2]);
    });

    it('should find all with only min price filter', async () => {
      const result = await service.getItems({
        filters: { minPrice: 100 },
      });

      expect(result).toEqual([item2]);
    });

    it('should find all with only max price filter', async () => {
      const result = await service.getItems({
        filters: { maxPrice: 100 },
      });

      expect(result).toEqual([item1]);
    });

    it('should sort items by name asc', async () => {
      const item3 = itemsFactory.build({
        name: 'Scooter',
        pricePerDay: 200,
        category: 'Outdoor',
      });

      itemsRepositoryMock.findAll.mockReset();
      itemsRepositoryMock.findAll.mockResolvedValueOnce([item2, item1, item3]);

      const result = await service.getItems({
        sort: { sortBy: 'name', sortOrder: 'asc' },
      });

      expect(result).toEqual([item1, item2, item3]);
    });

    it('should sort items by name desc', async () => {
      const item3 = itemsFactory.build({
        name: 'Scooter',
        pricePerDay: 200,
        category: 'Outdoor',
      });

      itemsRepositoryMock.findAll.mockReset();
      itemsRepositoryMock.findAll.mockResolvedValueOnce([item2, item1, item3]);

      const result = await service.getItems({
        sort: { sortBy: 'name', sortOrder: 'desc' },
      });

      expect(result).toEqual([item3, item2, item1]);
    });

    it('should sort items by price', async () => {
      const result = await service.getItems({
        sort: { sortBy: 'pricePerDay', sortOrder: 'desc' },
      });

      expect(result).toEqual([item2, item1]);
    });
  });

  describe('Find item by id', () => {
    it('should find item by id', async () => {
      const data = itemsFactory.build();
      itemsRepositoryMock.findById.mockResolvedValueOnce(data);

      const result = await service.getItemById(data.id);

      expect(result).toEqual(data);
    });

    it('should throw error if item was not found', async () => {
      itemsRepositoryMock.findById.mockResolvedValueOnce(null);

      await expect(service.getItemById(1)).rejects.toThrow();
    });
  });

  describe('Update item by id', () => {
    it('should update item by id', async () => {
      const data = itemsFactory.build();
      itemsRepositoryMock.findById.mockResolvedValueOnce(data);
      await service.updateItem(data.id, data);

      expect(itemsRepositoryMock.updateById).toHaveBeenCalledWith(
        data.id,
        data,
      );
    });

    it('should throw error if item was not found', async () => {
      await expect(service.updateItem(1, {})).rejects.toThrow(
        new ItemNotFoundException({ id: 1 }),
      );
    });
  });

  describe('Delete item by id', () => {
    it('should delete item by id', async () => {
      const data = itemsFactory.build();
      itemsRepositoryMock.findById.mockResolvedValueOnce(data);
      await service.deleteItem(data.id);

      expect(itemsRepositoryMock.deleteById).toHaveBeenCalledWith(data.id);
    });

    it('should throw error if item was not found', async () => {
      await expect(service.deleteItem(1)).rejects.toThrow(
        new ItemNotFoundException({ id: 1 }),
      );
    });
  });
});
