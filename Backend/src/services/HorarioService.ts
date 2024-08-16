import { HorarioType } from "../types/HorarioType";
import HorarioPersistance from "../persistance/HorarioPersistance";

const getHorarios = async () => {
    try {
        const horarios = await HorarioPersistance.getHorarios();
        return horarios;
    } catch (error) {
        throw error;
    }
};

export default {
    getHorarios,
};
