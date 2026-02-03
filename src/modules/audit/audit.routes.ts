import { Router } from "express";
import { requireRole } from "../../middlewares/requireRole";
import { prisma } from "../../config/prisma";

const router = Router();

/**
 * GET /api/v1/audit-logs
 * ADMIN only
 */
router.get(
  "/",
  requireRole(["ADMIN"]),
  async (_req, res, next) => {
    try {
      const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      });

      res.json(logs);
    } catch (err) {
      next(err);
    }
  }
);

export default router;