import { Router } from "express";
import userRouter from "./userRouter";
import teacherRouter from "./teacherRouter";
// import testRouter from "./teacherRouter";

const router = Router();

router.use(userRouter);
router.use(teacherRouter);

// router.use(testRouter);

export default router;