import { Router } from "express";
import { getTimelineHandler } from "./timeline.controller";

const router = Router();

router.get("/", getTimelineHandler);

export default router;