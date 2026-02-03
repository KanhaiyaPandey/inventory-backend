import { NextFunction, Request, Response } from "express";
import * as auditService from "./audit.service";
import { ListAuditLogsQuery } from "./audit.schemas";

export const listAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query as unknown as ListAuditLogsQuery;
    const result = await auditService.listAuditLogs(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};