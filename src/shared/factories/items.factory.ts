import { faker } from '@faker-js/faker/.';
import { makeFactory } from 'factory.ts';

import { Item } from '#shared/types/models';

export const itemsFactory = makeFactory<Item>({
  id: faker.number.int(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  pricePerDay: faker.number.float(),
  category: faker.commerce.department(),
  image: faker.image.url(),
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
});
