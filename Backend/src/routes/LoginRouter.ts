import { Router } from "express";
import { login, logout } from "../controllers/LoginController";
import errorHandler from "../middleware/errorHandler";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.post("/login", login, errorHandler);
router.post("/logout", ensureAuthenticated, logout, errorHandler);

export { router as LoginRouter };
