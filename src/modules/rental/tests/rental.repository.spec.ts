import { Test, TestingModule } from '@nestjs/testing';

import { RentalRepository } from '#modules/rental/rental.repository';
import { rentalsFactory } from '#shared/factories/rentals.factory';

describe('RentalRepository', () => {
  let service: RentalRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalRepository],
    }).compile();

    service = module.get<RentalRepository>(RentalRepository);
  });

  it('should insert data to a storage', async () => {
    const data = rentalsFactory.build();
    const item = await service.insert(data);
    const result = await service.findAll();

    expect(result[0]).toEqual(item);
  });

  it('should find all items', async () => {
    const data = rentalsFactory.buildList(3);
    await service.insert(data[0]);
    await service.insert(data[1]);
    await service.insert(data[2]);

    const result = await service.findAll();

    expect(result.length).toEqual(3);
  });

  describe('Find by id', () => {
    it('should find item by id', async () => {
      const data = rentalsFactory.build();
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
      const data = rentalsFactory.build();
      const item = await service.insert(data);
      const updatedItem = { ...item, name: 'Updated name' };
      const result = await service.updateById(item.id, updatedItem);

      expect(result).toEqual(updatedItem);
    });

    it('should throw error if item was not found', async () => {
      await expect(
        service.updateById(1, { status: 'completed' }),
      ).rejects.toThrow();
    });
  });
});
