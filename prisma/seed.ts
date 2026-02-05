import bcrypt from "bcrypt";
import {prisma} from "../src/config/prisma"

async function main() {
  const password = await bcrypt.hash("supersecret123", 10);

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
