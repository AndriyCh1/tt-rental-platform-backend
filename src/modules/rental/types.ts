import { Reservation } from '#shared/types/models';

export type RentItemData = {
  itemId: Reservation['itemId'];
  startDate: Date;
  endDate: Date;
};
