import { prisma } from "../../src/config/database";


export default async function termFactory() {
    const term =[{number:1},{number:2},{number:3}];

    await prisma.term.createMany({
        data:term,
        skipDuplicates: true,
    });
    
    return await prisma.term.findMany();
}