import { Router } from "express";
import { getAllHorarios } from "../controllers/HorarioController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.get("/all", ensureAuthenticated, getAllHorarios);

export { router as HorarioRouter };
