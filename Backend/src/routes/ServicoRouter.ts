import { Router } from "express";
import { createServico, deleteServico, updateServico, getServicos } from "../controllers/ServicoController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.post("/create", ensureAuthenticated, createServico, errorHandler);
router.delete("/delete/:id", ensureAuthenticated, deleteServico, errorHandler);
router.put("/update/:id", ensureAuthenticated, updateServico, errorHandler);
router.get("/all", ensureAuthenticated, getServicos, errorHandler);

export { router as ServicoRouter };
