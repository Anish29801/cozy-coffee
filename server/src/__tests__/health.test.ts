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

describe('GET /health', () => {
  it('returns health status with db info', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.database).toBe('connected');
    expect(typeof res.body.data.uptime).toBe('number');
  });
});

describe('404 handling', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
