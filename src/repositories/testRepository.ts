import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";

async function getTestsDiscipline(discipline: string) {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsTeachers(teacher: string) {
  return prisma.teachersDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function insertTest(createTestData: Prisma.TestUncheckedCreateInput) {
  await prisma.test.create({
    data: createTestData,
  });
}

async function getIdTest(id: number) {
  return prisma.test.findUnique({
    where: { id },
  });
}

async function viewTest(id: number) {
  return prisma.test.update({
    where: { id },
    data: {
      view: { increment: 1 },
    },
  });
}

export default {
  getTestsDiscipline,
  getTestsTeachers,
  insertTest,
  getIdTest,
  viewTest,
};
