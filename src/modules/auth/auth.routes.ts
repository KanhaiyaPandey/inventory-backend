import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { login } from "./auth.controller";
import { loginSchema } from "./auth.schemas";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);

export default router;