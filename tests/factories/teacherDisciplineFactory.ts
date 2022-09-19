import { prisma } from "../../src/config/database";


export default async function teacherDisciplineFactory(teacherId:number, disciplineId:number) {
    const teacherDiscipline = { teacherId, disciplineId};

    return await prisma.teachersDiscipline.create({data:teacherDiscipline});
}