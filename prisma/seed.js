"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new prisma_1.PrismaClient({
    adapter,
});
async function main() {
    const password = await bcrypt_1.default.hash("supersecret123", 10);
    await prisma.user.upsert({
        where: { email: "admin@test.com" },
        update: {},
        create: {
            email: "admin@test.com",
            name: "Admin",
            role: "ADMIN",
            password,
        },
    });
    await prisma.user.upsert({
        where: { email: "final@test.com" },
        update: {},
        create: {
            email: "final@test.com",
            name: "User",
            role: "USER",
            password,
        },
    });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
