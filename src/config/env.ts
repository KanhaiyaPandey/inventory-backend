import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  port: parsedEnv.PORT,
  nodeEnv: parsedEnv.NODE_ENV,
  databaseUrl: parsedEnv.DATABASE_URL,
  jwtAccessSecret: parsedEnv.JWT_ACCESS_SECRET,
  jwtRefreshSecret: parsedEnv.JWT_REFRESH_SECRET,
};