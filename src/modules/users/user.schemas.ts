import { z } from "zod";

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
    role: z.enum(["ADMIN", "STAFF", "USER"]).optional(),
  }),
});