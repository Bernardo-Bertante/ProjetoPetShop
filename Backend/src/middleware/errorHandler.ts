import { Request, Response, NextFunction } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof UniqueConstraintError) {
        const detail = (err.parent as any).detail;
        let message = "Registro duplicado";

        if (detail.includes("Chave (email)")) {
            message = "Email já registrado";
        } else if (detail.includes("Chave (cpf)")) {
            message = "Esse CPF já está registrado";
        } else if (detail.includes("Chave (telefone)")) {
            message = "Telefone já registrado";
        } else if (detail.includes("Chave (nomeDono, nomeAnimal)")) {
            message = "O dono e o nome do animal já estão registrados";
        } else if (detail.includes("Chave (email)")) {
            message = "Esse email já está associado a outro cliente";
        }

        return res.status(400).send({
            message: message,
            error: detail,
        });
    } else if (err instanceof ValidationError) {
        return res.status(400).send({
            error: "Erro de validação",
            message: err.errors.map((e: any) => e.message).join(", "),
        });
    } else if (err instanceof Error) {
        switch (err.message) {
            case "User not found":
                return res.status(404).send({
                    message: "O usuário não foi encontrado.",
                    error: err.message,
                });
            case "Client not found":
                return res.status(404).send({
                    message: "Cliente não encontrado.",
                    error: err.message,
                });
            case "Funcionario not found":
                return res.status(404).send({
                    message: "Funcionário não encontrado.",
                    error: err.message,
                });
            case "Servico not found":
                return res.status(404).send({
                    message: "Serviço não encontrado.",
                    error: err.message,
                });
            default:
                return res.status(500).send({
                    message: "Erro interno do servidor",
                    error: err.message,
                });
        }
    }

    res.status(500).send({
        message: "Erro interno do servidor",
        error: err,
    });
};

export default errorHandler;
