import jwt from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_SECRET = env.jwtAccessSecret;
const REFRESH_SECRET = env.jwtRefreshSecret;

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET) as { sub: string };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET) as { sub: string };
