import { Rental } from '#shared/types/models';

export type CreateRentalData = {
  itemId: Rental['itemId'];
  startDate: Date;
  endDate: Date;
  contactEmail: Rental['contactEmail'];
  contactPhone?: Rental['contactPhone'];
};

export type GetRentalsByItemOptions = {
  status?: Rental['status'];
};
