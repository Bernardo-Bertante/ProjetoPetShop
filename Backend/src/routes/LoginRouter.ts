import { Router } from "express";
import { FuncionarioRouter } from "../controllers/FuncionarioController";
import errorHandler from "../middleware/errorHandler";

const router = Router();
router.use("/funcionario", FuncionarioRouter, errorHandler);

export { router as LoginRouter };
