import HorarioPersistance from "../persistance/HorarioPersistance";

const getHorariosDisponiveis = async () => {
    try {
        const horarios = await HorarioPersistance.getHorariosDisponiveis();
        return horarios;
    } catch (error) {
        throw error;
    }
};

export default {
    getHorariosDisponiveis,
};
