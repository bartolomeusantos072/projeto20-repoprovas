import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";


export default async function teacherFactory(){
    const teacher = { name: faker.name.fullName()};
    return await prisma.teachers.create({data:teacher});
}