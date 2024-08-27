import { Router } from "express";
import { createAgendamento, deleteAgendamento, updateAgendamento, getAgendamentos } from "../controllers/AgendamentoController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.post("/create", ensureAuthenticated, createAgendamento, errorHandler);
router.delete("/delete/:id", ensureAuthenticated, deleteAgendamento, errorHandler);
router.put("/update/:id", ensureAuthenticated, updateAgendamento, errorHandler);
router.get("/all", ensureAuthenticated, getAgendamentos, errorHandler);

export { router as AgendamentoRouter };
