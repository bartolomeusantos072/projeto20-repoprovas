import {Router} from "express";
import userController from "../controllers/userController";

import {validateSchema} from "../middlewares/validateSchema";
import {userSchema} from "../schemas/useSchema";

export const userRouter = Router();

userRouter.post("/sign-up",validateSchema(userSchema),userController.signUp);
userRouter.post("/sign-in",validateSchema(userSchema),userController.signIn);