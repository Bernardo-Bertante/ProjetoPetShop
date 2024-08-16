// controllers/AgendamentoController.ts
import { Router, Request, Response, NextFunction } from "express";
import HorarioService from "../services/HorarioService";
const router = Router();

// Rota para listar todos horarios
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const horarios = await HorarioService.getHorarios();
        return res.status(200).send(horarios);
    } catch (error) {
        next(error);
    }
});

export { router as HorarioRoutes };
