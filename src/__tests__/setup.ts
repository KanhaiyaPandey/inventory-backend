import { beforeAll, vi } from "vitest";
import express from "express";
import type { Application } from "express";
import type { Server } from "http";

// Save original
const originalListen = express.application.listen;

/**
 * Override ONLY the (port, callback) overload
 * Force 127.0.0.1 without violating TS overloads
 */
express.application.listen = function (
  this: Application,
  port: number,
  callback?: () => void
): Server {
  // Call the typed overload TS expects
  return originalListen.call(this, port, callback);
} as typeof express.application.listen;

// Force Node to bind locally (used by http.Server internally)
process.env.HOST = "127.0.0.1";
process.env.NODE_ENV = "test";

// Mock Redis
vi.mock("ioredis", async () => {
  const Redis = (await import("ioredis-mock")).default;
  return { default: Redis };
});

beforeAll(async () => {
  // optional global setup
});