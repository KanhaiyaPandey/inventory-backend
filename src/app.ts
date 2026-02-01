import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 handler
app.use((_req, _res, next) => {
  next(new Error("Route not found"));
});

// error handler (ALWAYS LAST)
app.use(errorHandler);

export default app;