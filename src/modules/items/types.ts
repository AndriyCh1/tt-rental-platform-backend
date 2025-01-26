import { Item } from '#shared/types/models';

export type CreateItemData = {
  name: Item['name'];
  description?: Item['description'];
  pricePerDay: Item['pricePerDay'];
  contactEmail: Item['contactEmail'];
  category?: Item['category'];
  image?: Item['image'];
  contactPhone?: Item['contactPhone'];
};

export type UpdateItemData = Partial<CreateItemData>;

type FilterOptions = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};

type SortOptions = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type GetItemsOptions = {
  filters?: FilterOptions;
  sort?: SortOptions;
};
