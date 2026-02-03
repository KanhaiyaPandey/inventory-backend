import { z } from "zod";

export const listAuditLogsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    action: z.string().optional(),
    actorId: z.string().uuid().optional(),
  }),
});

export type ListAuditLogsQuery = z.infer<
  typeof listAuditLogsSchema
>["query"];