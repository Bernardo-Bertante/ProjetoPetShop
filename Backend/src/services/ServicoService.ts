import { ServicoType } from "../types/servicoType";
import ServicoPersistance from "../persistance/ServicoPersistance";

const createServico = async (cliente: ServicoType) => {
    try {
        const result = await ServicoPersistance.createServico(cliente);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteServico = async (id: string) => {
    try {
        const result = await ServicoPersistance.deleteServico(id);
        return result;
    } catch (error) {
        throw error;
    }
};

const getServicos = async () => {
    try {
        const servicos = await ServicoPersistance.getServicos();
        return servicos;
    } catch (error) {
        throw error;
    }
};

const updateServico = async (id: string, updates: any) => {
    try {
        const servico = await ServicoPersistance.updateServico(id, updates);
        return servico;
    } catch (error) {
        throw error;
    }
};

export default {
    createServico,
    deleteServico,
    getServicos,
    updateServico,
};
