import { afterAll, beforeAll } from "vitest";
import { prisma } from "../config/prisma";

beforeAll(async () => {
  // optional: clean DB
});

afterAll(async () => {
  await prisma.$disconnect();
});