import { prisma } from "../config/database";

async function findManyCategories() {
  return prisma.category.findMany();
}

async function getIdCategory(id: number) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export default {
  findManyCategories,
  getIdCategory
};
