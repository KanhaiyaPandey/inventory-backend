import { User } from "@prisma/client";

export const toPublicUser = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user;
  return safeUser;
};
