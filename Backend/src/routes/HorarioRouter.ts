import { Router } from "express";
import { HorarioRoutes } from "../controllers/HorarioController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();
router.use("/horario", ensureAuthenticated, HorarioRoutes);

export { router as HorarioRouter };
