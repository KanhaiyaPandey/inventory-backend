/*
  Warnings:

  - You are about to drop the column `metadata` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `tokenHash` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "metadata",
DROP COLUMN "resource",
DROP COLUMN "resourceId";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "createdAt",
DROP COLUMN "tokenHash",
ALTER COLUMN "revoked" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "updatedAt",
ALTER COLUMN "role" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
