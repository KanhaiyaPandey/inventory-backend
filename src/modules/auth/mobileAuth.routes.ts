import { Router } from "express";
import { mobileLogin } from "./mobileAuth.controller";
import { refreshToken } from "./mobileRefresh.controller";

const router = Router();

router.post("/login", mobileLogin);
router.post("/refresh", refreshToken);
// router.get("/profile", requireJwt, handler);

export default router;
