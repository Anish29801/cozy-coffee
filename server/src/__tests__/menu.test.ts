import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';

const app = createApp();

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

describe('Menu API', () => {
  const validItem = {
    title: 'Test Latte',
    slug: 'test-latte',
    description: 'A test latte',
    price: '5.00',
    category: 'espresso',
    available: true,
    allergens: [],
    sortOrder: 1,
  };

  describe('POST /api/menu', () => {
    it('creates a menu item', async () => {
      const res = await request(app)
        .post('/api/menu')
        .send(validItem);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Latte');
    });

    it('rejects invalid data', async () => {
      const res = await request(app)
        .post('/api/menu')
        .send({ title: '', price: '', category: 'bad' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/menu', () => {
    it('lists menu items', async () => {
      await request(app).post('/api/menu').send(validItem);
      const res = await request(app).get('/api/menu');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('filters by category', async () => {
      await request(app).post('/api/menu').send(validItem);
      await request(app).post('/api/menu').send({ ...validItem, slug: 'food-item', category: 'pastries', title: 'Croissant' });
      const res = await request(app).get('/api/menu?category=espresso');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('GET /api/menu/:slug', () => {
    it('returns a single item by slug', async () => {
      await request(app).post('/api/menu').send(validItem);
      const res = await request(app).get('/api/menu/test-latte');
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe('test-latte');
    });

    it('returns 404 for missing slug', async () => {
      const res = await request(app).get('/api/menu/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/menu/:id', () => {
    it('updates a menu item', async () => {
      const create = await request(app).post('/api/menu').send(validItem);
      const id = create.body.data._id;
      const res = await request(app)
        .patch(`/api/menu/${id}`)
        .send({ price: '6.50' });
      expect(res.status).toBe(200);
      expect(res.body.data.price).toBe('6.50');
    });
  });

  describe('DELETE /api/menu/:id', () => {
    it('deletes a menu item', async () => {
      const create = await request(app).post('/api/menu').send(validItem);
      const id = create.body.data._id;
      const res = await request(app).delete(`/api/menu/${id}`);
      expect(res.status).toBe(200);
      // Verify gone
      const get = await request(app).get('/api/menu/test-latte');
      expect(get.status).toBe(404);
    });
  });

  describe('GET /api/menu/categories', () => {
    it('returns category list', async () => {
      await request(app).post('/api/menu').send(validItem);
      const res = await request(app).get('/api/menu/categories');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
