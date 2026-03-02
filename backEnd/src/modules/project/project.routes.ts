import { Router } from "express";
import {
  createProjectHandler,
  getProjectsByCurriculumHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from "./project.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createProjectHandler);
router.patch("/:id", authMiddleware, updateProjectHandler);
router.delete("/:id", authMiddleware, deleteProjectHandler);
router.get("/curriculum/:curriculumId", getProjectsByCurriculumHandler);

export default router;