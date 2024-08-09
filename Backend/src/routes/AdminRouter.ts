import { Router } from "express";
import { FuncionarioRoutes } from "../controllers/FuncionarioController";
import errorHandler from "../middleware/errorHandler";
import { ensureAdmin } from "../middleware/ensureAdmin";

const router = Router();
router.use("/funcionario", ensureAdmin, FuncionarioRoutes, errorHandler);

export { router as AdminRouter };
