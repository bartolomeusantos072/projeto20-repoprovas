import userFactory from "./userFactory";
import jwt from "jsonwebtoken";

export async function tokenFactory() {
    const user = userFactory.userBodyFactory();
    const createUser = await userFactory.userCreateFactory(user);

    return jwt.sign({userId:createUser.id},process.env.JWTSECRET);
}