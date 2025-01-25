import { Item } from '#shared/types/models';

export type CreateItemData = {
  name: Item['name'];
  description: Item['description'];
  pricePerDay: Item['pricePerDay'];
  category: Item['category'];
  image: Item['image'];
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
