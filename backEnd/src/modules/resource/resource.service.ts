import prisma from "../../config/db";

export const createResource = async (data: {
  label: string;
  url: string;
  type?: string;
  sprintId: string;
}) => {
  return prisma.resource.create({
    data,
  });
};

export const getResourcesBySprint = async (sprintId: string) => {
  return prisma.resource.findMany({
    where: { sprintId },
    orderBy: { createdAt: "asc" },
  });
};

export const updateResource = async (
  id: string,
  data: Partial<{
    label: string;
    url: string;
    type: string;
    sprintId: string;
  }>
) => {
  return prisma.resource.update({
    where: { id },
    data,
  });
};

export const deleteResource = async (id: string) => {
  return prisma.resource.delete({
    where: { id },
  });
};