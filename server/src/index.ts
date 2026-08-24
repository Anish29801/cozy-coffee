import { createApp } from './app';
import { connectDB } from './config/database';
import { env } from './config/env';

async function main() {
  // 1. Connect to MongoDB
  await connectDB();

  // 2. Create Express app
  const app = createApp();

  // 3. Start server on port 8080
  app.listen(env.PORT, () => {
    console.log(`☕ Cozy Coffee API running on http://localhost:${env.PORT}`);
    console.log(`📊 Health: http://localhost:${env.PORT}/health`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
