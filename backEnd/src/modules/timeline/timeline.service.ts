import prisma from "../../config/db";

export const getTimeline = async () => {
  const sprints = await prisma.sprint.findMany({
    include: {
      project: {
        include: {
          curriculum: true,
        },
      },
      resources: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  return sprints.map((sprint) => ({
    sprintId: sprint.id,
    sprintTitle: sprint.title,
    sprintNumber: sprint.sprintNumber,
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    projectTitle: sprint.project.title,
    curriculumTitle: sprint.project.curriculum.title,
    resourcesCount: sprint.resources.length,
  }));
};