import { prisma } from "../../config/prisma";

type AuditInput = {
  actorId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
};

export const logAudit = async (data: AuditInput) => {
  try {
    await prisma.auditLog.create({
      data,
    });
  } catch (err) {
    // Audit logs should NEVER break the request
    console.error("Audit log failed:", err);
  }
};