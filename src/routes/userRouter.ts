import {Router} from "express";
import userController from "../controllers/userController";

import {validateSchemaMiddleware} from "../middlewares/validateSchemaMiddleware";
import {userSchema} from "../schemas/useSchema";

export const userRouter = Router();

userRouter.post("/signup",validateSchemaMiddleware(userSchema),userController.signUp);
userRouter.post("/signin",validateSchemaMiddleware(userSchema),userController.signIn);