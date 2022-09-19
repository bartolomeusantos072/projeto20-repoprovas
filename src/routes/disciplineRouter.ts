import { Router } from "express";
import validateAuth from "../middlewares/validateAuth";
import {disciplineController} from "../controllers/disciplineController";

const disciplineRouter =Router();

disciplineRouter.get("/disciplines/:term",validateAuth,disciplineController.getDiscipline);

export default disciplineRouter;