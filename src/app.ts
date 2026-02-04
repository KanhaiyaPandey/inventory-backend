import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import v1Router from "./routes/v1";
import { sessionMiddleware } from "./config/session";
import { attachUser } from "./middlewares/attachUser";
import helmet from "helmet";
import { apiLimiter } from "./middlewares/rateLimit";
import { prisma } from "./config/prisma";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(helmet());

app.use(sessionMiddleware);
app.use(attachUser);

// API v1
app.use("/api/v1", apiLimiter, v1Router);

app.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.status(200).json({ status: "ok" });
});

// 404 handler
app.use((_req, _res, next) => {
  next(new Error("Route not found"));
});

app.use(errorHandler);

export default app;
