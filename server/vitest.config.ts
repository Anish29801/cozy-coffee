import { defineConfig } from 'vitest/config';

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/cozy_coffee_test_placeholder';
process.env.JWT_SECRET = 'test-secret-key-at-least-32-chars!!';
process.env.CORS_ORIGINS = 'http://localhost:3000';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 30000,
    fileParallelism: false,
  },
});
