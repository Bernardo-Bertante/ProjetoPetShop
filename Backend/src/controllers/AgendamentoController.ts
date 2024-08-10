// controllers/AgendamentoController.ts
import { Router, Request, Response, NextFunction } from "express";
import AgendamentoService from "../services/AgendamentoService";
import errorHandler from "../middleware/errorHandler";

const router = Router();

// Rota para criar um novo agendamento
router.post(
    "/create",
    errorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        const agendamento = req.body;
        try {
            const result = await AgendamentoService.createAgendamento(
                agendamento
            );
            res.status(201).send({
                message: "Agendamento criado com sucesso",
                agendamento: result,
            });
        } catch (err) {
            next(err);
        }
    }
);

// Rota para deletar um agendamento
router.delete(
    "/delete/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);

        try {
            const result = await AgendamentoService.deleteAgendamento(id);
            res.status(200).send({ message: result });
        } catch (err) {
            next(err);
        }
    }
);

// Rota para atualizar um agendamento
router.put(
    "/update/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        const updates = req.body;

        try {
            const agendamento = await AgendamentoService.updateAgendamento(
                id,
                updates
            );
            if (!agendamento) {
                return res
                    .status(404)
                    .send({ message: "Agendamento não encontrado" });
            }
            return res.status(200).send({
                message: "Agendamento atualizado com sucesso",
                agendamento,
            });
        } catch (error) {
            next(error);
        }
    }
);

// Rota para listar todos os agendamentos
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const agendamentos = await AgendamentoService.getAgendamentos();
        return res.status(200).send(agendamentos);
    } catch (error) {
        next(error);
    }
});

export { router as AgendamentoRoutes };
