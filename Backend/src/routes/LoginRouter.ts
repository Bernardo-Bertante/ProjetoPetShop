import { Router } from "express";
import { funcionarioRouter } from "../controllers/funcionarioController";
//import errorHandler from "../middlewares/errorHandler";

const router = Router();
router.use("/", funcionarioRouter);

export { router as LoginRouter };
