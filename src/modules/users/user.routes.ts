import { Router } from "express";
import { getUsers, getUserById, createUser } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, getUserByIdSchema } from "./user.schemas";

const router = Router();

router.get("/", getUsers);

router.get(
  "/:id",
  validateRequest(getUserByIdSchema),
  getUserById
);

router.post(
  "/",
  validateRequest(createUserSchema),
  createUser
);

export default router;