import express from "express";
import cors from "cors";
import prisma from "./config/db";
import curriculumRoutes from "./modules/curriculum/curriculum.routes";
import projectRoutes from "./modules/project/project.routes";
import sprintRoutes from "./modules/sprint/sprint.routes";
import resourceRoutes from "./modules/resource/resource.routes";
import timelineRoutes from "./modules/timeline/timeline.routes";
import authRoutes from "./modules/auth/auth.routes";



const app = express();   // 👈 MUST COME BEFORE ROUTES

app.use(cors());
app.use(express.json());
app.use("/curriculum", curriculumRoutes);
app.use("/project", projectRoutes);
app.use("/sprint", sprintRoutes);
app.use("/resource", resourceRoutes);
app.use("/timeline", timelineRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

app.post("/curriculum", async (req, res) => {
  try {
    const { title, domain, description } = req.body;

    const curriculum = await prisma.curriculum.create({
      data: {
        title,
        domain,
        description,
      },
    });

    res.status(201).json(curriculum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default app;