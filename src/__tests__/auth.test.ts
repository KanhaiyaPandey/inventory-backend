import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("Auth flow", () => {
  it("should login successfully and set session cookie", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
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
});