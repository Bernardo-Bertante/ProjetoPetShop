import { Router, Request, Response, NextFunction } from "express";
import ServicoService from "../services/ServicoService";
import errorHandler from "../middleware/errorHandler";

const router = Router();

// Rota para registrar um novo servico
router.post(
    "/create",
    errorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        const servico = req.body;
        try {
            const result = await ServicoService.createServico(servico);
            res.status(201).send({
                message: "Serviço registrado com sucesso",
                servico: result.tipoServico,
            });
        } catch (err) {
            next(err);
        }
    }
);

// Rota para deletar um cliente
router.delete(
    "/delete/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const result = await ServicoService.deleteServico(id);
            res.status(200).send({ message: result });
        } catch (err) {
            next(err);
        }
    }
);

// Rota para atualizar os dados de um cliente
router.put(
    "/update/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id; // Obtém o ID da URL
        const updates = req.body;

        try {
            const servico = await ServicoService.updateServico(id, updates);
            if (!servico) {
                return res
                    .status(404)
                    .send({ message: "Serviço não encontrado" });
            }
            return res.status(200).send({
                message: "Dados do serviço atualizados com sucesso",
                servico: servico.tipoServico,
            });
        } catch (error) {
            next(error);
        }
    }
);

// Rota para listar todos os clientes
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientes = await ServicoService.getServicos();
        return res.status(200).send(clientes);
    } catch (error) {
        next(error);
    }
});

export { router as ServicoRoutes };
