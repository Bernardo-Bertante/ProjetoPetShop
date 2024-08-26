import { Router } from "express";
import { createCliente, deleteCliente, updateCliente, getClientes } from "../controllers/ClienteController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

// Define as rotas e aplica o middleware ensureAuthenticated e errorHandler
router.post("/create", ensureAuthenticated, createCliente, errorHandler);
router.delete("/delete/:id", ensureAuthenticated, deleteCliente, errorHandler);
router.put("/update/:id", ensureAuthenticated, updateCliente, errorHandler);
router.get("/all", ensureAuthenticated, getClientes, errorHandler);

export { router as ClienteRouter };
