import { faker } from '@faker-js/faker/.';
import { makeFactory } from 'factory.ts';

import { Rental } from '#shared/types/models';

export const rentalsFactory = makeFactory<Rental>({
  id: faker.number.int(),
  startDate: faker.date.past().toISOString(),
  endDate: faker.date.future().toISOString(),
  itemId: faker.number.int(),
  status: 'pending',
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
});
