import prisma from "../../config/db";

export const createSprint = async (data: {
  title: string;
  summary?: string;
  sprintNumber?: number;
  startDate?: string;
  endDate?: string;
  projectId: string;
}) => {
  return prisma.sprint.create({
    data: {
      title: data.title,
      summary: data.summary,
      sprintNumber: data.sprintNumber,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      projectId: data.projectId,
    },
  });
};

export const getSprintsByProject = async (projectId: string) => {
  return prisma.sprint.findMany({
    where: { projectId },
    orderBy: { sprintNumber: "asc" },
  });
};

export const updateSprint = async (
  id: string,
  data: Partial<{
    title: string;
    summary: string;
    sprintNumber: number;
    startDate: string;
    endDate: string;
    projectId: string;
  }>
) => {
  const updateData: any = { ...data };
  
  if (data.startDate) {
    updateData.startDate = new Date(data.startDate);
  }
  if (data.endDate) {
    updateData.endDate = new Date(data.endDate);
  }
  
  return prisma.sprint.update({
    where: { id },
    data: updateData,
  });
};

export const deleteSprint = async (id: string) => {
  return prisma.sprint.delete({
    where: { id },
  });
};