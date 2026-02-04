import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../config/prisma", () => {
  const prisma = {
    auditLog: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    user: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    },
    $transaction: vi.fn(async (ops: Array<Promise<unknown>>) => Promise.all(ops)),
  };
  return { prisma };
});

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
import { prisma } from "../config/prisma";

const prismaMock = prisma as unknown as {
  auditLog: { findMany: ReturnType<typeof vi.fn>; count: ReturnType<typeof vi.fn> };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/v1/audit-logs", () => {
  it("returns 403 for non-admin roles", async () => {
    const res = await request(app)
      .get("/api/v1/audit-logs")
      .set("x-test-role", "STAFF")
      .expect(403);

    expect(res.body).toEqual({ message: "Forbidden" });
    expect(prismaMock.auditLog.findMany).not.toHaveBeenCalled();
  });

  it("returns audit logs for admin", async () => {
    const logs = [
      {
        id: "log-1",
        actorId: "user-1",
        action: "CREATE",
        resource: "USER",
        resourceId: "u-1",
        metadata: { foo: "bar" },
        createdAt: new Date("2026-02-03T06:50:00.000Z"),
      },
    ];

    prismaMock.auditLog.findMany.mockResolvedValue(logs);
    prismaMock.auditLog.count.mockResolvedValue(logs.length);

    const res = await request(app)
      .get("/api/v1/audit-logs")
      .set("x-test-role", "ADMIN")
      .expect(200);

    expect(prismaMock.auditLog.findMany).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 20,
      orderBy: { createdAt: "desc" },
    });
    expect(res.body.data[0].id).toBe("log-1");
    expect(res.body.data[0].action).toBe("CREATE");
  });
});
