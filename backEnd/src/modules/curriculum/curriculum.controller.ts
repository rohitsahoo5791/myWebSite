import { Request, Response } from "express";
import {
  createCurriculum,
  getAllCurriculums,
  getCurriculumFull,
  updateCurriculum,
  deleteCurriculum,
} from "./curriculum.service";

export const createCurriculumHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const curriculum = await createCurriculum(req.body);
    res.status(201).json(curriculum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create curriculum" });
  }
};

export const getAllCurriculumsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const curriculums = await getAllCurriculums();
    res.json(curriculums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch curriculums" });
  }
};




export const getCurriculumFullHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = await getCurriculumFull(id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch full curriculum" });
  }
};

export const updateCurriculumHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const updated = await updateCurriculum(id, req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Curriculum not found" });
    }
    res.status(500).json({ error: "Failed to update curriculum" });
  }
};

export const deleteCurriculumHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await deleteCurriculum(id);
    res.json({
      success: true,
      message: "Curriculum deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Curriculum not found" });
    }
    res.status(500).json({ error: "Failed to delete curriculum" });
  }
};