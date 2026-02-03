import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};