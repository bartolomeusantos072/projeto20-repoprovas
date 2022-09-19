import { Router } from "express";
import {testController} from "../controllers/testController";
import validateAuth from "../middlewares/validateAuth";


const testRouter = Router();

testRouter.get("/tests",validateAuth , testController.findTest);
testRouter.post("/tests",validateAuth , testController.insertTest);
testRouter.post("/tests/:id/view", validateAuth, testController.viewTest);

export default testRouter;
