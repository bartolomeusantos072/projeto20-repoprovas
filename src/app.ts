import cors from "cors";
import express, { json } from "express";
import "express-async-errors";

import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(
        json(),
        cors(),
        router,
        errorHandler
        );

export default app;