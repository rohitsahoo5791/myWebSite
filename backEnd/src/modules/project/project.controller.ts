import { Request, Response } from "express";
import {
  createProject,
  getProjectsByCurriculum,
  updateProject,
  deleteProject,
} from "./project.service";

export const createProjectHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjectsByCurriculumHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { curriculumId } = req.params;
    const projects = await getProjectsByCurriculum(curriculumId);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const updateProjectHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const updated = await updateProject(id, req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProjectHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await deleteProject(id);
    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(500).json({ error: "Failed to delete project" });
  }
};