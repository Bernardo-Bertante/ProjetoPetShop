import { Request, Response, NextFunction } from "express";
import HorarioService from "../services/HorarioService";

// Função para listar todos os horários disponíveis
export const getAllHorarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const horarios = await HorarioService.getHorariosDisponiveis();
        return res.status(200).send(horarios);
    } catch (error) {
        next(error);
    }
};
