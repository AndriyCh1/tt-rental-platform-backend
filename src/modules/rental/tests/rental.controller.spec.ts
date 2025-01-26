import { Test, TestingModule } from '@nestjs/testing';

import { GetRentalsForItemQueryDto } from '#modules/rental/dtos/requests/get-rentals-for-item-query.dto';
import { RequestItemRentDto } from '#modules/rental/dtos/requests/request-item-rent.dto';
import { UpdateRentalStatusDto } from '#modules/rental/dtos/requests/update-rental-status.dto';
import { RentalController } from '#modules/rental/rental.controller';
import { RentalService } from '#modules/rental/rental.service';
import { itemsFactory } from '#shared/factories/items.factory';

describe('RentalController', () => {
  let service: RentalController;

  const rentalServiceMock = {
    initiateItemRent: jest.fn(),
    updateRentalStatus: jest.fn(),
    getRentalsByItemId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalController,
        { provide: RentalService, useValue: rentalServiceMock },
      ],
    }).compile();

    service = module.get<RentalController>(RentalController);
  });

  describe('Request item rent', () => {
    it('should call a service to request item', async () => {
      const data = itemsFactory.build();
      const dto: RequestItemRentDto = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      };

      await service.requestItemRent(dto, data.id.toString());

      expect(rentalServiceMock.initiateItemRent).toHaveBeenCalledWith({
        itemId: data.id,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        contactEmail: dto.contactEmail,
        contactPhone: dto.contactPhone,
      });
    });

    it('should return service response', async () => {
      const data = itemsFactory.build();
      const dto: RequestItemRentDto = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      };

      rentalServiceMock.initiateItemRent.mockResolvedValue({ success: true });

      const result = await service.requestItemRent(dto, data.id.toString());

      expect(result).toEqual({ success: true });
    });
  });

  describe('Update rental status', () => {
    it('should call a service to update rental status', async () => {
      const itemIdParam = '1';
      const dto: UpdateRentalStatusDto = {
        status: 'approved',
      };

      await service.updateRentalStatus(itemIdParam, dto);

      expect(rentalServiceMock.updateRentalStatus).toHaveBeenCalledWith(
        +itemIdParam,
        dto.status,
      );
    });

    it('should return service response', async () => {
      const itemIdParam = '1';
      const dto: UpdateRentalStatusDto = {
        status: 'approved',
      };

      await service.updateRentalStatus(itemIdParam, dto);

      rentalServiceMock.updateRentalStatus.mockResolvedValue({ success: true });

      const result = await service.updateRentalStatus(itemIdParam, dto);

      expect(result).toEqual({ success: true });
    });
  });

  describe('Get rentals by item id', () => {
    it('should call a service to get rentals by item id', async () => {
      const itemIdParam = '1';
      const query: GetRentalsForItemQueryDto = { status: 'approved' };

      await service.getRentalsByItemId(itemIdParam, query);

      expect(rentalServiceMock.getRentalsByItemId).toHaveBeenCalledWith(
        +itemIdParam,
        { status: query.status },
      );
    });

    it('should return service response', async () => {
      const itemIdParam = '1';
      const query: GetRentalsForItemQueryDto = { status: 'approved' };
      await service.getRentalsByItemId(itemIdParam, query);
      rentalServiceMock.getRentalsByItemId.mockResolvedValue({ success: true });

      const result = await service.getRentalsByItemId(itemIdParam, query);

      expect(result).toEqual({ success: true });
    });
  });
});
