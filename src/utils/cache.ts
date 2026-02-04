import { redis } from "../config/redis";

export const getOrSetCache = async (key: string, ttl: number, fn: () => Promise<any>) => {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const fresh = await fn();
  await redis.setex(key, ttl, JSON.stringify(fresh));
  return fresh;
};
