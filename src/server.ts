import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const shutdown = async () => {
  console.log("🛑 Shutting down...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);