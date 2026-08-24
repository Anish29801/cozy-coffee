import mongoose from 'mongoose';
import { MenuItem } from './src/models/MenuItem';
import { Testimonial } from './src/models/Testimonial';
import { Subscriber } from './src/models/Subscriber';
import { Reservation } from './src/models/Reservation';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cozy-coffee';

const sampleMenuItems = [
  {
    title: 'The Slow Bar',
    slug: 'the-slow-bar',
    description: 'Single-origin Ethiopian Yirgacheffe, hand-poured with care. Notes of bergamot and stone fruit, bright and complex.',
    price: '$6.50',
    category: 'filter',
    seasonal: false,
    available: true,
    allergens: [],
    origin: 'Ethiopia, Yirgacheffe',
    story: 'We fell in love with this lot during a cupping session in Addis Ababa. Every sip is a journey.',
    imageUrl: '/images/menu/slow-bar.svg',
    sortOrder: 1,
  },
  {
    title: 'The Usual',
    slug: 'the-usual',
    description: 'Our house blend — smooth, chocolatey, reliable. The kind of coffee that remembers your name.',
    price: '$4.50',
    category: 'espresso',
    seasonal: false,
    available: true,
    allergens: [],
    origin: 'Colombia + Brazil',
    story: 'Blended for the regulars who want consistency with soul.',
    imageUrl: '/images/menu/the-usual.jpg',
    sortOrder: 2,
  },
  {
    title: 'Oat Milk Latte',
    slug: 'oat-milk-latte',
    description: 'Creamy oat milk steamed to perfection, paired with our house espresso. Gentle, warming, kind.',
    price: '$5.50',
    category: 'specialty',
    seasonal: false,
    available: true,
    allergens: ['oats'],
    origin: '',
    story: '',
    imageUrl: '/images/menu/oat-latte.jpg',
    sortOrder: 3,
  },
  {
    title: 'Sourdough Toast',
    slug: 'sourdough-toast',
    description: 'Thick-cut from our bakery next door, toasted golden with house-made preserves.',
    price: '$5.00',
    category: 'light_bite',
    seasonal: false,
    available: true,
    allergens: ['gluten'],
    origin: 'Baked next door',
    story: 'Our neighbor bakes these every morning. The crust sings.',
    imageUrl: '/images/menu/sourdough.jpg',
    sortOrder: 4,
  },
  {
    title: 'Seasonal Chai',
    slug: 'seasonal-chai',
    description: 'Spiced with cardamom, ginger, and clove. Rotating seasonal blend — ask what\'s brewing.',
    price: '$5.00',
    category: 'specialty',
    seasonal: true,
    available: true,
    allergens: [],
    origin: '',
    story: 'A winter tradition that never gets old.',
    imageUrl: '/images/menu/chai.jpg',
    sortOrder: 5,
  },
];

const sampleTestimonials = [
  {
    name: 'Sarah Chen',
    role: 'Regular since 2019 · Oat latte, always',
    gender: 'female' as const,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Walking into Cozy Coffee feels like being wrapped in a warm blanket. The slow bar pour-over is my Sunday ritual.',
    active: true,
    sortOrder: 1,
  },
  {
    name: 'James Wright',
    role: 'Remote worker · The usual, black',
    gender: 'male' as const,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'I\'ve tried every café in the neighborhood. This is the one I kept coming back to. The wifi doesn\'t suck either.',
    active: true,
    sortOrder: 2,
  },
  {
    name: 'Priya Sharma',
    role: 'Weekend regular · Chai, always',
    gender: 'female' as const,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'The seasonal chai is why I drive across town. But the community wall is why I stay.',
    active: true,
    sortOrder: 3,
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.\n');

  // Menu items
  const existingMenu = await MenuItem.countDocuments();
  if (existingMenu === 0) {
    console.log('Seeding menu items...');
    await MenuItem.insertMany(sampleMenuItems);
    console.log(`  ✓ ${sampleMenuItems.length} menu items added`);
  } else {
    console.log(`  ⊘ Menu already has ${existingMenu} items — skipping`);
  }

  // Testimonials
  const existingTestimonials = await Testimonial.countDocuments();
  if (existingTestimonials === 0) {
    console.log('Seeding testimonials...');
    await Testimonial.insertMany(sampleTestimonials);
    console.log(`  ✓ ${sampleTestimonials.length} testimonials added`);
  } else {
    console.log(`  ⊘ Testimonials already has ${existingTestimonials} items — skipping`);
  }

  // Summary
  const menuCount = await MenuItem.countDocuments();
  const testimonialCount = await Testimonial.countDocuments();
  const subscriberCount = await Subscriber.countDocuments();
  const reservationCount = await Reservation.countDocuments();

  console.log('\nDatabase summary:');
  console.log(`  Menu items:     ${menuCount}`);
  console.log(`  Testimonials:   ${testimonialCount}`);
  console.log(`  Subscribers:    ${subscriberCount}`);
  console.log(`  Reservations:   ${reservationCount}`);

  await mongoose.disconnect();
  console.log('\nDone. Disconnected.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
