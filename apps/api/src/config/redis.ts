import { createClient } from 'redis';
import { env } from './env';

export const redisClient = createClient({ url: env.redisUrl });

redisClient.on('error', (err) => {
  console.error('Redis error', err);
});

export async function ensureRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}
