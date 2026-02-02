import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

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