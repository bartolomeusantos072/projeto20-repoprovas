import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database";

export default async function categoryFactory(){
    const category = {name: faker.science.chemicalElement().name}

    return await prisma.category.create({data:category});
}