import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const requireRole =
  (roles: Array<"ADMIN" | "STAFF" | "USER">) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };