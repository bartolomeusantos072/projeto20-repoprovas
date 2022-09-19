import { Router } from "express";
import validateAuth from "../middlewares/validateAuth";
import {teacherController} from "../controllers/teachersController";


const teacherRouter = Router();

teacherRouter.get("/teachers/:discipline",validateAuth,teacherController.getTeachers);


export default teacherRouter;
