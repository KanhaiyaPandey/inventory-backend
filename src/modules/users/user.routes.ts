import { Router } from "express";
import { getUsers, getUserById } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { getUserByIdSchema } from "./user.schemas";

const router = Router();

router.get("/", getUsers);

router.get(
  "/:id",
  validateRequest(getUserByIdSchema),
  getUserById
);

export default router;