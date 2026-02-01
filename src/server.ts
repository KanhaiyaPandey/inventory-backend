import app from "./app";
import { env } from "./config/env";

const PORT = process.env.PORT || 3000;

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port} in ${env.nodeEnv} mode`);
});