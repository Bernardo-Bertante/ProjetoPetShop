import { Router } from "express";
import { AgendamentoRoutes } from "../controllers/AgendamentoController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();
router.use(
    "/agendamento",
    ensureAuthenticated,
    AgendamentoRoutes,
    errorHandler
);

export { router as AgendamentoRouter };
