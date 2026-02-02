import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";


export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};



export const createUser = async (data: {
  email: string;
  name: string;
  password: string;
  role?: "ADMIN" | "STAFF" | "USER";
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role ?? "USER",
      },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new AppError("Email already exists", 409);
    }
    throw err;
  }
};