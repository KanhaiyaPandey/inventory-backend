import { redis } from "../config/redis";

export const getOrSetCache = async (
  key: string,
  ttl: number,
  fn: () => Promise<any>
) => {
  const cached = await redis.get(key);

  if (cached) {
    console.log(`🟢 CACHE HIT → ${key}`);
    return JSON.parse(cached);
  }

  console.log(`🟡 CACHE MISS → ${key}`);
  const fresh = await fn();

  await redis.setex(key, ttl, JSON.stringify(fresh));
  console.log(`🟣 CACHE SET (${ttl}s) → ${key}`);

  return fresh;
};