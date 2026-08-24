import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer | null = null;

export async function connectTestDB() {
  if (mongoose.connection.readyState === 0) {
    if (!mongod) {
      mongod = await MongoMemoryServer.create();
    }
    await mongoose.connect(mongod.getUri());
  }
}

export async function clearTestDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

export async function disconnectTestDB() {
  await clearTestDB();
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}
