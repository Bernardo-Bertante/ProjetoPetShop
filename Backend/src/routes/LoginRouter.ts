import { Router } from "express";
import { LoginRoutes } from "../controllers/LoginController";
import errorHandler from "../middleware/errorHandler";

const router = Router();
router.use("/", LoginRoutes, errorHandler);

export { router as LoginRouter };
