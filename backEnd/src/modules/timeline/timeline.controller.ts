import { Request, Response } from "express";
import { getTimeline } from "./timeline.service";

export const getTimelineHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const timeline = await getTimeline();
    res.json(timeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
};