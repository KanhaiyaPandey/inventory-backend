import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { logAudit } from "../audit/audit.service";


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    req.session.userId = user.id;
    await logAudit({
      actorId: user.id,
      action: "USER_LOGIN",
      resource: "USER",
      resourceId: user.id,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("inventory.sid");
    res.status(200).json({ message: "Logged out" });
  });
};


