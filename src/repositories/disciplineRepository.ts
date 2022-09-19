import { prisma } from "../config/database";


async function getIdDiscipline(id: number) {
    return prisma.discipline.findUnique({
      where: { id },
    });
  }
  
  async function getTerm(term: number) {
    return prisma.discipline.findMany({
      where: { termId: term },
    });
  }
  
  export default {
    getIdDiscipline,
    getTerm,
  };
  