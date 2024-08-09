import { Router } from "express";
import { FuncionarioRouter } from "../controllers/FuncionarioController";
//import errorHandler from "../middlewares/errorHandler";

const router = Router();
router.use("/", FuncionarioRouter);

export { router as LoginRouter };
