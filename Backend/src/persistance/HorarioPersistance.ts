import { HorarioModel } from "../models/HorarioModel";
import { HorarioType } from "../types/HorarioType";

const getHorarios = async () => {
    try {
        const horarios = await HorarioModel.findAll(); // Busca todos os funcionários
        return horarios;
    } catch (error) {
        throw error;
    }
};

export default {
    getHorarios,
};
