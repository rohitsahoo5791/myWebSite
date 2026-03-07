import { Request, Response } from "express";
import { createSprint, getSprintsByProject, updateSprint, deleteSprint } from "./sprint.service";

export const createSprintHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const sprint = await createSprint(req.body);
    res.status(201).json(sprint);
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: "Failed to create sprint" });
  }
};

export const getSprintsByProjectHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId } = req.params;
    const sprints = await getSprintsByProject(projectId);
    res.json(sprints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sprints" });
  }
};

export const updateSprintHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const updated = await updateSprint(id, req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Sprint not found" });
    }
    res.status(500).json({ error: "Failed to update sprint" });
  }
};

export const deleteSprintHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await deleteSprint(id);
    res.json({
      success: true,
      message: "Sprint deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Sprint not found" });
    }
    res.status(500).json({ error: "Failed to delete sprint" });
  }
};