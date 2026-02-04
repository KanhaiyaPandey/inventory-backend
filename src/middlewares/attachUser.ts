import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export const attachUser = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session.userId) return next();

  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });

  if (user) {
    req.user = user;
  }

  next();
};
