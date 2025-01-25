import { Entity } from '#shared/types/database';
import { Item } from '#shared/types/models';

export const itemSeeds: Entity<Item>[] = [
  {
    name: 'Canon EOS 90D DSLR Camera',
    pricePerDay: 50,
    description:
      'A high-resolution DSLR camera with 4K video recording capabilities.',
    image: 'https://example.com/images/canon-eos-90d.jpg',
    category: 'Electronics',
  },
  {
    name: 'Sony Noise Cancelling Headphones',
    pricePerDay: 15,
    description:
      'Over-ear Bluetooth headphones with active noise cancellation.',
    image: 'https://example.com/images/sony-headphones.jpg',
    category: 'Electronics',
  },
  {
    name: 'Camping Tent for 4 People',
    pricePerDay: 20,
    description: 'A durable and lightweight camping tent for family trips.',
    image: 'https://example.com/images/camping-tent.jpg',
    category: 'Outdoor',
  },
  {
    name: 'Mountain Bike',
    pricePerDay: 30,
    description: 'A versatile mountain bike suitable for all terrains.',
    image: 'https://example.com/images/mountain-bike.jpg',
    category: 'Outdoor',
  },
  {
    name: 'Projector and Screen Combo',
    pricePerDay: 40,
    description:
      'A full HD projector with a portable screen, perfect for events.',
    image: 'https://example.com/images/projector-screen.jpg',
    category: 'Electronics',
  },
  {
    name: 'Electric Drill',
    pricePerDay: 10,
    description: 'A powerful electric drill for home improvement projects.',
    image: 'https://example.com/images/electric-drill.jpg',
    category: 'Tools',
  },
  {
    name: 'Lawn Mower',
    pricePerDay: 25,
    description: 'A gas-powered lawn mower for medium to large yards.',
    image: 'https://example.com/images/lawn-mower.jpg',
    category: 'Tools',
  },
  {
    name: 'Sofa Set',
    pricePerDay: 60,
    description:
      'A luxurious three-seater sofa set, perfect for events or staging.',
    image: 'https://example.com/images/sofa-set.jpg',
    category: 'Furniture',
  },
  {
    name: 'Wedding Arch',
    pricePerDay: 35,
    description: 'A decorative wedding arch made of wood and flowers.',
    image: 'https://example.com/images/wedding-arch.jpg',
    category: 'Event Decor',
  },
  {
    name: 'DJ Mixer',
    pricePerDay: 50,
    description: 'A professional-grade DJ mixer for parties and events.',
    image: 'https://example.com/images/dj-mixer.jpg',
    category: 'Electronics',
  },
];
