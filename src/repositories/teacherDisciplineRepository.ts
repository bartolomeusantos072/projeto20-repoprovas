import { prisma } from "../config/database";

async function getTeacherAndDiscipline(teacherId: number, disciplineId: number) {
  return prisma.teachersDiscipline.findFirst({
    where: { AND: { disciplineId, teacherId } }
  });
}

const teacherDisciplineRepository = {
  getTeacherAndDiscipline
}

export default teacherDisciplineRepository;