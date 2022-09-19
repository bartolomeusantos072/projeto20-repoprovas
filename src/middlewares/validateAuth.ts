import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService";
import { unauthorizedError } from "../utils/errorUtils";
import dotenv from "dotenv";
dotenv.config();

export default async function validateAuth(req: Request, res: Response, next: NextFunction) {

    const authorization = req.headers["authorization"];
    if (!authorization) throw unauthorizedError("Authorization not found");

    const token = authorization.split(" ")[1].trim();
    if (!token) throw unauthorizedError("Token not found");

    try {
        const { userId } = jwt.verify(token, process.env.JWTSECRET) as {
            userId: number;
        };
        const user = await userService.findId(userId);
        res.locals.user = user;

        next();
    } catch {
        throw unauthorizedError("Invalid token");
    }
}
