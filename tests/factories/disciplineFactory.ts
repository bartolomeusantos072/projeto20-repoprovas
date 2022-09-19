import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";


export default async function disciplineFactory(termId:number) {
    
    const discipline = {termId, name:faker.hacker.ingverb()};

    return await prisma.discipline.create({data:discipline});
}