import { Test, TestingModule } from '@nestjs/testing';

import { CreateItemDto } from '#modules/items/dtos/requests/create-item.dto';
import { GetItemsQueryDto } from '#modules/items/dtos/requests/get-items-query.dto';
import { UpdateItemDto } from '#modules/items/dtos/requests/update-item.dto';
import { ItemsController } from '#modules/items/items.controller';
import { ItemsService } from '#modules/items/items.service';
import { itemsFactory } from '#shared/factories/items.factory';

describe('ItemsController', () => {
  let service: ItemsController;

  const itemsServiceMock = {
    createItem: jest.fn(),
    getItems: jest.fn(),
    getItemById: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsController,
        { provide: ItemsService, useValue: itemsServiceMock },
      ],
    }).compile();

    service = module.get<ItemsController>(ItemsController);
  });

  describe('Add item', () => {
    it('should call a service to add item', async () => {
      const data = itemsFactory.build();
      const dto: CreateItemDto = {
        name: data.name,
        pricePerDay: data.pricePerDay,
        contactEmail: data.contactEmail,
      };

      await service.createItem(dto);

      expect(itemsServiceMock.createItem).toHaveBeenCalledWith(dto);
    });

    it('should return service response', async () => {
      const data = itemsFactory.build();

      const dto: CreateItemDto = {
        name: data.name,
        pricePerDay: data.pricePerDay,
        contactEmail: data.contactEmail,
      };

      itemsServiceMock.createItem.mockResolvedValueOnce(data);

      const result = await service.createItem(dto);

      expect(result).toEqual(data);
    });
  });

  describe('Get items', () => {
    it('should call a service to get items', async () => {
      const query: GetItemsQueryDto = {
        name: 'Electric Drill',
        category: 'Tools',
        minPrice: 30,
        maxPrice: 50,
        sortBy: 'pricePerDay',
        sortOrder: 'asc',
      };

      await service.getItems(query);

      expect(itemsServiceMock.getItems).toHaveBeenCalledWith({
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
    });

    it('should return service response', async () => {
      const data = itemsFactory.buildList(3);
      const query: GetItemsQueryDto = {};

      itemsServiceMock.getItems.mockResolvedValueOnce(data);

      const result = await service.getItems(query);

      expect(result).toEqual(data);
    });
  });

  describe('Get item by id', () => {
    it('should call a service to get item by id', async () => {
      await service.getItemById('1');

      expect(itemsServiceMock.getItemById).toHaveBeenCalledWith(1);
    });

    it('should return service response', async () => {
      const data = itemsFactory.build();

      itemsServiceMock.getItemById.mockResolvedValueOnce(data);

      const result = await service.getItemById(data.id.toString());

      expect(result).toEqual(data);
    });
  });

  describe('Update item', () => {
    it('should call a service to update item', async () => {
      const data = itemsFactory.build();
      const dto: CreateItemDto = {
        name: data.name,
        pricePerDay: data.pricePerDay,
        contactEmail: data.contactEmail,
      };

      await service.updateItem(data.id.toString(), dto);

      expect(itemsServiceMock.updateItem).toHaveBeenCalledWith(data.id, dto);
    });

    it('should return service response', async () => {
      const data = itemsFactory.build();
      const dto: UpdateItemDto = {
        name: data.name,
        pricePerDay: data.pricePerDay,
      };

      itemsServiceMock.updateItem.mockResolvedValueOnce(data);

      const result = await service.updateItem(data.id.toString(), dto);

      expect(result).toEqual(data);
    });
  });

  describe('Delete item', () => {
    it('should call a service to delete item', async () => {
      await service.deleteItem('1');

      expect(itemsServiceMock.deleteItem).toHaveBeenCalledWith(1);
    });

    it('should return service response', async () => {
      itemsServiceMock.deleteItem.mockResolvedValueOnce(true);

      const result = await service.deleteItem('1');

      expect(result).toBe(true);
    });
  });
});
