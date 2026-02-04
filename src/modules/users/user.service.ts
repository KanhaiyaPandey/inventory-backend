import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import { toPublicUser } from "./user.mapper";
import { logAudit } from "../audit/audit.service";

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return users.map(toPublicUser);
};

// in getUserById
export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError("User not found", 404);
  return toPublicUser(user);
};

// in createUser
export const createUser = async (data: {
  email: string;
  name: string;
  password: string;
  role?: "ADMIN" | "STAFF" | "USER";
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role ?? "USER",
      },
    });
    await logAudit({
      actorId: user.id,
      action: "USER_CREATED",
      resource: "USER",
      resourceId: user.id,
    });
    return toPublicUser(user);
  } catch (err: any) {
    if (err.code === "P2002") throw new AppError("Email already exists", 409);
    throw err;
  }
};

import { getOrSetCache } from "../../utils/cache";

export const listUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: "ADMIN" | "STAFF" | "USER";
}) => {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const search = params.search;
  const role = params.role;

  const cacheKey = `users:${JSON.stringify({
    page,
    limit,
    search,
    role,
  })}`;

  return getOrSetCache(cacheKey, 30, async () => {
    console.log("🔵 DB QUERY → users list");

    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users.map(toPublicUser),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  });
};
