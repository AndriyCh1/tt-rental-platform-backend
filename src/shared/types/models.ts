export type Reservation = {
  id: number;
  itemId: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
};

export type Item = {
  id: number;
  name: string;
  pricePerDay: number;
  description?: string;
  image?: string;
  category?: string;
};
