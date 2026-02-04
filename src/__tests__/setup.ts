import { beforeAll, vi } from "vitest";
import express from "express";

// Force supertest to bind to 127.0.0.1 instead of 0.0.0.0
const originalListen = express.application.listen;
express.application.listen = function (...args: any[]) {
  if (args.length === 1 || typeof args[1] === "function") {
    return originalListen.call(this, args[0], "127.0.0.1", ...args.slice(1));
  }
  return originalListen.apply(this, args);
};

process.env.NODE_ENV = "test";

vi.mock("ioredis", async () => {
  const Redis = (await import("ioredis-mock")).default;
  return { default: Redis };
});

beforeAll(async () => {
  // optional: global setup
});
