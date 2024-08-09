import { Router } from "express";
import { ServicoRoutes } from "../controllers/ServicoController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();
router.use("/servico", ensureAuthenticated, ServicoRoutes, errorHandler);

export { router as ServicoRouter };
