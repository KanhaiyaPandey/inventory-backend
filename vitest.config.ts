import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["src/__tests__/setup.ts"],
    include: ["src/__tests__/**/*.test.ts"],
    exclude: ["dist", "node_modules"],
    threads: false,
  },
});
