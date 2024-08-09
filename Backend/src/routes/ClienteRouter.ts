import { Router } from "express";
import { ClienteRoutes } from "../controllers/ClienteController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();
router.use("/cliente", ensureAuthenticated, ClienteRoutes, errorHandler);

export { router as ClienteRouter };
