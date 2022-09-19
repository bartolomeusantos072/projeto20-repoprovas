import { prisma } from "../config/database"


async function getIdTeacher(id: number) {
    return prisma.teachers.findUnique({
      where: { id },
    });
  }
  
  async function getDiscipline(discipline: number) {
    return prisma.teachers.findMany({
      where: { teacherDisciplines: { some: { disciplineId: discipline } } },
    });
  }
export const teacherRepository = {
    getIdTeacher,
    getDiscipline
}