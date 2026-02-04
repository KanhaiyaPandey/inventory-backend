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

export const listAuditLogs = async (params: {
  page: number;
  limit: number;
  action?: string;
  actorId?: string;
}) => {
  const { page, limit, action, actorId } = params;

  const where: any = {};

  if (action) where.action = action;
  if (actorId) where.actorId = actorId;

  const skip = (page - 1) * limit;

  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    data: logs,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
