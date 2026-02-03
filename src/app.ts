import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import v1Router from "./routes/v1";
import { sessionMiddleware } from "./config/session";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(sessionMiddleware);


// API v1
app.use("/api/v1", v1Router);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 handler
app.use((_req, _res, next) => {
  next(new Error("Route not found"));
});

app.use(errorHandler);

export default app;