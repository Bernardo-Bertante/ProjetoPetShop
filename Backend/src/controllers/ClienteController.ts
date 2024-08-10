import { Router, Request, Response, NextFunction } from "express";
import ClienteService from "../services/ClienteService";
import errorHandler from "../middleware/errorHandler";

const router = Router();

// Rota para registrar um novo cliente
router.post(
    "/register",
    errorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        const cliente = req.body;
        try {
            const result = await ClienteService.createCliente(cliente);
            res.status(201).send({
                message: "Cliente registrado com sucesso",
                cliente: result.nomeDono,
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
            const result = await ClienteService.deleteCliente(id);
            res.status(200).send({ message: result });
        } catch (err) {
            next(err);
        }
    }
);

// Rota para atualizar os dados de um cliente
router.put(
    "/editar/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id; // Obtém o ID da URL
        const updates = req.body;

        try {
            const cliente = await ClienteService.updateCliente(id, updates);
            if (!cliente) {
                return res
                    .status(404)
                    .send({ message: "Cliente não encontrado" });
            }
            return res.status(200).send({
                message: "Dados do cliente atualizados com sucesso",
                cliente,
            });
        } catch (error) {
            next(error);
        }
    }
);

// Rota para listar todos os clientes
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientes = await ClienteService.getClientes();
        return res.status(200).send(clientes);
    } catch (error) {
        next(error);
    }
});

export { router as ClienteRoutes };
