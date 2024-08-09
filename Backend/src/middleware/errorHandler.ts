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
        }
        return res.status(400).send({
            message: message,
            error: detail,
        });
    } else if (err instanceof ValidationError) {
        return res.status(400).send({
            error: "Validation error",
            message: err.errors.map((err: any) => err.message).join(", "),
        });
    } else if (err instanceof Error) {
        if (err.message === "User not found") {
            return res.status(404).send({
                message: "O usuário não foi encontrado.",
                error: err.message,
            });
        } else if (err.message === "Game not found!") {
            return res.status(404).send({
                message: "Jogo não encontrado!",
                error: err.message,
            });
        }
        return res.status(500).send({
            message: "Internal server error",
            error: err.message,
        });
    }

    res.status(500).send({
        message: "Internal server error",
        error: err,
    });
};

export default errorHandler;
