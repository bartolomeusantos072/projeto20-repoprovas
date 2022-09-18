import { prisma } from "../../src/config/database";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";

async function userCreateFactory( user: any) {
    return prisma.users.create({
        data:{
            ...user,
            password: bcrypt.hashSync(user.password,10),
        }
    })    
}

function userBodyFactory():any{
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}