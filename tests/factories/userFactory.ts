import { prisma } from "../../src/config/database";
import { TCreateUserData } from "../../src/utils/typeUtils";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";

async function userCreateFactory( user: TCreateUserData) {
    return prisma.users.create({
        data:{
            ...user,
            password: bcrypt.hashSync(user.password,10),
        }
    })    
}

function userBodyFactory():TCreateUserData{
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

export default{
    userBodyFactory,
    userCreateFactory
}