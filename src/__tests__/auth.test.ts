import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../app";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

describe("Auth flow", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        email: "final@test.com",
        name: "Final User",
        password: await bcrypt.hash("supersecret123", 10),
        role: "ADMIN",
      },
    });
  });

  it("should login successfully and set session cookie", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "final@test.com",
      password: "supersecret123",
    });

    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should block protected route when not logged in", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(401);
  });

  it("persists session across requests", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/auth/login").send({
      email: "final@test.com",
      password: "supersecret123",
    });

    const res = await agent.get("/api/v1/users");
    expect([200, 403]).toContain(res.status);
  });

  it("logout invalidates session", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/auth/login").send({
      email: "final@test.com",
      password: "supersecret123",
    });

    await agent.post("/api/v1/auth/logout");

    const res = await agent.get("/api/v1/users");
    expect(res.status).toBe(401);
  });
});
