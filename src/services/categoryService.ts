import categoryRepository from "../repositories/categoryRepository";

async function findManyCategories() {
  return categoryRepository.findManyCategories();
}

async function getIdCategory(id: number) {
  return categoryRepository.getIdCategory(id);
}

export default {
  findManyCategories,
  getIdCategory
};
