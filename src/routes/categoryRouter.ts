import { Router } from "express";
import {categoryController} from "../controllers/categoryController";
import  validateAuth  from "../middlewares/validateAuth";

const categoryRouter = Router();

categoryRouter.get("/categories", validateAuth, categoryController.findMany);

export default categoryRouter;
