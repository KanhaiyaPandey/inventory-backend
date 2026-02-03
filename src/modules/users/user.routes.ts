import { Router } from "express";
import { getUsers, getUserById, createUser } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, getUserByIdSchema } from "./user.schemas";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";

const router = Router();


router.get(
  "/",
  requireRole(["ADMIN"]),
  getUsers
);

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

// router.get(
//   "/reports",
//   requireRole(["ADMIN", "STAFF"]),
//   getReports
// );

export default router;