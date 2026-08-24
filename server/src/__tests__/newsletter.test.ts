import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';
import { Subscriber } from '../models/Subscriber';

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

describe('Newsletter API', () => {
  describe('POST /api/newsletter/subscribe', () => {
    it('subscribes with valid email', async () => {
      const res = await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('rejects invalid email', async () => {
      const res = await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'not-an-email' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('rejects duplicate email', async () => {
      await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'dupe@example.com' });
      const res = await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'dupe@example.com' });
      expect(res.status).toBe(409);
    });
  });

  describe('GET /api/newsletter/subscribers', () => {
    it('lists subscribers', async () => {
      await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'sub@example.com' });
      const res = await request(app).get('/api/newsletter/subscribers');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/newsletter/stats', () => {
    it('returns stats', async () => {
      await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'stat@example.com' });
      const res = await request(app).get('/api/newsletter/stats');
      expect(res.status).toBe(200);
      expect(res.body.data.totalActive).toBeGreaterThanOrEqual(1);
    });
  });

  describe('DELETE /api/newsletter/unsubscribe/:token', () => {
    it('unsubscribes with valid token', async () => {
      await request(app)
        .post('/api/newsletter/subscribe')
        .send({ email: 'unsub@example.com' });
      const subscriber = await Subscriber.findOne({ email: 'unsub@example.com' });
      const token = subscriber!.unsubToken;
      const res = await request(app)
        .delete(`/api/newsletter/unsubscribe/${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
