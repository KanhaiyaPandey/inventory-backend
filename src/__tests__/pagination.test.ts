import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../config/prisma", () => {
  const prisma = {
    auditLog: {
      findMany: vi.fn(),
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
import { prisma } from "../config/prisma";

const prismaMock = prisma as unknown as {
  user: { findMany: ReturnType<typeof vi.fn>; count: ReturnType<typeof vi.fn> };
  $transaction: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/v1/users pagination", () => {
  it("paginates and strips passwords", async () => {
    const users = [
      {
        id: "u-1",
        email: "a@test.com",
        name: "A",
        password: "hashed",
        role: "USER",
        createdAt: new Date("2026-02-01T00:00:00.000Z"),
        updatedAt: new Date("2026-02-01T00:00:00.000Z"),
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(users);
    prismaMock.user.count.mockResolvedValue(12);

    const res = await request(app)
      .get("/api/v1/users?page=2&limit=5")
      .set("x-test-role", "ADMIN")
      .expect(200);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: {},
      skip: 5,
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    expect(prismaMock.user.count).toHaveBeenCalledWith({ where: {} });

    expect(res.body.meta).toEqual({
      page: 2,
      limit: 5,
      total: 12,
      totalPages: 3,
    });
    expect(res.body.data[0].password).toBeUndefined();
    expect(res.body.data[0].id).toBe("u-1");
  });
});
