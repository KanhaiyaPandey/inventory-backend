import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("RBAC", () => {
  it("should allow ADMIN to access users", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/auth/login").send({
      email: "admin@test.com",
      password: "supersecret123",
    });

    const res = await agent.get("/api/v1/users");
    expect(res.status).toBe(200);
  });

  it("should block USER from accessing users", async () => {
    const agent = request.agent(app);

    await agent.post("/api/v1/auth/login").send({
      email: "final@test.com",
      password: "supersecret123",
    });

    const res = await agent.get("/api/v1/users");
    expect(res.status).toBe(403);
  });
});