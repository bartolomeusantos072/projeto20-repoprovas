import { prisma } from "../config/database";

async function findMany() {
  return prisma.category.findMany();
}

async function getIdCategory(id: number) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export default {
  findMany,
  getIdCategory
};
