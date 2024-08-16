import { HorarioModel } from "../models/HorarioModel";

const getHorariosDisponiveis = async () => {
    try {
        const horarios = await HorarioModel.findAll({
            where: {
                disponibilidade: true,
            },
        });
        return horarios;
    } catch (error) {
        throw error;
    }
};

export default {
    getHorariosDisponiveis,
};
