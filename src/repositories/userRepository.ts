import { prisma } from "../config/database";
import { TCreateUserData } from "../utils/typeUtils";

async function findId(id:number) {
    return prisma.users.findUnique({
        where:{
            id,
        },
    });
}

async function findEmail(email:string) {
    return prisma.users.findUnique({
        where:{
            email,
        }
    })
}

async function insert(createUserData:TCreateUserData) {
    return prisma.users.create({
        data:createUserData,
    });
}

export default {
    findId,
    findEmail,
    insert
}