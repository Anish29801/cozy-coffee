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

describe('Testimonials API', () => {
  const validTestimonial = {
    name: 'Jane Doe',
    role: 'Regular since 2020',
    gender: 'female',
    image: 'https://example.com/photo.jpg',
    text: 'Amazing coffee and atmosphere!',
    active: true,
    sortOrder: 1,
  };

  describe('POST /api/testimonials', () => {
    it('creates a testimonial', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .send(validTestimonial);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Jane Doe');
    });

    it('rejects invalid data', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .send({ name: '', text: '' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/testimonials', () => {
    it('returns only active testimonials', async () => {
      await request(app).post('/api/testimonials').send(validTestimonial);
      await request(app).post('/api/testimonials').send({
        ...validTestimonial,
        name: 'Hidden Person',
        active: false,
      });
      const res = await request(app).get('/api/testimonials');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Jane Doe');
    });
  });

  describe('GET /api/testimonials/all', () => {
    it('returns all testimonials', async () => {
      await request(app).post('/api/testimonials').send(validTestimonial);
      await request(app).post('/api/testimonials').send({
        ...validTestimonial,
        name: 'Hidden Person',
        active: false,
      });
      const res = await request(app).get('/api/testimonials/all');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('GET /api/testimonials/:id', () => {
    it('returns a single testimonial', async () => {
      const create = await request(app).post('/api/testimonials').send(validTestimonial);
      const id = create.body.data._id;
      const res = await request(app).get(`/api/testimonials/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(id);
    });
  });

  describe('PATCH /api/testimonials/:id', () => {
    it('updates a testimonial', async () => {
      const create = await request(app).post('/api/testimonials').send(validTestimonial);
      const id = create.body.data._id;
      const res = await request(app)
        .patch(`/api/testimonials/${id}`)
        .send({ text: 'Updated text!' });
      expect(res.status).toBe(200);
      expect(res.body.data.text).toBe('Updated text!');
    });
  });

  describe('DELETE /api/testimonials/:id', () => {
    it('deletes a testimonial', async () => {
      const create = await request(app).post('/api/testimonials').send(validTestimonial);
      const id = create.body.data._id;
      const res = await request(app).delete(`/api/testimonials/${id}`);
      expect(res.status).toBe(200);
    });
  });
});
