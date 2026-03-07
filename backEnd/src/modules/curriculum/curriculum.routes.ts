import { Router } from "express";
import {
  createCurriculumHandler,
  getAllCurriculumsHandler,
  getCurriculumFullHandler,
  updateCurriculumHandler,
  deleteCurriculumHandler,
} from "./curriculum.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
router.get("/:id/full", getCurriculumFullHandler);
router.post("/", authMiddleware, createCurriculumHandler);
router.patch("/:id", authMiddleware, updateCurriculumHandler);
router.delete("/:id", authMiddleware, deleteCurriculumHandler);
router.get("/", getAllCurriculumsHandler);


export default router;