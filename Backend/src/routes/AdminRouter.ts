import { Router } from "express";
import { createFuncionario, deleteFuncionario, updateFuncionario, getFuncionarios } from "../controllers/FuncionarioController";
import errorHandler from "../middleware/errorHandler";
import { ensureAdmin } from "../middleware/ensureAdmin";

const router = Router();
router.post("/create", ensureAdmin, createFuncionario, errorHandler);
router.delete("/delete/:id", ensureAdmin, deleteFuncionario, errorHandler);
router.put("/update/:id", ensureAdmin, updateFuncionario, errorHandler);
router.get("/all", ensureAdmin, getFuncionarios, errorHandler);

export { router as AdminRouter };
