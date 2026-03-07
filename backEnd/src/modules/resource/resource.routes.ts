import { Router } from "express";
import {
  createResourceHandler,
  getResourcesBySprintHandler,
  updateResourceHandler,
  deleteResourceHandler,
} from "./resource.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createResourceHandler);
router.patch("/:id", authMiddleware, updateResourceHandler);
router.delete("/:id", authMiddleware, deleteResourceHandler);
router.get("/sprint/:sprintId", getResourcesBySprintHandler);

export default router;