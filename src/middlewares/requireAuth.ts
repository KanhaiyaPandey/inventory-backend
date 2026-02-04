import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return next(new AppError("Unauthorized", 401));
  }
  next();
};
