import prisma from "../../config/db";

export const createCurriculum = async (data: {
  title: string;
  domain: string;
  description?: string;
  icon?: string;
  color?: string;
}) => {
  return prisma.curriculum.create({
    data: {
      title: data.title,
      domain: data.domain,
      description: data.description,
      icon: data.icon,
      color: data.color,
    },
  });
};

export const getAllCurriculums = async () => {
  return prisma.curriculum.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCurriculumFull = async (id: string) => {
  return prisma.curriculum.findUnique({
    where: { id },
    include: {
      projects: {
        include: {
          sprints: {
            include: {
              resources: true,
            },
          },
        },
      },
    },
  });
};

export const updateCurriculum = async (
  id: string,
  data: {
    title?: string;
    domain?: string;
    description?: string;
    icon?: string;
    color?: string;
  }
) => {
  return prisma.curriculum.update({
    where: { id },
    data,
  });
};

export const deleteCurriculum = async (id: string) => {
  return prisma.curriculum.delete({
    where: { id },
  });
};