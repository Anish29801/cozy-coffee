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

describe('Reservations API', () => {
  const validReservation = {
    name: 'Test User',
    email: 'test@example.com',
    date: '2026-09-15',
    time: '19:00',
    partySize: 4,
    notes: 'Window seat please',
  };

  describe('POST /api/reservations', () => {
    it('creates a reservation', async () => {
      const res = await request(app)
        .post('/api/reservations')
        .send(validReservation);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test User');
      expect(res.body.data.status).toBe('pending');
    });

    it('rejects invalid data', async () => {
      const res = await request(app)
        .post('/api/reservations')
        .send({ name: '', date: '' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/reservations', () => {
    it('lists reservations', async () => {
      await request(app).post('/api/reservations').send(validReservation);
      const res = await request(app).get('/api/reservations');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('filters by status', async () => {
      await request(app).post('/api/reservations').send(validReservation);
      await request(app).post('/api/reservations').send({ ...validReservation, email: 'b@b.com' });
      const res = await request(app).get('/api/reservations?status=pending');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('GET /api/reservations/:id', () => {
    it('returns a single reservation', async () => {
      const create = await request(app).post('/api/reservations').send(validReservation);
      const id = create.body.data.id;
      const res = await request(app).get(`/api/reservations/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(id);
    });
  });

  describe('PATCH /api/reservations/:id/status', () => {
    it('updates reservation status', async () => {
      const create = await request(app).post('/api/reservations').send(validReservation);
      const id = create.body.data.id;
      const res = await request(app)
        .patch(`/api/reservations/${id}/status`)
        .send({ status: 'confirmed' });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('confirmed');
    });
  });

  describe('DELETE /api/reservations/:id', () => {
    it('deletes a reservation', async () => {
      const create = await request(app).post('/api/reservations').send(validReservation);
      const id = create.body.data.id;
      const res = await request(app).delete(`/api/reservations/${id}`);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/reservations/available', () => {
    it('returns 400 without date param', async () => {
      const res = await request(app).get('/api/reservations/available');
      expect(res.status).toBe(400);
    });

    it('returns slots with valid date', async () => {
      const res = await request(app).get('/api/reservations/available?date=2026-09-15');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
