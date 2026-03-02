import { Router } from "express";
import {
  createSprintHandler,
  getSprintsByProjectHandler,
  updateSprintHandler,
  deleteSprintHandler,
} from "./sprint.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createSprintHandler);
router.patch("/:id", authMiddleware, updateSprintHandler);
router.delete("/:id", authMiddleware, deleteSprintHandler);
router.get("/project/:projectId", getSprintsByProjectHandler);

export default router;