import { verifyAccessToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { NextFunction, Request, Response } from "express";

export const requireJwt = (req: Request, _res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) throw new AppError("Unauthorized", 401);

  const token = auth.replace("Bearer ", "");
  const payload = verifyAccessToken(token);

  req.user = { id: payload.sub };
  next();
};
