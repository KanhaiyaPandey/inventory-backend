import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../config/prisma";

export const requireRole =
  (roles: Array<"ADMIN" | "STAFF" | "USER">) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return next(new AppError("Unauthorized", 401));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { role: true },
    });

    if (!user || !roles.includes(user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };