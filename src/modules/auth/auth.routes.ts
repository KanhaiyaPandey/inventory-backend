import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { login, logout } from "./auth.controller";
import { loginSchema } from "./auth.schemas";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

export default router;