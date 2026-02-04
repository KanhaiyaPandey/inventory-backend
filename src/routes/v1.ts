import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import auditRoutes from "../modules/audit/audit.routes";
import mobileAuthRoutes from "../modules/auth/mobileAuth.routes";


const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/auth/mobile", mobileAuthRoutes);
router.use("/audit-logs", auditRoutes);

export default router;