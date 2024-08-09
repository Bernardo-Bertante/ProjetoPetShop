import { Router } from "express";
import { FuncionarioRoutes } from "../controllers/FuncionarioController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();
router.use(
    "/funcionario",
    ensureAuthenticated,
    FuncionarioRoutes,
    errorHandler
);

export { router as AdminRouter };
