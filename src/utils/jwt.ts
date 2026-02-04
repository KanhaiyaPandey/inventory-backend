import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET) as { sub: string };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET) as { sub: string };