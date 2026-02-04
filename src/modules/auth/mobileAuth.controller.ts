import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../../config/prisma";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import { NextFunction, Request, Response } from "express";

/**
 * POST /api/v1/auth/mobile/login
 */
export const mobileLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid credentials", 401);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new AppError("Invalid credentials", 401);

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};
