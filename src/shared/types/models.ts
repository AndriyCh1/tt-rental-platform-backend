/*
  Statuses:
    pending - item rent is requested
    approved - item rent is approved 
    declined - item rent is not approved
    reserved - after payment, item is reserved
    completed - item is returned on this date
    cancelled - item is cancelled
*/

export enum RentalStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
  RESERVED = 'reserved',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type RentalStatus =
  | 'pending'
  | 'approved'
  | 'declined'
  | 'reserved'
  | 'completed'
  | 'cancelled';

export type Rental = {
  id: number;
  itemId: number;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  contactEmail: string;
  contactPhone?: string;
};

export type Item = {
  id: number;
  name: string;
  pricePerDay: number;
  contactEmail: string;
  image?: string;
  category?: string;
  description?: string;
  contactPhone?: string;
};
