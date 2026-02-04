import Redis from "ioredis";

const createRedis = () => {
  if (process.env.NODE_ENV === "test") {
    // Use in-memory mock for tests
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RedisMock = require("ioredis-mock");
    return new RedisMock();
  }
  return new Redis();
};

export const redis = createRedis() as Redis;
