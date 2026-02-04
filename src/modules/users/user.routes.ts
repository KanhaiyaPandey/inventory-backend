import { Router } from "express";
import { getUserById, createUser, listUsers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, getUserByIdSchema, listUsersSchema } from "./user.schemas";
import { requireRole } from "../../middlewares/requireRole";

const router = Router();

router.get("/", requireRole(["ADMIN"]), validateRequest(listUsersSchema), listUsers);

router.get("/:id", validateRequest(getUserByIdSchema), getUserById);

router.post("/", validateRequest(createUserSchema), createUser);

// router.get(
//   "/reports",
//   requireRole(["ADMIN", "STAFF"]),
//   getReports
// );

export default router;
