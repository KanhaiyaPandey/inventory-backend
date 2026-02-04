import request from "supertest";
import { describe, it, expect, vi } from "vitest";

vi.mock("../middlewares/attachUser", () => ({
  attachUser: (req: any, _res: any, next: any) => {
    const header = req.headers["x-test-role"];
    const role = Array.isArray(header) ? header[0] : header;
    if (role) {
      req.user = { id: "user-1", role };
    }
    next();
  },
}));

import app from "../app";
import { patchListen } from "./patchListen";

patchListen(app);

describe("RBAC", () => {
  it("should allow ADMIN to access users", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("x-test-role", "ADMIN");
    expect(res.status).toBe(200);
  });

  it("should block USER from accessing users", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("x-test-role", "USER");
    expect(res.status).toBe(403);
  });
});
