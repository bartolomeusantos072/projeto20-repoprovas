import { prisma } from "../../src/config/database";
import categoryFactory from "./categoryFactory"
import disciplineFactory from "./disciplineFactory";
import teacherDisciplineFactory from "./teacherDisciplineFactory";
import teacherFactory from "./teacherFactory";
import termFactory from "./termFactory";
import testFactory from "./testFactory";

async function laboratoryOneTeacherWithOneTest() {
    const category = await categoryFactory();
    const teacher = await teacherFactory();
    const term = await termFactory();
    const discipline = await disciplineFactory(term[0].id);
    const teacherDiscipline = await teacherDisciplineFactory(teacher.id, discipline.id);
    const test = await testFactory(category.id, teacherDiscipline.id);

    return {
        category,
        teacher,
        term,
        discipline,
        teacherDiscipline,
        test
    }


}
async function laboratoryTwoTeachersWithTwoTestsEach() {
    const category = await categoryFactory();

    const teacher1 = await teacherFactory();
    const teacher2 = await teacherFactory();
    const term = await termFactory();
    const discipline = await disciplineFactory(term[0].id)
    const discipline2 = await disciplineFactory(term[1].id)

    const teacherDiscipline1 = await teacherDisciplineFactory(teacher1.id, discipline.id);
    const teacherDiscipline2 = await teacherDisciplineFactory(teacher2.id, discipline2.id);

    const test1 = await testFactory(category.id, teacherDiscipline1.id);
    const test2 = await testFactory(category.id, teacherDiscipline1.id);

    const test3 = await testFactory(category.id, teacherDiscipline2.id);
    const test4 = await testFactory(category.id, teacherDiscipline2.id);
    
    return {
        category,
        teachers: [teacher1, teacher2],
        term,
        discipline,
        teacherDisciplines: [teacherDiscipline1, teacherDiscipline2],
        tests: [test1, test2, test3, test4]
    }
}
async function deleteAllData() {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE users`,
        prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE teachers_disciplines CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE terms CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE`,
    ])
}
export default {
    laboratoryOneTeacherWithOneTest,
    laboratoryTwoTeachersWithTwoTestsEach,
    deleteAllData
}