import { Router } from "express";
import userRouter from "./userRouter";
import teacherRouter from "./teacherRouter";
import disciplineRouter from "./disciplineRouter";
import categoryRouter from "./categoryRouter";
import testRouter from "./testRouter";

const router = Router();

router.use(userRouter);
router.use(teacherRouter);
router.use(disciplineRouter);
router.use(categoryRouter);
router.use(testRouter);

export default router;