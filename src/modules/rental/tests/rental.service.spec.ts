import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ItemsService } from '#modules/items/items.service';
import {
  InvalidDateRangeException,
  ItemNotFoundException,
  OverlappingRentalsException,
  PastStartDateException,
  RentalNotFoundException,
} from '#modules/rental/exceptions';
import { RentalRepository } from '#modules/rental/rental.repository';
import { RentalService } from '#modules/rental/rental.service';
import { CreateRentalData } from '#modules/rental/types';
import { rentalsFactory } from '#shared/factories/rentals.factory';

dayjs.extend(utc);

describe('RentalService', () => {
  let service: RentalService;

  const rentalsRepositoryMock = {
    insert: jest.fn(),
    findAll: jest.fn(),
    updateById: jest.fn(),
    findById: jest.fn(),
  };

  const itemsServiceMock = {
    addItem: jest.fn(),
    getItems: jest.fn(),
    getItemById: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalService,
        { provide: ItemsService, useValue: itemsServiceMock },
        { provide: RentalRepository, useValue: rentalsRepositoryMock },
      ],
    }).compile();

    service = module.get<RentalService>(RentalService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Rent item', () => {
    it('should rent an item', async () => {
      itemsServiceMock.getItemById.mockResolvedValueOnce({ id: 1 });
      rentalsRepositoryMock.findAll.mockResolvedValueOnce([]);

      const data: CreateRentalData = {
        ...rentalsFactory.build(),
        startDate: dayjs.utc().add(1, 'day').toDate(),
        endDate: dayjs.utc().add(2, 'day').toDate(),
      };

      await service.initiateItemRent(data);

      expect(rentalsRepositoryMock.insert).toHaveBeenCalledWith({
        itemId: data.itemId,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        status: 'pending',
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      });
    });

    it('should throw an error if item does not exist', async () => {
      itemsServiceMock.getItemById.mockResolvedValueOnce(null);

      await expect(
        service.initiateItemRent({
          ...rentalsFactory.build(),
          itemId: 1,
          startDate: new Date(),
          endDate: new Date(),
        }),
      ).rejects.toThrow(new ItemNotFoundException({ id: 1 }));
    });

    it('should validate the date range if start date is after end date', async () => {
      itemsServiceMock.getItemById.mockResolvedValueOnce({ id: 1 });
      rentalsRepositoryMock.findAll.mockResolvedValueOnce([]);

      const data: CreateRentalData = {
        ...rentalsFactory.build(),
        startDate: dayjs.utc().add(2, 'day').toDate(),
        endDate: dayjs.utc().add(1, 'day').toDate(),
      };

      await expect(service.initiateItemRent(data)).rejects.toThrow(
        new InvalidDateRangeException(),
      );
    });

    it('should validate the date range if start date is before current date', async () => {
      itemsServiceMock.getItemById.mockResolvedValueOnce({ id: 1 });
      rentalsRepositoryMock.findAll.mockResolvedValueOnce([]);

      const data: CreateRentalData = {
        ...rentalsFactory.build(),
        startDate: dayjs.utc().subtract(2, 'day').toDate(),
        endDate: dayjs.utc().subtract(1, 'day').toDate(),
      };

      await expect(service.initiateItemRent(data)).rejects.toThrow(
        new PastStartDateException(),
      );
    });

    it('should throw an error if there is an overlapping reservation', async () => {
      itemsServiceMock.getItemById.mockResolvedValueOnce({ id: 1 });

      rentalsRepositoryMock.findAll.mockResolvedValueOnce([
        {
          ...rentalsFactory.build(),
          itemId: 1,
          startDate: dayjs.utc().add(1, 'day'),
          endDate: dayjs.utc().add(3, 'day'),
          status: 'reserved',
        },
      ]);

      const data = {
        itemId: 1,
        startDate: dayjs.utc().add(2, 'day').toDate(),
        endDate: dayjs.utc().add(3, 'day').toDate(),
        contactEmail: 'bKl0w@example.com',
      };

      await expect(service.initiateItemRent(data)).rejects.toThrow(
        new OverlappingRentalsException(),
      );
    });
  });

  describe('Update Rental Status', () => {
    it('should update rental status', async () => {
      const data = rentalsFactory.build();
      rentalsRepositoryMock.findById.mockResolvedValueOnce(data);

      await service.updateRentalStatus(data.id, 'completed');

      expect(rentalsRepositoryMock.updateById).toHaveBeenCalledWith(data.id, {
        status: 'completed',
      });
    });

    it('should throw error if rental was not found', async () => {
      rentalsRepositoryMock.findById.mockResolvedValueOnce(null);

      await expect(service.updateRentalStatus(1, 'completed')).rejects.toThrow(
        new RentalNotFoundException({ id: 1 }),
      );
    });
  });

  describe('Get all rentals for item', () => {
    it('should get all rentals for item', async () => {
      const itemRentals = rentalsFactory.buildList(2, { itemId: 1 });
      const otherRentals = rentalsFactory.buildList(1, { itemId: 5 });

      rentalsRepositoryMock.findAll.mockResolvedValueOnce(
        itemRentals.concat(otherRentals),
      );

      const result = await service.getRentalsByItemId(1);

      expect(result.length).toEqual(itemRentals.length);
    });

    it('should filter items rentals by status', async () => {
      const itemPendingRentals = rentalsFactory.buildList(2, {
        itemId: 1,
        status: 'pending',
      });

      const otherRentals = [
        rentalsFactory.build({ itemId: 5 }),
        rentalsFactory.build({ itemId: 1, status: 'reserved' }),
      ];

      rentalsRepositoryMock.findAll.mockResolvedValueOnce(
        itemPendingRentals.concat(otherRentals),
      );

      const result = await service.getRentalsByItemId(1, {
        status: 'pending',
      });

      expect(result).toEqual(itemPendingRentals);
    });
  });
});
