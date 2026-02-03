import { Router } from "express";
import { getUsers, getUserById, createUser } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, getUserByIdSchema } from "./user.schemas";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.get("/",requireAuth, getUsers);

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