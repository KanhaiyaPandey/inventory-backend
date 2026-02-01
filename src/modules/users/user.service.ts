import { AppError } from "../../utils/AppError";

type User = {
  id: string;
  name: string;
};

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};