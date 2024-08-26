import { Request, Response, NextFunction } from "express";
import AgendamentoService from "../services/AgendamentoService";

// Função para criar um novo agendamento
export const createAgendamento = async (req: Request, res: Response, next: NextFunction) => {
    const agendamento = req.body;
    try {
        const result = await AgendamentoService.createAgendamento(agendamento);
        res.status(201).send({
            message: "Agendamento criado com sucesso",
            agendamento: result,
        });
    } catch (err) {
        next(err);
    }
};

// Função para deletar um agendamento
export const deleteAgendamento = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
        const result = await AgendamentoService.deleteAgendamento(id);
        res.status(200).send({ message: result });
    } catch (err) {
        next(err);
    }
};

// Função para atualizar um agendamento
export const updateAgendamento = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const updates = req.body;

    try {
        const agendamento = await AgendamentoService.updateAgendamento(id, updates);
        if (!agendamento) {
            return res.status(404).send({ message: "Agendamento não encontrado" });
        }
        return res.status(200).send({
            message: "Agendamento atualizado com sucesso",
            agendamento,
        });
    } catch (error) {
        next(error);
    }
};

// Função para listar todos os agendamentos
export const getAgendamentos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const agendamentos = await AgendamentoService.getAgendamentos();
        return res.status(200).send(agendamentos);
    } catch (error) {
        next(error);
    }
};
