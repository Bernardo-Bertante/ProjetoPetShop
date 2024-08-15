import { Router, Request, Response, NextFunction } from "express";
import FuncionarioService from "../services/FuncionarioService";
import { config } from "dotenv";
import { FuncionarioType } from "../types/FuncionarioType";
import errorHandler from "../middleware/errorHandler";

config();

const router = Router();

router.post(
    "/create",
    errorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        const user: FuncionarioType = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            password: req.body.password,
            telefone: req.body.telefone,
            email: req.body.email,
            isAdmin: false,
        };

        //const userValidation = UserType.safeParse(user);

        // if (!userValidation.success) {
        //     return res.status(400).send({
        //         message: "Invalid user data",
        //         error: userValidation.error,
        //     });
        // }

        try {
            const result = await FuncionarioService.createFuncionario(user);
            res.status(201).send({
                message: "User registered successfully",
                user: result,
            });
        } catch (err) {
            next(err);
        }
    }
);

// rota para deletar um funcionario

router.delete(
    "/delete/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const result = await FuncionarioService.deleteFuncionario(id);
            res.status(200).send({ message: result });
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    "/update/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id; // Obtém o ID da URL
        const updates = req.body;

        try {
            // Atualiza o funcionário com base no ID e os dados recebidos
            const user = await FuncionarioService.updateFuncionario(
                id,
                updates
            );
            if (!user) {
                return res
                    .status(404)
                    .send({ message: "Funcionário não encontrado" });
            }
            return res
                .status(200)
                .send({ message: "Perfil atualizado com sucesso", user });
        } catch (error) {
            next(error);
        }
    }
);

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await FuncionarioService.getFuncionarios();
        return res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

export { router as FuncionarioRoutes };
