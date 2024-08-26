import { Request, Response, NextFunction } from "express";
import ClienteService from "../services/ClienteService";

// Função para criar um cliente
export const createCliente = async (req: Request, res: Response, next: NextFunction) => {
    const cliente = req.body;
    try {
        const result = await ClienteService.createCliente(cliente);
        res.status(201).send({
            message: "Cliente registrado com sucesso",
            cliente: result,
        });
    } catch (err) {
        next(err);
    }
};

// Função para deletar um cliente
export const deleteCliente = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await ClienteService.deleteCliente(id);
        res.status(200).send({ message: result });
    } catch (err) {
        next(err);
    }
};

// Função para atualizar os dados de um cliente
export const updateCliente = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id; // Obtém o ID da URL
    const updates = req.body;

    try {
        const cliente = await ClienteService.updateCliente(id, updates);
        if (!cliente) {
            return res.status(404).send({ message: "Cliente não encontrado" });
        }
        return res.status(200).send({
            message: "Dados do cliente atualizados com sucesso",
            cliente,
        });
    } catch (err) {
        next(err);
    }
};

// Função para listar todos os clientes
export const getClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientes = await ClienteService.getClientes();
        return res.status(200).send(clientes);
    } catch (err) {
        next(err);
    }
};
