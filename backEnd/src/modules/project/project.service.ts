import prisma from "../../config/db";

export const createProject = async (data: {
  title: string;
  description?: string;
  curriculumId: string;
}) => {
  return prisma.project.create({
    data,
  });
};

export const getProjectsByCurriculum = async (curriculumId: string) => {
  return prisma.project.findMany({
    where: { curriculumId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateProject = async (
  id: string,
  data: Partial<{
    title: string;
    description: string;
    curriculumId: string;
  }>
) => {
  return prisma.project.update({
    where: { id },
    data,
  });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};