import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import app from "../app";
import { apiLimiter } from "../middlewares/rateLimit";
import { patchListen } from "./patchListen";

patchListen(app);

describe("System integration", () => {
  it("enforces rate limits (429)", async () => {
    const testApp = express();
    testApp.use("/api/v1", apiLimiter, (_req, res) => res.status(200).json({ ok: true }));

    let lastStatus = 0;
    for (let i = 0; i < 101; i += 1) {
      const res = await request(testApp).get("/api/v1/ping");
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  });

  it("responds to health check", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
