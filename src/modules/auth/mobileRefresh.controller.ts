import crypto from "crypto";
import { prisma } from "../../config/prisma";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import { NextFunction } from "express";

/**
 * POST /api/v1/auth/mobile/refresh
 */
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const payload = verifyRefreshToken(refreshToken);

    const hash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const stored = await prisma.refreshToken.findFirst({
      where: {
        tokenHash: hash,
        userId: payload.sub,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored) throw new AppError("Invalid refresh token", 401);

    // 🔁 ROTATION: revoke old token
    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revoked: true },
    });

    // issue new tokens
    const newAccessToken = signAccessToken(payload.sub);
    const newRefreshToken = signRefreshToken(payload.sub);

    const newHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    await prisma.refreshToken.create({
      data: {
        tokenHash: newHash,
        userId: payload.sub,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};