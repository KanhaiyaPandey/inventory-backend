import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import { toPublicUser } from "./user.mapper";


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
    return toPublicUser(user);
  } catch (err: any) {
    if (err.code === "P2002") throw new AppError("Email already exists", 409);
    throw err;
  }
};