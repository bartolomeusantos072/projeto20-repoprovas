import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils";
import { TCreateUserData } from "../utils/typeUtils";
import dotenv from "dotenv";
dotenv.config();

async function signIn(loginData:TCreateUserData){
    const user = await loginOrFail(loginData);
    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET);

    return token;
}

async function signUp(createUserData:TCreateUserData) {
    const verifyUser = await userRepository.findEmail(createUserData.email);
    if(verifyUser){
        throw conflictError("Email must bu unique");
    }    
}

async function loginOrFail(loginData:TCreateUserData) {
    const user = await userRepository.findEmail(loginData.email);
    if(!user){
        throw unauthorizedError("Invalid credentials");
    }
    
    const validPassword = bcrypt.compareSync(loginData.password, user.password);
    if(!validPassword){
        throw unauthorizedError("Invalid credentials");
    }

    return user;
}

async function findId(id:number) {
    const user = await userRepository.findId(id);
    if(!user){
        throw notFoundError("User not found");
    }

    return user;
}

export default{
    signIn,
    signUp,
    findId
  }