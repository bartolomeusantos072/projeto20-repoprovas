import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";

export default async function testFactory( categoryId:number, teacherDisciplineId:number){
    const test = {
        categoryId,
        teacherDisciplineId,
        name: `Test - ${faker.random.numeric(3)}`,
        pdfUrl: faker.internet.url()
    }
    return await prisma.test.create({ data: test })
}