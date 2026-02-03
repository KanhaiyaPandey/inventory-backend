import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../utils/AppError";

export const validateRequest =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      (req as Request & { validated?: unknown }).validated = parsed;
      next();
    } catch (err: any) {
      const message =
        err?.issues?.[0]?.message ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid request";
      next(new AppError(message, 400));
    }
  };
