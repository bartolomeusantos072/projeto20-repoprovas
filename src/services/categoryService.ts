import categoryRepository from "../repositories/categoryRepository";

async function findMany() {
  return categoryRepository.findMany();
}

async function getIdCategory(id: number) {
  return categoryRepository.getIdCategory(id);
}

export default {
  findMany,
  getIdCategory
};
