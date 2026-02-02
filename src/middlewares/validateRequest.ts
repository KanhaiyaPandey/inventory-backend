import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: any) {
      next(new AppError(err.errors?.[0]?.message || "Invalid request", 400));
    }
  };