import { Router } from "express";
import { requireRole } from "../../middlewares/requireRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { listAuditLogsSchema } from "./audit.schemas";
import { listAuditLogs } from "./audit.controller";

const router = Router();

router.get(
  "/",
  requireRole(["ADMIN"]),
  validateRequest(listAuditLogsSchema),
  listAuditLogs
);

export default router;