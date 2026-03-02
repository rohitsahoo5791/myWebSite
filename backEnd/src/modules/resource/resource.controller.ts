import { Request, Response } from "express";
import {
  createResource,
  getResourcesBySprint,
  updateResource,
  deleteResource,
} from "./resource.service";

export const createResourceHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resource = await createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
};

export const getResourcesBySprintHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { sprintId } = req.params;
    const resources = await getResourcesBySprint(sprintId);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

export const updateResourceHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const updated = await updateResource(id, req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(500).json({ error: "Failed to update resource" });
  }
};

export const deleteResourceHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await deleteResource(id);
    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(500).json({ error: "Failed to delete resource" });
  }
};